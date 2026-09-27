import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { StatusIndicator } from '../../components/ui/StatusIndicator';
import { EvidencePanel } from '../../components/evidence/EvidencePanel';
import { DataProvenancePanel } from '../../components/provenance/DataProvenancePanel';
import { FileSearch } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  return (
    <div className="space-y-4 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white rounded-xl border border-orca-env/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <FileSearch className="w-4 h-4 text-orca-cyan" />
          <h1 className="text-sm font-black text-orca-navy uppercase tracking-wider">
            ORCA Evidence & Data Provenance Vault
          </h1>
          <Badge variant="demo" className="text-[9px]">Phase 6 Evidence Pass</Badge>
        </div>
        <StatusIndicator status="DEMO" />
      </div>

      {/* Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Evidence Panel (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <EvidencePanel />
        </div>

        {/* Provenance Panel Ledger (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <DataProvenancePanel title="Multi-Sensor Provenance & Calibration Ledger" />
        </div>
      </div>
    </div>
  );
};

