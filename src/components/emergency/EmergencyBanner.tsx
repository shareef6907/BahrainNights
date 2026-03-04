'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <Link
      href="/emergency"
      className="block fixed top-0 left-0 right-0 z-[70] cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-red-700 animate-emergency-pulse">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/20 to-transparent animate-emergency-shimmer" />
        
        {/* Content */}
        <div className="relative px-4 py-3 flex items-center justify-center gap-3">
          {/* Pulsing warning icon */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute inset-0 animate-ping">
                <AlertTriangle className="w-5 h-5 text-white/50" />
              </div>
            </div>
          </div>

          {/* Banner text */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <span className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
              🚨 Emergency Contacts — Bahrain
            </span>
            <span className="hidden sm:inline text-white/80">|</span>
            <span className="text-xs sm:text-sm text-white/90">
              King Fahd Causeway is OPEN — Saudi Arabia route available
            </span>
          </div>

          {/* Right icon */}
          <div className="hidden sm:flex items-center">
            <AlertTriangle className="w-5 h-5 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
        
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60" />
      </div>
    </Link>
  );
}
