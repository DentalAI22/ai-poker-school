'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';
import Player from './Player';
import ActionButtons from './ActionButtons';
import CoachOverlay from './CoachOverlay';
import GTOChart from './GTOChart';
import {
  type CardType, type Street, type PlayerState,
  RANK_VALUES, AI_NAMES, STARTING_CHIPS, SMALL_BLIND, BIG_BLIND,
  getSeats, getPositionNames, buildDeck, shuffleDeck,
  evalHand, aiDecide, generateCoachMessage, heroHandNotation,
} from './game-helpers';

interface PokerTableProps {
  mode?: 'play' | 'watch' | 'gto' | 'replay';
  variant?: string;
  tableSize?: number;
}

export default function PokerTable({ mode: initialMode = 'play', tableSize = 6 }: PokerTableProps) {
  const numPlayers = Math.max(2, Math.min(9, tableSize));
  const seats = getSeats(numPlayers);
  const posNames = getPositionNames(numPlayers);

  // -- State -----------------------------------------------------------------
  const [mode, setMode] = useState<'play' | 'watch' | 'gto' | 'replay'>(initialMode);
  const [players, setPlayers] = useState<PlayerState[]>(() =>
    Array.from({ length: numPlayers }, (_, i) => ({
      name: i === 0 ? 'Hero' : AI_NAMES[i - 1] || `Bot ${i}`,
      chips: STARTING_CHIPS, cards: [], bet: 0, folded: false, isAllIn: false,
      position: posNames[i] || `S${i}`,
    }))
  );
  const [deck, setDeck] = useState<CardType[]>([]);
  const [community, setCommunity] = useState<CardType[]>([]);
  const [pot, setPot] = useState(0);
  const [street, setStreet] = useState<Street>('idle');
  const [activePlayer, setActivePlayer] = useState(-1);
  const [dealerSeat, setDealerSeat] = useState(0);
  const [currentBet, setCurrentBet] = useState(0);
  const [showGTOChart, setShowGTOChart] = useState(false);
  const [showCoach, setShowCoach] = useState(true);
  const [coachMsg, setCoachMsg] = useState('Welcome to AI Poker School! Hit "Deal" to begin.');
  const [handResult, setHandResult] = useState<string | null>(null);
  const [gtoScore, setGtoScore] = useState<number | undefined>(undefined);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  // -- Finish hand -----------------------------------------------------------
  const finishHand = useCallback((pls: PlayerState[], potVal: number, comm: CardType[]) => {
    setStreet('showdown');
    const active = pls.filter(p => !p.folded);
    let winner: PlayerState;
    let msg: string;
    if (active.length === 1) {
      winner = active[0];
      msg = `${winner.name} wins $${potVal} (everyone else folded)`;
    } else {
      let best = -1;
      winner = active[0];
      for (const p of active) {
        const s = evalHand([...p.cards, ...comm]);
        if (s > best) { best = s; winner = p; }
      }
      msg = `${winner.name} wins $${potVal}!`;
    }
    setPlayers(pls.map(p => p.name === winner.name ? { ...p, chips: p.chips + potVal } : p));
    setHandResult(msg);
    setCoachMsg(msg + ' Ready for another hand?');
    if (mode === 'gto') setGtoScore(Math.floor(50 + Math.random() * 50));
  }, [mode]);

  // -- Advance street --------------------------------------------------------
  const advanceStreet = useCallback((pls: PlayerState[], potVal: number, st: Street, d: CardType[], comm: CardType[]) => {
    const newPlayers = pls.map(p => ({ ...p, bet: 0 }));
    setPlayers(newPlayers);
    setCurrentBet(0);

    let newComm = [...comm], newDeck = [...d], newStreet: Street;
    if (st === 'preflop') { newComm = newDeck.slice(0, 3); newDeck = newDeck.slice(3); newStreet = 'flop'; }
    else if (st === 'flop') { newComm = [...comm, newDeck[0]]; newDeck = newDeck.slice(1); newStreet = 'turn'; }
    else if (st === 'turn') { newComm = [...comm, newDeck[0]]; newDeck = newDeck.slice(1); newStreet = 'river'; }
    else { finishHand(newPlayers, potVal, comm); return; }

    setCommunity(newComm);
    setDeck(newDeck);
    setStreet(newStreet);

    let first = (dealerSeat + 1) % pls.length, tries = 0;
    while (tries < pls.length && (newPlayers[first].folded || newPlayers[first].isAllIn)) {
      first = (first + 1) % pls.length; tries++;
    }
    if (newPlayers.filter(p => !p.folded && !p.isAllIn).length <= 1) {
      timerRef.current = setTimeout(() => advanceStreet(newPlayers, potVal, newStreet, newDeck, newComm), 800);
      return;
    }
    setActivePlayer(first);
    if (first !== 0) {
      timerRef.current = setTimeout(() => processAI(newPlayers, first, 0, potVal, newStreet, newDeck, newComm), 800);
    } else {
      setCoachMsg(generateCoachMessage(newStreet, newPlayers[0].cards, newComm, potVal, newPlayers[0].position));
    }
  }, [dealerSeat, finishHand]);

  // -- Advance action --------------------------------------------------------
  const advanceAction = useCallback((pls: PlayerState[], from: number, curBet: number, potVal: number, st: Street, d: CardType[], comm: CardType[]) => {
    if (pls.filter(p => !p.folded).length <= 1) { finishHand(pls, potVal, comm); return; }
    let next = (from + 1) % pls.length, looped = 0;
    while (looped < pls.length) {
      const np = pls[next];
      if (!np.folded && !np.isAllIn && (np.bet < curBet || (curBet === 0 && next !== from))) break;
      next = (next + 1) % pls.length; looped++;
    }
    if (pls.every(p => p.folded || p.isAllIn || p.bet === curBet) && looped >= pls.length) {
      advanceStreet(pls, potVal, st, d, comm); return;
    }
    setActivePlayer(next);
    if (next !== 0) {
      timerRef.current = setTimeout(() => processAI(pls, next, curBet, potVal, st, d, comm), 600 + Math.random() * 800);
    } else {
      setCoachMsg(generateCoachMessage(st, pls[0].cards, comm, potVal, pls[0].position));
    }
  }, [finishHand, advanceStreet]);

  // -- Process AI action -----------------------------------------------------
  const processAI = useCallback((pls: PlayerState[], active: number, curBet: number, potVal: number, st: Street, d: CardType[], comm: CardType[]) => {
    const player = pls[active];
    if (!player || player.folded || player.isAllIn) { advanceAction(pls, active, curBet, potVal, st, d, comm); return; }
    const callAmt = Math.max(0, curBet - player.bet);
    const decision = aiDecide(player, callAmt, potVal);
    const np = [...pls]; const p = { ...np[active] };
    if (decision.action === 'fold') { p.folded = true; }
    else if (decision.action === 'call') {
      const amt = Math.min(callAmt, p.chips); p.chips -= amt; p.bet += amt; potVal += amt;
      if (p.chips === 0) p.isAllIn = true;
    } else {
      const totalBet = Math.min(decision.amount, p.chips);
      const amt = totalBet - (p.bet - (curBet - callAmt));
      const actual = Math.min(Math.max(amt, callAmt), p.chips);
      p.chips -= actual; p.bet += actual; potVal += actual; curBet = p.bet;
      if (p.chips === 0) p.isAllIn = true;
    }
    np[active] = p; setPlayers(np); setPot(potVal); setCurrentBet(curBet);
    advanceAction(np, active, curBet, potVal, st, d, comm);
  }, [advanceAction]);

  // -- Deal new hand ---------------------------------------------------------
  const dealNewHand = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const newDealer = street === 'idle' ? 0 : (dealerSeat + 1) % numPlayers;
    setDealerSeat(newDealer);
    let d = shuffleDeck(buildDeck());
    const np: PlayerState[] = players.map((p, i) => {
      const cards = d.slice(0, 2); d = d.slice(2);
      return { ...p, cards, bet: 0, folded: false, isAllIn: false,
        position: posNames[((i - newDealer + numPlayers) % numPlayers)] || `S${i}`,
        chips: p.chips <= 0 ? STARTING_CHIPS : p.chips,
      };
    });
    const sbIdx = (newDealer + 1) % numPlayers, bbIdx = (newDealer + 2) % numPlayers;
    const sbAmt = Math.min(SMALL_BLIND, np[sbIdx].chips), bbAmt = Math.min(BIG_BLIND, np[bbIdx].chips);
    np[sbIdx].chips -= sbAmt; np[sbIdx].bet = sbAmt;
    np[bbIdx].chips -= bbAmt; np[bbIdx].bet = bbAmt;
    const initPot = sbAmt + bbAmt;
    setDeck(d); setPlayers(np); setCommunity([]); setPot(initPot);
    setStreet('preflop'); setCurrentBet(BIG_BLIND); setHandResult(null); setGtoScore(undefined);
    const first = (bbIdx + 1) % numPlayers;
    setActivePlayer(first);
    setCoachMsg(generateCoachMessage('preflop', np[0].cards, [], initPot, np[0].position));
    setShowCoach(true);
    if (first !== 0) timerRef.current = setTimeout(() => processAI(np, first, BIG_BLIND, initPot, 'preflop', d, []), 1000);
  }, [players, dealerSeat, numPlayers, posNames, street, processAI]);

  // -- Hero action -----------------------------------------------------------
  const heroAction = useCallback((action: 'fold' | 'check' | 'call' | 'raise' | 'allin', amount = 0) => {
    if (activePlayer !== 0 || street === 'idle' || street === 'showdown') return;
    const np = [...players]; const h = { ...np[0] }; let newPot = pot, newBet = currentBet;
    switch (action) {
      case 'fold': h.folded = true; break;
      case 'check': break;
      case 'call': { const a = Math.min(currentBet - h.bet, h.chips); h.chips -= a; h.bet += a; newPot += a; if (h.chips === 0) h.isAllIn = true; break; }
      case 'raise': { const t = Math.min(amount, h.chips + h.bet), a = t - h.bet; h.chips -= a; h.bet = t; newPot += a; newBet = t; if (h.chips === 0) h.isAllIn = true; break; }
      case 'allin': { const a = h.chips; h.bet += a; h.chips = 0; h.isAllIn = true; newPot += a; if (h.bet > newBet) newBet = h.bet; break; }
    }
    np[0] = h; setPlayers(np); setPot(newPot); setCurrentBet(newBet);
    advanceAction(np, 0, newBet, newPot, street, deck, community);
  }, [activePlayer, players, pot, currentBet, street, deck, community, advanceAction]);

  // -- Derived values --------------------------------------------------------
  const hero = players[0];
  const isHeroTurn = activePlayer === 0 && street !== 'idle' && street !== 'showdown';
  const callAmount = Math.max(0, currentBet - (hero?.bet || 0));
  const canCheck = callAmount === 0;

  // -- Render ----------------------------------------------------------------
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto', userSelect: 'none' }}>
      {/* Mode selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {([
          { key: 'play', label: 'Play vs Coach' },
          { key: 'watch', label: 'Coach Watches' },
          { key: 'gto', label: 'GTO Trainer' },
        ] as const).map(({ key, label }) => (
          <button key={key} onClick={() => setMode(key)} style={{
            padding: '8px 18px', borderRadius: 8,
            background: mode === key ? 'linear-gradient(135deg, #d4a843, #b8922f)' : 'rgba(255,255,255,0.05)',
            border: mode === key ? 'none' : '1px solid rgba(255,255,255,0.1)',
            color: mode === key ? '#0a0a0a' : '#94a3b8', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>

      {/* Table container */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '60%', borderRadius: '50%', overflow: 'visible' }}>
        {/* Wooden rail */}
        <div style={{
          position: 'absolute', inset: -12, borderRadius: '50%',
          background: 'linear-gradient(180deg, #3d2b1f 0%, #2a1a10 50%, #3d2b1f 100%)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.5)',
          border: '2px solid rgba(212,168,67,0.2)',
        }} />

        {/* Green felt */}
        <div className="bg-felt" style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4)', zIndex: 1,
        }}>
          {/* Center: pot + community cards */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 10,
          }}>
            {pot > 0 && street !== 'idle' && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{
                background: 'rgba(0,0,0,0.5)', padding: '4px 16px', borderRadius: 20,
                border: '1px solid rgba(212,168,67,0.3)',
              }}>
                <span style={{ color: '#d4a843', fontSize: 14, fontWeight: 800 }}>Pot: ${pot.toLocaleString()}</span>
              </motion.div>
            )}
            {community.length > 0 && (
              <div style={{ display: 'flex', gap: 6 }}>
                {community.map((card, i) => <Card key={`c-${i}`} card={card} small delay={i * 0.12} />)}
              </div>
            )}
            {street !== 'idle' && (
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 2 }}>{street}</span>
            )}
            <AnimatePresence>
              {handResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{
                  background: 'rgba(0,0,0,0.7)', padding: '8px 20px', borderRadius: 10,
                  border: '1px solid #d4a843', textAlign: 'center',
                }}>
                  <span style={{ color: '#d4a843', fontSize: 14, fontWeight: 700 }}>{handResult}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Player seats */}
        {players.map((player, i) => {
          const seat = seats[i];
          if (!seat) return null;
          return (
            <div key={i} style={{ position: 'absolute', top: seat.top, left: seat.left, transform: 'translate(-50%, -50%)', zIndex: 20 }}>
              <Player
                name={player.name} chips={player.chips}
                cards={player.cards.length > 0 ? player.cards : undefined}
                isDealer={((i - dealerSeat + numPlayers) % numPlayers) === 0}
                isActive={activePlayer === i && street !== 'idle' && street !== 'showdown'}
                isFolded={player.folded}
                bet={player.bet > 0 ? player.bet : undefined}
                position={player.position} isHero={i === 0} seatIndex={i}
              />
            </div>
          );
        })}
      </div>

      {/* Deal button */}
      {(street === 'idle' || street === 'showdown') && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={dealNewHand} className="btn-gold" style={{ fontSize: 16, padding: '14px 40px' }}>
            {street === 'idle' ? 'Deal' : 'Deal Next Hand'}
          </motion.button>
        </div>
      )}

      {/* Action buttons */}
      {isHeroTurn && !hero.folded && !hero.isAllIn && (
        <div style={{ marginTop: 16 }}>
          <ActionButtons
            onFold={() => heroAction('fold')} onCheck={() => heroAction('check')}
            onCall={(a) => heroAction('call', a)} onRaise={(a) => heroAction('raise', a)}
            onAllIn={() => heroAction('allin')}
            callAmount={callAmount} potSize={pot} playerChips={hero.chips}
            minRaise={Math.max(currentBet + BIG_BLIND, currentBet * 2)} maxRaise={hero.chips + hero.bet}
            canCheck={canCheck}
            onAskCoach={() => setShowCoach(true)} onShowChart={() => setShowGTOChart(true)}
            disabled={false}
          />
        </div>
      )}

      {/* Coach overlay */}
      {showCoach && street !== 'idle' && (
        <CoachOverlay
          message={coachMsg} isVisible={showCoach} mode={mode}
          gtoScore={mode === 'gto' ? gtoScore : undefined}
          recommendation={isHeroTurn ? {
            action: canCheck ? 'Check' : callAmount <= BIG_BLIND * 2 ? 'Call' : 'Fold',
            reasoning: canCheck ? 'No cost to see more cards -- check and re-evaluate.'
              : callAmount <= BIG_BLIND * 2 ? 'The price is small relative to the pot. Call and see what develops.'
              : 'The bet is large. Consider if your hand is strong enough to continue.',
          } : undefined}
          onDismiss={() => setShowCoach(false)}
        />
      )}

      {/* GTO Chart */}
      <GTOChart
        position={hero?.position || 'BTN'} tableSize={numPlayers <= 6 ? '6max' : '9max'}
        scenario="open" isVisible={showGTOChart} onClose={() => setShowGTOChart(false)}
        highlightHand={heroHandNotation(hero?.cards || [])}
      />
    </div>
  );
}
