// =============================================================================
// Poker Variants - Comprehensive data for 25 poker game types
// =============================================================================

export interface PokerVariant {
  id: string;
  name: string;
  description: string;
  history: string;
  category: 'holdem' | 'stud' | 'draw' | 'mixed' | 'specialty';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rules: string;
  dealingStructure: string;
  bettingRounds: string[];
  holeCards: number;
  communityCards: number;
  strategyTips: string[];
  commonMistakes: string[];
}

export const pokerVariants: PokerVariant[] = [
  // =========================================================================
  // 1. No-Limit Texas Hold'em
  // =========================================================================
  {
    id: 'no-limit-texas-holdem',
    name: "No-Limit Texas Hold'em",
    description:
      "The most popular poker variant in the world. Players receive two hole cards and share five community cards, with the freedom to bet any amount up to their entire stack at any time.",
    history:
      "Texas Hold'em originated in Robstown, Texas in the early 1900s and was introduced to Las Vegas in 1963 by Corky McCorquodale and other Texas road gamblers. It became the main event game at the World Series of Poker in 1971. Chris Moneymaker's 2003 WSOP Main Event victory, after qualifying through an $86 online satellite, ignited the poker boom and made No-Limit Hold'em a global phenomenon.",
    category: 'holdem',
    difficulty: 'beginner',
    rules:
      "Each player is dealt two private hole cards. Five community cards are dealt face-up in three stages: the flop (3 cards), the turn (1 card), and the river (1 card). Players make the best five-card hand using any combination of their hole cards and the community cards. In no-limit, players can bet any amount from the minimum bet up to their entire chip stack at any time.",
    dealingStructure:
      "Two forced bets (small blind and big blind) are posted. Each player receives 2 cards face down. A burn card precedes each community card deal: 3 cards on the flop, 1 on the turn, 1 on the river.",
    bettingRounds: ['Preflop', 'Flop', 'Turn', 'River'],
    holeCards: 2,
    communityCards: 5,
    strategyTips: [
      "Position is king. Play tighter from early position and widen your range in late position. The button is the most profitable seat at the table.",
      "Master pot odds and implied odds. Know when the price you're getting justifies calling with a drawing hand and when it doesn't.",
      "Pay attention to bet sizing. Your bets should tell a consistent story. Use larger sizes on wet, coordinated boards and smaller sizes on dry boards.",
      "Don't fall in love with pretty hands. Suited connectors and small pairs are great multiway but lose value heads-up against aggressive opponents.",
      "Study three-betting ranges. A well-constructed three-bet strategy with both value hands and bluffs is essential for modern play."
    ],
    commonMistakes: [
      "Playing too many hands preflop. Beginners often play 40-50% of hands when a solid range is closer to 15-25% depending on position.",
      "Calling too much instead of raising or folding. Passive play bleeds chips. If your hand is good enough to call, consider whether it's good enough to raise.",
      "Ignoring position. Playing the same range from under-the-gun as you would from the button is a massive leak.",
      "Failing to adjust to opponents. Playing the same strategy against a tight nit and a loose maniac is leaving money on the table.",
      "Overvaluing top pair. Top pair with a weak kicker is often a marginal hand, especially on coordinated boards with heavy action."
    ]
  },

  // =========================================================================
  // 2. Limit Texas Hold'em
  // =========================================================================
  {
    id: 'limit-texas-holdem',
    name: "Limit Texas Hold'em",
    description:
      "The structured betting version of Hold'em where bets and raises are fixed amounts. Once the dominant form of poker in cardrooms, it rewards patience, hand reading, and extracting thin value.",
    history:
      "Limit Hold'em was the standard form of Texas Hold'em played in casinos from the 1970s through the early 2000s. The game was the bread and butter of cardrooms across America. Legends like Doyle Brunson, Chip Reese, and Jennifer Harman built their reputations in limit games. As no-limit grew in popularity after the 2003 poker boom, limit tables became less common but remain a staple in mixed games.",
    category: 'holdem',
    difficulty: 'intermediate',
    rules:
      "Identical to No-Limit Hold'em in hand mechanics, but bets and raises are fixed. Preflop and on the flop, bets and raises must be the size of the big blind (the 'small bet'). On the turn and river, bets and raises double to the 'big bet.' There is typically a cap of one bet and three raises per betting round.",
    dealingStructure:
      "Same as No-Limit Hold'em: blinds, 2 hole cards, flop, turn, river. The key difference is in bet sizing, not dealing.",
    bettingRounds: [
      'Preflop (small bet)',
      'Flop (small bet)',
      'Turn (big bet)',
      'River (big bet)'
    ],
    holeCards: 2,
    communityCards: 5,
    strategyTips: [
      "Value bet relentlessly. Since you can't protect hands with large bets, extracting maximum value from made hands is how you profit.",
      "Drawing hands gain value because pot odds are almost always favorable. Flush draws and open-ended straight draws are premium holdings.",
      "Semi-bluffing is powerful on the flop and turn because the fixed bet size gives you excellent risk-to-reward on your bluffs.",
      "Pay close attention to the number of big bets you're winning or losing per hour. Small edges compound in limit poker.",
      "Capping preflop with premium hands is essential to build pots when you have an equity advantage."
    ],
    commonMistakes: [
      "Trying to bluff too much. In limit poker, the pot odds opponents get make pure bluffs much less effective than in no-limit.",
      "Playing too loose preflop. While the fixed betting makes speculative hands more playable, discipline in hand selection is still crucial.",
      "Giving up too easily on the river. The pot is often laying you strong odds to call with marginal hands, so don't fold too frequently.",
      "Not raising enough for value. Beginners often just call with strong hands when they should be raising or re-raising.",
      "Ignoring pot size relative to bet size. As the pot grows, the fixed bet becomes a smaller percentage, changing the correct strategy."
    ]
  },

  // =========================================================================
  // 3. Pot-Limit Omaha
  // =========================================================================
  {
    id: 'pot-limit-omaha',
    name: 'Pot-Limit Omaha',
    description:
      "The second most popular poker variant worldwide. Players receive four hole cards and must use exactly two of them with three community cards. Pot-limit betting creates massive, action-packed pots.",
    history:
      "Omaha poker evolved from Texas Hold'em in the 1980s, likely originating in Detroit before spreading to Las Vegas. Robert Turner introduced the game to the Las Vegas Golden Nugget casino. It became 'Omaha' when it was offered at the WSOP. PLO has steadily grown in popularity, especially in European and high-stakes games, and is now the game of choice for many action players.",
    category: 'holdem',
    difficulty: 'intermediate',
    rules:
      "Each player is dealt four hole cards. Five community cards are dealt (flop, turn, river) as in Hold'em. The critical rule: players MUST use exactly two of their four hole cards combined with exactly three community cards to make their best five-card hand. Maximum bet is the size of the current pot (pot-limit).",
    dealingStructure:
      "Blinds are posted. Each player receives 4 hole cards face down. Community cards are dealt identically to Hold'em: 3 on the flop, 1 on the turn, 1 on the river, each preceded by a burn card.",
    bettingRounds: ['Preflop', 'Flop', 'Turn', 'River'],
    holeCards: 4,
    communityCards: 5,
    strategyTips: [
      "Hand connectivity is everything. The best starting hands have all four cards working together: double-suited, connected, with high pairs (e.g., A-A-K-K double suited).",
      "Position matters even more than in Hold'em. Being in position allows you to control pot size, which is crucial in a pot-limit game where pots escalate quickly.",
      "Respect the nuts. In Omaha, with so many card combinations in play, someone frequently has the nuts. Don't overplay non-nut hands.",
      "Avoid 'dangler' hands. A hand like A-A-7-2 rainbow looks appealing but the 7 and 2 are dead weight. All four cards should contribute.",
      "Draws are premium. Wrap straight draws (13-16 outs) combined with flush draws create monster hands that can bet and raise aggressively."
    ],
    commonMistakes: [
      "Overvaluing Hold'em hands. A pair of aces with two random cards is not nearly as strong in Omaha as it is in Hold'em.",
      "Forgetting the 'exactly two' rule. New players often think they've made a flush with one hole card and four board cards -- that's not a valid hand.",
      "Chasing non-nut draws. In Omaha, making a non-nut flush or low straight often leads to second-best hands and big losses.",
      "Playing too many hands. With four cards, every hand looks playable. Discipline in hand selection is the foundation of winning PLO.",
      "Not understanding pot-limit math. Knowing the maximum bet at every point in the hand is essential for planning bet sizes across streets."
    ]
  },

  // =========================================================================
  // 4. Omaha Hi-Lo
  // =========================================================================
  {
    id: 'omaha-hi-lo',
    name: 'Omaha Hi-Lo (8 or Better)',
    description:
      "A split-pot version of Omaha where the pot is divided between the best high hand and the best qualifying low hand. The '8 or better' qualifier means a low hand must have five unpaired cards ranked 8 or below.",
    history:
      "Omaha Hi-Lo (also called O8 or Omaha/8) developed as a split-pot variant in the 1980s. The '8-or-better' qualifier was added to prevent situations where very weak low hands would win half the pot. It became a WSOP event and a staple in mixed games like HORSE and 8-Game. The game is particularly popular in online poker and with skilled players who appreciate its strategic complexity.",
    category: 'holdem',
    difficulty: 'advanced',
    rules:
      "Plays like standard Omaha: four hole cards, five community cards, must use exactly two hole cards and three community cards. The twist: the pot is split between the best high hand and the best qualifying low hand. A low hand must have five unpaired cards 8 or lower (aces count as low). Straights and flushes don't disqualify a low hand. If no low qualifies, the high hand scoops the entire pot.",
    dealingStructure:
      "Identical to PLO. Blinds, four hole cards per player, flop-turn-river community cards. Can be played as pot-limit or fixed-limit (fixed-limit is more traditional).",
    bettingRounds: ['Preflop', 'Flop', 'Turn', 'River'],
    holeCards: 4,
    communityCards: 5,
    strategyTips: [
      "Scoop potential is the name of the game. Hands that can win both the high and low pot are far more valuable than hands that can only win one half.",
      "A-2 suited is the most valuable starting component because it gives you the nut low draw plus flush potential for the high.",
      "Beware of being 'quartered.' If you split the low with another player while a third player takes the high, you only get 25% of the pot.",
      "Nut low with a redraw is ideal. Having A-2 with backup low cards (A-2-3 or A-2-4) protects you when an ace or deuce hits the board and counterfeits other lows.",
      "High-only hands must be premium. If you can't win the low, you need a very strong high hand to justify putting money in the pot, since you can only win half."
    ],
    commonMistakes: [
      "Playing hands without low potential in multiway pots. Without a low draw, you're competing for only half the pot while others can scoop.",
      "Not understanding counterfeiting. If you hold A-2 and an ace or deuce appears on the board, your low is counterfeited unless you have a backup low card.",
      "Overvaluing bare low draws. Having just A-2 with nothing else means you can only win half the pot at best.",
      "Ignoring board texture for low possibilities. Three low cards on the flop make it very likely a low will be made by the river.",
      "Failing to free-roll. When you have the nut low locked up, raising to build the pot is critical since you're guaranteed at least half."
    ]
  },

  // =========================================================================
  // 5. 5-Card Omaha (Big O variant)
  // =========================================================================
  {
    id: '5-card-omaha',
    name: '5-Card Omaha',
    description:
      "An action-heavy Omaha variant where each player receives five hole cards instead of four. Must still use exactly two hole cards and three community cards. Creates even bigger draws and wilder action than standard PLO.",
    history:
      "5-Card Omaha (also known as 5-Card PLO) grew in popularity in the 2010s as poker players sought higher-action games. It became a regular offering on major online poker sites and started appearing in live cardrooms, especially in Europe and at high-stakes private games. The game is a natural evolution of 4-card PLO for players who wanted even more action and bigger hands.",
    category: 'holdem',
    difficulty: 'advanced',
    rules:
      "Each player receives five hole cards. Community cards are dealt as in Hold'em. Players must use exactly two of their five hole cards and exactly three community cards. Typically played as pot-limit. With the extra card, hand equities run even closer together than in PLO, and nut hands appear with greater frequency.",
    dealingStructure:
      "Blinds posted, five hole cards dealt to each player. Flop (3), turn (1), river (1) with burn cards, identical to Hold'em/Omaha dealing.",
    bettingRounds: ['Preflop', 'Flop', 'Turn', 'River'],
    holeCards: 5,
    communityCards: 5,
    strategyTips: [
      "Nut hands are even more important than in PLO. With more card combinations in play, the nuts appear extremely often. Non-nut hands are very dangerous.",
      "Hand selection must focus on five cards that all work together. Having five connected, double-suited cards is far more valuable than a pair with three disconnected side cards.",
      "Position and pot control are paramount. Pots escalate even faster than in PLO, so being in position to control sizing is a massive edge.",
      "Draws are incredibly common. Multi-way pots will often feature several players with strong draws, so betting for protection is less effective.",
      "Be prepared for extreme variance. Even optimal play leads to bigger swings than PLO because equities run so close preflop."
    ],
    commonMistakes: [
      "Playing like it's 4-card PLO. The extra card changes hand strength distributions dramatically. Hands that are strong in PLO may be marginal in 5-Card.",
      "Overvaluing sets and two pair. With five hole cards per player, these hands are crushed far more often by straights and flushes.",
      "Not adjusting to the increased frequency of nut hands. Going to showdown with the second-nut flush is a recipe for losing stacks.",
      "Playing too many hands. Five cards make every hand look interesting, but discipline is even more important than in PLO."
    ]
  },

  // =========================================================================
  // 6. Seven Card Stud
  // =========================================================================
  {
    id: 'seven-card-stud',
    name: 'Seven Card Stud',
    description:
      "The classic poker variant that dominated American cardrooms before Hold'em took over. No community cards. Each player receives seven cards (three down, four up) and makes the best five-card hand.",
    history:
      "Seven Card Stud evolved from earlier stud variants in the mid-20th century and became the dominant poker game in the Eastern United States from the 1950s through the 1990s. Games like those at the Mayfair Club in New York and the old Las Vegas cardrooms were primarily stud. Legends like Chip Reese, Stu Ungar, and David 'Chip' Reese made their names in stud games. The WSOP has featured stud events since its inception.",
    category: 'stud',
    difficulty: 'intermediate',
    rules:
      "No community cards. Each player antes, then receives two cards face down and one card face up (third street). The lowest up-card posts a forced bet (the bring-in). Betting rounds occur on each subsequent street as one card is dealt to each active player: 4th street (up), 5th street (up), 6th street (up), and 7th street (down). Players make the best five-card hand from their seven cards. Played with fixed-limit betting, with the small bet on 3rd-4th streets and big bet on 5th-7th streets.",
    dealingStructure:
      "All players ante. Two cards down, one up (3rd street). One up card on 4th, 5th, and 6th streets. Final card (7th street) dealt face down. Maximum 8 players (since 8 x 7 = 56 cards needed from a 52-card deck, a communal 7th street card may be dealt if needed).",
    bettingRounds: [
      '3rd Street (small bet)',
      '4th Street (small bet, or big if open pair showing)',
      '5th Street (big bet)',
      '6th Street (big bet)',
      '7th Street (big bet)'
    ],
    holeCards: 3,
    communityCards: 0,
    strategyTips: [
      "Memory is crucial. Track every card you see folded -- they provide critical information about your outs and opponents' likely holdings.",
      "Starting hand selection is fundamental. Premium starts include rolled-up trips, high pairs, and three to a flush or straight with live cards.",
      "Live cards are everything. A pair of 8s with all your improvement cards still in the deck is better than a pair of kings with dead outs.",
      "Stealing antes with a high door card is profitable. If you show an ace or king and no one else shows strength, a 3rd-street raise often takes the pot.",
      "Slow down when you see scare cards on your opponents' boards. If they're showing a four-flush or four-straight, respect it."
    ],
    commonMistakes: [
      "Not paying attention to exposed cards. In stud, remembering folded cards is the single most important skill, and ignoring them is the biggest leak.",
      "Chasing draws with dead cards. If you need a heart flush but see four hearts folded around the table, your draw is severely weakened.",
      "Playing too many hands on 3rd street. Starting hand discipline is the foundation of stud strategy.",
      "Not raising on 3rd street with premium pairs. Let opponents pay to draw against you when you have the best hand.",
      "Calling too many bets on 5th street. This is the critical decision point. If you're behind on 5th street with big bets coming, folding saves significant money."
    ]
  },

  // =========================================================================
  // 7. Seven Card Stud Hi-Lo
  // =========================================================================
  {
    id: 'seven-card-stud-hi-lo',
    name: 'Seven Card Stud Hi-Lo (8 or Better)',
    description:
      "The split-pot version of Seven Card Stud. The pot is divided between the best high hand and the best qualifying low hand (8 or better). A staple in mixed game rotations.",
    history:
      "Stud Hi-Lo evolved naturally from Seven Card Stud as players sought more action and complexity. It became a WSOP event and was included in the original HORSE format. The game rewards players who can simultaneously track high and low possibilities, making it one of the most skill-intensive poker variants. It remains a featured game in the WSOP and major mixed-game tournaments.",
    category: 'stud',
    difficulty: 'advanced',
    rules:
      "Plays identically to Seven Card Stud in structure. The pot is split between the best high hand and the best qualifying low hand. A qualifying low must have five unpaired cards ranked 8 or below. Aces play both high and low. Straights and flushes do not disqualify a low hand. Players can use different cards for their high and low hands. If no low qualifies, the high hand scoops.",
    dealingStructure:
      "Identical to Seven Card Stud: ante, two down cards and one up card, then up cards on 4th-6th street, final card down on 7th street. Played as fixed-limit.",
    bettingRounds: [
      '3rd Street (small bet)',
      '4th Street (small bet)',
      '5th Street (big bet)',
      '6th Street (big bet)',
      '7th Street (big bet)'
    ],
    holeCards: 3,
    communityCards: 0,
    strategyTips: [
      "Start with hands that have scoop potential. A-2-3 suited is incredibly powerful because it can make nut lows and strong highs simultaneously.",
      "Low cards are premium. Starting with three low cards gives you a shot at both halves of the pot, while high-only hands can only win half.",
      "Track opponents' up-cards for both high and low. Knowing which low cards and which high cards are dead dramatically changes your strategy.",
      "Avoid getting quartered. If two players are going for low and one is going for high, the low players each get only 25% of the pot.",
      "When you've locked up one half, play aggressively to build the pot and free-roll for the other half."
    ],
    commonMistakes: [
      "Playing high-only hands in multiway pots. You can only win half the pot at best, and you're often against multiple opponents splitting low.",
      "Ignoring card removal for lows. If several low cards are showing around the table, it's much harder to make a qualifying low.",
      "Not understanding that aces are the most valuable card. They contribute to both the nut low and high straights, flushes, and pairs.",
      "Continuing with weak lows when better lows are showing. If an opponent's board shows A-2 and yours shows 3-6, you're in trouble for the low.",
      "Playing too passively with scoop draws. When you have A-2-3 with flush potential, aggressive play builds pots that you're favored to scoop."
    ]
  },

  // =========================================================================
  // 8. Razz
  // =========================================================================
  {
    id: 'razz',
    name: 'Razz',
    description:
      "The lowball version of Seven Card Stud. The best (lowest) hand wins the entire pot. Aces are low, and straights and flushes don't count against you. The best possible hand is A-2-3-4-5 (the 'wheel').",
    history:
      "Razz has been played since at least the 1960s and was added to the WSOP in 1971, making it one of the original WSOP events. It is the 'R' in HORSE. The game is notorious for causing extreme frustration due to bad beats and drawn-out hands. Stu Ungar was famous for his Razz prowess. The game has a devoted following among mixed-game players despite being one of the less popular standalone variants.",
    category: 'stud',
    difficulty: 'intermediate',
    rules:
      "Plays like Seven Card Stud but only the lowest hand wins. Aces are always low. Straights and flushes do not count against the low. The best hand is A-2-3-4-5 (the wheel). On 3rd street, the highest up-card brings in (forced bet), opposite of regular stud. Pairs are bad (they don't help your low). Standard fixed-limit betting structure.",
    dealingStructure:
      "Identical deal to Seven Card Stud: ante, two down and one up, then up cards on 4th-6th, down on 7th. Highest door card brings in. Lowest showing hand acts first on 4th street onward.",
    bettingRounds: [
      '3rd Street (small bet)',
      '4th Street (small bet)',
      '5th Street (big bet)',
      '6th Street (big bet)',
      '7th Street (big bet)'
    ],
    holeCards: 3,
    communityCards: 0,
    strategyTips: [
      "Start with three cards to a wheel (A-2-3, A-2-4, A-3-4, etc.). Three-card lows with all cards 5 or below are premium starting hands.",
      "Steal aggressively when you have a low door card and opponents show high cards. Ante stealing is a critical source of profit in Razz.",
      "Remember all the folded cards, especially low ones. If you see many 2s, 3s, and 4s folded, your opponents' draws are severely weakened.",
      "Avoid chasing when you brick on 4th or 5th street. Catching a pair or high card early often means your hand is dead.",
      "Patience is the primary virtue. Razz rewards tight play and punishes players who enter pots with marginal three-card starts."
    ],
    commonMistakes: [
      "Playing any three low cards regardless of how high they are. Starting with 6-7-8 is far weaker than A-2-5.",
      "Not stealing antes aggressively. When your door card is lower than all opponents' door cards, raising is almost always correct.",
      "Continuing with paired boards. Catching a pair, especially early, usually means you should abandon the hand.",
      "Ignoring opponents' boards. If an opponent is showing 2-3-5, they likely have a very strong hand and you should proceed with caution.",
      "Tilting after bad beats. Razz is famous for frustrating runouts. Emotional control is essential."
    ]
  },

  // =========================================================================
  // 9. 2-7 Triple Draw
  // =========================================================================
  {
    id: '2-7-triple-draw',
    name: '2-7 Triple Draw',
    description:
      "A lowball draw poker game where the worst traditional poker hand wins. Aces are high, and straights and flushes count against you. Players get three draw opportunities to make the best (lowest) hand. The nut hand is 2-3-4-5-7 (the 'number one').",
    history:
      "2-7 Triple Draw emerged in the 1990s and quickly gained popularity among high-stakes cash game players. It became a WSOP bracelet event in 2004. The game is beloved by poker's elite for its deep strategy and high skill ceiling. Players like Phil Ivey, John Hennigan, and Eli Elezra are known as masters of the game. It's a featured component of mixed game rotations like the 8-Game.",
    category: 'draw',
    difficulty: 'advanced',
    rules:
      "Each player receives five cards face down. There are four betting rounds with three draw rounds in between. In each draw, players can discard 0-5 cards and receive replacements. The goal is to make the lowest possible hand. Aces are ALWAYS high. Straights and flushes COUNT AGAINST you. Pairs are bad. The best possible hand is 2-3-4-5-7 (not 2-3-4-5-6 because that's a straight). Played as fixed-limit.",
    dealingStructure:
      "Blinds posted. Five cards dealt to each player face down. Three draw rounds, each followed by a betting round. Players may exchange 0 to 5 cards in each draw.",
    bettingRounds: [
      'Pre-draw (small bet)',
      'After 1st draw (small bet)',
      'After 2nd draw (big bet)',
      'After 3rd draw (big bet)'
    ],
    holeCards: 5,
    communityCards: 0,
    strategyTips: [
      "Starting hand selection: Look for hands with cards between 2 and 7 with no pairs, no straight draws, and no flush draws. 2-3-4-7-x drawing one is strong.",
      "Drawing fewer cards is a massive advantage. A one-card draw against a two-card draw is a huge favorite. 'Snowing' (standing pat with a mediocre hand) can be powerful.",
      "Position is extremely important. Acting last lets you see how many cards opponents draw before deciding your own action.",
      "Break straights and flushes. If you hold 2-3-4-5-6, discard the 6 because the straight counts against you. Similarly, break four-flushes.",
      "Count cards that have been discarded. In a multi-way pot, tracking which low cards are gone helps estimate your drawing odds."
    ],
    commonMistakes: [
      "Forgetting that aces are high. A-2-3-4-7 is not a good hand because the ace is the highest card, making it essentially a king-high equivalent in value.",
      "Not breaking straights and flushes. New players often celebrate making a straight without realizing it counts against them.",
      "Drawing too many cards. A three-card draw in 2-7 Triple Draw is almost always a losing play.",
      "Snowing too often or not enough. Standing pat as a bluff (snowing) is a key tactic, but overdoing it makes you exploitable.",
      "Ignoring number of draws remaining. The value of drawing hands changes dramatically between the first and third draws."
    ]
  },

  // =========================================================================
  // 10. 2-7 Single Draw
  // =========================================================================
  {
    id: '2-7-single-draw',
    name: '2-7 Single Draw',
    description:
      "The no-limit version of 2-7 lowball with only one draw. Players receive five cards and get a single chance to exchange cards. The no-limit betting structure makes it a high-stakes game of nerve and hand reading.",
    history:
      "2-7 Single Draw (also called No-Limit Deuce-to-Seven Draw) has long been a favorite among high-stakes poker players and road gamblers. The game was featured in some of the biggest cash games in Las Vegas history. Bobby Baldwin and Doyle Brunson were among its early champions. It became a WSOP event and is known for its deep psychological elements and massive pots. The $50,000 WSOP 2-7 event is considered one of the most prestigious tournaments.",
    category: 'draw',
    difficulty: 'advanced',
    rules:
      "Each player receives five cards face down. There is a single draw where players can exchange 0-5 cards. The goal is the lowest hand with aces high and straights/flushes counting against you. The best hand is 2-3-4-5-7. Played as no-limit, meaning players can bet any amount up to their entire stack. The combination of one draw and no-limit betting creates intense head-to-head confrontations.",
    dealingStructure:
      "Blinds posted. Five cards dealt face down. One betting round pre-draw, one draw round, one betting round post-draw. No-limit betting in both rounds.",
    bettingRounds: ['Pre-draw', 'Post-draw'],
    holeCards: 5,
    communityCards: 0,
    strategyTips: [
      "Standing pat is extremely powerful. When you stand pat, your opponent must decide whether you have a made hand or are bluffing (snowing).",
      "Position is even more critical with only one draw. The player acting last in the draw has all the information about how many cards their opponent took.",
      "Preflop hand selection: One-card draws to strong lows (7 or better) are premium. Two-card draws are only playable in position or short-handed.",
      "Bet sizing tells a story. Large bets after standing pat put maximum pressure on drawing opponents.",
      "Bluffing frequency must be balanced. If you only stand pat with strong hands, opponents can exploit you by always folding to your pat-hand bets."
    ],
    commonMistakes: [
      "Drawing two cards in no-limit. The odds of improving with a two-card draw are poor, and you're giving your opponent too much information.",
      "Not bluffing (snowing) enough. If you never stand pat without a made hand, opponents can always fold to your pat-and-bet line.",
      "Over-calling post-draw. When an opponent stands pat and bets big, calling with marginal made hands is often a mistake.",
      "Playing out of position with marginal draws. Being first to act with a one-card draw to an 8 is a tough spot.",
      "Not adjusting to stack depths. Deep stacks favor more conservative play, while short stacks increase the value of aggression."
    ]
  },

  // =========================================================================
  // 11. 5-Card Draw
  // =========================================================================
  {
    id: '5-card-draw',
    name: '5-Card Draw',
    description:
      "The original poker game most people learn first. Simple and classic: each player gets five cards, draws to improve, and the best hand wins. No exposed cards, no community cards -- pure hand reading.",
    history:
      "5-Card Draw is one of the oldest poker variants, dating to the Civil War era in the United States. It was the most popular form of poker from the late 1800s through the mid-20th century and was the game most Americans thought of when they heard 'poker.' It was the standard home game before Hold'em took over. While rarely spread in casinos today, it remains a beloved casual game and appears in video poker machines worldwide.",
    category: 'draw',
    difficulty: 'beginner',
    rules:
      "Each player receives five cards face down. After a betting round, players may discard and replace any number of cards (0-5). After the draw, a final betting round occurs, followed by showdown. The best five-card poker hand wins. Typically played with antes or blinds. Can be played as limit, pot-limit, or no-limit.",
    dealingStructure:
      "Antes or blinds posted. Five cards dealt face down to each player. One draw round where players exchange 0-5 cards. Two betting rounds total: pre-draw and post-draw.",
    bettingRounds: ['Pre-draw', 'Post-draw'],
    holeCards: 5,
    communityCards: 0,
    strategyTips: [
      "Draw count is your primary information source. An opponent drawing one card likely has two pair or a four-card draw. Drawing three usually means a pair.",
      "Position matters greatly. Seeing how many cards opponents draw before you act (or bet) is a huge advantage.",
      "Jacks or better is a reasonable minimum starting hand in a full ring game. Tighten up in early position.",
      "Deception has value. Occasionally drawing one card with trips or standing pat with a weak hand can create profitable future situations.",
      "Pay attention to who draws what. If someone draws one and then bets big, they either improved or are bluffing -- the draw count narrows their range."
    ],
    commonMistakes: [
      "Drawing to inside straights. Needing one specific card to complete a straight (4 outs from 47 remaining) is a losing proposition in most situations.",
      "Keeping a kicker with a pair. Drawing two cards with a pair and a high kicker is usually worse than drawing three to maximize improvement chances.",
      "Playing too many hands. Without community cards, there's less opportunity to catch up. Start with strong holdings.",
      "Not considering draw count as information. Ignoring how many cards opponents exchange leaves critical reads on the table.",
      "Bluffing too much. In a game with limited betting rounds, bluffs are easier to catch, especially by observant opponents."
    ]
  },

  // =========================================================================
  // 12. Badugi
  // =========================================================================
  {
    id: 'badugi',
    name: 'Badugi',
    description:
      "A unique triple-draw lowball game from Asia where the best hand has four cards of different suits and different ranks. A 'badugi' is a four-card hand with no pairs and no matching suits. The lowest badugi wins.",
    history:
      "Badugi originated in Asia, with claims of Korean and Canadian origins. The name may derive from the Korean word 'baduk' (the game of Go) or a Korean word for a black-and-white spotted dog. It gained online popularity in the 2000s and was added to the WSOP schedule in 2012 as part of the Dealer's Choice event. The game has a cult following among mixed-game enthusiasts who appreciate its unique hand evaluation system.",
    category: 'draw',
    difficulty: 'advanced',
    rules:
      "Each player receives four cards. Three draw rounds and four betting rounds (like 2-7 Triple Draw). The goal is to make the lowest four-card hand with all different suits and all different ranks. If any cards share a suit, you must discard duplicates, reducing your hand to a 'three-card' or 'two-card' hand. A four-card badugi always beats a three-card hand. Among badugis, the lowest wins. The best hand is A-2-3-4 with all four different suits.",
    dealingStructure:
      "Blinds posted. Four cards dealt face down. Three draw rounds with four betting rounds. Fixed-limit structure. Players exchange 0-4 cards per draw.",
    bettingRounds: [
      'Pre-draw (small bet)',
      'After 1st draw (small bet)',
      'After 2nd draw (big bet)',
      'After 3rd draw (big bet)'
    ],
    holeCards: 4,
    communityCards: 0,
    strategyTips: [
      "Three-card badugis with an ace are strong starting hands. A-2-3 of three different suits drawing one has excellent chances of completing.",
      "Snowing (standing pat without a badugi) is a key advanced tactic, especially when your three-card hand is very strong.",
      "Drawing one to a good three-card hand is far superior to drawing two. Avoid entering pots with two-card starts.",
      "Position allows you to see how many cards opponents draw. If they're drawing two, your three-card hand may be the best hand already.",
      "Patience is rewarded. Badugis are hard to make, and many pots are won by the best three-card hand."
    ],
    commonMistakes: [
      "Not understanding hand rankings. A 9-high badugi (four cards) beats any three-card hand, no matter how low the three cards are.",
      "Playing two-card draws too aggressively. Drawing two cards rarely results in a completed badugi, even with three draw chances.",
      "Over-snowing. Standing pat without a badugi can work, but doing it too often against observant opponents is exploitable.",
      "Breaking a badugi to draw to a better one. A weak badugi (like K-Q-J-T rainbow) is still a badugi and beats all three-card hands.",
      "Ignoring suits when evaluating starting hands. Two cards of the same suit mean one must be discarded, weakening your start."
    ]
  },

  // =========================================================================
  // 13. Badeucy
  // =========================================================================
  {
    id: 'badeucy',
    name: 'Badeucy',
    description:
      "A split-pot game combining Badugi and 2-7 Triple Draw. Half the pot goes to the best Badugi hand and half to the best 2-7 low hand. Players use the same five-card hand to compete for both halves.",
    history:
      "Badeucy (also spelled Badacy or Baducy) is a relatively modern invention that emerged from the mixed-game poker community in the 2000s. It was created by combining the hand evaluation systems of Badugi and Deuce-to-Seven, giving players two goals to pursue simultaneously. It has appeared in WSOP Dealer's Choice events and is played in high-stakes mixed games. The game is considered one of the most complex poker variants.",
    category: 'draw',
    difficulty: 'advanced',
    rules:
      "Each player receives five cards. Three draw rounds with four betting rounds (fixed-limit). The pot is split: half for the best Badugi hand (using four of your five cards) and half for the best 2-7 low hand (using all five). For the Badugi half, select your best four-card badugi from your five cards. For the 2-7 half, aces are high, straights and flushes count against you. The dream hand is 2-3-4-5-7 rainbow (winning both halves).",
    dealingStructure:
      "Blinds posted. Five cards dealt face down. Three draws, four betting rounds. Fixed-limit. Players exchange 0-5 cards per draw.",
    bettingRounds: [
      'Pre-draw (small bet)',
      'After 1st draw (small bet)',
      'After 2nd draw (big bet)',
      'After 3rd draw (big bet)'
    ],
    holeCards: 5,
    communityCards: 0,
    strategyTips: [
      "Scoop hands are the holy grail. 2-3-4-5-7 with four different suits wins both halves. Focus on hands with scoop potential.",
      "Cards that help both halves are most valuable. Low cards of different suits contribute to both the Badugi and the 2-7 low.",
      "A strong Badugi half is often more valuable than a strong 2-7 half because completed Badugis are rarer.",
      "Avoid straight draws in your 2-7 hand. Remember, 2-3-4-5-6 is a straight and terrible for the 2-7 half.",
      "Track which suits you need. For the Badugi half, you need four different suits, so monitor which suits appear in your hand and discards."
    ],
    commonMistakes: [
      "Focusing on only one half. You need to balance your draws to compete for both halves, not just the one you're closest to completing.",
      "Forgetting that 2-7 rules apply to the low half. New players sometimes forget aces are high and straights count against them.",
      "Drawing too aggressively. In a split pot game, taking small edges on both halves is more profitable than gambling for one half.",
      "Not accounting for the Badugi requirement of four different suits when evaluating starting hands."
    ]
  },

  // =========================================================================
  // 14. A-5 Triple Draw
  // =========================================================================
  {
    id: 'a-5-triple-draw',
    name: 'A-5 Triple Draw',
    description:
      "A triple-draw lowball game where aces are low and straights and flushes don't count against you. The best hand is A-2-3-4-5 (the wheel). More forgiving than 2-7 Triple Draw but with its own strategic subtleties.",
    history:
      "A-5 Triple Draw (also known as Ace-to-Five Triple Draw or California Lowball Triple Draw) is based on the traditional California Lowball hand rankings used in single-draw games that were popular in California cardrooms for decades. The triple-draw format adds complexity and drawing strategy. It has become part of mixed game rotations and appears in some WSOP events.",
    category: 'draw',
    difficulty: 'intermediate',
    rules:
      "Each player receives five cards face down. Three draw rounds with four betting rounds. Aces are LOW (the best card). Straights and flushes do NOT count against you. The best hand is A-2-3-4-5. Pairs are bad. This is 'California Lowball' hand rankings. Played as fixed-limit. Players exchange 0-5 cards per draw.",
    dealingStructure:
      "Blinds posted. Five cards dealt face down. Three draws, four betting rounds. Fixed-limit structure.",
    bettingRounds: [
      'Pre-draw (small bet)',
      'After 1st draw (small bet)',
      'After 2nd draw (big bet)',
      'After 3rd draw (big bet)'
    ],
    holeCards: 5,
    communityCards: 0,
    strategyTips: [
      "The wheel (A-2-3-4-5) is the nuts. Having an ace in your hand is almost mandatory for a competitive holding.",
      "Straights don't hurt you, so 2-3-4-5-6 is the second-best hand. Don't break low hands because of straight potential.",
      "One-card draws to the wheel or a 6-low are premium. Enter pots with three or four cards to a strong low.",
      "Position lets you see draw counts before acting. Drawing one after an opponent draws two is a significant edge.",
      "Snow (stand pat) when you have a strong made hand or as an occasional bluff to represent strength."
    ],
    commonMistakes: [
      "Confusing A-5 rules with 2-7 rules. In A-5, aces are low (good) and straights don't matter. A-2-3-4-5 is the best hand, not the worst.",
      "Playing without an ace. While not mandatory, hands without an ace have a much lower ceiling.",
      "Drawing too many cards. Two-card draws in triple draw lowball are weak starting points.",
      "Not adjusting to the triple draw format. With three draws, patience and hand selection matter more than in single draw.",
      "Overvaluing smooth 7s and 8s. A 7-low or 8-low might seem good, but in a game where wheels are common, these are often second-best."
    ]
  },

  // =========================================================================
  // 15. Short Deck Hold'em
  // =========================================================================
  {
    id: 'short-deck-holdem',
    name: "Short Deck Hold'em",
    description:
      "A high-action Hold'em variant played with a 36-card deck (all 2s through 5s removed). Hand rankings change: flushes beat full houses, and three-of-a-kind beats a straight in some rule sets. Creates huge hands and massive action.",
    history:
      "Short Deck (also called 6+ Hold'em) originated in the high-stakes cash games of Macau and Asia around 2014. Phil Ivey and Tom Dwan were among the first Western pros to embrace it. The Triton Poker series popularized the format globally with televised events featuring million-dollar buy-ins. Major online poker sites added Short Deck in 2018-2019, and it has become a permanent fixture in the poker landscape.",
    category: 'holdem',
    difficulty: 'intermediate',
    rules:
      "Plays like No-Limit Hold'em but with a 36-card deck (2s, 3s, 4s, and 5s removed). Two hole cards, five community cards. Key differences: A-6-7-8-9 is the lowest straight (ace plays as a 5 replacement). Modified hand rankings -- flushes beat full houses (flushes are harder to make with fewer suit cards). Some rule sets have three-of-a-kind beating a straight. Everyone antes, and the button posts an additional blind.",
    dealingStructure:
      "Every player antes. Button posts an additional blind. Two hole cards dealt. Flop (3), turn (1), river (1). Standard burn card procedure. 36-card deck used.",
    bettingRounds: ['Preflop', 'Flop', 'Turn', 'River'],
    holeCards: 2,
    communityCards: 5,
    strategyTips: [
      "Pocket pairs are more powerful. With fewer cards, you flop a set about 18% of the time (vs. 12% in full-deck Hold'em). Play pairs aggressively.",
      "Flush draws are weaker because there are only 9 cards per suit instead of 13. Adjust your calling range with flush draws downward.",
      "Hand equities run closer together preflop. A-K vs. pocket jacks is nearly a coin flip. This means more all-in confrontations.",
      "Straights are easier to make with the compressed card rankings. Connected cards like 8-9, 9-T, T-J gain significant value.",
      "Adjust to the modified hand rankings. If flushes beat full houses in your game, value flush draws more and boats less."
    ],
    commonMistakes: [
      "Using full-deck hand rankings. Flushes beat full houses in Short Deck -- forgetting this can be extremely costly.",
      "Overvaluing flush draws. With only 5 cards per suit remaining after the 2-5 removal, flush draws complete less often.",
      "Not adjusting to the higher frequency of sets. When opponents play back at you on paired boards, they have trips more often than in regular Hold'em.",
      "Playing too tight. The ante structure and closer equities mean you need to play more hands than in regular Hold'em.",
      "Forgetting the A-6-7-8-9 straight. The ace replaces the 5 at the bottom of straights."
    ]
  },

  // =========================================================================
  // 16. Chinese Poker
  // =========================================================================
  {
    id: 'chinese-poker',
    name: 'Chinese Poker',
    description:
      "A unique poker game where each player sets 13 cards into three hands: a 5-card back (highest), 5-card middle, and 3-card front (lowest). Points are scored by comparing hands against opponents. No betting rounds -- all scoring is by comparison.",
    history:
      "Chinese Poker (also known as Pusoy or Russian Poker) has roots in Asian card games and became popular in American poker circles in the 1990s. It was a favorite side game among WSOP players during downtime between tournaments. It had a WSOP event in 1995 and 1996. The game saw a resurgence when Open Face Chinese Poker became popular in the 2010s.",
    category: 'specialty',
    difficulty: 'intermediate',
    rules:
      "2-4 players each receive all 13 cards at once. Players arrange their cards into three hands: the back (5 cards, must be strongest), the middle (5 cards, must be weaker than back), and the front (3 cards, must be weakest). Each hand is compared against the corresponding hand of each opponent. Win 2 of 3 hands against an opponent to win 1 unit; win all 3 for a 'scoop' bonus. Various bonus royalties are awarded for premium hands (e.g., quads in back, trips in front).",
    dealingStructure:
      "All 13 cards are dealt at once to each player (2-4 players). No community cards. No betting rounds -- the game is scored on a point/unit system comparing hands.",
    bettingRounds: ['No betting rounds - point-based scoring'],
    holeCards: 13,
    communityCards: 0,
    strategyTips: [
      "Never foul your hand. The back must beat the middle, and the middle must beat the front. A fouled hand (misarranged) loses to everyone automatically.",
      "Royalties drive strategy. Setting a full house in back earns bonus points, trips in front earn huge bonuses. Prioritize royalty potential.",
      "Sometimes sacrifice one hand to strengthen the other two. Winning 2-of-3 is better than barely losing all three.",
      "With borderline holdings, consider what your opponents likely have. If you can scoop with a strategic arrangement, go for it.",
      "Front hand is the most challenging to set. A pair of queens or better in front earns royalties but weakens your back and middle."
    ],
    commonMistakes: [
      "Fouling by making the front or middle stronger than the hand behind it. Always verify your arrangement before revealing.",
      "Ignoring royalties. Setting a flush in back when you could arrange trips in front for bonus points is often suboptimal.",
      "Over-focusing on one hand. Putting all your strength in the back while the front and middle are trash leads to losing 2-of-3.",
      "Not adapting to the number of players. In a 4-player game, hand values shift because more cards are distributed.",
      "Playing too conservatively with front hand. Sometimes putting a pair in front (even if it weakens back slightly) wins more points overall."
    ]
  },

  // =========================================================================
  // 17. Open Face Chinese Poker
  // =========================================================================
  {
    id: 'open-face-chinese-poker',
    name: 'Open Face Chinese Poker',
    description:
      "A modern evolution of Chinese Poker where cards are placed one at a time, face up, into three rows. Players start with 5 cards, then draw one at a time. Once placed, cards cannot be moved. Features 'Fantasyland' as a bonus round.",
    history:
      "Open Face Chinese (OFC) Poker was invented around 2011 in Finland and rapidly spread through the poker community. Pros like Jason Mercier, Shaun Deeb, and Alex Dreyfus championed the game. The Pineapple variant (receiving 3 cards and discarding 1) became the most popular version. OFC created its own tournament circuit and was widely played during WSOP downtime in the mid-2010s.",
    category: 'specialty',
    difficulty: 'advanced',
    rules:
      "2-3 players. Each player is first dealt 5 cards and must place them face-up in their three rows (back: 5 cards, middle: 5 cards, front: 3 cards). Then players receive one card at a time and must place it immediately. Once placed, cards cannot be moved. Back must be stronger than middle, middle stronger than front. Fouling (misarranging) loses to everyone. Fantasyland: if you set QQ or better in front without fouling, you get all 13 cards at once next hand (like regular Chinese Poker). Royalties for premium hands in each row.",
    dealingStructure:
      "5 cards dealt initially, placed in rows. Then one card at a time (8 more for each player). Cards placed face up and cannot be moved once set. Point/unit scoring system.",
    bettingRounds: ['No betting rounds - sequential card placement with point scoring'],
    holeCards: 13,
    communityCards: 0,
    strategyTips: [
      "Fantasyland is the primary strategic goal. Getting QQ+ in front (without fouling) gives you a massive advantage on the next hand.",
      "Plan ahead. Before placing your first 5 cards, visualize what you need to draw and where cards will go. Don't paint yourself into a corner.",
      "Track live cards. Since all cards are face up, you can see which cards are available and adjust your strategy accordingly.",
      "Sometimes it's correct to foul intentionally rather than play for a tiny scoop. If fouling lets you set up Fantasyland next hand, consider it.",
      "In Pineapple OFC, the discard decision is critical. Think about which card helps your opponent least as well as which helps you most."
    ],
    commonMistakes: [
      "Setting the first 5 cards without a plan for the remaining 8. Early decisions lock in your entire strategy.",
      "Chasing Fantasyland recklessly. Putting a high pair in front when you can't support it with your back and middle leads to fouls.",
      "Not counting cards. With all cards face up, ignoring card removal effects is a significant leak.",
      "Being too conservative in Fantasyland. When you have all 13 cards, maximize royalties and try to stay in Fantasyland.",
      "Ignoring your opponents' boards. Their visible cards tell you which draws are live and which are dead."
    ]
  },

  // =========================================================================
  // 18. Pineapple
  // =========================================================================
  {
    id: 'pineapple',
    name: 'Pineapple',
    description:
      "A Hold'em variant where each player receives three hole cards and must discard one before the flop. The extra starting card creates stronger average hands and more action.",
    history:
      "Pineapple evolved as a home game variant of Texas Hold'em, likely in the 1980s or 1990s. It was a popular spread in California and Hawaiian cardrooms. The game served as a bridge between Hold'em and Omaha, offering more starting hand possibilities than Hold'em without the complexity of four-card Omaha. Online poker sites began offering Pineapple in the 2000s.",
    category: 'holdem',
    difficulty: 'beginner',
    rules:
      "Identical to Texas Hold'em except each player receives three hole cards. Before the flop is dealt, each player must discard one card, leaving them with two hole cards for the rest of the hand. From the flop onward, play proceeds exactly like Hold'em. Can be played as no-limit, pot-limit, or fixed-limit.",
    dealingStructure:
      "Blinds posted. Three cards dealt to each player face down. Players discard one card before the flop. Flop, turn, river as in Hold'em. Standard burn card procedure.",
    bettingRounds: ['Preflop (with 3 cards)', 'Flop', 'Turn', 'River'],
    holeCards: 3,
    communityCards: 5,
    strategyTips: [
      "Starting hand selection is easier with three cards. You'll have more playable combinations, so the overall hand strength at showdown is higher.",
      "Discard decisions are critical. Think about which two-card combination gives you the best equity, not just the best current hand.",
      "Adjust your hand value expectations upward. Top pair with a good kicker is relatively weaker than in Hold'em because opponents also started with three cards.",
      "Suited and connected three-card starts are premium. Having three to a flush or three to a straight gives you more post-discard flexibility.",
      "Playing tighter than standard Hold'em is still correct, but your range can be slightly wider since your average hand quality is higher."
    ],
    commonMistakes: [
      "Discarding based only on current hand strength without considering post-flop playability and equity.",
      "Not adjusting to higher average hand strengths at showdown. Your opponents also benefited from three starting cards.",
      "Playing Pineapple exactly like Hold'em without adjusting for the different preflop dynamics.",
      "Keeping a high card as a kicker when a connected or suited combination would be more profitable long-term."
    ]
  },

  // =========================================================================
  // 19. Crazy Pineapple
  // =========================================================================
  {
    id: 'crazy-pineapple',
    name: 'Crazy Pineapple',
    description:
      "A wilder Pineapple variant where players keep all three hole cards through the flop and discard one after the flop betting round. Seeing the flop with three cards creates much bigger hands and more action.",
    history:
      "Crazy Pineapple developed as a more exciting version of standard Pineapple, likely originating in home games and spreading to cardrooms in the 1990s and 2000s. The key innovation of discarding after the flop (instead of before) dramatically increases action because players see how their third card interacts with the board. It has appeared in online poker offerings and some casino poker rooms.",
    category: 'holdem',
    difficulty: 'beginner',
    rules:
      "Each player receives three hole cards. Players keep all three through the preflop and flop betting rounds. After the flop betting round concludes, each player must discard one of their three hole cards. The turn and river play out as in standard Hold'em with two hole cards. The extra card through the flop creates much stronger hands on average.",
    dealingStructure:
      "Blinds posted. Three cards dealt face down. Flop dealt (players still have 3 cards). After flop betting, players discard one card. Turn and river dealt normally.",
    bettingRounds: [
      'Preflop (3 cards)',
      'Flop (3 cards)',
      'Discard one card',
      'Turn (2 cards)',
      'River (2 cards)'
    ],
    holeCards: 3,
    communityCards: 5,
    strategyTips: [
      "The flop discard is the most important decision. You've seen four of five community cards before choosing which card to drop.",
      "Sets are much more common because you start with three cards. Adjust your value range for opponents accordingly.",
      "Drawing hands with backup plans are strong. If you have a flush draw, a straight draw, and a pair, you have flexibility in what to keep.",
      "Play aggressively on the flop with strong hands because opponents may improve after discarding and the turn/river play is standard.",
      "Think about what your discard tells the table. In some settings, discards are visible, providing information."
    ],
    commonMistakes: [
      "Playing too passively preflop. With three cards, you connect with more flops, making limping less punishing but still not optimal.",
      "Making the discard decision too quickly. The flop discard is where most of the edge comes from in Crazy Pineapple.",
      "Not adjusting to the higher frequency of sets, straights, and flushes. Two pair is a much weaker hand in Crazy Pineapple than in Hold'em.",
      "Keeping the 'obvious' two cards without considering how the turn and river might play out with different combinations."
    ]
  },

  // =========================================================================
  // 20. Irish Poker
  // =========================================================================
  {
    id: 'irish-poker',
    name: 'Irish Poker',
    description:
      "A hybrid between Hold'em and Omaha. Players receive four hole cards, see the flop with all four, then discard two after the flop betting round. Combines Omaha's preflop action with Hold'em's post-flop play.",
    history:
      "Irish Poker emerged as a popular home game and online variant in the 2000s. Its exact origin is unclear, but it likely developed in casual poker circles looking for a game that bridged Hold'em and Omaha. The game creates interesting strategic decisions because players must choose which two of four cards to keep after seeing the flop. It has appeared in online poker rooms and some live cardroom promotions.",
    category: 'holdem',
    difficulty: 'intermediate',
    rules:
      "Each player receives four hole cards (like Omaha). Preflop and flop betting occurs with all four cards. After the flop betting round, each player discards two cards, keeping only two (like Hold'em). The turn and river play out as standard Hold'em. Unlike Omaha, there is no requirement to use exactly two hole cards after the discard -- standard Hold'em rules apply for the final two cards.",
    dealingStructure:
      "Blinds posted. Four cards dealt face down. Flop dealt (players have 4 cards). After flop betting, players discard two cards. Turn and river dealt with players holding 2 cards.",
    bettingRounds: [
      'Preflop (4 cards)',
      'Flop (4 cards)',
      'Discard two cards',
      'Turn (2 cards)',
      'River (2 cards)'
    ],
    holeCards: 4,
    communityCards: 5,
    strategyTips: [
      "Evaluate all six possible two-card combinations from your four hole cards. Each one has different value on the flop.",
      "Hands that make strong pairs with backdoor draws are often better keeps than hands with just a draw.",
      "The preflop hand values are similar to Omaha: connected, suited, paired hands with all four cards working together.",
      "On the flop, consider which two-card combination gives the best blend of current strength and future potential.",
      "Sets on the flop are extremely strong since opponents will discard two cards, making it harder for them to have drawing hands on later streets."
    ],
    commonMistakes: [
      "Treating it as pure Omaha or pure Hold'em. The hybrid nature requires a unique strategic approach, especially around the discard decision.",
      "Not considering turn and river dynamics when choosing which two cards to keep. A naked flush draw with no pair might be worse than top pair with a gutshot.",
      "Keeping four-card Omaha thinking on the turn and river. After the discard, it's Hold'em -- you don't need to use both your hole cards.",
      "Playing too many hands preflop because of the four-card start without adjusting for the discard requirement."
    ]
  },

  // =========================================================================
  // 21. HORSE
  // =========================================================================
  {
    id: 'horse',
    name: 'HORSE',
    description:
      "The original mixed game format rotating through five poker variants: Hold'em (fixed limit), Omaha Hi-Lo, Razz, Seven Card Stud, and Seven Card Stud Hi-Lo (Eight or Better). Each game is played for a set number of hands or time before rotating.",
    history:
      "HORSE was created to test all-around poker ability by combining five distinct variants. It became a WSOP event in 2002, and the $50,000 HORSE event (later called the Poker Players Championship) is considered the truest test of poker skill. Champions include Chip Reese (2006, the inaugural event), who the trophy is named after following his passing in 2007. The format proved that the best poker players excel across multiple disciplines.",
    category: 'mixed',
    difficulty: 'advanced',
    rules:
      "Five games are played in rotation: H (Fixed-Limit Hold'em), O (Omaha Hi-Lo 8 or Better), R (Razz), S (Seven Card Stud), E (Seven Card Stud Hi-Lo 8 or Better). The game changes at set intervals (every orbit, every 30 minutes, etc.). All games are played fixed-limit. Players must know the rules of all five variants. Each game's standard rules apply during its rotation.",
    dealingStructure:
      "Varies by game in the rotation. Hold'em and Omaha use blinds and community cards. Razz, Stud, and Stud Hi-Lo use antes and individual cards. The dealer button or designated dealer rotates each game change.",
    bettingRounds: [
      "Varies by game: Hold'em/Omaha have 4 betting rounds, Stud variants have 5"
    ],
    holeCards: 0,
    communityCards: 0,
    strategyTips: [
      "Identify opponents' weak games. Most players have one or two games where they're vulnerable. Attack aggressively during those rotations.",
      "Adjust your strategy quickly when the game changes. The mental shift from Hold'em to Razz requires a complete change in hand evaluation.",
      "Razz and Stud Hi-Lo are often the most profitable rounds because many players are weakest in these games.",
      "Stay disciplined during your weakest game. If Razz is your weak spot, play tighter and avoid marginal situations.",
      "Mixed games reward versatility over specialization. Invest study time in your weakest variant for the highest ROI."
    ],
    commonMistakes: [
      "Not knowing the rules of all five games. Playing Razz like Stud (going for high hands) or Omaha without understanding the 'exactly two' rule is disastrous.",
      "Failing to gear-shift between games. The transition from a lowball game (Razz) to a high-hand game (Stud) catches many players off guard.",
      "Playing the same looseness in every game. Each variant has different optimal tightness levels.",
      "Ignoring the hi-lo games' split-pot dynamics. In Omaha Hi-Lo and Stud Hi-Lo, you need scoop potential to profit.",
      "Steaming in your weak game. If you're losing in Razz, don't try to make it up with reckless play -- wait for your strong game."
    ]
  },

  // =========================================================================
  // 22. 8-Game
  // =========================================================================
  {
    id: '8-game',
    name: '8-Game',
    description:
      "An expanded mixed game format rotating through eight poker variants. Includes all HORSE games plus No-Limit Hold'em, Pot-Limit Omaha, and 2-7 Triple Draw. The ultimate test of poker versatility.",
    history:
      "8-Game was introduced as a WSOP event in 2010 and quickly became the premier mixed-game format. It expanded on HORSE by adding three popular games that test different skill sets: the aggression of No-Limit Hold'em, the complexity of PLO, and the unique strategy of 2-7 Triple Draw. The $50,000 8-Game event (Poker Players Championship) replaced the HORSE event and is considered the most prestigious poker tournament after the Main Event.",
    category: 'mixed',
    difficulty: 'advanced',
    rules:
      "Eight games rotate: 2-7 Triple Draw (fixed-limit), Fixed-Limit Hold'em, Omaha Hi-Lo (fixed-limit), Razz, Seven Card Stud, Seven Card Stud Hi-Lo, No-Limit Hold'em, and Pot-Limit Omaha. Games change at set intervals. Each game is played according to its standard rules. The inclusion of no-limit and pot-limit games alongside fixed-limit games requires enormous strategic flexibility.",
    dealingStructure:
      "Varies by game. Community card games use blinds. Stud variants use antes. 2-7 Triple Draw uses blinds. Deal structure follows each individual game's standard format.",
    bettingRounds: [
      "Varies by game: 4-5 betting rounds depending on the variant"
    ],
    holeCards: 0,
    communityCards: 0,
    strategyTips: [
      "The transitions between limit and no-limit/pot-limit games are where the most money changes hands. Be extremely careful adjusting your aggression level.",
      "2-7 Triple Draw and Badugi-style games are often the biggest edge for skilled mixed-game players because casual players rarely study them.",
      "Stack management across game changes is critical. Don't bleed chips in limit games before the no-limit round where you might double up.",
      "Keep notes on which games each opponent struggles with. Exploit their weak games and play cautiously in their strong games.",
      "Time management matters. Don't burn your energy on the limit games if you need to be sharp for the no-limit rounds."
    ],
    commonMistakes: [
      "Not studying all eight games. Many players are strong in 4-5 variants but give back their winnings in the others.",
      "Applying no-limit aggression to fixed-limit games. The strategy is fundamentally different when bet sizes are capped.",
      "Forgetting which game you're playing. After a transition, accidentally playing 2-7 Triple Draw rules when it's A-5 (or vice versa) is a costly error.",
      "Burnout from the mental demands. Eight different strategic frameworks is exhausting, and tired play leads to mistakes.",
      "Overvaluing your strong games. Even if you crush NLH and PLO, if you're a fish in the other six games, you won't profit overall."
    ]
  },

  // =========================================================================
  // 23. Dealer's Choice
  // =========================================================================
  {
    id: 'dealers-choice',
    name: "Dealer's Choice",
    description:
      "A format where the player on the button (or the designated dealer) chooses which poker variant to play for that hand or round. The ultimate test of poker knowledge and adaptability.",
    history:
      "Dealer's Choice has been a staple of home games since poker's earliest days. It became a WSOP event in 2014, open to virtually any poker variant the dealer selects (from a pre-approved list of about 20+ games). The event attracted the game's most versatile players and produced creative and unusual game selections. Bobby Baldwin, who won the 1978 WSOP Main Event, was known for his Dealer's Choice prowess in early Las Vegas games.",
    category: 'mixed',
    difficulty: 'advanced',
    rules:
      "When it's your turn to deal (or when the button is in front of you), you choose which poker variant will be played for the next hand (or orbit). The selected game can be any variant from an approved list, which typically includes Hold'em, Omaha, Stud, Draw games, and specialty games. All players must play the chosen game. This continues around the table so each player gets to choose.",
    dealingStructure:
      "Varies entirely based on the chosen game. The dealer selects the game and announces it before the deal. All standard rules for the selected variant apply.",
    bettingRounds: ['Varies based on the chosen poker variant'],
    holeCards: 0,
    communityCards: 0,
    strategyTips: [
      "Choose games you're strongest in and that you believe your opponents are weakest in. Game selection IS your strategy.",
      "Know as many variants as possible. The wider your knowledge base, the better you can handle whatever game is chosen.",
      "Pay attention to which games each opponent selects -- it reveals which games they consider their strongest.",
      "Obscure games can be profitable. If you're the only one at the table who truly understands Badeucy, call it every time.",
      "Be prepared to play games you don't love. Damage control in your weak games is as important as maximizing in your strong ones."
    ],
    commonMistakes: [
      "Only knowing a handful of games. If you can only play Hold'em and Omaha, you'll be at a huge disadvantage most of the time.",
      "Always choosing the same game. Predictability allows opponents to prepare for your selection.",
      "Not knowing the rules of called games. Sitting down for a Dealer's Choice event without knowing Badugi or 2-7 is asking to donate chips.",
      "Getting flustered by unfamiliar games. Stay calm, play tight, and minimize losses until a game you know well comes up.",
      "Choosing games based on what you like rather than where you have the biggest edge against your specific opponents."
    ]
  },

  // =========================================================================
  // 24. Courchevel
  // =========================================================================
  {
    id: 'courchevel',
    name: 'Courchevel',
    description:
      "A 5-card Omaha variant where the first community card is dealt face-up before the preflop betting round. Named after the French ski resort where it was popularized. Extreme action with massive equities shifting constantly.",
    history:
      "Courchevel originated in the high-stakes poker games of the French ski resort town of Courchevel in the French Alps. French poker players popularized the variant, and it spread to European poker rooms and online sites. The game adds a unique twist to 5-Card Omaha by revealing one board card before preflop action, dramatically changing hand evaluation. It has appeared on some online poker platforms and in European card rooms.",
    category: 'holdem',
    difficulty: 'advanced',
    rules:
      "Each player receives five hole cards. Before preflop betting begins, the first community card (first card of the flop) is dealt face-up. Preflop betting occurs with knowledge of this card. The remaining two flop cards are then dealt, followed by turn and river as normal. Players must use exactly two of their five hole cards and exactly three community cards. Typically played pot-limit.",
    dealingStructure:
      "Blinds posted. One community card dealt face up. Five hole cards dealt to each player. Preflop betting occurs. Remaining two flop cards dealt. Turn and river follow. Standard burn cards.",
    bettingRounds: [
      'Preflop (with one board card visible)',
      'Flop (remaining 2 cards dealt)',
      'Turn',
      'River'
    ],
    holeCards: 5,
    communityCards: 5,
    strategyTips: [
      "The visible first card dramatically shapes preflop strategy. If you have cards that connect perfectly with it, you have a significant advantage.",
      "Sets on the first card are extremely powerful. If the visible card pairs one of your hole cards, you already have a set before the flop is complete.",
      "Five-card Omaha hand requirements apply. All four cards should work together, and the visible card adds another dimension to evaluate.",
      "Position is critical because the pot-limit structure combined with five hole cards creates enormous pots.",
      "Be cautious with non-nut draws. With five hole cards per player and a visible board card, the nuts appear extremely frequently."
    ],
    commonMistakes: [
      "Ignoring the visible card when evaluating preflop hand strength. A hand that doesn't connect with the exposed card is significantly weakened.",
      "Forgetting the 'exactly two' rule from Omaha. You must use exactly two hole cards and three community cards.",
      "Overplaying hands that connect with the first card but have no backup plan. One-dimensional hands (only a pair with the board) are vulnerable.",
      "Not adjusting for the extreme action and variance. Courchevel pots are massive, and bankroll management is crucial."
    ]
  },

  // =========================================================================
  // 25. Big O
  // =========================================================================
  {
    id: 'big-o',
    name: 'Big O (5-Card Omaha Hi-Lo)',
    description:
      "The hi-lo split version of 5-Card Omaha. Each player receives five hole cards, must use exactly two, and the pot is split between the best high hand and the best qualifying low hand (8 or better). Maximum action with maximum complexity.",
    history:
      "Big O emerged as a popular cash game variant in the 2010s, particularly in Oklahoma (which some say inspired the 'O' in its name, though it officially stands for Omaha). It combines the action of 5-Card Omaha with the split-pot dynamics of Hi-Lo. The game spread rapidly through Southern US cardrooms and became a staple in states like Oklahoma, Texas, and Florida. Online poker sites added Big O in response to player demand for action games.",
    category: 'holdem',
    difficulty: 'advanced',
    rules:
      "Each player receives five hole cards. Community cards are dealt as in Hold'em (flop, turn, river). Players must use exactly two hole cards and three community cards. The pot is split between the best high hand and the best qualifying low hand (8 or better). If no low qualifies, the high hand scoops. Typically played as pot-limit. With five cards, players have enormous drawing potential for both high and low hands.",
    dealingStructure:
      "Blinds posted. Five hole cards dealt to each player face down. Flop (3), turn (1), river (1) with burn cards. Pot-limit betting structure.",
    bettingRounds: ['Preflop', 'Flop', 'Turn', 'River'],
    holeCards: 5,
    communityCards: 5,
    strategyTips: [
      "Scoop potential is everything. With five cards, focus on hands that can win both high and low. A-A-2-3-x double suited is a dream start.",
      "Nut low draws are critical. A-2 with backup (A-2-3 or A-2-4) gives you enormous freeroll potential for the low half.",
      "High-only hands must be absolute monsters. If you can't compete for the low, you need nut flush draws and wraps for the high.",
      "Avoid getting quartered at all costs. In a multiway pot, sharing the low while someone else takes the high is devastating.",
      "Ace-deuce is the most valuable two-card combination in Big O. Hands without A-2 for the low should have premium high potential."
    ],
    commonMistakes: [
      "Playing too many hands. Five cards make everything look playable, but discipline in hand selection is the key to winning.",
      "Forgetting the 'exactly two' rule. New Omaha players often miscalculate their hands by using more or fewer than two hole cards.",
      "Not understanding counterfeiting for low hands. If you hold A-2 and an ace or deuce hits the board, your low may be counterfeited.",
      "Overvaluing high-only hands in multiway pots. Competing for only half the pot while others can scoop is a losing strategy.",
      "Ignoring the five-card dynamic. With five starting cards, nut hands appear with extreme frequency, making non-nut holdings dangerous."
    ]
  }
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Find a poker variant by its slug ID
 */
export function getVariant(id: string): PokerVariant | undefined {
  return pokerVariants.find((v) => v.id === id);
}

/**
 * Get all variants in a specific category
 */
export function getVariantsByCategory(
  category: PokerVariant['category']
): PokerVariant[] {
  return pokerVariants.filter((v) => v.category === category);
}

/**
 * Get all variants at a specific difficulty level
 */
export function getVariantsByDifficulty(
  difficulty: PokerVariant['difficulty']
): PokerVariant[] {
  return pokerVariants.filter((v) => v.difficulty === difficulty);
}
