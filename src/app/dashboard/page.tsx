'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Spade,
  BarChart3,
  MessageCircle,
  Flame,
  TrendingUp,
  Trophy,
  DollarSign,
  AlertTriangle,
  Plus,
  X,
  LogIn,
  Lightbulb,
  Target,
  History,
  ChevronRight,
  Crown,
} from 'lucide-react';
import CoachAvatar from '@/components/coach/CoachAvatar';
import ProgressBar from '@/components/ui/ProgressBar';
import { useAuth } from '@/lib/auth-context';

/* ─────────────────────────────────────────────────────────────
   STAT CARD
   ───────────────────────────────────────────────────────────── */

function StatCard({
  icon,
  label,
  value,
  color = 'text-white',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="card-gold-border p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOURNAMENT MODAL
   ───────────────────────────────────────────────────────────── */

function TournamentModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-card-bg border border-white/10 rounded-2xl p-6 w-full max-w-md z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Add Tournament</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Tournament Name</label>
            <input
              type="text"
              placeholder='e.g., "WSOP Main Event"'
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Buy-in ($)</label>
              <input
                type="number"
                placeholder="100"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Finish Place</label>
              <input
                type="number"
                placeholder="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/30"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Entries</label>
              <input
                type="number"
                placeholder="100"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Prize Won ($)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Date</label>
            <input
              type="date"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/30"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white/50 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 btn-gold py-2.5 rounded-xl text-sm"
          >
            Add Tournament
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EMPTY STATE
   ───────────────────────────────────────────────────────────── */

function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
        {icon}
      </div>
      <p className="text-sm font-medium text-white/40 mb-1">{title}</p>
      <p className="text-xs text-white/25 mb-4">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="text-xs font-semibold text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1"
        >
          {actionLabel}
          <ChevronRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function DashboardPage() {
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const { user, profile, isPro, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard className="w-6 h-6 text-gold" />
          <h1 className="text-3xl sm:text-4xl font-bold font-serif">
            {profile?.display_name ? (
              <>Welcome back, <span className="text-gold-gradient">{profile.display_name.split(' ')[0]}</span></>
            ) : (
              <>Your <span className="text-gold-gradient">Dashboard</span></>
            )}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-white/40 text-sm">
            Track your progress, identify leaks, and level up your game.
          </p>
          {isPro ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/15 text-xs font-bold text-gold">
              <Crown className="w-3 h-3" /> Pro
            </span>
          ) : (
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 text-xs font-bold text-gold hover:bg-gold/20 transition-all"
            >
              <Crown className="w-3 h-3" /> Upgrade
            </Link>
          )}
        </div>
      </motion.div>

      {/* ── Stats Overview ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Spade className="w-5 h-5 text-gold" />}
          label="Hands Played"
          value={String(profile?.hands_played || 0)}
        />
        <StatCard
          icon={<BarChart3 className="w-5 h-5 text-blue-400" />}
          label="GTO Accuracy"
          value={profile?.gto_accuracy_score ? `${Math.round(Number(profile.gto_accuracy_score))}%` : '0%'}
          color={profile?.gto_accuracy_score ? 'text-blue-400' : 'text-white/30'}
        />
        <StatCard
          icon={<MessageCircle className="w-5 h-5 text-green-400" />}
          label="Sessions with Andrew"
          value={String(profile?.coaching_sessions || 0)}
        />
        <StatCard
          icon={<Flame className="w-5 h-5 text-orange-400" />}
          label="Current Streak"
          value={`${profile?.streak_days || 0} days`}
          color={profile?.streak_days ? 'text-orange-400' : 'text-white/30'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column (2 cols wide) ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skill Level */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-gold-border p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-bold text-white">Skill Level</h2>
            </div>
            <div className="mb-3">
              <ProgressBar value={0} label="Progress" />
            </div>
            <div className="flex justify-between text-xs text-white/30">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
              <span>Pro</span>
            </div>
            <p className="text-xs text-white/25 mt-3">
              Play hands and complete GTO quizzes to level up.
            </p>
          </motion.div>

          {/* Your Leaks */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card-gold-border p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-bold text-white">Your Leaks</h2>
            </div>
            <EmptyState
              icon={<Target className="w-5 h-5 text-white/15" />}
              title="No leaks identified yet"
              description="Play more hands for Andrew to identify your leaks and create a training plan."
              actionLabel="Play some hands"
              actionHref="/play"
            />
          </motion.div>

          {/* Recent Hands */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-gold-border p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <History className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Recent Hands</h2>
            </div>
            <EmptyState
              icon={<Spade className="w-5 h-5 text-white/15" />}
              title="No hands played yet"
              description="Hit the table! Your hand history will appear here with Andrew's analysis."
              actionLabel="Play your first hand"
              actionHref="/play"
            />
          </motion.div>

          {/* Tournament Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="card-gold-border p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-gold" />
                <h2 className="text-lg font-bold text-white">Tournament Tracker</h2>
              </div>
              <button
                onClick={() => setShowTournamentModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gold bg-gold/10 hover:bg-gold/20 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Tournament
              </button>
            </div>

            {/* Empty table */}
            <div className="rounded-lg border border-white/5 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/20 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/20 uppercase">Tournament</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/20 uppercase">Buy-in</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/20 uppercase">Result</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-white/20 uppercase">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-white/20 text-xs">
                      No tournaments tracked yet. Add your first tournament above!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Bankroll Management */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-gold-border p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-bold text-white">Bankroll</h2>
            </div>

            {/* Current bankroll */}
            <div className="text-center mb-6">
              <p className="text-xs text-white/30 mb-1">Current Bankroll</p>
              <p className="text-4xl font-bold text-white">$0</p>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-gold bg-gold/10 hover:bg-gold/20 transition-all cursor-pointer mb-4">
              <Plus className="w-4 h-4" />
              Add Deposit
            </button>

            <div className="pt-4 border-t border-white/5">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">
                Recommended Stakes
              </p>
              <p className="text-xs text-white/25 leading-relaxed">
                Play more to get personalized bankroll recommendations from Andrew.
              </p>
            </div>

            {/* Empty chart placeholder */}
            <div className="mt-4 h-32 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-6 h-6 text-white/10 mx-auto mb-1" />
                <p className="text-[10px] text-white/15">Bankroll chart</p>
              </div>
            </div>
          </motion.div>

          {/* Andrew's Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-gold-border p-6 border-gold/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <CoachAvatar size="sm" />
              <div>
                <h2 className="text-sm font-bold text-white">Andrew&apos;s Recommendation</h2>
                <p className="text-xs text-gold/60">Personalized for you</p>
              </div>
            </div>

            <div className="bg-gold/5 border border-gold/10 rounded-xl p-4">
              <div className="flex items-start gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <p className="text-sm text-white/60 leading-relaxed">
                  Start by playing <span className="font-semibold text-white">10 hands</span> on the interactive table. I&apos;ll analyze your play and create a personalized training plan.
                </p>
              </div>
              <Link
                href="/play"
                className="btn-gold text-xs py-2 px-4 rounded-lg inline-flex items-center gap-1.5 mt-1"
              >
                <Spade className="w-3.5 h-3.5" />
                Play Now
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="card-gold-border p-5"
          >
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { href: '/play', label: 'Play Hands', icon: <Spade className="w-4 h-4" /> },
                { href: '/coach', label: 'Talk to Andrew', icon: <MessageCircle className="w-4 h-4" /> },
                { href: '/gto', label: 'GTO Trainer', icon: <BarChart3 className="w-4 h-4" /> },
                { href: '/learn', label: 'Learn Variants', icon: <TrendingUp className="w-4 h-4" /> },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <span className="text-gold/50 group-hover:text-gold transition-colors">
                    {link.icon}
                  </span>
                  {link.label}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Tournament Modal ── */}
      <AnimatePresence>
        {showTournamentModal && (
          <TournamentModal onClose={() => setShowTournamentModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
