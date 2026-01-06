'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import PlaceCard, { Place } from './PlaceCard';

interface PlaceGridProps {
  places: Place[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  selectedCategory?: string;
}

// Map category to display name and icon
const categoryInfo: Record<string, { name: string; icon: string; color: string }> = {
  restaurant: { name: 'restaurants', icon: '🍽️', color: 'orange' },
  cafe: { name: 'cafes', icon: '☕', color: 'amber' },
  lounge: { name: 'lounges & bars', icon: '🍸', color: 'purple' },
  bar: { name: 'bars', icon: '🍺', color: 'purple' },
  nightclub: { name: 'nightclubs', icon: '🎵', color: 'pink' },
  'beach-club': { name: 'beach & pool clubs', icon: '🏖️', color: 'cyan' },
  hotel: { name: 'hotels', icon: '🏨', color: 'blue' },
  spa: { name: 'spas & wellness centers', icon: '💆', color: 'purple' },
  all: { name: 'places', icon: '🌟', color: 'yellow' },
};

export default function PlaceGrid({ places, isLoading, hasMore, onLoadMore, selectedCategory = 'all' }: PlaceGridProps) {
  if (places.length === 0 && !isLoading) {
    const info = categoryInfo[selectedCategory] || categoryInfo.all;

    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-4">{info.icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">No {info.name} found</h3>
        <p className="text-gray-400 max-w-md mb-8">
          {selectedCategory !== 'all'
            ? `We're building the best directory of ${info.name} in Bahrain. Own a ${info.name.replace(/s$/, '')}? Be the first to list!`
            : 'Try adjusting your filters or search for something else.'
          }
        </p>

        {selectedCategory !== 'all' && (
          <Link
            href="/register-venue"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Register Your Venue
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place, index) => (
          <PlaceCard key={place.id} place={place} index={index} />
        ))}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-slate-700" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-slate-700 rounded w-1/2" />
                <div className="h-4 bg-slate-700 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !isLoading && (
        <div className="flex justify-center pt-4">
          <motion.button
            onClick={onLoadMore}
            className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Load More Places
          </motion.button>
        </div>
      )}
    </div>
  );
}
