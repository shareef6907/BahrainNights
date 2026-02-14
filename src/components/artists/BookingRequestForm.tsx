'use client';

import { useState } from 'react';
import { Artist } from '@/types/database';

interface Props {
  artists: Artist[];
  preselectedArtist?: string | null;
  onClose: () => void;
}

const EVENT_TYPES = [
  { value: 'private_party', label: 'Private Party' },
  { value: 'corporate_event', label: 'Corporate Event' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'hotel_venue_night', label: 'Hotel/Venue Night' },
  { value: 'festival', label: 'Festival' },
  { value: 'other', label: 'Other' },
];

const BUDGET_RANGES = [
  { value: '100_250', label: '100 - 250 BHD' },
  { value: '250_500', label: '250 - 500 BHD' },
  { value: '500_plus', label: '500+ BHD' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export default function BookingRequestForm({ artists, preselectedArtist, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    event_date: '',
    event_time: '',
    event_type: '',
    venue_name: '',
    guest_count: '',
    preferred_artists: preselectedArtist ? [preselectedArtist] : [] as string[],
    budget_range: '',
    special_requirements: '',
    client_name: '',
    client_email: '',
    client_phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/artists/booking-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          guest_count: formData.guest_count ? parseInt(formData.guest_count) : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit booking request');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArtistToggle = (artistName: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_artists: prev.preferred_artists.includes(artistName)
        ? prev.preferred_artists.filter(a => a !== artistName)
        : [...prev.preferred_artists, artistName],
    }));
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full text-center border border-white/10">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-gray-400 mb-6">
            Your booking request has been submitted. Our team will get back to you within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#1a1a1a] rounded-2xl p-5 md:p-6 max-w-xl w-full mb-8 border border-white/10 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-white mb-4">Request a Booking</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Event Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.event_date}
                onChange={e => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Event Time</label>
              <input
                type="time"
                value={formData.event_time}
                onChange={e => setFormData(prev => ({ ...prev, event_time: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Event Type <span className="text-red-400">*</span>
              </label>
              <select
                required
                value={formData.event_type}
                onChange={e => setFormData(prev => ({ ...prev, event_type: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
              >
                <option value="">Select type...</option>
                {EVENT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Estimated Guests</label>
              <input
                type="number"
                min="1"
                value={formData.guest_count}
                onChange={e => setFormData(prev => ({ ...prev, guest_count: e.target.value }))}
                placeholder="e.g. 100"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Venue / Location</label>
            <input
              type="text"
              value={formData.venue_name}
              onChange={e => setFormData(prev => ({ ...prev, venue_name: e.target.value }))}
              placeholder="e.g. Four Seasons Hotel"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
            />
          </div>

          {/* Preferred Artists */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Preferred Artist(s)</label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-white/5 border border-white/10 rounded-lg">
              {artists.map(artist => (
                <button
                  key={artist.id}
                  type="button"
                  onClick={() => handleArtistToggle(artist.stage_name)}
                  className={`px-2 py-1 rounded-full text-xs transition-colors ${
                    formData.preferred_artists.includes(artist.stage_name)
                      ? 'bg-amber-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {artist.stage_name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Budget Range</label>
              <select
                value={formData.budget_range}
                onChange={e => setFormData(prev => ({ ...prev, budget_range: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
              >
                <option value="">Select...</option>
                {BUDGET_RANGES.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Special Requirements</label>
              <input
                type="text"
                value={formData.special_requirements}
                onChange={e => setFormData(prev => ({ ...prev, special_requirements: e.target.value }))}
                placeholder="Equipment, preferences..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="pt-3 border-t border-white/10">
            <h3 className="text-sm font-semibold text-white mb-3">Your Contact Details</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={e => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.client_phone}
                  onChange={e => setFormData(prev => ({ ...prev, client_phone: e.target.value }))}
                  placeholder="+973"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.client_email}
                onChange={e => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Booking Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
