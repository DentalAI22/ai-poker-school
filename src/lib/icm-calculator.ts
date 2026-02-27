// ICM (Independent Chip Model) Calculator — tournament equity, call/fold EV, push/fold

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ICMResult {
  /** Equity in dollars (or prize pool units) for each player */
  equities: number[];
  /** Equity as a percentage of the total prize pool */
  equityPercentages: number[];
}

export interface CallFoldEV {
  callEV: number;
  foldEV: number;
  /** Positive means call is better, negative means fold is better */
  evDifference: number;
  recommendation: 'call' | 'fold';
}

export interface PushFoldRange {
  /** Minimum hand strength percentile to push (0 = any two, 100 = only AA) */
  pushThreshold: number;
  /** List of hands that should be pushed */
  pushHands: string[];
  /** Effective stack in big blinds */
  effectiveBBs: number;
}

// ---------------------------------------------------------------------------
// ICM Calculation (Malmuth-Harville model)
// ---------------------------------------------------------------------------

/**
 * Calculate ICM equity for each player given chip stacks and a prize pool.
 *
 * Uses the Malmuth-Harville model: a player's probability of finishing in
 * position k is proportional to their chip stack (for 1st), then recursively
 * calculated for subsequent positions after removing the 1st-place finisher.
 *
 * @param stacks - Array of chip stacks for each player
 * @param prizes - Array of prize amounts (1st, 2nd, 3rd, etc.)
 * @returns ICM equities for each player
 */
export function calculateICM(stacks: number[], prizes: number[]): ICMResult {
  const n = stacks.length;
  const totalChips = stacks.reduce((a, b) => a + b, 0);

  if (totalChips === 0) {
    return {
      equities: stacks.map(() => 0),
      equityPercentages: stacks.map(() => 0),
    };
  }

  const totalPrizePool = prizes.reduce((a, b) => a + b, 0);
  const equities = new Array(n).fill(0);

  // For each player, calculate their total ICM equity
  // by summing probability_of_finishing_kth * prize[k] for each position k
  const prizePositions = Math.min(prizes.length, n);

  // Recursive probability calculation
  function computeEquity(
    playerIndex: number,
    remaining: Set<number>,
    prizeIndex: number,
    probability: number
  ): void {
    if (prizeIndex >= prizePositions || remaining.size === 0 || probability < 1e-10) {
      return;
    }

    const remainingChips = [...remaining].reduce((sum, i) => sum + stacks[i], 0);
    if (remainingChips === 0) return;

    // Probability that playerIndex finishes in this prize position
    const probFinishHere = (stacks[playerIndex] / remainingChips) * probability;
    equities[playerIndex] += probFinishHere * (prizes[prizeIndex] || 0);

    // For other players: what happens if playerIndex finishes here
    const newRemaining = new Set(remaining);
    newRemaining.delete(playerIndex);

    // Now calculate equity for remaining players in subsequent positions
    for (const otherPlayer of newRemaining) {
      computeEquity(otherPlayer, newRemaining, prizeIndex + 1, probFinishHere);
    }
  }

  // For efficiency with many players, limit recursion depth
  const allPlayers = new Set(Array.from({ length: n }, (_, i) => i));

  if (n <= 10) {
    // Full recursive computation for smaller fields
    for (let i = 0; i < n; i++) {
      if (stacks[i] > 0) {
        computeEquity(i, allPlayers, 0, 1.0);
      }
    }
  } else {
    // Simplified approximation for larger fields
    // Use first-order ICM (probability of finishing 1st * prize spread)
    for (let i = 0; i < n; i++) {
      const chipFraction = stacks[i] / totalChips;
      // Approximate ICM equity using chip-weighted prize distribution
      for (let k = 0; k < prizePositions; k++) {
        // Probability of finishing in position k (simplified)
        const probK = approximateFinishProbability(chipFraction, k, n);
        equities[i] += probK * prizes[k];
      }
    }
  }

  const equityPercentages = equities.map((e) => (totalPrizePool > 0 ? (e / totalPrizePool) * 100 : 0));

  return { equities, equityPercentages };
}

/**
 * Simplified finish probability for large-field ICM.
 * Uses the chip-proportional model with position adjustment.
 */
function approximateFinishProbability(
  chipFraction: number,
  finishPosition: number,
  totalPlayers: number
): number {
  if (finishPosition === 0) {
    // First place: roughly proportional to chip stack
    return chipFraction;
  }
  // For subsequent positions, adjust based on chip fraction
  // Players with more chips have higher chances of finishing in later money positions too
  const base = chipFraction;
  // Diminishing returns for high finishes with large stacks
  const positionFactor = 1 - (finishPosition / totalPlayers);
  return base * positionFactor * (1 / (finishPosition + 1)) * 2;
}

