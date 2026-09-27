import { DecisionState } from '../types/decision';

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getDecisionBadgeStyles(status: DecisionState): { bg: string; text: string; border: string } {
  switch (status) {
    case 'GO':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-700', border: 'border-emerald-500/30' };
    case 'CAUTION':
      return { bg: 'bg-amber-500/10', text: 'text-amber-700', border: 'border-amber-500/30' };
    case 'AVOID':
      return { bg: 'bg-red-500/10', text: 'text-red-700', border: 'border-red-500/30' };
    case 'INSUFFICIENT DATA':
    default:
      return { bg: 'bg-slate-500/10', text: 'text-slate-700', border: 'border-slate-500/30' };
  }
}
