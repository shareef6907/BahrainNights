'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, Ticket, Info } from 'lucide-react';
import { Movie } from './MovieCard';
import TrailerPlayer from './TrailerPlayer';
import { getYouTubeVideoId, hasPlayableTrailer } from '@/lib/cinema/trailer';

interface NetflixHeroProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onBookClick: (movie: Movie) => void;
  /**
   * Called when the visitor presses the hero's "Trailer" button.
   *
   * Optional: when it is not supplied the button falls back to
   * `onMovieClick`, which is the old behaviour.
   *
   * The point of the separate callback is that the hero's Trailer button used
   * to open the film MODAL, so a visitor who wanted to watch the trailer had
   * to find the trailer inside the modal. The cinema page now wires this to
   * the shared `TrailerModal`, so the trailer plays in the same in-page
   * popup the homepage uses — and it never navigates to youtube.com.
   */
  onTrailerClick?: (movie: Movie) => void;
}

/**
 * The minimum time a slide stays on screen, in milliseconds.
 *
 * 20 seconds is roughly the length of a trailer, so a slide is never
 * replaced while its own trailer is still running.
 */
const MIN_DWELL_MS = 20_000;

/**
 * How often the deadline is re-checked.
 *
 * The deadline itself is the source of truth — this only controls how often
 * we notice it has passed. It is deliberately shorter than the dwell so a
 * resumed tab advances promptly instead of a full interval later.
 */
const TICK_INTERVAL_MS = 500;

/*
 * THE VIDEO ID — one shared implementation.
 *
 * See src/lib/cinema/trailer.ts. The local copy that used to live here
 * accepted a bare YouTube key; TrailerModal's copy did not, which is how a
 * visitor got a black box reading "Trailer not available".
 */
function getYouTubeId(url: string | undefined): string | null {
  return getYouTubeVideoId(url);
}

