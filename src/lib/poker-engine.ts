// =============================================================================
// poker-engine.ts — Complete Poker Game Engine for AI Poker School
// =============================================================================
// Supports: NLHE, PLO, Omaha Hi-Lo, Seven Card Stud, Razz, 2-7 Triple Draw,
//           Limit Hold'em, Short Deck Hold'em (6+), 5-Card Draw
// =============================================================================

// ---------------------------------------------------------------------------
// 1. Core Types & Enums
// ---------------------------------------------------------------------------

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export type Rank =
  | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  rank: Rank;
  suit: Suit;
  /** Numeric value used for comparisons. Ace = 14, King = 13, ... 2 = 2 */
  value: number;
}

export type Position =
  | 'UTG' | 'UTG+1' | 'UTG+2'
  | 'MP' | 'HJ' | 'CO'
  | 'BTN' | 'SB' | 'BB';

export type BettingRound =
  | 'preflop' | 'flop' | 'turn' | 'river'  // Hold'em / Omaha / Short Deck
  | 'third' | 'fourth' | 'fifth' | 'sixth' | 'seventh'  // Stud
  | 'predraw' | 'draw1' | 'draw2' | 'draw3';  // Draw games

export type PlayerAction =
  | 'fold' | 'check' | 'call' | 'bet' | 'raise' | 'all-in';

export type HandRankCategory =
  | 'royal-flush'
  | 'straight-flush'
  | 'four-of-a-kind'
  | 'full-house'
  | 'flush'
  | 'straight'
  | 'three-of-a-kind'
  | 'two-pair'
  | 'one-pair'
  | 'high-card';

/** Numeric tier for hand ranking comparison (lower = better) */
export const HAND_RANK_VALUES: Record<HandRankCategory, number> = {
  'royal-flush': 1,
  'straight-flush': 2,
  'four-of-a-kind': 3,
  'full-house': 4,
  'flush': 5,
  'straight': 6,
  'three-of-a-kind': 7,
  'two-pair': 8,
  'one-pair': 9,
  'high-card': 10,
};

export type GameVariant =
  | 'nlhe'           // No-Limit Texas Hold'em
  | 'plo'            // Pot-Limit Omaha
  | 'omaha-hilo'     // Omaha Hi-Lo 8-or-better
  | 'seven-stud'     // Seven Card Stud
  | 'razz'           // Razz (lowball stud)
  | 'twenty-seven'   // 2-7 Triple Draw
  | 'limit-holdem'   // Limit Hold'em
  | 'short-deck'     // Short Deck Hold'em (6+)
  | 'five-draw';     // 5-Card Draw

export type BettingStructure = 'no-limit' | 'pot-limit' | 'fixed-limit';

export type TableSize = 'heads-up' | '6-max' | '9-max';

export interface Player {
  id: string;
  name: string;
  chips: number;
  holeCards: Card[];
  position: Position | null;
  isActive: boolean;       // still in the hand (not folded)
  isSittingOut: boolean;   // sitting out of the game entirely
  isAllIn: boolean;
  currentBet: number;      // amount bet in the current round
  totalBetThisHand: number;
  hasActed: boolean;       // acted in current betting round
}

export interface SidePot {
  amount: number;
  eligiblePlayerIds: string[];
}

export interface ActionRecord {
  playerId: string;
  action: PlayerAction;
  amount: number;
  round: BettingRound;
  timestamp: number;
}

export interface HandEvaluation {
  category: HandRankCategory;
  /** Numeric rank: lower = better. e.g., royal flush = 1 */
  rankValue: number;
  /** Kickers for tiebreaking, highest first */
  kickers: number[];
  /** Human-readable description, e.g. "Full House, Kings over Sevens" */
  description: string;
  /** The 5 cards that make up the best hand */
  bestCards: Card[];
}

export interface LowHandEvaluation {
  /** Whether the hand qualifies (e.g., 8-or-better) */
  qualifies: boolean;
  /** Values of the low hand, lowest first. Lower is better. */
  values: number[];
  description: string;
  bestCards: Card[];
}

export interface PlayerHandResult {
  playerId: string;
  highHand: HandEvaluation | null;
  lowHand: LowHandEvaluation | null;
  winnings: number;
  /** Cards shown at showdown */
  shownCards: Card[];
}

export interface HandResult {
  winners: PlayerHandResult[];
  allResults: PlayerHandResult[];
  pots: SidePot[];
  communityCards: Card[];
  actions: ActionRecord[];
}

export interface GameConfig {
  variant: GameVariant;
  tableSize: TableSize;
  smallBlind: number;
  bigBlind: number;
  ante: number;
  bringIn: number;       // for stud games
  minBuyIn: number;
  maxBuyIn: number;
  /** Fixed bet sizes for limit games [smallBet, bigBet] */
  fixedBets: [number, number];
}

export interface GameState {
  id: string;
  config: GameConfig;
  players: Player[];
  communityCards: Card[];
  deck: Card[];
  currentRound: BettingRound;
  pot: number;
  sidePots: SidePot[];
  currentPlayerIndex: number;
  dealerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;
  actions: ActionRecord[];
  handNumber: number;
  isHandInProgress: boolean;
  minRaise: number;
  lastRaiseSize: number;
  /** Stud-specific: each player's up-cards */
  playerUpCards: Map<string, Card[]>;
  /** Draw-specific: current draw number (1-3) */
  currentDraw: number;
}

// ---------------------------------------------------------------------------
// 2. Rank/Value Utilities
// ---------------------------------------------------------------------------

const RANK_VALUES: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
  '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

