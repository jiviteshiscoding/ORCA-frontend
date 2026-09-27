import React from 'react';
import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';
import { Database, Clock, Bot } from 'lucide-react';

export interface ProvenanceItem {
  id: string;
  sourceProvider: string;
  datasetName: string;
  parameter: string;
  value: string;
  confidenceScore: number;
  lastUpdated: string;
  linkedAgent: string;
  dataType: 'DEMO' | 'REALTIME';
  description?: string;
}

export interface DataProvenancePanelProps {
  items?: ProvenanceItem[];
  title?: string;
}

const DEFAULT_PROVENANCE_ITEMS: ProvenanceItem[] = [
  {
    id: 'prov-01',
    sourceProvider: 'INCOIS Ocean Modeling Stream',
    datasetName: 'High-Resolution SST Thermal Grid v4',
    parameter: 'Sea Surface Temperature (SST)',
    value: '28.5 °C (+0.4°C Anom)',
    confidenceScore: 98,
    lastUpdated: '08:45:00 Z Today',
    linkedAgent: 'Ocean Agent',
    dataType: 'DEMO',
    description: 'Chlorophyll production boundary thermal composite derived from ISRO OceanSat-3 satellite sensor.',
  },
  {
    id: 'prov-02',
    sourceProvider: 'INCOIS Fisheries Potential Zone',
    datasetName: 'PFZ Yield & Density Forecast Model',
    parameter: 'Chlorophyll-a & Yield Probability',
    value: '1.45 mg/m³ (89% High Yield)',
    confidenceScore: 92,
    lastUpdated: '06:00:00 Z Today',
    linkedAgent: 'PFZ / Fisheries Agent',
    dataType: 'DEMO',
    description: 'Pelagic fish aggregation density zone calculated via satellite SST-Chlorophyll edge gradient.',
  },
  {
    id: 'prov-03',
    sourceProvider: 'NIOT Moored Coastal Buoy Network',
    datasetName: 'Buoy Station #44012 Telemetry',
    parameter: 'Wave Height & Swell Surge Period',
    value: '1.2 m (7.2s Swell Period)',
    confidenceScore: 100,
    lastUpdated: '08:50:00 Z Today',
    linkedAgent: 'Weather Agent',
    dataType: 'DEMO',
    description: 'In-situ acoustic wave period radar telemetry deployed at Chennai offshore coastal station.',
  },
  {
    id: 'prov-04',
    sourceProvider: 'Indian Coast Guard & AIS VMS',
    datasetName: 'Automated Identification System Track',
    parameter: 'Vessel Clearance & Geofence Status',
    value: 'Sea Pearl (IND-TN-02-MM-411)',
    confidenceScore: 95,
    lastUpdated: '08:45:12 Z Today',
    linkedAgent: 'Geo / Safety Agent',
    dataType: 'DEMO',
    description: 'Vessel position, endurance stability, and boundary clearance verified within 25 NM zone.',
  },
];

export const DataProvenancePanel: React.FC<DataProvenancePanelProps> = ({
  items = DEFAULT_PROVENANCE_ITEMS,
  title = 'Data Source Provenance & Audit Ledger',
}) => {
  return (
    <Card className="p-4 space-y-3 border-orca-env/80 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2.5">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-orca-cyan" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">{title}</h4>
            <span className="text-[10px] text-orca-navy/60 font-semibold block">
              Multi-source data stream attribution & sensor calibration status
            </span>
          </div>
        </div>
        <StatusIndicator status="DEMO" />
      </div>

      <div className="space-y-2 text-xs">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl bg-orca-ice/40 border border-orca-env/60 hover:border-orca-cyan/40 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-orca-navy text-xs">{item.datasetName}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-900 font-mono">
                  {item.confidenceScore}% CONFIDENCE
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-orca-cyan" /> {item.lastUpdated}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono bg-white p-2 rounded-lg border border-orca-env/40">
              <div>
                <span className="text-[9px] text-orca-navy/60 font-sans block">Observed Value</span>
                <strong className="text-orca-navy font-bold">{item.value}</strong>
              </div>
              <div>
                <span className="text-[9px] text-orca-navy/60 font-sans block">Primary Parameter</span>
                <strong className="text-orca-blue font-bold">{item.parameter}</strong>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1 text-orca-navy/70 font-semibold">
                <span>Provider:</span>
                <strong className="text-orca-navy font-bold">{item.sourceProvider}</strong>
              </div>

              <div className="flex items-center gap-1 font-bold text-orca-navy">
                <Bot className="w-3 h-3 text-orca-cyan" />
                <span>Linked: {item.linkedAgent}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
