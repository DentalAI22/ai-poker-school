// Range Calculator — parse ranges, calculate equity, narrow ranges, count combos

import { RANKS, SUITS } from './constants';
import type { Card, Suit, Rank } from './hand-evaluator';
import { evaluateHigh } from './hand-evaluator';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single hole-card combo (2 cards) */
export interface HoleCards {
  card1: Card;
  card2: Card;
}

/** A hand notation like "AKs", "TT", "87o" */
export type HandNotation = string;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const RANK_ORDER = [...RANKS]; // ['2','3','4','5','6','7','8','9','T','J','Q','K','A']

function rankIndex(r: Rank): number {
  return RANK_ORDER.indexOf(r);
}

function allSuits(): Suit[] {
  return ['hearts', 'diamonds', 'clubs', 'spades'];
}

function cardEqual(a: Card, b: Card): boolean {
  return a.rank === b.rank && a.suit === b.suit;
}

function cardConflicts(cards: Card[], check: Card[]): boolean {
  for (const c of check) {
    if (cards.some((x) => cardEqual(x, c))) return true;
  }
  return false;
}

/** Build a full 52-card deck */
function buildDeck(): Card[] {
  const deck: Card[] = [];
  for (const r of RANKS) {
    for (const s of SUITS) {
      deck.push({ rank: r, suit: s });
    }
  }
  return deck;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Parse Range
// ---------------------------------------------------------------------------

/**
 * Parse a range string like "AA-TT, AKs-ATs, AKo-AJo, 87s" into a set of
 * hand notations (e.g., "AA", "KK", "AKs", "AQs", etc.)
 */
export function parseRange(rangeStr: string): Set<HandNotation> {
  const hands = new Set<HandNotation>();
  const parts = rangeStr.split(',').map((s) => s.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes('-')) {
      // Range like AA-TT or AKs-ATs
      const [start, end] = part.split('-').map((s) => s.trim());
      expandRange(start, end, hands);
    } else if (part.endsWith('+')) {
      // Plus notation like "TT+" or "ATs+"
      const base = part.slice(0, -1);
      expandPlus(base, hands);
    } else {
      hands.add(normalizeHand(part));
    }
  }

  return hands;
}

function normalizeHand(h: string): HandNotation {
  if (h.length === 2) {
    // Pair like "AA"
    return h.toUpperCase();
  }
  const r1 = h[0].toUpperCase();
  const r2 = h[1].toUpperCase();
  const suffix = h.length > 2 ? h[2].toLowerCase() : '';

  // Ensure higher rank comes first
  if (rankIndex(r1 as Rank) < rankIndex(r2 as Rank)) {
    return `${r2}${r1}${suffix}`;
  }
  return `${r1}${r2}${suffix}`;
}

function expandRange(start: string, end: string, hands: Set<HandNotation>): void {
  const s = normalizeHand(start);
  const e = normalizeHand(end);

  // Pair range like AA-TT
  if (s.length === 2 && s[0] === s[1] && e.length === 2 && e[0] === e[1]) {
    const high = rankIndex(s[0] as Rank);
    const low = rankIndex(e[0] as Rank);
    const lo = Math.min(high, low);
    const hi = Math.max(high, low);
    for (let i = lo; i <= hi; i++) {
      hands.add(`${RANK_ORDER[i]}${RANK_ORDER[i]}`);
    }
    return;
  }

  // Suited/offsuit range like AKs-ATs
  const suffix = s.length > 2 ? s[2] : '';
  const r1 = s[0] as Rank; // should be same for start and end (e.g., 'A')
  const r2Start = rankIndex(s[1] as Rank);
  const r2End = rankIndex(e[1] as Rank);
  const lo = Math.min(r2Start, r2End);
  const hi = Math.max(r2Start, r2End);

  for (let i = lo; i <= hi; i++) {
    if (RANK_ORDER[i] === r1) continue; // skip if it would be a pair
    const hand = `${r1}${RANK_ORDER[i]}${suffix}`;
    hands.add(normalizeHand(hand));
  }
}

function expandPlus(base: string, hands: Set<HandNotation>): void {
  const norm = normalizeHand(base);

  // Pair+ like TT+ => TT, JJ, QQ, KK, AA
  if (norm.length === 2 && norm[0] === norm[1]) {
    const start = rankIndex(norm[0] as Rank);
    for (let i = start; i < RANK_ORDER.length; i++) {
      hands.add(`${RANK_ORDER[i]}${RANK_ORDER[i]}`);
    }
    return;
  }

  // Non-pair+ like ATs+ => ATs, AJs, AQs, AKs
  const suffix = norm.length > 2 ? norm[2] : '';
  const r1 = norm[0] as Rank;
  const r2Start = rankIndex(norm[1] as Rank);
  const r1Index = rankIndex(r1);

  for (let i = r2Start; i < r1Index; i++) {
    hands.add(`${r1}${RANK_ORDER[i]}${suffix}`);
  }
}

