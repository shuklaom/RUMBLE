/**
 * Card Component
 * Reusable card component for consistent layout
 */
import React from 'react';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'rounded-2xl backdrop-blur-sm border transition-all duration-200';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-slate-800/30 border-slate-700/30',
    glass: 'bg-white/5 border-white/10',
    solid: 'bg-slate-800 border-slate-700',
    gradient: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/30',
  };
  
  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;