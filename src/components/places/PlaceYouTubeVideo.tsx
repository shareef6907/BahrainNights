'use client';

import { motion } from 'framer-motion';
import { getYouTubeEmbedUrl } from '@/lib/utils/youtube';

interface PlaceYouTubeVideoProps {
  youtubeUrl: string | null | undefined;
  venueName: string;
}

export default function PlaceYouTubeVideo({ youtubeUrl, venueName }: PlaceYouTubeVideoProps) {
  // Get the embed URL with options: autoplay (muted), loop, modest branding, no related videos
  const embedUrl = getYouTubeEmbedUrl(youtubeUrl, {
    autoplay: true,
    mute: true,
    loop: true,
    controls: true,
    modestbranding: true,
    rel: false,
  });

  if (!embedUrl) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden"
    >
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        Video
      </h2>
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
        <iframe
          src={embedUrl}
          title={`${venueName} Video`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
