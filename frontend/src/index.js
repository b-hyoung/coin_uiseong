import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // react-router-dom에서 import 해야 함

async function prepare() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

prepare().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});