export default function NetflixHero({ movies, onMovieClick, onBookClick, onTrailerClick }: NetflixHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);

  const currentMovie = movies?.[currentIndex];
  const videoId = getYouTubeId(currentMovie?.trailerUrl);
  const backdropUrl = currentMovie?.backdrop || currentMovie?.poster;

  /**
   * The moment the current slide is due to be replaced.
   *
   * A DEADLINE, not an interval. With an interval, a timer that fires late
   * (a background tab, a busy main thread) still advances immediately, and a
   * timer that fires early shortens the slide. With a deadline, the slide
   * is on screen for at least `MIN_DWELL_MS` no matter when the tick runs,
   * and a paused period is added to the deadline rather than spent from it.
   */
  const deadlineRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /** The visitor is interacting with the hero — do not auto-advance. */
  const interactingRef = useRef(false);
  /** The tab is in the background — do not auto-advance. */
  const hiddenRef = useRef(false);
  /** The visitor asked for reduced motion — never auto-advance. */
  const reducedMotionRef = useRef(false);

  /**
   * The remaining dwell time for the current slide, in milliseconds.
   *
   * When the rotation is paused — because the visitor is interacting, or
   * because the tab is hidden, or because reduced motion is on — this is
   * `Infinity`: the slide stays until the visitor says otherwise.
   */
  const remainingMsRef = useRef<number>(MIN_DWELL_MS);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* --- prefers-reduced-motion ------------------------------------------- */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const wasReduced = reducedMotionRef.current;
      reducedMotionRef.current = mq.matches;
      if (mq.matches) {
        // Never auto-advance for a visitor who asked for reduced motion.
        remainingMsRef.current = Infinity;
        deadlineRef.current = Number.POSITIVE_INFINITY;
      } else if (wasReduced) {
        // The visitor turned reduced motion OFF — the rotation may start
        // again, with a fresh dwell for the slide that is currently showing.
        remainingMsRef.current = MIN_DWELL_MS;
        deadlineRef.current = Date.now() + MIN_DWELL_MS;
      }
    };
    apply();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  /* --- the rotation ------------------------------------------------------ */

  /** True when the rotation must not advance on its own right now. */
  const isPaused = useCallback(
    () => interactingRef.current || hiddenRef.current || reducedMotionRef.current,
    []
  );

  /**
   * (Re)start the dwell for the current slide.
   *
   * The deadline is `now + MIN_DWELL_MS`. This is called on mount, after a
   * manual navigation, and whenever the rotation is resumed.
   */
  const startDwell = useCallback(() => {
    if (reducedMotionRef.current) {
      remainingMsRef.current = Infinity;
      deadlineRef.current = Number.POSITIVE_INFINITY;
      return;
    }
    remainingMsRef.current = MIN_DWELL_MS;
    deadlineRef.current = Date.now() + MIN_DWELL_MS;
  }, []);

  /**
   * Pause the rotation, keeping the time already served.
   *
   * The remaining dwell is preserved so that resuming does not give the
   * slide a fresh full 20 seconds — a slide that has been up for 18 seconds
   * and is then interrupted resumes with 2 seconds left, not 20.
   */
  const pauseDwell = useCallback(() => {
    if (deadlineRef.current === Number.POSITIVE_INFINITY) return;
    const remaining = deadlineRef.current - Date.now();
    if (remaining > 0) {
      remainingMsRef.current = remaining;
      deadlineRef.current = Number.POSITIVE_INFINITY;
    }
  }, []);

  /** Resume the rotation with whatever dwell is left. */
  const resumeDwell = useCallback(() => {
    if (remainingMsRef.current === Number.POSITIVE_INFINITY) return;
    deadlineRef.current = Date.now() + remainingMsRef.current;
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      // A manual navigation restarts the dwell for the slide just selected.
      startDwell();
    },
    [startDwell]
  );

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex === 0 ? movies.length - 1 : currentIndex - 1);
  }, [currentIndex, movies.length, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % movies.length);
  }, [currentIndex, movies.length, goToSlide]);

  /* --- the ticker -------------------------------------------------------- */
  useEffect(() => {
    if (movies.length <= 1) return;

    if (deadlineRef.current === 0) startDwell();

    const tick = () => {
      if (isPaused()) return;
      if (deadlineRef.current === Number.POSITIVE_INFINITY) return;
      if (Date.now() >= deadlineRef.current) {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        startDwell();
      }
    };

    timerRef.current = setInterval(tick, TICK_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [movies.length, isPaused, startDwell]);

  /* --- pause while the tab is hidden -------------------------------------- */
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        hiddenRef.current = true;
        pauseDwell();
      } else {
        hiddenRef.current = false;
        resumeDwell();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [pauseDwell, resumeDwell]);

  /* --- pause while the visitor interacts with the hero -------------------- */
  const handleMouseEnter = useCallback(() => {
    interactingRef.current = true;
    setShowControls(true);
    pauseDwell();
  }, [pauseDwell]);

  const handleMouseLeave = useCallback(() => {
    interactingRef.current = false;
    setShowControls(false);
    resumeDwell();
  }, [resumeDwell]);

  /**
   * The hero's "Trailer" button.
   *
   * It opens the shared trailer popup when the parent supplies
   * `onTrailerClick`, and falls back to the film modal otherwise. It never
   * navigates to youtube.com.
   */
  const handleTrailerClick = useCallback(() => {
    if (!currentMovie) return;
    if (onTrailerClick) {
      onTrailerClick(currentMovie);
      return;
    }
    onMovieClick(currentMovie);
  }, [currentMovie, onTrailerClick, onMovieClick]);

  if (!movies || movies.length === 0) {
    return (
      <div className="relative flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
        style={{ width: '100vw', height: '80vh', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="text-center">
          <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
          <p className="text-gray-400">Check back for the latest movie trailers</p>
        </div>
      </div>
    );
  }

  return (
    <div
      /*
       * Height comes from CSS media queries, not from the `isMobile` state:
       * the server rendered 85vh and the client switched it to 70vh after
       * hydration, which shifted the layout below the hero (CLS).
       */
      className="relative overflow-hidden bg-black h-[70vh] md:h-[85vh] min-h-[400px] md:min-h-[600px]"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/*
        The trailer player owns the poster/facade, the lazy YouTube iframe, the
        unmuted-first playback attempt and the muted fallback. The hero only
        renders the overlay content on top of it.

        The `key` is the video id, so every slide gets a FRESH YouTube player.
        That is exactly why the sound preference has to be re-applied per
        player — see the note in TrailerPlayer's onStateChange handler.
      */}
      {videoId ? (
        <div className="absolute inset-0 z-0">
          <TrailerPlayer
            key={videoId}
            videoId={videoId}
            poster={backdropUrl}
            title={currentMovie?.title ? `${currentMovie.title} trailer` : 'Trailer'}
            activation="viewport"
            priority
            playButtonPlacement="bottomRight"
            aspectRatio={null}
            className="h-full w-full"
          />
        </div>
      ) : (
        backdropUrl ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={backdropUrl}
              alt={currentMovie?.title || 'Movie backdrop'}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ) : null
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-[5] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20 z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />

      <div className="absolute inset-0 flex items-end z-10 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-4 drop-shadow-2xl">
                {currentMovie?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-4 text-gray-300 text-xs md:text-base">
                {currentMovie?.rating ? (
                  <span className="text-[#d4a853] font-semibold">★ {currentMovie.rating}/10</span>
                ) : null}
                {currentMovie?.genres?.slice(0, isMobile ? 2 : 3).map((genre, i) => (
                  <span key={genre} className="flex items-center">
                    {i > 0 && <span className="mx-1 md:mx-2 text-gray-500">•</span>}
                    {genre}
                  </span>
                ))}
                {currentMovie?.duration && (
                  <><span className="mx-1 md:mx-2 text-gray-500">•</span><span>{currentMovie.duration}</span></>
                )}
              </div>
              {currentMovie?.synopsis && (
                <p className="hidden md:block text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6 max-w-xl">
                  {currentMovie.synopsis}
                </p>
              )}
              <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-0">
                {videoId && (
                  <motion.button onClick={handleTrailerClick}
                    className="pointer-events-auto flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-white text-black text-sm md:text-base font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Play className="w-4 h-4 md:w-5 md:w-5 fill-current" />Trailer
                  </motion.button>
                )}
                <motion.button onClick={() => onBookClick(currentMovie)}
                  className="pointer-events-auto flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-red-600 text-white text-sm md:text-base font-bold rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Ticket className="w-4 h-4 md:w-5 md:w-5" />Book
                </motion.button>
                <motion.button onClick={() => onMovieClick(currentMovie)}
                  className="pointer-events-auto flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-gray-800/80 text-white text-sm md:text-base font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Info className="w-4 h-4 md:w-5 md:w-5" />Info
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {movies.length > 1 && (
        <>
          <motion.button onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
            initial={{ opacity: 0 }} animate={{ opacity: showControls || isMobile ? 1 : 0 }}
            aria-label="Previous trailer">
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
            initial={{ opacity: 0 }} animate={{ opacity: showControls || isMobile ? 1 : 0 }}
            aria-label="Next trailer">
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}

      {movies.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {movies.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} aria-label={`Go to trailer ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`} />
          ))}
        </div>
      )}

    </div>
  );
}
