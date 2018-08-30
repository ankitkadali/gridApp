import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import ChartComponent from './ChartComponent';
import ContextMenu from './contextmenu.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<ChartComponent />, document.getElementById('root1'));

registerServiceWorker();
