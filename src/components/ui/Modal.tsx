import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-orca-deep/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-orca-env max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-orca-env/40 bg-orca-ice">
          <h3 className="text-lg font-bold text-orca-navy">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
            <X className="w-5 h-5 text-orca-navy" />
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
