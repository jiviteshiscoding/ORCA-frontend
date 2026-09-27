import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { LineChart, Calendar, Info } from 'lucide-react';

export interface DataPoint {
  date: string;
  sst: number;
  chlorophyll: number;
  waveHeight: number;
}

const DEMO_TIME_SERIES: DataPoint[] = [
  { date: 'Mon', sst: 27.8, chlorophyll: 1.12, waveHeight: 1.0 },
  { date: 'Tue', sst: 28.1, chlorophyll: 1.25, waveHeight: 1.1 },
  { date: 'Wed', sst: 28.3, chlorophyll: 1.38, waveHeight: 1.4 },
  { date: 'Thu', sst: 28.5, chlorophyll: 1.45, waveHeight: 1.2 },
  { date: 'Fri', sst: 28.4, chlorophyll: 1.52, waveHeight: 1.6 },
  { date: 'Sat', sst: 28.2, chlorophyll: 1.40, waveHeight: 1.3 },
  { date: 'Sun', sst: 28.0, chlorophyll: 1.30, waveHeight: 1.1 },
];

export interface TimeSeriesChartProps {
  title?: string;
  accentColor?: string;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  title = 'Oceanographic Time-Series Variation (7-Day Trend)',
  accentColor = '#8B5CF6',
}) => {
  const [activeMetric, setActiveMetric] = useState<'sst' | 'chlorophyll' | 'waveHeight'>('sst');
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  const getMetricDetails = () => {
    switch (activeMetric) {
      case 'sst':
        return { label: 'Sea Surface Temp (°C)', unit: '°C', color: accentColor, min: 27, max: 29 };
      case 'chlorophyll':
        return { label: 'Chlorophyll-a (mg/m³)', unit: 'mg/m³', color: '#10B981', min: 1.0, max: 1.8 };
      case 'waveHeight':
        return { label: 'Wave Swell Height (m)', unit: 'm', color: '#1685C7', min: 0.5, max: 2.0 };
    }
  };

  const metric = getMetricDetails();

  // Calculate SVG polyline points
  const width = 500;
  const height = 140;
  const padding = 20;

  const getX = (index: number) => padding + (index * (width - 2 * padding)) / (DEMO_TIME_SERIES.length - 1);
  const getY = (value: number) => {
    const range = metric.max - metric.min;
    const normalized = (value - metric.min) / range;
    return height - padding - normalized * (height - 2 * padding);
  };

  const polylinePoints = DEMO_TIME_SERIES.map((p, i) => {
    const val = p[activeMetric];
    return `${getX(i)},${getY(val)}`;
  }).join(' ');

  return (
    <Card className="p-4 space-y-3 border-orca-env/80 bg-white shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orca-env/60 pb-2.5">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">{title}</h4>
            <span className="text-[10px] text-orca-navy/60 font-semibold block">
              Multi-source ocean parameter correlation • DEMO SNAPSHOT
            </span>
          </div>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center gap-1 bg-orca-ice/80 p-1 rounded-xl border border-orca-env/60 text-xs">
          <button
            onClick={() => setActiveMetric('sst')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
              activeMetric === 'sst'
                ? 'bg-white shadow-2xs text-orca-navy font-extrabold'
                : 'text-orca-navy/70 hover:text-orca-navy'
            }`}
          >
            SST (°C)
          </button>
          <button
            onClick={() => setActiveMetric('chlorophyll')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
              activeMetric === 'chlorophyll'
                ? 'bg-white shadow-2xs text-emerald-800 font-extrabold'
                : 'text-orca-navy/70 hover:text-orca-navy'
            }`}
          >
            Chlorophyll
          </button>
          <button
            onClick={() => setActiveMetric('waveHeight')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
              activeMetric === 'waveHeight'
                ? 'bg-white shadow-2xs text-blue-800 font-extrabold'
                : 'text-orca-navy/70 hover:text-orca-navy'
            }`}
          >
            Wave Swell
          </button>
        </div>
      </div>

      {/* Interactive SVG Line Graph */}
      <div className="relative w-full bg-gradient-to-b from-orca-ice/40 to-white rounded-xl p-2 border border-orca-env/50">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36 overflow-visible">
          {/* Horizontal grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#CBD5E1" />

          {/* Area fill */}
          <polygon
            points={`${padding},${height - padding} ${polylinePoints} ${width - padding},${height - padding}`}
            fill={metric.color}
            fillOpacity="0.12"
          />

          {/* Polyline */}
          <polyline
            fill="none"
            stroke={metric.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePoints}
          />

          {/* Data Points */}
          {DEMO_TIME_SERIES.map((p, i) => {
            const val = p[activeMetric];
            const cx = getX(i);
            const cy = getY(val);
            const isHovered = hoveredPoint?.date === p.date;

            return (
              <g key={p.date} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(p)} onMouseLeave={() => setHoveredPoint(null)}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? '6' : '4'}
                  fill={isHovered ? metric.color : '#FFFFFF'}
                  stroke={metric.color}
                  strokeWidth="2.5"
                  className="transition-all"
                />
                <text
                  x={cx}
                  y={height - 4}
                  textAnchor="middle"
                  className="text-[10px] font-bold fill-slate-500 font-mono"
                >
                  {p.date}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div className="absolute top-2 right-2 bg-orca-navy text-white text-[11px] px-2.5 py-1.5 rounded-lg shadow-md font-mono z-10 flex items-center gap-2 animate-in fade-in duration-100">
            <span className="font-bold text-orca-cyan">{hoveredPoint.date}:</span>
            <span>
              {activeMetric.toUpperCase()}: <strong>{hoveredPoint[activeMetric]} {metric.unit}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Chart Footer Context */}
      <div className="flex items-center justify-between text-[11px] text-orca-navy/70 pt-1 border-t border-orca-env/40">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-orca-cyan" />
          <span>7-Day Rolling Observation Window</span>
        </div>
        <div className="flex items-center gap-1 font-mono font-bold text-[10px] text-amber-800">
          <Info className="w-3 h-3 text-amber-600" />
          <span>INCOIS + MODIS SATELLITE DEMO STREAM</span>
        </div>
      </div>
    </Card>
  );
};
