import React, { useState } from 'react';
import { 
    Rocket, 
    Brain, 
    Users, 
    PiggyBank,
    Star,
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    ChevronDown,
    ChevronUp,
    Filter,
    Calendar,
    Mail
  } from 'lucide-react';
// Mock data - replace with API call later
const mockMatches = [
  {
    id: 1,
    companyName: "TechFlow AI",
    description: "AI-powered workflow automation platform",
    matchScore: 92,
    stage: "Seed",
    seeking: "$500K",
    industry: "AI/ML",
    animalFeedback: {
      leo: {
        score: 95,
        positives: [
          "Strong founder with previous exits",
          "Clear vision for market disruption",
          "Well-defined growth strategy"
        ],
        concerns: ["Competitive market space"]
      },
      owlbert: {
        score: 90,
        positives: [
          "Sophisticated ML architecture",
          "Scalable cloud infrastructure",
          "Strong technical team"
        ],
        concerns: ["Need for ongoing ML training resources"]
      },
      rocket: {
        score: 88,
        positives: [
          "45% MoM growth",
          "Strong unit economics",
          "Clear acquisition strategy"
        ],
        concerns: ["CAC could be optimized"]
      },
      elephant: {
        score: 94,
        positives: [
          "$5B TAM",
          "Clear competitive advantage",
          "Strong market positioning"
        ],
        concerns: ["Market education needed"]
      }
    }
  },
  {
    id: 2,
    companyName: "HealthTrack",
    description: "Healthcare IoT monitoring platform",
    matchScore: 88,
    stage: "Series A",
    seeking: "$2M",
    industry: "HealthTech",
    animalFeedback: {
      leo: {
        score: 85,
        positives: [
          "Experienced healthcare founders",
          "Strong industry networks",
          "Clear regulatory strategy"
        ],
        concerns: ["International expansion timeline"]
      },
      owlbert: {
        score: 92,
        positives: [
          "Robust IoT infrastructure",
          "HIPAA compliant architecture",
          "Patent-pending technology"
        ],
        concerns: ["Hardware supply chain risks"]
      },
      rocket: {
        score: 86,
        positives: [
          "100+ hospital partnerships",
          "High customer retention",
          "Strong recurring revenue"
        ],
        concerns: ["Long sales cycles"]
      },
      elephant: {
        score: 89,
        positives: [
          "Growing healthcare IoT market",
          "Limited direct competition",
          "Strong regulatory moat"
        ],
        concerns: ["Healthcare industry adoption rate"]
      }
    }
  }
];

