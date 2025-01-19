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
import EntrepreneurPage from "./pages/EntrepreneurPage";
import InvestorDashboard from "./pages/InvestorDashboard";
import PitchSummary from "./components/PitchSummary";
import InvestorMatchesPage from "./pages/InvestorMatchesPage";
import InvestorDashboardPage from "./pages/InvestorDashboard";
import InvestorPreferences from "./components/investorPreference";

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
          <Route path="/pitchsummary" element={<PitchSummary />} />
          <Route path="/entrepreneur" element={<EntrepreneurPage/>}/>
          <Route path="/investor" element={<InvestorDashboard/>}/>
          <Route path="/pitchsummary" element={<PitchSummary />} />
          <Route path="/matches" element={<InvestorMatchesPage/>}/>
          <Route path="/investorinfo" element={<InvestorPreferences/>}/>
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;