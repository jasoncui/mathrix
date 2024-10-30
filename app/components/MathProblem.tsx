'use client';

import { motion } from 'framer-motion';

interface MathProblemProps {
  problem: string;
  timeLeft: number;
}

export default function MathProblem({ problem, timeLeft }: MathProblemProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center p-8 bg-indigo-100 rounded-xl shadow-sm"
    >
      <div className="text-7xl font-bold mb-8 font-mono text-indigo-900">{problem}</div>
      <div className="text-2xl font-semibold text-indigo-600">
        Time: {timeLeft}s
      </div>
    </motion.div>
  );
}