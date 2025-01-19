import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Pitch.css";
import { useAuth } from "../hooks/authProvider";
import Footer from "./Footer";


const Pitch = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const navigate = useNavigate();

  // const {user} = useAuth();
  
  const handleSend = async () => {
    if (inputText.trim().length === 0) {
      setError("Please enter a pitch before sending.");
      return;
    }

    if (inputText.length > 400) {
      setError("Your pitch must be 400 characters or less.");
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
      console.log('Server response:', data);
      
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
      console.error('Error details:', err);
      setError(err.message || 'Failed to send pitch. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    if (text.length > 400) {
      setError("Your pitch exceeds 400 characters.");
    } else {
      setError(null);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await sendAudioToServer(audioBlob);
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start(150); // Collect data every 200ms
      setIsRecording(true);
      setError("Recording... Click 'Stop' to end.");
    } catch (err) {
      console.error('Error accessing microphone:', err);
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

      console.log('Sending audio to server...');
      const response = await fetch('http://localhost:5000/speech-to-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audio: base64Audio })
      });

      console.log('Server response status:', response.status);
      const data = await response.json();
      console.log('Server response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to convert speech to text');
      }

      if (data.success && data.text) {
        setInputText(prevText => {
          const newText = (prevText + ' ' + data.text).trim();
          if (newText.length > 400) {
            setError("Text exceeds 400 characters. Some content may be truncated.");
            return newText.slice(0, 400);
          }
          return newText;
        });
      } else {
        console.log('No text received from speech recognition');
        setError(null);
      }
    } catch (err) {
      console.error('Error sending audio to server:', err);
      setError('Failed to process audio. Please try again.');
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
    <div className="pitch-wrapper">
      <div className="pitch-container">
        {/* Title Section */}
        <div className="pitch-header">
          <h1 className="pitch-title">
            Pitch Your Idea
          </h1>
          <p className="pitch-subtitle">
            Share your business concept with our AI mentors. Speak or type your pitch to get personalized feedback and guidance.
          </p>
        </div>

        {/* Keep your existing canvas container and its contents */}
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
              placeholder="Type your business pitch here (max 400 characters)..."
              className="pitch-textbox"
              maxLength="400"
              disabled={isLoading || isRecording}
            />
            <div className="character-count">
              {inputText.length}/400 characters
            </div>
            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}
            <div className="button-container">
              <button 
                className={`pitch-button talk-button ${isRecording ? 'recording' : ''}`}
                onClick={handleTalk}
                disabled={isLoading}
              >
                {isRecording ? "Stop" : "Talk"}
              </button>
              <button 
                className="pitch-button send-button" 
                onClick={handleSend}
                disabled={isLoading || !inputText.trim() || isRecording}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Pitch;