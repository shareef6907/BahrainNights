'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Star, Filter, Grid3X3, List, ChevronRight, Users, Globe, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AdBanner from '@/components/ads/AdBanner';

// Tour interface
export interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  tourType: string;
  category: string;
  duration: string;
  durationHours: number | null;
  groupSize: string;
  maxParticipants: number | null;
  languages: string[];
  image: string;
  priceFrom: number | null;
  pricePer: string;
  currency: string;
  includes: string[];
  highlights: string[];
  areasCovered: string[];
  suitableFor: string[];
  difficultyLevel: string;
  rating: number | null;
  reviewCount: number;
  tripadvisorUrl: string | null;
  isFeatured: boolean;
  provider: {
    id?: string;
    name: string;
    slug?: string;
    logo?: string;
    isVerified?: boolean;
    rating?: number;
    reviewCount?: number;
  } | null;
}

// Tour type filters
const tourTypeFilters = [
  { id: 'all', name: 'All Tours', icon: '🗺️' },
  { id: 'Cultural', name: 'Cultural', icon: '🏛️' },
  { id: 'Food', name: 'Food Tours', icon: '🍽️' },
  { id: 'Desert', name: 'Desert Safari', icon: '🏜️' },
  { id: 'Boat', name: 'Boat Tours', icon: '⛵' },
  { id: 'Walking', name: 'Walking Tours', icon: '🚶' },
  { id: 'Private', name: 'Private Tours', icon: '🎯' },
  { id: 'Photography', name: 'Photography', icon: '📸' },
];

// Duration filters
const durationFilters = [
  { id: 'all', name: 'Any Duration' },
  { id: 'half-day', name: 'Half Day (Under 4h)' },
  { id: 'full-day', name: 'Full Day (4-8h)' },
  { id: 'multi-day', name: 'Multi-Day' },
];

// Price range filters
const priceFilters = [
  { id: 'all', name: 'All Prices' },
  { id: 'budget', name: 'Under BD 20' },
  { id: 'mid', name: 'BD 20-50' },
  { id: 'premium', name: 'BD 50+' },
];

interface ToursPageClientProps {
  initialTours: Tour[];
}

export default function ToursPageClient({ initialTours }: ToursPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const tours = initialTours || [];

  // Filter tours
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          tour.name.toLowerCase().includes(query) ||
          tour.description?.toLowerCase().includes(query) ||
          tour.highlights?.some(h => h.toLowerCase().includes(query)) ||
          tour.provider?.name?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Tour type filter
      if (selectedType !== 'all' && tour.tourType !== selectedType) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== 'all') {
        const hours = tour.durationHours || 0;
        if (selectedDuration === 'half-day' && hours >= 4) return false;
        if (selectedDuration === 'full-day' && (hours < 4 || hours > 8)) return false;
        if (selectedDuration === 'multi-day' && hours <= 8) return false;
      }

      // Price filter
      if (selectedPrice !== 'all' && tour.priceFrom) {
        if (selectedPrice === 'budget' && tour.priceFrom >= 20) return false;
        if (selectedPrice === 'mid' && (tour.priceFrom < 20 || tour.priceFrom >= 50)) return false;
        if (selectedPrice === 'premium' && tour.priceFrom < 50) return false;
      }

      return true;
    });
  }, [tours, searchQuery, selectedType, selectedDuration, selectedPrice]);

  // Sort by featured first, then rating
  const sortedTours = useMemo(() => {
    return [...filteredTours].sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      if ((a.rating || 0) > (b.rating || 0)) return -1;
      if ((a.rating || 0) < (b.rating || 0)) return 1;
      return 0;
    });
  }, [filteredTours]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=600&fit=crop"
          alt="Explore Bahrain Tours"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Tours & Experiences
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Discover Bahrain with expert local guides. Cultural tours, desert safaris, food experiences, and more.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner targetPage="tours" placement="banner" className="max-w-7xl mx-auto px-4 py-4" />

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tours, experiences, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
          />
        </div>

        {/* Filter Toggle for Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 mb-4"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>

        {/* Tour Type Filters */}
        <div className={`${showFilters ? 'block' : 'hidden md:block'} space-y-4 mb-6`}>
          <div className="flex flex-wrap gap-2">
            {tourTypeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedType(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedType === filter.id
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filter.icon} {filter.name}
              </button>
            ))}
          </div>

          {/* Duration and Price Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              {durationFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              {priceFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-800/50 rounded-lg p-1 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-amber-500 text-black' : 'text-gray-400'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-amber-500 text-black' : 'text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-400 mb-6">
          Found <span className="text-white font-semibold">{sortedTours.length}</span> tours
        </p>

        {/* Tours Grid/List */}
        {sortedTours.length > 0 ? (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {sortedTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/tours/${tour.slug}`}>
                  <div className={`group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-amber-500/50 transition-all ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    {/* Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-48'}`}>
                      <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {tour.isFeatured && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-black text-xs font-bold rounded">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 text-white text-xs rounded">
                        {tour.tourType}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors mb-2">
                        {tour.name}
                      </h3>

                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {tour.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {/* Rating */}
                        {tour.rating && (
                          <div className="flex items-center gap-1 text-amber-400 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{tour.rating.toFixed(1)}</span>
                            {tour.reviewCount > 0 && (
                              <span className="text-gray-500">({tour.reviewCount})</span>
                            )}
                          </div>
                        )}

                        {/* Duration */}
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{tour.duration}</span>
                        </div>

                        {/* Group Size */}
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{tour.groupSize}</span>
                        </div>

                        {/* Languages */}
                        {tour.languages && tour.languages.length > 0 && (
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Globe className="w-4 h-4" />
                            <span>{tour.languages.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      {/* Provider */}
                      {tour.provider && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-gray-400 text-sm">By {tour.provider.name}</span>
                          {tour.provider.isVerified && (
                            <BadgeCheck className="w-4 h-4 text-blue-400" />
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        {/* Price */}
                        <div className="text-green-400 font-semibold">
                          {tour.priceFrom ? (
                            <span>From {tour.currency} {tour.priceFrom}/{tour.pricePer}</span>
                          ) : (
                            <span>Contact for price</span>
                          )}
                        </div>

                        {/* Highlights */}
                        {tour.highlights && tour.highlights.length > 0 && (
                          <div className="flex gap-1">
                            {tour.highlights.slice(0, 1).map((highlight) => (
                              <span
                                key={highlight}
                                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded truncate max-w-[120px]"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No tours found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Become a Guide CTA */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 text-center border border-cyan-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">
            Are you a local guide?
          </h2>
          <p className="text-gray-300 mb-6">
            Share your knowledge of Bahrain and connect with travelers from around the world
          </p>
          <Link
            href="/become-a-guide"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Become a Guide <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner targetPage="tours" placement="banner" className="max-w-7xl mx-auto px-4 pb-8" />
    </div>
  );
}
