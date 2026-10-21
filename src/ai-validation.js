import {readFile,writeFile,rename} from 'node:fs/promises';
import {fail} from './query.js';
// Explicit, local validation authorization. Reservations survive plugin reloads.
export async function validationBudget(path) {
  let initial;try{initial=JSON.parse(await readFile(path,'utf8'));}catch(e){if(e.code==='ENOENT')return null;throw e;}
  if(!initial.enabled)return null;
  let queue=Promise.resolve();
  const update=fn=>{const task=queue.then(async()=>{const data=JSON.parse(await readFile(path,'utf8'));const result=fn(data);await writeFile(path+'.tmp',JSON.stringify(data,null,2),{mode:0o600});await rename(path+'.tmp',path);return result;});queue=task.catch(()=>{});return task;};
  return {
    reserve:({selection,system,input})=>update(data=>{
      if(!data.enabled||data.provider!==selection.provider||data.model!==selection.model||data.calls.length>=Math.min(3,data.maxCalls)||data.calls.some(c=>c.status==='started'))fail('本次联调授权不可用或次数已用完','AI_BUDGET',403);
      const bytes=Buffer.byteLength(system+JSON.stringify(input));
      if(bytes>16000||input.sample?.length)fail('本次联调仅允许有限表结构，不共享结果行','AI_BUDGET',403);
      if((data.calls.length+1)*0.2>Math.min(1,data.maxCny))fail('本次联调预算不足','AI_BUDGET',403);
      const id=data.calls.length+1;data.calls.push({id,status:'started',at:new Date().toISOString(),inputBytes:bytes,reservedCny:0.2,request:input.request});return id;
    }),
    finish:(id,details)=>update(data=>{Object.assign(data.calls.find(c=>c.id===id),details,{finishedAt:new Date().toISOString()});})
  };
}
