import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {validationBudget} from '../src/ai-validation.js';
test('validation reservations persist, reject wrong routes/concurrency/oversize, and never exceed three calls',async()=>{
 const dir=await mkdtemp('/tmp/pg-budget-'),path=dir+'/budget.json';
 try{
 await writeFile(path,JSON.stringify({enabled:true,provider:'p',model:'m',maxCalls:3,maxCny:1,calls:[]}));
 const b=await validationBudget(path),args={selection:{provider:'p',model:'m'},system:'s',input:{request:'r',sample:[]}};
 await assert.rejects(()=>b.reserve({...args,selection:{provider:'other',model:'m'}}));
 await assert.rejects(()=>b.reserve({...args,system:'x'.repeat(16001)}));
 await assert.rejects(()=>b.reserve({...args,input:{sample:[{secret:'x'}]}}));
 for(let i=1;i<=3;i++){const id=await b.reserve(args);assert.equal(id,i);await assert.rejects(()=>b.reserve(args));await b.finish(id,{status:i===1?'failed':'completed'});}
 await assert.rejects(()=>(validationBudget(path)).then(x=>x.reserve(args)));
 const ledger=JSON.parse(await readFile(path));assert.equal(ledger.calls.length,3);assert(ledger.calls.reduce((s,c)=>s+c.reservedCny,0)<=1);
 }finally{await rm(dir,{recursive:true,force:true});}
});
