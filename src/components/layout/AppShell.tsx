import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { RoleHeader } from '../role/RoleHeader';
import { AppStartupSequence } from '../ui/AppStartupSequence';
import { useRoleSession } from '../../hooks/useRoleSession';

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { session, activeRoleConfig, selectRole, logoutSession } = useRoleSession();
  const location = useLocation();
  const [showStartup, setShowStartup] = useState(() => {
    // Show startup sequence once per browser session
    const hasSeenStartup = sessionStorage.getItem('orca_has_seen_startup');
    if (!hasSeenStartup) {
      sessionStorage.setItem('orca_has_seen_startup', 'true');
      return true;
    }
    return false;
  });

  // Auto-sync active role based on current URL path
  React.useEffect(() => {
    const path = location.pathname;
    let targetRoleId: string | null = null;

    if (path.startsWith('/operator')) targetRoleId = 'operator';
    else if (path.startsWith('/researcher')) targetRoleId = 'researcher';
    else if (path.startsWith('/disaster')) targetRoleId = 'disaster';
    else if (path.startsWith('/environment')) targetRoleId = 'environment';
    else if (path.startsWith('/fisher')) targetRoleId = 'fisher';

    if (targetRoleId && session.roleId !== targetRoleId) {
      selectRole(targetRoleId as never);
    }
  }, [location.pathname, session.roleId, selectRole]);

  const isWorkstationPage = location.pathname.includes('/ask') || location.pathname.includes('/dashboard') || location.pathname.includes('/map');

  return (
    <div className="h-screen w-screen flex flex-col bg-orca-white overflow-hidden">
      {/* App Startup Sequence Animation */}
      {showStartup && (
        <AppStartupSequence
          onComplete={() => setShowStartup(false)}
          workspaceName={activeRoleConfig?.displayName || 'ORCA Marine Intelligence System'}
        />
      )}

      <Header
        activeRole={activeRoleConfig}
        onLogout={logoutSession}
        onRoleSwitch={(rId) => selectRole(rId as never)}
      />

      <div className="flex-1 flex overflow-hidden min-h-0">
        {activeRoleConfig && <Sidebar role={activeRoleConfig} />}

        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-16 md:pb-0">
          {activeRoleConfig && !isWorkstationPage && (
            <RoleHeader role={activeRoleConfig} userContext={session.userContext} />
          )}

          <div key={location.pathname} className={`flex-1 animate-fade-in ${isWorkstationPage ? 'p-2.5 sm:p-3 md:p-4' : 'p-3 sm:p-4 md:p-5'}`}>
            {children}
          </div>
        </main>
      </div>

      {activeRoleConfig && <BottomNav role={activeRoleConfig} />}
    </div>
  );
};

