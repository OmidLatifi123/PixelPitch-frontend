import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pitch from "./components/Pitch";
import PitchLion from "./components/PitchLion";
import PitchOwl from "./components/PitchOwl";
import PitchTusk from "./components/PitchTusk";
import Navbar from "./components/Navbar";
import "./App.css";
import Homepage from "./pages/Home";

import Navbar from "./components/Navbar"
import AuthProvider from "./hooks/authProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/pitch" element={<Pitch />} />
          <Route path="/pitchlion" element={<PitchLion />} />
          <Route path="/pitchowl" element={<PitchOwl />} />
          <Route path="/pitchtusk" element={<PitchTusk />} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;