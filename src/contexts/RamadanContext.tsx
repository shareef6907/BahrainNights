'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';

// Ramadan 2026 dates for Bahrain (approx Feb 28 - Mar 29, 2026)
// Using conservative estimates - actual dates depend on moon sighting
const RAMADAN_CONFIG = {
  2025: {
    start: new Date('2025-02-28'),
    end: new Date('2025-03-30'), // End includes Eid day
  },
  2026: {
    // Confirmed via moon sighting on Feb 17, 2026
    // Fasting begins Feb 18, ends approx Mar 19 (30 days)
    start: new Date('2026-02-18'),
    end: new Date('2026-03-19'),
  },
  2027: {
    start: new Date('2027-02-06'),
    end: new Date('2027-03-08'),
  },
};

// Bahrain Iftar times for Ramadan 2026 (Maghrib times from Aladhan API, Umm Al-Qura method)
// Source: api.aladhan.com - accurate for Manama, Bahrain
const IFTAR_TIMES_2026: Record<number, string> = {
  // Day of Ramadan -> Iftar time (24h format) - Maghrib
  1: '17:32', 2: '17:33', 3: '17:34', 4: '17:34', 5: '17:35',
  6: '17:35', 7: '17:36', 8: '17:37', 9: '17:37', 10: '17:38',
  11: '17:38', 12: '17:39', 13: '17:40', 14: '17:40', 15: '17:41',
  16: '17:41', 17: '17:42', 18: '17:42', 19: '17:43', 20: '17:43',
  21: '17:44', 22: '17:44', 23: '17:45', 24: '17:45', 25: '17:46',
  26: '17:46', 27: '17:47', 28: '17:47', 29: '17:48', 30: '17:48',
};

// Bahrain Suhoor times for Ramadan 2026 (Imsak times from Aladhan API)
// Source: api.aladhan.com - accurate for Manama, Bahrain
const SUHOOR_TIMES_2026: Record<number, string> = {
  1: '04:41', 2: '04:41', 3: '04:40', 4: '04:39', 5: '04:38',
  6: '04:38', 7: '04:37', 8: '04:36', 9: '04:35', 10: '04:34',
  11: '04:33', 12: '04:32', 13: '04:32', 14: '04:31', 15: '04:30',
  16: '04:29', 17: '04:28', 18: '04:27', 19: '04:26', 20: '04:25',
  21: '04:24', 22: '04:23', 23: '04:22', 24: '04:21', 25: '04:19',
  26: '04:18', 27: '04:17', 28: '04:16', 29: '04:15', 30: '04:14',
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
  // Get today's date components in local timezone
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDate = now.getDate();

  // Check each configured year
  for (const [year, dates] of Object.entries(RAMADAN_CONFIG)) {
    // Parse config dates and extract year/month/day to avoid timezone issues
    const startDate = new Date(dates.start);
    const endDate = new Date(dates.end);
    
    // Create comparable date numbers (YYYYMMDD format)
    const todayNum = todayYear * 10000 + (todayMonth + 1) * 100 + todayDate;
    const startNum = startDate.getUTCFullYear() * 10000 + (startDate.getUTCMonth() + 1) * 100 + startDate.getUTCDate();
    const endNum = endDate.getUTCFullYear() * 10000 + (endDate.getUTCMonth() + 1) * 100 + endDate.getUTCDate();

    if (todayNum >= startNum && todayNum <= endNum) {
      // Calculate day of Ramadan
      const startLocal = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
      const todayLocal = new Date(todayYear, todayMonth, todayDate);
      const dayDiff = Math.floor((todayLocal.getTime() - startLocal.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return {
        isRamadan: true,
        dayOfRamadan: Math.min(dayDiff, 30),
        year: parseInt(year),
        daysUntil: 0,
      };
    }

    // Check if Ramadan is upcoming this year
    if (todayNum < startNum) {
      // Calculate days until using local dates
      const startLocal = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
      const todayLocal = new Date(todayYear, todayMonth, todayDate);
      const daysUntil = Math.round((startLocal.getTime() - todayLocal.getTime()) / (1000 * 60 * 60 * 24));
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

  const dismissBanner = useCallback(() => {
    setIsBannerDismissed(true);
    localStorage.setItem('ramadan-banner-dismissed', new Date().toISOString());
  }, []);

  // Memoize static colors object to prevent unnecessary re-renders
  const colors = useMemo(() => ({
    primaryBg: '#1a1a2e',
    secondaryBg: '#16213e',
    gold: '#d4af37',
    goldLight: '#f4c430',
    lanternGlow: '#ff9f43',
    lanternWarm: '#ee5a24',
    cream: '#fef6e4',
  }), []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo<RamadanContextType>(() => ({
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
  }), [ramadanStatus, isBannerDismissed, dismissBanner, iftarTime, suhoorTime, countdown, colors]);

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
