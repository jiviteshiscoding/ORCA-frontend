import React, { useState } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ChatComposerProps {
  onSendMessage: (queryText: string) => void;
  isProcessing?: boolean;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSendMessage,
  isProcessing = false,
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="space-y-2">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-white rounded-2xl border border-orca-env shadow-sm focus-within:ring-2 focus-within:ring-orca-cyan focus-within:border-transparent transition-all p-1.5"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask ORCA about weather, fishing, route, hazards..."
          disabled={isProcessing}
          className="flex-1 px-3.5 py-2.5 bg-transparent text-xs md:text-sm text-orca-deep placeholder:text-orca-navy/40 focus:outline-none disabled:opacity-50"
        />

        <div className="flex items-center gap-1.5 pr-1">
          <button
            type="button"
            title="Voice input mode (Demo)"
            className="p-2 rounded-xl text-orca-navy/60 hover:text-orca-cyan hover:bg-orca-ice transition-colors cursor-pointer"
            onClick={() => {
              // Demo voice trigger
              if (!input) setInput('Can I go fishing tomorrow morning for five hours?');
            }}
          >
            <Mic className="w-4 h-4" />
          </button>

          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isProcessing}
            className="rounded-xl px-3.5 font-bold gap-1 shadow-xs"
          >
            {isProcessing ? (
              <Sparkles className="w-4 h-4 animate-spin text-orca-cyan" />
            ) : (
              <>
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-between px-2 text-[10px] text-orca-navy/60 font-medium">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-orca-cyan" />
          ORCA reasons across ocean, weather, PFZ, vessel & geospatial information.
        </span>
        <span className="font-mono hidden sm:inline">DEMO SNAPSHOT ENGINE</span>
      </div>
    </div>
  );
};
