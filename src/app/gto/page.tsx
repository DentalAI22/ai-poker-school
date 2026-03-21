'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Brain,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Zap,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   DATA IMPORT (with fallback)
   ───────────────────────────────────────────────────────────── */

import {
  HAND_GRID,
  getChart as gtoGetChart,
  getHandColor as gtoGetHandColor,
} from '@/data/gto-charts';
import type { Action, GTOChart, HandAction } from '@/data/gto-charts';

/* ─────────────────────────────────────────────────────────────
   TYPES & CONSTANTS
   ───────────────────────────────────────────────────────────── */

type Tab = 'study' | 'quiz' | 'shortstack' | 'icm';
type TableSize = '6max' | '9max';
type Scenario = 'open' | 'vs_raise' | 'vs_3bet';

const POSITIONS_6MAX = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
const POSITIONS_9MAX = ['UTG', 'MP', 'CO', 'BTN'];

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: 'open', label: 'Open Raise' },
  { id: 'vs_raise', label: 'vs Raise' },
  { id: 'vs_3bet', label: 'vs 3-Bet' },
];

const ACTION_LABELS: Record<Action, string> = {
  raise: 'Raise',
  call: 'Call',
  fold: 'Fold',
  mixed: 'Mixed',
};

const LEGEND: { action: Action; label: string; color: string }[] = [
  { action: 'raise', label: 'Raise / Open', color: '#ef4444' },
  { action: 'call', label: 'Call', color: '#22c55e' },
  { action: 'fold', label: 'Fold', color: '#374151' },
  { action: 'mixed', label: 'Mixed', color: '#f59e0b' },
];

/* ─────────────────────────────────────────────────────────────
   STUDY CHART TAB
   ───────────────────────────────────────────────────────────── */

