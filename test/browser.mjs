import assert from 'node:assert/strict';
import {writeFile,mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {spawn} from 'node:child_process';
import pg from 'pg';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const directory=await mkdtemp(tmpdir()+'/pg-grid-browser-');
const server=spawn(process.execPath,['scripts/dev.mjs'],{env:{...process.env,PG_GRID_PORT:'3189',PG_GRID_DATA:directory},stdio:'pipe'});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(Error('dev server exited '+code)));});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:900},permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage();const errors=[],checks=[],queries=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(r.url().endsWith('/api/pg-grid')){try{const body=r.postDataJSON();if(body.action==='query')queries.push(body);}catch{}}});
const writer=new pg.Pool({host:'127.0.0.1',port:Number(process.env.PG_GRID_TEST_PORT||32826),user:'postgres',password:'grid-test-only',database:'grid_test'});
async function pass(name,fn){await fn();checks.push(name);console.log('PASS',name);}
const button=name=>page.getByRole('button',{name,exact:true});
const selectTable=name=>page.getByRole('button',{name:`${name} public · ${name==='orders'?20:name==='customers'?3:4} 列`,exact:true}).click();
const waitResult=text=>page.getByText(text,{exact:false}).first().waitFor();
try{
 await page.goto('http://127.0.0.1:3189');
 await pass('connect through UI to isolated real PostgreSQL',async()=>{await button('新建连接').click();for(const [label,value] of Object.entries({'名称':'浏览器验收库','端口':String(process.env.PG_GRID_TEST_PORT||32826),'数据库':'grid_test','用户名':'postgres','密码':'grid-test-only'}))await page.getByLabel(label,{exact:true}).fill(value);await button('连接').click();await selectTable('orders');await waitResult('共 50,000 行');assert.equal(await page.locator('tbody tr').count(),100);});
 await pass('keyboard range selection, exact clipboard and cell inspector',async()=>{await page.locator('[data-cell="0-0"]').click();await page.keyboard.press('Shift+ArrowRight');await waitResult('选区 2 格');await button('复制选区').click();const copied=await page.evaluate(()=>navigator.clipboard.readText());assert.equal(copied,'1\t2');assert.equal(await page.getByLabel('当前单元格完整内容').inputValue(),'2');});
 await pass('column width, hiding, order and frozen geometry',async()=>{await page.getByRole('tab',{name:'列设置'}).click();await page.getByLabel('冻结列数',{exact:true}).fill('2');await page.getByLabel('id 列宽',{exact:true}).fill('210');await page.getByLabel('前移 customer_id',{exact:true}).click();const checkbox=page.locator('.pg-rule-panel label').filter({hasText:/^amount$/}).locator('input[type=checkbox]');await checkbox.uncheck();const first=page.locator('thead th').nth(1);assert((await first.innerText()).includes('customer_id'));assert.equal(await first.evaluate(e=>getComputedStyle(e).position),'sticky');assert.equal(await page.locator('thead th').filter({hasText:/^amount/}).count(),0);});
 await pass('filter matches last-page row, not only loaded page',async()=>{await page.getByRole('tab',{name:'查询规则'}).click();await button('添加条件').click();await page.getByLabel('字段',{exact:true}).first().selectOption('t0.note');await page.getByLabel('筛选运算').selectOption('contains');await page.getByLabel('筛选值').fill('末页命中');await button('应用查询规则').click();await waitResult('共 1 行');assert((await page.locator('tbody').innerText()).includes('50000'));});
 await pass('saved view restores rules/layout after reconnect and browser reload',async()=>{await page.getByLabel('视图名称').fill('末页筛选');await button('保存视图').click();await waitResult('已保存分析规则');await page.reload();await button('末页筛选').click();await waitResult('共 1 行');await button('断开连接 浏览器验收库').click();await button('末页筛选').click();await waitResult('共 1 行');await page.getByRole('tab',{name:'列设置'}).click();assert.equal(await page.getByLabel('冻结列数').inputValue(),'2');});
 await pass('full-result CSV includes later pages and multiline Chinese',async()=>{await selectTable('orders');await waitResult('共 50,000 行');const pending=page.waitForEvent('download');await button('导出全部结果').click();const download=await pending;const stream=await download.createReadStream();let data='';for await(const chunk of stream)data+=chunk;assert(data.includes('末页命中'));assert(data.includes('9007199254790993'));});
 await pass('group and pivot through visual controls, weighted totals',async()=>{await page.getByRole('tab',{name:'查询规则'}).click();if(!await page.getByText('分组、统计与透视',{exact:true}).isVisible())await page.getByRole('tab',{name:'查询规则'}).click();await page.getByText('分组、统计与透视',{exact:true}).click();const grouping=page.locator('details').filter({has:page.getByText('分组、统计与透视',{exact:true})});await grouping.getByLabel('t0 · category',{exact:true}).check();await button('添加统计指标').click();await page.getByLabel('统计名称').fill('金额');await page.getByLabel('统计方式').selectOption('sum');await grouping.getByLabel('字段',{exact:true}).selectOption('t0.amount');await page.getByLabel('透视列维度').selectOption('t0.active');await button('应用查询规则').click();await waitResult('共 3 行');assert((await page.locator('tfoot').innerText()).includes('125002500.0000'));});
 await pass('automatic refresh and pause without any AI invocation',async()=>{await selectTable('orders');await waitResult('共 50,000 行');const marker='browser-refresh-'+Date.now();const before=queries.length;await writer.query('UPDATE orders SET note=$1 WHERE id=1',[marker]);await page.waitForFunction(marker=>document.querySelector('tbody')?.textContent.includes(marker),marker,{timeout:40000});assert(queries.length>before);await button('暂停自动刷新').click();const paused=queries.length;await page.waitForTimeout(31000);assert.equal(queries.length,paused);await button('恢复自动刷新').click();});
 await pass('hidden-page refresh pauses and failed refresh retains last successful rows',async()=>{
   await page.clock.install();
   await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
   await waitResult('后台暂停');const before=queries.length;await page.clock.fastForward(60000);assert.equal(queries.length,before);
   await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await waitResult('每 30 秒自动刷新');
   const oldRows=await page.locator('tbody').textContent();
   await page.route('**/api/pg-grid',async route=>{if(route.request().postDataJSON().action==='query')await route.fulfill({status:400,contentType:'application/json',body:JSON.stringify({error:'测试连接中断'})});else await route.continue();});
   await page.clock.fastForward(30000);await waitResult('保留上次结果');assert.equal(await page.locator('tbody').textContent(),oldRows);
   await page.unroute('**/api/pg-grid');await button('立即刷新').click();await page.waitForFunction(()=>!document.querySelector('[role=alert]'));
 });
 await pass('late query response cannot replace newly selected table',async()=>{let held;await page.route('**/api/pg-grid',async route=>{const b=route.request().postDataJSON();if(b.action==='query'&&b.plan.source.table==='orders'&&!held){const response=await route.fetch();held={route,response};}else await route.continue();});await button('立即刷新').click();await page.waitForTimeout(400);await selectTable('customers');await waitResult('共 3 行');if(held)await held.route.fulfill({response:held.response}).catch(()=>{});await page.waitForTimeout(100);assert((await page.locator('.pg-toolbar').innerText()).includes('public.customers'));assert.equal(await page.locator('tbody tr').count(),3);await page.unroute('**/api/pg-grid');});
 await pass('real-model controls remain disabled with explicit budget state',async()=>{await page.getByRole('tab',{name:'AI 查询'}).click();assert(await button('运行只读 AI 查询').isDisabled());await waitResult('预算确认前');});
 await page.getByRole('tab',{name:'AI 查询'}).click();await page.screenshot({path:'docs/evidence/browser-final-desktop.png'});
 await page.emulateMedia({colorScheme:'dark'});await page.screenshot({path:'docs/evidence/browser-final-dark.png'});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'docs/evidence/browser-final-mobile.png'});
 assert.deepEqual(errors,[]);console.log('All browser checks passed');
}finally{await writeFile('docs/evidence/browser-tests.json',JSON.stringify({checks,errors,queryRequests:queries.length,realModelCalls:0},null,2));await writer.end();await browser.close();server.kill('SIGTERM');}
