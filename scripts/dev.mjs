import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {GridService,fetchHandler} from '../src/service.js';
const port=Number(process.env.PG_GRID_PORT||3187),service=await new GridService({directory:process.env.PG_GRID_DATA||'.local',aiEnabled:false}).init(),handler=fetchHandler(service);
const server=createServer(async(req,res)=>{
 try{
  if(!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress)||!['127.0.0.1:'+port,'localhost:'+port].includes(req.headers.host)){res.writeHead(403);res.end();return;}
  if(req.headers.origin&&!['http://127.0.0.1:'+port,'http://localhost:'+port].includes(req.headers.origin)){res.writeHead(403);res.end();return;}
  if(req.url==='/api/pg-grid'&&req.method==='POST'){
   if(req.headers['content-type']!=='application/json'){res.writeHead(415);res.end();return;}
   const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>1000000){res.writeHead(413);res.end();return;}chunks.push(chunk);}
   const controller=new AbortController();res.on('close',()=>{if(!res.writableEnded)controller.abort();});
   const response=await handler(new Request('http://127.0.0.1:'+port+req.url,{method:'POST',headers:{'content-type':'application/json'},body:Buffer.concat(chunks),signal:controller.signal}));
   res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));return;
  }
  if(req.url==='/lib/dev.js'){res.writeHead(200,{'content-type':'text/javascript'});res.end(await readFile(new URL('../lib/dev.js',import.meta.url)));return;}
  if(req.url==='/'){res.writeHead(200,{'content-type':'text/html; charset=utf-8'});res.end('<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PG Grid · 本地验证</title></head><body><div id="root"></div><script src="/lib/dev.js"></script></body></html>');return;}
  res.writeHead(404);res.end();
 }catch{res.writeHead(500);res.end('Local verification server failed');}
});
server.listen(port,'127.0.0.1',()=>console.log(`PG Grid verification server http://127.0.0.1:${port} (AI disabled)`));
async function stop(){server.close();await service.dispose();process.exit(0);}process.on('SIGINT',stop);process.on('SIGTERM',stop);
