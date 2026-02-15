'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Shuffle, Sparkles, MapPin, Clock, X, RefreshCw } from 'lucide-react';

export interface SurpriseOption {
  type: 'event' | 'place' | 'attraction';
  id: string;
  title: string;
  slug: string;
  image: string;
  venue?: string;
  category: string;
  time?: string;
  href: string;
}

interface SurpriseMeProps {
  events: SurpriseOption[];
  places: SurpriseOption[];
  attractions: SurpriseOption[];
}

const funPhrases = [
  "Rolling the dice... 🎲",
  "Consulting the stars... ✨",
  "Spinning the wheel... 🎡",
  "Finding magic... 🔮",
  "Shuffling options... 🃏",
  "Asking the universe... 🌌",
];

export default function SurpriseMe({ events, places, attractions }: SurpriseMeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<SurpriseOption | null>(null);
  const [funPhrase, setFunPhrase] = useState('');
  const [filter, setFilter] = useState<'all' | 'event' | 'place' | 'attraction'>('all');

  const allOptions = [...events, ...places, ...attractions];

  const getFilteredOptions = () => {
    if (filter === 'all') return allOptions;
    return allOptions.filter(o => o.type === filter);
  };

  const spin = () => {
    setIsSpinning(true);
    setResult(null);
    setFunPhrase(funPhrases[Math.floor(Math.random() * funPhrases.length)]);

    // Simulate spinning animation
    setTimeout(() => {
      const options = getFilteredOptions();
      if (options.length > 0) {
        const random = options[Math.floor(Math.random() * options.length)];
        setResult(random);
      }
      setIsSpinning(false);
    }, 1500);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setResult(null);
  };

  // Don't render if no options available
  if (allOptions.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Shuffle className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
        <span className="absolute -top-2 -left-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
          NEW
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Content */}
            <motion.div
              className="relative bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-purple-500/30 shadow-2xl shadow-purple-500/20"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  className="inline-block mb-4"
                  animate={{ rotate: isSpinning ? 360 : 0 }}
                  transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0, ease: 'linear' }}
                >
                  <Sparkles className="w-12 h-12 text-yellow-500" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-2">Surprise Me! 🎉</h2>
                <p className="text-gray-400">Can&apos;t decide? Let fate choose for you!</p>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 mb-6 justify-center flex-wrap">
                {[
                  { value: 'all', label: 'Anything', icon: '🎲' },
                  { value: 'event', label: 'Events', icon: '🎭' },
                  { value: 'place', label: 'Places', icon: '📍' },
                  { value: 'attraction', label: 'Attractions', icon: '🎢' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setFilter(opt.value as typeof filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filter === opt.value
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>

              {/* Result Area */}
              <div className="min-h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isSpinning ? (
                    <motion.div
                      key="spinning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                      >
                        🎰
                      </motion.div>
                      <p className="text-lg text-purple-300">{funPhrase}</p>
                    </motion.div>
                  ) : result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full"
                    >
                      <Link
                        href={result.href}
                        onClick={() => setIsOpen(false)}
                        className="block group"
                      >
                        <div className="relative rounded-2xl overflow-hidden">
                          <img
                            src={result.image}
                            alt={result.title}
                            loading="lazy"
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                          <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full uppercase">
                            {result.type}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <span className="text-sm text-purple-300 mb-1 block">{result.category}</span>
                            <h3 className="text-xl font-bold group-hover:text-yellow-500 transition-colors">
                              {result.title}
                            </h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                              {result.venue && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {result.venue}
                                </span>
                              )}
                              {result.time && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {result.time}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-gray-400"
                    >
                      <p className="text-6xl mb-4">🎰</p>
                      <p>Press the button to discover something amazing!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  onClick={spin}
                  disabled={isSpinning}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSpinning ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Spinning...
                    </>
                  ) : result ? (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Try Again
                    </>
                  ) : (
                    <>
                      <Shuffle className="w-5 h-5" />
                      Surprise Me!
                    </>
                  )}
                </motion.button>
              </div>

              <p className="text-center text-xs text-gray-500 mt-4">
                {getFilteredOptions().length} options available
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
