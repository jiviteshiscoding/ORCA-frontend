import React from 'react';
import { BaseMap } from '../../components/map/BaseMap';
import { Card } from '../../components/ui/Card';
import { StatusIndicator } from '../../components/ui/StatusIndicator';
import { useMarineData } from '../../hooks/useMarineData';
import { MapPin, Thermometer, Waves, Wind, ShieldCheck } from 'lucide-react';

export const MarineMapPage: React.FC = () => {
  const marineData = useMarineData();

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto animate-fade-in">
      {/* Top Map Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-orca-env/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orca-cyan" />
            <h2 className="text-base sm:text-lg font-black text-orca-navy uppercase tracking-tight">Fisher Spatial Marine Map</h2>
          </div>
          <p className="text-xs text-orca-navy/70 mt-0.5">
            Full spatial ocean canvas with active PFZ zones, vessel track, hazards, and voyage route
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusIndicator status="DEMO" />
          <span className="text-xs font-mono bg-orca-ice px-3 py-1.5 rounded-xl border border-orca-env text-orca-navy font-bold hidden md:inline">
            Pos: 13.0827° N, 80.2707° E
          </span>
        </div>
      </div>

      {/* Main Full-Bleed Map View */}
      <BaseMap height="calc(100vh - 15.5rem)" showControls={true} />

      {/* Bottom Marine Conditions Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card variant="flat" className="p-3 border-orca-env flex items-center gap-3 orca-card-hover">
          <div className="w-8 h-8 rounded-lg bg-orca-cyan/15 text-orca-cyan flex items-center justify-center shrink-0">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-orca-navy/60 uppercase block">SST Temp</span>
            <span className="text-sm font-extrabold text-orca-navy">{marineData.weather.seaSurfaceTempC}°C</span>
          </div>
        </Card>

        <Card variant="flat" className="p-3 border-orca-env flex items-center gap-3 orca-card-hover">
          <div className="w-8 h-8 rounded-lg bg-orca-blue/15 text-orca-blue flex items-center justify-center shrink-0">
            <Waves className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-orca-navy/60 uppercase block">Wave Height</span>
            <span className="text-sm font-extrabold text-orca-navy">{marineData.weather.waveHeightM} m</span>
          </div>
        </Card>

        <Card variant="flat" className="p-3 border-orca-env flex items-center gap-3 orca-card-hover">
          <div className="w-8 h-8 rounded-lg bg-orca-cyan/15 text-orca-cyan flex items-center justify-center shrink-0">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-orca-navy/60 uppercase block">Wind Vector</span>
            <span className="text-sm font-extrabold text-orca-navy">{marineData.weather.windSpeedKts} kts SW</span>
          </div>
        </Card>

        <Card variant="flat" className="p-3 border-orca-env flex items-center gap-3 orca-card-hover">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-orca-navy/60 uppercase block">Map Status</span>
            <span className="text-xs font-extrabold text-emerald-700 uppercase">DEMO LAYERS ACTIVE</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

