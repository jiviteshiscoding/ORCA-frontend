import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseMap } from '../../components/map/BaseMap';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusIndicator } from '../../components/ui/StatusIndicator';
import { MetricCluster, MetricItem } from '../../components/ui/MetricCluster';
import { VesselDetailDrawer, VesselData } from '../../components/operator/VesselDetailDrawer';
import {
  Ship,
  Navigation,
  MapPin,
  Bell,
  Radio,
  ShieldCheck,
} from 'lucide-react';

const FLEET_DEMO_VESSELS: VesselData[] = [
  {
    id: 'ves-01',
    name: 'Sea Pearl',
    type: 'Mechanized Trawler',
    currentPosition: { lat: 13.12, lng: 80.35 },
    headingDeg: 120,
    speedKts: 8.4,
    status: 'UNDERWAY',
    homePort: 'Chennai Fishing Harbour',
    destination: 'PFZ Zone Alpha',
    waveExposure: '1.2m Moderate Swell',
    windExposure: '14 kts SW Vector',
    clearanceScore: 92,
  },
  {
    id: 'ves-02',
    name: 'Ocean Guardian',
    type: 'Patrol Vessel',
    currentPosition: { lat: 13.28, lng: 80.48 },
    headingDeg: 45,
    speedKts: 14.2,
    status: 'PATROL',
    homePort: 'Chennai Coast Guard Pier',
    destination: 'Northern Patrol Sector',
    waveExposure: '1.4m Swell Surge',
    windExposure: '16 kts SW Vector',
    clearanceScore: 98,
  },
  {
    id: 'ves-03',
    name: 'Blue Wave',
    type: 'Commercial Transit',
    currentPosition: { lat: 13.15, lng: 80.40 },
    headingDeg: 90,
    speedKts: 10.1,
    status: 'CAUTION',
    homePort: 'Ennore Port',
    destination: 'Deep Sea Corridor',
    waveExposure: '2.2m Heavy Swell',
    windExposure: '18 kts SW Vector',
    clearanceScore: 78,
  },
  {
    id: 'ves-04',
    name: 'Coastal Sentinel',
    type: 'Tug & Escort',
    currentPosition: { lat: 13.08, lng: 80.30 },
    headingDeg: 180,
    speedKts: 12.0,
    status: 'UNDERWAY',
    homePort: 'Chennai Port Trust',
    destination: 'Outer Anchorage',
    waveExposure: '1.0m Normal Sea',
    windExposure: '12 kts SW Vector',
    clearanceScore: 95,
  },
  {
    id: 'ves-05',
    name: 'Marina Pride',
    type: 'Artisanal Support',
    currentPosition: { lat: 13.05, lng: 80.28 },
    headingDeg: 0,
    speedKts: 0.0,
    status: 'IN PORT',
    homePort: 'Royapuram Pier',
    destination: 'Docked',
    waveExposure: '0.4m Harbor Calm',
    windExposure: '8 kts SW Vector',
    clearanceScore: 100,
  },
];

const OPERATOR_METRICS: MetricItem[] = [
  { label: 'Total Fleet', value: '5', change: '100% AIS Active', status: 'optimal', progress: 100, detail: '5 of 5 vessels transmitting AIS Class-A and Class-B signals to Coast Guard server.' },
  { label: 'Underway Vessels', value: '3', change: '60% in Transit', status: 'optimal', progress: 60, detail: '3 units active in transit: Sea Pearl, Ocean Guardian, Coastal Sentinel.' },
  { label: 'Route Caution', value: '1', change: 'Blue Wave', status: 'warning', progress: 20, detail: 'Blue Wave traversing 2.2m swell surge area at 13.15°N 80.40°E.' },
  { label: 'Avg Fleet Speed', value: '11.2 kts', change: 'Optimal Range', status: 'optimal', progress: 75, detail: 'Average speed within fuel economy and wave safety threshold (8-15 kts).' },
  { label: 'Swell Advisory', value: '1.8 m', change: 'Moderate Swell', status: 'caution', progress: 50, detail: 'INCOIS Wave Watch III buoy reporting 1.8m swell from SW direction.' },
  { label: 'Route Safety Index', value: '94%', change: 'SECURE', status: 'optimal', progress: 94, detail: 'Integrated security clearance across Chennai & Ennore shipping corridors.' },
];

