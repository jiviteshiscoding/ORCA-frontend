import React from 'react';
import { Card } from '../ui/Card';
import { DecisionBadge } from './DecisionBadge';
import { DecisionFactors, FactorItem } from './DecisionFactors';
import { DataFreshnessBadge } from '../ui/DataFreshnessBadge';
import { DecisionState } from '../../types/decision';
import { ShieldCheck } from 'lucide-react';

export interface DecisionCardProps {
  decision: DecisionState;
  confidence: number;
  primaryReason: string;
  recommendedWindow: string;
  recommendedZone: string;
  fishingPotential: string;
  marineRisk: string;
  factors: FactorItem[];
  timestamp?: string;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({
  decision = 'CAUTION',
  confidence = 91,
  primaryReason,
  recommendedWindow = '05:30 — 09:30 AM',
  recommendedZone = 'PFZ Zone Alpha',
  fishingPotential = 'HIGH (89%)',
  marineRisk = 'MODERATE (1.2m Swell)',
  factors,
  timestamp = '06:00 Z',
}) => {
  return (
    <Card className="border-orca-cyan/40 bg-gradient-to-br from-white via-orca-ice/30 to-white space-y-3.5 shadow-sm p-4 animate-in fade-in zoom-in-95 duration-200">
      {/* 02 DECISION HEADER */}
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orca-cyan" />
          <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">
            02. Mission Decision Output
          </h4>
        </div>

        <DataFreshnessBadge status="DEMO SNAPSHOT" timestamp={timestamp} />
      </div>

      {/* PRIMARY LEVEL: DECISION STATE & CONFIDENCE PROGRESS BAR */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <DecisionBadge status={decision} />
            <div>
              <span className="text-xs font-black text-amber-900 block tracking-wide">
                {confidence}% Confidence Score
              </span>
              <span className="text-[10px] text-amber-800/80 font-medium">Multi-Agent Deterministic Verification</span>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-amber-900/60 text-[10px] uppercase font-extrabold block">Recommended Window</span>
            <span className="font-extrabold text-amber-950 text-sm">{recommendedWindow}</span>
          </div>
        </div>

        {/* Visual Confidence Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-amber-900 font-bold">
            <span>Confidence Index</span>
            <span>{confidence}/100</span>
          </div>
          <div className="w-full h-2 rounded-full bg-amber-200/80 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* SECONDARY LEVEL: RATIONALE SUMMARY */}
      <p className="text-xs text-orca-navy/90 leading-relaxed font-semibold bg-white p-3 rounded-xl border border-orca-env/60 shadow-2xs">
        "{primaryReason}"
      </p>

      {/* DATA METRIC METERS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 bg-white rounded-xl border border-orca-env/60">
          <span className="text-[9px] font-bold text-orca-navy/50 uppercase block">Fishing Yield</span>
          <span className="font-extrabold text-emerald-700">{fishingPotential}</span>
        </div>

        <div className="p-2 bg-white rounded-xl border border-orca-env/60">
          <span className="text-[9px] font-bold text-orca-navy/50 uppercase block">Marine Risk</span>
          <span className="font-extrabold text-amber-700">{marineRisk}</span>
        </div>

        <div className="p-2 bg-white rounded-xl border border-orca-env/60">
          <span className="text-[9px] font-bold text-orca-navy/50 uppercase block">Target Area</span>
          <span className="font-extrabold text-orca-navy">{recommendedZone}</span>
        </div>

        <div className="p-2 bg-white rounded-xl border border-orca-env/60">
          <span className="text-[9px] font-bold text-orca-navy/50 uppercase block">Return Limit</span>
          <span className="font-extrabold text-orca-navy">Before 11:30 AM</span>
        </div>
      </div>

      {/* TERTIARY LEVEL: 03 WHY THIS DECISION FACTORS */}
      <DecisionFactors factors={factors} />
    </Card>
  );
};
