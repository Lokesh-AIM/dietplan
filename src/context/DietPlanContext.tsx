import React, { createContext, useContext, useState } from 'react';
import { WeeklyPlan, DailyPlan, ProgressData } from '../types';
import { useAuth } from './AuthContext';
import { useOnboarding } from './OnboardingContext';

interface DietPlanContextType {
  weeklyPlan: WeeklyPlan | null;
  isLoading: boolean;
  generatePlan: () => Promise<void>;
  regeneratePlan: () => Promise<void>;
  swapMeal: (dayIndex: number, mealType: string, alternativeId: string) => Promise<void>;
  progressData: ProgressData[];
  savePlanAsPDF: () => void;
}

const DietPlanContext = createContext<DietPlanContextType>({
  weeklyPlan: null,
  isLoading: false,
  generatePlan: async () => {},
  regeneratePlan: async () => {},
  swapMeal: async () => {},
  progressData: [],
  savePlanAsPDF: () => {},
});

export const useDietPlan = () => useContext(DietPlanContext);

// Mock data for sample meal
const createMockMeal = (id: string, name: string, dietType: 'vegetarian' | 'non-vegetarian' | 'semi-vegetarian' | 'vegan') => ({
  id,
  name,
  description: 'A delicious and nutritious meal that provides balanced nutrition.',
  image: `https://images.pexels.com/photos/${1000000 + parseInt(id, 10)}/pexels-photo-${1000000 + parseInt(id, 10)}.jpeg?auto=compress&cs=tinysrgb&w=600`,
  calories: Math.floor(Math.random() * 400) + 200,
  protein: Math.floor(Math.random() * 30) + 10,
  carbs: Math.floor(Math.random() * 40) + 20,
  fats: Math.floor(Math.random() * 20) + 5,
  ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4'],
  preparationTime: Math.floor(Math.random() * 30) + 10,
  allergensPresent: [],
  dietType,
  budgetLevel: 'medium' as const,
  cuisineType: 'International',
});

// Generate a daily plan with meals
const generateMockDailyPlan = (date: string, dayIndex: number, dietType: 'vegetarian' | 'non-vegetarian' | 'semi-vegetarian' | 'vegan'): DailyPlan => {
  const breakfast = createMockMeal(`${dayIndex}1`, 'Healthy Breakfast Bowl', dietType);
  const lunch = createMockMeal(`${dayIndex}2`, 'Nutritious Lunch Plate', dietType);
  const dinner = createMockMeal(`${dayIndex}3`, 'Balanced Dinner Meal', dietType);
  const morningSnack = createMockMeal(`${dayIndex}4`, 'Healthy Morning Snack', dietType);
  const eveningSnack = createMockMeal(`${dayIndex}5`, 'Energizing Evening Snack', dietType);

  const totalCalories = breakfast.calories + lunch.calories + dinner.calories + morningSnack.calories + eveningSnack.calories;
  const totalProtein = breakfast.protein + lunch.protein + dinner.protein + morningSnack.protein + eveningSnack.protein;
  const totalCarbs = breakfast.carbs + lunch.carbs + dinner.carbs + morningSnack.carbs + eveningSnack.carbs;
  const totalFats = breakfast.fats + lunch.fats + dinner.fats + morningSnack.fats + eveningSnack.fats;

  return {
    date,
    meals: {
      breakfast,
      lunch,
      dinner,
      morningSnack,
      eveningSnack,
    },
    totalNutrition: {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fats: totalFats,
    },
  };
};

export const DietPlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const { user } = useAuth();
  const { data } = useOnboarding();

  const generatePlan = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get current date and next 6 days
      const today = new Date();
      const dailyPlans: DailyPlan[] = [];

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];
        dailyPlans.push(generateMockDailyPlan(dateString, i + 1, data.dietaryPreferences.dietType));
      }

      const newWeeklyPlan: WeeklyPlan = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        startDate: today.toISOString().split('T')[0],
        endDate: new Date(today.setDate(today.getDate() + 6)).toISOString().split('T')[0],
        dailyPlans,
        projected: {
          weightChange: -0.5, // kg per week
          timelineWeeks: 10,
        },
      };

      setWeeklyPlan(newWeeklyPlan);

      // Generate mock progress data
      const mockProgressData: ProgressData[] = [];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // Start from 30 days ago

      for (let i = 0; i < 30; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];
        
        mockProgressData.push({
          date: dateString,
          weight: 75 - (i * 0.05), // Gradual weight loss
          calories: 1800 + Math.floor(Math.random() * 200), // Random daily calorie intake
          adherencePercentage: 70 + Math.floor(Math.random() * 30), // Random adherence percentage
        });
      }

      setProgressData(mockProgressData);

      // Navigate to dashboard after successful plan generation
      window.history.pushState({}, '', '/dashboard');
      window.dispatchEvent(new CustomEvent('navigation', { detail: { path: '/dashboard' } }));
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const regeneratePlan = async () => {
    if (!user || !weeklyPlan) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const dailyPlans = weeklyPlan.dailyPlans.map((plan, index) => {
        return generateMockDailyPlan(plan.date, index + 1, data.dietaryPreferences.dietType);
      });

      setWeeklyPlan({
        ...weeklyPlan,
        id: Math.random().toString(36).substr(2, 9),
        dailyPlans,
      });
    } catch (error) {
      console.error('Error regenerating plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const swapMeal = async (dayIndex: number, mealType: string, alternativeId: string) => {
    if (!weeklyPlan) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedDailyPlans = [...weeklyPlan.dailyPlans];
      const targetDay = updatedDailyPlans[dayIndex];
      
      if (targetDay && targetDay.meals[mealType as keyof typeof targetDay.meals]) {
        const newMeal = createMockMeal(
          alternativeId,
          `Alternative ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`,
          data.dietaryPreferences.dietType
        );
        
        // Update the meal
        const updatedMeals = {
          ...targetDay.meals,
          [mealType]: newMeal
        };
        
        // Recalculate total nutrition
        const mealArray = Object.values(updatedMeals);
        const totalNutrition = {
          calories: mealArray.reduce((sum, meal) => sum + meal.calories, 0),
          protein: mealArray.reduce((sum, meal) => sum + meal.protein, 0),
          carbs: mealArray.reduce((sum, meal) => sum + meal.carbs, 0),
          fats: mealArray.reduce((sum, meal) => sum + meal.fats, 0),
        };
        
        // Update the day's plan
        updatedDailyPlans[dayIndex] = {
          ...targetDay,
          meals: updatedMeals,
          totalNutrition,
        };
        
        // Update the weekly plan
        setWeeklyPlan({
          ...weeklyPlan,
          dailyPlans: updatedDailyPlans,
        });
      }
    } catch (error) {
      console.error('Error swapping meal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePlanAsPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF generation would happen here in a real application.');
  };

  return (
    <DietPlanContext.Provider
      value={{
        weeklyPlan,
        isLoading,
        generatePlan,
        regeneratePlan,
        swapMeal,
        progressData,
        savePlanAsPDF,
      }}
    >
      {children}
    </DietPlanContext.Provider>
  );
};