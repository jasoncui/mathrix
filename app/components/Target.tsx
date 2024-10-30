'use client';

import { motion } from 'framer-motion';

interface TargetProps {
  position: { x: number; y: number };
  onDestroy: () => void;
}

export default function Target({ position, onDestroy }: TargetProps) {
  return (
    <motion.div
      initial={{ x: position.x, y: position.y }}
      className="absolute w-10 h-10"
      style={{ 
        left: `calc(50% + ${position.x}px)`,
        top: position.y,
        transform: 'translateX(-50%)' 
      }}
    >
      <div className="w-full h-full bg-purple-500 rounded-lg animate-pulse" />
    </motion.div>
  );
}