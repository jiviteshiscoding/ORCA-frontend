import React from 'react';
import { useRoleSession } from '../../hooks/useRoleSession';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { User, Anchor, Compass } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { session, activeRoleConfig, logoutSession } = useRoleSession();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-orca-navy">User & Vessel Profile Context</h3>
        <Badge variant="demo">Frontend Demo Auth</Badge>
      </div>

      {activeRoleConfig && (
        <Card className="space-y-4">
          <div className="flex items-center gap-3 border-b border-orca-env/40 pb-4">
            <div className="w-12 h-12 rounded-full bg-orca-cyan/20 text-orca-navy flex items-center justify-center font-bold">
              <User className="w-6 h-6 text-orca-cyan" />
            </div>
            <div>
              <h4 className="text-base font-bold text-orca-navy">{session.userContext?.userName || 'Demo Operator'}</h4>
              <p className="text-xs text-orca-navy/70">{activeRoleConfig.displayName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-orca-ice rounded-lg border border-orca-env/60">
              <span className="text-orca-navy/60 font-semibold block">Home Port / Operational Base</span>
              <span className="font-bold text-orca-navy">{session.userContext?.homePort || 'Chennai Fishing Harbour'}</span>
            </div>

            {session.userContext?.vesselName && (
              <div className="p-3 bg-orca-ice rounded-lg border border-orca-env/60">
                <span className="text-orca-navy/60 font-semibold block flex items-center gap-1">
                  <Anchor className="w-3.5 h-3.5" /> Registered Vessel
                </span>
                <span className="font-bold text-orca-navy">{session.userContext.vesselName} ({session.userContext.vesselId})</span>
              </div>
            )}

            <div className="p-3 bg-orca-ice rounded-lg border border-orca-env/60">
              <span className="text-orca-navy/60 font-semibold block flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Max Range Constraint
              </span>
              <span className="font-bold text-orca-navy">{session.userContext?.maxDistanceNm || 30} Nautical Miles</span>
            </div>

            <div className="p-3 bg-orca-ice rounded-lg border border-orca-env/60">
              <span className="text-orca-navy/60 font-semibold block">Session Initiated</span>
              <span className="font-bold text-orca-navy">
                {session.loginTimestamp ? new Date(session.loginTimestamp).toLocaleTimeString() : 'Active Demo'}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="outline" onClick={logoutSession} className="w-full text-red-600 border-red-200 hover:bg-red-50">
              Clear Role Session & Exit
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
