'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  SearchX,
  Calendar,
  MapPin,
  Film,
  Ticket,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { popularSearches } from '@/lib/searchData';

interface NoResultsProps {
  query: string;
  onSearchSelect?: (query: string) => void;
}

const categories = [
  {
    name: 'Events',
    icon: <Calendar className="w-6 h-6" />,
    href: '/events',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Places',
    icon: <MapPin className="w-6 h-6" />,
    href: '/places',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Cinema',
    icon: <Film className="w-6 h-6" />,
    href: '/cinema',
    color: 'from-red-500 to-red-700',
  },
  {
    name: 'Offers',
    icon: <Ticket className="w-6 h-6" />,
    href: '/offers',
    color: 'from-green-500 to-green-700',
  },
];

export default function NoResults({ query, onSearchSelect }: NoResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
          <SearchX className="w-10 h-10 text-gray-500" />
        </div>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        We couldn&apos;t find anything matching &quot;
        <span className="text-white font-medium">{query}</span>&quot;
      </p>

      {/* Suggestions */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-md mx-auto mb-8">
        <h3 className="text-white font-medium mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Try these tips
        </h3>
        <ul className="text-left text-gray-400 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">•</span>
            Check for spelling errors
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">•</span>
            Try different or more general keywords
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">•</span>
            Search for a venue name or area
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">•</span>
            Browse by category below
          </li>
        </ul>
      </div>

      {/* Popular Searches */}
      <div className="mb-10">
        <h3 className="text-gray-400 text-sm font-medium mb-4 flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Popular Searches
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => onSearchSelect?.(search)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 hover:text-white text-sm transition-all"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Browse Categories */}
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-4">
          Browse by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={category.href}
                className="block group"
              >
                <div
                  className={`bg-gradient-to-br ${category.color} p-6 rounded-xl transition-all group-hover:scale-105 group-hover:shadow-lg`}
                >
                  <div className="text-white mb-2">{category.icon}</div>
                  <span className="text-white font-medium">{category.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Empty query state - shown when no search term entered
export function EmptyQueryState({
  onSearchSelect,
}: {
  onSearchSelect?: (query: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      {/* Title */}
      <h2 className="text-3xl font-bold text-white mb-4">
        What are you looking for?
      </h2>
      <p className="text-gray-400 mb-10 max-w-md mx-auto">
        Search for events, places, movies, or offers in Bahrain
      </p>

      {/* Popular Searches */}
      <div className="mb-12">
        <h3 className="text-gray-400 text-sm font-medium mb-4 flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Popular Searches
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => onSearchSelect?.(search)}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 hover:text-white transition-all"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Browse Categories */}
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-6">
          Or browse by category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={category.href}
                className="block group"
              >
                <div
                  className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl transition-all group-hover:scale-105 group-hover:shadow-lg`}
                >
                  <div className="text-white mb-3 flex justify-center">
                    {category.icon}
                  </div>
                  <span className="text-white font-semibold text-lg">
                    {category.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending This Week */}
      <div className="mt-12">
        <h3 className="text-gray-400 text-sm font-medium mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Trending This Week
        </h3>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <TrendingItem label="NYE Celebrations" onClick={() => onSearchSelect?.('NYE')} />
          <TrendingItem label="Friday Brunch" onClick={() => onSearchSelect?.('Friday Brunch')} />
          <TrendingItem label="Live Music" onClick={() => onSearchSelect?.('Live Music')} />
          <TrendingItem label="Ladies Night" onClick={() => onSearchSelect?.('Ladies Night')} />
          <TrendingItem label="Beach Clubs" onClick={() => onSearchSelect?.('Beach')} />
        </div>
      </div>
    </motion.div>
  );
}

function TrendingItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 hover:text-yellow-300 transition-all"
    >
      {label}
    </button>
  );
}
