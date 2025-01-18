import React, { useRef, useEffect, useState } from "react";
import io from 'socket.io-client';
import PitchFeedback from "./ImageFeedback";

const PitchCamera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const socket = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState('leo'); // Start with Leo

  const [pitchData, setPitchData] = useState({
    status: "Ready to start",
    confidence: 0,
    engagement: 0,
    clarity: 0,
    feedback: "",
    currentSection: "Vision & Leadership"
  });

  const animalSequence = ['leo', 'owlbert', 'rocket', 'elephant'];
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);

  
  useEffect(() => {
    console.log('Connecting to the server...');
    
    socket.current = io("localhost:3001", {
      transports: ['websocket'],
    });

    socket.current.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.current.on("update", (data) => {
      console.log("Pitch Feedback Update", data);
      
      const result = data.Result;
      setPitchData({
        status: isRecording ? "Recording..." : "Ready",
        confidence: result?.confidence || 0,
        engagement: result?.engagement || 0,
        clarity: result?.clarity || 0,
        feedback: result?.feedback || "Waiting for your pitch...",
        currentSection: getCurrentSection()
      });
    });

    socket.current.on('disconnect', (reason) => {
      console.log(`Disconnected from WebSocket server: ${reason}`);
    });

    const startCamera = async () => {
      try {
        const constraints = {
          video: true,
          audio: true // Enable audio for pitch practice
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const getCurrentSection = () => {
    switch(currentAnimal) {
      case 'leo':
        return "Vision & Leadership";
      case 'owlbert':
        return "Technical Details";
      case 'rocket':
        return "Growth & Metrics";
      case 'elephant':
        return "Market Analysis";
      default:
        return "Preparing...";
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current && isRecording) {
      try {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Make sure canvas dimensions match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get base64 string
        const imageDataURL = canvas.toDataURL('image/jpeg', 0.8); // Added quality parameter
        const base64Image = imageDataURL.split(',')[1];

        // Verify we have data before sending
        if (base64Image && base64Image.length > 0) {
          console.log('Sending frame, length:', base64Image.length);
          socket.current.emit('frame', base64Image);
        } else {
          console.error('No frame data captured');
        }
      } catch (error) {
        console.error('Error capturing frame:', error);
      }
    } else {
      console.log('Skipping frame capture:', {
        hasVideo: !!videoRef.current,
        hasCanvas: !!canvasRef.current,
        isRecording
      });
    }
  };

  useEffect(() => {
    let frameInterval;

    if (isRecording) {
      console.log('Starting frame capture interval');
      frameInterval = setInterval(() => {
        captureFrame();
      }, 5000); // Match backend interval
    }

    return () => {
      if (frameInterval) {
        console.log('Clearing frame capture interval');
        clearInterval(frameInterval);
      }
    };
  }, [isRecording]);

  // Add socket error handling
  useEffect(() => {
    if (socket.current) {
      socket.current.on('error', (error) => {
        console.error('Socket error:', error);
      });

      socket.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }
  }, []);

  // Add debugger to check data updates
  useEffect(() => {
    console.log('Pitch data updated:', pitchData);
  }, [pitchData]);

  const handleStartPitch = () => {
    console.log('Starting pitch recording');
    setIsRecording(true);
    setPitchData(prev => ({
      ...prev,
      status: "Recording..."
    }));
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-auto"
      />
      <canvas ref={canvasRef} className="hidden" />
      
      <PitchFeedback
        status={pitchData.status}
        confidence={pitchData.confidence}
        pace={pitchData.engagement}
        clarity={pitchData.clarity}
        engagement={pitchData.engagement}
        currentAnimal={currentAnimal}
        liveFeedback={pitchData.feedback}
      />

      <div className="absolute top-4 right-4 space-x-2">
        {!isRecording ? (
          <button
            onClick={handleStartPitch}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Start Pitch
          </button>
        ) : (
          <button
            // onClick={handleNextSection}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Next Section
          </button>
        )}
      </div>
    </div>
  );
};

export default PitchCamera;