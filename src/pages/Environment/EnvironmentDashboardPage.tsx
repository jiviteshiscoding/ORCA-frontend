import React from 'react';
import { Link } from 'react-router-dom';
import { BaseMap } from '../../components/map/BaseMap';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusIndicator } from '../../components/ui/StatusIndicator';
import { MetricCluster, MetricItem } from '../../components/ui/MetricCluster';
import { ExpandableEvidence } from '../../components/evidence/ExpandableEvidence';
import { TimeSeriesChart } from '../../components/charts/TimeSeriesChart';
import {
  Leaf,
  BarChart3,
  FileText,
  Sparkles,
  MapPin,
} from 'lucide-react';

const ECO_METRICS: MetricItem[] = [
  { label: 'Ecosystem Health Index', value: '84 / 100', change: 'GOOD STATUS', status: 'optimal', progress: 84, detail: 'Integrated composite of chlorophyll-a, SST, dissolved oxygen, and turbidity.' },
  { label: 'MPA Compliance', value: '100%', change: 'SECURE', status: 'optimal', progress: 100, detail: 'Full vessel compliance in Pulicat Marine Biosphere Protected Area.' },
  { label: 'Coral Thermal Stress', value: '0.2 DHW', change: 'Low Risk', status: 'optimal', progress: 15, detail: 'Degree Heating Weeks below 4.0 threshold; no bleaching alert active.' },
  { label: 'Phytoplankton Yield', value: '1.45 mg/m³', change: 'Optimal Bloom', status: 'optimal', progress: 88, detail: 'Healthy pelagic primary production supporting local fisheries.' },
  { label: 'Water Quality Score', value: '88%', change: 'Clear Turbidity', status: 'optimal', progress: 88, detail: 'Low turbidity (NDTI < 0.15) and normal salinity (34.2 PSU).' },
  { label: 'MPA Intrusion', value: '0', change: 'No Intrusion', status: 'optimal', progress: 100, detail: 'Zero illegal trawlers or unauthorized vessels inside sanctuary limits.' },
];

export const EnvironmentDashboardPage: React.FC = () => {

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto animate-fade-in">
      {/* 1. ENVIRONMENTAL TELEMETRY STRIP */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-emerald-950 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" />
              Environmental Analyst Ecosystem Intelligence Desk
            </span>
            <StatusIndicator status="DEMO" />
          </div>
          <span className="text-orca-navy/70 hidden sm:inline font-mono text-[11px]">
            Protected Zone: <strong>Pulicat Marine Biosphere & MPA Sanctuary</strong>
          </span>
        </div>

        <MetricCluster
          title="Marine Biosphere Ecosystem Health & Sanctuary Metrics"
          subtitle="Real-time MODIS, NOAA Coral Watch & Sentinel-2 SAR Telemetry"
          metrics={ECO_METRICS}
        />
      </div>

      {/* 2. MAIN WORKSPACE CANVAS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: BIO-GEOSPATIAL MAP (60% Desktop Width) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-black text-emerald-950 uppercase tracking-wider">
                  Bio-Geospatial Ecosystem Map & Sanctuary GIS
                </h3>
              </div>
              <Badge variant="success" className="text-[9px]">MPA ZONE ALPHA ACTIVE</Badge>
            </div>

            <BaseMap height="460px" />
          </div>

          {/* Time Series Trend Component with Marine Green Accent */}
          <TimeSeriesChart
            title="Ecosystem Parameter Trend (Phytoplankton vs Thermal Profile)"
            accentColor="#10B981"
          />
        </div>

        {/* RIGHT COLUMN: ECOSYSTEM EVIDENCE & MPA LOGS (40% Desktop Width) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Ecosystem Evidence Panel */}
          <Card className="border-emerald-200 p-4 space-y-3 bg-white shadow-xs">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <div>
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                    Ecosystem Audit & Satellite Evidence
                  </h4>
                  <span className="text-[10px] text-orca-navy/60 font-semibold block">
                    Sanctuary health verification log
                  </span>
                </div>
              </div>
              <Badge variant="demo" className="text-[9px]">INCOIS + SENTINEL-2</Badge>
            </div>

            <div className="space-y-2 text-xs">
              {/* Log Entry 1 */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-950 text-xs">Phytoplankton Concentration Check</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800 font-mono">
                    PASS ✓
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Chlorophyll-a level 1.45 mg/m³ supports healthy pelagic food web without algal bloom toxicity risk.
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>Source: MODIS Chlorophyll Stream</span>
                  <span className="font-bold text-amber-800">DEMO DATA</span>
                </div>
              </div>

              {/* Log Entry 2 */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-950 text-xs">Coral Thermal Bleaching Stress Index</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800 font-mono">
                    0.2 DHW
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Sea surface temperature (28.2°C) is within seasonal thermal tolerance window for coastal reefs.
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>Source: NOAA Coral Reef Watch Model</span>
                  <span className="font-bold text-amber-800">DEMO DATA</span>
                </div>
              </div>

              {/* Log Entry 3 */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-blue-950 text-xs">MPA Sanctuary Intrusion Monitor</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-blue-100 text-blue-900 font-mono">
                    0 INTRUSIONS
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  No unauthorized commercial trawling or illegal dumping detected in MPA Zone Alpha boundary.
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>Source: AIS + Sentinel-1 Radar SAR</span>
                  <span className="font-bold text-amber-800">DEMO DATA</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Environmental Action Panel */}
          <Card variant="flat" className="border-emerald-200 p-4 space-y-3 bg-gradient-to-br from-white via-emerald-50/20 to-white">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                  Environmental Controls
                </h5>
              </div>
              <Badge variant="success" className="text-[9px]">ECO READY</Badge>
            </div>

            <p className="text-xs text-orca-navy/80 leading-relaxed font-medium">
              Analyze bio-geospatial trends, marine sanctuary compliance, and habitat stress metrics.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <Link to="/environment/analysis">
                <Button variant="primary" size="sm" className="w-full text-xs font-bold gap-1 py-2 bg-emerald-600 hover:bg-emerald-700">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>IMPACT ANALYSIS</span>
                </Button>
              </Link>
              <Link to="/environment/evidence">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold gap-1 py-2 border-emerald-300 text-emerald-950 hover:bg-emerald-50">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ECO EVIDENCE</span>
                </Button>
              </Link>
            </div>
          </Card>

          {/* Progressive Disclosure: Ecosystem Provenance & Sanctuary Health */}
          <ExpandableEvidence
            title="Sanctuary Sensor Calibration & Audit Log"
            subtitle="MODIS Chlorophyll-a + NOAA Coral Watch + Sentinel-2 SAR"
            sourceName="Pulicat Marine Biosphere Sensor Network"
            freshnessText="Fresh (Demo Feed)"
            confidence={98}
          >
            <div className="space-y-2 text-xs text-orca-navy">
              <p className="text-[11px] text-orca-navy/80 leading-relaxed font-medium">
                Sanctuary compliance automatically validated by ORCA Environmental Agent using real-time SAR radar reflectance to detect vessel intrusion inside marine protected coordinates.
              </p>
            </div>
          </ExpandableEvidence>
        </div>
      </div>
    </div>
  );
};
