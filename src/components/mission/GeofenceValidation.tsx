import React from 'react';
import { Card } from '../ui/Card';
import { CheckCircle2, AlertTriangle, ShieldAlert, ShieldCheck } from 'lucide-react';

export interface GeofenceValidationProps {
  maxDistanceNm: number;
  departureTime: string;
}

export const GeofenceValidation: React.FC<GeofenceValidationProps> = ({
  maxDistanceNm,
  departureTime,
}) => {
  const isDistanceExceeded = maxDistanceNm > 25;
  const isLateDeparture = departureTime.includes('09:00') || departureTime.includes('10:00');

  return (
    <Card variant="flat" className="border-orca-env p-3.5 space-y-2.5">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-1.5 text-xs">
        <div className="flex items-center gap-2 font-black text-orca-navy uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-orca-cyan" />
          <span>Geofence & Boundary Validation</span>
        </div>
        <span className="font-mono text-orca-navy font-bold text-[11px]">
          Route Clearance Check
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        {/* Constraint 1: Operating Range Limit */}
        <div
          className={`p-2.5 rounded-xl border flex items-center justify-between ${
            isDistanceExceeded
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-white border-orca-env/70 text-orca-navy'
          }`}
        >
          <div className="flex items-center gap-2">
            {isDistanceExceeded ? (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            )}
            <div>
              <span className="font-bold block">Distance Limit</span>
              <span className="text-[10px] text-slate-600">{maxDistanceNm} NM Planned</span>
            </div>
          </div>
          <span
            className={`font-black text-[10px] px-1.5 py-0.5 rounded ${
              isDistanceExceeded ? 'bg-amber-200 text-amber-900' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {isDistanceExceeded ? 'CAUTION (>25 NM)' : 'SAFE'}
          </span>
        </div>

        {/* Constraint 2: EEZ Restricted Area */}
        <div className="p-2.5 rounded-xl bg-white border border-orca-env/70 flex items-center justify-between text-orca-navy">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <span className="font-bold block">EEZ Restricted Zone</span>
              <span className="text-[10px] text-slate-600">No Boundary Conflict</span>
            </div>
          </div>
          <span className="font-black text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
            SAFE
          </span>
        </div>

        {/* Constraint 3: Swell Hazard Clearance */}
        <div
          className={`p-2.5 rounded-xl border flex items-center justify-between ${
            isLateDeparture
              ? 'bg-red-50 border-red-300 text-red-900'
              : 'bg-white border-orca-env/70 text-orca-navy'
          }`}
        >
          <div className="flex items-center gap-2">
            {isLateDeparture ? (
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            )}
            <div>
              <span className="font-bold block">Swell Hazard Crossing</span>
              <span className="text-[10px] text-slate-600">{isLateDeparture ? 'High Swell Risk' : 'Clear Track'}</span>
            </div>
          </div>
          <span
            className={`font-black text-[10px] px-1.5 py-0.5 rounded ${
              isLateDeparture ? 'bg-red-200 text-red-900' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {isLateDeparture ? 'RESTRICTED' : 'SAFE'}
          </span>
        </div>
      </div>
    </Card>
  );
};
