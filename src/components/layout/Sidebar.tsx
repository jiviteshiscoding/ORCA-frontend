import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoleConfig } from '../../types/role';
import {
  LayoutDashboard,
  Map,
  MessageSquareText,
  Navigation,
  Bell,
  User,
  Clock,
  Compass,
  LineChart,
  FileSearch,
  TriangleAlert,
  BellRing,
  BarChart3,
  FileText,
  Sparkles,
} from 'lucide-react';

const NAV_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard,
  Map,
  MessageSquareText,
  Navigation,
  Bell,
  User,
  Clock,
  Compass,
  LineChart,
  FileSearch,
  TriangleAlert,
  BellRing,
  BarChart3,
  FileText,
};

export interface SidebarProps {
  role: RoleConfig;
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  // Separate items into categories
  const opsNav = role.navigation.filter(
    (n) => n.icon === 'LayoutDashboard' || n.icon === 'Navigation' || n.icon === 'Map' || n.icon === 'Compass'
  );
  const intelNav = role.navigation.filter(
    (n) => n.icon === 'MessageSquareText' || n.icon === 'LineChart' || n.icon === 'FileSearch' || n.icon === 'BarChart3' || n.icon === 'FileText'
  );
  const alertsNav = role.navigation.filter(
    (n) => n.icon === 'Bell' || n.icon === 'TriangleAlert' || n.icon === 'BellRing'
  );
  const accountNav = role.navigation.filter((n) => n.icon === 'User');

  const renderNavGroup = (title: string, items: typeof role.navigation) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase tracking-widest text-orca-cyan/70 px-3 block font-mono">
          {title}
        </span>
        {items.map((item) => {
          const IconComponent = NAV_ICON_MAP[item.icon] || LayoutDashboard;
          const isAsk = item.path.includes('/ask');

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-orca-cyan text-orca-deep font-black shadow-xs border-l-4 border-white'
                    : isAsk
                    ? 'bg-orca-navy/90 text-orca-cyan font-bold border border-orca-cyan/30 hover:bg-orca-cyan hover:text-orca-deep'
                    : 'text-orca-ice/80 hover:bg-orca-navy/80 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5 truncate">
                <IconComponent className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              {isAsk && <Sparkles className="w-3 h-3 text-orca-cyan animate-pulse shrink-0" />}
            </NavLink>
          );
        })}
      </div>
    );
  };

  return (
    <aside className="w-56 bg-orca-deep text-white flex flex-col hidden md:flex h-[calc(100vh-3.5rem)] border-r border-orca-navy/80 shrink-0 select-none">
      {/* Current Workspace Pill */}
      <div className="p-3.5 border-b border-orca-navy/80 bg-orca-navy/40">
        <span className="text-[9px] uppercase tracking-widest text-orca-cyan font-black block font-mono">
          ACTIVE WORKSPACE
        </span>
        <h4 className="text-xs font-black text-white truncate mt-0.5">{role.displayName}</h4>
      </div>

      {/* Main Nav Items Categorized */}
      <nav className="flex-1 p-2.5 space-y-4 overflow-y-auto">
        {renderNavGroup('OPERATIONS', opsNav)}
        {renderNavGroup('INTELLIGENCE', intelNav)}
        {renderNavGroup('ALERTS & WARNINGS', alertsNav)}
        {renderNavGroup('ACCOUNT', accountNav)}
      </nav>

      {/* System Status Footbar */}
      <div className="p-3 border-t border-orca-navy/80 bg-orca-navy/30 text-xs text-orca-ice/70 space-y-0.5">
        <div className="flex items-center gap-1.5 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-extrabold text-white text-[11px]">ORCA ENGINE v1.0</span>
        </div>
        <p className="text-[10px] text-orca-ice/60">Multi-Agent Intelligence Network</p>
      </div>
    </aside>
  );
};

