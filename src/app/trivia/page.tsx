'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Zap,
  Trophy,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Filter,
  Flame,
} from 'lucide-react';
import CoachAvatar from '@/components/coach/CoachAvatar';

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface TriviaQuestion {
  id: string;
  question: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
  category: 'history' | 'rules' | 'strategy' | 'players' | 'prop-bets' | 'math';
  difficulty: 'easy' | 'medium' | 'hard';
  andrewTip: string;
}

/* ─────────────────────────────────────────────────────────────
   FALLBACK DATA
   ───────────────────────────────────────────────────────────── */

const FALLBACK_QUESTIONS: TriviaQuestion[] = [
  {
    id: '1',
    question: 'Who won the first World Series of Poker Main Event in 1970?',
    answers: ['Doyle Brunson', 'Johnny Moss', 'Amarillo Slim', 'Stu Ungar'],
    correctIndex: 1,
    explanation: 'Johnny Moss was voted the winner by his peers at the first WSOP in 1970 at Binion\'s Horseshoe in Las Vegas. There was no tournament format — the other players simply voted on who the best player was.',
    category: 'history',
    difficulty: 'easy',
    andrewTip: 'The early WSOP was basically a gathering of Texas road gamblers. Benny Binion brought them all together.',
  },
  {
    id: '2',
    question: 'In Texas Hold\'em, what is the probability of being dealt pocket aces?',
    answers: ['1 in 110', '1 in 169', '1 in 221', '1 in 330'],
    correctIndex: 2,
    explanation: 'The probability of being dealt pocket aces is 4/52 x 3/51 = 12/2652 = 1/221, or about 0.45%. This means you\'ll see aces roughly once every 221 hands.',
    category: 'math',
    difficulty: 'medium',
    andrewTip: 'Knowing your preflop probabilities helps you understand why patience is a virtue in poker. Don\'t force action!',
  },
  {
    id: '3',
    question: 'What event in 2003 is credited with causing the "Poker Boom"?',
    answers: ['Phil Hellmuth winning his 10th bracelet', 'Chris Moneymaker winning the WSOP Main Event', 'The launch of PokerStars', 'The first televised WPT event'],
    correctIndex: 1,
    explanation: 'Chris Moneymaker, an amateur accountant, won his WSOP Main Event entry through a $39 online satellite on PokerStars. His $2.5M win inspired millions of recreational players to take up the game.',
    category: 'history',
    difficulty: 'easy',
    andrewTip: 'Moneymaker\'s win showed the world that anyone could compete with the pros. The online satellite system was revolutionary.',
  },
  {
    id: '4',
    question: 'In GTO poker strategy, what does "GTO" stand for?',
    answers: ['Game Theoretical Optimization', 'Game Theory Optimal', 'General Tournament Operations', 'Guaranteed Table Odds'],
    correctIndex: 1,
    explanation: 'GTO stands for Game Theory Optimal. It refers to a mathematically balanced strategy that cannot be exploited. If you play perfect GTO, no opponent can gain an edge against you in the long run.',
    category: 'strategy',
    difficulty: 'easy',
    andrewTip: 'GTO is your baseline. Master it first, then learn when to deviate to exploit weaker opponents.',
  },
  {
    id: '5',
    question: 'Who holds the record for most WSOP bracelets?',
    answers: ['Doyle Brunson (10)', 'Phil Ivey (10)', 'Phil Hellmuth (17)', 'Daniel Negreanu (6)'],
    correctIndex: 2,
    explanation: 'Phil "The Poker Brat" Hellmuth holds the all-time record with 17 WSOP bracelets, including one Main Event title in 1989 when he was just 24 years old.',
    category: 'players',
    difficulty: 'easy',
    andrewTip: 'Love him or hate him, Hellmuth\'s bracelet record is incredible. His ability to perform at the WSOP specifically is unmatched.',
  },
  {
    id: '6',
    question: 'In Pot-Limit Omaha, how many hole cards must you use to make your final hand?',
    answers: ['Any number (0-4)', 'At least one', 'Exactly two', 'At least two'],
    correctIndex: 2,
    explanation: 'In Omaha, you MUST use exactly two of your four hole cards and exactly three community cards. This is the most common mistake new Omaha players make — using one or three hole cards is not allowed.',
    category: 'rules',
    difficulty: 'medium',
    andrewTip: 'This rule trips up so many Hold\'em players transitioning to Omaha. Always check: am I using exactly 2 from my hand?',
  },
  {
    id: '7',
    question: 'What is the "dead man\'s hand" in poker?',
    answers: ['Pocket aces (AA)', 'Aces and eights (A-A-8-8)', 'King-queen offsuit', 'Seven-deuce offsuit (7-2o)'],
    correctIndex: 1,
    explanation: 'The dead man\'s hand is aces and eights (two pair: A-A-8-8). Legend has it that Wild Bill Hickok was holding this hand when he was shot and killed in 1876 in Deadwood, South Dakota.',
    category: 'history',
    difficulty: 'medium',
    andrewTip: 'Poker and Old West history are deeply intertwined. The game was a big part of frontier culture.',
  },
  {
    id: '8',
    question: 'What AI system first defeated top professional poker players in heads-up no-limit hold\'em?',
    answers: ['AlphaGo', 'Libratus', 'DeepStack', 'Pluribus'],
    correctIndex: 1,
    explanation: 'Libratus, developed by Carnegie Mellon University, defeated four top pros in a 120,000-hand challenge in January 2017. This was a landmark moment in AI history, as poker is a game of imperfect information.',
    category: 'history',
    difficulty: 'hard',
    andrewTip: 'Libratus won by $1.7M over 20 days. Pluribus later beat 5 pros at once in 6-max. AI has surpassed human play.',
  },
  {
    id: '9',
    question: 'What is the correct pot odds calculation if the pot is $100 and your opponent bets $50?',
    answers: ['2:1', '3:1', '1:1', '4:1'],
    correctIndex: 0,
    explanation: 'You need to call $50 to win a total pot of $150 ($100 + $50 bet). So your pot odds are $150:$50, which simplifies to 3:1. But the RISK is $50 to win $150, making your call odds 3:1 (you need 25% equity).',
    category: 'math',
    difficulty: 'hard',
    andrewTip: 'Pot odds are the foundation of good decision making. If your draw equity exceeds the odds you\'re getting, it\'s a profitable call.',
  },
  {
    id: '10',
    question: 'Poker pro Erick Lindgren famously won a prop bet by doing what with no training?',
    answers: ['Swimming the English Channel', 'Running a marathon', 'Winning a chess tournament', 'Completing an Ironman'],
    correctIndex: 1,
    explanation: 'Erick Lindgren bet fellow pros over $300,000 that he could complete a full marathon (26.2 miles) with zero training. He finished in about 5 hours and 49 minutes.',
    category: 'prop-bets',
    difficulty: 'medium',
    andrewTip: 'Prop bets are a huge part of poker culture. The willingness to put money on anything is very on-brand for degenerate poker players.',
  },
];

