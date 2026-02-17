'use client';

import { X, Moon, Sparkles } from 'lucide-react';
import { useRamadan } from '@/contexts/RamadanContext';

export default function RamadanBanner() {
  const { isRamadan, isRamadanBannerDismissed, dismissBanner, daysUntilRamadan } = useRamadan();

  // Show banner during Ramadan or up to 7 days before
  const shouldShow = isRamadan || (daysUntilRamadan !== null && daysUntilRamadan <= 7);

  if (!shouldShow || isRamadanBannerDismissed) return null;

  const bannerText = 'Ramadan Mubarak 🌙';

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] ramadan-banner-gradient animate-slide-down-banner"
    >
      <div className="relative overflow-hidden">
        {/* Animated stars background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1 left-[10%] w-1 h-1 bg-ramadan-gold rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-2 left-[25%] w-0.5 h-0.5 bg-ramadan-gold-light rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="absolute top-1 left-[40%] w-1 h-1 bg-ramadan-gold rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="absolute top-2 left-[55%] w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }} />
          <div className="absolute top-1 left-[70%] w-1 h-1 bg-ramadan-gold-light rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
          <div className="absolute top-2 left-[85%] w-0.5 h-0.5 bg-ramadan-gold rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="px-4 py-3 flex items-center justify-center gap-3">
          {/* Decorative left lantern */}
          <div className="hidden sm:flex items-center gap-2 text-ramadan-gold">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>

          {/* Crescent moon icon */}
          <Moon className="w-5 h-5 text-ramadan-gold fill-ramadan-gold animate-float" />

          {/* Banner text */}
          <span className="text-sm sm:text-base font-semibold text-ramadan-cream tracking-wide">
            {bannerText}
          </span>

          {/* Decorative right element */}
          <div className="hidden sm:flex items-center gap-2 text-ramadan-gold">
            <Sparkles className="w-4 h-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Close button */}
          <button
            onClick={dismissBanner}
            className="absolute right-2 sm:right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors group"
            aria-label="Dismiss Ramadan banner"
          >
            <X className="w-4 h-4 text-ramadan-cream/70 group-hover:text-ramadan-cream transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
