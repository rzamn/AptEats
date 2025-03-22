
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { ArrowRight, Calculate } from 'lucide-react';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
type Goal = 'lose' | 'maintain' | 'gain';
type Gender = 'male' | 'female';

const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male' as Gender,
    weight: '',
    height: '',
    activityLevel: 'moderate' as ActivityLevel,
    goal: 'maintain' as Goal
  });
  
  const [result, setResult] = useState<number | null>(null);
  
  const activityLevels = {
    sedentary: { label: 'Sedentary', description: 'Little to no exercise' },
    light: { label: 'Light', description: '1-3 days/week' },
    moderate: { label: 'Moderate', description: '3-5 days/week' },
    active: { label: 'Active', description: '6-7 days/week' },
    'very-active': { label: 'Very Active', description: 'Athletic / Physical job' }
  };
  
  const goals = {
    lose: { label: 'Lose Weight', description: 'Caloric deficit' },
    maintain: { label: 'Maintain', description: 'Stay at current weight' },
    gain: { label: 'Gain Muscle', description: 'Caloric surplus' }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleRadioChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const calculateCalories = () => {
    const { age, gender, weight, height, activityLevel, goal } = formData;
    
    if (!age || !weight || !height) return;
    
    // BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    } else {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
    }
    
    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9
    };
    
    const tdee = bmr * activityMultipliers[activityLevel];
    
    // Goal adjustment
    let calorieNeeds;
    if (goal === 'lose') {
      calorieNeeds = tdee - 500; // 500 calorie deficit
    } else if (goal === 'gain') {
      calorieNeeds = tdee + 500; // 500 calorie surplus
    } else {
      calorieNeeds = tdee; // Maintenance
    }
    
    setResult(Math.round(calorieNeeds));
  };
  
  return (
    <section id="calculator" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-apteats-blue/30 to-transparent -z-10"></div>
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title animate-on-scroll">Personalized Calorie Calculator</h2>
          <p className="section-subtitle mx-auto animate-on-scroll">
            Get an accurate estimate of your daily calorie needs based on your body and fitness goals.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card variant="glass" className="p-8 animate-on-scroll">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3 space-y-6">
                <h3 className="text-2xl font-semibold">Your Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-muted-foreground mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Years"
                      className="input-elegant w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Gender
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          checked={formData.gender === 'male'}
                          onChange={() => handleRadioChange('gender', 'male')}
                          className="mr-2"
                        />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          checked={formData.gender === 'female'}
                          onChange={() => handleRadioChange('gender', 'female')}
                          className="mr-2"
                        />
                        <span>Female</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-muted-foreground mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="kg"
                      className="input-elegant w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-muted-foreground mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="cm"
                      className="input-elegant w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="activityLevel" className="block text-sm font-medium text-muted-foreground mb-1">
                    Activity Level
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(activityLevels).map(([value, { label }]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRadioChange('activityLevel', value)}
                        className={cn(
                          'p-2 text-center text-sm rounded-lg transition-all duration-300',
                          formData.activityLevel === value
                            ? 'bg-primary/10 border-primary text-primary border'
                            : 'bg-secondary border-transparent border hover:bg-secondary/80'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Your Goal
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(goals).map(([value, { label }]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRadioChange('goal', value)}
                        className={cn(
                          'py-3 text-center rounded-lg transition-all duration-300',
                          formData.goal === value
                            ? 'bg-primary/10 border-primary text-primary border'
                            : 'bg-secondary border-transparent border hover:bg-secondary/80'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={calculateCalories} 
                  className="w-full" 
                  icon={<Calculate size={18} />}
                >
                  Calculate Daily Calories
                </Button>
              </div>
              
              <div className="md:col-span-2 flex flex-col">
                <div className="bg-gradient-blue rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center">
                  <h3 className="text-xl font-medium mb-2">Your Daily Calorie Needs</h3>
                  
                  {result ? (
                    <div className="animate-zoom-in">
                      <div className="text-4xl font-bold my-4">{result}</div>
                      <div className="text-lg font-medium text-foreground">Calories/day</div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Based on your {formData.gender === 'male' ? 'male' : 'female'} body profile with {activityLevels[formData.activityLevel].label.toLowerCase()} activity
                      </p>
                      
                      <div className="mt-8">
                        <a href="#nutrition" className="flex items-center justify-center text-sm font-medium text-primary">
                          <span>View meal suggestions</span>
                          <ArrowRight size={16} className="ml-2" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground py-8">
                      Fill in your details and calculate to see your personalized calorie needs
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CalorieCalculator;
