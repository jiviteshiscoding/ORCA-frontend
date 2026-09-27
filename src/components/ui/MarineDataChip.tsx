import React from 'react';

export interface MarineDataChipProps {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export const MarineDataChip: React.FC<MarineDataChipProps> = ({
  label,
  sublabel,
  icon,
}) => {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-orca-env/80 shadow-xs hover:border-orca-cyan/60 transition-all hover:shadow-md group">
      <div className="w-10 h-10 rounded-lg bg-orca-ice text-orca-cyan flex items-center justify-center group-hover:bg-orca-cyan group-hover:text-white transition-colors shrink-0">
        {icon}
      </div>
      <div>
        <h5 className="text-xs font-bold text-orca-navy uppercase tracking-wider">{label}</h5>
        <span className="text-[11px] text-orca-navy/70">{sublabel}</span>
      </div>
    </div>
  );
};
