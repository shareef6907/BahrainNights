'use client';

import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { getInstagramReelUrl } from '@/lib/utils/instagram';

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
  venueName?: string; // Optional - not currently used
}

export default function PlaceReels({ reels }: PlaceReelsProps) {
  // Filter to only show active reels and sort by display order
  const activeReels = reels
    .filter(reel => reel.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  if (!activeReels || activeReels.length === 0) {
    return null;
  }

  // Open reel directly on Instagram - cleaner than buggy embed with branding
  const handleReelClick = (index: number) => {
    const reelUrl = getInstagramReelUrl(activeReels[index].instagram_url);
    if (reelUrl) {
      window.open(reelUrl, '_blank', 'noopener,noreferrer');
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

              {/* Watch label with Instagram indicator */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center">
                <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3 h-3" />
                  Watch on Instagram
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Modal removed - reels now open directly on Instagram for best viewing experience */}
    </>
  );
}
