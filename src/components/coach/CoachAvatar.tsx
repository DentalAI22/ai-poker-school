'use client';

import { motion } from 'framer-motion';

interface CoachAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  speaking?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-2xl',
};

export default function CoachAvatar({
  size = 'md',
  speaking = false,
  className = '',
}: CoachAvatarProps) {
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {/* Glow effect when speaking */}
      {speaking && (
        <motion.div
          className={`absolute inset-0 rounded-full bg-gold/30 blur-md ${sizeMap[size]}`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Gradient border ring */}
      <div
        className={`relative rounded-full p-[2px] bg-gradient-to-br from-felt-dark to-gold ${sizeMap[size]}`}
      >
        {/* Inner circle */}
        <div className="w-full h-full rounded-full bg-card-bg flex items-center justify-center">
          <motion.span
            className="font-bold text-gold select-none"
            animate={
              speaking
                ? {
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            A
          </motion.span>
        </div>
      </div>
    </div>
  );
}
