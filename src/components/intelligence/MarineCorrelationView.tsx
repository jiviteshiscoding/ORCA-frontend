import React from 'react';
import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';
import { Thermometer, Waves, Wind, Compass, ArrowRight } from 'lucide-react';

export interface CorrelationInput {
  name: string;
  value: string;
  status: 'SAFE' | 'WARNING' | 'NEUTRAL';
  icon: React.FC<{ className?: string }>;
  contribution: string;
}

export interface MarineCorrelationViewProps {
  decision?: 'GO' | 'CAUTION' | 'AVOID';
  confidence?: number;
  inputs?: CorrelationInput[];
}

const DEFAULT_INPUTS: CorrelationInput[] = [
  {
    name: 'SST Thermal Profile',
    value: '28.5 °C',
    status: 'SAFE',
    icon: Thermometer,
    contribution: 'Optimal chlorophyll synthesis gradient',
  },
  {
    name: 'Phytoplankton Density',
    value: '1.45 mg/m³',
    status: 'SAFE',
    icon: Compass,
    contribution: '89% High PFZ yield probability alignment',
  },
  {
    name: 'Wave Swell Surge',
    value: '1.2 m',
    status: 'WARNING',
    icon: Waves,
    contribution: 'Moderate swell surge after 09:30 AM',
  },
  {
    name: 'Wind Velocity Vector',
    value: '14 kts SW',
    status: 'SAFE',
    icon: Wind,
    contribution: 'Within safe vessel stability limits',
  },
];

export const MarineCorrelationView: React.FC<MarineCorrelationViewProps> = ({
  decision = 'CAUTION',
  confidence = 91,
  inputs = DEFAULT_INPUTS,
}) => {
  return (
    <Card className="p-4 space-y-3 border-orca-env/80 bg-gradient-to-br from-white via-orca-ice/20 to-white shadow-xs">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">
            Multi-Source Marine Condition Correlation Diagram
          </h4>
          <span className="text-[10px] text-orca-navy/60 font-semibold block">
            Visual convergence of 5 independent data streams into unified decision rules
          </span>
        </div>
        <StatusIndicator status="DEMO" />
      </div>

      {/* Convergence Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-1">
        {/* Left Inputs Stream (7 Cols) */}
        <div className="md:col-span-7 space-y-2">
          {inputs.map((inp, idx) => {
            const IconComponent = inp.icon;
            return (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white border border-orca-env/70 shadow-2xs flex items-center justify-between transition-all hover:border-orca-cyan/50"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${inp.status === 'SAFE' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-orca-navy text-xs block">{inp.name}</span>
                    <span className="text-[10px] text-orca-navy/60 block">{inp.contribution}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                      inp.status === 'SAFE'
                        ? 'text-emerald-800 bg-emerald-100'
                        : 'text-amber-800 bg-amber-100'
                    }`}
                  >
                    {inp.value}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-orca-cyan hidden sm:block" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Convergence Hub & Final Decision Output (5 Cols) */}
        <div className="md:col-span-5 flex flex-col justify-center h-full">
          <div className="p-4 rounded-2xl bg-orca-navy text-white space-y-2 border border-orca-cyan/40 shadow-md text-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-orca-cyan block">
              ORCA REASONING SYNTHESIS
            </span>

            <div className="py-1">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  decision === 'GO'
                    ? 'bg-emerald-400 text-orca-deep'
                    : decision === 'CAUTION'
                    ? 'bg-amber-400 text-amber-950'
                    : 'bg-red-500 text-white'
                }`}
              >
                {decision === 'CAUTION' ? 'GO WITH CAUTION' : decision}
              </span>
            </div>

            <div className="text-[11px] font-mono text-orca-ice/90">
              Decision Confidence: <strong className="text-white font-bold">{confidence}%</strong>
            </div>

            <p className="text-[10px] text-orca-ice/70 leading-relaxed pt-1 border-t border-white/10 font-sans">
              "SST & PFZ alignment support high yield potential within 25 NM limit. Wave surge elevation after 09:30 AM dictates Return by 11:30 AM constraint."
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
