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
  }

  // Convert metrics to percentages
  const getMetricColor = (value) => {
    if (value >= 80) return 'text-[#FF5F02]';
    if (value >= 60) return 'text-[#FF8B3D]';
    return 'text-orange-300';
  };

  return (
    <div className="w-full">
      {/* Current Section & Status */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-[#FF5F02] animate-pulse" />
          <span className="font-bold text-lg text-white">
            {currentAnimal ? `Pitching to ${currentAnimal}: ${animals[currentAnimal]}` : 'Preparing...'}
          </span>
        </div>
        <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm border border-white/30">
          {status}
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
  {[
    { icon: Activity, label: 'Confidence', value: confidence },
    { icon: Timer, label: 'Pace', value: pace },
    { icon: Volume2, label: 'Clarity', value: clarity },
    { icon: Sparkles, label: 'Engagement', value: engagement }
  ].map((metric, index) => (
    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/100">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-1 text-white/100 text-sm">
          <metric.icon className="h-4 w-4" />
          {metric.label}
        </div>
        <div className="font-bold text-xl text-white">
          {metric.value}%
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Live Feedback */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/30">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="h-5 w-5 text-[#FF5F02]" />
          <span className="text-sm text-white font-semibold">Live Feedback</span>
        </div>
        <p className="text-white/90">
          {liveFeedback || "Waiting for you to start..."}
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          className="bg-gradient-to-r from-[#FF5F02] to-[#FF8B3D] hover:from-[#FF8B3D] hover:to-[#FF5F02] text-white rounded-lg py-3 px-8 flex items-center justify-center shadow-lg transition-all duration-300"
          onClick={handleFinishPitch}
        >
          <Save className="mr-2 h-5 w-5" />
          Complete Section
        </button>
      </div>
    </div>
  );
};