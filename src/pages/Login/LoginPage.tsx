import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ORCA_ROLES } from '../../config/roles';
import { useRoleSession } from '../../hooks/useRoleSession';
import { RadarVisualGraphic } from '../../components/ui/RadarVisualGraphic';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { ORCALogo } from '../../components/ui/ORCALogo';
import { RoleId } from '../../types/role';
import { ArrowLeft, ShieldCheck, Zap, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { role: roleParam } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { selectRole } = useRoleSession();

  const roleKey = (roleParam as RoleId) || 'fisher';
  const roleConfig = ORCA_ROLES[roleKey] || ORCA_ROLES.fisher;

  const [identifier, setIdentifier] = useState(
    roleKey === 'fisher' ? 'IND-TN-02-MM-411' : `operator.${roleKey}@orca.marine`
  );
  const [passkey, setPasskey] = useState('••••••••••••');

  const handleDemoSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    selectRole(roleConfig.id);
    navigate(`/${roleConfig.id}/dashboard`);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-4">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/roles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-orca-navy/70 hover:text-orca-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Role Selection</span>
        </Link>
        <Badge variant="demo">Frontend Demo Mode</Badge>
      </div>

      {/* Desktop 2-Column Card */}
      <div className="bg-white rounded-3xl border border-orca-env/80 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Left Column: Dark Marine Visual */}
        <div className="lg:col-span-6 hidden lg:block p-2 bg-[#062B4A]">
          <RadarVisualGraphic />
        </div>

        {/* Right Column: Light Login Form Panel */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-orca-white">
          <div>
            <div className="flex items-center justify-between mb-6">
              <ORCALogo size="sm" lightMode={true} />
              <span
                className="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md border"
                style={{
                  borderColor: `${roleConfig.accentColor}40`,
                  color: roleConfig.accentColor,
                  backgroundColor: `${roleConfig.accentColor}10`,
                }}
              >
                {roleConfig.displayName.split('/')[0]}
              </span>
            </div>

            <div className="space-y-1 mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-orca-navy">
                Welcome back.
              </h2>
              <p className="text-xs text-orca-navy/70">
                Sign in to access your {roleConfig.displayName} reasoning workspace.
              </p>
            </div>

            <form onSubmit={handleDemoSignIn} className="space-y-4">
              <Input
                label="Vessel Registration ID / Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. IND-TN-02-MM-411"
              />

              <Input
                label="Security Passkey / Token"
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
              />

              {/* Demo Fill Pill */}
              <div className="flex items-center justify-between bg-orca-ice p-3 rounded-xl border border-orca-env text-xs text-orca-navy/80">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orca-cyan shrink-0" />
                  <div>
                    <span className="font-bold text-orca-navy block">Demo Passkey Loaded</span>
                    <span className="text-[11px] text-orca-navy/60">No real password required for prototype</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full font-bold gap-2 shadow-md"
                style={{ backgroundColor: roleConfig.accentColor }}
              >
                <Lock className="w-4 h-4" />
                <span>SIGN IN TO WORKSPACE</span>
              </Button>
            </form>
          </div>

          <div className="pt-6 border-t border-orca-env/40 text-[11px] text-orca-navy/60 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orca-cyan" />
              ORCA Security Layer
            </span>
            <span>Local Role Session Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
