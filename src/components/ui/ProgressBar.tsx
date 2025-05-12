import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  animate?: boolean;
  className?: string;
}

const colorStyles = {
  primary: 'bg-emerald-500',
  secondary: 'bg-blue-500',
  accent: 'bg-purple-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
};

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showValue = false,
  size = 'md',
  color = 'primary',
  animate = true,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {value}/{max} ({percentage.toFixed(0)}%)
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${sizeStyles[size]} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div
          className={`
            ${colorStyles[color]} 
            ${animate ? 'transition-all duration-300 ease-in-out' : ''}
            ${sizeStyles[size]} 
            rounded-full
          `}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        ></div>
      </div>
    </div>
  );
};