import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'info' | 'demo' | 'live' | 'cached' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase';
  
  const variants = {
    info: 'bg-orca-ice text-orca-navy border border-orca-cyan/30',
    demo: 'bg-amber-100 text-amber-800 border border-amber-300',
    cached: 'bg-blue-100 text-blue-800 border border-blue-300',
    live: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
