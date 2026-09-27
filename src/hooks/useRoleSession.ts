import { useState, useEffect } from 'react';
import { RoleId, RoleSession } from '../types/role';
import { ORCA_ROLES } from '../config/roles';

const SESSION_STORAGE_KEY = 'orca_demo_role_session';

const DEFAULT_SESSION: RoleSession = {
  roleId: null,
  isAuthenticated: false,
  userContext: undefined,
};

export function useRoleSession() {
  const [session, setSession] = useState<RoleSession>(() => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if localStorage read fails
    }
    return DEFAULT_SESSION;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Ignore write errors in restricted environments
    }
  }, [session]);

  const selectRole = (roleId: RoleId) => {
    const roleConfig = ORCA_ROLES[roleId];
    if (!roleConfig) return;

    setSession({
      roleId,
      isAuthenticated: true,
      userContext: {
        userName: `Demo ${roleConfig.displayName.split('/')[0].trim()}`,
        vesselId: roleId === 'fisher' ? 'IND-TN-02-MM-411' : undefined,
        vesselName: roleId === 'fisher' ? 'Sea Pearl' : undefined,
        homePort: 'Chennai Fishing Harbour',
        maxDistanceNm: roleId === 'fisher' ? 30 : 100,
      },
      loginTimestamp: new Date().toISOString(),
    });
  };

  const logoutSession = () => {
    setSession(DEFAULT_SESSION);
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore write error
    }
  };

  const activeRoleConfig = session.roleId ? ORCA_ROLES[session.roleId] : null;

  return {
    session,
    activeRoleConfig,
    selectRole,
    logoutSession,
  };
}