export const OperatorDashboardPage: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState<VesselData | null>(null);
  const [alertFilter, setAlertFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING'>('ALL');

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto animate-fade-in">
      {/* 1. OPERATOR TELEMETRY STRIP */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-orca-navy uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Ship className="w-4 h-4 text-orca-blue" />
              Maritime Operator Fleet Coordination Console
            </span>
            <StatusIndicator status="DEMO" />
          </div>
          <span className="text-orca-navy/70 hidden sm:inline font-mono text-[11px]">
            Sector: <strong>Chennai Traffic Corridor (13.08°N 80.27°E)</strong>
          </span>
        </div>

        <MetricCluster
          title="Fleet Operational Telemetry & Safety Metrics"
          subtitle="Real-time AIS feeds, swell exposure & route clearance index"
          metrics={OPERATOR_METRICS}
        />
      </div>

      {/* 2. MAIN OPERATOR WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: SPATIAL FLEET MAP (60% Desktop Width) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orca-blue" />
                <h3 className="text-sm font-black text-orca-navy uppercase tracking-wider">
                  Spatial Fleet & AIS Coordination Map
                </h3>
              </div>
              <span className="text-[11px] text-orca-navy/60 font-semibold hidden sm:inline">
                Click vessel marker or list item for telemetry
              </span>
            </div>

            <BaseMap height="480px" />
          </div>

          {/* Active Fleet Quick Summary Table */}
          <Card className="p-3 space-y-2 border-orca-env bg-white shadow-xs">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-orca-blue animate-pulse" />
                <h4 className="text-xs font-black text-orca-navy uppercase tracking-wider">
                  Fleet Units Overview ({FLEET_DEMO_VESSELS.length} Monitored)
                </h4>
              </div>
              <Badge variant="demo" className="text-[9px]">AIS REALTIME SNAPSHOT</Badge>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {FLEET_DEMO_VESSELS.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVessel(v)}
                  className={`py-2 px-2 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    selectedVessel?.id === v.id
                      ? 'bg-orca-ice border border-orca-blue/40 font-bold'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Ship
                      className={`w-4 h-4 ${
                        v.status === 'UNDERWAY'
                          ? 'text-emerald-600'
                          : v.status === 'CAUTION'
                          ? 'text-amber-600'
                          : v.status === 'PATROL'
                          ? 'text-blue-600'
                          : 'text-slate-400'
                      }`}
                    />
                    <div>
                      <span className="font-extrabold text-orca-navy block text-xs">{v.name}</span>
                      <span className="text-[10px] text-orca-navy/60 font-mono">{v.type} • {v.homePort}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div className="font-mono text-[11px]">
                      <span className="font-bold text-orca-navy">{v.speedKts} kts</span>
                      <span className="text-[10px] text-orca-navy/60 block">{v.headingDeg}° NE</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        v.status === 'UNDERWAY'
                          ? 'bg-emerald-100 text-emerald-800'
                          : v.status === 'CAUTION'
                          ? 'bg-amber-100 text-amber-800'
                          : v.status === 'PATROL'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: OPERATIONAL ALERTS & ROUTE EXCEPTIONS (40% Desktop Width) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Operational Alert Console */}
          <Card className="border-orca-blue/30 p-4 space-y-3 bg-white shadow-xs">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <div>
                  <h4 className="text-xs font-black text-orca-navy uppercase tracking-wider">
                    Fleet Operational Alerts
                  </h4>
                  <span className="text-[10px] text-orca-navy/60 font-semibold block">
                    Real-time safety & route exception queue
                  </span>
                </div>
              </div>

              {/* Alert Filter Tabs */}
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <button
                  onClick={() => setAlertFilter('ALL')}
                  className={`px-2 py-0.5 rounded-md ${
                    alertFilter === 'ALL' ? 'bg-orca-navy text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  ALL
                </button>
                <button
                  onClick={() => setAlertFilter('CRITICAL')}
                  className={`px-2 py-0.5 rounded-md ${
                    alertFilter === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  CRITICAL
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {/* Alert Card 1 */}
              {(alertFilter === 'ALL' || alertFilter === 'CRITICAL') && (
                <div className="p-3 rounded-xl bg-red-50/70 border border-red-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-red-600 text-white uppercase">
                      CRITICAL • ROUTE HAZARD
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">08:42:00 Z</span>
                  </div>
                  <h5 className="font-bold text-red-950 text-xs">
                    Swell Surge Intersection — Blue Wave (13.15°N, 80.40°E)
                  </h5>
                  <p className="text-[11px] text-red-900/80 leading-relaxed font-medium">
                    2.2m swell wave surge detected intersecting commercial transit corridor. Recommended speed reduction to 8 kts.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[10px] font-bold text-red-800">
                    <span>AFFECTED: Blue Wave (ves-03)</span>
                    <button
                      onClick={() => setSelectedVessel(FLEET_DEMO_VESSELS[2])}
                      className="underline text-red-900 font-extrabold hover:text-red-700"
                    >
                      Inspect Vessel →
                    </button>
                  </div>
                </div>
              )}

              {/* Alert Card 2 */}
              {alertFilter === 'ALL' && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-amber-500 text-amber-950 uppercase">
                      WARNING • WEATHER
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">07:15:00 Z</span>
                  </div>
                  <h5 className="font-bold text-amber-950 text-xs">
                    Wind Gust Advisory — Pulicat Offshore Sector
                  </h5>
                  <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">
                    Wind vectors reaching 18 kts SW near Pulicat Shoal. All small craft advised to maintain 10 NM coastal buffer.
                  </p>
                  <div className="pt-1 text-[10px] font-bold text-amber-800">
                    AFFECTED: Sea Pearl (ves-01), Ocean Guardian (ves-02)
                  </div>
                </div>
              )}

              {/* Alert Card 3 */}
              {alertFilter === 'ALL' && (
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-blue-600 text-white uppercase">
                      INFO • GEOFENCE
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">06:00:00 Z</span>
                  </div>
                  <h5 className="font-bold text-blue-950 text-xs">
                    Coastal Sentinel Entry — Restricted Zone Patrol
                  </h5>
                  <p className="text-[11px] text-blue-900/80 leading-relaxed font-medium">
                    Patrol unit verified inside Marine Security Buffer. Authorization active for routine inspection.
                  </p>
                  <div className="pt-1 text-[10px] font-bold text-blue-800">
                    STATUS: Authorized Coast Guard Patrol
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Route Clearance & Operational Actions */}
          <Card variant="flat" className="border-orca-env p-4 space-y-3 bg-gradient-to-br from-white via-orca-ice/30 to-white">
            <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h5 className="text-xs font-black text-orca-navy uppercase tracking-wider">
                  Harbor & Route Clearance Matrix
                </h5>
              </div>
              <Badge variant="success" className="text-[9px]">94% SECURE</Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-orca-env/60">
                <span className="font-bold text-orca-navy text-xs">Chennai Port Entrance</span>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">CLEAR</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-orca-env/60">
                <span className="font-bold text-orca-navy text-xs">Ennore North Shipping Channel</span>
                <span className="font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">MODERATE SWELL</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-orca-env/60">
                <span className="font-bold text-orca-navy text-xs">Deep Sea Fishing Route Alpha</span>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">OPTIMAL</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
              <Link to="/operator/missions">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold gap-1 py-2">
                  <Navigation className="w-3.5 h-3.5 text-orca-blue" />
                  <span>ACTIVE MISSIONS</span>
                </Button>
              </Link>
              <Link to="/operator/alerts">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold gap-1 py-2">
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  <span>FLEET ALERTS</span>
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Selected Vessel Telemetry Detail Drawer Modal */}
      <VesselDetailDrawer vessel={selectedVessel} onClose={() => setSelectedVessel(null)} />
    </div>
  );
};
