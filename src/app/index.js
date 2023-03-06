import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './app';


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
