import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import DroneSpaceSimulator from "./simulators/DroneSpaceSimulator.jsx";
import DroneSlateSimulator from "./simulators/DroneSlateSimulator.jsx";
import DroneEgyptSimulator from "./simulators/DroneEgyptSimulator.jsx";
import DroneCitySimulator from "./simulators/DroneCitySimulator.jsx";
import DroneMountainSimulator from "./simulators/DroneMountainSimulator.jsx";

import HomePage from "./home/dashboard/Homepage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/space" element={<DroneSpaceSimulator />} />
        <Route path="/slate" element={<DroneSlateSimulator />} />
        <Route path="/egypt" element={<DroneEgyptSimulator />} />
        <Route path="/city/home" element={<DroneCitySimulator />} />
        <Route path="/city/shopping_center" element={<DroneCitySimulator />} />
        <Route path="/city/food_court" element={<DroneCitySimulator />} />
        <Route path="/himalayas" element={<DroneMountainSimulator />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
