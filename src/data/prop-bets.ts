export interface PropBet {
  id: string;
  title: string;
  year: number;
  participants: string[];
  story: string;
  amount: string;
  outcome: string;
  category: 'physical' | 'endurance' | 'skill' | 'lifestyle' | 'absurd';
}

export const propBets: PropBet[] = [
  {
    id: 'zembic-implants',
    title: 'Brian Zembic Gets Breast Implants for $100,000',
    year: 1996,
    participants: ['Brian Zembic'],
    story: 'Professional gambler Brian Zembic was bet $100,000 that he wouldn\'t get breast implants and keep them for a year. Zembic, never one to back down from a bet, got the surgery. The twist? He kept the implants for over 20 YEARS, claiming he grew to like them. He was earning interest on the original bet money the entire time.',
    amount: '$100,000',
    outcome: 'Won — and kept the implants for 20+ years',
    category: 'absurd',
  },
  {
    id: 'slim-riggs-pingpong',
    title: 'Amarillo Slim Beats Bobby Riggs at Table Tennis with a Skillet',
    year: 1975,
    participants: ['Amarillo Slim', 'Bobby Riggs'],
    story: 'Amarillo Slim, the legendary poker player and hustler, challenged tennis champion Bobby Riggs to a table tennis match — but with a catch. Slim got to choose the paddles. Slim chose cast-iron skillets. While Riggs was an athletic champion, the heavy skillets neutralized his finesse game. Slim had secretly practiced with skillets for months. He won the bet easily.',
    amount: '$10,000',
    outcome: 'Slim won — months of secret practice with skillets paid off',
    category: 'skill',
  },
  {
    id: 'laak-marathon',
    title: 'Phil Laak\'s 115-Hour Poker Marathon',
    year: 2010,
    participants: ['Phil Laak'],
    story: 'Phil "The Unabomber" Laak set out to break the world record for the longest continuous poker session. He played for an staggering 115 hours straight at the Bellagio in Las Vegas — that\'s nearly 5 full days of continuous poker. He took short breaks for stretching and bathroom but never slept. He even ended up ahead in the game, booking a profit during his marathon.',
    amount: 'World Record + Charity',
    outcome: 'Set the world record at 115 hours and booked a profit',
    category: 'endurance',
  },
  {
    id: 'seed-putting',
    title: 'Huck Seed\'s 10-to-1 Putting Bet',
    year: 2001,
    participants: ['Huck Seed', 'Doyle Brunson'],
    story: 'WSOP champion Huck Seed, a natural athlete, bet several poker pros that he could make a putt of varying distances. He got 10-to-1 odds on increasingly difficult putts. What the pros didn\'t know was that Seed had been secretly practicing putting for months. He drained putt after putt, winning hundreds of thousands of dollars from stunned poker players who thought they were giving him a sucker bet.',
    amount: 'Hundreds of thousands',
    outcome: 'Seed cleaned up — secret practice strikes again',
    category: 'skill',
  },
  {
    id: 'forrest-matusow-weight',
    title: 'Ted Forrest\'s Extreme Weight Loss Bet with Mike Matusow',
    year: 2010,
    participants: ['Ted Forrest', 'Mike Matusow'],
    story: 'Mike Matusow bet Ted Forrest $2 million that Forrest couldn\'t drop from 188 pounds to 140 pounds in a few months. Forrest, known for his iron will, went on an extreme diet and exercise regimen. He ran miles daily in the Las Vegas heat wearing heavy clothing to sweat off weight. He hit his target weight just before the deadline, winning the bet — but the extreme weight loss was dangerous and concerning to friends.',
    amount: '$2,000,000',
    outcome: 'Forrest won — dropped 48 pounds in months',
    category: 'physical',
  },
  {
    id: 'oancea-running',
    title: 'Rich Alati\'s 30-Day Darkness Challenge',
    year: 2018,
    participants: ['Rich Alati', 'Rory Young'],
    story: 'Poker pro Rich Alati bet $100,000 that he could stay in complete darkness in a bathroom-sized room for 30 full days. No light, no phone, no human contact — just darkness. He lasted 20 days before the two parties settled for $62,400. Alati reported hallucinations, loss of time perception, and extreme psychological difficulty, but said the experience was transformative.',
    amount: '$100,000 (settled at $62,400)',
    outcome: 'Settled at day 20 — $62,400 to Alati',
    category: 'endurance',
  },
  {
    id: 'esfandiari-pee-device',
    title: 'Antonio Esfandiari\'s Under-Table Solution',
    year: 2014,
    participants: ['Antonio Esfandiari'],
    story: 'During the Big One for One Drop tournament (with a $1 million buy-in), Antonio Esfandiari rigged up a device under the table so he could urinate without having to leave his seat and miss hands. When this was discovered, the WSOP wasn\'t amused — he was penalized. The incident became one of the most talked-about moments in WSOP history.',
    amount: 'Pride and a WSOP penalty',
    outcome: 'Got caught and penalized — but the legend lives on',
    category: 'absurd',
  },
  {
    id: 'galfond-challenge',
    title: 'Phil Galfond\'s Galfond Challenge',
    year: 2020,
    participants: ['Phil Galfond', 'VeniVidi1993'],
    story: 'Phil Galfond, one of the best PLO players in history, created the "Galfond Challenge" — inviting anyone to play him heads-up PLO for $100+ stakes with a side bet of $250,000. His first challenger, "VeniVidi1993," jumped out to a $900,000 lead. Galfond staged the greatest comeback in online poker history, grinding back over 15,000 hands to eventually win the challenge by $1.7 million total (including the side bet).',
    amount: '$250,000 side bet + session winnings',
    outcome: 'Galfond came back from $900K down to win $1.7M total',
    category: 'skill',
  },
];
