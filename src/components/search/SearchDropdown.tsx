'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Film, Ticket, ArrowRight, Loader2 } from 'lucide-react';
import { SearchSuggestion } from '@/lib/searchData';
import RecentSearches from './RecentSearches';

interface SearchDropdownProps {
  isOpen: boolean;
  query: string;
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  selectedIndex: number;
  onSearchSelect: (query: string) => void;
  onSuggestionClick: (url: string) => void;
  onSeeAllResults: () => void;
}

const typeConfig: Record<
  string,
  { icon: React.ReactNode; color: string; label: string }
> = {
  event: {
    icon: <Calendar className="w-4 h-4" />,
    color: 'text-purple-400',
    label: 'Event',
  },
  place: {
    icon: <MapPin className="w-4 h-4" />,
    color: 'text-blue-400',
    label: 'Place',
  },
  cinema: {
    icon: <Film className="w-4 h-4" />,
    color: 'text-red-400',
    label: 'Movie',
  },
  offer: {
    icon: <Ticket className="w-4 h-4" />,
    color: 'text-green-400',
    label: 'Offer',
  },
};

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || !text) return text;

  const normalizedQuery = query.toLowerCase();
  const index = text.toLowerCase().indexOf(normalizedQuery);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className="text-orange-500 font-semibold">{match}</span>
      {after}
    </>
  );
}

// Group suggestions by type
function groupSuggestions(suggestions: SearchSuggestion[]) {
  const grouped: Record<string, SearchSuggestion[]> = {
    event: [],
    place: [],
    cinema: [],
    offer: [],
  };

  suggestions.forEach((suggestion) => {
    if (grouped[suggestion.type]) {
      grouped[suggestion.type].push(suggestion);
    }
  });

  return grouped;
}

export default function SearchDropdown({
  isOpen,
  query,
  suggestions,
  isLoading,
  selectedIndex,
  onSearchSelect,
  onSuggestionClick,
  onSeeAllResults,
}: SearchDropdownProps) {
  const hasQuery = query.trim().length > 0;
  const groupedSuggestions = groupSuggestions(suggestions);
  const hasResults = suggestions.length > 0;

  // Flatten for keyboard navigation indexing
  let flatIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
        >
          {/* Show recent searches when no query */}
          {!hasQuery && (
            <RecentSearches
              onSearchSelect={onSearchSelect}
            />
          )}

          {/* Show loading state */}
          {hasQuery && isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
              <span className="ml-2 text-gray-400">Searching...</span>
            </div>
          )}

          {/* Show suggestions */}
          {hasQuery && !isLoading && hasResults && (
            <div className="max-h-[400px] overflow-y-auto">
              {/* Events */}
              {groupedSuggestions.event.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    {typeConfig.event.icon}
                    <span>Events</span>
                  </div>
                  {groupedSuggestions.event.map((suggestion) => {
                    const currentIndex = flatIndex++;
                    return (
                      <SuggestionItem
                        key={`event-${suggestion.url}`}
                        suggestion={suggestion}
                        query={query}
                        isSelected={currentIndex === selectedIndex}
                        onClick={() => onSuggestionClick(suggestion.url)}
                      />
                    );
                  })}
                </div>
              )}

              {/* Places */}
              {groupedSuggestions.place.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    {typeConfig.place.icon}
                    <span>Places</span>
                  </div>
                  {groupedSuggestions.place.map((suggestion) => {
                    const currentIndex = flatIndex++;
                    return (
                      <SuggestionItem
                        key={`place-${suggestion.url}`}
                        suggestion={suggestion}
                        query={query}
                        isSelected={currentIndex === selectedIndex}
                        onClick={() => onSuggestionClick(suggestion.url)}
                      />
                    );
                  })}
                </div>
              )}

              {/* Cinema */}
              {groupedSuggestions.cinema.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    {typeConfig.cinema.icon}
                    <span>Movies</span>
                  </div>
                  {groupedSuggestions.cinema.map((suggestion) => {
                    const currentIndex = flatIndex++;
                    return (
                      <SuggestionItem
                        key={`cinema-${suggestion.url}`}
                        suggestion={suggestion}
                        query={query}
                        isSelected={currentIndex === selectedIndex}
                        onClick={() => onSuggestionClick(suggestion.url)}
                      />
                    );
                  })}
                </div>
              )}

              {/* Offers */}
              {groupedSuggestions.offer.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    {typeConfig.offer.icon}
                    <span>Offers</span>
                  </div>
                  {groupedSuggestions.offer.map((suggestion) => {
                    const currentIndex = flatIndex++;
                    return (
                      <SuggestionItem
                        key={`offer-${suggestion.url}`}
                        suggestion={suggestion}
                        query={query}
                        isSelected={currentIndex === selectedIndex}
                        onClick={() => onSuggestionClick(suggestion.url)}
                      />
                    );
                  })}
                </div>
              )}

              {/* See all results */}
              <button
                onClick={onSeeAllResults}
                className="w-full px-4 py-3 flex items-center justify-between text-sm text-gray-300 hover:bg-white/5 border-t border-white/10 transition-colors"
              >
                <span>
                  See all results for &quot;<span className="text-white font-medium">{query}</span>&quot;
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* No results */}
          {hasQuery && !isLoading && !hasResults && (
            <div className="py-8 text-center">
              <p className="text-gray-400">
                No results found for &quot;<span className="text-white">{query}</span>&quot;
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try a different search term
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SuggestionItemProps {
  suggestion: SearchSuggestion;
  query: string;
  isSelected: boolean;
  onClick: () => void;
}

function SuggestionItem({
  suggestion,
  query,
  isSelected,
  onClick,
}: SuggestionItemProps) {
  const config = typeConfig[suggestion.type];

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${
        isSelected ? 'bg-white/10' : 'hover:bg-white/5'
      }`}
    >
      {/* Image */}
      {suggestion.image && (
        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={suggestion.image}
            alt={suggestion.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 text-left min-w-0">
        <p className="text-white font-medium truncate">
          {highlightMatch(suggestion.title, query)}
        </p>
        {suggestion.subtitle && (
          <p className="text-gray-500 text-sm truncate">{suggestion.subtitle}</p>
        )}
      </div>

      {/* Type indicator */}
      <span className={`text-xs ${config.color} flex-shrink-0`}>
        {config.label}
      </span>
    </button>
  );
}
