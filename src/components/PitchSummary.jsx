import React, { useEffect, useState } from "react";
import "./CSS/PitchSummary.css";
import { CheckCircle } from "lucide-react";
import { useAuth } from "../hooks/authProvider";
import { useNavigate } from "react-router-dom";
const PitchSummary = () => {
  const [summaryData, setSummaryData] = useState({
    mascot_responses: {
      lion: { response: "No response yet from Leo the Lion", mood: "Neutral" },
      owl: { response: "No response yet from Oliver the Owl", mood: "Neutral" },
      tusk: { response: "No response yet from Tommy the Tusk", mood: "Neutral" },
    },
    summary: "Summary not available.",
    business_pitch: "Business pitch not available.",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("http://localhost:5004/generate-summary");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSummaryData(data);
      } catch (err) {
        setError(err.message); // Capture error for display
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const { user } = useAuth();

  // Helper function to get mascot image based on mood
  const getMascotImage = (mascot, mood) => {
    const normalizedMood = mood?.toLowerCase() || "neutral";
    return `/Assets/Mascots/${mascot}/${mascot}-${normalizedMood}.png`;
  };

  const handleSubmitPitch = async () => {
    try {
      const companyName = localStorage.getItem("companyName");
      const userEmail = localStorage.getItem("userEmail");
      console.log(userEmail)
      if (!companyName) throw new Error("Company name not found");

      const response = await fetch("http://localhost:5002/processMatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName,userEmail }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Match processed successfully:", data);
      alert("Pitch successfully submitted and processed for evaluation!");
      navigate("/entrepreneur");
    } catch (error) {
      console.error("Error submitting pitch:", error.message);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const { mascot_responses: mascotResponses, summary, business_pitch: pitch } = summaryData;

  return (
    <div className="summary-page">
      <h1 className="summary-title">Pitch Summary</h1>
      {loading && <div className="loading-message">Loading...</div>}
      <div className="summary-canvas-container">
        <div className="summary-mascots-container">
          {[
            { id: "lion", name: "Leo the Lion", adjectives: "Visionary • Strategic • Hustler" },
            { id: "owl", name: "Professor Hoot", adjectives: "Technical • Analytical • Mild Stutter" },
            { id: "tusk", name: "Mr. Tusk", adjectives: "Financial • Pragmatic • Meticulous" },
          ].map((mascot) => (
            <div key={mascot.id} className="summary-mascot-column">
              <div className="summary-mascot-name">
                {mascot.name}
                <div className="summary-mascot-adjectives">{mascot.adjectives}</div>
              </div>
              <div className="summary-mood-box">
                Mood: {mascotResponses[mascot.id]?.mood || "Neutral"}
              </div>
              <div className="summary-response-box">
                {mascotResponses[mascot.id]?.response || `No response yet from ${mascot.name}`}
              </div>
              <img
                src={getMascotImage(mascot.id, mascotResponses[mascot.id]?.mood)}
                alt={mascot.name}
                className="summary-mascot-image"
              />
            </div>
          ))}
        </div>
        <div className="summary-text-section">
          <h2 className="summary-subtitle">Summary of Pitch</h2>
          <p className="summary-content">{summary}</p>
          <h3 className="summary-content-h3">Business Pitch:</h3>
          <p className="summary-content-p">{pitch}</p>
        </div>
      </div>
      <div className="summary-footer">
        <button
          className="submit-button flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-opacity"
          onClick={handleSubmitPitch}
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Close & Submit Pitch for Evaluation
        </button>
      </div>
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <p>
            Please ensure the backend summary server is running on{" "}
            <code>http://localhost:5004</code> and try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default PitchSummary;
