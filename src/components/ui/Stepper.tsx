import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`w-full py-4 ${className}`}>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;
          const isClickable = onStepClick && (isCompleted || index === currentStep - 1);

          return (
            <li
              key={index}
              className={`flex items-center ${
                index < steps.length - 1 ? 'w-full' : ''
              }`}
            >
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full
                  transition-all duration-200 ease-in-out
                  ${isCompleted ? 'bg-emerald-500 text-white' : ''}
                  ${isActive ? 'bg-emerald-100 text-emerald-500 border-2 border-emerald-500' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-100 text-gray-500 dark:bg-gray-700' : ''}
                  ${isClickable ? 'cursor-pointer hover:scale-110' : ''}
                `}
                onClick={() => isClickable && onStepClick(index + 1)}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <div className="hidden sm:flex w-full items-center ml-2">
                <span 
                  className={`text-sm font-medium ${
                    isActive || isCompleted ? 'text-emerald-500' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-full flex items-center">
                    <div 
                      className={`h-0.5 w-full ml-2 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-2 grid grid-cols-3 sm:hidden">
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;
          
          return (
            <div 
              key={`label-${index}`} 
              className={`text-xs font-medium text-center ${
                isActive || isCompleted ? 'text-emerald-500' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
};