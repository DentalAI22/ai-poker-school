'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionButtonsProps {
  onFold: () => void;
  onCheck: () => void;
  onCall: (amount: number) => void;
  onRaise: (amount: number) => void;
  onAllIn: () => void;
  callAmount: number;
  potSize: number;
  playerChips: number;
  minRaise: number;
  maxRaise: number;
  canCheck: boolean;
  onAskCoach?: () => void;
  onShowChart?: () => void;
  disabled?: boolean;
}

export default function ActionButtons({
  onFold,
  onCheck,
  onCall,
  onRaise,
  onAllIn,
  callAmount,
  potSize,
  playerChips,
  minRaise,
  maxRaise,
  canCheck,
  onAskCoach,
  onShowChart,
  disabled,
}: ActionButtonsProps) {
  const [showRaiseSlider, setShowRaiseSlider] = useState(false);
  const [raiseAmount, setRaiseAmount] = useState(minRaise);

  const handleRaiseSubmit = useCallback(() => {
    onRaise(raiseAmount);
    setShowRaiseSlider(false);
  }, [onRaise, raiseAmount]);

  const setQuickBet = useCallback(
    (fraction: number) => {
      const amount = Math.min(Math.round(potSize * fraction), maxRaise);
      setRaiseAmount(Math.max(amount, minRaise));
    },
    [potSize, maxRaise, minRaise]
  );

  const canRaise = playerChips > callAmount && minRaise <= maxRaise;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 600, margin: '0 auto' }}>
      {/* Raise slider panel */}
      <AnimatePresence>
        {showRaiseSlider && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="glass"
              style={{
                padding: 14,
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {/* Quick bet buttons */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { label: '33%', fraction: 0.33 },
                  { label: '50%', fraction: 0.5 },
                  { label: '75%', fraction: 0.75 },
                  { label: 'Pot', fraction: 1.0 },
                ].map(({ label, fraction }) => (
                  <button
                    key={label}
                    onClick={() => setQuickBet(fraction)}
                    disabled={disabled}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 6,
                      background: 'rgba(212,168,67,0.15)',
                      border: '1px solid rgba(212,168,67,0.3)',
                      color: '#d4a843',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      if (!disabled) (e.target as HTMLElement).style.background = 'rgba(212,168,67,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = 'rgba(212,168,67,0.15)';
                    }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    onAllIn();
                    setShowRaiseSlider(false);
                  }}
                  disabled={disabled}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 6,
                    background: 'rgba(239,68,68,0.2)',
                    border: '1px solid rgba(239,68,68,0.4)',
                    color: '#ef4444',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  All-In
                </button>
              </div>

              {/* Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>${minRaise}</span>
                <input
                  type="range"
                  min={minRaise}
                  max={maxRaise}
                  step={Math.max(1, Math.floor((maxRaise - minRaise) / 100))}
                  value={raiseAmount}
                  onChange={(e) => setRaiseAmount(Number(e.target.value))}
                  disabled={disabled}
                  style={{
                    flex: 1,
                    accentColor: '#d4a843',
                    height: 6,
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>${maxRaise}</span>
              </div>

              {/* Amount input + confirm */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <div
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(212,168,67,0.3)',
                    borderRadius: 8,
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ color: '#d4a843', fontWeight: 700, fontSize: 14 }}>$</span>
                  <input
                    type="number"
                    min={minRaise}
                    max={maxRaise}
                    value={raiseAmount}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setRaiseAmount(Math.min(Math.max(v, minRaise), maxRaise));
                    }}
                    disabled={disabled}
                    style={{
                      width: 80,
                      background: 'transparent',
                      border: 'none',
                      color: '#e5e7eb',
                      fontSize: 16,
                      fontWeight: 700,
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>
                <button
                  onClick={handleRaiseSubmit}
                  disabled={disabled}
                  className="btn-gold"
                  style={{ padding: '8px 20px', fontSize: 13 }}
                >
                  Raise to ${raiseAmount.toLocaleString()}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main action buttons row */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Fold */}
        <button
          onClick={onFold}
          disabled={disabled}
          style={{
            padding: '12px 24px',
            borderRadius: 10,
            background: 'linear-gradient(135deg, #dc2626, #991b1b)',
            border: '1px solid rgba(239,68,68,0.4)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            opacity: disabled ? 0.5 : 1,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            minWidth: 90,
          }}
        >
          Fold
        </button>

        {/* Check or Call */}
        {canCheck ? (
          <button
            onClick={onCheck}
            disabled={disabled}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              border: '1px solid rgba(34,197,94,0.4)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: disabled ? 0.5 : 1,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              minWidth: 90,
            }}
          >
            Check
          </button>
        ) : (
          <button
            onClick={() => onCall(callAmount)}
            disabled={disabled || playerChips < callAmount}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              border: '1px solid rgba(34,197,94,0.4)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: disabled ? 0.5 : 1,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              minWidth: 90,
            }}
          >
            Call ${callAmount}
          </button>
        )}

        {/* Raise */}
        {canRaise && (
          <button
            onClick={() => setShowRaiseSlider((p) => !p)}
            disabled={disabled}
            className="btn-gold"
            style={{
              padding: '12px 24px',
              fontSize: 14,
              opacity: disabled ? 0.5 : 1,
              minWidth: 90,
            }}
          >
            {showRaiseSlider ? 'Cancel' : 'Raise'}
          </button>
        )}
      </div>

      {/* Coach + Chart buttons */}
      {(onAskCoach || onShowChart) && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {onAskCoach && (
            <button
              onClick={onAskCoach}
              disabled={disabled}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                border: '1px solid rgba(59,130,246,0.4)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: disabled ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 16 }}>&#x1F9E0;</span> Ask Coach
            </button>
          )}
          {onShowChart && (
            <button
              onClick={onShowChart}
              disabled={disabled}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'rgba(212,168,67,0.1)',
                border: '1px solid rgba(212,168,67,0.3)',
                color: '#d4a843',
                fontSize: 12,
                fontWeight: 600,
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: disabled ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 16 }}>&#x1F4CA;</span> Show Chart
            </button>
          )}
        </div>
      )}
    </div>
  );
}
