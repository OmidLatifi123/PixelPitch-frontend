import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, PiggyBank, Brain, Users, Star, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

// Add CSS for pixelated font
const pixelatedFontStyle = `
  .pixelify-sans-heading {
    font-family: "Pixelify Sans", serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
  }
`;

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="bg-[#FF5F02]/10 p-4 rounded-full">
        <Icon className="h-8 w-8 text-[#FF5F02]" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Homepage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Precision Matching",
      description: "AI-driven algorithms match your pitch with the perfect investors, ensuring alignment with your vision and goals."
    },
    {
      icon: MessageCircle,
      title: "Dynamic Feedback",
      description: "Receive real-time insights and guidance from AI investors to refine your pitch and maximize your impact. Slipped up a word or think you can do better? No problem, simply re-try your pitch until satisfied then upload to our database."
    },
    {
      icon: Users,
      title: "Collaborative Community",
      description: "Engage with entrepreneurs and investors in a vibrant ecosystem to share knowledge and unlock opportunities."
    },
    {
      icon: ShieldCheck,
      title: "Verified Quality",
      description: "Ensure every pitch and investment opportunity is credible and legitimate through our stringent verification process."
    }
  ];

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
        <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-12 pt-20"> {/* Added pt-20 for lower positioning */}
        <h1 className="pixelify-sans-heading text-9xl text-[#FF5F02] mb-4" style={{ WebkitTextStroke: '3px white', textShadow: '6px 6px 0px rgba(255, 255, 255, 0.5)'
    }}>
      Pixel Pitch
    </h1>

            <p className="text-2xl text-white font-semibold max-w-3xl mx-auto" style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Practice, Pitch, Match, and Succeed with New Perspectives
            </p>
            <div className="flex justify-center gap-4 pt-8">
  <button 
    onClick={() => navigate('/register')}
    className="px-8 py-4 bg-gradient-to-r from-[#FF5F02] to-[#FF8B3D] hover:from-[#FF8B3D] hover:to-[#FF5F02] text-white rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center"
  >
    Get Started <Rocket className="ml-2 h-5 w-5" />
  </button>
  <button 
    onClick={() => navigate('/login')}
    className="px-8 py-4 bg-white/90 hover:bg-white text-[#FF5F02] rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center border-2 border-[#FF5F02]"
  >
    Start Pitching <ArrowRight className="ml-2 h-5 w-5" />
  </button>
</div>
          </div>

          {/* How It Works Section */}
          <div className="my-20">
          <h2 
  className="pixelify-sans-heading text-5xl text-[#FF5F02] text-center mb-12" 
  style={{
    WebkitTextStroke: '0.5px white',
    textShadow: '2px 2px 0px rgba(255, 255, 255, 0.5)'
  }}
>
  How It Works
</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="my-20">
          <div className="bg-white/50 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/100">
              <h2 className="pixelify-sans-heading text-4xl text-[#FF5F02] text-center mb-12" 
  style={{
    WebkitTextStroke: '0.5px white',
    textShadow: '2px 2px 0px rgba(255, 255, 255, 0.5)'
  }}>Why Choose Pixel Pitch?</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <ArrowRight className="h-6 w-6 text-[#FF5F02] flex-shrink-0" />
                  <div >
                    <h3 className="text-xl font-bold text-gray-800">Innovative Platform</h3>
                    <p className="text-gray-600">Our pixel-perfect platform combines modern technology with user-friendly design.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ArrowRight className="h-6 w-6 text-[#FF5F02] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Global Network</h3>
                    <p className="text-gray-600">Connect with investors and entrepreneurs from around the world.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ArrowRight className="h-6 w-6 text-[#FF5F02] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Secure Environment</h3>
                    <p className="text-gray-600">Your ideas and investments are protected by our state-of-the-art security measures.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="vw-100 text-center">
            <div className="bg-gradient-to-r from-[#FF5F02] to-[#FF8B3D] rounded-lg p-12 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
              <p className="text-white text-xl mb-8">Join our community of innovators and investors today!</p>
              <button 
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-white text-[#FF5F02] rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Homepage;