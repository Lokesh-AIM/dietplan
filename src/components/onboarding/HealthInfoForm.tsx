import React, { useState } from 'react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CheckboxGroup } from '../ui/Checkbox';
import { Input } from '../ui/Input';
import { useOnboarding } from '../../context/OnboardingContext';
import { useDietPlan } from '../../context/DietPlanContext';

export const HealthInfoForm: React.FC = () => {
  const { data, updateHealthInfo, goToPreviousStep } = useOnboarding();
  const { generatePlan, isLoading } = useDietPlan();
  const [customCondition, setCustomCondition] = useState('');
  
  const healthGoalOptions = [
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'maintenance', label: 'Maintenance' },
  ];
  
  const commonMedicalConditions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Hypertension' },
    { value: 'cholesterol', label: 'High Cholesterol' },
    { value: 'heart-disease', label: 'Heart Disease' },
    { value: 'kidney-disease', label: 'Kidney Disease' },
    { value: 'pcos', label: 'PCOS' },
    { value: 'thyroid', label: 'Thyroid Issues' },
    { value: 'ibs', label: 'IBS' },
    { value: 'gerd', label: 'GERD/Acid Reflux' },
  ];

  const handleAddCustomCondition = () => {
    if (customCondition.trim() !== '') {
      const customConditionValue = customCondition.trim().toLowerCase().replace(/\s+/g, '-');
      if (!data.healthInfo.medicalConditions.includes(customConditionValue)) {
        updateHealthInfo({ 
          medicalConditions: [...data.healthInfo.medicalConditions, customConditionValue] 
        });
        setCustomCondition('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (could add validations here if needed)
    
    // Generate diet plan
    await generatePlan();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Health Goals
          </label>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <CheckboxGroup
              options={healthGoalOptions}
              selectedValues={data.healthInfo.healthGoals}
              onChange={(values) => updateHealthInfo({ healthGoals: values as any[] })}
              helperText="Select one or more health goals"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Bedtime"
            type="time"
            value={data.healthInfo.sleepPattern.bedtime}
            onChange={(e) => updateHealthInfo({ 
              sleepPattern: { ...data.healthInfo.sleepPattern, bedtime: e.target.value } 
            })}
            fullWidth
          />
          
          <Input
            label="Wake-up Time"
            type="time"
            value={data.healthInfo.sleepPattern.wakeupTime}
            onChange={(e) => updateHealthInfo({ 
              sleepPattern: { ...data.healthInfo.sleepPattern, wakeupTime: e.target.value } 
            })}
            fullWidth
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Medical Conditions
          </label>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <CheckboxGroup
              options={commonMedicalConditions}
              selectedValues={data.healthInfo.medicalConditions}
              onChange={(values) => updateHealthInfo({ medicalConditions: values })}
              direction="horizontal"
            />
            
            <div className="mt-4 flex">
              <Input
                placeholder="Add a medical condition"
                value={customCondition}
                onChange={(e) => setCustomCondition(e.target.value)}
                className="!mb-0"
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="ml-2"
                onClick={handleAddCustomCondition}
              >
                Add
              </Button>
            </div>
            
            {data.healthInfo.medicalConditions.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {data.healthInfo.medicalConditions.map((condition) => (
                  <div 
                    key={condition} 
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm flex items-center gap-1"
                  >
                    {condition}
                    <button
                      type="button"
                      className="ml-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => updateHealthInfo({ 
                        medicalConditions: data.healthInfo.medicalConditions.filter(c => c !== condition) 
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
      </div>
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" size="lg" onClick={goToPreviousStep}>
          Previous
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          isLoading={isLoading}
        >
          Generate Diet Plan
        </Button>
      </div>
    </form>
  );
};