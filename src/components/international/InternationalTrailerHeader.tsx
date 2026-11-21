'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import TrailerPlayer from '@/components/cinema/TrailerPlayer';
import { usePrefersReducedMotion } from '@/lib/cinema/use-prefers-reduced-motion';

export interface InternationalTrailerFilm {
  id: string;
  title: string;
  /** YouTube video id (11 chars) or empty string. */
  trailerKey: string;
  poster: string;
  backdrop: string;
  synopsis: string;
}

interface InternationalTrailerHeaderProps {
  films: InternationalTrailerFilm[];
}

/**
 * Trailer header for the /international page.
 *
 * The film list is resolved by the SERVER component (see
 * src/app/international/page.tsx) and passed in as a prop, so:
 *  - the film titles are present in the server-rendered HTML (SEO), and
 *  - the YouTube player is created from the first paint (no client fetch, no
 *    frozen header).
 */
export default function InternationalTrailerHeader({ films }: InternationalTrailerHeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  /*
   * A visitor who asked for reduced motion must not get an autoplaying
   * trailer — see the note in src/components/cinema/NetflixHero.tsx. The
   * decision is made here, in the caller, so `TrailerPlayer` does not have to
   * be changed.
   *
   * The hook must be called BEFORE the early return below (rules of hooks).
   */
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!films || films.length === 0) return null;

  const current = films[currentIndex];
  const videoId = current?.trailerKey || '';
  const backdropUrl = current?.backdrop || current?.poster;

  const goNext = () => setCurrentIndex((p) => (p + 1) % films.length);
  const goPrev = () => setCurrentIndex((p) => (p - 1 + films.length) % films.length);

  return (
    <div
      /* Height via CSS media queries — not JS state — so the server-rendered
         box matches the client box and the layout does not shift. */
      className="relative overflow-hidden bg-black h-[60vh] md:h-[70vh] min-h-[340px] md:min-h-[460px]"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
      data-testid="international-trailer-header"
    >
      {videoId ? (
        <div className="absolute inset-0 z-0">
          <TrailerPlayer
            key={videoId}
            videoId={videoId}
            poster={backdropUrl}
            title={current?.title ? `${current.title} trailer` : 'Trailer'}
            activation={prefersReducedMotion ? 'click' : 'viewport'}
            priority
            playButtonPlacement="bottomRight"
            aspectRatio={null}
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0">
          {backdropUrl ? (
            <Image
              src={backdropUrl}
              alt={current?.title || 'Featured trailer'}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-teal-900/60" />
          )}
        </div>
      )}

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30 pointer-events-none z-[5]" />

      {/* Copy */}
      <div className="absolute inset-0 flex items-end z-10 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-xs md:text-sm font-medium mb-4">
            Featured Trailers
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-white mb-2 md:mb-3 drop-shadow-2xl">
            {current?.title}
          </h2>
          {current?.synopsis && (
            <p className="hidden md:block text-gray-300 text-sm md:text-base line-clamp-2 max-w-xl mb-4">
              {current.synopsis}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            {videoId && (
              <a
                href="#international-events"
                className="pointer-events-auto flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white text-black text-sm md:text-base font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                Browse Events
              </a>
            )}
            <a
              href="/cinema"
              className="pointer-events-auto flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/10 text-white text-sm md:text-base font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Movies in Bahrain
            </a>
          </div>
        </div>
      </div>

      {films.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous trailer"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next trailer"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {films.map((film, i) => (
              <button
                key={film.id}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to trailer ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
