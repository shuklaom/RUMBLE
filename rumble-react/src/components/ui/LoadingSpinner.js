/**
 * Loading Spinner Component
 * Reusable loading spinner with different sizes and variants
 */
import React from 'react';

const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  text,
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'text-emerald-500',
    secondary: 'text-slate-400',
    white: 'text-white',
  };
  
  const spinnerClasses = [
    'animate-spin',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <svg 
        className={spinnerClasses}
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <span className={`text-sm ${variantClasses[variant]}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;