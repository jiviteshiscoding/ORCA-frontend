import React, { useState } from 'react';
import { Thermometer, Waves, Wind, Compass, Clock, Info, ChevronRight, Activity } from 'lucide-react';

export interface MetricClusterData {
  sstTempC: number;
  sstStatus: string;
  waveHeightM: number;
  waveStatus: string;
  windSpeedKts: number;
  windVector: string;
  pfzYieldPercent: number;
  pfzStatus: string;
  returnLimit: string;
  vesselName?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  change?: string;
  status?: 'optimal' | 'caution' | 'warning' | 'danger';
  progress?: number;
  detail?: string;
}

export interface MetricClusterProps {
  data?: MetricClusterData;
  title?: string;
  subtitle?: string;
  metrics?: MetricItem[];
  onInspectDetails?: (metricKey: string) => void;
}

export const MetricCluster: React.FC<MetricClusterProps> = ({
  data,
  title = 'Level 2 Evidence — Operational Marine Telemetry',
  subtitle,
  metrics,
  onInspectDetails,
}) => {
  const [activeHoverMetric, setActiveHoverMetric] = useState<string | null>(null);

  // If metrics list is explicitly provided (Operator, Environment, Disaster pages)
  if (metrics && metrics.length > 0) {
    return (
      <div className="bg-white rounded-2xl border border-orca-env/80 p-3.5 sm:p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-orca-env/60 pb-2 text-xs">
          <div>
            <span className="font-black text-orca-navy uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-orca-cyan" />
              {title}
            </span>
            {subtitle && <p className="text-[10px] text-orca-navy/60 font-semibold">{subtitle}</p>}
          </div>
          <span className="text-orca-navy/60 font-mono text-[11px] hidden sm:inline font-bold">
            {metrics.length} TELEMETRY METRICS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveHoverMetric(m.label)}
              onMouseLeave={() => setActiveHoverMetric(null)}
              className={`p-3 rounded-xl border transition-all cursor-pointer orca-card-hover ${
                activeHoverMetric === m.label
                  ? 'bg-orca-ice border-orca-cyan shadow-xs scale-[1.02]'
                  : 'bg-orca-ice/40 border-orca-env/60 hover:border-orca-cyan/40'
              }`}
            >
              <div className="flex items-center justify-between text-orca-navy/60 text-[10px] font-extrabold uppercase tracking-wider">
                <span className="truncate">{m.label}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xl font-black text-orca-navy tracking-tight">{m.value}</span>
                {m.change && (
                  <span
                    className={`text-[10px] font-extrabold ${
                      m.status === 'danger'
                        ? 'text-red-600'
                        : m.status === 'warning'
                        ? 'text-amber-700'
                        : m.status === 'caution'
                        ? 'text-amber-600'
                        : 'text-emerald-700'
                    }`}
                  >
                    {m.change}
                  </span>
                )}
              </div>
              {m.progress !== undefined && (
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full ${
                      m.status === 'danger'
                        ? 'bg-red-500'
                        : m.status === 'warning'
                        ? 'bg-amber-500'
                        : m.status === 'caution'
                        ? 'bg-amber-400'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {activeHoverMetric && (
          <div className="p-2.5 rounded-xl bg-orca-ice border border-orca-cyan/40 text-xs text-orca-navy flex items-center justify-between animate-fade-in font-sans">
            <span className="flex items-center gap-1.5 font-medium">
              <Info className="w-3.5 h-3.5 text-orca-cyan shrink-0" />
              {metrics.find((m) => m.label === activeHoverMetric)?.detail ||
                `Telemetry stream for ${activeHoverMetric} verified against INCOIS and ISRO ocean sensor array.`}
            </span>
            <span className="text-[11px] text-orca-blue font-bold flex items-center gap-0.5 shrink-0 ml-2">
              Details <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>
    );
  }

  // Fallback / default data rendering for data object
  const safeData = data || {
    sstTempC: 28.5,
    sstStatus: 'STABLE (+0.4°C)',
    waveHeightM: 1.2,
    waveStatus: 'MODERATE SWELL',
    windSpeedKts: 14,
    windVector: 'SW VECTOR',
    pfzYieldPercent: 89,
    pfzStatus: 'HIGH YIELD',
    returnLimit: '11:30 AM',
    vesselName: 'Sea Pearl',
  };

  return (
    <div className="bg-white rounded-2xl border border-orca-env/80 p-3.5 sm:p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2 text-xs">
        <span className="font-black text-orca-navy uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-orca-cyan" />
          Level 2 Evidence — Operational Marine Telemetry
        </span>
        <span className="text-orca-navy/60 font-mono text-[11px] hidden sm:inline">
          Vessel: <strong className="text-orca-navy">{safeData.vesselName || 'Sea Pearl'}</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {/* Metric 1: SST */}
        <div
          onMouseEnter={() => setActiveHoverMetric('sst')}
          onMouseLeave={() => setActiveHoverMetric(null)}
          onClick={() => onInspectDetails?.('sst')}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            activeHoverMetric === 'sst'
              ? 'bg-orca-ice border-orca-cyan shadow-xs scale-[1.02]'
              : 'bg-orca-ice/40 border-orca-env/60 hover:border-orca-cyan/40'
          }`}
        >
          <div className="flex items-center justify-between text-orca-navy/60 text-[10px] font-extrabold uppercase tracking-wider">
            <span>SST TEMP</span>
            <Thermometer className="w-3.5 h-3.5 text-orca-cyan" />
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-orca-navy tracking-tight">{safeData.sstTempC}°C</span>
            <span className="text-[10px] text-emerald-600 font-extrabold">{safeData.sstStatus}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-orca-cyan rounded-full w-[82%]" />
          </div>
        </div>

        {/* Metric 2: Wave Swell */}
        <div
          onMouseEnter={() => setActiveHoverMetric('wave')}
          onMouseLeave={() => setActiveHoverMetric(null)}
          onClick={() => onInspectDetails?.('wave')}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            activeHoverMetric === 'wave'
              ? 'bg-amber-50 border-amber-300 shadow-xs scale-[1.02]'
              : 'bg-orca-ice/40 border-orca-env/60 hover:border-orca-cyan/40'
          }`}
        >
          <div className="flex items-center justify-between text-orca-navy/60 text-[10px] font-extrabold uppercase tracking-wider">
            <span>WAVE SWELL</span>
            <Waves className="w-3.5 h-3.5 text-orca-blue" />
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-orca-navy tracking-tight">{safeData.waveHeightM} m</span>
            <span className="text-[10px] text-amber-600 font-extrabold">{safeData.waveStatus}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-amber-400 rounded-full w-[55%]" />
          </div>
        </div>

        {/* Metric 3: Wind Vector */}
        <div
          onMouseEnter={() => setActiveHoverMetric('wind')}
          onMouseLeave={() => setActiveHoverMetric(null)}
          onClick={() => onInspectDetails?.('wind')}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            activeHoverMetric === 'wind'
              ? 'bg-orca-ice border-orca-cyan shadow-xs scale-[1.02]'
              : 'bg-orca-ice/40 border-orca-env/60 hover:border-orca-cyan/40'
          }`}
        >
          <div className="flex items-center justify-between text-orca-navy/60 text-[10px] font-extrabold uppercase tracking-wider">
            <span>WIND VECTOR</span>
            <Wind className="w-3.5 h-3.5 text-orca-cyan" />
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-orca-navy tracking-tight">{safeData.windSpeedKts} <span className="text-xs font-bold text-orca-navy/70">kts</span></span>
            <span className="text-[10px] text-orca-navy/70 font-bold">{safeData.windVector}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-orca-blue rounded-full w-[48%]" />
          </div>
        </div>

        {/* Metric 4: PFZ Yield */}
        <div
          onMouseEnter={() => setActiveHoverMetric('pfz')}
          onMouseLeave={() => setActiveHoverMetric(null)}
          onClick={() => onInspectDetails?.('pfz')}
          className={`p-3 rounded-xl border transition-all cursor-pointer ${
            activeHoverMetric === 'pfz'
              ? 'bg-emerald-50 border-emerald-300 shadow-xs scale-[1.02]'
              : 'bg-orca-ice/40 border-orca-env/60 hover:border-orca-cyan/40'
          }`}
        >
          <div className="flex items-center justify-between text-orca-navy/60 text-[10px] font-extrabold uppercase tracking-wider">
            <span>PFZ YIELD</span>
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-700 tracking-tight">{safeData.pfzYieldPercent}%</span>
            <span className="text-[10px] text-emerald-600 font-extrabold">{safeData.pfzStatus}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 rounded-full w-[89%]" />
          </div>
        </div>

        {/* Metric 5: Return Limit */}
        <div
          onMouseEnter={() => setActiveHoverMetric('return')}
          onMouseLeave={() => setActiveHoverMetric(null)}
          onClick={() => onInspectDetails?.('return')}
          className={`p-3 rounded-xl border transition-all cursor-pointer col-span-2 sm:col-span-1 ${
            activeHoverMetric === 'return'
              ? 'bg-amber-100/70 border-amber-400 shadow-xs scale-[1.02]'
              : 'bg-amber-50/50 border-amber-300 hover:border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between text-amber-900/70 text-[10px] font-extrabold uppercase tracking-wider">
            <span>RETURN LIMIT</span>
            <Clock className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-sm font-black text-amber-950 uppercase tracking-tight">{safeData.returnLimit}</span>
            <span className="text-[10px] text-amber-800 font-extrabold">Swell Barrier</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-amber-200 overflow-hidden mt-2">
            <div className="h-full bg-amber-500 rounded-full w-[91%]" />
          </div>
        </div>
      </div>

      {/* Hover Insight Context */}
      {activeHoverMetric && (
        <div className="p-2.5 rounded-xl bg-orca-ice border border-orca-cyan/40 text-xs text-orca-navy flex items-center justify-between animate-fade-in font-sans">
          <span className="flex items-center gap-1.5 font-medium">
            <Info className="w-3.5 h-3.5 text-orca-cyan shrink-0" />
            {activeHoverMetric === 'sst' && 'INCOIS OceanSat-3 satellite thermal anomaly +0.4°C supports phytoplankton synthesis.'}
            {activeHoverMetric === 'wave' && 'NIOT buoy sensor wave period 7.2s indicates moderate swell surge building after 09:30 AM.'}
            {activeHoverMetric === 'wind' && 'IMD coastal radar SW vector 14 kts is within safe vessel endurance stability limits.'}
            {activeHoverMetric === 'pfz' && 'Chlorophyll-a 1.45 mg/m³ concentration indicates high pelagic fish aggregation in Zone Alpha.'}
            {activeHoverMetric === 'return' && 'Wave surge elevation reaches 1.8m barrier by 11:30 AM requiring safe return to port.'}
          </span>
          <span className="text-[11px] text-orca-blue font-bold flex items-center gap-0.5 shrink-0 ml-2">
            Details <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      )}
    </div>
  );
};
