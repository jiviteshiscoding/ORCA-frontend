import React from 'react';
import { Card } from '../ui/Card';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export interface MissionTimelineProps {
  departureTime: string;
  durationHours: number;
}

export const MissionTimeline: React.FC<MissionTimelineProps> = ({
  departureTime,
  durationHours,
}) => {
  const isLateDeparture = departureTime.includes('09:00') || departureTime.includes('10:00');

  return (
    <Card variant="flat" className="border-orca-env p-3.5 space-y-2.5">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-1.5 text-xs">
        <div className="flex items-center gap-2 font-black text-orca-navy uppercase tracking-wider">
          <Clock className="w-4 h-4 text-orca-cyan" />
          <span>Interactive Voyage Window Timeline</span>
        </div>
        <span className="font-mono text-orca-navy font-bold text-[11px]">
          Scheduled Voyage: {departureTime} ({durationHours}h)
        </span>
      </div>

      {/* Visual Bar */}
      <div className="space-y-1.5 p-3 rounded-xl bg-white border border-orca-env/80">
        <div className="flex items-center justify-between text-[10px] font-extrabold uppercase text-orca-navy">
          <span className="text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Optimal Window (05:30 — 09:30)
          </span>
          <span className="text-amber-800">Transition Phase</span>
          <span className="text-red-700 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-red-600" /> High Swell Phase (10:00+)
          </span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="relative w-full h-3.5 rounded-full bg-slate-100 overflow-hidden flex shadow-2xs">
          <div className="w-[45%] h-full bg-emerald-500 flex items-center px-2">
            <span className="text-[8px] font-black text-white">RECOMMENDED WINDOW</span>
          </div>
          <div className="w-[15%] h-full bg-amber-400 flex items-center px-1">
            <span className="text-[8px] font-black text-amber-950">SURGE TRANSITION</span>
          </div>
          <div className="w-[40%] h-full bg-red-500 flex items-center px-2">
            <span className="text-[8px] font-black text-white">HIGH RISK ZONE</span>
          </div>
        </div>

        {/* Selected Departure Marker */}
        <div className="relative pt-1">
          <div
            className={`transition-all duration-300 flex items-center gap-1 text-[10px] font-extrabold ${
              isLateDeparture ? 'text-red-700 font-mono' : 'text-emerald-800 font-mono'
            }`}
          >
            <span>Current Selected Departure:</span>
            <span className="px-2 py-0.5 rounded bg-orca-navy text-white font-bold">{departureTime}</span>
            <span>➔ Duration {durationHours}h</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
