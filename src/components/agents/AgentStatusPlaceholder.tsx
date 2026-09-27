import React from 'react';
import { Card } from '../ui/Card';
import { Bot } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const AgentStatusPlaceholder: React.FC = () => {
  return (
    <Card variant="flat" className="border-orca-env">
      <div className="flex items-center gap-2 mb-2">
        <Bot className="w-5 h-5 text-orca-cyan" />
        <h5 className="text-sm font-bold text-orca-navy">Collaborative Agent Trace</h5>
        <Badge variant="demo" className="ml-auto">Phase 0 Ready</Badge>
      </div>
      <p className="text-xs text-orca-navy/70">
        Agent architecture foundation prepared. Collaborative agents will be attached in later phase.
      </p>
    </Card>
  );
};
