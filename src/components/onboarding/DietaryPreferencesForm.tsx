import React, { useState } from 'react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CheckboxGroup } from '../ui/Checkbox';
import { Input } from '../ui/Input';
import { useOnboarding } from '../../context/OnboardingContext';

export const DietaryPreferencesForm: React.FC = () => {
  const { data, updateDietaryPreferences, goToNextStep, goToPreviousStep } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customAllergy, setCustomAllergy] = useState('');

  const commonAllergies = [
    { value: 'dairy', label: 'Dairy' },
    { value: 'eggs', label: 'Eggs' },
    { value: 'fish', label: 'Fish' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'tree-nuts', label: 'Tree Nuts' },
    { value: 'peanuts', label: 'Peanuts' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'soy', label: 'Soy' },
    { value: 'gluten', label: 'Gluten' },
  ];
  
  const cuisineOptions = [
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'indian', label: 'Indian' },
    { value: 'thai', label: 'Thai' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'american', label: 'American' },
    { value: 'middle-eastern', label: 'Middle Eastern' },
    { value: 'french', label: 'French' },
  ];

  const handleAddCustomAllergy = () => {
    if (customAllergy.trim() !== '') {
      const customAllergyValue = customAllergy.trim().toLowerCase().replace(/\s+/g, '-');
      if (!data.dietaryPreferences.allergies.includes(customAllergyValue)) {
        updateDietaryPreferences({ 
          allergies: [...data.dietaryPreferences.allergies, customAllergyValue] 
        });
        setCustomAllergy('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (data.dietaryPreferences.mealsPerDay <= 0) {
      newErrors.mealsPerDay = 'Number of meals must be greater than 0';
    }
    
    setErrors(newErrors);
    
    // If no errors, proceed to next step
    if (Object.keys(newErrors).length === 0) {
      goToNextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="space-y-6">
        <Select
          label="Diet Type"
          value={data.dietaryPreferences.dietType}
          onChange={(value) => updateDietaryPreferences({ dietType: value as any })}
          options={[
            { value: 'vegetarian', label: 'Vegetarian' },
            { value: 'non-vegetarian', label: 'Non-Vegetarian' },
            { value: 'semi-vegetarian', label: 'Semi-Vegetarian' },
            { value: 'vegan', label: 'Vegan' },
          ]}
          helperText="Select your dietary preference"
          fullWidth
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Allergies or Food Intolerances
          </label>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <CheckboxGroup
              options={commonAllergies}
              selectedValues={data.dietaryPreferences.allergies}
              onChange={(values) => updateDietaryPreferences({ allergies: values })}
              direction="horizontal"
            />
            
            <div className="mt-4 flex">
              <Input
                placeholder="Add a custom allergy"
                value={customAllergy}
                onChange={(e) => setCustomAllergy(e.target.value)}
                className="!mb-0"
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="ml-2"
                onClick={handleAddCustomAllergy}
              >
                Add
              </Button>
            </div>
            
            {data.dietaryPreferences.allergies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {data.dietaryPreferences.allergies.map((allergy) => (
                  <div 
                    key={allergy} 
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm flex items-center gap-1"
                  >
                    {allergy}
                    <button
                      type="button"
                      className="ml-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => updateDietaryPreferences({ 
                        allergies: data.dietaryPreferences.allergies.filter(a => a !== allergy) 
                      })}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Cuisine Preferences
          </label>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <CheckboxGroup
              options={cuisineOptions}
              selectedValues={data.dietaryPreferences.cuisinePreferences}
              onChange={(values) => updateDietaryPreferences({ cuisinePreferences: values })}
              direction="horizontal"
            />
          </div>
        </div>
        
        <Select
          label="Budget Range"
          value={data.dietaryPreferences.budgetRange}
          onChange={(value) => updateDietaryPreferences({ budgetRange: value as any })}
          options={[
            { value: 'low', label: 'Low - Budget friendly meals' },
            { value: 'medium', label: 'Medium - Moderate cost meals' },
            { value: 'high', label: 'High - Premium ingredients' },
          ]}
          fullWidth
        />
        
        <Input
          label="Number of Meals/Snacks Per Day"
          type="number"
          value={data.dietaryPreferences.mealsPerDay === 0 ? '' : data.dietaryPreferences.mealsPerDay}
          onChange={(e) => updateDietaryPreferences({ mealsPerDay: parseInt(e.target.value) || 0 })}
          placeholder="How many meals do you eat daily?"
          error={errors.mealsPerDay}
          min="1"
          max="6"
          fullWidth
        />
      </div>
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" size="lg" onClick={goToPreviousStep}>
          Previous
        </Button>
        <Button type="submit" variant="primary" size="lg">
          Next Step
        </Button>
      </div>
    </form>
  );
};