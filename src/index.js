import { join } from 'node:path';
import { homedir } from 'node:os';
import { GridService, fetchHandler } from './service.js';
import { modelAdapter } from './ai.js';
export const name = 'pg-grid';
export const inject = ['connection'];
export async function apply(ctx, config = {}) {
  const service = await new GridService({ directory: config.dataDir || join(process.env.DSH_HOME || join(homedir(),'.dsh'),'pg-grid'), model:modelAdapter(ctx), aiEnabled:config.aiEnabled === true }).init();
  const handler = fetchHandler(service);
  ctx.effect(() => {
    const remove=ctx.connection.fetch.register({path:'/api/pg-grid',methods:['POST'],requestBody:'buffered',fetch:handler});
    return async () => {await remove();await service.dispose();};
  },'pg-grid: authenticated read-only workspace');
}
