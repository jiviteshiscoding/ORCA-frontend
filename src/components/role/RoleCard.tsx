import React from 'react';
import { RoleConfig } from '../../types/role';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ArrowRight, Anchor, Ship, FlaskConical, ShieldAlert, Leaf } from 'lucide-react';

export interface RoleCardProps {
  role: RoleConfig;
  onSelect: (roleId: RoleConfig['id']) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Anchor,
  Ship,
  FlaskConical,
  ShieldAlert,
  Leaf,
};

export const RoleCard: React.FC<RoleCardProps> = ({ role, onSelect }) => {
  const IconComponent = ICON_MAP[role.iconIdentifier] || Anchor;

  return (
    <Card variant="interactive" className="flex flex-col justify-between h-full group" onClick={() => onSelect(role.id)}>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
            style={{ backgroundColor: `${role.accentColor}15`, color: role.accentColor }}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-semibold tracking-wider text-orca-navy/50 uppercase">
            Role Workspace
          </span>
        </div>
        <h3 className="text-lg font-bold text-orca-navy group-hover:text-orca-cyan transition-colors">
          {role.displayName}
        </h3>
        <p className="text-xs font-semibold text-orca-blue/80 mt-0.5 mb-2">
          {role.tagline}
        </p>
        <p className="text-xs text-orca-navy/70 leading-relaxed mb-4">
          {role.shortDescription}
        </p>
      </div>

      <div className="pt-3 border-t border-orca-env/40 flex items-center justify-between">
        <span className="text-xs font-medium text-orca-navy/60">Select Demo Mode</span>
        <Button variant="ghost" size="sm" className="text-orca-cyan p-0 hover:bg-transparent flex items-center gap-1 font-semibold">
          Enter Role <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
