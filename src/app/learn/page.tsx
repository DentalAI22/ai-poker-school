'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  ArrowRight,
  Search,
  BookOpen,
  Filter,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface PokerVariant {
  slug: string;
  name: string;
  category: 'holdem' | 'stud' | 'draw' | 'mixed' | 'specialty';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

/* ─────────────────────────────────────────────────────────────
   FALLBACK DATA
   ───────────────────────────────────────────────────────────── */

const FALLBACK_VARIANTS: PokerVariant[] = [
  {
    slug: 'no-limit-holdem',
    name: "No-Limit Hold'em",
    category: 'holdem',
    difficulty: 'Beginner',
    description: 'The king of poker games. Two hole cards, five community cards, and unlimited betting.',
  },
  {
    slug: 'pot-limit-omaha',
    name: 'Pot-Limit Omaha',
    category: 'holdem',
    difficulty: 'Intermediate',
    description: 'Four hole cards, must use exactly two. Action-packed with bigger hands and wilder swings.',
  },
  {
    slug: 'short-deck',
    name: 'Short Deck (6+)',
    category: 'holdem',
    difficulty: 'Intermediate',
    description: "Hold'em with cards 2-5 removed. Flush beats a full house in this high-action variant.",
  },
  {
    slug: 'seven-card-stud',
    name: 'Seven-Card Stud',
    category: 'stud',
    difficulty: 'Intermediate',
    description: 'The game before Hold\'em. Seven cards dealt over five rounds with no community cards.',
  },
  {
    slug: 'razz',
    name: 'Razz',
    category: 'stud',
    difficulty: 'Intermediate',
    description: 'Seven-card stud played for the lowest hand. Aces are low, straights and flushes don\'t count.',
  },
  {
    slug: 'omaha-hi-lo',
    name: 'Omaha Hi-Lo',
    category: 'holdem',
    difficulty: 'Advanced',
    description: 'Split-pot Omaha where the best high and best low hand split the pot. Complex and strategic.',
  },
  {
    slug: '2-7-triple-draw',
    name: '2-7 Triple Draw',
    category: 'draw',
    difficulty: 'Advanced',
    description: 'Lowball draw game with three draws. The worst traditional hand (2-7) is the best hand here.',
  },
  {
    slug: 'five-card-draw',
    name: 'Five-Card Draw',
    category: 'draw',
    difficulty: 'Beginner',
    description: 'The classic poker game. Five cards dealt, one draw, and a showdown. Simple and pure.',
  },
  {
    slug: 'horse',
    name: 'H.O.R.S.E.',
    category: 'mixed',
    difficulty: 'Advanced',
    description: "Five games in rotation: Hold'em, Omaha Hi-Lo, Razz, Stud, Stud Eight-or-Better.",
  },
  {
    slug: 'badugi',
    name: 'Badugi',
    category: 'specialty',
    difficulty: 'Advanced',
    description: 'Four-card lowball draw game. The best hand is four different suits with the lowest cards.',
  },
  {
    slug: 'limit-holdem',
    name: "Limit Hold'em",
    category: 'holdem',
    difficulty: 'Beginner',
    description: "Fixed betting limits bring a mathematical precision to Hold'em. A game of small edges.",
  },
  {
    slug: 'stud-hi-lo',
    name: 'Stud Hi-Lo (Eight or Better)',
    category: 'stud',
    difficulty: 'Advanced',
    description: 'Seven-card stud split pot game. High hand and low hand (8 or better qualifier) split.',
  },
  {
    slug: 'chinese-poker',
    name: 'Open-Face Chinese Poker',
    category: 'specialty',
    difficulty: 'Intermediate',
    description: 'Set 13 cards across three poker hands. Royalties for big hands and fantasyland await.',
  },
  {
    slug: 'pineapple',
    name: 'Pineapple',
    category: 'holdem',
    difficulty: 'Beginner',
    description: "Three hole cards, discard one before the flop. A fun twist on traditional Hold'em.",
  },
  {
    slug: 'five-card-omaha',
    name: 'Five-Card Omaha (PLO5)',
    category: 'holdem',
    difficulty: 'Intermediate',
    description: 'Five hole cards with even more possible combinations. Bigger hands and bigger pots.',
  },
  {
    slug: 'dealer-choice',
    name: "Dealer's Choice",
    category: 'mixed',
    difficulty: 'Advanced',
    description: 'The dealer picks the game each hand. Requires mastery of multiple variants to excel.',
  },
  {
    slug: 'eight-game-mix',
    name: '8-Game Mix',
    category: 'mixed',
    difficulty: 'Advanced',
    description: "Eight variants in rotation including Triple Draw and No-Limit Hold'em. The ultimate test.",
  },
  {
    slug: 'courchevel',
    name: 'Courchevel',
    category: 'specialty',
    difficulty: 'Advanced',
    description: 'Five-card Omaha where the first community card is dealt before the first betting round.',
  },
  {
    slug: 'single-draw-2-7',
    name: '2-7 Single Draw',
    category: 'draw',
    difficulty: 'Intermediate',
    description: 'No-limit lowball with one draw. A game of deception where standing pat can mean anything.',
  },
  {
    slug: 'triple-stud',
    name: 'Triple Stud',
    category: 'stud',
    difficulty: 'Intermediate',
    description: 'Alternating rounds of Razz, Stud, and Stud Hi-Lo. Tests your adaptability across formats.',
  },
];

/* ─────────────────────────────────────────────────────────────
   DATA LOADING
   ───────────────────────────────────────────────────────────── */

let variantData: PokerVariant[] = FALLBACK_VARIANTS;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const imported = require('@/data/poker-variants');
  if (imported.pokerVariants && Array.isArray(imported.pokerVariants)) {
    variantData = imported.pokerVariants;
  }
} catch {
  // Use fallback
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────── */

type Category = 'all' | 'holdem' | 'stud' | 'draw' | 'mixed' | 'specialty';
type Difficulty = 'all' | 'Beginner' | 'Intermediate' | 'Advanced';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'holdem', label: "Hold'em" },
  { id: 'stud', label: 'Stud' },
  { id: 'draw', label: 'Draw' },
  { id: 'mixed', label: 'Mixed' },
  { id: 'specialty', label: 'Specialty' },
];

