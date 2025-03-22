
import React from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { Activity, Dumbbell, Flame, Lock, Timer, TrendingUp } from 'lucide-react';

interface WorkoutCardProps {
  title: string;
  level: string;
  duration: number;
  intensity: 'Low' | 'Medium' | 'High';
  calories: number;
  bodyFocus: string[];
  color: string;
  locked?: boolean;
}

const WorkoutCard = ({ title, level, duration, intensity, calories, bodyFocus, color, locked = false }: WorkoutCardProps) => {
  const intensityMap = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-amber-100 text-amber-800',
    High: 'bg-red-100 text-red-800'
  };
  
  return (
    <Card className="overflow-hidden h-full">
      <div 
        className="h-24 relative" 
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Dumbbell className="text-white" size={32} />
        </div>
        {locked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Lock className="text-white" size={24} />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs px-2 py-1 bg-secondary rounded-full">
            {level}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${intensityMap[intensity]}`}>
            {intensity} Intensity
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-secondary rounded-lg">
            <Timer size={16} className="mx-auto mb-1" />
            <span className="text-xs block">{duration} min</span>
          </div>
          <div className="text-center p-2 bg-secondary rounded-lg">
            <Flame size={16} className="mx-auto mb-1" />
            <span className="text-xs block">{calories} kcal</span>
          </div>
          <div className="text-center p-2 bg-secondary rounded-lg">
            <TrendingUp size={16} className="mx-auto mb-1" />
            <span className="text-xs block">Strength</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-2">Focus Areas</div>
          <div className="flex flex-wrap gap-1">
            {bodyFocus.map((area, index) => (
              <span key={index} className="text-xs px-2 py-1 border border-border rounded-full">
                {area}
              </span>
            ))}
          </div>
        </div>
        
        <Button 
          variant={locked ? "outline" : "primary"} 
          className="w-full"
          disabled={locked}
        >
          {locked ? "Unlock Workout" : "Start Workout"}
        </Button>
      </div>
    </Card>
  );
};

const workoutData = [
  {
    title: "Full Body Strength",
    level: "Beginner",
    duration: 30,
    intensity: "Medium" as const,
    calories: 250,
    bodyFocus: ["Full Body", "Strength"],
    color: "#3B82F6"
  },
  {
    title: "HIIT Cardio Blast",
    level: "Intermediate",
    duration: 20,
    intensity: "High" as const,
    calories: 300,
    bodyFocus: ["Cardio", "Fat Loss"],
    color: "#F97316"
  },
  {
    title: "Upper Body Focus",
    level: "Intermediate",
    duration: 40,
    intensity: "Medium" as const,
    calories: 280,
    bodyFocus: ["Arms", "Chest", "Back"],
    color: "#10B981",
    locked: true
  },
  {
    title: "Lower Body & Core",
    level: "Beginner",
    duration: 35,
    intensity: "Low" as const,
    calories: 220,
    bodyFocus: ["Legs", "Glutes", "Core"],
    color: "#A855F7",
    locked: true
  }
];

const bodyTypes = [
  {
    type: "Ectomorph",
    description: "Naturally thin with a fast metabolism",
    recommendation: "Focus on strength training with heavy weights and shorter rest periods to build muscle mass",
    icon: <Activity size={24} />
  },
  {
    type: "Mesomorph",
    description: "Athletic build that gains muscle easily",
    recommendation: "Balanced training with both strength and cardio to maintain muscle and minimize fat gain",
    icon: <Activity size={24} />
  },
  {
    type: "Endomorph",
    description: "Higher body fat and slower metabolism",
    recommendation: "Higher intensity cardio combined with strength training to maximize calorie burn",
    icon: <Activity size={24} />
  }
];

const WorkoutRecommendations = () => {
  return (
    <section id="workouts" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-apteats-blue/20 to-transparent -z-10"></div>
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-apteats-blue text-apteats-blue-dark text-sm font-medium mb-4 animate-on-scroll">
            AI Workout Planning
          </span>
          <h2 className="section-title animate-on-scroll">Workouts Designed for Your Body Type</h2>
          <p className="section-subtitle mx-auto animate-on-scroll">
            Our AI creates personalized exercise routines based on your unique body type, fitness level, and goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {bodyTypes.map((body, index) => (
            <Card key={index} className="p-6 h-full animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="h-12 w-12 bg-apteats-blue/30 rounded-full flex items-center justify-center mb-4">
                {body.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{body.type}</h3>
              <p className="text-sm text-muted-foreground mb-4">{body.description}</p>
              <div className="bg-secondary p-4 rounded-lg text-sm">
                <span className="font-medium">AI Recommendation:</span>
                <p className="mt-1">{body.recommendation}</p>
              </div>
            </Card>
          ))}
        </div>
        
        <h3 className="text-2xl font-semibold text-center mb-8 animate-on-scroll">Recommended Workouts For You</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workoutData.map((workout, index) => (
            <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <WorkoutCard {...workout} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutRecommendations;
