'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md';
  animated?: boolean;
}

export default function ProgressBar({
  value,
  label,
  color,
  showPercentage = true,
  size = 'md',
  animated = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  // Determine bar color based on value if not explicitly provided
  const resolvedColor =
    color ??
    (clampedValue >= 70
      ? 'var(--color-felt-light)'
      : clampedValue >= 40
        ? 'var(--color-gold)'
        : '#ef4444');

  const barHeight = size === 'sm' ? 'h-1.5' : 'h-3';

  return (
    <div className="w-full">
      {/* Label and percentage row */}
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-sm text-gray-400 font-medium">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-300 font-mono tabular-nums">
              {clampedValue}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        className={`w-full ${barHeight} rounded-full bg-white/5 overflow-hidden`}
      >
        {/* Filled portion */}
        <motion.div
          className={`${barHeight} rounded-full`}
          style={{ backgroundColor: resolvedColor }}
          initial={animated ? { width: 0 } : { width: `${clampedValue}%` }}
          animate={{ width: `${clampedValue}%` }}
          transition={
            animated
              ? { duration: 0.8, ease: 'easeOut', delay: 0.1 }
              : { duration: 0 }
          }
        />
      </div>
    </div>
  );
}
