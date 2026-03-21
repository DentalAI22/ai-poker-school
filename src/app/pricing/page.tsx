'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Check,
  Star,
  ChevronDown,
  Zap,
  MessageCircle,
  Spade,
  BookOpen,
  BarChart3,
  History,
  Trophy,
  Mic,
  TrendingUp,
  DollarSign,
  Sparkles,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   FAQ ITEM
   ───────────────────────────────────────────────────────────── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-base font-semibold text-white group-hover:text-gold transition-colors pr-4">
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-5 h-5 text-gold shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-white/60 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const freeFeatures = [
    { icon: <MessageCircle className="w-4 h-4" />, text: 'Chat with Andrew (3 messages/day)' },
    { icon: <Spade className="w-4 h-4" />, text: 'Play 5 hands/day on interactive table' },
    { icon: <BookOpen className="w-4 h-4" />, text: 'Learn rules for all 25+ variants' },
    { icon: <BarChart3 className="w-4 h-4" />, text: 'GTO chart viewer (read-only)' },
    { icon: <History className="w-4 h-4" />, text: 'Poker history and trivia' },
  ];

  const proFeatures = [
    { icon: <MessageCircle className="w-4 h-4" />, text: 'UNLIMITED coaching sessions with Andrew' },
    { icon: <Spade className="w-4 h-4" />, text: 'UNLIMITED hands on interactive table' },
    { icon: <BarChart3 className="w-4 h-4" />, text: 'Full GTO trainer with accuracy tracking' },
    { icon: <TrendingUp className="w-4 h-4" />, text: 'Progress dashboard with leak analysis' },
    { icon: <Trophy className="w-4 h-4" />, text: 'Tournament tracker' },
    { icon: <DollarSign className="w-4 h-4" />, text: 'Bankroll management tools' },
    { icon: <Mic className="w-4 h-4" />, text: 'Voice coaching (talk to Andrew)' },
    { icon: <BookOpen className="w-4 h-4" />, text: 'Hand history with detailed analysis' },
    { icon: <Sparkles className="w-4 h-4" />, text: 'Priority new features' },
  ];

  const faqs = [
    {
      q: 'Can I try Pro features before committing?',
      a: "We offer a generous free tier so you can experience Andrew's coaching and the interactive table before upgrading. When you're ready for unlimited access, Pro is just a click away.",
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Absolutely. You can cancel your Pro subscription at any time with no questions asked. You\'ll continue to have Pro access until the end of your billing period.',
    },
    {
      q: 'Is this real gambling? Can I lose money playing?',
      a: 'No. AI Poker School is purely educational. You play with virtual chips only. There is no real money wagering of any kind. Your subscription only pays for access to coaching and training tools.',
    },
    {
      q: 'How does Andrew compare to human poker coaches?',
      a: "A private poker coach typically charges $200-500/hour. Andrew is available 24/7, trained on the strategies of poker's greatest minds, and costs less than a single coaching session per year. He adapts to your skill level and remembers your tendencies across sessions.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 overflow-x-hidden">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
          <Zap className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium text-gold">Simple Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
          Level Up <span className="text-gold-gradient">Your Game</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Start free. Go all-in when you&apos;re ready.
        </p>
      </motion.div>

      {/* ── Billing Toggle ── */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-white/40'}`}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="relative w-14 h-7 rounded-full bg-white/10 border border-white/10 cursor-pointer transition-all"
        >
          <motion.div
            className="absolute top-[3px] w-5 h-5 rounded-full bg-gold"
            animate={{ left: isYearly ? 30 : 4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-white/40'}`}>
          Yearly
          <span className="ml-1.5 text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-semibold">
            Save $20
          </span>
        </span>
      </div>

      {/* ── Pricing Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {/* FREE Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-card-bg p-8 flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-1">Free</h3>
          <div className="flex items-end gap-1 mb-2">
            <span className="text-5xl font-bold text-white">$0</span>
          </div>
          <p className="text-sm text-white/30 mb-8">Free forever. No credit card needed.</p>

          <ul className="space-y-4 mb-8 flex-1">
            {freeFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-white/60">
                <div className="w-6 h-6 rounded-md bg-felt/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-felt-light" />
                </div>
                <span className="text-sm">{feature.text}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/coach"
            className="btn-felt text-center text-base py-3.5 rounded-xl w-full block"
          >
            Start Free
          </Link>
        </motion.div>

        {/* PRO Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-2xl border-2 border-gold/50 bg-card-bg p-8 flex flex-col overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30">
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-bold text-gold uppercase tracking-wider">
                Most Popular
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gold-gradient mb-1">Pro</h3>

          {/* Price */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isYearly ? 'yearly' : 'monthly'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-2"
            >
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold text-white">
                  ${isYearly ? '99' : '9.99'}
                </span>
                <span className="text-white/40 mb-1.5">
                  /{isYearly ? 'yr' : 'mo'}
                </span>
              </div>
              {isYearly && (
                <p className="text-xs text-green-400 mt-1">
                  $8.25/mo &middot; Save $20.88 vs monthly
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <p className="text-sm text-white/30 mb-8">
            {isYearly
              ? 'Best value. Billed annually.'
              : 'Cancel anytime. No commitments.'}
          </p>

          <ul className="space-y-4 mb-8 flex-1">
            {proFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-white/70">
                <div className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-gold" />
                </div>
                <span className="text-sm">{feature.text}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#"
            className="btn-gold text-center text-base py-3.5 rounded-xl w-full block animate-pulse-gold"
          >
            Go Pro
          </Link>
        </motion.div>
      </div>

      {/* ── Comparison Text ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="card-gold-border p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-3">The Math Speaks for Itself</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-400">$200-500</p>
              <p className="text-xs text-white/30 mt-1">Private coaching (per hour)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-400">$999</p>
              <p className="text-xs text-white/30 mt-1">Upswing Poker (per year)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">$99</p>
              <p className="text-xs text-white/30 mt-1">AI Poker School Pro (per year)</p>
            </div>
          </div>
          <p className="text-xs text-white/30 mt-4">
            24/7 coaching. Unlimited sessions. A fraction of the cost.
          </p>
        </div>
      </motion.div>

      {/* ── FAQ ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-8">
          Frequently Asked <span className="text-gold-gradient">Questions</span>
        </h2>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
