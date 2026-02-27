'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  ChevronDown,
  Trophy,
  Star,
  DollarSign,
  Users,
  Sparkles,
  Spade,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface Era {
  years: string;
  title: string;
  description: string;
  events: string[];
  players: string[];
  color: string;
}

interface LegendaryPlayer {
  name: string;
  nickname: string;
  bio: string;
  bracelets: number;
  earnings: string;
  initials: string;
  gradient: string;
}

interface WSOPWinner {
  year: number;
  winner: string;
  prize: string;
  entries: string;
  notable: string;
}

interface FamousHand {
  title: string;
  year: number;
  description: string;
  players: string;
}

interface PropBet {
  title: string;
  story: string;
  outcome: string;
}

/* ─────────────────────────────────────────────────────────────
   FALLBACK DATA
   ───────────────────────────────────────────────────────────── */

const ERAS: Era[] = [
  {
    years: '1800s',
    title: 'The Birth of Poker',
    description: 'Poker evolves from various European card games on Mississippi riverboats. The full 52-card deck becomes standard by 1834.',
    events: [
      'Poker emerges on Mississippi riverboats in the early 1800s',
      '52-card deck becomes standard (1834)',
      'Draw poker and stud poker variants develop',
      'Poker spreads westward during the Gold Rush',
    ],
    players: ['Jonathan H. Green (first to document poker rules)', 'Riverboat gamblers'],
    color: '#8b5e3c',
  },
  {
    years: '1900-1969',
    title: 'The Underground Era',
    description: 'Poker thrives in underground card rooms and home games across America. Texas road gamblers develop the modern game.',
    events: [
      'Texas road gamblers refine No-Limit strategy',
      'Las Vegas legalized gambling (1931)',
      'Underground poker scene flourishes in NYC and Texas',
      'Johnny Moss vs. Nick "The Greek" Dandalos marathon (1949)',
    ],
    players: ['Johnny Moss', 'Nick "The Greek" Dandalos', 'Sailor Roberts', 'Amarillo Slim'],
    color: '#b8922f',
  },
  {
    years: '1970-1999',
    title: 'The World Series Era',
    description: 'Benny Binion creates the WSOP. Doyle Brunson publishes Super System. Poker begins its transformation from underground game to mainstream.',
    events: [
      'First WSOP held at Binion\'s Horseshoe (1970)',
      'Doyle Brunson publishes Super System (1978)',
      'Bobby Baldwin wins WSOP at age 28 (1978)',
      'Stu Ungar wins three WSOP Main Events',
      'Late Night Poker debuts on Channel 4 UK (1999)',
    ],
    players: ['Doyle Brunson', 'Stu Ungar', 'Johnny Chan', 'Phil Hellmuth', 'Bobby Baldwin'],
    color: '#d4a843',
  },
  {
    years: '2000-2010',
    title: 'The Poker Boom',
    description: 'Chris Moneymaker wins the WSOP Main Event via online satellite, igniting the global poker explosion. Online poker revolutionizes the game.',
    events: [
      'Hole-cam technology revolutionizes TV poker',
      'Chris Moneymaker wins WSOP Main Event (2003)',
      'Online poker explodes globally',
      'WSOP Main Event grows to 8,773 entries (2006)',
      'Jerry Yang wins $8.25M in record-breaking 2006 field',
      'Black Friday shuts down US online poker (April 15, 2011)',
    ],
    players: ['Chris Moneymaker', 'Daniel Negreanu', 'Phil Ivey', 'Tom Dwan', 'Patrik Antonius'],
    color: '#22c55e',
  },
  {
    years: '2011-Present',
    title: 'The Solver Era',
    description: 'GTO solvers transform strategy. AI (Libratus, Pluribus) defeats top pros. High-roller tournaments and streaming reshape the game.',
    events: [
      'Libratus defeats top pros at Heads-Up NLHE (2017)',
      'Pluribus beats 5 pros simultaneously in 6-max (2019)',
      'GTO solvers become standard training tools',
      'Live streaming on Twitch/YouTube creates new stars',
      'Record $300M+ won by Justin Bonomo in 2018',
      'Online poker experiences pandemic boom (2020)',
    ],
    players: ['Justin Bonomo', 'Bryn Kenney', 'Fedor Holz', 'Jason Koon', 'Phil Galfond'],
    color: '#3b82f6',
  },
];

