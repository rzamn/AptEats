
import React from 'react';
import Card from '../shared/Card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  imageBg: string;
}

const Testimonial = ({ quote, author, role, rating, imageBg }: TestimonialProps) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex mb-4">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} 
            />
          ))}
        </div>
        <blockquote className="text-lg mb-6">"{quote}"</blockquote>
        <div className="flex items-center mt-auto">
          <div 
            className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: imageBg }}
          >
            {author.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const testimonials = [
  {
    quote: "AptEats completely transformed my approach to nutrition. The AI meal suggestions are spot-on and I've lost 15 pounds in just 2 months.",
    author: "Sarah J.",
    role: "Busy Professional",
    rating: 5,
    imageBg: "#3B82F6"
  },
  {
    quote: "As a fitness coach, I've tried dozens of apps. This is by far the most accurate calorie calculator and meal planner I've used.",
    author: "Michael T.",
    role: "Personal Trainer",
    rating: 5,
    imageBg: "#10B981"
  },
  {
    quote: "The workout recommendations for my endomorph body type were exactly what I needed. I'm seeing muscle definition for the first time!",
    author: "James R.",
    role: "Tech Developer",
    rating: 4,
    imageBg: "#F97316"
  },
  {
    quote: "I love how the app adjusts my calories based on my activity level. It makes maintaining my weight so much easier.",
    author: "Emma L.",
    role: "Marathon Runner",
    rating: 5,
    imageBg: "#A855F7"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative bg-gradient-soft">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title animate-on-scroll">Users Love Their Results</h2>
          <p className="section-subtitle mx-auto animate-on-scroll">
            See how AptEats has helped people transform their nutrition and fitness routines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <Testimonial {...testimonial} />
            </div>
          ))}
        </div>
        
        <div className="mt-20 animate-on-scroll">
          <Card variant="glass" className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4">
                <div className="flex flex-col items-center md:items-start">
                  <div className="text-5xl font-bold text-primary mb-4">87%</div>
                  <p className="text-lg font-medium mb-3">of users achieve their fitness goals</p>
                  <p className="text-sm text-muted-foreground text-center md:text-left">
                    Based on a survey of 500+ active users who used AptEats for at least 3 months
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { stat: "9.2kg", label: "Average weight lost by users with weight loss goals" },
                    { stat: "27%", label: "Increase in strength for users with muscle-building goals" },
                    { stat: "93%", label: "User satisfaction with personalized meal recommendations" }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 bg-white/50 rounded-xl">
                      <div className="text-2xl font-bold mb-2">{item.stat}</div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
