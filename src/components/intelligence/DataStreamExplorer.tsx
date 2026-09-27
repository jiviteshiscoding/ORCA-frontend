import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';
import { TimeSeriesChart } from '../charts/TimeSeriesChart';
import { BaseMap } from '../map/BaseMap';
import { ExpandableEvidence } from '../evidence/ExpandableEvidence';
import {
  Waves,
  Wind,
  Fish,
  Ship,
  ShieldAlert,
  Database,
  Bot,
} from 'lucide-react';

export type DataStreamCategory = 'ocean' | 'weather' | 'pfz' | 'vessel' | 'geo';

export interface DataStreamDef {
  id: DataStreamCategory;
  name: string;
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  shortDesc: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  sourceAttribution: string;
  linkedAgent: string;
  status: string;
}

const DATA_STREAMS: DataStreamDef[] = [
  {
    id: 'ocean',
    name: 'Ocean State',
    icon: Waves,
    accentColor: '#1685C7',
    shortDesc: 'Sea surface temperature anomalies, wave height profiles, and swell surge dynamics',
    primaryMetricLabel: 'SST Mean',
    primaryMetricValue: '28.5 °C (+0.4°C Anom)',
    secondaryMetricLabel: 'Wave Swell',
    secondaryMetricValue: '1.2 m (7.2s Swell Period)',
    sourceAttribution: 'INCOIS Ocean Satellite Grid & NIOT Moored Wave Buoy',
    linkedAgent: 'Ocean Agent',
    status: 'OPTIMAL THERMAL GRADIENT',
  },
  {
    id: 'weather',
    name: 'Weather & Atmosphere',
    icon: Wind,
    accentColor: '#20B8D8',
    shortDesc: 'Coastal wind velocity vectors, atmospheric pressure, and marine storm warnings',
    primaryMetricLabel: 'Wind Speed',
    primaryMetricValue: '14 kts (SW Vector)',
    secondaryMetricLabel: 'Barometric Pressure',
    secondaryMetricValue: '1012 hPa (Stable)',
    sourceAttribution: 'IMD Coastal Marine Weather Radar',
    linkedAgent: 'Weather Agent',
    status: 'WITHIN STABILITY LIMITS',
  },
  {
    id: 'pfz',
    name: 'PFZ / Fisheries Yield',
    icon: Fish,
    accentColor: '#10B981',
    shortDesc: 'Chlorophyll-a density concentration, potential fishing zones, and yield probability',
    primaryMetricLabel: 'Chlorophyll-a',
    primaryMetricValue: '1.45 mg/m³',
    secondaryMetricLabel: 'PFZ Yield Prob',
    secondaryMetricValue: '89% High Yield (Zone Alpha)',
    sourceAttribution: 'INCOIS PFZ Model & ISRO OceanSat-3',
    linkedAgent: 'PFZ / Fisheries Agent',
    status: 'HIGH PROBABILITY AGGREGATION',
  },
  {
    id: 'vessel',
    name: 'Vessel & AIS Dynamics',
    icon: Ship,
    accentColor: '#8B5CF6',
    shortDesc: 'AIS real-time vessel tracks, speed over ground, heading, and mission endurance',
    primaryMetricLabel: 'Active Unit',
    primaryMetricValue: 'Sea Pearl (Mechanized Trawler)',
    secondaryMetricLabel: 'Speed & Heading',
    secondaryMetricValue: '8.4 kts @ 120° NE',
    sourceAttribution: 'Coast Guard AIS VMS Telemetry Feed',
    linkedAgent: 'Mission Planner',
    status: 'UNDERWAY — OPTIMAL TRAJECTORY',
  },
  {
    id: 'geo',
    name: 'Geo & Safety Hazards',
    icon: ShieldAlert,
    accentColor: '#F97316',
    shortDesc: 'Maritime EEZ boundaries, restricted naval zones, and coastal swell hazard circles',
    primaryMetricLabel: 'Active Advisory',
    primaryMetricValue: 'Swell Surge Advisory #101',
    secondaryMetricLabel: 'Clearance Score',
    secondaryMetricValue: '94% Route Clearance',
    sourceAttribution: 'Naval Hydrographic Office & INCOIS Advisory',
    linkedAgent: 'Geo / Safety Agent',
    status: 'CLEARANCE VERIFIED WITHIN 25 NM',
  },
];

