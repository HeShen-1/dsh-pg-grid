import pg from 'pg';
import Decimal from 'decimal.js';
import { compile, sources, fail } from './query.js';
export const MAX_EXPORT = 100000;
const preserve = new Set([20, 1700, 700, 701, 1082, 1114, 1184, 114, 3802]);
const types = { getTypeParser: (oid, format) => preserve.has(oid) && format !== 'binary' ? value => value : pg.types.getTypeParser(oid, format) };
export function connectionConfig(input) {
  const port = Number(input.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) fail('端口必须为 1…65535');
  if (input.host && !['127.0.0.1','localhost','::1'].includes(input.host)) fail('仅允许本机回环地址');
  for (const k of ['database','user']) if (typeof input[k] !== 'string' || !input[k].trim() || input[k].length > 128) fail('请填写数据库和用户名');
  if (input.password !== undefined && typeof input.password !== 'string') fail('密码格式无效');
  return { host: input.host === '::1' ? '::1' : '127.0.0.1', port, database: input.database, user: input.user,
    password: input.password ?? '', ssl: false, max: 3, connectionTimeoutMillis: 4000, idleTimeoutMillis: 10000,
    statement_timeout: 15000, query_timeout: 17000, application_name: 'dsh-pg-grid', types };
}
export function makePool(input) { const pool = new pg.Pool(connectionConfig(input)); pool.on('error', () => {}); return pool; }
export async function read(pool, work, signal) {
  signal?.throwIfAborted();
  const client = await pool.connect(); let poisoned = false;
  // A cancelled socket can emit its final error after the query promise rejects.
  const onClientError = () => { poisoned = true; };
  client.on('error', onClientError);
  const cancel = () => { poisoned = true; client.connection.stream.destroy(); };
  signal?.addEventListener('abort', cancel, { once: true });
  try {
    signal?.throwIfAborted();
    await client.query('BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY');
    await client.query("SET LOCAL search_path = pg_catalog");
    await client.query("SET LOCAL statement_timeout = '15s'");
    await client.query("SET LOCAL lock_timeout = '2s'");
    const result = await work(client);
    await client.query('ROLLBACK'); return result;
  } catch (error) {
    if (!poisoned) await client.query('ROLLBACK').catch(() => { poisoned = true; });
    throw error;
  } finally { signal?.removeEventListener('abort', cancel); if(!poisoned) client.removeListener('error',onClientError); client.release(poisoned); }
}
export async function catalog(client) {
  const { rows } = await client.query(`SELECT n.nspname AS schema, c.relname AS name, c.relkind AS kind,
    a.attname AS column, pg_catalog.format_type(a.atttypid, a.atttypmod) AS type,
    a.attnotnull AS required, EXISTS(SELECT 1 FROM pg_catalog.pg_index pi WHERE pi.indrelid=c.oid AND pi.indisprimary AND a.attnum=ANY(pi.indkey)) AS primary FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace
    JOIN pg_catalog.pg_attribute a ON a.attrelid=c.oid AND a.attnum>0 AND NOT a.attisdropped
    WHERE c.relkind IN ('r','p','v','m') AND n.nspname NOT LIKE 'pg_%' AND n.nspname<>'information_schema'
    AND pg_catalog.has_schema_privilege(n.oid, 'USAGE') AND pg_catalog.has_table_privilege(c.oid, 'SELECT')
    ORDER BY n.nspname, c.relname, a.attnum`);
  const tables = new Map();
  for (const r of rows) {
    const id = JSON.stringify([r.schema,r.name]);
    if (!tables.has(id)) tables.set(id, { schema: r.schema, name: r.name, kind: r.kind, columns: [] });
    tables.get(id).columns.push({ name: r.column, type: r.type, required: r.required, primary: r.primary });
  }
  return [...tables.values()];
}
export async function discover(pool, signal) {
  return read(pool, async client => ({ tables: await catalog(client), databases: (await client.query("SELECT datname AS name FROM pg_catalog.pg_database WHERE datallowconn AND NOT datistemplate AND pg_catalog.has_database_privilege(oid, 'CONNECT') ORDER BY datname")).rows,
    timezone: (await client.query('SHOW timezone')).rows[0].TimeZone }), signal);
}
/** Pivots consume independently computed grouping sets; never sum averages. */
export function pivotResult(raw, spec) {
  const cellKeys = new Map(), records = new Map(); let grand = null;
  const columnOnlyMask = ((1 << (spec.dims.length + 1)) - 1) ^ 1;
  for (const r of raw) {
    const mask = Number(r.__grouping);
    if (mask === 0 || mask === columnOnlyMask) {
      const key = JSON.stringify(r[spec.column]);
      if (!cellKeys.has(key)) cellKeys.set(key, r[spec.column]);
    }
    if (mask === 0 || mask === 1) {
      const key = JSON.stringify(spec.dims.map(d => r[d]));
      if (!records.has(key)) records.set(key, Object.fromEntries(spec.dims.map(d => [d, r[d]])));
    }
    if (mask === (1 << (spec.dims.length + 1)) - 1) grand = r;
  }
  if (cellKeys.size > 100) fail('透视列超过 100 个，请收窄列维度；未截断结果', 'LIMIT', 422);
  const keys = [...cellKeys.keys()].sort(), fields = spec.dims.map(id => ({ id, name: id, type: 'dimension' }));
  for (const [i,key] of keys.entries()) for (const measure of spec.measures) fields.push({ id: `pivot.${i}.${measure}`, name: `${cellKeys.get(key) === null ? 'NULL' : cellKeys.get(key)} · ${measure}`, type: 'aggregate' });
  for (const measure of spec.measures) fields.push({ id: `total.${measure}`, name: `合计 · ${measure}`, type: 'aggregate' });
  const total = { [spec.dims[0]]: '总计' };
  for (const r of raw) {
    const mask = Number(r.__grouping), rowKey = JSON.stringify(spec.dims.map(d => r[d]));
    if (mask === 0 || mask === columnOnlyMask) {
      const i = keys.indexOf(JSON.stringify(r[spec.column]));
      const target = mask === 0 ? records.get(rowKey) : total;
      for (const m of spec.measures) target[`pivot.${i}.${m}`] = r[m];
    }
    if (mask === 1) for (const m of spec.measures) records.get(rowKey)[`total.${m}`] = r[m];
  }
  for (const m of spec.measures) total[`total.${m}`] = grand?.[m] ?? null;
  const rows = [...records.values()].sort((a,b) => { for (const sort of spec.sort ?? []) { const key = spec.measures.includes(sort.field) ? 'total.' + sort.field : sort.field; const x=a[key], y=b[key]; if(x==null && y==null) continue; if(x==null) return 1; if(y==null) return -1; const numeric=spec.measures.includes(sort.field) || spec.numericDims?.includes(sort.field); const cmp=numeric && /^-?[\d.]+$/.test(String(x)) && /^-?[\d.]+$/.test(String(y)) ? new Decimal(x).cmp(y) : String(x).localeCompare(String(y),'en'); if(cmp) return sort.direction==='desc'?-cmp:cmp; } return JSON.stringify(spec.dims.map(d=>a[d])).localeCompare(JSON.stringify(spec.dims.map(d=>b[d])), 'en'); });
  return { rows, fields, totals: total };
}
export async function execute(pool, plan, { page = 0, pageSize = 100, exportAll = false, signal } = {}) {
  if (!Number.isInteger(page) || page < 0 || page > 100000 || ![25,50,100,250,500].includes(pageSize)) fail('分页参数无效');
  sources(plan);
  const start = performance.now();
  return read(pool, async client => {
    const compiled = compile(plan, await catalog(client));
    const warningCount = (await client.query(compiled.warningsSql, compiled.values)).rows[0].count;
    let rows, fields = compiled.fields, total, totals = null;
    if (compiled.pivot) {
      const raw = (await client.query(compiled.sql + ` LIMIT ${MAX_EXPORT + 1}`, compiled.values)).rows;
      if (raw.length > MAX_EXPORT) fail('透视分组超过限制，请增加筛选条件；未截断结果', 'LIMIT', 422);
      const result = pivotResult(raw, compiled.pivot); total = result.rows.length; fields = result.fields; totals = result.totals;
      rows = exportAll ? result.rows : result.rows.slice(page * pageSize, (page + 1) * pageSize);
    } else {
      total = Number((await client.query(compiled.countSql, compiled.values)).rows[0].total);
      if (!Number.isSafeInteger(total)) fail('结果行数超出可展示范围');
      if (exportAll && total > MAX_EXPORT) fail('导出超过 100,000 行，请增加筛选条件；未截断结果', 'LIMIT', 422);
      const limit = exportAll ? MAX_EXPORT : pageSize, offset = exportAll ? 0 : page * pageSize;
      rows = (await client.query(compiled.sql + ` LIMIT ${limit} OFFSET ${offset}`, compiled.values)).rows;
    }
    return { rows, fields, total, totals, page, pageSize, updatedAt: new Date().toISOString(), elapsedMs: Math.round(performance.now() - start),
      warnings: warningCount !== '0' ? [`${warningCount} 行出现除零：对应计算值为 NULL，请修正计算规则。`] : [] };
  }, signal);
}
export function csv(result) {
  const cell = v => {
    if (v === null || v === undefined) return '\\N';
    let value = typeof v === 'object' ? JSON.stringify(v) : String(v);
    // Spreadsheet apps otherwise evaluate exported text as formulas.
    if (/^[=+@\t\r]/.test(value) || (/^-/.test(value) && !/^-\d+(\.\d+)?$/.test(value))) value = "'" + value;
    return '"' + value.replaceAll('"','""') + '"';
  };
  return '\uFEFF' + [result.fields.map(f=>cell(f.name)).join(','), ...[...result.rows, ...(result.totals ? [result.totals] : [])].map(r=>result.fields.map(f=>cell(r[f.id])).join(','))].join('\r\n');
}
