// Position Utilities — table positions, advantage, and rotation logic

import {
  POSITIONS_9MAX,
  POSITIONS_6MAX,
  POSITIONS_HEADSUP,
} from './constants';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TableSize = '9max' | '6max' | 'headsup';

export type Position9Max = (typeof POSITIONS_9MAX)[number];
export type Position6Max = (typeof POSITIONS_6MAX)[number];
export type PositionHeadsUp = (typeof POSITIONS_HEADSUP)[number];
export type Position = Position9Max | Position6Max | PositionHeadsUp;

export type PositionCategory = 'early' | 'middle' | 'late' | 'blind';

// ---------------------------------------------------------------------------
// Position lists by table size
// ---------------------------------------------------------------------------

/**
 * Get the ordered list of positions for a given table size.
 * Order is from earliest to act preflop to latest (except blinds act last preflop
 * but first postflop — this list reflects seat order starting from UTG).
 */
export function getPositions(tableSize: TableSize): readonly string[] {
  switch (tableSize) {
    case '9max':
      return POSITIONS_9MAX;
    case '6max':
      return POSITIONS_6MAX;
    case 'headsup':
      return POSITIONS_HEADSUP;
    default:
      return POSITIONS_6MAX;
  }
}

// ---------------------------------------------------------------------------
// Seat number to position name
// ---------------------------------------------------------------------------

/**
 * Get the position name from a seat number (0-indexed from UTG).
 * Seat 0 = first position (UTG for 9max/6max, BTN for heads-up).
 */
export function getPositionFromSeat(seatNumber: number, tableSize: TableSize): string {
  const positions = getPositions(tableSize);
  if (seatNumber < 0 || seatNumber >= positions.length) {
    throw new Error(
      `Seat number ${seatNumber} out of range for ${tableSize} (0-${positions.length - 1})`
    );
  }
  return positions[seatNumber];
}

/**
 * Get the seat number for a given position name.
 */
export function getSeatFromPosition(position: string, tableSize: TableSize): number {
  const positions = getPositions(tableSize);
  const index = positions.indexOf(position);
  if (index === -1) {
    throw new Error(`Position "${position}" not found for table size ${tableSize}`);
  }
  return index;
}

// ---------------------------------------------------------------------------
// Position categories
// ---------------------------------------------------------------------------

const POSITION_CATEGORIES: Record<string, PositionCategory> = {
  'UTG': 'early',
  'UTG+1': 'early',
  'UTG+2': 'early',
  'MP': 'middle',
  'HJ': 'middle',
  'CO': 'late',
  'BTN': 'late',
  'SB': 'blind',
  'BB': 'blind',
};

/**
 * Get the category (early, middle, late, blind) for a given position.
 * In 6-max, UTG is considered early position.
 * In heads-up, BTN is late and BB is blind.
 */
export function getPositionCategory(position: string): PositionCategory {
  return POSITION_CATEGORIES[position] || 'middle';
}

/**
 * Check if a position is in early position.
 */
export function isEarlyPosition(position: string): boolean {
  return getPositionCategory(position) === 'early';
}

/**
 * Check if a position is in middle position.
 */
export function isMiddlePosition(position: string): boolean {
  return getPositionCategory(position) === 'middle';
}

/**
 * Check if a position is in late position (CO or BTN).
 */
export function isLatePosition(position: string): boolean {
  return getPositionCategory(position) === 'late';
}

/**
 * Check if a position is a blind (SB or BB).
 */
export function isBlind(position: string): boolean {
  return getPositionCategory(position) === 'blind';
}

// ---------------------------------------------------------------------------
// Position advantage ranking
// ---------------------------------------------------------------------------

/**
 * Position advantage ranking: higher number = more advantageous position.
 * BTN is the most advantageous (acts last postflop), early positions are least.
 * Blinds are ranked low because they act first postflop despite posting forced bets.
 */
const POSITION_ADVANTAGE: Record<string, number> = {
  'SB': 1,
  'BB': 2,
  'UTG': 3,
  'UTG+1': 4,
  'UTG+2': 5,
  'MP': 6,
  'HJ': 7,
  'CO': 8,
  'BTN': 9,
};

/**
 * Get the advantage score for a position (1 = worst, 9 = best).
 */
export function getPositionAdvantage(position: string): number {
  return POSITION_ADVANTAGE[position] ?? 0;
}

/**
 * Compare two positions by advantage. Returns negative if posA is worse,
 * positive if posA is better, 0 if equal.
 */
export function comparePositionAdvantage(posA: string, posB: string): number {
  return getPositionAdvantage(posA) - getPositionAdvantage(posB);
}

/**
 * Get all positions sorted by advantage (worst to best).
 */
export function getPositionsByAdvantage(tableSize: TableSize): string[] {
  const positions = [...getPositions(tableSize)];
  return positions.sort((a, b) => getPositionAdvantage(a) - getPositionAdvantage(b));
}

// ---------------------------------------------------------------------------
// Next position to act
// ---------------------------------------------------------------------------

/**
 * Get the next position to act (preflop action order).
 * Preflop: UTG acts first, then clockwise, SB, BB act last.
 */
export function getNextPositionPreflop(
  currentPosition: string,
  tableSize: TableSize
): string | null {
  const positions = getPositions(tableSize);
  const currentIndex = positions.indexOf(currentPosition);
  if (currentIndex === -1) return null;

  const nextIndex = currentIndex + 1;
  if (nextIndex >= positions.length) return null; // action complete
  return positions[nextIndex] as string;
}

/**
 * Get the next position to act (postflop action order).
 * Postflop: SB acts first (or first player left of dealer still in the hand),
 * then clockwise ending at BTN.
 */
export function getNextPositionPostflop(
  currentPosition: string,
  tableSize: TableSize,
  activePlayers?: string[]
): string | null {
  // Postflop order: SB, BB, UTG, UTG+1, UTG+2, MP, HJ, CO, BTN
  const postflopOrder = getPostflopOrder(tableSize);

  if (activePlayers && activePlayers.length > 0) {
    const filtered = postflopOrder.filter((p) => activePlayers.includes(p));
    const currentIndex = filtered.indexOf(currentPosition);
    if (currentIndex === -1 || currentIndex + 1 >= filtered.length) return null;
    return filtered[currentIndex + 1];
  }

  const currentIndex = postflopOrder.indexOf(currentPosition);
  if (currentIndex === -1 || currentIndex + 1 >= postflopOrder.length) return null;
  return postflopOrder[currentIndex + 1];
}

/**
 * Get the postflop acting order for a given table size.
 * SB first, then BB, then early positions through to BTN.
 */
export function getPostflopOrder(tableSize: TableSize): string[] {
  const positions = [...getPositions(tableSize)];
  // Move blinds (last two) to the front
  const blinds = positions.splice(-2); // removes SB, BB from end
  return [...blinds, ...positions];
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/**
 * Get the number of players for a table size.
 */
export function getPlayerCount(tableSize: TableSize): number {
  return getPositions(tableSize).length;
}

/**
 * Determine the recommended opening range width multiplier for a position.
 * BTN can open wider than UTG. Returns a multiplier (0.0 - 1.0) representing
 * how wide you should open relative to the widest possible range.
 */
export function getRecommendedOpenWidth(position: string): number {
  const widths: Record<string, number> = {
    'UTG': 0.12,
    'UTG+1': 0.14,
    'UTG+2': 0.16,
    'MP': 0.20,
    'HJ': 0.25,
    'CO': 0.35,
    'BTN': 0.50,
    'SB': 0.40,
    'BB': 1.0, // BB defends wide
  };
  return widths[position] ?? 0.20;
}
