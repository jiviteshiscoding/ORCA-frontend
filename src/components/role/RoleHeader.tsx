import React from 'react';
import { RoleConfig, UserVesselContext } from '../../types/role';
import { StatusIndicator } from '../ui/StatusIndicator';

export interface RoleHeaderProps {
  role: RoleConfig;
  userContext?: UserVesselContext;
}

export const RoleHeader: React.FC<RoleHeaderProps> = ({ role, userContext }) => {
  return (
    <div className="bg-white border-b border-orca-env/40 px-3 py-2.5 md:px-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: role.accentColor }}
          />
          <div>
            <h2 className="text-base md:text-lg font-black text-orca-navy leading-tight">{role.displayName}</h2>
            <p className="text-[11px] text-orca-navy/70">{role.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs bg-orca-ice/60 px-2.5 py-1 rounded-lg border border-orca-env/40">
          <StatusIndicator status="DEMO" />
          {userContext?.userName && (
            <div className="border-l border-orca-env/60 pl-2.5">
              <span className="text-orca-navy/50 font-medium text-[10px]">Session: </span>
              <span className="font-bold text-orca-navy text-xs">{userContext.userName}</span>
            </div>
          )}
          {userContext?.vesselName && (
            <div className="border-l border-orca-env/60 pl-2.5 hidden sm:block">
              <span className="text-orca-navy/50 font-medium text-[10px]">Vessel: </span>
              <span className="font-bold text-orca-navy text-xs">{userContext.vesselName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

