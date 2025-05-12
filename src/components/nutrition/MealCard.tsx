import React from 'react';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { RefreshCw } from 'lucide-react';
import { Meal } from '../../types';

interface MealCardProps {
  meal: Meal;
  mealType: string;
  onSwap?: () => void;
  className?: string;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  mealType,
  onSwap,
  className = '',
}) => {
  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${className}`} 
      hover={true}
    >
      <div className="relative">
        <img 
          src={meal.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600'} 
          alt={meal.name} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 bg-emerald-500 text-white px-3 py-1 text-sm font-semibold rounded-br-lg">
          {mealType}
        </div>
      </div>
      <CardBody>
        <div className="mb-2">
          <h3 className="text-lg font-semibold">{meal.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {meal.description && meal.description.length > 80
              ? `${meal.description.substring(0, 80)}...`
              : meal.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">Calories</div>
            <div className="font-semibold">{meal.calories} kcal</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">Protein</div>
            <div className="font-semibold">{meal.protein}g</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">Carbs</div>
            <div className="font-semibold">{meal.carbs}g</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">Fats</div>
            <div className="font-semibold">{meal.fats}g</div>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Prep Time</div>
          <div className="font-medium text-sm">{meal.preparationTime} minutes</div>
        </div>
        
        {onSwap && (
          <Button 
            variant="outline" 
            size="sm" 
            fullWidth 
            className="mt-4"
            onClick={onSwap}
            leftIcon={<RefreshCw size={16} />}
          >
            Swap Meal
          </Button>
        )}
      </CardBody>
    </Card>
  );
};