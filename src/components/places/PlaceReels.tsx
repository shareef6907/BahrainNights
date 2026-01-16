'use client';

import { motion } from 'framer-motion';
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

  return (
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

      {/* Reels Grid - Embedded Instagram players */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeReels.map((reel, index) => (
          <motion.div
            key={reel.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl overflow-hidden border border-white/10"
          >
            <InstagramReelEmbed
              reelUrl={reel.instagram_url}
              className="w-full"
              autoPlay={index === 0} // Autoplay first reel only
              showControls={true}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
