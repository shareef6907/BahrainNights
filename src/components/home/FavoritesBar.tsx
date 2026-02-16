'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, ChevronRight, Trash2, ExternalLink } from 'lucide-react';
import { useFavorites, FavoriteItem, FavoriteType } from '@/contexts/FavoritesContext';

const typeLabels: Record<FavoriteType, string> = {
  event: 'Events',
  place: 'Places',
  movie: 'Movies',
  attraction: 'Attractions',
};

const typeColors: Record<FavoriteType, string> = {
  event: 'bg-purple-500',
  place: 'bg-orange-500',
  movie: 'bg-blue-500',
  attraction: 'bg-green-500',
};

const typeHrefs: Record<FavoriteType, (slug: string) => string> = {
  event: (slug) => `/events/${slug}`,
  place: (slug) => `/places/${slug}`,
  movie: (slug) => `/cinema/${slug}`,
  attraction: (slug) => `/attractions/${slug}`,
};

export default function FavoritesBar() {
  const { favorites, removeFavorite, clearAll, count } = useFavorites();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration to prevent SSR mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Don't render anything until hydrated and only show if there are favorites
  if (!isHydrated || count === 0) {
    return null;
  }

  const recentFavorites = favorites.slice(0, 4);
  const groupedByType = favorites.reduce((acc, fav) => {
    if (!acc[fav.type]) acc[fav.type] = [];
    acc[fav.type].push(fav);
    return acc;
  }, {} as Record<FavoriteType, FavoriteItem[]>);

  return (
    <section className="px-4 mb-12 md:mb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500/10 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-red-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Glow effect */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    Your Saved Favorites
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-sm rounded-full">
                      {count}
                    </span>
                  </h2>
                  <p className="text-gray-400 text-sm">Quick access to places you love</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {count > 4 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="px-4 py-2 text-sm text-white hover:bg-white/10 rounded-full transition-colors"
                  >
                    {isExpanded ? 'Show less' : `View all (${count})`}
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm('Remove all favorites?')) {
                      clearAll();
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-full transition-colors"
                  title="Clear all favorites"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Preview - Always visible */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentFavorites.map((item, index) => (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={typeHrefs[item.type](item.slug)}
                    className="group relative block bg-white/5 rounded-xl overflow-hidden hover:ring-2 hover:ring-red-500/50 transition-all"
                  >
                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFavorite(item.id, item.type);
                      }}
                      className="absolute top-2 right-2 z-10 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    {/* Image */}
                    <div className="aspect-[4/3] relative">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                          <Heart className="w-8 h-8 text-red-400/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className={`inline-block px-2 py-0.5 ${typeColors[item.type]} text-white text-[10px] font-bold rounded-full mb-1`}>
                        {typeLabels[item.type]}
                      </span>
                      <h3 className="text-white font-medium text-sm line-clamp-1 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Expanded View - All Favorites Grouped */}
            <AnimatePresence>
              {isExpanded && count > 4 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  {(Object.keys(groupedByType) as FavoriteType[]).map((type) => (
                    <div key={type} className="mb-6 last:mb-0">
                      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <span className={`w-2 h-2 ${typeColors[type]} rounded-full`} />
                        {typeLabels[type]} ({groupedByType[type].length})
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                        {groupedByType[type].map((item) => (
                          <Link
                            key={item.id}
                            href={typeHrefs[item.type](item.slug)}
                            className="group flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt=""
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                                <Heart className="w-4 h-4 text-red-400/50" />
                              </div>
                            )}
                            <span className="text-sm text-gray-300 truncate group-hover:text-white transition-colors">
                              {item.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer tip */}
            <p className="mt-6 text-center text-gray-500 text-xs">
              ❤️ Tap the heart icon on any event, place, or movie to save it here
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
