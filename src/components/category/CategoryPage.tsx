'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, X, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import PlaceCard, { Place, OpeningHours } from '@/components/places/PlaceCard';
import { CategoryConfig, getRelatedCategories } from '@/lib/categories';
import type { Venue } from '@/types/database';
import AdBanner from '@/components/ads/AdBanner';

interface CategoryPageProps {
  config: CategoryConfig;
  venues: Venue[];
  isLoading?: boolean;
  error?: string | null;
}

// Convert database venue to Place type
function venueToPlace(venue: Venue): Place {
  // Extract hideHours from opening_hours if it exists
  const openingHours = (venue.opening_hours as OpeningHours & { hideHours?: boolean }) || {};
  const hideHours = openingHours.hideHours === true;

  return {
    id: venue.id,
    name: venue.name,
    slug: venue.slug,
    category: venue.category,
    subcategory: venue.subcategories || [],
    description: venue.description || '',
    address: venue.address,
    area: venue.area,
    latitude: venue.latitude || 0,
    longitude: venue.longitude || 0,
    phone: venue.phone || undefined,
    email: venue.email || undefined,
    website: venue.website || undefined,
    instagram: venue.instagram || undefined,
    openingHours: openingHours,
    hideHours: hideHours,
    features: venue.features || [],
    images: venue.cover_image_url
      ? [venue.cover_image_url, ...(venue.gallery || [])]
      : (venue.gallery || ['/images/placeholder-venue.jpg']),
    logo: venue.logo_url || '/images/placeholder-logo.png',
    upcomingEventsCount: 0,
    likeCount: venue.like_count || 0,
    is_featured: venue.is_featured || false,
  };
}

export default function CategoryPage({ config, venues, isLoading = false, error = null }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');

  // Convert venues to places
  const placesData = useMemo(() => venues.map(venueToPlace), [venues]);

  // Get unique areas from venues
  const areas = useMemo(() => {
    const uniqueAreas = [...new Set(placesData.map(p => p.area))].filter(Boolean);
    return ['all', ...uniqueAreas.sort()];
  }, [placesData]);

  // Filter places
  const filteredPlaces = useMemo(() => {
    let result = [...placesData];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (place) =>
          place.name.toLowerCase().includes(query) ||
          place.subcategory.some((s) => s.toLowerCase().includes(query)) ||
          place.area.toLowerCase().includes(query) ||
          place.description.toLowerCase().includes(query)
      );
    }

    // Area filter
    if (selectedArea !== 'all') {
      result = result.filter(
        (place) => place.area.toLowerCase() === selectedArea.toLowerCase()
      );
    }

    // Sort - Featured venues first, then by likes
    result.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return (b.likeCount || 0) - (a.likeCount || 0);
    });

    return result;
  }, [searchQuery, selectedArea, placesData]);

  // Get related categories
  const relatedCategories = getRelatedCategories(config.slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading {config.name.toLowerCase()}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-orange-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/places" className="hover:text-white transition-colors">Places</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{config.name}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-5xl mb-4">{config.icon}</div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              {config.title.split(' in ')[0]}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                in Bahrain
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {config.description}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${config.name.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 md:pb-20">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Area Filter */}
          <div className="flex flex-wrap gap-2">
            {areas.slice(0, 8).map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedArea === area
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {area === 'all' ? 'All Areas' : area}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-gray-400">
            <span className="text-white font-semibold">{filteredPlaces.length}</span>{' '}
            {filteredPlaces.length === 1 ? 'venue' : 'venues'} found
          </p>
        </div>

        {/* Ad Banner */}
        <div className="mb-8">
          <AdBanner targetPage="places" placement="banner" limit={3} />
        </div>

        {/* Empty State */}
        {filteredPlaces.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{config.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No {config.name.toLowerCase()} found
            </h3>
            <p className="text-gray-400 mb-6">
              {searchQuery
                ? 'Try adjusting your search or filters'
                : `We're working on adding ${config.name.toLowerCase()} to our directory. Check back soon!`}
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedArea('all');
                }}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Venues Grid */}
        {filteredPlaces.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPlaces.map((place, index) => (
              <PlaceCard key={place.id} place={place} index={index} />
            ))}
          </div>
        )}

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Related Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedCategories.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${related.slug}`}
                  className="group p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-yellow-400/50 transition-all hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{related.icon}</div>
                  <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {related.description.split('.')[0]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content Section */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">
              Discover the Best {config.name} in Bahrain
            </h2>
            <p className="text-gray-400 leading-relaxed">
              BahrainNights.com is your ultimate guide to {config.name.toLowerCase()} in Bahrain.
              Whether you're looking for popular spots in Manama, hidden gems in Juffair, or trending
              venues in Seef, we've got you covered. Our curated list features the best
              {config.name.toLowerCase()} across all areas of Bahrain, complete with reviews,
              photos, and contact information.
            </p>
            <p className="text-gray-400 leading-relaxed mt-4">
              {config.keywords.slice(0, 3).join(', ')} - find everything you need to plan your
              perfect outing. From {relatedCategories.map(r => r.name.toLowerCase()).join(', ')}
              to more, BahrainNights helps you discover the best of Bahrain's vibrant scene.
            </p>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      {filteredPlaces.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: config.metaTitle,
              description: config.metaDescription,
              url: `https://www.bahrainnights.com/${config.slug}`,
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: filteredPlaces.slice(0, 10).map((place, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  item: {
                    '@type': 'LocalBusiness',
                    name: place.name,
                    description: place.description,
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: place.area,
                      addressCountry: 'BH',
                    },
                    telephone: place.phone,
                    geo: place.latitude && place.longitude ? {
                      '@type': 'GeoCoordinates',
                      latitude: place.latitude,
                      longitude: place.longitude,
                    } : undefined,
                  },
                })),
              },
            }),
          }}
        />
      )}
    </div>
  );
}
