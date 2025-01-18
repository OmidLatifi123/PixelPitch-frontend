import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pitch from "./components/Pitch";
import PitchLion from "./components/PitchLion";
import PitchOwl from "./components/PitchOwl";
import PitchTusk from "./components/PitchTusk";
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
          <Route path="/pitchowl" element={<PitchOwl />} />
          <Route path="/pitchtusk" element={<PitchTusk />} />
          </Routes>
    </Router>
  );
}

export default App;