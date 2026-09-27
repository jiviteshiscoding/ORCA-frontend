import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface SuggestedPromptProps {
  promptText: string;
  onClick: (text: string) => void;
  isPrimary?: boolean;
}

export const SuggestedPrompt: React.FC<SuggestedPromptProps> = ({
  promptText,
  onClick,
  isPrimary = false,
}) => {
  return (
    <button
      onClick={() => onClick(promptText)}
      className={`text-left text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 group cursor-pointer border ${
        isPrimary
          ? 'bg-gradient-to-r from-orca-ice to-white text-orca-navy border-orca-cyan/60 hover:border-orca-cyan shadow-2xs hover:shadow-xs'
          : 'bg-white text-orca-navy/90 border-orca-env/80 hover:bg-orca-ice/50 hover:border-orca-cyan/40'
      }`}
    >
      <div className="flex items-center gap-2">
        {isPrimary && <Sparkles className="w-4 h-4 text-orca-cyan shrink-0 animate-pulse" />}
        <span className="leading-snug">{promptText}</span>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-orca-cyan opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
    </button>
  );
};
