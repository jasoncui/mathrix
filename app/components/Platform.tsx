'use client';

import { motion } from 'framer-motion';

interface PlatformProps {
  position: { x: number; y: number };
}

export default function Platform({ position }: PlatformProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${position.x}px)`,
        bottom: position.y,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="w-32 h-4 bg-green-500 rounded-lg" />
    </motion.div>
  );
}