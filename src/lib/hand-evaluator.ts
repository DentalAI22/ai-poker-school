// Hand Evaluator — supports standard high, lo-8, razz/2-7 lowball, badugi, and short deck

import { RANKS, SUITS } from './constants';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Suit = (typeof SUITS)[number];
export type Rank = (typeof RANKS)[number];

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface HandResult {
  /** Lower is better. 0 = Royal Flush, 9 = High Card (high); 0 = best low (lo) */
  rank: number;
  name: string;
  cards: Card[];
  description: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const RANK_VALUE: Record<string, number> = {};
RANKS.forEach((r, i) => {
  RANK_VALUE[r] = i; // 2=0 … A=12
});

function rankVal(r: Rank): number {
  return RANK_VALUE[r];
}

function sortDesc(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => rankVal(b.rank) - rankVal(a.rank));
}

function sortAsc(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => rankVal(a.rank) - rankVal(b.rank));
}

/** Generate all k-size combinations from an array */
function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const result: T[][] = [];
  const first = arr[0];
  const rest = arr.slice(1);
  // combos that include first
  for (const combo of combinations(rest, k - 1)) {
    result.push([first, ...combo]);
  }
  // combos that exclude first
  for (const combo of combinations(rest, k)) {
    result.push(combo);
  }
  return result;
}

function cardName(c: Card): string {
  const rankNames: Record<string, string> = {
    T: '10',
    J: 'Jack',
    Q: 'Queen',
    K: 'King',
    A: 'Ace',
  };
  return `${rankNames[c.rank] || c.rank} of ${c.suit}`;
}

function describeCards(cards: Card[]): string {
  return cards.map(cardName).join(', ');
}

// ---------------------------------------------------------------------------
// Standard High Hand Evaluation (5-card)
// ---------------------------------------------------------------------------

interface InternalScore {
  /** Category 0 (best) – 9 (worst) */
  category: number;
  /** Tiebreaker values, most significant first */
  tiebreakers: number[];
  name: string;
  cards: Card[];
}

function evaluate5High(five: Card[]): InternalScore {
  const sorted = sortDesc(five);
  const ranks = sorted.map((c) => rankVal(c.rank));
  const suits = sorted.map((c) => c.suit);

  const isFlush = suits.every((s) => s === suits[0]);

  // Check straight
  let isStraight = false;
  let straightHigh = ranks[0];

  // Normal straight check
  if (
    ranks[0] - ranks[1] === 1 &&
    ranks[1] - ranks[2] === 1 &&
    ranks[2] - ranks[3] === 1 &&
    ranks[3] - ranks[4] === 1
  ) {
    isStraight = true;
    straightHigh = ranks[0];
  }
  // Wheel: A-2-3-4-5 (A plays low)
  if (
    ranks[0] === 12 &&
    ranks[1] === 3 &&
    ranks[2] === 2 &&
    ranks[3] === 1 &&
    ranks[4] === 0
  ) {
    isStraight = true;
    straightHigh = 3; // 5-high straight
  }

  // Count rank frequencies
  const freq: Record<number, number> = {};
  for (const r of ranks) {
    freq[r] = (freq[r] || 0) + 1;
  }
  const counts = Object.entries(freq)
    .map(([r, c]) => ({ rank: Number(r), count: c }))
    .sort((a, b) => b.count - a.count || b.rank - a.rank);

  // Royal Flush
  if (isFlush && isStraight && straightHigh === 12) {
    return { category: 0, tiebreakers: [12], name: 'Royal Flush', cards: sorted };
  }
  // Straight Flush
  if (isFlush && isStraight) {
    return { category: 1, tiebreakers: [straightHigh], name: 'Straight Flush', cards: sorted };
  }
  // Four of a Kind
  if (counts[0].count === 4) {
    return {
      category: 2,
      tiebreakers: [counts[0].rank, counts[1].rank],
      name: 'Four of a Kind',
      cards: sorted,
    };
  }
  // Full House
  if (counts[0].count === 3 && counts[1].count === 2) {
    return {
      category: 3,
      tiebreakers: [counts[0].rank, counts[1].rank],
      name: 'Full House',
      cards: sorted,
    };
  }
  // Flush
  if (isFlush) {
    return { category: 4, tiebreakers: ranks, name: 'Flush', cards: sorted };
  }
  // Straight
  if (isStraight) {
    return { category: 5, tiebreakers: [straightHigh], name: 'Straight', cards: sorted };
  }
  // Three of a Kind
  if (counts[0].count === 3) {
    const kickers = counts.filter((c) => c.count === 1).map((c) => c.rank);
    return {
      category: 6,
      tiebreakers: [counts[0].rank, ...kickers],
      name: 'Three of a Kind',
      cards: sorted,
    };
  }
  // Two Pair
  if (counts[0].count === 2 && counts[1].count === 2) {
    const pairs = [counts[0].rank, counts[1].rank].sort((a, b) => b - a);
    const kicker = counts[2].rank;
    return {
      category: 7,
      tiebreakers: [...pairs, kicker],
      name: 'Two Pair',
      cards: sorted,
    };
  }
  // One Pair
  if (counts[0].count === 2) {
    const kickers = counts
      .filter((c) => c.count === 1)
      .map((c) => c.rank)
      .sort((a, b) => b - a);
    return {
      category: 8,
      tiebreakers: [counts[0].rank, ...kickers],
      name: 'One Pair',
      cards: sorted,
    };
  }
  // High Card
  return { category: 9, tiebreakers: ranks, name: 'High Card', cards: sorted };
}

