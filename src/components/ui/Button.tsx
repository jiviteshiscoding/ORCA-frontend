import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-orca-cyan focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-orca-navy text-orca-white hover:bg-orca-deep shadow-sm',
    secondary: 'bg-orca-cyan text-orca-deep hover:bg-[#18a2c0] font-semibold',
    outline: 'border border-orca-navy/20 bg-transparent text-orca-navy hover:bg-orca-ice',
    ghost: 'bg-transparent text-orca-navy hover:bg-orca-ice',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
