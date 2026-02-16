'use client';

import { motion } from 'framer-motion';
import { useRamadan } from '@/contexts/RamadanContext';

export default function RamadanHeroDecoration() {
  const { isRamadan } = useRamadan();

  if (!isRamadan) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Crescent Moon - Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 right-10 md:top-24 md:right-20 lg:right-32"
      >
        <div className="relative">
          {/* Moon glow effect */}
          <div className="absolute inset-0 w-20 h-20 md:w-28 md:h-28 bg-ramadan-gold rounded-full blur-2xl opacity-30 animate-pulse" />
          
          {/* Crescent moon SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-16 h-16 md:w-24 md:h-24 text-ramadan-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            fill="currentColor"
          >
            <path d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C40 85 35 67.5 35 50 C35 32.5 40 15 50 5 Z" />
          </svg>

          {/* Stars around the moon */}
          <div className="absolute -top-2 -left-4 w-2 h-2 bg-ramadan-gold-light rounded-full animate-twinkle" />
          <div className="absolute -top-4 right-2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.3s' }} />
          <div className="absolute top-2 -right-3 w-1 h-1 bg-ramadan-gold rounded-full animate-twinkle" style={{ animationDelay: '0.6s' }} />
        </div>
      </motion.div>

      {/* Lantern - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-28 left-6 md:top-32 md:left-16 lg:left-24"
      >
        <div className="relative animate-float" style={{ animationDuration: '4s' }}>
          {/* Lantern glow */}
          <div className="absolute inset-0 w-14 h-20 md:w-16 md:h-24 bg-ramadan-lantern-glow rounded-full blur-xl opacity-40" />
          
          {/* Lantern SVG */}
          <svg
            viewBox="0 0 60 90"
            className="w-10 h-16 md:w-14 md:h-20"
          >
            {/* Lantern top cap */}
            <path
              d="M25 5 L35 5 L38 15 L22 15 Z"
              fill="#d4af37"
            />
            {/* Hanging ring */}
            <circle cx="30" cy="3" r="2" fill="#d4af37" />
            
            {/* Lantern body */}
            <path
              d="M20 15 L40 15 L42 70 L18 70 Z"
              fill="url(#lanternGradient)"
              stroke="#d4af37"
              strokeWidth="1.5"
            />
            
            {/* Lantern glass panels */}
            <path
              d="M22 20 L38 20 L39 65 L21 65 Z"
              fill="url(#glassGradient)"
              opacity="0.8"
            />
            
            {/* Cross pattern */}
            <line x1="30" y1="20" x2="30" y2="65" stroke="#d4af37" strokeWidth="1" opacity="0.6" />
            <line x1="22" y1="42" x2="38" y2="42" stroke="#d4af37" strokeWidth="1" opacity="0.6" />
            
            {/* Lantern bottom */}
            <path
              d="M18 70 L42 70 L40 80 L20 80 Z"
              fill="#d4af37"
            />
            
            {/* Inner flame glow */}
            <ellipse
              cx="30"
              cy="45"
              rx="6"
              ry="10"
              fill="url(#flameGradient)"
              className="animate-pulse"
            />
            
            <defs>
              <linearGradient id="lanternGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="100%" stopColor="#16213e" />
              </linearGradient>
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff9f43" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ee5a24" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ff9f43" stopOpacity="0.3" />
              </linearGradient>
              <radialGradient id="flameGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef6e4" />
                <stop offset="50%" stopColor="#ff9f43" />
                <stop offset="100%" stopColor="#ee5a24" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Small decorative lantern - Bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-40 right-8 md:bottom-48 md:right-24 hidden md:block"
      >
        <div className="relative animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <div className="absolute inset-0 w-8 h-12 bg-ramadan-lantern-warm rounded-full blur-lg opacity-30" />
          <svg viewBox="0 0 60 90" className="w-8 h-12 opacity-60">
            <path d="M25 5 L35 5 L38 15 L22 15 Z" fill="#d4af37" />
            <circle cx="30" cy="3" r="2" fill="#d4af37" />
            <path d="M20 15 L40 15 L42 70 L18 70 Z" fill="#16213e" stroke="#d4af37" strokeWidth="1" />
            <ellipse cx="30" cy="42" rx="5" ry="8" fill="#ff9f43" opacity="0.6" />
            <path d="M18 70 L42 70 L40 80 L20 80 Z" fill="#d4af37" />
          </svg>
        </div>
      </motion.div>

      {/* Scattered stars */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-ramadan-gold-light rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/5 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/5 right-1/4 w-0.5 h-0.5 bg-ramadan-gold rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }} />
      
      {/* Subtle geometric pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
