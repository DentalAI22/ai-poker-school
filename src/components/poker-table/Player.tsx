'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import ChipStack from './ChipStack';

interface PlayerProps {
  name: string;
  chips: number;
  cards?: { suit: string; rank: string }[];
  isDealer?: boolean;
  isActive?: boolean;
  isFolded?: boolean;
  bet?: number;
  position: string;
  isHero?: boolean;
  seatIndex: number;
}

export default function Player({
  name,
  chips,
  cards,
  isDealer,
  isActive,
  isFolded,
  bet,
  position,
  isHero,
}: PlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isFolded ? 0.4 : 1,
        scale: 1,
        filter: isFolded ? 'grayscale(0.7)' : 'none',
      }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        position: 'relative',
      }}
    >
      {/* Bet chip stack (positioned above for top seats, below for bottom) */}
      {bet != null && bet > 0 && (
        <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}>
          <ChipStack amount={bet} size="sm" />
        </div>
      )}

      {/* Position label */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {position}
      </span>

      {/* Avatar */}
      <div style={{ position: 'relative' }}>
        <div
          className={isActive ? 'animate-pulse-gold' : ''}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: isHero
              ? 'linear-gradient(135deg, #d4a843, #b8922f)'
              : 'linear-gradient(135deg, #374151, #1f2937)',
            border: isActive
              ? '3px solid #d4a843'
              : '2px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 700,
            color: isHero ? '#0a0a0a' : '#e5e7eb',
            boxShadow: isActive
              ? '0 0 20px rgba(212,168,67,0.5), 0 0 40px rgba(212,168,67,0.2)'
              : '0 2px 8px rgba(0,0,0,0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          {isHero ? 'You' : name.charAt(0).toUpperCase()}
        </div>

        {/* Dealer button */}
        {isDealer && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              top: -4,
              right: -8,
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: '#ffffff',
              color: '#0a0a0a',
              fontSize: 11,
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
              border: '2px solid #d4a843',
            }}
          >
            D
          </motion.div>
        )}
      </div>

      {/* Name */}
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: isHero ? '#d4a843' : '#e5e7eb',
          maxWidth: 80,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        {name}
      </span>

      {/* Chip count */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#22c55e',
          background: 'rgba(0,0,0,0.5)',
          padding: '2px 8px',
          borderRadius: 10,
        }}
      >
        ${chips.toLocaleString()}
      </span>

      {/* Hole cards */}
      {cards && cards.length > 0 && !isFolded && (
        <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
          {cards.map((card, i) => (
            <Card
              key={i}
              card={isHero ? card : undefined}
              faceDown={!isHero}
              small
              delay={i * 0.15}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
