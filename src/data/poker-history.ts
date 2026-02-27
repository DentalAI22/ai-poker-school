// ============================================================================
// Poker History — Comprehensive data covering eras, WSOP winners, and legends
// ============================================================================

// ---------------------------------------------------------------------------
// 1. Poker Eras
// ---------------------------------------------------------------------------

export interface PokerEra {
  id: string;
  name: string;
  yearRange: string;
  description: string;
  keyEvents: string[];
  keyPlayers: string[];
}

export const pokerEras: PokerEra[] = [
  {
    id: 'origins',
    name: 'Origins',
    yearRange: '1800s',
    description:
      'Poker emerged in the early 19th century along the Mississippi River, spreading through riverboat gambling halls and frontier saloons. The game evolved from earlier card games like the French poque and the German pochen. By the Civil War era, poker had become an American institution, associated with the rough-and-tumble culture of the Wild West. Five-card draw was the dominant variant, and legends of high-stakes games, cheating, and gunfights cemented poker in the national mythology.',
    keyEvents: [
      'Poker first documented in New Orleans around 1829, played with a 20-card deck',
      'The full 52-card deck adopted by the 1840s, enabling draw and stud variants',
      'Riverboat gambling flourishes on the Mississippi River throughout the 1840s-1860s',
      'Wild Bill Hickok shot dead holding Aces and Eights (the "Dead Man\'s Hand") in 1876',
      'Poker spreads west with Gold Rush miners and frontier settlers',
      'The straight and flush are officially recognized as poker hands by the 1860s',
      'Stud poker emerges during the Civil War as soldiers play between battles',
    ],
    keyPlayers: [
      'Wild Bill Hickok',
      'Doc Holliday',
      'Bat Masterson',
      'Wyatt Earp',
    ],
  },
  {
    id: 'early-wsop',
    name: 'Early WSOP Era',
    yearRange: '1970-1985',
    description:
      'Benny Binion, the legendary Las Vegas casino owner, invited the best poker players in the world to his Horseshoe Casino in 1970 for what would become the World Series of Poker. The early years were an intimate gathering of road gamblers, Texas rounders, and card-room hustlers. Players like Johnny Moss, Doyle Brunson, and Amarillo Slim brought national attention to the game. Brunson\'s "Super/System" in 1978 became the first major poker strategy book, forever changing how the game was studied.',
    keyEvents: [
      'First WSOP held at Binion\'s Horseshoe Casino in 1970 with a handful of players',
      'Johnny Moss voted inaugural champion by his peers in 1970',
      'Amarillo Slim wins the 1972 Main Event and appears on The Tonight Show with Johnny Carson',
      'Doyle Brunson wins back-to-back Main Events in 1976 and 1977, both with 10-2',
      'Doyle Brunson publishes "Super/System" in 1978, the first major poker strategy book',
      'Bobby Baldwin wins the 1978 Main Event at age 28, one of the youngest at the time',
      'Stu Ungar wins his first of three Main Events in 1980 at age 27',
      'Jack Straus wins the 1982 Main Event after coming back from a single chip',
      'Tom McEvoy wins the 1983 Main Event as the first satellite qualifier to take the title',
    ],
    keyPlayers: [
      'Benny Binion',
      'Johnny Moss',
      'Doyle Brunson',
      'Amarillo Slim',
      'Stu Ungar',
      'Bobby Baldwin',
      'Jack Straus',
      'Puggy Pearson',
      'Sailor Roberts',
      'Crandell Addington',
    ],
  },
  {
    id: 'modern',
    name: 'Modern Era',
    yearRange: '1985-2003',
    description:
      'The modern era saw poker transition from a niche gambling pastime to a televised spectacle. Phil Hellmuth burst onto the scene in 1989 as the youngest-ever Main Event champion at 24. Johnny Chan\'s back-to-back victories in 1987-88 were immortalized in the film "Rounders." The introduction of the lipstick camera on the World Poker Tour in 2002 allowed TV audiences to see players\' hole cards for the first time, creating dramatic tension and laying the groundwork for the poker boom. Online poker sites like Planet Poker (1998) and PokerStars (2001) began to emerge.',
    keyEvents: [
      'Berry Johnston wins the 1986 Main Event as the field grows to 141 players',
      'Johnny Chan wins back-to-back Main Events in 1987 and 1988',
      'Phil Hellmuth becomes the youngest Main Event champion in 1989 at age 24',
      'The movie "Rounders" (1998) starring Matt Damon and Ed Norton popularizes poker culture',
      'Planet Poker launches the first real-money online poker site in 1998',
      'Chris Ferguson wins the 2000 Main Event, bringing game theory to the table',
      'PokerStars launches in 2001, becoming the largest online poker site',
      'World Poker Tour debuts on the Travel Channel in 2002 with hole-card cameras',
      'Robert Varkonyi wins the 2002 Main Event as the field reaches 631 players',
      'Stu Ungar\'s tragic death in 1998 ends one of poker\'s most brilliant and troubled careers',
    ],
    keyPlayers: [
      'Phil Hellmuth',
      'Johnny Chan',
      'Stu Ungar',
      'Erik Seidel',
      'Dan Harrington',
      'Chris Ferguson',
      'T.J. Cloutier',
      'Men Nguyen',
      'Scotty Nguyen',
      'Huck Seed',
    ],
  },
  {
    id: 'poker-boom',
    name: 'The Poker Boom',
    yearRange: '2003-2011',
    description:
      'The poker boom was ignited in 2003 when Chris Moneymaker, an amateur accountant from Tennessee, turned a $39 online satellite into a $2.5 million WSOP Main Event victory. His everyman story inspired millions to take up the game, and online poker sites exploded in popularity. The WSOP Main Event field swelled from 839 in 2003 to a record 8,773 in 2006. Television coverage expanded massively with the World Poker Tour, High Stakes Poker, and Poker After Dark. Online poker generated billions in revenue, and a new generation of internet-trained pros emerged.',
    keyEvents: [
      'Chris Moneymaker wins the 2003 WSOP Main Event after qualifying through a $39 satellite',
      'The WSOP Main Event field explodes from 839 (2003) to 2,576 (2004) to 5,619 (2005)',
      'Greg Raymer wins the 2004 Main Event, another online qualifier success story',
      'ESPN\'s WSOP coverage becomes a ratings phenomenon',
      'Jamie Gold wins record $12 million first prize from 8,773 entries in 2006',
      'The Unlawful Internet Gambling Enforcement Act (UIGEA) passes in October 2006',
      'Jerry Yang wins the 2007 Main Event as fields begin to stabilize',
      'Peter Eastgate becomes the youngest Main Event champion in 2008 at age 22',
      'Joe Cada breaks the record in 2009, winning at age 21',
      'High Stakes Poker on GSN showcases the biggest cash games on television',
      'Jonathan Duhamel wins the 2010 Main Event, becoming the first Canadian champion',
    ],
    keyPlayers: [
      'Chris Moneymaker',
      'Daniel Negreanu',
      'Phil Ivey',
      'Tom Dwan',
      'Patrik Antonius',
      'Gus Hansen',
      'Antonio Esfandiari',
      'Barry Greenstein',
      'Jennifer Harman',
      'Vanessa Selbst',
    ],
  },
  {
    id: 'post-black-friday',
    name: 'Post-Black Friday',
    yearRange: '2011-2020',
    description:
      'On April 15, 2011 -- known as "Black Friday" -- the U.S. Department of Justice seized the domains of PokerStars, Full Tilt Poker, and Absolute Poker, effectively shutting down online poker for American players. The aftermath reshaped the poker world. Regulated online poker slowly emerged in states like Nevada, New Jersey, and Pennsylvania. Meanwhile, a revolution in poker strategy took hold as solver software and Game Theory Optimal (GTO) play became standard. The game became more mathematical and less intuitive, with a new generation of players studying solver outputs and range charts.',
    keyEvents: [
      'Black Friday: DOJ seizes major online poker sites on April 15, 2011',
      'Full Tilt Poker revealed to be insolvent, owing players over $300 million',
      'PokerStars acquires Full Tilt and repays players\' balances',
      'Nevada legalizes online poker in 2013, followed by New Jersey and Delaware',
      'The "GTO revolution" transforms poker strategy with solver-based play',
      'The WSOP Main Event "November Nine" format runs from 2008-2016',
      'Martin Jacobson wins the 2014 Main Event with dominant final table play',
      'Joe McKeehen dominates the 2015 Main Event final table',
      'Qui Nguyen wins the 2016 Main Event with an aggressive, unconventional style',
      'Scott Blumstein wins the 2017 Main Event for $8.15 million',
      'High-stakes online games move to international platforms like GGPoker and partypoker',
    ],
    keyPlayers: [
      'Fedor Holz',
      'Justin Bonomo',
      'Bryn Kenney',
      'Stephen Chidwick',
      'Jason Koon',
      'Dan Smith',
      'Adrian Mateos',
      'Ole Schemion',
      'Byron Kaverman',
      'Christoph Vogelsang',
    ],
  },
  {
    id: 'ai-era',
    name: 'The AI Era',
    yearRange: '2017-Present',
    description:
      'Artificial intelligence achieved a landmark breakthrough in poker when Carnegie Mellon University\'s Libratus defeated four top heads-up no-limit hold\'em professionals in a 20-day challenge in January 2017. Two years later, Pluribus -- also from CMU -- became the first AI to beat elite professionals in six-player no-limit hold\'em, a far more complex multiplayer setting. These achievements proved that AI could master imperfect-information games and had profound implications beyond poker for fields like cybersecurity, negotiations, and finance. The AI era has pushed human players to study even more deeply, incorporating AI-derived strategies into their play.',
    keyEvents: [
      'Libratus defeats four top pros in heads-up NLHE in January 2017 over 120,000 hands',
      'Pluribus beats elite pros in 6-player NLHE in 2019, solving multiplayer poker',
      'DeepStack independently solves heads-up NLHE using deep learning in 2017',
      'GTO solvers like PioSOLVER and MonkerSolver become standard training tools',
      'Solver-assisted play and range-based thinking dominate high-stakes competition',
      'Online poker experiences a massive resurgence during the COVID-19 pandemic in 2020',
      'WSOP moves online for the first time in 2020 due to the pandemic',
      'Espen Jorstad wins the 2022 Main Event for $10 million',
      'Daniel Weinman wins the 2023 Main Event for $12.1 million from a record 10,043 entries',
      'Jonathan Tamayo wins the 2024 Main Event for $10 million',
      'AI coaching tools and real-time solvers spark debates about fair play and integrity',
    ],
    keyPlayers: [
      'Libratus (AI)',
      'Pluribus (AI)',
      'Phil Ivey',
      'Justin Bonomo',
      'Bryn Kenney',
      'Ali Imsirovic',
      'Espen Jorstad',
      'Daniel Weinman',
      'Adrian Mateos',
      'Stephen Chidwick',
    ],
  },
];

