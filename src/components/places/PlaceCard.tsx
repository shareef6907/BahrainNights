'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Navigation, Instagram, Star } from 'lucide-react';
import { LikeButton } from '@/components/ui/LikeButton';

export interface OpeningHours {
  [key: string]: { open: string; close: string } | 'closed';
}

export interface Place {
  id: string;
  name: string;
  slug: string;
  category: string; // More flexible to support any category from database
  subcategory: string[];
  description: string;
  address: string;
  area: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  openingHours: OpeningHours;
  features: string[];
  images: string[];
  logo: string;
  upcomingEventsCount: number;
  likeCount?: number; // For sorting by popularity
  is_featured?: boolean; // Featured venues appear at top with badge
}

interface PlaceCardProps {
  place: Place;
  index: number;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  restaurant: { bg: 'bg-orange-500', text: 'text-orange-500' },
  cafe: { bg: 'bg-amber-600', text: 'text-amber-600' },
  lounge: { bg: 'bg-purple-500', text: 'text-purple-500' },
  bar: { bg: 'bg-blue-500', text: 'text-blue-500' },
  nightclub: { bg: 'bg-pink-500', text: 'text-pink-500' },
  'beach-club': { bg: 'bg-cyan-500', text: 'text-cyan-500' },
};

const categoryLabels: Record<string, string> = {
  restaurant: 'Restaurant',
  cafe: 'Cafe',
  lounge: 'Lounge',
  bar: 'Bar',
  nightclub: 'Nightclub',
  'beach-club': 'Beach Club',
};

function PlaceCard({ place, index }: PlaceCardProps) {
  const isOpenNow = () => {
    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[now.getDay()];
    const hours = place.openingHours[today];

    if (hours === 'closed') return false;
    if (!hours) return false;

    const currentTime = now.getHours() * 100 + now.getMinutes();
    const openTime = parseInt(hours.open.replace(':', ''));
    let closeTime = parseInt(hours.close.replace(':', ''));

    // Handle venues that close after midnight
    if (closeTime < openTime) {
      return currentTime >= openTime || currentTime <= closeTime;
    }

    return currentTime >= openTime && currentTime <= closeTime;
  };

  const open = isOpenNow();
  const colors = categoryColors[place.category] || categoryColors.restaurant;

  const handlePhone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${place.phone}`;
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`, '_blank');
  };

  const handleInstagram = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (place.instagram) {
      window.open(`https://instagram.com/${place.instagram}`, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' as const }}
    >
      <Link href={`/places/${place.slug}`}>
        <div className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={place.images[0]}
              alt={place.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />

            {/* Category Badge */}
            <div className={`absolute top-3 left-3 px-3 py-1 ${colors.bg} rounded-full`}>
              <span className="text-xs font-bold text-white">
                {categoryLabels[place.category]}
              </span>
            </div>

            {/* Featured Badge */}
            {place.is_featured && (
              <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 text-black fill-black" />
                <span className="text-xs font-bold text-black">Featured</span>
              </div>
            )}

            {/* Logo */}
            <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl shadow-lg overflow-hidden ring-2 ring-white/20">
              <Image
                src={place.logo}
                alt={`${place.name} logo`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <motion.div
                className="px-4 py-2 bg-white text-black font-semibold rounded-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.div>
              {place.upcomingEventsCount > 0 && (
                <motion.div
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {place.upcomingEventsCount} Events
                </motion.div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Name and Open Status */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                {place.name}
              </h3>
              <div className={`flex items-center gap-1.5 flex-shrink-0 ${open ? 'text-green-400' : 'text-red-400'}`}>
                <div className={`w-2 h-2 rounded-full ${open ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-xs font-medium">{open ? 'Open' : 'Closed'}</span>
              </div>
            </div>

            {/* Cuisine/Type Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {place.subcategory.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-0.5 text-xs font-medium ${colors.text} bg-white/5 rounded-md`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{place.area}</span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
              {place.description}
            </p>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                onClick={handlePhone}
                className="flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-green-500/20 hover:text-green-400 rounded-lg text-gray-400 transition-colors"
                title="Call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={handleDirections}
                className="flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg text-gray-400 transition-colors"
                title="Directions"
              >
                <Navigation className="w-4 h-4" />
              </button>
              {place.instagram && (
                <button
                  onClick={handleInstagram}
                  className="flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-pink-500/20 hover:text-pink-400 rounded-lg text-gray-400 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </button>
              )}
              <div className="ml-auto" onClick={(e) => e.preventDefault()}>
                <LikeButton
                  venueId={place.id}
                  initialLikeCount={place.likeCount || 0}
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders in lists
export default React.memo(PlaceCard, (prevProps, nextProps) => {
  return (
    prevProps.place.id === nextProps.place.id &&
    prevProps.index === nextProps.index
  );
});
