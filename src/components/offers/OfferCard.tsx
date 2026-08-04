'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Clock, Sparkles, Wine, UtensilsCrossed, Tag, ChevronRight } from 'lucide-react';

export interface Offer {
  id: string;
  title: string;
  slug: string;
  venue: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    image: string;
    area: string;
    category: string;
  };
  type: 'ladies-night' | 'happy-hour' | 'brunch' | 'special';
  description: string;
  shortDescription: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  days: string[];
  time: string;
  validUntil?: string;
  terms?: string[];
  highlights: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isEndingSoon?: boolean;
}

interface OfferCardProps {
  offer: Offer;
  index: number;
  onClick: (offer: Offer) => void;
}

const offerTypeConfig: Record<string, {
  icon: React.ElementType;
  gradient: string;
  badge: string;
  bgGradient: string;
  label: string;
}> = {
  'ladies-night': {
    icon: Sparkles,
    gradient: 'from-pink-500 to-purple-500',
    badge: 'bg-gradient-to-r from-pink-500 to-purple-500',
    bgGradient: 'from-pink-500/10 via-transparent to-purple-500/10',
    label: 'Ladies Night',
  },
  'happy-hour': {
    icon: Wine,
    gradient: 'from-yellow-500 to-orange-500',
    badge: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-500/10 via-transparent to-orange-500/10',
    label: 'Happy Hour',
  },
  'brunch': {
    icon: UtensilsCrossed,
    gradient: 'from-orange-500 to-amber-500',
    badge: 'bg-gradient-to-r from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/10 via-transparent to-amber-500/10',
    label: 'Brunch',
  },
  'special': {
    icon: Tag,
    gradient: 'from-blue-500 to-indigo-500',
    badge: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    bgGradient: 'from-blue-500/10 via-transparent to-indigo-500/10',
    label: 'Special Deal',
  },
};

function OfferCard({ offer, index, onClick }: OfferCardProps) {
  const config = offerTypeConfig[offer.type] || offerTypeConfig.special;
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
      onClick={() => onClick(offer)}
      className="group cursor-pointer"
    >
      <div className={`relative bg-slate-800/50 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20`}>
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={offer.venue.image}
            alt={offer.venue.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

          {/* Type Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1.5 ${config.badge} rounded-full flex items-center gap-1.5 shadow-lg`}>
            <IconComponent className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-bold text-white">{config.label}</span>
          </div>

          {/* Status Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {offer.isNew && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                NEW
              </span>
            )}
            {offer.isEndingSoon && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                ENDING SOON
              </span>
            )}
            {offer.discount && (
              <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {offer.discount}
              </span>
            )}
          </div>

          {/* Venue Logo */}
          <div className="absolute bottom-3 left-3 w-12 h-12 bg-white rounded-xl shadow-lg overflow-hidden">
            <Image
              src={offer.venue.logo}
              alt={`${offer.venue.name} logo`}
              fill
              className="object-contain p-1"
              sizes="48px"
            />
          </div>

          {/* Days Badge */}
          <div className="absolute bottom-3 right-3 flex gap-1">
            {offer.days.slice(0, 3).map((day) => (
              <span
                key={day}
                className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg"
              >
                {day.slice(0, 3)}
              </span>
            ))}
            {offer.days.length > 3 && (
              <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                +{offer.days.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={`p-4 bg-gradient-to-r ${config.bgGradient}`}>
          {/* Venue Name */}
          <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{offer.venue.name} • {offer.venue.area}</span>
          </div>

          {/* Offer Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2 mb-2">
            {offer.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
            {offer.shortDescription}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {offer.highlights.slice(0, 3).map((highlight, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs font-medium text-white/80 bg-white/5 rounded-md"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Time and Price */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>{offer.time}</span>
            </div>

            <div className="flex items-center gap-2">
              {offer.originalPrice && (
                <span className="text-gray-500 text-sm line-through">{offer.originalPrice}</span>
              )}
              {offer.price && (
                <span className={`text-lg font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                  {offer.price}
                </span>
              )}
            </div>
          </div>

          {/* View Details Arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center`}>
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders in lists
export default React.memo(OfferCard, (prevProps, nextProps) => {
  return (
    prevProps.offer.id === nextProps.offer.id &&
    prevProps.index === nextProps.index &&
    prevProps.onClick === nextProps.onClick
  );
});
