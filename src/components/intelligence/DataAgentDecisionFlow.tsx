import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Database, Activity, Bot, Sparkles, ShieldCheck } from 'lucide-react';

export interface FlowStep {
  dataSource: string;
  parameter: string;
  agent: string;
  interpretation: string;
  decisionFactor: string;
  status: 'SAFE' | 'WARNING' | 'NEUTRAL';
}

export interface DataAgentDecisionFlowProps {
  flows?: FlowStep[];
  title?: string;
}

const DEFAULT_FLOWS: FlowStep[] = [
  {
    dataSource: 'INCOIS PFZ Feed',
    parameter: 'Chlorophyll 1.45 mg/m³',
    agent: 'PFZ / Fisheries Agent',
    interpretation: 'High pelagic fish-density probability',
    decisionFactor: 'Positive Fishing Yield (+89%)',
    status: 'SAFE',
  },
  {
    dataSource: 'INCOIS Satellite SST',
    parameter: 'SST 28.5 °C (+0.4°C Anom)',
    agent: 'Ocean Agent',
    interpretation: 'Optimal thermal synthesis gradient',
    decisionFactor: 'Favorable Sea Temp Profile',
    status: 'SAFE',
  },
  {
    dataSource: 'NIOT Coastal Buoy #44012',
    parameter: 'Wave Height 1.2m (7.2s)',
    agent: 'Weather Agent',
    interpretation: 'Moderate swell elevation after 09:30 AM',
    decisionFactor: 'Return by 11:30 AM Constraint',
    status: 'WARNING',
  },
  {
    dataSource: 'Coast Guard & AIS VMS',
    parameter: 'Vessel Clearance (25 NM)',
    agent: 'Geo / Safety Agent',
    interpretation: 'Clear boundary route within fuel endurance',
    decisionFactor: 'Safe Navigation Buffer',
    status: 'SAFE',
  },
];

export const DataAgentDecisionFlow: React.FC<DataAgentDecisionFlowProps> = ({
  flows = DEFAULT_FLOWS,
  title = 'Data → Agent → Decision Flow Pipeline',
}) => {
  return (
    <Card className="p-4 space-y-3 border-orca-cyan/40 bg-gradient-to-br from-white via-orca-ice/20 to-white shadow-xs">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orca-cyan" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">{title}</h4>
            <span className="text-[10px] text-orca-navy/60 font-semibold block">
              DATA SOURCE → PARAMETER → AGENT → INTERPRETATION → DECISION FACTOR
            </span>
          </div>
        </div>
        <Badge variant="demo" className="text-[9px]">5 STREAMS CONVERGENCE</Badge>
      </div>

      <div className="space-y-2.5 pt-1">
        {flows.map((flow, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-white border border-orca-env/70 shadow-2xs space-y-2 orca-card-hover"
          >
            {/* 5-Step Horizontal Sequence */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs items-center">
              {/* Step 1: Data Source */}
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-black text-slate-500 uppercase block flex items-center gap-1">
                  <Database className="w-3 h-3 text-slate-600" /> 1. SOURCE
                </span>
                <span className="font-extrabold text-orca-navy text-[11px] truncate block mt-0.5">
                  {flow.dataSource}
                </span>
              </div>

              {/* Step 2: Parameter */}
              <div className="p-2 rounded-lg bg-orca-ice/60 border border-orca-env">
                <span className="text-[9px] font-black text-orca-navy/60 uppercase block flex items-center gap-1">
                  <Activity className="w-3 h-3 text-orca-cyan" /> 2. PARAMETER
                </span>
                <span className="font-mono font-bold text-orca-blue text-[11px] truncate block mt-0.5">
                  {flow.parameter}
                </span>
              </div>

              {/* Step 3: Agent */}
              <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                <span className="text-[9px] font-black text-purple-700 uppercase block flex items-center gap-1">
                  <Bot className="w-3 h-3 text-purple-600" /> 3. AGENT
                </span>
                <span className="font-extrabold text-purple-950 text-[11px] truncate block mt-0.5">
                  {flow.agent}
                </span>
              </div>

              {/* Step 4: Interpretation */}
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                <span className="text-[9px] font-black text-blue-700 uppercase block flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" /> 4. INFERENCE
                </span>
                <span className="font-bold text-blue-950 text-[11px] truncate block mt-0.5">
                  {flow.interpretation}
                </span>
              </div>

              {/* Step 5: Decision Factor */}
              <div className={`p-2 rounded-lg border ${
                flow.status === 'SAFE'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <span className="text-[9px] font-black uppercase block flex items-center gap-1 opacity-75">
                  <ShieldCheck className="w-3 h-3" /> 5. FACTOR
                </span>
                <span className="font-black text-[11px] truncate block mt-0.5">
                  {flow.decisionFactor}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
