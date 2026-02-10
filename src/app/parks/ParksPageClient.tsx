'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Navigation, 
  Star, 
  Loader2, 
  ChevronLeft, 
  Trees, 
  Compass,
  ExternalLink,
  AlertCircle,
  Map as MapIcon,
  List,
  Filter,
  Search,
  Grid,
  ChevronDown,
  Clock,
  Check,
  RefreshCw,
  Baby,
  Footprints,
  Car,
  Moon,
  Home,
  Waves,
  Camera,
  Dumbbell
} from 'lucide-react';
import { 
  BAHRAIN_PARKS, 
  ParkData, 
  calculateDistance, 
  formatDistance, 
  getGoogleMapsDirectionsUrl,
  getGoogleMapsSearchUrl,
  getParksByDistance,
  getParksByGovernorate,
  searchParks
} from '@/lib/parks/data';
import { BAHRAIN_GOVERNORATES, BAHRAIN_CENTER } from '@/lib/parks/constants';

// Types
interface UserLocation {
  lat: number;
  lng: number;
}

type SortOption = 'distance' | 'rating' | 'reviews' | 'name';
type ViewMode = 'grid' | 'list';

// Feature icon mapping
const FEATURE_ICONS: Record<string, React.ReactNode> = {
  'Playground': <Baby className="w-3 h-3" />,
  'Walking Track': <Footprints className="w-3 h-3" />,
  'Walking Paths': <Footprints className="w-3 h-3" />,
  'Parking Available': <Car className="w-3 h-3" />,
  'Lit at Night': <Moon className="w-3 h-3" />,
  'Restrooms': <Home className="w-3 h-3" />,
  'Waterfront': <Waves className="w-3 h-3" />,
  'Photography Spot': <Camera className="w-3 h-3" />,
  'Exercise Equipment': <Dumbbell className="w-3 h-3" />,
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

// Skeleton loader component
function ParkCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-700" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-slate-700 rounded w-1/2" />
        <div className="h-4 bg-slate-700 rounded w-1/4" />
        <div className="h-10 bg-slate-700 rounded" />
      </div>
    </div>
  );
}

