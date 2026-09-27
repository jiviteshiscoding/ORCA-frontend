import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_ROLES_LIST } from '../../config/roles';
import { RoleId } from '../../types/role';
import { WorkspaceSelectorModal } from './WorkspaceSelectorModal';
import { Compass, ChevronDown } from 'lucide-react';

export interface RoleSwitcherProps {
  currentRoleId: RoleId | null;
  onRoleChange?: (roleId: RoleId) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRoleId, onRoleChange }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeRole = ALL_ROLES_LIST.find((r) => r.id === currentRoleId);

  const handleRoleSelect = (rId: RoleId) => {
    if (onRoleChange) onRoleChange(rId);
    navigate(`/${rId}/dashboard`);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orca-deep/70 border border-white/15 hover:border-orca-cyan/60 text-white transition-all cursor-pointer text-xs group"
        title="Switch ORCA Marine Workspace"
      >
        <Compass className="w-4 h-4 text-orca-cyan group-hover:rotate-45 transition-transform" />
        <div className="text-left font-bold hidden sm:block">
          <span className="text-[9px] text-orca-cyan uppercase font-mono block leading-none">WORKSPACE</span>
          <span className="text-xs text-white truncate block">{activeRole?.displayName || 'Fisher Workspace'}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-orca-ice/70 shrink-0" />
      </button>

      <WorkspaceSelectorModal
        isOpen={isModalOpen}
        currentRoleId={currentRoleId}
        onClose={() => setIsModalOpen(false)}
        onSelectRole={handleRoleSelect}
      />
    </>
  );
};
