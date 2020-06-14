import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css';
import { StoreProvider } from './store/index';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
