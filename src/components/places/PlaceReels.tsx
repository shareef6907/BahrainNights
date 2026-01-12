'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { extractInstagramReelId, getInstagramReelUrl } from '@/lib/utils/instagram';

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
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());

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

  const handleReelClick = (index: number) => {
    setSelectedReelIndex(index);
    // Mark this iframe as loaded
    setLoadedIframes(prev => new Set(prev).add(index));
  };

  const handleClose = () => {
    setSelectedReelIndex(null);
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
          <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          Reels
          <span className="text-sm font-normal text-gray-400">({activeReels.length})</span>
        </h2>

        {/* Reels Grid - Clean thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {activeReels.map((reel, index) => (
            <motion.button
              key={reel.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleReelClick(index)}
              className="group relative aspect-[9/16] rounded-xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all"
            >
              {/* Instagram Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />

              {/* Overlay pattern */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all"
                >
                  <Play className="w-7 h-7 text-white ml-1" fill="white" />
                </motion.div>
              </div>

              {/* Reel indicator */}
              <div className="absolute top-3 right-3">
                <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.264-.823 6.087 6.087 0 0 1 2.043-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1z"/>
                </svg>
              </div>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Watch label */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Watch Reel
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Fullscreen Modal - Clean video player */}
      <AnimatePresence>
        {selectedReelIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={handleClose}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Reel Video - Direct embed without branding */}
            <motion.div
              key={activeReels[selectedReelIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md h-[80vh] max-h-[700px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Container */}
              <div className="w-full h-full rounded-2xl overflow-hidden bg-black relative">
                <iframe
                  src={`https://www.instagram.com/reel/${extractInstagramReelId(activeReels[selectedReelIndex].instagram_url)}/embed/?hidecaption=true`}
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                  allowFullScreen
                />

                {/* Open in Instagram button */}
                <a
                  href={getInstagramReelUrl(activeReels[selectedReelIndex].instagram_url) || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-4 py-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full text-white text-sm font-medium transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Instagram
                </a>
              </div>

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
