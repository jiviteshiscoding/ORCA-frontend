import React, { useState, useEffect } from 'react';
import { ORCALogo } from './ORCALogo';
import { CheckCircle2, ShieldCheck, Database, Bot, Zap } from 'lucide-react';

export interface AppStartupSequenceProps {
  onComplete?: () => void;
  workspaceName?: string;
}

export const AppStartupSequence: React.FC<AppStartupSequenceProps> = ({
  onComplete,
  workspaceName = 'Marine Intelligence Engine',
}) => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300);
    const t2 = setTimeout(() => setStep(2), 600);
    const t3 = setTimeout(() => setStep(3), 900);
    const t4 = setTimeout(() => setStep(4), 1200);
    const t5 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-orca-deep/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-white animate-fade-in select-none">
      {/* Sonar Radar Background Sweep Effect */}
      <div className="absolute w-96 h-96 rounded-full border border-orca-cyan/20 animate-ping opacity-25 pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full border border-orca-cyan/30 animate-pulse pointer-events-none" />

      {/* Center Branding & Logo */}
      <div className="relative z-10 space-y-4 text-center max-w-sm w-full">
        <div className="flex justify-center scale-125 mb-2">
          <ORCALogo size="lg" lightMode={false} />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tight text-white uppercase">
            {workspaceName}
          </h2>
          <p className="text-xs text-orca-cyan font-mono font-bold tracking-widest flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orca-cyan animate-ping" />
            INITIALIZING WORKSTATION...
          </p>
        </div>

        {/* Initialization Checklist Progress */}
        <div className="p-4 rounded-2xl bg-orca-navy/80 border border-white/10 space-y-2.5 text-xs text-left shadow-2xl">
          <div className="flex items-center justify-between font-mono">
            <span className="flex items-center gap-2 text-orca-ice/80">
              <Database className="w-3.5 h-3.5 text-orca-cyan" /> DATA STREAMS
            </span>
            {step >= 1 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> INCOIS / ISRO SYNC
              </span>
            ) : (
              <span className="text-white/40 font-mono text-[10px]">CONNECTING...</span>
            )}
          </div>

          <div className="flex items-center justify-between font-mono">
            <span className="flex items-center gap-2 text-orca-ice/80">
              <Bot className="w-3.5 h-3.5 text-orca-cyan" /> AGENT NETWORK
            </span>
            {step >= 2 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> 7 AGENTS READY
              </span>
            ) : (
              <span className="text-white/40 font-mono text-[10px]">VERIFYING...</span>
            )}
          </div>

          <div className="flex items-center justify-between font-mono">
            <span className="flex items-center gap-2 text-orca-ice/80">
              <Zap className="w-3.5 h-3.5 text-orca-cyan" /> DECISION ENGINE
            </span>
            {step >= 3 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> RULES CALIBRATED
              </span>
            ) : (
              <span className="text-white/40 font-mono text-[10px]">LOADING...</span>
            )}
          </div>

          <div className="flex items-center justify-between font-mono">
            <span className="flex items-center gap-2 text-orca-ice/80">
              <ShieldCheck className="w-3.5 h-3.5 text-orca-cyan" /> MARINE CONTEXT
            </span>
            {step >= 4 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> CONTEXT LOADED
              </span>
            ) : (
              <span className="text-white/40 font-mono text-[10px]">COMPUTING...</span>
            )}
          </div>
        </div>

        {/* Progress Loading Bar */}
        <div className="w-full bg-orca-navy h-1.5 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-orca-cyan via-teal-400 to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <button
          onClick={() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }}
          className="text-[10px] text-white/50 hover:text-white underline font-mono tracking-wider pt-1 cursor-pointer"
        >
          PRESS TO SKIP INTRO →
        </button>
      </div>
    </div>
  );
};
