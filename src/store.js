import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { fail } from './query.js';
export class Store {
  constructor(directory) { this.directory = directory; this.path = join(directory, 'views.json'); this.data = { connections: [], views: [] }; this.queue = Promise.resolve(); }
  async load() {
    try { this.data = JSON.parse(await readFile(this.path, 'utf8')); if (!Array.isArray(this.data.connections) || !Array.isArray(this.data.views)) throw Error(); }
    catch(e) { if (e.code !== 'ENOENT') fail('本地配置无法读取；保留原文件，请检查 views.json', 'STORE', 500); }
    return this;
  }
  async save() {
    const snapshot = JSON.stringify(this.data, null, 2);
    const write = async () => { await mkdir(this.directory, { recursive: true, mode: 0o700 }); const temp = join(this.directory, `.${randomUUID()}.tmp`); await writeFile(temp, snapshot, { mode: 0o600 }); await rename(temp, this.path); };
    this.queue = this.queue.catch(()=>{}).then(write); return this.queue;
  }
}

// Kept separate from view metadata; never returned by the service API.
export class CredentialStore extends Store {
  constructor(directory) { super(directory); this.path=join(directory,'credentials.json'); this.data={}; }
  async load() {
    try { const data=JSON.parse(await readFile(this.path,'utf8')); if(!data||Array.isArray(data)||typeof data!=='object'||Object.values(data).some(v=>typeof v!=='string'))throw Error();this.data=data; }
    catch(e){if(e.code!=='ENOENT')fail('本机凭据无法读取，请检查 credentials.json','STORE',500);}
    return this;
  }
}
