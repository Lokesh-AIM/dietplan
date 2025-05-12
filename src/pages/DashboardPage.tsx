import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MealCard } from '../components/nutrition/MealCard';
import { NutritionChart } from '../components/nutrition/NutritionChart';
import { ProgressChart } from '../components/nutrition/ProgressChart';
import { RefreshCw, Download, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { useDietPlan } from '../context/DietPlanContext';
import { ProgressBar } from '../components/ui/ProgressBar';

export const DashboardPage: React.FC = () => {
  const { weeklyPlan, regeneratePlan, swapMeal, isLoading, progressData, savePlanAsPDF } = useDietPlan();
  const [selectedDay, setSelectedDay] = useState(0);
  
  if (!weeklyPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md text-center p-8">
          <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Diet Plan Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have an active diet plan yet. Complete the onboarding process to generate your personalized plan.
          </p>
          <Button variant="primary" fullWidth href="/onboarding">
            Start Onboarding
          </Button>
        </Card>
      </div>
    );
  }
  
  const dailyPlan = weeklyPlan.dailyPlans[selectedDay];
  const nutritionData = [
    {
      label: 'Protein',
      value: dailyPlan.totalNutrition.protein,
      color: '#3B82F6',
      percentage: Math.round((dailyPlan.totalNutrition.protein * 4 / dailyPlan.totalNutrition.calories) * 100),
    },
    {
      label: 'Carbs',
      value: dailyPlan.totalNutrition.carbs,
      color: '#10B981',
      percentage: Math.round((dailyPlan.totalNutrition.carbs * 4 / dailyPlan.totalNutrition.calories) * 100),
    },
    {
      label: 'Fats',
      value: dailyPlan.totalNutrition.fats,
      color: '#F97316',
      percentage: Math.round((dailyPlan.totalNutrition.fats * 9 / dailyPlan.totalNutrition.calories) * 100),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Diet Plan
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Personalized nutrition plan: {weeklyPlan.startDate} to {weeklyPlan.endDate}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              leftIcon={<Download size={18} />}
              onClick={savePlanAsPDF}
            >
              Export Plan
            </Button>
            <Button
              variant="primary"
              leftIcon={<RefreshCw size={18} />}
              onClick={regeneratePlan}
              isLoading={isLoading}
            >
              Regenerate Plan
            </Button>
          </div>
        </div>
        
        {/* Weekly Overview */}
        <Card className="mb-8">
          <CardHeader className="flex flex-wrap items-center">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Week Overview</h2>
            </div>
            <div className="flex overflow-x-auto py-2 gap-2">
              {weeklyPlan.dailyPlans.map((day, index) => {
                const date = new Date(day.date);
                const isSelected = index === selectedDay;
                
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`
                      min-w-[4.5rem] px-4 py-2 rounded-full flex flex-col items-center justify-center transition-colors
                      ${isSelected 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
                    `}
                  >
                    <span className="text-xs font-medium">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {date.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weeklyPlan.dailyPlans.map((day, index) => {
                const adherencePercentage = progressData[index]?.adherencePercentage || 0;
                return (
                  <div key={index} className={`${index === selectedDay ? 'ring-2 ring-emerald-500' : ''} rounded-lg p-3 bg-gray-50 dark:bg-gray-800`}>
                    <div className="text-center mb-2">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">
                        {new Date(day.date).toLocaleDateString('en-US', { day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-center mb-2">
                      <div className="text-sm font-medium">{day.totalNutrition.calories} kcal</div>
                    </div>
                    <ProgressBar
                      value={adherencePercentage}
                      max={100}
                      size="sm"
                      color="primary"
                    />
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
        
        {/* Daily Meals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Calendar size={20} className="text-emerald-500 mr-2" />
                  <h2 className="text-xl font-semibold">
                    Daily Meals - {new Date(dailyPlan.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h2>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MealCard 
                    meal={dailyPlan.meals.breakfast} 
                    mealType="Breakfast"
                    onSwap={() => swapMeal(selectedDay, 'breakfast', Math.random().toString())}
                  />
                  
                  {dailyPlan.meals.morningSnack && (
                    <MealCard 
                      meal={dailyPlan.meals.morningSnack} 
                      mealType="Morning Snack"
                      onSwap={() => swapMeal(selectedDay, 'morningSnack', Math.random().toString())}
                    />
                  )}
                  
                  <MealCard 
                    meal={dailyPlan.meals.lunch} 
                    mealType="Lunch"
                    onSwap={() => swapMeal(selectedDay, 'lunch', Math.random().toString())}
                  />
                  
                  {dailyPlan.meals.eveningSnack && (
                    <MealCard 
                      meal={dailyPlan.meals.eveningSnack} 
                      mealType="Evening Snack"
                      onSwap={() => swapMeal(selectedDay, 'eveningSnack', Math.random().toString())}
                    />
                  )}
                  
                  <MealCard 
                    meal={dailyPlan.meals.dinner} 
                    mealType="Dinner"
                    onSwap={() => swapMeal(selectedDay, 'dinner', Math.random().toString())}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          
          <div>
            {/* Nutrition Summary */}
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-xl font-semibold">Nutrition Summary</h2>
              </CardHeader>
              <CardBody>
                <div className="flex justify-center mb-4">
                  <NutritionChart data={nutritionData} size={220} />
                </div>
                
                <div className="mt-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Calories</div>
                      <div className="text-xl font-bold">{dailyPlan.totalNutrition.calories}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Protein</div>
                      <div className="text-xl font-bold">{dailyPlan.totalNutrition.protein}g</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Carbs</div>
                      <div className="text-xl font-bold">{dailyPlan.totalNutrition.carbs}g</div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            {/* Progress Projection */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <TrendingUp size={20} className="text-emerald-500 mr-2" />
                  <h2 className="text-xl font-semibold">Progress Projection</h2>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Projected Weight Change</div>
                  <div className="text-2xl font-bold">
                    {weeklyPlan.projected.weightChange > 0 ? '+' : ''}
                    {weeklyPlan.projected.weightChange} kg
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    over {weeklyPlan.projected.timelineWeeks} weeks
                  </div>
                </div>
                
                {progressData.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Weight Trend</h3>
                    <ProgressChart
                      data={progressData}
                      dataKey="weight"
                      color="#10B981"
                    />
                  </div>
                )}
                
                <div className="mt-6">
                  <Button variant="outline" fullWidth>
                    View Detailed Analytics
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};