'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { extractYouTubeVideoId } from '@/lib/utils/youtube';

interface PlaceYouTubeVideoProps {
  youtubeUrl: string | null | undefined;
  venueName: string;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  destroy: () => void;
}

export default function PlaceYouTubeVideo({ youtubeUrl, venueName }: PlaceYouTubeVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<string>(`youtube-player-${Math.random().toString(36).substr(2, 9)}`);

  const videoId = extractYouTubeVideoId(youtubeUrl);

  useEffect(() => {
    if (!videoId) return;

    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) {
        setTimeout(initPlayer, 100);
        return;
      }

      // Ensure DOM element exists before creating player
      const element = document.getElementById(containerRef.current);
      if (!element) {
        setTimeout(initPlayer, 100);
        return;
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1, // Start muted (required for autoplay)
          loop: 1,
          playlist: videoId, // Required for loop
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            setIsReady(true);
            event.target.setVolume(75); // Set volume to 75%
            event.target.playVideo();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      // Small delay to ensure DOM is ready after render
      setTimeout(initPlayer, 100);
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(75);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  if (!videoId) {
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
        {/* YouTube Player Container */}
        <div id={containerRef.current} className="absolute inset-0 w-full h-full" />

        {/* Mute/Unmute Button Overlay */}
        {isReady && (
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full text-white font-medium transition-all"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-5 h-5" />
                <span>Tap to Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                <span>Sound On</span>
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
