import React from 'react';
import { ALL_ROLES_LIST } from '../../config/roles';
import { RoleId } from '../../types/role';
import { CheckCircle2, Compass, ArrowRight } from 'lucide-react';

export interface WorkspaceSelectorModalProps {
  isOpen: boolean;
  currentRoleId?: RoleId | null;
  onClose: () => void;
  onSelectRole: (roleId: RoleId) => void;
}

export const WorkspaceSelectorModal: React.FC<WorkspaceSelectorModalProps> = ({
  isOpen,
  currentRoleId,
  onClose,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-orca-navy border border-orca-cyan/40 rounded-3xl p-5 sm:p-6 max-w-2xl w-full text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orca-cyan/20 border border-orca-cyan/40 text-orca-cyan">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider">SELECT YOUR WORKSPACE</h3>
              <span className="text-xs text-orca-cyan font-mono">ORCA Marine Intelligence Workstations</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-orca-ice/60 hover:text-white p-1 rounded-xl text-xs font-mono font-bold"
          >
            ✕ Close
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {ALL_ROLES_LIST.map((role) => {
            const isActive = role.id === currentRoleId;

            return (
              <div
                key={role.id}
                onClick={() => {
                  onSelectRole(role.id);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 group ${
                  isActive
                    ? 'bg-gradient-to-r from-orca-cyan/20 via-orca-deep to-orca-navy border-orca-cyan shadow-md ring-1 ring-orca-cyan'
                    : 'bg-orca-deep/60 border-white/10 hover:border-orca-cyan/50 hover:bg-orca-deep'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-black text-white group-hover:text-orca-cyan transition-colors">
                      {role.displayName}
                    </h4>
                    <span className="text-[10px] text-orca-ice/70 font-mono block mt-0.5">
                      {role.tagline}
                    </span>
                  </div>

                  {isActive ? (
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-500 text-orca-deep uppercase flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3 h-3" /> ACTIVE
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-orca-cyan group-hover:text-orca-deep text-white/40 flex items-center justify-center text-xs transition-colors shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-orca-ice/80 leading-relaxed font-medium line-clamp-2">
                  {role.shortDescription}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-orca-cyan/80 pt-1 border-t border-white/5">
                  <span>{role.navigation.length} Tools & Feeds</span>
                  <span className="group-hover:translate-x-1 transition-transform">Enter Workspace →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
