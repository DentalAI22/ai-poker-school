// =============================================================================
// GTO Preflop Charts Data for AI Poker School
// =============================================================================
// Realistic GTO-approximated preflop ranges for 6-max and 9-max cash games.
// Ranges are based on commonly accepted solver outputs for 100bb deep play.
// =============================================================================

type Action = 'raise' | 'call' | 'fold' | 'mixed';

interface HandAction {
  action: Action;
  frequency?: number;
  altAction?: Action;
  altFrequency?: number;
}

interface GTOChart {
  position: string;
  tableSize: '6max' | '9max';
  scenario: string;
  description: string;
  chart: Record<string, HandAction>;
}

// ---------------------------------------------------------------------------
// 13x13 Hand Grid
// ---------------------------------------------------------------------------
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;

const HAND_GRID: string[][] = RANKS.map((row, r) =>
  RANKS.map((col, c) => {
    if (r === c) return `${row}${col}`;
    if (c > r) return `${row}${col}s`;
    return `${col}${row}o`;
  })
);

// All 169 canonical hands in a flat list
const ALL_HANDS: string[] = HAND_GRID.flat();

// ---------------------------------------------------------------------------
// Helper: build a chart record from a raise set, call set, and mixed set
// ---------------------------------------------------------------------------
function buildOpenChart(raiseHands: string[], mixedHands: { hand: string; freq: number }[] = []): Record<string, HandAction> {
  const chart: Record<string, HandAction> = {};
  const raiseSet = new Set(raiseHands);
  const mixedMap = new Map(mixedHands.map(m => [m.hand, m.freq]));

  for (const hand of ALL_HANDS) {
    if (raiseSet.has(hand)) {
      chart[hand] = { action: 'raise' };
    } else if (mixedMap.has(hand)) {
      const freq = mixedMap.get(hand)!;
      chart[hand] = {
        action: 'mixed',
        frequency: freq,
        altAction: 'fold',
        altFrequency: 1 - freq,
      };
    } else {
      chart[hand] = { action: 'fold' };
    }
  }
  return chart;
}

function buildDefenseChart(
  raiseHands: string[],
  callHands: string[],
  mixedHands: { hand: string; freq: number; action: Action; altAction: Action }[] = []
): Record<string, HandAction> {
  const chart: Record<string, HandAction> = {};
  const raiseSet = new Set(raiseHands);
  const callSet = new Set(callHands);
  const mixedMap = new Map(mixedHands.map(m => [m.hand, m]));

  for (const hand of ALL_HANDS) {
    if (raiseSet.has(hand)) {
      chart[hand] = { action: 'raise' };
    } else if (callSet.has(hand)) {
      chart[hand] = { action: 'call' };
    } else if (mixedMap.has(hand)) {
      const m = mixedMap.get(hand)!;
      chart[hand] = {
        action: 'mixed',
        frequency: m.freq,
        altAction: m.altAction,
        altFrequency: 1 - m.freq,
      };
    } else {
      chart[hand] = { action: 'fold' };
    }
  }
  return chart;
}

// =============================================================================
// 6-MAX OPEN RAISE RANGES
// =============================================================================

// ---------------------------------------------------------------------------
// 1) UTG Open Raise ~18%
// ---------------------------------------------------------------------------
const utgOpen6max = buildOpenChart(
  [
    // Pairs
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77',
    // Suited broadways
    'AKs', 'AQs', 'AJs', 'ATs',
    'KQs', 'KJs',
    'QJs',
    'JTs',
    // Suited connectors
    'T9s',
    // Suited aces
    'A5s', 'A4s',
    // Offsuit broadways
    'AKo', 'AQo', 'AJo',
    'KQo',
  ],
  [
    // Mixed opens
    { hand: '66', freq: 0.85 },
    { hand: '55', freq: 0.6 },
    { hand: 'A9s', freq: 0.7 },
    { hand: 'A3s', freq: 0.5 },
    { hand: 'KTs', freq: 0.8 },
    { hand: 'QTs', freq: 0.6 },
    { hand: 'ATo', freq: 0.5 },
    { hand: '98s', freq: 0.5 },
  ]
);

