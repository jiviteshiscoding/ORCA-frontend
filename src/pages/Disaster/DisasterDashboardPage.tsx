import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseMap } from '../../components/map/BaseMap';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DecisionHero } from '../../components/ui/DecisionHero';
import { MetricCluster, MetricItem } from '../../components/ui/MetricCluster';
import { ExpandableEvidence } from '../../components/evidence/ExpandableEvidence';
import {
  AlertTriangle,
  Clock,
  Radio,
  BellRing,
  TriangleAlert,
  PhoneCall,
} from 'lucide-react';

const DISASTER_METRICS: MetricItem[] = [
  { label: 'Active Hazards', value: '2', change: 'Level 2 Warning', status: 'warning', progress: 100, detail: '1 High Swell Surge Advisory + 1 Coastal Wind Squall Alert.' },
  { label: 'Affected Sectors', value: '2 Sectors', change: 'Pulicat to Puducherry', status: 'caution', progress: 65, detail: 'North Chennai and Ennore coastal sectors exposed to wave surge.' },
  { label: 'Exposed Vessels', value: '2 Units', change: 'Inside Swell Radius', status: 'danger', progress: 40, detail: 'Blue Wave (transit) and Sea Pearl (trawler) inside 2.2m swell footprint.' },
  { label: 'Max Wave Surge', value: '2.2 m', change: 'Peak at 14:00 Z', status: 'caution', progress: 70, detail: 'High tide coincidence adding +0.4m storm surge to baseline wave height.' },
  { label: 'Coastal Readiness', value: 'STANDBY', change: '100% Prepared', status: 'optimal', progress: 100, detail: 'Coastal defense shelters and rescue craft ready for immediate dispatch.' },
  { label: 'Coast Guard Link', value: 'ENCRYPTED', change: 'Realtime Sync', status: 'optimal', progress: 100, detail: 'Direct VMS link to Coast Guard Command Center active.' },
];

