import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/PitchLion.css";

const PitchOwl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [mascotMood, setMascotMood] = useState("Neutral");
  const [mascotResponse, setMascotResponse] = useState("");
  const [turnCount, setTurnCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialRequestMade = useRef(false);

  useEffect(() => {
    const getInitialResponse = async () => {
      if (initialRequestMade.current) return; // Skip if request was already made
      initialRequestMade.current = true;

      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5001/conversation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            mascot: 'owl',
            input: localStorage.getItem('businessPitch')
          })
        });

        if (!response.ok) throw new Error('Failed to get initial response');

        const data = await response.json();
        setMascotResponse(data.message);
        setMascotMood(data.mood || "Neutral");
        setTurnCount(data.turn);
      } catch (err) {
        console.error('Error details:', err);
        setError("Failed to get Professor Owl's initial thoughts. Please try again.");
        initialRequestMade.current = false; // Reset on error to allow retry
      } finally {
        setIsLoading(false);
      }
    };

    // Only make the initial request if we don't have a response yet
    if (!mascotResponse) {
      getInitialResponse();
    }
  }, [mascotResponse]);

  const handleSend = async () => {
    if (!inputText.trim()) {
      setError("Please enter a message.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5001/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          mascot: 'owl',
          input: inputText.trim()
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      setMascotResponse(data.message);
      setMascotMood(data.mood || "Neutral");
      setInputText("");
      setTurnCount(data.turn);
    } catch (err) {
      console.error('Error details:', err);
      setError("Failed to communicate with Professor Owl. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pitch-page">
      <h1>Professor Owl</h1>
      <h2>Technical Analysis & Implementation Expert</h2>
      <div className="turn-counter">Responses Left: {Math.max(0, 2 - (turnCount - 1))}</div>
      <div className="canvas-container">
        <div className="mascot-turn">
          <div className="mascot-section">
            <img 
              src={`/Assets/Mascots/Owl/Owl-${mascotMood.toLowerCase()}.png`}
              alt={`Owl with ${mascotMood} mood`}
              className="mascot large"
            />
          </div>
          <div className="response-section">
            <div className="mood-box">Mood: {mascotMood}</div>
            <div className="speech-bubble large">
              <p>{mascotResponse || "H-hello! I'm P-professor Owl. Let me analyze your technical implementation..."}</p>
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
            disabled={isLoading || turnCount >= 3}
          />
          <div className="character-count">
            {inputText.length}/200 characters
          </div>
          <div className="button-container">
            <button
              onClick={handleSend}
              className="pitch-button send-button"
              disabled={isLoading || !inputText.trim() || turnCount >= 3}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
            {turnCount >= 3 && (
              <button
                onClick={() => navigate("/PitchTusk")}
                className="pitch-button next-button"
              >
                Next Investor
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchOwl;