import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading ORCA marine workspace...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[240px]">
      <Loader2 className="w-8 h-8 text-orca-cyan animate-spin mb-3" />
      <p className="text-sm font-medium text-orca-navy/70">{message}</p>
    </div>
  );
};
