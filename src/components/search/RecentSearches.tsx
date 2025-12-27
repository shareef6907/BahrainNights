'use client';

import { Clock, X, TrendingUp, Search } from 'lucide-react';
import { popularSearches } from '@/lib/searchData';

const RECENT_SEARCHES_KEY = 'bahrain-nights-recent-searches';
const MAX_RECENT_SEARCHES = 5;

// Helper functions for localStorage
export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return;
  try {
    const searches = getRecentSearches();
    const normalizedQuery = query.trim();

    // Remove if already exists
    const filtered = searches.filter(
      (s) => s.toLowerCase() !== normalizedQuery.toLowerCase()
    );

    // Add to beginning
    filtered.unshift(normalizedQuery);

    // Keep only max items
    const limited = filtered.slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limited));
  } catch {
    // Ignore localStorage errors
  }
}

export function removeRecentSearch(query: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const searches = getRecentSearches();
    const filtered = searches.filter(
      (s) => s.toLowerCase() !== query.toLowerCase()
    );
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered));
    return filtered;
  } catch {
    return [];
  }
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Ignore localStorage errors
  }
}

interface RecentSearchesProps {
  onSearchSelect: (query: string) => void;
  onClose?: () => void;
}

export default function RecentSearches({
  onSearchSelect,
  onClose,
}: RecentSearchesProps) {
  const recentSearches = getRecentSearches();

  const handleRemove = (
    e: React.MouseEvent,
    query: string
  ) => {
    e.stopPropagation();
    removeRecentSearch(query);
    // Force re-render by triggering parent update
    onSearchSelect('');
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearRecentSearches();
    onSearchSelect('');
  };

  return (
    <div className="py-2">
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Recent Searches</span>
            </div>
            <button
              onClick={handleClearAll}
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => onSearchSelect(search)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{search}</span>
                </div>
                <button
                  onClick={(e) => handleRemove(e, search)}
                  className="p-1 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Searches */}
      <div>
        <div className="flex items-center gap-2 px-4 py-2 text-gray-400 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Trending Searches</span>
        </div>
        <div className="px-4 py-2 flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => onSearchSelect(search)}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white transition-all"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