const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Beginner', label: 'Beginner' },
  { id: 'Intermediate', label: 'Intermediate' },
  { id: 'Advanced', label: 'Advanced' },
];

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

export default function LearnPage() {
  const [category, setCategory] = useState<Category>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return variantData.filter((v) => {
      if (category !== 'all' && v.category !== category) return false;
      if (difficulty !== 'all' && v.difficulty !== difficulty) return false;
      if (search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, difficulty, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
          <GraduationCap className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium text-gold">25+ Variants</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
          Learn Every <span className="text-gold-gradient">Poker Game</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          From Texas Hold&apos;em to Badugi, master the rules, strategy, and nuances of every poker variant with Coach Andrew.
        </p>
      </motion.div>

      {/* ── Search ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-md mx-auto mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search variants..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold/30 transition-all"
          />
        </div>
      </motion.div>

      {/* ── Filters ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10 space-y-4"
      >
        {/* Category filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Filter className="w-4 h-4 text-white/30 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                category === cat.id
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <BookOpen className="w-4 h-4 text-white/30 mr-1" />
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.id}
              onClick={() => setDifficulty(diff.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                difficulty === diff.id
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60 hover:bg-white/10'
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Results count ── */}
      <p className="text-center text-sm text-white/30 mb-6">
        Showing {filtered.length} variant{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* ── Variant Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <GraduationCap className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40">No variants match your filters.</p>
          <button
            onClick={() => {
              setCategory('all');
              setDifficulty('all');
              setSearch('');
            }}
            className="mt-4 text-gold text-sm hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((variant, i) => (
            <motion.div
              key={variant.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.5) }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-gold-border p-5 flex flex-col gap-3 group overflow-visible"
            >
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    CATEGORY_COLORS[variant.category] || CATEGORY_COLORS.holdem
                  }`}
                >
                  {variant.category.charAt(0).toUpperCase() + variant.category.slice(1)}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    DIFFICULTY_COLORS[variant.difficulty] || DIFFICULTY_COLORS.Beginner
                  }`}
                >
                  {variant.difficulty}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">
                {variant.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/50 leading-relaxed line-clamp-2 flex-1">
                {variant.description}
              </p>

              {/* CTA */}
              <Link
                href={`/learn/${variant.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light transition-colors mt-2 group/link"
              >
                Start Lesson
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
