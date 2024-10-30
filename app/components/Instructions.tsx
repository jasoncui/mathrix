'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Instructions() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-5 right-5 bg-white/10 backdrop-blur-md rounded-lg p-4 max-w-xs"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-white">How to Play</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      <ul className="text-white/80 space-y-2 text-sm">
        <li>• Use <span className="font-bold">arrow keys</span> or <span className="font-bold">WASD</span> to move the spaceship</li>
        <li>• Press <span className="font-bold">Space</span> to shoot lasers</li>
        <li>• Destroy incoming enemies to score points</li>
        <li>• Avoid getting hit by enemy projectiles</li>
      </ul>
    </motion.div>
  );
}
