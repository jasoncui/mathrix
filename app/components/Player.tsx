'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PlayerProps {
  onPositionChange: (position: { x: number; y: number }) => void;
}

export default function Player({ onPositionChange }: PlayerProps) {
  const controls = useAnimation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const moveSpeed = 15;

  const jump = async () => {
    if (isJumping) return;
    
    setIsJumping(true);
    
    // Initial upward velocity
    await controls.start({
      y: [-100, -180],
      transition: {
        duration: 0.4,
        times: [0.4, 1],
        ease: [0.2, 0.5, 0.8, 1]
      }
    });

    // Fall back down with bounce
    await controls.start({
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5
      }
    });

    setIsJumping(false);
  };

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      let newX = position.x;

      switch (e.key) {
        case 'ArrowLeft':
          newX = Math.max(position.x - moveSpeed, -400);
          break;
        case 'ArrowRight':
          newX = Math.min(position.x + moveSpeed, 400);
          break;
        case ' ':
          jump();
          break;
      }

      if (newX !== position.x) {
        setPosition(prev => ({ ...prev, x: newX }));
        controls.set({ x: newX });
      }

      onPositionChange({ x: newX, y: position.y });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controls, onPositionChange, position]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: 0, y: 0 }}
      className="absolute bottom-0 left-1/2"
      style={{ 
        x: position.x,
        translateX: '-50%'
      }}
    >
      <div className="w-8 h-8 bg-blue-500 rounded-full shadow-lg" />
    </motion.div>
  );
}