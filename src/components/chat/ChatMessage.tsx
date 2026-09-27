import React from 'react';
import { User } from 'lucide-react';

export interface ChatMessageProps {
  sender: 'user' | 'orca';
  text: string;
  timestamp?: string;
  children?: React.ReactNode;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  text,
  timestamp = 'Just now',
  children,
}) => {
  const isUser = sender === 'user';

  return (
    <div
      className={`flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar Icon */}
      {isUser ? (
        <div className="w-8 h-8 rounded-xl bg-orca-navy text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
          <User className="w-4 h-4 text-orca-cyan" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-xl bg-orca-deep p-1 flex items-center justify-center shrink-0 shadow-2xs">
          <img src="/logo.png" alt="ORCA" className="w-full h-full object-contain" />
        </div>
      )}

      {/* Message Content Bubble */}
      <div className={`max-w-[85%] sm:max-w-[78%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 text-[10px] text-orca-navy/50 px-1 font-mono">
          <span className="font-bold text-orca-navy">{isUser ? 'You (Captain)' : 'ORCA Reasoning Engine'}</span>
          <span>•</span>
          <span>{timestamp}</span>
        </div>

        <div
          className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
            isUser
              ? 'bg-orca-navy text-white rounded-tr-xs shadow-xs font-medium'
              : 'bg-white text-orca-navy border border-orca-env/80 rounded-tl-xs shadow-xs'
          }`}
        >
          {text}
          {children}
        </div>
      </div>
    </div>
  );
};
