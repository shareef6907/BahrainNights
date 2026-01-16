'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Loader2 } from 'lucide-react';
import { extractInstagramReelId, getInstagramReelUrl } from '@/lib/utils/instagram';

interface InstagramReelEmbedProps {
  reelUrl: string | null | undefined;
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
}

export default function InstagramReelEmbed({
  reelUrl,
  className = '',
  autoPlay = true, // Default to true for better UX
  showControls = true
}: InstagramReelEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reelId = extractInstagramReelId(reelUrl);
  const canonicalUrl = getInstagramReelUrl(reelUrl);

  // Auto-load embed when autoPlay is true and component is in view
  useEffect(() => {
    if (!autoPlay || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasInteracted) {
            setIsPlaying(true);
            setHasInteracted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoPlay, hasInteracted]);

  // Reset when URL changes
  useEffect(() => {
    setIsLoading(true);
    if (!autoPlay) {
      setIsPlaying(false);
      setHasInteracted(false);
    }
  }, [reelUrl, autoPlay]);

  if (!reelId) {
    return null;
  }

  // Instagram embed URL with hidecaption to minimize branding
  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed/?hidecaption=true`;

  const handlePlay = () => {
    setIsLoading(true);
    setIsPlaying(true);
    setHasInteracted(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl overflow-hidden ${className}`}
    >
      {/* Thumbnail/Preview State - shown when not playing */}
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {/* Instagram Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-pink-500/90 to-orange-400/90" />

          {/* Play Button */}
          <motion.button
            onClick={handlePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all"
          >
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </motion.button>

          {/* Reel Icon */}
          <div className="relative z-10 mt-4 flex items-center gap-2 text-white/80 text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.264-.823 6.087 6.087 0 0 1 2.043-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1z"/>
              <path d="M12 6.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667z"/>
              <circle cx="17.872" cy="6.128" r="1.32"/>
            </svg>
            <span>Tap to play</span>
          </div>
        </div>
      )}

      {/* Loading State - shown while iframe is loading */}
      {isLoading && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 z-20">
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-white animate-spin mb-2" />
            <span className="text-white/80 text-sm">Loading reel...</span>
          </div>
        </div>
      )}

      {/* Instagram Iframe - Rendered when playing */}
      {isPlaying && (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="w-full rounded-xl"
          style={{
            minHeight: '500px',
            aspectRatio: '9/16',
            border: 'none',
          }}
          frameBorder="0"
          scrolling="no"
          allowTransparency
          allowFullScreen
          allow="autoplay; encrypted-media"
          onLoad={() => setIsLoading(false)}
        />
      )}

      {/* Placeholder div to maintain aspect ratio when not playing */}
      {!isPlaying && (
        <div style={{ aspectRatio: '9/16', minHeight: '500px' }} />
      )}

      {/* Controls Overlay - "Open in Instagram" link */}
      {isPlaying && !isLoading && showControls && canonicalUrl && (
        <div className="absolute bottom-3 right-3 z-30">
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full text-white text-xs font-medium transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in Instagram
          </a>
        </div>
      )}
    </div>
  );
}
