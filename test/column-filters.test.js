import test from 'node:test';
import assert from 'node:assert/strict';
import {compile} from '../src/query.js';
import {valueRule} from '../src/client/column-filters.js';
import {modelAdapter,modelCatalog} from '../src/ai.js';
const catalog=[{schema:'public',name:'items',columns:[{name:'name',type:'text'},{name:'amount',type:'numeric'}]}];
const base={source:{schema:'public',table:'items',alias:'t0'}};
test('header filters preserve OR rules, bind values and use independent warning parameters',()=>{
 const q=compile({...base,filters:{mode:'or',rules:[{field:'t0.amount',op:'gt',value:'100'},{field:'t0.name',op:'eq',value:'keep'}]},columnFilters:[{field:'t0.name',rule:valueRule('t0.name',[null,"'; DROP TABLE items;--"])}]},catalog);
 assert.deepEqual(q.warningsValues,['100','keep']);assert.equal(q.values.length,3);assert(!q.sql.includes('DROP'));assert.match(q.sql,/OR/);assert.match(q.sql,/column_result WHERE/);assert.match(q.countSql,/column_result WHERE/);
});
test('include/exclude values distinguish NULL, empty strings and deselect all',()=>{
 for(const exclude of [true,false])for(const vals of [[],[null],[''],[null,'x']]){
  const q=compile({...base,columnFilters:[{field:'t0.name',rule:valueRule('t0.name',vals,exclude)}]},catalog);
  assert.deepEqual(q.values,vals.filter(x=>x!==null));assert(!q.values.includes(null));
 }
 assert.match(compile({...base,columnFilters:[{field:'t0.name',rule:valueRule('t0.name',[],false)}]},catalog).sql,/WHERE FALSE/);
});
test('aggregate output filters run after aggregation and reject unrelated fields',()=>{
 const p={...base,groupBy:['t0.name'],measures:[{name:'sum',fn:'sum',field:'t0.amount'}],columnFilters:[{field:'sum',rule:{field:'sum',op:'gt',value:'9007199254740993.123'}}]};
 assert.match(compile(p,catalog).sql,/GROUP BY.*column_result WHERE "sum" > \$1/);
 assert.throws(()=>compile({...base,columnFilters:[{field:'t0.name',rule:{field:'t0.amount',op:'eq',value:1}}]},catalog));
 assert.throws(()=>compile({...p,columnFilters:[{field:'t0.amount',rule:{field:'t0.amount',op:'eq',value:1}}]},catalog));
});
test('catalog metadata does not invoke inference, isolate failed provider, expose no credentials',async()=>{
 let calls=0;const llm={listProviders:()=>[{id:'a',name:'A',secret:'do-not-return'},{id:'b',name:'B'}],listModels:async id=>{if(id==='b')throw Error('credential-like error');return [{id:'one',name:'One',secret:'do-not-return'}];},stream:()=>{calls++;}};
 assert.deepEqual(await modelCatalog({get:()=>llm})(),{groups:[{id:'a',name:'A',models:[{id:'one',name:'One'}]}],unavailable:['B']});assert.equal(calls,0);
});
test('explicit model overrides session model and unavailable choices never invoke inference',async()=>{
 let calls=0,route;const llm={listProviders:()=>[{id:'a',name:'A'}],listModels:async()=>[{id:'one',name:'One'}],async *stream(args){calls++;route=args;yield {type:'text-delta',text:'{}'};}};
 const model=modelAdapter({get:k=>k==='llm'?llm:undefined});const args={system:'rules',input:{},signal:new AbortController().signal,selection:{provider:'a',model:'one'}};
 assert.equal(await model(args),'{}');assert.equal(route.model,'one');assert.equal(calls,1);
 await assert.rejects(()=>model({...args,selection:{provider:'a',model:'missing'}}));assert.equal(calls,1);
});
