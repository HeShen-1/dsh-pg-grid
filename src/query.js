/** A closed, parameterized query language shared by UI and AI. Never accepts SQL. */
export class GridError extends Error { constructor(message, code = 'INVALID', status = 400) { super(message); this.code = code; this.status = status; } }
export const fail = (message, code, status) => { throw new GridError(message, code, status); };
export const ident = value => { if (typeof value !== 'string' || !value || value.includes('\0') || value.length > 200) fail('标识符无效'); return '"' + value.replaceAll('"', '""') + '"'; };
export const list = (v, max = 64) => { if (!Array.isArray(v) || v.length > max) fail('规则数量无效或超过限制'); return v; };
export function only(obj, keys) { if (!obj || typeof obj !== 'object' || Array.isArray(obj) || Object.keys(obj).some(k => !keys.includes(k))) fail('存在未知规则字段'); }
export function sources(plan) {
  only(plan, ['source', 'joins', 'filters', 'computed', 'select', 'groupBy', 'measures', 'pivot', 'sort', 'columnFilters']);
  const all = [plan.source, ...list(plan.joins ?? [], 7)];
  const aliases = new Set();
  for (const s of all) {
    only(s, s === plan.source ? ['schema', 'table', 'alias'] : ['schema', 'table', 'alias', 'type', 'on']);
    ident(s.schema); ident(s.table);
    if (!/^t[0-7]$/.test(s.alias) || aliases.has(s.alias)) fail('表别名必须唯一且为 t0…t7');
    aliases.add(s.alias);
  }
  return all;
}
export function compile(plan, catalog) {
  const tables = sources(plan), fields = new Map(), values = [], warnings = [];
  const bind = value => { if (value !== null && !['string', 'number', 'boolean'].includes(typeof value)) fail('条件值类型无效'); if (typeof value === 'number' && !Number.isFinite(value)) fail('数字无效'); values.push(value); return '$' + values.length; };
  for (const s of tables) {
    const table = catalog.find(t => t.schema === s.schema && t.name === s.table);
    if (!table) fail(`表不存在或无读取权限：${s.schema}.${s.table}`);
    for (const c of table.columns) fields.set(`${s.alias}.${c.name}`, { ...c, sql: `${ident(s.alias)}.${ident(c.name)}` });
  }
  const sourceField = id => { if (!fields.has(id) || !fields.get(id).sql) fail('计算表达式只能引用源表字段：' + id); return fields.get(id).sql; };
  let nodes = 0;
  const expression = (e, depth = 0) => {
    if (++nodes > 400 || depth > 12) fail('表达式过于复杂');
    if (typeof e === 'string') return sourceField(e);
    if (!e || typeof e !== 'object') fail('表达式无效');
    if ('literal' in e) {
      only(e, ['literal', 'type']);
      const casts = { number: 'numeric', text: 'text', boolean: 'boolean' };
      const type = e.type ?? (typeof e.literal === 'number' ? 'number' : typeof e.literal === 'boolean' ? 'boolean' : 'text');
      if (!casts[type]) fail('常量类型无效');
      return `${bind(e.literal)}::${casts[type]}`;
    }
    only(e, ['op', 'args']);
    const args = list(e.args, 8).map(a => expression(a, depth + 1));
    const arity = n => { if (args.length !== n) fail('运算参数数量错误：' + e.op); };
    if (['add','sub','mul','div','eq','ne','gt','gte','lt','lte','and','or'].includes(e.op)) {
      arity(2);
      const ops = { add: '+', sub: '-', mul: '*', eq: '=', ne: '<>', gt: '>', gte: '>=', lt: '<', lte: '<=', and: 'AND', or: 'OR' };
      if (e.op === 'div') { warnings.push(`(${args[1]} = 0)`); return `(${args[0]}::numeric / NULLIF(${args[1]}::numeric, 0))`; }
      return `(${args[0]} ${ops[e.op]} ${args[1]})`;
    }
    if (e.op === 'if') { arity(3); return `(CASE WHEN ${args[0]} THEN ${args[1]} ELSE ${args[2]} END)`; }
    if (e.op === 'coalesce') { arity(2); return `COALESCE(${args.join(', ')})`; }
    if (e.op === 'round') { arity(2); return `pg_catalog.round(${args[0]}::numeric, ${args[1]}::integer)`; }
    if (e.op === 'concat') { if (!args.length) fail('拼接需要参数'); return `pg_catalog.concat(${args.map(a => `${a}::text`).join(', ')})`; }
    if (['year','month','day'].includes(e.op)) { arity(1); return `EXTRACT(${e.op.toUpperCase()} FROM ${args[0]})`; }
    fail('不支持的计算：' + e.op);
  };
  const projection = [...fields].map(([id, f]) => `${f.sql} AS ${ident(id)}`);
  for (const c of list(plan.computed ?? [], 20)) {
    only(c, ['name', 'expr']); ident(c.name);
    const id = 'calc.' + c.name;
    if (fields.has(id)) fail('计算列名称重复');
    projection.push(`${expression(c.expr)} AS ${ident(id)}`);
    // Computed expressions intentionally cannot reference other computed columns.
    fields.set(id, { name: c.name, type: 'computed', computed: true });
  }
  let from = `${ident(tables[0].schema)}.${ident(tables[0].table)} AS ${ident(tables[0].alias)}`;
  const joined = new Set([tables[0].alias]);
  for (const j of tables.slice(1)) {
    if (!['inner','left'].includes(j.type)) fail('仅支持内连接或左连接');
    const on = list(j.on, 8);
    if (!on.length) fail('关联条件不能为空');
    const sql = on.map(pair => {
      only(pair, ['left','right']);
      if (!joined.has(String(pair.left).split('.')[0]) || !String(pair.right).startsWith(j.alias + '.')) fail('关联字段必须来自已有表和本次关联表');
      return `${sourceField(pair.left)} = ${sourceField(pair.right)}`;
    });
    from += ` ${j.type === 'left' ? 'LEFT' : 'INNER'} JOIN ${ident(j.schema)}.${ident(j.table)} AS ${ident(j.alias)} ON ${sql.join(' AND ')}`;
    joined.add(j.alias);
  }
  const field = id => { if (!fields.has(id)) fail('字段不存在或已变化：' + id); return ident(id); };
  let filterFields = fields;
  const filter = (f, depth = 0) => {
    if (++nodes > 700 || depth > 8) fail('筛选条件过于复杂');
    if (f?.rules) {
      only(f, ['mode','rules']);
      if (!['and','or'].includes(f.mode)) fail('筛选组合无效');
      const children = list(f.rules, 40);
      return children.length ? '(' + children.map(c => filter(c, depth + 1)).join(f.mode === 'and' ? ' AND ' : ' OR ') + ')' : 'TRUE';
    }
    only(f, ['field','op','value']);
    if (!filterFields.has(f.field)) fail('筛选字段不存在：' + f.field);
    const col = ident(f.field);
    if (f.op === 'isNull') return `${col} IS NULL`;
    if (f.op === 'notNull') return `${col} IS NOT NULL`;
    const operators = { eq: '=', ne: '<>', gt: '>', gte: '>=', lt: '<', lte: '<=' };
    if (operators[f.op]) { if (f.value === null || f.value === undefined) fail('空值请使用“为空/非空”'); return `${col} ${operators[f.op]} ${bind(f.value)}`; }
    if (['in','notIn'].includes(f.op)) { const vals = list(f.value, 1000); if (!vals.length) return f.op==='in'?'FALSE':'TRUE'; return `${col} ${f.op==='notIn'?'NOT IN':'IN'} (${vals.map(bind).join(',')})`; }
    if (['contains','starts','ends'].includes(f.op)) {
      if (typeof f.value !== 'string') fail('文本筛选需要文本');
      const value = f.value.replaceAll('\\', '\\\\').replaceAll('%', '\\%').replaceAll('_', '\\_');
      return `${col}::text ILIKE ${bind((f.op === 'starts' ? '' : '%') + value + (f.op === 'ends' ? '' : '%'))}`;
    }
    fail('筛选运算无效');
  };
  // Warning columns are not selectable and are counted before paging/aggregation.
  projection.push(`(${warnings.length ? warnings.join(' OR ') : 'FALSE'}) AS "__division_error"`);
  const columnFilters = list(plan.columnFilters ?? [], 40);
  const seenColumns = new Set();
  for (const c of columnFilters) {
    only(c, ['field','rule']);
    if (seenColumns.has(c.field)) fail('列筛选重复');
    seenColumns.add(c.field);
    const check = (r,depth=0) => { if(depth>8) fail('筛选条件过于复杂'); if(r?.rules) list(r.rules,40).forEach(x=>check(x,depth+1)); else if(r?.field !== c.field) fail('列筛选只能引用本列'); };
    check(c.rule);
  }
  const where = plan.filters ? filter(plan.filters) : 'TRUE';
  let prefix = `WITH base AS (SELECT ${projection.join(', ')} FROM ${from}), filtered AS (SELECT * FROM base WHERE ${where})`;
  const warningsValues = values.slice();
  const warningPrefix = prefix;
  if (plan.pivot && columnFilters.length) {
    for (const c of columnFilters) if (!(plan.groupBy ?? []).includes(c.field)) fail('透视表仅支持行维度的列筛选');
    prefix = `WITH base AS (SELECT ${projection.join(', ')} FROM ${from}), filtered AS (SELECT * FROM base WHERE (${where}) AND ${columnFilters.map(c=>filter(c.rule)).join(' AND ')})`;
  }
  const dims = list(plan.groupBy ?? [], 12); dims.forEach(field);
  const measures = list(plan.measures ?? [], 12), output = new Map();
  const agg = m => {
    only(m, ['name','fn','field']); ident(m.name);
    if (output.has(m.name) || dims.includes(m.name) || fields.has(m.name) || m.name.startsWith('__')) fail('统计名称重复或与字段冲突');
    const funcs = { sum: 'sum', avg: 'avg', min: 'min', max: 'max', count: 'count' };
    if (m.fn !== 'rows' && !funcs[m.fn]) fail('统计函数无效');
    const sql = m.fn === 'rows' ? 'count(*)' : `${funcs[m.fn]}(${field(m.field)})`;
    output.set(m.name, { name: m.name, type: 'aggregate' });
    return `${sql} AS ${ident(m.name)}`;
  };
  const aggregated = measures.map(agg);
  if (dims.length && !measures.length) fail('分组至少需要一个统计指标');
  let body, pivot = null;
  if (plan.pivot) {
    only(plan.pivot, ['column']); field(plan.pivot.column);
    if (!dims.length || !measures.length || dims.includes(plan.pivot.column)) fail('透视需要行维度、不同的列维度及指标');
    const all = [...dims, plan.pivot.column].map(field);
    body = `SELECT ${all.join(',')}, ${aggregated.join(',')}, GROUPING(${all.join(',')}) AS "__grouping" FROM filtered GROUP BY GROUPING SETS ((${all.join(',')}), (${dims.map(field).join(',')}), (${field(plan.pivot.column)}), ())`;
    pivot = { dims, column: plan.pivot.column, measures: measures.map(m => m.name), sort: plan.sort ?? [], numericDims: dims.filter(d => /^(smallint|integer|bigint|numeric|real|double)/.test(fields.get(d).type)) };
  } else if (measures.length) {
    body = `SELECT ${[...dims.map(field), ...aggregated].join(',')} FROM filtered${dims.length ? ' GROUP BY ' + dims.map(field).join(',') : ''}`;
  } else {
    const selected = plan.select?.length ? list(plan.select, 200) : [...fields.keys()];
    selected.forEach(field); body = `SELECT ${selected.map(field).join(',')} FROM filtered`;
    selected.forEach(id => output.set(id, fields.get(id)));
  }
  dims.forEach(id => output.set(id, fields.get(id)));
  if (!plan.pivot && columnFilters.length) {
    filterFields = output;
    body = `SELECT * FROM (${body}) AS column_result WHERE ${columnFilters.map(c=>filter(c.rule)).join(' AND ')}`;
  }
  const order = list(plan.sort ?? [], 12).map(s => {
    only(s, ['field','direction']);
    if (!output.has(s.field) || !['asc','desc'].includes(s.direction)) fail('排序字段或方向无效');
    return `${ident(s.field)} ${s.direction.toUpperCase()} NULLS LAST`;
  });
  // Full row tie-breaker gives stable pagination even on tables without primary keys.
  const primary = [...output].filter(([,f])=>f.primary).map(([id])=>`${ident(id)} ASC NULLS LAST`);
  const sorted = `SELECT * FROM result ORDER BY ${[...order, ...primary, 'pg_catalog.row_to_json(result)::text'].join(',')}`;
  return { prefix, body, values, warningsValues, fields: [...output].map(([id, f]) => ({ id, name: f.name ?? id, type: f.type })), pivot,
    sql: `${prefix}, result AS (${body}) ${sorted}`,
    countSql: `${prefix}, result AS (${body}) SELECT count(*)::text AS total FROM result`,
    warningsSql: `${warningPrefix} SELECT count(*)::text AS count FROM filtered WHERE "__division_error"` };
}
