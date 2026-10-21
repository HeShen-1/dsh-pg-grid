import Decimal from 'decimal.js';
Decimal.set({precision:100});
export const text = v => v === null || v === undefined ? '\\N' : typeof v === 'object' ? JSON.stringify(v) : String(v);
export const fieldOptions = (plan, catalog) => [...[plan?.source,...(plan?.joins??[])].filter(Boolean).flatMap(s=>(catalog.find(t=>t.schema===s.schema&&t.name===s.table)?.columns??[]).map(c=>({id:`${s.alias}.${c.name}`,name:`${s.alias} · ${c.name}`,type:c.type}))),...(plan?.computed??[]).map(c=>({id:`calc.${c.name}`,name:c.name,type:'computed'}))];
export const basePlan = t => ({source:{schema:t.schema,table:t.name,alias:'t0'},joins:[],filters:{mode:'and',rules:[]},computed:[],groupBy:[],measures:[],sort:[]});
export function selectionBounds(selection) {return selection ? {r0:Math.min(selection[0],selection[2]),r1:Math.max(selection[0],selection[2]),c0:Math.min(selection[1],selection[3]),c1:Math.max(selection[1],selection[3])} : null;}
export function rangeValues(rows,fields,selection) {const b=selectionBounds(selection);return b?rows.slice(b.r0,b.r1+1).map(r=>fields.slice(b.c0,b.c1+1).map(f=>r[f.id])):[];}
export function selectionStats(values) {const vals=values.flat();let sum=new Decimal(0),count=0;for(const v of vals){if(v!==null&&v!==undefined&&/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(String(v))){sum=sum.plus(String(v));count++;}}return {cells:vals.length,count,sum:sum.toString(),avg:count?sum.div(count).toString():''};}
export function clipboard(values) {return values.map(r=>r.map(v=>{const s=text(v);return /[\t\n\r"]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;}).join('\t')).join('\n');}

export function editablePlan(plan) { return {joins:[],computed:[],groupBy:[],measures:[],sort:[],...plan,filters:plan.filters?.field?{mode:'and',rules:[plan.filters]}:(plan.filters??{mode:'and',rules:[]})}; }