// ---------------------------------------------------------------------------
// 2) HJ Open Raise ~22%
// ---------------------------------------------------------------------------
const hjOpen6max = buildOpenChart(
  [
    // Pairs
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66',
    // Suited broadways
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s',
    'KQs', 'KJs', 'KTs',
    'QJs', 'QTs',
    'JTs',
    // Suited connectors
    'T9s', '98s',
    // Suited aces
    'A5s', 'A4s', 'A3s',
    // Offsuit broadways
    'AKo', 'AQo', 'AJo', 'ATo',
    'KQo',
  ],
  [
    { hand: '55', freq: 0.85 },
    { hand: '44', freq: 0.5 },
    { hand: 'A8s', freq: 0.6 },
    { hand: 'A2s', freq: 0.5 },
    { hand: 'K9s', freq: 0.5 },
    { hand: 'Q9s', freq: 0.4 },
    { hand: 'J9s', freq: 0.5 },
    { hand: '87s', freq: 0.6 },
    { hand: 'KJo', freq: 0.7 },
  ]
);

// ---------------------------------------------------------------------------
// 3) CO Open Raise ~28%
// ---------------------------------------------------------------------------
const coOpen6max = buildOpenChart(
  [
    // Pairs
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55',
    // Suited broadways
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s',
    'KQs', 'KJs', 'KTs', 'K9s',
    'QJs', 'QTs', 'Q9s',
    'JTs', 'J9s',
    'T9s',
    // Suited connectors
    '98s', '87s',
    // Suited aces
    'A5s', 'A4s', 'A3s', 'A2s',
    // Offsuit broadways
    'AKo', 'AQo', 'AJo', 'ATo',
    'KQo', 'KJo', 'KTo',
    'QJo',
  ],
  [
    { hand: '44', freq: 0.85 },
    { hand: '33', freq: 0.5 },
    { hand: 'A7s', freq: 0.75 },
    { hand: 'A6s', freq: 0.6 },
    { hand: 'K8s', freq: 0.5 },
    { hand: 'Q8s', freq: 0.4 },
    { hand: 'J8s', freq: 0.5 },
    { hand: 'T8s', freq: 0.6 },
    { hand: '76s', freq: 0.7 },
    { hand: '65s', freq: 0.5 },
    { hand: 'QTo', freq: 0.6 },
    { hand: 'JTo', freq: 0.5 },
    { hand: 'A9o', freq: 0.5 },
  ]
);

// ---------------------------------------------------------------------------
// 4) BTN Open Raise ~45%
// ---------------------------------------------------------------------------
const btnOpen6max = buildOpenChart(
  [
    // Pairs
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    // Suited aces
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    // Suited kings
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
    // Suited queens
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s',
    // Suited jacks
    'JTs', 'J9s', 'J8s', 'J7s',
    // Suited connectors and one-gappers
    'T9s', 'T8s', 'T7s',
    '98s', '97s',
    '87s', '86s',
    '76s', '75s',
    '65s', '64s',
    '54s', '53s',
    '43s',
    // Offsuit broadways
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o',
    'KQo', 'KJo', 'KTo', 'K9o',
    'QJo', 'QTo', 'Q9o',
    'JTo', 'J9o',
    'T9o',
    '98o',
  ],
  [
    { hand: 'K4s', freq: 0.7 },
    { hand: 'K3s', freq: 0.5 },
    { hand: 'K2s', freq: 0.4 },
    { hand: 'Q6s', freq: 0.6 },
    { hand: 'Q5s', freq: 0.4 },
    { hand: 'J6s', freq: 0.5 },
    { hand: 'T6s', freq: 0.4 },
    { hand: '96s', freq: 0.5 },
    { hand: '85s', freq: 0.5 },
    { hand: '74s', freq: 0.4 },
    { hand: '63s', freq: 0.3 },
    { hand: '52s', freq: 0.3 },
    { hand: '42s', freq: 0.25 },
    { hand: 'A6o', freq: 0.6 },
    { hand: 'A5o', freq: 0.7 },
    { hand: 'A4o', freq: 0.5 },
    { hand: 'K8o', freq: 0.5 },
    { hand: 'Q8o', freq: 0.4 },
    { hand: 'J8o', freq: 0.3 },
    { hand: 'T8o', freq: 0.4 },
    { hand: '87o', freq: 0.4 },
  ]
);