const LEGENDARY_PLAYERS: LegendaryPlayer[] = [
  {
    name: 'Doyle Brunson',
    nickname: 'Texas Dolly',
    bio: 'The godfather of modern poker. Two-time WSOP Main Event champion and author of Super System, the bible of poker. His 10-2 hand became legendary after winning back-to-back Main Events.',
    bracelets: 10,
    earnings: '$6.1M',
    initials: 'DB',
    gradient: 'from-gold to-gold-dark',
  },
  {
    name: 'Phil Ivey',
    nickname: 'The Tiger Woods of Poker',
    bio: 'Widely considered the best all-around poker player of all time. Known for his incredible reads, composure, and ability to dominate across all formats. Has won over $30M in tournaments alone.',
    bracelets: 10,
    earnings: '$38.6M',
    initials: 'PI',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Daniel Negreanu',
    nickname: 'Kid Poker',
    bio: 'The most charismatic player in poker history. Famous for his soul reads and table talk. Six-time WSOP bracelet winner and the face of poker for a generation.',
    bracelets: 6,
    earnings: '$49.3M',
    initials: 'DN',
    gradient: 'from-red-500 to-red-700',
  },
  {
    name: 'Phil Hellmuth',
    nickname: 'The Poker Brat',
    bio: 'Holds the all-time record for WSOP bracelets with 17. Known for dramatic entrances and emotional outbursts, but his results are undeniable. Won the Main Event at age 24.',
    bracelets: 17,
    earnings: '$28.9M',
    initials: 'PH',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Stu Ungar',
    nickname: 'The Kid',
    bio: 'Perhaps the greatest natural talent in poker history. Won three WSOP Main Events. His genius-level card ability was unmatched, but his personal demons cut his career tragically short.',
    bracelets: 5,
    earnings: '$3.6M',
    initials: 'SU',
    gradient: 'from-amber-500 to-amber-700',
  },
  {
    name: 'Chris Moneymaker',
    nickname: 'The Man Who Changed Poker',
    bio: 'An amateur accountant who won his $10K WSOP entry through a $39 online satellite. His 2003 Main Event victory triggered the poker boom that brought millions of new players to the game.',
    bracelets: 1,
    earnings: '$3.9M',
    initials: 'CM',
    gradient: 'from-green-500 to-green-700',
  },
  {
    name: 'Tom Dwan',
    nickname: 'durrrr',
    bio: 'The fearless online high-stakes legend who became famous for his aggressive play and million-dollar sessions. Known for the durrrr Challenge and some of the biggest televised pots in history.',
    bracelets: 0,
    earnings: '$8.8M',
    initials: 'TD',
    gradient: 'from-cyan-500 to-cyan-700',
  },
  {
    name: 'Vanessa Selbst',
    nickname: 'The Professor',
    bio: 'The most decorated female poker player of all time. Three WSOP bracelets and over $11M in earnings. A Yale Law graduate who brought elite analytical thinking to the felt.',
    bracelets: 3,
    earnings: '$11.9M',
    initials: 'VS',
    gradient: 'from-pink-500 to-pink-700',
  },
];

const WSOP_WINNERS: WSOPWinner[] = [
  { year: 2024, winner: 'Jonathan Tamayo', prize: '$10M', entries: '10,112', notable: 'Set new WSOP entry record' },
  { year: 2023, winner: 'Daniel Weinman', prize: '$12.1M', entries: '10,043', notable: 'First to surpass $12M first prize' },
  { year: 2022, winner: 'Espen Jorstad', prize: '$10M', entries: '8,663', notable: 'Norway\'s first Main Event champ' },
  { year: 2021, winner: 'Koray Aldemir', prize: '$8M', entries: '6,650', notable: 'German pro captures title' },
  { year: 2019, winner: 'Hossein Ensan', prize: '$10M', entries: '8,569', notable: 'At 55, one of the oldest winners' },
  { year: 2018, winner: 'John Cynn', prize: '$8.8M', entries: '7,874', notable: 'Record-long heads-up battle (10hrs)' },
  { year: 2017, winner: 'Scott Blumstein', prize: '$8.15M', entries: '7,221', notable: 'Dominated final table wire-to-wire' },
  { year: 2016, winner: 'Qui Nguyen', prize: '$8M', entries: '6,737', notable: 'Wild, aggressive play stunned pros' },
  { year: 2015, winner: 'Joe McKeehen', prize: '$7.68M', entries: '6,420', notable: 'Led wire-to-wire from Day 7' },
  { year: 2014, winner: 'Martin Jacobson', prize: '$10M', entries: '6,683', notable: 'First guaranteed $10M first prize' },
  { year: 2006, winner: 'Jamie Gold', prize: '$12M', entries: '8,773', notable: 'Largest field and prize in history (at the time)' },
  { year: 2003, winner: 'Chris Moneymaker', prize: '$2.5M', entries: '839', notable: 'The $39 satellite that changed poker' },
  { year: 1998, winner: 'Scotty Nguyen', prize: '$1M', entries: '350', notable: '"You call, it\'s gonna be all over baby"' },
  { year: 1988, winner: 'Johnny Chan', prize: '$700K', entries: '167', notable: 'Back-to-back Main Event wins' },
  { year: 1976, winner: 'Doyle Brunson', prize: '$220K', entries: '22', notable: 'Won with 10-2 (again in 1977!)' },
  { year: 1970, winner: 'Johnny Moss', prize: 'Silver Cup', entries: '7', notable: 'Very first WSOP champion (voted by peers)' },
];

