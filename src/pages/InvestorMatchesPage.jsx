import React, { useState, useEffect } from 'react';
import { 
    Rocket, 
    ThumbsUp, 
    ThumbsDown, 
    ChevronDown, 
    ChevronUp, 
    Mail 
} from 'lucide-react';

const AnimalAnalysis = ({ animalName, feedback }) => (
  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border-2 border-white/50 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
          <Rocket className="h-6 w-6 text-[#FF5F02]" />
          <div>
              <h3 className="font-['Pixelify_Sans'] font-semibold text-[#FF5F02]">{animalName}'s Analysis</h3>
              <div className="font-['Pixelify_Sans'] text-sm text-gray-600">Insights</div>
          </div>
          <div className="ml-auto text-lg font-['Pixelify_Sans'] font-semibold text-[#FF5F02]">
              {feedback.score}%
          </div>
      </div>
      <div className="space-y-4">
          <div>
              <div className="text-sm font-['Pixelify_Sans'] font-medium text-green-600 flex items-center gap-1 mb-2">
                  <ThumbsUp className="h-4 w-4" />
                  Positives
              </div>
              <ul className="text-sm space-y-1 font-['Pixelify_Sans']">
                  {feedback.positives.map((item, i) => (
                      <li key={i} className="text-gray-700">• {item}</li>
                  ))}
              </ul>
          </div>
          {feedback.concerns.length > 0 && (
              <div>
                  <div className="text-sm font-['Pixelify_Sans'] font-medium text-red-600 flex items-center gap-1 mb-2">
                      <ThumbsDown className="h-4 w-4" />
                      Concerns
                  </div>
                  <ul className="text-sm space-y-1 font-['Pixelify_Sans']">
                      {feedback.concerns.map((item, i) => (
                          <li key={i} className="text-gray-700">• {item}</li>
                      ))}
                  </ul>
              </div>
          )}
      </div>
  </div>
);

const InvestorMatchesPage = () => {
    const [expandedMatch, setExpandedMatch] = useState(null);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5002/getMatches');
            const data = await response.json();
            if (data.matches) {
                setMatches(data.matches);
            } else {
                setError('Invalid data format received');
            }
        } catch (err) {
            setError('Failed to fetch matches');
            console.error('Error fetching matches:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleMailClick = (email) => {
        const mailtoLink = `mailto:${email || 'placeholder@example.com'}`;
        window.location.href = mailtoLink;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center"
                 style={{
                     backgroundImage: 'url("/Assets/background-general.svg")',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat',
                     backgroundAttachment: 'fixed',
                     paddingTop: '15%'
                 }}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#FF5F02] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-['Pixelify_Sans'] text-xl">Loading matches...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center"
                 style={{
                     backgroundImage: 'url("/Assets/background-general.svg")',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat',
                     backgroundAttachment: 'fixed',
                     paddingTop: '15%'
                 }}>
                <div className="text-center bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border-2 border-white/50">
                    <h3 className="text-lg font-['Pixelify_Sans'] font-medium text-red-600">Error Loading Matches</h3>
                    <p className="text-gray-500 font-['Pixelify_Sans']">{error}</p>
                    <button 
                        onClick={fetchMatches}
                        className="mt-4 px-4 py-2 bg-[#FF5F02] text-white rounded-lg hover:bg-[#FF8B3D] transition-all hover:scale-105 font-['Pixelify_Sans']"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            backgroundImage: 'url("/Assets/background-general.svg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            paddingTop: '15%'
        }}>
            <div className="max-w-6xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
                <h1 className="font-['Pixelify_Sans'] text-5xl font-bold text-[#FF5F02] mb-8 text-center"
                    style={{
                        WebkitTextStroke: '1px white',
                        textShadow: '3px 3px 0px rgba(255, 255, 255, 0.5)'
                    }}>
                    Investor Matches
                </h1>
                {matches.map((match) => (
                    <div key={match.companyName} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border-2 border-white/50">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-['Pixelify_Sans'] font-semibold text-[#FF5F02]">
                                        {match.companyName}
                                    </h2>
                                    <p className="text-gray-700 mt-1 font-['Pixelify_Sans']">{match.description}</p>
                                    <button
                                        onClick={() => handleMailClick(match.companyEmail)}
                                        className="mt-2 px-3 py-1 bg-[#FF5F02] text-white rounded-lg text-sm hover:bg-[#FF8B3D] transition-all hover:scale-105 font-['Pixelify_Sans'] flex items-center gap-1"
                                    >
                                        <Mail className="h-4 w-4" />
                                        Contact
                                    </button>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-['Pixelify_Sans'] font-bold text-[#FF5F02]">
                                        {match.matchScore}%
                                    </div>
                                    <div className="text-sm text-gray-500 font-['Pixelify_Sans']">match score</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setExpandedMatch(expandedMatch === match.companyName ? null : match.companyName)}
                                className="flex items-center gap-1 text-[#FF5F02] mt-4 hover:text-[#FF8B3D] transition-colors font-['Pixelify_Sans']"
                            >
                                {expandedMatch === match.companyName ? (
                                    <>
                                        <ChevronUp className="h-4 w-4" />
                                        Hide Analysis
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-4 w-4" />
                                        Show Analysis
                                    </>
                                )}
                            </button>
                        </div>
                        {expandedMatch === match.companyName && (
                            <div className="border-t border-white/20 bg-white/50 backdrop-blur-sm p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {Object.entries(match.animalFeedback).map(([animalName, feedback]) => (
                                        <AnimalAnalysis
                                            key={animalName}
                                            animalName={animalName.charAt(0).toUpperCase() + animalName.slice(1)}
                                            feedback={feedback}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestorMatchesPage;