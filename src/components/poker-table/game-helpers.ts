// =============================================================================
// Poker Table Game Helpers
// Types, constants, seat positions, deck/shuffle, hand evaluator, AI logic,
// and coach message generation — extracted to keep PokerTable.tsx lean.
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';
export interface CardType { suit: string; rank: string }
export type Street = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown' | 'idle';

export interface PlayerState {
  name: string;
  chips: number;
  cards: CardType[];
  bet: number;
  folded: boolean;
  isAllIn: boolean;
  position: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

export const RANK_VALUES: Record<string, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

export const POSITION_NAMES_6 = ['BTN', 'SB', 'BB', 'UTG', 'HJ', 'CO'];
export const POSITION_NAMES_9 = ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO'];
export const POSITION_NAMES_2 = ['BTN/SB', 'BB'];

export const AI_NAMES = ['Viktor', 'Chen', 'Negreanu', 'Ivey', 'Helmuth', 'Dwan', 'Antonius', 'Brunson'];

export const STARTING_CHIPS = 1000;
export const SMALL_BLIND = 5;
export const BIG_BLIND = 10;

// ---------------------------------------------------------------------------
// Seat positions (percentage-based for responsive oval layout)
// ---------------------------------------------------------------------------
export type SeatPos = { top: string; left: string };

const SEATS_6: SeatPos[] = [
  { top: '82%', left: '50%' },
  { top: '62%', left: '8%' },
  { top: '12%', left: '12%' },
  { top: '5%', left: '50%' },
  { top: '12%', left: '88%' },
  { top: '62%', left: '92%' },
];

const SEATS_9: SeatPos[] = [
  { top: '85%', left: '50%' },
  { top: '75%', left: '15%' },
  { top: '45%', left: '5%' },
  { top: '12%', left: '15%' },
  { top: '5%', left: '40%' },
  { top: '5%', left: '60%' },
  { top: '12%', left: '85%' },
  { top: '45%', left: '95%' },
  { top: '75%', left: '85%' },
];

const SEATS_2: SeatPos[] = [
  { top: '82%', left: '50%' },
  { top: '5%', left: '50%' },
];

export function getSeats(n: number): SeatPos[] {
  if (n <= 2) return SEATS_2;
  if (n <= 6) return SEATS_6.slice(0, n);
  return SEATS_9.slice(0, n);
}

export function getPositionNames(n: number): string[] {
  if (n <= 2) return POSITION_NAMES_2;
  if (n <= 6) return POSITION_NAMES_6;
  return POSITION_NAMES_9;
}

// ---------------------------------------------------------------------------
// Deck
// ---------------------------------------------------------------------------
export function buildDeck(): CardType[] {
  const deck: CardType[] = [];
  for (const suit of SUITS) for (const rank of RANKS) deck.push({ suit, rank });
  return deck;
}

export function shuffleDeck(deck: CardType[]): CardType[] {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

// ---------------------------------------------------------------------------
// Hand evaluator (simple demo-grade)
// ---------------------------------------------------------------------------
export function evalHand(cards: CardType[]): number {
  if (cards.length < 2) return 0;
  const vals = cards.map(c => RANK_VALUES[c.rank]).sort((a, b) => b - a);
  const suitCounts: Record<string, number> = {};
  cards.forEach(c => { suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1; });
  const isFlush = Object.values(suitCounts).some(v => v >= 5);

  const freq: Record<number, number> = {};
  vals.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const groups = Object.entries(freq)
    .map(([v, c]) => ({ val: Number(v), count: c }))
    .sort((a, b) => b.count - a.count || b.val - a.val);

  const uniqueVals = [...new Set(vals)].sort((a, b) => b - a);
  let isStraight = false;
  let straightHigh = 0;
  for (let i = 0; i <= uniqueVals.length - 5; i++) {
    if (uniqueVals[i] - uniqueVals[i + 4] === 4) { isStraight = true; straightHigh = uniqueVals[i]; break; }
  }
  if (!isStraight && uniqueVals.includes(14) && [5, 4, 3, 2].every(v => uniqueVals.includes(v))) {
    isStraight = true; straightHigh = 5;
  }

  const kickers = vals.slice(0, 5);
  const k = (a: number[]) => a.reduce((s, v, i) => s + v * Math.pow(15, 4 - i), 0);

  if (isFlush && isStraight) return 8_000_000 + straightHigh;
  if (groups[0].count === 4) return 7_000_000 + groups[0].val * 15 + (groups[1]?.val || 0);
  if (groups[0].count === 3 && groups[1]?.count >= 2) return 6_000_000 + groups[0].val * 15 + groups[1].val;
  if (isFlush) return 5_000_000 + k(kickers);
  if (isStraight) return 4_000_000 + straightHigh;
  if (groups[0].count === 3) return 3_000_000 + groups[0].val * 225 + k(kickers.filter(v => v !== groups[0].val).slice(0, 2));
  if (groups[0].count === 2 && groups[1]?.count === 2) {
    return 2_000_000 + Math.max(groups[0].val, groups[1].val) * 225 + Math.min(groups[0].val, groups[1].val) * 15 +
      (kickers.find(v => v !== groups[0].val && v !== groups[1].val) || 0);
  }
  if (groups[0].count === 2) return 1_000_000 + groups[0].val * 3375 + k(kickers.filter(v => v !== groups[0].val).slice(0, 3));
  return k(kickers);
}

// ---------------------------------------------------------------------------
// AI decision (simple weighted random)
// ---------------------------------------------------------------------------
export function aiDecide(
  player: PlayerState,
  callAmt: number,
  potTotal: number
): { action: 'fold' | 'call' | 'raise'; amount: number } {
  const canCall = player.chips >= callAmt;
  const handStrength = evalHand([...player.cards]);
  const r = Math.random();
  const foldThreshold = callAmt === 0 ? 0 : handStrength > 1_000_000 ? 0.05 : 0.3;
  const raiseThreshold = handStrength > 2_000_000 ? 0.5 : handStrength > 1_000_000 ? 0.2 : 0.08;

  if (callAmt === 0) {
    if (r < raiseThreshold) {
      const raiseAmt = Math.min(Math.max(BIG_BLIND * 2, Math.round(potTotal * (0.5 + Math.random() * 0.5))), player.chips);
      return { action: 'raise', amount: raiseAmt };
    }
    return { action: 'call', amount: 0 };
  }

  if (r < foldThreshold || !canCall) return { action: 'fold', amount: 0 };
  if (r < foldThreshold + (1 - foldThreshold) * (1 - raiseThreshold)) return { action: 'call', amount: callAmt };

  const raiseAmt = Math.min(Math.max(callAmt * 2, Math.round(potTotal * (0.5 + Math.random() * 0.5))), player.chips);
  return { action: 'raise', amount: raiseAmt };
}

// ---------------------------------------------------------------------------
// Coach message generator
// ---------------------------------------------------------------------------
export function generateCoachMessage(
  street: Street,
  playerCards: CardType[],
  communityCards: CardType[],
  pot: number,
  position: string
): string {
  if (street === 'idle') return 'Ready to play? Hit "Deal" to start a new hand!';
  if (street === 'showdown') return 'Let\'s see who takes it down!';

  const allCards = [...playerCards, ...communityCards];
  const score = evalHand(allCards);

  if (street === 'preflop') {
    const r1 = RANK_VALUES[playerCards[0]?.rank] || 0;
    const r2 = RANK_VALUES[playerCards[1]?.rank] || 0;
    const isPair = r1 === r2;
    const high = Math.max(r1, r2);
    if (isPair && high >= 10) return `Pocket ${playerCards[0].rank}s from ${position} -- premium hand. Raise it up!`;
    if (isPair) return `Small pair from ${position}. Set-mining territory if the price is right.`;
    if (high >= 13 && Math.min(r1, r2) >= 10) return `Strong broadway hand from ${position}. Open or 3-bet this.`;
    if (high >= 13) return `High card from ${position}. Position matters here -- be mindful of opponents.`;
    return `Speculative hand from ${position}. Play carefully or consider folding vs early position opens.`;
  }

  if (score >= 6_000_000) return 'Monster hand! Think about how to extract maximum value.';
  if (score >= 4_000_000) return 'Strong hand here. Consider building the pot on this street.';
  if (score >= 2_000_000) return 'Decent hand but vulnerable. Think about pot control or protecting equity.';
  if (score >= 1_000_000) return `One pair with a ${pot > 100 ? 'growing' : 'small'} pot. Be cautious of overcards and draws.`;
  return 'Not much right now. Consider if you have good drawing equity before putting more chips in.';
}

// ---------------------------------------------------------------------------
// Hero hand notation for GTO chart highlight
// ---------------------------------------------------------------------------
export function heroHandNotation(cards: CardType[]): string | undefined {
  if (cards.length !== 2) return undefined;
  const r1 = cards[0].rank;
  const r2 = cards[1].rank;
  const v1 = RANK_VALUES[r1] || 0;
  const v2 = RANK_VALUES[r2] || 0;
  if (r1 === r2) return `${r1}${r2}`;
  const suited = cards[0].suit === cards[1].suit ? 's' : 'o';
  return v1 > v2 ? `${r1}${r2}${suited}` : `${r2}${r1}${suited}`;
}
