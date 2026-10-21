import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,stat,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {GridService} from '../src/service.js';

test('remembered credentials survive service restart without API disclosure, and can be forgotten',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'pg-grid-credentials-'));
 const passwords=[];
 const poolFactory=config=>{passwords.push(config.password);return {end:async()=>{},connect:async()=>({on(){},removeListener(){},release(){},query:async sql=>({rows:sql==='SHOW timezone'?[{TimeZone:'UTC'}]:[]})})};};
 let first,second;
 try{
  first=await new GridService({directory,poolFactory}).init();
  const input={port:5433,user:'test',database:'test',password:'test-secret-only',rememberPassword:true};
  const {connection}=await first.dispatch({action:'connect',connection:input});
  assert.equal(connection.hasSavedPassword,true);
  assert(!JSON.stringify(await first.dispatch({action:'state'})).includes(input.password));
  assert(!JSON.stringify(connection).includes(input.password));
  assert(!String(await readFile(join(directory,'views.json'))).includes(input.password));
  assert.equal((await stat(join(directory,'credentials.json'))).mode&0o777,0o600);
  await first.dispose();
  second=await new GridService({directory,poolFactory}).init();
  await second.dispatch({action:'catalog',connectionId:connection.id});assert.equal(passwords.at(-1),input.password);
  await second.dispatch({action:'connect',connection:{...connection,password:'',rememberPassword:true}});assert.equal(passwords.at(-1),input.password);
  await second.dispatch({action:'connect',connection:{...connection,password:input.password,rememberPassword:false}});
  assert.equal((await second.dispatch({action:'state'})).connections[0].hasSavedPassword,false);
  assert.deepEqual(JSON.parse(await readFile(join(directory,'credentials.json'),'utf8')),{});
  await second.dispatch({action:'connect',connection:{...connection,password:input.password,rememberPassword:true}});
  await second.dispatch({action:'removeConnection',connectionId:connection.id});
  assert.deepEqual(JSON.parse(await readFile(join(directory,'credentials.json'),'utf8')),{});
 }finally{await first?.dispose();await second?.dispose();await rm(directory,{recursive:true,force:true});}
});
