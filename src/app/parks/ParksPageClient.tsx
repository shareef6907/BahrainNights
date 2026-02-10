'use client';

import { useState, useCallback, useEffect } from 'react';
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
  Filter
} from 'lucide-react';

// Types
interface Park {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now?: boolean;
  };
  distance?: number; // in km
}

interface UserLocation {
  lat: number;
  lng: number;
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Format distance for display
function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m away`;
  }
  return `${km.toFixed(1)} km away`;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function ParksPageClient() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState(5000); // 5km default
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [locationPermission, setLocationPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');

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
            setError('Location permission denied. Please enable location access in your browser settings.');
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
        maximumAge: 300000 // 5 minutes cache
      }
    );
  }, [radius]);

  // Fetch nearby parks from Google Places API
  const fetchNearbyParks = async (location: UserLocation, searchRadius: number) => {
    try {
      const response = await fetch(
        `/api/parks/nearby?lat=${location.lat}&lng=${location.lng}&radius=${searchRadius}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch parks');
      }

      const data = await response.json();
      
      // Calculate distance for each park and sort by nearest
      const parksWithDistance = data.results.map((park: Park) => ({
        ...park,
        distance: calculateDistance(
          location.lat,
          location.lng,
          park.geometry.location.lat,
          park.geometry.location.lng
        )
      })).sort((a: Park, b: Park) => (a.distance || 0) - (b.distance || 0));

      setParks(parksWithDistance);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch nearby parks. Please try again.');
      setLoading(false);
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

  // Get Google Maps directions URL
  const getDirectionsUrl = (park: Park) => {
    if (userLocation) {
      return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${park.geometry.location.lat},${park.geometry.location.lng}&destination_place_id=${park.place_id}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.name)}&query_place_id=${park.place_id}`;
  };

  // Get photo URL from Google Places
  const getPhotoUrl = (photoReference: string, maxWidth: number = 400) => {
    return `/api/parks/photo?reference=${photoReference}&maxwidth=${maxWidth}`;
  };

  const radiusOptions = [
    { value: 5000, label: '5 km' },
    { value: 10000, label: '10 km' },
    { value: 25000, label: '25 km' },
    { value: 50000, label: 'All of Bahrain' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Trees className="w-5 h-5 text-green-400" />
            Parks & Gardens
          </h1>
        </div>
      </div>

      {/* Hero Section - Parks Near Me */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
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
              Discover parks and gardens in Bahrain. Get directions to the nearest green spaces.
            </p>

            {/* Main CTA Button */}
            {!userLocation && (
              <motion.button
                onClick={getUserLocation}
                disabled={loading}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-lg rounded-2xl hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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

            {/* Location Permission Hint */}
            {locationPermission === 'denied' && (
              <p className="mt-4 text-amber-400 text-sm flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Location access is blocked. Please enable it in your browser settings.
              </p>
            )}

            {/* Error Display */}
            {error && (
              <motion.div 
                className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 max-w-md mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      {userLocation && (
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              {/* Radius Filter */}
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">Radius:</span>
                <div className="flex gap-2">
                  {radiusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleRadiusChange(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        radius === option.value
                          ? 'bg-green-500 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'list'
                      ? 'bg-green-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'map'
                      ? 'bg-green-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <MapIcon className="w-4 h-4" />
                  Map
                </button>
              </div>

              {/* Refresh Button */}
              <button
                onClick={() => userLocation && fetchNearbyParks(userLocation, radius)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
              >
                <Navigation className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-green-400 animate-spin mb-4" />
                <p className="text-gray-400">Finding parks near you...</p>
              </div>
            )}

            {/* Results Count */}
            {!loading && parks.length > 0 && (
              <p className="text-gray-400 mb-6">
                Found <span className="text-green-400 font-bold">{parks.length}</span> parks within {radius / 1000} km
              </p>
            )}

            {/* Map View */}
            {viewMode === 'map' && !loading && parks.length > 0 && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/search?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=parks+in+bahrain&center=${userLocation.lat},${userLocation.lng}&zoom=12`}
                />
              </div>
            )}

            {/* Parks List */}
            {!loading && (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="popLayout">
                  {parks.map((park) => (
                    <motion.div
                      key={park.place_id}
                      variants={fadeIn}
                      layout
                      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-green-400/50 hover:bg-white/10 transition-all"
                    >
                      {/* Park Image */}
                      <div className="relative h-48 bg-slate-800">
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
                        {park.distance !== undefined && (
                          <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-sm font-medium text-green-400">
                            {formatDistance(park.distance)}
                          </div>
                        )}

                        {/* Open Now Badge */}
                        {park.opening_hours?.open_now !== undefined && (
                          <div className={`absolute top-3 left-3 px-3 py-1 backdrop-blur-sm rounded-full text-sm font-medium ${
                            park.opening_hours.open_now 
                              ? 'bg-green-500/80 text-white' 
                              : 'bg-red-500/80 text-white'
                          }`}>
                            {park.opening_hours.open_now ? 'Open Now' : 'Closed'}
                          </div>
                        )}
                      </div>

                      {/* Park Info */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-1">
                          {park.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                          <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="line-clamp-1">{park.vicinity}</span>
                        </div>

                        {/* Rating */}
                        {park.rating && (
                          <div className="flex items-center gap-2 mb-4">
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

                        {/* Get Directions Button */}
                        <a
                          href={getDirectionsUrl(park)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all"
                        >
                          <Navigation className="w-5 h-5" />
                          Get Directions
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* No Results */}
            {!loading && parks.length === 0 && userLocation && (
              <div className="text-center py-20">
                <Trees className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No parks found</h3>
                <p className="text-gray-400 mb-6">Try increasing the search radius</p>
                <button
                  onClick={() => handleRadiusChange(25000)}
                  className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
                >
                  Search 25 km radius
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Popular Parks Section (Static) - Show when no location */}
      {!userLocation && !loading && (
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Popular Parks in Bahrain</h2>
            <p className="text-gray-400 mb-8">
              Enable location to find parks near you, or browse popular parks below.
            </p>
            
            {/* Placeholder for popular parks - will be populated from database or static list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Prince Khalifa bin Salman Park', area: 'Hidd', description: 'Large family park with playgrounds and walking paths' },
                { name: 'Arad Fort Park', area: 'Arad', description: 'Historic fort with beautiful gardens' },
                { name: 'Andalus Garden', area: 'Manama', description: 'Traditional Andalusian-style garden' },
              ].map((park, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Trees className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{park.name}</h3>
                  <p className="text-green-400 text-sm mb-2">{park.area}</p>
                  <p className="text-gray-400 text-sm">{park.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
