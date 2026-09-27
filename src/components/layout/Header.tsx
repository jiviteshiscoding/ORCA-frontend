import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ORCALogo } from '../ui/ORCALogo';
import { RoleSwitcher } from '../navigation/RoleSwitcher';
import { AskOrcaLauncher } from '../ui/AskOrcaLauncher';
import { ProfilePopover } from '../navigation/ProfilePopover';
import { ExitWorkspaceDialog } from '../navigation/ExitWorkspaceDialog';
import { RoleConfig } from '../../types/role';
import { Button } from '../ui/Button';
import { Shield } from 'lucide-react';

export interface HeaderProps {
  activeRole?: RoleConfig | null;
  onLogout?: () => void;
  onRoleSwitch?: (roleId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeRole, onLogout, onRoleSwitch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  return (
    <header className="h-14 bg-orca-navy text-white border-b border-orca-deep/80 px-3 md:px-5 flex items-center justify-between sticky top-0 z-40 shadow-sm shrink-0 select-none">
      <div className="flex items-center gap-3 sm:gap-6">
        <Link to="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
          <ORCALogo size="sm" lightMode={false} />
        </Link>

        {isLanding && (
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-orca-ice/80">
            <a href="#how-it-works" className="hover:text-orca-cyan transition-colors">
              How ORCA Works
            </a>
            <a href="#capabilities" className="hover:text-orca-cyan transition-colors">
              Capabilities
            </a>
            <a href="#workspaces" className="hover:text-orca-cyan transition-colors">
              Maritime Workspaces
            </a>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-Time Engine & Stream Status Bar (Desktop) */}
        {activeRole && (
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-xl bg-orca-deep/80 border border-white/10 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-black text-white tracking-wider">ENGINE ONLINE</span>
            <span className="text-white/30">|</span>
            <span className="text-orca-cyan font-bold">5 STREAMS</span>
            <span className="text-white/30">|</span>
            <span className="text-emerald-400 font-bold">7 AGENTS</span>
          </div>
        )}

        {/* Ask ORCA Copilot Launcher Button */}
        {activeRole && (
          <AskOrcaLauncher currentRoleId={activeRole.id} variant="header" />
        )}

        {/* Role Workspace Switcher Popover */}
        {activeRole ? (
          <>
            <RoleSwitcher
              currentRoleId={activeRole.id}
              onRoleChange={(rId) => {
                if (onRoleSwitch) onRoleSwitch(rId);
                navigate(`/${rId}/dashboard`);
              }}
            />

            {/* Profile Popover Dropdown */}
            <ProfilePopover
              role={activeRole}
              onExit={() => setIsExitDialogOpen(true)}
              onSwitchWorkspace={() => navigate('/roles')}
            />

            {/* Exit Workspace Confirmation Modal */}
            <ExitWorkspaceDialog
              isOpen={isExitDialogOpen}
              onClose={() => setIsExitDialogOpen(false)}
              onConfirmExit={() => {
                setIsExitDialogOpen(false);
                if (onLogout) onLogout();
                navigate('/');
              }}
              workspaceName={activeRole.displayName}
            />
          </>
        ) : (
          <Link to="/roles">
            <Button variant="secondary" size="sm" className="flex items-center gap-1.5 font-bold shadow-xs py-1.5 px-3.5 text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>ENTER ORCA</span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

