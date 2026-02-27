// Bankroll Management Calculator — stakes, risk of ruin, Kelly, session stats

import { BANKROLL_RULES } from './constants';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StakeRecommendation {
  /** Game type used for the recommendation */
  gameType: 'cash' | 'tournament' | 'sitAndGo';
  /** Maximum recommended buy-in at minimum safety */
  maxBuyinMin: number;
  /** Maximum recommended buy-in at conservative safety */
  maxBuyinRecommended: number;
  /** Formatted stake string (e.g., "$1/$2 NL Hold'em") */
  stakeLabel: string;
  /** Number of buy-ins currently available at recommended stake */
  buyinsAvailable: number;
}

export interface RiskOfRuinResult {
  /** Probability of going bust (0-1) */
  riskOfRuin: number;
  /** Probability of going bust as a percentage string */
  riskPercent: string;
  /** Number of buy-ins in the bankroll */
  buyins: number;
  /** Is the bankroll considered safe? */
  isSafe: boolean;
}

export interface KellyResult {
  /** Optimal fraction of bankroll to risk (0-1) */
  kellyFraction: number;
  /** Half-Kelly (commonly recommended) fraction */
  halfKelly: number;
  /** Quarter-Kelly (conservative) fraction */
  quarterKelly: number;
  /** Optimal bet/buy-in size */
  optimalBetSize: number;
  /** Half-Kelly bet/buy-in size */
  halfKellyBetSize: number;
  /** Is this a positive EV opportunity? */
  isPositiveEV: boolean;
}

export interface SessionStats {
  /** Total hands played */
  totalHands: number;
  /** Total hours played */
  totalHours: number;
  /** Net profit/loss */
  netResult: number;
  /** Win rate in bb/100 */
  bbPer100: number;
  /** Win rate in $/hr */
  dollarsPerHour: number;
  /** Standard deviation per 100 hands (in bb) */
  stdDevPer100: number;
  /** Required sample size for statistical significance */
  requiredSampleSize: number;
  /** Confidence interval (95%) for true win rate */
  confidenceInterval: { low: number; high: number };
}

// ---------------------------------------------------------------------------
// Recommended Stakes
// ---------------------------------------------------------------------------

/**
 * Calculate recommended stakes given a bankroll amount and game type.
 *
 * Uses standard bankroll management guidelines:
 * - Cash games: 20-30 buy-ins
 * - Tournaments: 50-100 buy-ins
 * - Sit & Go: 30-50 buy-ins
 *
 * @param bankroll - Total bankroll in dollars
 * @param gameType - Type of game
 * @returns Stake recommendations
 */
export function recommendedStakes(
  bankroll: number,
  gameType: 'cash' | 'tournament' | 'sitAndGo' = 'cash'
): StakeRecommendation {
  if (bankroll <= 0) {
    return {
      gameType,
      maxBuyinMin: 0,
      maxBuyinRecommended: 0,
      stakeLabel: 'Insufficient bankroll',
      buyinsAvailable: 0,
    };
  }

  const rules = BANKROLL_RULES[gameType];
  const maxBuyinMin = bankroll / rules.minBuyins;
  const maxBuyinRecommended = bankroll / rules.recommendedBuyins;

  let stakeLabel: string;
  let buyinsAvailable: number;

  if (gameType === 'cash') {
    // Cash games: buy-in = 100bb, so max stake = buyin / 100
    const maxBBRecommended = maxBuyinRecommended;
    const stake = findCashStake(maxBBRecommended);
    stakeLabel = stake.label;
    buyinsAvailable = Math.floor(bankroll / stake.buyin);
  } else if (gameType === 'tournament') {
    const stake = findTournamentStake(maxBuyinRecommended);
    stakeLabel = stake.label;
    buyinsAvailable = Math.floor(bankroll / stake.buyin);
  } else {
    const stake = findSngStake(maxBuyinRecommended);
    stakeLabel = stake.label;
    buyinsAvailable = Math.floor(bankroll / stake.buyin);
  }

  return {
    gameType,
    maxBuyinMin,
    maxBuyinRecommended,
    stakeLabel,
    buyinsAvailable,
  };
}

interface StakeLevel {
  label: string;
  buyin: number;
}

