'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ExternalLink, Tag, Navigation } from 'lucide-react';
import Image from 'next/image';

export interface AttractionData {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  price_currency: string;
  image_url: string | null;
  cover_url?: string | null;
  venue: string | null;
  location: string | null;
  category: string | null;
  type: string;
  affiliate_url: string;
  source: string | null;
  google_maps_url: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface AttractionModalProps {
  attraction: AttractionData | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, string> = {
  'water-sports': '🏄',
  'boat-tour': '⛵',
  'boat-tours': '⛵',
  'desert-safari': '🏜️',
  'indoor': '🎮',
  'indoor-activities': '🎮',
  'tour': '🗺️',
  'tours': '🗺️',
  'sightseeing': '🏛️',
  'theme-park': '🎢',
  'theme-parks': '🎢',
  'attraction': '🎯',
  'attractions': '🎯',
  'Family & Kids': '👨‍👩‍👧‍👦',
  'family-kids': '👨‍👩‍👧‍👦',
};

const categoryLabels: Record<string, string> = {
  'water-sports': 'Water Sports',
  'boat-tour': 'Boat Tours',
  'boat-tours': 'Boat Tours',
  'desert-safari': 'Desert Safari',
  'indoor': 'Indoor Activities',
  'indoor-activities': 'Indoor activities',
  'tour': 'Tours',
  'tours': 'Tours',
  'sightseeing': 'Sightseeing',
  'theme-park': 'Theme Parks',
  'theme-parks': 'Theme parks',
  'attraction': 'Attractions',
  'attractions': 'Attractions',
  'Family & Kids': 'Family & Kids',
  'family-kids': 'Family & Kids',
};

export default function AttractionModal({
  attraction,
  isOpen,
  onClose,
}: AttractionModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!attraction) return null;

  const getCategoryLabel = (cat: string | null) => {
    if (!cat) return 'Attraction';
    const label = categoryLabels[cat];
    if (label) {
      return label;
    }
    return cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
  };

  const getCategoryIcon = (cat: string | null) => {
    if (!cat) return '🎯';
    return categoryIcons[cat] || '🎯';
  };

  // Use cover_url if available, fallback to image_url
  const coverImage = attraction.cover_url || attraction.image_url ||
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop';

  // Use image_url for thumbnail
  const thumbnailImage = attraction.image_url ||
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[95] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-full flex items-start justify-center p-4 pt-10 pb-20">
              <motion.div
                className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
                data-testid="attraction-modal"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Cover Image */}
                <div className="relative h-[250px] md:h-[300px]">
                  <Image
                    src={coverImage}
                    alt={attraction.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Category Badge on Cover */}
                  {attraction.category && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-teal-500/90 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center gap-2">
                      <span>{getCategoryIcon(attraction.category)}</span>
                      <span>{getCategoryLabel(attraction.category)}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative -mt-24 px-6 pb-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Thumbnail Image */}
                    <div className="relative w-[140px] md:w-[180px] aspect-square rounded-xl overflow-hidden shadow-2xl flex-shrink-0 mx-auto md:mx-0 border-4 border-slate-900">
                      <Image
                        src={thumbnailImage}
                        alt={attraction.title}
                        fill
                        className="object-cover"
                        sizes="180px"
                        unoptimized
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-4 md:pt-16">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center md:text-left">
                        {attraction.title}
                      </h2>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        {/* Location */}
                        {(attraction.venue || attraction.location) && (
                          <div className="flex items-center gap-1 text-gray-300">
                            <MapPin className="w-4 h-4 text-teal-400" />
                            <span>{attraction.venue || attraction.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Category Tag */}
                      {attraction.category && (
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                          <span className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                            <Tag className="w-3 h-3" />
                            {getCategoryLabel(attraction.category)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {attraction.description && (
                    <div className="mt-6 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">About</h3>
                      <p className="text-gray-300 leading-relaxed">{attraction.description}</p>
                    </div>
                  )}

                  {/* Venue/Location Details */}
                  {attraction.venue && attraction.location && (
                    <div className="mt-4 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">Location</h3>
                      <div className="flex items-start gap-2 text-gray-300">
                        <MapPin className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{attraction.venue}</p>
                          <p className="text-sm text-gray-400">{attraction.location}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button Section - Book Now for Platinumlist, Google Maps for manual */}
                  <div className="mt-6">
                    {attraction.source === 'platinumlist' && attraction.affiliate_url ? (
                      <>
                        <a
                          href={attraction.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-lg rounded-xl transition-all hover:shadow-lg hover:shadow-teal-500/25 hover:scale-[1.02]"
                        >
                          <span>Book Now</span>
                          <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <p className="text-center text-gray-400 text-sm mt-2">
                          You will be redirected to Platinumlist to complete your booking
                        </p>
                      </>
                    ) : (
                      <>
                        <a
                          href={
                            attraction.google_maps_url ||
                            (attraction.latitude && attraction.longitude
                              ? `https://www.google.com/maps?q=${attraction.latitude},${attraction.longitude}`
                              : `https://www.google.com/maps/search/${encodeURIComponent(
                                  `${attraction.title} ${attraction.venue || ''} ${attraction.location || ''} Bahrain`
                                )}`
                            )
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-bold text-lg rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]"
                        >
                          <Navigation className="w-5 h-5" />
                          <span>View on Google Maps</span>
                          <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <p className="text-center text-gray-400 text-sm mt-2">
                          Click to get directions in Google Maps
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
