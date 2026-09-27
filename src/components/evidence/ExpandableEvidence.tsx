import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { DataProvenancePanel } from '../provenance/DataProvenancePanel';
import { FileSearch, ChevronDown, ChevronUp, Database } from 'lucide-react';

export interface ExpandableEvidenceProps {
  title?: string;
  subtitle?: string;
  sourceName?: string;
  freshnessText?: string;
  confidence?: number;
  children?: React.ReactNode;
}

export const ExpandableEvidence: React.FC<ExpandableEvidenceProps> = ({
  title = 'Level 2 & 4 Evidence & Provenance',
  subtitle,
  sourceName = 'INCOIS, ISRO OceanSat-3, NIOT Buoy',
  freshnessText,
  confidence = 94,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-3.5 space-y-3 border-orca-env/80 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
        <div className="flex items-center gap-2">
          <FileSearch className="w-4 h-4 text-purple-600" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">{title}</h4>
            {subtitle && <p className="text-[10px] text-orca-navy/60 font-semibold">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {freshnessText && (
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">{freshnessText}</span>
          )}
          <Badge variant="info" className="bg-purple-100 text-purple-900 border-purple-200 text-[9px]">
            {confidence}% CONFIDENCE
          </Badge>
        </div>
      </div>

      {/* Primary Evidence Children if provided, else standard source chips */}
      {children ? (
        <div className="pt-0.5">{children}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-purple-50/50 border border-purple-200">
            <span className="text-[9px] text-purple-900/70 font-bold block">INCOIS SST</span>
            <span className="font-mono font-extrabold text-purple-950 text-[11px]">98% Confidence</span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-200">
            <span className="text-[9px] text-emerald-900/70 font-bold block">MODIS Chlorophyll</span>
            <span className="font-mono font-extrabold text-emerald-950 text-[11px]">92% Confidence</span>
          </div>
          <div className="p-2 rounded-lg bg-blue-50/50 border border-blue-200">
            <span className="text-[9px] text-blue-900/70 font-bold block">NIOT Buoy Telemetry</span>
            <span className="font-mono font-extrabold text-blue-950 text-[11px]">100% Realtime</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[9px] text-slate-600 font-bold block">AIS Geofence Buffer</span>
            <span className="font-mono font-extrabold text-slate-900 text-[11px]">95% Clearance</span>
          </div>
        </div>
      )}

      {/* Progressive Disclosure Toggle Button */}
      <div className="pt-1 flex items-center justify-between">
        <span className="text-[10px] text-orca-navy/60 font-semibold font-mono">
          Source: <strong>{sourceName}</strong>
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-bold gap-1 py-1 px-3 border-purple-300 text-purple-900 hover:bg-purple-50"
        >
          <Database className="w-3.5 h-3.5 text-purple-600" />
          <span>{isOpen ? 'Hide Provenance' : 'Inspect Provenance & Audit'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </Button>
      </div>

      {/* Expandable Technical Detail Panel */}
      {isOpen && (
        <div className="pt-2 animate-fade-in">
          <DataProvenancePanel title="Detailed Multi-Sensor Provenance & Calibration Ledger" />
        </div>
      )}
    </Card>
  );
};
