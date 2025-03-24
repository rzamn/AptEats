import React, { useState } from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import WorkoutTimer from './WorkoutTimer';
import { 
  Activity, 
  Clock, 
  Dumbbell, 
  Flame, 
  Lock, 
  Timer, 
  TrendingUp, 
  Heart, 
  Filter, 
  Shuffle,
  Brain, 
  Zap
} from 'lucide-react';
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserCalorieContext } from '@/pages/Index';

interface WorkoutCardProps {
  title: string;
  level: string;
  duration: number;
  intensity: 'Low' | 'Medium' | 'High';
  calories: number;
  bodyFocus: string[];
  color: string;
  workoutType: string;
  benefits: string[];
  locked?: boolean;
}

const WorkoutCard = ({ 
  title, 
  level, 
  duration, 
  intensity, 
  calories, 
  bodyFocus, 
  color, 
  workoutType, 
  benefits, 
  locked = false 
}: WorkoutCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);
  
  const intensityMap = {
    Low: 'bg-apteats-sage-light text-apteats-moss-dark',
    Medium: 'bg-apteats-sage text-apteats-charcoal',
    High: 'bg-apteats-moss-light text-apteats-charcoal-light'
  };

  const handleWorkoutComplete = () => {
    setIsWorkoutCompleted(true);
    setIsWorkoutStarted(false);
    toast.success("Workout completed! 🎉", {
      description: "Amazing job! You've completed your workout. Keep up the great work!",
      duration: 5000,
    });
  };
  
  const startWorkout = () => {
    if (!locked) {
      setIsWorkoutStarted(true);
    }
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
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
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs px-2 py-1 bg-apteats-neutral-light rounded-full">
            {level}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${intensityMap[intensity]}`}>
            {intensity} Intensity
          </span>
          <span className="text-xs px-2 py-1 bg-apteats-neutral-light rounded-full">
            {workoutType}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-apteats-neutral-light rounded-lg">
            <Timer size={16} className="mx-auto mb-1" />
            <span className="text-xs block">{duration} min</span>
          </div>
          <div className="text-center p-2 bg-apteats-neutral-light rounded-lg">
            <Flame size={16} className="mx-auto mb-1" />
            <span className="text-xs block">{calories} kcal</span>
          </div>
          <div className="text-center p-2 bg-apteats-neutral-light rounded-lg">
            <TrendingUp size={16} className="mx-auto mb-1" />
            <span className="text-xs block">{bodyFocus[0]}</span>
          </div>
        </div>
        
        {showDetails && (
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-2">Key Benefits</div>
            <ul className="space-y-1">
              {benefits.map((benefit, index) => (
                <li key={index} className="text-xs flex">
                  <Zap size={12} className="text-apteats-moss mr-1 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {isWorkoutStarted && !isWorkoutCompleted && (
          <div className="mb-4">
            <WorkoutTimer duration={duration} onComplete={handleWorkoutComplete} />
          </div>
        )}
        
        {isWorkoutCompleted && (
          <div className="mb-4 p-3 bg-apteats-sage-light/50 rounded-lg text-center">
            <Heart className="mx-auto mb-2 text-rose-500" size={20} />
            <p className="text-sm font-medium">Great job! You crushed this workout!</p>
            <p className="text-xs text-muted-foreground mt-1">
              You burned approximately {calories} calories
            </p>
          </div>
        )}
        
        <div className="mb-4 mt-auto">
          <div className="text-xs text-muted-foreground mb-2">Focus Areas</div>
          <div className="flex flex-wrap gap-1">
            {bodyFocus.map((area, index) => (
              <span key={index} className="text-xs px-2 py-1 border border-apteats-neutral-dark rounded-full">
                {area}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          {!isWorkoutStarted && !isWorkoutCompleted ? (
            <Button 
              variant={locked ? "outline" : "primary"} 
              className="w-full"
              disabled={locked}
              onClick={startWorkout}
            >
              {locked ? "Unlock Workout" : "Start Workout"}
            </Button>
          ) : isWorkoutCompleted ? (
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => {
                setIsWorkoutCompleted(false);
                setIsWorkoutStarted(true);
              }}
            >
              Repeat Workout
            </Button>
          ) : (
            <p className="text-xs text-center text-apteats-moss">
              Optimal workout time: {duration} minutes
            </p>
          )}
          
          {!locked && (
            <button 
              onClick={() => setShowDetails(!showDetails)} 
              className="text-xs text-apteats-moss underline text-center"
            >
              {showDetails ? 'Hide details' : 'Show workout details'}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

const allWorkouts = [
  // Beginner workouts
  {
    title: "Full Body Foundations",
    level: "Beginner",
    duration: 30,
    intensity: "Low" as const,
    calories: 180,
    bodyFocus: ["Full Body", "Strength", "Mobility"],
    color: "#E4EBE0",
    workoutType: "Strength",
    benefits: [
      "Builds basic strength in all major muscle groups",
      "Improves coordination and movement patterns",
      "Perfect for those new to fitness"
    ]
  },
  {
    title: "Gentle Cardio Flow",
    level: "Beginner",
    duration: 25,
    intensity: "Low" as const,
    calories: 150,
    bodyFocus: ["Cardio", "Endurance", "Mobility"],
    color: "#D1DCCC",
    workoutType: "Cardio",
    benefits: [
      "Gradually builds cardiovascular endurance",
      "Minimal impact on joints",
      "Improves overall stamina"
    ]
  },
  {
    title: "Beginner Core Strength",
    level: "Beginner",
    duration: 15,
    intensity: "Low" as const,
    calories: 110,
    bodyFocus: ["Core", "Posture", "Stability"],
    color: "#A3B598",
    workoutType: "Core",
    benefits: [
      "Develops essential core strength",
      "Improves posture and spinal alignment",
      "Reduces risk of lower back pain"
    ]
  },
  {
    title: "Intro to Mobility",
    level: "Beginner",
    duration: 20,
    intensity: "Low" as const,
    calories: 90,
    bodyFocus: ["Flexibility", "Recovery", "Joint Health"],
    color: "#B3C1AC",
    workoutType: "Mobility",
    benefits: [
      "Increases range of motion in key joints",
      "Reduces stiffness and tension",
      "Prepares the body for more intense training"
    ]
  },
  
  // Intermediate workouts
  {
    title: "HIIT Cardio Blast",
    level: "Intermediate",
    duration: 20,
    intensity: "High" as const,
    calories: 300,
    bodyFocus: ["Cardio", "Fat Loss", "Full Body"],
    color: "#8EA382",
    workoutType: "HIIT",
    benefits: [
      "Maximizes calorie burn in minimal time",
      "Improves VO2 max and cardiovascular health",
      "Continues burning calories post-workout"
    ]
  },
  {
    title: "Upper Body Focus",
    level: "Intermediate",
    duration: 40,
    intensity: "Medium" as const,
    calories: 280,
    bodyFocus: ["Arms", "Chest", "Back", "Shoulders"],
    color: "#B3C1AC",
    workoutType: "Strength",
    benefits: [
      "Builds functional upper body strength",
      "Improves pushing and pulling capabilities",
      "Enhances posture and shoulder stability"
    ]
  },
  {
    title: "Lower Body & Core",
    level: "Intermediate",
    duration: 35,
    intensity: "Medium" as const,
    calories: 260,
    bodyFocus: ["Legs", "Glutes", "Core"],
    color: "#A3B598",
    workoutType: "Strength",
    benefits: [
      "Develops strong legs and glutes",
      "Improves core stability and balance",
      "Enhances athletic performance"
    ]
  },
  {
    title: "Metabolic Circuit",
    level: "Intermediate",
    duration: 30,
    intensity: "Medium" as const,
    calories: 320,
    bodyFocus: ["Full Body", "Endurance", "Metabolism"],
    color: "#D1DCCC",
    workoutType: "Circuit",
    benefits: [
      "Boosts metabolic rate",
      "Combines strength and cardio benefits",
      "Efficient full-body workout"
    ]
  },
  
  // Advanced workouts
  {
    title: "Power & Explosiveness",
    level: "Advanced",
    duration: 45,
    intensity: "High" as const,
    calories: 450,
    bodyFocus: ["Power", "Athleticism", "Full Body"],
    color: "#8EA382",
    workoutType: "Plyometric",
    benefits: [
      "Develops explosive power and speed",
      "Increases athletic performance",
      "Maximizes fast-twitch muscle fiber recruitment"
    ],
    locked: true
  },
  {
    title: "Advanced Strength Training",
    level: "Advanced",
    duration: 50,
    intensity: "High" as const,
    calories: 400,
    bodyFocus: ["Strength", "Muscle Building", "Full Body"],
    color: "#B3C1AC",
    workoutType: "Strength",
    benefits: [
      "Progressive overload for maximum strength gains",
      "Complex compound movements",
      "Periodized approach to prevent plateaus"
    ],
    locked: true
  },
  {
    title: "Endurance Challenge",
    level: "Advanced",
    duration: 60,
    intensity: "High" as const,
    calories: 520,
    bodyFocus: ["Endurance", "Mental Toughness", "Full Body"],
    color: "#A3B598",
    workoutType: "Endurance",
    benefits: [
      "Builds cardiovascular and muscular endurance",
      "Improves lactate threshold",
      "Enhances mental resilience"
    ],
    locked: true
  },
  
  // Specialized workouts
  {
    title: "Stress Relief Yoga",
    level: "All Levels",
    duration: 30,
    intensity: "Low" as const,
    calories: 120,
    bodyFocus: ["Flexibility", "Stress Reduction", "Balance"],
    color: "#E4EBE0",
    workoutType: "Yoga",
    benefits: [
      "Reduces cortisol levels and stress",
      "Improves mind-body connection",
      "Enhances flexibility and balance"
    ]
  },
  {
    title: "Office Break Stretches",
    level: "All Levels",
    duration: 10,
    intensity: "Low" as const,
    calories: 40,
    bodyFocus: ["Mobility", "Posture", "Recovery"],
    color: "#D1DCCC",
    workoutType: "Mobility",
    benefits: [
      "Counteracts effects of prolonged sitting",
      "Relieves tension in neck, shoulders and back",
      "Can be done anywhere with no equipment"
    ]
  },
  {
    title: "Mindful Movement",
    level: "All Levels",
    duration: 25,
    intensity: "Low" as const,
    calories: 100,
    bodyFocus: ["Mind-Body", "Balance", "Coordination"],
    color: "#B3C1AC",
    workoutType: "Movement",
    benefits: [
      "Improves body awareness and proprioception",
      "Enhances focus and concentration",
      "Reduces anxiety and promotes well-being"
    ]
  },
  {
    title: "Recovery & Mobility",
    level: "All Levels",
    duration: 30,
    intensity: "Low" as const,
    calories: 80,
    bodyFocus: ["Recovery", "Flexibility", "Joint Health"],
    color: "#A3B598",
    workoutType: "Recovery",
    benefits: [
      "Accelerates recovery between intense workouts",
      "Reduces muscle soreness and stiffness",
      "Improves overall movement quality"
    ]
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

interface WorkoutRecommendationsProps {
  userContext: UserCalorieContext;
}

const WorkoutRecommendations: React.FC<WorkoutRecommendationsProps> = ({ userContext }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [displayedWorkouts, setDisplayedWorkouts] = useState(allWorkouts.slice(0, 8));
  
  const filterWorkouts = (filter: string) => {
    let filteredWorkouts = allWorkouts;
    
    if (filter !== "all") {
      if (filter === "beginner") {
        filteredWorkouts = allWorkouts.filter(workout => workout.level === "Beginner");
      } else if (filter === "intermediate") {
        filteredWorkouts = allWorkouts.filter(workout => workout.level === "Intermediate");
      } else if (filter === "advanced") {
        filteredWorkouts = allWorkouts.filter(workout => workout.level === "Advanced");
      } else if (filter === "low") {
        filteredWorkouts = allWorkouts.filter(workout => workout.intensity === "Low");
      } else if (filter === "medium") {
        filteredWorkouts = allWorkouts.filter(workout => workout.intensity === "Medium");
      } else if (filter === "high") {
        filteredWorkouts = allWorkouts.filter(workout => workout.intensity === "High");
      } else if (filter === "quick") {
        filteredWorkouts = allWorkouts.filter(workout => workout.duration <= 30);
      } else {
        filteredWorkouts = allWorkouts.filter(workout => workout.workoutType.toLowerCase() === filter);
      }
    }
    
    setDisplayedWorkouts(filteredWorkouts.slice(0, 8));
    setActiveFilter(filter);
  };
  
  const shuffleWorkouts = () => {
    const shuffled = [...allWorkouts].sort(() => 0.5 - Math.random());
    setDisplayedWorkouts(shuffled.slice(0, 8));
  };
  
  return (
    <section id="workouts" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-apteats-sage-light/40 to-transparent -z-10"></div>
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-apteats-sage-light text-apteats-moss-dark text-sm font-medium mb-4 animate-on-scroll">
            AI Workout Planning
          </span>
          <h2 className="section-title animate-on-scroll">Workouts Designed for Your Body Type</h2>
          <p className="section-subtitle mx-auto animate-on-scroll">
            Our AI creates personalized exercise routines based on your unique body type, fitness level, and goals.
          </p>
          <p className="text-apteats-moss font-medium mt-4 animate-on-scroll">
            100% Free — No Payments, No Subscriptions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {bodyTypes.map((body, index) => (
            <Card key={index} className="p-6 h-full animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="h-12 w-12 bg-apteats-sage-light rounded-full flex items-center justify-center mb-4">
                {body.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{body.type}</h3>
              <p className="text-sm text-muted-foreground mb-4">{body.description}</p>
              <div className="bg-apteats-neutral-light p-4 rounded-lg text-sm">
                <span className="font-medium">AI Recommendation:</span>
                <p className="mt-1">{body.recommendation}</p>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold animate-on-scroll">Find Your Ideal Workout</h3>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="animate-on-scroll">
                Learn More
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">About Our Workout Program</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Personalized Workouts</h4>
                    <p className="text-muted-foreground text-sm">
                      Our AI analyzes your body type, fitness level, and goals to create personalized workout plans that maximize results while minimizing injury risk.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">How to Use the Timer</h4>
                    <p className="text-muted-foreground text-sm">
                      When you start a workout, our built-in timer will help you track your progress. You can pause anytime if needed, and you'll receive a motivational message upon completion.
                    </p>
                  </div>
                  
                  <div className="bg-apteats-sage-light/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Heart size={16} className="text-rose-500 mr-2" />
                      A Personal Note
                    </h4>
                    <p className="text-sm italic">
                      "Fitness should be accessible to everyone, regardless of their financial situation. That's why I've made all AptEats services completely free. Your health journey matters, and I'm here to support you every step of the way."
                    </p>
                    <p className="text-sm font-medium mt-2 text-right">- Raz ❤️</p>
                  </div>
                  
                  <div className="bg-apteats-blue/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">100% Free Forever</h4>
                    <p className="text-sm">
                      All workout plans, timers, and progress tracking features are completely free. No premium tiers, no hidden charges, no subscriptions.
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
          <Button 
            variant={activeFilter === "all" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterWorkouts("all")}
          >
            All Workouts
          </Button>
          <Button 
            variant={activeFilter === "beginner" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterWorkouts("beginner")}
          >
            Beginner
          </Button>
          <Button 
            variant={activeFilter === "intermediate" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterWorkouts("intermediate")}
          >
            Intermediate
          </Button>
          <Button 
            variant={activeFilter === "advanced" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterWorkouts("advanced")}
          >
            Advanced
          </Button>
          <Button 
            variant={activeFilter === "strength" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterWorkouts("strength")}
          >
            Strength
          </Button>
          <Button 
            variant={activeFilter === "cardio" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterWorkouts("cardio")}
          >
            Cardio
          </Button>
          <Button 
            variant={activeFilter === "low" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterWorkouts("low")}
          >
            Low Impact
          </Button>
          <Button 
            variant={activeFilter === "high" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterWorkouts("high")}
          >
            High Intensity
          </Button>
          <Button 
            variant={activeFilter === "quick" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterWorkouts("quick")}
          >
            Quick (≤30 min)
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={shuffleWorkouts}
          >
            <Shuffle size={14} className="mr-1" />
            Shuffle
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedWorkouts.map((workout, index) => (
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
