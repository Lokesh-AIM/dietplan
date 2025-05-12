import React, { createContext, useContext, useState } from 'react';
import { OnboardingData, PersonalInfo, DietaryPreferences, HealthInfo } from '../types';

interface OnboardingContextType {
  data: OnboardingData;
  currentStep: number;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateDietaryPreferences: (prefs: Partial<DietaryPreferences>) => void;
  updateHealthInfo: (info: Partial<HealthInfo>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  resetOnboarding: () => void;
  isComplete: boolean;
}

const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  age: 0,
  gender: 'prefer-not-to-say',
  height: { value: 0, unit: 'cm' },
  weight: { value: 0, unit: 'kg' },
  activityStatus: 'other',
  workingHours: 0,
  workoutDuration: 0,
  workoutIntensity: 'low',
};

const defaultDietaryPreferences: DietaryPreferences = {
  dietType: 'vegetarian',
  allergies: [],
  cuisinePreferences: [],
  budgetRange: 'medium',
  mealsPerDay: 3,
};

const defaultHealthInfo: HealthInfo = {
  healthGoals: ['maintenance'],
  sleepPattern: { bedtime: '22:00', wakeupTime: '06:00' },
  medicalConditions: [],
};

const defaultOnboardingData: OnboardingData = {
  personalInfo: defaultPersonalInfo,
  dietaryPreferences: defaultDietaryPreferences,
  healthInfo: defaultHealthInfo,
};

const OnboardingContext = createContext<OnboardingContextType>({
  data: defaultOnboardingData,
  currentStep: 1,
  updatePersonalInfo: () => {},
  updateDietaryPreferences: () => {},
  updateHealthInfo: () => {},
  goToNextStep: () => {},
  goToPreviousStep: () => {},
  goToStep: () => {},
  resetOnboarding: () => {},
  isComplete: false,
});

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 3;

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info,
      },
    }));
  };

  const updateDietaryPreferences = (prefs: Partial<DietaryPreferences>) => {
    setData(prev => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        ...prefs,
      },
    }));
  };

  const updateHealthInfo = (info: Partial<HealthInfo>) => {
    setData(prev => ({
      ...prev,
      healthInfo: {
        ...prev.healthInfo,
        ...info,
      },
    }));
  };

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetOnboarding = () => {
    setData(defaultOnboardingData);
    setCurrentStep(1);
    setIsComplete(false);
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        currentStep,
        updatePersonalInfo,
        updateDietaryPreferences,
        updateHealthInfo,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        resetOnboarding,
        isComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};