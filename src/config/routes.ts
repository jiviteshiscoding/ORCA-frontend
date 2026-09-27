export const ROUTES = {
  HOME: '/',
  ROLE_SELECTION: '/roles',
  LOGIN: '/login/:role',
  
  // Fisher
  FISHER: {
    BASE: '/fisher',
    DASHBOARD: '/fisher/dashboard',
    MAP: '/fisher/map',
    ASK: '/fisher/ask',
    MISSION: '/fisher/mission',
    ALERTS: '/fisher/alerts',
    PROFILE: '/fisher/profile',
  },

  // Operator
  OPERATOR: {
    BASE: '/operator',
    DASHBOARD: '/operator/dashboard',
    MAP: '/operator/map',
    MISSIONS: '/operator/missions',
    ALERTS: '/operator/alerts',
    PROFILE: '/operator/profile',
  },

  // Researcher
  RESEARCHER: {
    BASE: '/researcher',
    DASHBOARD: '/researcher/dashboard',
    MAP: '/researcher/map',
    ANALYSIS: '/researcher/analysis',
    EVIDENCE: '/researcher/evidence',
    PROFILE: '/researcher/profile',
  },

  // Disaster Authority
  DISASTER: {
    BASE: '/disaster',
    DASHBOARD: '/disaster/dashboard',
    MAP: '/disaster/map',
    HAZARDS: '/disaster/hazards',
    ALERTS: '/disaster/alerts',
    PROFILE: '/disaster/profile',
  },

  // Environment Analyst
  ENVIRONMENT: {
    BASE: '/environment',
    DASHBOARD: '/environment/dashboard',
    MAP: '/environment/map',
    ANALYSIS: '/environment/analysis',
    EVIDENCE: '/environment/evidence',
    PROFILE: '/environment/profile',
  }
} as const;
