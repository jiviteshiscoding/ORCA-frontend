import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_ROLES_LIST } from '../../config/roles';
import { WorkspaceCard } from '../../components/role/WorkspaceCard';
import { useRoleSession } from '../../hooks/useRoleSession';
import { Badge } from '../../components/ui/Badge';
import { RoleId } from '../../types/role';
import { Compass, ShieldCheck } from 'lucide-react';

export const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectRole } = useRoleSession();

  const handleRoleSelect = (roleId: RoleId) => {
    selectRole(roleId);
    navigate(`/login/${roleId}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Top Breadcrumb & Step Bar */}
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono text-orca-navy/70">
          <ShieldCheck className="w-4 h-4 text-orca-cyan" />
          <span className="font-bold text-orca-navy">ORCA SELECTION</span>
          <span>//</span>
          <span className="text-orca-cyan font-bold">STEP 01: WORKSPACE ROLE</span>
        </div>
        <Badge variant="demo">Demo Role Mode</Badge>
      </div>

      {/* Main Title Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-orca-ice text-orca-cyan flex items-center justify-center mx-auto border border-orca-cyan/30 shadow-2xs">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-orca-navy tracking-tight">
          WHO ARE YOU?
        </h1>

        <p className="text-xs md:text-sm text-orca-navy/75 leading-relaxed">
          Choose your workspace. Tailored intelligence, risk thresholds, and operational tools for your role in ORCA.
        </p>
      </div>

      {/* 5 Interactive Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {ALL_ROLES_LIST.map((role) => (
          <WorkspaceCard key={role.id} role={role} onSelect={handleRoleSelect} />
        ))}
      </div>
    </div>
  );
};
