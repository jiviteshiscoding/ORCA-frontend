import React from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

export type StepStatus = 'queued' | 'analyzing' | 'complete';

export interface AgentStepProps {
  number: string;
  name: string;
  description: string;
  status: StepStatus;
  isLast?: boolean;
}

export const AgentStep: React.FC<AgentStepProps> = ({
  number,
  name,
  description,
  status,
  isLast = false,
}) => {
  return (
    <div className="relative flex items-start gap-3">
      {/* Vertical Connecting Line */}
      {!isLast && (
        <div
          className={`absolute left-[11px] top-6 bottom-0 w-0.5 transition-colors duration-300 ${
            status === 'complete' ? 'bg-emerald-400' : 'bg-orca-env/60'
          }`}
        />
      )}

      {/* Status Icon Marker */}
      <div className="relative z-10 mt-0.5 shrink-0 bg-white rounded-full">
        {status === 'complete' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-in zoom-in-75 duration-200" />
        ) : status === 'analyzing' ? (
          <div className="w-5 h-5 rounded-full bg-orca-cyan/20 border border-orca-cyan flex items-center justify-center">
            <Loader2 className="w-3.5 h-3.5 text-orca-cyan animate-spin" />
          </div>
        ) : (
          <Circle className="w-5 h-5 text-slate-300 stroke-[1.5]" />
        )}
      </div>

      {/* Content Step Box */}
      <div
        className={`flex-1 min-w-0 p-2.5 rounded-xl border transition-all duration-300 ${
          status === 'complete'
            ? 'bg-emerald-50/30 border-emerald-200/80 text-orca-navy'
            : status === 'analyzing'
            ? 'bg-orca-ice border-orca-cyan shadow-2xs text-orca-navy ring-1 ring-orca-cyan/40'
            : 'bg-white/50 border-orca-env/40 text-orca-navy/50 opacity-65'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-extrabold text-xs truncate text-orca-navy">
            <span className="font-mono text-[10px] text-orca-cyan mr-1">{number}</span>
            {name}
          </span>
          <span
            className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
              status === 'complete'
                ? 'bg-emerald-100 text-emerald-800'
                : status === 'analyzing'
                ? 'bg-orca-cyan text-orca-deep animate-pulse'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-[11px] text-orca-navy/70 truncate mt-0.5">{description}</p>
      </div>
    </div>
  );
};
