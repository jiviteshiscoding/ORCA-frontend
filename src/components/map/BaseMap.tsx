import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import { StatusIndicator } from '../ui/StatusIndicator';
import { Layers, Anchor, AlertTriangle, Fish, Navigation } from 'lucide-react';
import demoPfz from '../../data/demo/pfz.json';
import demoVessels from '../../data/demo/vessels.json';
import demoHazards from '../../data/demo/hazards.json';

// Fix Leaflet marker icon paths in bundler environments
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export interface MapLayerState {
  vessel: boolean;
  pfz: boolean;
  route: boolean;
  hazards: boolean;
  weather: boolean;
}

export interface BaseMapProps {
  center?: [number, number]; // [lat, lng]
  zoom?: number;
  height?: string;
  showControls?: boolean;
  children?: React.ReactNode;
}

// Coordinates
const HOME_PORT: [number, number] = [13.0827, 80.2707]; // Chennai Harbour
const TARGET_PFZ_CENTER: [number, number] = [13.25, 80.52];

// Route polyline connecting Home Port -> Target PFZ Zone
const ROUTE_POINTS: [number, number][] = [
  HOME_PORT,
  [13.15, 80.38],
  [13.22, 80.46],
  TARGET_PFZ_CENTER,
];

// PFZ Polygon coordinates
const PFZ_POLYGON_COORDS: [number, number][] = [
  [13.25, 80.45],
  [13.35, 80.55],
  [13.20, 80.60],
  [13.15, 80.50],
];

