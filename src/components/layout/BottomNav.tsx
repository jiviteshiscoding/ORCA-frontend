import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RoleConfig } from '../../types/role';
import {
  LayoutDashboard,
  Map,
  Sparkles,
  Bell,
  User,
} from 'lucide-react';

export interface BottomNavProps {
  role: RoleConfig;
}

export const BottomNav: React.FC<BottomNavProps> = ({ role }) => {
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-orca-navy border-t border-orca-deep z-40 flex items-center justify-around px-2 shadow-lg select-none">
      {/* 1. Home / Dashboard */}
      <NavLink
        to={`/${role.id}/dashboard`}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-bold transition-colors ${
            isActive ? 'text-orca-cyan font-black' : 'text-orca-ice/70 hover:text-white'
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </NavLink>

      {/* 2. Map */}
      <NavLink
        to={`/${role.id}/map`}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-bold transition-colors ${
            isActive ? 'text-orca-cyan font-black' : 'text-orca-ice/70 hover:text-white'
          }`
        }
      >
        <Map className="w-5 h-5 mb-0.5" />
        <span>Map</span>
      </NavLink>

      {/* 3. CENTER FLOATING ASK ORCA COPILOT LAUNCHER */}
      <button
        onClick={() => navigate(`/${role.id}/ask`)}
        className="-mt-5 bg-gradient-to-r from-orca-cyan via-teal-300 to-orca-cyan text-orca-deep font-black p-3 rounded-full shadow-lg border-2 border-orca-navy active:scale-95 transition-all flex flex-col items-center justify-center"
        title="Ask ORCA Copilot"
      >
        <Sparkles className="w-5 h-5 text-orca-deep animate-pulse" />
        <span className="text-[8px] font-black uppercase tracking-widest text-orca-deep leading-none mt-0.5">✦ ASK</span>
      </button>

      {/* 4. Alerts / Dynamic Stream */}
      <NavLink
        to={`/${role.id}/alerts`}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-bold transition-colors ${
            isActive ? 'text-orca-cyan font-black' : 'text-orca-ice/70 hover:text-white'
          }`
        }
      >
        <Bell className="w-5 h-5 mb-0.5" />
        <span>Alerts</span>
      </NavLink>

      {/* 5. Profile */}
      <NavLink
        to={`/${role.id}/profile`}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center text-[10px] font-bold transition-colors ${
            isActive ? 'text-orca-cyan font-black' : 'text-orca-ice/70 hover:text-white'
          }`
        }
      >
        <User className="w-5 h-5 mb-0.5" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};
