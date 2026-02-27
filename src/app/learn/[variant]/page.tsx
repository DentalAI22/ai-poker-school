'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Target,
  AlertTriangle,
  X as XIcon,
  Spade,
  MessageCircle,
  ChevronRight,
  Trophy,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface VariantDetail {
  slug: string;
  name: string;
  category: 'holdem' | 'stud' | 'draw' | 'mixed' | 'specialty';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  rules: string;
  handRankings: string[];
  strategyTips: string[];
  commonMistakes: string[];
}

/* ─────────────────────────────────────────────────────────────
   FALLBACK DATA
   ───────────────────────────────────────────────────────────── */

const FALLBACK_VARIANTS: Record<string, VariantDetail> = {
  'no-limit-holdem': {
    slug: 'no-limit-holdem',
    name: "No-Limit Hold'em",
    category: 'holdem',
    difficulty: 'Beginner',
    description: 'The king of poker games. Two hole cards, five community cards, and unlimited betting.',
    rules: "Each player receives two private cards (\"hole cards\"). Five community cards are dealt face up on the \"board\" in three stages: the Flop (3 cards), the Turn (1 card), and the River (1 card). Players make the best five-card hand using any combination of their two hole cards and the five community cards. There are four rounds of betting: pre-flop, flop, turn, and river. In No-Limit, a player may bet any amount of their chips at any time. The player with the best hand (or the last player remaining after all others have folded) wins the pot.",
    handRankings: [
      'Royal Flush — A, K, Q, J, 10 of the same suit',
      'Straight Flush — Five consecutive cards of the same suit',
      'Four of a Kind — Four cards of the same rank',
      'Full House — Three of a kind plus a pair',
      'Flush — Five cards of the same suit',
      'Straight — Five consecutive cards of any suit',
      'Three of a Kind — Three cards of the same rank',
      'Two Pair — Two different pairs',
      'One Pair — Two cards of the same rank',
      'High Card — Highest card when no other hand is made',
    ],
    strategyTips: [
      'Position is king. Play more hands from late position (button, cutoff) and fewer from early position.',
      'Be aggressive with your strong hands. Betting and raising builds the pot and puts pressure on opponents.',
      'Practice proper bankroll management. Have at least 20-30 buy-ins for your stake level.',
      'Learn to read the board texture. Wet boards (many draws) play differently than dry boards.',
      'Study your opponents. Identify tight vs loose, passive vs aggressive tendencies.',
      'Don\'t chase draws without proper pot odds or implied odds.',
      'Master the art of bet sizing. Your bets should tell a consistent story.',
      'Learn to fold. The best players fold more often than most people think.',
    ],
    commonMistakes: [
      'Playing too many hands pre-flop, especially from early position.',
      'Calling too much instead of raising or folding ("calling station" syndrome).',
      'Ignoring position — playing the same hands regardless of where you sit.',
      'Failing to adjust bet sizes based on board texture and opponent tendencies.',
      'Tilting after bad beats and making emotional rather than logical decisions.',
      'Overvaluing top pair on coordinated boards with heavy action.',
    ],
  },
  'pot-limit-omaha': {
    slug: 'pot-limit-omaha',
    name: 'Pot-Limit Omaha',
    category: 'holdem',
    difficulty: 'Intermediate',
    description: 'Four hole cards, must use exactly two. Action-packed with bigger hands and wilder swings.',
    rules: "Each player is dealt four hole cards. Players MUST use exactly two of their hole cards and exactly three community cards to make their best five-card hand. The community cards are dealt exactly as in Hold'em (Flop, Turn, River). Betting is pot-limit: the maximum bet is the size of the current pot. This constraint makes the game more strategic as you cannot simply shove all-in at any time.",
    handRankings: [
      'Royal Flush — A, K, Q, J, 10 of the same suit (must use 2 hole cards)',
      'Straight Flush — Five consecutive cards of the same suit',
      'Four of a Kind — Four cards of the same rank',
      'Full House — Three of a kind plus a pair',
      'Flush — Five cards of the same suit (need two of the suit in your hand)',
      'Straight — Five consecutive cards of any suit',
      'Three of a Kind — Three cards of the same rank',
      'Two Pair — Two different pairs',
      'One Pair — Two cards of the same rank',
      'High Card — Highest card when no other hand is made',
    ],
    strategyTips: [
      'Hand selection is critical. Look for four cards that work together (double-suited, connected, paired).',
      'The nuts change frequently. Always know where your hand stands relative to the best possible hand.',
      'Avoid bare aces — having a single ace-high flush draw without other backup is dangerous.',
      'Position matters even more than in Hold\'em due to the pot-limit betting structure.',
      'Big pocket pairs without support (like bare KK) are not as strong as in Hold\'em.',
      'Wraps (big straight draws) are extremely powerful in Omaha.',
    ],
    commonMistakes: [
      'Playing hands that only have two good cards (treat all four cards as one unit).',
      'Overvaluing small flushes — the nut flush is out there more often than you think.',
      'Not adjusting for the "must use two" rule. You need two of the suit in your hand for a flush.',
      'Committing too many chips with non-nut draws on wet boards.',
      'Playing too many hands. Despite having four cards, hand selection is more important than Hold\'em.',
      'Getting attached to overpairs when the board is highly connected.',
    ],
  },
  'short-deck': {
    slug: 'short-deck',
    name: 'Short Deck (6+)',
    category: 'holdem',
    difficulty: 'Intermediate',
    description: "Hold'em with cards 2-5 removed. Flush beats a full house in this high-action variant.",
    rules: "Short Deck (also called 6+ Hold'em) plays like No-Limit Hold'em, but with all 2s, 3s, 4s, and 5s removed from the deck, leaving a 36-card deck. Each player gets two hole cards and five community cards are dealt. The key difference: hand rankings change because probabilities change. A flush beats a full house, and three of a kind beats a straight. Aces can be used as a 5 for straights (A-6-7-8-9). Many games use an ante-only format instead of blinds.",
    handRankings: [
      'Royal Flush — A, K, Q, J, 10 of the same suit',
      'Straight Flush — Five consecutive cards of the same suit',
      'Four of a Kind — Four cards of the same rank',
      'Flush — Five cards of the same suit (rarer with fewer cards)',
      'Full House — Three of a kind plus a pair',
      'Three of a Kind — Three cards of the same rank (easier to make)',
      'Straight — Five consecutive cards of any suit (easier with fewer gaps)',
      'Two Pair — Two different pairs',
      'One Pair — Two cards of the same rank',
      'High Card — Highest card when no other hand is made',
    ],
    strategyTips: [
      'Pocket pairs go up dramatically in value since there are fewer cards to make sets.',
      'Connected hands like JT, QJ are very strong as straights are easier to make.',
      'Flush draws are harder to complete (fewer suited cards), but flushes rank higher.',
      'Adjust your equity calculations — hand equities run much closer in Short Deck.',
      'Aggression is rewarded. The ante structure and high-action nature favor assertive play.',
      'Top pair is less reliable since the deck is compressed and opponents hit more often.',
    ],
    commonMistakes: [
      'Using standard Hold\'em hand rankings instead of Short Deck rankings.',
      'Overvaluing flush draws — they complete less often despite ranking higher.',
      'Not adjusting for the higher set-mining frequency with pocket pairs.',
      'Playing too passively in an ante-driven game format.',
      'Underestimating straight draws — they come in much more frequently.',
      'Treating AK the same as in Hold\'em. It\'s still strong but less dominant.',
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   DATA LOADING
   ───────────────────────────────────────────────────────────── */

function loadVariant(slug: string): VariantDetail | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const imported = require('@/data/poker-variants');
    if (typeof imported.getVariant === 'function') {
      const result = imported.getVariant(slug);
      if (result) return result;
    }
  } catch {
    // fall through
  }
  return FALLBACK_VARIANTS[slug] || null;
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, string> = {
  holdem: 'bg-green-500/15 text-green-400 border-green-500/20',
  stud: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  draw: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  mixed: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  specialty: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'bg-felt/15 text-felt-light border-felt/20',
  Intermediate: 'bg-gold/15 text-gold border-gold/20',
  Advanced: 'bg-red-500/15 text-red-400 border-red-500/20',
};

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function VariantLessonPage() {
  const params = useParams();
  const slug = typeof params.variant === 'string' ? params.variant : '';
  const variant = loadVariant(slug);

  /* ── Not Found ── */
  if (!variant) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle className="w-16 h-16 text-gold/40 mx-auto mb-6" />
          <h1 className="text-3xl font-bold font-serif mb-4">Variant Not Found</h1>
          <p className="text-white/50 mb-8">
            We couldn&apos;t find a poker variant matching &ldquo;{slug}&rdquo;.
          </p>
          <Link
            href="/learn"
            className="btn-gold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Variants
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* ── Back link ── */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Variants
        </Link>
      </motion.div>

      {/* ── Hero Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              CATEGORY_COLORS[variant.category] || CATEGORY_COLORS.holdem
            }`}
          >
            {variant.category.charAt(0).toUpperCase() + variant.category.slice(1)}
          </span>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              DIFFICULTY_COLORS[variant.difficulty] || DIFFICULTY_COLORS.Beginner
            }`}
          >
            {variant.difficulty}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
          <span className="text-gold-gradient">{variant.name}</span>
        </h1>
        <p className="text-lg text-white/50 leading-relaxed max-w-3xl">
          {variant.description}
        </p>
      </motion.div>

      {/* ── Rules Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif">Rules</h2>
        </div>
        <div className="card-gold-border p-6 sm:p-8">
          <p className="text-white/70 leading-relaxed text-[15px]">{variant.rules}</p>
        </div>
      </motion.section>

      {/* ── Hand Rankings Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif">Hand Rankings</h2>
        </div>
        <div className="card-gold-border p-6 sm:p-8">
          <ol className="space-y-3">
            {variant.handRankings.map((ranking, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center text-xs font-bold text-gold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-white/70 text-sm leading-relaxed">{ranking}</span>
              </li>
            ))}
          </ol>
        </div>
      </motion.section>

      {/* ── Strategy Tips Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-felt/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-felt-light" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif">Strategy Tips</h2>
        </div>
        <div className="card-gold-border p-6 sm:p-8">
          <ol className="space-y-4">
            {variant.strategyTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-felt/15 flex items-center justify-center text-sm font-bold text-felt-light shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-white/70 text-sm leading-relaxed pt-1">{tip}</p>
              </li>
            ))}
          </ol>
        </div>
      </motion.section>

      {/* ── Common Mistakes Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif">Common Mistakes</h2>
        </div>
        <div className="card-gold-border p-6 sm:p-8">
          <ul className="space-y-3">
            {variant.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-3">
                <XIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm leading-relaxed">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── CTA Buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          href="/play"
          className="btn-gold text-base px-8 py-4 rounded-xl inline-flex items-center gap-2"
        >
          <Spade className="w-5 h-5" />
          Practice This Game
          <ChevronRight className="w-4 h-4" />
        </Link>
        <Link
          href="/coach"
          className="btn-felt text-base px-8 py-4 rounded-xl inline-flex items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Ask Andrew About This
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
