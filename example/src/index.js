import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
    runtime.register();
}
