'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Navigation,
  ExternalLink,
  Crosshair,
} from 'lucide-react';

// Bahrain default center
const BAHRAIN_CENTER = { lat: 26.0667, lng: 50.5577 };

export default function VenueLocationPage() {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadLocation();
  }, []);

  async function loadLocation() {
    try {
      const response = await fetch('/api/venue-portal/profile');
      if (response.ok) {
        const data = await response.json();
        if (data.venue.latitude) {
          setLatitude(data.venue.latitude.toString());
        }
        if (data.venue.longitude) {
          setLongitude(data.venue.longitude.toString());
        }
        if (data.venue.address) {
          setAddress(data.venue.address);
        }
      }
    } catch (error) {
      console.error('Failed to load location:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMessage({ type: 'error', text: 'Geolocation is not supported by your browser' });
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setIsGettingLocation(false);
        setMessage({ type: 'success', text: 'Location detected! Click Save to update.' });
      },
      (error) => {
        setIsGettingLocation(false);
        let errorMsg = 'Failed to get location';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission denied. Please allow location access.';
        }
        setMessage({ type: 'error', text: errorMsg });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleOpenGoogleMaps = () => {
    const searchQuery = address || 'Bahrain';
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`,
      '_blank'
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      setMessage({ type: 'error', text: 'Please enter both latitude and longitude' });
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      setMessage({ type: 'error', text: 'Invalid coordinates. Please enter valid numbers.' });
      return;
    }

    // Validate coordinates are roughly in Bahrain region
    if (lat < 25.5 || lat > 26.5 || lng < 50 || lng > 51) {
      setMessage({ type: 'error', text: 'Coordinates should be within Bahrain region' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/venue-portal/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Location saved successfully!' });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to save location' });
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setIsSaving(false);
    }
  };

  const hasValidCoordinates = latitude && longitude && !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));
  const mapLat = hasValidCoordinates ? parseFloat(latitude) : BAHRAIN_CENTER.lat;
  const mapLng = hasValidCoordinates ? parseFloat(longitude) : BAHRAIN_CENTER.lng;

  // OpenStreetMap embed URL
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${mapLng - 0.01},${mapLat - 0.01},${mapLng + 0.01},${mapLat + 0.01}&layer=mapnik&marker=${mapLat},${mapLng}`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Venue Location</h1>
        <p className="text-gray-400 mt-1">
          Set your venue's location so customers can find you easily.
        </p>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-white/10">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              Map Preview
            </h2>
          </div>
          <div className="relative h-80 bg-slate-800">
            {hasValidCoordinates ? (
              <>
                <iframe
                  src={osmEmbedUrl}
                  className="w-full h-full border-0"
                  style={{ filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  title="Venue location map"
                />
                <button
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${mapLat},${mapLng}`, '_blank')}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-xl text-white text-sm font-medium hover:bg-black transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Maps
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MapPin className="w-12 h-12 mb-3" />
                <p>Enter coordinates to preview location</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Location Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6"
        >
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={isGettingLocation}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors disabled:opacity-50"
            >
              {isGettingLocation ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Crosshair className="w-5 h-5" />
              )}
              Use Current Location
            </button>
            <button
              type="button"
              onClick={handleOpenGoogleMaps}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
            >
              <Navigation className="w-5 h-5" />
              Find on Google Maps
            </button>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Latitude
              </label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g., 26.2235"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Longitude
              </label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g., 50.5875"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
              />
            </div>
          </div>

          {/* Help Text */}
          <div className="p-4 bg-white/5 rounded-xl">
            <h4 className="text-white font-medium text-sm mb-2">How to find your coordinates:</h4>
            <ol className="text-gray-400 text-sm space-y-1.5">
              <li>1. Click "Find on Google Maps" above</li>
              <li>2. Search for your venue or address</li>
              <li>3. Right-click on the exact location</li>
              <li>4. Click on the coordinates shown (first is latitude, second is longitude)</li>
              <li>5. Paste them in the fields above</li>
            </ol>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaving || !latitude || !longitude}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Location
              </>
            )}
          </button>
        </motion.form>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold mb-3">Why Location Matters</h3>
        <ul className="text-gray-400 text-sm space-y-2">
          <li>• Accurate location helps customers find your venue easily</li>
          <li>• Enables "Get Directions" feature on your venue page</li>
          <li>• Improves your visibility in location-based searches</li>
          <li>• Shows your venue on the interactive map</li>
        </ul>
      </motion.div>
    </div>
  );
}
