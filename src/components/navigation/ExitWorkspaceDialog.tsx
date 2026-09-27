import React from 'react';
import { Button } from '../ui/Button';
import { LogOut, ShieldAlert } from 'lucide-react';

export interface ExitWorkspaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
  workspaceName?: string;
}

export const ExitWorkspaceDialog: React.FC<ExitWorkspaceDialogProps> = ({
  isOpen,
  onClose,
  onConfirmExit,
  workspaceName = 'Fisher / Vessel Operator',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-orca-navy border border-orca-cyan/40 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">Leave {workspaceName}?</h3>
            <span className="text-xs text-orca-ice/70 font-mono">Confirm Workspace Exit</span>
          </div>
        </div>

        <p className="text-xs text-orca-ice/90 leading-relaxed font-medium">
          Your current live telemetry data, agent consensus history, and workspace context will remain active for your next login.
        </p>

        <div className="p-3 rounded-xl bg-orca-deep/60 border border-white/5 space-y-1.5 text-xs font-mono">
          <div className="flex items-center justify-between text-emerald-400">
            <span>● Session Status:</span>
            <span className="font-bold">SNAPSHOT SAVED ✓</span>
          </div>
          <div className="flex items-center justify-between text-orca-ice/70 text-[11px]">
            <span>Active Stream Feeds:</span>
            <span>INCOIS + ISRO Sync</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 text-xs">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-white border-white/20 hover:bg-white/10 py-2 px-4 font-bold"
          >
            Stay in Workspace
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={onConfirmExit}
            className="bg-red-600 hover:bg-red-700 text-white font-black py-2 px-4 gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Workspace</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
