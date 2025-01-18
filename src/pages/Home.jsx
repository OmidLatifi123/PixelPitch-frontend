import React from 'react';
import { Rocket, PiggyBank, Brain, Users, Star } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-block animate-bounce">
            <Star className="h-12 w-12 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Meet Your Perfect Investor Match
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered pitch interviews with adorable pixel characters. 
            Make fundraising fun and find your ideal investor match!
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center">
              Start Pitching <Rocket className="ml-2 h-4 w-4" />
            </button>
            <button className="px-6 py-3 border border-gray-300 hover:border-gray-400 rounded-lg flex items-center">
              For Investors <PiggyBank className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="my-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="rounded-full bg-purple-100 p-3 inline-block mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
                <p className="text-gray-600">Tell us about your startup and what you're looking for</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="rounded-full bg-purple-100 p-3 inline-block mb-4">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Meet The Panel</h3>
                <p className="text-gray-600">Interview with our AI animal investors</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="rounded-full bg-purple-100 p-3 inline-block mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
                <p className="text-gray-600">Connect with investors who love your vision</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="my-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PixelPitch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">AI-Powered Matching</h3>
              <p className="text-gray-600">
                Smart algorithms ensure you connect with investors who match your industry, stage, and vision
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Engaging Experience</h3>
              <p className="text-gray-600">
                Practice your pitch with friendly AI characters in a stress-free environment
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center my-20 py-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Meet Your Match?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your journey with Pitchimal today
          </p>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Help Center</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            © {new Date().getFullYear()} Pitchimal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;