function findCashStake(maxBuyin: number): StakeLevel {
  const stakes: StakeLevel[] = [
    { label: '$0.01/$0.02 NL (2NL)', buyin: 2 },
    { label: '$0.02/$0.05 NL (5NL)', buyin: 5 },
    { label: '$0.05/$0.10 NL (10NL)', buyin: 10 },
    { label: '$0.10/$0.25 NL (25NL)', buyin: 25 },
    { label: '$0.25/$0.50 NL (50NL)', buyin: 50 },
    { label: '$0.50/$1 NL (100NL)', buyin: 100 },
    { label: '$1/$2 NL (200NL)', buyin: 200 },
    { label: '$2/$5 NL (500NL)', buyin: 500 },
    { label: '$5/$10 NL (1000NL)', buyin: 1000 },
    { label: '$10/$25 NL (2500NL)', buyin: 2500 },
    { label: '$25/$50 NL (5000NL)', buyin: 5000 },
    { label: '$50/$100 NL (10000NL)', buyin: 10000 },
  ];

  // Find the highest stake the bankroll can support
  let best = stakes[0];
  for (const stake of stakes) {
    if (stake.buyin <= maxBuyin) {
      best = stake;
    } else {
      break;
    }
  }
  return best;
}

function findTournamentStake(maxBuyin: number): StakeLevel {
  const stakes: StakeLevel[] = [
    { label: '$1 MTT', buyin: 1 },
    { label: '$2 MTT', buyin: 2 },
    { label: '$5 MTT', buyin: 5 },
    { label: '$10 MTT', buyin: 10 },
    { label: '$20 MTT', buyin: 20 },
    { label: '$30 MTT', buyin: 30 },
    { label: '$50 MTT', buyin: 50 },
    { label: '$100 MTT', buyin: 100 },
    { label: '$200 MTT', buyin: 200 },
    { label: '$500 MTT', buyin: 500 },
    { label: '$1000 MTT', buyin: 1000 },
  ];

  let best = stakes[0];
  for (const stake of stakes) {
    if (stake.buyin <= maxBuyin) {
      best = stake;
    } else {
      break;
    }
  }
  return best;
}

