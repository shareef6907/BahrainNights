'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';
import { getQuickSuggestions, SearchSuggestion } from '@/lib/searchData';
import { addRecentSearch } from './RecentSearches';
import SearchDropdown from './SearchDropdown';

interface GlobalSearchProps {
  variant?: 'navbar' | 'hero' | 'page';
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  onSearch?: (query: string) => void;
}

export default function GlobalSearch({
  variant = 'navbar',
  placeholder = 'Search events, places, movies...',
  autoFocus = false,
  defaultValue = '',
  onSearch,
}: GlobalSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState(variant !== 'navbar');
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const showDropdown = isFocused && (variant === 'navbar' || variant === 'hero');

  // Debounced search for suggestions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        // Simulate API call delay
        setTimeout(() => {
          const results = getQuickSuggestions(query);
          setSuggestions(results);
          setIsLoading(false);
        }, 150);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (variant === 'navbar') {
          if (window.innerWidth < 768) {
            setIsMobileSearchOpen(true);
          } else {
            setIsExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        } else {
          inputRef.current?.focus();
        }
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsFocused(false);
        if (variant === 'navbar') {
          setIsExpanded(false);
        }
        setIsMobileSearchOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [variant]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
        if (variant === 'navbar') {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [variant]);

  // Arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex].url);
      } else {
        handleSearch();
      }
    }
  };

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      addRecentSearch(query.trim());
      if (onSearch) {
        onSearch(query.trim());
      } else {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
      setIsFocused(false);
      setIsExpanded(false);
      setIsMobileSearchOpen(false);
    }
  }, [query, onSearch, router]);

  const handleSuggestionClick = (url: string) => {
    addRecentSearch(query.trim());
    router.push(url);
    setIsFocused(false);
    setIsExpanded(false);
    setIsMobileSearchOpen(false);
  };

  const handleSearchSelect = (selectedQuery: string) => {
    if (selectedQuery) {
      setQuery(selectedQuery);
      addRecentSearch(selectedQuery);
      router.push(`/search?q=${encodeURIComponent(selectedQuery)}`);
      setIsFocused(false);
      setIsExpanded(false);
    }
  };

  const handleExpand = () => {
    if (window.innerWidth < 768) {
      setIsMobileSearchOpen(true);
    } else {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Navbar variant - compact with expand animation
  if (variant === 'navbar') {
    return (
      <>
        {/* Desktop search */}
        <div ref={containerRef} className="relative hidden md:block">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.button
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleExpand}
                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
                <span className="text-sm hidden lg:inline">Search</span>
                <kbd className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-white/10 rounded">
                  <Command className="w-3 h-3" />K
                </kbd>
              </motion.button>
            ) : (
              <motion.div
                key="input"
                initial={{ width: 48, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 48, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(-1);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
                    role="search"
                    aria-label="Search"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <SearchDropdown
                  isOpen={showDropdown}
                  query={query}
                  suggestions={suggestions}
                  isLoading={isLoading}
                  selectedIndex={selectedIndex}
                  onSearchSelect={handleSearchSelect}
                  onSuggestionClick={handleSuggestionClick}
                  onSeeAllResults={handleSearch}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile search button */}
        <button
          onClick={handleExpand}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Mobile full-screen search */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/98 backdrop-blur-xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                  <button
                    onClick={() => setIsMobileSearchOpen(false)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedIndex(-1);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch();
                        }
                      }}
                      placeholder={placeholder}
                      autoFocus
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {query.trim().length < 2 ? (
                    <div className="p-4">
                      <MobileRecentSearches onSearchSelect={handleSearchSelect} />
                    </div>
                  ) : isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="p-4 space-y-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.url}
                          onClick={() => handleSuggestionClick(suggestion.url)}
                          className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                        >
                          <span className="text-white">{suggestion.title}</span>
                          <span className="text-gray-500 text-sm ml-auto">
                            {suggestion.type}
                          </span>
                        </button>
                      ))}
                      <button
                        onClick={handleSearch}
                        className="w-full p-3 text-center text-yellow-400 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        See all results for &quot;{query}&quot;
                      </button>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-400">
                      No results found
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Hero and page variants - always expanded
  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full pl-12 pr-12 ${
            variant === 'hero' ? 'py-4 text-lg' : 'py-3'
          } bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all`}
          role="search"
          aria-label="Search"
        />
        {query ? (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-2 py-1 text-xs text-gray-400 bg-white/10 rounded">
            <Command className="w-3 h-3" />K
          </kbd>
        )}
      </div>

      {variant === 'hero' && (
        <SearchDropdown
          isOpen={showDropdown}
          query={query}
          suggestions={suggestions}
          isLoading={isLoading}
          selectedIndex={selectedIndex}
          onSearchSelect={handleSearchSelect}
          onSuggestionClick={handleSuggestionClick}
          onSeeAllResults={handleSearch}
        />
      )}
    </div>
  );
}

// Simple recent searches for mobile
function MobileRecentSearches({
  onSearchSelect,
}: {
  onSearchSelect: (query: string) => void;
}) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('bahrain-nights-recent-searches');
        setRecentSearches(stored ? JSON.parse(stored) : []);
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  const popularSearches = [
    'Ladies Night',
    'Brunch',
    'NYE',
    'Live Music',
    'Happy Hour',
    'Family',
    'Spa',
    'Beach',
  ];

  return (
    <div className="space-y-6">
      {recentSearches.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            Recent Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => onSearchSelect(search)}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => onSearchSelect(search)}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
