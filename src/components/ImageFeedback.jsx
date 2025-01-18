"use client";
import { 
  Mic, 
  Activity,
  Timer,
  Volume2,
  Sparkles,
  MessageCircle,
  Save
} from 'lucide-react';

export default function PitchFeedback({ 
  status, 
  confidence, 
  pace, 
  clarity, 
  engagement,
  currentAnimal,
  liveFeedback 
}) {
  const animals = {
    leo: "Vision & Leadership",
    owlbert: "Technical Details",
    rocket: "Growth & Metrics",
    elephant: "Market Analysis"
  };

  function handleFinishPitch() {
    // Save pitch analytics and feedback
    const pitchData = {
      metrics: {
        confidence,
        pace,
        clarity,
        engagement
      },
      timestamp: new Date(),
      feedback: liveFeedback
    };
    // Handle saving/navigation logic here
  }

  // Convert metrics to percentages
  const getMetricColor = (value) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="flex flex-col bg-white p-6 shadow-lg absolute bottom-0 left-0 right-0 mx-4 mb-6 rounded-xl z-10">
      {/* Current Section & Status */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-purple-600 animate-pulse" />
          <span className="font-bold text-lg">
            {currentAnimal ? `Pitching to ${currentAnimal}: ${animals[currentAnimal]}` : 'Preparing...'}
          </span>
        </div>
        <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
          {status}
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 text-sm mb-1">
            <Activity className="h-4 w-4" />
            Confidence
          </div>
          <div className={`font-bold ${getMetricColor(confidence)}`}>
            {confidence}%
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 text-sm mb-1">
            <Timer className="h-4 w-4" />
            Pace
          </div>
          <div className={`font-bold ${getMetricColor(pace)}`}>
            {pace}%
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 text-sm mb-1">
            <Volume2 className="h-4 w-4" />
            Clarity
          </div>
          <div className={`font-bold ${getMetricColor(clarity)}`}>
            {clarity}%
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 text-sm mb-1">
            <Sparkles className="h-4 w-4" />
            Engagement
          </div>
          <div className={`font-bold ${getMetricColor(engagement)}`}>
            {engagement}%
          </div>
        </div>
      </div>

      {/* Live Feedback */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="h-4 w-4 text-purple-600" />
          <span className="text-sm text-gray-600">Live Feedback</span>
        </div>
        <p className="text-gray-700">
          {liveFeedback || "Waiting for you to start..."}
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg py-2 px-6 flex items-center justify-center hover:opacity-90 transition-opacity"
          onClick={handleFinishPitch}
        >
          <Save className="mr-2 h-4 w-4" />
          Complete Section
        </button>
      </div>
    </div>
  );
};