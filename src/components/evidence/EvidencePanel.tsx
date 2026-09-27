import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { DataFreshnessBadge } from '../ui/DataFreshnessBadge';
import { FileCheck, ChevronDown, ChevronUp, Waves, Fish, CloudSun, MapPin } from 'lucide-react';

export interface EvidenceItemDef {
  sourceName: string;
  metric: string;
  value: string;
  timestamp: string;
  impact: string;
  icon: 'ocean' | 'pfz' | 'weather' | 'gis';
}

export interface EvidencePanelProps {
  items?: EvidenceItemDef[];
}

const DEFAULT_EVIDENCE_ITEMS: EvidenceItemDef[] = [
  {
    sourceName: 'INCOIS Ocean State Forecast',
    metric: 'Wave Height & Swell',
    value: '1.2 m (7s Period)',
    timestamp: '05:30 Z',
    impact: 'Moderate risk beyond 30 NM',
    icon: 'ocean',
  },
  {
    sourceName: 'INCOIS PFZ Chlorophyll Advisory',
    metric: 'Fisheries Potential',
    value: '1.45 mg/m³ (89% Yield)',
    timestamp: '06:00 Z',
    impact: 'Positive fishing opportunity',
    icon: 'pfz',
  },
  {
    sourceName: 'IMD Marine Weather Feed',
    metric: 'Wind Speed & Direction',
    value: '14 kts SW Vector',
    timestamp: '05:45 Z',
    impact: 'Acceptable vessel stability',
    icon: 'weather',
  },
  {
    sourceName: 'Maritime Boundary GeoJSON',
    metric: 'EEZ & Restricted Zones',
    value: 'Clear (No Conflict)',
    timestamp: '04:00 Z',
    impact: 'Safe navigation clearance',
    icon: 'gis',
  },
];

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  items = DEFAULT_EVIDENCE_ITEMS,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const getIcon = (type: EvidenceItemDef['icon']) => {
    switch (type) {
      case 'ocean':
        return <Waves className="w-4 h-4 text-orca-blue" />;
      case 'pfz':
        return <Fish className="w-4 h-4 text-emerald-600" />;
      case 'weather':
        return <CloudSun className="w-4 h-4 text-orca-cyan" />;
      case 'gis':
      default:
        return <MapPin className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <Card variant="flat" className="border-orca-env space-y-3 p-4">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-extrabold text-orca-navy hover:text-orca-cyan transition-colors cursor-pointer"
        >
          <FileCheck className="w-5 h-5 text-orca-blue" />
          <span>Evidence & Source Attribution</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <DataFreshnessBadge status="DEMO SNAPSHOT" />
      </div>

      {isOpen && (
        <div className="space-y-2 text-xs animate-in fade-in duration-200">
          <p className="text-[11px] text-orca-navy/70 leading-relaxed font-medium">
            Empirical data points compiled from simulated marine models backing this decision recommendation.
          </p>

          <div className="space-y-1.5">
            {items.map((item) => (
              <div
                key={item.sourceName}
                className="p-2.5 rounded-xl bg-white border border-orca-env/60 space-y-1 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-orca-navy">
                    {getIcon(item.icon)}
                    <span>{item.sourceName}</span>
                  </div>
                  <span className="font-mono text-[10px] text-orca-navy/50">{item.timestamp}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] pl-5">
                  <span className="text-orca-navy/70">{item.metric}: <strong className="text-orca-navy">{item.value}</strong></span>
                  <span className="text-emerald-700 font-semibold">{item.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
