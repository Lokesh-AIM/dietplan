import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glass = false 
}) => {
  return (
    <div
      className={`
        rounded-xl shadow-md overflow-hidden
        ${glass 
          ? 'backdrop-blur-md bg-white/70 dark:bg-gray-800/70' 
          : 'bg-white dark:bg-gray-800'
        }
        ${hover 
          ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1' 
          : ''
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};