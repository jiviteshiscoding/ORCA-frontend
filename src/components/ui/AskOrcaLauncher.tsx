import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export interface AskOrcaLauncherProps {
  currentRoleId?: string;
  variant?: 'header' | 'floating' | 'card';
  className?: string;
}

export const AskOrcaLauncher: React.FC<AskOrcaLauncherProps> = ({
  currentRoleId = 'fisher',
  variant = 'header',
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLaunch = () => {
    // Navigate to role-specific Ask ORCA page
    navigate(`/${currentRoleId}/ask`);
  };

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleLaunch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRoleId]);

  const isAskPage = location.pathname.includes('/ask');

  if (variant === 'floating') {
    return (
      <button
        onClick={handleLaunch}
        className={`fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 bg-gradient-to-r from-orca-cyan to-orca-blue text-orca-deep font-black p-3.5 rounded-full shadow-lg hover:shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group ${className}`}
        title="Ask ORCA Copilot (Ctrl+K)"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-orca-deep animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="text-xs font-black tracking-wider uppercase pr-1 hidden sm:inline">ASK ORCA</span>
      </button>
    );
  }

  if (variant === 'card') {
    return (
      <div
        onClick={handleLaunch}
        className={`p-3.5 rounded-2xl bg-gradient-to-r from-orca-navy via-orca-deep to-orca-navy border border-orca-cyan/40 text-white shadow-sm hover:border-orca-cyan cursor-pointer transition-all space-y-2 group ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orca-cyan/20 border border-orca-cyan/30 text-orca-cyan">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-black tracking-wider text-white uppercase block">ASK ORCA COPILOT</span>
              <span className="text-[10px] text-orca-cyan font-mono">Multi-Agent Intelligence Query</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono font-bold text-orca-cyan border border-white/10">
            Ctrl+K
          </span>
        </div>

        <p className="text-[11px] text-orca-ice/80 leading-relaxed font-medium">
          Ask ORCA about wave thresholds, fishing potential, weather anomalies, or vessel safety rules.
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handleLaunch}
      className={`relative group px-3 py-1.5 rounded-xl bg-gradient-to-r from-orca-cyan via-teal-400 to-orca-cyan text-orca-deep font-black text-xs flex items-center gap-2 shadow-xs hover:shadow-cyan-400/30 hover:scale-[1.02] active:scale-98 transition-all border border-orca-cyan/50 ${
        isAskPage ? 'ring-2 ring-white shadow-md' : ''
      } ${className}`}
      title="Open Ask ORCA Marine Copilot (Ctrl+K)"
    >
      <div className="relative flex items-center justify-center">
        <Sparkles className="w-3.5 h-3.5 text-orca-deep animate-pulse" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>

      <span className="font-extrabold tracking-wider uppercase text-[11px] text-orca-deep">
        ✦ ASK ORCA
      </span>

      <span className="hidden xl:inline-block px-1.5 py-0.2 rounded bg-orca-deep/20 text-orca-deep font-mono text-[9px] font-bold">
        Ctrl+K
      </span>
    </button>
  );
};
