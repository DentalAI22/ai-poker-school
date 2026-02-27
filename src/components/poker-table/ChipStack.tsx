'use client';

import { motion } from 'framer-motion';

interface ChipStackProps {
  amount: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

// Chip denomination colors
const CHIP_TIERS = [
  { threshold: 1000, color: '#d4a843', label: '1K' },
  { threshold: 500, color: '#111111', label: '500' },
  { threshold: 100, color: '#22c55e', label: '100' },
  { threshold: 25, color: '#3b82f6', label: '25' },
  { threshold: 5, color: '#ef4444', label: '5' },
  { threshold: 1, color: '#e5e7eb', label: '1' },
];

function getChipBreakdown(amount: number): { color: string; label: string }[] {
  const chips: { color: string; label: string }[] = [];
  let remaining = amount;

  for (const tier of CHIP_TIERS) {
    while (remaining >= tier.threshold && chips.length < 5) {
      chips.push({ color: tier.color, label: tier.label });
      remaining -= tier.threshold;
    }
    if (chips.length >= 5) break;
  }

  // Always show at least one chip
  if (chips.length === 0) {
    chips.push({ color: '#e5e7eb', label: '1' });
  }

  return chips;
}

const SIZE_MAP = {
  sm: { chip: 28, font: 8, border: 2, gap: 4 },
  md: { chip: 40, font: 10, border: 3, gap: 5 },
  lg: { chip: 52, font: 13, border: 3, gap: 6 },
};

export default function ChipStack({ amount, color, size = 'md', animated = true }: ChipStackProps) {
  const s = SIZE_MAP[size];
  const chips = color
    ? Array.from({ length: Math.min(Math.max(1, Math.ceil(amount / 200)), 5) }, () => ({
        color,
        label: '',
      }))
    : getChipBreakdown(amount);

  const Wrapper = animated ? motion.div : 'div';
  const wrapperProps = animated
    ? {
        initial: { scale: 0, y: -20 },
        animate: { scale: 1, y: 0 },
        transition: { type: 'spring', stiffness: 400, damping: 15 },
      }
    : {};

  return (
    // @ts-expect-error -- motion.div and div have compatible usage here
    <Wrapper
      {...wrapperProps}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Stacked chips */}
      <div style={{ position: 'relative', height: s.chip + (chips.length - 1) * s.gap, width: s.chip }}>
        {chips.map((chip, i) => {
          const isTextDark = chip.color === '#e5e7eb' || chip.color === '#d4a843';
          return (
            <div
              key={i}
              className="poker-chip"
              style={{
                position: 'absolute',
                bottom: i * s.gap,
                left: 0,
                width: s.chip,
                height: s.chip,
                backgroundColor: chip.color,
                borderWidth: s.border,
                fontSize: s.font,
                color: isTextDark ? '#111' : '#fff',
                boxShadow: `0 ${2 + i}px ${4 + i * 2}px rgba(0,0,0,0.4)`,
                zIndex: i,
              }}
            />
          );
        })}
      </div>

      {/* Amount label */}
      <span
        style={{
          fontSize: s.font + 1,
          fontWeight: 700,
          color: '#d4a843',
          textShadow: '0 1px 3px rgba(0,0,0,0.6)',
          marginTop: 2,
          whiteSpace: 'nowrap',
        }}
      >
        ${amount.toLocaleString()}
      </span>
    </Wrapper>
  );
}