// ---------------------------------------------------------------------------
// ICM Call EV vs Fold EV
// ---------------------------------------------------------------------------

/**
 * Compare the expected value of calling an all-in vs folding in an ICM spot.
 *
 * @param stacks - Current chip stacks (before the call)
 * @param prizes - Prize pool structure
 * @param heroIndex - Index of the hero (player deciding)
 * @param villainIndex - Index of the villain (player who pushed)
 * @param callAmount - Amount hero needs to call
 * @param potSize - Current pot (including villain's push)
 * @param heroWinProb - Probability that hero wins the hand if called (0-1)
 * @returns CallFoldEV comparison
 */
export function icmCallEV(
  stacks: number[],
  prizes: number[],
  heroIndex: number,
  villainIndex: number,
  callAmount: number,
  potSize: number,
  heroWinProb: number
): CallFoldEV {
  const foldEV = calculateFoldEquity(stacks, prizes, heroIndex, callAmount);
  const callEV = calculateCallEquity(
    stacks,
    prizes,
    heroIndex,
    villainIndex,
    callAmount,
    potSize,
    heroWinProb
  );

  return {
    callEV,
    foldEV,
    evDifference: callEV - foldEV,
    recommendation: callEV >= foldEV ? 'call' : 'fold',
  };
}

function calculateFoldEquity(
  stacks: number[],
  prizes: number[],
  heroIndex: number,
  _callAmount: number
): number {
  // When folding, hero's stack stays the same (minus any blinds already posted)
  // The pot goes to villain — simplified: stacks remain as-is for ICM calc
  const foldStacks = [...stacks];
  const result = calculateICM(foldStacks, prizes);
  return result.equities[heroIndex];
}

function calculateCallEquity(
  stacks: number[],
  prizes: number[],
  heroIndex: number,
  villainIndex: number,
  callAmount: number,
  potSize: number,
  heroWinProb: number
): number {
  const effectiveCall = Math.min(callAmount, stacks[heroIndex]);
  const effectiveVillainRisk = Math.min(stacks[villainIndex], effectiveCall + potSize);

  // Scenario 1: Hero wins
  const winStacks = [...stacks];
  winStacks[heroIndex] = stacks[heroIndex] - effectiveCall + potSize + effectiveCall;
  winStacks[villainIndex] = stacks[villainIndex] - effectiveVillainRisk;
  // Correct: hero gains the pot
  winStacks[heroIndex] = stacks[heroIndex] + potSize;
  winStacks[villainIndex] = Math.max(0, stacks[villainIndex] - effectiveVillainRisk);

  const winICM = calculateICM(winStacks, prizes);
  const heroWinEquity = winICM.equities[heroIndex];

  // Scenario 2: Hero loses
  const loseStacks = [...stacks];
  loseStacks[heroIndex] = Math.max(0, stacks[heroIndex] - effectiveCall);
  loseStacks[villainIndex] = stacks[villainIndex] + effectiveCall;

  const loseICM = calculateICM(loseStacks, prizes);
  const heroLoseEquity = loseICM.equities[heroIndex];

  return heroWinProb * heroWinEquity + (1 - heroWinProb) * heroLoseEquity;
}

/**
 * Convenience function: calculate ICM fold EV independently.
 */
export function icmFoldEV(
  stacks: number[],
  prizes: number[],
  heroIndex: number
): number {
  const result = calculateICM(stacks, prizes);
  return result.equities[heroIndex];
}

// ---------------------------------------------------------------------------
// Push/Fold Charts (Nash Equilibrium Approximation)
// ---------------------------------------------------------------------------

/**
 * Nash-equilibrium-approximated push/fold ranges for short-stacked tournament play.
 *
 * Based on standard push/fold charts. Returns a list of hands that should be
 * pushed (all-in) given stack size in big blinds, position, and number of players.
 *
 * @param effectiveBBs - Effective stack in big blinds
 * @param position - Position at the table
 * @param playersLeft - Number of players left to act (including blinds)
 * @returns PushFoldRange with recommended push hands
 */