// ---------------------------------------------------------------------------
// 2. WSOP Main Event Winners (1970-2024)
// ---------------------------------------------------------------------------

export interface WSOPWinner {
  year: number;
  winner: string;
  prize: string;
  entries: number;
  notable: string;
}

export const wsopWinners: WSOPWinner[] = [
  {
    year: 1970,
    winner: 'Johnny Moss',
    prize: 'No cash prize (voted by peers)',
    entries: 7,
    notable:
      'The first WSOP champion was chosen by a vote among the players. Moss was a legendary Texas road gambler.',
  },
  {
    year: 1971,
    winner: 'Johnny Moss',
    prize: '$30,000',
    entries: 6,
    notable:
      'Moss won the first freeze-out format Main Event, cementing his legacy as the game\'s original champion.',
  },
  {
    year: 1972,
    winner: 'Amarillo Slim',
    prize: '$80,000',
    entries: 8,
    notable:
      'Slim\'s charismatic personality landed him on The Tonight Show with Johnny Carson, bringing poker to mainstream America.',
  },
  {
    year: 1973,
    winner: 'Puggy Pearson',
    prize: '$130,000',
    entries: 13,
    notable:
      'Pearson was a pool hustler turned poker pro known for his colorful personality and all-around gambling skills.',
  },
  {
    year: 1974,
    winner: 'Johnny Moss',
    prize: '$160,000',
    entries: 16,
    notable:
      'Moss won his third and final championship at age 67, a record that stood for decades.',
  },
  {
    year: 1975,
    winner: 'Sailor Roberts',
    prize: '$210,000',
    entries: 21,
    notable:
      'Roberts was part of the original Texas road gambling trio alongside Brunson and Slim.',
  },
  {
    year: 1976,
    winner: 'Doyle Brunson',
    prize: '$220,000',
    entries: 22,
    notable:
      'Brunson won with 10-2 offsuit on the final hand, a holding that would become his signature.',
  },
  {
    year: 1977,
    winner: 'Doyle Brunson',
    prize: '$340,000',
    entries: 34,
    notable:
      'Brunson won his second consecutive title -- again with 10-2 on the final hand, an astonishing coincidence.',
  },
  {
    year: 1978,
    winner: 'Bobby Baldwin',
    prize: '$210,000',
    entries: 42,
    notable:
      'Baldwin later became president of the Bellagio and one of the most prominent figures in Las Vegas.',
  },
  {
    year: 1979,
    winner: 'Hal Fowler',
    prize: '$270,000',
    entries: 54,
    notable:
      'Fowler was a relatively unknown amateur, one of the first non-professionals to win the Main Event.',
  },
  {
    year: 1980,
    winner: 'Stu Ungar',
    prize: '$385,000',
    entries: 73,
    notable:
      'At 27, Ungar began his legendary run. Widely considered the greatest natural card player who ever lived.',
  },
  {
    year: 1981,
    winner: 'Stu Ungar',
    prize: '$375,000',
    entries: 75,
    notable:
      'Ungar won back-to-back, joining Moss and Brunson in the exclusive club of repeat champions.',
  },
  {
    year: 1982,
    winner: 'Jack Straus',
    prize: '$520,000',
    entries: 104,
    notable:
      'Straus famously came back from a single chip, coining the phrase "a chip and a chair."',
  },
  {
    year: 1983,
    winner: 'Tom McEvoy',
    prize: '$540,000',
    entries: 108,
    notable:
      'McEvoy was the first satellite qualifier to win the Main Event, foreshadowing the Moneymaker effect.',
  },
  {
    year: 1984,
    winner: 'Jack Keller',
    prize: '$660,000',
    entries: 132,
    notable:
      'Keller defeated a growing field as the WSOP continued to gain prestige and attract more players.',
  },
  {
    year: 1985,
    winner: 'Bill Smith',
    prize: '$700,000',
    entries: 140,
    notable:
      'Smith was a hard-drinking, fearless Texas poker player known for his aggressive style.',
  },
  {
    year: 1986,
    winner: 'Berry Johnston',
    prize: '$570,000',
    entries: 141,
    notable:
      'Johnston was a consistent tournament performer and a respected member of the old-school poker community.',
  },
  {
    year: 1987,
    winner: 'Johnny Chan',
    prize: '$625,000',
    entries: 152,
    notable:
      'The first of Chan\'s back-to-back victories. His play was later featured prominently in the movie "Rounders."',
  },
  {
    year: 1988,
    winner: 'Johnny Chan',
    prize: '$700,000',
    entries: 167,
    notable:
      'Chan\'s famous final hand against Erik Seidel became one of poker\'s most iconic moments, immortalized in "Rounders."',
  },
  {
    year: 1989,
    winner: 'Phil Hellmuth',
    prize: '$755,000',
    entries: 178,
    notable:
      'At 24, Hellmuth became the youngest Main Event champion in history, a record that stood until 2008.',
  },
  {
    year: 1990,
    winner: 'Mansour Matloubi',
    prize: '$895,000',
    entries: 194,
    notable:
      'Matloubi was the first non-American to win the Main Event, hailing from Wales (born in Iran).',
  },
  {
    year: 1991,
    winner: 'Brad Daugherty',
    prize: '$1,000,000',
    entries: 215,
    notable:
      'Daugherty became the first player to win a $1 million first prize at the WSOP Main Event.',
  },
  {
    year: 1992,
    winner: 'Hamid Dastmalchi',
    prize: '$1,000,000',
    entries: 201,
    notable:
      'Dastmalchi, born in Iran, was the second consecutive non-American-born champion.',
  },
  {
    year: 1993,
    winner: 'Jim Bechtel',
    prize: '$1,000,000',
    entries: 220,
    notable:
      'Bechtel was a cattle rancher from Arizona who played a steady, disciplined game to claim the title.',
  },
  {
    year: 1994,
    winner: 'Russ Hamilton',
    prize: '$1,000,000',
    entries: 268,
    notable:
      'Hamilton\'s legacy was later tarnished by the Ultimate Bet superuser cheating scandal.',
  },
  {
    year: 1995,
    winner: 'Dan Harrington',
    prize: '$1,000,000',
    entries: 273,
    notable:
      'Harrington, known as "Action Dan," later authored the influential "Harrington on Hold\'em" book series.',
  },
  {
    year: 1996,
    winner: 'Huck Seed',
    prize: '$1,000,000',
    entries: 295,
    notable:
      'Seed, a former Stanford math student, was known for his analytical approach and prop-betting exploits.',
  },
  {
    year: 1997,
    winner: 'Stu Ungar',
    prize: '$1,000,000',
    entries: 312,
    notable:
      'Ungar\'s triumphant return for a third title is considered one of poker\'s greatest stories. He died the following year.',
  },
  {
    year: 1998,
    winner: 'Scotty Nguyen',
    prize: '$1,000,000',
    entries: 350,
    notable:
      '"You call, it\'s gonna be all over, baby!" -- Nguyen\'s famous line on the final hand became a poker catchphrase.',
  },
  {
    year: 1999,
    winner: 'Noel Furlong',
    prize: '$1,000,000',
    entries: 393,
    notable:
      'Furlong, an Irish businessman, brought a lively European energy to the championship.',
  },
  {
    year: 2000,
    winner: 'Chris Ferguson',
    prize: '$1,500,000',
    entries: 512,
    notable:
      'Ferguson, known as "Jesus" for his long hair and sunglasses, was one of the first players to apply game theory to poker.',
  },
  {
    year: 2001,
    winner: 'Carlos Mortensen',
    prize: '$1,500,000',
    entries: 613,
    notable:
      'Mortensen, a Spanish pro born in Ecuador, played an aggressive style that dominated the final table.',
  },
  {
    year: 2002,
    winner: 'Robert Varkonyi',
    prize: '$2,000,000',
    entries: 631,
    notable:
      'Varkonyi was an amateur who famously shaved his head after Phil Hellmuth predicted he would not win.',
  },
  {
    year: 2003,
    winner: 'Chris Moneymaker',
    prize: '$2,500,000',
    entries: 839,
    notable:
      'The hand that launched a billion-dollar industry. Moneymaker\'s $39 online satellite win changed poker forever.',
  },
  {
    year: 2004,
    winner: 'Greg Raymer',
    prize: '$5,000,000',
    entries: 2576,
    notable:
      'Raymer, known as "Fossilman," was another online qualifier whose win validated the Moneymaker effect.',
  },
  {
    year: 2005,
    winner: 'Joe Hachem',
    prize: '$7,500,000',
    entries: 5619,
    notable:
      'Hachem, an Australian chiropractor, won the largest Main Event field at the time with a calm, methodical style.',
  },
  {
    year: 2006,
    winner: 'Jamie Gold',
    prize: '$12,000,000',
    entries: 8773,
    notable:
      'Gold won the largest first prize in WSOP history from the record field of 8,773 players.',
  },
  {
    year: 2007,
    winner: 'Jerry Yang',
    prize: '$8,250,000',
    entries: 6358,
    notable:
      'Yang, a Laotian refugee turned American citizen, pledged 10% of his winnings to charity.',
  },
  {
    year: 2008,
    winner: 'Peter Eastgate',
    prize: '$9,152,416',
    entries: 6844,
    notable:
      'At 22, Eastgate became the youngest Main Event champion in history, breaking Hellmuth\'s record.',
  },
  {
    year: 2009,
    winner: 'Joe Cada',
    prize: '$8,547,044',
    entries: 6494,
    notable:
      'Cada broke Eastgate\'s record immediately, winning at age 21 to become the youngest champion.',
  },
  {
    year: 2010,
    winner: 'Jonathan Duhamel',
    prize: '$8,944,310',
    entries: 7319,
    notable:
      'Duhamel became the first Canadian to win the Main Event, dominating heads-up play against John Racener.',
  },
  {
    year: 2011,
    winner: 'Pius Heinz',
    prize: '$8,715,638',
    entries: 6865,
    notable:
      'Heinz became the first German to win the Main Event, defeating Martin Staszko heads-up.',
  },
  {
    year: 2012,
    winner: 'Greg Merson',
    prize: '$8,531,853',
    entries: 6598,
    notable:
      'Merson overcame personal struggles with addiction to win the championship and turn his life around.',
  },
  {
    year: 2013,
    winner: 'Ryan Riess',
    prize: '$8,361,570',
    entries: 6352,
    notable:
      'Riess, a confident young pro from Michigan, defeated Jay Farber heads-up for the title.',
  },
  {
    year: 2014,
    winner: 'Martin Jacobson',
    prize: '$10,000,000',
    entries: 6683,
    notable:
      'Jacobson, a Swedish pro, played one of the most dominant final tables in Main Event history.',
  },
  {
    year: 2015,
    winner: 'Joe McKeehen',
    prize: '$7,683,346',
    entries: 6420,
    notable:
      'McKeehen entered the final table as massive chip leader and never relinquished control.',
  },
  {
    year: 2016,
    winner: 'Qui Nguyen',
    prize: '$8,005,310',
    entries: 6737,
    notable:
      'Nguyen, a Vietnamese-American recreational player, employed a wild and aggressive style.',
  },
  {
    year: 2017,
    winner: 'Scott Blumstein',
    prize: '$8,150,000',
    entries: 7221,
    notable:
      'Blumstein, a New Jersey player, won in the first year that the final table was played in July.',
  },
  {
    year: 2018,
    winner: 'John Cynn',
    prize: '$8,800,000',
    entries: 7874,
    notable:
      'Cynn won after the longest heads-up battle in Main Event history, lasting over 10 hours against Tony Miles.',
  },
  {
    year: 2019,
    winner: 'Hossein Ensan',
    prize: '$10,000,000',
    entries: 8569,
    notable:
      'Ensan, a German-Iranian player, won at age 55, becoming one of the oldest modern champions.',
  },
  {
    year: 2020,
    winner: 'Damian Salas',
    prize: '$1,553,256',
    entries: 1000,
    notable:
      'The 2020 Main Event was split into online and live portions due to COVID-19. Salas won the hybrid final.',
  },
  {
    year: 2021,
    winner: 'Koray Aldemir',
    prize: '$8,000,000',
    entries: 6650,
    notable:
      'Aldemir, a German high-stakes pro, won in the first full live Main Event since the pandemic.',
  },
  {
    year: 2022,
    winner: 'Espen Jorstad',
    prize: '$10,000,000',
    entries: 8663,
    notable:
      'Jorstad, a Norwegian poker pro, won the title and became a popular ambassador for the game.',
  },
  {
    year: 2023,
    winner: 'Daniel Weinman',
    prize: '$12,100,000',
    entries: 10043,
    notable:
      'The Main Event broke 10,000 entries for the first time. Weinman earned the largest prize in WSOP history.',
  },
  {
    year: 2024,
    winner: 'Jonathan Tamayo',
    prize: '$10,000,000',
    entries: 9164,
    notable:
      'Tamayo won a massive final table, continuing the trend of large fields in the modern WSOP era.',
  },
];

