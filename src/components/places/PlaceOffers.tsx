'use client';

import { motion } from 'framer-motion';
import { Tag, Clock, Calendar, Gift, Sparkles } from 'lucide-react';

export interface PlaceOffer {
  id: string;
  title: string;
  day: string;
  description: string;
  validUntil?: string;
  type?: 'ladies-night' | 'happy-hour' | 'brunch' | 'special';
}

interface PlaceOffersProps {
  offers: PlaceOffer[];
}

const offerStyles: Record<string, { icon: React.ElementType; gradient: string; badge: string }> = {
  'ladies-night': {
    icon: Sparkles,
    gradient: 'from-pink-500/10 to-purple-500/10',
    badge: 'bg-pink-500',
  },
  'happy-hour': {
    icon: Clock,
    gradient: 'from-yellow-500/10 to-orange-500/10',
    badge: 'bg-yellow-500',
  },
  'brunch': {
    icon: Gift,
    gradient: 'from-orange-500/10 to-amber-500/10',
    badge: 'bg-orange-500',
  },
  'special': {
    icon: Tag,
    gradient: 'from-blue-500/10 to-indigo-500/10',
    badge: 'bg-blue-500',
  },
};

export default function PlaceOffers({ offers }: PlaceOffersProps) {
  if (offers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Current Offers</h2>
      </div>

      <div className="space-y-3">
        {offers.map((offer, index) => {
          const style = offerStyles[offer.type || 'special'] || offerStyles.special;
          const IconComponent = style.icon;

          return (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 bg-gradient-to-r ${style.gradient} rounded-xl border border-white/10 overflow-hidden group hover:border-white/20 transition-all`}
            >
              {/* Badge */}
              <div className={`absolute top-3 right-3 px-2 py-1 ${style.badge} rounded-full`}>
                <span className="text-xs font-bold text-white">{offer.day}</span>
              </div>

              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="p-2 bg-white/10 rounded-lg">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 pr-20">
                  <h3 className="text-white font-bold mb-1">{offer.title}</h3>
                  <p className="text-gray-400 text-sm">{offer.description}</p>
                  {offer.validUntil && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>Valid: {offer.validUntil}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
