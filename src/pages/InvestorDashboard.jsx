import React from 'react';
import { UserCircle, Rocket, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestorDashboardPage = () => {
  return (
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
      <div className="container mx-auto px-4 py-8">
        <h1 
          className="text-center font-['Pixelify_Sans'] text-5xl font-bold text-[#FF5F02] mb-12"
          style={{
            WebkitTextStroke: '1px white',
            textShadow: '3px 3px 0px rgba(255, 255, 255, 0.5)'
          }}
        >
          AI Shark Tank Investor Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link 
            to="/investorinfo" 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-2 border-white/50"
          >
            <div className="text-center">
              <div className="rounded-full bg-[#FF5F02]/20 p-4 inline-block mb-4">
                <UserCircle className="h-8 w-8 text-[#FF5F02]" />
              </div>
              <h2 className="font-['Pixelify_Sans'] text-xl font-semibold text-[#FF5F02] mb-2">
                My Investor Profile
              </h2>
              <p className="font-['Pixelify_Sans'] text-gray-600">
                View and edit your investor details
              </p>
            </div>
          </Link>

          <Link 
            to="/matches" 
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-2 border-white/50"
          >
            <div className="text-center">
              <div className="rounded-full bg-[#FF5F02]/20 p-4 inline-block mb-4">
                <Rocket className="h-8 w-8 text-[#FF5F02]" />
              </div>
              <h2 className="font-['Pixelify_Sans'] text-xl font-semibold text-[#FF5F02] mb-2">
                Startup Matches
              </h2>
              <p className="font-['Pixelify_Sans'] text-gray-600">
                See startups tailored to your preferences
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboardPage;