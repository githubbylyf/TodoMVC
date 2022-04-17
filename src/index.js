import React from 'react';
import { createRoot } from 'react-dom/client'
//import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('items');
const root = createRoot(container);
root.render(<App />);


/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/


reportWebVitals();
