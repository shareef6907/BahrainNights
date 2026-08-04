'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Sparkles, Wine, UtensilsCrossed, Tag, ChevronRight, Bell, Calendar, TrendingUp } from 'lucide-react';
import { Offer } from './OfferCard';

interface TodaysOffersProps {
  todayOffers: Offer[];
  weekendOffers: Offer[];
  newOffers: Offer[];
  onOfferClick: (offer: Offer) => void;
}

const offerTypeConfig: Record<string, {
  icon: React.ElementType;
  gradient: string;
  color: string;
}> = {
  'ladies-night': {
    icon: Sparkles,
    gradient: 'from-pink-500 to-purple-500',
    color: 'text-pink-400',
  },
  'happy-hour': {
    icon: Wine,
    gradient: 'from-yellow-500 to-orange-500',
    color: 'text-yellow-400',
  },
  'brunch': {
    icon: UtensilsCrossed,
    gradient: 'from-orange-500 to-amber-500',
    color: 'text-orange-400',
  },
  'special': {
    icon: Tag,
    gradient: 'from-blue-500 to-indigo-500',
    color: 'text-blue-400',
  },
};

interface OfferMiniCardProps {
  offer: Offer;
  onClick: () => void;
}

function OfferMiniCard({ offer, onClick }: OfferMiniCardProps) {
  const config = offerTypeConfig[offer.type] || offerTypeConfig.special;
  const IconComponent = config.icon;

  return (
    <motion.button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left group"
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Venue Logo */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white">
        <Image
          src={offer.venue.logo}
          alt={offer.venue.name}
          fill
          className="object-contain p-1"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <IconComponent className={`w-3.5 h-3.5 ${config.color}`} />
          <span className="text-xs text-gray-400">{offer.venue.name}</span>
        </div>
        <p className="text-white font-medium text-sm truncate group-hover:text-yellow-400 transition-colors">
          {offer.title}
        </p>
        <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-xs">
          <Clock className="w-3 h-3" />
          <span>{offer.time}</span>
        </div>
      </div>

      {/* Price or Arrow */}
      {offer.price ? (
        <span className={`text-sm font-bold ${config.color}`}>{offer.price}</span>
      ) : (
        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-yellow-400 transition-colors" />
      )}
    </motion.button>
  );
}

export default function TodaysOffers({
  todayOffers,
  weekendOffers,
  newOffers,
  onOfferClick,
}: TodaysOffersProps) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-6">
      {/* Today's Offers */}
      {todayOffers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-bold">Today&apos;s Offers</h3>
              <p className="text-gray-400 text-xs">{today}</p>
            </div>
          </div>

          <div className="space-y-2">
            {todayOffers.slice(0, 4).map((offer) => (
              <OfferMiniCard
                key={offer.id}
                offer={offer}
                onClick={() => onOfferClick(offer)}
              />
            ))}
          </div>

          {todayOffers.length > 4 && (
            <button className="w-full mt-3 py-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
              View all {todayOffers.length} offers →
            </button>
          )}
        </motion.div>
      )}

      {/* This Weekend */}
      {weekendOffers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-bold">This Weekend</h3>
              <p className="text-gray-400 text-xs">Best picks for Fri-Sat</p>
            </div>
          </div>

          <div className="space-y-2">
            {weekendOffers.slice(0, 3).map((offer) => (
              <OfferMiniCard
                key={offer.id}
                offer={offer}
                onClick={() => onOfferClick(offer)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* New This Week */}
      {newOffers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-white font-bold">New This Week</h3>
              <p className="text-gray-400 text-xs">Fresh offers added</p>
            </div>
          </div>

          <div className="space-y-2">
            {newOffers.slice(0, 3).map((offer) => (
              <OfferMiniCard
                key={offer.id}
                offer={offer}
                onClick={() => onOfferClick(offer)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Bell className="w-5 h-5 text-yellow-400" />
          </div>
          <h3 className="text-white font-bold">Never Miss a Deal</h3>
        </div>

        <p className="text-gray-300 text-sm mb-4">
          Get the best offers delivered to your inbox every week.
        </p>

        <form className="space-y-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500/50"
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-semibold text-black hover:opacity-90 transition-opacity"
          >
            Subscribe Free
          </button>
        </form>

        <p className="text-gray-500 text-xs mt-2 text-center">
          Unsubscribe anytime. No spam.
        </p>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
      >
        <h3 className="text-white font-bold mb-3">Quick Links</h3>
        <div className="space-y-2">
          <Link
            href="/places"
            className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <span className="text-gray-300 text-sm">Browse All Venues</span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </Link>
          <Link
            href="/events"
            className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <span className="text-gray-300 text-sm">Upcoming Events</span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </Link>
          <Link
            href="/dining"
            className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <span className="text-gray-300 text-sm">Dining & Nightlife</span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
