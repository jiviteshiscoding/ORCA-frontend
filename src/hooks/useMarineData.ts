import { useState } from 'react';
import demoPfz from '../data/demo/pfz.json';
import demoWeather from '../data/demo/weather.json';
import demoOcean from '../data/demo/ocean.json';
import demoHazards from '../data/demo/hazards.json';
import demoVessels from '../data/demo/vessels.json';
import { DecisionExplanation } from '../types/decision';

export interface MarineDataHookResult {
  weather: typeof demoWeather.currentPoint;
  ocean: typeof demoOcean.oceanState;
  pfzZones: typeof demoPfz.zones;
  hazards: typeof demoHazards.hazards;
  vessels: typeof demoVessels.vessels;
  decision: DecisionExplanation;
  recommendedWindow: {
    start: string;
    end: string;
    description: string;
    waveStatus: string;
    windStatus: string;
    pfzConfidence: string;
  };
}

export function useMarineData(): MarineDataHookResult {
  const [data] = useState<MarineDataHookResult>({
    weather: demoWeather.currentPoint as never,
    ocean: demoOcean.oceanState as never,
    pfzZones: demoPfz.zones as never,
    hazards: demoHazards.hazards as never,
    vessels: demoVessels.vessels as never,
    decision: {
      overallDecision: 'CAUTION',
      confidence: 91,
      primaryReason:
        'Weather and PFZ conditions currently support offshore fishing deployment within 25 NM. Increased swell risk should be monitored beyond the recommended operating window.',
      factors: [
        {
          name: 'Sea Surface Temperature',
          value: '28.5°C',
          status: 'SAFE',
          impact: 'Optimal chlorophyll production range',
        },
        {
          name: 'Wave Swell',
          value: '1.2 m',
          status: 'WARNING',
          impact: 'Moderate swell surge expected beyond 30 NM',
        },
        {
          name: 'PFZ Hotspot Alignment',
          value: '89% High Yield',
          status: 'SAFE',
          impact: 'Chlorophyll 1.45 mg/m³ detected offshore',
        },
        {
          name: 'Wind Speed & Direction',
          value: '14 kts SW',
          status: 'SAFE',
          impact: 'Within vessel stability limits',
        },
        {
          name: 'Maximum Distance Constraint',
          value: '25 NM Limit',
          status: 'NEUTRAL',
          impact: 'Recommended return by 11:30 AM',
        },
      ],
      timestamp: new Date().toISOString(),
      dataType: 'DEMO',
    },
    recommendedWindow: {
      start: '05:30 AM',
      end: '09:30 AM',
      description: 'Best sea conditions & highest PFZ yield probability expected during this window.',
      waveStatus: '1.1m Moderate',
      windStatus: '12-14 kts SW',
      pfzConfidence: '92% High',
    },
  });

  return data;
}
