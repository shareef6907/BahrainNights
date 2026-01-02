'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Clock,
  Navigation,
  Info,
} from 'lucide-react';
import Link from 'next/link';

interface VenueProfile {
  id: string;
  name: string;
  slug: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  area?: string;
  website?: string;
  instagram?: string;
  menu_url?: string;
  booking_url?: string;
  cuisine_type?: string;
  features?: string[];
}

interface PendingChangeRequest {
  id: string;
  venue_id: string;
  changes: Record<string, unknown>;
  status: string;
  submitted_at: string;
}

export default function VenueProfilePage() {
  const [venue, setVenue] = useState<VenueProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [pendingRequest, setPendingRequest] = useState<PendingChangeRequest | null>(null);

  const [formData, setFormData] = useState({
    description: '',
    phone: '',
    address: '',
    area: '',
    website: '',
    instagram: '',
    menu_url: '',
    booking_url: '',
    cuisine_type: '',
    features: '',
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        // Load profile data
        const response = await fetch('/api/venue-portal/profile');
        if (response.ok) {
          const data = await response.json();
          setVenue(data.venue);
          setFormData({
            description: data.venue.description || '',
            phone: data.venue.phone || '',
            address: data.venue.address || '',
            area: data.venue.area || '',
            website: data.venue.website || '',
            instagram: data.venue.instagram || '',
            menu_url: data.venue.menu_url || '',
            booking_url: data.venue.booking_url || '',
            cuisine_type: data.venue.cuisine_type || '',
            features: data.venue.features?.join(', ') || '',
          });
        }

        // Check for pending change request
        const pendingResponse = await fetch('/api/venue-portal/profile/request-change');
        if (pendingResponse.ok) {
          const pendingData = await pendingResponse.json();
          setPendingRequest(pendingData.pendingRequest);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const changes = {
        ...formData,
        features: formData.features
          ? formData.features.split(',').map((f) => f.trim()).filter(Boolean)
          : [],
      };

      // Submit changes for approval instead of direct update
      const response = await fetch('/api/venue-portal/profile/request-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes }),
      });

      if (response.ok) {
        const data = await response.json();
        setPendingRequest(data.request);
        setMessage({
          type: 'success',
          text: data.message || 'Your changes have been submitted for admin approval.'
        });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to submit changes' });
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: 'An error occurred while submitting changes' });
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
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Venue Profile</h1>
        <p className="text-gray-400 mt-1">Update your venue information visible to visitors.</p>
      </div>

      {/* Pending Request Notice */}
      {pendingRequest && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
        >
          <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Profile Changes Pending Approval</p>
            <p className="text-sm text-yellow-400/80 mt-1">
              You submitted changes on {new Date(pendingRequest.submitted_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}. An admin will review your changes soon. You can update your submission below.
            </p>
          </div>
        </motion.div>
      )}

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : message.type === 'info'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : message.type === 'info' ? (
            <Info className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      {/* Venue Name (Read-only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Venue Name</p>
            <p className="text-xl font-bold text-white">{venue?.name}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          To change your venue name, please contact support.
        </p>
      </motion.div>

      {/* Profile Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6"
      >
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent resize-none"
            placeholder="Describe your venue..."
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
              placeholder="+973 XXXX XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Area
            </label>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            >
              <option value="">Select area</option>
              <option value="Manama">Manama</option>
              <option value="Seef">Seef</option>
              <option value="Juffair">Juffair</option>
              <option value="Adliya">Adliya</option>
              <option value="Amwaj">Amwaj</option>
              <option value="Riffa">Riffa</option>
              <option value="Muharraq">Muharraq</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Full Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="Building, Road, Block, Area"
          />
        </div>

        {/* Online Presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Website
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                https://
              </span>
              <input
                type="text"
                name="website"
                value={formData.website.replace(/^https?:\/\//, '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/^https?:\/\//, '');
                  setFormData((prev) => ({ ...prev, website: value ? `https://${value}` : '' }));
                }}
                className="w-full pl-20 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                placeholder="www.yourwebsite.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Instagram className="w-4 h-4 inline mr-2" />
              Instagram
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
              placeholder="@yourvenue"
            />
          </div>
        </div>

        {/* Quick Links to Hours & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl">
          <Link
            href="/venue-portal/hours"
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-400/20 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-medium">Opening Hours</p>
                <p className="text-gray-400 text-sm">Set your daily hours</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
          <Link
            href="/venue-portal/location"
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-400/20 rounded-lg">
                <Navigation className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Location</p>
                <p className="text-gray-400 text-sm">Set Google Map</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Menu URL
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                https://
              </span>
              <input
                type="text"
                name="menu_url"
                value={formData.menu_url.replace(/^https?:\/\//, '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/^https?:\/\//, '');
                  setFormData((prev) => ({ ...prev, menu_url: value ? `https://${value}` : '' }));
                }}
                className="w-full pl-20 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                placeholder="www.yourmenu.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Booking URL
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                https://
              </span>
              <input
                type="text"
                name="booking_url"
                value={formData.booking_url.replace(/^https?:\/\//, '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/^https?:\/\//, '');
                  setFormData((prev) => ({ ...prev, booking_url: value ? `https://${value}` : '' }));
                }}
                className="w-full pl-20 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                placeholder="www.booking-site.com/venue"
              />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cuisine Type
          </label>
          <input
            type="text"
            name="cuisine_type"
            value={formData.cuisine_type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="e.g., Italian, Arabic, International"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Features (comma-separated)
          </label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="e.g., Outdoor Seating, Live Music, Shisha, Valet Parking"
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-end gap-2 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {pendingRequest ? 'Update Submission' : 'Submit for Approval'}
              </>
            )}
          </button>
          <p className="text-xs text-gray-500">
            Changes require admin approval before going live.
          </p>
        </div>
      </motion.form>
    </div>
  );
}
