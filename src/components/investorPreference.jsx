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

  const handleSave = () => {
    localStorage.setItem('investorPreferences', JSON.stringify(formData));
    setSaveStatus('Preferences saved! Our AI animals will find your perfect matches 🎯');
    setTimeout(() => setSaveStatus(''), 3000);
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
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-4">
            What's Your Perfect Startup Match?
          </h1>
          <p className="text-gray-600 text-lg">
            Help our AI animals understand your investment style! 🚀
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
          {/* Investment Details */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <PiggyBank className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-semibold">Investment Details</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-2">Minimum ($)</label>
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
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="50,000"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Maximum ($)</label>
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
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="500,000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-600 mb-2">Investment Role</label>
                <div className="flex flex-wrap gap-2">
                  {options.leadTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleToggle('investment', 'leadOrCoInvest', type)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        formData.investment.leadOrCoInvest.includes(type)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
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
              <Rocket className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-semibold">Startup Stage</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {options.stages.map(stage => (
                <button
                  key={stage}
                  onClick={() => handleToggle('investment', 'stages', stage)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    formData.investment.stages.includes(stage)
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
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
              <Brain className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-semibold">Industries & Technology</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-2">Target Industries</label>
                <div className="flex flex-wrap gap-2">
                  {options.industries.map(industry => (
                    <button
                      key={industry}
                      onClick={() => handleToggle('preferences', 'industries', industry)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        formData.preferences.industries.includes(industry)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-600 mb-2">Tech Focus</label>
                <div className="flex flex-wrap gap-2">
                  {options.techFocus.map(tech => (
                    <button
                      key={tech}
                      onClick={() => handleToggle('preferences', 'techFocus', tech)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        formData.preferences.techFocus.includes(tech)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
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
              <Target className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-semibold">Business & Market</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-2">Business Model</label>
                <div className="flex flex-wrap gap-2">
                  {options.businessModels.map(model => (
                    <button
                      key={model}
                      onClick={() => handleToggle('preferences', 'businessModel', model)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        formData.preferences.businessModel.includes(model)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Key Metrics Focus</label>
                <div className="flex flex-wrap gap-2">
                  {options.keyMetrics.map(metric => (
                    <button
                      key={metric}
                      onClick={() => handleToggle('expectations', 'keyMetrics', metric)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        formData.expectations.keyMetrics.includes(metric)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
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
              <Users className="text-purple-500 w-6 h-6" />
              <h2 className="text-xl font-semibold">Founder Requirements</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {options.founderRequirements.map(req => (
                <button
                  key={req}
                  onClick={() => handleToggle('expectations', 'founderRequirements', req)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    formData.expectations.founderRequirements.includes(req)
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
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
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Target className="w-5 h-5" />
              Find My Perfect Match
            </button>
          </div>
          
          {saveStatus && (
            <div className="text-center text-green-500 font-medium mt-4 bg-green-50 p-3 rounded-lg">
              {saveStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorPreferences;