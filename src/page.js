// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';



const myApp = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </div>
  );
};

export default myApp;
reportWebVitals();
