'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────── */

const BLOG_POSTS = [
  {
    title: 'Why GTO Poker Strategy Is the Only Strategy That Matters',
    teaser: 'Understanding why game theory optimal play is your unbeatable baseline.',
    date: 'Coming Soon',
    category: 'Strategy',
  },
  {
    title: 'The Complete Guide to Every Poker Variant (Yes, All 25+ of Them)',
    teaser: "From Hold'em to Badugi, every game explained with rules, tips, and strategy.",
    date: 'Coming Soon',
    category: 'Education',
  },
  {
    title: 'How AI Conquered Poker — And What It Means for Your Game',
    teaser: 'From Libratus to Pluribus: the fascinating story of machines beating the best.',
    date: 'Coming Soon',
    category: 'AI & Tech',
  },
  {
    title: 'Bankroll Management: The Skill That Separates Pros from Amateurs',
    teaser: 'The boring skill that will save your poker career. Numbers inside.',
    date: 'Coming Soon',
    category: 'Fundamentals',
  },
  {
    title: 'From Doyle to Dwan: The Greatest Poker Players of All Time',
    teaser: 'A definitive ranking of the legends who shaped the game we love.',
    date: 'Coming Soon',
    category: 'History',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: 'bg-green-500/15 text-green-400',
  Education: 'bg-blue-500/15 text-blue-400',
  'AI & Tech': 'bg-purple-500/15 text-purple-400',
  Fundamentals: 'bg-gold/15 text-gold',
  History: 'bg-amber-500/15 text-amber-400',
};

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
          <BookOpen className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium text-gold">Blog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
          Blog &mdash; <span className="text-gold-gradient">Coming Soon</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Deep dives into strategy, history, and the science of poker. Subscribe to get notified when we launch.
        </p>
      </motion.div>

      {/* ── Blog Post Cards ── */}
      <div className="space-y-4 mb-16">
        {BLOG_POSTS.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -2 }}
            className="card-gold-border p-6 group cursor-default"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                {/* Category & Date */}
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      CATEGORY_COLORS[post.category] || 'bg-white/10 text-white/50'
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/25">
                    <Clock className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white group-hover:text-gold transition-colors mb-1">
                  {post.title}
                </h2>

                {/* Teaser */}
                <p className="text-sm text-white/40 leading-relaxed">
                  {post.teaser}
                </p>
              </div>

              {/* Coming soon badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/10 shrink-0 self-start sm:self-center">
                <Sparkles className="w-4 h-4 text-gold/50" />
                <span className="text-xs font-semibold text-gold/60">Coming Soon</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* ── Subscribe Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <div className="card-gold-border p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-gold" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Get Notified When We Launch
          </h3>
          <p className="text-sm text-white/40 mb-6">
            Be the first to read our deep dives into poker strategy, AI, and history.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/30 transition-all"
            />
            <button
              type="submit"
              className="btn-gold px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm shrink-0"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-white/20 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
