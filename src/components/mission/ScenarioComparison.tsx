import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DecisionBadge } from '../decision/DecisionBadge';
import { DecisionState } from '../../types/decision';
import { ArrowUpRight, ArrowDownRight, ShieldCheck } from 'lucide-react';

export interface ScenarioMetrics {
  departureTime: string;
  durationHours: number;
  maxDistanceNm: number;
  decision: DecisionState;
  confidence: number;
  waveHeightM: number;
  windSpeedKts: number;
  pfzYieldPercent: number;
  returnConstraint: string;
}

export interface ScenarioComparisonProps {
  baseline: ScenarioMetrics;
  current: ScenarioMetrics;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  baseline,
  current,
}) => {
  const isBaseline =
    current.departureTime === baseline.departureTime &&
    current.durationHours === baseline.durationHours &&
    current.maxDistanceNm === baseline.maxDistanceNm;

  return (
    <Card className="border-orca-cyan/40 bg-white p-4 space-y-3.5 shadow-sm">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orca-cyan" />
          <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">
            Scenario Comparison: Baseline vs Planned Scenario
          </h4>
        </div>

        {isBaseline ? (
          <Badge variant="success" className="text-[9px]">BASELINE RECOMMENDED</Badge>
        ) : (
          <Badge variant="warning" className="text-[9px]">SCENARIO MODIFIED</Badge>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* BASELINE CARD */}
        <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
            <span className="font-extrabold text-emerald-900 text-xs">RECOMMENDED BASELINE</span>
            <DecisionBadge status={baseline.decision} />
          </div>

          <div className="space-y-1 text-[11px] text-emerald-950 font-medium">
            <div className="flex justify-between">
              <span>Departure / Duration:</span>
              <strong className="text-emerald-900">{baseline.departureTime} ({baseline.durationHours}h)</strong>
            </div>
            <div className="flex justify-between">
              <span>Max Distance Limit:</span>
              <strong className="text-emerald-900">{baseline.maxDistanceNm} NM</strong>
            </div>
            <div className="flex justify-between">
              <span>Wave Swell:</span>
              <strong className="text-emerald-900">{baseline.waveHeightM} m (Moderate)</strong>
            </div>
            <div className="flex justify-between">
              <span>PFZ Yield Index:</span>
              <strong className="text-emerald-800 font-bold">{baseline.pfzYieldPercent}% (High Yield)</strong>
            </div>
            <div className="flex justify-between">
              <span>Confidence Score:</span>
              <strong className="text-emerald-900">{baseline.confidence}%</strong>
            </div>
          </div>
        </div>

        {/* CURRENT SCENARIO CARD */}
        <div
          className={`p-3 rounded-xl border space-y-2 transition-all duration-300 ${
            current.decision === 'AVOID'
              ? 'bg-red-50/60 border-red-300'
              : current.decision === 'CAUTION'
              ? 'bg-amber-50/60 border-amber-300'
              : 'bg-emerald-50/50 border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-1.5 border-slate-200">
            <span className="font-extrabold text-orca-navy text-xs">CURRENT PLANNED SCENARIO</span>
            <DecisionBadge status={current.decision} />
          </div>

          <div className="space-y-1 text-[11px] font-medium text-orca-navy">
            <div className="flex justify-between">
              <span>Departure / Duration:</span>
              <strong>{current.departureTime} ({current.durationHours}h)</strong>
            </div>
            <div className="flex justify-between">
              <span>Max Distance Limit:</span>
              <strong className={current.maxDistanceNm > 25 ? 'text-amber-800' : ''}>{current.maxDistanceNm} NM</strong>
            </div>

            <div className="flex justify-between items-center">
              <span>Wave Swell:</span>
              <span className="flex items-center gap-1 font-bold">
                {current.waveHeightM > baseline.waveHeightM ? (
                  <span className="text-red-700 flex items-center">
                    {current.waveHeightM} m <ArrowUpRight className="w-3 h-3 text-red-600" />
                  </span>
                ) : (
                  <span>{current.waveHeightM} m</span>
                )}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>PFZ Yield Index:</span>
              <span className="flex items-center gap-1 font-bold">
                {current.pfzYieldPercent < baseline.pfzYieldPercent ? (
                  <span className="text-amber-800 flex items-center">
                    {current.pfzYieldPercent}% <ArrowDownRight className="w-3 h-3 text-amber-700" />
                  </span>
                ) : (
                  <span className="text-emerald-700">{current.pfzYieldPercent}%</span>
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Confidence Score:</span>
              <strong>{current.confidence}%</strong>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