function findSngStake(maxBuyin: number): StakeLevel {
  const stakes: StakeLevel[] = [
    { label: '$1 SNG', buyin: 1 },
    { label: '$3 SNG', buyin: 3 },
    { label: '$5 SNG', buyin: 5 },
    { label: '$10 SNG', buyin: 10 },
    { label: '$20 SNG', buyin: 20 },
    { label: '$30 SNG', buyin: 30 },
    { label: '$50 SNG', buyin: 50 },
    { label: '$100 SNG', buyin: 100 },
    { label: '$200 SNG', buyin: 200 },
    { label: '$500 SNG', buyin: 500 },
  ];

  let best = stakes[0];
  for (const stake of stakes) {
    if (stake.buyin <= maxBuyin) {
      best = stake;
    } else {
      break;
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Risk of Ruin
// ---------------------------------------------------------------------------

/**
 * Calculate the risk of ruin (probability of going broke) given a bankroll,
 * win rate, and standard deviation.
 *
 * Uses the formula: RoR = e^(-2 * winRate * bankrollInBB / (stdDev^2))
 *
 * @param bankroll - Total bankroll in dollars
 * @param buyinSize - Size of one buy-in in dollars
 * @param winRateBBper100 - Win rate in bb per 100 hands
 * @param stdDevBBper100 - Standard deviation in bb per 100 hands (typically 60-100 for NLHE)
 * @returns Risk of ruin analysis
 */
export function riskOfRuin(
  bankroll: number,
  buyinSize: number,
  winRateBBper100: number = 5,
  stdDevBBper100: number = 75
): RiskOfRuinResult {
  if (bankroll <= 0 || buyinSize <= 0) {
    return {
      riskOfRuin: 1,
      riskPercent: '100%',
      buyins: 0,
      isSafe: false,
    };
  }

  const buyins = bankroll / buyinSize;

  // Convert to per-hand rates
  const winRatePerHand = winRateBBper100 / 100;
  const stdDevPerHand = stdDevBBper100 / 10; // per-hand stddev = per-100 / sqrt(100)

  // Bankroll in BB (buy-in = 100bb)
  const bankrollBB = buyins * 100;

  if (winRatePerHand <= 0) {
    // Negative or zero win rate: guaranteed ruin eventually
    return {
      riskOfRuin: 1,
      riskPercent: '100%',
      buyins,
      isSafe: false,
    };
  }

  // RoR = e^(-2 * WR * BR / sigma^2)
  const exponent = (-2 * winRatePerHand * bankrollBB) / (stdDevPerHand * stdDevPerHand);
  const ror = Math.exp(exponent);

  // Clamp to [0, 1]
  const clampedRor = Math.min(1, Math.max(0, ror));

  return {
    riskOfRuin: clampedRor,
    riskPercent: `${(clampedRor * 100).toFixed(2)}%`,
    buyins,
    isSafe: clampedRor < 0.05, // Less than 5% risk of ruin is considered safe
  };
}

// ---------------------------------------------------------------------------
// Kelly Criterion
// ---------------------------------------------------------------------------

/**
 * Calculate the Kelly criterion fraction for optimal bankroll growth.
 *
 * Kelly fraction = (bp - q) / b
 * Where:
 *   b = odds received (net payout per unit wagered)
 *   p = probability of winning
 *   q = probability of losing (1 - p)
 *
 * For poker, this is adapted to estimate optimal buy-in sizing.
 *
 * @param bankroll - Total bankroll
 * @param winProbability - Probability of winning the session (0-1)
 * @param avgWinAmount - Average amount won when winning
 * @param avgLossAmount - Average amount lost when losing (positive number)
 * @returns Kelly criterion analysis
 */
export function kellyFraction(
  bankroll: number,
  winProbability: number,
  avgWinAmount: number,
  avgLossAmount: number
): KellyResult {
  if (bankroll <= 0 || avgLossAmount <= 0) {
    return {
      kellyFraction: 0,
      halfKelly: 0,
      quarterKelly: 0,
      optimalBetSize: 0,
      halfKellyBetSize: 0,
      isPositiveEV: false,
    };
  }

  const p = Math.min(1, Math.max(0, winProbability));
  const q = 1 - p;
  const b = avgWinAmount / avgLossAmount; // odds

  // Kelly: f* = (bp - q) / b
  const kelly = (b * p - q) / b;

  // Clamp: if negative, don't bet
  const clampedKelly = Math.max(0, kelly);

  return {
    kellyFraction: clampedKelly,
    halfKelly: clampedKelly / 2,
    quarterKelly: clampedKelly / 4,
    optimalBetSize: clampedKelly * bankroll,
    halfKellyBetSize: (clampedKelly / 2) * bankroll,
    isPositiveEV: kelly > 0,
  };
}

// ---------------------------------------------------------------------------
// Session Statistics
// ---------------------------------------------------------------------------

/**
 * Calculate session statistics from a set of results.
 *
 * @param results - Array of individual hand results (in bb)
 * @param bbSize - Size of one big blind in dollars
 * @param handsPerHour - Estimated hands per hour (default 75 for online, 25 for live)
 * @returns Comprehensive session statistics
 */
export function sessionStats(
  results: number[],
  bbSize: number,
  handsPerHour: number = 75
): SessionStats {
  const totalHands = results.length;

  if (totalHands === 0) {
    return {
      totalHands: 0,
      totalHours: 0,
      netResult: 0,
      bbPer100: 0,
      dollarsPerHour: 0,
      stdDevPer100: 0,
      requiredSampleSize: 0,
      confidenceInterval: { low: 0, high: 0 },
    };
  }

  const totalHours = totalHands / handsPerHour;
  const sum = results.reduce((a, b) => a + b, 0);
  const netResult = sum * bbSize;

  // Win rate in bb/100
  const bbPer100 = (sum / totalHands) * 100;

  // Dollars per hour
  const dollarsPerHour = netResult / totalHours;

  // Standard deviation per hand (in bb)
  const mean = sum / totalHands;
  const variance = results.reduce((acc, r) => acc + (r - mean) ** 2, 0) / totalHands;
  const stdDevPerHand = Math.sqrt(variance);
  const stdDevPer100 = stdDevPerHand * Math.sqrt(100);

  // Required sample size for 95% confidence that win rate > 0
  // Using z = 1.96 for 95% CI
  // n = (z * sigma / margin)^2 ... simplified: need ~(sigma/winrate)^2 * z^2 * 100
  const z = 1.96;
  const winRatePerHand = sum / totalHands;
  let requiredSampleSize = 0;
  if (winRatePerHand > 0 && stdDevPerHand > 0) {
    requiredSampleSize = Math.ceil(((z * stdDevPerHand) / winRatePerHand) ** 2);
  }

  // 95% confidence interval for true win rate (bb/100)
  const marginOfError = stdDevPer100 > 0
    ? z * (stdDevPer100 / Math.sqrt(totalHands / 100))
    : 0;

  const confidenceInterval = {
    low: bbPer100 - marginOfError,
    high: bbPer100 + marginOfError,
  };

  return {
    totalHands,
    totalHours,
    netResult,
    bbPer100,
    dollarsPerHour,
    stdDevPer100,
    requiredSampleSize,
    confidenceInterval,
  };
}
