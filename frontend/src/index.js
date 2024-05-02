import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import App from './pages/ChatAppScreen';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
