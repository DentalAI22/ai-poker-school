'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Gamepad2,
  Layers,
  TrendingUp,
  Trophy,
  BookOpen,
  MessageCircle,
  Spade,
  ChevronDown,
  Crown,
  Star,
  Check,
  Zap,
  ArrowRight,
} from 'lucide-react';

/* ─────────────────────────── helpers ─────────────────────────── */

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── gold particle field ─── */
function GoldParticles() {
  // Generate 40 particles with deterministic positions via index math
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${(i * 17.3 + 5) % 100}%`,
    top: `${(i * 23.7 + 3) % 100}%`,
    size: 2 + (i % 4),
    delay: (i * 0.37) % 6,
    duration: 4 + (i % 5),
    opacity: 0.15 + (i % 5) * 0.08,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #e8c36a, #d4a843)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── floating card decorator ─── */
function FloatingCard({
  suit,
  rank,
  color,
  className,
}: {
  suit: string;
  rank: string;
  color: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute playing-card select-none hidden lg:flex ${className}`}
      animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="text-lg font-bold" style={{ color }}>
        {rank}
        {suit}
      </span>
    </motion.div>
  );
}

/* ─── FAQ item ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-lg font-semibold text-white group-hover:text-gold transition-colors pr-4">
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
            <p className="pb-5 text-white/70 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */

