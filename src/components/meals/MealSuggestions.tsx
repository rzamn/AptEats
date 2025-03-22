
import React, { useState } from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { 
  Clock, 
  Flame, 
  Heart, 
  Leaf, 
  Filter, 
  Shuffle, 
  Utensils, 
  Salad, 
  Wheat, 
  Egg 
} from 'lucide-react';

interface Nutrient {
  name: string;
  amount: number;
  unit: string;
}

interface MealCardProps {
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  prepTime: number;
  imageColor: string;
  tags: string[];
  mealType: string;
  nutrients: Nutrient[];
}

const MealCard = ({ 
  title, 
  description, 
  calories, 
  protein, 
  carbs, 
  fat, 
  fiber, 
  prepTime, 
  imageColor, 
  tags, 
  mealType 
}: MealCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-video bg-apteats-sage-light flex items-center justify-center" style={{ backgroundColor: imageColor }}>
        {mealType === 'breakfast' && <Egg className="text-white" size={32} />}
        {mealType === 'lunch' && <Salad className="text-white" size={32} />}
        {mealType === 'dinner' && <Utensils className="text-white" size={32} />}
        {mealType === 'snack' && <Wheat className="text-white" size={32} />}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-apteats-neutral-light rounded-full text-apteats-charcoal">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
        
        {showDetails && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-xs bg-apteats-neutral-light p-2 rounded-lg flex flex-col items-center">
              <span className="text-apteats-moss font-medium">Carbs</span>
              <span>{carbs}g</span>
            </div>
            <div className="text-xs bg-apteats-neutral-light p-2 rounded-lg flex flex-col items-center">
              <span className="text-apteats-moss font-medium">Fat</span>
              <span>{fat}g</span>
            </div>
            <div className="text-xs bg-apteats-neutral-light p-2 rounded-lg flex flex-col items-center">
              <span className="text-apteats-moss font-medium">Protein</span>
              <span>{protein}g</span>
            </div>
            <div className="text-xs bg-apteats-neutral-light p-2 rounded-lg flex flex-col items-center">
              <span className="text-apteats-moss font-medium">Fiber</span>
              <span>{fiber}g</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-between text-sm mt-auto">
          <div className="flex items-center">
            <Flame size={16} className="mr-1 text-apteats-moss" />
            <span>{calories} kcal</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-muted-foreground" />
            <span>{prepTime} min</span>
          </div>
        </div>
        
        <button 
          onClick={() => setShowDetails(!showDetails)} 
          className="text-xs text-apteats-moss underline mt-2 text-center"
        >
          {showDetails ? 'Hide details' : 'Show nutrition details'}
        </button>
      </div>
    </Card>
  );
};

