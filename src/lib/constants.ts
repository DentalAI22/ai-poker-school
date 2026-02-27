// App-wide constants
export const APP_NAME = 'AI Poker School';
export const APP_TAGLINE = 'AI is beating the best. Why not train with the best?';
export const APP_DESCRIPTION = "The world's most advanced AI poker coach. Master GTO strategy across 25+ game types.";
export const APP_URL = 'https://aipokerschool.com';

// Coach
export const COACH_NAME = 'Andrew';
export const COACH_VOICE_ID = 'DXFkLCBUTmvXpp2QwZjA';

// Free tier limits
export const FREE_DAILY_MESSAGES = 3;
export const FREE_DAILY_HANDS = 5;

// Pro tier pricing
export const PRO_MONTHLY_PRICE = 9.99;
export const PRO_YEARLY_PRICE = 99;
export const PRO_YEARLY_SAVINGS = 20;

// Positions
export const POSITIONS_9MAX = ['UTG', 'UTG+1', 'UTG+2', 'MP', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const;
export const POSITIONS_6MAX = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const;
export const POSITIONS_HEADSUP = ['BTN', 'BB'] as const;

// Hand rankings (highest to lowest)
export const HAND_RANKINGS = [
  'Royal Flush',
  'Straight Flush',
  'Four of a Kind',
  'Full House',
  'Flush',
  'Straight',
  'Three of a Kind',
  'Two Pair',
  'One Pair',
  'High Card',
] as const;

// Suits
export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
export const SUIT_SYMBOLS: Record<string, string> = {
  hearts: '\u2665',
  diamonds: '\u2666',
  clubs: '\u2663',
  spades: '\u2660',
};
export const SUIT_COLORS: Record<string, string> = {
  hearts: '#ef4444',
  diamonds: '#3b82f6',
  clubs: '#22c55e',
  spades: '#1e1e1e',
};

// Ranks
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] as const;

// Design tokens
export const COLORS = {
  felt: '#0d5c2e',
  feltDark: '#0a4a24',
  feltLight: '#0f6e36',
  gold: '#d4a843',
  goldLight: '#e8c36a',
  goldDark: '#b8922f',
  darkBg: '#0a0a0a',
  cardBg: '#111111',
  cardBorder: '#1a1a1a',
  textPrimary: '#ffffff',
  textSecondary: '#a0a0a0',
  textMuted: '#666666',
  accent: '#d4a843',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

// Bankroll management
export const BANKROLL_RULES = {
  cash: { minBuyins: 20, recommendedBuyins: 30 },
  tournament: { minBuyins: 50, recommendedBuyins: 100 },
  sitAndGo: { minBuyins: 30, recommendedBuyins: 50 },
};

// Skill levels
export const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced', 'pro'] as const;

// Player types
export const PLAYER_TYPES = ['TAG', 'LAG', 'Nit', 'Maniac', 'Calling Station', 'Rock', 'Shark'] as const;

export const DISCLAIMER = 'AI Poker School is for educational simulation purposes only. No real money wagering.';
