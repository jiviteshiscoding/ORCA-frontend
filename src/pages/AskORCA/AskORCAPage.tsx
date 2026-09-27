import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DataFreshnessBadge } from '../../components/ui/DataFreshnessBadge';
import { ChatMessage } from '../../components/chat/ChatMessage';
import { ChatComposer } from '../../components/chat/ChatComposer';
import { SuggestedPrompt } from '../../components/chat/SuggestedPrompt';
import { AgentTimeline, AgentTimelineStep } from '../../components/agents/AgentTimeline';
import { DecisionCard } from '../../components/decision/DecisionCard';
import { EvidencePanel } from '../../components/evidence/EvidencePanel';
import { WhatIfComparison } from '../../components/decision/WhatIfComparison';
import { BaseMap } from '../../components/map/BaseMap';
import { MarineCorrelationView } from '../../components/intelligence/MarineCorrelationView';
import { AgentReasoningGraph } from '../../components/intelligence/AgentReasoningGraph';
import { DataProvenancePanel } from '../../components/provenance/DataProvenancePanel';
import { useMarineData } from '../../hooks/useMarineData';
import { useRoleSession } from '../../hooks/useRoleSession';
import {
  MessageSquareText,
  Sparkles,
  Compass,
  MapPin,
  Bot,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

export const PRIMARY_DEMO_QUERY = 'Can I go fishing tomorrow morning for five hours?';
export const WHAT_IF_QUERY = 'What if I leave at 10 AM?';

export interface ChatMessageItem {
  id: string;
  sender: 'user' | 'orca';
  text: string;
  timestamp: string;
  isWhatIf?: boolean;
}

export const INITIAL_AGENT_STEPS: AgentTimelineStep[] = [
  { id: '01', name: 'Mission Planner', title: 'Voyage Constraint Evaluator', subtitle: 'Departure & endurance limits', status: 'complete', confidence: 96, details: ['Departure: 05:30 AM', 'Duration: 5h limit'] },
  { id: '02', name: 'Ocean Agent', title: 'Hydrodynamic Vector Model', subtitle: 'SST & wave swell profiles', status: 'complete', confidence: 92, details: ['SST: 28.5°C', 'Swell: 1.2m NW'] },
  { id: '03', name: 'Weather Agent', title: 'Coastal Radar Scanner', subtitle: 'Atmospheric pressure & wind', status: 'complete', confidence: 94, details: ['Wind: 14 kts SW', 'Pressure: 1012 hPa'] },
  { id: '04', name: 'PFZ / Fisheries Agent', title: 'Plankton Density Model', subtitle: 'Chlorophyll-a aggregation', status: 'complete', confidence: 89, details: ['Chlorophyll: 1.45 mg/m³', 'Yield: High'] },
  { id: '05', name: 'Geo / Safety Agent', title: 'Geofence Guard', subtitle: 'Maritime EEZ clearance', status: 'complete', confidence: 98, details: ['Distance: 25 NM', 'Zone Alpha Clear'] },
  { id: '06', name: 'Evidence Check', title: 'Data Provenance Ledger', subtitle: 'INCOIS, ISRO, NIOT verification', status: 'complete', confidence: 99, details: ['INCOIS SST Fresh', 'ISRO OCM Fresh'] },
  { id: '07', name: 'Decision Engine', title: 'Multi-Agent Consensus', subtitle: 'GO WITH CAUTION advisory', status: 'complete', confidence: 91, details: ['Decision: CAUTION', 'Return: 11:30 AM'] },
];

export const AskORCAPage: React.FC = () => {
  const navigate = useNavigate();
  const marineData = useMarineData();
  const { session } = useRoleSession();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlQuery = queryParams.get('query');

  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [agentSteps, setAgentSteps] = useState<AgentTimelineStep[]>(INITIAL_AGENT_STEPS);
  const [analysisState, setAnalysisState] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [activeWhatIf, setActiveWhatIf] = useState(false);

  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, analysisState]);

  useEffect(() => {
    if (urlQuery && messages.length === 0 && analysisState === 'idle') {
      executeQueryAnalysis(urlQuery);
    }
  }, [urlQuery]);

  // Execute Polish Orchestration Animation Sequence for Query
  const executeQueryAnalysis = (userQuery: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isWhatIfReq = userQuery.toLowerCase().includes('10 am') || userQuery.toLowerCase().includes('what if');

    if (isWhatIfReq) {
      setActiveWhatIf(true);
    }

    // Add User Message
    const userMsg: ChatMessageItem = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userQuery,
      timestamp,
      isWhatIf: isWhatIfReq,
    };

    setMessages((prev) => [...prev, userMsg]);
    setAnalysisState('analyzing');

    // Reset Agent Steps to queued
    setAgentSteps(INITIAL_AGENT_STEPS.map((step) => ({ ...step, status: 'queued' })));

    // Step 1: Mission Planner
    setTimeout(() => {
      setAgentSteps((prev) =>
        prev.map((s, idx) => (idx === 0 ? { ...s, status: 'analyzing' } : s))
      );
    }, 200);

    // Step 2: Ocean Agent
    setTimeout(() => {
      setAgentSteps((prev) =>
        prev.map((s, idx) =>
          idx === 0 ? { ...s, status: 'complete' } : idx === 1 ? { ...s, status: 'analyzing' } : s
        )
      );
    }, 500);

    // Step 3: Weather Agent
    setTimeout(() => {
      setAgentSteps((prev) =>
        prev.map((s, idx) =>
          idx === 1 ? { ...s, status: 'complete' } : idx === 2 ? { ...s, status: 'analyzing' } : s
        )
      );
    }, 800);

    // Step 4: PFZ Agent
    setTimeout(() => {
      setAgentSteps((prev) =>
        prev.map((s, idx) =>
          idx === 2 ? { ...s, status: 'complete' } : idx === 3 ? { ...s, status: 'analyzing' } : s
        )
      );
    }, 1100);

    // Step 5: Geo / Safety Agent
    setTimeout(() => {
      setAgentSteps((prev) =>
        prev.map((s, idx) =>
          idx === 3 ? { ...s, status: 'complete' } : idx === 4 ? { ...s, status: 'analyzing' } : s
        )
      );
    }, 1400);

    // Step 6: Evidence Check
    setTimeout(() => {
      setAgentSteps((prev) =>
        prev.map((s, idx) =>
          idx === 4 ? { ...s, status: 'complete' } : idx === 5 ? { ...s, status: 'analyzing' } : s
        )
      );
    }, 1700);

    // Step 7: Decision Engine
    setTimeout(() => {
      setAgentSteps((prev) =>
        prev.map((s, idx) =>
          idx === 5 ? { ...s, status: 'complete' } : idx === 6 ? { ...s, status: 'analyzing' } : s
        )
      );
    }, 2000);

    // Finalize Analysis & Reveal ORCA Response
    setTimeout(() => {
      setAgentSteps((prev) => prev.map((s) => ({ ...s, status: 'complete' })));

      let orcaText = `Analysis complete. Based on the available marine demo snapshot, your 5-hour fishing voyage tomorrow morning is evaluated as GO WITH CAUTION. Recommended departure window is 05:30 AM — 09:30 AM.`;
      
      if (isWhatIfReq) {
        orcaText = `What-If Analysis complete. Shifting departure to 10:00 AM increases wave swell exposure to 1.8m — 2.2m. The risk state escalates to AVOID BEYOND 25 NM.`;
      }

      const orcaMsg: ChatMessageItem = {
        id: `orca-${Date.now()}`,
        sender: 'orca',
        text: orcaText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isWhatIf: isWhatIfReq,
      };

      setMessages((prev) => [...prev, orcaMsg]);
      setAnalysisState('completed');
    }, 2400);
  };

  const handleReset = () => {
    setMessages([]);
    setAnalysisState('idle');
    setActiveWhatIf(false);
    setAgentSteps(INITIAL_AGENT_STEPS);
  };

  return (
    <div className="h-[calc(100vh-4rem)] max-w-[1800px] mx-auto flex flex-col space-y-3 overflow-hidden">
      {/* COMPACT WORKSPACE TITLE BAR */}
      <div className="flex items-center justify-between px-4 py-2 bg-white rounded-xl border border-orca-env/80 shadow-2xs shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquareText className="w-4 h-4 text-orca-cyan" />
          <h1 className="text-sm font-black text-orca-navy uppercase tracking-wider">
            ASK ORCA — Conversational Marine Workstation
          </h1>
          <Badge variant="demo" className="text-[9px]">Phase 3.1 Density Pass</Badge>
        </div>

        <div className="flex items-center gap-3">
          <DataFreshnessBadge status="DEMO SNAPSHOT" />
          {analysisState !== 'idle' && (
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-orca-navy/60 hover:text-orca-navy py-0.5 px-2">
              <RotateCcw className="w-3 h-3 mr-1" /> Reset
            </Button>
          )}
        </div>
      </div>

      {/* 100VH WORKSPACE SPLIT (Desktop: 60/40 Split using ~95% Viewport Width) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden">
        {/* LEFT COLUMN: CONVERSATION WORKSPACE (60% Width on Desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full bg-white rounded-2xl border border-orca-env/80 p-3.5 shadow-xs min-h-0 overflow-hidden">
          {/* Conversation Messages Stream (Independent Scroll) */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 min-h-0">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5 my-auto">
                <div className="w-12 h-12 rounded-2xl bg-orca-ice text-orca-cyan flex items-center justify-center border border-orca-cyan/30 shadow-2xs">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-1 max-w-md">
                  <h3 className="text-base font-black text-orca-navy">Ask ORCA about your marine mission</h3>
                  <p className="text-xs text-orca-navy/70 leading-relaxed">
                    Select a primary query or enter custom operational questions to initiate multi-agent reasoning.
                  </p>
                </div>

                {/* Suggested Prompts based on active role */}
                <div className="w-full max-w-lg space-y-2 text-left">
                  <span className="text-[10px] font-extrabold text-orca-navy/50 uppercase tracking-widest block text-center">
                    {session.roleId === 'operator'
                      ? 'Maritime Operator Suggested Queries'
                      : session.roleId === 'researcher'
                      ? 'Oceanographic Researcher Suggested Queries'
                      : session.roleId === 'disaster'
                      ? 'Emergency Authority Suggested Queries'
                      : session.roleId === 'environment'
                      ? 'Environmental Analyst Suggested Queries'
                      : 'Primary Operational Query'}
                  </span>

                  {session.roleId === 'operator' ? (
                    <div className="space-y-2">
                      <SuggestedPrompt
                        promptText="What vessels are currently exposed to the swell hazard?"
                        onClick={executeQueryAnalysis}
                        isPrimary={true}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <SuggestedPrompt
                          promptText="Check fleet route clearance scores"
                          onClick={executeQueryAnalysis}
                        />
                        <SuggestedPrompt
                          promptText="Inspect Blue Wave route exception"
                          onClick={executeQueryAnalysis}
                        />
                      </div>
                    </div>
                  ) : session.roleId === 'researcher' ? (
                    <div className="space-y-2">
                      <SuggestedPrompt
                        promptText="What does the current chlorophyll and SST pattern indicate?"
                        onClick={executeQueryAnalysis}
                        isPrimary={true}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <SuggestedPrompt
                          promptText="Analyze INCOIS SST thermal variation"
                          onClick={executeQueryAnalysis}
                        />
                        <SuggestedPrompt
                          promptText="View evidence vault data streams"
                          onClick={executeQueryAnalysis}
                        />
                      </div>
                    </div>
                  ) : session.roleId === 'disaster' ? (
                    <div className="space-y-2">
                      <SuggestedPrompt
                        promptText="Which vessels are inside the affected hazard area?"
                        onClick={executeQueryAnalysis}
                        isPrimary={true}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <SuggestedPrompt
                          promptText="What is the peak coastal wave surge timing?"
                          onClick={executeQueryAnalysis}
                        />
                        <SuggestedPrompt
                          promptText="Check response room readiness"
                          onClick={executeQueryAnalysis}
                        />
                      </div>
                    </div>
                  ) : session.roleId === 'environment' ? (
                    <div className="space-y-2">
                      <SuggestedPrompt
                        promptText="Show the areas with the strongest chlorophyll signal."
                        onClick={executeQueryAnalysis}
                        isPrimary={true}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <SuggestedPrompt
                          promptText="Check MPA Zone Alpha boundary compliance"
                          onClick={executeQueryAnalysis}
                        />
                        <SuggestedPrompt
                          promptText="Evaluate coral reef thermal stress index"
                          onClick={executeQueryAnalysis}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <SuggestedPrompt
                        promptText={PRIMARY_DEMO_QUERY}
                        onClick={executeQueryAnalysis}
                        isPrimary={true}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <SuggestedPrompt
                          promptText="What are the safest conditions for my vessel?"
                          onClick={executeQueryAnalysis}
                        />
                        <SuggestedPrompt
                          promptText="Show me the best fishing window tomorrow"
                          onClick={executeQueryAnalysis}
                        />
                        <SuggestedPrompt
                          promptText="Is my planned route clear of swell hazards?"
                          onClick={executeQueryAnalysis}
                        />
                        <SuggestedPrompt
                          promptText={WHAT_IF_QUERY}
                          onClick={executeQueryAnalysis}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} timestamp={msg.timestamp}>
                  {/* Structured Natural Language Intent Interpretation Card for ORCA Messages */}
                  {msg.sender === 'orca' && (
                    <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-orca-ice via-white to-orca-ice border border-orca-cyan/40 text-[11px] space-y-1.5 text-orca-navy font-sans shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-extrabold text-orca-navy uppercase tracking-wider text-[10px]">
                          <Sparkles className="w-3.5 h-3.5 text-orca-cyan" />
                          NATURAL LANGUAGE INTENT TRANSLATOR
                        </div>
                        <Badge variant="demo" className="text-[9px]">STRUCTURED INTENT</Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-[10px] bg-white p-2 rounded-lg border border-orca-env/60">
                        <div>
                          <span className="text-[9px] text-orca-navy/50 font-sans block uppercase">Intent</span>
                          <strong className="text-orca-navy">Mission Safety</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-orca-navy/50 font-sans block uppercase">Departure</span>
                          <strong className="text-orca-blue">{msg.isWhatIf ? '10:00 AM' : '05:30 AM'}</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-orca-navy/50 font-sans block uppercase">Duration</span>
                          <strong className="text-orca-navy">5 Hours</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-orca-navy/50 font-sans block uppercase">Target</span>
                          <strong className="text-emerald-700">PFZ Zone Alpha</strong>
                        </div>
                        <div>
                          <span className="text-[9px] text-orca-navy/50 font-sans block uppercase">Vessel</span>
                          <strong className="text-orca-navy">{session.userContext?.vesselName || 'Sea Pearl'}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </ChatMessage>
              ))
            )}

            {/* Processing Indicator */}
            {analysisState === 'analyzing' && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-orca-ice border border-orca-cyan/40 text-xs text-orca-navy animate-pulse">
                <Bot className="w-4 h-4 text-orca-cyan animate-spin shrink-0" />
                <div>
                  <span className="font-extrabold block">Evaluating Multi-Agent Marine Intelligence...</span>
                  <span className="text-[10px] text-orca-navy/60">Cross-referencing ocean SST, wave swell, PFZ potential & route hazards</span>
                </div>
              </div>
            )}

            <div ref={conversationEndRef} />
          </div>

          {/* Sticky Bottom Composer */}
          <div className="pt-2 border-t border-orca-env/60 shrink-0">
            {analysisState === 'completed' && (
              <div className="flex items-center gap-1.5 pb-2 overflow-x-auto text-xs">
                <span className="text-[10px] font-extrabold text-orca-navy/50 uppercase tracking-widest shrink-0">
                  Follow-ups:
                </span>
                <button
                  onClick={() => executeQueryAnalysis('Why is the decision CAUTION?')}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-orca-ice hover:bg-orca-cyan/20 text-orca-navy border border-orca-env shrink-0 cursor-pointer"
                >
                  "Why CAUTION?"
                </button>
                <button
                  onClick={() => executeQueryAnalysis(WHAT_IF_QUERY)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shrink-0 cursor-pointer"
                >
                  "What if I leave at 10 AM?"
                </button>
                <button
                  onClick={() => navigate('/fisher/map')}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-orca-ice hover:bg-orca-cyan/20 text-orca-navy border border-orca-env shrink-0 cursor-pointer"
                >
                  "Show map"
                </button>
              </div>
            )}

            <ChatComposer
              onSendMessage={executeQueryAnalysis}
              isProcessing={analysisState === 'analyzing'}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: INDEPENDENTLY SCROLLABLE INTELLIGENCE WORKSPACE (40% Width on Desktop) */}
        <div className="lg:col-span-5 h-full overflow-y-auto pr-1 space-y-3.5 min-h-0">
          {/* 01 AGENT REASONING TIMELINE */}
          <AgentTimeline steps={agentSteps} isCompleted={analysisState === 'completed'} />

          {/* WHAT-IF TIMELINE COMPARISON WIDGET (Rendered when What-If query is triggered) */}
          {activeWhatIf && analysisState === 'completed' && <WhatIfComparison />}

          {/* 02 DECISION & 03 WHY THIS DECISION */}
          {analysisState === 'completed' && (
            <>
              <DecisionCard
                decision={activeWhatIf ? 'AVOID' : 'CAUTION'}
                confidence={marineData.decision.confidence}
                primaryReason={
                  activeWhatIf
                    ? '10:00 AM departure escalates wave swell to 1.8m — 2.2m. High swell surge advisory active beyond 25 NM.'
                    : marineData.decision.primaryReason
                }
                recommendedWindow={activeWhatIf ? '10:00 AM — 03:00 PM (LATE)' : '05:30 — 09:30 AM'}
                recommendedZone="PFZ Zone Alpha"
                fishingPotential={activeWhatIf ? '62% (Reduced Density)' : 'HIGH (89%)'}
                marineRisk={activeWhatIf ? 'HIGH (1.8m — 2.2m Swell)' : 'MODERATE (1.2m Swell)'}
                factors={marineData.decision.factors}
              />

              {/* 03 MARINE DATA STREAM CORRELATION */}
              <MarineCorrelationView
                decision={activeWhatIf ? 'AVOID' : 'CAUTION'}
                confidence={activeWhatIf ? 72 : 91}
              />

              {/* 04 EVIDENCE & SOURCES */}
              <EvidencePanel />

              {/* 05 DATA STREAM PROVENANCE LEDGER */}
              <DataProvenancePanel title="Verified Data Sources Provenance Ledger" />

              {/* 05 SPATIAL PREVIEW */}
              <Card variant="flat" className="border-orca-env space-y-2 p-3">
                <div className="flex items-center justify-between text-xs font-bold text-orca-navy">
                  <span className="flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-orca-cyan" />
                    05. Spatial Map Context Preview
                  </span>
                  <Link to="/fisher/map" className="text-orca-blue text-[11px] hover:underline font-bold">
                    Expand Map →
                  </Link>
                </div>

                <BaseMap height="200px" showControls={false} />
              </Card>

              {/* 06 DATA TO AGENT DECISION REASONING GRAPH */}
              <AgentReasoningGraph />

              {/* QUICK ACTIONS BAR */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/fisher/map')}
                  className="w-full font-bold gap-1 py-2 text-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-orca-cyan" />
                  <span>VIEW ON MAP</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => executeQueryAnalysis(WHAT_IF_QUERY)}
                  className="w-full font-bold gap-1 py-2 text-xs text-amber-900 border-amber-300 bg-amber-50/50 hover:bg-amber-100"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
                  <span>WHAT-IF (10 AM)</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
