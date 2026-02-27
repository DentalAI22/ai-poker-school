// =============================================================================
// Poker Trivia Questions - 116 questions across 6 categories
// =============================================================================

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index into options array
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'history' | 'rules' | 'strategy' | 'players' | 'prop_bets' | 'math';
}

export const triviaQuestions: TriviaQuestion[] = [
  // ===========================================================================
  // HISTORY (22 questions)
  // ===========================================================================
  {
    id: 1,
    question: 'In what year was the first World Series of Poker held?',
    options: ['1968', '1970', '1972', '1975'],
    correctAnswer: 1,
    explanation:
      'The first WSOP was held in 1970 at Binion\'s Horseshoe in Las Vegas. Johnny Moss was voted champion by his peers in that inaugural event, which had no formal tournament structure.',
    difficulty: 'easy',
    category: 'history',
  },
  {
    id: 2,
    question: 'Who is credited with founding the World Series of Poker?',
    options: ['Doyle Brunson', 'Benny Binion', 'Johnny Moss', 'Amarillo Slim'],
    correctAnswer: 1,
    explanation:
      'Benny Binion, owner of Binion\'s Horseshoe casino in downtown Las Vegas, organized the first WSOP in 1970 to determine the best poker player in the world.',
    difficulty: 'easy',
    category: 'history',
  },
  {
    id: 3,
    question:
      "Which player's 2003 WSOP Main Event victory is credited with igniting the poker boom?",
    options: ['Greg Raymer', 'Phil Ivey', 'Chris Moneymaker', 'Scotty Nguyen'],
    correctAnswer: 2,
    explanation:
      'Chris Moneymaker qualified through a $39 online satellite on PokerStars and won the 2003 Main Event for $2.5 million. His victory proved that anyone could win, triggering an unprecedented poker boom known as the "Moneymaker Effect."',
    difficulty: 'easy',
    category: 'history',
  },
  {
    id: 4,
    question: 'What hand was Wild Bill Hickok holding when he was shot in 1876?',
    options: [
      'Black aces and black eights',
      'Pocket kings',
      'Two pair, jacks and tens',
      'A pair of queens',
    ],
    correctAnswer: 0,
    explanation:
      'Wild Bill Hickok was shot by Jack McCall on August 2, 1876, in Deadwood, South Dakota. He was reportedly holding black aces and black eights, which became known as the "Dead Man\'s Hand." The fifth card remains debated by historians.',
    difficulty: 'easy',
    category: 'history',
  },
  {
    id: 5,
    question: 'What event is known as "Black Friday" in the poker world?',
    options: [
      'The day online poker was invented',
      'The DOJ seizure of PokerStars, Full Tilt, and Absolute Poker on April 15, 2011',
      'The 2008 stock market crash that hurt casino revenues',
      'The cancellation of the 2020 WSOP live events',
    ],
    correctAnswer: 1,
    explanation:
      'On April 15, 2011, the U.S. Department of Justice seized the domains of PokerStars, Full Tilt Poker, and Absolute Poker, effectively shutting down online poker for U.S. players. Indictments charged the founders with bank fraud, money laundering, and illegal gambling.',
    difficulty: 'easy',
    category: 'history',
  },
  {
    id: 6,
    question: 'Which casino hosted the WSOP from 1970 to 2004?',
    options: [
      'Bellagio',
      'The Mirage',
      "Binion's Horseshoe",
      'Caesars Palace',
    ],
    correctAnswer: 2,
    explanation:
      "Binion's Horseshoe in downtown Las Vegas hosted the WSOP for 35 years. When the Binion family lost control of the casino, Harrah's Entertainment purchased the WSOP rights and moved the event to the Rio All-Suite Hotel in 2005.",
    difficulty: 'easy',
    category: 'history',
  },
  {
    id: 7,
    question: 'Who wrote the groundbreaking poker strategy book "Super/System" in 1979?',
    options: ['David Sklansky', 'Doyle Brunson', 'Mike Caro', 'T.J. Cloutier'],
    correctAnswer: 1,
    explanation:
      'Doyle Brunson published "Super/System" (originally titled "How I Made Over $1,000,000 Playing Poker") in 1979. It was the first comprehensive poker strategy book, and many players were furious that Brunson revealed so many professional secrets.',
    difficulty: 'easy',
    category: 'history',
  },
  {
    id: 8,
    question: 'In what decade did Texas Hold\'em originate in Texas?',
    options: ['1880s', '1900s', '1930s', '1960s'],
    correctAnswer: 1,
    explanation:
      'Texas Hold\'em is believed to have originated in Robstown, Texas, in the early 1900s. The Texas Legislature officially recognizes Robstown as the game\'s birthplace. The game didn\'t reach Las Vegas until 1963 when Corky McCorquodale and other Texans introduced it.',
    difficulty: 'medium',
    category: 'history',
  },
  {
    id: 9,
    question: 'Which French card game is widely considered the ancestor of modern poker?',
    options: ['Baccarat', 'Poque', 'Vingt-et-un', 'Ecarte'],
    correctAnswer: 1,
    explanation:
      'Poque was a French card game brought to New Orleans by French colonists in the early 1800s. The word "poker" is widely believed to derive from "Poque." The game spread up the Mississippi River on steamboats and evolved into the poker we know today.',
    difficulty: 'medium',
    category: 'history',
  },
  {
    id: 10,
    question: 'What was the buy-in for the first WSOP Main Event, which remains the same today?',
    options: ['$5,000', '$10,000', '$25,000', '$1,000'],
    correctAnswer: 1,
    explanation:
      'The WSOP Main Event has had a $10,000 buy-in since its inception in 1970. Remarkably, the buy-in has never changed despite decades of inflation, making the tournament actually far more accessible in real terms than it was originally.',
    difficulty: 'medium',
    category: 'history',
  },
  {
    id: 11,
    question: 'Who won back-to-back WSOP Main Events in 1976 and 1977?',
    options: ['Johnny Moss', 'Doyle Brunson', 'Stu Ungar', 'Bobby Baldwin'],
    correctAnswer: 1,
    explanation:
      'Doyle Brunson won consecutive Main Events in 1976 and 1977. He won the final hand of both tournaments with a full house made with 10-2, which is now called "The Doyle Brunson" in his honor.',
    difficulty: 'medium',
    category: 'history',
  },
  {
    id: 12,
    question: 'What TV show first used under-the-table hole card cameras in 1999?',
    options: [
      'World Poker Tour',
      'Late Night Poker (UK)',
      'Celebrity Poker Showdown',
      'Poker After Dark',
    ],
    correctAnswer: 1,
    explanation:
      'Late Night Poker, a UK television show debuting in 1999, was the first to use cameras embedded in the table to show viewers the players\' hole cards. Henry Orenstein had patented the hole card camera concept in 1995, revolutionizing poker as a spectator sport.',
    difficulty: 'hard',
    category: 'history',
  },
  {
    id: 13,
    question: 'What year did the World Poker Tour first air on television?',
    options: ['2001', '2002', '2003', '2004'],
    correctAnswer: 2,
    explanation:
      'The World Poker Tour first aired on the Travel Channel in March 2003. Created by Steve Lipscomb, the WPT used hole card cameras and professional commentary featuring Mike Sexton and Vince Van Patten, helping fuel the poker boom alongside the Moneymaker Effect.',
    difficulty: 'medium',
    category: 'history',
  },
  {
    id: 14,
    question:
      'What was the first legal online poker room to deal a real-money hand?',
    options: ['PokerStars', 'PartyPoker', 'Planet Poker', 'Full Tilt Poker'],
    correctAnswer: 2,
    explanation:
      'Planet Poker dealt the first real-money online poker hand on January 1, 1998. Founded by Randy Blumer, it was a technological pioneer but was eventually eclipsed by PokerStars, PartyPoker, and other larger sites.',
    difficulty: 'hard',
    category: 'history',
  },
  {
    id: 15,
    question:
      'In what year did the WSOP Main Event field first exceed 1,000 entrants?',
    options: ['2003', '2004', '2005', '2006'],
    correctAnswer: 1,
    explanation:
      'The 2004 WSOP Main Event attracted 2,576 entrants, the first time it exceeded 1,000. Fueled by the Moneymaker Effect and the WPT, the field exploded from 839 in 2003. Greg Raymer won the title. The field peaked at 8,773 in 2006.',
    difficulty: 'hard',
    category: 'history',
  },
  {
    id: 16,
    question:
      'What famous game at the Bellagio was chronicled in Michael Craig\'s book about Andy Beal?',
    options: [
      'The Big Game',
      "Bobby's Room",
      'The Corporation Game',
      'High Stakes Poker',
    ],
    correctAnswer: 0,
    explanation:
      'The Big Game, detailed in Craig\'s "The Professor, the Banker, and the Suicide King," featured billionaire banker Andy Beal playing heads-up limit Hold\'em against a rotating team of top pros at stakes up to $100,000/$200,000, the highest-stakes poker ever played at that time.',
    difficulty: 'hard',
    category: 'history',
  },
  {
    id: 17,
    question:
      'Which poker variant was the most popular in American casinos before Hold\'em took over?',
    options: ['Omaha', 'Seven Card Stud', 'Five Card Draw', 'Razz'],
    correctAnswer: 1,
    explanation:
      'Seven Card Stud was the dominant poker game in American casinos through the 1980s and into the 1990s. Texas Hold\'em gradually replaced it, especially after the televised poker boom of the early 2000s brought Hold\'em to a massive audience.',
    difficulty: 'easy',
    category: 'history',
  },
  {
    id: 18,
    question: 'What landmark 2006 U.S. law devastated online poker?',
    options: [
      'The Wire Act of 1961',
      'The UIGEA (Unlawful Internet Gambling Enforcement Act)',
      'The Federal Poker Protection Act',
      'The Online Gaming Regulation Act',
    ],
    correctAnswer: 1,
    explanation:
      'The UIGEA, signed into law on October 13, 2006, prohibited financial institutions from processing transactions related to online gambling. It was attached as a last-minute rider to an unrelated port security bill and caused PartyPoker and other sites to exit the U.S. market.',
    difficulty: 'medium',
    category: 'history',
  },
  {
    id: 19,
    question: 'What was the name of the AI that first beat elite humans at six-player no-limit Hold\'em?',
    options: ['DeepStack', 'Libratus', 'Pluribus', 'AlphaPoker'],
    correctAnswer: 2,
    explanation:
      'Pluribus, developed by Facebook AI and Carnegie Mellon University in 2019, was the first AI to defeat elite human players in six-player no-limit Hold\'em. Libratus had beaten humans at heads-up in 2017, but multiplayer poker is exponentially more complex.',
    difficulty: 'hard',
    category: 'history',
  },
  {
    id: 20,
    question:
      'Which online poker site was caught in a "superuser" cheating scandal where insiders could see opponents\' cards?',
    options: ['PokerStars', 'Full Tilt Poker', 'UltimateBet', 'PartyPoker'],
    correctAnswer: 2,
    explanation:
      'UltimateBet was exposed in a massive cheating scandal where insiders used "superuser" accounts that could see opponents\' hole cards. Russ Hamilton was identified as a central figure. The scandal defrauded players of millions and damaged trust in online poker.',
    difficulty: 'medium',
    category: 'history',
  },
  {
    id: 21,
    question: 'In what year did Stu Ungar win his third and final WSOP Main Event?',
    options: ['1990', '1995', '1997', '1999'],
    correctAnswer: 2,
    explanation:
      'Stu Ungar won his third WSOP Main Event in 1997, completing a remarkable comeback after years of drug addiction. He had also won in 1980 and 1981. Tragically, Ungar died in November 1998 at age 45. He is widely considered one of the greatest natural card players ever.',
    difficulty: 'hard',
    category: 'history',
  },
  {
    id: 22,
    question:
      'What was the largest WSOP Main Event field ever recorded?',
    options: [
      '6,358 in 2005',
      '6,844 in 2008',
      '8,773 in 2006',
      '10,015 in 2023',
    ],
    correctAnswer: 2,
    explanation:
      'The 2006 WSOP Main Event attracted a record 8,773 entrants, creating an $82.5 million prize pool. Jamie Gold won first place for $12 million. The field size has never been surpassed, though the 2023 event came close with over 10,000 entries.',
    difficulty: 'hard',
    category: 'history',
  },

  // ===========================================================================
  // RULES (20 questions)
  // ===========================================================================
  {
    id: 23,
    question: 'In Texas Hold\'em, how many community cards are dealt in total?',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation:
      'Five community cards are dealt: three on the flop, one on the turn (fourth street), and one on the river (fifth street). Players make the best five-card hand using any combination of their two hole cards and the community cards.',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 24,
    question: 'What is the highest possible hand in standard poker without wild cards?',
    options: ['Four aces', 'Straight flush', 'Royal flush', 'Five of a kind'],
    correctAnswer: 2,
    explanation:
      'A royal flush (A-K-Q-J-10 of the same suit) is the highest possible hand. It is technically the highest straight flush. The odds of being dealt one in five-card draw poker are approximately 1 in 649,740.',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 25,
    question:
      'In Omaha Hold\'em, how many of your four hole cards MUST you use?',
    options: ['Any number (0 to 4)', 'At least one', 'Exactly two', 'At least three'],
    correctAnswer: 2,
    explanation:
      'In Omaha, you must use exactly two of your four hole cards and exactly three of the five community cards. This is the rule most commonly misunderstood by beginners from Hold\'em, where you can use any combination.',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 26,
    question: 'What does "the button" represent in a poker game?',
    options: [
      'The player who must post the big blind',
      'The nominal dealer position',
      'The player who acts first preflop',
      'The player with the most chips',
    ],
    correctAnswer: 1,
    explanation:
      'The button (or dealer button) indicates the nominal dealer position. It rotates clockwise each hand. The player on the button acts last on every post-flop betting street, making it the most advantageous position at the table.',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 27,
    question: 'Which of these hand rankings is correct?',
    options: [
      'Flush beats a full house',
      'Straight beats a flush',
      'Full house beats a flush',
      'Two pair beats three of a kind',
    ],
    correctAnswer: 2,
    explanation:
      'The ranking from low to high: high card, pair, two pair, three of a kind, straight, flush, full house, four of a kind, straight flush, royal flush. A full house beats a flush because it is mathematically less likely.',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 28,
    question: 'What is a "string bet" in poker?',
    options: [
      'A bet made with chips arranged in a row',
      'A raise done in multiple motions without first verbally declaring the amount',
      'Betting on every street in a hand',
      'A sequence of bets placed by multiple players',
    ],
    correctAnswer: 1,
    explanation:
      'A string bet occurs when a player puts out chips in multiple motions without first verbally declaring the total. It is illegal because it can be used to gauge opponents\' reactions before committing to a full raise amount.',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 29,
    question: 'In Seven Card Stud, how many cards does each player receive?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation:
      'In Seven Card Stud, each player receives seven cards over five betting rounds: two face-down and one face-up initially (third street), three more face-up on fourth, fifth, and sixth streets, and a final face-down card on seventh street.',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 30,
    question: 'In pot-limit Omaha, how is the maximum bet calculated?',
    options: [
      'Any amount up to your chip stack',
      'The current size of the pot only',
      'Twice the size of the pot',
      'The current pot plus the amount needed to call any outstanding bet',
    ],
    correctAnswer: 3,
    explanation:
      'In pot-limit, the maximum raise equals the size of the pot after you would have called. If the pot is $100 and someone bets $50, you can call $50 then raise the new pot ($200), for a total of $250. This calculation trips up many newer PLO players.',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 31,
    question: 'What does "table stakes" mean?',
    options: [
      'The minimum buy-in for a game',
      'Players can only wager chips on the table at the start of the hand',
      'The rake taken by the house',
      'The stakes posted on the table sign',
    ],
    correctAnswer: 1,
    explanation:
      'Table stakes means a player can only wager the chips they have on the table at the start of a hand. You cannot reach into your pocket mid-hand. If you run out of chips, you are all-in and can only win a side pot proportional to your investment.',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 32,
    question:
      'In no-limit Hold\'em, what is the minimum legal raise size?',
    options: [
      'One big blind',
      'The size of the previous bet or raise',
      'Half the pot',
      'Double the big blind always',
    ],
    correctAnswer: 1,
    explanation:
      'The minimum raise must be at least the size of the previous bet or raise in the same round. Preflop, the big blind counts as the initial bet, so the minimum raise is to 2x the big blind. If someone raises to $10, the minimum re-raise is an additional $10 (to $20 total).',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 33,
    question: 'In Razz (Seven Card Stud Lowball), what is the best possible hand?',
    options: ['A-2-3-4-5', 'A-2-3-4-6', '2-3-4-5-6', '7-5-4-3-2'],
    correctAnswer: 0,
    explanation:
      'In Razz, aces are always low and straights and flushes do not count against your hand. The best possible hand is A-2-3-4-5, known as "the wheel." Razz uses ace-to-five lowball hand rankings.',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 34,
    question: 'What is the "one-chip rule" in most card rooms?',
    options: [
      'You can only bet one chip at a time',
      'A single chip placed without verbal declaration is a call, not a raise',
      'The smallest denomination chip always plays',
      'You must tip one chip to the dealer per pot won',
    ],
    correctAnswer: 1,
    explanation:
      'Under the one-chip rule, if you silently put a single oversized chip into the pot, it counts as a call, not a raise. For example, if the bet is $25 and you toss in a $100 chip without saying "raise," you have called $25 and receive $75 in change.',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 35,
    question: 'In a Hi-Lo split game, what qualifies as a "low" hand?',
    options: [
      'Any hand with no pair',
      'Five cards 8 or below with no pairs',
      'Five cards 9 or below',
      'The worst possible five-card hand',
    ],
    correctAnswer: 1,
    explanation:
      'In "8-or-better" Hi-Lo games (like Omaha Hi-Lo), a qualifying low requires five unpaired cards all ranked 8 or lower. Aces count as low. If no player qualifies for a low, the high hand scoops the entire pot.',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 36,
    question:
      'What does "cap" mean in a limit poker betting round?',
    options: [
      'The maximum number of players at the table',
      'The maximum number of raises allowed in a single betting round',
      'The maximum buy-in',
      'The highest card on the board',
    ],
    correctAnswer: 1,
    explanation:
      'In limit poker, the "cap" is the maximum number of raises per betting round, typically three or four raises (making four or five total bets). Once the cap is reached, players can only call or fold. Many rooms lift the cap when only two players remain in the hand.',
    difficulty: 'medium',
    category: 'rules',
  },
  {
    id: 37,
    question: 'Which of these is NOT a standard poker betting structure?',
    options: ['No Limit', 'Pot Limit', 'Fixed Limit', 'Quarter Limit'],
    correctAnswer: 3,
    explanation:
      'The three standard structures are No Limit (bet any amount up to your stack), Pot Limit (bet up to the pot size), and Fixed Limit (bet in set increments). "Quarter Limit" does not exist.',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 38,
    question: 'What happens when two players have identically-ranked hands in Hold\'em?',
    options: [
      'The player closest to the button wins',
      'The pot is always split',
      'Kickers break the tie; identical five-card hands split the pot',
      'A new hand is dealt to break the tie',
    ],
    correctAnswer: 2,
    explanation:
      'When hands are the same rank, kicker cards determine the winner. If all five cards in both players\' best hands are identical, the pot is split (chopped). Suits never break ties in standard poker.',
    difficulty: 'easy',
    category: 'rules',
  },
  {
    id: 39,
    question: 'In Short Deck (Six Plus) Hold\'em, which hand ranks higher: a flush or a full house?',
    options: [
      'A full house ranks higher, same as regular Hold\'em',
      'A flush ranks higher because it is harder to make with fewer cards',
      'They rank equally',
      'It depends on the casino rules',
    ],
    correctAnswer: 1,
    explanation:
      'In Short Deck Hold\'em (played with a 36-card deck removing 2s through 5s), a flush beats a full house. With fewer cards of each suit available, flushes become harder to make than full houses, so the rankings are adjusted accordingly.',
    difficulty: 'hard',
    category: 'rules',
  },
  {
    id: 40,
    question:
      'What is the "forward motion" rule?',
    options: [
      'Players must push their cards forward to fold',
      'Any forward motion of chips toward the pot counts as a bet or call',
      'Dealers must push the pot forward to the winner',
      'The tournament clock must always move forward',
    ],
    correctAnswer: 1,
    explanation:
      'The forward motion rule states that once a player moves chips toward the pot in a forward motion, they are committed to that action. This prevents "angle shooting" where a player might move chips forward to gauge a reaction and then pull them back.',
    difficulty: 'hard',
    category: 'rules',
  },
  {
    id: 41,
    question: 'In a Badugi hand, what is the best possible hand?',
    options: [
      'A-2-3-4 of all different suits',
      'A-A-A-A',
      '2-3-4-5 of the same suit',
      'K-Q-J-10 of all different suits',
    ],
    correctAnswer: 0,
    explanation:
      'In Badugi, the goal is to make the lowest four-card hand with all different suits and no pairs. The best hand is A-2-3-4 of four different suits, called a "Badugi." If you have duplicate suits or pairs, those cards are discarded, leaving a weaker three-card or two-card hand.',
    difficulty: 'hard',
    category: 'rules',
  },
  {
    id: 42,
    question: 'What is a "misdeal" in poker?',
    options: [
      'When a player accidentally shows their cards',
      'When the dealer makes an error significant enough to require the hand be redealt',
      'When a player bets out of turn',
      'When two players have identical hands',
    ],
    correctAnswer: 1,
    explanation:
      'A misdeal occurs when a procedural error in the deal is significant enough that the hand must be redealt. Common causes include exposing two or more cards, dealing to the wrong seat, or dealing an incorrect number of cards. One exposed card is typically not a misdeal.',
    difficulty: 'easy',
    category: 'rules',
  },

  // ===========================================================================
  // STRATEGY (22 questions)
  // ===========================================================================
  {
    id: 43,
    question: 'What does "GTO" stand for in poker strategy?',
    options: [
      'Get The Odds',
      'Game Theory Optimal',
      'Guaranteed Tournament Outcome',
      'General Table Operations',
    ],
    correctAnswer: 1,
    explanation:
      'GTO stands for Game Theory Optimal, a strategy based on Nash Equilibrium where your play cannot be exploited. While theoretically perfect, most real-world winning play involves exploitative adjustments against specific opponents\' tendencies.',
    difficulty: 'easy',
    category: 'strategy',
  },
  {
    id: 44,
    question: 'What is "pot odds" in poker?',
    options: [
      'The odds the pot will be won by the best hand',
      'The ratio of the current pot size to the cost of a call',
      'The odds of the pot being split',
      'The percentage of hands that reach showdown',
    ],
    correctAnswer: 1,
    explanation:
      'Pot odds are the ratio of the current pot to the cost of your call. If the pot is $100 and you must call $20, your pot odds are 5:1, meaning you need to win at least 1 in 6 times (16.7%) to break even. Comparing pot odds to your equity determines if calling is profitable.',
    difficulty: 'easy',
    category: 'strategy',
  },
  {
    id: 45,
    question: 'Why is position so important in poker?',
    options: [
      'Late position players post bigger blinds',
      'Acting last gives you information before you decide',
      'Position determines card quality',
      'Early position players get more thinking time',
    ],
    correctAnswer: 1,
    explanation:
      'Acting last on post-flop streets gives you information about opponents\' actions before you make your decision. This informational advantage lets you play more hands profitably, bluff more effectively, control pot size, and value bet thinner from the button and cutoff.',
    difficulty: 'easy',
    category: 'strategy',
  },
  {
    id: 46,
    question: 'What is a "continuation bet" (c-bet)?',
    options: [
      'Any bet made on the river',
      'A bet by the preflop aggressor on the flop, continuing their story of strength',
      'Betting the same amount on every street',
      'A bet that continues a string bet',
    ],
    correctAnswer: 1,
    explanation:
      'A c-bet is made by the preflop aggressor on the flop, "continuing" their aggression. It works because the preflop raiser is perceived as having a strong range, and most flops miss most hands. Typical c-bet frequencies range from 50-70% depending on board texture.',
    difficulty: 'easy',
    category: 'strategy',
  },
  {
    id: 47,
    question: 'What does "3-bet" mean in modern poker?',
    options: [
      'Betting three times the big blind',
      'Making a bet on third street',
      'A re-raise over an initial raise (the third bet in the sequence)',
      'Betting into three opponents',
    ],
    correctAnswer: 2,
    explanation:
      'A 3-bet is the third bet in a sequence: the big blind is bet #1, the open raise is bet #2, and the re-raise is bet #3 (the 3-bet). Light 3-betting with non-premium hands is a key modern aggressive strategy to win pots preflop and build bigger pots when called.',
    difficulty: 'easy',
    category: 'strategy',
  },
  {
    id: 48,
    question: 'What is the "gap concept" in tournament poker?',
    options: [
      'You need a stronger hand to call a raise than to raise yourself',
      'The gap between chip stacks determines blind structure',
      'Players should have gaps in their betting range',
      'The time gap between tournament levels',
    ],
    correctAnswer: 0,
    explanation:
      'The gap concept, popularized by David Sklansky, states that you need a stronger hand to call a raise than to open-raise yourself. When calling, you face a strong range and lose the ability to win by folding opponents out. When raising, you have fold equity plus position advantages.',
    difficulty: 'medium',
    category: 'strategy',
  },
  {
    id: 49,
    question: 'What is "implied odds" in poker?',
    options: [
      'The odds implied by your opponent\'s bet sizing',
      'Pot odds adjusted for future bets you expect to win when you complete your draw',
      'Odds that are never explicitly stated',
      'The odds of your opponent having a specific hand',
    ],
    correctAnswer: 1,
    explanation:
      'Implied odds factor in additional money you expect to win on future streets if you hit your draw. Even when current pot odds don\'t justify a call, strong implied odds (opponents likely to pay off) can make it profitable. Deep stacks increase implied odds.',
    difficulty: 'medium',
    category: 'strategy',
  },
  {
    id: 50,
    question: 'What is "ICM" in tournament poker?',
    options: [
      'International Card Masters',
      'Independent Chip Model',
      'Incremental Chip Multiplier',
      'Internal Championship Method',
    ],
    correctAnswer: 1,
    explanation:
      'The Independent Chip Model (ICM) converts tournament chip stacks into estimated real-money equity in the prize pool. ICM reveals that tournament chips have diminishing marginal value: the chips you risk are worth more than the chips you can win, making correct play more risk-averse near pay jumps.',
    difficulty: 'medium',
    category: 'strategy',
  },
  {
    id: 51,
    question: 'What is a "squeeze play"?',
    options: [
      'Slowly peeling your cards for suspense',
      'A 3-bet after an open raise and one or more callers',
      'Betting small to trap opponents',
      'Playing very tight to grind out profits',
    ],
    correctAnswer: 1,
    explanation:
      'A squeeze play is a preflop 3-bet made after there has been a raise and one or more callers. The callers\' ranges are capped (they just flatted), making them likely to fold. The original raiser is "squeezed" between the 3-bettor and the dead money from the callers.',
    difficulty: 'medium',
    category: 'strategy',
  },
  {
    id: 52,
    question: 'What is the "Rule of 4 and 2" used for?',
    options: [
      'Calculating your tip for the dealer',
      'Quickly estimating equity from your outs',
      'Determining optimal bet sizing',
      'Counting players remaining in a tournament',
    ],
    correctAnswer: 1,
    explanation:
      'The Rule of 4 and 2 is a shortcut for estimating equity: multiply your outs by 4 on the flop (two cards to come) or by 2 on the turn (one card to come). A flush draw with 9 outs on the flop is approximately 9 x 4 = 36% to hit by the river.',
    difficulty: 'easy',
    category: 'strategy',
  },
  {
    id: 53,
    question: 'What is "balancing your range"?',
    options: [
      'Playing an equal number of red and black hands',
      'Playing the same number of hands from each position',
      'Taking the same action with both strong hands and bluffs so opponents cannot exploit you',
      'Adjusting play based on your chip stack',
    ],
    correctAnswer: 2,
    explanation:
      'Balancing means taking the same action (e.g., betting a certain size) with both value hands and bluffs at the correct frequency. This prevents opponents from knowing whether your bet is for value or a bluff, making your strategy unexploitable.',
    difficulty: 'medium',
    category: 'strategy',
  },
  {
    id: 54,
    question: 'What is a "donk bet"?',
    options: [
      'A very large overbet',
      'Any bet made by a weak player',
      'A lead bet into the preflop aggressor by the out-of-position caller',
      'A river bluff with a missed draw',
    ],
    correctAnswer: 2,
    explanation:
      'A donk bet is when the out-of-position player who called preflop leads into the preflop raiser on the flop. Once considered a beginner mistake, modern solvers show donk betting is correct on certain boards that heavily favor the caller\'s range, like low and paired boards.',
    difficulty: 'medium',
    category: 'strategy',
  },
  {
    id: 55,
    question: 'What is "fold equity"?',
    options: [
      'The equity you gain by folding',
      'The extra value from the chance your opponent folds to your bet',
      'The money you save by folding weak hands',
      'The equity held by folded cards in the muck',
    ],
    correctAnswer: 1,
    explanation:
      'Fold equity is the additional value gained from the probability your opponent folds. Even with a weak hand, if your opponent folds often enough, a bet or raise can be profitable. Total equity = hand equity + fold equity, which is why aggression is so valuable in poker.',
    difficulty: 'medium',
    category: 'strategy',
  },
  {
    id: 56,
    question: 'What does "polarized range" mean?',
    options: [
      'Playing only hands at extreme compass points on a range chart',
      'A range of very strong hands and bluffs, with few medium-strength hands',
      'A perfectly balanced 50/50 range',
      'A range that changes depending on table dynamics',
    ],
    correctAnswer: 1,
    explanation:
      'A polarized range has the nuts (strong value hands) and air (bluffs) but few medium-strength hands. River betting ranges are typically polarized. This contrasts with a "merged" or "linear" range that includes medium-strength hands, which is more common for thin value bets on earlier streets.',
    difficulty: 'hard',
    category: 'strategy',
  },
  {
    id: 57,
    question: 'What is "Minimum Defense Frequency" (MDF)?',
    options: [
      'The minimum hands you must play per hour',
      'The percentage of your range you must continue with to prevent an opponent from profiting with any bluff',
      'The minimum stack needed to defend blinds',
      'How often you should defend against 3-bets',
    ],
    correctAnswer: 1,
    explanation:
      'MDF is the minimum portion of your range you must continue with (call or raise) to prevent your opponent from auto-profiting with bluffs. Formula: MDF = Pot / (Pot + Bet). For a pot-sized bet, MDF is 50%. For a half-pot bet, MDF is 67%.',
    difficulty: 'hard',
    category: 'strategy',
  },
  {
    id: 58,
    question: 'When is an overbet (betting more than the pot) strategically correct?',
    options: [
      'Never; it is always a mistake',
      'When you have a polarized range and a nut advantage over your opponent',
      'Only when bluffing',
      'When the pot is very small',
    ],
    correctAnswer: 1,
    explanation:
      'Overbets are correct when you have a significant nut advantage (many more nutted hands than your opponent). GTO solvers frequently use overbets on certain board textures to maximize value with strong hands and apply maximum pressure with bluffs.',
    difficulty: 'hard',
    category: 'strategy',
  },
  {
    id: 59,
    question: 'What is "SPR" and why does it matter?',
    options: [
      'Stack-to-Pot Ratio; it determines commitment thresholds on the flop',
      'Standard Player Rating; it ranks player skill',
      'Side Pot Ratio; it divides multi-way pots',
      'Starting Position Rank; it determines play order',
    ],
    correctAnswer: 0,
    explanation:
      'SPR (Stack-to-Pot Ratio) is the effective stack divided by the pot on the flop. Low SPR (under 3) means you are committed with top pair or better. High SPR (over 13) means you need a very strong hand to stack off. SPR guides your preflop sizing to engineer favorable post-flop situations.',
    difficulty: 'hard',
    category: 'strategy',
  },
  {
    id: 60,
    question: 'On the "bubble" of a tournament, what does ICM suggest short stacks should do?',
    options: [
      'Shove all-in with any two cards to build their stack',
      'Play very tight because surviving into the money is a huge pay jump',
      'Target only the chip leader',
      'Play the same as they would any other time',
    ],
    correctAnswer: 1,
    explanation:
      'ICM creates enormous pressure on short stacks near the bubble because the pay jump from zero (busting before the money) to min-cash is massive in equity terms. Short stacks should tighten up significantly, while big stacks should exploit this by raising aggressively.',
    difficulty: 'medium',
    category: 'strategy',
  },
  {
    id: 61,
    question: 'What is "thin value betting"?',
    options: [
      'Betting a very small amount',
      'Betting a marginal hand that is only slightly ahead of your opponent\'s calling range',
      'Bluffing with a hand that has zero equity',
      'Value betting only when the pot is small',
    ],
    correctAnswer: 1,
    explanation:
      'Thin value betting means betting a hand that is barely ahead of the hands your opponent would call with. It requires precise hand-reading: you need to be called by worse hands more often than by better hands. This skill separates good players from great ones.',
    difficulty: 'hard',
    category: 'strategy',
  },
  {
    id: 62,
    question: 'You have a flush draw on the flop. Approximately how often will it complete by the river?',
    options: ['About 20%', 'About 35%', 'About 45%', 'About 50%'],
    correctAnswer: 1,
    explanation:
      'A flush draw (9 outs) on the flop will complete approximately 35% of the time by the river (34.97% exactly). Using the Rule of 4: 9 outs x 4 = 36%, which is very close. This means roughly one in three flush draws on the flop will get there.',
    difficulty: 'easy',
    category: 'strategy',
  },
  {
    id: 63,
    question: 'What is the "metagame" in poker?',
    options: [
      'A variant of poker played in video games',
      'Strategy adjustments based on history and dynamics with opponents over time',
      'The game between tournament directors',
      'The statistics displayed on a HUD',
    ],
    correctAnswer: 1,
    explanation:
      'The metagame encompasses strategic adjustments based on your history with opponents, your table image, and evolving dynamics. If you have been caught bluffing recently, opponents may call more, which means your value bets become more profitable. Understanding metagame is playing on a level above the cards.',
    difficulty: 'medium',
    category: 'strategy',
  },
  {
    id: 64,
    question: 'What is a "blocker" in poker strategy?',
    options: [
      'A player who blocks the view of the board',
      'A card in your hand that reduces the probability of an opponent holding a specific hand',
      'A chip placed on your cards to protect them',
      'A bet designed to block opponents from raising',
    ],
    correctAnswer: 1,
    explanation:
      'A blocker is a card you hold that makes it less likely your opponent has certain hands. For example, holding the ace of spades on a three-spade board means your opponent is less likely to have the nut flush. Blockers are critical in high-level bluffing and calling decisions.',
    difficulty: 'hard',
    category: 'strategy',
  },

  // ===========================================================================
  // PLAYERS (22 questions)
  // ===========================================================================
  {
    id: 65,
    question: 'Which player holds the record for the most WSOP bracelets?',
    options: [
      'Doyle Brunson',
      'Phil Hellmuth',
      'Johnny Chan',
      'Daniel Negreanu',
    ],
    correctAnswer: 1,
    explanation:
      'Phil Hellmuth holds the record with 17 WSOP bracelets (and counting). Known as the "Poker Brat" for his emotional outbursts, Hellmuth won his first bracelet by taking down the 1989 Main Event at age 24.',
    difficulty: 'easy',
    category: 'players',
  },
  {
    id: 66,
    question: 'What is Phil Ivey\'s nickname?',
    options: [
      'The Poker Brat',
      'The Tiger Woods of Poker',
      'Texas Dolly',
      'The Kid',
    ],
    correctAnswer: 1,
    explanation:
      'Phil Ivey is called "The Tiger Woods of Poker" due to his dominance across every poker format. With 10 WSOP bracelets and success in the biggest cash games in the world, Ivey is widely considered the best all-around poker player in history.',
    difficulty: 'easy',
    category: 'players',
  },
  {
    id: 67,
    question: 'Who is "Texas Dolly"?',
    options: [
      'Phil Hellmuth',
      'Doyle Brunson',
      'Daniel Negreanu',
      'Amarillo Slim',
    ],
    correctAnswer: 1,
    explanation:
      'Doyle Brunson earned the nickname "Texas Dolly" through a reporter\'s misprint of "Texas Doyle." The name stuck for the rest of his legendary career. Brunson won 10 WSOP bracelets including back-to-back Main Events and played high-stakes poker for over 50 years before passing away in 2023.',
    difficulty: 'easy',
    category: 'players',
  },
  {
    id: 68,
    question:
      'Who famously said, "If there wasn\'t luck involved, I\'d win every time"?',
    options: ['Doyle Brunson', 'Stu Ungar', 'Phil Hellmuth', 'Mike Matusow'],
    correctAnswer: 2,
    explanation:
      'Phil Hellmuth is credited with this iconic quote, which perfectly captures his supreme confidence and his "Poker Brat" persona. Love him or hate him, Hellmuth\'s record 17 WSOP bracelets suggest his self-belief is not entirely unfounded.',
    difficulty: 'easy',
    category: 'players',
  },
  {
    id: 69,
    question: 'What is Daniel Negreanu\'s nickname?',
    options: ['Danny Boy', 'Kid Poker', 'The Grinder', 'The Canadian Kid'],
    correctAnswer: 1,
    explanation:
      'Daniel Negreanu is known as "Kid Poker" because he started playing professionally at a very young age. The Toronto-born Canadian has won 6 WSOP bracelets, two WSOP Player of the Year awards, and is one of the most recognizable faces in poker.',
    difficulty: 'easy',
    category: 'players',
  },
  {
    id: 70,
    question:
      'Who said "You call, it\'s gonna be all over baby" at the 1998 WSOP Main Event final?',
    options: ['Phil Hellmuth', 'Doyle Brunson', 'Scotty Nguyen', 'Chris Ferguson'],
    correctAnswer: 2,
    explanation:
      'Scotty Nguyen delivered these iconic words at the 1998 Main Event final table. When Kevin McBride called, Nguyen flipped 9-9 for a full house on a J-9 board and won the championship. It remains one of the most quoted moments in poker history.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 71,
    question:
      'Which player was known as "The Mouth" for constant trash talk?',
    options: ['Phil Hellmuth', 'Mike Matusow', 'Tony G', 'Scotty Nguyen'],
    correctAnswer: 1,
    explanation:
      'Mike Matusow earned the nickname "The Mouth" for his non-stop table talk, emotional outbursts, and trash-talking. Despite the antics, he is a highly accomplished player with four WSOP bracelets and an aggressive, skilled playing style.',
    difficulty: 'easy',
    category: 'players',
  },
  {
    id: 72,
    question:
      'Which mysterious online player known as "Isildur1" shocked the high-stakes world?',
    options: ['Tom Dwan', 'Viktor Blom', 'Phil Galfond', 'Ben Sulsky'],
    correctAnswer: 1,
    explanation:
      'Viktor Blom, a young Swede, was the mysterious "Isildur1" who burst onto the nosebleed online scene in 2009. He won over $5 million from top pros in weeks, then lost $4.2 million to Brian Hastings in a single session, making for one of the wildest runs in poker history.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 73,
    question: 'Which player created the famous "durrrr Challenge"?',
    options: ['Phil Galfond', 'Tom Dwan', 'Dan Cates', 'Viktor Blom'],
    correctAnswer: 1,
    explanation:
      'Tom Dwan ("durrrr") offered to play anyone 50,000 hands of high-stakes heads-up. The challenger would win $1.5 million if ahead; Dwan would win $500,000. Patrik Antonius was the first opponent. The challenge against Daniel Cates was famously never completed.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 74,
    question: 'Which female player has won the most WSOP open-event bracelets?',
    options: [
      'Vanessa Selbst',
      'Jennifer Harman',
      'Barbara Enright',
      'Kristen Bicknell',
    ],
    correctAnswer: 0,
    explanation:
      'Vanessa Selbst has three WSOP open-event bracelets, the most by any woman. She accumulated over $11 million in live tournament earnings before retiring from professional poker to work at Bridgewater Associates hedge fund. She is one of the most accomplished poker players regardless of gender.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 75,
    question:
      'Which famous magician became a top poker player and won the Big One for One Drop?',
    options: [
      'David Copperfield',
      'Antonio Esfandiari',
      'Penn Jillette',
      'Criss Angel',
    ],
    correctAnswer: 1,
    explanation:
      'Antonio Esfandiari, "The Magician," was a professional magician before turning to poker. He won the inaugural Big One for One Drop at the 2012 WSOP for a then-record $18.3 million first prize, the largest in live tournament history at the time.',
    difficulty: 'easy',
    category: 'players',
  },
  {
    id: 76,
    question: 'What is Johnny Chan\'s famous nickname?',
    options: ['The Master', 'The Orient Express', 'Shanghai Johnny', 'The Dragon'],
    correctAnswer: 1,
    explanation:
      'Johnny Chan is "The Orient Express." He won back-to-back WSOP Main Events in 1987 and 1988, and his 1988 victory is featured in the movie "Rounders." He nearly three-peated in 1989 but was defeated heads-up by a 24-year-old Phil Hellmuth.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 77,
    question: 'Who won the 2004 WSOP Main Event wearing fossil-lens hologram sunglasses?',
    options: ['Chris Moneymaker', 'Greg Raymer', 'Joe Hachem', 'Jamie Gold'],
    correctAnswer: 1,
    explanation:
      'Greg "Fossilman" Raymer won the 2004 Main Event for $5 million. An avid fossil collector and patent attorney, Raymer wore distinctive holographic fossil-lens sunglasses and qualified through a $160 online satellite on PokerStars.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 78,
    question:
      'Why is Dan Harrington\'s nickname "Action Dan" ironic?',
    options: [
      'He plays extremely fast',
      'He is famous for his ultra-tight, patient style',
      'He never gambles outside of poker',
      'He writes action novels in his spare time',
    ],
    correctAnswer: 1,
    explanation:
      'Dan Harrington, the 1995 WSOP Main Event champion, earned the ironic nickname "Action Dan" because of his famously tight, patient playing style. He also authored "Harrington on Hold\'em," one of the most influential tournament poker book series ever written.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 79,
    question: 'Who is the "Godfather of Poker"?',
    options: ['Benny Binion', 'Doyle Brunson', 'Johnny Moss', 'Jack Binion'],
    correctAnswer: 1,
    explanation:
      'Doyle Brunson earned the title "Godfather of Poker" for his decades-long influence on the game. From underground Texas road games to his WSOP victories, to authoring "Super/System," Brunson shaped modern poker more than perhaps any other player.',
    difficulty: 'easy',
    category: 'players',
  },
  {
    id: 80,
    question:
      'Which player was known as "The Professor" but was later disgraced in the Full Tilt scandal?',
    options: [
      'Howard Lederer',
      'Chris Ferguson',
      'David Sklansky',
      'Mike Caro',
    ],
    correctAnswer: 0,
    explanation:
      'Howard Lederer was called "The Professor" for his analytical approach. His reputation was destroyed when Full Tilt Poker collapsed owing players over $300 million. Lederer was a board member and faced severe criticism for his role, though he was never criminally charged.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 81,
    question:
      'Erik Seidel had a career before poker. What did he do?',
    options: [
      'Professional basketball player',
      'Wall Street trader and world-class backgammon player',
      'Hollywood actor',
      'College math professor',
    ],
    correctAnswer: 1,
    explanation:
      'Erik Seidel was a trader on the American Stock Exchange and a world-class backgammon player before becoming a poker legend. He has won 9 WSOP bracelets and over $40 million in tournament earnings, known for his calm, deeply analytical style.',
    difficulty: 'hard',
    category: 'players',
  },
  {
    id: 82,
    question:
      'Which player created the "Galfond Challenge" and founded Run It Once poker training?',
    options: ['Fedor Holz', 'Phil Galfond', 'Jason Koon', 'Stephen Chidwick'],
    correctAnswer: 1,
    explanation:
      'Phil Galfond (formerly "OMGClayAiken" and "MrSweets28" online) created the Galfond Challenge and founded Run It Once. He famously overcame a 900,000-euro deficit against VeniVidi1993 to win their PLO challenge, one of the greatest comebacks in online poker.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 83,
    question: 'Who was the youngest WSOP Main Event champion?',
    options: ['Phil Hellmuth (24 in 1989)', 'Peter Eastgate (22 in 2008)', 'Joe Cada (21 in 2009)', 'Pius Heinz (22 in 2011)'],
    correctAnswer: 2,
    explanation:
      'Joe Cada won the 2009 WSOP Main Event at just 21 years old, making him the youngest champion. Phil Hellmuth held the record from 1989 (age 24) until Peter Eastgate won in 2008 (age 22), then Cada broke it just one year later.',
    difficulty: 'medium',
    category: 'players',
  },
  {
    id: 84,
    question: 'Who holds the record for most career live tournament earnings?',
    options: [
      'Phil Hellmuth',
      'Daniel Negreanu',
      'Justin Bonomo',
      'Bryn Kenney',
    ],
    correctAnswer: 2,
    explanation:
      'Justin Bonomo holds the record for career live tournament earnings, surpassing $60 million. His biggest score was winning the $1 million Big One for One Drop at the 2018 WSOP for $10 million. He is also one of the most respected high-stakes players in modern poker.',
    difficulty: 'hard',
    category: 'players',
  },
  {
    id: 85,
    question: 'Who won the largest recorded online poker pot (approximately $1.35 million)?',
    options: ['Tom Dwan', 'Viktor Blom', 'Phil Ivey', 'Patrik Antonius'],
    correctAnswer: 3,
    explanation:
      'Patrik Antonius won the largest recorded online pot of approximately $1,356,946 on Full Tilt Poker in 2009, playing PLO against Viktor "Isildur1" Blom. Antonius held a straight flush against Blom\'s full house in a pot that stunned the poker world.',
    difficulty: 'hard',
    category: 'players',
  },
  {
    id: 86,
    question: 'Which player is known for the quote "Poker is a lot like sex. Everyone thinks they\'re the best, but most don\'t have a clue what they\'re doing"?',
    options: ['Mike Sexton', 'Dutch Boyd', 'Phil Hellmuth', 'Amarillo Slim'],
    correctAnswer: 1,
    explanation:
      'Dutch Boyd is credited with this humorous and insightful quote. Boyd was a poker prodigy who won two WSOP bracelets. He was also known for founding PokerSpot, one of the earliest online poker sites, which unfortunately collapsed and lost players\' deposits.',
    difficulty: 'hard',
    category: 'players',
  },

  // ===========================================================================
  // PROP BETS (12 questions)
  // ===========================================================================
  {
    id: 87,
    question: 'What did Brian Zembic do to win a famous $100,000 prop bet?',
    options: [
      'Lived in a closet for 30 days',
      'Got breast implants and kept them for a year',
      'Ate only raw food for 6 months',
      'Shaved his head during the WSOP Main Event',
    ],
    correctAnswer: 1,
    explanation:
      'Brian Zembic, a professional gambler, got breast implants and kept them for a year to win $100,000. Even more remarkably, he never had them removed, reportedly keeping them for over 20 years. This is arguably the most famous prop bet in gambling history.',
    difficulty: 'medium',
    category: 'prop_bets',
  },
  {
    id: 88,
    question: 'What extreme weight loss feat did Ted Forrest accomplish in a prop bet?',
    options: [
      'He lost 100 pounds in 100 days',
      'He lost approximately 50 pounds in about 2 months',
      'He gained 30 pounds of muscle in 60 days',
      'He ate no solid food for 30 days',
    ],
    correctAnswer: 1,
    explanation:
      'Ted Forrest bet Mike Matusow that he could lose approximately 50 pounds (from around 188 to 138) in roughly two months. Forrest won through extreme dieting and exercise, but the dramatic weight loss raised serious health concerns and highlighted the dangerous lengths poker players go to for prop bets.',
    difficulty: 'hard',
    category: 'prop_bets',
  },
  {
    id: 89,
    question: 'What endurance feat did Ashton Griffin accomplish in a prop bet?',
    options: [
      'Ran a 4-minute mile',
      'Ran 70 miles on a treadmill in 24 hours',
      'Swam across Lake Mead',
      'Played poker for 100 straight hours',
    ],
    correctAnswer: 1,
    explanation:
      'Ashton Griffin accepted a prop bet to run 70 miles on a treadmill within 24 hours. Despite not being a distance runner, he completed the challenge. The poker community is notorious for pushing physical limits in prop bets, using competitiveness and bankroll to fuel extreme challenges.',
    difficulty: 'hard',
    category: 'prop_bets',
  },
  {
    id: 90,
    question: 'What was the "durrrr Challenge" essentially?',
    options: [
      'A live high-stakes tournament',
      'A prop bet where Tom Dwan would pay $1.5M if a challenger was ahead after 50,000 online hands',
      'A charity poker marathon',
      'A speed chess tournament among poker players',
    ],
    correctAnswer: 1,
    explanation:
      'Tom Dwan\'s "durrrr Challenge" was a prop bet: play 50,000 hands heads-up at minimum $200/$400 stakes. If the challenger was ahead, Dwan would pay $1.5 million. If Dwan was ahead, the challenger paid $500,000. The challenge with Daniel "Jungleman" Cates was famously never finished.',
    difficulty: 'medium',
    category: 'prop_bets',
  },
  {
    id: 91,
    question: 'What did poker pro Rich Alati attempt for a $100,000 prop bet in 2018?',
    options: [
      'Win 10 tournaments in 30 days',
      'Spend 30 days in a pitch-dark room with no human contact',
      'Play poker for 200 straight hours',
      'Live on $1/day for a year',
    ],
    correctAnswer: 1,
    explanation:
      'Rich Alati bet Rory Young $100,000 that he could spend 30 days isolated in a pitch-dark bathroom with no light, phone, or human contact. He lasted about 20 days before they negotiated a settlement of around $62,400. Alati described hallucinations and extreme disorientation.',
    difficulty: 'medium',
    category: 'prop_bets',
  },
  {
    id: 92,
    question: 'What type of prop bet is Bill Perkins, the hedge fund manager, most famous for?',
    options: [
      'Only poker-related bets',
      'Extremely high-stakes lifestyle and endurance bets',
      'Exclusively sports bets',
      'Low-stakes friendly wagers',
    ],
    correctAnswer: 1,
    explanation:
      'Bill Perkins is legendary for outrageous, high-stakes prop bets: weight loss challenges, staying awake, learning skills, and more. His philosophy from "Die With Zero" is about creating memorable experiences through calculated risks. He once offered $1 million to anyone who could swim from one specific point to another.',
    difficulty: 'easy',
    category: 'prop_bets',
  },
  {
    id: 93,
    question: 'What is a "last longer" bet in poker?',
    options: [
      'A bet on who can stay awake longest',
      'A side bet between players on who will survive longer in a tournament',
      'A bet on how many hours a tournament will last',
      'A bet on the last hand of a session',
    ],
    correctAnswer: 1,
    explanation:
      'A "last longer" is one of the most common prop bets in poker: two or more players agree that whoever survives longest in a tournament wins the side bet. These range from small friendly wagers to massive bets between high-rollers, adding an extra layer of competition.',
    difficulty: 'easy',
    category: 'prop_bets',
  },
  {
    id: 94,
    question: 'What physical feat did WSOP champion Huck Seed win a prop bet on?',
    options: [
      'Dunking a basketball',
      'Running a sub-6-minute mile',
      'Doing 100 push-ups in a row',
      'Completing an obstacle course',
    ],
    correctAnswer: 0,
    explanation:
      'Huck Seed, the 1996 WSOP Main Event champion, is known for athletic prop bets. Standing 6\'7", he famously won a prop bet by dunking a basketball. He has made numerous physical prop bets over the years, being one of the more athletic figures in professional poker.',
    difficulty: 'hard',
    category: 'prop_bets',
  },
  {
    id: 95,
    question: 'What is the "weight loss bet" genre that is famous in the poker world?',
    options: [
      'Betting on who gains weight fastest during the WSOP',
      'Players wagering six or seven figures on losing specific amounts of weight by a deadline',
      'Betting on professional fighters\' weigh-ins',
      'Wagering on the heaviest player at each table',
    ],
    correctAnswer: 1,
    explanation:
      'Weight loss prop bets are a staple of poker culture, with players frequently wagering hundreds of thousands to millions of dollars on losing specific amounts by a set deadline. Mike Matusow, Ted Forrest, Bill Perkins, and many others have participated, sometimes with extreme health consequences.',
    difficulty: 'easy',
    category: 'prop_bets',
  },
  {
    id: 96,
    question: 'What Guinness record did Phil Laak set in an endurance prop?',
    options: [
      'Longest continuous poker session (115 hours)',
      'Most hands dealt in one hour',
      'Longest time without food at a poker table',
      'Most WSOP events entered in one summer',
    ],
    correctAnswer: 0,
    explanation:
      'Phil "The Unabomber" Laak set the Guinness World Record for the longest continuous poker session at 115 hours (nearly 5 days) of uninterrupted play at the Bellagio in 2010. Known for his trademark hoodie and sunglasses, Laak pushed through extreme sleep deprivation.',
    difficulty: 'medium',
    category: 'prop_bets',
  },
  {
    id: 97,
    question: 'What famous diet-related prop bet did Phil Ivey reportedly make?',
    options: [
      'He bet $1 million he could eat 50 hot dogs in 10 minutes',
      'He bet around $1 million he could maintain a strict vegan diet for a year',
      'He bet he could go without eating for 7 days',
      'He bet he could live on only smoothies for 6 months',
    ],
    correctAnswer: 1,
    explanation:
      'Phil Ivey reportedly made a prop bet for around $1 million with several poker players that he could maintain a strict vegan diet for a full year. Poker players love lifestyle bets because they test discipline over extended periods, a quality that also makes them strong at the table.',
    difficulty: 'medium',
    category: 'prop_bets',
  },
  {
    id: 98,
    question: 'What is a common trait of the most famous poker prop bets?',
    options: [
      'They always involve poker hands',
      'They typically test physical endurance, willpower, or willingness to do something outrageous for money',
      'They are always under $1,000',
      'They are sanctioned by the WSOP',
    ],
    correctAnswer: 1,
    explanation:
      'The most legendary poker prop bets rarely involve poker itself. They test physical endurance (running 70 miles), willpower (diets, isolation), or sheer audacity (breast implants). These bets thrive in poker culture because players are risk-tolerant, competitive, and have the bankrolls to back up outrageous wagers.',
    difficulty: 'easy',
    category: 'prop_bets',
  },

  // ===========================================================================
  // MATH (18 questions)
  // ===========================================================================
  {
    id: 99,
    question: 'How many possible two-card starting hand combinations are there in Hold\'em?',
    options: ['169', '1,326', '2,652', '270,725'],
    correctAnswer: 1,
    explanation:
      'There are 1,326 possible starting hand combos (52 choose 2 = 1,326). These reduce to 169 strategically distinct types: 13 pocket pairs, 78 suited combos, and 78 offsuit combos. Knowing combo counts is essential for range analysis.',
    difficulty: 'medium',
    category: 'math',
  },
  {
    id: 100,
    question: 'What are the approximate odds of being dealt pocket aces?',
    options: ['1 in 50', '1 in 110', '1 in 221', '1 in 500'],
    correctAnswer: 2,
    explanation:
      'The odds of pocket aces are 1 in 221 (0.45%). The math: (4/52) x (3/51) = 12/2,652 = 1/221. This is the same for any specific pocket pair. You will be dealt AA approximately once every 3.5 hours in a typical live game dealing 60 hands per hour.',
    difficulty: 'easy',
    category: 'math',
  },
  {
    id: 101,
    question: 'An open-ended straight draw on the flop gives you how many outs?',
    options: ['4', '6', '8', '10'],
    correctAnswer: 2,
    explanation:
      'An open-ended straight draw has 8 outs: four cards on each end. For example, holding 7-8 on a 5-6-K board, any 4 or any 9 completes it. Using the Rule of 4: 8 x 4 = 32% equity on the flop with two cards to come.',
    difficulty: 'easy',
    category: 'math',
  },
  {
    id: 102,
    question: 'The pot is $200, your opponent bets $100. What pot odds are you getting?',
    options: ['2:1', '3:1', '1:1', '4:1'],
    correctAnswer: 1,
    explanation:
      'After the $100 bet, the pot is $300. You need $100 to call, so your odds are 300:100 or 3:1. You need to win at least 25% of the time (100/(300+100) = 25%) for a profitable call. This quick pot odds calculation is fundamental poker math.',
    difficulty: 'easy',
    category: 'math',
  },
  {
    id: 103,
    question: 'What is the probability of flopping a set when holding a pocket pair?',
    options: ['About 5.5%', 'About 11.8%', 'About 15%', 'About 20%'],
    correctAnswer: 1,
    explanation:
      'The chance of flopping at least one of your two remaining cards is about 11.8% (roughly 1 in 8.5). Exact calculation: 1 - (48/50 x 47/49 x 46/48) = 11.76%. This is why "set-mining" with small pairs requires good implied odds to be profitable.',
    difficulty: 'medium',
    category: 'math',
  },
  {
    id: 104,
    question: 'What is the probability of being dealt suited cards in Hold\'em?',
    options: ['About 15%', 'About 24%', 'About 33%', 'About 50%'],
    correctAnswer: 1,
    explanation:
      'The probability of two suited cards is about 23.5%. After your first card, 12 of the remaining 51 cards share its suit: 12/51 = 23.53%. Being suited adds roughly 2-3% equity in an all-in preflop scenario compared to offsuit.',
    difficulty: 'medium',
    category: 'math',
  },
  {
    id: 105,
    question: 'Pocket aces vs. pocket kings all-in preflop: what is AA\'s approximate equity?',
    options: ['About 65%', 'About 75%', 'About 81%', 'About 95%'],
    correctAnswer: 2,
    explanation:
      'Aces have approximately 81% equity against kings preflop. Kings need to hit a set, straight, or flush to win. This is the most dominant specific-pair-vs-pair matchup. The ~19% that kings win is a major reason poker has variance and bad beats.',
    difficulty: 'medium',
    category: 'math',
  },
  {
    id: 106,
    question: 'How many total five-card poker hands can be dealt from a 52-card deck?',
    options: ['1,326', '2,598,960', '3,744,000', '311,875,200'],
    correctAnswer: 1,
    explanation:
      'There are 2,598,960 possible five-card hands (52 choose 5). Only 4 are royal flushes, making the odds 1 in 649,740. There are 36 straight flushes (non-royal), 624 four-of-a-kind hands, and 3,744 full houses. These numbers underpin all poker probability calculations.',
    difficulty: 'hard',
    category: 'math',
  },
  {
    id: 107,
    question: 'With a flush draw (9 outs) on the turn, what is the probability of hitting the river card?',
    options: ['About 15%', 'About 19.6%', 'About 25%', 'About 35%'],
    correctAnswer: 1,
    explanation:
      'With 9 outs on the turn, the probability is 9/46 = 19.6% (46 unseen cards remain: 52 minus 2 hole cards minus 4 board cards). The Rule of 2 gives a quick estimate: 9 x 2 = 18%, which is close enough for in-game decisions.',
    difficulty: 'medium',
    category: 'math',
  },
  {
    id: 108,
    question: 'What are the odds against flopping a flush with two suited hole cards?',
    options: ['About 15:1', 'About 57:1', 'About 118:1', 'About 250:1'],
    correctAnswer: 2,
    explanation:
      'The odds against flopping a flush are about 118:1 (0.84% probability). You need three flop cards of your suit: (11/50) x (10/49) x (9/48) = 990/117,600 = 0.84%. Flopping a flush is rare but devastating when it happens.',
    difficulty: 'hard',
    category: 'math',
  },
  {
    id: 109,
    question: 'In Omaha, how many two-card combinations can you make from your four hole cards?',
    options: ['4', '6', '8', '12'],
    correctAnswer: 1,
    explanation:
      'From four cards, you can make 6 different two-card combinations (4 choose 2 = 6). This is why Omaha hands have much more equity and playability than Hold\'em hands. Each combo pairs with the board differently, creating many potential made hands and draws.',
    difficulty: 'easy',
    category: 'math',
  },
  {
    id: 110,
    question: 'When you hold KK, what is the probability of an ace appearing on the flop?',
    options: ['About 22.6%', 'About 35%', 'About 50%', 'About 65%'],
    correctAnswer: 0,
    explanation:
      'The probability of at least one ace on the flop when holding KK is about 22.6%. Calculate: 1 - P(no ace) = 1 - (48/50 x 47/49 x 46/48) = 22.6%. So roughly 1 in 4.4 flops brings an ace to worry about.',
    difficulty: 'hard',
    category: 'math',
  },
  {
    id: 111,
    question: 'Your opponent makes a pot-sized bet. What equity do you need to call profitably?',
    options: ['25%', '33%', '40%', '50%'],
    correctAnswer: 1,
    explanation:
      'Facing a pot-sized bet, you need 33% equity. If the pot is $100 and opponent bets $100, you call $100 to win a total of $300. Break-even: $100/$300 = 33.3%. This is one of the most important calculations to memorize in poker.',
    difficulty: 'medium',
    category: 'math',
  },
  {
    id: 112,
    question: 'How many combos of AK (suited + offsuit) exist?',
    options: [
      '8 total (4 suited, 4 offsuit)',
      '16 total (4 suited, 12 offsuit)',
      '12 total (6 suited, 6 offsuit)',
      '20 total (4 suited, 16 offsuit)',
    ],
    correctAnswer: 1,
    explanation:
      'There are 16 combos of AK: 4 suited (one per suit) and 12 offsuit (4 aces x 3 non-matching kings each). By comparison, any pocket pair has only 6 combos (4 choose 2 = 6). Understanding combo counts is essential for accurate range analysis.',
    difficulty: 'hard',
    category: 'math',
  },
  {
    id: 113,
    question: 'If you have 15 outs on the flop, what is your approximate equity using the Rule of 4?',
    options: ['About 45%', 'About 54%', 'About 60%', 'About 70%'],
    correctAnswer: 2,
    explanation:
      'Rule of 4: 15 x 4 = 60%. The actual probability is about 54.1%, so the Rule of 4 overestimates with many outs. A refined formula subtracts (outs - 8) when you have more than 8 outs: 15 x 4 - 7 = 53%, much closer to reality.',
    difficulty: 'medium',
    category: 'math',
  },
  {
    id: 114,
    question: 'At a 9-handed table, what is the approximate probability someone has pocket aces?',
    options: ['About 2%', 'About 4%', 'About 8%', 'About 15%'],
    correctAnswer: 1,
    explanation:
      'Approximately 4%. Each player has a 1/221 chance (~0.45%). For 9 players: 1 - (220/221)^9 = approximately 4.0%. At a full table, someone has aces much more often than you might intuitively expect, which matters when evaluating preflop action.',
    difficulty: 'hard',
    category: 'math',
  },
  {
    id: 115,
    question: 'What is the probability of a specific player being dealt at least one ace?',
    options: ['About 10%', 'About 15%', 'About 30%', 'About 40%'],
    correctAnswer: 1,
    explanation:
      'The probability is approximately 14.9%. Calculate: 1 - P(no aces) = 1 - (48/52 x 47/51) = 1 - 0.8507 = 14.9%. So roughly once every 6.7 hands you will have at least one ace in your starting hand.',
    difficulty: 'medium',
    category: 'math',
  },
  {
    id: 116,
    question: 'In a coin-flip situation (e.g., AK suited vs. pocket jacks), what is the approximate equity split?',
    options: [
      '50% / 50%',
      '45% / 55% in favor of the pair',
      '54% / 46% in favor of the pair',
      '60% / 40% in favor of the pair',
    ],
    correctAnswer: 2,
    explanation:
      'A classic "coin flip" like AKs vs. JJ is approximately 54/46 in favor of the pair. The pair is a slight favorite because it is already a made hand while AK needs to improve. However, suited overcards have more equity than offsuit due to flush potential. These matchups are called coin flips because they are close to even.',
    difficulty: 'medium',
    category: 'math',
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a random trivia question
 */
export function getRandomQuestion(): TriviaQuestion {
  const index = Math.floor(Math.random() * triviaQuestions.length);
  return triviaQuestions[index];
}

/**
 * Get all questions in a specific category
 */
export function getQuestionsByCategory(
  category: TriviaQuestion['category']
): TriviaQuestion[] {
  return triviaQuestions.filter((q) => q.category === category);
}

/**
 * Get all questions at a specific difficulty level
 */
export function getQuestionsByDifficulty(
  difficulty: TriviaQuestion['difficulty']
): TriviaQuestion[] {
  return triviaQuestions.filter((q) => q.difficulty === difficulty);
}

/**
 * Get questions filtered by both category and difficulty
 */
export function getFilteredQuestions(
  category?: TriviaQuestion['category'],
  difficulty?: TriviaQuestion['difficulty']
): TriviaQuestion[] {
  return triviaQuestions.filter((q) => {
    if (category && q.category !== category) return false;
    if (difficulty && q.difficulty !== difficulty) return false;
    return true;
  });
}

/**
 * Get a random set of N questions, optionally filtered
 */
export function getRandomQuestions(
  count: number,
  category?: TriviaQuestion['category'],
  difficulty?: TriviaQuestion['difficulty']
): TriviaQuestion[] {
  const pool = getFilteredQuestions(category, difficulty);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
