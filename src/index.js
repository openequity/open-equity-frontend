import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import Header from './components/Header';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div><Header /><App /></div>, document.getElementById('root'));
registerServiceWorker();
