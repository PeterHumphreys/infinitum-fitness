import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/scss/styles.scss";
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom";
//Components

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App/>}/>
      </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);

