// =============================================================================
// GTO Solver - Game Theory Optimal Decision Engine
// AI Poker School
// =============================================================================

// -----------------------------------------------------------------------------
// Core Types
// -----------------------------------------------------------------------------

export type Position = 'UTG' | 'UTG1' | 'MP' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';

export type Action = 'raise' | 'call' | 'fold' | '3bet' | '4bet' | 'allin';

export type BetSizing = '33pot' | '50pot' | '75pot' | '100pot' | 'overbet';

export type Street = 'preflop' | 'flop' | 'turn' | 'river';

export type Suit = 'h' | 'd' | 'c' | 's';

export type Rank = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export type BoardTextureType = 'dry' | 'wet' | 'coordinated' | 'paired' | 'monotone' | 'disconnected';

export type TableSize = 6 | 9;

export type Scenario =
  | 'open'
  | 'vs_open'
  | '3bet'
  | 'vs_3bet'
  | '4bet'
  | 'vs_4bet'
  | 'squeeze';

export interface Card {
  rank: Rank;
  suit: Suit;
}

/**
 * One cell of the 13x13 starting hand grid.
 * - Pairs sit on the diagonal (AA, KK, ... 22)
 * - Suited combos are above the diagonal (AKs, AQs, ...)
 * - Offsuit combos are below the diagonal (AKo, AQo, ...)
 */
export interface HandCell {
  hand: string;          // e.g. "AKs", "QTo", "88"
  suited: boolean;
  pair: boolean;
  action: Action;
  frequency: number;     // 0-1, the frequency the action is taken
  color: string;         // hex color for UI rendering
  ev: number;            // expected value in bb
}

/** The full 13x13 grid (row-major, [row][col]). */
export type HandRange = HandCell[][];

export interface GTOChart {
  position: Position;
  tableSize: TableSize;
  scenario: Scenario;
  range: HandRange;
  totalCombos: number;
  openPercent: number;
}

export interface BoardTexture {
  type: BoardTextureType;
  flushDrawPossible: boolean;
  straightDrawPossible: boolean;
  pairedBoard: boolean;
  highCard: Rank;
  connectedness: number;   // 0-1
  wetness: number;         // 0-1, 0 = bone dry, 1 = very wet
  monotone: boolean;
  twoTone: boolean;
  rainbow: boolean;
  summary: string;
}

export interface PotOddsResult {
  potOdds: number;          // percent
  potOddsRatio: string;     // e.g. "3.5:1"
  requiredEquity: number;   // percent to break even
  impliedOdds: number;      // estimated implied odds multiplier
  isGoodCall: boolean;
  explanation: string;
}

export interface PostflopGuidance {
  recommendedAction: Action | 'bet' | 'check' | 'checkraise';
  sizing: BetSizing;
  sizingBB: number;
  frequency: number;        // 0-1
  confidence: number;       // 0-1
  ev: number;
  reasoning: string;
  cbetFrequency: number;
  checkRaiseFrequency: number;
  boardTexture: BoardTexture;
}

