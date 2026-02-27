'use client';

import { motion } from 'framer-motion';

interface CardProps {
  card?: { suit: string; rank: string };
  faceDown?: boolean;
  small?: boolean;
  className?: string;
  delay?: number;
}

const SUIT_SYMBOLS: Record<string, string> = {
  hearts: '\u2665',
  diamonds: '\u2666',
  clubs: '\u2663',
  spades: '\u2660',
  h: '\u2665',
  d: '\u2666',
  c: '\u2663',
  s: '\u2660',
};

const SUIT_COLORS: Record<string, string> = {
  hearts: '#ef4444',
  diamonds: '#3b82f6',
  clubs: '#22c55e',
  spades: '#1e293b',
  h: '#ef4444',
  d: '#3b82f6',
  c: '#22c55e',
  s: '#1e293b',
};

export default function Card({ card, faceDown, small, className = '', delay = 0 }: CardProps) {
  const isFaceDown = faceDown || !card;
  const w = small ? 50 : 70;
  const h = small ? 72 : 100;

  return (
    <motion.div
      initial={{ y: -120, rotate: -15, opacity: 0 }}
      animate={{ y: 0, rotate: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
      className={className}
      style={{ width: w, height: h, flexShrink: 0 }}
    >
      {isFaceDown ? (
        <div
          className="playing-card face-down"
          style={{ width: w, height: h }}
        >
          {/* Diamond pattern overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 6,
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
            }}
          />
        </div>
      ) : (
        <div
          className="playing-card"
          style={{
            width: w,
            height: h,
            color: SUIT_COLORS[card.suit] || '#1e293b',
            flexDirection: 'column',
          }}
        >
          {/* Top-left rank + suit */}
          <div
            style={{
              position: 'absolute',
              top: small ? 3 : 5,
              left: small ? 4 : 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1,
            }}
          >
            <span style={{ fontSize: small ? 11 : 14, fontWeight: 800 }}>
              {card.rank}
            </span>
            <span style={{ fontSize: small ? 9 : 11 }}>
              {SUIT_SYMBOLS[card.suit] || card.suit}
            </span>
          </div>

          {/* Center suit symbol */}
          <span style={{ fontSize: small ? 20 : 28 }}>
            {SUIT_SYMBOLS[card.suit] || card.suit}
          </span>

          {/* Bottom-right rank + suit (inverted) */}
          <div
            style={{
              position: 'absolute',
              bottom: small ? 3 : 5,
              right: small ? 4 : 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1,
              transform: 'rotate(180deg)',
            }}
          >
            <span style={{ fontSize: small ? 11 : 14, fontWeight: 800 }}>
              {card.rank}
            </span>
            <span style={{ fontSize: small ? 9 : 11 }}>
              {SUIT_SYMBOLS[card.suit] || card.suit}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
