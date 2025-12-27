'use client';

import { motion } from 'framer-motion';
import OfferCard, { Offer } from './OfferCard';
import { Frown } from 'lucide-react';

interface OfferGridProps {
  offers: Offer[];
  onOfferClick: (offer: Offer) => void;
  loading?: boolean;
}

export default function OfferGrid({ offers, onOfferClick, loading }: OfferGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-slate-800/50 rounded-2xl overflow-hidden"
          >
            <div className="aspect-[16/10] bg-slate-700" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-700 rounded w-2/3" />
              <div className="h-6 bg-slate-700 rounded w-3/4" />
              <div className="h-4 bg-slate-700 rounded w-full" />
              <div className="flex gap-2">
                <div className="h-6 bg-slate-700 rounded w-16" />
                <div className="h-6 bg-slate-700 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <Frown className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Offers Found</h3>
        <p className="text-gray-400 max-w-md">
          We couldn&apos;t find any offers matching your criteria. Try adjusting your filters or check back later for new deals.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {offers.map((offer, index) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          index={index}
          onClick={onOfferClick}
        />
      ))}
    </div>
  );
}
