import React from 'react';
import { Compass } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Found',
  description = 'No information is currently available for this selection.',
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-orca-env bg-orca-ice/40">
      <Compass className="w-10 h-10 text-orca-cyan mb-3 opacity-80" />
      <h4 className="text-base font-bold text-orca-navy">{title}</h4>
      <p className="text-xs text-orca-navy/70 mt-1 max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
};