const FAMOUS_HANDS: FamousHand[] = [
  {
    title: 'Moneymaker vs. Farha — The Bluff That Changed Poker',
    year: 2003,
    description: 'Chris Moneymaker pushed all-in with K5 on a board of Js-5s-4s-5h-Jh against Sam Farha\'s 9s-8s, making Farha fold what would have been a winning hand. This bluff in the WSOP Main Event finale became the most famous hand in history and launched the poker boom.',
    players: 'Chris Moneymaker vs. Sam Farha',
  },
  {
    title: 'Dwan vs. Greenstein — The Million Dollar Pot',
    year: 2008,
    description: 'On High Stakes Poker, Tom "durrrr" Dwan 4-bet jammed with 2-4 offsuit for over $900,000 against Barry Greenstein\'s pocket aces. Dwan hit a miracle straight to win one of the largest televised pots ever.',
    players: 'Tom Dwan vs. Barry Greenstein',
  },
  {
    title: 'Negreanu\'s Soul Read on Matas',
    year: 2008,
    description: 'Daniel Negreanu called out his opponent\'s exact hand (Ace-Ten) in a WSOP event, perfectly reading his betting pattern and physical tells. The clip became one of the most shared moments in poker history.',
    players: 'Daniel Negreanu',
  },
  {
    title: 'Chan vs. Seidel — Rounders Made Famous',
    year: 1988,
    description: 'Johnny Chan flopped the nut straight against Erik Seidel\'s top pair in the WSOP Main Event heads-up. The hand was immortalized in the opening scene of "Rounders," introducing poker to a new generation.',
    players: 'Johnny Chan vs. Erik Seidel',
  },
  {
    title: 'Ivey vs. Jackson — The $1.2M Bluff',
    year: 2005,
    description: 'Phil Ivey fired three massive barrels with just Queen-high against Paul Jackson at the Monte Carlo Millions, forcing a fold and winning over $1M. A masterclass in reading weakness and applying pressure.',
    players: 'Phil Ivey vs. Paul Jackson',
  },
];

