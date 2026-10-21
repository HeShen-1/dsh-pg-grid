import { randomUUID } from 'node:crypto';
import { Store, CredentialStore } from './store.js';
import { GridError, fail, compile, sources, only, list } from './query.js';
import { connectionConfig, makePool, discover, execute, columnValues, csv, read, catalog } from './database.js';
import { SYSTEM, decodePlan } from './ai.js';
export class GridService {
  constructor({ directory, model, models, aiEnabled = false, poolFactory = makePool }) { this.store = new Store(directory); this.credentials = new CredentialStore(directory); this.pools = new Map(); this.model = model; this.models = models; this.aiEnabled = aiEnabled; this.poolFactory = poolFactory; this.disposed = false; }
  async init() { await this.store.load(); await this.credentials.load(); return this; }
  pool(id) { if (this.disposed) fail('插件已停用', 'DISABLED', 503); let pool = this.pools.get(id); if(!pool && Object.hasOwn(this.credentials.data,id)){const config=this.store.data.connections.find(c=>c.id===id);if(config){pool=this.poolFactory({...config,password:this.credentials.data[id]});this.pools.set(id,pool);}} if (!pool) fail('连接尚未解锁，请重新输入密码连接', 'LOCKED', 409); return pool; }
  async dispatch(body, signal = new AbortController().signal) {
    if (this.disposed) fail('插件已停用', 'DISABLED', 503);
    only(body, ['action','connection','connectionId','plan','page','pageSize','name','view','viewId','prompt','allowedTables','shareRows','sessionId','selection','field','search','offset']);
    const { action, connectionId } = body;
    if (action === 'state') return { connections: this.store.data.connections.map(c=>({...c, connected:this.pools.has(c.id),hasSavedPassword:Object.hasOwn(this.credentials.data,c.id)})), views:this.store.data.views, aiEnabled:this.aiEnabled, version:'0.1.0' };
    if (action === 'models') return this.models ? this.models() : {groups:[],unavailable:[]};
    if (action === 'columnValues') return columnValues(this.pool(connectionId),body.plan,body.field,{search:body.search,offset:body.offset,signal});
    if (action === 'connect') {
      let input = body.connection; const old=this.store.data.connections.find(c=>c.id===input?.id); if(input?.rememberPassword && !input.password && old && ['host','port','user'].every(k=>String(input[k]??(k==='host'?'127.0.0.1':''))===String(old[k])) && Object.hasOwn(this.credentials.data,old.id)) input={...input,password:this.credentials.data[old.id]}; connectionConfig(input);
      const id = input.id && this.store.data.connections.some(c=>c.id===input.id) ? input.id : randomUUID();
      if (!this.store.data.connections.some(c=>c.id===id) && this.store.data.connections.length >= 20) fail('连接最多保存 20 个');
      const pool = this.poolFactory(input);
      let metadata; try { metadata = await discover(pool, signal); } catch(e) { await pool.end(); throw e; }
      if (this.disposed) { await pool.end(); fail('插件已停用', 'DISABLED', 503); }
      await this.pools.get(id)?.end(); this.pools.set(id,pool);
      const config = { id, name:String(input.name || `${input.port}/${input.database}`).slice(0,100), host:input.host === '::1' ? '::1' : '127.0.0.1', port:Number(input.port), database:input.database, user:input.user };
      this.store.data.connections = this.store.data.connections.filter(c=>c.id!==id).concat(config); await this.store.save();
      if(input.rememberPassword===true)this.credentials.data[id]=input.password??'';else delete this.credentials.data[id];await this.credentials.save();
      return { connection: {...config,hasSavedPassword:Object.hasOwn(this.credentials.data,id)}, ...metadata };
    }
    if (action === 'disconnect') { const pool = this.pools.get(connectionId); this.pools.delete(connectionId); await pool?.end(); return {ok:true}; }
    if (action === 'removeConnection') { await this.dispatch({action:'disconnect',connectionId}, signal); this.store.data.connections=this.store.data.connections.filter(c=>c.id!==connectionId); delete this.credentials.data[connectionId]; await this.credentials.save(); await this.store.save(); return {ok:true}; }
    if (action === 'catalog') return discover(this.pool(connectionId),signal);
    if (action === 'query' || action === 'export') {
      const result = await execute(this.pool(connectionId),body.plan,{page:body.page ?? 0,pageSize:body.pageSize ?? 100,exportAll:action==='export',signal});
      return action === 'export' ? {csv:csv(result),total:result.total} : result;
    }
    if (action === 'saveView') {
      const v = body.view; only(v, ['id','name','connectionId','plan','layout']);
      if (!this.store.data.connections.some(c=>c.id===v.connectionId)) fail('连接不存在');
      if (typeof v.name !== 'string' || !v.name.trim() || v.name.length>100) fail('请填写视图名称（最多 100 字）');
      await read(this.pool(v.connectionId), async client => compile(v.plan, await catalog(client)), signal);
      if (JSON.stringify(v).length>200000) fail('视图配置过大');
      const record = {...v,id:v.id && this.store.data.views.some(x=>x.id===v.id) ? v.id : randomUUID()};
      this.store.data.views = this.store.data.views.filter(x=>x.id!==record.id).concat(record); await this.store.save(); return record;
    }
    if (action === 'deleteView') { this.store.data.views=this.store.data.views.filter(v=>v.id!==body.viewId); await this.store.save(); return {ok:true}; }
    if (action === 'ai') {
      if (!this.aiEnabled || !this.model) fail('真实模型调用尚未启用；预算确认前不会消耗模型额度', 'AI_DISABLED', 403);
      if (typeof body.prompt !== 'string' || !body.prompt.trim() || body.prompt.length>6000) fail('请输入不超过 6000 字的查询需求');
      const pool = this.pool(connectionId), info = await discover(pool,signal);
      const requested = list(body.allowedTables,8); if (!requested.length) fail('请先选择 AI 可以使用的表');
      const allowedTables = requested.map(t=>{ only(t,['schema','name']); const found=info.tables.find(x=>x.schema===t.schema&&x.name===t.name); if(!found) fail('授权表不存在'); return found; });
      const allowedScope = new Set(allowedTables.map(t=>JSON.stringify([t.schema,t.name])));
      if(body.plan) for(const s of sources(body.plan)) if(!allowedScope.has(JSON.stringify([s.schema,s.table]))) fail('当前规则含未授权的表，请调整授权范围', 'AI_SCOPE',403);
      let sample = [];
      if (body.shareRows) {
        const allowed = new Set(allowedTables.map(t=>JSON.stringify([t.schema,t.name])));
        for(const s of sources(body.plan)) if(!allowed.has(JSON.stringify([s.schema,s.table]))) fail('当前结果含未授权的表', 'AI_SCOPE',403);
        const result=await execute(pool,body.plan,{page:body.page??0,pageSize:25,signal}); sample=result.rows.slice(0,20);
      }
      if(JSON.stringify({allowedTables,sample}).length>60000) fail('模型上下文过大，请减少授权表或关闭结果共享');
      const raw=await this.model({system:SYSTEM,input:{request:body.prompt,allowedTables,currentPlan:body.plan,sample, sampleLimit:20},sessionId:body.sessionId,selection:body.selection,signal});
      const decoded=decodePlan(raw,allowedTables); if(decoded.clarification) return decoded;
      const result=await execute(pool,decoded.plan,{signal}); return {...decoded,result};
    }
    fail('不支持的操作；本插件仅允许读取和保存分析规则');
  }
  async dispose() { this.disposed=true; const pools=[...this.pools.values()]; this.pools.clear(); await Promise.all(pools.map(p=>p.end())); }
}
export function errorResponse(error) {
  if (error instanceof GridError) return {error:error.message,code:error.code,status:error.status};
  const map = {'28P01':'用户名或密码错误，请重新连接','3D000':'数据库不存在','42501':'数据库账号没有读取权限','57014':'查询超时或已取消，请收窄查询范围','ECONNREFUSED':'无法连接该端口，请检查 PostgreSQL 是否运行','ECONNRESET':'连接已断开，请重试','EPIPE':'连接已断开，请重试','42703':'字段已变化，请更新分析规则','42P01':'表已变化，请重新选择数据表','42883':'字段类型不适用于当前运算，请修改计算规则','22P02':'条件值与字段类型不匹配','22003':'计算数值超出范围','22012':'计算发生除零，请修改计算规则'};
  return {error:map[error.code] || '操作失败，请检查连接或分析规则后重试',code:error.code || 'INTERNAL',status:400};
}
export function fetchHandler(service) {
  return async request => {
    try {
      if (request.method!=='POST' || !request.headers.get('content-type')?.includes('application/json')) fail('仅接受 JSON POST 请求');
      const raw=await request.text(); if(raw.length>1000000) fail('请求内容过大');
      let body; try {body=JSON.parse(raw);} catch {fail('请求 JSON 无效');}
      return Response.json(await service.dispatch(body,request.signal),{headers:{'cache-control':'no-store'}});
    } catch(e) {const error=errorResponse(e);return Response.json(error,{status:error.status,headers:{'cache-control':'no-store'}});}
  };
}
