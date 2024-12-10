import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the ReactDOM library for rendering in React 18+
import App from './App';
import './index.css';  

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);  // Get the root div from index.html

root.render(
  <React.StrictMode>
    <App />  
  </React.StrictMode>
);
