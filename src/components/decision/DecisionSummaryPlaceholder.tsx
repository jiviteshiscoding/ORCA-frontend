import React from 'react';
import { Card } from '../ui/Card';
import { DecisionBadge } from './DecisionBadge';
import { StatusIndicator } from '../ui/StatusIndicator';

export const DecisionSummaryPlaceholder: React.FC = () => {
  return (
    <Card className="border-orca-cyan/30 bg-gradient-to-br from-white to-orca-ice/50">
      <div className="flex items-center justify-between mb-3">
        <DecisionBadge status="CAUTION" />
        <StatusIndicator status="DEMO" />
      </div>
      <h4 className="text-base font-bold text-orca-navy">Decision Engine Foundation</h4>
      <p className="text-xs text-orca-navy/70 mt-1">
        Decision modeling foundation active. Phase 0 placeholder state for marine contextual evaluation.
      </p>
    </Card>
  );
};