function compareScores(a: InternalScore, b: InternalScore): number {
  if (a.category !== b.category) return a.category - b.category;
  for (let i = 0; i < Math.max(a.tiebreakers.length, b.tiebreakers.length); i++) {
    const av = a.tiebreakers[i] ?? -1;
    const bv = b.tiebreakers[i] ?? -1;
    if (av !== bv) return bv - av; // higher tiebreaker is better
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Public: Standard High Evaluation
// ---------------------------------------------------------------------------

/**
 * Evaluate the best 5-card high hand from any number of cards (typically 5-7).
 */
export function evaluateHigh(cards: Card[]): HandResult {
  if (cards.length < 5) {
    throw new Error('Need at least 5 cards for high hand evaluation');
  }
  const fiveCardCombos = combinations(cards, 5);
  let best: InternalScore | null = null;
  for (const combo of fiveCardCombos) {
    const score = evaluate5High(combo);
    if (!best || compareScores(score, best) < 0) {
      best = score;
    }
  }
  return {
    rank: best!.category,
    name: best!.name,
    cards: best!.cards,
    description: `${best!.name}: ${describeCards(best!.cards)}`,
  };
}

// ---------------------------------------------------------------------------
// Low (8-or-better) Evaluation
// ---------------------------------------------------------------------------

/**
 * Evaluate the best lo hand (8-or-better qualifier) from the given cards.
 * Returns null if no qualifying low exists.
 * Lower is better. Aces play low. Straights and flushes do not count against low.
 */
export function evaluateLow8(cards: Card[]): HandResult | null {
  if (cards.length < 5) return null;

  const fiveCardCombos = combinations(cards, 5);
  let bestLow: number[] | null = null;
  let bestCards: Card[] | null = null;

  for (const combo of fiveCardCombos) {
    // Get unique ranks, with Ace = 0 (low)
    const lowRanks = combo.map((c) => (c.rank === 'A' ? 0 : rankVal(c.rank)));
    const unique = [...new Set(lowRanks)].sort((a, b) => a - b);

    // Must have 5 unique ranks, all 8 or below (8 = index 6 in standard, but ace=0 so: 0,1,2,3,4,5,6)
    if (unique.length < 5) continue;
    const low5 = unique.slice(0, 5);
    if (low5[4] > 6) continue; // 8 = rank index 6 (2=0,3=1,4=2,5=3,6=4,7=5,8=6)

    // Compare: lower is better, compare from highest card down
    const reversed = [...low5].reverse();
    if (!bestLow || compareLowHands(reversed, bestLow) < 0) {
      bestLow = reversed;
      bestCards = combo;
    }
  }

  if (!bestLow || !bestCards) return null;

  const lowNames = bestLow
    .map((v) => {
      if (v === 0) return 'A';
      return RANKS[v];
    })
    .reverse();

  return {
    rank: bestLow[0], // highest card in the low (lower is better)
    name: `${lowNames[lowNames.length - 1]}-low`,
    cards: bestCards,
    description: `Low: ${lowNames.join('-')}`,
  };
}

function compareLowHands(a: number[], b: number[]): number {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] - b[i]; // lower is better
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Razz / 2-7 Lowball Evaluation
// ---------------------------------------------------------------------------

/**
 * Evaluate best low hand for Razz (A-5 lowball). Aces are low.
 * Straights and flushes do NOT count against you.
 * Best hand: A-2-3-4-5 (the wheel).
 */
export function evaluateRazz(cards: Card[]): HandResult {
  if (cards.length < 5) {
    throw new Error('Need at least 5 cards for Razz evaluation');
  }

  const fiveCardCombos = combinations(cards, 5);
  let bestLow: number[] | null = null;
  let bestCards: Card[] | null = null;

  for (const combo of fiveCardCombos) {
    // Ace = 0 (low)
    const lowRanks = combo
      .map((c) => (c.rank === 'A' ? 0 : rankVal(c.rank)))
      .sort((a, b) => a - b);

    const reversed = [...lowRanks].reverse(); // highest first for comparison
    if (!bestLow || compareLowHands(reversed, bestLow) < 0) {
      bestLow = reversed;
      bestCards = combo;
    }
  }

  const lowNames = bestLow!
    .map((v) => (v === 0 ? 'A' : RANKS[v]))
    .reverse();

  return {
    rank: bestLow![0],
    name: `${lowNames[lowNames.length - 1]}-low`,
    cards: bestCards!,
    description: `Razz: ${lowNames.join('-')}`,
  };
}

/**
 * Evaluate best low hand for 2-7 (deuce-to-seven) lowball.
 * Aces are HIGH. Straights and flushes DO count against you (bad).
 * Best hand: 2-3-4-5-7 (no straight, no flush).
 */
export function evaluate27Lowball(cards: Card[]): HandResult {
  if (cards.length < 5) {
    throw new Error('Need at least 5 cards for 2-7 lowball evaluation');
  }

  const fiveCardCombos = combinations(cards, 5);
  let bestScore: InternalScore | null = null;

  for (const combo of fiveCardCombos) {
    // In 2-7, we evaluate as a high hand, and the WORST high hand wins
    // (because straights and flushes count against, and ace is high).
    const score = evaluate5High(combo);
    // We want the worst high hand = highest category number, then lowest tiebreakers
    if (!bestScore || compare27(score, bestScore) < 0) {
      bestScore = score;
    }
  }

  const sorted = sortAsc(bestScore!.cards);
  const rankNames = sorted.map((c) => c.rank);

  return {
    rank: bestScore!.category,
    name: `${rankNames[rankNames.length - 1]}-low`,
    cards: bestScore!.cards,
    description: `2-7 Low: ${rankNames.join('-')}`,
  };
}

/** For 2-7 lowball, higher category is better (high card > pair), then lower kickers */
function compare27(a: InternalScore, b: InternalScore): number {
  // Higher category = weaker high hand = better low hand
  if (a.category !== b.category) return b.category - a.category;
  // Within same category, lower tiebreakers are better for lowball
  for (let i = 0; i < Math.max(a.tiebreakers.length, b.tiebreakers.length); i++) {
    const av = a.tiebreakers[i] ?? -1;
    const bv = b.tiebreakers[i] ?? -1;
    if (av !== bv) return av - bv;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Badugi Evaluation
// ---------------------------------------------------------------------------

export interface BadugiResult {
  rank: number;
  name: string;
  cards: Card[];
  description: string;
}

/**
 * Evaluate a Badugi hand (up to 4 cards).
 * A badugi is 4 cards of different suits and different ranks.
 * More cards in the badugi is better; then lower cards are better.
 * Aces are low in Badugi.
 */
export function evaluateBadugi(cards: Card[]): BadugiResult {
  let bestSize = 0;
  let bestRanks: number[] = [];
  let bestCards: Card[] = [];

  // Try from 4-card badugi down to 1
  for (let size = Math.min(4, cards.length); size >= 1; size--) {
    const combos = combinations(cards, size);
    for (const combo of combos) {
      const suits = new Set(combo.map((c) => c.suit));
      const ranks = combo.map((c) => (c.rank === 'A' ? 0 : rankVal(c.rank)));
      const uniqueRanks = new Set(ranks);

      // All suits must be different, all ranks must be different
      if (suits.size !== size || uniqueRanks.size !== size) continue;

      const sorted = [...ranks].sort((a, b) => b - a); // highest first for comparison

      if (
        size > bestSize ||
        (size === bestSize && compareLowHands(sorted, bestRanks) < 0)
      ) {
        bestSize = size;
        bestRanks = sorted;
        bestCards = combo;
      }
    }
    if (bestSize === size && bestSize > 0) break; // found best at this size, no need to go lower
  }

  const nameMap: Record<number, string> = { 4: 'Badugi', 3: 'Three-card hand', 2: 'Two-card hand', 1: 'One-card hand' };
  const rankLabels = bestRanks
    .map((v) => (v === 0 ? 'A' : RANKS[v]))
    .reverse();

  return {
    rank: 4 - bestSize, // 0 = 4-card badugi (best), 3 = 1-card (worst)
    name: nameMap[bestSize] || 'No hand',
    cards: bestCards,
    description: `${nameMap[bestSize] || 'No hand'}: ${rankLabels.join('-')}`,
  };
}

// ---------------------------------------------------------------------------
// Short Deck (6+) Evaluation
// ---------------------------------------------------------------------------

/**
 * Evaluate the best 5-card hand under Short Deck / 6+ Hold'em rules.
 * Differences from standard:
 * - A-6-7-8-9 is a straight (ace plays low to 6, not 5)
 * - Flush beats Full House (flushes are harder to make)
 * - No cards below 6 exist in the deck
 */
export function evaluateShortDeck(cards: Card[]): HandResult {
  if (cards.length < 5) {
    throw new Error('Need at least 5 cards for Short Deck evaluation');
  }

  const fiveCardCombos = combinations(cards, 5);
  let best: InternalScore | null = null;

  for (const combo of fiveCardCombos) {
    const score = evaluate5ShortDeck(combo);
    if (!best || compareScores(score, best) < 0) {
      best = score;
    }
  }

  return {
    rank: best!.category,
    name: best!.name,
    cards: best!.cards,
    description: `${best!.name}: ${describeCards(best!.cards)}`,
  };
}

function evaluate5ShortDeck(five: Card[]): InternalScore {
  const sorted = sortDesc(five);
  const ranks = sorted.map((c) => rankVal(c.rank));
  const suits = sorted.map((c) => c.suit);

  const isFlush = suits.every((s) => s === suits[0]);

  // Check straight (including A-6-7-8-9 wrap)
  let isStraight = false;
  let straightHigh = ranks[0];

  // Normal straight
  if (
    ranks[0] - ranks[1] === 1 &&
    ranks[1] - ranks[2] === 1 &&
    ranks[2] - ranks[3] === 1 &&
    ranks[3] - ranks[4] === 1
  ) {
    isStraight = true;
    straightHigh = ranks[0];
  }
  // Short Deck wheel: A-6-7-8-9 (A=12, 9=7, 8=6, 7=5, 6=4)
  if (
    ranks[0] === 12 &&
    ranks[1] === 7 &&
    ranks[2] === 6 &&
    ranks[3] === 5 &&
    ranks[4] === 4
  ) {
    isStraight = true;
    straightHigh = 7; // 9-high straight
  }

  // Count rank frequencies
  const freq: Record<number, number> = {};
  for (const r of ranks) {
    freq[r] = (freq[r] || 0) + 1;
  }
  const counts = Object.entries(freq)
    .map(([r, c]) => ({ rank: Number(r), count: c }))
    .sort((a, b) => b.count - a.count || b.rank - a.rank);

  // Royal Flush
  if (isFlush && isStraight && straightHigh === 12) {
    return { category: 0, tiebreakers: [12], name: 'Royal Flush', cards: sorted };
  }
  // Straight Flush
  if (isFlush && isStraight) {
    return { category: 1, tiebreakers: [straightHigh], name: 'Straight Flush', cards: sorted };
  }
  // Four of a Kind
  if (counts[0].count === 4) {
    return {
      category: 2,
      tiebreakers: [counts[0].rank, counts[1].rank],
      name: 'Four of a Kind',
      cards: sorted,
    };
  }
  // ** Short Deck: Flush beats Full House **
  // Flush (category 3 instead of 4)
  if (isFlush) {
    return { category: 3, tiebreakers: ranks, name: 'Flush', cards: sorted };
  }
  // Full House (category 4 instead of 3)
  if (counts[0].count === 3 && counts[1].count === 2) {
    return {
      category: 4,
      tiebreakers: [counts[0].rank, counts[1].rank],
      name: 'Full House',
      cards: sorted,
    };
  }
  // Straight
  if (isStraight) {
    return { category: 5, tiebreakers: [straightHigh], name: 'Straight', cards: sorted };
  }
  // Three of a Kind
  if (counts[0].count === 3) {
    const kickers = counts.filter((c) => c.count === 1).map((c) => c.rank);
    return {
      category: 6,
      tiebreakers: [counts[0].rank, ...kickers],
      name: 'Three of a Kind',
      cards: sorted,
    };
  }
  // Two Pair
  if (counts[0].count === 2 && counts[1].count === 2) {
    const pairs = [counts[0].rank, counts[1].rank].sort((a, b) => b - a);
    const kicker = counts[2].rank;
    return { category: 7, tiebreakers: [...pairs, kicker], name: 'Two Pair', cards: sorted };
  }
  // One Pair
  if (counts[0].count === 2) {
    const kickers = counts
      .filter((c) => c.count === 1)
      .map((c) => c.rank)
      .sort((a, b) => b - a);
    return { category: 8, tiebreakers: [counts[0].rank, ...kickers], name: 'One Pair', cards: sorted };
  }
  // High Card
  return { category: 9, tiebreakers: ranks, name: 'High Card', cards: sorted };
}
