import React from 'react';
import { Rocket, PiggyBank, Brain, Users, Star } from 'lucide-react';

// Add CSS for pixelated font
const pixelatedFontStyle = `
  .pixelify-sans-heading {
    font-family: "Pixelify Sans", serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
  }
`;

const Homepage = () => {
  return (
    <>
      <style>{pixelatedFontStyle}</style>
      <div className="min-h-screen pt-24" style={{ 
        backgroundImage: 'url("/Assets/background-general.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 mb-12">
            <h1 className="pixelify-sans-heading text-7xl text-[#FF5F02] mb-4" style={{
              WebkitTextStroke: '2px white',
              textShadow: '4px 4px 0px rgba(255, 255, 255, 0.5)'
            }}>
              Pixel Pitch
            </h1>
            <p className="text-2xl text-white font-semibold max-w-2xl mx-auto" style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Where Every Pitch Brings a Fresh Perspective to Your Success
            </p>
            <div className="flex justify-center gap-4 pt-8">
              <button className="px-6 py-3 bg-[#FF5F02] hover:bg-[#FF5F02]/90 text-white rounded-lg flex items-center">
                Start Pitching <Rocket className="ml-2 h-4 w-4" />
              </button>
              <button className="px-6 py-3 bg-white/90 hover:bg-white rounded-lg flex items-center text-[#FF5F02]">
                For Investors <PiggyBank className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Rest of the content remains the same but with updated colors */}
          {/* How It Works Section */}
          <div className="my-20">
            <h2 className="pixelify-sans-heading text-3xl text-[#FF5F02] text-center mb-12">How It Works</h2>
            {/* ... rest of the sections ... */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;