// ---------------------------------------------------------------------------
// 3. Legendary Player Profiles
// ---------------------------------------------------------------------------

export interface PlayerProfile {
  name: string;
  nickname: string;
  bio: string;
  achievements: string[];
  famousQuote: string;
  braceletCount: number;
  totalEarnings: string;
}

export const legendaryPlayers: PlayerProfile[] = [
  {
    name: 'Doyle Brunson',
    nickname: 'Texas Dolly',
    bio: 'Doyle Brunson is poker royalty -- a two-time WSOP Main Event champion and author of the groundbreaking strategy book "Super/System." Born in Longworth, Texas, in 1933, Brunson was a promising basketball player before a knee injury ended his athletic career and led him to the poker tables. He spent decades as a road gambler before settling in Las Vegas and becoming one of the founding fathers of professional poker. He passed away in 2023 at age 89.',
    achievements: [
      'Won back-to-back WSOP Main Events in 1976 and 1977',
      'Both final hands were 10-2 offsuit, now known as "a Doyle Brunson"',
      'Authored "Super/System" (1978), the first major poker strategy book',
      'Inducted into the Poker Hall of Fame in 1988',
      'Competed in WSOP events across six decades',
    ],
    famousQuote:
      'The key to No-Limit is to put a man to a decision for all his chips.',
    braceletCount: 10,
    totalEarnings: '$6,100,000+',
  },
  {
    name: 'Phil Hellmuth',
    nickname: 'The Poker Brat',
    bio: 'Phil Hellmuth holds the all-time record for WSOP bracelets and is one of the most polarizing figures in poker history. Known for his emotional outbursts and supreme confidence, Hellmuth became the youngest Main Event champion in 1989 at age 24. Despite his theatrics, his tournament record is unmatched in terms of consistency and bracelet wins, making him one of the greatest tournament players ever.',
    achievements: [
      'Record 17 WSOP bracelets (most all-time)',
      'Youngest Main Event champion in 1989 at age 24 (record stood until 2008)',
      'Most WSOP cashes and final table appearances in history',
      'Inducted into the Poker Hall of Fame in 2007',
      'Author of "Play Poker Like the Pros" and other strategy books',
    ],
    famousQuote:
      "If it weren't for luck, I'd win every one.",
    braceletCount: 17,
    totalEarnings: '$28,900,000+',
  },
  {
    name: 'Phil Ivey',
    nickname: 'The Tiger Woods of Poker',
    bio: 'Phil Ivey is widely regarded as the best all-around poker player in the world. Quiet and intensely focused at the table, Ivey excels in every form of poker -- tournaments, cash games, and mixed games alike. He began playing poker in Atlantic City as a teenager using a fake ID and quickly rose to prominence. His ability to read opponents and adapt to any situation is considered unparalleled.',
    achievements: [
      '10 WSOP bracelets across multiple poker variants',
      'Three World Poker Tour titles',
      'Consistent winner in the biggest cash games in the world',
      'Inducted into the Poker Hall of Fame in 2017',
      'Considered the best mixed-game player in poker history',
    ],
    famousQuote:
      "I don't play any two cards. I play position, I play people.",
    braceletCount: 11,
    totalEarnings: '$42,100,000+',
  },
  {
    name: 'Daniel Negreanu',
    nickname: 'Kid Poker',
    bio: "Daniel Negreanu is poker's greatest ambassador -- a charismatic, articulate Canadian who has brought more fans to the game than perhaps any other player. Known for his uncanny ability to read opponents and call out their exact holdings, Negreanu has been a dominant force in tournament poker for over two decades. He is a six-time WSOP bracelet winner and two-time WSOP Player of the Year.",
    achievements: [
      'Six WSOP bracelets',
      'Two WSOP Player of the Year awards (2004, 2013)',
      'Two World Poker Tour titles',
      'Named the best poker player of the decade by multiple publications (2000s)',
      'Inducted into the Poker Hall of Fame in 2014',
    ],
    famousQuote: 'Poker is 100% skill and 50% luck.',
    braceletCount: 6,
    totalEarnings: '$52,000,000+',
  },
  {
    name: 'Stu Ungar',
    nickname: 'The Kid',
    bio: "Stu Ungar may be the most naturally gifted card player who ever lived. A prodigy from New York's Lower East Side, Ungar won three WSOP Main Event titles and was virtually unbeatable at gin rummy. His photographic memory and extraordinary mathematical mind made him a force at any card game. Tragically, drug addiction ravaged his life and career. He was found dead in a Las Vegas motel room in 1998 at age 45, just one year after his miraculous third Main Event victory.",
    achievements: [
      'Three WSOP Main Event titles (1980, 1981, 1997)',
      'Considered by many to be the greatest card player in history',
      'Dominated gin rummy to the point that no one would play him',
      'Inducted into the Poker Hall of Fame in 2001 (posthumously)',
      "His 1997 comeback victory is one of poker's most dramatic stories",
    ],
    famousQuote:
      'Show me your eyes and you may as well show me your cards.',
    braceletCount: 5,
    totalEarnings: '$3,600,000+',
  },
  {
    name: 'Johnny Chan',
    nickname: 'The Orient Express',
    bio: 'Johnny Chan is a two-time consecutive WSOP Main Event champion (1987-88) whose famous final hand against Erik Seidel in 1988 was immortalized in the movie "Rounders." Born in Guangzhou, China, Chan moved to the United States as a child and became one of poker\'s most feared tournament competitors. His calm demeanor and precise play made him a dominant force throughout the late 1980s and 1990s.',
    achievements: [
      'Back-to-back WSOP Main Event championships (1987, 1988)',
      'Ten WSOP bracelets',
      'Famous final hand against Erik Seidel featured in "Rounders"',
      'Inducted into the Poker Hall of Fame in 2002',
      'Finished 2nd in the 1989 Main Event, nearly winning three in a row',
    ],
    famousQuote:
      'Poker is war. People pretend it is a game.',
    braceletCount: 10,
    totalEarnings: '$9,200,000+',
  },
  {
    name: 'Amarillo Slim',
    nickname: 'Amarillo Slim',
    bio: "Thomas Austin Preston Jr., known as Amarillo Slim, was poker's first mainstream celebrity. After winning the 1972 WSOP Main Event, his folksy Texas charm landed him appearances on The Tonight Show with Johnny Carson, 60 Minutes, and Good Morning America. A legendary proposition gambler, Slim was famous for betting on anything -- and usually winning. He helped bring poker into the American cultural mainstream.",
    achievements: [
      '1972 WSOP Main Event champion',
      'Four WSOP bracelets',
      'Appeared on The Tonight Show with Johnny Carson multiple times',
      'Inducted into the Poker Hall of Fame in 1992',
      'Famous prop bettor who once beat Bobby Riggs at ping-pong using a skillet',
    ],
    famousQuote:
      'You can shear a sheep many times, but you can only skin him once.',
    braceletCount: 4,
    totalEarnings: '$1,600,000+',
  },
  {
    name: 'Johnny Moss',
    nickname: 'The Grand Old Man of Poker',
    bio: "Johnny Moss was the original king of poker, winning the first three WSOP Main Events (1970, 1971, 1974). A Texas road gambler who learned poker from soldiers during World War II, Moss was known for his iron discipline and encyclopedic knowledge of the game. His famous five-month heads-up match against Nick \"The Greek\" Dandalos in 1949 at Binion's is one of poker's foundational legends.",
    achievements: [
      'Three WSOP Main Event titles (1970, 1971, 1974)',
      'Nine WSOP bracelets',
      'Epic five-month heads-up match against Nick the Greek in 1949',
      'Inducted into the Poker Hall of Fame in 1979 (inaugural class)',
      'Competed in WSOP events into his 80s',
    ],
    famousQuote:
      'The next best thing to playing and winning is playing and losing.',
    braceletCount: 9,
    totalEarnings: '$1,000,000+',
  },
  {
    name: 'Erik Seidel',
    nickname: 'Erik',
    bio: 'Erik Seidel is one of the most respected and enduring players in poker history. A former Wall Street options trader and competitive backgammon player, Seidel has been a top tournament performer for over three decades. He is best known to casual fans for his famous loss to Johnny Chan in the 1988 Main Event (featured in "Rounders"), but within the poker community he is revered for his adaptability and longevity at the highest levels.',
    achievements: [
      'Nine WSOP bracelets',
      'Finished 2nd in the 1988 WSOP Main Event to Johnny Chan',
      'One World Poker Tour title',
      'Over $40 million in live tournament earnings',
      'Inducted into the Poker Hall of Fame in 2010',
    ],
    famousQuote:
      'You have to be willing to die in order to live.',
    braceletCount: 9,
    totalEarnings: '$40,600,000+',
  },
  {
    name: 'Bryn Kenney',
    nickname: 'Bryn',
    bio: 'Bryn Kenney is an American poker player from Long Island, New York, who rose to prominence in the high-roller tournament circuit. A former Magic: The Gathering professional, Kenney transitioned his strategic skills to poker and quickly climbed to the top of the all-time money list. His willingness to play the biggest buy-in events in the world propelled him to massive earnings, though his career has been surrounded by controversy.',
    achievements: [
      'Reached #1 on the all-time tournament money list in 2019',
      'One WSOP bracelet',
      'Runner-up in the 2019 Triton Million for $20.5 million (largest live tournament score at the time)',
      'Multiple Super High Roller Bowl and Triton final tables',
      'Former professional Magic: The Gathering player',
    ],
    famousQuote:
      "I always want to be in the biggest game. That's where the real competition is.",
    braceletCount: 1,
    totalEarnings: '$57,200,000+',
  },
  {
    name: 'Justin Bonomo',
    nickname: 'ZeeJustin',
    bio: 'Justin Bonomo is one of the most successful high-stakes tournament players in poker history. Originally known for online poker, Bonomo became a dominant force in live super high roller events. His analytical approach and fearless aggression at the biggest buy-in tournaments have earned him tens of millions of dollars and a place among the greatest tournament players ever.',
    achievements: [
      'Three WSOP bracelets',
      'Won the 2018 Big One for One Drop for $10 million',
      'Held the #1 spot on the all-time money list in 2018',
      'Multiple Triton and Super High Roller Bowl titles',
      'Consistent performer at the highest buy-in levels worldwide',
    ],
    famousQuote:
      'The biggest edges in poker come from understanding game theory and exploiting mistakes.',
    braceletCount: 3,
    totalEarnings: '$57,000,000+',
  },
  {
    name: 'Dan Smith',
    nickname: 'Dan',
    bio: 'Dan Smith is a high-stakes tournament specialist known for his quiet demeanor and analytical playing style. One of the most feared competitors on the super high roller circuit, Smith has consistently performed at the highest levels for over a decade. He is also recognized for his philanthropy, donating significant portions of his winnings to charity through the Double Up Drive initiative.',
    achievements: [
      'Two WSOP bracelets',
      'Multiple Super High Roller Bowl final tables',
      'Consistently ranked among the top 10 on the all-time money list',
      'Founded the Double Up Drive charity initiative',
      'Known as one of the toughest high-stakes competitors in the world',
    ],
    famousQuote:
      'Poker has given me more than I could have imagined. Giving back is the least I can do.',
    braceletCount: 2,
    totalEarnings: '$42,200,000+',
  },
  {
    name: 'David Chiu',
    nickname: 'David',
    bio: 'David Chiu is a Chinese-American poker professional who has been a consistent winner in both tournaments and cash games since the 1990s. Born in Shanghai, Chiu moved to the United States and found success at the poker table through discipline and a deep understanding of game dynamics. He is a five-time WSOP bracelet winner and was one of the early players to find success across both limit and no-limit formats.',
    achievements: [
      'Five WSOP bracelets',
      'Won the 2008 WSOP $50,000 H.O.R.S.E. Championship',
      'Consistent cash game and tournament performer for over two decades',
      'Over $8 million in live tournament earnings',
      'Known for excelling in mixed-game formats',
    ],
    famousQuote:
      'Patience is the foundation of good poker. The cards will come if you wait.',
    braceletCount: 5,
    totalEarnings: '$8,400,000+',
  },
  {
    name: 'Tom Dwan',
    nickname: 'durrrr',
    bio: 'Tom Dwan is one of online poker\'s original legends and one of the most exciting players to ever sit at a table. Dwan rose to fame playing the highest-stakes games on Full Tilt Poker under the screen name "durrrr," routinely battling in pots worth millions of dollars. His ultra-aggressive style, fearless bluffing, and willingness to play anyone for any amount made him a folk hero in the poker world. He later became a prominent figure in high-stakes games in Macau and Asia.',
    achievements: [
      'One of the biggest winners in high-stakes online poker history',
      'Created the famous "durrrr Challenge" heads-up competition',
      'Regular in the biggest live cash games in Macau and Las Vegas',
      'Featured on High Stakes Poker and Poker After Dark',
      'Helped popularize an ultra-aggressive, fearless style of play',
    ],
    famousQuote:
      "I'm not afraid to go broke. That's what separates me from most players.",
    braceletCount: 0,
    totalEarnings: '$5,300,000+',
  },
  {
    name: 'Patrik Antonius',
    nickname: 'Patrik',
    bio: 'Patrik Antonius is a Finnish poker professional and former tennis player and model who became one of the biggest winners in online and live cash game history. Known for his stoic demeanor and mathematically precise play, Antonius was one of the few players willing to battle Tom Dwan and Phil Ivey at the highest stakes. He played in the largest online poker pot ever recorded -- over $1.3 million against Viktor Blom.',
    achievements: [
      'Participated in the largest online poker pot in history ($1.356 million)',
      'One of the biggest winners in high-stakes online poker',
      'Regular on High Stakes Poker and the biggest live cash games globally',
      'Multiple World Poker Tour final tables',
      'Former professional tennis player and model',
    ],
    famousQuote:
      'Poker is about making the best decision every single time. Emotion is your enemy.',
    braceletCount: 0,
    totalEarnings: '$15,100,000+',
  },
  {
    name: 'Jennifer Harman',
    nickname: 'Jen',
    bio: 'Jennifer Harman is one of the most accomplished female poker players in history and one of the best cash game players -- male or female -- to ever play. A regular in the biggest games at the Bellagio, Harman earned the respect of every top pro through decades of winning at the highest stakes. She is a two-time WSOP bracelet winner and was one of the contributors to Doyle Brunson\'s "Super/System 2."',
    achievements: [
      'Two WSOP bracelets',
      'Long-time regular in the highest-stakes cash games at the Bellagio',
      'Contributed the limit hold\'em chapter to "Super/System 2"',
      'Inducted into the Poker Hall of Fame in 2015',
      'One of the most respected cash game players regardless of gender',
    ],
    famousQuote:
      'I never wanted to be known as the best female poker player. I wanted to be known as one of the best poker players.',
    braceletCount: 2,
    totalEarnings: '$2,800,000+',
  },
  {
    name: 'Vanessa Selbst',
    nickname: 'Vanessa',
    bio: 'Vanessa Selbst is the most successful female poker tournament player in history by earnings. A Yale Law School graduate, Selbst combined fierce intelligence with fearless aggression to dominate high-stakes tournaments. She won three WSOP bracelets and was the first woman to reach the #1 ranking on the Global Poker Index. Selbst retired from professional poker in 2018 to pursue a career in finance.',
    achievements: [
      'Three WSOP bracelets (most by a female player)',
      'First woman to reach #1 on the Global Poker Index',
      'Over $11 million in live tournament earnings (most by a female player)',
      'Yale Law School graduate',
      'Retired from poker in 2018 to work at Bridgewater Associates',
    ],
    famousQuote:
      'I play the way I play because I believe it gives me the best chance to win.',
    braceletCount: 3,
    totalEarnings: '$11,900,000+',
  },
  {
    name: 'Fedor Holz',
    nickname: 'CrownUpGuy',
    bio: 'Fedor Holz is a German poker prodigy who dominated the super high roller circuit in 2016 before briefly retiring at age 23. In one of the most remarkable years in poker history, Holz won the WSOP $111,111 High Roller for One Drop and accumulated over $16 million in tournament winnings in a single year. He later returned to playing and founded Primed Mind, a mental coaching app, and the poker training platform Pokercode.',
    achievements: [
      'One WSOP bracelet (2016 $111,111 High Roller for One Drop)',
      'Over $16 million in tournament earnings in 2016 alone',
      '#1 on the Global Poker Index in 2016',
      'Founded Primed Mind (mental coaching app) and Pokercode (training platform)',
      'Won multiple major super high roller events before age 25',
    ],
    famousQuote:
      'Mindset is everything. The mental game is what separates good players from great ones.',
    braceletCount: 1,
    totalEarnings: '$32,500,000+',
  },
  {
    name: 'Stephen Chidwick',
    nickname: 'stevie444',
    bio: 'Stephen Chidwick is a British poker professional who has quietly become one of the most consistent and successful tournament players in the world. Known for his disciplined, GTO-influenced style and unflappable demeanor, Chidwick has accumulated massive earnings through sustained excellence across all buy-in levels. He is widely respected by peers as one of the toughest competitors on the circuit.',
    achievements: [
      'Two WSOP bracelets',
      'Multiple Poker Masters and U.S. Poker Open titles',
      '#1 on the Global Poker Index multiple times',
      'Consistently ranked among the top tournament players globally',
      'Known for one of the most balanced, theory-sound playing styles in poker',
    ],
    famousQuote:
      'The best players are the ones who make the fewest mistakes over the long run.',
    braceletCount: 2,
    totalEarnings: '$35,800,000+',
  },
  {
    name: 'Jason Koon',
    nickname: 'Jason',
    bio: 'Jason Koon is an American poker professional from West Virginia who has become one of the dominant forces in high-stakes and super high roller tournaments. A former top-ranked online player, Koon transitioned to live poker and quickly established himself as one of the best in the world. His intense work ethic, emotional control, and deep study of game theory have made him a fixture at final tables worldwide.',
    achievements: [
      'One WSOP bracelet',
      'Multiple Triton Poker series victories',
      'Consistently ranked in the top 5 on the all-time money list',
      'Known for his dominance in Triton and super high roller events',
      'Won back-to-back Triton events in 2019',
    ],
    famousQuote:
      'I never stop working. The day I stop studying is the day I start falling behind.',
    braceletCount: 1,
    totalEarnings: '$45,500,000+',
  },
  {
    name: 'Dan Harrington',
    nickname: 'Action Dan',
    bio: 'Dan Harrington is a former WSOP Main Event champion (1995) and the author of the hugely influential "Harrington on Hold\'em" book series, which became required reading for a generation of tournament players. Despite his nickname "Action Dan" (given ironically for his tight style), Harrington\'s strategic approach to tournament poker was ahead of its time. He also made the final table of the Main Event in 2003 and 2004, demonstrating remarkable consistency.',
    achievements: [
      '1995 WSOP Main Event champion',
      'Two WSOP bracelets',
      'Made the WSOP Main Event final table in 2003 and 2004 as well',
      'Authored the "Harrington on Hold\'em" book series (Volumes I, II, and III)',
      'Inducted into the Poker Hall of Fame in 2010',
    ],
    famousQuote:
      "Tournament poker is about survival. You can't win a tournament in the first hand, but you can lose it.",
    braceletCount: 2,
    totalEarnings: '$6,200,000+',
  },
  {
    name: 'Chris Moneymaker',
    nickname: 'Money',
    bio: 'Chris Moneymaker is the man who changed poker forever. In 2003, the amateur accountant from Nashville, Tennessee, turned a $39 online satellite on PokerStars into a $2.5 million WSOP Main Event victory, defeating seasoned pros including Sam Farha heads-up. His improbable win -- and his perfectly marketable last name -- triggered the global poker boom, inspiring millions to try the game and transforming online poker into a multi-billion-dollar industry.',
    achievements: [
      '2003 WSOP Main Event champion ($2.5 million)',
      'Qualified through a $39 online satellite on PokerStars',
      'Single-handedly triggered the global poker boom',
      "Became poker's most recognizable ambassador and PokerStars spokesman",
      'Inducted into the Poker Hall of Fame in 2019',
    ],
    famousQuote:
      "I proved that anyone can do it. That's what poker is all about.",
    braceletCount: 1,
    totalEarnings: '$3,900,000+',
  },
  {
    name: 'Antonio Esfandiari',
    nickname: 'The Magician',
    bio: "Antonio Esfandiari is an Iranian-American poker player and former professional magician whose flair for entertainment and skill at the table have made him one of poker's most popular figures. His biggest career achievement was winning the inaugural Big One for One Drop in 2012 for a then-record $18.3 million, the largest single prize in live tournament history at the time. Known for his table talk, magic tricks, and charismatic personality.",
    achievements: [
      'Won the 2012 Big One for One Drop for $18.3 million (record at the time)',
      'Three WSOP bracelets',
      'Two World Poker Tour titles',
      'Former professional magician who performs magic at the poker table',
      'Over $27 million in live tournament earnings',
    ],
    famousQuote:
      'Life is a magic trick. You just have to know the right moves.',
    braceletCount: 3,
    totalEarnings: '$27,800,000+',
  },
  {
    name: 'Mike Matusow',
    nickname: 'The Mouth',
    bio: "Mike Matusow is one of poker's most colorful and volatile personalities. Known for emotional outbursts, brutal bad beat stories, and brutally honest commentary, Matusow has been a fixture in the poker world for decades. Despite personal struggles including a prison stint and battles with bipolar disorder, Matusow has won four WSOP bracelets and has consistently competed at the highest levels. His raw honesty and willingness to show vulnerability made him a fan favorite on televised poker.",
    achievements: [
      'Four WSOP bracelets',
      'Multiple deep runs in the WSOP Main Event',
      'Known for iconic emotional moments on televised poker',
      'Published autobiography "Check-Raising the Devil"',
      'One of the most recognizable personalities in poker history',
    ],
    famousQuote:
      "I don't have a filter. What you see is what you get.",
    braceletCount: 4,
    totalEarnings: '$9,400,000+',
  },
  {
    name: 'Phil Laak',
    nickname: 'The Unabomber',
    bio: 'Phil Laak is an Irish-American poker professional known for his eccentric personality, trademark hooded sweatshirt (which earned him his nickname), and relentless endurance at the poker table. Laak set the Guinness World Record for the longest poker session at 115 hours of continuous play. A mechanical engineering graduate from UMass Amherst, Laak brings a unique analytical perspective to the game. He is also known for his long-time relationship with actress Jennifer Tilly.',
    achievements: [
      'One WSOP bracelet',
      'One World Poker Tour title',
      'Guinness World Record for longest poker session (115 hours)',
      'Regular on High Stakes Poker and Poker After Dark',
      'Known for innovative thinking and prop-betting at the table',
    ],
    famousQuote:
      'In poker, as in life, the person who works the hardest usually wins.',
    braceletCount: 1,
    totalEarnings: '$3,700,000+',
  },
];