/* ─────────────────────────────────────────────────────────────
   DATA LOADING
   ───────────────────────────────────────────────────────────── */

let allQuestions: TriviaQuestion[] = FALLBACK_QUESTIONS;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const imported = require('@/data/trivia-questions');
  if (imported.triviaQuestions && Array.isArray(imported.triviaQuestions)) {
    // Map from data file format to page format
    allQuestions = imported.triviaQuestions.map((q: { id: number; question: string; options: string[]; correctAnswer: number; explanation: string; category: string; difficulty: string }) => ({
      id: String(q.id),
      question: q.question,
      answers: q.options,
      correctIndex: q.correctAnswer,
      explanation: q.explanation,
      category: q.category === 'prop_bets' ? 'prop-bets' : q.category,
      difficulty: q.difficulty,
      andrewTip: q.explanation,
    }));
  }
} catch {
  // Use fallback
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────── */

type Category = 'all' | 'history' | 'rules' | 'strategy' | 'players' | 'prop-bets' | 'math';
type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'history', label: 'History' },
  { id: 'rules', label: 'Rules' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'players', label: 'Players' },
  { id: 'prop-bets', label: 'Prop Bets' },
  { id: 'math', label: 'Math' },
];

const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
];

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];

const CATEGORY_COLORS: Record<string, string> = {
  history: 'bg-amber-500/15 text-amber-400',
  rules: 'bg-blue-500/15 text-blue-400',
  strategy: 'bg-green-500/15 text-green-400',
  players: 'bg-purple-500/15 text-purple-400',
  'prop-bets': 'bg-pink-500/15 text-pink-400',
  math: 'bg-cyan-500/15 text-cyan-400',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'bg-green-500/15 text-green-400',
  medium: 'bg-gold/15 text-gold',
  hard: 'bg-red-500/15 text-red-400',
};

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function TriviaPage() {
  const [category, setCategory] = useState<Category>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());

  const filteredPool = useMemo(() => {
    return allQuestions.filter((q) => {
      if (category !== 'all' && q.category !== category) return false;
      if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
      return true;
    });
  }, [category, difficulty]);

  const getNextQuestion = useCallback((): TriviaQuestion | null => {
    const available = filteredPool.filter((q) => !usedIds.has(q.id));
    if (available.length === 0) {
      // Reset pool when exhausted
      setUsedIds(new Set());
      return filteredPool.length > 0 ? filteredPool[Math.floor(Math.random() * filteredPool.length)] : null;
    }
    return available[Math.floor(Math.random() * available.length)];
  }, [filteredPool, usedIds]);

  const [currentQ, setCurrentQ] = useState<TriviaQuestion | null>(() => getNextQuestion());

  const handleAnswer = (index: number) => {
    if (isRevealed || !currentQ) return;
    setSelectedAnswer(index);
    setIsRevealed(true);

    const isCorrect = index === currentQ.correctIndex;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);
    if (newStreak > bestStreak) setBestStreak(newStreak);

    setUsedIds((prev) => new Set(prev).add(currentQ.id));
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsRevealed(false);
    setCurrentQ(getNextQuestion());
  };

  const resetGame = () => {
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setUsedIds(new Set());
    setSelectedAnswer(null);
    setIsRevealed(false);
    setCurrentQ(
      filteredPool.length > 0
        ? filteredPool[Math.floor(Math.random() * filteredPool.length)]
        : null
    );
  };

  // When filters change, get a new question
  const handleFilterChange = (newCategory: Category, newDifficulty: Difficulty) => {
    setCategory(newCategory);
    setDifficulty(newDifficulty);
    setSelectedAnswer(null);
    setIsRevealed(false);
    // Will trigger new question on next render via pool change
    setTimeout(() => {
      const pool = allQuestions.filter((q) => {
        if (newCategory !== 'all' && q.category !== newCategory) return false;
        if (newDifficulty !== 'all' && q.difficulty !== newDifficulty) return false;
        return true;
      });
      if (pool.length > 0) {
        setCurrentQ(pool[Math.floor(Math.random() * pool.length)]);
      } else {
        setCurrentQ(null);
      }
    }, 0);
  };

  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
          <HelpCircle className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium text-gold">Test Your Knowledge</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
          Poker <span className="text-gold-gradient">Trivia</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          How well do you know poker history, rules, strategy, and lore? Find out!
        </p>
      </motion.div>

      {/* ── Filters ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3 mb-8"
      >
        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Filter className="w-4 h-4 text-white/30 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id, difficulty)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                category === cat.id
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Difficulty pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.id}
              onClick={() => handleFilterChange(category, diff.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                difficulty === diff.id
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60'
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Score Bar ── */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5 mb-6">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-white/30">Score: </span>
            <span className="font-bold text-white">
              {score.correct} / {score.total}
            </span>
            {score.total > 0 && (
              <span
                className={`ml-2 font-semibold ${
                  pct >= 70 ? 'text-green-400' : pct >= 40 ? 'text-gold' : 'text-red-400'
                }`}
              >
                {pct}%
              </span>
            )}
          </div>
          {streak >= 3 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/15 border border-orange-500/20">
              <Flame className="w-3 h-3 text-orange-400" />
              <span className="text-xs font-bold text-orange-400">{streak} streak!</span>
            </div>
          )}
        </div>
        <button
          onClick={resetGame}
          className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* ── Question Card ── */}
      {currentQ ? (
        <motion.div
          key={`${currentQ.id}-${score.total}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gold-border p-6 sm:p-8 space-y-6"
        >
          {/* Question badges */}
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                CATEGORY_COLORS[currentQ.category] || 'bg-white/10 text-white/50'
              }`}
            >
              {currentQ.category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                DIFFICULTY_COLORS[currentQ.difficulty] || 'bg-white/10 text-white/50'
              }`}
            >
              {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
            </span>
          </div>

          {/* Question text */}
          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Answer buttons */}
          <div className="space-y-3">
            {currentQ.answers.map((answer, i) => {
              let btnClass =
                'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20';

              if (isRevealed) {
                if (i === currentQ.correctIndex) {
                  btnClass = 'bg-green-500/15 border-green-500/30 text-green-400';
                } else if (i === selectedAnswer && i !== currentQ.correctIndex) {
                  btnClass = 'bg-red-500/15 border-red-500/30 text-red-400';
                } else {
                  btnClass = 'bg-white/[0.02] border-white/5 text-white/20';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={isRevealed}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all cursor-pointer disabled:cursor-default ${btnClass}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                      isRevealed && i === currentQ.correctIndex
                        ? 'bg-green-500/20 text-green-400'
                        : isRevealed && i === selectedAnswer
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-white/5 text-white/30'
                    }`}
                  >
                    {ANSWER_LETTERS[i]}
                  </span>
                  <span className="text-sm font-medium">{answer}</span>
                  {isRevealed && i === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto shrink-0" />
                  )}
                  {isRevealed && i === selectedAnswer && i !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Reveal section */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Correct/wrong */}
                <div
                  className={`p-4 rounded-xl ${
                    selectedAnswer === currentQ.correctIndex
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {selectedAnswer === currentQ.correctIndex ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p
                        className={`font-bold text-sm mb-1 ${
                          selectedAnswer === currentQ.correctIndex
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {selectedAnswer === currentQ.correctIndex ? 'Correct!' : 'Not quite!'}
                      </p>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {currentQ.explanation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Andrew's tip */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gold/5 border border-gold/10">
                  <CoachAvatar size="sm" className="mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gold">Andrew&apos;s Tip</span>
                      <Lightbulb className="w-3 h-3 text-gold" />
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {currentQ.andrewTip}
                    </p>
                  </div>
                </div>

                {/* Next button */}
                <button
                  onClick={nextQuestion}
                  className="w-full btn-gold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
                >
                  Next Question
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 card-gold-border">
          <HelpCircle className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40 mb-4">No questions match your current filters.</p>
          <button
            onClick={() => {
              setCategory('all');
              setDifficulty('all');
              resetGame();
            }}
            className="text-gold text-sm hover:underline cursor-pointer"
          >
            Clear filters and restart
          </button>
        </div>
      )}

      {/* ── Stats Summary (shows after 5+ questions) ── */}
      {score.total >= 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-6 rounded-xl bg-white/[0.02] border border-white/5"
        >
          <h4 className="text-sm font-bold text-white/40 mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gold" />
            Session Stats
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{score.correct}/{score.total}</p>
              <p className="text-xs text-white/30">Correct</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${pct >= 70 ? 'text-green-400' : pct >= 40 ? 'text-gold' : 'text-red-400'}`}>
                {pct}%
              </p>
              <p className="text-xs text-white/30">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-400">{bestStreak}</p>
              <p className="text-xs text-white/30">Best Streak</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
