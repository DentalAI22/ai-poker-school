'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Gamepad2,
  Trophy,
  MessageCircle,
  Spade,
  ChevronDown,
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
  // Generate 15 particles with deterministic positions via index math
  const particles = Array.from({ length: 15 }, (_, i) => ({
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
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-gold" />,
      title: 'Real-Time GTO Coaching',
      desc: 'Andrew coaches every decision at the table — preflop ranges, bet sizing, pot odds. Like having Doug Polk sitting behind you.',
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-gold" />,
      title: 'Play & Learn',
      desc: 'Interactive poker table with AI opponents. Toggle coaching on to learn, off to test yourself. 25+ variants.',
    },
    {
      icon: <Trophy className="w-8 h-8 text-gold" />,
      title: 'Tournament & ICM',
      desc: 'Push/fold charts, ICM calculations, bubble strategy, final table dynamics. The complete tournament toolkit.',
    },
  ];

  const faqs: { q: string; a: string }[] = [
    {
      q: 'Is this real gambling?',
      a: 'No. AI Poker School is purely educational. Virtual chips only. No real money wagering of any kind.',
    },
    {
      q: 'How does Andrew compare to a $300/hr poker coach?',
      a: "Andrew is trained on the strategies of poker's greatest minds and modern GTO solvers. Available 24/7, remembers your patterns, and costs less than a single coaching session per year.",
    },
    {
      q: 'How much does it cost?',
      a: 'Start free with 3 coaching messages and 5 hands per day. Pro is $9.99/month for unlimited everything — that\'s 97% less than Upswing Poker.',
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
            <span className="text-white">Don&apos;t train with the pros.</span>
            <br />
            <span className="text-gold-gradient">Train with the best.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Real-time AI GTO coaching at the table. The tool Stu Ungar never had. The edge Doug Polk charges $999/year for. Yours for a fraction of the price.
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

      {/* ━━━━━━━━━━━━━━━━━━━━ FEATURES ━━━━━━━━━━━━━━━━━━━━ */}
      <Section className="py-24 px-6" id="features">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-gold-border p-8 flex flex-col gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{f.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━━━━━━━━━━━━━━━━━━ SOCIAL PROOF / COMPARISON ━━━━━━━━━━━━━━━━━━━━ */}
      <Section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="card-gold-border p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-6">The Math Speaks for Itself</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-red-400">$300</p>
                <p className="text-xs text-white/30 mt-1">Private coach<br />(per hour)</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-orange-400">$999</p>
                <p className="text-xs text-white/30 mt-1">Upswing Poker<br />(per year)</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-green-400">$9.99</p>
                <p className="text-xs text-white/30 mt-1">AI Poker School<br />(per month)</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <Link href="/pricing" className="btn-gold text-sm px-8 py-3 rounded-xl inline-flex items-center gap-2">
                View Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
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
