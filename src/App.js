import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar"


function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          </Routes>
    </Router>
  );
}

export default App;
