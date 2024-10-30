'use client';

import { motion } from 'framer-motion';

interface LaserProps {
  position: { x: number; y: number };
  onComplete?: () => void;
}

export default function Laser({ position, onComplete }: LaserProps) {
  return (
    <motion.div
      initial={{ x: position.x, y: position.y }}
      animate={{ y: -800 }}
      transition={{ duration: 1, ease: 'linear' }}
      onAnimationComplete={onComplete}
      className="absolute w-2 h-8 bg-red-500 rounded-full"
      style={{ 
        left: `calc(50% + ${position.x}px)`,
        transform: 'translateX(-50%)'
      }}
    />
  );
}
