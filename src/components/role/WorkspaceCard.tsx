import React from 'react';
import { RoleConfig } from '../../types/role';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ArrowRight, Anchor, Ship, FlaskConical, ShieldAlert, Leaf, CheckCircle2 } from 'lucide-react';

export interface WorkspaceCardProps {
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

const FEATURE_TAGS_MAP: Record<string, string[]> = {
  fisher: ['PFZ Hotspot Mapping', 'Sea Safety Advisories', 'Fuel & Trip Planning'],
  operator: ['Fleet AIS Tracking', 'Vessel Traffic Safety', 'Harbor Clearance'],
  researcher: ['SST Anomaly Layers', 'Chlorophyll Dynamics', 'Agent Trace Vault'],
  disaster: ['Cyclone Evacuation Tracks', 'Swell Surge Alerts', 'Coastal Response'],
  environment: ['Coral Stress Index', 'MPA Boundary Monitoring', 'Bio-Ecosystem Audits'],
};

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ role, onSelect }) => {
  const IconComponent = ICON_MAP[role.iconIdentifier] || Anchor;
  const features = FEATURE_TAGS_MAP[role.id] || ['Marine Reasoning', 'Spatial Layers', 'Decision Engine'];

  return (
    <Card
      variant="interactive"
      className="flex flex-col justify-between h-full group p-6 relative overflow-hidden border-orca-env/80 hover:border-orca-cyan transition-all duration-200"
      onClick={() => onSelect(role.id)}
    >
      {/* Top Accent Strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 transition-all group-hover:h-2"
        style={{ backgroundColor: role.accentColor }}
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs"
            style={{ backgroundColor: `${role.accentColor}18`, color: role.accentColor }}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <span
            className="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md border"
            style={{
              borderColor: `${role.accentColor}40`,
              color: role.accentColor,
              backgroundColor: `${role.accentColor}10`,
            }}
          >
            {role.id}
          </span>
        </div>

        <h3 className="text-xl font-bold text-orca-navy group-hover:text-orca-blue transition-colors">
          {role.displayName}
        </h3>

        <p className="text-xs font-semibold text-orca-blue/90 mt-1 mb-2">
          {role.tagline}
        </p>

        <p className="text-xs text-orca-navy/70 leading-relaxed mb-4">
          {role.shortDescription}
        </p>

        {/* Capability Tags */}
        <div className="space-y-2 mb-6">
          <span className="text-[10px] font-bold text-orca-navy/50 uppercase tracking-widest block">
            Included Capabilities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {features.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-orca-ice text-orca-navy font-medium border border-orca-env/60"
              >
                <CheckCircle2 className="w-3 h-3 text-orca-cyan" />
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-orca-env/40 flex items-center justify-between">
        <span className="text-xs font-semibold text-orca-navy/70">
          Enter Workspace
        </span>
        <Button
          variant="secondary"
          size="sm"
          className="gap-1.5 font-bold shadow-xs group-hover:translate-x-1 transition-transform"
        >
          <span>Launch</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
