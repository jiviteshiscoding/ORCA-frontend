import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SlidersHorizontal, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const WhatIfComparison: React.FC = () => {
  return (
    <Card className="border-amber-400 bg-gradient-to-br from-white via-amber-50/30 to-white p-4 space-y-3.5 shadow-sm animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b border-amber-200 pb-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-700" />
          <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">
            WHAT-IF VOYAGE TIMELINE COMPARISON
          </h4>
        </div>
        <Badge variant="warning" className="text-[9px]">DEPARTURE SHIFT DETECTED</Badge>
      </div>

      {/* Timeline Graphic Bar */}
      <div className="space-y-1.5 p-3 rounded-xl bg-white border border-amber-200">
        <div className="flex items-center justify-between text-[10px] font-extrabold uppercase text-orca-navy">
          <span className="text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Recommended: 05:30 AM
          </span>
          <span className="text-amber-800">Optimal Window End: 09:30 AM</span>
          <span className="text-red-700 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-red-600" /> Late Departure: 10:00 AM
          </span>
        </div>

        {/* Visual Timeline Segment */}
        <div className="relative w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
          <div className="w-[45%] h-full bg-emerald-500 rounded-l-full relative group">
            <span className="text-[8px] font-black text-white px-2">SAFE WINDOW</span>
          </div>
          <div className="w-[15%] h-full bg-amber-400">
            <span className="text-[8px] font-black text-amber-950 px-1">TRANSITION</span>
          </div>
          <div className="w-[40%] h-full bg-red-500 rounded-r-full">
            <span className="text-[8px] font-black text-white px-2">HIGH SWELL SURGE RISK</span>
          </div>
        </div>

        <div className="flex justify-between text-[9px] text-slate-600 font-mono pt-0.5">
          <span>05:30 AM</span>
          <span>09:30 AM</span>
          <span>10:00 AM</span>
          <span>11:30 AM+</span>
        </div>
      </div>

      {/* Comparison Grid Table with Explicit Delta Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
          <div className="flex items-center justify-between border-b border-emerald-200/80 pb-1">
            <span className="font-extrabold text-emerald-950">BASELINE (05:30 AM)</span>
            <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">GO WITH CAUTION</span>
          </div>
          <div className="text-[11px] space-y-1 text-emerald-950 font-mono">
            <div className="flex justify-between">
              <span>Wave Swell:</span> <strong>1.2 m</strong>
            </div>
            <div className="flex justify-between">
              <span>Wind Velocity:</span> <strong>14 kts SW</strong>
            </div>
            <div className="flex justify-between">
              <span>PFZ Yield Prob:</span> <strong>89% (High)</strong>
            </div>
            <div className="flex justify-between">
              <span>Confidence Score:</span> <strong>91%</strong>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-red-50/70 border border-red-200 space-y-1.5">
          <div className="flex items-center justify-between border-b border-red-200/80 pb-1">
            <span className="font-extrabold text-red-950">SCENARIO (10:00 AM)</span>
            <span className="text-[9px] font-black px-2 py-0.5 rounded bg-red-600 text-white">AVOID BEYOND 25 NM</span>
          </div>
          <div className="text-[11px] space-y-1 text-red-950 font-mono">
            <div className="flex justify-between items-center">
              <span>Wave Swell:</span>
              <span className="font-bold text-red-700 flex items-center gap-1">2.2 m <strong className="text-red-600 font-extrabold text-xs">↑ +1.0m</strong></span>
            </div>
            <div className="flex justify-between items-center">
              <span>Wind Velocity:</span>
              <span className="font-bold text-amber-800 flex items-center gap-1">18 kts <strong className="text-amber-700 font-extrabold text-xs">↑ +4 kts</strong></span>
            </div>
            <div className="flex justify-between items-center">
              <span>PFZ Yield Prob:</span>
              <span className="font-bold text-red-700 flex items-center gap-1">62% <strong className="text-red-600 font-extrabold text-xs">↓ -27%</strong></span>
            </div>
            <div className="flex justify-between items-center">
              <span>Confidence Score:</span>
              <span className="font-bold text-slate-700 flex items-center gap-1">72% <strong className="text-slate-600 font-extrabold text-xs">↓ -19%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Explicit Decision Shift Banner */}
      <div className="p-2.5 rounded-xl bg-amber-950 text-white text-xs font-mono flex items-center justify-between">
        <span className="text-amber-200 font-bold">DECISION SHIFT IMPACT:</span>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500 text-orca-deep font-black text-[10px]">GO WITH CAUTION</span>
          <span className="text-amber-400 font-bold">➔</span>
          <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-[10px]">AVOID BEYOND 25 NM</span>
        </div>
      </div>
    </Card>
  );
};
