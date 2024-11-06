import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import DroneSpaceSimulator from "./simulators/DroneSpaceSimulator.jsx";

import HomePage from './home/dashboard/Homepage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/"      element={<HomePage />} />
        <Route path="/space" element={<DroneSpaceSimulator />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);