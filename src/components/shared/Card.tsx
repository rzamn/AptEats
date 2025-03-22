
import { cn } from '@/lib/utils';
import React from 'react';

interface CardProps {
  className?: string;
  variant?: 'default' | 'glass' | 'outlined';
  children: React.ReactNode;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  className, 
  variant = 'default', 
  children, 
  onClick,
  hoverEffect = true 
}) => {
  const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-subtle',
    glass: 'glass-card',
    outlined: 'border border-border bg-background'
  };
  
  const hoverStyles = hoverEffect 
    ? 'hover:shadow-md hover:translate-y-[-2px]' 
    : '';
  
  return (
    <div 
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
