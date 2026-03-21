'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Spade,
  GraduationCap,
  BarChart3,
  History,
  HelpCircle,
  CreditCard,
  LayoutDashboard,
  Menu,
  X,
  MessageCircle,
  LogIn,
  LogOut,
  User,
  Crown,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const navItems = [
  { href: '/play', label: 'Play', icon: Spade },
  { href: '/coach', label: 'Coach', icon: MessageCircle },
  { href: '/learn', label: 'Learn', icon: GraduationCap },
  { href: '/gto', label: 'GTO', icon: BarChart3 },
  { href: '/history', label: 'History', icon: History },
  { href: '/trivia', label: 'Trivia', icon: HelpCircle },
  { href: '/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { user, profile, signInWithGoogle, signOut, loading, isPro } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <Spade className="w-5 h-5 text-dark-bg" />
            </div>
            <span className="text-lg font-bold text-gold-gradient hidden sm:block">
              AI Poker School
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gold/10 text-gold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-gold/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-gold" />
                    </div>
                  )}
                  {isPro && (
                    <Crown className="w-4 h-4 text-gold" />
                  )}
                </button>

                {/* User dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-card-bg border border-white/10 shadow-2xl overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-sm font-semibold text-white truncate">
                          {profile?.display_name || 'Player'}
                        </p>
                        <p className="text-xs text-white/30 truncate">
                          {user.email}
                        </p>
                        {isPro ? (
                          <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold text-gold">
                            <Crown className="w-3 h-3" /> Pro Member
                          </span>
                        ) : (
                          <Link
                            href="/pricing"
                            onClick={() => setShowUserMenu(false)}
                            className="inline-flex items-center gap-1 mt-1 text-xs font-bold text-gold hover:text-gold-light transition-colors"
                          >
                            <Crown className="w-3 h-3" /> Upgrade to Pro
                          </Link>
                        )}
                      </div>
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400/70 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
                <Link
                  href="/coach"
                  className="btn-gold text-sm !py-2 !px-4"
                >
                  Talk to Andrew
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/5"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-white/5 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full border-2 border-gold/30" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-gold" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {profile?.display_name || 'Player'}
                        </p>
                        <p className="text-xs text-white/30">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signInWithGoogle();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <LogIn className="w-5 h-5" />
                      Sign In with Google
                    </button>
                    <Link
                      href="/coach"
                      onClick={() => setMobileOpen(false)}
                      className="btn-gold block text-center text-sm"
                    >
                      Talk to Andrew
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
