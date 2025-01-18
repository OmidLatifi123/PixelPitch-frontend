import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pitch from "./components/Pitch";
import PitchLion from "./components/PitchLion";
import PitchOwl from "./components/PitchOwl";
import PitchTusk from "./components/PitchTusk";
import Navbar from "./components/Navbar";
import "./App.css";
import Homepage from "./pages/Home";
import AuthProvider from "./hooks/authProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CameraPage from "./pages/CameraPage";
import EntrepreneurPage from "./pages/EntrepreneurDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/mockInterview" element={<CameraPage/>}/>
          <Route path="/pitch" element={<Pitch />} />
          <Route path="/pitchlion" element={<PitchLion />} />
          <Route path="/pitchowl" element={<PitchOwl />} />
          <Route path="/pitchtusk" element={<PitchTusk />} />
          <Route path="/entrepreneur" element={<EntrepreneurPage/>}/>
          <Route path="/investor" element={<InvestorDashboard/>}/>
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;