import React from 'react';
import { Card } from '../ui/Card';
import { FileCheck } from 'lucide-react';

export const EvidencePlaceholder: React.FC = () => {
  return (
    <Card variant="flat" className="border-orca-env">
      <div className="flex items-center gap-2 mb-2">
        <FileCheck className="w-5 h-5 text-orca-blue" />
        <h5 className="text-sm font-bold text-orca-navy">Evidence & Source Vault</h5>
      </div>
      <p className="text-xs text-orca-navy/70">
        Source attribution data layer ready. Marine satellite & GIS reference data structures registered.
      </p>
    </Card>
  );
};
