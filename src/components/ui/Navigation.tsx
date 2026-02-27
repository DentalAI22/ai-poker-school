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
} from 'lucide-react';

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
  const pathname = usePathname();

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
            <Link
              href="/coach"
              className="btn-gold text-sm !py-2 !px-4"
            >
              Talk to Andrew
            </Link>
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
              <div className="pt-3 border-t border-white/5">
                <Link
                  href="/coach"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold block text-center text-sm"
                >
                  Talk to Andrew
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