// Park card component
function ParkCard({ 
  park, 
  userLocation, 
  distance,
  isHighlighted,
  viewMode = 'grid'
}: { 
  park: ParkData; 
  userLocation: UserLocation | null;
  distance?: number;
  isHighlighted: boolean;
  viewMode: ViewMode;
}) {
  const isListView = viewMode === 'list';

  // Default park images based on features
  const getDefaultImage = () => {
    if (park.features.includes('Wildlife')) return '/images/parks/wildlife.jpg';
    if (park.features.includes('Waterfront')) return '/images/parks/waterfront.jpg';
    if (park.features.includes('Botanical Garden')) return '/images/parks/botanical.jpg';
    return '/images/parks/default.jpg';
  };

  return (
    <motion.article
      variants={slideIn}
      layout
      className={`group bg-white/5 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all ${
        isHighlighted 
          ? 'border-green-400 ring-2 ring-green-400/50 bg-green-500/10' 
          : 'border-white/10 hover:border-green-400/50 hover:bg-white/10'
      } ${isListView ? 'flex flex-row' : ''}`}
    >
      {/* Park Image */}
      <div className={`relative bg-slate-800 ${isListView ? 'w-48 h-full min-h-[160px]' : 'h-48'}`}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/20 to-teal-500/20">
          <Trees className="w-16 h-16 text-green-400/50" />
        </div>
        
        {/* Distance Badge */}
        {distance !== undefined && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-sm font-medium text-green-400">
            {formatDistance(distance)}
          </div>
        )}

        {/* Verified Badge */}
        {park.isVerified && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white flex items-center gap-1">
            <Check className="w-3 h-3" />
            Verified
          </div>
        )}
      </div>

      {/* Park Info */}
      <div className={`p-5 ${isListView ? 'flex-1 flex flex-col justify-between' : ''}`}>
        <div>
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors line-clamp-1">
            {park.name}
          </h3>
          {park.nameAr && (
            <p className="text-sm text-gray-500 mb-2" dir="rtl">{park.nameAr}</p>
          )}
          
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
            <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="line-clamp-1">{park.area}, Bahrain</span>
          </div>

          {/* Rating */}
          {park.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-400/10 rounded-lg">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 font-medium">{park.rating}</span>
              </div>
              {park.reviewCount && (
                <span className="text-gray-500 text-sm">
                  ({park.reviewCount.toLocaleString()} reviews)
                </span>
              )}
            </div>
          )}

          {/* Opening Hours */}
          {park.openingHours && (
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
              <Clock className="w-4 h-4 text-green-400" />
              <span>{park.openingHours}</span>
            </div>
          )}

          {/* Features */}
          {park.features && park.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {park.features.slice(0, 4).map((feature) => (
                <span 
                  key={feature}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400"
                >
                  {FEATURE_ICONS[feature] || <Trees className="w-3 h-3" />}
                  {feature}
                </span>
              ))}
              {park.features.length > 4 && (
                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400">
                  +{park.features.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`flex gap-2 ${isListView ? '' : 'mt-3'}`}>
          <a
            href={getGoogleMapsDirectionsUrl(park, userLocation || undefined)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all text-sm"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={getGoogleMapsSearchUrl(park.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all text-sm"
            title="View on Google Maps"
          >
            <MapIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function ParksPageClient() {
  // State
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');
  const [highlightedParkId, setHighlightedParkId] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [showFilters, setShowFilters] = useState(false);
  const [radius, setRadius] = useState(10); // km
  
  const mapRef = useRef<HTMLDivElement>(null);

  // Check for existing location permission
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state as 'prompt' | 'granted' | 'denied');
      });
    }
  }, []);

  // Get user's location
  const getUserLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationPermission('granted');
        setSortBy('distance'); // Auto-switch to distance sort
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setLocationPermission('denied');
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location permission denied. Enable location to find parks near you.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case err.TIMEOUT:
            setError('Location request timed out. Please try again.');
            break;
          default:
            setError('An unknown error occurred.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  // Calculate parks with distances
  const parksWithDistance = useMemo(() => {
    if (!userLocation) return BAHRAIN_PARKS.map(p => ({ ...p, distance: undefined }));
    return getParksByDistance(userLocation.lat, userLocation.lng);
  }, [userLocation]);

  // Nearby parks (within radius)
  const nearbyParks = useMemo(() => {
    if (!userLocation) return [];
    return parksWithDistance.filter(p => p.distance !== undefined && p.distance <= radius);
  }, [parksWithDistance, userLocation, radius]);

  // Filter and sort all parks
  const filteredParks = useMemo(() => {
    let parks = [...parksWithDistance];
    
    // Search filter
    if (searchQuery) {
      const results = searchParks(searchQuery);
      const resultIds = new Set(results.map(p => p.id));
      parks = parks.filter(p => resultIds.has(p.id));
    }
    
    // Governorate filter
    if (selectedGovernorate !== 'all') {
      parks = parks.filter(p => p.governorate === selectedGovernorate);
    }
    
    // Sort
    switch (sortBy) {
      case 'distance':
        if (userLocation) {
          parks.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
        }
        break;
      case 'rating':
        parks.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'reviews':
        parks.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
        break;
      case 'name':
        parks.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return parks;
  }, [parksWithDistance, searchQuery, selectedGovernorate, sortBy, userLocation]);

  const radiusOptions = [
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 25, label: '25 km' },
    { value: 100, label: 'All' },
  ];

  const sortOptions: { value: SortOption; label: string; requiresLocation?: boolean }[] = [
    { value: 'distance', label: 'Nearest', requiresLocation: true },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'name', label: 'Alphabetical' },
  ];

  // Get Google Maps embed URL for showing all parks
  const getMapEmbedUrl = () => {
    if (userLocation) {
      return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d${userLocation.lng}!3d${userLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbh`;
    }
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d100000!2d${BAHRAIN_CENTER.lng}!3d${BAHRAIN_CENTER.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbh`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Trees className="w-5 h-5 text-green-400" />
            Parks & Gardens
          </h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-6">
              <Compass className="w-4 h-4" />
              {BAHRAIN_PARKS.length} Parks in Bahrain
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Parks Near Me
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover parks and gardens across Bahrain. Find green spaces near you with directions.
            </p>

            {/* Main CTA */}
            {!userLocation && (
              <motion.button
                onClick={getUserLocation}
                disabled={loading}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-lg rounded-2xl hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50"
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Finding your location...
                  </>
                ) : (
                  <>
                    <Navigation className="w-6 h-6" />
                    Find Parks Near Me
                  </>
                )}
              </motion.button>
            )}

            {/* Location Status */}
            {userLocation && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">
                <Check className="w-4 h-4" />
                Location enabled — showing {nearbyParks.length} parks within {radius} km
                <button 
                  onClick={getUserLocation}
                  className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            )}

            {/* Error */}
            {error && (
              <motion.div 
                className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-left text-sm">{error}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Nearby Parks Section */}
      {userLocation && nearbyParks.length > 0 && (
        <section className="px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Parks Near You</h2>
              <div className="flex gap-2">
                {radiusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRadius(option.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      radius === option.value
                        ? 'bg-green-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Map */}
            <div ref={mapRef} className="mb-8 rounded-2xl overflow-hidden border border-white/10 h-[300px]">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={getMapEmbedUrl()}
              />
            </div>

            {/* Nearby Parks Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {nearbyParks.slice(0, 6).map((park) => (
                <ParkCard
                  key={park.id}
                  park={park}
                  userLocation={userLocation}
                  distance={park.distance}
                  isHighlighted={highlightedParkId === park.id}
                  viewMode="grid"
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Full Directory */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">All Parks in Bahrain</h2>
              <p className="text-gray-400">Complete directory of {BAHRAIN_PARKS.length} public parks and gardens</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search parks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400/50"
              />
            </div>

            {/* Mobile Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Filters */}
            <div className={`flex flex-wrap gap-3 ${showFilters ? '' : 'hidden md:flex'}`}>
              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">All Areas</option>
                {BAHRAIN_GOVERNORATES.map((gov) => (
                  <option key={gov.id} value={gov.id} className="bg-slate-900">{gov.name}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option 
                    key={option.value} 
                    value={option.value} 
                    className="bg-slate-900"
                    disabled={option.requiresLocation && !userLocation}
                  >
                    Sort: {option.label}{option.requiresLocation && !userLocation ? ' (needs location)' : ''}
                  </option>
                ))}
              </select>

              <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-400 mb-6">
            Showing <span className="text-green-400 font-bold">{filteredParks.length}</span> parks
            {searchQuery && ` matching "${searchQuery}"`}
          </p>

          {/* Parks Grid */}
          <motion.div 
            className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {filteredParks.map((park) => (
              <ParkCard
                key={park.id}
                park={park}
                userLocation={userLocation}
                distance={park.distance}
                isHighlighted={highlightedParkId === park.id}
                viewMode={viewMode}
              />
            ))}
          </motion.div>

          {/* No Results */}
          {filteredParks.length === 0 && (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No parks found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Parks and Gardens in Bahrain',
            description: 'Complete directory of public parks and gardens in Bahrain',
            numberOfItems: BAHRAIN_PARKS.length,
            itemListElement: BAHRAIN_PARKS.slice(0, 10).map((park, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Park',
                name: park.name,
                description: park.description,
                address: `${park.area}, Bahrain`,
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: park.coordinates.lat,
                  longitude: park.coordinates.lng,
                },
                aggregateRating: park.rating ? {
                  '@type': 'AggregateRating',
                  ratingValue: park.rating,
                  reviewCount: park.reviewCount,
                } : undefined,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
