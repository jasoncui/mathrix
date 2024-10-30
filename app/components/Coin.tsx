'use client';

import { motion } from 'framer-motion';

interface CoinProps {
  position: { x: number; y: number };
  onCollect: () => void;
}

export default function Coin({ position, onCollect }: CoinProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${position.x}px)`,
        bottom: position.y,
        transform: 'translateX(-50%)'
      }}
      whileHover={{ scale: 1.1 }}
      onClick={onCollect}
    >
      <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce">
        <div className="w-4 h-4 bg-yellow-300 rounded-full m-1" />
      </div>
    </motion.div>
  );
}