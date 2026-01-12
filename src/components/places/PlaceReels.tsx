'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X, ChevronLeft, ChevronRight } from 'lucide-react';
import InstagramReelEmbed from './InstagramReelEmbed';

export interface VenueReel {
  id: string;
  venue_id: string;
  instagram_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface PlaceReelsProps {
  reels: VenueReel[];
  venueName: string;
}

export default function PlaceReels({ reels, venueName }: PlaceReelsProps) {
  const [selectedReelIndex, setSelectedReelIndex] = useState<number | null>(null);

  // Filter to only show active reels and sort by display order
  const activeReels = reels
    .filter(reel => reel.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  if (!activeReels || activeReels.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    if (selectedReelIndex !== null && selectedReelIndex > 0) {
      setSelectedReelIndex(selectedReelIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedReelIndex !== null && selectedReelIndex < activeReels.length - 1) {
      setSelectedReelIndex(selectedReelIndex + 1);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Instagram className="w-6 h-6 text-pink-500" />
          Reels
          <span className="text-sm font-normal text-gray-400">({activeReels.length})</span>
        </h2>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {activeReels.map((reel, index) => (
            <motion.button
              key={reel.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedReelIndex(index)}
              className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-900 border border-white/10 hover:border-pink-500/50 transition-all"
            >
              {/* Thumbnail - using Instagram embed as preview */}
              <div className="absolute inset-0">
                <InstagramReelEmbed reelUrl={reel.instagram_url} className="w-full h-full pointer-events-none" />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                <span className="flex items-center gap-1 text-white text-sm font-medium">
                  <Instagram className="w-4 h-4" />
                  View Reel
                </span>
              </div>

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedReelIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedReelIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReelIndex(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation - Previous */}
            {selectedReelIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Navigation - Next */}
            {selectedReelIndex < activeReels.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Reel Content */}
            <motion.div
              key={activeReels[selectedReelIndex].id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <InstagramReelEmbed
                reelUrl={activeReels[selectedReelIndex].instagram_url}
                className="w-full"
              />

              {/* Counter */}
              <p className="text-center text-gray-400 mt-4 text-sm">
                {selectedReelIndex + 1} of {activeReels.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
