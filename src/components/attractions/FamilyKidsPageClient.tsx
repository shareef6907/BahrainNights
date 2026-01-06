'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Star, Filter, Grid3X3, List, ChevronRight, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AdBanner from '@/components/ads/AdBanner';

// Attraction interface
export interface Attraction {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  area: string;
  image: string;
  duration: string;
  bestTime: string;
  priceRange: string;
  priceFrom: number | null;
  suitableFor: string[];
  tags: string[];
  rating: number | null;
  reviewCount: number;
  tripadvisorUrl: string | null;
  website: string | null;
  phone: string | null;
  bookingUrl: string | null;
  isFeatured: boolean;
}

// Price range filters
const priceFilters = [
  { id: 'all', name: 'All Prices', icon: '💰' },
  { id: 'Free', name: 'Free', icon: '🆓' },
  { id: 'Budget', name: 'Budget (Under BD 5)', icon: '💵' },
  { id: 'Mid-range', name: 'Mid-range (BD 5-20)', icon: '💳' },
  { id: 'Premium', name: 'Premium (BD 20+)', icon: '💎' },
];

// Area filters for Bahrain
const areaFilters = [
  { id: 'all', name: 'All Areas' },
  { id: 'Manama', name: 'Manama' },
  { id: 'Seef', name: 'Seef' },
  { id: 'Muharraq', name: 'Muharraq' },
  { id: 'Sakhir', name: 'Sakhir' },
  { id: 'Amwaj Islands', name: 'Amwaj Islands' },
  { id: 'Juffair', name: 'Juffair' },
  { id: 'Bahrain Bay', name: 'Bahrain Bay' },
];

// Suitable for filters
const audienceFilters = [
  { id: 'all', name: 'All Ages' },
  { id: 'kids', name: 'Kids' },
  { id: 'families', name: 'Families' },
  { id: 'everyone', name: 'Everyone' },
];

interface FamilyKidsPageClientProps {
  initialAttractions: Attraction[];
}

export default function FamilyKidsPageClient({ initialAttractions }: FamilyKidsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const attractions = initialAttractions || [];

  // Filter attractions
  const filteredAttractions = useMemo(() => {
    return attractions.filter((attraction) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          attraction.name.toLowerCase().includes(query) ||
          attraction.description?.toLowerCase().includes(query) ||
          attraction.tags?.some(tag => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Price filter
      if (selectedPrice !== 'all' && attraction.priceRange !== selectedPrice) {
        return false;
      }

      // Area filter
      if (selectedArea !== 'all' && attraction.area !== selectedArea) {
        return false;
      }

      // Audience filter
      if (selectedAudience !== 'all' && !attraction.suitableFor?.includes(selectedAudience)) {
        return false;
      }

      return true;
    });
  }, [attractions, searchQuery, selectedPrice, selectedArea, selectedAudience]);

  // Featured attractions at the top
  const sortedAttractions = useMemo(() => {
    return [...filteredAttractions].sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      if ((a.rating || 0) > (b.rating || 0)) return -1;
      if ((a.rating || 0) < (b.rating || 0)) return 1;
      return 0;
    });
  }, [filteredAttractions]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=1920&h=600&fit=crop"
          alt="Family Fun in Bahrain"
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
              Family & Kids
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Discover the best family-friendly attractions, activities, and adventures in Bahrain
            </motion.p>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner targetPage="family-kids" placement="banner" className="max-w-7xl mx-auto px-4 py-4" />

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search attractions, activities, places..."
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

        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden md:block'} space-y-4 mb-6`}>
          {/* Price Filters */}
          <div className="flex flex-wrap gap-2">
            {priceFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedPrice(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPrice === filter.id
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filter.icon} {filter.name}
              </button>
            ))}
          </div>

          {/* Area and Audience Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              {areaFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>

            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              {audienceFilters.map((filter) => (
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
          Found <span className="text-white font-semibold">{sortedAttractions.length}</span> attractions
        </p>

        {/* Attractions Grid/List */}
        {sortedAttractions.length > 0 ? (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {sortedAttractions.map((attraction, index) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/attractions/${attraction.slug}`}>
                  <div className={`group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-amber-500/50 transition-all ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    {/* Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-48'}`}>
                      <Image
                        src={attraction.image}
                        alt={attraction.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {attraction.isFeatured && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-black text-xs font-bold rounded">
                          Featured
                        </div>
                      )}
                      {attraction.priceRange === 'Free' && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                          FREE
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors mb-2">
                        {attraction.name}
                      </h3>

                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {attraction.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {/* Rating */}
                        {attraction.rating && (
                          <div className="flex items-center gap-1 text-amber-400 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{attraction.rating.toFixed(1)}</span>
                            {attraction.reviewCount > 0 && (
                              <span className="text-gray-500">({attraction.reviewCount})</span>
                            )}
                          </div>
                        )}

                        {/* Duration */}
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{attraction.duration}</span>
                        </div>

                        {/* Area */}
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{attraction.area}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Price */}
                        <div className="flex items-center gap-1 text-green-400 font-medium">
                          <DollarSign className="w-4 h-4" />
                          {attraction.priceRange === 'Free' ? (
                            <span>Free Entry</span>
                          ) : attraction.priceFrom ? (
                            <span>From BD {attraction.priceFrom}</span>
                          ) : (
                            <span>{attraction.priceRange}</span>
                          )}
                        </div>

                        {/* Tags */}
                        {attraction.tags && attraction.tags.length > 0 && (
                          <div className="flex gap-1">
                            {attraction.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
                              >
                                {tag}
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
            <h3 className="text-xl font-semibold text-white mb-2">No attractions found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-8 text-center border border-amber-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">
            Know a great family spot we&apos;re missing?
          </h2>
          <p className="text-gray-300 mb-6">
            Help other families discover amazing places in Bahrain
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Suggest a Place <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner targetPage="family-kids" placement="banner" className="max-w-7xl mx-auto px-4 pb-8" />
    </div>
  );
}
