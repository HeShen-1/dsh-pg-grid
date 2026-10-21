import { join } from 'node:path';
import { homedir } from 'node:os';
import { GridService, fetchHandler } from './service.js';
import { modelAdapter, modelCatalog } from './ai.js';
import {validationBudget} from './ai-validation.js';
export const name = 'pg-grid';
export const inject = ['connection'];
export async function apply(ctx, config = {}) {
  const directory=config.dataDir || join(process.env.DSH_HOME || join(homedir(),'.dsh'),'pg-grid');
  const validation=await validationBudget(join(directory,'ai-validation.json'));
  const service = await new GridService({ directory, model:modelAdapter(ctx,validation), models:modelCatalog(ctx), aiEnabled:!!validation || config.aiEnabled === true }).init();
  const handler = fetchHandler(service);
  ctx.effect(() => {
    const remove=ctx.connection.fetch.register({path:'/api/pg-grid',methods:['POST'],requestBody:'buffered',fetch:handler});
    return async () => {await remove();await service.dispose();};
  },'pg-grid: authenticated read-only workspace');
}
