import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Bot, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export interface StreamNode {
  id: string;
  label: string;
  source: string;
  metric: string;
  status: 'active' | 'sync';
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  confidence: number;
}

const DATA_NODES: StreamNode[] = [
  { id: 'incois', label: 'SST & Swell Grid', source: 'INCOIS Satellite', metric: '28.5°C / 1.2m', status: 'active' },
  { id: 'isro', label: 'Chlorophyll-a', source: 'ISRO OceanSat-3', metric: '1.45 mg/m³', status: 'active' },
  { id: 'niot', label: 'Moored Wave Buoy', source: 'NIOT Sensor #44012', metric: '7.2s Swell Period', status: 'active' },
  { id: 'imd', label: 'Marine Doppler Radar', source: 'IMD Coastal Radar', metric: '14 kts Wind', status: 'active' },
  { id: 'ais', label: 'Vessel Telemetry', source: 'Coast Guard AIS', metric: '5 Units Active', status: 'active' },
];

const AGENT_NODES: AgentNode[] = [
  { id: 'a1', name: 'Mission Planner', role: 'Route & Time Limit', confidence: 96 },
  { id: 'a2', name: 'Ocean Agent', role: 'Hydrodynamic Vector', confidence: 92 },
  { id: 'a3', name: 'Weather Agent', role: 'Atmospheric Radar', confidence: 94 },
  { id: 'a4', name: 'PFZ Agent', role: 'Yield Aggregator', confidence: 89 },
  { id: 'a5', name: 'Geo / Safety', role: 'Boundary Guard', confidence: 98 },
  { id: 'a6', name: 'Evidence Audit', role: 'Data Ledger', confidence: 99 },
  { id: 'a7', name: 'Decision Engine', role: 'Consensus Synthesis', confidence: 91 },
];

export const AgentReasoningGraph: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentNode | null>(AGENT_NODES[6]);

  return (
    <Card className="p-4 space-y-3.5 border-orca-env/80 bg-white shadow-xs select-none">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-orca-cyan" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">
              Data → Multi-Agent → Decision Graph
            </h4>
            <span className="text-[10px] text-orca-navy/60 font-semibold block">
              Live signal propagation between satellite sensors & decision consensus
            </span>
          </div>
        </div>

        <Badge variant="success" className="text-[9px]">
          <CheckCircle2 className="w-3 h-3 inline mr-1 text-emerald-600" />
          7/7 SYNCHRONIZED
        </Badge>
      </div>

      {/* 3-Column Node Graph Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Col 1: 5 Data Stream Ingestion Nodes (3 Cols) */}
        <div className="md:col-span-4 space-y-1.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-orca-navy/60 font-mono block px-1">
            INPUT DATA STREAMS
          </span>

          {DATA_NODES.map((d) => (
            <div
              key={d.id}
              className="p-2 rounded-xl bg-orca-ice/40 border border-orca-env/70 flex items-center justify-between text-xs hover:border-orca-cyan/50 transition-all"
            >
              <div className="truncate">
                <span className="font-extrabold text-orca-navy block text-[11px] truncate">{d.label}</span>
                <span className="text-[9px] text-orca-navy/60 font-mono truncate">{d.source}</span>
              </div>
              <span className="font-mono text-[10px] font-bold text-orca-cyan shrink-0 ml-1 bg-white px-1.5 py-0.5 rounded border border-orca-env/60">
                {d.metric}
              </span>
            </div>
          ))}
        </div>

        {/* Col 2: Pulse Signal Arrow (1 Col) */}
        <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center text-orca-cyan">
          <div className="w-full h-0.5 bg-gradient-to-r from-orca-cyan/30 via-orca-cyan to-orca-cyan/30 animate-pulse my-2" />
          <ArrowRight className="w-5 h-5 text-orca-cyan animate-pulse" />
          <span className="text-[8px] font-mono text-orca-navy/60 uppercase font-black tracking-widest mt-1">
            SYNC
          </span>
        </div>

        {/* Col 3: 7 Multi-Agent Nodes Rail (4 Cols) */}
        <div className="md:col-span-4 space-y-1.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-orca-navy/60 font-mono block px-1">
            COLLABORATIVE AGENTS
          </span>

          <div className="grid grid-cols-1 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
            {AGENT_NODES.map((a) => {
              const isSelected = selectedAgent?.id === a.id;
              return (
                <div
                  key={a.id}
                  onClick={() => setSelectedAgent(a)}
                  className={`p-2 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-orca-navy text-white border-orca-cyan ring-1 ring-orca-cyan shadow-xs'
                      : 'bg-white hover:bg-orca-ice/50 border-orca-env/70 text-orca-navy'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-orca-cyan animate-ping' : 'bg-emerald-500'}`} />
                    <div className="truncate">
                      <span className="font-extrabold text-[11px] block truncate">{a.name}</span>
                      <span className={`text-[9px] font-mono ${isSelected ? 'text-orca-cyan' : 'text-orca-navy/60'}`}>
                        {a.role}
                      </span>
                    </div>
                  </div>

                  <span className={`font-mono text-[10px] font-bold ${isSelected ? 'text-emerald-400' : 'text-orca-navy/70'}`}>
                    {a.confidence}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Col 4: Unified Consensus Output Card (3 Cols) */}
        <div className="md:col-span-3 p-3.5 rounded-2xl bg-gradient-to-br from-orca-navy via-orca-deep to-orca-navy text-white border border-orca-cyan/40 space-y-2 shadow-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[9px] font-mono font-black uppercase tracking-wider text-orca-cyan flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> CONSENSUS
            </span>
            <span className="text-[9px] font-mono text-emerald-400 font-bold">91% MATCH</span>
          </div>

          <div>
            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-400 text-amber-950 block w-max">
              GO WITH CAUTION
            </span>
            <h5 className="text-xs font-black text-white mt-1">Optimal Window: 05:30 AM - 11:30 AM</h5>
          </div>

          {selectedAgent && (
            <div className="pt-1.5 border-t border-white/10 text-[10px] space-y-1 font-mono">
              <span className="text-orca-cyan font-bold block">Focus: {selectedAgent.name}</span>
              <p className="text-orca-ice/80 leading-tight">
                Evaluating {selectedAgent.role.toLowerCase()} with {selectedAgent.confidence}% calibrated confidence.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
