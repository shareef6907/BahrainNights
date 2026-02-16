'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

// Ramadan 2026 dates for Bahrain (approx Feb 28 - Mar 29, 2026)
// Using conservative estimates - actual dates depend on moon sighting
const RAMADAN_CONFIG = {
  2025: {
    start: new Date('2025-02-28'),
    end: new Date('2025-03-30'), // End includes Eid day
  },
  2026: {
    start: new Date('2026-02-17'),
    end: new Date('2026-03-19'),
  },
  2027: {
    start: new Date('2027-02-06'),
    end: new Date('2027-03-08'),
  },
};

// Bahrain Iftar times for Ramadan 2026 (approximate, based on astronomical data)
// These are rough estimates - in production, use an API like Aladhan
const IFTAR_TIMES_2026: Record<number, string> = {
  // Day of Ramadan -> Iftar time (24h format)
  1: '17:47', 2: '17:48', 3: '17:49', 4: '17:49', 5: '17:50',
  6: '17:51', 7: '17:51', 8: '17:52', 9: '17:52', 10: '17:53',
  11: '17:54', 12: '17:54', 13: '17:55', 14: '17:55', 15: '17:56',
  16: '17:56', 17: '17:57', 18: '17:57', 19: '17:58', 20: '17:58',
  21: '17:59', 22: '17:59', 23: '18:00', 24: '18:00', 25: '18:01',
  26: '18:01', 27: '18:02', 28: '18:02', 29: '18:03', 30: '18:03',
};

// Bahrain Suhoor times for Ramadan 2026 (approximate)
const SUHOOR_TIMES_2026: Record<number, string> = {
  1: '04:38', 2: '04:37', 3: '04:36', 4: '04:35', 5: '04:34',
  6: '04:33', 7: '04:32', 8: '04:31', 9: '04:30', 10: '04:29',
  11: '04:28', 12: '04:27', 13: '04:26', 14: '04:24', 15: '04:23',
  16: '04:22', 17: '04:21', 18: '04:20', 19: '04:19', 20: '04:17',
  21: '04:16', 22: '04:15', 23: '04:14', 24: '04:12', 25: '04:11',
  26: '04:10', 27: '04:09', 28: '04:07', 29: '04:06', 30: '04:05',
};

interface RamadanContextType {
  isRamadan: boolean;
  isRamadanBannerDismissed: boolean;
  dismissBanner: () => void;
  dayOfRamadan: number;
  iftarTime: string;
  suhoorTime: string;
  iftarCountdown: string;
  ramadanYear: number | null;
  daysUntilRamadan: number | null;
  colors: {
    primaryBg: string;
    secondaryBg: string;
    gold: string;
    goldLight: string;
    lanternGlow: string;
    lanternWarm: string;
    cream: string;
  };
}

const RamadanContext = createContext<RamadanContextType | undefined>(undefined);

function getRamadanStatus(): { isRamadan: boolean; dayOfRamadan: number; year: number | null; daysUntil: number | null } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Check each configured year
  for (const [year, dates] of Object.entries(RAMADAN_CONFIG)) {
    const start = new Date(dates.start);
    const end = new Date(dates.end);

    if (today >= start && today <= end) {
      const dayDiff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return {
        isRamadan: true,
        dayOfRamadan: Math.min(dayDiff, 30),
        year: parseInt(year),
        daysUntil: 0,
      };
    }

    // Check if Ramadan is upcoming this year
    if (today < start) {
      const daysUntil = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntil <= 30) {
        return {
          isRamadan: false,
          dayOfRamadan: 0,
          year: parseInt(year),
          daysUntil,
        };
      }
    }
  }

  return { isRamadan: false, dayOfRamadan: 0, year: null, daysUntil: null };
}

function formatTime12h(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function calculateCountdown(targetTime: string): string {
  const now = new Date();
  const [hours, minutes] = targetTime.split(':').map(Number);
  
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  
  // If target time has passed, show 0
  if (now > target) {
    return '🌙 Iftar time!';
  }
  
  const diff = target.getTime() - now.getTime();
  const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hoursLeft > 0) {
    return `${hoursLeft}h ${minutesLeft}m until Iftar`;
  }
  return `${minutesLeft}m until Iftar`;
}

export function RamadanProvider({ children }: { children: ReactNode }) {
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [countdown, setCountdown] = useState('');
  
  const ramadanStatus = useMemo(() => getRamadanStatus(), []);
  
  const iftarTime = ramadanStatus.isRamadan 
    ? IFTAR_TIMES_2026[ramadanStatus.dayOfRamadan] || '17:50'
    : '17:50';
  
  const suhoorTime = ramadanStatus.isRamadan
    ? SUHOOR_TIMES_2026[ramadanStatus.dayOfRamadan] || '04:30'
    : '04:30';

  // Check localStorage for banner dismissal on mount
  useEffect(() => {
    const dismissed = localStorage.getItem('ramadan-banner-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      // Reset dismissal after 24 hours
      if (now.getTime() - dismissedDate.getTime() > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('ramadan-banner-dismissed');
      } else {
        setIsBannerDismissed(true);
      }
    }
  }, []);

  // Update countdown every minute
  useEffect(() => {
    if (!ramadanStatus.isRamadan) return;
    
    const updateCountdown = () => {
      setCountdown(calculateCountdown(iftarTime));
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [ramadanStatus.isRamadan, iftarTime]);

  const dismissBanner = () => {
    setIsBannerDismissed(true);
    localStorage.setItem('ramadan-banner-dismissed', new Date().toISOString());
  };

  const colors = {
    primaryBg: '#1a1a2e',
    secondaryBg: '#16213e',
    gold: '#d4af37',
    goldLight: '#f4c430',
    lanternGlow: '#ff9f43',
    lanternWarm: '#ee5a24',
    cream: '#fef6e4',
  };

  const value: RamadanContextType = {
    isRamadan: ramadanStatus.isRamadan,
    isRamadanBannerDismissed: isBannerDismissed,
    dismissBanner,
    dayOfRamadan: ramadanStatus.dayOfRamadan,
    iftarTime: formatTime12h(iftarTime),
    suhoorTime: formatTime12h(suhoorTime),
    iftarCountdown: countdown,
    ramadanYear: ramadanStatus.year,
    daysUntilRamadan: ramadanStatus.daysUntil,
    colors,
  };

  return (
    <RamadanContext.Provider value={value}>
      {children}
    </RamadanContext.Provider>
  );
}

export function useRamadan() {
  const context = useContext(RamadanContext);
  if (context === undefined) {
    throw new Error('useRamadan must be used within a RamadanProvider');
  }
  return context;
}

// For testing - override Ramadan status
export function useRamadanDebug() {
  const context = useRamadan();
  return {
    ...context,
    // Add debug flag via URL param: ?ramadan=true
    isRamadan: typeof window !== 'undefined' 
      ? new URLSearchParams(window.location.search).get('ramadan') === 'true' || context.isRamadan
      : context.isRamadan,
  };
}
