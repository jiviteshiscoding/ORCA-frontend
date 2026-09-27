export type DecisionState = 'GO' | 'CAUTION' | 'AVOID' | 'INSUFFICIENT DATA';

export interface DecisionFactor {
  name: string;
  value: string;
  status: 'SAFE' | 'WARNING' | 'CRITICAL' | 'NEUTRAL';
  impact: string;
}

export interface DecisionExplanation {
  overallDecision: DecisionState;
  confidence: number;
  primaryReason: string;
  factors: DecisionFactor[];
  timestamp: string;
  dataType: 'DEMO';
}
