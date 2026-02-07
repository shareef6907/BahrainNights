'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Calendar, MapPin, Ticket, Share2, Clock, Globe, ExternalLink } from 'lucide-react';

interface RegionalEvent {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  country: string;
  city: string | null;
  category: string;
  event_date: string | null;
  event_end_date: string | null;
  event_venue: string | null;
  affiliate_url: string | null;
  isEvent?: boolean;
}

// Helper function to format event dates nicely
function formatEventDate(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const startStr = start.toLocaleDateString('en-US', options);

  if (endDate) {
    const end = new Date(endDate);
    // If same day, just show one date
    if (start.toDateString() === end.toDateString()) {
      return startStr;
    }
    // If same month, show range
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`;
    }
    // Different months
    const endStr = end.toLocaleDateString('en-US', options);
    return `${startStr} - ${endStr}`;
  }

  return startStr;
}

// Format short date for badge
function formatShortDate(dateStr: string): { day: string; month: string; year: string } {
  const date = new Date(dateStr);
  return {
    day: date.getDate().toString(),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    year: date.getFullYear().toString(),
  };
}

// Get days until event
function getDaysUntil(dateStr: string): string {
  const eventDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today!';
  if (diffDays === 1) return 'Tomorrow!';
  if (diffDays < 0) return 'Ongoing';
  if (diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays <= 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
  return `In ${Math.ceil(diffDays / 30)} months`;
}

const countryFlags: Record<string, string> = {
  'Bahrain': '🇧🇭',
  'bahrain': '🇧🇭',
  'UAE': '🇦🇪',
  'uae': '🇦🇪',
  'United Arab Emirates': '🇦🇪',
  'Saudi Arabia': '🇸🇦',
  'saudi-arabia': '🇸🇦',
  'Qatar': '🇶🇦',
  'qatar': '🇶🇦',
  'Kuwait': '🇰🇼',
  'kuwait': '🇰🇼',
  'Oman': '🇴🇲',
  'oman': '🇴🇲',
  'Egypt': '🇪🇬',
  'egypt': '🇪🇬',
  'UK': '🇬🇧',
  'uk': '🇬🇧',
  'United Kingdom': '🇬🇧',
};

const categoryColors: Record<string, string> = {
  'concert': 'from-purple-500 to-pink-500',
  'music': 'from-purple-500 to-pink-500',
  'party': 'from-pink-500 to-red-500',
  'nightlife': 'from-indigo-500 to-purple-500',
  'sports': 'from-green-500 to-emerald-500',
  'comedy': 'from-yellow-500 to-orange-500',
  'theatre': 'from-red-500 to-pink-500',
  'festival': 'from-orange-500 to-yellow-500',
  'family': 'from-blue-500 to-cyan-500',
  'food': 'from-orange-500 to-red-500',
  'default': 'from-yellow-500 to-orange-500',
};

interface EventModalProps {
  event: RegionalEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsVisible(false), 400);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  const handleShare = async () => {
    const url = event?.affiliate_url || `${window.location.origin}/regional`;
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: event?.title, 
          text: `Check out ${event?.title}!`,
          url 
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  };

  if (!isVisible || !event) return null;

  const categoryGradient = categoryColors[event.category?.toLowerCase()] || categoryColors.default;
  const dateInfo = event.event_date ? formatShortDate(event.event_date) : null;
  const daysUntil = event.event_date ? getDaysUntil(event.event_date) : null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out ${
        isAnimating ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent pointer-events-none'
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-gray-950 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-500 ease-out transform ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black p-2 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={24} className="text-white" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Image */}
          <div className="relative aspect-[16/9]">
            {event.featured_image ? (
              <img
                src={event.featured_image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${categoryGradient}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

            {/* Category Badge */}
            {event.category && (
              <span className={`absolute top-4 left-4 bg-gradient-to-r ${categoryGradient} text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg`}>
                {event.category}
              </span>
            )}

            {/* Date Badge */}
            {dateInfo && (
              <div className="absolute bottom-4 left-4 bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl">
                <div className="bg-red-500 text-white text-xs font-bold text-center py-1 px-4">
                  {dateInfo.month}
                </div>
                <div className="px-4 py-2 text-center">
                  <div className="text-3xl font-black">{dateInfo.day}</div>
                  <div className="text-xs text-gray-500">{dateInfo.year}</div>
                </div>
              </div>
            )}

            {/* Days Until Badge */}
            {daysUntil && (
              <div className="absolute bottom-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                ⏰ {daysUntil}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-6 md:px-8 pb-8 pt-6">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {event.title}
            </h1>

            {/* Event Details */}
            <div className="space-y-3 mb-6">
              {/* Date */}
              {event.event_date && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="font-medium">
                    {formatEventDate(event.event_date, event.event_end_date)}
                  </span>
                </div>
              )}

              {/* Venue */}
              {event.event_venue && (
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span>{event.event_venue}</span>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-3 text-gray-300">
                <Globe className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span>
                  {countryFlags[event.country] || '📍'} {event.city ? `${event.city}, ` : ''}{event.country}
                </span>
              </div>
            </div>

            {/* Description */}
            {event.excerpt && (
              <div className="mb-8">
                <p className="text-gray-300 leading-relaxed">
                  {event.excerpt}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-gray-800 mb-6" />

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Primary CTA - Book Tickets */}
              {event.affiliate_url ? (
                <a
                  href={event.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/25 text-lg"
                >
                  <Ticket className="w-6 h-6" />
                  Book Tickets on Platinumlist
                  <ExternalLink className="w-5 h-5" />
                </a>
              ) : (
                <div className="w-full flex items-center justify-center gap-3 bg-gray-700 text-gray-300 font-bold px-8 py-4 rounded-2xl text-lg cursor-not-allowed">
                  <Clock className="w-6 h-6" />
                  Tickets Coming Soon
                </div>
              )}

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl transition-all duration-300"
                >
                  <Share2 size={18} />
                  Share Event
                </button>
                {event.country === 'Bahrain' && (
                  <a
                    href={`/events/${event.slug}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl transition-all duration-300"
                  >
                    <ExternalLink size={18} />
                    View Details
                  </a>
                )}
              </div>
            </div>

            {/* Footer Note */}
            <p className="text-center text-gray-500 text-sm mt-6">
              Tickets available on Platinumlist • Prices may vary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
