import React, { useRef, useEffect, useState } from "react";
import io from 'socket.io-client';
import PitchFeedback from "./ImageFeedback";
import { Play, ArrowRight, Video, VideoOff } from 'lucide-react';

const PitchCamera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const socket = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState('leo');

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
          audio: true
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

  // Keep all your existing functions (getCurrentSection, captureFrame, etc.)
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

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL('image/jpeg', 0.8);
        const base64Image = imageDataURL.split(',')[1];

        if (base64Image && base64Image.length > 0) {
          socket.current.emit('frame', base64Image);
        }
      } catch (error) {
        console.error('Error capturing frame:', error);
      }
    }
  };

  useEffect(() => {
    let frameInterval;

    if (isRecording) {
      frameInterval = setInterval(() => {
        captureFrame();
      }, 5000);
    }

    return () => {
      if (frameInterval) {
        clearInterval(frameInterval);
      }
    };
  }, [isRecording]);

  const handleStartPitch = () => {
    console.log('Starting pitch recording');
    setIsRecording(true);
    setPitchData(prev => ({
      ...prev,
      status: "Recording..."
    }));
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Video Container */}
      <div className="relative bg-white/30 backdrop-blur-md rounded-lg shadow-xl border border-white/20 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-auto rounded-lg"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
            isRecording 
              ? 'bg-[#FF5F02]/80 text-white' 
              : 'bg-white/80 text-[#FF5F02]'
          } backdrop-blur-sm`}>
            <div className={`w-2 h-2 rounded-full ${
              isRecording ? 'animate-pulse bg-white' : 'bg-[#FF5F02]'
            }`} />
            <span className="text-sm font-medium">
              {isRecording ? 'Recording' : 'Ready'}
            </span>
          </div>
        </div>
        
        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex justify-between items-center">
            <div className="text-white font-semibold">
              {pitchData.currentSection}
            </div>
            <div className="space-x-3">
              {!isRecording ? (
                <button
                  onClick={handleStartPitch}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FF5F02] to-[#FF8B3D] hover:from-[#FF8B3D] hover:to-[#FF5F02] text-white rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  Start Pitch
                </button>
              ) : (
                <button
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FF5F02] to-[#FF8B3D] hover:from-[#FF8B3D] hover:to-[#FF5F02] text-white rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowRight className="h-5 w-5" />
                  Next Section
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Container */}
      <div className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-xl border border-white/20">
        <PitchFeedback
          status={pitchData.status}
          confidence={pitchData.confidence}
          pace={pitchData.engagement}
          clarity={pitchData.clarity}
          engagement={pitchData.engagement}
          currentAnimal={currentAnimal}
          liveFeedback={pitchData.feedback}
        />
      </div>
    </div>
  );
};

export default PitchCamera;