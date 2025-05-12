import React from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Stepper } from '../components/ui/Stepper';
import { PersonalInfoForm } from '../components/onboarding/PersonalInfoForm';
import { DietaryPreferencesForm } from '../components/onboarding/DietaryPreferencesForm';
import { HealthInfoForm } from '../components/onboarding/HealthInfoForm';
import { useOnboarding } from '../context/OnboardingContext';

export const OnboardingPage: React.FC = () => {
  const { currentStep, goToStep } = useOnboarding();
  
  const steps = [
    'Personal Information',
    'Dietary Preferences',
    'Health Goals',
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <DietaryPreferencesForm />;
      case 3:
        return <HealthInfoForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Let's Personalize Your Diet Plan
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            We'll create a custom nutrition plan based on your needs and preferences
          </p>
        </div>
        
        <Card className="w-full">
          <CardBody className="p-6 md:p-8">
            <Stepper 
              steps={steps} 
              currentStep={currentStep} 
              onStepClick={goToStep}
              className="mb-8"
            />
            
            <div className="min-h-[400px]">
              {renderStep()}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};