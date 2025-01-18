import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pitch from "./components/Pitch";
import PitchLion from "./components/PitchLion";
import Navbar from "./components/Navbar";
import "./App.css";
import Homepage from "./pages/Home";



function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/pitch" element={<Pitch />} />
          <Route path="/pitchlion" element={<PitchLion />} />
          </Routes>
    </Router>
  );
}

export default App;