export const DataStreamExplorer: React.FC = () => {
  const [activeStreamId, setActiveStreamId] = useState<DataStreamCategory>('ocean');
  const stream = DATA_STREAMS.find((s) => s.id === activeStreamId) || DATA_STREAMS[0];

  return (
    <Card className="p-4 space-y-4 border-orca-env/80 bg-white shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orca-env/60 pb-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-orca-cyan" />
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-orca-navy">
              Marine Data Intelligence Center
            </h3>
            <span className="text-[10px] text-orca-navy/60 font-semibold block">
              Inspect primary marine information streams and visualization models
            </span>
          </div>
        </div>
        <StatusIndicator status="DEMO" />
      </div>

      {/* Stream Selector Buttons Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {DATA_STREAMS.map((s) => {
          const IconComponent = s.icon;
          const isActive = s.id === activeStreamId;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStreamId(s.id)}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between space-y-1 transition-all cursor-pointer ${
                isActive
                  ? 'bg-orca-navy text-white border-orca-navy shadow-xs font-bold'
                  : 'bg-white hover:bg-orca-ice/60 border-orca-env/80 text-orca-navy'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider truncate">{s.name}</span>
                <IconComponent className="w-3.5 h-3.5 shrink-0" style={{ color: isActive ? '#20B8D8' : s.accentColor }} />
              </div>
              <span className={`text-[9px] font-mono ${isActive ? 'text-orca-cyan font-bold' : 'text-orca-navy/60'}`}>
                {s.primaryMetricValue.split(' ')[0]} {s.primaryMetricValue.split(' ')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Stream Details & Primary Visualization Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start pt-1">
        {/* Stream Telemetry Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 rounded-xl bg-orca-ice/40 border border-orca-env/70 space-y-2">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-orca-navy" style={{ color: stream.accentColor }}>
                {stream.name} Data Profile
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-900 uppercase font-mono">
                {stream.status}
              </span>
            </div>

            <p className="text-xs text-orca-navy/80 font-medium leading-relaxed">
              {stream.shortDesc}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
              <div className="p-2 bg-white rounded-lg border border-orca-env/60">
                <span className="text-[9px] text-orca-navy/60 font-sans block">{stream.primaryMetricLabel}</span>
                <strong className="text-orca-navy">{stream.primaryMetricValue}</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-orca-env/60">
                <span className="text-[9px] text-orca-navy/60 font-sans block">{stream.secondaryMetricLabel}</span>
                <strong className="text-orca-navy">{stream.secondaryMetricValue}</strong>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-orca-env/70 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px] text-orca-navy/70">
              <span className="font-semibold">Source Attribution:</span>
              <span className="font-bold text-orca-navy">{stream.sourceAttribution}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-orca-navy/70 pt-1 border-t border-slate-100">
              <span className="font-semibold flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-orca-cyan" /> Processing Agent:
              </span>
              <strong className="text-orca-navy font-bold">{stream.linkedAgent}</strong>
            </div>
          </div>
        </div>

        {/* Primary Visualization Component (7 Cols) */}
        <div className="lg:col-span-7">
          {stream.id === 'vessel' || stream.id === 'geo' ? (
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-orca-navy/60 block">
                Spatial GIS Mapping Preview
              </span>
              <BaseMap height="320px" showControls={true} />
            </div>
          ) : (
            <TimeSeriesChart
              title={`${stream.name} Parameter Variation & Threshold Analysis`}
              accentColor={stream.accentColor}
            />
          )}
        </div>
      </div>

      {/* Progressive Disclosure Drawer for Detailed Stream Provenance */}
      <ExpandableEvidence
        title={`Inspect Detailed Provenance: ${stream.name}`}
        subtitle="Satellite resolution, ingestion latency, and agent validation pipeline"
        sourceName={stream.sourceAttribution}
        freshnessText="Updated 12m ago (Demo Feed)"
        confidence={96}
      >
        <div className="space-y-2 text-xs text-orca-navy">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 bg-white rounded-xl border border-orca-env">
              <span className="text-[10px] text-orca-navy/60 uppercase font-black block">Sensor Resolution</span>
              <span className="font-mono font-bold">1.1 km² Grid</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-orca-env">
              <span className="text-[10px] text-orca-navy/60 uppercase font-black block">Update Cycle</span>
              <span className="font-mono font-bold">Hourly Swath Sync</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-orca-env">
              <span className="text-[10px] text-orca-navy/60 uppercase font-black block">Calibration Status</span>
              <span className="font-mono font-bold text-emerald-700">✓ In Situ Validated</span>
            </div>
          </div>
        </div>
      </ExpandableEvidence>
    </Card>
  );
};
