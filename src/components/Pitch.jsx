import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Pitch.css";

const Pitch = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (inputText.trim().length === 0) {
      setError("Please enter a pitch before sending.");
      return;
    }

    if (inputText.length > 200) {
      setError("Your pitch must be 200 characters or less.");
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
        throw new Error('Failed to send pitch. Server returned: ' + response.status);
      }

      const data = await response.json();
      console.log('Server response:', data); // Debug log
      
      // Store pitch in localStorage
      localStorage.setItem('businessPitch', inputText.trim());
      
      // Navigate to PitchLion with the response data
      navigate("/PitchLion", { 
        state: { 
          initialResponse: data,
          pitch: inputText.trim()
        }
      });
    } catch (err) {
      console.error('Error details:', err); // Debug log
      setError(err.message || 'Failed to send pitch. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    if (text.length > 200) {
      setError("Your pitch exceeds 200 characters.");
    } else {
      setError(null);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);
      setError(null);
    }
  };

  const handleTalk = () => {
    if (isListening) {
      stopListening();
      return;
    }

    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognitionRef.current = recognition;
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError("Listening... Click 'Talk' again to stop.");
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInputText(prevText => {
          const newText = (prevText + ' ' + transcript).trim();
          return newText.slice(0, 200);
        });
      };

      recognition.onerror = (event) => {
        setError("Speech recognition failed. Please try again or type your pitch.");
        stopListening();
      };

      recognition.onend = () => {
        setIsListening(false);
        setError(null);
        recognitionRef.current = null;
      };

      try {
        recognition.start();
      } catch (error) {
        console.error("Speech recognition error:", error);
        setError("Failed to start speech recognition. Please try again.");
        stopListening();
      }
    } else {
      setError("Speech recognition is not supported in your browser.");
    }
  };

  return (
    <div className="pitch-page">
      <h1>Pitch Your Idea</h1>
      <div className="canvas-container">
        <div className="pitch-mascots">
          <img 
            src="/Assets/Mascots/Lion/Lion-neutral.png" 
            alt="Lion" 
            className="pitchmascot"
          />
          <img 
            src="/Assets/Mascots/Owl/Owl-neutral.png" 
            alt="Owl" 
            className="pitchmascot"
          />
          <img 
            src="/Assets/Mascots/Tusk/Tusk-neutral.png" 
            alt="Tusk" 
            className="pitchmascot"
          />
        </div>
        <div className="text-input-container">
          <textarea
            value={inputText}
            onChange={handleTextChange}
            placeholder="Type your business pitch here (max 200 characters)..."
            className="pitch-textbox"
            maxLength="200"
            disabled={isLoading}
          />
          <div className="character-count">
            {inputText.length}/200 characters
          </div>
          {error && <div className="error-message" role="alert">{error}</div>}
          <div className="button-container">
            <button 
              className={`pitch-button talk-button ${isListening ? 'listening' : ''}`}
              onClick={handleTalk}
              disabled={isLoading}
            >
              {isListening ? "Stop" : "Talk"}
            </button>
            <button 
              className="pitch-button send-button" 
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pitch;