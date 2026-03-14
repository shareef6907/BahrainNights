'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'regional-notice-dismissed';
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function RegionalNotice() {
  const [isDismissed, setIsDismissed] = useState(true); // Start hidden to avoid flash

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      const now = Date.now();
      // Show again after 24 hours
      if (now - dismissedTime > DISMISS_DURATION_MS) {
        localStorage.removeItem(STORAGE_KEY);
        setIsDismissed(false);
      }
    } else {
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  if (isDismissed) return null;

  // Inline notice that appears just below the hero section
  // Non-fixed so it scrolls with page and doesn't interfere with nav
  return (
    <div className="relative z-10 mx-4 -mt-8 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800/80 backdrop-blur-sm border border-amber-500/20 rounded-xl px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-sm text-gray-300">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              Some events may be affected due to current regional developments. Please check with venues directly before attending.
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            aria-label="Dismiss notice"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
