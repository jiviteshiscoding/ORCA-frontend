import React from 'react';
import { ORCALogo } from './ORCALogo';

export const RadarVisualGraphic: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[460px] bg-gradient-to-b from-[#062B4A] via-[#073B66] to-[#041b30] p-8 flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-r-none border border-orca-cyan/30 text-white">
      {/* Background Radar Rings & Grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Radar Concentric Rings */}
        <div className="w-[380px] h-[380px] rounded-full border border-orca-cyan/20 flex items-center justify-center">
          <div className="w-[280px] h-[280px] rounded-full border border-orca-cyan/30 flex items-center justify-center">
            <div className="w-[180px] h-[180px] rounded-full border border-orca-cyan/40 flex items-center justify-center">
              <div className="w-[80px] h-[80px] rounded-full border border-orca-cyan/50 bg-orca-cyan/5" />
            </div>
          </div>
        </div>

        {/* Radar Crosshair Axes */}
        <div className="absolute w-full h-px bg-orca-cyan/20" />
        <div className="absolute h-full w-px bg-orca-cyan/20" />

        {/* Subtle rotating radar sweep */}
        <div className="absolute w-[380px] h-[380px] rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(32,184,216,0.25)_360deg)] animate-[spin_8s_linear_infinite]" />
      </div>

      {/* Top Header Branding */}
      <div className="relative z-10 flex items-center justify-between">
        <ORCALogo size="md" lightMode={false} />
        <span className="text-[10px] font-mono tracking-widest text-orca-cyan bg-orca-deep/80 px-2.5 py-1 rounded-md border border-orca-cyan/40 uppercase">
          Node 01 // Active
        </span>
      </div>

      {/* Center Radar Targets & Vessel Telemetry Overlay */}
      <div className="relative z-10 my-auto text-center space-y-3">
        <div className="inline-block relative">
          <div className="w-16 h-16 rounded-full bg-orca-cyan/10 border border-orca-cyan/60 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(32,184,216,0.3)]">
            <div className="w-4 h-4 rounded-full bg-orca-cyan animate-ping opacity-75" />
          </div>
        </div>

        <div>
          <h4 className="text-base font-bold text-white tracking-wide">Bay of Bengal Sector</h4>
          <p className="text-xs font-mono text-orca-ice/70 mt-0.5">
            Coordinates: 13.0827° N, 80.2707° E
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2 text-[11px] font-mono text-orca-cyan">
          <span className="bg-orca-deep/70 px-2.5 py-1 rounded border border-orca-cyan/30">SST: 28.5°C</span>
          <span className="bg-orca-deep/70 px-2.5 py-1 rounded border border-orca-cyan/30">Wave: 1.1m</span>
          <span className="bg-orca-deep/70 px-2.5 py-1 rounded border border-orca-cyan/30">PFZ: High</span>
        </div>
      </div>

      {/* Footer System Telemetry Status */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-orca-ice/60 border-t border-orca-navy/80 pt-4">
        <span>AUTHENTICATION GATEWAY</span>
        <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          ENCRYPTED DEMO SESSION
        </span>
      </div>
    </div>
  );
};