function StudyChartTab() {
  const [tableSize, setTableSize] = useState<TableSize>('6max');
  const [position, setPosition] = useState('UTG');
  const [scenario, setScenario] = useState<Scenario>('open');
  const [hoveredHand, setHoveredHand] = useState<{
    hand: string;
    action: HandAction;
    x: number;
    y: number;
  } | null>(null);

  const positions = tableSize === '6max' ? POSITIONS_6MAX : POSITIONS_9MAX;
  const chart: GTOChart | undefined = gtoGetChart(position, tableSize, scenario);

  // Reset position if switching table size and position doesn't exist
  const validPosition = positions.includes(position) ? position : positions[0];
  if (validPosition !== position) {
    setPosition(validPosition);
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="space-y-4">
        {/* Table size toggle */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-white/30 mr-2">Table:</span>
          {(['6max', '9max'] as TableSize[]).map((ts) => (
            <button
              key={ts}
              onClick={() => setTableSize(ts)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                tableSize === ts
                  ? 'bg-felt text-white'
                  : 'bg-white/5 text-white/40 hover:text-white/60'
              }`}
            >
              {ts === '6max' ? '6-Max' : '9-Max'}
            </button>
          ))}
        </div>

        {/* Position buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/30 mr-2">Position:</span>
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setPosition(pos)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                position === pos
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* Scenario buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/30 mr-2">Scenario:</span>
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setScenario(sc.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                scenario === sc.id
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart description */}
      {chart && (
        <motion.p
          key={`${position}-${tableSize}-${scenario}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-white/40 max-w-2xl mx-auto"
        >
          {chart.description}
        </motion.p>
      )}

      {/* No chart available */}
      {!chart && (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40 text-sm">
            No chart available for {position} {scenario.replace('_', ' ')} ({tableSize}).
          </p>
          <p className="text-white/25 text-xs mt-2">
            Try a different position or scenario combination.
          </p>
        </div>
      )}

      {/* 13x13 Grid */}
      {chart && (
        <div className="max-w-lg mx-auto relative">
          <div
            className="grid gap-[1px]"
            style={{ gridTemplateColumns: 'repeat(13, 1fr)' }}
          >
            {HAND_GRID.map((row, r) =>
              row.map((hand, c) => {
                const handAction = chart.chart[hand];
                const color = handAction
                  ? gtoGetHandColor(handAction.action)
                  : '#374151';
                const isAboveDiag = c > r;
                const isDiag = c === r;

                return (
                  <motion.div
                    key={hand}
                    className="gto-cell"
                    style={{
                      backgroundColor: color,
                      opacity: handAction?.action === 'fold' ? 0.4 : 0.85,
                      fontSize: hand.length > 2 ? 8 : 10,
                    }}
                    whileHover={{
                      scale: 1.15,
                      opacity: 1,
                      zIndex: 20,
                    }}
                    onMouseEnter={(e) => {
                      if (handAction) {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        setHoveredHand({
                          hand,
                          action: handAction,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredHand(null)}
                    title={`${hand}: ${handAction ? ACTION_LABELS[handAction.action] : 'Fold'}${
                      isDiag ? ' (pair)' : isAboveDiag ? ' (suited)' : ' (offsuit)'
                    }`}
                  >
                    {hand}
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredHand && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="fixed z-50 bg-card-bg border border-white/10 rounded-lg p-3 shadow-xl pointer-events-none"
                style={{
                  left: hoveredHand.x,
                  top: hoveredHand.y - 10,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <p className="text-sm font-bold text-white mb-1">{hoveredHand.hand}</p>
                <p className="text-xs text-white/60">
                  Action:{' '}
                  <span
                    className="font-semibold"
                    style={{ color: gtoGetHandColor(hoveredHand.action.action) }}
                  >
                    {ACTION_LABELS[hoveredHand.action.action]}
                  </span>
                </p>
                {hoveredHand.action.frequency !== undefined &&
                  hoveredHand.action.action === 'mixed' && (
                    <p className="text-xs text-white/40 mt-1">
                      {Math.round(hoveredHand.action.frequency * 100)}%{' '}
                      {hoveredHand.action.altAction
                        ? ACTION_LABELS[hoveredHand.action.altAction]
                        : ''}{' '}
                      / {Math.round((1 - hoveredHand.action.frequency) * 100)}% Fold
                    </p>
                  )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        {LEGEND.map((item) => (
          <div key={item.action} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-white/50">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   QUIZ ME TAB
   ───────────────────────────────────────────────────────────── */

interface QuizScenario {
  position: string;
  scenario: string;
  scenarioLabel: string;
  hand: string;
  correctAction: Action;
  tableSize: TableSize;
}

function QuizMeTab() {
  const [tableSize, setTableSize] = useState<TableSize>('6max');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Action | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const generateScenario = useCallback((): QuizScenario | null => {
    const positions = tableSize === '6max' ? POSITIONS_6MAX : POSITIONS_9MAX;
    const scenarios: { id: Scenario; label: string }[] = [
      { id: 'open', label: 'Everyone folds to you' },
      { id: 'vs_raise', label: "You're facing an open raise" },
      { id: 'vs_3bet', label: "You opened and face a 3-bet" },
    ];

    // Try multiple times to find a valid chart
    for (let attempt = 0; attempt < 20; attempt++) {
      const pos = positions[Math.floor(Math.random() * positions.length)];
      const sc = scenarios[Math.floor(Math.random() * scenarios.length)];
      const chart = gtoGetChart(pos, tableSize, sc.id);

      if (chart) {
        const allHands = Object.entries(chart.chart);
        // Prefer non-fold hands for more interesting questions
        const nonFold = allHands.filter(([, a]) => a.action !== 'fold');
        const pool = nonFold.length > 10 ? nonFold : allHands;
        const [hand, handAction] = pool[Math.floor(Math.random() * pool.length)];

        return {
          position: pos,
          scenario: sc.id,
          scenarioLabel: sc.label,
          hand,
          correctAction: handAction.action === 'mixed' ? 'raise' : handAction.action,
          tableSize,
        };
      }
    }
    return null;
  }, [tableSize]);

  const [currentQ, setCurrentQ] = useState<QuizScenario | null>(() =>
    generateScenario()
  );

  const handleAnswer = (action: Action) => {
    if (isRevealed || !currentQ) return;
    setSelectedAnswer(action);
    setIsRevealed(true);

    const isCorrect = action === currentQ.correctAction;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    setStreak(isCorrect ? streak + 1 : 0);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsRevealed(false);
    setCurrentQ(generateScenario());
  };

  const resetQuiz = () => {
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setCurrentQ(generateScenario());
  };

  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  const scenarioPositionLabel = useMemo(() => {
    if (!currentQ) return '';
    const fullNames: Record<string, string> = {
      UTG: 'Under the Gun (UTG)',
      HJ: 'Hijack (HJ)',
      CO: 'Cutoff (CO)',
      BTN: 'Button (BTN)',
      SB: 'Small Blind (SB)',
      BB: 'Big Blind (BB)',
      MP: 'Middle Position (MP)',
    };
    return fullNames[currentQ.position] || currentQ.position;
  }, [currentQ]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Table size selector */}
      <div className="flex items-center justify-center gap-2">
        {(['6max', '9max'] as TableSize[]).map((ts) => (
          <button
            key={ts}
            onClick={() => {
              setTableSize(ts);
              resetQuiz();
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tableSize === ts
                ? 'bg-felt text-white'
                : 'bg-white/5 text-white/40 hover:text-white/60'
            }`}
          >
            {ts === '6max' ? '6-Max' : '9-Max'}
          </button>
        ))}
      </div>

      {/* Score bar */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-white/30">Score: </span>
            <span className="font-bold text-white">
              {score.correct}/{score.total}
            </span>
            {score.total > 0 && (
              <span className={`ml-1 font-semibold ${pct >= 70 ? 'text-green-400' : pct >= 40 ? 'text-gold' : 'text-red-400'}`}>
                ({pct}%)
              </span>
            )}
          </div>
          {streak >= 3 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gold/15 border border-gold/20">
              <Zap className="w-3 h-3 text-gold" />
              <span className="text-xs font-bold text-gold">{streak} streak!</span>
            </div>
          )}
        </div>
        <button
          onClick={resetQuiz}
          className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Question card */}
      {currentQ ? (
        <motion.div
          key={`${currentQ.hand}-${currentQ.position}-${score.total}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gold-border p-6 sm:p-8 space-y-6"
        >
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
              <HelpCircle className="w-4 h-4 text-gold" />
              <span className="text-xs font-medium text-white/50">
                {currentQ.tableSize === '6max' ? '6-Max' : '9-Max'} Cash Game
              </span>
            </div>

            <p className="text-lg sm:text-xl text-white leading-relaxed">
              You&apos;re on the <span className="font-bold text-gold">{scenarioPositionLabel}</span>.{' '}
              <span className="text-white/70">{currentQ.scenarioLabel}.</span>
            </p>

            <p className="text-2xl sm:text-3xl font-bold">
              What do you do with{' '}
              <span className="text-gold-gradient">{currentQ.hand}</span>?
            </p>
          </div>

          {/* Answer buttons */}
          <div className="grid grid-cols-3 gap-3">
            {(['fold', 'call', 'raise'] as Action[]).map((action) => {
              let btnClass = 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white';

              if (isRevealed) {
                if (action === currentQ.correctAction) {
                  btnClass = 'bg-green-500/15 border-green-500/30 text-green-400';
                } else if (action === selectedAnswer && action !== currentQ.correctAction) {
                  btnClass = 'bg-red-500/15 border-red-500/30 text-red-400';
                } else {
                  btnClass = 'bg-white/5 border-white/5 text-white/20';
                }
              }

              return (
                <button
                  key={action}
                  onClick={() => handleAnswer(action)}
                  disabled={isRevealed}
                  className={`px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-wider border transition-all cursor-pointer disabled:cursor-default ${btnClass}`}
                >
                  {action === 'fold' && 'Fold'}
                  {action === 'call' && 'Call'}
                  {action === 'raise' && 'Raise'}
                </button>
              );
            })}
          </div>

          {/* Reveal */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Correct/wrong banner */}
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    selectedAnswer === currentQ.correctAction
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}
                >
                  {selectedAnswer === currentQ.correctAction ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                  )}
                  <div>
                    <p
                      className={`font-bold text-sm ${
                        selectedAnswer === currentQ.correctAction
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {selectedAnswer === currentQ.correctAction ? 'Correct!' : 'Not quite.'}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
                      The GTO play for <span className="font-semibold text-white/70">{currentQ.hand}</span>{' '}
                      from <span className="font-semibold text-white/70">{currentQ.position}</span>{' '}
                      is to <span className="font-semibold" style={{ color: gtoGetHandColor(currentQ.correctAction) }}>
                        {ACTION_LABELS[currentQ.correctAction]}
                      </span>.
                    </p>
                  </div>
                </div>

                {/* Next button */}
                <button
                  onClick={nextQuestion}
                  className="w-full btn-gold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
                >
                  Next Question
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40">
            Unable to generate a quiz question. Try switching table sizes.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SHORT STACK PUSH/FOLD TAB
   ───────────────────────────────────────────────────────────── */

function ShortStackTab() {
  const [bbCount, setBbCount] = useState(10);
  const [position, setPosition] = useState('BTN');

  const BB_OPTIONS = [5, 8, 10, 12, 15, 20];
  const positions = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];

  // Push/fold ranges based on stack depth and position
  const getRange = (bb: number, pos: string): { push: string[]; fold: string[] } => {
    const allPairs = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22'];
    const broadwaySuited = ['AKs', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'KTs', 'QJs', 'QTs', 'JTs'];
    const broadwayOff = ['AKo', 'AQo', 'AJo', 'ATo', 'KQo', 'KJo', 'QJo'];
    const acesSuited = ['A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'];
    const connectors = ['T9s', '98s', '87s', '76s', '65s', '54s'];

    // Tighter with more BBs and earlier position
    const posMultiplier = pos === 'BTN' ? 1 : pos === 'CO' ? 0.85 : pos === 'HJ' ? 0.7 : pos === 'SB' ? 0.95 : 0.55;
    const bbMultiplier = bb <= 5 ? 1 : bb <= 10 ? 0.8 : bb <= 15 ? 0.6 : 0.4;
    const openness = posMultiplier * bbMultiplier;

    const push: string[] = [];
    push.push(...allPairs.slice(0, Math.ceil(allPairs.length * Math.min(1, openness + 0.4))));
    push.push(...broadwaySuited.slice(0, Math.ceil(broadwaySuited.length * Math.min(1, openness + 0.3))));
    push.push(...broadwayOff.slice(0, Math.ceil(broadwayOff.length * openness)));
    if (openness > 0.5) push.push(...acesSuited.slice(0, Math.ceil(acesSuited.length * openness)));
    if (openness > 0.7) push.push(...connectors.slice(0, Math.ceil(connectors.length * (openness - 0.3))));

    return { push, fold: [] };
  };

  const range = getRange(bbCount, position);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card-gold-border p-6">
        <h3 className="text-lg font-bold text-gold mb-2">Push/Fold Strategy</h3>
        <p className="text-sm text-white/50 mb-4">
          When your stack is short (&lt;20BB), GTO simplifies to push-or-fold. These ranges tell you
          when to shove all-in. As Doug Polk says: &quot;Short stack poker is solved. Just follow the charts.&quot;
        </p>

        {/* BB Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-white/30">Stack Size:</span>
          {BB_OPTIONS.map((bb) => (
            <button
              key={bb}
              onClick={() => setBbCount(bb)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                bbCount === bb
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60'
              }`}
            >
              {bb}BB
            </button>
          ))}
        </div>

        {/* Position Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-white/30">Position:</span>
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setPosition(pos)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                position === pos
                  ? 'bg-felt text-white'
                  : 'bg-white/5 text-white/40 hover:text-white/60'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* Range Display */}
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-white">Push Range ({position} with {bbCount}BB)</span>
            <span className="text-xs text-gold font-bold">{range.push.length} hands</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {range.push.map((hand) => (
              <span
                key={hand}
                className="px-2 py-1 rounded text-xs font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/20"
              >
                {hand}
              </span>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-3">
            All other hands: FOLD. No limping, no min-raising. Push or fold only.
          </p>
        </div>
      </div>

      <div className="card-gold-border p-4">
        <p className="text-xs text-white/40 leading-relaxed">
          <span className="text-gold font-bold">Pro Tip:</span> Stu Ungar was the master of short-stack play.
          In his legendary 1997 WSOP Main Event comeback, he navigated short stacks with perfect aggression.
          The difference? He did it by instinct. You have the actual math. Use it.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ICM REFERENCE TAB
   ───────────────────────────────────────────────────────────── */

function ICMTab() {
  const [scenario, setScenario] = useState<'bubble' | 'final_table' | 'pay_jump'>('bubble');

  const scenarios = {
    bubble: {
      title: 'Bubble Play',
      description: 'When one more elimination means everyone makes the money.',
      adjustments: [
        { hand: 'Medium Pairs (77-TT)', standard: 'Open/3-bet', icm: 'Tighten significantly — fold vs short stack shoves', impact: 'high' },
        { hand: 'AJo-AQo', standard: 'Standard open', icm: 'Be cautious of calling all-ins — your tournament life > a marginal spot', impact: 'high' },
        { hand: 'Big Pairs (QQ+)', standard: 'Always play', icm: 'Still play but consider flatting vs chip leader to avoid bust', impact: 'medium' },
        { hand: 'Suited Connectors', standard: 'Position-dependent open', icm: 'FOLD unless you have a massive stack — survival > chip accumulation', impact: 'high' },
        { hand: 'Small Pairs (22-66)', standard: 'Set-mine', icm: 'Fold in most spots — the risk/reward is wrong near the bubble', impact: 'high' },
      ],
      coachNote: "On the bubble, tight is RIGHT. The short stacks are sweating — let them bust. As Harrington teaches: 'ICM means a chip lost is worth more than a chip gained.'",
    },
    final_table: {
      title: 'Final Table Dynamics',
      description: 'Pay jumps are huge. Every elimination matters exponentially.',
      adjustments: [
        { hand: 'Any Hand (Big Stack)', standard: 'Normal ranges', icm: 'ATTACK medium stacks relentlessly — they can\'t afford to bust', impact: 'high' },
        { hand: 'Any Hand (Medium Stack)', standard: 'Normal ranges', icm: 'Play TIGHT. Let small stacks bust. Ladder into bigger pay jumps', impact: 'high' },
        { hand: 'Any Hand (Short Stack)', standard: 'Push/fold', icm: 'Push wider than normal — you need chips, and medium stacks will fold to you', impact: 'high' },
        { hand: 'Heads-Up (Final 2)', standard: 'GTO ranges', icm: 'ICM barely matters — play for the WIN. Standard HU ranges apply', impact: 'low' },
      ],
      coachNote: "Final table = different game entirely. Fedor Holz dominated final tables by understanding ICM pressure better than anyone. The big stack is a WEAPON — use it.",
    },
    pay_jump: {
      title: 'Pay Jump Spots',
      description: 'When the next elimination means a significant payout increase.',
      adjustments: [
        { hand: 'Marginal Hands', standard: 'Play normally', icm: 'FOLD anything marginal. A $10K pay jump > a small pot', impact: 'high' },
        { hand: 'Premium Hands', standard: 'Build pot', icm: 'Still play but consider the tournament equity — is doubling up worth the risk of busting?', impact: 'medium' },
        { hand: 'Steal Attempts', standard: 'Position-based', icm: 'Target players who understand ICM — they\'ll fold more. Avoid calling stations.', impact: 'medium' },
      ],
      coachNote: "Every major pay jump changes the math. A $50K first-place vs $30K second-place? That $20K difference means you should be more aggressive heads-up but tighter 3-handed.",
    },
  };

  const current = scenarios[scenario];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Scenario Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {([
          { id: 'bubble' as const, label: 'Bubble Play' },
          { id: 'final_table' as const, label: 'Final Table' },
          { id: 'pay_jump' as const, label: 'Pay Jumps' },
        ]).map((sc) => (
          <button
            key={sc.id}
            onClick={() => setScenario(sc.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              scenario === sc.id
                ? 'bg-gold/15 text-gold border border-gold/30'
                : 'bg-white/5 text-white/50 border border-white/5 hover:bg-white/10'
            }`}
          >
            {sc.label}
          </button>
        ))}
      </div>

      {/* Current Scenario */}
      <div className="card-gold-border p-6">
        <h3 className="text-lg font-bold text-gold mb-1">{current.title}</h3>
        <p className="text-sm text-white/50 mb-6">{current.description}</p>

        <div className="space-y-3">
          {current.adjustments.map((adj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">{adj.hand}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  adj.impact === 'high' ? 'bg-red-500/15 text-red-400' : 'bg-gold/15 text-gold'
                }`}>
                  {adj.impact} ICM impact
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-white/30">Standard GTO:</span>
                  <p className="text-white/60 mt-0.5">{adj.standard}</p>
                </div>
                <div>
                  <span className="text-gold/60">ICM Adjusted:</span>
                  <p className="text-gold/80 mt-0.5 font-medium">{adj.icm}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coach Note */}
      <div className="card-gold-border p-4">
        <p className="text-xs text-white/50 leading-relaxed">
          <span className="text-gold font-bold">Coach Andrew:</span> {current.coachNote}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function GTOPage() {
  const [tab, setTab] = useState<Tab>('study');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
          <Brain className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium text-gold">Game Theory Optimal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
          <span className="text-gold-gradient">GTO</span> Trainer
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          Master Game Theory Optimal Play. Study preflop charts by position and test your knowledge.
        </p>
      </motion.div>

      {/* ── Tab Switcher ── */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {([
          { id: 'study' as Tab, label: 'Study Charts', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'quiz' as Tab, label: 'Quiz Me', icon: <Trophy className="w-4 h-4" /> },
          { id: 'shortstack' as Tab, label: 'Push/Fold', icon: <Zap className="w-4 h-4" /> },
          { id: 'icm' as Tab, label: 'ICM Guide', icon: <BarChart3 className="w-4 h-4" /> },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              tab === t.id
                ? 'bg-gold/15 text-gold border border-gold/30'
                : 'bg-white/5 text-white/50 border border-white/5 hover:bg-white/10'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {tab === 'study' && <StudyChartTab />}
          {tab === 'quiz' && <QuizMeTab />}
          {tab === 'shortstack' && <ShortStackTab />}
          {tab === 'icm' && <ICMTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
