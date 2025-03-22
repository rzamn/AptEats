import React, { useState, useEffect } from 'react';
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { UserCalorieContext } from '@/pages/Index';

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
  imageUrl?: string;
}

interface MealSuggestionsProps {
  userContext?: UserCalorieContext;
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
  mealType,
  imageUrl 
}: MealCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div 
        className="aspect-video bg-apteats-sage-light flex items-center justify-center relative" 
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundColor: imageColor }}
      >
        {!imageUrl && (
          <>
            {mealType === 'breakfast' && <Egg className="text-white" size={32} />}
            {mealType === 'lunch' && <Salad className="text-white" size={32} />}
            {mealType === 'dinner' && <Utensils className="text-white" size={32} />}
            {mealType === 'snack' && <Wheat className="text-white" size={32} />}
          </>
        )}
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

const allMeals = [
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1542578894-e1b6ba55690e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbG1vbiUyMGJvd2x8ZW58MHx8MHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1547496502-affa22d38ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVlZiUyMHN0aXIlMjBmcnl8ZW58MHx8MHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1547496502-affa22d38ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVlZiUyMHN0aXIlMjBmcnl8ZW58MHx8MHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1619537343778-f9669b95e41a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb3RlaW4lMjBlbmVyZ3klMjBiaXRlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1608837298211-e51ca9c4451a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y290dGFnZSUyMGNoZWVzZSUyMGFuZCUyMGZydWl0fGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
    ],
    imageUrl: "https://images.unsplash.com/photo-1518847446217-67ca670f2294?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVnZXRhYmxlJTIwY3J1ZGl0JTIwd2l0aCUyMGh1bW11c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  }
];

