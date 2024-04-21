import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavigation from './components/TopNavigation/TopNavigation';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TopNavigation></TopNavigation>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/> 
        <Route path="/login" element={<Login />} /> 
        
      </Routes>
    </BrowserRouter>
    <Footer></Footer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
