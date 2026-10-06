import React from 'react';
import type { DiseaseSeverity } from '../types/disease';
import { ShieldCheck, AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';

interface StatusBadgeProps {
  severity?: DiseaseSeverity;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ severity = 'moderate', className = '', size = 'md' }) => {
  const configs: Record<DiseaseSeverity, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
    healthy: {
      label: 'Healthy Specimen',
      bg: 'bg-[#98CC6B]/20',
      text: 'text-[#24361B]',
      border: 'border-[#98CC6B]/40',
      icon: <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#24361B]" />,
    },
    low: {
      label: 'Low Severity',
      bg: 'bg-[#EEF2EC]',
      text: 'text-[#5D6B55]',
      border: 'border-[#DDE6D8]',
      icon: <AlertCircle className="w-3.5 h-3.5 mr-1 text-[#5D6B55]" />,
    },
    moderate: {
      label: 'Moderate Severity',
      bg: 'bg-[#ED7A3B]/15',
      text: 'text-[#ED7A3B]',
      border: 'border-[#ED7A3B]/30',
      icon: <AlertTriangle className="w-3.5 h-3.5 mr-1 text-[#ED7A3B]" />,
    },
    high: {
      label: 'High Severity',
      bg: 'bg-[#ED7A3B]/20',
      text: 'text-[#ED7A3B]',
      border: 'border-[#ED7A3B]/40',
      icon: <AlertTriangle className="w-3.5 h-3.5 mr-1 text-[#ED7A3B]" />,
    },
    critical: {
      label: 'Critical Pathogen',
      bg: 'bg-[#ED7A3B]/25',
      text: 'text-[#ED7A3B]',
      border: 'border-[#ED7A3B]/50',
      icon: <AlertOctagon className="w-3.5 h-3.5 mr-1 text-[#ED7A3B]" />,
    },
  };

  const config = configs[severity] || configs.moderate;
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-xs ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} ${className}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};
