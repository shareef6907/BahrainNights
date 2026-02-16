'use client';

import { motion } from 'framer-motion';
import { Moon, Sun, Clock } from 'lucide-react';
import { useRamadan } from '@/contexts/RamadanContext';

interface IftarWidgetProps {
  variant?: 'header' | 'sidebar' | 'compact';
  className?: string;
}

export default function IftarWidget({ variant = 'sidebar', className = '' }: IftarWidgetProps) {
  const { isRamadan, iftarTime, suhoorTime, iftarCountdown, dayOfRamadan } = useRamadan();

  if (!isRamadan) return null;

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-2 px-3 py-1.5 bg-ramadan-primary/80 backdrop-blur-sm rounded-full border border-ramadan-gold/30 ${className}`}
      >
        <Moon className="w-4 h-4 text-ramadan-gold fill-ramadan-gold" />
        <span className="text-sm font-medium text-ramadan-cream">
          Iftar: {iftarTime}
        </span>
      </motion.div>
    );
  }

  if (variant === 'header') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-4 px-4 py-2 bg-ramadan-primary/90 backdrop-blur-sm rounded-xl border border-ramadan-gold/20 ${className}`}
      >
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-ramadan-gold fill-ramadan-gold animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs text-ramadan-cream/70">Iftar Today</span>
            <span className="text-sm font-bold text-ramadan-gold">{iftarTime}</span>
          </div>
        </div>
        <div className="w-px h-8 bg-ramadan-gold/30" />
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-ramadan-lantern-glow" />
          <span className="text-sm text-ramadan-cream">{iftarCountdown}</span>
        </div>
      </motion.div>
    );
  }

  // Default: sidebar variant
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`ramadan-card-gradient rounded-2xl p-6 border border-ramadan-gold/20 shadow-xl shadow-ramadan-primary/20 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Moon className="w-8 h-8 text-ramadan-gold fill-ramadan-gold" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-ramadan-lantern-glow rounded-full animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-ramadan-cream">Ramadan Times</h3>
          <p className="text-sm text-ramadan-cream/60">Day {dayOfRamadan} • Bahrain</p>
        </div>
      </div>

      {/* Times Grid */}
      <div className="space-y-4">
        {/* Iftar Time */}
        <div className="flex items-center justify-between p-3 bg-ramadan-secondary/50 rounded-xl border border-ramadan-gold/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ramadan-lantern-glow to-ramadan-lantern-warm flex items-center justify-center">
              <Moon className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <p className="text-xs text-ramadan-cream/60 uppercase tracking-wide">Iftar</p>
              <p className="text-xl font-bold text-ramadan-gold">{iftarTime}</p>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="text-center py-3 bg-ramadan-gold/10 rounded-xl border border-ramadan-gold/20">
          <p className="text-sm text-ramadan-cream/70 mb-1">Time until Iftar</p>
          <p className="text-lg font-semibold text-ramadan-lantern-glow">{iftarCountdown}</p>
        </div>

        {/* Suhoor Time */}
        <div className="flex items-center justify-between p-3 bg-ramadan-secondary/50 rounded-xl border border-ramadan-gold/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-ramadan-cream/60 uppercase tracking-wide">Suhoor ends</p>
              <p className="text-lg font-semibold text-ramadan-cream">{suhoorTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-ramadan-cream/40 text-center mt-4">
        Times are approximate for Bahrain
      </p>
    </motion.div>
  );
}
