export type RoleId = 'fisher' | 'operator' | 'researcher' | 'disaster' | 'environment';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface RoleConfig {
  id: RoleId;
  displayName: string;
  tagline: string;
  shortDescription: string;
  iconIdentifier: string;
  accentColor: string;
  baseRoute: string;
  navigation: NavItem[];
}

export interface UserVesselContext {
  userName?: string;
  vesselId?: string;
  vesselName?: string;
  vesselType?: string;
  homePort?: string;
  maxDistanceNm?: number;
}

export interface RoleSession {
  roleId: RoleId | null;
  isAuthenticated: boolean;
  userContext?: UserVesselContext;
  loginTimestamp?: string;
}
