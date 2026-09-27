import React from 'react';

export interface ORCALogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtag?: boolean;
  className?: string;
  lightMode?: boolean;
}

export const ORCALogo: React.FC<ORCALogoProps> = ({
  size = 'md',
  showSubtag = true,
  className = '',
  lightMode = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const subTextSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        alt="ORCA Logo"
        className={`${iconSizes[size]} object-contain drop-shadow-xs rounded-xl bg-white/10 p-0.5`}
      />
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-wider ${textSizes[size]} ${
            lightMode ? 'text-orca-navy' : 'text-white'
          }`}
        >
          ORCA
        </span>
        {showSubtag && (
          <span
            className={`font-bold tracking-widest uppercase ${subTextSizes[size]} ${
              lightMode ? 'text-orca-blue' : 'text-orca-cyan'
            } mt-0.5`}
          >
            MultiAgent
          </span>
        )}
      </div>
    </div>
  );
};
