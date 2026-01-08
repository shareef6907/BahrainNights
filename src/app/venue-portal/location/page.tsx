'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Link as LinkIcon,
  Navigation,
} from 'lucide-react';

interface VenueLocation {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  area: string | null;
  google_maps_url: string | null;
}

/**
 * Extract coordinates from Google Maps URL (client-side version)
 */
function extractCoordinatesFromUrl(url: string): { latitude: number; longitude: number } | null {
  if (!url) return null;

  try {
    // Pattern 1: /@lat,lng,zoom format
    const atPattern = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const atMatch = url.match(atPattern);
    if (atMatch) {
      const lat = parseFloat(atMatch[1]);
      const lng = parseFloat(atMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { latitude: lat, longitude: lng };
      }
    }

    // Pattern 2: ?q=lat,lng format
    const qPattern = /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const qMatch = url.match(qPattern);
    if (qMatch) {
      const lat = parseFloat(qMatch[1]);
      const lng = parseFloat(qMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { latitude: lat, longitude: lng };
      }
    }

    // Pattern 3: query=lat,lng format
    const queryPattern = /[?&]query=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const queryMatch = url.match(queryPattern);
    if (queryMatch) {
      const lat = parseFloat(queryMatch[1]);
      const lng = parseFloat(queryMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { latitude: lat, longitude: lng };
      }
    }

    // Pattern 4: ll=lat,lng format
    const llPattern = /[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const llMatch = url.match(llPattern);
    if (llMatch) {
      const lat = parseFloat(llMatch[1]);
      const lng = parseFloat(llMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { latitude: lat, longitude: lng };
      }
    }

    // Pattern 5: destination=lat,lng format
    const destPattern = /[?&]destination=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const destMatch = url.match(destPattern);
    if (destMatch) {
      const lat = parseFloat(destMatch[1]);
      const lng = parseFloat(destMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { latitude: lat, longitude: lng };
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default function VenueLocationPage() {
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>('');
  const [venueLocation, setVenueLocation] = useState<VenueLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Extract coordinates from URL in real-time
  const extractedCoords = useMemo(() => {
    return extractCoordinatesFromUrl(googleMapsUrl);
  }, [googleMapsUrl]);

  // Use extracted coordinates OR database coordinates
  const displayCoords = useMemo(() => {
    if (extractedCoords) {
      return extractedCoords;
    }
    if (venueLocation?.latitude && venueLocation?.longitude) {
      return { latitude: venueLocation.latitude, longitude: venueLocation.longitude };
    }
    return null;
  }, [extractedCoords, venueLocation]);

  useEffect(() => {
    loadLocation();
  }, []);

  async function loadLocation() {
    try {
      const response = await fetch('/api/venue-portal/profile');
      if (response.ok) {
        const data = await response.json();
        if (data.venue.google_maps_url) {
          setGoogleMapsUrl(data.venue.google_maps_url);
        }
        setVenueLocation({
          latitude: data.venue.latitude,
          longitude: data.venue.longitude,
          address: data.venue.address,
          area: data.venue.area,
          google_maps_url: data.venue.google_maps_url,
        });
      }
    } catch (error) {
      console.error('Failed to load location:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const isValidGoogleMapsUrl = (url: string): boolean => {
    if (!url) return false;
    // Accept various Google Maps URL formats
    return (
      url.includes('google.com/maps') ||
      url.includes('goo.gl/maps') ||
      url.includes('maps.app.goo.gl') ||
      url.includes('maps.google.com')
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!googleMapsUrl.trim()) {
      setMessage({ type: 'error', text: 'Please enter your Google Maps link' });
      return;
    }

    if (!isValidGoogleMapsUrl(googleMapsUrl)) {
      setMessage({ type: 'error', text: 'Please enter a valid Google Maps link' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/venue-portal/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          google_maps_url: googleMapsUrl.trim(),
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Location saved successfully!' });
        // Reload to get the extracted coordinates from server
        await loadLocation();
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
          Add your Google Maps link so customers can find you easily.
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

      {/* Location Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6"
      >
        {/* Google Maps Link Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <LinkIcon className="w-4 h-4 inline mr-2" />
            Google Maps Link
          </label>
          <input
            type="url"
            value={googleMapsUrl}
            onChange={(e) => setGoogleMapsUrl(e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
          />
          <p className="text-gray-500 text-sm mt-2">
            Paste the link from Google Maps to your venue location
          </p>
        </div>

        {/* Preview Link */}
        {googleMapsUrl && isValidGoogleMapsUrl(googleMapsUrl) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-green-400 font-medium">Location link added</p>
                  <p className="text-gray-400 text-sm">Customers can click to open in Google Maps</p>
                </div>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white text-sm hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Test Link
              </a>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSaving || !googleMapsUrl.trim()}
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

      {/* Map Preview Section - shows when we have coordinates (from DB or extracted from URL) */}
      {displayCoords && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-yellow-400" />
            Your Location on Map
          </h3>

          {/* Map Embed */}
          <div className="relative h-48 bg-slate-800 rounded-xl overflow-hidden mb-4">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${displayCoords.longitude - 0.005},${displayCoords.latitude - 0.005},${displayCoords.longitude + 0.005},${displayCoords.latitude + 0.005}&layer=mapnik&marker=${displayCoords.latitude},${displayCoords.longitude}`}
              className="w-full h-full border-0"
              style={{ filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              title="Venue location map"
            />

            {/* Map Overlay */}
            <button
              onClick={() => {
                if (googleMapsUrl) {
                  window.open(googleMapsUrl, '_blank');
                } else {
                  window.open(`https://www.google.com/maps/search/?api=1&query=${displayCoords.latitude},${displayCoords.longitude}`, '_blank');
                }
              }}
              className="absolute inset-0 bg-transparent hover:bg-white/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
              aria-label="Open in Google Maps"
            >
              <div className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-xl text-white text-sm font-medium flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Open in Google Maps
              </div>
            </button>
          </div>

          {/* Address */}
          {venueLocation?.address && (
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <MapPin className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">{venueLocation.address}</p>
                {venueLocation.area && <p className="text-gray-500 text-xs mt-0.5">{venueLocation.area}, Bahrain</p>}
              </div>
            </div>
          )}

          {/* Get Directions Button */}
          <button
            onClick={() => {
              if (googleMapsUrl) {
                window.open(googleMapsUrl, '_blank');
              } else {
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${displayCoords.latitude},${displayCoords.longitude}`;
                window.open(mapsUrl, '_blank');
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            <Navigation className="w-5 h-5" />
            <span>Get Directions</span>
          </button>
        </motion.div>
      )}

      {/* No Location Message - only shows when we can't get coordinates from anywhere */}
      {!displayCoords && googleMapsUrl && isValidGoogleMapsUrl(googleMapsUrl) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Map Preview Not Available</h3>
              <p className="text-gray-400 text-sm">
                We couldn&apos;t extract coordinates from this URL. Try using the full Google Maps link (not a shortened URL). Click &quot;Save Location&quot; and the map will appear after our system processes it.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* How to Get Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold mb-4">How to get your Google Maps link:</h3>
        <ol className="text-gray-400 space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-sm font-medium">1</span>
            <span>Open Google Maps on your phone or computer</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-sm font-medium">2</span>
            <span>Search for your venue or navigate to your location</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-sm font-medium">3</span>
            <span>Click the "Share" button</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-sm font-medium">4</span>
            <span>Copy the link and paste it above</span>
          </li>
        </ol>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold mb-3">Why Location Matters</h3>
        <ul className="text-gray-400 text-sm space-y-2">
          <li>• Helps customers find your venue easily</li>
          <li>• Enables "Get Directions" button on your venue page</li>
          <li>• Improves your visibility in local searches</li>
        </ul>
      </motion.div>
    </div>
  );
}
