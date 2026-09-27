import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Bot, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

export interface AgentTimelineStep {
  id?: string;
  number?: string;
  name: string;
  title?: string;
  subtitle?: string;
  description?: string;
  role?: string;
  details?: string[];
  status: 'complete' | 'analyzing' | 'queued' | 'warning';
  confidence?: number;
  timestamp?: string;
}

export interface AgentTimelineProps {
  steps: AgentTimelineStep[];
  isCompleted?: boolean;
  isProcessing?: boolean;
  title?: string;
}

export const AgentTimeline: React.FC<AgentTimelineProps> = ({
  steps,
  isCompleted,
  isProcessing,
  title = '7-Agent Orchestration Sequence',
}) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const completedCount = steps.filter((s) => s.status === 'complete').length;
  const isFinished = isCompleted || (!isProcessing && completedCount === steps.length);

  const toggleStep = (stepKey: string) => {
    setExpandedStep((prev) => (prev === stepKey ? null : stepKey));
  };

  return (
    <Card className="p-3.5 space-y-3 border-orca-env/80 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-orca-cyan" />
          <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">
            {title}
          </h4>
        </div>

        <div className="flex items-center gap-1.5">
          {isFinished ? (
            <Badge variant="success" className="text-[9px]">
              <CheckCircle2 className="w-3 h-3 inline mr-1 text-emerald-600" />
              {completedCount}/{steps.length} AGENTS SYNCHRONIZED
            </Badge>
          ) : (
            <Badge variant="demo" className="animate-pulse text-[9px]">
              <Sparkles className="w-3 h-3 inline mr-1 text-orca-cyan" />
              {completedCount}/{steps.length} AGENTS REASONING
            </Badge>
          )}
        </div>
      </div>

      {/* Horizontal Compact Agent Pipeline Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-1.5 text-xs pt-1">
        {steps.map((step, idx) => {
          const stepKey = step.id || step.number || `0${idx + 1}`;
          const isComplete = step.status === 'complete';
          const isAnalyzing = step.status === 'analyzing';
          const isSelected = expandedStep === stepKey;

          return (
            <div
              key={stepKey}
              onClick={() => toggleStep(stepKey)}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                isSelected
                  ? 'bg-orca-ice border-orca-cyan ring-1 ring-orca-cyan/40 shadow-xs'
                  : isComplete
                  ? 'bg-emerald-50/40 border-emerald-200/80 hover:bg-emerald-50'
                  : isAnalyzing
                  ? 'bg-orca-ice border-orca-cyan agent-pulse-ring'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold text-orca-cyan">{stepKey}</span>
                {isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : isAnalyzing ? (
                  <Loader2 className="w-3.5 h-3.5 text-orca-cyan animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                )}
              </div>

              <span className="font-extrabold text-[10px] text-orca-navy truncate block">
                {step.name}
              </span>

              <span className={`text-[8px] font-black uppercase tracking-wider px-1 py-0.2 rounded w-max ${
                isComplete ? 'bg-emerald-100 text-emerald-800' : isAnalyzing ? 'bg-orca-cyan text-orca-deep' : 'bg-slate-200 text-slate-600'
              }`}>
                {step.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Expandable Step Detail Drawer */}
      {expandedStep && (
        <div className="p-3 rounded-xl bg-orca-ice/60 border border-orca-cyan/40 text-xs text-orca-navy space-y-1.5 animate-fade-in">
          {(() => {
            const stepDef = steps.find((s, idx) => (s.id || s.number || `0${idx + 1}`) === expandedStep);
            if (!stepDef) return null;
            const stepKey = stepDef.id || stepDef.number;
            return (
              <>
                <div className="flex items-center justify-between font-bold border-b border-orca-env/40 pb-1">
                  <span className="text-orca-navy uppercase text-[10px] tracking-wider flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-orca-cyan" />
                    Agent {stepKey}: {stepDef.name} {stepDef.title ? `— ${stepDef.title}` : ''}
                  </span>
                  <div className="flex items-center gap-2">
                    {stepDef.confidence !== undefined && (
                      <span className="font-mono text-[10px] text-emerald-700 font-bold">{stepDef.confidence}% Confidence</span>
                    )}
                    <button onClick={() => setExpandedStep(null)} className="text-orca-navy/50 hover:text-orca-navy text-[10px]">
                      Close ✕
                    </button>
                  </div>
                </div>

                {stepDef.subtitle && (
                  <p className="text-[11px] font-bold text-orca-navy">{stepDef.subtitle}</p>
                )}

                {stepDef.description && (
                  <p className="text-[11px] text-orca-navy/80 font-medium leading-relaxed">
                    {stepDef.description}
                  </p>
                )}

                {stepDef.details && stepDef.details.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {stepDef.details.map((d, dIdx) => (
                      <span key={dIdx} className="px-2 py-0.5 bg-white rounded border border-orca-env text-[10px] font-mono text-orca-navy font-semibold">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}
    </Card>
  );
};
