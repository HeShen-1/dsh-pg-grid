import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './app.jsx';
import css from './styles.css';
const style=document.createElement('style');style.textContent=css+'html,body,#root{margin:0;height:100%;}';document.head.append(style);
createRoot(document.getElementById('root')).render(<App/>);
