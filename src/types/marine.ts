export type DataOriginState = 'DEMO' | 'CACHED' | 'LIVE';

export interface LocationPoint {
  lat: number;
  lng: number;
  name?: string;
}

export interface WeatherDataPoint {
  dataType: DataOriginState;
  timestamp: string;
  location: LocationPoint;
  windSpeedKts: number;
  windDirectionDeg: number;
  waveHeightM: number;
  wavePeriodSec: number;
  visibilityKm: number;
  seaSurfaceTempC: number;
  precipitationProbability: number;
}

export interface PFZZone {
  id: string;
  dataType: DataOriginState;
  title: string;
  coordinates: [number, number][];
  chlorophyllMgM3: number;
  sstC: number;
  confidenceScore: number;
  validUntil: string;
}

export interface MarineHazard {
  id: string;
  dataType: DataOriginState;
  type: 'CYCLONE_WARNING' | 'HIGH_WAVE' | 'RESTRICTED_ZONE' | 'REEF_HAZARD' | 'WEATHER_FRONT';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  center: LocationPoint;
  radiusKm: number;
  issuedAt: string;
}

export interface VesselTrack {
  id: string;
  name: string;
  type: string;
  dataType: DataOriginState;
  currentPosition: LocationPoint;
  headingDeg: number;
  speedKts: number;
  lastUpdated: string;
}
