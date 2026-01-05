'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapIcon, Grid3X3, X, Loader2 } from 'lucide-react';
import PlaceCategoryTabs, { PlaceCategory } from '@/components/places/PlaceCategoryTabs';
import PlaceFilters, { PlaceFiltersState } from '@/components/places/PlaceFilters';
import PlaceGrid from '@/components/places/PlaceGrid';
import PlaceMapView from '@/components/places/PlaceMapView';
import TrendingPlaces from '@/components/places/TrendingPlaces';
import { Place, OpeningHours } from '@/components/places/PlaceCard';
import type { Venue } from '@/types/database';
import AdBanner from '@/components/ads/AdBanner';

// Convert database venue to Place type
function venueToPlace(venue: Venue): Place {
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
    openingHours: (venue.opening_hours as OpeningHours) || {},
    features: venue.features || [],
    images: venue.gallery || (venue.cover_image_url ? [venue.cover_image_url] : []),
    logo: venue.logo_url || '',
    upcomingEventsCount: 0,
    likeCount: venue.like_count || 0,
    is_featured: venue.is_featured || false,
  };
}

function PlacesPageContent() {
  const searchParams = useSearchParams();

  // State
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Read initial values from URL parameters
  const categoryParam = searchParams?.get('category') as PlaceCategory | null;
  const areaParam = searchParams?.get('area') ?? null;
  const queryParam = searchParams?.get('q') ?? null;

  const [searchQuery, setSearchQuery] = useState(queryParam || '');
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory>(categoryParam || 'all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filters, setFilters] = useState<PlaceFiltersState>({
    area: areaParam || 'all',
    features: [],
    sortBy: 'popular', // Default to popular (most liked)
  });

  // Fetch venues from API
  useEffect(() => {
    async function fetchVenues() {
      try {
        setLoading(true);
        const response = await fetch('/api/public/venues?sortBy=likes&limit=100');
        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }
        const data = await response.json();
        setVenues(data.venues || []);
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError('Failed to load venues. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  // Convert venues to places
  const placesData = useMemo(() => venues.map(venueToPlace), [venues]);

  // Update state when URL params change
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (areaParam) {
      setFilters(prev => ({ ...prev, area: areaParam }));
    }
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [categoryParam, areaParam, queryParam]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: placesData.length };
    placesData.forEach((place) => {
      counts[place.category] = (counts[place.category] || 0) + 1;
    });
    return counts;
  }, [placesData]);

  const categories = [
    { category: 'all' as PlaceCategory, label: 'All Places', count: counts('all'), icon: '🌟' },
    { category: 'restaurant' as PlaceCategory, label: 'Restaurants', count: counts('restaurant'), icon: '🍽️' },
    { category: 'cafe' as PlaceCategory, label: 'Cafes', count: counts('cafe'), icon: '☕' },
    { category: 'lounge' as PlaceCategory, label: 'Lounges & Bars', count: counts('lounge') + counts('bar'), icon: '🍸' },
    { category: 'nightclub' as PlaceCategory, label: 'Nightclubs', count: counts('nightclub'), icon: '🎵' },
    { category: 'beach-club' as PlaceCategory, label: 'Beach Clubs', count: counts('beach-club'), icon: '🏖️' },
    { category: 'hotel' as PlaceCategory, label: 'Hotels', count: counts('hotel'), icon: '🏨' },
    { category: 'spa' as PlaceCategory, label: 'Spa & Wellness', count: counts('spa'), icon: '💆' },
  ];

  function counts(cat: string): number {
    if (cat === 'lounge') {
      return (categoryCounts['lounge'] || 0);
    }
    if (cat === 'bar') {
      return (categoryCounts['bar'] || 0);
    }
    return categoryCounts[cat] || 0;
  }

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

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'lounge') {
        result = result.filter((place) => place.category === 'lounge' || place.category === 'bar');
      } else {
        result = result.filter((place) => place.category === selectedCategory);
      }
    }

    // Area filter
    if (filters.area !== 'all') {
      result = result.filter(
        (place) => place.area.toLowerCase() === filters.area.toLowerCase()
      );
    }

    // Features filter
    if (filters.features.length > 0) {
      result = result.filter((place) =>
        filters.features.every((f) => place.features.includes(f))
      );
    }

    // Sort - Featured venues always appear first, then by selected sort method
    // Within featured and non-featured groups, sort by likes if same category
    const sortByFeaturedThenLikes = (a: Place, b: Place) => {
      // Featured venues first
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      // Within same featured status, sort by likes
      return (b.likeCount || 0) - (a.likeCount || 0);
    };

    switch (filters.sortBy) {
      case 'az':
        // For A-Z, still put featured first, then alphabetical
        result.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
      case 'newest':
        // For newest, featured first, then reverse order
        result.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return 0; // Keep original order for non-featured
        });
        break;
      case 'popular':
        // Featured first, then by likes
        result.sort(sortByFeaturedThenLikes);
        break;
      default:
        // Recommended: featured first, then by likes
        result.sort(sortByFeaturedThenLikes);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, filters, placesData]);

  // Trending places (top 3 by likes)
  const trendingPlaces = useMemo(() => {
    return [...placesData]
      .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
      .slice(0, 3);
  }, [placesData]);

  // New openings (last 3 added - sorted by newest)
  const newOpenings = useMemo(() => {
    return [...placesData].slice(0, 3);
  }, [placesData]);

  const clearFilters = () => {
    setFilters({
      area: 'all',
      features: [],
      sortBy: 'popular',
    });
  };

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (filters.area !== 'all') params.set('area', filters.area);
    if (searchQuery) params.set('q', searchQuery);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }, [selectedCategory, filters, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading venues...</p>
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
    <>
      {/* SEO */}
      <head>
        <title>Best Restaurants, Bars & Nightlife in Bahrain | BahrainNights</title>
        <meta
          name="description"
          content="Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, bars, and nightclubs across Manama, Seef, Juffair, and more."
        />
      </head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-orange-500/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
                Dining & Nightlife in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                  Bahrain
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover the best restaurants, cafes, lounges, and nightclubs
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
                  placeholder="Search places..."
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
          {/* Category Tabs */}
          <div className="mb-6">
            <PlaceCategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <PlaceFilters
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearFilters}
            />

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing <span className="text-white font-semibold">{filteredPlaces.length}</span>{' '}
              {filteredPlaces.length === 1 ? 'place' : 'places'}
              {placesData.length > 0 && (
                <span className="ml-2 text-sm">
                  (sorted by most popular)
                </span>
              )}
            </p>
          </div>

          {/* Ad Banner - Show category-specific ads */}
          <div className="mb-8">
            <AdBanner
              targetPage={
                selectedCategory === 'all' ? 'places' :
                selectedCategory === 'restaurant' ? 'restaurants' :
                selectedCategory === 'cafe' ? 'cafes' :
                selectedCategory === 'lounge' ? 'lounges' :
                selectedCategory === 'nightclub' ? 'nightclubs' :
                'places'
              }
              placement="banner"
              limit={5}
            />
          </div>

          {/* Empty State */}
          {placesData.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-white mb-2">No venues yet</h3>
              <p className="text-gray-400 mb-6">
                Be the first to register your venue on BahrainNights!
              </p>
              <a
                href="/register"
                className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Register Your Venue
              </a>
            </div>
          )}

          {/* Content */}
          {placesData.length > 0 && (
            <div className="flex gap-8">
              {/* Main Content */}
              <div className="flex-1">
                {viewMode === 'grid' ? (
                  <PlaceGrid places={filteredPlaces} />
                ) : (
                  <PlaceMapView places={filteredPlaces} />
                )}
              </div>

              {/* Sidebar (Desktop Only) */}
              {trendingPlaces.length > 0 && (
                <div className="hidden xl:block w-80 flex-shrink-0 space-y-6">
                  <TrendingPlaces
                    trending={trendingPlaces}
                    newOpenings={newOpenings}
                    tonightOffers={[]}
                  />

                  {/* Sidebar Ad - Show category-specific ads */}
                  <AdBanner
                    targetPage={
                      selectedCategory === 'all' ? 'places' :
                      selectedCategory === 'restaurant' ? 'restaurants' :
                      selectedCategory === 'cafe' ? 'cafes' :
                      selectedCategory === 'lounge' ? 'lounges' :
                      selectedCategory === 'nightclub' ? 'nightclubs' :
                      'places'
                    }
                    placement="sidebar"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* JSON-LD Structured Data */}
        {placesData.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: 'Best Restaurants, Bars & Nightlife in Bahrain',
                description:
                  'Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, bars, and nightclubs.',
                url: 'https://www.bahrainnights.com/places',
                mainEntity: {
                  '@type': 'ItemList',
                  itemListElement: placesData.slice(0, 10).map((place, index) => ({
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
    </>
  );
}

// Loading fallback for Suspense
function PlacesPageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading places...</p>
        </div>
      </div>
    </div>
  );
}

export default function PlacesPage() {
  return (
    <Suspense fallback={<PlacesPageLoading />}>
      <PlacesPageContent />
    </Suspense>
  );
}
