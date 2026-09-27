import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseMap } from '../../components/map/BaseMap';
import { DecisionHero } from '../../components/ui/DecisionHero';
import { MetricCluster } from '../../components/ui/MetricCluster';
import { DataAgentDecisionFlow } from '../../components/intelligence/DataAgentDecisionFlow';
import { AgentTimeline } from '../../components/agents/AgentTimeline';
import { ExpandableEvidence } from '../../components/evidence/ExpandableEvidence';
import { AskOrcaLauncher } from '../../components/ui/AskOrcaLauncher';
import { INITIAL_AGENT_STEPS } from '../AskORCA/AskORCAPage';
import { useMarineData } from '../../hooks/useMarineData';
import { useRoleSession } from '../../hooks/useRoleSession';
import { MapPin, SlidersHorizontal, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const CommandCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useRoleSession();
  const marineData = useMarineData();

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto animate-fade-in">
      {/* LEVEL 1 — COMMAND: HERO DECISION ZONE */}
      <DecisionHero
        decision="CAUTION"
        confidence={91}
        primaryReason={marineData.decision.primaryReason}
        recommendedWindow={`${marineData.recommendedWindow.start} — ${marineData.recommendedWindow.end}`}
        returnConstraint="Before 11:30 AM (Wave Swell Barrier)"
        onAskORCA={() => navigate('/fisher/ask')}
        onPrimaryAction={() => navigate('/fisher/mission')}
        primaryActionText="MISSION PLANNER"
        onToggleDetails={() => setShowDetails(!showDetails)}
        showDetails={showDetails}
      />

      {/* LEVEL 2 — EVIDENCE: ELEGANT TELEMETRY CLUSTER */}
      <MetricCluster
        data={{
          sstTempC: marineData.weather.seaSurfaceTempC,
          sstStatus: 'Optimal',
          waveHeightM: marineData.weather.waveHeightM,
          waveStatus: 'Moderate',
          windSpeedKts: marineData.weather.windSpeedKts,
          windVector: 'SW Vector',
          pfzYieldPercent: 89,
          pfzStatus: 'High Yield',
          returnLimit: 'BEFORE 11:30 AM',
          vesselName: session.userContext?.vesselName || 'Sea Pearl',
        }}
        onInspectDetails={() => navigate('/fisher/ask')}
      />

      {/* MAIN WORKSPACE CANVAS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: SPATIAL MARINE MAP (60% Desktop Width) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orca-cyan" />
                <h3 className="text-sm font-black text-orca-navy uppercase tracking-wider">
                  Spatial Marine Situation Map
                </h3>
              </div>
              <button
                onClick={() => navigate('/fisher/map')}
                className="text-xs font-bold text-orca-blue hover:underline cursor-pointer"
              >
                Expand Full Map →
              </button>
            </div>

            <BaseMap height="480px" showControls={true} />
          </div>

          {/* Expandable Evidence & Provenance Section */}
          <ExpandableEvidence title="Verified Marine Evidence & Provenance" />
        </div>

        {/* RIGHT COLUMN: REASONING & EXPLANATION PIPELINE (40% Desktop Width) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 7-Agent Orchestration Sequence Rail */}
          <AgentTimeline steps={INITIAL_AGENT_STEPS} isCompleted={true} />

          {/* Primary Factor Rules Breakdown */}
          <div className="bg-white p-4 rounded-2xl border border-orca-env space-y-3 text-xs shadow-xs">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <span className="font-extrabold text-orca-navy text-xs uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-orca-cyan" />
                Primary Factor Rules Rationale
              </span>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-black">
                CAUTION ACTIVE
              </span>
            </div>

            <div className="space-y-1.5">
              {marineData.decision.factors.map((factor) => (
                <div
                  key={factor.name}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-orca-ice/40 border border-orca-env/60"
                >
                  <div className="flex items-center gap-2">
                    {factor.status === 'SAFE' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : factor.status === 'WARNING' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <Info className="w-4 h-4 text-orca-blue shrink-0" />
                    )}
                    <div>
                      <span className="font-bold text-orca-navy text-xs block">{factor.name}</span>
                      <span className="text-[10px] text-orca-navy/60">{factor.impact}</span>
                    </div>
                  </div>
                  <span
                    className={`font-black text-xs px-2 py-0.5 rounded ${
                      factor.status === 'SAFE'
                        ? 'text-emerald-700 bg-emerald-50'
                        : factor.status === 'WARNING'
                        ? 'text-amber-800 bg-amber-50'
                        : 'text-slate-700 bg-slate-50'
                    }`}
                  >
                    {factor.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ask ORCA Contextual Copilot Launcher */}
          <AskOrcaLauncher currentRoleId="fisher" variant="card" />

          {/* Data → Agent → Decision Flow */}
          <DataAgentDecisionFlow title="Data Stream → Agent → Decision Flow" />
        </div>
      </div>
    </div>
  );
};

