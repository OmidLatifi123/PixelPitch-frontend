import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Brain, 
  Users, 
  PiggyBank, 
  Globe, 
  Target,
  Laptop,
  Timer
} from 'lucide-react';

const InvestorPreferences = () => {
  const [formData, setFormData] = useState({
    investment: {
      range: {
        min: '',
        max: ''
      },
      stages: [],
      checkSize: '',
      leadOrCoInvest: []
    },
    preferences: {
      industries: [],
      businessModel: [],
      location: [],
      marketSize: '',
      techFocus: []
    },
    expectations: {
      exitTimeline: '',
      expectedReturns: '',
      founderRequirements: [],
      keyMetrics: []
    }
  });

  const [saveStatus, setSaveStatus] = useState('');

  const options = {
    stages: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Growth'],
    industries: ['AI/ML', 'SaaS', 'Fintech', 'Healthcare', 'E-commerce', 'Consumer Apps', 'Deep Tech', 'Clean Tech'],
    businessModels: ['B2B', 'B2C', 'Marketplace', 'Enterprise', 'Hardware', 'API'],
    locations: ['North America', 'Europe', 'Asia', 'Remote-first', 'Global'],
    leadTypes: ['Lead Investor', 'Co-Investor', 'Follow-on'],
    techFocus: ['AI/ML', 'Cloud Native', 'Mobile First', 'Blockchain', 'IoT', 'Developer Tools'],
    founderRequirements: ['Technical Background', 'Industry Experience', 'Prior Exits', 'Full-time Dedicated', 'Domain Expertise'],
    keyMetrics: ['MRR Growth', 'User Growth', 'Enterprise Contracts', 'GMV', 'Network Effects']
  };

  useEffect(() => {
    const savedData = localStorage.getItem('investorPreferences');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5002/SaveInvestorPreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        setSaveStatus('Preferences saved successfully! 🎯');
      } else {
        const errorData = await response.json();
        setSaveStatus(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setSaveStatus(`Error: ${error.message}`);
    } finally {
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleToggle = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: prev[category][field].includes(value)
          ? prev[category][field].filter(item => item !== value)
          : [...prev[category][field], value]
      }
    }));
  };

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{
        backgroundImage: 'url("/Assets/background-general.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        paddingTop: '15%'
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-['Pixelify_Sans'] font-bold text-[#FF5F02] mb-4"
            style={{
              WebkitTextStroke: '1px white',
              textShadow: '3px 3px 0px rgba(255, 255, 255, 0.5)'
            }}
          >
            What's Your Perfect Startup Match?
          </h1>
          <p className="text-xl text-white font-['Pixelify_Sans'] shadow-text">
            Help our AI animals understand your investment style! 🚀
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-8 border-2 border-white/50">
          {/* Investment Details */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <PiggyBank className="text-[#FF5F02] w-6 h-6" />
              <h2 className="text-xl font-['Pixelify_Sans'] font-semibold text-[#FF5F02]">Investment Details</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-['Pixelify_Sans'] mb-2">Minimum ($)</label>
                  <input
                    type="number"
                    value={formData.investment.range.min}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      investment: {
                        ...prev.investment,
                        range: { ...prev.investment.range, min: e.target.value }
                      }
                    }))}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF5F02] outline-none font-['Pixelify_Sans']"
                    placeholder="50,000"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-['Pixelify_Sans'] mb-2">Maximum ($)</label>
                  <input
                    type="number"
                    value={formData.investment.range.max}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      investment: {
                        ...prev.investment,
                        range: { ...prev.investment.range, max: e.target.value }
                      }
                    }))}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FF5F02] outline-none font-['Pixelify_Sans']"
                    placeholder="500,000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-600 font-['Pixelify_Sans'] mb-2">Investment Role</label>
                <div className="flex flex-wrap gap-2">
                  {options.leadTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleToggle('investment', 'leadOrCoInvest', type)}
                      className={`px-4 py-2 rounded-lg transition-all font-['Pixelify_Sans'] ${
                        formData.investment.leadOrCoInvest.includes(type)
                          ? 'bg-[#FF5F02] text-white shadow-lg transform scale-105'
                          : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-[#FF5F02]/30'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Stages */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="text-[#FF5F02] w-6 h-6" />
              <h2 className="text-xl font-['Pixelify_Sans'] font-semibold text-[#FF5F02]">Startup Stage</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {options.stages.map(stage => (
                <button
                  key={stage}
                  onClick={() => handleToggle('investment', 'stages', stage)}
                  className={`px-4 py-2 rounded-lg transition-all font-['Pixelify_Sans'] ${
                    formData.investment.stages.includes(stage)
                      ? 'bg-[#FF5F02] text-white shadow-lg transform scale-105'
                      : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-[#FF5F02]/30'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </section>

          {/* Industries & Tech */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-[#FF5F02] w-6 h-6" />
              <h2 className="text-xl font-['Pixelify_Sans'] font-semibold text-[#FF5F02]">Industries & Technology</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 font-['Pixelify_Sans'] mb-2">Target Industries</label>
                <div className="flex flex-wrap gap-2">
                  {options.industries.map(industry => (
                    <button
                      key={industry}
                      onClick={() => handleToggle('preferences', 'industries', industry)}
                      className={`px-4 py-2 rounded-lg transition-all font-['Pixelify_Sans'] ${
                        formData.preferences.industries.includes(industry)
                          ? 'bg-[#FF5F02] text-white shadow-lg transform scale-105'
                          : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-[#FF5F02]/30'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-600 font-['Pixelify_Sans'] mb-2">Tech Focus</label>
                <div className="flex flex-wrap gap-2">
                  {options.techFocus.map(tech => (
                    <button
                      key={tech}
                      onClick={() => handleToggle('preferences', 'techFocus', tech)}
                      className={`px-4 py-2 rounded-lg transition-all font-['Pixelify_Sans'] ${
                        formData.preferences.techFocus.includes(tech)
                          ? 'bg-[#FF5F02] text-white shadow-lg transform scale-105'
                          : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-[#FF5F02]/30'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Business & Market */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-[#FF5F02] w-6 h-6" />
              <h2 className="text-xl font-['Pixelify_Sans'] font-semibold text-[#FF5F02]">Business & Market</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 font-['Pixelify_Sans'] mb-2">Business Model</label>
                <div className="flex flex-wrap gap-2">
                  {options.businessModels.map(model => (
                    <button
                      key={model}
                      onClick={() => handleToggle('preferences', 'businessModel', model)}
                      className={`px-4 py-2 rounded-lg transition-all font-['Pixelify_Sans'] ${
                        formData.preferences.businessModel.includes(model)
                          ? 'bg-[#FF5F02] text-white shadow-lg transform scale-105'
                          : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-[#FF5F02]/30'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-['Pixelify_Sans'] mb-2">Key Metrics Focus</label>
                <div className="flex flex-wrap gap-2">
                  {options.keyMetrics.map(metric => (
                    <button
                      key={metric}
                      onClick={() => handleToggle('expectations', 'keyMetrics', metric)}
                      className={`px-4 py-2 rounded-lg transition-all font-['Pixelify_Sans'] ${
                        formData.expectations.keyMetrics.includes(metric)
                          ? 'bg-[#FF5F02] text-white shadow-lg transform scale-105'
                          : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-[#FF5F02]/30'
                      }`}
                    >
                      {metric}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Team Requirements */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-[#FF5F02] w-6 h-6" />
              <h2 className="text-xl font-['Pixelify_Sans'] font-semibold text-[#FF5F02]">Founder Requirements</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {options.founderRequirements.map(req => (
                <button
                  key={req}
                  onClick={() => handleToggle('expectations', 'founderRequirements', req)}
                  className={`px-4 py-2 rounded-lg transition-all font-['Pixelify_Sans'] ${
                    formData.expectations.founderRequirements.includes(req)
                      ? 'bg-[#FF5F02] text-white shadow-lg transform scale-105'
                      : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-[#FF5F02]/30'
                  }`}
                >
                  {req}
                </button>
              ))}
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-[#FF5F02] text-white rounded-lg hover:bg-[#FF8B3D] transition-all hover:scale-105 font-['Pixelify_Sans'] flex items-center gap-2 shadow-lg"
            >
              <Target className="w-5 h-5" />
              Find My Perfect Match
            </button>
          </div>
          
          {saveStatus && (
            <div className="text-center text-[#FF5F02] font-['Pixelify_Sans'] mt-4 bg-white/80 p-3 rounded-lg border border-[#FF5F02]/30">
              {saveStatus}
            </div>
          )}
        </div>
      </div>

      {/* Optional: Add a style tag for any additional custom CSS */}
      <style jsx>{`
        .shadow-text {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default InvestorPreferences;