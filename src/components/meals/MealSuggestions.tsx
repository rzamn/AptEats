
import React from 'react';
import Card from '../shared/Card';
import { Clock, Flame, Heart, Shuffle, Utensils } from 'lucide-react';

interface MealCardProps {
  title: string;
  description: string;
  calories: number;
  protein: number;
  prepTime: number;
  imageColor: string;
  tags: string[];
}

const MealCard = ({ title, description, calories, protein, prepTime, imageColor, tags }: MealCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-apteats-gray-light flex items-center justify-center" style={{ backgroundColor: imageColor }}>
        <Utensils className="text-white" size={32} />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-secondary rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Flame size={16} className="mr-1 text-red-500" />
            <span>{calories} kcal</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">P:</span>
            <span>{protein}g</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-muted-foreground" />
            <span>{prepTime} min</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const mealSuggestions = [
  {
    title: "Grilled Chicken Bowl",
    description: "Lean protein with quinoa, avocado, and mixed vegetables",
    calories: 450,
    protein: 35,
    prepTime: 20,
    imageColor: "#4ADE80",
    tags: ["High Protein", "Low Carb"]
  },
  {
    title: "Salmon with Sweet Potato",
    description: "Omega-3 rich salmon with roasted sweet potato and greens",
    calories: 520,
    protein: 28,
    prepTime: 25,
    imageColor: "#F97316",
    tags: ["Omega-3", "Nutrient Dense"]
  },
  {
    title: "Mediterranean Bowl",
    description: "Falafel, hummus, vegetables and whole grain pita",
    calories: 480,
    protein: 18,
    prepTime: 15,
    imageColor: "#3B82F6",
    tags: ["Plant-Based", "Fiber Rich"]
  },
  {
    title: "Protein Smoothie Bowl",
    description: "Whey protein, banana, berries, and granola topping",
    calories: 390,
    protein: 30,
    prepTime: 5,
    imageColor: "#A855F7",
    tags: ["Quick Prep", "Post-Workout"]
  }
];

const MealSuggestions = () => {
  return (
    <section id="nutrition" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-apteats-green/20 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-transparent to-apteats-green/20 -z-10"></div>
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-apteats-green text-apteats-green-dark text-sm font-medium mb-4 animate-on-scroll">
            AI-Generated Meal Plans
          </span>
          <h2 className="section-title animate-on-scroll">Personalized Nutrition, Tailored to Your Goals</h2>
          <p className="section-subtitle mx-auto animate-on-scroll">
            Our AI analyzes your calorie needs, dietary preferences, and nutritional gaps to create the perfect meal plan for your unique body.
          </p>
        </div>
        
        <div className="relative mb-12 animate-on-scroll">
          <Card variant="glass" className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">Intelligent Meal Planning</h3>
                <p className="text-muted-foreground mb-6">
                  Our AI doesn't just count calories—it optimizes your nutrition by understanding your body's unique needs, balancing macronutrients, and adapting to your food preferences.
                </p>
                <ul className="space-y-3">
                  {[
                    "Personalized macronutrient ratios based on your goals",
                    "Adapts to dietary restrictions and preferences",
                    "Suggests nutrient-dense foods to fill gaps in your diet",
                    "Optimizes meal timing around your workout schedule"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-apteats-green/50 flex items-center justify-center mr-3 mt-0.5">
                        <Heart size={14} className="text-apteats-green-dark" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full md:w-1/2 bg-gradient-green p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Your Daily Meal Plan</h4>
                  <button className="flex items-center text-sm text-primary">
                    <Shuffle size={14} className="mr-1" />
                    <span>Refresh</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { meal: "Breakfast", food: "Greek Yogurt with Berries", calories: 320, protein: 22 },
                    { meal: "Lunch", food: "Grilled Chicken Salad", calories: 450, protein: 35 },
                    { meal: "Snack", food: "Protein Shake with Almonds", calories: 250, protein: 20 },
                    { meal: "Dinner", food: "Salmon with Roasted Vegetables", calories: 520, protein: 30 }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between p-3 bg-white/80 rounded-lg">
                      <div>
                        <div className="text-xs text-muted-foreground">{item.meal}</div>
                        <div className="font-medium">{item.food}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{item.calories} kcal</div>
                        <div className="text-xs text-muted-foreground">{item.protein}g protein</div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-2 border-t border-border mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Daily Total</span>
                      <span>1,540 kcal / 107g protein</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {mealSuggestions.map((meal, index) => (
            <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <MealCard {...meal} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealSuggestions;
