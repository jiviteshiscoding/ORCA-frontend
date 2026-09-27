import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'System Warning',
  message = 'An error occurred while loading this layer or view.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-red-200 bg-red-50/50">
      <AlertTriangle className="w-9 h-9 text-red-500 mb-2" />
      <h4 className="text-sm font-bold text-red-900">{title}</h4>
      <p className="text-xs text-red-700 mt-1 max-w-md mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="border-red-300 text-red-800 hover:bg-red-100">
          Retry
        </Button>
      )}
    </div>
  );
};
