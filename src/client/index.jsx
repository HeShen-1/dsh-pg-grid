import React,{useSyncExternalStore} from 'react';
import {App} from './app.jsx';
import css from './styles.css';
export const name='pg-grid';
export const inject=['slots','layout','sessions'];
function Icon({size=20}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 4v16M15 9v11"/></svg>;}
export function apply(ctx){
  const slots=ctx.get('slots'),layout=ctx.get('layout'),sessions=ctx.get('sessions');
  ctx.effect(()=>{const style=document.createElement('style');style.dataset.pgGrid='true';style.textContent=css;document.head.append(style);return()=>style.remove();},'pg-grid: styles');
  function Panel(){
    const selected=useSyncExternalStore(cb=>layout.panelInfo.subscribe(cb),()=>layout.panelInfo.getSnapshot().activePanelId);
    const sessionId=useSyncExternalStore(cb=>sessions.list.subscribe(cb),()=>Object.values(sessions.list.getSnapshot().byId).find(s=>(s.retainedBy.mainView??0)>0)?.id??'');
    return <App active={selected==='pg-grid'} sessionId={sessionId}/>;
  }
  slots.inject('main',()=>slots.register({name:'main',key:'pg-grid'},Panel));
  slots.inject('sidebar.panellist',()=>slots.register({name:'sidebar.panellist',id:'pg-grid',order:10,label:()=> '数据表'},Icon));
}
