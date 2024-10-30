'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SpaceshipProps {
  onShoot: (position: { x: number; y: number }) => void;
}

export default function Spaceship({ onShoot }: SpaceshipProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 20;
      switch (e.key) {
        case 'ArrowLeft':
          setPosition(prev => ({ ...prev, x: Math.max(prev.x - speed, -window.innerWidth/2 + 25) }));
          break;
        case 'ArrowRight':
          setPosition(prev => ({ ...prev, x: Math.min(prev.x + speed, window.innerWidth/2 - 25) }));
          break;
        case ' ':
          onShoot(position);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onShoot, position]);

  return (
    <motion.div
      animate={controls}
      style={{
        x: position.x,
        y: position.y,
      }}
      className="absolute bottom-10 w-16 h-16 transform -translate-x-1/2"
    >
      <div className="relative w-full h-full">
        {/* Spaceship body */}
        <div className="absolute inset-0 bg-blue-500 clip-path-triangle transform rotate-180"></div>
        {/* Engine glow */}
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-orange-500 rounded-full transform -translate-x-1/2 blur-sm animate-pulse"></div>
      </div>
    </motion.div>
  );
}
