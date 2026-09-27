import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FactorItem {
  name: string;
  value: string;
  status: 'SAFE' | 'WARNING' | 'CRITICAL' | 'NEUTRAL';
  impact: string;
}

export interface DecisionFactorsProps {
  factors: FactorItem[];
}

export const DecisionFactors: React.FC<DecisionFactorsProps> = ({ factors }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-2 pt-2 border-t border-orca-env/60">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-xs font-extrabold text-orca-navy hover:text-orca-cyan transition-colors cursor-pointer py-1"
      >
        <span className="flex items-center gap-1.5 uppercase tracking-wider">
          Why this decision? (Reasoning Factors)
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-orca-cyan" /> : <ChevronDown className="w-4 h-4 text-orca-cyan" />}
      </button>

      {isOpen && (
        <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
          {factors.map((factor) => (
            <div
              key={factor.name}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-orca-env/60 text-xs shadow-2xs"
            >
              <div className="flex items-center gap-2">
                {factor.status === 'SAFE' ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                    +
                  </span>
                ) : factor.status === 'WARNING' ? (
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                    ~
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </span>
                )}
                <div>
                  <span className="font-bold text-orca-navy block">{factor.name}</span>
                  <span className="text-[11px] text-orca-navy/60">{factor.impact}</span>
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
      )}
    </div>
  );
};
