
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import CalorieCalculator from '@/components/calculator/CalorieCalculator';
import MealSuggestions from '@/components/meals/MealSuggestions';
import WorkoutRecommendations from '@/components/workouts/WorkoutRecommendations';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import Button from '@/components/shared/Button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Add 'loaded' class to body for animation triggering
    document.body.classList.add('loaded');

    // Animation on scroll functionality
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Handle hash links for smooth scrolling
    const handleHashClick = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Call on initial load in case URL contains hash
    handleHashClick();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashClick);

    return () => {
      document.body.classList.remove('loaded');
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashClick);
    };
  }, []);

  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar scrollToCalculator={scrollToCalculator} />
      <HeroSection scrollToCalculator={scrollToCalculator} />
      <CalorieCalculator />
      <MealSuggestions />
      <WorkoutRecommendations />
      <TestimonialsSection />
      
      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-apteats-blue/30 via-transparent to-transparent opacity-60"></div>
        
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-4xl font-bold mb-6">Ready to take control of your health?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let AI do the hard work of tracking calories, planning meals, and optimizing your workouts.
            </p>
            <p className="text-apteats-moss font-medium mb-8">
              100% Free — No Payments, No Subscriptions
            </p>
            <Button 
              size="lg" 
              className="mx-auto" 
              icon={<ArrowRight size={18} />}
              onClick={scrollToCalculator}
            >
              Start Your AI Journey
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-apteats-gray-light">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">AptEats</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered nutrition and workout guidance, tailored for you.
              </p>
              <p className="text-sm font-medium">100% Free — Always</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#calculator" className="text-muted-foreground hover:text-foreground transition-colors">Calorie Calculator</a></li>
                <li><a href="#nutrition" className="text-muted-foreground hover:text-foreground transition-colors">Meal Planning</a></li>
                <li><a href="#workouts" className="text-muted-foreground hover:text-foreground transition-colors">Workout Recommendations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} AptEats. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
