'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import MathProblem from './components/MathProblem';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Problem {
  question: string;
  answer: number;
}

export default function Home() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState('');

  const generateProblem = useCallback(() => {
    let num1: number, num2: number, operator: string;
    
    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operator = ['+', '-'][Math.floor(Math.random() * 2)];
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 100) + 1;
        operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
        if (operator === '/') {
          // Ensure clean division
          num2 = Math.floor(Math.random() * 10) + 1;
          num1 = num2 * (Math.floor(Math.random() * 10) + 1);
        }
        break;
    }

    let answer: number;
    switch (operator) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
      case '/': answer = num1 / num2; break;
      default: answer = 0;
    }

    return {
      question: `${num1} ${operator} ${num2}`,
      answer: answer
    };
  }, [difficulty]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(10);
    setIsPlaying(true);
    setCurrentProblem(generateProblem());
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    if (!currentProblem) return;

    const numAnswer = parseFloat(userAnswer);
    if (numAnswer === currentProblem.answer) {
      const points = {
        easy: 100,
        medium: 200,
        hard: 300
      }[difficulty];
      
      const streakBonus = Math.floor(streak * points * 0.1);
      const timeBonus = Math.floor(timeLeft * points * 0.1);
      const totalPoints = points + streakBonus + timeBonus;

      setScore(prev => prev + totalPoints);
      setStreak(prev => prev + 1);
      setFeedback(`+${totalPoints} (${streakBonus} streak, ${timeBonus} time)`);
      setTimeLeft(10);
      setCurrentProblem(generateProblem());
      setUserAnswer('');
    } else {
      setStreak(0);
      setFeedback('Wrong! Try again');
    }
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setHighScore(prev => Math.max(prev, score));
    }
  }, [isPlaying, timeLeft, score]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-between p-4">
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">
          {!isPlaying ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="mb-8">
                <motion.h1 
                  className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  MATHRIX
                </motion.h1>
                <motion.p 
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Test your mental math skills!
                </motion.p>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Select Difficulty</h2>
                <div className="flex gap-4 justify-center">
                  {['easy', 'medium', 'hard'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d as Difficulty)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        difficulty === d
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {highScore > 0 && (
                <div className="text-xl font-semibold mb-8">High Score: {highScore}</div>
              )}
              <button
                onClick={startGame}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Game
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="text-xl font-semibold text-indigo-900">Score: {score}</div>
                <div className="text-xl font-semibold text-indigo-900">
                  Streak: <span className="text-orange-500">{streak}</span>
                  <span className="ml-1" role="img" aria-label="fire">🔥</span>
                </div>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setHighScore(prev => Math.max(prev, score));
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
                >
                  End Game
                </button>
              </div>
              
              {currentProblem && (
                <MathProblem problem={currentProblem.question} timeLeft={timeLeft} />
              )}

              <div className="mt-8 space-y-2">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter your answer"
                  className="w-full px-4 py-3 text-2xl text-center text-indigo-900 placeholder-indigo-300 
                           bg-indigo-50 border-2 border-indigo-200 rounded-lg 
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none
                           transition-all"
                  autoFocus
                />
                <p className="text-sm text-gray-500 italic">Press Enter to submit your answer</p>
              </div>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-lg font-semibold"
                  style={{ color: feedback.includes('+') ? 'green' : 'red' }}
                >
                  {feedback}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full text-center py-4">
        <p className="text-gray-600 text-sm">
          Made with <span className="text-red-500">❤️</span> by{' '}
          <a 
            href="https://www.linkedin.com/in/jasonscui" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
          >
            Jason Cui
          </a>{' '}
          • Powered by{' '}
          <a 
            href="https://codeium.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
          >
            Codeium
          </a>
        </p>
      </footer>
    </div>
  );
}
