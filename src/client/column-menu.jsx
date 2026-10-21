import React,{useState,useEffect,useRef} from 'react';
import {valueRule} from './column-filters.js';
export function ColumnMenu({field,anchor,plan,loadValues,onApply,onClose}) {
  const root=useRef(null),[search,setSearch]=useState(''),[offset,setOffset]=useState(0),[choices,setChoices]=useState([]),[more,setMore]=useState(false),[loading,setLoading]=useState(false),[error,setError]=useState('');
  const existing=(plan.columnFilters??[]).find(c=>c.field===field.id);
  const saved=existing?.rule;
  const membership=saved?.rules?.find(r=>['in','notIn'].includes(r.op))??(['in','notIn'].includes(saved?.op)?saved:null);
  const savedValues=membership?[...membership.value,...(saved?.rules?.some(r=>membership.op==='in'?r.op==='isNull':r.op==='notNull')?[null]:[])]:[];
  const [mode,setMode]=useState(saved&&!membership?'condition':'values'),[all,setAll]=useState(membership?membership.op==='notIn':true),[exceptions,setExceptions]=useState(savedValues),[changed,setChanged]=useState(false),[op,setOp]=useState(!membership&&saved?.op||'contains'),[value,setValue]=useState(!membership&&saved?.value||'');
  useEffect(()=>{
    const old=document.activeElement; root.current?.focus();
    const outside=e=>{if(!root.current?.contains(e.target))onClose();};
    const escape=e=>{if(e.key==='Escape'){e.preventDefault();onClose();}};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);if(old?.isConnected)old.focus();};
  },[]);
  useEffect(()=>{const c=new AbortController();setLoading(true);setError('');setChoices([]);const timer=setTimeout(()=>loadValues(field.id,search,offset,c.signal).then(data=>{if(!c.signal.aborted){setChoices(data.values);setMore(data.hasMore);}}).catch(e=>{if(!c.signal.aborted)setError(e.message);}).finally(()=>{if(!c.signal.aborted)setLoading(false);}),150);return()=>{clearTimeout(timer);c.abort();};},[search,offset]);
  const apply=rule=>onApply({...plan,columnFilters:[...(plan.columnFilters??[]).filter(c=>c.field!==field.id),...(rule?[{field:field.id,rule}]:[])]});
  const sort=direction=>onApply({...plan,sort:[{field:field.id,direction},...(plan.sort??[]).filter(s=>s.field!==field.id)].slice(0,12)});
  return <div className="pg-column-menu" role="dialog" aria-label={`${field.name} 筛选菜单`} ref={root} tabIndex={-1} style={{left:Math.max(8,Math.min(anchor.left,window.innerWidth-316)),top:Math.max(8,Math.min(anchor.bottom,window.innerHeight-540)),maxHeight:'calc(100vh - 16px)'}}>
    <div className="pg-panel-heading"><strong>{field.name}</strong><button aria-label="关闭列筛选" onClick={onClose}>×</button></div>
    <div className="pg-line"><button onClick={()=>sort('asc')}>升序 ↑</button><button onClick={()=>sort('desc')}>降序 ↓</button><button onClick={()=>apply(null)}>清除本列筛选</button></div>
    {existing&&<p className="pg-muted">本列已有筛选；应用将替换本列筛选。</p>}
    <div className="pg-line pg-menu-modes"><button aria-pressed={mode==='values'} onClick={()=>setMode('values')}>按值筛选</button><button aria-pressed={mode==='condition'} onClick={()=>setMode('condition')}>条件筛选</button></div>
    {mode==='values'?<><input aria-label="搜索筛选值" placeholder="搜索候选值" value={search} onChange={e=>{setSearch(e.target.value);setOffset(0);}}/><label><input type="checkbox" checked={all&&exceptions.length===0} onChange={e=>{setAll(e.target.checked);setExceptions([]);setChanged(true);}}/>全选（所有值）</label><div className="pg-value-list">{loading?<p role="status">正在读取候选值…</p>:choices.map(v=><label key={JSON.stringify(v)}><input type="checkbox" checked={all?!exceptions.includes(v):exceptions.includes(v)} onChange={()=>{setExceptions(xs=>xs.includes(v)?xs.filter(x=>x!==v):[...xs,v]);setChanged(true);}}/><span title={v??'NULL'}>{v===null?'（空值 NULL）':v===''?'（空字符串）':v}</span></label>)}</div><div className="pg-line"><button disabled={!offset||loading} onClick={()=>setOffset(offset-100)}>上一组</button><span>第 {offset/100+1} 组</span><button disabled={!more||loading} onClick={()=>setOffset(offset+100)}>下一组</button></div>{!loading&&!error&&!choices.length&&<p>没有匹配的候选值</p>}</>:<div className="pg-rule"><select aria-label="列筛选条件" value={op} onChange={e=>setOp(e.target.value)}>{[['contains','包含'],['starts','开头是'],['ends','结尾是'],['eq','等于'],['ne','不等于'],['gt','大于 / 晚于'],['gte','大于等于'],['lt','小于 / 早于'],['lte','小于等于'],['isNull','为空'],['notNull','不为空']].map(([id,label])=><option key={id} value={id}>{label}</option>)}</select>{!['isNull','notNull'].includes(op)&&<input aria-label="列筛选条件值" value={value} onChange={e=>setValue(e.target.value)}/>}</div>}
    {error&&<p role="alert">{error}</p>}{exceptions.length>1000&&<p role="alert">最多勾选或排除 1,000 个值，请改用条件筛选。</p>}
    <div className="pg-menu-actions"><button onClick={onClose}>取消</button><button className="pg-primary" disabled={mode==='values'&&(!changed||!!error||loading||exceptions.length>1000)} onClick={()=>apply(mode==='condition'?{field:field.id,op,...(!['isNull','notNull'].includes(op)?{value}:{})}:all&&!exceptions.length?null:valueRule(field.id,exceptions,all))}>应用筛选</button></div>
  </div>;
}
