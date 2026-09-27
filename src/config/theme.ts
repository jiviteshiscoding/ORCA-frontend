export const ORCA_THEME = {
  colors: {
    env: '#BFE8F3',      // Primary environment color
    ice: '#EAF8FB',      // Workspace / light surface
    white: '#F8FCFD',    // Main background
    navy: '#073B66',     // Primary text & header
    deep: '#062B4A',     // Dark text & contrast
    cyan: '#20B8D8',     // Interactive accent
    blue: '#1685C7',     // Secondary accent
  },
  decisionColors: {
    go: '#10B981',
    caution: '#F59E0B',
    avoid: '#EF4444',
    unknown: '#6B7280',
  }
} as const;