// ---------------------------------------------------------------------------
// 5) SB Open Raise ~40% (raise-or-fold from SB in 6-max)
// ---------------------------------------------------------------------------
const sbOpen6max = buildOpenChart(
  [
    // Pairs
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    // Suited aces
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    // Suited kings
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
    // Suited queens
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s',
    // Suited jacks
    'JTs', 'J9s', 'J8s',
    // Suited connectors
    'T9s', 'T8s',
    '98s', '97s',
    '87s', '86s',
    '76s', '75s',
    '65s', '64s',
    '54s', '53s',
    '43s',
    // Offsuit broadways
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o',
    'KQo', 'KJo', 'KTo', 'K9o',
    'QJo', 'QTo',
    'JTo', 'J9o',
    'T9o',
  ],
  [
    { hand: 'K4s', freq: 0.6 },
    { hand: 'K3s', freq: 0.5 },
    { hand: 'K2s', freq: 0.4 },
    { hand: 'Q6s', freq: 0.5 },
    { hand: 'Q5s', freq: 0.35 },
    { hand: 'J7s', freq: 0.5 },
    { hand: 'T7s', freq: 0.4 },
    { hand: '96s', freq: 0.4 },
    { hand: '85s', freq: 0.4 },
    { hand: '74s', freq: 0.3 },
    { hand: 'A7o', freq: 0.7 },
    { hand: 'A6o', freq: 0.5 },
    { hand: 'A5o', freq: 0.6 },
    { hand: 'A4o', freq: 0.4 },
    { hand: 'K8o', freq: 0.5 },
    { hand: 'Q9o', freq: 0.5 },
    { hand: 'J8o', freq: 0.3 },
    { hand: 'T8o', freq: 0.35 },
    { hand: '98o', freq: 0.4 },
    { hand: '87o', freq: 0.3 },
  ]
);

// =============================================================================
// 6-MAX DEFENSE / 3-BET / 4-BET CHARTS
// =============================================================================