export default function Home() {
  /* refs for section animations */
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-gold" />,
      title: 'GTO Training',
      quote: "I'll teach your brain to think like a solver",
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-gold" />,
      title: 'Play Interactive Hands',
      quote: "Deal in and I'll coach every decision",
    },
    {
      icon: <Layers className="w-8 h-8 text-gold" />,
      title: '25+ Poker Variants',
      quote: "From Hold'em to Badugi, I know them all",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-gold" />,
      title: 'Track Your Progress',
      quote: 'I remember your patterns and fix your leaks',
    },
    {
      icon: <Trophy className="w-8 h-8 text-gold" />,
      title: 'Tournament Prep',
      quote: 'Bankroll management, ICM, final table strategy',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-gold" />,
      title: 'Poker History',
      quote: 'From Doyle to Dwan, I know every story',
    },
  ];

  const steps = [
    {
      num: 1,
      title: 'Talk to Andrew',
      desc: 'Ask questions, describe hands, get strategy advice',
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      num: 2,
      title: 'Play Hands',
      desc: 'Interactive table with real-time coaching',
      icon: <Spade className="w-6 h-6" />,
    },
    {
      num: 3,
      title: 'Improve',
      desc: 'Track progress, fix leaks, climb the ranks',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const faqs: { q: string; a: string }[] = [
    {
      q: 'Is this real gambling?',
      a: 'Absolutely not. AI Poker School is a purely educational platform. There is no real money wagering of any kind. You play with virtual chips to practice strategy in a risk-free environment.',
    },
    {
      q: 'Who is Andrew?',
      a: "Andrew is our AI poker coach, trained on the strategies and insights of poker's greatest minds — from Doyle Brunson and Daniel Negreanu to GTO solvers and modern theorists. He adapts to your skill level and provides personalized coaching.",
    },
    {
      q: 'What variants do you cover?',
      a: "We cover 25+ poker variants including Texas Hold'em (cash and tournament), Pot-Limit Omaha, Short Deck, Stud, Razz, Badugi, Mixed Games, and many more. Andrew can coach you through any of them.",
    },
    {
      q: 'How much does it cost?',
      a: 'We offer a generous free tier that lets you talk to Andrew and play hands. Pro membership is just $9.99/month (or $99/year) and unlocks unlimited sessions, progress tracking, advanced analytics, and priority responses.',
    },
    {
      q: 'Can I use this on mobile?',
      a: 'Yes! AI Poker School is fully responsive and works beautifully on phones, tablets, and desktops. Take Andrew with you to the casino (for educational reference, of course).',
    },
  ];

  return (
    <div className="relative">
      {/* ━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-[#0a120a] to-dark-bg" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(212,168,67,0.4) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <GoldParticles />

        {/* Floating cards */}
        <FloatingCard suit="♠" rank="A" color="#fff" className="top-[18%] left-[8%] -rotate-12" />
        <FloatingCard suit="♥" rank="K" color="#ef4444" className="top-[25%] right-[10%] rotate-6" />
        <FloatingCard suit="♦" rank="A" color="#ef4444" className="bottom-[22%] left-[15%] rotate-3" />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold/30 bg-gold/5">
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">Powered by Advanced AI</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-serif"
          >
            <span className="text-gold-gradient">AI is beating the best.</span>
            <br />
            <span className="text-white">Why not train with the best?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The world&apos;s most advanced AI poker coach. Master GTO strategy across 25+ game
            types.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link
              href="/coach"
              className="btn-gold text-base sm:text-lg px-8 py-4 rounded-xl inline-flex items-center gap-2 animate-pulse-gold"
            >
              <MessageCircle className="w-5 h-5" />
              Talk to Coach Andrew — Free
            </Link>
            <Link
              href="/play"
              className="btn-felt text-base sm:text-lg px-8 py-4 rounded-xl inline-flex items-center gap-2"
            >
              <Spade className="w-5 h-5" />
              Play Your First Hand
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-xs text-white/30 max-w-md mx-auto"
          >
            For educational simulation purposes only. No real money wagering.
          </motion.p>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent" />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━ WHAT ANDREW CAN DO ━━━━━━━━━━━━━━━━━━━━ */}
      <Section className="py-24 px-6" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
              What <span className="text-gold-gradient">Andrew</span> Can Do
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Your personal AI poker coach, available 24/7. Here&apos;s how Andrew levels up your
              game.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="card-gold-border p-6 flex flex-col gap-4 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{f.title}</h3>
                <p className="text-white/50 italic leading-relaxed">
                  &ldquo;{f.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━ HOW IT WORKS ━━━━━━━━━━━━━━━━━━━━ */}
      <Section className="py-24 px-6 relative overflow-hidden" id="how-it-works">
        {/* Subtle felt gradient behind */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-felt/5 to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
              How It <span className="text-gold-gradient">Works</span>
            </h2>
            <p className="text-white/50 text-lg max-w-lg mx-auto">
              Three simple steps to becoming a better poker player.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-gold/40 via-gold/60 to-gold/40" />

            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Gold numbered circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-dark-bg text-xl font-bold shadow-lg shadow-gold/20">
                    {s.num}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-30" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/50 leading-relaxed max-w-xs">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━ PRICING PREVIEW ━━━━━━━━━━━━━━━━━━━━ */}
      <Section className="py-24 px-6" id="pricing">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
              Simple, <span className="text-gold-gradient">Honest</span> Pricing
            </h2>
            <p className="text-white/50 text-lg max-w-lg mx-auto">
              Start free. Upgrade when you&apos;re ready to go all-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* FREE TIER */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-card-bg p-8 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-1 text-white">Free</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-white/40 mb-1">/forever</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Chat with Coach Andrew',
                  'Play interactive hands',
                  '5 game variants',
                  'Basic strategy tips',
                  'Community access',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <Check className="w-5 h-5 text-felt-light shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/coach"
                className="btn-felt text-center text-base py-3 rounded-xl w-full block"
              >
                Start Free
              </Link>
            </motion.div>

            {/* PRO TIER */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border-2 border-gold/50 bg-card-bg p-8 flex flex-col relative overflow-hidden"
            >
              {/* Most Popular badge */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30">
                  <Crown className="w-3.5 h-3.5 text-gold" />
                  <span className="text-xs font-bold text-gold uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              </div>

              {/* Subtle gold glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xl font-bold mb-1 text-gold-gradient">Pro</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-white/40 mb-1">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Free',
                  'Unlimited coaching sessions',
                  'All 25+ game variants',
                  'Progress tracking & analytics',
                  'Advanced GTO breakdowns',
                  'Hand history review',
                  'Priority response times',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <Star className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="btn-gold text-center text-base py-3 rounded-xl w-full block"
              >
                Go Pro
              </Link>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8 text-white/40 text-sm"
          >
            $99/yr — that&apos;s less than <span className="text-gold font-semibold">ONE</span>{' '}
            poker coaching session.
          </motion.p>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━ FAQ ━━━━━━━━━━━━━━━━━━━━ */}
      <Section className="py-24 px-6" id="faq">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
              Frequently Asked <span className="text-gold-gradient">Questions</span>
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-t border-white/10">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━ FINAL CTA ━━━━━━━━━━━━━━━━━━━━ */}
      <Section className="py-24 px-6 relative overflow-hidden" id="cta">
        {/* Felt background */}
        <div className="absolute inset-0 bg-felt opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-transparent to-dark-bg/80" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-6">
              Ready to{' '}
              <span className="text-gold-gradient">Level Up</span> Your Game?
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">
              Join thousands of players who are sharpening their edge with the most advanced AI
              poker coach ever built.
            </p>
            <Link
              href="/coach"
              className="btn-gold text-lg px-10 py-4 rounded-xl inline-flex items-center gap-3 animate-pulse-gold"
            >
              Start Training with Andrew
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
