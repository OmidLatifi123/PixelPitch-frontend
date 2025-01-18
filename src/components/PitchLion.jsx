import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/PitchLion.css";

const PitchLion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [mascotMood, setMascotMood] = useState("Neutral");
  const [mascotResponse, setMascotResponse] = useState("");
  const [turnCount, setTurnCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Location state:', location.state); // Debug log
    if (location.state?.initialResponse) {
      const { message, mood, turn } = location.state.initialResponse;
      setMascotResponse(message);
      setMascotMood(mood);
      setTurnCount(turn);
    }
  }, [location.state]);

  const handleSend = async () => {
    if (turnCount >= 2) {
      setError("You have reached the maximum number of turns with Leo.");
      return;
    }

    if (!inputText.trim()) {
      setError("Please enter a message.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          mascot: 'lion',
          input: inputText.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      console.log('Server response:', data); // Debug log
      
      setMascotResponse(data.message);
      setMascotMood(data.mood || "Neutral");
      setInputText("");
      setTurnCount(data.turn);
      
      // If this was the last turn, show finish button
      if (data.isComplete) {
        setTimeout(() => {
          navigate("/completion");
        }, 3000);
      }
    } catch (err) {
      console.error('Error details:', err); // Debug log
      setError("Failed to communicate with Leo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pitch-page">
      <h1>Leo the Lion</h1>
      <h2>Visionary, Leader, Hustler</h2>
      <div className="canvas-container">
        <div className="mascot-turn">
          <div className="mascot-section">
            <img 
              src={`/Assets/Mascots/Lion/Lion-${mascotMood.toLowerCase()}.png`}
              alt={`Lion with ${mascotMood} mood`}
              className="mascot large"
            />
          </div>
          <div className="response-section">
            <div className="mood-box">Mood: {mascotMood}</div>
            <div className="speech-bubble large">
              <p>{mascotResponse || "Greetings! I'm Leo the Lion. What's your business pitch?"}</p>
            </div>
          </div>
        </div>
        <div className="text-input-container">
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="pitch-textbox"
            maxLength="200"
            disabled={isLoading || turnCount >= 2}
          />
          <div className="character-count">
            {inputText.length}/200 characters
          </div>
          <div className="button-container">
            <button
              onClick={handleSend}
              className="pitch-button send-button"
              disabled={isLoading || !inputText.trim() || turnCount >= 2}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchLion;