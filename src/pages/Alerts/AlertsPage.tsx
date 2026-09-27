import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Bell } from 'lucide-react';
import demoHazards from '../../data/demo/hazards.json';

export const AlertsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-bold text-orca-navy">Marine Hazards & Safety Alerts</h3>
        </div>
        <Badge variant="demo">Deterministic Demo Data</Badge>
      </div>

      <div className="space-y-4">
        {demoHazards.hazards.map((haz) => (
          <Card key={haz.id} className="border-amber-300 bg-amber-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">{haz.type}</span>
              <Badge variant="warning">{haz.severity} SEVERITY</Badge>
            </div>
            <h4 className="text-base font-bold text-orca-navy">{haz.title}</h4>
            <p className="text-xs text-orca-navy/80 mt-1">{haz.description}</p>
            <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-800">
              <span>Radius: {haz.radiusKm} km</span>
              <span>Issued: {new Date(haz.issuedAt).toLocaleString()}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
