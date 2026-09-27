import React from 'react';

export const MarineHeroGraphic: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#073B66] via-[#062B4A] to-[#041d33] border border-orca-cyan/40 shadow-xl group">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#20B8D8_1px,transparent_1px),linear-gradient(to_bottom,#20B8D8_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* SVG Marine Flow Wave & Geo Network */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#20B8D8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1685C7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#073B66" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="pfzGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#20B8D8" stopOpacity="0.15" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ocean Contour Waves */}
        <path d="M 0,350 C 150,280 300,420 500,320 C 650,250 750,340 800,300 L 800,500 L 0,500 Z" fill="url(#waveGlow)" />
        <path d="M 0,280 C 200,200 350,360 550,240 C 680,180 740,260 800,220 L 800,500 L 0,500 Z" fill="url(#waveGlow)" opacity="0.5" />

        {/* Simulated Potential Fishing Zone (PFZ) Overlay Polygon */}
        <polygon points="260,180 440,140 540,260 380,320 260,180" fill="url(#pfzGlow)" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 3" filter="url(#glow)" />

        {/* Vessel Route Navigation Path */}
        <path d="M 120,380 Q 240,260 400,230 T 680,140" fill="none" stroke="#20B8D8" strokeWidth="2.5" strokeDasharray="6 4" filter="url(#glow)" />

        {/* Network Nodes */}
        <g filter="url(#glow)">
          {/* Node 1: Origin Port */}
          <circle cx="120" cy="380" r="7" fill="#073B66" stroke="#20B8D8" strokeWidth="2" />
          <circle cx="120" cy="380" r="3" fill="#20B8D8" />

          {/* Node 2: PFZ Hotspot */}
          <circle cx="400" cy="230" r="9" fill="#10B981" fillOpacity="0.3" />
          <circle cx="400" cy="230" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Node 3: Target Waypoint */}
          <circle cx="680" cy="140" r="7" fill="#20B8D8" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Connecting Lines */}
          <line x1="400" y1="230" x2="480" y2="120" stroke="#20B8D8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="480" cy="120" r="4" fill="#20B8D8" />
        </g>
      </svg>

      {/* Overlay Metric Badges */}
      <div className="absolute top-4 left-4 bg-orca-deep/80 backdrop-blur-md px-3 py-2 rounded-xl border border-orca-cyan/40 text-xs text-white space-y-0.5 shadow-md">
        <div className="flex items-center gap-1.5 text-orca-cyan font-bold text-[11px] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-orca-cyan animate-ping" />
          Live Intelligence Stream
        </div>
        <div className="font-mono text-[11px] text-orca-ice">
          Pos: <span className="text-white">13.08°N 80.27°E</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-orca-deep/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-500/40 text-xs text-white flex items-center gap-3 shadow-md">
        <div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">PFZ Confidence</span>
          <span className="text-base font-extrabold text-white">92.4%</span>
        </div>
        <div className="h-6 w-px bg-white/20" />
        <div>
          <span className="text-[10px] text-orca-cyan font-bold uppercase tracking-wider block">Sea State</span>
          <span className="text-xs font-bold text-orca-ice">0.8m Moderate</span>
        </div>
      </div>
    </div>
  );
};
