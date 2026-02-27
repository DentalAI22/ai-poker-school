'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Spade,
  Settings2,
  Users,
  Eye,
  Brain,
  ChevronDown,
  Info,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

type PlayMode = 'play-vs-coach' | 'coach-watches' | 'gto-trainer';
type TableSize = 'heads-up' | '6-max' | '9-max';
type Variant = 'no-limit-holdem' | 'pot-limit-omaha' | 'short-deck';

const MODES: { id: PlayMode; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'play-vs-coach', label: 'Play vs Coach', icon: <Spade className="w-4 h-4" />, desc: 'Andrew deals and coaches every decision' },
  { id: 'coach-watches', label: 'Coach Watches', icon: <Eye className="w-4 h-4" />, desc: 'Play freely while Andrew observes and advises' },
  { id: 'gto-trainer', label: 'GTO Trainer', icon: <Brain className="w-4 h-4" />, desc: 'Get real-time GTO accuracy feedback' },
];

const TABLE_SIZES: { id: TableSize; label: string; seats: number }[] = [
  { id: 'heads-up', label: 'Heads-Up', seats: 2 },
  { id: '6-max', label: '6-Max', seats: 6 },
  { id: '9-max', label: '9-Max', seats: 9 },
];

const VARIANTS: { id: Variant; label: string }[] = [
  { id: 'no-limit-holdem', label: "No-Limit Hold'em" },
  { id: 'pot-limit-omaha', label: 'Pot-Limit Omaha' },
  { id: 'short-deck', label: 'Short Deck' },
];

/* ─────────────────────────────────────────────────────────────
   PLACEHOLDER POKER TABLE
   (renders when PokerTable component is not yet available)
   ───────────────────────────────────────────────────────────── */

function PlaceholderTable({
  mode,
  variant,
  tableSize,
}: {
  mode: PlayMode;
  variant: Variant;
  tableSize: TableSize;
}) {
  const seats = TABLE_SIZES.find((t) => t.id === tableSize)?.seats ?? 6;
  const variantLabel = VARIANTS.find((v) => v.id === variant)?.label ?? variant;
  const modeLabel = MODES.find((m) => m.id === mode)?.label ?? mode;

  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-[16/10] flex items-center justify-center">
      {/* Felt table */}
      <div className="absolute inset-4 sm:inset-8 rounded-[50%] bg-felt shadow-[inset_0_4px_30px_rgba(0,0,0,0.5),0_0_60px_rgba(13,92,46,0.3)]">
        <div className="absolute inset-[3px] rounded-[50%] border-2 border-gold/20" />
      </div>

      {/* Table content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Spade className="w-12 h-12 text-gold/40 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {variantLabel}
          </h3>
          <p className="text-white/50 text-sm mb-1">
            {modeLabel} &middot; {seats} seats
          </p>
          <p className="text-white/30 text-xs">
            Poker table component loading...
          </p>
        </motion.div>
      </div>

      {/* Seat indicators */}
      {Array.from({ length: seats }).map((_, i) => {
        const angle = (360 / seats) * i - 90;
        const radians = (angle * Math.PI) / 180;
        const rx = 46;
        const ry = 42;
        const cx = 50 + rx * Math.cos(radians);
        const cy = 50 + ry * Math.sin(radians);

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="absolute w-10 h-10 rounded-full border border-white/10 bg-card-bg/80 flex items-center justify-center text-xs font-bold text-white/30"
            style={{
              left: `${cx}%`,
              top: `${cy}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {i + 1}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function PlayPage() {
  const [mode, setMode] = useState<PlayMode>('play-vs-coach');
  const [tableSize, setTableSize] = useState<TableSize>('6-max');
  const [variant, setVariant] = useState<Variant>('no-limit-holdem');
  const [variantOpen, setVariantOpen] = useState(false);

  /* Try dynamic import of PokerTable — use placeholder if unavailable */
  let PokerTableComponent: React.ComponentType<{
    mode: string;
    variant: string;
    tableSize: string;
  }> | null = null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    PokerTableComponent = require('@/components/poker-table/PokerTable').default;
  } catch {
    PokerTableComponent = null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 sm:px-6 pt-6 pb-2 text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-1">
          Interactive <span className="text-gold-gradient">Poker Table</span>
        </h1>
        <p className="text-white/50 text-sm">
          Choose your mode, pick a game, and let Andrew guide you.
        </p>
      </motion.div>

      {/* ── Mode Tabs ── */}
      <div className="px-4 sm:px-6 py-3">
        <div className="flex justify-center gap-2 flex-wrap">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                mode === m.id
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-white/5 text-white/50 border border-white/5 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </div>
        {/* Mode description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-center text-white/40 text-xs mt-2"
          >
            {MODES.find((m) => m.id === mode)?.desc}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Settings Bar ── */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3">
          {/* Table size */}
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <Settings2 className="w-4 h-4 text-white/30 ml-2" />
            {TABLE_SIZES.map((ts) => (
              <button
                key={ts.id}
                onClick={() => setTableSize(ts.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  tableSize === ts.id
                    ? 'bg-felt text-white'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {ts.label}
              </button>
            ))}
          </div>

          {/* Variant selector */}
          <div className="relative">
            <button
              onClick={() => setVariantOpen(!variantOpen)}
              className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-all cursor-pointer border border-white/5"
            >
              <Users className="w-4 h-4 text-gold/60" />
              {VARIANTS.find((v) => v.id === variant)?.label}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${variantOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {variantOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1 left-0 right-0 bg-card-bg border border-white/10 rounded-lg overflow-hidden z-50 shadow-xl"
                >
                  {VARIANTS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setVariant(v.id);
                        setVariantOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all cursor-pointer ${
                        variant === v.id
                          ? 'bg-gold/10 text-gold'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Poker Table Area ── */}
      <div className="flex-1 px-2 sm:px-6 pb-4 flex items-center justify-center min-h-[400px]">
        {PokerTableComponent ? (
          <PokerTableComponent mode={mode} variant={variant} tableSize={tableSize} />
        ) : (
          <PlaceholderTable mode={mode} variant={variant} tableSize={tableSize} />
        )}
      </div>

      {/* ── Disclaimer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-6 pb-6"
      >
        <p className="text-center text-xs text-white/25 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          For educational simulation purposes only. No real money wagering.
        </p>
      </motion.div>
    </div>
  );
}
