import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/PitchLion.css";

const PitchTusk = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [mascotMood, setMascotMood] = useState("Neutral");
  const [mascotResponse, setMascotResponse] = useState(
    "Let's talk numbers. Show me how this venture makes money."
  );
  const [turnCount, setTurnCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const handleSend = async () => {
    if (!inputText.trim()) {
      setError("Please enter a message.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5002/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          mascot: "tusk",
          input: inputText.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      setMascotResponse(data.message);
      setMascotMood(data.mood !== undefined ? data.mood : "Neutral");
      setInputText("");
      setTurnCount(data.turn);
    } catch (err) {
      console.error("Error details:", err);
      setError("Failed to communicate with Mr. Tusk. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await sendAudioToServer(audioBlob);

        // Stop all tracks in the stream
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start(150); // Collect data every 200ms
      setIsRecording(true);
      setError("Recording... Click 'Stop' to end.");
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Could not access microphone. Please check permissions.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setError(null);
    }
  };

  const sendAudioToServer = async (audioBlob) => {
    setIsLoading(true);
    try {
      const base64Audio = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(audioBlob);
      });

      const response = await fetch("http://localhost:5000/speech-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audio: base64Audio }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to convert speech to text");
      }

      if (data.success && data.text) {
        setInputText((prevText) => {
          const newText = (prevText + " " + data.text).trim();
          if (newText.length > 200) {
            setError("Text exceeds 200 characters. Some content may be truncated.");
            return newText.slice(0, 200);
          }
          return newText;
        });
      } else {
        setError("No text received from speech recognition");
      }
    } catch (err) {
      console.error("Error sending audio to server:", err);
      setError("Failed to process audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTalk = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="pitch-page">
      <h1>Mr. Tusk</h1>
      <h2>Financial Expert & Market Strategist</h2>
      <div className="turn-counter">
        Responses Left: {Math.max(0, 3 - turnCount)}
      </div>
      <div className="canvas-container">
        <div className="mascot-turn">
          <div className="mascot-section">
            <img
              src={`/Assets/Mascots/Tusk/Tusk-${mascotMood.toLowerCase()}.png`}
              alt={`Tusk with ${mascotMood} mood`}
              className="mascot large"
            />
          </div>
          <div className="response-section">
            <div className="mood-box">Mood: {mascotMood}</div>
            <div className="speech-bubble large">
              <p>{mascotResponse}</p>
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
              className={`pitch-button talk-button ${isRecording ? "recording" : ""}`}
              onClick={handleTalk}
              disabled={isLoading}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? "Stop" : "Talk"}
            </button>
            <button
              onClick={handleSend}
              className="pitch-button send-button"
              disabled={isLoading || !inputText.trim() || turnCount >= 3}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
            {turnCount >= 3 && (
              <button
                onClick={() => navigate("/pitchsummary")}
                className="pitch-button next-button"
              >
                See Results
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchTusk;