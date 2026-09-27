import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'flat' | 'interactive';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const baseStyles = 'bg-white rounded-xl border border-orca-env/40 p-5 shadow-sm transition-all';
  const variants = {
    default: '',
    flat: 'shadow-none bg-orca-ice/50 border-orca-env/60',
    interactive: 'hover:shadow-md hover:border-orca-cyan/50 cursor-pointer',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
