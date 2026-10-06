import React from 'react';
import { motion } from 'framer-motion';

interface ProbabilityBarProps {
  probabilities: Record<string, number>;
  predictedClass?: string;
  className?: string;
}

export const ProbabilityBar: React.FC<ProbabilityBarProps> = ({
  probabilities,
  predictedClass,
  className = '',
}) => {
  const entries = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);

  return (
    <div className={`space-y-3 ${className}`}>
      {entries.map(([label, probability], idx) => {
        const isPredicted = label.toLowerCase() === predictedClass?.toLowerCase();
        const percent = Math.min(100, Math.max(0, Math.round(probability * 1000) / 10));

        let barColor = 'bg-[#DDE6D8]';
        let textColor = 'text-[#5D6B55]';

        if (isPredicted) {
          if (label.toLowerCase() === 'healthy') {
            barColor = 'bg-[#98CC6B]';
            textColor = 'text-[#24361B] font-bold';
          } else {
            barColor = 'bg-[#ED7A3B]';
            textColor = 'text-[#ED7A3B] font-bold';
          }
        }

        return (
          <div key={label} className="group">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className={`capitalize tracking-wide flex items-center gap-1.5 ${textColor}`}>
                {isPredicted && (
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                )}
                {label}
              </span>
              <span className="font-mono text-[#24361B] font-semibold text-xs">
                {percent.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-[#EEF2EC] rounded-full h-2.5 overflow-hidden border border-[#DDE6D8]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: 'easeOut' }}
                className={`h-full rounded-full ${barColor}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
