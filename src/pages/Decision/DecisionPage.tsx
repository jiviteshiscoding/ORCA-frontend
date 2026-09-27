import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { StatusIndicator } from '../../components/ui/StatusIndicator';
import { DataStreamExplorer } from '../../components/intelligence/DataStreamExplorer';
import { MarineCorrelationView } from '../../components/intelligence/MarineCorrelationView';
import { DataAgentDecisionFlow } from '../../components/intelligence/DataAgentDecisionFlow';
import { DataProvenancePanel } from '../../components/provenance/DataProvenancePanel';
import { LineChart } from 'lucide-react';

export const DecisionPage: React.FC = () => {
  return (
    <div className="space-y-4 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white rounded-xl border border-orca-env/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-orca-cyan" />
          <h1 className="text-sm font-black text-orca-navy uppercase tracking-wider">
            ORCA Marine Data & Impact Analysis Workstation
          </h1>
          <Badge variant="demo" className="text-[9px]">Phase 6 Intelligence Pass</Badge>
        </div>
        <StatusIndicator status="DEMO" />
      </div>

      {/* Main Data Intelligence Center Stream Explorer */}
      <DataStreamExplorer />

      {/* Data Source → Agent → Decision Flow Pipeline */}
      <DataAgentDecisionFlow />

      {/* Multi-Stream Convergence & Data Provenance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7">
          <MarineCorrelationView />
        </div>
        <div className="lg:col-span-5">
          <DataProvenancePanel />
        </div>
      </div>
    </div>
  );
};

