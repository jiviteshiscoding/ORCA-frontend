import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseMap } from '../../components/map/BaseMap';
import { MissionControlPanel, MissionParams } from '../../components/mission/MissionControlPanel';
import { MissionTimeline } from '../../components/mission/MissionTimeline';
import { ScenarioComparison, ScenarioMetrics } from '../../components/mission/ScenarioComparison';
import { GeofenceValidation } from '../../components/mission/GeofenceValidation';
import { AgentTimeline, AgentTimelineStep } from '../../components/agents/AgentTimeline';
import { ExpandableEvidence } from '../../components/evidence/ExpandableEvidence';
import { Badge } from '../../components/ui/Badge';
import { StatusIndicator } from '../../components/ui/StatusIndicator';
import { DataFreshnessBadge } from '../../components/ui/DataFreshnessBadge';
import { Navigation, MapPin, SlidersHorizontal, Calculator } from 'lucide-react';

const BASELINE_METRICS: ScenarioMetrics = {
  departureTime: '05:30 AM',
  durationHours: 5,
  maxDistanceNm: 25,
  decision: 'CAUTION',
  confidence: 91,
  waveHeightM: 1.2,
  windSpeedKts: 14,
  pfzYieldPercent: 89,
  returnConstraint: 'Before 11:30 AM',
};

const INITIAL_AGENT_STEPS: AgentTimelineStep[] = [
  { id: '01', name: 'Mission Planner', title: 'Route Evaluator', subtitle: 'Time & distance limit verification', status: 'complete', confidence: 96, details: ['Departure: 05:30 AM', 'Duration: 5h', 'Safety Margin: OK'] },
  { id: '02', name: 'Ocean Agent', title: 'Hydrodynamic Shift', subtitle: 'Wave swell & current vector analysis', status: 'complete', confidence: 92, details: ['Swell: 1.2m', 'Current: 0.6 kts NW', 'Bathymetry safe'] },
  { id: '03', name: 'Weather Agent', title: 'Atmospheric Radar', subtitle: 'Wind gust & storm warning scan', status: 'complete', confidence: 94, details: ['Wind: 14 kts', 'No storm alerts', 'Visibility > 8 NM'] },
  { id: '04', name: 'PFZ / Fisheries Agent', title: 'Yield Predictor', subtitle: 'Chlorophyll-a & SST overlap density', status: 'complete', confidence: 89, details: ['Thermal Front matched', 'Plankton bloom active', 'Yield: High'] },
  { id: '05', name: 'Geo / Safety Agent', title: 'Boundary Guard', subtitle: 'Maritime boundary & depth check', status: 'complete', confidence: 98, details: ['Distance: 25 NM', 'EEZ Safe Zone', 'No restricted zones'] },
  { id: '06', name: 'Evidence Check', title: 'Data Freshness Audit', subtitle: 'INCOIS, ISRO, IMD timestamp verification', status: 'complete', confidence: 99, details: ['INCOIS SST: Fresh (12m ago)', 'ISRO OCM: Fresh (28m ago)', 'IMD Radar: Sync OK'] },
  { id: '07', name: 'Decision Engine', title: 'Multi-Agent Consensus', subtitle: 'Consensus calculation & return window', status: 'complete', confidence: 91, details: ['Decision: CAUTION / GO WITH ADVISORY', 'Optimal Window: 05:30 AM - 11:30 AM'] },
];

