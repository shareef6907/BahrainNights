'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/TranslationContext';
import AttractionModal, { AttractionData } from './AttractionModal';
import { RelatedGuides } from '@/components/SEO';

export interface Attraction {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  price_range: string | null;
  price_currency: string;
  image_url: string | null;
  cover_url?: string | null;
  venue: string | null;
  location: string | null;
  category: string | null;
  type: string;
  affiliate_url: string;
  source: string | null;
  google_maps_url: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface AttractionsPageClientProps {
  initialAttractions: Attraction[];
  categories: string[];
}

const categoryIcons: Record<string, string> = {
  'water-sports': '🏄',
  'boat-tour': '⛵',
  'boat-tours': '⛵',
  'desert-safari': '🏜️',
  'indoor': '🎮',
  'indoor-activities': '🎮',
  'tour': '🗺️',
  'tours': '🗺️',
  'sightseeing': '🏛️',
  'theme-park': '🎢',
  'theme-parks': '🎢',
  'attraction': '🎯',
  'attractions': '🎯',
  'Family & Kids': '👨‍👩‍👧‍👦',
  'family-kids': '👨‍👩‍👧‍👦',
};

const categoryLabels: Record<string, string> = {
  'water-sports': 'Water Sports',
  'boat-tour': 'Boat Tours',
  'boat-tours': 'Boat Tours',
  'desert-safari': 'Desert Safari',
  'indoor': 'Indoor Activities',
  'indoor-activities': 'Indoor activities',
  'tour': 'Tours',
  'tours': 'Tours',
  'sightseeing': 'Sightseeing',
  'theme-park': 'Theme Parks',
  'theme-parks': 'Theme parks',
  'attraction': 'Attractions',
  'attractions': 'Attractions',
  'Family & Kids': 'Family & Kids',
  'family-kids': 'Family & Kids',
};

export default function AttractionsPageClient({ initialAttractions, categories }: AttractionsPageClientProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAttractionClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttraction(null);
  };

  // Filter attractions based on search and category
  const filteredAttractions = useMemo(() => {
    return initialAttractions.filter(attraction => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          attraction.title.toLowerCase().includes(query) ||
          attraction.description?.toLowerCase().includes(query) ||
          attraction.venue?.toLowerCase().includes(query) ||
          attraction.location?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && attraction.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [initialAttractions, searchQuery, selectedCategory]);

  const getCategoryLabel = (cat: string) => {
    const label = categoryLabels[cat];
    if (label) {
      return label;
    }
    return cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-teal-600/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-600/20 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-white">Discover </span>
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                {t.nav.attractions}
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Explore the best tours, water sports, and experiences in Bahrain
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours and experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-teal-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {t.nav.allAttractions}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-teal-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>{categoryIcons[cat] || '🎯'}</span>
                  <span>{getCategoryLabel(cat)}</span>
                </button>
              ))}
            </div>

            {/* Results count */}
            <div className="text-gray-400 text-sm">
              {filteredAttractions.length} results
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredAttractions.length > 0 ? (
              <motion.div
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredAttractions.map((attraction, index) => (
                  <motion.div
                    key={attraction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      onClick={() => handleAttractionClick(attraction)}
                      className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-400/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={attraction.image_url || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop'}
                          alt={attraction.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Category Badge */}
                        {attraction.category && (
                          <div className="absolute top-3 left-3 px-3 py-1 bg-teal-500/90 text-white text-xs font-medium rounded-full flex items-center gap-1">
                            <span>{categoryIcons[attraction.category] || '🎯'}</span>
                            <span>{getCategoryLabel(attraction.category)}</span>
                          </div>
                        )}

                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-teal-400 transition-colors">
                          {attraction.title}
                        </h3>

                        {attraction.description && (
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {attraction.description}
                          </p>
                        )}

                        {/* Location */}
                        {(attraction.venue || attraction.location) && (
                          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                            <MapPin className="w-4 h-4 text-teal-400" />
                            <span className="truncate">{attraction.venue || attraction.location}</span>
                          </div>
                        )}

                        {/* CTA Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-teal-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Learn More
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No attractions found
                </h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Related Guides */}
      <section className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <RelatedGuides />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Have a Tour or Experience?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join BahrainNights and showcase your experiences to thousands of visitors every month
            </p>
            <Link
              href="/register-venue"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all"
            >
              Register Your Experience
            </Link>
          </div>
        </div>
      </section>

      {/* Attraction Modal */}
      <AttractionModal
        attraction={selectedAttraction as AttractionData | null}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