export function getPushFoldRange(
  effectiveBBs: number,
  position: string,
  playersLeft: number
): PushFoldRange {
  // Base ranges by stack depth — wider with fewer BBs
  let pushThreshold: number;
  let pushHands: string[];

  if (effectiveBBs <= 3) {
    // Desperate: push very wide
    pushThreshold = 5;
    pushHands = getHandsByStrength(0, 80);
  } else if (effectiveBBs <= 5) {
    pushThreshold = 15;
    pushHands = getHandsByStrength(0, 65);
  } else if (effectiveBBs <= 8) {
    pushThreshold = 25;
    pushHands = getHandsByStrength(0, 50);
  } else if (effectiveBBs <= 10) {
    pushThreshold = 35;
    pushHands = getHandsByStrength(0, 40);
  } else if (effectiveBBs <= 13) {
    pushThreshold = 45;
    pushHands = getHandsByStrength(0, 30);
  } else if (effectiveBBs <= 15) {
    pushThreshold = 55;
    pushHands = getHandsByStrength(0, 22);
  } else if (effectiveBBs <= 20) {
    pushThreshold = 65;
    pushHands = getHandsByStrength(0, 15);
  } else {
    // Above 20 BB, pushing is less common — only premium hands
    pushThreshold = 80;
    pushHands = getHandsByStrength(0, 8);
  }

  // Adjust for position: later positions can push wider
  const positionMultiplier = getPositionWidthMultiplier(position, playersLeft);
  const adjustedCount = Math.round(pushHands.length * positionMultiplier);
  pushHands = pushHands.slice(0, Math.max(1, adjustedCount));

  // Adjust threshold
  pushThreshold = Math.min(100, Math.round(pushThreshold / positionMultiplier));

  return {
    pushThreshold,
    pushHands,
    effectiveBBs,
  };
}

function getPositionWidthMultiplier(position: string, playersLeft: number): number {
  // Fewer players to act = wider push range
  const baseMult: Record<string, number> = {
    'UTG': 0.5,
    'UTG+1': 0.55,
    'UTG+2': 0.6,
    'MP': 0.7,
    'HJ': 0.8,
    'CO': 1.0,
    'BTN': 1.4,
    'SB': 1.6,
    'BB': 1.0, // BB doesn't push, they call
  };

  const mult = baseMult[position] ?? 0.8;

  // Further adjust based on players left to act
  if (playersLeft <= 2) return mult * 1.3;
  if (playersLeft <= 3) return mult * 1.1;
  return mult;
}

/**
 * Get a list of hand notations ordered by approximate preflop strength.
 * Returns hands from the top `maxPercentile` percent.
 */
function getHandsByStrength(minPercentile: number, maxPercentile: number): string[] {
  // Full hand ranking list (169 unique starting hands), ordered by strength
  // This is a simplified but reasonable approximation
  const allHands: string[] = [
    // Tier 1: Premium
    'AA', 'KK', 'QQ', 'JJ', 'AKs',
    // Tier 2: Strong
    'AKo', 'AQs', 'TT', 'AQo', 'AJs', '99', 'ATs',
    // Tier 3: Good
    'AJo', 'KQs', '88', 'ATo', 'KJs', 'KQo', 'KTs',
    '77', 'A9s', 'QJs', 'A8s', 'KJo', 'QTs', 'A7s',
    // Tier 4: Playable
    '66', 'KTo', 'A9o', 'A6s', 'QJo', 'A5s', 'JTs',
    '55', 'A4s', 'A8o', 'A3s', 'K9s', 'QTo', 'A2s',
    'A7o', 'K8s', 'JTo', 'Q9s', 'J9s', 'A6o', 'K9o',
    '44', 'T9s', 'A5o', 'K7s', 'Q8s', 'J8s', 'K6s',
    // Tier 5: Marginal
    '33', 'A4o', 'T8s', 'K5s', 'Q9o', 'J9o', 'Q7s',
    '98s', 'K8o', 'A3o', 'T9o', 'K4s', 'J7s', 'Q6s',
    '22', 'K7o', 'A2o', '87s', 'K3s', 'T7s', 'Q8o',
    'J8o', '97s', 'K6o', 'Q5s', 'K2s', '76s', 'T8o',
    // Tier 6: Speculative
    'J6s', 'K5o', '98o', 'Q4s', '86s', 'Q7o', '65s',
    'J5s', 'K4o', 'Q3s', '96s', 'T6s', '87o', 'J7o',
    'Q2s', '75s', 'T7o', 'K3o', '54s', 'Q6o', '97o',
    'J4s', '85s', '64s', 'J6o', 'K2o', '76o', 'J3s',
    // Tier 7: Weak
    'Q5o', '95s', 'T5s', '53s', '86o', 'J2s', 'Q4o',
    '74s', '65o', 'T4s', '43s', '96o', 'J5o', '84s',
    'Q3o', 'T3s', '75o', '54o', '63s', 'T6o', 'Q2o',
    '73s', '85o', 'T2s', '52s', 'J4o', '64o', '42s',
    // Tier 8: Junk
    '93s', '95o', '92s', '83s', 'J3o', '53o', '74o',
    'T5o', '82s', '62s', 'J2o', '43o', '32s', '84o',
    'T4o', '72s', '63o', 'T3o', '94o', '93o', '52o',
    '73o', 'T2o', '42o', '92o', '83o', '62o', '82o',
    '32o', '72o',
  ];

  const totalHands = allHands.length;
  const startIdx = Math.floor((minPercentile / 100) * totalHands);
  const endIdx = Math.floor((maxPercentile / 100) * totalHands);

  return allHands.slice(startIdx, endIdx);
}
