export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface PersonalInfo {
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  height: { value: number; unit: 'cm' | 'ft' };
  weight: { value: number; unit: 'kg' | 'lbs' };
  activityStatus: 'student' | 'working-professional' | 'homemaker' | 'retired' | 'other';
  workingHours?: number;
  workoutDuration: number;
  workoutIntensity: 'low' | 'moderate' | 'high';
}

export interface DietaryPreferences {
  dietType: 'vegetarian' | 'non-vegetarian' | 'semi-vegetarian' | 'vegan';
  allergies: string[];
  cuisinePreferences: string[];
  budgetRange: 'low' | 'medium' | 'high';
  mealsPerDay: number;
}

export interface HealthInfo {
  healthGoals: ('weight-loss' | 'muscle-gain' | 'maintenance')[];
  sleepPattern: { bedtime: string; wakeupTime: string };
  medicalConditions: string[];
}

export interface OnboardingData {
  personalInfo: PersonalInfo;
  dietaryPreferences: DietaryPreferences;
  healthInfo: HealthInfo;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  preparationTime: number;
  allergensPresent: string[];
  dietType: 'vegetarian' | 'non-vegetarian' | 'semi-vegetarian' | 'vegan';
  budgetLevel: 'low' | 'medium' | 'high';
  cuisineType: string;
}

export interface DailyPlan {
  date: string;
  meals: {
    breakfast: Meal;
    morningSnack?: Meal;
    lunch: Meal;
    eveningSnack?: Meal;
    dinner: Meal;
  };
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface WeeklyPlan {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  dailyPlans: DailyPlan[];
  projected: {
    weightChange: number;
    timelineWeeks: number;
  };
}

export interface ProgressData {
  date: string;
  weight: number;
  calories: number;
  adherencePercentage: number;
}