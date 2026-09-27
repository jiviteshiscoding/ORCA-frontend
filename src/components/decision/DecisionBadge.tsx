import React from 'react';
import { DecisionState } from '../../types/decision';
import { getDecisionBadgeStyles } from '../../lib/utils';

export interface DecisionBadgeProps {
  status: DecisionState;
}

export const DecisionBadge: React.FC<DecisionBadgeProps> = ({ status }) => {
  const styles = getDecisionBadgeStyles(status);

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider border ${styles.bg} ${styles.text} ${styles.border}`}
    >
      DECISION: {status}
    </span>
  );
};