// Expanded meal database with varied options
const allMeals = [
  // Breakfast options
  {
    title: "Greek Yogurt Parfait",
    description: "Greek yogurt with berries, honey, and homemade granola",
    calories: 320,
    protein: 22,
    carbs: 38,
    fat: 10,
    fiber: 6,
    prepTime: 10,
    imageColor: "#E4EBE0",
    tags: ["High Protein", "Probiotic"],
    mealType: "breakfast",
    nutrients: [
      { name: "Calcium", amount: 300, unit: "mg" },
      { name: "Vitamin C", amount: 15, unit: "mg" }
    ]
  },
  {
    title: "Avocado Toast with Egg",
    description: "Whole grain toast with smashed avocado, poached egg and microgreens",
    calories: 380,
    protein: 18,
    carbs: 32,
    fat: 22,
    fiber: 8,
    prepTime: 15,
    imageColor: "#D1DCCC",
    tags: ["Heart Healthy", "Omega-3"],
    mealType: "breakfast",
    nutrients: [
      { name: "Vitamin E", amount: 4, unit: "mg" },
      { name: "Folate", amount: 120, unit: "mcg" }
    ]
  },
  {
    title: "Protein Smoothie Bowl",
    description: "Whey protein, banana, berries, and granola topping",
    calories: 390,
    protein: 30,
    carbs: 45,
    fat: 8,
    fiber: 7,
    prepTime: 5,
    imageColor: "#A3B598",
    tags: ["Quick Prep", "Post-Workout"],
    mealType: "breakfast",
    nutrients: [
      { name: "Potassium", amount: 650, unit: "mg" },
      { name: "Vitamin B12", amount: 1.5, unit: "mcg" }
    ]
  },
  
  // Lunch options
  {
    title: "Grilled Chicken Bowl",
    description: "Lean protein with quinoa, avocado, and mixed vegetables",
    calories: 450,
    protein: 35,
    carbs: 42,
    fat: 15,
    fiber: 9,
    prepTime: 20,
    imageColor: "#8EA382",
    tags: ["High Protein", "Complete Meal"],
    mealType: "lunch",
    nutrients: [
      { name: "Iron", amount: 3.5, unit: "mg" },
      { name: "Zinc", amount: 4, unit: "mg" }
    ]
  },
  {
    title: "Mediterranean Bowl",
    description: "Falafel, hummus, vegetables and whole grain pita",
    calories: 480,
    protein: 18,
    carbs: 68,
    fat: 16,
    fiber: 12,
    prepTime: 15,
    imageColor: "#B3C1AC",
    tags: ["Plant-Based", "Fiber Rich"],
    mealType: "lunch",
    nutrients: [
      { name: "Magnesium", amount: 80, unit: "mg" },
      { name: "Vitamin A", amount: 600, unit: "IU" }
    ]
  },
  {
    title: "Salmon Poke Bowl",
    description: "Fresh salmon cubes with brown rice, edamame, avocado and seaweed",
    calories: 520,
    protein: 32,
    carbs: 48,
    fat: 22,
    fiber: 7,
    prepTime: 15,
    imageColor: "#A3B598",
    tags: ["Omega-3", "Gluten-Free"],
    mealType: "lunch",
    nutrients: [
      { name: "Vitamin D", amount: 600, unit: "IU" },
      { name: "Selenium", amount: 45, unit: "mcg" }
    ]
  },
  
  // Dinner options
  {
    title: "Salmon with Sweet Potato",
    description: "Omega-3 rich salmon with roasted sweet potato and greens",
    calories: 520,
    protein: 28,
    carbs: 44,
    fat: 26,
    fiber: 6,
    prepTime: 25,
    imageColor: "#D1DCCC",
    tags: ["Omega-3", "Nutrient Dense"],
    mealType: "dinner",
    nutrients: [
      { name: "Vitamin A", amount: 900, unit: "IU" },
      { name: "Vitamin B6", amount: 0.6, unit: "mg" }
    ]
  },
  {
    title: "Grass-Fed Beef Stir Fry",
    description: "Lean beef with bell peppers, broccoli and snow peas over cauliflower rice",
    calories: 410,
    protein: 32,
    carbs: 20,
    fat: 22,
    fiber: 8,
    prepTime: 20,
    imageColor: "#8EA382",
    tags: ["Low Carb", "High Protein"],
    mealType: "dinner",
    nutrients: [
      { name: "Iron", amount: 4.5, unit: "mg" },
      { name: "Vitamin C", amount: 120, unit: "mg" }
    ]
  },
  {
    title: "Lentil & Vegetable Curry",
    description: "Plant-based curry with red lentils, spinach, and mixed vegetables",
    calories: 380,
    protein: 18,
    carbs: 52,
    fat: 10,
    fiber: 14,
    prepTime: 30,
    imageColor: "#B3C1AC",
    tags: ["Vegan", "High Fiber"],
    mealType: "dinner",
    nutrients: [
      { name: "Folate", amount: 240, unit: "mcg" },
      { name: "Iron", amount: 5, unit: "mg" }
    ]
  },
  
  // Snack options
  {
    title: "Protein Energy Bites",
    description: "No-bake bites with oats, protein powder, nut butter and dark chocolate",
    calories: 210,
    protein: 12,
    carbs: 18,
    fat: 10,
    fiber: 4,
    prepTime: 15,
    imageColor: "#E4EBE0",
    tags: ["Portable", "Energy Boost"],
    mealType: "snack",
    nutrients: [
      { name: "Magnesium", amount: 60, unit: "mg" },
      { name: "Iron", amount: 1.2, unit: "mg" }
    ]
  },
  {
    title: "Cottage Cheese & Fruit",
    description: "High protein cottage cheese with fresh berries and a drizzle of honey",
    calories: 180,
    protein: 22,
    carbs: 14,
    fat: 5,
    fiber: 3,
    prepTime: 5,
    imageColor: "#D1DCCC",
    tags: ["High Protein", "Quick Prep"],
    mealType: "snack",
    nutrients: [
      { name: "Calcium", amount: 150, unit: "mg" },
      { name: "Vitamin C", amount: 35, unit: "mg" }
    ]
  },
  {
    title: "Vegetable Crudité with Hummus",
    description: "Fresh vegetable sticks with homemade chickpea hummus",
    calories: 160,
    protein: 6,
    carbs: 18,
    fat: 8,
    fiber: 7,
    prepTime: 10,
    imageColor: "#A3B598",
    tags: ["Plant-Based", "Low Calorie"],
    mealType: "snack",
    nutrients: [
      { name: "Vitamin A", amount: 600, unit: "IU" },
      { name: "Vitamin K", amount: 80, unit: "mcg" }
    ]
  }
];

