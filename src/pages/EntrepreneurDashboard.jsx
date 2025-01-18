import React from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, BookOpen, Play, ClipboardList } from "lucide-react";

const EntrepreneurPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Welcome, Entrepreneur!
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start pitching to our AI animal investors or refine your skills with practice sessions.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Start Pitching */}
          <div
            onClick={() => navigate("/pitch")}
            className="cursor-pointer bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
          >
            <div className="text-center">
              <div className="rounded-full bg-purple-100 p-4 inline-block mb-4">
                <Rocket className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Pitching</h3>
              <p className="text-gray-600">
                Dive straight into your pitch and meet our AI investor panel.
              </p>
            </div>
          </div>

          {/* Practice Pitch */}
          <div
            onClick={() => navigate("/mockInterview")}
            className="cursor-pointer bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
          >
            <div className="text-center">
              <div className="rounded-full bg-purple-100 p-4 inline-block mb-4">
                <Play className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice Pitch</h3>
              <p className="text-gray-600">
                Refine your pitch with real-time feedback from AI characters.
              </p>
            </div>
          </div>

          {/* View Resources */}
          <div
            onClick={() => navigate("/resources")}
            className="cursor-pointer bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
          >
            <div className="text-center">
              <div className="rounded-full bg-purple-100 p-4 inline-block mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">View Resources</h3>
              <p className="text-gray-600">
                Access materials to help improve your pitch and strategy.
              </p>
            </div>
          </div>

          {/* Check Progress */}
          <div
            onClick={() => navigate("/matches")}
            className="cursor-pointer bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
          >
            <div className="text-center">
              <div className="rounded-full bg-purple-100 p-4 inline-block mb-4">
                <ClipboardList className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Check Progress</h3>
              <p className="text-gray-600">
                See your matches and track your pitching performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurPage;