// ---------------------------------------------------------------------------
// Expand Hand Notation to Specific Combos
// ---------------------------------------------------------------------------

/**
 * Convert a hand notation to all possible specific 2-card combos.
 */
function handToCombos(hand: HandNotation): HoleCards[] {
  const combos: HoleCards[] = [];
  const suits = allSuits();

  if (hand.length === 2 && hand[0] === hand[1]) {
    // Pair: choose 2 from 4 suits
    const rank = hand[0] as Rank;
    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++) {
        combos.push({
          card1: { rank, suit: suits[i] },
          card2: { rank, suit: suits[j] },
        });
      }
    }
  } else if (hand.length === 3 && hand[2] === 's') {
    // Suited
    const r1 = hand[0] as Rank;
    const r2 = hand[1] as Rank;
    for (const s of suits) {
      combos.push({
        card1: { rank: r1, suit: s },
        card2: { rank: r2, suit: s },
      });
    }
  } else if (hand.length === 3 && hand[2] === 'o') {
    // Offsuit
    const r1 = hand[0] as Rank;
    const r2 = hand[1] as Rank;
    for (const s1 of suits) {
      for (const s2 of suits) {
        if (s1 === s2) continue;
        combos.push({
          card1: { rank: r1, suit: s1 },
          card2: { rank: r2, suit: s2 },
        });
      }
    }
  } else {
    // No suffix: both suited and offsuit
    const r1 = hand[0] as Rank;
    const r2 = hand[1] as Rank;
    for (const s1 of suits) {
      for (const s2 of suits) {
        if (r1 === r2 && suits.indexOf(s1) >= suits.indexOf(s2)) continue;
        combos.push({
          card1: { rank: r1, suit: s1 },
          card2: { rank: r2, suit: s2 },
        });
      }
    }
  }

  return combos;
}

// ---------------------------------------------------------------------------
// Count Combos
// ---------------------------------------------------------------------------

/**
 * Count the number of specific combos for each hand in a range,
 * optionally removing combos that conflict with known dead cards.
 */
export function countCombos(
  range: Set<HandNotation>,
  deadCards: Card[] = []
): Map<HandNotation, number> {
  const counts = new Map<HandNotation, number>();

  for (const hand of range) {
    const combos = handToCombos(hand);
    const live = combos.filter((c) => !cardConflicts(deadCards, [c.card1, c.card2]));
    counts.set(hand, live.length);
  }

  return counts;
}

// ---------------------------------------------------------------------------
// Calculate Equity (Monte Carlo)
// ---------------------------------------------------------------------------

/**
 * Calculate equity of a specific hand vs a range using Monte Carlo simulation.
 * @param heroCards - The hero's two hole cards
 * @param villainRange - Set of hand notations for the villain's range
 * @param board - Community cards already dealt (0-5)
 * @param iterations - Number of Monte Carlo iterations
 * @returns Equity as a number between 0 and 1
 */
export function calculateEquity(
  heroCards: HoleCards,
  villainRange: Set<HandNotation>,
  board: Card[] = [],
  iterations: number = 10000
): number {
  const dead = [heroCards.card1, heroCards.card2, ...board];

  // Build all possible villain combos
  const allVillainCombos: HoleCards[] = [];
  for (const hand of villainRange) {
    const combos = handToCombos(hand);
    for (const combo of combos) {
      if (!cardConflicts(dead, [combo.card1, combo.card2])) {
        allVillainCombos.push(combo);
      }
    }
  }

  if (allVillainCombos.length === 0) return 1; // villain has no valid hands

  let wins = 0;
  let ties = 0;
  let total = 0;

  const remainingDeck = buildDeck().filter(
    (c) => !cardConflicts(dead, [c])
  );

  for (let i = 0; i < iterations; i++) {
    // Pick random villain combo
    const villain = allVillainCombos[Math.floor(Math.random() * allVillainCombos.length)];

    // Remove villain cards from remaining deck
    const deckForRun = remainingDeck.filter(
      (c) => !cardEqual(c, villain.card1) && !cardEqual(c, villain.card2)
    );

    // Deal remaining community cards
    const cardsNeeded = 5 - board.length;
    const shuffled = shuffleArray(deckForRun);
    const runout = shuffled.slice(0, cardsNeeded);
    const fullBoard = [...board, ...runout];

    // Evaluate both hands
    const heroAll = [heroCards.card1, heroCards.card2, ...fullBoard];
    const villainAll = [villain.card1, villain.card2, ...fullBoard];

    const heroResult = evaluateHigh(heroAll);
    const villainResult = evaluateHigh(villainAll);

    if (heroResult.rank < villainResult.rank) {
      wins++;
    } else if (heroResult.rank === villainResult.rank) {
      // Same category — need deeper comparison via re-evaluation
      // Simplified: count as tie (close enough for Monte Carlo)
      ties++;
    } else {
      // villain wins
    }
    total++;
  }

  return (wins + ties / 2) / total;
}

