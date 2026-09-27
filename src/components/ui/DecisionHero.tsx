import React from 'react';
import { Button } from './Button';
import { StatusIndicator } from './StatusIndicator';
import { ShieldCheck, ShieldAlert, Clock, MessageSquareText, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

export interface PrimaryActionDef {
  label: string;
  onClick?: () => void;
  icon?: React.FC<{ className?: string }>;
}

export interface DecisionHeroProps {
  decision: 'GO' | 'CAUTION' | 'AVOID';
  confidence: number;
  primaryReason?: string;
  title?: string;
  subtitle?: string;
  rationale?: string;
  recommendedWindow: string;
  returnConstraint?: string;
  onAskORCA?: () => void;
  onPrimaryAction?: () => void;
  primaryActionText?: string;
  primaryAction?: PrimaryActionDef;
  onToggleDetails?: () => void;
  showDetails?: boolean;
}

export const DecisionHero: React.FC<DecisionHeroProps> = ({
  decision,
  confidence,
  primaryReason,
  title,
  subtitle,
  rationale,
  recommendedWindow,
  returnConstraint = 'Before 11:30 AM (Swell Barrier)',
  onAskORCA,
  onPrimaryAction,
  primaryActionText = 'VIEW MISSION',
  primaryAction,
  onToggleDetails,
  showDetails = false,
}) => {
  const isGo = decision === 'GO';
  const isCaution = decision === 'CAUTION';

  const bgGradient = isGo
    ? 'from-emerald-600 via-teal-700 to-orca-navy'
    : isCaution
    ? 'from-amber-500 via-amber-600 to-orca-navy'
    : 'from-red-600 via-red-700 to-orca-navy';

  const badgeText = isGo ? 'GO WITH CLEARANCE' : isCaution ? 'GO WITH CAUTION' : 'AVOID VOYAGE BEYOND 25 NM';
  const IconComponent = isGo ? ShieldCheck : isCaution ? ShieldCheck : ShieldAlert;

  return (
    <div className={`bg-gradient-to-r ${bgGradient} rounded-2xl p-4 sm:p-5 text-white shadow-md space-y-3 transition-all duration-300 animate-fade-in`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left Primary Decision State */}
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-inner shrink-0">
            <IconComponent className="w-8 h-8 text-white animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-white text-slate-900 tracking-wider">
                PRIMARY ADVISORY • {badgeText}
              </span>
              <StatusIndicator status="DEMO" />
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1 text-white leading-tight">
              {title || (decision === 'CAUTION' ? 'GO WITH CAUTION' : decision)} — {confidence}% Confidence
            </h1>

            {(primaryReason || rationale) && (
              <p className="text-xs sm:text-sm text-white/90 font-medium mt-1 leading-relaxed max-w-2xl">
                "{primaryReason || rationale}"
              </p>
            )}

            {subtitle && (
              <p className="text-[11px] text-white/80 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right CTA Actions & Recommended Window Pill */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 text-xs font-mono shrink-0">
          <div className="bg-black/25 px-3.5 py-2 rounded-xl border border-white/20">
            <span className="text-[10px] text-white/70 block uppercase font-sans font-bold">Recommended Window</span>
            <strong className="text-white text-xs sm:text-sm font-extrabold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-orca-cyan" />
              {recommendedWindow}
            </strong>
          </div>

          <div className="flex items-center gap-2">
            {primaryAction && (
              <Button
                variant="secondary"
                size="sm"
                onClick={primaryAction.onClick}
                className="font-black text-xs gap-1.5 bg-white text-slate-900 hover:bg-slate-100 shadow-xs py-2 px-3"
              >
                {primaryAction.icon && <primaryAction.icon className="w-3.5 h-3.5 text-orange-600" />}
                <span>{primaryAction.label}</span>
              </Button>
            )}

            {onAskORCA && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onAskORCA}
                className="font-black text-xs gap-1.5 bg-white text-orca-deep hover:bg-amber-50 shadow-xs py-2 px-3"
              >
                <MessageSquareText className="w-3.5 h-3.5 text-orca-cyan" />
                <span>ASK ORCA</span>
              </Button>
            )}

            {onPrimaryAction && (
              <Button
                variant="outline"
                size="sm"
                onClick={onPrimaryAction}
                className="font-bold text-xs gap-1 text-white border-white/30 hover:bg-white/10 py-2 px-3"
              >
                <span>{primaryActionText}</span>
              </Button>
            )}

            {onToggleDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleDetails}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-xl"
                title="Toggle technical reasoning details"
              >
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Return Constraint Bar */}
      <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-white/80 font-mono">
        <span className="flex items-center gap-1.5 font-sans text-[11px]">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-200 shrink-0" />
          <span>Operational Safety Barrier: <strong className="text-white">{returnConstraint}</strong></span>
        </span>

        <span className="hidden md:inline text-[11px] text-white/60 font-sans">
          INCOIS + NIOT Coastal Buoy Telemetry Calibrated
        </span>
      </div>
    </div>
  );
};
