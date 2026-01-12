'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink, Loader2 } from 'lucide-react';
import { extractInstagramReelId, getInstagramReelUrl } from '@/lib/utils/instagram';

interface InstagramReelEmbedProps {
  reelUrl: string | null | undefined;
  className?: string;
}

export default function InstagramReelEmbed({ reelUrl, className = '' }: InstagramReelEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const reelId = extractInstagramReelId(reelUrl);
  const canonicalUrl = getInstagramReelUrl(reelUrl);

  useEffect(() => {
    // Reset loading state when URL changes
    setIsLoading(true);
    setHasError(false);
  }, [reelUrl]);

  if (!reelId) {
    return null;
  }

  // Instagram embed URL
  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed/`;

  return (
    <div className={`relative ${className}`}>
      {/* Loading state */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-xl z-10">
          <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 rounded-xl z-10">
          <Instagram className="w-10 h-10 text-gray-500 mb-2" />
          <p className="text-gray-400 text-sm mb-2">Couldn't load reel</p>
          {canonicalUrl && (
            <a
              href={canonicalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-pink-400 hover:text-pink-300 text-sm transition-colors"
            >
              View on Instagram
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* Instagram Iframe */}
      <iframe
        src={embedUrl}
        className="w-full rounded-xl bg-black"
        style={{
          minHeight: '400px',
          maxHeight: '600px',
          aspectRatio: '9/16'
        }}
        frameBorder="0"
        scrolling="no"
        allowTransparency
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {/* View on Instagram link */}
      {canonicalUrl && !hasError && (
        <a
          href={canonicalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 flex items-center gap-1 px-3 py-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full text-white text-xs font-medium transition-all opacity-0 group-hover:opacity-100"
        >
          <Instagram className="w-3 h-3" />
          Open in Instagram
        </a>
      )}
    </div>
  );
}
