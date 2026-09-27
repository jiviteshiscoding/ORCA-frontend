import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseMap } from '../../components/map/BaseMap';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusIndicator } from '../../components/ui/StatusIndicator';
import { TimeSeriesChart } from '../../components/charts/TimeSeriesChart';
import {
  FlaskConical,
  LineChart,
  FileSearch,
  Layers,
  Sparkles,
} from 'lucide-react';

export const ResearcherDashboardPage: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto animate-fade-in">
      {/* 1. RESEARCH DATA TELEMETRY STRIP */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-purple-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-purple-600" />
              Marine Researcher Oceanographic Analytics Lab
            </span>
            <StatusIndicator status="DEMO" />
          </div>
          <span className="text-orca-navy/60 hidden sm:inline font-mono text-[11px]">
            Model Dataset: <strong>INCOIS + MODIS Aqua Satellite Grid v4.2</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {/* Metric 1: SST Anomaly */}
          <Card variant="flat" className="p-3 border-purple-200 bg-purple-50/30 flex flex-col justify-between space-y-1 orca-card-hover">
            <span className="text-[10px] font-black text-purple-900/70 uppercase tracking-wider">SST Mean</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-purple-950">28.5°C</span>
              <span className="text-[10px] text-purple-700 font-extrabold">+0.4°C Anom</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-purple-100 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full w-[82%]" />
            </div>
          </Card>

          {/* Metric 2: Chlorophyll */}
          <Card variant="flat" className="p-3 border-emerald-200 bg-emerald-50/30 flex flex-col justify-between space-y-1 orca-card-hover">
            <span className="text-[10px] font-black text-emerald-900/70 uppercase tracking-wider">Chlorophyll-a</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-emerald-950">1.45 mg/m³</span>
              <span className="text-[10px] text-emerald-700 font-extrabold">High Yield</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-emerald-100 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[88%]" />
            </div>
          </Card>

          {/* Metric 3: Wave Period */}
          <Card variant="flat" className="p-3 border-blue-200 bg-blue-50/30 flex flex-col justify-between space-y-1 orca-card-hover">
            <span className="text-[10px] font-black text-blue-900/70 uppercase tracking-wider">Wave Period</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-blue-950">7.2 sec</span>
              <span className="text-[10px] text-blue-700 font-bold">1.2m Swell</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-blue-100 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-[55%]" />
            </div>
          </Card>

          {/* Metric 4: PFZ Index */}
          <Card variant="flat" className="p-3 border-purple-200 bg-purple-50/30 flex flex-col justify-between space-y-1 orca-card-hover">
            <span className="text-[10px] font-black text-purple-900/70 uppercase tracking-wider">PFZ Confidence</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-purple-950">92%</span>
              <span className="text-[10px] text-purple-700 font-extrabold">High Prob</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-purple-100 overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full w-[92%]" />
            </div>
          </Card>

          {/* Metric 5: Data Samples */}
          <Card variant="flat" className="p-3 border-orca-env flex flex-col justify-between space-y-1 orca-card-hover">
            <span className="text-[10px] font-black text-orca-navy/60 uppercase tracking-wider">Obs Data Points</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-orca-navy">1,420</span>
              <span className="text-[10px] text-emerald-600 font-bold">Calibrated</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-orca-cyan rounded-full w-[95%]" />
            </div>
          </Card>

          {/* Metric 6: Model Readiness */}
          <Card variant="flat" className="p-3 border-orca-env flex flex-col justify-between space-y-1 orca-card-hover">
            <span className="text-[10px] font-black text-orca-navy/60 uppercase tracking-wider">Model Status</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">VALIDATED</span>
              <span className="text-[10px] text-emerald-600 font-bold">INCOIS v4</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
          </Card>
        </div>
      </div>

      {/* 2. MAIN RESEARCH WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: SPATIAL ANALYSIS MAP (60% Desktop Width) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-black text-purple-950 uppercase tracking-wider">
                  Oceanographic GIS Spatial Multi-Layer Map
                </h3>
              </div>
              <Badge variant="demo" className="text-[9px]">SST + PFZ + BUOY OBS</Badge>
            </div>

            <BaseMap height="460px" />
          </div>

          {/* Interactive Multi-Series Time Series Trend Chart */}
          <TimeSeriesChart
            title="Oceanographic Parameter Correlation (7-Day Rolling Window)"
            accentColor="#8B5CF6"
          />
        </div>

        {/* RIGHT COLUMN: OCEAN EVIDENCE & SCIENTIFIC SOURCES (40% Desktop Width) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Research Evidence Vault Panel */}
          <Card className="border-purple-200 p-4 space-y-3 bg-white shadow-xs">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-purple-600" />
                <div>
                  <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider">
                    Scientific Evidence Vault
                  </h4>
                  <span className="text-[10px] text-orca-navy/60 font-semibold block">
                    Source provenance & data stream audit log
                  </span>
                </div>
              </div>
              <Badge variant="info" className="bg-purple-100 text-purple-900 border-purple-200 text-[9px]">
                4 SOURCES VERIFIED
              </Badge>
            </div>

            {selectedSource && (
              <div className="p-2 bg-purple-100 border border-purple-300 rounded-xl text-xs text-purple-950 font-bold flex items-center justify-between">
                <span>Selected Source: <strong>{selectedSource}</strong></span>
                <button onClick={() => setSelectedSource(null)} className="text-purple-700 hover:text-purple-900 text-[10px]">✕ Clear</button>
              </div>
            )}

            <div className="space-y-2 text-xs">
              {/* Source Item 1 */}
              <div
                onClick={() => setSelectedSource('INCOIS SST')}
                className="p-3 rounded-xl bg-purple-50/40 border border-purple-100 hover:border-purple-300 cursor-pointer transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-purple-950 text-xs">INCOIS High-Res SST Grid</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-purple-100 text-purple-900 font-mono">
                    98% CONF
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Sea Surface Temperature satellite composite (0.01° grid). Observed 28.5°C mean thermal gradient off Chennai coast.
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>Provider: INCOIS / ISRO OceanSat-3</span>
                  <span className="font-bold text-amber-800">DEMO DATA</span>
                </div>
              </div>

              {/* Source Item 2 */}
              <div
                onClick={() => setSelectedSource('MODIS Chlorophyll')}
                className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 hover:border-emerald-300 cursor-pointer transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-950 text-xs">MODIS Aqua Chlorophyll-a</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-900 font-mono">
                    94% CONF
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Phytoplankton density scanner. Detected 1.45 mg/m³ concentration matching PFZ Zone Alpha hotspot.
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>Provider: NASA MODIS Ocean Stream</span>
                  <span className="font-bold text-amber-800">DEMO DATA</span>
                </div>
              </div>

              {/* Source Item 3 */}
              <div
                onClick={() => setSelectedSource('Coastal Buoy')}
                className="p-3 rounded-xl bg-blue-50/40 border border-blue-100 hover:border-blue-300 cursor-pointer transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-blue-950 text-xs">NIOT Moored Coastal Buoy #44012</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-blue-100 text-blue-900 font-mono">
                    100% REALTIME
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Direct telemetry wave sensor. Wave period 7.2s, wave height 1.2m, water temp 28.2°C.
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>Provider: NIOT Marine Buoy Network</span>
                  <span className="font-bold text-amber-800">DEMO DATA</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Research Analytical Quick Actions */}
          <Card variant="flat" className="border-orca-env p-4 space-y-3 bg-gradient-to-br from-white via-purple-50/20 to-white">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h5 className="text-xs font-black text-purple-950 uppercase tracking-wider">
                  Analytical Controls
                </h5>
              </div>
              <Badge variant="demo" className="text-[9px]">DEMO READY</Badge>
            </div>

            <p className="text-xs text-orca-navy/80 leading-relaxed font-medium">
              Correlate satellite SST thermal boundaries with chlorophyll density vectors and wave swell dynamics.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <Link to="/researcher/analysis">
                <Button variant="primary" size="sm" className="w-full text-xs font-bold gap-1 py-2 bg-purple-700 hover:bg-purple-800">
                  <LineChart className="w-3.5 h-3.5" />
                  <span>DATA ANALYSIS</span>
                </Button>
              </Link>
              <Link to="/researcher/evidence">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold gap-1 py-2 border-purple-300 text-purple-900 hover:bg-purple-50">
                  <FileSearch className="w-3.5 h-3.5 text-purple-600" />
                  <span>EVIDENCE VAULT</span>
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
