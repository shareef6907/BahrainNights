'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Music,
  Cigarette,
  Users,
  Calendar,
  Car,
  Wifi,
  UtensilsCrossed,
  Accessibility,
  Sparkles,
  Dumbbell,
  Waves,
  PartyPopper,
  Tv,
  CreditCard,
  Dog,
  Baby,
  Wind,
  Coffee,
  Beer,
} from 'lucide-react';

interface PlaceFeaturesProps {
  features: string[];
}

const featureIcons: Record<string, { icon: React.ElementType; color: string }> = {
  'Outdoor Seating': { icon: Sun, color: 'text-yellow-400 bg-yellow-400/10' },
  'Live Music': { icon: Music, color: 'text-purple-400 bg-purple-400/10' },
  'Shisha': { icon: Cigarette, color: 'text-orange-400 bg-orange-400/10' },
  'Family Friendly': { icon: Users, color: 'text-green-400 bg-green-400/10' },
  'Reservations': { icon: Calendar, color: 'text-blue-400 bg-blue-400/10' },
  'Parking': { icon: Car, color: 'text-cyan-400 bg-cyan-400/10' },
  'WiFi': { icon: Wifi, color: 'text-indigo-400 bg-indigo-400/10' },
  'Private Dining': { icon: UtensilsCrossed, color: 'text-pink-400 bg-pink-400/10' },
  'Wheelchair Accessible': { icon: Accessibility, color: 'text-teal-400 bg-teal-400/10' },
  'Valet Parking': { icon: Sparkles, color: 'text-amber-400 bg-amber-400/10' },
  'Gym': { icon: Dumbbell, color: 'text-red-400 bg-red-400/10' },
  'Pool Access': { icon: Waves, color: 'text-cyan-400 bg-cyan-400/10' },
  'Beach': { icon: Waves, color: 'text-blue-400 bg-blue-400/10' },
  'Private Events': { icon: PartyPopper, color: 'text-pink-400 bg-pink-400/10' },
  'Live Sports': { icon: Tv, color: 'text-green-400 bg-green-400/10' },
  'Card Payment': { icon: CreditCard, color: 'text-gray-400 bg-gray-400/10' },
  'Pet Friendly': { icon: Dog, color: 'text-amber-400 bg-amber-400/10' },
  'Kids Play Area': { icon: Baby, color: 'text-pink-400 bg-pink-400/10' },
  'Air Conditioning': { icon: Wind, color: 'text-cyan-400 bg-cyan-400/10' },
  'Breakfast': { icon: Coffee, color: 'text-amber-400 bg-amber-400/10' },
  'Happy Hour': { icon: Beer, color: 'text-yellow-400 bg-yellow-400/10' },
  'DJ': { icon: Music, color: 'text-purple-400 bg-purple-400/10' },
  'Fine Dining': { icon: Sparkles, color: 'text-yellow-400 bg-yellow-400/10' },
};

function PlaceFeatures({ features }: PlaceFeaturesProps) {
  if (features.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-white mb-4">Features & Amenities</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((feature, index) => {
          const featureConfig = featureIcons[feature] || { icon: Sparkles, color: 'text-gray-400 bg-gray-400/10' };
          const IconComponent = featureConfig.icon;

          return (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className={`p-2 rounded-lg ${featureConfig.color}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <span className="text-gray-300 text-sm font-medium">{feature}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default React.memo(PlaceFeatures);
