
import React, { useEffect, useState } from 'react';
import Button from '../shared/Button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-apteats-blue/30 via-transparent to-transparent opacity-60"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-apteats-green/40 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Content */}
          <div className="md:col-span-6 z-10">
            <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <span className="inline-block px-4 py-2 rounded-full bg-apteats-blue text-apteats-blue-dark text-sm font-medium">
                AI-Powered Nutrition & Fitness
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                AI-Powered Nutrition & Workout Guidance, Tailored for You.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Track calories, get personalized meal plans, and optimize workouts—effortlessly. Your AI nutritionist and personal trainer in one elegant app.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg">Get Started</Button>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>
          </div>
          
          {/* App Preview */}
          <div className="md:col-span-6 z-10">
            <div className={`relative ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="glass-panel p-6 shadow-subtle">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Your Daily Overview</h3>
                  <span className="text-sm text-muted-foreground">Today</span>
                </div>
                
                <div className="space-y-6">
                  {/* Daily Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Calorie Goal</span>
                      <span className="text-sm font-medium">1,850 / 2,200 kcal</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-apteats-blue-dark rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  
                  {/* Macros */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 rounded-xl bg-apteats-blue/50">
                      <div className="text-sm text-muted-foreground">Protein</div>
                      <div className="text-lg font-medium">120g</div>
                    </div>
                    <div className="p-3 rounded-xl bg-apteats-green/50">
                      <div className="text-sm text-muted-foreground">Carbs</div>
                      <div className="text-lg font-medium">180g</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50">
                      <div className="text-sm text-muted-foreground">Fats</div>
                      <div className="text-lg font-medium">65g</div>
                    </div>
                  </div>
                  
                  {/* Suggested Meal */}
                  <div className="border border-border p-4 rounded-xl">
                    <h4 className="font-medium mb-2">AI Meal Suggestion</h4>
                    <p className="text-sm text-muted-foreground mb-4">Based on your remaining nutrients</p>
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-lg bg-apteats-gray-light flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-apteats-green/80"></div>
                      </div>
                      <div>
                        <h5 className="font-medium">Grilled Chicken Salad</h5>
                        <p className="text-sm text-muted-foreground">420 kcal - High protein</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#calculator" aria-label="Scroll to calculator section">
            <ArrowDown className="text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
