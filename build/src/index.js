import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './paginate.css';
import App from './App';
import {  HashRouter } from 'react-router-dom';
import AppContextProvider from './contextApi/ContextProvider'
import './assets/css/custom-variables.scss'
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'swiper/css';
import 'swiper/css/bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <AppContextProvider>
    <App />
    </AppContextProvider>
    </HashRouter>
  </React.StrictMode>
);

