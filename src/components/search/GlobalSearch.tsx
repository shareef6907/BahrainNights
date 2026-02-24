'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';
import { addRecentSearch } from './RecentSearches';
import SearchDropdown from './SearchDropdown';

// API response type for instant search
export interface SearchSuggestion {
  type: 'event' | 'place' | 'cinema' | 'offer';
  title: string;
  url: string;
  image?: string;
  subtitle?: string;
}

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

  // Debounced search for suggestions - uses real API
  useEffect(() => {
    const abortController = new AbortController();

    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/search/instant?q=${encodeURIComponent(query.trim())}&limit=8`,
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (error) {
        // Ignore abort errors
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
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
                    className="w-full pl-10 pr-10 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
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

        {/* Mobile full-screen chat-style search */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950 z-50 md:hidden flex flex-col"
            >
              {/* Header - minimal, just back button and title */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/80 backdrop-blur-sm border-b border-white/5 safe-area-inset-top">
                <button
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-white font-medium">Search</span>
              </div>

              {/* Scrollable content area - chat messages style */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {query.trim().length < 2 ? (
                  <div className="px-4 py-6">
                    {/* Welcome message like a chat bubble */}
                    <div className="mb-6">
                      <div className="inline-block bg-white/10 rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                        <p className="text-white text-sm">
                          👋 What are you looking for today?
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Search 12,000+ venues across Bahrain
                        </p>
                      </div>
                    </div>
                    <MobileRecentSearches onSearchSelect={handleSearchSelect} />
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-gray-400 text-sm">Searching...</span>
                    </div>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="px-4 py-4 space-y-3">
                    {/* Results shown as chat-like cards */}
                    {suggestions.map((suggestion, idx) => (
                      <motion.button
                        key={suggestion.url}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleSuggestionClick(suggestion.url)}
                        className="w-full flex items-center gap-4 p-4 bg-white/5 active:bg-white/10 rounded-2xl transition-colors text-left border border-white/5"
                      >
                        {suggestion.image && (
                          <img 
                            src={suggestion.image} 
                            alt="" 
                            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">{suggestion.title}</h3>
                          {suggestion.subtitle && (
                            <p className="text-gray-400 text-sm truncate">{suggestion.subtitle}</p>
                          )}
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded-full capitalize">
                            {suggestion.type}
                          </span>
                        </div>
                        <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    ))}
                    <button
                      onClick={handleSearch}
                      className="w-full p-4 text-center text-yellow-500 font-medium bg-yellow-500/10 hover:bg-yellow-500/20 rounded-2xl transition-colors"
                    >
                      See all results for &quot;{query}&quot;
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-12 text-center">
                    <div className="inline-block bg-white/5 rounded-2xl px-6 py-4">
                      <p className="text-gray-400">No results found for &quot;{query}&quot;</p>
                      <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input area - fixed at bottom like messaging apps */}
              <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur-sm safe-area-inset-bottom">
                <div className="px-4 py-3">
                  <div className="relative flex items-center gap-3">
                    <div className="flex-1 relative">
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
                        placeholder="Search events, venues, movies..."
                        autoFocus
                        className="w-full px-4 py-3 bg-white/10 border-0 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-base"
                      />
                      {query && (
                        <button
                          onClick={() => setQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={handleSearch}
                      disabled={!query.trim()}
                      className="p-3 bg-yellow-500 disabled:bg-gray-700 rounded-full text-black disabled:text-gray-500 transition-colors flex-shrink-0"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Hero and page variants - always expanded
  // On mobile, tap opens full-screen chat experience
  return (
    <>
      <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
        {/* Desktop: normal input */}
        <div className="hidden md:block relative">
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
            } bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all`}
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

        {/* Mobile: fake input that opens full-screen chat */}
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="md:hidden w-full flex items-center gap-3 px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-gray-400 text-left active:bg-white/15 transition-colors"
        >
          <Search className="w-5 h-5 flex-shrink-0" />
          <span className="text-base">{placeholder}</span>
        </button>

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

      {/* Mobile full-screen chat-style search */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950 z-50 md:hidden flex flex-col"
          >
            {/* Header - minimal, just back button and title */}
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/80 backdrop-blur-sm border-b border-white/5 safe-area-inset-top">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close search"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-white font-medium">Search</span>
            </div>

            {/* Scrollable content area - chat messages style */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {query.trim().length < 2 ? (
                <div className="px-4 py-6">
                  {/* Welcome message like a chat bubble */}
                  <div className="mb-6">
                    <div className="inline-block bg-white/10 rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                      <p className="text-white text-sm">
                        👋 What are you looking for today?
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Search 12,000+ venues across Bahrain
                      </p>
                    </div>
                  </div>
                  <MobileRecentSearches onSearchSelect={handleSearchSelect} />
                </div>
              ) : isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-gray-400 text-sm">Searching...</span>
                  </div>
                </div>
              ) : suggestions.length > 0 ? (
                <div className="px-4 py-4 space-y-3">
                  {/* Results shown as chat-like cards */}
                  {suggestions.map((suggestion, idx) => (
                    <motion.button
                      key={suggestion.url}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleSuggestionClick(suggestion.url)}
                      className="w-full flex items-center gap-4 p-4 bg-white/5 active:bg-white/10 rounded-2xl transition-colors text-left border border-white/5"
                    >
                      {suggestion.image && (
                        <img 
                          src={suggestion.image} 
                          alt="" 
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{suggestion.title}</h3>
                        {suggestion.subtitle && (
                          <p className="text-gray-400 text-sm truncate">{suggestion.subtitle}</p>
                        )}
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded-full capitalize">
                          {suggestion.type}
                        </span>
                      </div>
                      <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  ))}
                  <button
                    onClick={handleSearch}
                    className="w-full p-4 text-center text-yellow-500 font-medium bg-yellow-500/10 hover:bg-yellow-500/20 rounded-2xl transition-colors"
                  >
                    See all results for &quot;{query}&quot;
                  </button>
                </div>
              ) : (
                <div className="px-4 py-12 text-center">
                  <div className="inline-block bg-white/5 rounded-2xl px-6 py-4">
                    <p className="text-gray-400">No results found for &quot;{query}&quot;</p>
                    <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input area - fixed at bottom like messaging apps */}
            <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur-sm safe-area-inset-bottom">
              <div className="px-4 py-3">
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 relative">
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
                      placeholder="Search events, venues, movies..."
                      autoFocus
                      className="w-full px-4 py-3 bg-white/10 border-0 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-base"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={!query.trim()}
                    className="p-3 bg-yellow-500 disabled:bg-gray-700 rounded-full text-black disabled:text-gray-500 transition-colors flex-shrink-0"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Chat-style recent/popular searches for mobile
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

  const quickCategories = [
    { emoji: '🎭', label: 'Events', query: 'events' },
    { emoji: '🍽️', label: 'Dining', query: 'restaurants' },
    { emoji: '🎬', label: 'Movies', query: 'cinema' },
    { emoji: '🏖️', label: 'Beach', query: 'beach club' },
    { emoji: '🍸', label: 'Nightlife', query: 'bars' },
    { emoji: '💆', label: 'Spa', query: 'spa' },
  ];

  const popularSearches = [
    'Ladies Night',
    'Brunch',
    'Live Music',
    'Happy Hour',
    'Family',
  ];

  return (
    <div className="space-y-6">
      {/* Quick category pills */}
      <div className="grid grid-cols-3 gap-3">
        {quickCategories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => onSearchSelect(cat.query)}
            className="flex flex-col items-center gap-2 p-4 bg-white/5 active:bg-white/10 rounded-2xl transition-colors"
          >
            <span className="text-2xl">{cat.emoji}</span>
            <span className="text-white text-sm font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {recentSearches.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Recent
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.slice(0, 5).map((search) => (
              <button
                key={search}
                onClick={() => onSearchSelect(search)}
                className="px-4 py-2 bg-white/5 active:bg-white/10 rounded-full text-white text-sm transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          Popular
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => onSearchSelect(search)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 active:from-yellow-500/20 active:to-orange-500/20 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
