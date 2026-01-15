'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  trailerUrl: string;
}

interface YTPlayer {
  destroy: () => void;
  playVideo: () => void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLDivElement | string,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function TrailerModal({ isOpen, onClose, title, trailerUrl }: TrailerModalProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YTPlayer | null>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [showManualPlay, setShowManualPlay] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(trailerUrl);

  // Load YouTube API
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true);
      };
    } else if (typeof window !== 'undefined' && window.YT) {
      setIsAPIReady(true);
    }
  }, []);

  // Initialize player when modal opens
  useEffect(() => {
    if (isOpen && isAPIReady && videoId && playerRef.current) {
      // Clean up existing player
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }

      // Reset manual play state
      setShowManualPlay(false);

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
                // Show manual play button after a short delay if video doesn't start
                setTimeout(() => {
                  setShowManualPlay(true);
                }, 1500);
              },
            },
          });
        } catch {
          // Fallback: if API fails, show manual play immediately
          setShowManualPlay(true);
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

  // Manual play handler for mobile
  const handleManualPlay = useCallback(() => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.playVideo();
      setShowManualPlay(false);
    }
  }, []);

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
                  <>
                    <div
                      ref={playerRef}
                      className="absolute inset-0 w-full h-full"
                    />
                    {/* Manual play overlay for mobile - shows if autoplay doesn't work */}
                    {showManualPlay && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleManualPlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 touch-manipulation"
                        aria-label="Play trailer"
                      >
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                          <Play className="w-10 h-10 text-white fill-white ml-1" />
                        </div>
                      </motion.button>
                    )}
                  </>
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
