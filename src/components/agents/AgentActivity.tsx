import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AgentStep, StepStatus } from './AgentStep';
import { Bot, Sparkles, CheckCircle2 } from 'lucide-react';

export interface AgentActivityStepDef {
  number: string;
  name: string;
  description: string;
  status: StepStatus;
}

export interface AgentActivityProps {
  steps: AgentActivityStepDef[];
  isCompleted?: boolean;
}

export const AgentActivity: React.FC<AgentActivityProps> = ({
  steps,
  isCompleted = false,
}) => {
  const completedCount = steps.filter((s) => s.status === 'complete').length;

  return (
    <Card variant="flat" className="border-orca-env space-y-3 p-3.5">
      <div className="flex items-center justify-between border-b border-orca-env/60 pb-2">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-orca-cyan" />
          <h4 className="text-xs font-black uppercase tracking-wider text-orca-navy">
            01. Collaborative Agent Reasoning
          </h4>
        </div>

        <div className="flex items-center gap-1.5">
          {isCompleted ? (
            <Badge variant="success" className="text-[9px]">
              <CheckCircle2 className="w-3 h-3 inline mr-1 text-emerald-600" />
              7/7 AGENTS COMPLETE
            </Badge>
          ) : (
            <Badge variant="demo" className="animate-pulse text-[9px]">
              <Sparkles className="w-3 h-3 inline mr-1 text-orca-cyan" />
              {completedCount}/7 ANALYZING
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-2 pt-1">
        {steps.map((step, idx) => (
          <AgentStep
            key={step.number}
            number={step.number}
            name={step.name}
            description={step.description}
            status={step.status}
            isLast={idx === steps.length - 1}
          />
        ))}
      </div>
    </Card>
  );
};
