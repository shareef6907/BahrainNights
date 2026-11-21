'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { loadYouTubeIframeApi } from '@/lib/utils/youtube-iframe-api';
import { getYouTubeVideoId } from '@/lib/cinema/trailer';
import type { YTPlayerInstance } from '@/types/youtube';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  trailerUrl: string;
}

// The `window.YT` / `window.onYouTubeIframeAPIReady` typings are declared
// once, globally, in src/types/youtube.ts so that every component that drives
// a YouTube player agrees on the same shape.

export default function TrailerModal({ isOpen, onClose, title, trailerUrl }: TrailerModalProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YTPlayerInstance | null>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);

  /*
   * THE VIDEO ID.
   *
   * This used to be a LOCAL implementation that only matched a full URL, while
   * NetflixHero's version also accepted a bare 11-character YouTube key. The
   * database stores the trailer as a bare key, so the hero believed it had a
   * video and this modal did not — and the visitor got a black box reading
   * "Trailer not available".
   *
   * There is now ONE implementation, shared by every launcher and by this
   * modal: src/lib/cinema/trailer.ts.
   */
  const videoId = getYouTubeVideoId(trailerUrl);

  // Load YouTube API (nocookie first, canonical host fallback).
  // Only when the modal is actually opened, so the homepage never pays for
  // the YouTube player JavaScript on first load.
  useEffect(() => {
    if (!isOpen) return;
    if (typeof window !== 'undefined' && !window.YT) {
      loadYouTubeIframeApi()
        .then(() => setIsAPIReady(true))
        .catch(() => {
          // API failed - YouTube player will show its own play button
        });

      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true);
      };
    } else if (typeof window !== 'undefined' && window.YT) {
      setIsAPIReady(true);
    }
  }, [isOpen]);

  // Initialize player when modal opens
  useEffect(() => {
    if (isOpen && isAPIReady && videoId && playerRef.current) {
      // Clean up existing player
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }

      // Small delay to ensure DOM is ready
      const initTimer = setTimeout(() => {
        try {
          playerInstanceRef.current = new window.YT.Player(playerRef.current!, {
            videoId: videoId,
            playerVars: {
              autoplay: 1,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
              enablejsapi: 1,
            },
            events: {
              onReady: (event) => {
                // Try to play immediately
                event.target.playVideo();
              },
            },
          });
        } catch {
          // API failed - YouTube player will show its own play button
        }
      }, 100);

      return () => {
        clearTimeout(initTimer);
      };
    }

    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }
    };
  }, [isOpen, isAPIReady, videoId]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-10 lg:inset-20 z-[101] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="relative w-full max-w-5xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors touch-manipulation"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Title */}
              <h3 className="text-white text-xl font-bold mb-4">{title} - Trailer</h3>

              {/* Video Container */}
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                {videoId ? (
                  <div
                    ref={playerRef}
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <p>Trailer not available</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
