import React from 'react';
import ReactDOM from 'react-dom';
// import Router from './components/Router';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
