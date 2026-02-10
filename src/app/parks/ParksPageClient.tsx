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
  X,
  RefreshCw,
  Sparkles,
  Users,
  Car,
  Moon,
  Baby,
  Footprints,
  Home
} from 'lucide-react';
import { BAHRAIN_GOVERNORATES, BAHRAIN_CENTER, MAP_ZOOM } from '@/lib/parks/constants';
import { formatDistance, getDirectionsUrl, sortParks, Park } from '@/lib/parks/utils';

// Types
interface UserLocation {
  lat: number;
  lng: number;
}

type SortOption = 'distance' | 'rating' | 'reviews' | 'name';
type ViewMode = 'grid' | 'list' | 'map';

// Feature icon mapping
const FEATURE_ICONS: Record<string, React.ReactNode> = {
  'Playground': <Baby className="w-3 h-3" />,
  'Walking Track': <Footprints className="w-3 h-3" />,
  'Parking Available': <Car className="w-3 h-3" />,
  'Lit at Night': <Moon className="w-3 h-3" />,
  'Restrooms': <Home className="w-3 h-3" />,
  'Pet Friendly': <Users className="w-3 h-3" />,
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
  onViewOnMap, 
  isHighlighted,
  viewMode = 'grid'
}: { 
  park: Park; 
  userLocation: UserLocation | null;
  onViewOnMap: (park: Park) => void;
  isHighlighted: boolean;
  viewMode: ViewMode;
}) {
  const distance = park.distance ?? (userLocation ? 
    Math.sqrt(Math.pow(userLocation.lat - park.geometry.location.lat, 2) + Math.pow(userLocation.lng - park.geometry.location.lng, 2)) * 111 
    : undefined);

  const getPhotoUrl = (photoReference: string, maxWidth: number = 400) => {
    return `/api/parks/photo?reference=${photoReference}&maxwidth=${maxWidth}`;
  };

  const isListView = viewMode === 'list';

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
        {park.photos && park.photos[0] ? (
          <Image
            src={getPhotoUrl(park.photos[0].photo_reference)}
            alt={park.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/20 to-teal-500/20">
            <Trees className="w-16 h-16 text-green-400/50" />
          </div>
        )}
        
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

        {/* Open Now Badge */}
        {park.opening_hours?.open_now !== undefined && (
          <div className={`absolute bottom-3 left-3 px-3 py-1 backdrop-blur-sm rounded-full text-xs font-medium ${
            park.opening_hours.open_now 
              ? 'bg-green-500/80 text-white' 
              : 'bg-red-500/80 text-white'
          }`}>
            {park.opening_hours.open_now ? 'Open Now' : 'Closed'}
          </div>
        )}
      </div>

      {/* Park Info */}
      <div className={`p-5 ${isListView ? 'flex-1 flex flex-col justify-between' : ''}`}>
        <div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-1">
            {park.name}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
            <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="line-clamp-1">{park.vicinity || park.formatted_address}</span>
          </div>

          {/* Rating */}
          {park.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-400/10 rounded-lg">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 font-medium">{park.rating}</span>
              </div>
              {park.user_ratings_total && (
                <span className="text-gray-500 text-sm">
                  ({park.user_ratings_total.toLocaleString()} reviews)
                </span>
              )}
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
                  {FEATURE_ICONS[feature]}
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`flex gap-2 ${isListView ? '' : 'mt-3'}`}>
          <a
            href={getDirectionsUrl(park, userLocation || undefined)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all text-sm"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </a>
          <button
            onClick={() => onViewOnMap(park)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all text-sm"
          >
            <MapIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ParksPageClient() {
  // State
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyParks, setNearbyParks] = useState<Park[]>([]);
  const [allParks, setAllParks] = useState<{ verified: Park[]; unverified: Park[] }>({ verified: [], unverified: [] });
  const [loading, setLoading] = useState(false);
  const [loadingDirectory, setLoadingDirectory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState(5000);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('distance');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');
  const [highlightedParkId, setHighlightedParkId] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [showFilters, setShowFilters] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Check for existing location permission
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state as 'prompt' | 'granted' | 'denied');
        result.onchange = () => {
          setLocationPermission(result.state as 'prompt' | 'granted' | 'denied');
        };
      });
    }
  }, []);

  // Fetch all parks directory on mount
  useEffect(() => {
    fetchParksDirectory();
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
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setLocationPermission('granted');
        fetchNearbyParks(location, radius);
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
            setError('An unknown error occurred while getting your location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  }, [radius]);

  // Fetch nearby parks
  const fetchNearbyParks = async (location: UserLocation, searchRadius: number) => {
    try {
      const response = await fetch(
        `/api/parks/nearby?lat=${location.lat}&lng=${location.lng}&radius=${searchRadius}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch parks');

      const data = await response.json();
      setNearbyParks(data.results || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch nearby parks. Please try again.');
      setLoading(false);
    }
  };

  // Fetch parks directory
  const fetchParksDirectory = async () => {
    setLoadingDirectory(true);
    try {
      const response = await fetch('/api/parks/directory');
      if (!response.ok) throw new Error('Failed to fetch directory');

      const data = await response.json();
      setAllParks({
        verified: data.verifiedParks || [],
        unverified: data.unverifiedParks || [],
      });
    } catch (err) {
      console.error('Failed to fetch parks directory:', err);
    } finally {
      setLoadingDirectory(false);
    }
  };

  // Handle radius change
  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    if (userLocation) {
      setLoading(true);
      fetchNearbyParks(userLocation, newRadius);
    }
  };

  // Handle view on map
  const handleViewOnMap = (park: Park) => {
    setHighlightedParkId(park.place_id);
    mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Clear highlight after 3 seconds
    setTimeout(() => setHighlightedParkId(null), 3000);
  };

  // Filter and sort parks for directory
  const filteredParks = useMemo(() => {
    let parks = [...allParks.verified, ...allParks.unverified];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      parks = parks.filter(p => 
        p.name.toLowerCase().includes(query) ||
        (p.vicinity || '').toLowerCase().includes(query)
      );
    }
    
    // Governorate filter
    if (selectedGovernorate !== 'all') {
      parks = parks.filter(p => p.governorate === selectedGovernorate);
    }
    
    // Sort
    return sortParks(parks, sortBy, userLocation || undefined);
  }, [allParks, searchQuery, selectedGovernorate, sortBy, userLocation]);

  const radiusOptions = [
    { value: 5000, label: '5 km' },
    { value: 10000, label: '10 km' },
    { value: 25000, label: '25 km' },
    { value: 50000, label: 'All of Bahrain' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'distance', label: 'Nearest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'name', label: 'Alphabetical' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Back Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Trees className="w-5 h-5 text-green-400" />
            Parks & Gardens
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </nav>

      {/* Hero Section - Parks Near Me */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-6">
              <Compass className="w-4 h-4" />
              Location-based discovery
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Parks Near Me
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover parks and gardens in Bahrain. Get directions to green spaces near you.
            </p>

            {/* Main CTA Button */}
            {!userLocation && (
              <motion.button
                onClick={getUserLocation}
                disabled={loading}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-lg rounded-2xl hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                Location enabled
                <button 
                  onClick={() => fetchNearbyParks(userLocation, radius)}
                  className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <motion.div 
                className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 max-w-md mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium">Location Access Required</p>
                    <p className="text-sm mt-1 text-red-400/80">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Nearby Parks Section */}
      {userLocation && (
        <section className="px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              {/* Radius Filter */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">Radius:</span>
                <div className="flex gap-2">
                  {radiusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleRadiusChange(option.value)}
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

              {/* Results count */}
              {!loading && (
                <span className="text-gray-400 text-sm">
                  Found <span className="text-green-400 font-bold">{nearbyParks.length}</span> parks
                </span>
              )}
            </div>

            {/* Map Preview */}
            <div ref={mapRef} className="mb-8 rounded-2xl overflow-hidden border border-white/10 h-[350px] bg-slate-800">
              {/* Google Maps Embed with user location and parks */}
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=parks&center=${userLocation.lat},${userLocation.lng}&zoom=${MAP_ZOOM.nearby}`}
              />
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <ParkCardSkeleton key={i} />)}
              </div>
            )}

            {/* Parks List */}
            {!loading && nearbyParks.length > 0 && (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {nearbyParks.map((park) => (
                  <ParkCard
                    key={park.place_id}
                    park={park}
                    userLocation={userLocation}
                    onViewOnMap={handleViewOnMap}
                    isHighlighted={highlightedParkId === park.place_id}
                    viewMode="grid"
                  />
                ))}
              </motion.div>
            )}

            {/* No Results */}
            {!loading && nearbyParks.length === 0 && (
              <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                <Trees className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No parks found within {radius / 1000} km</h3>
                <p className="text-gray-400 mb-6">Try expanding your search radius</p>
                <button
                  onClick={() => handleRadiusChange(Math.min(radius * 2, 50000))}
                  className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
                >
                  Search wider area
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Full Parks Directory */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">All Parks in Bahrain</h2>
              <p className="text-gray-400">Complete directory of public parks and gardens</p>
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
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400/50 transition-colors"
              />
            </div>

            {/* Filters Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Filters (Desktop always visible, mobile toggle) */}
            <div className={`flex flex-wrap gap-3 ${showFilters ? '' : 'hidden md:flex'}`}>
              {/* Governorate */}
              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-400/50 cursor-pointer"
              >
                <option value="all" className="bg-slate-900">All Areas</option>
                {BAHRAIN_GOVERNORATES.map((gov) => (
                  <option key={gov.id} value={gov.id} className="bg-slate-900">{gov.name}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-400/50 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-slate-900">
                    Sort: {option.label}
                  </option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading Directory */}
          {loadingDirectory && (
            <div className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {[...Array(6)].map((_, i) => <ParkCardSkeleton key={i} />)}
            </div>
          )}

          {/* Parks Directory */}
          {!loadingDirectory && (
            <>
              {/* Results count */}
              <p className="text-gray-400 mb-6">
                Showing <span className="text-green-400 font-bold">{filteredParks.length}</span> parks
                {searchQuery && ` matching "${searchQuery}"`}
              </p>

              <motion.div 
                ref={listRef}
                className={`grid gap-6 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {filteredParks.map((park) => (
                  <ParkCard
                    key={park.place_id}
                    park={park}
                    userLocation={userLocation}
                    onViewOnMap={handleViewOnMap}
                    isHighlighted={highlightedParkId === park.place_id}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>

              {/* No results */}
              {filteredParks.length === 0 && (
                <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                  <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No parks found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Parks and Gardens in Bahrain',
            description: 'Complete directory of public parks and gardens in Bahrain',
            numberOfItems: allParks.verified.length + allParks.unverified.length,
            itemListElement: allParks.verified.slice(0, 10).map((park, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Park',
                name: park.name,
                address: park.vicinity || park.formatted_address,
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: park.geometry.location.lat,
                  longitude: park.geometry.location.lng,
                },
                aggregateRating: park.rating ? {
                  '@type': 'AggregateRating',
                  ratingValue: park.rating,
                  reviewCount: park.user_ratings_total,
                } : undefined,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