const PROP_BETS: PropBet[] = [
  {
    title: 'The Erick Lindgren Cross-Country Run',
    story: 'Pro poker player Erick Lindgren bet that he could run an entire marathon (26.2 miles) with zero training. He completed it in under 6 hours, winning over $300,000 in prop bets from fellow pros.',
    outcome: 'WON — Finished in 5 hours, 49 minutes.',
  },
  {
    title: 'The $2M Weight Loss Bet',
    story: 'In 2018, Bill Perkins bet fellow high-roller Dan Bilzerian $600K that he couldn\'t gain or lose a specific amount of weight in a set time. These physical prop bets are a poker tradition worth millions.',
    outcome: 'Various outcomes — the culture of body transformation bets continues.',
  },
  {
    title: 'Ashton Griffin\'s 70-Mile Ultramarathon',
    story: 'Online poker legend Ashton Griffin bet that he could complete a 70-mile ultramarathon in under 24 hours with no formal training. Multiple pros had action totaling over $500K.',
    outcome: 'WON — Completed it in approximately 22 hours.',
  },
  {
    title: 'Phil Galfond Challenge',
    story: 'Phil Galfond offered an open challenge: play him heads-up PLO for 25,000 hands. If you won, he\'d pay 1.5x. Multiple challengers took him on for stakes reaching $100/$200 and higher.',
    outcome: 'Galfond overcame massive deficits to win most challenges, including a legendary $900K comeback.',
  },
  {
    title: 'The Hellmuth vs. Everyone Prop Bets',
    story: 'Phil Hellmuth has a storied history of wild prop bets, including betting he could beat anyone heads-up, golf challenges against pros, and predictions about his own WSOP bracelet count.',
    outcome: 'Mixed results, but always entertaining.',
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────────────────────── */

function TimelineItem({ era, index }: { era: Era; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 md:left-3 top-0 bottom-0 w-px bg-white/10" />

      {/* Dot */}
      <div
        className="absolute left-[-5px] md:left-[7px] top-1 w-3 h-3 rounded-full border-2"
        style={{ backgroundColor: era.color, borderColor: era.color }}
      />

      {/* Content */}
      <div className="card-gold-border p-6">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3"
          style={{ backgroundColor: `${era.color}20`, color: era.color }}
        >
          {era.years}
        </span>
        <h3 className="text-xl font-bold text-white mb-2">{era.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-4">{era.description}</p>

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider">Key Events</h4>
          <ul className="space-y-1">
            {era.events.map((event, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <span className="text-gold mt-1.5 text-[8px]">&#9670;</span>
                {event}
              </li>
            ))}
          </ul>
        </div>

        {era.players.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {era.players.map((player, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/40"
              >
                {player}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PlayerCard({ player }: { player: LegendaryPlayer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="card-gold-border p-5 flex flex-col cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${player.gradient} flex items-center justify-center shrink-0`}
        >
          <span className="text-white font-bold text-lg">{player.initials}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-white">{player.name}</h3>
          <p className="text-sm text-gold/70 italic">&ldquo;{player.nickname}&rdquo;</p>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs text-white/50">{player.bracelets} bracelets</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-white/50">{player.earnings}</span>
            </div>
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-white/20 transition-transform shrink-0 mt-1 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/50 leading-relaxed mt-4 pt-4 border-t border-white/5">
              {player.bio}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ExpandableCard({
  title,
  children,
  badge,
}: {
  title: string;
  children: React.ReactNode;
  badge?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-gold-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors">
            {title}
          </h4>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold/70">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/20 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function HistoryPage() {
  // Attempt data import with fallback
  let eras = ERAS;
  let players = LEGENDARY_PLAYERS;
  let wsopWinners = WSOP_WINNERS;
  let famousHands = FAMOUS_HANDS;
  let propBets = PROP_BETS;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const imported = require('@/data/poker-history');
    if (imported.eras) eras = imported.eras;
    if (imported.legendaryPlayers) players = imported.legendaryPlayers;
    if (imported.wsopWinners) wsopWinners = imported.wsopWinners;
    if (imported.famousHands) famousHands = imported.famousHands;
    if (imported.propBets) propBets = imported.propBets;
  } catch {
    // Use fallback data
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
          <History className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium text-gold">200+ Years of Cards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
          The History of <span className="text-gold-gradient">Poker</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          From Mississippi riverboats to AI solvers. The wild, fascinating story of the world&apos;s greatest card game.
        </p>
      </motion.div>

      {/* ── Timeline ── */}
      <section className="mb-20">
        <div className="relative">
          {eras.map((era, i) => (
            <TimelineItem key={era.years} era={era} index={i} />
          ))}
        </div>
      </section>

      {/* ── Legendary Players ── */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-6 h-6 text-gold" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Legendary <span className="text-gold-gradient">Players</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm">
            Click any card to read the full story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {players.map((player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>
      </section>

      {/* ── WSOP Main Event Winners ── */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-gold" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              WSOP Main Event <span className="text-gold-gradient">Winners</span>
            </h2>
          </div>
        </motion.div>

        <div className="card-gold-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-xs font-bold text-white/40 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white/40 uppercase tracking-wider">Winner</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white/40 uppercase tracking-wider">Prize</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white/40 uppercase tracking-wider hidden sm:table-cell">Entries</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white/40 uppercase tracking-wider hidden md:table-cell">Notable</th>
                </tr>
              </thead>
              <tbody>
                {wsopWinners.map((w, i) => (
                  <motion.tr
                    key={w.year}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 font-bold text-gold">{w.year}</td>
                    <td className="px-4 py-3 text-white font-medium">{w.winner}</td>
                    <td className="px-4 py-3 text-green-400 font-mono">{w.prize}</td>
                    <td className="px-4 py-3 text-white/50 hidden sm:table-cell">{w.entries}</td>
                    <td className="px-4 py-3 text-white/40 text-xs hidden md:table-cell">{w.notable}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Famous Hands ── */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Spade className="w-6 h-6 text-gold" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Famous <span className="text-gold-gradient">Hands</span>
            </h2>
          </div>
        </motion.div>

        <div className="space-y-3">
          {famousHands.map((hand) => (
            <ExpandableCard
              key={hand.title}
              title={hand.title}
              badge={String(hand.year)}
            >
              <p className="text-sm text-white/50 leading-relaxed mb-2">
                {hand.description}
              </p>
              <p className="text-xs text-gold/60">
                <Users className="w-3 h-3 inline mr-1" />
                {hand.players}
              </p>
            </ExpandableCard>
          ))}
        </div>
      </section>

      {/* ── Wild Prop Bets ── */}
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-gold" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Wild <span className="text-gold-gradient">Prop Bets</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm">
            The craziest side bets in poker history.
          </p>
        </motion.div>

        <div className="space-y-3">
          {propBets.map((bet) => (
            <ExpandableCard key={bet.title} title={bet.title}>
              <p className="text-sm text-white/50 leading-relaxed mb-3">
                {bet.story}
              </p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gold/5 border border-gold/10">
                <Trophy className="w-4 h-4 text-gold shrink-0" />
                <span className="text-xs text-gold/80">{bet.outcome}</span>
              </div>
            </ExpandableCard>
          ))}
        </div>
      </section>
    </div>
  );
}
