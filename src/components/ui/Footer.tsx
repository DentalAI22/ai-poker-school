import Link from 'next/link';
import { Spade } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Spade className="w-5 h-5 text-dark-bg" />
              </div>
              <span className="text-lg font-bold text-gold-gradient">AI Poker School</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              The world&apos;s most advanced AI poker coach. Master GTO strategy across 25+ game types.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-500">
                Powered by AI
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Learn</h4>
            <ul className="space-y-2">
              <li><Link href="/learn" className="text-sm text-gray-500 hover:text-gold transition-colors">All Variants</Link></li>
              <li><Link href="/learn/no-limit-holdem" className="text-sm text-gray-500 hover:text-gold transition-colors">No-Limit Hold&apos;em</Link></li>
              <li><Link href="/learn/pot-limit-omaha" className="text-sm text-gray-500 hover:text-gold transition-colors">Pot-Limit Omaha</Link></li>
              <li><Link href="/gto" className="text-sm text-gray-500 hover:text-gold transition-colors">GTO Trainer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Play</h4>
            <ul className="space-y-2">
              <li><Link href="/play" className="text-sm text-gray-500 hover:text-gold transition-colors">Interactive Table</Link></li>
              <li><Link href="/coach" className="text-sm text-gray-500 hover:text-gold transition-colors">Coach Andrew</Link></li>
              <li><Link href="/history" className="text-sm text-gray-500 hover:text-gold transition-colors">Poker History</Link></li>
              <li><Link href="/trivia" className="text-sm text-gray-500 hover:text-gold transition-colors">Trivia</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-gold transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray-500 hover:text-gold transition-colors">Dashboard</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-gold transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs text-gray-600 text-center">
            AI Poker School is for educational simulation purposes only. No real money wagering.
          </p>
          <p className="text-xs text-gray-700 text-center mt-2">
            &copy; {new Date().getFullYear()} AI Poker School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