export interface GTODecision {
  street: Street;
  action: Action | 'bet' | 'check' | 'checkraise';
  confidence: number;
  ev: number;
  potOdds: PotOddsResult | null;
  rangeAdvantage: 'hero' | 'villain' | 'neutral';
  positionAdvantage: boolean;
  reasoning: string;
  alternatives: { action: string; frequency: number; ev: number }[];
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const RANKS: Rank[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const RANK_VALUES: Record<Rank, number> = {
  A: 14, K: 13, Q: 12, J: 11, T: 10,
  '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2,
};

/** Color coding for the UI grid. */
const COLORS = {
  raise: '#ef4444',       // red
  call: '#22c55e',        // green
  fold: '#6b7280',        // gray
  '3bet': '#f97316',      // orange
  '4bet': '#a855f7',      // purple
  allin: '#dc2626',       // dark red
  mixed: '#eab308',       // yellow (for mixed-frequency actions)
};

// -----------------------------------------------------------------------------
// Preflop Hand Strength Table
// Sklansky-Karlsson style values for every combo in the 13x13 grid.
// Higher = stronger. These drive the range construction.
// -----------------------------------------------------------------------------

/**
 * Hand strength scores (0-100) for all 169 combos.
 * Layout: handStrength[row][col] where row = high card index, col = low card index
 * in RANKS order. Diagonal = pairs, above diagonal = suited, below = offsuit.
 */
const HAND_STRENGTH: number[][] = [
  // A    K    Q    J    T    9    8    7    6    5    4    3    2
  [ 95,  82,  78,  75,  73,  63,  61,  59,  57,  57,  53,  52,  51], // A
  [ 78,  90,  72,  69,  67,  58,  55,  53,  50,  48,  46,  44,  43], // K
  [ 73,  67,  86,  66,  64,  55,  52,  49,  46,  44,  42,  40,  38], // Q
  [ 70,  64,  61,  83,  63,  54,  50,  47,  44,  42,  39,  37,  35], // J
  [ 68,  62,  58,  57,  80,  53,  49,  46,  43,  40,  37,  35,  33], // T
  [ 56,  51,  48,  47,  46,  72,  46,  43,  40,  37,  34,  32,  30], // 9
  [ 53,  47,  44,  42,  41,  39,  68,  42,  39,  36,  33,  30,  28], // 8
  [ 51,  45,  41,  39,  38,  36,  35,  64,  38,  35,  32,  29,  27], // 7
  [ 49,  42,  38,  36,  34,  32,  31,  31,  60,  34,  31,  28,  26], // 6
  [ 49,  40,  36,  34,  32,  30,  28,  27,  27,  56,  31,  28,  25], // 5
  [ 45,  38,  34,  31,  29,  27,  25,  24,  23,  24,  52,  26,  24], // 4
  [ 44,  36,  32,  29,  27,  24,  22,  21,  20,  20,  19,  48,  22], // 3
  [ 43,  35,  30,  27,  25,  22,  20,  19,  18,  17,  16,  15,  44], // 2
];

// -----------------------------------------------------------------------------
// Position open-raise percentages (9-max and 6-max)
// These are the approximate GTO open-raise frequencies.
// -----------------------------------------------------------------------------

const OPEN_RAISE_PCT: Record<TableSize, Record<Position, number>> = {
  9: {
    UTG:  15,
    UTG1: 17,
    MP:   20,
    HJ:   24,
    CO:   30,
    BTN:  45,
    SB:   40,
    BB:    0, // BB doesn't open, they defend
  },
  6: {
    UTG:  20,  // maps to MP in 9-max feel
    UTG1: 24,
    MP:   28,
    HJ:   30,
    CO:   35,
    BTN:  50,
    SB:   45,
    BB:    0,
  },
};

/**
 * 3-bet frequencies as a percentage of the opener's range.
 * Key: defender position, value depends on opener position (simplified).
 */
const THREE_BET_PCT: Record<TableSize, Record<Position, number>> = {
  9: {
    UTG:   3,
    UTG1:  4,
    MP:    5,
    HJ:    7,
    CO:    9,
    BTN:  12,
    SB:   10,
    BB:    9,
  },
  6: {
    UTG:   5,
    UTG1:  6,
    MP:    7,
    HJ:    9,
    CO:   11,
    BTN:  14,
    SB:   12,
    BB:   11,
  },
};

/** Call vs open raise frequencies (BB perspective primarily). */
const CALL_VS_RAISE_PCT: Record<TableSize, Record<Position, number>> = {
  9: {
    UTG:   2,
    UTG1:  3,
    MP:    5,
    HJ:    8,
    CO:   12,
    BTN:  18,
    SB:   12,
    BB:   40,  // BB defends wide
  },
  6: {
    UTG:   4,
    UTG1:  5,
    MP:    7,
    HJ:   10,
    CO:   14,
    BTN:  20,
    SB:   14,
    BB:   44,
  },
};

/** 4-bet frequencies (as % of hands). */
const FOUR_BET_PCT: Record<TableSize, Record<Position, number>> = {
  9: {
    UTG:   2.5,
    UTG1:  2.8,
    MP:    3.0,
    HJ:    3.5,
    CO:    4.0,
    BTN:   5.0,
    SB:    4.5,
    BB:    4.0,
  },
  6: {
    UTG:   3.0,
    UTG1:  3.5,
    MP:    4.0,
    HJ:    4.5,
    CO:    5.0,
    BTN:   6.0,
    SB:    5.5,
    BB:    5.0,
  },
};

// -----------------------------------------------------------------------------
// Continuation Bet Data
// Frequencies and sizings by board texture.
// -----------------------------------------------------------------------------

interface CBetProfile {
  frequency: number;       // 0-1
  preferredSizing: BetSizing;
  checkRaiseFrequency: number; // 0-1 (when facing a bet as defender)
}

const CBET_BY_TEXTURE: Record<BoardTextureType, CBetProfile> = {
  dry:           { frequency: 0.70, preferredSizing: '33pot', checkRaiseFrequency: 0.08 },
  disconnected:  { frequency: 0.65, preferredSizing: '33pot', checkRaiseFrequency: 0.07 },
  paired:        { frequency: 0.55, preferredSizing: '33pot', checkRaiseFrequency: 0.10 },
  wet:           { frequency: 0.45, preferredSizing: '75pot', checkRaiseFrequency: 0.14 },
  coordinated:   { frequency: 0.40, preferredSizing: '75pot', checkRaiseFrequency: 0.15 },
  monotone:      { frequency: 0.35, preferredSizing: '50pot', checkRaiseFrequency: 0.18 },
};

/** Map sizing label to a pot multiplier. */
const SIZING_MULTIPLIER: Record<BetSizing, number> = {
  '33pot':  0.33,
  '50pot':  0.50,
  '75pot':  0.75,
  '100pot': 1.00,
  overbet:  1.50,
};

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

function handName(row: number, col: number): string {
  const r1 = RANKS[row];
  const r2 = RANKS[col];
  if (row === col) return `${r1}${r2}`;
  if (row < col) return `${r1}${r2}s`; // suited (above diagonal)
  return `${r2}${r1}o`;                 // offsuit (below diagonal)
}

function isSuited(row: number, col: number): boolean {
  return row < col;
}

function isPair(row: number, col: number): boolean {
  return row === col;
}

/**
 * Count the number of actual combos a cell represents.
 * Pairs = 6, suited = 4, offsuit = 12.
 */
function comboCount(row: number, col: number): number {
  if (row === col) return 6;
  if (row < col) return 4;
  return 12;
}

/** Convert a hand strength score to an EV estimate in big blinds (very rough). */
function strengthToEV(strength: number, position: Position): number {
  const posMultiplier: Record<Position, number> = {
    UTG: 0.6, UTG1: 0.65, MP: 0.7, HJ: 0.8,
    CO: 0.9, BTN: 1.0, SB: 0.75, BB: 0.7,
  };
  const baseEV = (strength - 50) * 0.08;
  return Math.round(baseEV * (posMultiplier[position] ?? 0.8) * 100) / 100;
}

/** Parse a card string like "Ah" into a Card object. */
function parseCard(s: string): Card {
  if (s.length !== 2) throw new Error(`Invalid card string: "${s}"`);
  const rank = s[0].toUpperCase() as Rank;
  const suit = s[1].toLowerCase() as Suit;
  if (!RANKS.includes(rank)) throw new Error(`Invalid rank: ${rank}`);
  if (!['h', 'd', 'c', 's'].includes(suit)) throw new Error(`Invalid suit: ${suit}`);
  return { rank, suit };
}

function rankValue(r: Rank): number {
  return RANK_VALUES[r];
}

// -----------------------------------------------------------------------------
// Board Texture Analyzer
// -----------------------------------------------------------------------------

export function analyzeBoard(boardCards: Card[]): BoardTexture {
  if (boardCards.length < 3 || boardCards.length > 5) {
    throw new Error('Board must have 3-5 cards');
  }

  const suits = boardCards.map(c => c.suit);
  const ranks = boardCards.map(c => rankValue(c.rank)).sort((a, b) => b - a);

  // Suit analysis
  const suitCounts: Record<string, number> = {};
  for (const s of suits) {
    suitCounts[s] = (suitCounts[s] || 0) + 1;
  }
  const maxSuitCount = Math.max(...Object.values(suitCounts));
  const uniqueSuits = Object.keys(suitCounts).length;

  const monotone = maxSuitCount >= 3 && boardCards.length === 3
    ? maxSuitCount === 3
    : maxSuitCount >= 4;
  const twoTone = !monotone && maxSuitCount >= 2;
  const rainbow = uniqueSuits === boardCards.length && boardCards.length <= 4;

  const flushDrawPossible = maxSuitCount >= 2;

  // Connectedness analysis
  const sorted = [...ranks];
  let gaps = 0;
  let connected = 0;
  for (let i = 0; i < sorted.length - 1; i++) {
    const diff = sorted[i] - sorted[i + 1];
    if (diff === 1) connected++;
    else if (diff === 0) { /* paired, handled below */ }
    else gaps += diff - 1;
  }
  // Check for A-low straight potential (A2345)
  if (sorted.includes(14) && sorted.includes(2)) {
    connected++;
  }

  const connectedness = Math.min(1, connected / (boardCards.length - 1));
  const straightDrawPossible = connectedness > 0.3 || (sorted[0] - sorted[sorted.length - 1] <= 4);

  // Paired
  const rankCounts: Record<number, number> = {};
  for (const r of ranks) {
    rankCounts[r] = (rankCounts[r] || 0) + 1;
  }
  const pairedBoard = Object.values(rankCounts).some(c => c >= 2);

  // Wetness composite score
  let wetness = 0;
  if (flushDrawPossible) wetness += 0.3;
  if (monotone) wetness += 0.2;
  wetness += connectedness * 0.3;
  if (straightDrawPossible) wetness += 0.2;
  if (pairedBoard) wetness -= 0.15; // paired boards are drier
  wetness = Math.max(0, Math.min(1, wetness));

  // Determine primary texture type
  let type: BoardTextureType;
  if (monotone) {
    type = 'monotone';
  } else if (pairedBoard && wetness < 0.4) {
    type = 'paired';
  } else if (wetness >= 0.65) {
    type = 'coordinated';
  } else if (wetness >= 0.4) {
    type = 'wet';
  } else if (connectedness < 0.2) {
    type = 'disconnected';
  } else {
    type = 'dry';
  }

  const highCard = boardCards.reduce((best, c) =>
    rankValue(c.rank) > rankValue(best.rank) ? c : best
  ).rank;

  // Build human-readable summary
  const parts: string[] = [];
  if (monotone) parts.push('monotone');
  else if (rainbow) parts.push('rainbow');
  else if (twoTone) parts.push('two-tone');
  if (pairedBoard) parts.push('paired');
  if (connectedness > 0.5) parts.push('highly connected');
  else if (connectedness > 0.2) parts.push('semi-connected');
  else parts.push('disconnected');
  parts.push(`(${highCard}-high)`);

  const summary = `${type.charAt(0).toUpperCase() + type.slice(1)} board: ${parts.join(', ')}. Wetness: ${Math.round(wetness * 100)}%`;

  return {
    type,
    flushDrawPossible,
    straightDrawPossible,
    pairedBoard,
    highCard,
    connectedness,
    wetness,
    monotone,
    twoTone,
    rainbow,
    summary,
  };
}

// -----------------------------------------------------------------------------
// Pot Odds Calculator
// -----------------------------------------------------------------------------

export function calculatePotOdds(
  potSize: number,
  betToCall: number,
  estimatedImpliedPot?: number,
): PotOddsResult {
  if (betToCall <= 0) {
    return {
      potOdds: 0,
      potOddsRatio: 'N/A',
      requiredEquity: 0,
      impliedOdds: 0,
      isGoodCall: true,
      explanation: 'No bet to call -- free action.',
    };
  }

  const totalPot = potSize + betToCall;
  const potOdds = (betToCall / totalPot) * 100;
  const ratio = Math.round(((totalPot - betToCall) / betToCall) * 10) / 10;
  const requiredEquity = potOdds; // break-even equity = price / (price + pot)

  const impliedPot = estimatedImpliedPot ?? totalPot * 1.5;
  const impliedOdds = Math.round((impliedPot / betToCall) * 10) / 10;

  const isGoodCall = requiredEquity < 35; // very rough threshold

  const explanation =
    `Pot is ${potSize}, facing a bet of ${betToCall}. ` +
    `Pot odds: ${Math.round(potOdds)}% (${ratio}:1). ` +
    `You need at least ${Math.round(requiredEquity)}% equity to call. ` +
    `Implied odds ratio: ~${impliedOdds}:1.`;

  return {
    potOdds: Math.round(potOdds * 100) / 100,
    potOddsRatio: `${ratio}:1`,
    requiredEquity: Math.round(requiredEquity * 100) / 100,
    impliedOdds,
    isGoodCall,
    explanation,
  };
}

// -----------------------------------------------------------------------------
// Range Builder
// Constructs the 13x13 HandRange grid for a given scenario.
// -----------------------------------------------------------------------------

function buildRange(
  targetPercent: number,
  position: Position,
  action: Action,
): HandRange {
  // Flatten all cells with their strength, sort, pick top N%.
  interface CellInfo {
    row: number;
    col: number;
    strength: number;
    combos: number;
  }

  const cells: CellInfo[] = [];
  for (let r = 0; r < 13; r++) {
    for (let c = 0; c < 13; c++) {
      cells.push({
        row: r,
        col: c,
        strength: HAND_STRENGTH[r][c],
        combos: comboCount(r, c),
      });
    }
  }

  // Total combos = 1326
  const totalCombos = 1326;
  const targetCombos = Math.round((targetPercent / 100) * totalCombos);

  // Sort by strength descending
  cells.sort((a, b) => b.strength - a.strength);

  // Mark which cells are in range
  const inRange = new Set<string>();
  const partialFreq: Record<string, number> = {};
  let accumulated = 0;

  for (const cell of cells) {
    const key = `${cell.row},${cell.col}`;
    if (accumulated + cell.combos <= targetCombos) {
      inRange.add(key);
      partialFreq[key] = 1.0;
      accumulated += cell.combos;
    } else if (accumulated < targetCombos) {
      // Partial inclusion (mixed frequency)
      const remaining = targetCombos - accumulated;
      const freq = Math.round((remaining / cell.combos) * 100) / 100;
      inRange.add(key);
      partialFreq[key] = Math.max(0.05, freq);
      accumulated += remaining;
      break;
    }
  }

  // Build the grid
  const grid: HandRange = [];
  for (let r = 0; r < 13; r++) {
    const row: HandCell[] = [];
    for (let c = 0; c < 13; c++) {
      const key = `${r},${c}`;
      const isIn = inRange.has(key);
      const freq = isIn ? (partialFreq[key] ?? 1.0) : 0;
      const cellAction: Action = isIn ? action : 'fold';
      const color = isIn
        ? freq < 1.0
          ? COLORS.mixed
          : COLORS[action]
        : COLORS.fold;

      row.push({
        hand: handName(r, c),
        suited: isSuited(r, c),
        pair: isPair(r, c),
        action: cellAction,
        frequency: freq,
        color,
        ev: isIn ? strengthToEV(HAND_STRENGTH[r][c], position) : -1.5,
      });
    }
    grid.push(row);
  }

  return grid;
}

// -----------------------------------------------------------------------------
// Public API: getGTOChart
// -----------------------------------------------------------------------------

/**
 * Retrieve a full 13x13 GTO chart for a position / table size / scenario.
 */
export function getGTOChart(
  position: Position,
  tableSize: TableSize = 9,
  scenario: Scenario = 'open',
): GTOChart {
  let pct: number;
  let action: Action;

  switch (scenario) {
    case 'open':
      pct = OPEN_RAISE_PCT[tableSize][position];
      action = 'raise';
      break;
    case '3bet':
    case 'vs_open':
      pct = THREE_BET_PCT[tableSize][position];
      action = '3bet';
      break;
    case 'vs_3bet':
      pct = CALL_VS_RAISE_PCT[tableSize][position];
      action = 'call';
      break;
    case '4bet':
    case 'vs_4bet':
      pct = FOUR_BET_PCT[tableSize][position];
      action = '4bet';
      break;
    case 'squeeze':
      pct = THREE_BET_PCT[tableSize][position] * 0.8; // tighter than normal 3bet
      action = '3bet';
      break;
    default:
      pct = OPEN_RAISE_PCT[tableSize][position];
      action = 'raise';
  }

  if (pct === 0) {
    // BB open doesn't exist; return an empty grid
    pct = 0.01;
  }

  const range = buildRange(pct, position, action);

  // Count actual combos in range
  let totalCombos = 0;
  for (let r = 0; r < 13; r++) {
    for (let c = 0; c < 13; c++) {
      if (range[r][c].action !== 'fold') {
        totalCombos += comboCount(r, c) * range[r][c].frequency;
      }
    }
  }

  return {
    position,
    tableSize,
    scenario,
    range,
    totalCombos: Math.round(totalCombos),
    openPercent: pct,
  };
}

// -----------------------------------------------------------------------------
// Merged Chart Builder
// Builds a chart that combines raise/3bet/call/fold colors per cell.
// Useful for a "full defense" chart (e.g., BB vs BTN open).
// -----------------------------------------------------------------------------

export interface MergedCell {
  hand: string;
  suited: boolean;
  pair: boolean;
  raiseFreq: number;
  callFreq: number;
  foldFreq: number;
  primaryAction: Action;
  color: string;
  ev: number;
}

export type MergedRange = MergedCell[][];

export function getMergedDefenseChart(
  defenderPosition: Position,
  openerPosition: Position,
  tableSize: TableSize = 9,
): MergedRange {
  const threebet = getGTOChart(defenderPosition, tableSize, '3bet');
  const callChart = getGTOChart(defenderPosition, tableSize, 'vs_3bet');

  const grid: MergedRange = [];
  for (let r = 0; r < 13; r++) {
    const row: MergedCell[] = [];
    for (let c = 0; c < 13; c++) {
      const rbCell = threebet.range[r][c];
      const clCell = callChart.range[r][c];

      const raiseFreq = rbCell.action !== 'fold' ? rbCell.frequency : 0;
      const callFreq = clCell.action !== 'fold' ? clCell.frequency : 0;
      const foldFreq = Math.max(0, 1 - raiseFreq - callFreq);

      let primaryAction: Action;
      let color: string;
      if (raiseFreq > callFreq && raiseFreq > foldFreq) {
        primaryAction = '3bet';
        color = COLORS['3bet'];
      } else if (callFreq >= raiseFreq && callFreq > foldFreq) {
        primaryAction = 'call';
        color = COLORS.call;
      } else {
        primaryAction = 'fold';
        color = COLORS.fold;
      }

      row.push({
        hand: handName(r, c),
        suited: isSuited(r, c),
        pair: isPair(r, c),
        raiseFreq,
        callFreq,
        foldFreq,
        primaryAction,
        color,
        ev: strengthToEV(HAND_STRENGTH[r][c], defenderPosition),
      });
    }
    grid.push(row);
  }

  return grid;
}

// -----------------------------------------------------------------------------
// GTOSolver Class
// -----------------------------------------------------------------------------

export class GTOSolver {
  private tableSize: TableSize;

  constructor(tableSize: TableSize = 9) {
    this.tableSize = tableSize;
  }

  // ---------------------------------------------------------------------------
  // Preflop
  // ---------------------------------------------------------------------------

  /**
   * Get the GTO-recommended preflop action for a specific hand and position.
   *
   * @param hand  - e.g. "AKs", "QTo", "88"
   * @param position - player position
   * @param scenario - the preflop scenario (open, vs_open, 3bet, etc.)
   */
  getPreflopAction(
    hand: string,
    position: Position,
    scenario: Scenario = 'open',
  ): GTODecision {
    const chart = getGTOChart(position, this.tableSize, scenario);
    const cell = this.findCell(chart.range, hand);

    if (!cell) {
      return {
        street: 'preflop',
        action: 'fold',
        confidence: 0,
        ev: -1,
        potOdds: null,
        rangeAdvantage: 'villain',
        positionAdvantage: false,
        reasoning: `Hand "${hand}" could not be resolved.`,
        alternatives: [],
      };
    }

    const isInPosition = ['CO', 'BTN'].includes(position);
    const confidence = cell.action !== 'fold'
      ? Math.min(1, cell.frequency * 0.8 + 0.2)
      : 0.85;

    const alternatives: { action: string; frequency: number; ev: number }[] = [];
    if (cell.action !== 'fold') {
      alternatives.push({ action: 'fold', frequency: 1 - cell.frequency, ev: 0 });
    }
    if (cell.action === 'raise' && cell.frequency < 0.95) {
      alternatives.push({ action: 'call', frequency: (1 - cell.frequency) * 0.5, ev: cell.ev * 0.6 });
    }

    return {
      street: 'preflop',
      action: cell.action,
      confidence,
      ev: cell.ev,
      potOdds: null,
      rangeAdvantage: cell.ev > 0 ? 'hero' : 'villain',
      positionAdvantage: isInPosition,
      reasoning: this.buildPreflopReasoning(cell, position, scenario),
      alternatives,
    };
  }

  // ---------------------------------------------------------------------------
  // Postflop
  // ---------------------------------------------------------------------------

  /**
   * Get GTO guidance for a postflop decision.
   *
   * @param boardCards    - the community cards (3-5 cards as strings like "Ah", "Td", "7c")
   * @param holeCards     - player's two hole cards
   * @param position      - player position
   * @param isAggressor   - true if hero was the preflop aggressor
   * @param potSize       - current pot in bb
   * @param betFacing     - bet hero must call (0 if no bet)
   * @param street        - flop, turn, or river
   */
  getPostflopAction(
    boardCards: string[],
    holeCards: [string, string],
    position: Position,
    isAggressor: boolean,
    potSize: number,
    betFacing: number = 0,
    street: Street = 'flop',
  ): PostflopGuidance {
    const board = boardCards.map(parseCard);
    const hole = holeCards.map(parseCard);
    const texture = analyzeBoard(board);
    const cbetProfile = CBET_BY_TEXTURE[texture.type];

    const isInPosition = ['CO', 'BTN', 'HJ'].includes(position);

    // Adjust cbet frequency based on position and aggressor status
    let cbetFreq = cbetProfile.frequency;
    if (isAggressor && isInPosition) {
      cbetFreq = Math.min(1, cbetFreq + 0.10);
    } else if (isAggressor && !isInPosition) {
      cbetFreq = Math.max(0, cbetFreq - 0.05);
    } else {
      cbetFreq = Math.max(0, cbetFreq - 0.20);
    }

    // Hand-board interaction score
    const interactionScore = this.evaluateHandBoardInteraction(hole, board);

    // Determine recommended action
    let recommendedAction: PostflopGuidance['recommendedAction'];
    let sizing = cbetProfile.preferredSizing;
    let frequency: number;
    let checkRaiseFreq = cbetProfile.checkRaiseFrequency;

    if (betFacing > 0) {
      // Facing a bet
      const odds = calculatePotOdds(potSize, betFacing);
      if (interactionScore > 0.7) {
        recommendedAction = 'raise';
        frequency = 0.6;
        sizing = '75pot';
      } else if (interactionScore > 0.4 || odds.isGoodCall) {
        recommendedAction = 'call';
        frequency = 0.7;
        sizing = '33pot'; // irrelevant for call, but kept for interface
      } else if (interactionScore > 0.25 && checkRaiseFreq > 0.1) {
        recommendedAction = 'checkraise';
        frequency = checkRaiseFreq;
        sizing = '75pot';
      } else {
        recommendedAction = 'fold';
        frequency = 1 - interactionScore;
        sizing = '33pot';
      }
    } else {
      // No bet facing
      if (isAggressor && interactionScore > 0.35) {
        recommendedAction = 'bet';
        frequency = cbetFreq;
        // Sizing selection based on texture
        if (texture.wetness > 0.6) {
          sizing = '75pot';
        } else if (texture.wetness > 0.3) {
          sizing = '50pot';
        } else {
          sizing = '33pot';
        }
      } else if (!isAggressor && interactionScore > 0.65) {
        recommendedAction = 'checkraise';
        frequency = checkRaiseFreq;
        sizing = '75pot';
      } else if (interactionScore > 0.5) {
        recommendedAction = 'bet';
        frequency = interactionScore * 0.6;
        sizing = '50pot';
      } else {
        recommendedAction = 'check';
        frequency = 1 - interactionScore * 0.3;
        sizing = '33pot';
      }
    }

    // Adjust for street (later streets = more polarised, larger sizing)
    if (street === 'turn') {
      if (sizing === '33pot') sizing = '50pot';
      frequency = Math.max(0, frequency - 0.05);
    } else if (street === 'river') {
      if (sizing === '33pot') sizing = '75pot';
      if (sizing === '50pot') sizing = '75pot';
      frequency = Math.max(0, frequency - 0.10);
    }

    const sizingMultiplier = SIZING_MULTIPLIER[sizing];
    const sizingBB = Math.round(potSize * sizingMultiplier * 100) / 100;
    const ev = this.estimatePostflopEV(interactionScore, potSize, sizingBB, frequency);
    const confidence = Math.min(1, interactionScore * 0.5 + (isInPosition ? 0.15 : 0) + (isAggressor ? 0.1 : 0) + 0.25);

    const reasoning = this.buildPostflopReasoning(
      texture, interactionScore, isAggressor, isInPosition, recommendedAction, sizing, street,
    );

    return {
      recommendedAction,
      sizing,
      sizingBB,
      frequency: Math.round(frequency * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
      ev: Math.round(ev * 100) / 100,
      reasoning,
      cbetFrequency: Math.round(cbetFreq * 100) / 100,
      checkRaiseFrequency: Math.round(checkRaiseFreq * 100) / 100,
      boardTexture: texture,
    };
  }

  // ---------------------------------------------------------------------------
  // Board Analysis (public wrapper)
  // ---------------------------------------------------------------------------

  analyzeBoard(boardCards: string[]): BoardTexture {
    return analyzeBoard(boardCards.map(parseCard));
  }

  // ---------------------------------------------------------------------------
  // Pot Odds (public wrapper)
  // ---------------------------------------------------------------------------

  calculatePotOdds(potSize: number, betToCall: number, impliedPot?: number): PotOddsResult {
    return calculatePotOdds(potSize, betToCall, impliedPot);
  }

  // ---------------------------------------------------------------------------
  // Full Preflop Chart
  // ---------------------------------------------------------------------------

  getChart(position: Position, scenario: Scenario = 'open'): GTOChart {
    return getGTOChart(position, this.tableSize, scenario);
  }

  // ---------------------------------------------------------------------------
  // Internal Helpers
  // ---------------------------------------------------------------------------

  /**
   * Find a cell in the 13x13 grid by hand name (e.g. "AKs", "TT").
   */
  private findCell(range: HandRange, hand: string): HandCell | null {
    const normalized = this.normalizeHand(hand);
    for (let r = 0; r < 13; r++) {
      for (let c = 0; c < 13; c++) {
        if (range[r][c].hand === normalized) {
          return range[r][c];
        }
      }
    }
    return null;
  }

  /**
   * Normalize hand notation.
   * "KAs" -> "AKs", "9T" -> "T9o" (assuming offsuit if unspecified for non-pairs).
   */
  private normalizeHand(hand: string): string {
    if (hand.length < 2 || hand.length > 3) return hand;

    const r1 = hand[0].toUpperCase() as Rank;
    const r2 = hand[1].toUpperCase() as Rank;
    const suffix = hand.length === 3 ? hand[2].toLowerCase() : '';

    if (!RANKS.includes(r1) || !RANKS.includes(r2)) return hand;

    // Pair
    if (r1 === r2) return `${r1}${r2}`;

    // Ensure higher card first
    const v1 = RANK_VALUES[r1];
    const v2 = RANK_VALUES[r2];
    const high = v1 >= v2 ? r1 : r2;
    const low = v1 >= v2 ? r2 : r1;

    if (suffix === 's') return `${high}${low}s`;
    if (suffix === 'o') return `${high}${low}o`;
    // No suffix on non-pair -> assume offsuit
    return `${high}${low}o`;
  }

  /**
   * Score how well the hole cards interact with the board.
   * Returns 0-1, where 1 = nuts-level connection.
   */
  private evaluateHandBoardInteraction(hole: Card[], board: Card[]): number {
    const allCards = [...hole, ...board];
    const boardRanks = board.map(c => rankValue(c.rank));
    const holeRanks = hole.map(c => rankValue(c.rank));

    let score = 0;

    // Pair / set / quads detection
    for (const hr of holeRanks) {
      const boardMatches = boardRanks.filter(br => br === hr).length;
      if (boardMatches >= 2) score += 0.45; // set or better
      else if (boardMatches === 1) score += 0.25; // pair with board
    }

    // Pocket pair that is overpair
    if (holeRanks[0] === holeRanks[1]) {
      score += 0.15; // pocket pair baseline
      if (holeRanks[0] > Math.max(...boardRanks)) {
        score += 0.20; // overpair
      }
    }

    // Top pair detection
    const maxBoardRank = Math.max(...boardRanks);
    if (holeRanks.includes(maxBoardRank)) {
      score += 0.15;
      // Kicker quality
      const kicker = holeRanks.find(r => r !== maxBoardRank) ?? holeRanks[0];
      score += (kicker / 14) * 0.10;
    }

    // Flush draw / made flush
    const holeSuits = hole.map(c => c.suit);
    const boardSuits = board.map(c => c.suit);
    for (const s of holeSuits) {
      const suitedBoardCards = boardSuits.filter(bs => bs === s).length;
      const totalSuited = holeSuits.filter(hs => hs === s).length + suitedBoardCards;
      if (totalSuited >= 5) score += 0.40; // made flush
      else if (totalSuited === 4) score += 0.18; // flush draw
    }

    // Straight potential (simplified)
    const allRanks = allCards.map(c => rankValue(c.rank));
    const uniqueRanks = Array.from(new Set(allRanks)).sort((a, b) => a - b);
    let maxConsecutive = 1;
    let current = 1;
    for (let i = 1; i < uniqueRanks.length; i++) {
      if (uniqueRanks[i] - uniqueRanks[i - 1] === 1) {
        current++;
        maxConsecutive = Math.max(maxConsecutive, current);
      } else {
        current = 1;
      }
    }
    // Check A-low straight
    if (uniqueRanks.includes(14) && uniqueRanks.includes(2)) {
      const lowStraightCards = [2, 3, 4, 5, 14].filter(r => uniqueRanks.includes(r)).length;
      maxConsecutive = Math.max(maxConsecutive, lowStraightCards);
    }

    if (maxConsecutive >= 5) score += 0.35; // made straight
    else if (maxConsecutive === 4) score += 0.15; // OESD
    else if (maxConsecutive === 3) score += 0.05; // gutshot territory

    // High card value (for no-pair situations)
    if (score < 0.15) {
      const maxHole = Math.max(...holeRanks);
      score += (maxHole / 14) * 0.10;
    }

    return Math.min(1, Math.max(0, score));
  }

  private estimatePostflopEV(
    interactionScore: number,
    potSize: number,
    sizingBB: number,
    frequency: number,
  ): number {
    // Rough EV model: if we bet and get called some fraction of the time,
    // EV = (foldEq * pot) + (callEq * (pot + sizing) * (equity - 0.5)) * frequency
    const foldEquity = 0.40; // average fold-to-cbet
    const callEquity = interactionScore; // rough proxy

    const evWhenBet =
      foldEquity * potSize +
      (1 - foldEquity) * (callEquity - 0.5) * (potSize + sizingBB * 2);
    const evWhenCheck = (interactionScore - 0.45) * potSize * 0.3;

    return Math.round(((evWhenBet * frequency + evWhenCheck * (1 - frequency)) * 100)) / 100;
  }

  private buildPreflopReasoning(cell: HandCell, position: Position, scenario: Scenario): string {
    const parts: string[] = [];

    if (cell.action === 'fold') {
      parts.push(`${cell.hand} is outside the ${scenario} range from ${position}.`);
      parts.push('GTO recommendation: fold.');
      return parts.join(' ');
    }

    const actionLabel =
      cell.action === 'raise' ? 'open-raise' :
      cell.action === '3bet' ? '3-bet' :
      cell.action === '4bet' ? '4-bet' :
      cell.action === 'call' ? 'call' : cell.action;

    parts.push(`${cell.hand} is a ${actionLabel} from ${position}.`);

    if (cell.frequency < 1) {
      parts.push(`This is a mixed strategy: ${actionLabel} ${Math.round(cell.frequency * 100)}% of the time.`);
    } else {
      parts.push('This is a pure strategy (always take this action).');
    }

    if (cell.ev > 0) {
      parts.push(`Estimated EV: +${cell.ev} bb.`);
    } else {
      parts.push(`Estimated EV: ${cell.ev} bb.`);
    }

    if (cell.pair) {
      parts.push(`Pocket pair: ${cell.hand} has strong equity realization.`);
    } else if (cell.suited) {
      parts.push('Suited hand benefits from flush potential and better equity realization.');
    } else {
      parts.push('Offsuit hands have lower playability; position matters more.');
    }

    return parts.join(' ');
  }

  private buildPostflopReasoning(
    texture: BoardTexture,
    interactionScore: number,
    isAggressor: boolean,
    isInPosition: boolean,
    action: string,
    sizing: BetSizing,
    street: Street,
  ): string {
    const parts: string[] = [];

    parts.push(`Board texture: ${texture.summary}`);

    if (isAggressor) {
      parts.push('As the preflop aggressor, you have a range advantage on most boards.');
    } else {
      parts.push('As the preflop caller, you should be more selective with your bets.');
    }

    if (isInPosition) {
      parts.push('Being in position allows you to control pot size and realize equity efficiently.');
    } else {
      parts.push('Out of position, you must play a more check-heavy strategy.');
    }

    const interactionLabel =
      interactionScore > 0.7 ? 'very strong' :
      interactionScore > 0.5 ? 'strong' :
      interactionScore > 0.35 ? 'moderate' :
      interactionScore > 0.2 ? 'weak' : 'very weak';
    parts.push(`Hand-board interaction: ${interactionLabel} (${Math.round(interactionScore * 100)}%).`);

    const sizingLabel =
      sizing === '33pot' ? '1/3 pot (small)' :
      sizing === '50pot' ? '1/2 pot (medium)' :
      sizing === '75pot' ? '3/4 pot (large)' :
      sizing === '100pot' ? 'pot-sized' : 'overbet (1.5x pot)';

    parts.push(`Recommended: ${action} using ${sizingLabel} sizing on the ${street}.`);

    if (texture.flushDrawPossible) {
      parts.push('Flush draws are possible -- consider sizing up to deny equity.');
    }
    if (texture.straightDrawPossible && texture.connectedness > 0.4) {
      parts.push('Straight draws present -- the board is connected.');
    }
    if (texture.pairedBoard) {
      parts.push('Paired board favors the preflop raiser (more overpairs and trips).');
    }

    return parts.join(' ');
  }
}

// -----------------------------------------------------------------------------
// Default export: convenience singleton for 9-max
// -----------------------------------------------------------------------------

export const defaultSolver = new GTOSolver(9);
