import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure that the root element exists in your index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Make sure your index.html contains a div with id='root'.");
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