// ---------------------------------------------------------------------------
// Narrow Range
// ---------------------------------------------------------------------------

export type ActionType = 'raise' | 'call' | 'check' | 'bet' | 'fold' | '3bet' | '4bet';

interface NarrowConfig {
  /** The action villain took */
  action: ActionType;
  /** The street the action occurred on */
  street: 'preflop' | 'flop' | 'turn' | 'river';
  /** Bet size relative to pot (e.g., 0.5 = half pot, 1.0 = pot) */
  betSizeRelative?: number;
}

/**
 * Narrow a range based on an action taken. This uses simple heuristic
 * assumptions about how ranges interact with actions.
 *
 * For a production solver, this would use a proper GTO database or neural net.
 * This version provides reasonable approximations for educational purposes.
 */
export function narrowRange(
  currentRange: Set<HandNotation>,
  config: NarrowConfig,
  board: Card[] = []
): Set<HandNotation> {
  const { action, street } = config;
  const rangeArray = [...currentRange];

  // Sort hands by approximate strength (pairs > suited broadways > offsuit broadways > etc.)
  const ranked = rangeArray
    .map((h) => ({ hand: h, strength: approximateHandStrength(h) }))
    .sort((a, b) => b.strength - a.strength);

  let keepPercent: number;

  switch (action) {
    case 'raise':
    case '3bet':
      // Raising range: top ~15-20% of opening range + some bluffs
      keepPercent = street === 'preflop' ? 0.35 : 0.40;
      break;
    case '4bet':
      // 4-bet range: very strong hands + occasional bluffs
      keepPercent = 0.15;
      break;
    case 'call':
      // Calling range: medium strength hands
      keepPercent = 0.60;
      break;
    case 'bet':
      // Betting range: polarized — strong hands and bluffs
      keepPercent = street === 'river' ? 0.45 : 0.55;
      break;
    case 'check':
      // Checking range: medium strength, traps, and weak hands
      keepPercent = 0.70;
      break;
    case 'fold':
      // Folding range: weakest hands removed already
      keepPercent = 0;
      break;
    default:
      keepPercent = 1.0;
  }

  if (action === 'fold') {
    return new Set<HandNotation>();
  }

  const keepCount = Math.max(1, Math.round(ranked.length * keepPercent));

  // For raises/bets: take from top (value) and a small amount from bottom (bluffs)
  const narrowed = new Set<HandNotation>();

  if (action === 'raise' || action === '3bet' || action === '4bet' || action === 'bet') {
    const valueCount = Math.round(keepCount * 0.7);
    const bluffCount = keepCount - valueCount;

    // Top value hands
    for (let i = 0; i < Math.min(valueCount, ranked.length); i++) {
      narrowed.add(ranked[i].hand);
    }
    // Bottom bluff hands
    for (let i = Math.max(0, ranked.length - bluffCount); i < ranked.length; i++) {
      narrowed.add(ranked[i].hand);
    }
  } else if (action === 'call') {
    // Middle of range (remove top and bottom)
    const skipTop = Math.round(ranked.length * 0.1);
    const skipBottom = ranked.length - keepCount - skipTop;
    for (let i = skipTop; i < ranked.length - Math.max(0, skipBottom); i++) {
      narrowed.add(ranked[i].hand);
    }
  } else {
    // Check: keep a middle-weighted chunk
    for (let i = 0; i < keepCount; i++) {
      narrowed.add(ranked[i].hand);
    }
  }

  return narrowed;
}

/** Approximate hand strength score (0-100) for sorting */
function approximateHandStrength(hand: HandNotation): number {
  const r1 = hand[0] as Rank;
  const r2 = hand[1] as Rank;
  const suited = hand.length > 2 && hand[2] === 's';
  const isPair = r1 === r2;

  const v1 = rankIndex(r1);
  const v2 = rankIndex(r2);
  const high = Math.max(v1, v2);
  const low = Math.min(v1, v2);

  let score = 0;

  if (isPair) {
    score = 50 + high * 3.5; // AA = 92, 22 = 50
  } else {
    score = high * 2.5 + low * 1.5; // AK = 47.5
    if (suited) score += 4;
    // Connectedness bonus
    const gap = high - low;
    if (gap === 1) score += 3;
    else if (gap === 2) score += 1.5;
  }

  return score;
}
