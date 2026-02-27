'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HAND_GRID, getChart, getHandColor } from '@/data/gto-charts';

interface GTOChartProps {
  position: string;
  tableSize: '6max' | '9max';
  scenario: string;
  isVisible: boolean;
  onClose: () => void;
  highlightHand?: string;
}

export default function GTOChart({
  position,
  tableSize,
  scenario,
  isVisible,
  onClose,
  highlightHand,
}: GTOChartProps) {
  const [hoveredHand, setHoveredHand] = useState<string | null>(null);

  const chartData = getChart(position, tableSize, scenario);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#111111',
              border: '1px solid rgba(212,168,67,0.3)',
              borderRadius: 16,
              padding: 20,
              maxWidth: 520,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#94a3b8',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s',
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
              }}
            >
              &times;
            </button>

            {/* Header */}
            <div style={{ marginBottom: 16 }}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#d4a843',
                  margin: 0,
                }}
              >
                {position.toUpperCase()} - {scenario === 'open' ? 'Open Raise' : scenario === 'vs_raise' ? 'vs Raise' : scenario === 'vs_3bet' ? 'vs 3-Bet' : scenario}
              </h3>
              <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 0 0' }}>
                {tableSize.toUpperCase()} | Preflop Range Chart
              </p>
              {chartData?.description && (
                <p style={{ fontSize: 11, color: '#475569', margin: '6px 0 0 0', lineHeight: 1.4 }}>
                  {chartData.description}
                </p>
              )}
            </div>

            {!chartData ? (
              <div
                style={{
                  padding: 40,
                  textAlign: 'center',
                  color: '#64748b',
                  fontSize: 14,
                }}
              >
                Chart not available for {position} {scenario} ({tableSize})
              </div>
            ) : (
              <>
                {/* Legend */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                  {[
                    { action: 'raise' as const, label: 'Raise / Open' },
                    { action: 'call' as const, label: 'Call' },
                    { action: 'mixed' as const, label: 'Mixed' },
                    { action: 'fold' as const, label: 'Fold' },
                  ].map(({ action, label }) => (
                    <div key={action} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 2,
                          background: getHandColor(action),
                        }}
                      />
                      <span style={{ fontSize: 10, color: '#94a3b8' }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* 13x13 Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(13, 1fr)',
                    gap: 1,
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    padding: 1,
                  }}
                >
                  {HAND_GRID.map((row, r) =>
                    row.map((hand, c) => {
                      const handAction = chartData.chart[hand];
                      const action = handAction?.action || 'fold';
                      const bgColor = getHandColor(action);
                      const isHighlighted = highlightHand === hand;
                      const isHovered = hoveredHand === hand;

                      return (
                        <div
                          key={`${r}-${c}`}
                          className="gto-cell"
                          onMouseEnter={() => setHoveredHand(hand)}
                          onMouseLeave={() => setHoveredHand(null)}
                          style={{
                            background: bgColor,
                            opacity: action === 'fold' ? 0.5 : 0.9,
                            color: action === 'fold' ? '#6b7280' : '#fff',
                            border: isHighlighted
                              ? '2px solid #d4a843'
                              : '1px solid rgba(255,255,255,0.1)',
                            boxShadow: isHighlighted
                              ? '0 0 8px rgba(212,168,67,0.6)'
                              : 'none',
                            position: 'relative',
                            fontSize: hand.length > 2 ? 9 : 10,
                          }}
                        >
                          {hand}

                          {/* Hover tooltip */}
                          {isHovered && handAction && (
                            <div
                              style={{
                                position: 'absolute',
                                bottom: '110%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: '#1e1e1e',
                                border: '1px solid rgba(212,168,67,0.3)',
                                borderRadius: 6,
                                padding: '6px 10px',
                                whiteSpace: 'nowrap',
                                zIndex: 20,
                                fontSize: 11,
                                pointerEvents: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                              }}
                            >
                              <div style={{ fontWeight: 700, color: '#e5e7eb', marginBottom: 2 }}>
                                {hand}
                              </div>
                              <div style={{ color: getHandColor(action), fontWeight: 600, textTransform: 'capitalize' }}>
                                {action}
                                {handAction.frequency != null && action === 'mixed' && (
                                  <span style={{ color: '#94a3b8', fontWeight: 400 }}>
                                    {' '}({Math.round(handAction.frequency * 100)}%)
                                  </span>
                                )}
                              </div>
                              {handAction.altAction && (
                                <div style={{ fontSize: 10, color: '#64748b', textTransform: 'capitalize' }}>
                                  or {handAction.altAction}
                                  {handAction.altFrequency != null && (
                                    <span> ({Math.round(handAction.altFrequency * 100)}%)</span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
