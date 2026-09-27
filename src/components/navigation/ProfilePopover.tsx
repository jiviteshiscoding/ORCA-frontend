import React, { useState, useRef, useEffect } from 'react';
import { RoleConfig } from '../../types/role';
import { User, Ship, MapPin, CheckCircle2, ChevronDown, Sliders, LogOut } from 'lucide-react';

export interface ProfilePopoverProps {
  role?: RoleConfig | null;
  vesselName?: string;
  onExit?: () => void;
  onSwitchWorkspace?: () => void;
}

export const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  role,
  vesselName = 'Sea Pearl',
  onExit,
  onSwitchWorkspace,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-xl bg-orca-deep/60 border border-white/10 hover:border-white/30 text-white transition-all cursor-pointer"
        aria-label="Open user profile menu"
      >
        <div className="w-7 h-7 rounded-lg bg-orca-cyan/20 border border-orca-cyan/40 text-orca-cyan flex items-center justify-center font-bold text-xs">
          <User className="w-4 h-4" />
        </div>
        <div className="hidden sm:block text-left text-xs">
          <span className="font-extrabold text-white block text-[11px] leading-none">{vesselName}</span>
          <span className="text-[9px] text-orca-ice/70 font-mono leading-tight">{role?.displayName || 'Fisher Operator'}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-orca-ice/70 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-orca-navy border border-orca-cyan/30 rounded-2xl shadow-2xl p-3 space-y-3 z-50 text-white animate-fade-in">
          {/* Profile Header */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-2.5">
            <div className="w-10 h-10 rounded-xl bg-orca-cyan text-orca-deep font-black flex items-center justify-center text-sm shadow-xs">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white">{vesselName}</h4>
              <span className="text-[10px] text-orca-cyan font-mono font-bold block">{role?.displayName}</span>
              <span className="text-[9px] text-emerald-400 font-extrabold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> AIS ONLINE
              </span>
            </div>
          </div>

          {/* Quick Context Summary */}
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between p-2 rounded-xl bg-orca-deep/60 border border-white/5 text-[11px]">
              <span className="text-orca-ice/70 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orca-cyan" /> Region
              </span>
              <strong className="text-white">Chennai Offshore</strong>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-orca-deep/60 border border-white/5 text-[11px]">
              <span className="text-orca-ice/70 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-orca-cyan" /> Clearance
              </span>
              <strong className="text-emerald-400">94% SECURE</strong>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-1 space-y-1 text-xs">
            {onSwitchWorkspace && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSwitchWorkspace();
                }}
                className="w-full text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-orca-ice hover:text-white font-semibold transition-all flex items-center justify-between"
              >
                <span>Switch Workspace</span>
                <span className="text-[10px] text-orca-cyan font-mono">⇄</span>
              </button>
            )}

            {onExit && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onExit();
                }}
                className="w-full text-left px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 font-bold transition-all flex items-center justify-between border border-red-500/20"
              >
                <span className="flex items-center gap-1.5">
                  <LogOut className="w-3.5 h-3.5 text-red-400" /> Exit Workspace
                </span>
                <span className="text-[10px] font-mono text-red-400">Exit</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