export const BaseMap: React.FC<BaseMapProps> = ({
  center = [13.18, 80.38],
  zoom = 10,
  height = '480px',
  showControls = true,
  children,
}) => {
  const [layers, setLayers] = useState<MapLayerState>({
    vessel: true,
    pfz: true,
    route: true,
    hazards: true,
    weather: true,
  });

  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  const toggleLayer = (layerKey: keyof MapLayerState) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const activeVessel = demoVessels.vessels[0];
  const activePfz = demoPfz.zones[0];
  const activeHazard = demoHazards.hazards[0];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-orca-env/80 shadow-sm" style={{ height }}>
      {/* Top Status & Layer Control Bar */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-2">
        <StatusIndicator status="DEMO" />

        {showControls && (
          <div className="relative">
            <button
              onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-orca-env text-xs font-bold text-orca-navy shadow-sm hover:bg-white transition-colors"
            >
              <Layers className="w-4 h-4 text-orca-cyan" />
              <span>Map Layers</span>
            </button>

            {/* Layer Control Dropdown Panel */}
            {isLayerMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-orca-env p-3 z-[1001] text-xs space-y-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-orca-env/40 pb-2">
                  <span className="font-bold text-orca-navy uppercase tracking-wider text-[10px]">
                    Interactive Layers
                  </span>
                  <button
                    onClick={() => setIsLayerMenuOpen(false)}
                    className="text-orca-navy/50 hover:text-orca-navy font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-1.5 font-semibold text-orca-navy">
                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-orca-ice/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Anchor className="w-3.5 h-3.5 text-orca-cyan" /> Vessel Marker
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.vessel}
                      onChange={() => toggleLayer('vessel')}
                      className="rounded text-orca-cyan focus:ring-orca-cyan"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-orca-ice/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Fish className="w-3.5 h-3.5 text-emerald-600" /> PFZ Fishing Zone
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.pfz}
                      onChange={() => toggleLayer('pfz')}
                      className="rounded text-orca-cyan focus:ring-orca-cyan"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-orca-ice/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Navigation className="w-3.5 h-3.5 text-orca-blue" /> Voyage Route
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.route}
                      onChange={() => toggleLayer('route')}
                      className="rounded text-orca-cyan focus:ring-orca-cyan"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-orca-ice/60 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Swell Hazards
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.hazards}
                      onChange={() => toggleLayer('hazards')}
                      className="rounded text-orca-cyan focus:ring-orca-cyan"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Leaflet Map Container */}
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 1. Home Port Marker */}
        <Marker position={HOME_PORT}>
          <Popup>
            <div className="p-1 space-y-1">
              <div className="flex items-center gap-1.5 text-orca-navy font-bold text-xs">
                <Anchor className="w-3.5 h-3.5 text-orca-cyan" />
                <span>Chennai Fishing Harbour</span>
              </div>
              <p className="text-[11px] text-slate-600">Home Port & Departure Base</p>
              <span className="inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                DEMO DATA
              </span>
            </div>
          </Popup>
        </Marker>

        {/* 2. Active Vessel Marker */}
        {layers.vessel && (
          <Marker position={[activeVessel.currentPosition.lat, activeVessel.currentPosition.lng]}>
            <Popup>
              <div className="p-1 space-y-1.5 min-w-[180px]">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-orca-navy">{activeVessel.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                    UNDERWAY
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 space-y-0.5 font-mono">
                  <div>Type: <span className="font-sans font-semibold">{activeVessel.type}</span></div>
                  <div>Speed: <span className="font-bold text-orca-navy">{activeVessel.speedKts} kts</span></div>
                  <div>Heading: <span className="font-bold text-orca-navy">{activeVessel.headingDeg}° NE</span></div>
                </div>
                <div className="pt-1 border-t border-slate-200 text-[9px] text-amber-800 font-bold">
                  DATA SOURCE: DEMO AIS VMS
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* 3. PFZ Zone Polygon Overlay */}
        {layers.pfz && (
          <Polygon
            positions={PFZ_POLYGON_COORDS}
            pathOptions={{
              color: '#10B981',
              fillColor: '#10B981',
              fillOpacity: 0.25,
              weight: 2,
              dashArray: '5, 5',
            }}
          >
            <Popup>
              <div className="p-1 space-y-1 min-w-[200px]">
                <div className="flex items-center justify-between border-b pb-1 border-emerald-200">
                  <span className="font-bold text-xs text-emerald-900">{activePfz.title}</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                    92% CONFIDENCE
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 space-y-0.5 font-mono">
                  <div>Chlorophyll: <span className="font-bold text-emerald-800">{activePfz.chlorophyllMgM3} mg/m³</span></div>
                  <div>SST Temp: <span className="font-bold text-orca-navy">{activePfz.sstC}°C</span></div>
                  <div>Yield Forecast: <span className="font-bold text-emerald-700 uppercase">HIGH YIELD</span></div>
                </div>
                <div className="pt-1 border-t border-slate-200 text-[9px] text-amber-800 font-bold">
                  SOURCE: DEMO INCOIS MODEL
                </div>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* 4. Voyage Route Polyline */}
        {layers.route && (
          <Polyline
            positions={ROUTE_POINTS}
            pathOptions={{
              color: '#20B8D8',
              weight: 3,
              dashArray: '6, 6',
            }}
          />
        )}

        {/* 5. Swell Surge Hazard Circle */}
        {layers.hazards && (
          <Circle
            center={[activeHazard.center.lat, activeHazard.center.lng]}
            radius={activeHazard.radiusKm * 400} // Radius scaled for visual clarity
            pathOptions={{
              color: '#EF4444',
              fillColor: '#EF4444',
              fillOpacity: 0.15,
              weight: 1.5,
            }}
          >
            <Popup>
              <div className="p-1 space-y-1">
                <div className="flex items-center gap-1.5 text-red-900 font-bold text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>{activeHazard.title}</span>
                </div>
                <p className="text-[11px] text-slate-700">{activeHazard.description}</p>
                <span className="inline-block px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[9px] font-bold">
                  SEVERITY: {activeHazard.severity} (DEMO)
                </span>
              </div>
            </Popup>
          </Circle>
        )}

        {children}
      </MapContainer>
    </div>
  );
};
