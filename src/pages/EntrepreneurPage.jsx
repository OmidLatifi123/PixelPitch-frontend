import React from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Play } from "lucide-react";

const EntrepreneurPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div 
        style={{
          backgroundImage: 'url("/Assets/background-general.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          paddingTop: '15%',
          width: '100%'
        }}
      >
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="font-['Pixelify_Sans'] text-5xl font-bold text-[#FF5F02] mb-2"
                style={{
                  WebkitTextStroke: '1px white',
                  textShadow: '3px 3px 0px rgba(255, 255, 255, 0.5)'
                }}>
              Welcome, Entrepreneur!
            </h2>
            <p className="mt-4 text-xl text-white font-['Pixelify_Sans'] shadow-text">
              Start pitching to our AI animal investors or refine your skills with practice sessions.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Start Pitching */}
            <div
              onClick={() => navigate("/pitch")}
              className="cursor-pointer bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform border-2 border-white/50"
            >
              <div className="text-center">
                <div className="rounded-full bg-[#FF5F02]/20 p-4 inline-block mb-4">
                  <Rocket className="h-8 w-8 text-[#FF5F02]" />
                </div>
                <h3 className="text-xl font-['Pixelify_Sans'] font-semibold mb-2 text-[#FF5F02]">
                  Start Pitching
                </h3>
                <p className="text-gray-700 font-['Pixelify_Sans']">
                  Dive straight into your pitch and meet our AI investor panel.
                </p>
              </div>
            </div>

            {/* Practice Pitch */}
            <div
              onClick={() => navigate("/mockInterview")}
              className="cursor-pointer bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform border-2 border-white/50"
            >
              <div className="text-center">
                <div className="rounded-full bg-[#FF5F02]/20 p-4 inline-block mb-4">
                  <Play className="h-8 w-8 text-[#FF5F02]" />
                </div>
                <h3 className="text-xl font-['Pixelify_Sans'] font-semibold mb-2 text-[#FF5F02]">
                  Practice Pitch
                </h3>
                <p className="text-gray-700 font-['Pixelify_Sans']">
                  Refine your pitch with real-time feedback from AI characters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurPage;