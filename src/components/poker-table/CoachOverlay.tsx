'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface CoachOverlayProps {
  message: string;
  isVisible: boolean;
  mode: 'play' | 'watch' | 'gto' | 'replay';
  gtoScore?: number;
  recommendation?: { action: string; reasoning: string };
  onDismiss?: () => void;
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#eab308';
  if (score >= 40) return '#f97316';
  return '#ef4444';
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent!';
  if (score >= 80) return 'Great Play';
  if (score >= 60) return 'Decent';
  if (score >= 40) return 'Questionable';
  return 'Mistake';
}

const MODE_LABELS: Record<string, string> = {
  play: 'Coach Mode',
  watch: 'Watching',
  gto: 'GTO Trainer',
  replay: 'Replay Analysis',
};

export default function CoachOverlay({
  message,
  isVisible,
  mode,
  gtoScore,
  recommendation,
  onDismiss,
}: CoachOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={onDismiss}
          style={{
            position: 'absolute',
            bottom: 200,
            right: 20,
            zIndex: 50,
            maxWidth: 320,
            cursor: onDismiss ? 'pointer' : 'default',
          }}
        >
          <div
            className="glass"
            style={{
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              border: '1px solid rgba(212,168,67,0.2)',
            }}
          >
            {/* Header with avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Andrew avatar */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#fff',
                  flexShrink: 0,
                  boxShadow: '0 2px 10px rgba(59,130,246,0.4)',
                }}
              >
                A
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e5e7eb' }}>Andrew</div>
                <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
                  {MODE_LABELS[mode] || mode}
                </div>
              </div>
            </div>

            {/* Speech bubble / message */}
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: '#cbd5e1',
                padding: '10px 12px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 10,
                borderLeft: '3px solid #3b82f6',
              }}
            >
              {message}
            </div>

            {/* GTO Score bar */}
            {mode === 'gto' && gtoScore != null && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>GTO Accuracy</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: getScoreColor(gtoScore),
                    }}
                  >
                    {gtoScore}% - {getScoreLabel(gtoScore)}
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${gtoScore}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${getScoreColor(gtoScore)}, ${getScoreColor(gtoScore)}aa)`,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Recommendation */}
            {recommendation && (
              <div
                style={{
                  padding: '10px 12px',
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', marginBottom: 4 }}>
                  Recommended: {recommendation.action}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.4 }}>
                  {recommendation.reasoning}
                </div>
              </div>
            )}

            {/* Dismiss hint */}
            {onDismiss && (
              <div style={{ fontSize: 10, color: '#475569', textAlign: 'center' }}>
                Click to dismiss
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