const MealSuggestions = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [displayedMeals, setDisplayedMeals] = useState(allMeals.slice(0, 8));
  
  const filterMeals = (filter: string) => {
    let filteredMeals = allMeals;
    
    if (filter !== "all") {
      if (filter === "high-protein") {
        filteredMeals = allMeals.filter(meal => meal.protein >= 20);
      } else if (filter === "low-carb") {
        filteredMeals = allMeals.filter(meal => meal.carbs <= 30);
      } else if (filter === "plant-based") {
        filteredMeals = allMeals.filter(meal => meal.tags.some(tag => 
          ["Vegan", "Plant-Based", "Vegetarian"].includes(tag)));
      } else if (filter === "quick") {
        filteredMeals = allMeals.filter(meal => meal.prepTime <= 15);
      } else {
        filteredMeals = allMeals.filter(meal => meal.mealType === filter);
      }
    }
    
    setDisplayedMeals(filteredMeals.slice(0, 8));
    setActiveFilter(filter);
  };
  
  const shuffleMeals = () => {
    const shuffled = [...allMeals].sort(() => 0.5 - Math.random());
    setDisplayedMeals(shuffled.slice(0, 8));
  };
  
  return (
    <section id="nutrition" className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-apteats-sage-light/40 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-transparent to-apteats-sage-light/40 -z-10"></div>
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-apteats-sage-light text-apteats-moss-dark text-sm font-medium mb-4 animate-on-scroll">
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
                      <div className="h-6 w-6 rounded-full bg-apteats-sage-light flex items-center justify-center mr-3 mt-0.5">
                        <Heart size={14} className="text-apteats-moss-dark" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full md:w-1/2 bg-gradient-sage p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Your Daily Meal Plan</h4>
                  <button className="flex items-center text-sm text-apteats-moss">
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
        
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
          <Button 
            variant={activeFilter === "all" ? "default" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("all")}
          >
            All Meals
          </Button>
          <Button 
            variant={activeFilter === "breakfast" ? "default" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("breakfast")}
          >
            Breakfast
          </Button>
          <Button 
            variant={activeFilter === "lunch" ? "default" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("lunch")}
          >
            Lunch
          </Button>
          <Button 
            variant={activeFilter === "dinner" ? "default" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("dinner")}
          >
            Dinner
          </Button>
          <Button 
            variant={activeFilter === "snack" ? "default" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("snack")}
          >
            Snacks
          </Button>
          <Button 
            variant={activeFilter === "high-protein" ? "default" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("high-protein")}
          >
            High Protein
          </Button>
          <Button 
            variant={activeFilter === "low-carb" ? "default" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("low-carb")}
          >
            Low Carb
          </Button>
          <Button 
            variant={activeFilter === "plant-based" ? "default" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("plant-based")}
          >
            Plant-Based
          </Button>
          <Button 
            variant={activeFilter === "quick" ? "default" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("quick")}
          >
            Quick (<15 min)
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={shuffleMeals}
          >
            <Shuffle size={14} className="mr-1" />
            Shuffle
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {displayedMeals.map((meal, index) => (
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
