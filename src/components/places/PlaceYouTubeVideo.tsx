'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { extractYouTubeVideoId } from '@/lib/utils/youtube';

interface PlaceYouTubeVideoProps {
  youtubeUrl: string | null | undefined;
  venueName: string;
}

export default function PlaceYouTubeVideo({ youtubeUrl, venueName }: PlaceYouTubeVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoId = extractYouTubeVideoId(youtubeUrl);

  const toggleMute = () => {
    if (!iframeRef.current) return;

    const newMuteState = !isMuted;
    setIsMuted(newMuteState);

    // Send postMessage to YouTube iframe to toggle mute
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: newMuteState ? 'mute' : 'unMute',
        args: []
      }),
      '*'
    );

    // Also set volume when unmuting
    if (!newMuteState) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'setVolume',
          args: [75]
        }),
        '*'
      );
    }
  };

  if (!videoId) {
    return null;
  }

  // Build YouTube embed URL with autoplay, muted, and loop
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;

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
        {/* YouTube Iframe */}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={`${venueName} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />

        {/* Mute/Unmute Button Overlay */}
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
      </div>
    </motion.div>
  );
}
