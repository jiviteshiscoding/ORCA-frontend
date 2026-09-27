import React from 'react';
import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';
import { Button } from '../ui/Button';
import { Ship, Wind, Waves, X, CheckCircle2 } from 'lucide-react';

export interface VesselData {
  id: string;
  name: string;
  type: string;
  currentPosition: { lat: number; lng: number };
  headingDeg: number;
  speedKts: number;
  status: 'UNDERWAY' | 'PATROL' | 'CAUTION' | 'IN PORT';
  homePort?: string;
  destination?: string;
  waveExposure?: string;
  windExposure?: string;
  clearanceScore?: number;
}

export interface VesselDetailDrawerProps {
  vessel: VesselData | null;
  onClose: () => void;
}

export const VesselDetailDrawer: React.FC<VesselDetailDrawerProps> = ({ vessel, onClose }) => {
  if (!vessel) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white border-l border-orca-env shadow-2xl z-[2000] p-4 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orca-env pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orca-navy text-orca-cyan">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-orca-navy">{vessel.name}</h3>
              <span className="text-xs text-orca-navy/60 font-semibold">{vessel.type}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge & DEMO tag */}
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              vessel.status === 'UNDERWAY'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : vessel.status === 'CAUTION'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : vessel.status === 'PATROL'
                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                : 'bg-slate-100 text-slate-800 border border-slate-300'
            }`}
          >
            {vessel.status}
          </span>
          <StatusIndicator status="DEMO" />
        </div>

        {/* Position & Telemetry Grid */}
        <Card variant="flat" className="p-3 space-y-2 border-orca-env bg-orca-ice/40">
          <span className="text-[10px] font-black uppercase tracking-widest text-orca-navy/60 block">
            Real-Time AIS Position & Dynamics
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 bg-white rounded-lg border border-orca-env/60">
              <span className="text-[9px] text-orca-navy/60 font-sans block">Coordinates</span>
              <strong className="text-orca-navy">{vessel.currentPosition.lat.toFixed(2)}°N, {vessel.currentPosition.lng.toFixed(2)}°E</strong>
            </div>
            <div className="p-2 bg-white rounded-lg border border-orca-env/60">
              <span className="text-[9px] text-orca-navy/60 font-sans block">Speed</span>
              <strong className="text-orca-navy">{vessel.speedKts} kts</strong>
            </div>
            <div className="p-2 bg-white rounded-lg border border-orca-env/60">
              <span className="text-[9px] text-orca-navy/60 font-sans block">Heading</span>
              <strong className="text-orca-navy">{vessel.headingDeg}° NE</strong>
            </div>
            <div className="p-2 bg-white rounded-lg border border-orca-env/60">
              <span className="text-[9px] text-orca-navy/60 font-sans block">Clearance</span>
              <strong className="text-emerald-700">{vessel.clearanceScore || 94}% CLEAR</strong>
            </div>
          </div>
        </Card>

        {/* Environmental Exposure */}
        <Card variant="flat" className="p-3 space-y-2 border-orca-env">
          <span className="text-[10px] font-black uppercase tracking-widest text-orca-navy/60 block">
            Weather & Sea Exposure Context
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-orca-env/60">
              <span className="flex items-center gap-1.5 text-orca-navy font-medium">
                <Waves className="w-3.5 h-3.5 text-blue-600" /> Wave Exposure
              </span>
              <strong className="text-orca-navy">{vessel.waveExposure || '1.2m Moderate Swell'}</strong>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-orca-env/60">
              <span className="flex items-center gap-1.5 text-orca-navy font-medium">
                <Wind className="w-3.5 h-3.5 text-orca-cyan" /> Wind Condition
              </span>
              <strong className="text-orca-navy">{vessel.windExposure || '14 kts SW Vector'}</strong>
            </div>
          </div>
        </Card>

        {/* Operational Safety Assessment */}
        <Card variant="flat" className="p-3 space-y-2 border-emerald-300 bg-emerald-50/60">
          <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Route Operational Assessment</span>
          </div>
          <p className="text-xs text-emerald-950 font-medium leading-relaxed">
            Vessel is operating within safety envelope. Voyage trajectory cleared for Chennai Fishing Harbour corridor.
          </p>
        </Card>
      </div>

      <div className="pt-4 border-t border-orca-env space-y-2">
        <Button variant="primary" size="sm" className="w-full font-bold" onClick={onClose}>
          Close Telemetry Drawer
        </Button>
      </div>
    </div>
  );
};
