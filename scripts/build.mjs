import {build} from 'esbuild';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('lib',{recursive:true});
await build({entryPoints:['src/index.js'],outfile:'lib/index.js',bundle:true,format:'esm',platform:'node',target:'node22',external:['pg']});
const client=await build({entryPoints:['src/client/index.jsx'],bundle:true,write:false,format:'cjs',platform:'browser',target:'es2022',jsx:'automatic',external:['react','react/jsx-runtime','react-dom'],loader:{'.css':'text'}});
await writeFile('lib/client.js',`window.__ModuleLoader__.load({id:"dsh-pg-grid",factory:(require)=>{var module={exports:{}};var exports=module.exports;\n${client.outputFiles[0].text}\nreturn module.exports;}});\n`);
await build({entryPoints:['src/client/dev.jsx'],outfile:'lib/dev.js',bundle:true,format:'iife',platform:'browser',target:'es2022',jsx:'automatic',loader:{'.css':'text'}});
console.log('Built host, native DSH client and standalone verification client.');