const highCalorieMeals = [
  {
    title: "High Protein Breakfast Bowl",
    description: "Scrambled eggs with turkey bacon, avocado, and sweet potato hash",
    calories: 650,
    protein: 45,
    carbs: 42,
    fat: 28,
    fiber: 9,
    prepTime: 25,
    imageColor: "#D1DCCC",
    tags: ["High Protein", "Post-Workout"],
    mealType: "breakfast",
    nutrients: [
      { name: "Vitamin D", amount: 5, unit: "mcg" },
      { name: "Choline", amount: 250, unit: "mg" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1529564879024-c54e7c2dd0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Bulking Lunch Plate",
    description: "Grilled steak with sweet potato, broccoli, and quinoa",
    calories: 820,
    protein: 52,
    carbs: 65,
    fat: 35,
    fiber: 12,
    prepTime: 30,
    imageColor: "#8EA382",
    tags: ["High Calorie", "Muscle Building"],
    mealType: "lunch",
    nutrients: [
      { name: "Iron", amount: 6, unit: "mg" },
      { name: "Zinc", amount: 8, unit: "mg" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Mass Gainer Dinner",
    description: "Grilled salmon with brown rice, avocado, and roasted vegetables",
    calories: 780,
    protein: 48,
    carbs: 70,
    fat: 32,
    fiber: 13,
    prepTime: 35,
    imageColor: "#A3B598",
    tags: ["Omega-3", "High Calorie"],
    mealType: "dinner",
    nutrients: [
      { name: "Vitamin D", amount: 15, unit: "mcg" },
      { name: "Omega-3", amount: 2.5, unit: "g" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const lowCalorieMeals = [
  {
    title: "Light Breakfast Bowl",
    description: "Egg whites with spinach, mushrooms, and a small portion of oatmeal",
    calories: 280,
    protein: 24,
    carbs: 25,
    fat: 8,
    fiber: 6,
    prepTime: 15,
    imageColor: "#E4EBE0",
    tags: ["Low Calorie", "High Protein"],
    mealType: "breakfast",
    nutrients: [
      { name: "Folate", amount: 110, unit: "mcg" },
      { name: "Iron", amount: 2.5, unit: "mg" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Slimming Lunch Salad",
    description: "Grilled chicken breast with mixed greens, cucumber, and light vinaigrette",
    calories: 320,
    protein: 35,
    carbs: 12,
    fat: 14,
    fiber: 4,
    prepTime: 20,
    imageColor: "#B3C1AC",
    tags: ["Weight Loss", "Low Carb"],
    mealType: "lunch",
    nutrients: [
      { name: "Vitamin C", amount: 45, unit: "mg" },
      { name: "Vitamin K", amount: 120, unit: "mcg" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Light Dinner Plate",
    description: "Baked white fish with steamed vegetables and cauliflower rice",
    calories: 310,
    protein: 32,
    carbs: 15,
    fat: 12,
    fiber: 6,
    prepTime: 25,
    imageColor: "#D1DCCC",
    tags: ["Low Calorie", "Low Carb"],
    mealType: "dinner",
    nutrients: [
      { name: "Selenium", amount: 45, unit: "mcg" },
      { name: "Iodine", amount: 150, unit: "mcg" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const initialDailyMealPlan = [
  { meal: "Breakfast", food: "Greek Yogurt with Berries", calories: 320, protein: 22 },
  { meal: "Lunch", food: "Grilled Chicken Salad", calories: 450, protein: 35 },
  { meal: "Snack", food: "Protein Shake with Almonds", calories: 250, protein: 20 },
  { meal: "Dinner", food: "Salmon with Roasted Vegetables", calories: 520, protein: 30 }
];

const mealPlanOptions = [
  [
    { meal: "Breakfast", food: "Avocado Toast with Egg", calories: 380, protein: 18 },
    { meal: "Lunch", food: "Mediterranean Bowl", calories: 480, protein: 18 },
    { meal: "Snack", food: "Cottage Cheese & Fruit", calories: 180, protein: 22 },
    { meal: "Dinner", food: "Grass-Fed Beef Stir Fry", calories: 410, protein: 32 }
  ],
  [
    { meal: "Breakfast", food: "Protein Smoothie Bowl", calories: 390, protein: 30 },
    { meal: "Lunch", food: "Salmon Poke Bowl", calories: 520, protein: 32 },
    { meal: "Snack", food: "Protein Energy Bites", calories: 210, protein: 12 },
    { meal: "Dinner", food: "Lentil & Vegetable Curry", calories: 380, protein: 18 }
  ],
  [
    { meal: "Breakfast", food: "Greek Yogurt Parfait", calories: 320, protein: 22 },
    { meal: "Lunch", food: "Grilled Chicken Bowl", calories: 450, protein: 35 },
    { meal: "Snack", food: "Vegetable Crudité with Hummus", calories: 160, protein: 6 },
    { meal: "Dinner", food: "Salmon with Sweet Potato", calories: 520, protein: 28 }
  ]
];

const highCalorieMealPlans = [
  [
    { meal: "Breakfast", food: "High Protein Breakfast Bowl", calories: 650, protein: 45 },
    { meal: "Lunch", food: "Bulking Lunch Plate", calories: 820, protein: 52 },
    { meal: "Snack", food: "Protein Energy Bites", calories: 210, protein: 12 },
    { meal: "Dinner", food: "Mass Gainer Dinner", calories: 780, protein: 48 }
  ],
  [
    { meal: "Breakfast", food: "Protein Oatmeal with Nuts", calories: 580, protein: 38 },
    { meal: "Lunch", food: "Chicken and Rice Bowl with Avocado", calories: 750, protein: 45 },
    { meal: "Snack", food: "Greek Yogurt with Honey and Granola", calories: 320, protein: 22 },
    { meal: "Dinner", food: "Steak with Sweet Potato and Vegetables", calories: 820, protein: 50 }
  ]
];

const lowCalorieMealPlans = [
  [
    { meal: "Breakfast", food: "Light Breakfast Bowl", calories: 280, protein: 24 },
    { meal: "Lunch", food: "Slimming Lunch Salad", calories: 320, protein: 35 },
    { meal: "Snack", food: "Vegetable Crudité with Hummus", calories: 160, protein: 6 },
    { meal: "Dinner", food: "Light Dinner Plate", calories: 310, protein: 32 }
  ],
  [
    { meal: "Breakfast", food: "Berry Protein Smoothie", calories: 250, protein: 25 },
    { meal: "Lunch", food: "Tuna Salad with Greens", calories: 300, protein: 30 },
    { meal: "Snack", food: "Apple with Almond Butter", calories: 180, protein: 5 },
    { meal: "Dinner", food: "Turkey Breast with Vegetables", calories: 340, protein: 35 }
  ]
];

const MealSuggestions: React.FC<MealSuggestionsProps> = ({ userContext }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [displayedMeals, setDisplayedMeals] = useState(allMeals.slice(0, 8));
  const [dailyMealPlan, setDailyMealPlan] = useState(initialDailyMealPlan);
  
  useEffect(() => {
    if (userContext?.calorieNeeds) {
      updateMealDisplay(userContext);
      updateMealPlan(userContext);
    }
  }, [userContext]);

  const updateMealDisplay = (context: UserCalorieContext) => {
    let filteredMeals = [...allMeals];
    
    if (context.calorieNeeds && context.calorieNeeds > 2500) {
      filteredMeals = [...filteredMeals, ...highCalorieMeals];
    } else if (context.calorieNeeds && context.calorieNeeds < 1800) {
      filteredMeals = [...filteredMeals, ...lowCalorieMeals];
    }
    
    if (context.goal === 'lose') {
      filteredMeals.sort((a, b) => (b.protein / b.calories) - (a.protein / a.calories));
    } else if (context.goal === 'gain') {
      filteredMeals.sort((a, b) => (b.calories + b.protein) - (a.calories + a.protein));
    }
    
    setDisplayedMeals(filteredMeals.slice(0, 8));
  };

  const updateMealPlan = (context: UserCalorieContext) => {
    let selectedMealPlan;
    
    if (context.calorieNeeds && context.calorieNeeds > 2500) {
      const randomIndex = Math.floor(Math.random() * highCalorieMealPlans.length);
      selectedMealPlan = highCalorieMealPlans[randomIndex];
    } else if (context.calorieNeeds && context.calorieNeeds < 1800) {
      const randomIndex = Math.floor(Math.random() * lowCalorieMealPlans.length);
      selectedMealPlan = lowCalorieMealPlans[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * mealPlanOptions.length);
      selectedMealPlan = mealPlanOptions[randomIndex];
    }
    
    setDailyMealPlan(selectedMealPlan);
  };
  
  const filterMeals = (filter: string) => {
    let filteredMeals = allMeals;
    
    if (userContext?.calorieNeeds && userContext.calorieNeeds > 2500) {
      filteredMeals = [...filteredMeals, ...highCalorieMeals];
    } else if (userContext?.calorieNeeds && userContext.calorieNeeds < 1800) {
      filteredMeals = [...filteredMeals, ...lowCalorieMeals];
    }
    
    if (filter !== "all") {
      if (filter === "high-protein") {
        filteredMeals = filteredMeals.filter(meal => meal.protein >= 20);
      } else if (filter === "low-carb") {
        filteredMeals = filteredMeals.filter(meal => meal.carbs <= 30);
      } else if (filter === "plant-based") {
        filteredMeals = filteredMeals.filter(meal => meal.tags.some(tag => 
          ["Vegan", "Plant-Based", "Vegetarian"].includes(tag)));
      } else if (filter === "quick") {
        filteredMeals = filteredMeals.filter(meal => meal.prepTime <= 15);
      } else {
        filteredMeals = filteredMeals.filter(meal => meal.mealType === filter);
      }
    }
    
    setDisplayedMeals(filteredMeals.slice(0, 8));
    setActiveFilter(filter);
  };
  
  const shuffleMeals = () => {
    let mealsToShuffle = [...allMeals];
    
    if (userContext?.calorieNeeds && userContext.calorieNeeds > 2500) {
      mealsToShuffle = [...mealsToShuffle, ...highCalorieMeals];
    } else if (userContext?.calorieNeeds && userContext.calorieNeeds < 1800) {
      mealsToShuffle = [...mealsToShuffle, ...lowCalorieMeals];
    }
    
    const shuffled = [...mealsToShuffle].sort(() => 0.5 - Math.random());
    setDisplayedMeals(shuffled.slice(0, 8));
  };
  
  const refreshMealPlan = () => {
    if (userContext?.calorieNeeds) {
      updateMealPlan(userContext);
      toast.success("Meal plan refreshed with new options!");
    }
  };
  
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-apteats-charcoal mb-8">Personalized Meal Suggestions</h2>
      
      {userContext?.calorieNeeds && (
        <div className="mb-8 p-5 bg-apteats-sage-light rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">Your Daily Meal Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {dailyMealPlan.map((meal, index) => (
              <Card key={index} className="bg-white">
                <div className="p-4">
                  <div className="text-sm text-apteats-moss font-medium mb-1">{meal.meal}</div>
                  <div className="font-medium mb-2">{meal.food}</div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{meal.calories} kcal</span>
                    <span>{meal.protein}g protein</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium">Total: </span>
              <span>
                {dailyMealPlan.reduce((sum, meal) => sum + meal.calories, 0)} kcal, 
                {dailyMealPlan.reduce((sum, meal) => sum + meal.protein, 0)}g protein
              </span>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex items-center" 
              onClick={refreshMealPlan}
            >
              <Shuffle size={16} className="mr-2" />
              Refresh Meal Plan
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button 
            variant={activeFilter === "all" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("all")}
          >
            All
          </Button>
          <Button 
            variant={activeFilter === "breakfast" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("breakfast")}
          >
            Breakfast
          </Button>
          <Button 
            variant={activeFilter === "lunch" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("lunch")}
          >
            Lunch
          </Button>
          <Button 
            variant={activeFilter === "dinner" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("dinner")}
          >
            Dinner
          </Button>
          <Button 
            variant={activeFilter === "snack" ? "primary" : "outline"} 
            size="sm" 
            onClick={() => filterMeals("snack")}
          >
            Snack
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="py-6">
                <h3 className="font-semibold mb-4">Filter Meals</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Dietary Preferences</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={activeFilter === "plant-based" ? "primary" : "outline"} 
                        size="sm" 
                        onClick={() => filterMeals("plant-based")}
                        className="w-full justify-start"
                      >
                        <Leaf size={16} className="mr-2" /> Plant-Based
                      </Button>
                      <Button 
                        variant={activeFilter === "high-protein" ? "primary" : "outline"} 
                        size="sm" 
                        onClick={() => filterMeals("high-protein")}
                        className="w-full justify-start"
                      >
                        <Heart size={16} className="mr-2" /> High Protein
                      </Button>
                      <Button 
                        variant={activeFilter === "low-carb" ? "primary" : "outline"} 
                        size="sm" 
                        onClick={() => filterMeals("low-carb")}
                        className="w-full justify-start"
                      >
                        <Heart size={16} className="mr-2" /> Low Carb
                      </Button>
                      <Button 
                        variant={activeFilter === "quick" ? "primary" : "outline"} 
                        size="sm" 
                        onClick={() => filterMeals("quick")}
                        className="w-full justify-start"
                      >
                        <Clock size={16} className="mr-2" /> Quick Prep
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={shuffleMeals}
          >
            <Shuffle size={16} className="mr-2" />
            Shuffle
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedMeals.map((meal, index) => (
          <MealCard 
            key={index}
            title={meal.title}
            description={meal.description}
            calories={meal.calories}
            protein={meal.protein}
            carbs={meal.carbs}
            fat={meal.fat} 
            fiber={meal.fiber}
            prepTime={meal.prepTime}
            imageColor={meal.imageColor}
            tags={meal.tags}
            mealType={meal.mealType}
            nutrients={meal.nutrients}
            imageUrl={meal.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default MealSuggestions;

