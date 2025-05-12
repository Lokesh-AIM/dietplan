import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useOnboarding } from '../../context/OnboardingContext';

export const PersonalInfoForm: React.FC = () => {
  const { data, updatePersonalInfo, goToNextStep } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!data.personalInfo.fullName) {
      newErrors.fullName = 'Name is required';
    }
    
    if (data.personalInfo.age <= 0) {
      newErrors.age = 'Age must be greater than 0';
    }
    
    if (data.personalInfo.height.value <= 0) {
      newErrors.height = 'Height must be greater than 0';
    }
    
    if (data.personalInfo.weight.value <= 0) {
      newErrors.weight = 'Weight must be greater than 0';
    }
    
    setErrors(newErrors);
    
    // If no errors, proceed to next step
    if (Object.keys(newErrors).length === 0) {
      goToNextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="space-y-4">
        <Input
          label="Full Name"
          value={data.personalInfo.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          placeholder="Enter your full name"
          error={errors.fullName}
          fullWidth
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Age"
            type="number"
            value={data.personalInfo.age === 0 ? '' : data.personalInfo.age}
            onChange={(e) => updatePersonalInfo({ age: parseInt(e.target.value) || 0 })}
            placeholder="Enter your age"
            min="0"
            error={errors.age}
            fullWidth
          />
          
          <Select
            label="Gender"
            value={data.personalInfo.gender}
            onChange={(value) => updatePersonalInfo({ gender: value as any })}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'non-binary', label: 'Non-binary' },
              { value: 'prefer-not-to-say', label: 'Prefer not to say' },
            ]}
            fullWidth
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                label="Height"
                type="number"
                value={data.personalInfo.height.value === 0 ? '' : data.personalInfo.height.value}
                onChange={(e) => updatePersonalInfo({ 
                  height: { 
                    ...data.personalInfo.height, 
                    value: parseFloat(e.target.value) || 0 
                  } 
                })}
                placeholder="Enter your height"
                min="0"
                step="0.01"
                error={errors.height}
                fullWidth
              />
            </div>
            <div className="w-24 flex-shrink-0">
              <Select
                label="Unit"
                value={data.personalInfo.height.unit}
                onChange={(value) => updatePersonalInfo({ 
                  height: { ...data.personalInfo.height, unit: value as 'cm' | 'ft' } 
                })}
                options={[
                  { value: 'cm', label: 'cm' },
                  { value: 'ft', label: 'ft' },
                ]}
                fullWidth
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                label="Weight"
                type="number"
                value={data.personalInfo.weight.value === 0 ? '' : data.personalInfo.weight.value}
                onChange={(e) => updatePersonalInfo({ 
                  weight: { 
                    ...data.personalInfo.weight, 
                    value: parseFloat(e.target.value) || 0 
                  } 
                })}
                placeholder="Enter your weight"
                min="0"
                step="0.1"
                error={errors.weight}
                fullWidth
              />
            </div>
            <div className="w-24 flex-shrink-0">
              <Select
                label="Unit"
                value={data.personalInfo.weight.unit}
                onChange={(value) => updatePersonalInfo({ 
                  weight: { ...data.personalInfo.weight, unit: value as 'kg' | 'lbs' } 
                })}
                options={[
                  { value: 'kg', label: 'kg' },
                  { value: 'lbs', label: 'lbs' },
                ]}
                fullWidth
              />
            </div>
          </div>
        </div>
        
        <Select
          label="Activity Status"
          value={data.personalInfo.activityStatus}
          onChange={(value) => updatePersonalInfo({ activityStatus: value as any })}
          options={[
            { value: 'student', label: 'Student' },
            { value: 'working-professional', label: 'Working Professional' },
            { value: 'homemaker', label: 'Homemaker' },
            { value: 'retired', label: 'Retired' },
            { value: 'other', label: 'Other' },
          ]}
          fullWidth
        />
        
        {(data.personalInfo.activityStatus === 'student' || data.personalInfo.activityStatus === 'working-professional') && (
          <Input
            label="Working Hours Per Day"
            type="number"
            value={data.personalInfo.workingHours || ''}
            onChange={(e) => updatePersonalInfo({ workingHours: parseInt(e.target.value) || 0 })}
            placeholder="Enter your typical working hours per day"
            min="0"
            max="24"
            fullWidth
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Workout Duration (minutes per day)"
            type="number"
            value={data.personalInfo.workoutDuration === 0 ? '' : data.personalInfo.workoutDuration}
            onChange={(e) => updatePersonalInfo({ workoutDuration: parseInt(e.target.value) || 0 })}
            placeholder="How many minutes do you exercise daily?"
            min="0"
            fullWidth
          />
          
          <Select
            label="Workout Intensity"
            value={data.personalInfo.workoutIntensity}
            onChange={(value) => updatePersonalInfo({ workoutIntensity: value as any })}
            options={[
              { value: 'low', label: 'Low (Light walking, stretching)' },
              { value: 'moderate', label: 'Moderate (Brisk walking, cycling)' },
              { value: 'high', label: 'High (Running, HIIT, weightlifting)' },
            ]}
            fullWidth
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button type="submit" variant="primary" size="lg">
          Next Step
        </Button>
      </div>
    </form>
  );
};