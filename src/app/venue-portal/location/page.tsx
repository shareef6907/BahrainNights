'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Link as LinkIcon,
} from 'lucide-react';

export default function VenueLocationPage() {
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

      {/* How to Get Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
