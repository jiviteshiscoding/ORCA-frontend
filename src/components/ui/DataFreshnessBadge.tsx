import React from 'react';

export type FreshnessState = 'LIVE' | 'RECENT' | 'CACHED' | 'DEMO SNAPSHOT';

export interface DataFreshnessBadgeProps {
  status?: FreshnessState;
  timestamp?: string;
  className?: string;
}

export const DataFreshnessBadge: React.FC<DataFreshnessBadgeProps> = ({
  status = 'DEMO SNAPSHOT',
  timestamp = '06:00 Z',
  className = '',
}) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'LIVE':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'RECENT':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'CACHED':
        return 'bg-slate-50 text-slate-700 border-slate-300';
      case 'DEMO SNAPSHOT':
      default:
        return 'bg-amber-50 text-amber-900 border-amber-300/80';
    }
  };

  const getDotColor = () => {
    switch (status) {
      case 'LIVE':
        return 'bg-emerald-500';
      case 'RECENT':
        return 'bg-blue-500';
      case 'CACHED':
        return 'bg-slate-400';
      case 'DEMO SNAPSHOT':
      default:
        return 'bg-amber-500';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-2xs ${getBadgeStyle()} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()} animate-pulse`} />
      <span>{status}</span>
      {timestamp && <span className="text-slate-500 font-mono font-normal">({timestamp})</span>}
    </span>
  );
};
