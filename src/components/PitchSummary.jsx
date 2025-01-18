import React, { useEffect, useState } from "react";
import "./CSS/PitchSummary.css";

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

  // Fetch summary data from the backend
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

  // Helper function to get mascot image based on mood
  const getMascotImage = (mascot, mood) => {
    const normalizedMood = mood?.toLowerCase() || "neutral";
    return `/Assets/Mascots/${mascot}/${mascot}-${normalizedMood}.png`;
  };

  const { mascot_responses: mascotResponses, summary, business_pitch: pitch } = summaryData;

  return (
    <div className="summary-page">
      <h1 className="summary-title">Pitch Summary</h1>
      {loading && <div className="loading-message">Loading...</div>}
      <div className="summary-canvas-container">
        <div className="summary-mascots-container">
          {/* Mascot Sections */}
          {["lion", "owl", "tusk"].map((mascot) => (
            <div key={mascot} className="summary-mascot-column">
              <div className="summary-mood-box">
                Mood: {mascotResponses[mascot]?.mood || "Neutral"}
              </div>
              <div className="summary-response-box">
                {mascotResponses[mascot]?.response || `No response yet from ${mascot}`}
              </div>
              <img
                src={getMascotImage(mascot, mascotResponses[mascot]?.mood)}
                alt={mascot}
                className="summary-mascot-image"
              />
            </div>
          ))}
        </div>
        <div className="summary-text-section">
          <h2 className="summary-subtitle">Summary of Pitch</h2>
          <p className="summary-content">{summary}</p>
          <h3>Business Pitch:</h3>
          <p>{pitch}</p>
        </div>
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