export const MissionPage: React.FC = () => {
  const navigate = useNavigate();

  const [params, setParams] = useState<MissionParams>({
    departureTime: '05:30 AM',
    durationHours: 5,
    maxDistanceNm: 25,
    targetZoneId: 'pfz-01',
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [agentSteps, setAgentSteps] = useState<AgentTimelineStep[]>(INITIAL_AGENT_STEPS);

  // Compute Current Scenario Metrics deterministically based on params
  const getCurrentMetrics = (): ScenarioMetrics => {
    const is10AM = params.departureTime === '10:00 AM';
    const is9AM = params.departureTime === '09:00 AM';
    const is7AM = params.departureTime === '07:00 AM';
    const isFar = params.maxDistanceNm > 25;

    if (is10AM || isFar) {
      return {
        departureTime: params.departureTime,
        durationHours: params.durationHours,
        maxDistanceNm: params.maxDistanceNm,
        decision: 'AVOID',
        confidence: 72,
        waveHeightM: 2.2,
        windSpeedKts: 18,
        pfzYieldPercent: 62,
        returnConstraint: 'High Swell Surge Barrier',
      };
    } else if (is9AM) {
      return {
        departureTime: params.departureTime,
        durationHours: params.durationHours,
        maxDistanceNm: params.maxDistanceNm,
        decision: 'CAUTION',
        confidence: 78,
        waveHeightM: 1.7,
        windSpeedKts: 16,
        pfzYieldPercent: 75,
        returnConstraint: 'Return Before 02:00 PM',
      };
    } else if (is7AM) {
      return {
        departureTime: params.departureTime,
        durationHours: params.durationHours,
        maxDistanceNm: params.maxDistanceNm,
        decision: 'CAUTION',
        confidence: 86,
        waveHeightM: 1.4,
        windSpeedKts: 15,
        pfzYieldPercent: 84,
        returnConstraint: 'Return Before 01:00 PM',
      };
    }

    return BASELINE_METRICS;
  };

  const currentMetrics = getCurrentMetrics();

  // Trigger quick agent re-evaluation sequence on parameter change
  const handleParamChange = (newParams: MissionParams) => {
    setParams(newParams);
    setIsEvaluating(true);

    setAgentSteps((prev) =>
      prev.map((s, idx) => (idx === 0 ? { ...s, status: 'analyzing' } : { ...s, status: 'queued' }))
    );

    setTimeout(() => {
      setAgentSteps((prev) =>
        prev.map((s, idx) => (idx <= 2 ? { ...s, status: 'complete' } : idx <= 4 ? { ...s, status: 'analyzing' } : s))
      );
    }, 300);

    setTimeout(() => {
      setAgentSteps((prev) => prev.map((s) => ({ ...s, status: 'complete' })));
      setIsEvaluating(false);
    }, 700);
  };

  const handleReset = () => {
    handleParamChange({
      departureTime: '05:30 AM',
      durationHours: 5,
      maxDistanceNm: 25,
      targetZoneId: 'pfz-01',
    });
  };

  const handleAskORCA = () => {
    const queryStr = `What changes if I leave at ${params.departureTime} for ${params.durationHours} hours at ${params.maxDistanceNm} NM?`;
    navigate(`/fisher/ask?query=${encodeURIComponent(queryStr)}`);
  };

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto pb-8 animate-fade-in">
      {/* TITLE BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-orca-env/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-orca-cyan" />
            <h1 className="text-xl font-black text-orca-navy tracking-tight">
              Mission & Route Planner Workspace
            </h1>
            <Badge variant="demo">Phase 4</Badge>
          </div>
          <p className="text-xs text-orca-navy/70 mt-0.5">
            Modify departure time, duration, and range parameters to simulate marine route safety and fishing yield impacts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DataFreshnessBadge status="DEMO SNAPSHOT" />
          <StatusIndicator status="DEMO" />
        </div>
      </div>

      {/* 1. MISSION PARAMETERS CONTROL PANEL */}
      <MissionControlPanel
        params={params}
        onChange={handleParamChange}
        onReset={handleReset}
        onAskORCA={handleAskORCA}
      />

      {/* 2. DUAL-COLUMN WORKSPACE CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: INTERACTIVE MAP & TIMELINE (Desktop 60% Width) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Spatial Map Canvas with Route Updates */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-orca-navy uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-orca-cyan" />
                <span>Interactive Spatial Route Canvas</span>
              </div>
              <span className="text-[11px] font-mono text-orca-navy/70">
                Planned Route: {params.maxDistanceNm} NM Range Target
              </span>
            </div>

            <BaseMap height="460px" showControls={true} />
          </div>

          {/* Mission Timeline Widget */}
          <MissionTimeline
            departureTime={params.departureTime}
            durationHours={params.durationHours}
          />

          {/* Geofence Validation System */}
          <GeofenceValidation
            maxDistanceNm={params.maxDistanceNm}
            departureTime={params.departureTime}
          />
        </div>

        {/* RIGHT COLUMN: SCENARIO COMPARISON & AGENT EVALUATION (Desktop 40% Width) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Scenario Comparison Grid */}
          <ScenarioComparison baseline={BASELINE_METRICS} current={currentMetrics} />

          {/* Factor Impact Visualizer */}
          <div className="bg-white p-3.5 rounded-2xl border border-orca-env space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-1.5 font-bold text-orca-navy">
              <span className="flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                <SlidersHorizontal className="w-3.5 h-3.5 text-orca-cyan" />
                Factor Impact Shift Analysis
              </span>
              <span className="text-[10px] font-mono text-orca-navy/60">BASELINE VS CURRENT</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded-xl bg-orca-ice/40 border border-orca-env/60">
                <span className="font-semibold text-orca-navy">Sea Surface Temp</span>
                <span className="font-bold text-emerald-700">✓ STABLE (28.5°C)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-orca-ice/40 border border-orca-env/60">
                <span className="font-semibold text-orca-navy">Wave Swell Risk</span>
                <span className={`font-bold ${currentMetrics.waveHeightM > 1.4 ? 'text-red-700' : 'text-emerald-700'}`}>
                  {currentMetrics.waveHeightM > 1.4 ? '↑ HIGHER SWELL RISK' : '✓ MANAGED SWELL'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-orca-ice/40 border border-orca-env/60">
                <span className="font-semibold text-orca-navy">PFZ Fishing Yield</span>
                <span className={`font-bold ${currentMetrics.pfzYieldPercent < 80 ? 'text-amber-800' : 'text-emerald-700'}`}>
                  {currentMetrics.pfzYieldPercent < 80 ? '↓ REDUCED DENSITY' : '✓ HIGH YIELD'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-orca-ice/40 border border-orca-env/60">
                <span className="font-semibold text-orca-navy">Return Window</span>
                <span className="font-bold text-orca-navy">{currentMetrics.returnConstraint}</span>
              </div>
            </div>
          </div>

          {/* Multi-Agent Re-evaluation Activity */}
          <AgentTimeline steps={agentSteps} isProcessing={isEvaluating} />

          {/* Progressive Disclosure: How Route Risk & Yield calculations are made */}
          <ExpandableEvidence
            title="How Calculation Factors & Risk Models Work"
            subtitle="Multi-agent route synthesis breakdown"
            sourceName="ORCA Hydrodynamic Engine (INCOIS + ISRO Sync)"
            freshnessText="Calculated live on parameter shift"
            confidence={currentMetrics.confidence}
          >
            <div className="space-y-3 text-xs text-orca-navy">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 bg-white rounded-xl border border-orca-env/80">
                  <div className="font-bold flex items-center gap-1.5 text-orca-navy mb-1">
                    <Calculator className="w-3.5 h-3.5 text-orca-cyan" />
                    Swell & Wave Vector Model
                  </div>
                  <p className="text-[11px] text-orca-navy/70 leading-relaxed">
                    INCOIS Wave Watch III model data updated every 6h. Wind swell vectors mapped against planned vessel speed ({params.departureTime} departure).
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-orca-env/80">
                  <div className="font-bold flex items-center gap-1.5 text-orca-navy mb-1">
                    <Calculator className="w-3.5 h-3.5 text-orca-cyan" />
                    PFZ Catch Yield Algorithm
                  </div>
                  <p className="text-[11px] text-orca-navy/70 leading-relaxed">
                    Chlorophyll-a density (ISRO OceanSat-3) crossed with SST thermal fronts within {params.maxDistanceNm} NM corridor.
                  </p>
                </div>
              </div>
            </div>
          </ExpandableEvidence>
        </div>
      </div>
    </div>
  );
};