// ---------------------------------------------------------------------------
// 6) BB vs BTN Open (3bet / call / fold)
// ---------------------------------------------------------------------------
// BB defends very wide vs BTN open. 3-bet range ~12%, call range ~35%, fold ~53%
const bbVsBtnOpen6max = buildDefenseChart(
  // 3-bet (raise)
  [
    'AA', 'KK', 'QQ', 'JJ',
    'AKs', 'AQs',
    'AKo',
    // 3-bet bluffs with blockers
    'A5s', 'A4s', 'A3s',
    'K5s',
    'Q5s',
  ],
  // Call
  [
    'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A2s',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s',
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s',
    'JTs', 'J9s', 'J8s', 'J7s',
    'T9s', 'T8s', 'T7s',
    '98s', '97s', '96s',
    '87s', '86s', '85s',
    '76s', '75s',
    '65s', '64s',
    '54s', '53s',
    '43s',
    // Offsuit calls
    'AQo', 'AJo', 'ATo', 'A9o',
    'KQo', 'KJo', 'KTo',
    'QJo', 'QTo',
    'JTo', 'J9o',
    'T9o',
    '98o',
  ],
  // Mixed
  [
    { hand: 'AJs', freq: 0.0, action: 'call', altAction: 'call' }, // placeholder removed; AJs is pure call above
    { hand: 'K4s', freq: 0.5, action: 'mixed', altAction: 'fold' },
    { hand: 'K3s', freq: 0.4, action: 'mixed', altAction: 'fold' },
    { hand: 'K2s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'Q6s', freq: 0.5, action: 'mixed', altAction: 'fold' },
    { hand: 'Q4s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'J6s', freq: 0.35, action: 'mixed', altAction: 'fold' },
    { hand: 'T6s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: '74s', freq: 0.35, action: 'mixed', altAction: 'fold' },
    { hand: '63s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: '52s', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: '42s', freq: 0.2, action: 'mixed', altAction: 'fold' },
    { hand: '32s', freq: 0.15, action: 'mixed', altAction: 'fold' },
    { hand: 'A8o', freq: 0.5, action: 'mixed', altAction: 'fold' },
    { hand: 'A7o', freq: 0.4, action: 'mixed', altAction: 'fold' },
    { hand: 'A6o', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'K9o', freq: 0.5, action: 'mixed', altAction: 'fold' },
    { hand: 'K8o', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'Q9o', freq: 0.4, action: 'mixed', altAction: 'fold' },
    { hand: 'Q8o', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: 'J8o', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: 'T8o', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: '87o', freq: 0.35, action: 'mixed', altAction: 'fold' },
    { hand: '76o', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: '65o', freq: 0.2, action: 'mixed', altAction: 'fold' },
  ]
);

// ---------------------------------------------------------------------------
// 7) BTN vs 3-Bet from BB (4bet / call / fold)
// ---------------------------------------------------------------------------
// Facing a 3-bet, BTN 4-bets ~8%, calls ~25%, folds the rest
const btnVs3betBB6max = buildDefenseChart(
  // 4-bet (raise)
  [
    'AA', 'KK', 'QQ',
    'AKs',
    'AKo',
    // 4-bet bluffs
    'A5s', 'A4s',
  ],
  // Call
  [
    'JJ', 'TT', '99',
    'AQs', 'AJs', 'ATs',
    'KQs', 'KJs',
    'QJs',
    'JTs',
    'T9s',
    '98s',
    '87s',
    '76s',
    '65s',
    '54s',
    // Offsuit calls
    'AQo',
  ],
  // Mixed
  [
    { hand: '88', freq: 0.6, action: 'mixed', altAction: 'fold' },
    { hand: '77', freq: 0.4, action: 'mixed', altAction: 'fold' },
    { hand: '66', freq: 0.2, action: 'mixed', altAction: 'fold' },
    { hand: 'A9s', freq: 0.5, action: 'mixed', altAction: 'fold' },
    { hand: 'A8s', freq: 0.35, action: 'mixed', altAction: 'fold' },
    { hand: 'A3s', freq: 0.4, action: 'mixed', altAction: 'fold' },
    { hand: 'A2s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'KTs', freq: 0.55, action: 'mixed', altAction: 'fold' },
    { hand: 'K9s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'QTs', freq: 0.5, action: 'mixed', altAction: 'fold' },
    { hand: 'Q9s', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: 'J9s', freq: 0.4, action: 'mixed', altAction: 'fold' },
    { hand: 'T8s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: '97s', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: '86s', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: '75s', freq: 0.2, action: 'mixed', altAction: 'fold' },
    { hand: 'AJo', freq: 0.45, action: 'mixed', altAction: 'fold' },
    { hand: 'ATo', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: 'KQo', freq: 0.35, action: 'mixed', altAction: 'fold' },
  ]
);

// ---------------------------------------------------------------------------
// 8) CO vs 3-Bet from BTN (4bet / call / fold)
// ---------------------------------------------------------------------------
// CO faces 3-bet from BTN: 4-bet ~6%, call ~18%, fold the rest
const coVs3betBTN6max = buildDefenseChart(
  // 4-bet (raise)
  [
    'AA', 'KK', 'QQ',
    'AKs',
    'AKo',
    // 4-bet bluffs
    'A5s', 'A4s',
  ],
  // Call
  [
    'JJ', 'TT', '99',
    'AQs', 'AJs',
    'KQs', 'KJs',
    'QJs',
    'JTs',
    'T9s',
    '98s',
    '87s',
    '76s',
    // Offsuit
    'AQo',
  ],
  // Mixed
  [
    { hand: '88', freq: 0.5, action: 'mixed', altAction: 'fold' },
    { hand: '77', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'ATs', freq: 0.55, action: 'mixed', altAction: 'fold' },
    { hand: 'A9s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'A3s', freq: 0.35, action: 'mixed', altAction: 'fold' },
    { hand: 'A2s', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: 'KTs', freq: 0.5, action: 'mixed', altAction: 'fold' },
    { hand: 'QTs', freq: 0.4, action: 'mixed', altAction: 'fold' },
    { hand: 'J9s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'T8s', freq: 0.25, action: 'mixed', altAction: 'fold' },
    { hand: '65s', freq: 0.35, action: 'mixed', altAction: 'fold' },
    { hand: '54s', freq: 0.3, action: 'mixed', altAction: 'fold' },
    { hand: 'AJo', freq: 0.4, action: 'mixed', altAction: 'fold' },
    { hand: 'KQo', freq: 0.3, action: 'mixed', altAction: 'fold' },
  ]
);

// =============================================================================
// 9-MAX OPEN RAISE RANGES
// =============================================================================

// ---------------------------------------------------------------------------
// 9) 9-max UTG Open ~15%
// ---------------------------------------------------------------------------
const utgOpen9max = buildOpenChart(
  [
    // Pairs
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77',
    // Suited broadways
    'AKs', 'AQs', 'AJs', 'ATs',
    'KQs', 'KJs',
    'QJs',
    'JTs',
    // Suited connector
    'T9s',
    // Suited ace blocker
    'A5s',
    // Offsuit broadways
    'AKo', 'AQo', 'AJo',
  ],
  [
    { hand: '66', freq: 0.7 },
    { hand: 'A4s', freq: 0.4 },
    { hand: 'KTs', freq: 0.6 },
    { hand: 'QTs', freq: 0.35 },
    { hand: 'KQo', freq: 0.75 },
    { hand: 'ATo', freq: 0.3 },
  ]
);

// ---------------------------------------------------------------------------
// 10) 9-max MP Open ~18%
// ---------------------------------------------------------------------------
const mpOpen9max = buildOpenChart(
  [
    // Pairs
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77',
    // Suited broadways
    'AKs', 'AQs', 'AJs', 'ATs',
    'KQs', 'KJs', 'KTs',
    'QJs', 'QTs',
    'JTs',
    // Suited connectors
    'T9s',
    // Suited aces
    'A5s', 'A4s',
    // Offsuit broadways
    'AKo', 'AQo', 'AJo',
    'KQo',
  ],
  [
    { hand: '66', freq: 0.85 },
    { hand: '55', freq: 0.5 },
    { hand: 'A9s', freq: 0.5 },
    { hand: 'A3s', freq: 0.4 },
    { hand: '98s', freq: 0.55 },
    { hand: 'ATo', freq: 0.6 },
    { hand: 'KJo', freq: 0.4 },
  ]
);

// ---------------------------------------------------------------------------
// 11) 9-max CO Open ~27%
// ---------------------------------------------------------------------------
const coOpen9max = buildOpenChart(
  [
    // Pairs
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55',
    // Suited aces
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s',
    'A5s', 'A4s', 'A3s', 'A2s',
    // Suited broadways
    'KQs', 'KJs', 'KTs', 'K9s',
    'QJs', 'QTs', 'Q9s',
    'JTs', 'J9s',
    'T9s',
    // Suited connectors
    '98s', '87s',
    // Offsuit broadways
    'AKo', 'AQo', 'AJo', 'ATo',
    'KQo', 'KJo', 'KTo',
    'QJo',
  ],
  [
    { hand: '44', freq: 0.8 },
    { hand: '33', freq: 0.4 },
    { hand: 'A7s', freq: 0.65 },
    { hand: 'A6s', freq: 0.5 },
    { hand: 'K8s', freq: 0.45 },
    { hand: 'Q8s', freq: 0.35 },
    { hand: 'J8s', freq: 0.4 },
    { hand: 'T8s', freq: 0.5 },
    { hand: '76s', freq: 0.6 },
    { hand: '65s', freq: 0.4 },
    { hand: 'QTo', freq: 0.5 },
    { hand: 'JTo', freq: 0.4 },
    { hand: 'A9o', freq: 0.45 },
  ]
);

// ---------------------------------------------------------------------------
// 12) 9-max BTN Open ~42%
// ---------------------------------------------------------------------------
const btnOpen9max = buildOpenChart(
  [
    // Pairs
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    // Suited aces
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    // Suited kings
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
    // Suited queens
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s',
    // Suited jacks
    'JTs', 'J9s', 'J8s',
    // Suited connectors
    'T9s', 'T8s', 'T7s',
    '98s', '97s',
    '87s', '86s',
    '76s', '75s',
    '65s', '64s',
    '54s', '53s',
    '43s',
    // Offsuit broadways
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o',
    'KQo', 'KJo', 'KTo', 'K9o',
    'QJo', 'QTo', 'Q9o',
    'JTo', 'J9o',
    'T9o',
    '98o',
  ],
  [
    { hand: 'K4s', freq: 0.6 },
    { hand: 'K3s', freq: 0.45 },
    { hand: 'K2s', freq: 0.35 },
    { hand: 'Q6s', freq: 0.55 },
    { hand: 'Q5s', freq: 0.35 },
    { hand: 'J7s', freq: 0.5 },
    { hand: 'J6s', freq: 0.35 },
    { hand: 'T6s', freq: 0.35 },
    { hand: '96s', freq: 0.4 },
    { hand: '85s', freq: 0.4 },
    { hand: '74s', freq: 0.35 },
    { hand: '63s', freq: 0.25 },
    { hand: '52s', freq: 0.2 },
    { hand: 'A7o', freq: 0.6 },
    { hand: 'A6o', freq: 0.45 },
    { hand: 'A5o', freq: 0.55 },
    { hand: 'A4o', freq: 0.35 },
    { hand: 'K8o', freq: 0.4 },
    { hand: 'Q8o', freq: 0.3 },
    { hand: 'J8o', freq: 0.25 },
    { hand: 'T8o', freq: 0.3 },
    { hand: '87o', freq: 0.3 },
    { hand: '76o', freq: 0.2 },
  ]
);

// =============================================================================
// Assemble all charts
// =============================================================================

const gtoCharts: GTOChart[] = [
  // 6-max open raises
  {
    position: 'UTG',
    tableSize: '6max',
    scenario: 'open',
    description: 'UTG open raise range (6-max, ~18% of hands). Tight range focusing on premium hands, strong broadways, and select suited connectors.',
    chart: utgOpen6max,
  },
  {
    position: 'HJ',
    tableSize: '6max',
    scenario: 'open',
    description: 'HJ (Hijack) open raise range (6-max, ~22% of hands). Slightly wider than UTG with more suited connectors and broadways.',
    chart: hjOpen6max,
  },
  {
    position: 'CO',
    tableSize: '6max',
    scenario: 'open',
    description: 'CO (Cutoff) open raise range (6-max, ~28% of hands). Wide range leveraging position with more speculative hands.',
    chart: coOpen6max,
  },
  {
    position: 'BTN',
    tableSize: '6max',
    scenario: 'open',
    description: 'BTN (Button) open raise range (6-max, ~45% of hands). Very wide range exploiting the best position at the table.',
    chart: btnOpen6max,
  },
  {
    position: 'SB',
    tableSize: '6max',
    scenario: 'open',
    description: 'SB (Small Blind) open raise range (6-max, ~40% of hands). Raise-or-fold strategy when folded to in the SB.',
    chart: sbOpen6max,
  },
  // 6-max defense charts
  {
    position: 'BB',
    tableSize: '6max',
    scenario: 'vs_raise',
    description: 'BB defense vs BTN open raise (6-max). Wide defending range including 3-bets for value and as bluffs, plus a large calling range.',
    chart: bbVsBtnOpen6max,
  },
  {
    position: 'BTN',
    tableSize: '6max',
    scenario: 'vs_3bet',
    description: 'BTN response to BB 3-bet (6-max). Includes 4-bet value hands, 4-bet bluffs with Ax blockers, and a calling range of strong hands with good playability.',
    chart: btnVs3betBB6max,
  },
  {
    position: 'CO',
    tableSize: '6max',
    scenario: 'vs_3bet',
    description: 'CO response to BTN 3-bet (6-max). Tighter than BTN vs 3-bet due to worse position. 4-bets premiums and bluffs with Ax blockers.',
    chart: coVs3betBTN6max,
  },
  // 9-max open raises
  {
    position: 'UTG',
    tableSize: '9max',
    scenario: 'open',
    description: 'UTG open raise range (9-max, ~15% of hands). Very tight range with 8 positions behind. Only premiums and strong suited hands.',
    chart: utgOpen9max,
  },
  {
    position: 'MP',
    tableSize: '9max',
    scenario: 'open',
    description: 'MP (Middle Position) open raise range (9-max, ~18% of hands). Similar to 6-max UTG. Adds a few more suited hands.',
    chart: mpOpen9max,
  },
  {
    position: 'CO',
    tableSize: '9max',
    scenario: 'open',
    description: 'CO (Cutoff) open raise range (9-max, ~27% of hands). Opens up significantly as fewer players remain to act.',
    chart: coOpen9max,
  },
  {
    position: 'BTN',
    tableSize: '9max',
    scenario: 'open',
    description: 'BTN (Button) open raise range (9-max, ~42% of hands). Very wide, nearly identical to 6-max BTN.',
    chart: btnOpen9max,
  },
];

// =============================================================================
// Lookup Functions
// =============================================================================

/**
 * Find a chart by position, table size, and scenario.
 */
function getChart(
  position: string,
  tableSize: '6max' | '9max',
  scenario: string
): GTOChart | undefined {
  return gtoCharts.find(
    c =>
      c.position.toUpperCase() === position.toUpperCase() &&
      c.tableSize === tableSize &&
      c.scenario === scenario
  );
}

/**
 * Get the action for a specific hand in a specific chart.
 */
function getHandAction(
  position: string,
  tableSize: '6max' | '9max',
  scenario: string,
  hand: string
): HandAction | undefined {
  const chart = getChart(position, tableSize, scenario);
  if (!chart) return undefined;
  return chart.chart[hand];
}

/**
 * Return a CSS color string for rendering a hand action on the grid.
 */
function getHandColor(action: Action): string {
  switch (action) {
    case 'raise':
      return '#ef4444'; // red - raise / open
    case 'call':
      return '#22c55e'; // green - call
    case 'fold':
      return '#374151'; // dark gray - fold
    case 'mixed':
      return '#f59e0b'; // amber - mixed strategy
    default:
      return '#374151';
  }
}

// =============================================================================
// Exports
// =============================================================================

export type { Action, HandAction, GTOChart };
export { gtoCharts, getChart, getHandAction, HAND_GRID, getHandColor, ALL_HANDS };
