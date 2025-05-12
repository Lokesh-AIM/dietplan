import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  helperText?: string;
  error?: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  helperText,
  error,
  className = '',
  checked,
  onChange,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className="flex items-start mb-4">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-600 cursor-pointer hidden"
          checked={checked}
          onChange={handleChange}
          id={`checkbox-${label?.replace(/\s+/g, '-').toLowerCase() || rest.id || Math.random().toString(36).substr(2, 9)}`}
          {...rest}
        />
        <label
          htmlFor={`checkbox-${label?.replace(/\s+/g, '-').toLowerCase() || rest.id || Math.random().toString(36).substr(2, 9)}`}
          className={`
            flex items-center justify-center w-5 h-5 
            border border-gray-300 dark:border-gray-600 rounded
            ${checked ? 'bg-emerald-500 border-emerald-500' : 'bg-white dark:bg-gray-700'}
            transition-colors duration-200 ease-in-out
            cursor-pointer
            ${className}
          `}
        >
          {checked && <Check size={14} className="text-white" strokeWidth={3} />}
        </label>
      </div>
      <div className="ml-2 text-sm">
        {label && (
          <label 
            htmlFor={`checkbox-${label.replace(/\s+/g, '-').toLowerCase() || rest.id || Math.random().toString(36).substr(2, 9)}`} 
            className="font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
          >
            {label}
          </label>
        )}
        {helperText && !error && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
};

interface CheckboxGroupProps {
  label?: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  direction?: 'horizontal' | 'vertical';
  helperText?: string;
  error?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  direction = 'vertical',
  helperText,
  error,
}) => {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter(v => v !== value));
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className={`flex ${direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap gap-4'}`}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={selectedValues.includes(option.value)}
            onChange={(checked) => handleCheckboxChange(option.value, checked)}
          />
        ))}
      </div>
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};