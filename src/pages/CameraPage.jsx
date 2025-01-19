"use client";
import { useEffect, useState } from "react";
import PitchCamera from "../components/PitchCamera";
import io from "socket.io-client";

let socket;

export default function CameraPage() {
  const [status, setStatus] = useState("Scanning...");

  return (
    <div 
      className="min-h-screen pt-24" 
      style={{ 
        backgroundImage: 'url("/Assets/background-general.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4">
        <h1 
          className="pixelify-sans-heading text-4xl text-[#FF5F02] text-center mb-8"
          style={{
            WebkitTextStroke: '1px white',
            textShadow: '3px 3px 0px rgba(255, 255, 255, 0.5)'
          }}
        >
          Pitch Practice
        </h1>
        <div className="flex flex-col justify-start items-center">
          <PitchCamera />
        </div>
      </div>
    </div>
  );
}