export const DisasterDashboardPage: React.FC = () => {
  const [broadcastState, setBroadcastState] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE');

  const handleBroadcast = () => {
    setBroadcastState('SENDING');
    setTimeout(() => {
      setBroadcastState('SENT');
    }, 1200);
  };

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto animate-fade-in">
      {/* 1. COMMAND DECISION HERO: LEVEL 1 ADVISORY */}
      <DecisionHero
        decision="CAUTION"
        confidence={92}
        title="High Swell Surge & Coastal Wave Warning Active"
        subtitle="Swell heights up to 2.2m expected along North Chennai / Pulicat sector during 14:00 Z high tide"
        recommendedWindow="14:00 Z Peak Impact — Restrict Small Craft Operations"
        rationale="Multi-agent hydrodynamic risk consensus detected wave swell surge overlapping with spring high tide. 2 commercial vessels inside advisory radius notified via AIS broadcast."
        primaryAction={{
          label: broadcastState === 'IDLE' ? 'BROADCAST EMERGENCY ALERT' : broadcastState === 'SENDING' ? 'BROADCASTING...' : 'ALERT SENT ✓',
          onClick: handleBroadcast,
          icon: Radio,
        }}
      />

      {/* 2. DISASTER TELEMETRY STRIP */}
      <MetricCluster
        title="Disaster & Emergency Situational Telemetry"
        subtitle="Active hazards, surge predictions & vessel exposure metrics"
        metrics={DISASTER_METRICS}
      />

      {/* 3. MAIN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: HAZARD & TRACK MAP (60% Desktop Width) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TriangleAlert className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-black text-orange-950 uppercase tracking-wider">
                  Hazard Overlay & Coastal Impact Map
                </h3>
              </div>
              <Badge variant="demo" className="text-[9px]">SWELL SURGE POLYGON DEMO</Badge>
            </div>

            <BaseMap height="460px" />
          </div>

          {/* Risk Progression Timeline Card */}
          <Card className="p-3 space-y-2 border-orange-200 bg-white shadow-xs">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <h4 className="text-xs font-black text-orange-950 uppercase tracking-wider">
                  Hazard Surge Progression Timeline
                </h4>
              </div>
              <span className="text-[10px] text-slate-500 font-mono font-bold">24-Hour Advisory Window</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 space-y-0.5">
                <span className="text-[9px] font-extrabold text-emerald-800 uppercase block">06:00 Z</span>
                <span className="font-mono text-xs font-bold text-emerald-950">1.0 m</span>
                <span className="text-[9px] text-emerald-700 block font-semibold">Normal Sea</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 space-y-0.5">
                <span className="text-[9px] font-extrabold text-amber-800 uppercase block">10:00 Z</span>
                <span className="font-mono text-xs font-bold text-amber-950">1.5 m</span>
                <span className="text-[9px] text-amber-700 block font-semibold">Rising Swell</span>
              </div>
              <div className="p-2 rounded-xl bg-red-50 border border-red-300 space-y-0.5 shadow-2xs">
                <span className="text-[9px] font-black text-red-800 uppercase block">14:00 Z Peak</span>
                <span className="font-mono text-xs font-black text-red-950">2.2 m</span>
                <span className="text-[9px] text-red-700 block font-bold">MAX SURGE</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 space-y-0.5">
                <span className="text-[9px] font-extrabold text-amber-800 uppercase block">18:00 Z</span>
                <span className="font-mono text-xs font-bold text-amber-950">1.4 m</span>
                <span className="text-[9px] text-amber-700 block font-semibold">Receding</span>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: ACTIVE HAZARDS & EMERGENCY RESPONSE (40% Desktop Width) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Hazards Register */}
          <Card className="border-orange-200 p-4 space-y-3 bg-white shadow-xs">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <div>
                  <h4 className="text-xs font-black text-orange-950 uppercase tracking-wider">
                    Active Coastal Hazard Register
                  </h4>
                  <span className="text-[10px] text-orca-navy/60 font-semibold block">
                    Severe weather & surge alerts
                  </span>
                </div>
              </div>
              <Badge variant="warning" className="bg-orange-100 text-orange-900 border-orange-300 text-[9px]">
                2 ACTIVE HAZARDS
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              {/* Hazard 1 */}
              <div className="p-3 rounded-xl bg-red-50/80 border border-red-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-red-600 text-white uppercase">
                    SEVERITY: MEDIUM / HIGH
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Issued 04:00 Z</span>
                </div>
                <h5 className="font-extrabold text-red-950 text-xs">
                  Swell Surge Advisory — Pulicat to Puducherry
                </h5>
                <p className="text-[11px] text-red-900/80 leading-relaxed font-medium">
                  High swell waves of 1.8 to 2.2 meters projected along coastal waters during high tide window.
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono font-bold text-red-900">
                  <span>Center: 13.15°N 80.40°E (35 km Radius)</span>
                  <span>Exposed: 2 Vessels</span>
                </div>
              </div>

              {/* Hazard 2 */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-amber-500 text-amber-950 uppercase">
                    SEVERITY: MODERATE
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Issued 05:30 Z</span>
                </div>
                <h5 className="font-extrabold text-amber-950 text-xs">
                  Coastal Wind Squall Vector — Pulicat Shoals
                </h5>
                <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">
                  Wind speeds reaching 18-22 kts SW with localized sea turbulence near shallow banks.
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono font-bold text-amber-900">
                  <span>Center: 13.35°N 80.55°E</span>
                  <span>Small Craft Warning</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Emergency Response & Actions */}
          <Card variant="flat" className="border-orange-200 p-4 space-y-3 bg-gradient-to-br from-white via-orange-50/30 to-white">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-orange-600" />
                <h5 className="text-xs font-black text-orange-950 uppercase tracking-wider">
                  Emergency Protocol & Interventions
                </h5>
              </div>
              <Badge variant="demo" className="text-[9px]">RESPONSE ROOM</Badge>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-orca-env/60">
                <span className="font-bold text-orca-navy">Coastal Radio Advisory Broadcast</span>
                <span className="text-emerald-700 font-extrabold text-[11px]">ACTIVE (121.5 MHz)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-orca-env/60">
                <span className="font-bold text-orca-navy">Port Harbor Departure Clearance</span>
                <span className="text-amber-800 font-extrabold text-[11px]">HOLD FOR SMALL CRAFT</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-orca-env/60">
                <span className="font-bold text-orca-navy">Coast Guard Station Readiness</span>
                <span className="text-blue-800 font-extrabold text-[11px]">PATROL READY</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <Link to="/disaster/hazards">
                <Button variant="primary" size="sm" className="w-full text-xs font-bold gap-1 py-2 bg-orange-600 hover:bg-orange-700">
                  <TriangleAlert className="w-3.5 h-3.5" />
                  <span>HAZARD LOG</span>
                </Button>
              </Link>
              <Link to="/disaster/alerts">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold gap-1 py-2 border-orange-300 text-orange-950 hover:bg-orange-50">
                  <BellRing className="w-3.5 h-3.5 text-orange-600" />
                  <span>EMERGENCY ALERTS</span>
                </Button>
              </Link>
            </div>
          </Card>

          {/* Progressive Disclosure: Disaster Warning Model & Provenance */}
          <ExpandableEvidence
            title="Emergency Advisory Audit & Data Provenance"
            subtitle="INCOIS swell prediction model & coastal radar verification"
            sourceName="INCOIS High Wave Advisory System + IMD Radar"
            freshnessText="Sync active (Demo Feed)"
            confidence={92}
          >
            <div className="space-y-2 text-xs text-orca-navy">
              <p className="text-[11px] text-orca-navy/80 leading-relaxed font-medium">
                Advisory automatically calculated by ORCA Geo / Safety Agent using INCOIS Wave Watch III hydrodynamic model crossed with IMD marine radar Doppler shifts.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2 bg-white rounded-lg border border-orca-env font-mono text-[10px]">
                  <span className="text-orca-navy/60 block">Primary Sensor</span>
                  <strong>INCOIS Moored Buoy #44012</strong>
                </div>
                <div className="p-2 bg-white rounded-lg border border-orca-env font-mono text-[10px]">
                  <span className="text-orca-navy/60 block">Broadcast Frequency</span>
                  <strong>121.5 MHz Marine Emergency VHF</strong>
                </div>
              </div>
            </div>
          </ExpandableEvidence>
        </div>
      </div>
    </div>
  );
};
