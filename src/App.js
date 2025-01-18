import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar"
import AuthProvider from "./hooks/authProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CameraPage from "./pages/CameraPage";


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
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
