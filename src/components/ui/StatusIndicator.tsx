import React from 'react';
import { DataOriginState } from '../../types/marine';
import { Badge } from './Badge';

export interface StatusIndicatorProps {
  status: DataOriginState;
  showLabel?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = true,
}) => {
  const getDotColor = () => {
    switch (status) {
      case 'LIVE': return 'bg-emerald-500';
      case 'CACHED': return 'bg-blue-500';
      case 'DEMO':
      default: return 'bg-amber-500';
    }
  };

  const getVariant = () => {
    switch (status) {
      case 'LIVE': return 'live';
      case 'CACHED': return 'cached';
      case 'DEMO':
      default: return 'demo';
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5" title={`Data State: ${status}`}>
      <span className={`w-2 h-2 rounded-full ${getDotColor()} animate-pulse`} />
      {showLabel && <Badge variant={getVariant()}>{status}</Badge>}
    </div>
  );
};
