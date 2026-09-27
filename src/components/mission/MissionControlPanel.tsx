import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Clock, Navigation, Compass, MapPin, RotateCcw, Sparkles } from 'lucide-react';

export interface MissionParams {
  departureTime: string;
  durationHours: number;
  maxDistanceNm: number;
  targetZoneId: string;
}

export interface MissionControlPanelProps {
  params: MissionParams;
  onChange: (newParams: MissionParams) => void;
  onReset: () => void;
  onAskORCA: () => void;
}

const DEPARTURE_TIMES = ['05:30 AM', '07:00 AM', '09:00 AM', '10:00 AM'];
const DURATIONS = [3, 5, 7, 9];
const DISTANCES = [15, 25, 35, 45];
const TARGET_ZONES = [
  { id: 'pfz-01', name: 'Chennai Offshore PFZ Zone Alpha', yield: '89% High Yield' },
  { id: 'pfz-02', name: 'Mahabalipuram Coastal Zone Beta', yield: '92% High Yield' },
];

export const MissionControlPanel: React.FC<MissionControlPanelProps> = ({
  params,
  onChange,
  onReset,
  onAskORCA,
}) => {
  return (
    <Card className="border-orca-cyan/40 bg-white p-4 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2.5">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-orca-cyan" />
          <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">
            Mission Parameters Control
          </h4>
        </div>

        <button
          onClick={onReset}
          className="text-[11px] font-bold text-orca-navy/60 hover:text-orca-cyan flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Recommended</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. Departure Time Selector */}
        <div className="space-y-1.5 p-2.5 rounded-xl bg-orca-ice/50 border border-orca-env/70">
          <label className="font-extrabold text-orca-navy flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-orca-cyan" /> Departure Time
            </span>
            {params.departureTime === '05:30 AM' && (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                RECOMMENDED
              </span>
            )}
          </label>

          <div className="grid grid-cols-2 gap-1 pt-1">
            {DEPARTURE_TIMES.map((time) => (
              <button
                key={time}
                onClick={() => onChange({ ...params, departureTime: time })}
                className={`py-1.5 px-2 rounded-lg font-bold text-center transition-all cursor-pointer ${
                  params.departureTime === time
                    ? 'bg-orca-navy text-white shadow-2xs'
                    : 'bg-white text-orca-navy border border-orca-env/60 hover:bg-orca-ice'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Mission Duration Selector */}
        <div className="space-y-1.5 p-2.5 rounded-xl bg-orca-ice/50 border border-orca-env/70">
          <label className="font-extrabold text-orca-navy flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-orca-blue" /> Voyage Duration
            </span>
            <span className="font-mono text-orca-blue font-bold">{params.durationHours} Hours</span>
          </label>

          <div className="grid grid-cols-4 gap-1 pt-1">
            {DURATIONS.map((hrs) => (
              <button
                key={hrs}
                onClick={() => onChange({ ...params, durationHours: hrs })}
                className={`py-1.5 rounded-lg font-bold text-center transition-all cursor-pointer ${
                  params.durationHours === hrs
                    ? 'bg-orca-blue text-white shadow-2xs'
                    : 'bg-white text-orca-navy border border-orca-env/60 hover:bg-orca-ice'
                }`}
              >
                {hrs}h
              </button>
            ))}
          </div>
        </div>

        {/* 3. Max Distance Slider */}
        <div className="space-y-1.5 p-2.5 rounded-xl bg-orca-ice/50 border border-orca-env/70">
          <label className="font-extrabold text-orca-navy flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-orca-cyan" /> Max Distance Limit
            </span>
            <span className="font-mono text-orca-cyan font-bold">{params.maxDistanceNm} NM</span>
          </label>

          <div className="grid grid-cols-4 gap-1 pt-1">
            {DISTANCES.map((nm) => (
              <button
                key={nm}
                onClick={() => onChange({ ...params, maxDistanceNm: nm })}
                className={`py-1.5 rounded-lg font-bold text-center transition-all cursor-pointer ${
                  params.maxDistanceNm === nm
                    ? 'bg-orca-navy text-white shadow-2xs'
                    : 'bg-white text-orca-navy border border-orca-env/60 hover:bg-orca-ice'
                }`}
              >
                {nm} NM
              </button>
            ))}
          </div>
        </div>

        {/* 4. Target Fishing Zone Dropdown */}
        <div className="space-y-1.5 p-2.5 rounded-xl bg-orca-ice/50 border border-orca-env/70">
          <label className="font-extrabold text-orca-navy flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Target PFZ Zone
          </label>

          <select
            value={params.targetZoneId}
            onChange={(e) => onChange({ ...params, targetZoneId: e.target.value })}
            className="w-full bg-white border border-orca-env rounded-lg p-1.5 font-semibold text-orca-navy focus:outline-none focus:ring-1 focus:ring-orca-cyan cursor-pointer text-xs"
          >
            {TARGET_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-orca-env/50">
        <span className="text-[11px] text-orca-navy/60 font-medium">
          Parameter modifications trigger real-time multi-agent marine re-evaluation.
        </span>

        <Button
          variant="secondary"
          size="sm"
          onClick={onAskORCA}
          className="w-full sm:w-auto font-bold text-xs gap-1.5 shadow-xs py-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ASK ORCA ABOUT THIS SCENARIO</span>
        </Button>
      </div>
    </Card>
  );
};
