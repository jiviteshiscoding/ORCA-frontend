import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { MarineHeroGraphic } from '../../components/ui/MarineHeroGraphic';
import { MarineDataChip } from '../../components/ui/MarineDataChip';
import { ALL_ROLES_LIST } from '../../config/roles';
import { WorkspaceCard } from '../../components/role/WorkspaceCard';
import { useRoleSession } from '../../hooks/useRoleSession';
import { RoleId } from '../../types/role';
import {
  Waves,
  CloudSun,
  Fish,
  Ship,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  Compass,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectRole } = useRoleSession();

  const handleRoleSelect = (roleId: RoleId) => {
    selectRole(roleId);
    navigate(`/${roleId}/dashboard`);
  };

  return (
    <div className="space-y-16 py-4 max-w-7xl mx-auto">
      {/* SECTION 1: HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 md:pt-6">
        {/* Left Column Text & CTAs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 bg-orca-ice px-3.5 py-1.5 rounded-full border border-orca-cyan/30 text-orca-navy shadow-2xs">
            <Sparkles className="w-4 h-4 text-orca-cyan animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase">
              Marine Decision Intelligence
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-orca-navy tracking-tight leading-[1.1]">
            FROM MARINE DATA <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orca-cyan via-orca-blue to-orca-navy">
              TO MISSION-READY
            </span>{' '}
            DECISIONS
          </h1>

          <p className="text-sm md:text-base text-orca-navy/80 max-w-xl leading-relaxed">
            Context-aware marine intelligence that brings ocean, weather, fisheries, vessel and geospatial information together for mission-ready decisions.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link to="/roles">
              <Button size="lg" className="w-full sm:w-auto gap-2 font-bold shadow-md">
                <ShieldCheck className="w-5 h-5 text-orca-cyan" />
                <span>ENTER ORCA</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 font-semibold">
                <Compass className="w-4 h-4" />
                <span>EXPLORE HOW IT WORKS</span>
              </Button>
            </a>
          </div>

          {/* Quick Stats Pill */}
          <div className="pt-2 flex items-center gap-6 text-xs text-orca-navy/70 border-t border-orca-env/40">
            <div>
              <span className="font-extrabold text-orca-navy block text-sm">5 Workspaces</span>
              <span>Tailored for Marine Roles</span>
            </div>
            <div className="h-6 w-px bg-orca-env" />
            <div>
              <span className="font-extrabold text-orca-cyan block text-sm">100% Explainable</span>
              <span>Agent Rationale & Evidence</span>
            </div>
          </div>
        </div>

        {/* Right Column Marine Visual */}
        <div className="lg:col-span-6">
          <MarineHeroGraphic />
        </div>
      </section>

      {/* SECTION 2: MARINE DATA STRIP */}
      <section id="capabilities" className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-orca-navy/60 uppercase tracking-widest">
            Aggregated Data Streams
          </span>
          <Badge variant="demo">Deterministic Demo Feeds</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <MarineDataChip label="Ocean" sublabel="SST & Currents" icon={<Waves className="w-5 h-5" />} />
          <MarineDataChip label="Weather" sublabel="Wind & Swell" icon={<CloudSun className="w-5 h-5" />} />
          <MarineDataChip label="PFZ" sublabel="INCOIS Chlorophyll" icon={<Fish className="w-5 h-5" />} />
          <MarineDataChip label="Vessel" sublabel="AIS & Endurance" icon={<Ship className="w-5 h-5" />} />
          <MarineDataChip label="GIS" sublabel="EEZ & Geofences" icon={<MapPin className="w-5 h-5" />} />
        </div>
      </section>

      {/* SECTION 3: WORKSPACES */}
      <section id="workspaces" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orca-cyan">
            SPECIALIZED ROLES
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-orca-navy">
            ONE INTELLIGENCE ENGINE. <br />
            MULTIPLE MARITIME WORKSPACES.
          </h2>
          <p className="text-xs md:text-sm text-orca-navy/70">
            Tailored reasoning guidance & geospatial data layers for every phase of marine operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {ALL_ROLES_LIST.map((role) => (
            <WorkspaceCard key={role.id} role={role} onSelect={handleRoleSelect} />
          ))}
        </div>
      </section>

      {/* SECTION 4: HOW ORCA THINKS (CORE LOOP) */}
      <section id="how-it-works" className="space-y-6 bg-orca-ice/60 p-6 md:p-10 rounded-3xl border border-orca-env">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <BrainCircuit className="w-8 h-8 text-orca-cyan mx-auto mb-2" />
          <h2 className="text-xl md:text-3xl font-extrabold text-orca-navy">HOW ORCA THINKS</h2>
          <p className="text-xs md:text-sm text-orca-navy/70">
            From heterogeneous marine data to mission-safe action.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <Card className="bg-white border-orca-env">
            <span className="text-xs font-extrabold text-orca-cyan uppercase tracking-wider block mb-1">
              01. UNDERSTAND
            </span>
            <h4 className="text-sm font-bold text-orca-navy mb-1">Data Ingestion</h4>
            <p className="text-xs text-orca-navy/70 leading-relaxed">
              Consolidates satellite SST, wind vectors, swell forecasts, and PFZ advisory zones.
            </p>
          </Card>

          <Card className="bg-white border-orca-env">
            <span className="text-xs font-extrabold text-orca-blue uppercase tracking-wider block mb-1">
              02. CORRELATE
            </span>
            <h4 className="text-sm font-bold text-orca-navy mb-1">Mission Context</h4>
            <p className="text-xs text-orca-navy/70 leading-relaxed">
              Cross-references vessel range, departure window, home port, and safety boundaries.
            </p>
          </Card>

          <Card className="bg-white border-orca-env">
            <span className="text-xs font-extrabold text-orca-navy uppercase tracking-wider block mb-1">
              03. REASON
            </span>
            <h4 className="text-sm font-bold text-orca-navy mb-1">Agent Collaboration</h4>
            <p className="text-xs text-orca-navy/70 leading-relaxed">
              Specialized sub-agents evaluate weather safety, economic yield, and hazards in parallel.
            </p>
          </Card>

          <Card className="bg-white border-orca-env border-l-4 border-l-emerald-500">
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider block mb-1">
              04. DECIDE
            </span>
            <h4 className="text-sm font-bold text-orca-navy mb-1">Explainable Advice</h4>
            <p className="text-xs text-orca-navy/70 leading-relaxed">
              Delivers clear GO / CAUTION / AVOID status backed by empirical data evidence.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
