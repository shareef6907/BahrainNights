'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, MapPin, Sparkles, Wine, UtensilsCrossed, Tag } from 'lucide-react';
import { Offer } from './OfferCard';

interface OffersByDayProps {
  offers: Offer[];
  onOfferClick: (offer: Offer) => void;
}

const daysOfWeek = [
  { id: 'sunday', label: 'Sunday', short: 'Sun' },
  { id: 'monday', label: 'Monday', short: 'Mon' },
  { id: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { id: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { id: 'thursday', label: 'Thursday', short: 'Thu' },
  { id: 'friday', label: 'Friday', short: 'Fri' },
  { id: 'saturday', label: 'Saturday', short: 'Sat' },
];

const offerTypeConfig: Record<string, {
  icon: React.ElementType;
  gradient: string;
  bgGradient: string;
  color: string;
}> = {
  'ladies-night': {
    icon: Sparkles,
    gradient: 'from-pink-500 to-purple-500',
    bgGradient: 'from-pink-500/10 to-purple-500/10',
    color: 'text-pink-400',
  },
  'happy-hour': {
    icon: Wine,
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-500/10 to-orange-500/10',
    color: 'text-yellow-400',
  },
  'brunch': {
    icon: UtensilsCrossed,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/10 to-amber-500/10',
    color: 'text-orange-400',
  },
  'special': {
    icon: Tag,
    gradient: 'from-blue-500 to-indigo-500',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
    color: 'text-blue-400',
  },
};

interface DayRowProps {
  offer: Offer;
  onClick: () => void;
}

function DayOfferRow({ offer, onClick }: DayRowProps) {
  const config = offerTypeConfig[offer.type] || offerTypeConfig.special;
  const IconComponent = config.icon;

  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 bg-gradient-to-r ${config.bgGradient} hover:bg-white/10 rounded-xl transition-all group text-left`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Venue Logo */}
      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-lg">
        <Image
          src={offer.venue.logo}
          alt={offer.venue.name}
          fill
          className="object-contain p-1"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className={`px-2 py-0.5 bg-gradient-to-r ${config.gradient} rounded-full flex items-center gap-1`}>
            <IconComponent className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">{config.color.replace('text-', '').replace('-400', '')}</span>
          </div>
          {offer.isNew && (
            <span className="px-1.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">NEW</span>
          )}
        </div>

        <h4 className="text-white font-bold text-lg group-hover:text-yellow-400 transition-colors truncate">
          {offer.title}
        </h4>

        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{offer.venue.name}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>{offer.time}</span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        {offer.price && (
          <span className={`text-lg font-bold ${config.color}`}>{offer.price}</span>
        )}
        {offer.discount && (
          <span className="block text-xs text-yellow-400 font-medium">{offer.discount}</span>
        )}
      </div>

      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors flex-shrink-0" />
    </motion.button>
  );
}

export default function OffersByDay({ offers, onOfferClick }: OffersByDayProps) {
  const todayIndex = new Date().getDay();
  const [expandedDays, setExpandedDays] = useState<string[]>([daysOfWeek[todayIndex].id]);

  const toggleDay = (dayId: string) => {
    setExpandedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((d) => d !== dayId)
        : [...prev, dayId]
    );
  };

  const getOffersForDay = (dayId: string) => {
    return offers.filter((offer) =>
      offer.days.some((d) => d.toLowerCase() === dayId.toLowerCase())
    );
  };

  return (
    <div className="space-y-3">
      {daysOfWeek.map((day, index) => {
        const dayOffers = getOffersForDay(day.id);
        const isToday = index === todayIndex;
        const isExpanded = expandedDays.includes(day.id);
        const hasOffers = dayOffers.length > 0;

        return (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white/5 backdrop-blur-sm border rounded-2xl overflow-hidden ${
              isToday ? 'border-yellow-500/50' : 'border-white/10'
            }`}
          >
            {/* Day Header */}
            <button
              onClick={() => hasOffers && toggleDay(day.id)}
              disabled={!hasOffers}
              className={`w-full flex items-center justify-between p-4 ${
                hasOffers ? 'hover:bg-white/5 cursor-pointer' : 'cursor-default opacity-60'
              } transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                    isToday
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                      : hasOffers
                      ? 'bg-white/10 text-white'
                      : 'bg-white/5 text-gray-500'
                  }`}
                >
                  {day.short}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold ${isToday ? 'text-yellow-400' : hasOffers ? 'text-white' : 'text-gray-500'}`}>
                      {day.label}
                    </h3>
                    {isToday && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">
                        TODAY
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {hasOffers ? `${dayOffers.length} ${dayOffers.length === 1 ? 'offer' : 'offers'} available` : 'No offers'}
                  </p>
                </div>
              </div>

              {hasOffers && (
                <div className={`p-2 rounded-lg ${isExpanded ? 'bg-white/10' : ''} transition-colors`}>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              )}
            </button>

            {/* Offers List */}
            <AnimatePresence>
              {isExpanded && hasOffers && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2">
                    {dayOffers.map((offer) => (
                      <DayOfferRow
                        key={offer.id}
                        offer={offer}
                        onClick={() => onOfferClick(offer)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
