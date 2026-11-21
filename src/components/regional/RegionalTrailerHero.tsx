'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Info, Play } from 'lucide-react';
import TrailerPlayer from '@/components/cinema/TrailerPlayer';
import { getYouTubeVideoId, hasPlayableTrailer } from '@/lib/cinema/trailer';

interface Movie {
  id: string;
  title: string;
  synopsis?: string;
  genre?: string[];
  trailer_key?: string;
  poster_url?: string;
  backdrop_url?: string;
}

interface Props {
  /**
   * Trailer films. Supplied by the server component so the titles are part of
   * the server-rendered HTML and the header never waits on a client fetch.
   */
  movies?: Movie[];
  onMovieClick?: (movie: Movie) => void;
  onBookClick?: (movie: Movie) => void;
}

/*
 * THE VIDEO ID — one shared implementation.
 *
 * See src/lib/cinema/trailer.ts. This component had its own copy, and the
 * copies had drifted: the hero accepted a bare YouTube key while the
 * trailer modal did not.
 */
function getYouTubeId(url: string | undefined): string | null {
  return getYouTubeVideoId(url);
}

export default function RegionalTrailerHero({ movies = [], onMovieClick, onBookClick }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const current = movies[currentIndex];
  const videoId = getYouTubeId(current?.trailer_key);
  const backdropUrl = current?.backdrop_url || current?.poster_url;
  const genreDisplay = current?.genre?.slice(0, 3).join(' • ') ?? '';

  useEffect(() => {
    if (movies.length > 1) {
      autoAdvanceRef.current = setInterval(() => setCurrentIndex(p => (p + 1) % movies.length), 25000);
    }
    return () => { if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current); };
  }, [movies.length]);

  const goNext = () => setCurrentIndex(p => (p + 1) % movies.length);
  const goPrev = () => setCurrentIndex(p => (p - 1 + movies.length) % movies.length);

  return (
    <div
      className="relative overflow-hidden bg-black h-[70vh] md:h-[85vh]"
      /*
       * The height is set with CSS media queries, NOT with the `isMobile`
       * state. The server rendered 85vh and the client switched it to 70vh
       * after hydration, which shifted the stats bar that overlaps the hero
       * (CLS 0.104). Pure CSS keeps the server and client markup identical.
       */
      style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/*
        Shared trailer player: poster facade first, YouTube iframe only once
        in view, unmuted-first playback with a muted fallback so the trailer
        never freezes on the first frame.
      */}
      {videoId ? (
        <div className="absolute inset-0 z-0">
          <TrailerPlayer
            key={videoId}
            videoId={videoId}
            poster={backdropUrl}
            title={current?.title ? `${current.title} trailer` : 'Trailer'}
            activation="click"
            priority
            playButtonPlacement="topRight"
            aspectRatio={null}
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0">
          {backdropUrl ? (
            <Image
              src={backdropUrl}
              alt={current?.title || 'Movie backdrop'}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <Play className="w-16 h-16 text-gray-600" />
            </div>
          )}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40 pointer-events-none z-[5]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none z-[5]" />

      <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold">NOW SHOWING</span>
              {genreDisplay && <span className="text-gray-300 text-sm">{genreDisplay}</span>}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">{current?.title}</h1>
            {current?.synopsis && <p className="text-lg text-gray-200 mb-8 line-clamp-3">{current.synopsis}</p>}
            <div className="flex gap-4">
              {/*
                The "Watch Trailer" button.

                It is rendered ONLY when the current film has a trailer that
                can actually play. It used to be gated on "there is a film",
                so on a slide whose trailer was missing it opened the film
                modal instead — a button labelled "Watch Trailer" that showed
                no trailer.
              */}
              {current && onMovieClick && hasPlayableTrailer(current.trailer_key) && (
                <button
                  onClick={() => onMovieClick(current)}
                  className="pointer-events-auto flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold"
                >
                  <Play size={24} />Watch Trailer
                </button>
              )}
              {current && onBookClick && (
                <button
                  onClick={() => onBookClick(current)}
                  className="pointer-events-auto flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold"
                >
                  Book Tickets
                </button>
              )}
              <a href="/cinema" className="pointer-events-auto flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-bold"><Info size={24} />View All Movies</a>
            </div>
          </div>
        </div>
      </div>

      {movies.length > 1 && (
        <>
          <button onClick={goPrev} aria-label="Previous trailer" className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full z-20"><ChevronLeft size={32} /></button>
          <button onClick={goNext} aria-label="Next trailer" className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full z-20"><ChevronRight size={32} /></button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {movies.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)} aria-label={`Go to trailer ${i + 1}`} className={`rounded-full ${i === currentIndex ? 'w-10 h-2 bg-yellow-500' : 'w-2 h-2 bg-white/50'}`} />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