/** Short Deck (6+): A=14, K=13, Q=12, J=11, 10=10, 9=9, 8=8, 7=7, 6=6 */
const SHORT_DECK_RANK_VALUES: Record<Rank, number> = {
  '2': 0, '3': 0, '4': 0, '5': 0, // not in short deck
  '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

const SHORT_DECK_RANKS: Rank[] = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const ALL_SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const ALL_RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const RANK_DISPLAY: Record<Rank, string> = {
  '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8',
  '9': '9', '10': 'T', 'J': 'J', 'Q': 'Q', 'K': 'K', 'A': 'A',
};

const SUIT_DISPLAY: Record<Suit, string> = {
  hearts: 'h', diamonds: 'd', clubs: 'c', spades: 's',
};

function cardToString(card: Card): string {
  return `${RANK_DISPLAY[card.rank]}${SUIT_DISPLAY[card.suit]}`;
}

function cardsToString(cards: Card[]): string {
  return cards.map(cardToString).join(' ');
}

function rankName(rank: Rank): string {
  const names: Record<Rank, string> = {
    '2': 'Deuce', '3': 'Three', '4': 'Four', '5': 'Five',
    '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine',
    '10': 'Ten', 'J': 'Jack', 'Q': 'Queen', 'K': 'King', 'A': 'Ace',
  };
  return names[rank];
}

function rankNamePlural(rank: Rank): string {
  const plurals: Record<Rank, string> = {
    '2': 'Deuces', '3': 'Threes', '4': 'Fours', '5': 'Fives',
    '6': 'Sixes', '7': 'Sevens', '8': 'Eights', '9': 'Nines',
    '10': 'Tens', 'J': 'Jacks', 'Q': 'Queens', 'K': 'Kings', 'A': 'Aces',
  };
  return plurals[rank];
}

// ---------------------------------------------------------------------------
// 3. Position Management
// ---------------------------------------------------------------------------

const POSITIONS_9MAX: Position[] = [
  'UTG', 'UTG+1', 'UTG+2', 'MP', 'HJ', 'CO', 'BTN', 'SB', 'BB',
];

const POSITIONS_6MAX: Position[] = [
  'UTG', 'MP', 'CO', 'BTN', 'SB', 'BB',
];

const POSITIONS_HEADS_UP: Position[] = [
  'BTN', 'BB',
];

export function getPositions(tableSize: TableSize, playerCount: number): Position[] {
  let template: Position[];
  switch (tableSize) {
    case 'heads-up':
      template = POSITIONS_HEADS_UP;
      break;
    case '6-max':
      template = POSITIONS_6MAX;
      break;
    case '9-max':
    default:
      template = POSITIONS_9MAX;
      break;
  }
  // For fewer players than the template, remove positions from the front (early positions)
  if (playerCount >= template.length) return [...template];
  if (playerCount <= 2) return [...POSITIONS_HEADS_UP];
  // Always keep BTN, SB, BB at the end; fill from the back
  const alwaysKeep: Position[] = ['BTN', 'SB', 'BB'];
  const available = template.filter(p => !alwaysKeep.includes(p));
  const extraNeeded = playerCount - 3;
  const selected = available.slice(available.length - extraNeeded);
  return [...selected, ...alwaysKeep];
}

// ---------------------------------------------------------------------------
// 4. Deck Manager
// ---------------------------------------------------------------------------

export class DeckManager {
  private cards: Card[] = [];

  constructor(private variant: GameVariant = 'nlhe') {
    this.createDeck();
  }

  /** Build the deck based on variant */
  createDeck(): void {
    this.cards = [];
    const ranks = this.variant === 'short-deck' ? SHORT_DECK_RANKS : ALL_RANKS;
    for (const suit of ALL_SUITS) {
      for (const rank of ranks) {
        this.cards.push({
          rank,
          suit,
          value: this.variant === 'short-deck'
            ? SHORT_DECK_RANK_VALUES[rank]
            : RANK_VALUES[rank],
        });
      }
    }
  }

  /** Fisher-Yates shuffle */
  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /** Deal one card from the top of the deck */
  deal(): Card {
    const card = this.cards.pop();
    if (!card) throw new Error('Deck is empty — cannot deal');
    return card;
  }

  /** Deal multiple cards */
  dealMultiple(count: number): Card[] {
    const result: Card[] = [];
    for (let i = 0; i < count; i++) {
      result.push(this.deal());
    }
    return result;
  }

  /** Burn one card (discard from top without returning it) */
  burn(): void {
    this.deal(); // just discard
  }

  /** Number of cards remaining */
  get remaining(): number {
    return this.cards.length;
  }

  /** Reset and reshuffle */
  reset(): void {
    this.createDeck();
    this.shuffle();
  }
}

// ---------------------------------------------------------------------------
// 5. Hand Evaluator
// ---------------------------------------------------------------------------

export class HandEvaluator {
  // ---- Public API ----

  /**
   * Evaluate the best 5-card high hand from the given cards.
   * For Hold'em: pass 7 cards (2 hole + 5 community).
   * For PLO: handled separately via evaluatePLO.
   */
  static evaluate(cards: Card[]): HandEvaluation {
    if (cards.length < 5) {
      throw new Error(`Need at least 5 cards to evaluate, got ${cards.length}`);
    }
    const combos = HandEvaluator.combinations(cards, 5);
    let best: HandEvaluation | null = null;
    for (const combo of combos) {
      const evaluation = HandEvaluator.evaluate5(combo);
      if (!best || HandEvaluator.compareHands(evaluation, best) > 0) {
        best = evaluation;
      }
    }
    return best!;
  }

  /**
   * Evaluate PLO: must use exactly 2 of 4 hole cards and 3 of 5 community cards.
   */
  static evaluatePLO(holeCards: Card[], communityCards: Card[]): HandEvaluation {
    if (holeCards.length < 4) {
      throw new Error(`PLO requires 4 hole cards, got ${holeCards.length}`);
    }
    if (communityCards.length < 3) {
      throw new Error(`Need at least 3 community cards, got ${communityCards.length}`);
    }
    const holeCombos = HandEvaluator.combinations(holeCards, 2);
    const communityCombos = HandEvaluator.combinations(communityCards, 3);

    let best: HandEvaluation | null = null;
    for (const hc of holeCombos) {
      for (const cc of communityCombos) {
        const evaluation = HandEvaluator.evaluate5([...hc, ...cc]);
        if (!best || HandEvaluator.compareHands(evaluation, best) > 0) {
          best = evaluation;
        }
      }
    }
    return best!;
  }

  /**
   * Evaluate Omaha Hi-Lo low hand.
   * Must use exactly 2 hole cards and 3 community cards.
   * Qualifies only if all 5 cards are 8 or lower (aces play low).
   */
  static evaluateOmahaLow(holeCards: Card[], communityCards: Card[]): LowHandEvaluation {
    const holeCombos = HandEvaluator.combinations(holeCards, 2);
    const communityCombos = HandEvaluator.combinations(communityCards, 3);

    let bestLow: LowHandEvaluation | null = null;

    for (const hc of holeCombos) {
      for (const cc of communityCombos) {
        const hand = [...hc, ...cc];
        const lowEval = HandEvaluator.evaluateLowHand(hand);
        if (!lowEval.qualifies) continue;
        if (!bestLow || HandEvaluator.compareLowHands(lowEval, bestLow) > 0) {
          bestLow = lowEval;
        }
      }
    }

    return bestLow || {
      qualifies: false,
      values: [],
      description: 'No qualifying low',
      bestCards: [],
    };
  }

  /**
   * Evaluate a 2-7 lowball hand (deuce-to-seven).
   * Straights and flushes count against you. Aces are always high.
   * The best hand is 2-3-4-5-7 with no flush.
   */
  static evaluate27Low(cards: Card[]): HandEvaluation {
    // In 2-7, we evaluate normally and the WORST poker hand wins.
    // We invert: the player with the lowest high-hand ranking wins.
    const combos = HandEvaluator.combinations(cards, 5);
    let best: HandEvaluation | null = null;

    for (const combo of combos) {
      const evaluation = HandEvaluator.evaluate5(combo);
      // In 2-7 lowball, we want the worst high hand
      if (!best || HandEvaluator.compareHands(evaluation, best) < 0) {
        best = evaluation;
      }
    }

    if (!best) throw new Error('Could not evaluate 2-7 low hand');

    return {
      ...best,
      description: `2-7 Low: ${best.description}`,
    };
  }

  /**
   * Evaluate Razz (A-5 lowball).
   * Straights and flushes do NOT count. Aces are low.
   * The best hand is A-2-3-4-5 (the wheel).
   */
  static evaluateRazz(cards: Card[]): LowHandEvaluation {
    const combos = HandEvaluator.combinations(cards, 5);
    let bestLow: LowHandEvaluation | null = null;

    for (const combo of combos) {
      const lowEval = HandEvaluator.evaluateAceFiveLow(combo);
      if (!bestLow || HandEvaluator.compareLowHands(lowEval, bestLow) > 0) {
        bestLow = lowEval;
      }
    }

    return bestLow || {
      qualifies: true,
      values: [],
      description: 'No hand',
      bestCards: [],
    };
  }

  /**
   * Evaluate Short Deck Hold'em hand.
   * Same as regular but: flush beats full house, A6789 is the low straight.
   */
  static evaluateShortDeck(cards: Card[]): HandEvaluation {
    const combos = HandEvaluator.combinations(cards, 5);
    let best: HandEvaluation | null = null;

    for (const combo of combos) {
      const evaluation = HandEvaluator.evaluate5ShortDeck(combo);
      if (!best || HandEvaluator.compareShortDeckHands(evaluation, best) > 0) {
        best = evaluation;
      }
    }
    return best!;
  }

  /**
   * Compare two hands. Returns:
   *  > 0 if hand a is better
   *  < 0 if hand b is better
   *  0 if tie
   */
  static compareHands(a: HandEvaluation, b: HandEvaluation): number {
    // Lower rankValue = better hand
    if (a.rankValue !== b.rankValue) return b.rankValue - a.rankValue;
    // Compare kickers
    for (let i = 0; i < Math.max(a.kickers.length, b.kickers.length); i++) {
      const ak = a.kickers[i] ?? 0;
      const bk = b.kickers[i] ?? 0;
      if (ak !== bk) return ak - bk;
    }
    return 0;
  }

  /**
   * Compare Short Deck hands (flush beats full house).
   */
  static compareShortDeckHands(a: HandEvaluation, b: HandEvaluation): number {
    const adjustRank = (cat: HandRankCategory): number => {
      // In short deck, flush (5) beats full house (4)
      // So flush should have lower rank value than full house
      if (cat === 'flush') return 3.5;       // between four-of-a-kind(3) and full-house(4)
      if (cat === 'full-house') return 4.5;   // pushed down
      return HAND_RANK_VALUES[cat];
    };
    const aRank = adjustRank(a.category);
    const bRank = adjustRank(b.category);
    if (aRank !== bRank) return bRank - aRank;
    for (let i = 0; i < Math.max(a.kickers.length, b.kickers.length); i++) {
      const ak = a.kickers[i] ?? 0;
      const bk = b.kickers[i] ?? 0;
      if (ak !== bk) return ak - bk;
    }
    return 0;
  }

  /**
   * Compare low hands. Returns:
   *  > 0 if a is a better low
   *  < 0 if b is a better low
   *  0 if tie
   */
  static compareLowHands(a: LowHandEvaluation, b: LowHandEvaluation): number {
    if (!a.qualifies && !b.qualifies) return 0;
    if (!a.qualifies) return -1;
    if (!b.qualifies) return 1;
    // Compare from highest card down (lower is better for low)
    for (let i = 0; i < Math.max(a.values.length, b.values.length); i++) {
      const av = a.values[i] ?? 99;
      const bv = b.values[i] ?? 99;
      if (av !== bv) return bv - av; // lower value = better low
    }
    return 0;
  }

  // ---- Internal Evaluation ----

  /** Evaluate exactly 5 cards */
  private static evaluate5(cards: Card[]): HandEvaluation {
    const sorted = [...cards].sort((a, b) => b.value - a.value);
    const values = sorted.map(c => c.value);
    const suits = sorted.map(c => c.suit);

    const isFlush = suits.every(s => s === suits[0]);
    const isStraight = HandEvaluator.isStraight(values);
    const isWheelStraight = HandEvaluator.isWheel(values);

    // Count rank occurrences
    const counts = new Map<number, number>();
    for (const v of values) {
      counts.set(v, (counts.get(v) || 0) + 1);
    }
    const groups = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || b[0] - a[0]); // sort by count desc, then value desc

    // Royal Flush
    if (isFlush && isStraight && values[0] === 14) {
      return {
        category: 'royal-flush',
        rankValue: HAND_RANK_VALUES['royal-flush'],
        kickers: values,
        description: 'Royal Flush',
        bestCards: sorted,
      };
    }

    // Straight Flush
    if (isFlush && (isStraight || isWheelStraight)) {
      const effectiveHigh = isWheelStraight && !isStraight ? 5 : values[0];
      const kickers = isWheelStraight && !isStraight ? [5, 4, 3, 2, 1] : values;
      return {
        category: 'straight-flush',
        rankValue: HAND_RANK_VALUES['straight-flush'],
        kickers,
        description: `Straight Flush, ${rankName(sorted[0].rank)} high`,
        bestCards: sorted,
      };
    }

    // Four of a Kind
    if (groups[0][1] === 4) {
      const quadVal = groups[0][0];
      const kicker = groups[1][0];
      return {
        category: 'four-of-a-kind',
        rankValue: HAND_RANK_VALUES['four-of-a-kind'],
        kickers: [quadVal, kicker],
        description: `Four of a Kind, ${rankNamePlural(HandEvaluator.valueToRank(quadVal))}`,
        bestCards: sorted,
      };
    }

    // Full House
    if (groups[0][1] === 3 && groups[1][1] === 2) {
      const tripVal = groups[0][0];
      const pairVal = groups[1][0];
      return {
        category: 'full-house',
        rankValue: HAND_RANK_VALUES['full-house'],
        kickers: [tripVal, pairVal],
        description: `Full House, ${rankNamePlural(HandEvaluator.valueToRank(tripVal))} over ${rankNamePlural(HandEvaluator.valueToRank(pairVal))}`,
        bestCards: sorted,
      };
    }

    // Flush
    if (isFlush) {
      return {
        category: 'flush',
        rankValue: HAND_RANK_VALUES['flush'],
        kickers: values,
        description: `Flush, ${rankName(sorted[0].rank)} high`,
        bestCards: sorted,
      };
    }

    // Straight
    if (isStraight || isWheelStraight) {
      const effectiveHigh = isWheelStraight && !isStraight ? 5 : values[0];
      const kickers = isWheelStraight && !isStraight ? [5, 4, 3, 2, 1] : values;
      const highRank = isWheelStraight && !isStraight ? '5' as Rank : sorted[0].rank;
      return {
        category: 'straight',
        rankValue: HAND_RANK_VALUES['straight'],
        kickers,
        description: `Straight, ${rankName(highRank)} high`,
        bestCards: sorted,
      };
    }

    // Three of a Kind
    if (groups[0][1] === 3) {
      const tripVal = groups[0][0];
      const kickers2 = groups.filter(g => g[1] !== 3).map(g => g[0]).sort((a, b) => b - a);
      return {
        category: 'three-of-a-kind',
        rankValue: HAND_RANK_VALUES['three-of-a-kind'],
        kickers: [tripVal, ...kickers2],
        description: `Three of a Kind, ${rankNamePlural(HandEvaluator.valueToRank(tripVal))}`,
        bestCards: sorted,
      };
    }

    // Two Pair
    if (groups[0][1] === 2 && groups[1][1] === 2) {
      const highPair = Math.max(groups[0][0], groups[1][0]);
      const lowPair = Math.min(groups[0][0], groups[1][0]);
      const kicker = groups[2][0];
      return {
        category: 'two-pair',
        rankValue: HAND_RANK_VALUES['two-pair'],
        kickers: [highPair, lowPair, kicker],
        description: `Two Pair, ${rankNamePlural(HandEvaluator.valueToRank(highPair))} and ${rankNamePlural(HandEvaluator.valueToRank(lowPair))}`,
        bestCards: sorted,
      };
    }

    // One Pair
    if (groups[0][1] === 2) {
      const pairVal = groups[0][0];
      const kickers2 = groups.filter(g => g[1] !== 2).map(g => g[0]).sort((a, b) => b - a);
      return {
        category: 'one-pair',
        rankValue: HAND_RANK_VALUES['one-pair'],
        kickers: [pairVal, ...kickers2],
        description: `Pair of ${rankNamePlural(HandEvaluator.valueToRank(pairVal))}`,
        bestCards: sorted,
      };
    }

    // High Card
    return {
      category: 'high-card',
      rankValue: HAND_RANK_VALUES['high-card'],
      kickers: values,
      description: `${rankName(sorted[0].rank)} High`,
      bestCards: sorted,
    };
  }

  /** Evaluate 5 cards for Short Deck (A6789 is a straight, flush beats full house) */
  private static evaluate5ShortDeck(cards: Card[]): HandEvaluation {
    const sorted = [...cards].sort((a, b) => b.value - a.value);
    const values = sorted.map(c => c.value);
    const suits = sorted.map(c => c.suit);

    const isFlush = suits.every(s => s === suits[0]);
    const isStraight = HandEvaluator.isStraight(values);
    // Short deck wheel: A-6-7-8-9
    const isShortWheel = HandEvaluator.isShortDeckWheel(values);

    const counts = new Map<number, number>();
    for (const v of values) {
      counts.set(v, (counts.get(v) || 0) + 1);
    }
    const groups = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || b[0] - a[0]);

    // Royal Flush
    if (isFlush && isStraight && values[0] === 14) {
      return {
        category: 'royal-flush',
        rankValue: HAND_RANK_VALUES['royal-flush'],
        kickers: values,
        description: 'Royal Flush',
        bestCards: sorted,
      };
    }

    // Straight Flush
    if (isFlush && (isStraight || isShortWheel)) {
      const kickers = isShortWheel && !isStraight ? [9, 8, 7, 6, 5] : values;
      return {
        category: 'straight-flush',
        rankValue: HAND_RANK_VALUES['straight-flush'],
        kickers,
        description: `Straight Flush, ${isShortWheel && !isStraight ? 'Nine' : rankName(sorted[0].rank)} high`,
        bestCards: sorted,
      };
    }

    // Four of a Kind
    if (groups[0][1] === 4) {
      return {
        category: 'four-of-a-kind',
        rankValue: HAND_RANK_VALUES['four-of-a-kind'],
        kickers: [groups[0][0], groups[1][0]],
        description: `Four of a Kind, ${rankNamePlural(HandEvaluator.valueToRank(groups[0][0]))}`,
        bestCards: sorted,
      };
    }

    // In short deck: flush beats full house — handled by compareShortDeckHands
    // We still assign standard rankValues here; the comparison function adjusts

    // Full House
    if (groups[0][1] === 3 && groups[1][1] === 2) {
      return {
        category: 'full-house',
        rankValue: HAND_RANK_VALUES['full-house'],
        kickers: [groups[0][0], groups[1][0]],
        description: `Full House, ${rankNamePlural(HandEvaluator.valueToRank(groups[0][0]))} over ${rankNamePlural(HandEvaluator.valueToRank(groups[1][0]))}`,
        bestCards: sorted,
      };
    }

    // Flush
    if (isFlush) {
      return {
        category: 'flush',
        rankValue: HAND_RANK_VALUES['flush'],
        kickers: values,
        description: `Flush, ${rankName(sorted[0].rank)} high`,
        bestCards: sorted,
      };
    }

    // Straight
    if (isStraight || isShortWheel) {
      const kickers = isShortWheel && !isStraight ? [9, 8, 7, 6, 5] : values;
      const highName = isShortWheel && !isStraight ? 'Nine' : rankName(sorted[0].rank);
      return {
        category: 'straight',
        rankValue: HAND_RANK_VALUES['straight'],
        kickers,
        description: `Straight, ${highName} high`,
        bestCards: sorted,
      };
    }

    // Three of a Kind
    if (groups[0][1] === 3) {
      const kickers2 = groups.filter(g => g[1] !== 3).map(g => g[0]).sort((a, b) => b - a);
      return {
        category: 'three-of-a-kind',
        rankValue: HAND_RANK_VALUES['three-of-a-kind'],
        kickers: [groups[0][0], ...kickers2],
        description: `Three of a Kind, ${rankNamePlural(HandEvaluator.valueToRank(groups[0][0]))}`,
        bestCards: sorted,
      };
    }

    // Two Pair
    if (groups[0][1] === 2 && groups[1][1] === 2) {
      const highPair = Math.max(groups[0][0], groups[1][0]);
      const lowPair = Math.min(groups[0][0], groups[1][0]);
      return {
        category: 'two-pair',
        rankValue: HAND_RANK_VALUES['two-pair'],
        kickers: [highPair, lowPair, groups[2][0]],
        description: `Two Pair, ${rankNamePlural(HandEvaluator.valueToRank(highPair))} and ${rankNamePlural(HandEvaluator.valueToRank(lowPair))}`,
        bestCards: sorted,
      };
    }

    // One Pair
    if (groups[0][1] === 2) {
      const kickers2 = groups.filter(g => g[1] !== 2).map(g => g[0]).sort((a, b) => b - a);
      return {
        category: 'one-pair',
        rankValue: HAND_RANK_VALUES['one-pair'],
        kickers: [groups[0][0], ...kickers2],
        description: `Pair of ${rankNamePlural(HandEvaluator.valueToRank(groups[0][0]))}`,
        bestCards: sorted,
      };
    }

    // High Card
    return {
      category: 'high-card',
      rankValue: HAND_RANK_VALUES['high-card'],
      kickers: values,
      description: `${rankName(sorted[0].rank)} High`,
      bestCards: sorted,
    };
  }

  /** Evaluate A-5 low hand (used in Razz). Aces low, straights/flushes don't count. */
  private static evaluateAceFiveLow(cards: Card[]): LowHandEvaluation {
    // Aces are 1 for low
    const lowValues = cards.map(c => c.value === 14 ? 1 : c.value).sort((a, b) => b - a);
    return {
      qualifies: true,
      values: lowValues,
      description: lowValues.map(v => v === 1 ? 'A' : v.toString()).join('-') + ' low',
      bestCards: [...cards],
    };
  }

  /** Evaluate 8-or-better low hand. Aces are low (value 1). */
  private static evaluateLowHand(cards: Card[]): LowHandEvaluation {
    // Convert ace to 1 for low evaluation
    const lowValues = cards.map(c => c.value === 14 ? 1 : c.value);
    // All cards must be 8 or lower
    const qualifies = lowValues.every(v => v <= 8);
    // Must have 5 unique values for a low hand
    const uniqueValues = new Set(lowValues);
    if (uniqueValues.size < 5) {
      return { qualifies: false, values: [], description: 'Paired low — does not qualify', bestCards: cards };
    }
    if (!qualifies) {
      return { qualifies: false, values: [], description: 'No qualifying low', bestCards: cards };
    }
    // Sort high to low for comparison
    const sorted = [...lowValues].sort((a, b) => b - a);
    return {
      qualifies: true,
      values: sorted,
      description: sorted.map(v => v === 1 ? 'A' : v.toString()).join('-') + ' low',
      bestCards: [...cards],
    };
  }

  /** Check if sorted values form a straight (e.g., 10-J-Q-K-A) */
  private static isStraight(values: number[]): boolean {
    const sorted = [...values].sort((a, b) => b - a);
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i] - sorted[i + 1] !== 1) return false;
    }
    return true;
  }

  /** Check for A-2-3-4-5 wheel */
  private static isWheel(values: number[]): boolean {
    const set = new Set(values);
    return set.has(14) && set.has(2) && set.has(3) && set.has(4) && set.has(5);
  }

  /** Check for Short Deck wheel: A-6-7-8-9 */
  private static isShortDeckWheel(values: number[]): boolean {
    const set = new Set(values);
    return set.has(14) && set.has(6) && set.has(7) && set.has(8) && set.has(9);
  }

  /** Convert numeric value back to Rank */
  private static valueToRank(value: number): Rank {
    const entry = Object.entries(RANK_VALUES).find(([, v]) => v === value);
    return (entry ? entry[0] : 'A') as Rank;
  }

  /** Generate all k-combinations of the array */
  static combinations<T>(arr: T[], k: number): T[][] {
    const results: T[][] = [];
    function backtrack(start: number, current: T[]) {
      if (current.length === k) {
        results.push([...current]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        current.push(arr[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    }
    backtrack(0, []);
    return results;
  }
}

// ---------------------------------------------------------------------------
// 6. Pot Manager (handles side pots)
// ---------------------------------------------------------------------------

export class PotManager {
  /**
   * Calculate main pot and side pots from player contributions.
   * @param contributions Map of playerId -> total chips put in this hand
   * @param activePlayers Set of player IDs still in the hand (not folded)
   * @returns Array of pots, main pot first
   */
  static calculatePots(
    contributions: Map<string, number>,
    activePlayers: Set<string>
  ): SidePot[] {
    // Build list of contributing players with their amounts
    const entries = Array.from(contributions.entries())
      .filter(([, amount]) => amount > 0)
      .sort((a, b) => a[1] - b[1]);

    if (entries.length === 0) return [];

    const pots: SidePot[] = [];
    let previousLevel = 0;

    // Find unique bet levels from active/all-in players
    const levels = [...new Set(entries.map(e => e[1]))].sort((a, b) => a - b);

    for (const level of levels) {
      const increment = level - previousLevel;
      if (increment <= 0) continue;

      // Every player who contributed at least this level contributes to this pot
      const eligible = entries.filter(([, amount]) => amount >= level);
      const potAmount = increment * eligible.length;

      // Only players who haven't folded are eligible to win
      const eligibleWinners = eligible
        .map(([id]) => id)
        .filter(id => activePlayers.has(id));

      if (potAmount > 0 && eligibleWinners.length > 0) {
        pots.push({
          amount: potAmount,
          eligiblePlayerIds: eligibleWinners,
        });
      }
      previousLevel = level;
    }

    return pots;
  }
}

// ---------------------------------------------------------------------------
// 7. Variant Configuration Helpers
// ---------------------------------------------------------------------------

function getDefaultConfig(variant: GameVariant): Partial<GameConfig> {
  switch (variant) {
    case 'nlhe':
      return { variant: 'nlhe', ante: 0, bringIn: 0, fixedBets: [0, 0] };
    case 'plo':
      return { variant: 'plo', ante: 0, bringIn: 0, fixedBets: [0, 0] };
    case 'omaha-hilo':
      return { variant: 'omaha-hilo', ante: 0, bringIn: 0, fixedBets: [0, 0] };
    case 'seven-stud':
      return { variant: 'seven-stud', ante: 0, bringIn: 0, fixedBets: [0, 0] };
    case 'razz':
      return { variant: 'razz', ante: 0, bringIn: 0, fixedBets: [0, 0] };
    case 'twenty-seven':
      return { variant: 'twenty-seven', ante: 0, bringIn: 0, fixedBets: [0, 0] };
    case 'limit-holdem':
      return { variant: 'limit-holdem', ante: 0, bringIn: 0, fixedBets: [0, 0] };
    case 'short-deck':
      return { variant: 'short-deck', ante: 0, bringIn: 0, fixedBets: [0, 0] };
    case 'five-draw':
      return { variant: 'five-draw', ante: 0, bringIn: 0, fixedBets: [0, 0] };
    default:
      return {};
  }
}

function getBettingStructure(variant: GameVariant): BettingStructure {
  switch (variant) {
    case 'nlhe':
    case 'short-deck':
      return 'no-limit';
    case 'plo':
    case 'omaha-hilo':
      return 'pot-limit';
    case 'limit-holdem':
    case 'seven-stud':
    case 'razz':
    case 'twenty-seven':
    case 'five-draw':
      return 'fixed-limit';
    default:
      return 'no-limit';
  }
}

function getHoleCardCount(variant: GameVariant): number {
  switch (variant) {
    case 'nlhe':
    case 'limit-holdem':
    case 'short-deck':
      return 2;
    case 'plo':
    case 'omaha-hilo':
      return 4;
    case 'seven-stud':
    case 'razz':
      return 3; // 2 down + 1 up initially
    case 'five-draw':
      return 5;
    case 'twenty-seven':
      return 5;
    default:
      return 2;
  }
}

function getBettingRounds(variant: GameVariant): BettingRound[] {
  switch (variant) {
    case 'nlhe':
    case 'plo':
    case 'omaha-hilo':
    case 'limit-holdem':
    case 'short-deck':
      return ['preflop', 'flop', 'turn', 'river'];
    case 'seven-stud':
    case 'razz':
      return ['third', 'fourth', 'fifth', 'sixth', 'seventh'];
    case 'twenty-seven':
      return ['predraw', 'draw1', 'draw2', 'draw3'];
    case 'five-draw':
      return ['predraw', 'draw1'];
    default:
      return ['preflop', 'flop', 'turn', 'river'];
  }
}

function isStudVariant(variant: GameVariant): boolean {
  return variant === 'seven-stud' || variant === 'razz';
}

function isDrawVariant(variant: GameVariant): boolean {
  return variant === 'twenty-seven' || variant === 'five-draw';
}

function isFlopVariant(variant: GameVariant): boolean {
  return ['nlhe', 'plo', 'omaha-hilo', 'limit-holdem', 'short-deck'].includes(variant);
}

// ---------------------------------------------------------------------------
// 8. Main PokerGame Class
// ---------------------------------------------------------------------------

export class PokerGame {
  state: GameState;
  private deckManager: DeckManager;
  private bettingStructure: BettingStructure;
  private bettingRounds: BettingRound[];
  private contributions: Map<string, number> = new Map();

  constructor(config: Partial<GameConfig> & { variant: GameVariant }) {
    const defaults = getDefaultConfig(config.variant);
    const fullConfig: GameConfig = {
      variant: config.variant,
      tableSize: config.tableSize ?? '6-max',
      smallBlind: config.smallBlind ?? 1,
      bigBlind: config.bigBlind ?? 2,
      ante: config.ante ?? (defaults.ante ?? 0),
      bringIn: config.bringIn ?? (defaults.bringIn ?? 0),
      minBuyIn: config.minBuyIn ?? 40,
      maxBuyIn: config.maxBuyIn ?? 200,
      fixedBets: config.fixedBets ?? [config.bigBlind ?? 2, (config.bigBlind ?? 2) * 2],
    };

    this.bettingStructure = getBettingStructure(config.variant);
    this.bettingRounds = getBettingRounds(config.variant);
    this.deckManager = new DeckManager(config.variant);

    this.state = {
      id: this.generateId(),
      config: fullConfig,
      players: [],
      communityCards: [],
      deck: [],
      currentRound: this.bettingRounds[0],
      pot: 0,
      sidePots: [],
      currentPlayerIndex: 0,
      dealerIndex: 0,
      smallBlindIndex: 0,
      bigBlindIndex: 0,
      actions: [],
      handNumber: 0,
      isHandInProgress: false,
      minRaise: fullConfig.bigBlind,
      lastRaiseSize: fullConfig.bigBlind,
      playerUpCards: new Map(),
      currentDraw: 0,
    };
  }

  // ---- Player Management ----

  addPlayer(id: string, name: string, chips: number): Player {
    if (this.state.players.find(p => p.id === id)) {
      throw new Error(`Player ${id} already at the table`);
    }
    if (this.state.players.length >= (this.state.config.tableSize === '9-max' ? 9 :
      this.state.config.tableSize === '6-max' ? 6 : 2)) {
      throw new Error('Table is full');
    }
    const player: Player = {
      id,
      name,
      chips: Math.min(Math.max(chips, this.state.config.minBuyIn), this.state.config.maxBuyIn),
      holeCards: [],
      position: null,
      isActive: true,
      isSittingOut: false,
      isAllIn: false,
      currentBet: 0,
      totalBetThisHand: 0,
      hasActed: false,
    };
    this.state.players.push(player);
    return player;
  }

  removePlayer(id: string): void {
    this.state.players = this.state.players.filter(p => p.id !== id);
  }

  // ---- Hand Lifecycle ----

  /**
   * Start a new hand: shuffle, assign positions, post blinds/antes, deal hole cards.
   */
  newHand(): void {
    const activePlayers = this.state.players.filter(p => !p.isSittingOut && p.chips > 0);
    if (activePlayers.length < 2) {
      throw new Error('Need at least 2 players with chips to start a hand');
    }

    this.state.handNumber++;
    this.state.isHandInProgress = true;
    this.state.communityCards = [];
    this.state.actions = [];
    this.state.pot = 0;
    this.state.sidePots = [];
    this.state.currentDraw = 0;
    this.state.playerUpCards = new Map();
    this.contributions = new Map();

    // Reset all players
    for (const player of this.state.players) {
      player.holeCards = [];
      player.isActive = !player.isSittingOut && player.chips > 0;
      player.isAllIn = false;
      player.currentBet = 0;
      player.totalBetThisHand = 0;
      player.hasActed = false;
    }

    // Move dealer button
    this.state.dealerIndex = this.findNextActivePlayer(this.state.dealerIndex);

    // Assign positions
    this.assignPositions();

    // Shuffle and deal
    this.deckManager.reset();

    if (isFlopVariant(this.state.config.variant)) {
      this.postBlinds();
      this.dealHoleCards();
      this.state.currentRound = 'preflop';
      // Preflop action starts left of BB (UTG)
      this.state.currentPlayerIndex = this.findNextActivePlayer(this.state.bigBlindIndex);
    } else if (isStudVariant(this.state.config.variant)) {
      this.postAntes();
      this.dealStudInitial();
      this.state.currentRound = 'third';
      // In stud, lowest up-card brings it in (or highest for Razz)
      this.state.currentPlayerIndex = this.findBringInPlayer();
    } else if (isDrawVariant(this.state.config.variant)) {
      this.postBlinds();
      this.dealHoleCards();
      this.state.currentRound = 'predraw';
      this.state.currentPlayerIndex = this.findNextActivePlayer(this.state.bigBlindIndex);
    }
  }

  /**
   * Deal community cards (flop/turn/river) for flop games.
   */
  deal(): void {
    if (!this.state.isHandInProgress) throw new Error('No hand in progress');

    if (isFlopVariant(this.state.config.variant)) {
      this.dealCommunityCards();
    } else if (isStudVariant(this.state.config.variant)) {
      this.dealStudStreet();
    }
    // For draw games, dealing is handled by the draw phase
  }

  // ---- Player Actions ----

  fold(playerId: string): void {
    const player = this.getActivePlayer(playerId);
    player.isActive = false;
    this.recordAction(playerId, 'fold', 0);
    player.hasActed = true;
    this.advanceAction();
  }

  check(playerId: string): void {
    const player = this.getActivePlayer(playerId);
    const highestBet = this.getHighestCurrentBet();
    if (player.currentBet < highestBet) {
      throw new Error(`Cannot check — must call ${highestBet - player.currentBet} or fold`);
    }
    this.recordAction(playerId, 'check', 0);
    player.hasActed = true;
    this.advanceAction();
  }

  call(playerId: string): void {
    const player = this.getActivePlayer(playerId);
    const highestBet = this.getHighestCurrentBet();
    const callAmount = Math.min(highestBet - player.currentBet, player.chips);

    if (callAmount <= 0) {
      // Nothing to call — treat as check
      this.check(playerId);
      return;
    }

    this.placeBet(player, callAmount);

    if (player.chips === 0) {
      player.isAllIn = true;
    }

    this.recordAction(playerId, 'call', callAmount);
    player.hasActed = true;
    this.advanceAction();
  }

  bet(playerId: string, amount: number): void {
    const player = this.getActivePlayer(playerId);
    const highestBet = this.getHighestCurrentBet();

    if (highestBet > 0) {
      throw new Error('Cannot bet when there is already a bet — use raise instead');
    }

    const validatedAmount = this.validateBetSize(player, amount, false);
    this.placeBet(player, validatedAmount);

    if (player.chips === 0) {
      player.isAllIn = true;
    }

    this.state.minRaise = validatedAmount;
    this.state.lastRaiseSize = validatedAmount;

    // Reset hasActed for all other active players
    for (const p of this.activePlayers()) {
      if (p.id !== playerId) p.hasActed = false;
    }

    this.recordAction(playerId, 'bet', validatedAmount);
    player.hasActed = true;
    this.advanceAction();
  }

  raise(playerId: string, totalAmount: number): void {
    const player = this.getActivePlayer(playerId);
    const highestBet = this.getHighestCurrentBet();

    if (highestBet === 0) {
      // No bet to raise — treat as a bet
      this.bet(playerId, totalAmount);
      return;
    }

    // totalAmount is the total bet the player wants to have in front of them
    const additionalAmount = totalAmount - player.currentBet;
    if (additionalAmount <= 0) {
      throw new Error(`Raise must be to a higher amount than current bet`);
    }

    const raiseSize = totalAmount - highestBet;
    if (raiseSize < this.state.lastRaiseSize && additionalAmount < player.chips) {
      // Raise must be at least the size of the last raise (unless all-in)
      throw new Error(
        `Minimum raise is ${highestBet + this.state.lastRaiseSize}. ` +
        `You tried to raise to ${totalAmount}`
      );
    }

    const chipsToAdd = Math.min(additionalAmount, player.chips);
    this.placeBet(player, chipsToAdd);

    if (player.chips === 0) {
      player.isAllIn = true;
    }

    this.state.lastRaiseSize = Math.max(raiseSize, this.state.lastRaiseSize);
    this.state.minRaise = this.state.lastRaiseSize;

    // Reset hasActed for all other active players
    for (const p of this.activePlayers()) {
      if (p.id !== playerId) p.hasActed = false;
    }

    this.recordAction(playerId, 'raise', chipsToAdd);
    player.hasActed = true;
    this.advanceAction();
  }

  allIn(playerId: string): void {
    const player = this.getActivePlayer(playerId);
    const highestBet = this.getHighestCurrentBet();
    const allInAmount = player.chips;

    const totalBetAfter = player.currentBet + allInAmount;

    if (totalBetAfter > highestBet) {
      const raiseSize = totalBetAfter - highestBet;
      if (raiseSize >= this.state.lastRaiseSize) {
        this.state.lastRaiseSize = raiseSize;
        this.state.minRaise = raiseSize;
      }
      // Reset hasActed for others since this is a raise
      for (const p of this.activePlayers()) {
        if (p.id !== playerId) p.hasActed = false;
      }
    }

    this.placeBet(player, allInAmount);
    player.isAllIn = true;

    this.recordAction(playerId, 'all-in', allInAmount);
    player.hasActed = true;
    this.advanceAction();
  }

  // ---- Draw Game: Discard and Draw ----

  /**
   * For draw games: player discards cards and draws new ones.
   * @param playerId The player discarding
   * @param cardIndices Indices of cards in the player's hand to discard (0-based)
   */
  drawCards(playerId: string, cardIndices: number[]): void {
    const player = this.getActivePlayer(playerId);
    if (!isDrawVariant(this.state.config.variant)) {
      throw new Error('Draw is only available in draw game variants');
    }

    // Validate indices
    for (const idx of cardIndices) {
      if (idx < 0 || idx >= player.holeCards.length) {
        throw new Error(`Invalid card index: ${idx}`);
      }
    }

    // In 2-7 triple draw, max discard is 5 (all cards)
    // In 5-card draw, max discard is typically 3 (or 4 with an ace)
    const maxDiscard = this.state.config.variant === 'twenty-seven' ? 5 : 5;
    if (cardIndices.length > maxDiscard) {
      throw new Error(`Cannot discard more than ${maxDiscard} cards`);
    }

    // Remove discarded cards (in reverse order to preserve indices)
    const sortedIndices = [...cardIndices].sort((a, b) => b - a);
    for (const idx of sortedIndices) {
      player.holeCards.splice(idx, 1);
    }

    // Deal new cards
    const newCards = this.deckManager.dealMultiple(cardIndices.length);
    player.holeCards.push(...newCards);
  }

  // ---- Showdown ----

  /**
   * Determine winners and distribute pots.
   */
  showdown(): HandResult {
    if (!this.state.isHandInProgress) throw new Error('No hand in progress');

    const activePlayers = this.activePlayers();

    // If only one player remains, they win everything
    if (activePlayers.length === 1) {
      return this.singleWinnerResult(activePlayers[0]);
    }

    // Calculate side pots
    const activeIds = new Set(activePlayers.map(p => p.id));
    const pots = PotManager.calculatePots(this.contributions, activeIds);

    // Evaluate all hands
    const allResults: PlayerHandResult[] = [];
    for (const player of activePlayers) {
      const result = this.evaluatePlayerHand(player);
      allResults.push(result);
    }

    // Award pots
    const winners: PlayerHandResult[] = [];
    for (const pot of pots) {
      const eligible = allResults.filter(r => pot.eligiblePlayerIds.includes(r.playerId));
      if (eligible.length === 0) continue;

      if (this.state.config.variant === 'omaha-hilo') {
        // Split pot: hi and lo
        this.awardHiLoPot(pot, eligible, winners);
      } else {
        // Normal: best hand wins
        this.awardHighPot(pot, eligible, winners);
      }
    }

    this.state.isHandInProgress = false;

    return {
      winners,
      allResults,
      pots,
      communityCards: [...this.state.communityCards],
      actions: [...this.state.actions],
    };
  }

  // ---- Getters ----

  getPlayer(id: string): Player | undefined {
    return this.state.players.find(p => p.id === id);
  }

  getCurrentPlayer(): Player | null {
    if (!this.state.isHandInProgress) return null;
    const active = this.activePlayers().filter(p => !p.isAllIn);
    if (active.length === 0) return null;
    return this.state.players[this.state.currentPlayerIndex] ?? null;
  }

  getHighestCurrentBet(): number {
    return Math.max(0, ...this.state.players.map(p => p.currentBet));
  }

  /**
   * Get valid actions for the current player.
   */
  getValidActions(playerId: string): { action: PlayerAction; minAmount?: number; maxAmount?: number }[] {
    const player = this.getPlayer(playerId);
    if (!player || !player.isActive || player.isAllIn) return [];

    const highestBet = this.getHighestCurrentBet();
    const toCall = highestBet - player.currentBet;
    const actions: { action: PlayerAction; minAmount?: number; maxAmount?: number }[] = [];

    // Fold is always available (except when you can check)
    if (toCall > 0) {
      actions.push({ action: 'fold' });
    }

    // Check if no one has bet
    if (toCall === 0) {
      actions.push({ action: 'check' });
    }

    // Call
    if (toCall > 0) {
      actions.push({ action: 'call', minAmount: Math.min(toCall, player.chips) });
    }

    // Bet (when no one has bet yet)
    if (toCall === 0) {
      const minBet = this.getMinBetSize();
      const maxBet = this.getMaxBetSize(player);
      if (player.chips >= minBet) {
        actions.push({ action: 'bet', minAmount: minBet, maxAmount: maxBet });
      }
    }

    // Raise (when someone has already bet)
    if (toCall > 0 && player.chips > toCall) {
      const minRaise = highestBet + this.state.lastRaiseSize;
      const maxRaise = this.getMaxRaiseSize(player);
      if (player.currentBet + player.chips >= minRaise) {
        actions.push({
          action: 'raise',
          minAmount: Math.min(minRaise, player.currentBet + player.chips),
          maxAmount: maxRaise,
        });
      }
    }

    // All-in is always available if player has chips
    if (player.chips > 0) {
      actions.push({ action: 'all-in', minAmount: player.chips, maxAmount: player.chips });
    }

    return actions;
  }

  /**
   * Calculate current pot size (including all bets on the table).
   */
  getPotSize(): number {
    const tableBets = this.state.players.reduce((sum, p) => sum + p.currentBet, 0);
    return this.state.pot + tableBets;
  }

  // ---- Private: Dealing ----

  private dealHoleCards(): void {
    const count = getHoleCardCount(this.state.config.variant);
    const activePlayers = this.state.players.filter(p => p.isActive);
    // Deal one card at a time, starting left of dealer
    for (let round = 0; round < count; round++) {
      let idx = this.findNextActivePlayer(this.state.dealerIndex);
      for (let i = 0; i < activePlayers.length; i++) {
        const player = this.state.players[idx];
        if (player.isActive) {
          player.holeCards.push(this.deckManager.deal());
        }
        idx = this.findNextActivePlayer(idx);
      }
    }
  }

  private dealCommunityCards(): void {
    const round = this.state.currentRound;
    if (round === 'flop') {
      this.deckManager.burn();
      this.state.communityCards.push(...this.deckManager.dealMultiple(3));
    } else if (round === 'turn' || round === 'river') {
      this.deckManager.burn();
      this.state.communityCards.push(this.deckManager.deal());
    }
  }

  private dealStudInitial(): void {
    const activePlayers = this.state.players.filter(p => p.isActive);
    // Deal 2 down cards and 1 up card to each player
    for (let round = 0; round < 3; round++) {
      for (const player of activePlayers) {
        const card = this.deckManager.deal();
        player.holeCards.push(card);
        if (round === 2) {
          // Third card is face-up
          const upCards = this.state.playerUpCards.get(player.id) || [];
          upCards.push(card);
          this.state.playerUpCards.set(player.id, upCards);
        }
      }
    }
  }

  private dealStudStreet(): void {
    const activePlayers = this.state.players.filter(p => p.isActive);
    const round = this.state.currentRound;

    for (const player of activePlayers) {
      const card = this.deckManager.deal();
      player.holeCards.push(card);

      // In stud, 4th-6th street cards are face up; 7th street is face down
      if (round !== 'seventh') {
        const upCards = this.state.playerUpCards.get(player.id) || [];
        upCards.push(card);
        this.state.playerUpCards.set(player.id, upCards);
      }
    }
  }

  // ---- Private: Blinds & Antes ----

  private postBlinds(): void {
    const activePlayers = this.state.players.filter(p => p.isActive);
    const playerCount = activePlayers.length;

    if (playerCount === 2) {
      // Heads-up: dealer posts SB, other posts BB
      this.state.smallBlindIndex = this.state.dealerIndex;
      this.state.bigBlindIndex = this.findNextActivePlayer(this.state.dealerIndex);
    } else {
      this.state.smallBlindIndex = this.findNextActivePlayer(this.state.dealerIndex);
      this.state.bigBlindIndex = this.findNextActivePlayer(this.state.smallBlindIndex);
    }

    // Post antes first if configured
    if (this.state.config.ante > 0) {
      for (const player of activePlayers) {
        const anteAmount = Math.min(this.state.config.ante, player.chips);
        this.placeBet(player, anteAmount);
      }
    }

    // Post small blind
    const sbPlayer = this.state.players[this.state.smallBlindIndex];
    if (sbPlayer && sbPlayer.isActive) {
      const sbAmount = Math.min(this.state.config.smallBlind, sbPlayer.chips);
      this.placeBet(sbPlayer, sbAmount);
      if (sbPlayer.chips === 0) sbPlayer.isAllIn = true;
    }

    // Post big blind
    const bbPlayer = this.state.players[this.state.bigBlindIndex];
    if (bbPlayer && bbPlayer.isActive) {
      const bbAmount = Math.min(this.state.config.bigBlind, bbPlayer.chips);
      this.placeBet(bbPlayer, bbAmount);
      if (bbPlayer.chips === 0) bbPlayer.isAllIn = true;
    }
  }

  private postAntes(): void {
    const activePlayers = this.state.players.filter(p => p.isActive);
    const anteAmount = this.state.config.ante || Math.floor(this.state.config.bigBlind / 5) || 1;

    for (const player of activePlayers) {
      const amount = Math.min(anteAmount, player.chips);
      this.placeBet(player, amount);
      if (player.chips === 0) player.isAllIn = true;
    }
  }

  // ---- Private: Betting Logic ----

  private placeBet(player: Player, amount: number): void {
    const actual = Math.min(amount, player.chips);
    player.chips -= actual;
    player.currentBet += actual;
    player.totalBetThisHand += actual;
    this.contributions.set(player.id, (this.contributions.get(player.id) || 0) + actual);
  }

  private getMinBetSize(): number {
    if (this.bettingStructure === 'fixed-limit') {
      return this.getCurrentFixedBet();
    }
    return this.state.config.bigBlind;
  }

  private getMaxBetSize(player: Player): number {
    switch (this.bettingStructure) {
      case 'no-limit':
        return player.chips;
      case 'pot-limit':
        return this.calculatePotSizedBet(player);
      case 'fixed-limit':
        return this.getCurrentFixedBet();
      default:
        return player.chips;
    }
  }

  private getMaxRaiseSize(player: Player): number {
    switch (this.bettingStructure) {
      case 'no-limit':
        return player.currentBet + player.chips; // total after raise
      case 'pot-limit': {
        const potSized = this.calculatePotSizedBet(player);
        return player.currentBet + potSized;
      }
      case 'fixed-limit': {
        const fixedBet = this.getCurrentFixedBet();
        return this.getHighestCurrentBet() + fixedBet;
      }
      default:
        return player.currentBet + player.chips;
    }
  }

  /**
   * Calculate pot-sized bet for pot-limit games.
   * Pot-sized raise = pot + all bets on table + amount to call, then raise by that total.
   */
  private calculatePotSizedBet(player: Player): number {
    const tableBets = this.state.players.reduce((sum, p) => sum + p.currentBet, 0);
    const toCall = this.getHighestCurrentBet() - player.currentBet;
    const potAfterCall = this.state.pot + tableBets + toCall;
    return potAfterCall;
  }

  private getCurrentFixedBet(): number {
    const isLateBetting = ['turn', 'river', 'fifth', 'sixth', 'seventh', 'draw2', 'draw3']
      .includes(this.state.currentRound);
    return isLateBetting ? this.state.config.fixedBets[1] : this.state.config.fixedBets[0];
  }

  private validateBetSize(player: Player, amount: number, isRaise: boolean): number {
    const minBet = this.getMinBetSize();
    const maxBet = this.getMaxBetSize(player);

    // If player doesn't have enough for min bet, they go all-in
    if (player.chips <= minBet) return player.chips;

    if (amount < minBet) {
      throw new Error(`Minimum bet is ${minBet}, you tried ${amount}`);
    }
    if (amount > maxBet) {
      if (this.bettingStructure === 'pot-limit') {
        throw new Error(`Maximum pot-limit bet is ${maxBet}, you tried ${amount}`);
      } else if (this.bettingStructure === 'fixed-limit') {
        throw new Error(`Fixed bet size is ${maxBet}, you tried ${amount}`);
      }
      return maxBet; // cap at max for no-limit (shouldn't happen)
    }

    if (this.bettingStructure === 'fixed-limit' && amount !== maxBet) {
      return maxBet; // force fixed bet size
    }

    return amount;
  }

  private advanceAction(): void {
    // Check if hand is over (only one player left)
    const activePlayers = this.activePlayers();
    if (activePlayers.length <= 1) {
      // Hand is over; single remaining player wins
      return;
    }

    // Check if betting round is complete
    const canAct = activePlayers.filter(p => !p.isAllIn);
    if (canAct.length === 0 || canAct.every(p => p.hasActed)) {
      // All remaining players (who can act) have acted
      // Also check if all bets are matched
      const highestBet = this.getHighestCurrentBet();
      const allMatched = canAct.every(p => p.currentBet === highestBet || p.isAllIn);

      if (allMatched && canAct.every(p => p.hasActed)) {
        this.endBettingRound();
        return;
      }
    }

    // Move to next active player who can act
    this.moveToNextPlayer();
  }

  private moveToNextPlayer(): void {
    let idx = this.state.currentPlayerIndex;
    const playerCount = this.state.players.length;
    for (let i = 0; i < playerCount; i++) {
      idx = (idx + 1) % playerCount;
      const player = this.state.players[idx];
      if (player.isActive && !player.isAllIn && !player.hasActed) {
        this.state.currentPlayerIndex = idx;
        return;
      }
    }
    // If no one else can act, end the round
    this.endBettingRound();
  }

  private endBettingRound(): void {
    // Move current bets into pot
    for (const player of this.state.players) {
      this.state.pot += player.currentBet;
      player.currentBet = 0;
      player.hasActed = false;
    }

    // Reset raise tracking
    this.state.lastRaiseSize = this.state.config.bigBlind;
    this.state.minRaise = this.state.config.bigBlind;

    // Check if only one active player or all are all-in
    const activePlayers = this.activePlayers();
    const canAct = activePlayers.filter(p => !p.isAllIn);

    if (activePlayers.length <= 1 || canAct.length <= 1) {
      // If multiple players are all-in, deal remaining community cards
      if (activePlayers.length > 1 && isFlopVariant(this.state.config.variant)) {
        this.dealRemainingCommunity();
      }
      return; // Showdown will be triggered
    }

    // Advance to next betting round
    const roundIndex = this.bettingRounds.indexOf(this.state.currentRound);
    if (roundIndex < this.bettingRounds.length - 1) {
      this.state.currentRound = this.bettingRounds[roundIndex + 1];

      // Deal community cards for flop games
      if (isFlopVariant(this.state.config.variant)) {
        this.dealCommunityCards();
        // Post-flop action starts left of dealer
        this.state.currentPlayerIndex = this.findNextActiveNonAllInPlayer(this.state.dealerIndex);
      } else if (isStudVariant(this.state.config.variant)) {
        this.dealStudStreet();
        // In stud, action starts with best showing hand (or worst for Razz)
        this.state.currentPlayerIndex = this.findStudActionStarter();
      } else if (isDrawVariant(this.state.config.variant)) {
        // Draw phase happens before betting
        this.state.currentDraw++;
        // Action starts left of dealer
        this.state.currentPlayerIndex = this.findNextActiveNonAllInPlayer(this.state.dealerIndex);
      }
    }
    // If we've gone through all rounds, hand is complete (showdown)
  }

  private dealRemainingCommunity(): void {
    while (this.state.communityCards.length < 5) {
      this.deckManager.burn();
      if (this.state.communityCards.length === 0) {
        this.state.communityCards.push(...this.deckManager.dealMultiple(3));
      } else {
        this.state.communityCards.push(this.deckManager.deal());
      }
    }
  }

  // ---- Private: Position Assignment ----

  private assignPositions(): void {
    const activePlayers = this.state.players.filter(p => p.isActive);
    const positions = getPositions(this.state.config.tableSize, activePlayers.length);

    // Assign positions starting from the dealer button
    let posIdx = 0;
    let playerIdx = this.state.dealerIndex;
    // Find the BTN position index in the positions array
    const btnPosIdx = positions.indexOf('BTN');
    // Assign positions starting from BTN at dealerIndex
    for (let i = 0; i < activePlayers.length; i++) {
      const pi = (btnPosIdx + i) % positions.length;
      // Walk to next active player
      const player = this.state.players[playerIdx];
      if (player && player.isActive) {
        player.position = positions[(btnPosIdx + i) % positions.length];
      }
      playerIdx = this.findNextActivePlayer(playerIdx);
    }
  }

  // ---- Private: Hand Evaluation ----

  private evaluatePlayerHand(player: Player): PlayerHandResult {
    const variant = this.state.config.variant;
    let highHand: HandEvaluation | null = null;
    let lowHand: LowHandEvaluation | null = null;

    switch (variant) {
      case 'nlhe':
      case 'limit-holdem': {
        const allCards = [...player.holeCards, ...this.state.communityCards];
        highHand = HandEvaluator.evaluate(allCards);
        break;
      }
      case 'short-deck': {
        const allCards = [...player.holeCards, ...this.state.communityCards];
        highHand = HandEvaluator.evaluateShortDeck(allCards);
        break;
      }
      case 'plo': {
        highHand = HandEvaluator.evaluatePLO(player.holeCards, this.state.communityCards);
        break;
      }
      case 'omaha-hilo': {
        highHand = HandEvaluator.evaluatePLO(player.holeCards, this.state.communityCards);
        lowHand = HandEvaluator.evaluateOmahaLow(player.holeCards, this.state.communityCards);
        break;
      }
      case 'seven-stud': {
        highHand = HandEvaluator.evaluate(player.holeCards);
        break;
      }
      case 'razz': {
        lowHand = HandEvaluator.evaluateRazz(player.holeCards);
        // For razz, we set highHand to null — winner is determined by low
        break;
      }
      case 'twenty-seven': {
        // 2-7 triple draw: worst poker hand wins
        highHand = HandEvaluator.evaluate27Low(player.holeCards);
        break;
      }
      case 'five-draw': {
        highHand = HandEvaluator.evaluate(player.holeCards);
        break;
      }
    }

    return {
      playerId: player.id,
      highHand,
      lowHand,
      winnings: 0,
      shownCards: [...player.holeCards],
    };
  }

  private awardHighPot(
    pot: SidePot,
    eligible: PlayerHandResult[],
    winners: PlayerHandResult[]
  ): void {
    const variant = this.state.config.variant;

    if (variant === 'razz') {
      // Razz: best low hand wins
      eligible.sort((a, b) => {
        if (!a.lowHand || !b.lowHand) return 0;
        return -HandEvaluator.compareLowHands(a.lowHand, b.lowHand);
      });
      const best = eligible[0];
      if (!best.lowHand) return;
      const tiedWinners = eligible.filter(
        r => r.lowHand && HandEvaluator.compareLowHands(r.lowHand, best.lowHand!) === 0
      );
      const share = Math.floor(pot.amount / tiedWinners.length);
      for (const w of tiedWinners) {
        w.winnings += share;
        const player = this.getPlayer(w.playerId);
        if (player) player.chips += share;
        if (!winners.find(ww => ww.playerId === w.playerId)) {
          winners.push(w);
        }
      }
    } else if (variant === 'twenty-seven') {
      // 2-7: worst high hand wins (already inverted in evaluate27Low)
      eligible.sort((a, b) => {
        if (!a.highHand || !b.highHand) return 0;
        return -HandEvaluator.compareHands(a.highHand, b.highHand);
      });
      const best = eligible[0];
      if (!best.highHand) return;
      const tiedWinners = eligible.filter(
        r => r.highHand && HandEvaluator.compareHands(r.highHand, best.highHand!) === 0
      );
      const share = Math.floor(pot.amount / tiedWinners.length);
      for (const w of tiedWinners) {
        w.winnings += share;
        const player = this.getPlayer(w.playerId);
        if (player) player.chips += share;
        if (!winners.find(ww => ww.playerId === w.playerId)) {
          winners.push(w);
        }
      }
    } else {
      // Standard high hand
      const compareFn = variant === 'short-deck'
        ? HandEvaluator.compareShortDeckHands
        : HandEvaluator.compareHands;

      eligible.sort((a, b) => {
        if (!a.highHand || !b.highHand) return 0;
        return -compareFn(a.highHand, b.highHand);
      });

      const best = eligible[0];
      if (!best.highHand) return;

      const tiedWinners = eligible.filter(
        r => r.highHand && compareFn(r.highHand, best.highHand!) === 0
      );
      const share = Math.floor(pot.amount / tiedWinners.length);
      for (const w of tiedWinners) {
        w.winnings += share;
        const player = this.getPlayer(w.playerId);
        if (player) player.chips += share;
        if (!winners.find(ww => ww.playerId === w.playerId)) {
          winners.push(w);
        }
      }
    }
  }

  private awardHiLoPot(
    pot: SidePot,
    eligible: PlayerHandResult[],
    winners: PlayerHandResult[]
  ): void {
    // High half
    const highEligible = eligible.filter(r => r.highHand);
    let hiWinners: PlayerHandResult[] = [];
    if (highEligible.length > 0) {
      highEligible.sort((a, b) => -HandEvaluator.compareHands(a.highHand!, b.highHand!));
      const bestHigh = highEligible[0];
      hiWinners = highEligible.filter(
        r => HandEvaluator.compareHands(r.highHand!, bestHigh.highHand!) === 0
      );
    }

    // Low half
    const lowEligible = eligible.filter(r => r.lowHand && r.lowHand.qualifies);
    let loWinners: PlayerHandResult[] = [];
    if (lowEligible.length > 0) {
      lowEligible.sort((a, b) => -HandEvaluator.compareLowHands(a.lowHand!, b.lowHand!));
      const bestLow = lowEligible[0];
      loWinners = lowEligible.filter(
        r => r.lowHand && HandEvaluator.compareLowHands(r.lowHand, bestLow.lowHand!) === 0
      );
    }

    if (loWinners.length > 0) {
      // Split pot between high and low
      const hiPot = Math.floor(pot.amount / 2);
      const loPot = pot.amount - hiPot; // give remainder to low

      const hiShare = Math.floor(hiPot / hiWinners.length);
      for (const w of hiWinners) {
        w.winnings += hiShare;
        const player = this.getPlayer(w.playerId);
        if (player) player.chips += hiShare;
        if (!winners.find(ww => ww.playerId === w.playerId)) winners.push(w);
      }

      const loShare = Math.floor(loPot / loWinners.length);
      for (const w of loWinners) {
        w.winnings += loShare;
        const player = this.getPlayer(w.playerId);
        if (player) player.chips += loShare;
        if (!winners.find(ww => ww.playerId === w.playerId)) winners.push(w);
      }
    } else {
      // No qualifying low — high takes full pot
      const share = Math.floor(pot.amount / hiWinners.length);
      for (const w of hiWinners) {
        w.winnings += share;
        const player = this.getPlayer(w.playerId);
        if (player) player.chips += share;
        if (!winners.find(ww => ww.playerId === w.playerId)) winners.push(w);
      }
    }
  }

  private singleWinnerResult(player: Player): HandResult {
    const totalPot = this.getPotSize();
    // Move all bets into pot
    for (const p of this.state.players) {
      this.state.pot += p.currentBet;
      p.currentBet = 0;
    }

    player.chips += this.state.pot;

    const result: PlayerHandResult = {
      playerId: player.id,
      highHand: null,
      lowHand: null,
      winnings: this.state.pot,
      shownCards: [],
    };

    this.state.isHandInProgress = false;

    return {
      winners: [result],
      allResults: [result],
      pots: [{ amount: this.state.pot, eligiblePlayerIds: [player.id] }],
      communityCards: [...this.state.communityCards],
      actions: [...this.state.actions],
    };
  }

  // ---- Private: Player Lookup ----

  private getActivePlayer(id: string): Player {
    const player = this.state.players.find(p => p.id === id);
    if (!player) throw new Error(`Player ${id} not found`);
    if (!player.isActive) throw new Error(`Player ${id} has folded`);
    if (player.isAllIn) throw new Error(`Player ${id} is all-in`);
    return player;
  }

  private activePlayers(): Player[] {
    return this.state.players.filter(p => p.isActive);
  }

  private findNextActivePlayer(fromIndex: number): number {
    const count = this.state.players.length;
    let idx = (fromIndex + 1) % count;
    for (let i = 0; i < count; i++) {
      if (this.state.players[idx].isActive && !this.state.players[idx].isSittingOut) {
        return idx;
      }
      idx = (idx + 1) % count;
    }
    return fromIndex; // fallback
  }

  private findNextActiveNonAllInPlayer(fromIndex: number): number {
    const count = this.state.players.length;
    let idx = (fromIndex + 1) % count;
    for (let i = 0; i < count; i++) {
      const player = this.state.players[idx];
      if (player.isActive && !player.isAllIn && !player.isSittingOut) {
        return idx;
      }
      idx = (idx + 1) % count;
    }
    return fromIndex;
  }

  private findBringInPlayer(): number {
    // In Stud: lowest up-card brings it in. In Razz: highest up-card brings it in.
    const activePlayers = this.state.players
      .map((p, idx) => ({ player: p, index: idx }))
      .filter(({ player }) => player.isActive);

    const isRazz = this.state.config.variant === 'razz';

    let bringInIdx = activePlayers[0].index;
    let bringInValue = -1;

    for (const { player, index } of activePlayers) {
      const upCards = this.state.playerUpCards.get(player.id);
      if (!upCards || upCards.length === 0) continue;
      const upValue = upCards[0].value;

      if (bringInValue === -1) {
        bringInValue = upValue;
        bringInIdx = index;
        continue;
      }

      if (isRazz) {
        // Razz: highest up-card brings it in
        if (upValue > bringInValue) {
          bringInValue = upValue;
          bringInIdx = index;
        }
      } else {
        // Stud: lowest up-card brings it in
        if (upValue < bringInValue) {
          bringInValue = upValue;
          bringInIdx = index;
        }
      }
    }

    return bringInIdx;
  }

  private findStudActionStarter(): number {
    // In Stud (4th street onward): highest showing hand acts first
    // In Razz: lowest showing hand acts first
    const activePlayers = this.state.players
      .map((p, idx) => ({ player: p, index: idx }))
      .filter(({ player }) => player.isActive);

    const isRazz = this.state.config.variant === 'razz';
    let bestIdx = activePlayers[0].index;
    let bestValue = -1;

    for (const { player, index } of activePlayers) {
      const upCards = this.state.playerUpCards.get(player.id) || [];
      // Simple: sum of up card values (a more complete implementation
      // would evaluate the showing hand)
      const total = upCards.reduce((sum, c) => sum + c.value, 0);

      if (bestValue === -1) {
        bestValue = total;
        bestIdx = index;
        continue;
      }

      if (isRazz ? total < bestValue : total > bestValue) {
        bestValue = total;
        bestIdx = index;
      }
    }

    return bestIdx;
  }

  // ---- Private: Utilities ----

  private recordAction(playerId: string, action: PlayerAction, amount: number): void {
    this.state.actions.push({
      playerId,
      action,
      amount,
      round: this.state.currentRound,
      timestamp: Date.now(),
    });
  }

  private generateId(): string {
    return `hand_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }
}

// ---------------------------------------------------------------------------
// 9. Factory / Convenience Functions
// ---------------------------------------------------------------------------

/**
 * Create a new poker game with sensible defaults.
 */
export function createGame(
  variant: GameVariant,
  options?: {
    tableSize?: TableSize;
    smallBlind?: number;
    bigBlind?: number;
    ante?: number;
    bringIn?: number;
  }
): PokerGame {
  return new PokerGame({
    variant,
    tableSize: options?.tableSize ?? '6-max',
    smallBlind: options?.smallBlind ?? 1,
    bigBlind: options?.bigBlind ?? 2,
    ante: options?.ante,
    bringIn: options?.bringIn,
  });
}

/**
 * Quick hand evaluation from card strings.
 * Card format: "Ah" (Ace of hearts), "Td" (Ten of diamonds), etc.
 */
export function quickEvaluate(cardStrings: string[]): HandEvaluation {
  const cards = cardStrings.map(parseCard);
  return HandEvaluator.evaluate(cards);
}

/**
 * Parse a card string like "Ah", "Td", "2c" into a Card object.
 */
export function parseCard(str: string): Card {
  const rankChar = str.slice(0, -1);
  const suitChar = str.slice(-1);

  const rankMap: Record<string, Rank> = {
    '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8',
    '9': '9', 'T': '10', '10': '10', 'J': 'J', 'Q': 'Q', 'K': 'K', 'A': 'A',
  };

  const suitMap: Record<string, Suit> = {
    'h': 'hearts', 'd': 'diamonds', 'c': 'clubs', 's': 'spades',
  };

  const rank = rankMap[rankChar];
  const suit = suitMap[suitChar];

  if (!rank || !suit) throw new Error(`Invalid card string: "${str}"`);

  return {
    rank,
    suit,
    value: RANK_VALUES[rank],
  };
}

/**
 * Parse multiple card strings.
 */
export function parseCards(strs: string[]): Card[] {
  return strs.map(parseCard);
}

// ---------------------------------------------------------------------------
// 10. Exports Summary
// ---------------------------------------------------------------------------
// Types: Card, Suit, Rank, Player, GameState, HandResult, HandEvaluation,
//        LowHandEvaluation, PlayerHandResult, SidePot, ActionRecord,
//        Position, BettingRound, PlayerAction, HandRankCategory,
//        GameVariant, BettingStructure, TableSize, GameConfig
//
// Classes: PokerGame, HandEvaluator, DeckManager, PotManager
//
// Functions: createGame, quickEvaluate, parseCard, parseCards, getPositions
// ---------------------------------------------------------------------------