const InvestorDashboard = () => {
    const [expandedMatch, setExpandedMatch] = useState(null);
    const [sortBy, setSortBy] = useState('matchScore');
    const [filterIndustry, setFilterIndustry] = useState('all');
  
    const handleContact = (companyName) => {
      alert(`Contacting ${companyName}`);
    };
  
    const handleSchedule = (companyName) => {
      alert(`Scheduling meeting with ${companyName}`);
    };
  
    // Filter and sort matches
    const filteredMatches = mockMatches
      .filter(match => filterIndustry === 'all' || match.industry === filterIndustry)
      .sort((a, b) => {
        if (sortBy === 'matchScore') return b.matchScore - a.matchScore;
        if (sortBy === 'stage') return a.stage.localeCompare(b.stage);
        if (sortBy === 'industry') return a.industry.localeCompare(b.industry);
        return 0;
      });
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header - remains the same */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                Your Startup Matches
              </h1>
              <p className="text-gray-600 mt-2">
                Matches based on your investment preferences
              </p>
            </div>
            
            <div className="flex gap-4">
              <select 
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                <option value="matchScore">Sort by Match Score</option>
                <option value="stage">Sort by Stage</option>
                <option value="industry">Sort by Industry</option>
              </select>
              
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                onChange={(e) => setFilterIndustry(e.target.value)}
                value={filterIndustry}
              >
                <option value="all">All Industries</option>
                <option value="AI/ML">AI/ML</option>
                <option value="HealthTech">HealthTech</option>
                <option value="Fintech">Fintech</option>
                <option value="SaaS">SaaS</option>
              </select>
            </div>
          </div>
  
          {/* Match Cards */}
          <div className="space-y-6">
            {filteredMatches.map((match) => (
              <div key={match.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Match Card Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        {match.companyName}
                        {match.matchScore >= 90 && (
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        )}
                      </h2>
                      <p className="text-gray-600 mt-1">{match.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{match.matchScore}%</div>
                      <div className="text-sm text-gray-500">match score</div>
                    </div>
                  </div>
  
                  <div className="flex gap-4 mt-4">
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {match.stage}
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {match.seeking}
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {match.industry}
                    </div>
                  </div>
  
                  <button
                    onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                    className="flex items-center gap-1 text-purple-600 mt-4 hover:text-purple-700"
                  >
                    {expandedMatch === match.id ? (
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
  
                {/* Expanded Analysis */}
                {expandedMatch === match.id && (
                  <div className="border-t bg-gray-50 p-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Leo's Analysis */}
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-4">
                          <Rocket className="h-6 w-6 text-purple-500" />
                          <div>
                            <h3 className="font-semibold">Leo's Analysis</h3>
                            <div className="text-sm text-gray-500">Vision & Leadership</div>
                          </div>
                          <div className="ml-auto text-lg font-semibold text-purple-600">
                            {match.animalFeedback.leo.score}%
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-green-600 flex items-center gap-1 mb-2">
                              <ThumbsUp className="h-4 w-4" />
                              Positives
                            </div>
                            <ul className="text-sm space-y-1">
                              {match.animalFeedback.leo.positives.map((item, i) => (
                                <li key={i} className="text-gray-600">• {item}</li>
                              ))}
                            </ul>
                          </div>
                          {match.animalFeedback.leo.concerns.length > 0 && (
                            <div>
                              <div className="text-sm font-medium text-orange-600 flex items-center gap-1 mb-2">
                                <ThumbsDown className="h-4 w-4" />
                                Concerns
                              </div>
                              <ul className="text-sm space-y-1">
                                {match.animalFeedback.leo.concerns.map((item, i) => (
                                  <li key={i} className="text-gray-600">• {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
  
                      {/* Owlbert's Analysis */}
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-4">
                          <Brain className="h-6 w-6 text-purple-500" />
                          <div>
                            <h3 className="font-semibold">Owlbert's Analysis</h3>
                            <div className="text-sm text-gray-500">Technical Assessment</div>
                          </div>
                          <div className="ml-auto text-lg font-semibold text-purple-600">
                            {match.animalFeedback.owlbert.score}%
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-green-600 flex items-center gap-1 mb-2">
                              <ThumbsUp className="h-4 w-4" />
                              Positives
                            </div>
                            <ul className="text-sm space-y-1">
                              {match.animalFeedback.owlbert.positives.map((item, i) => (
                                <li key={i} className="text-gray-600">• {item}</li>
                              ))}
                            </ul>
                          </div>
                          {match.animalFeedback.owlbert.concerns.length > 0 && (
                            <div>
                              <div className="text-sm font-medium text-orange-600 flex items-center gap-1 mb-2">
                                <ThumbsDown className="h-4 w-4" />
                                Concerns
                              </div>
                              <ul className="text-sm space-y-1">
                                {match.animalFeedback.owlbert.concerns.map((item, i) => (
                                  <li key={i} className="text-gray-600">• {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
  
                      {/* Rocket's Analysis */}
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="h-6 w-6 text-purple-500" />
                          <div>
                            <h3 className="font-semibold">Rocket's Analysis</h3>
                            <div className="text-sm text-gray-500">Growth & Metrics</div>
                          </div>
                          <div className="ml-auto text-lg font-semibold text-purple-600">
                            {match.animalFeedback.rocket.score}%
                          </div>
                        </div>
                        <div className="space-y-4">
                          {/* Same structure as other analyses */}
                          <div>
                            <div className="text-sm font-medium text-green-600 flex items-center gap-1 mb-2">
                              <ThumbsUp className="h-4 w-4" />
                              Positives
                            </div>
                            <ul className="text-sm space-y-1">
                              {match.animalFeedback.rocket.positives.map((item, i) => (
                                <li key={i} className="text-gray-600">• {item}</li>
                              ))}
                            </ul>
                          </div>
                          {match.animalFeedback.rocket.concerns.length > 0 && (
                            <div>
                              <div className="text-sm font-medium text-orange-600 flex items-center gap-1 mb-2">
                                <ThumbsDown className="h-4 w-4" />
                                Concerns
                              </div>
                              <ul className="text-sm space-y-1">
                                {match.animalFeedback.rocket.concerns.map((item, i) => (
                                  <li key={i} className="text-gray-600">• {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
  
                      {/* Elephant's Analysis */}
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-4">
                          <PiggyBank className="h-6 w-6 text-purple-500" />
                          <div>
                            <h3 className="font-semibold">Elephant's Analysis</h3>
                            <div className="text-sm text-gray-500">Market Analysis</div>
                          </div>
                          <div className="ml-auto text-lg font-semibold text-purple-600">
                            {match.animalFeedback.elephant.score}%
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-green-600 flex items-center gap-1 mb-2">
                              <ThumbsUp className="h-4 w-4" />
                              Positives
                            </div>
                            <ul className="text-sm space-y-1">
                              {match.animalFeedback.elephant.positives.map((item, i) => (
                                <li key={i} className="text-gray-600">• {item}</li>
                              ))}
                            </ul>
                          </div>
                          {match.animalFeedback.elephant.concerns.length > 0 && (
                            <div>
                              <div className="text-sm font-medium text-orange-600 flex items-center gap-1 mb-2">
                                <ThumbsDown className="h-4 w-4" />
                                Concerns
                              </div>
                              <ul className="text-sm space-y-1">
                                {match.animalFeedback.elephant.concerns.map((item, i) => (
                                  <li key={i} className="text-gray-600">• {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
  
                      {/* Action Buttons */}
                      <div className="col-span-2 flex justify-end gap-4 mt-6">
                        <button
                          onClick={() => handleSchedule(match.companyName)}
                          className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Calendar className="h-4 w-4" />
                          Schedule Meeting
                        </button>
                        <button
                          onClick={() => handleContact(match.companyName)}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          Contact Startup
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
  
          {/* No Matches State */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4"><Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No matches found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later for new matches.</p>
          </div>
        )}

        {/* Summary Stats at Bottom */}
        {filteredMatches.length > 0 && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">Total Matches</div>
                <div className="text-2xl font-bold text-purple-600">{filteredMatches.length}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">High Match Score</div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.max(...filteredMatches.map(m => m.matchScore))}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Top Industry</div>
                <div className="text-2xl font-bold text-purple-600">
                  {filteredMatches[0]?.industry || 'N/A'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">New Today</div>
                <div className="text-2xl font-bold text-purple-600">2</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;