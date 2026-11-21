'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Calendar, Play, ExternalLink, Ticket } from 'lucide-react';
import { hasPlayableTrailer } from '@/lib/cinema/trailer';
import Image from 'next/image';
import { Movie } from './MovieCard';
import { useTranslation } from '@/lib/i18n';
// The cinema list lives in ONE place: src/lib/cinema/booking-links.ts.
// It used to be duplicated here, in NetflixHero, in CinemaPageClient and in
// /api/cinema/locations — four copies of the same URLs, three of them wrong.
import { BAHRAIN_CINEMAS, buildBookingLinks } from '@/lib/cinema/booking-links';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onTrailerClick: () => void;
}

export default function MovieModal({
  movie,
  isOpen,
  onClose,
  onTrailerClick,
}: MovieModalProps) {
  const { t } = useTranslation();

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!movie) return null;

  /**
   * A rating of 0 means "no rating", not "rated zero stars".
   *
   * Avengers: Doomsday is unreleased and has no TMDB rating, so `tmdb_rating`
   * is 0. The old code rendered the badge unconditionally and the modal showed
   * "★ 0" — which reads as a broken widget rather than an absent one.
   */
  const hasRating = typeof movie.rating === 'number' && Number.isFinite(movie.rating) && movie.rating > 0;

  /**
   * The poster may be missing entirely (44 of 919 movie rows have no
   * poster_url). `<Image src="">` throws, so the poster is only rendered when
   * there is real artwork; otherwise a branded fallback is shown.
   */
  const hasPoster = movie.hasPoster !== false && !!movie.poster;
  const backdropSrc = movie.backdrop || (hasPoster ? movie.poster : '');
  const genres = movie.genres || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[95] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-full flex items-start justify-center p-4 pt-10 pb-20">
              <motion.div
                className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
                data-testid="movie-modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Backdrop - fallback to poster if no backdrop */}
                {backdropSrc ? (
                  <div className="relative h-[250px] md:h-[300px]">
                    <Image
                      src={backdropSrc}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  </div>
                ) : (
                  <div className="relative h-[180px] md:h-[220px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="relative -mt-24 px-6 pb-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Poster */}
                    <div className="relative w-[140px] md:w-[180px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl flex-shrink-0 mx-auto md:mx-0">
                      {/*
                        THE POSTER.

                        There is no fallback card. A film with no poster does
                        not reach this modal at all — it is dropped from the
                        page (see src/app/cinema/page.tsx). The branded
                        "BAHRAIN NIGHTS" placeholder was what made the grid
                        look broken, and it is gone from the rendering path.
                      */}
                      {hasPoster ? (
                        <Image
                          src={movie.poster}
                          alt={movie.title}
                          fill
                          className="object-cover"
                          sizes="180px"
                          unoptimized
                        />
                      ) : null}
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-4 md:pt-16">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center md:text-left">
                        {movie.title}
                      </h2>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        {hasRating && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-yellow-400 font-bold">{movie.rating}</span>
                          </div>
                        )}
                        {movie.duration && (
                          <div className="flex items-center gap-1 text-gray-300">
                            <Clock className="w-4 h-4" />
                            <span>{movie.duration}</span>
                          </div>
                        )}
                        {movie.releaseDate && (
                          <div className="flex items-center gap-1 text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span>{movie.releaseDate}</span>
                          </div>
                        )}
                        {movie.language && (
                          <span className="text-gray-300">{movie.language}</span>
                        )}
                      </div>

                      {/* Genres */}
                      {genres.length > 0 && (
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                          {genres.map((genre) => (
                            <span
                              key={genre}
                              className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Trailer Button */}
                      {hasPlayableTrailer(movie.trailerUrl) && (
                        <button
                          onClick={onTrailerClick}
                          className="flex items-center gap-2 mx-auto md:mx-0 px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
                        >
                          <Play className="w-5 h-5 fill-current" />
                          {t.movieModal.watchTrailer}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div className="mt-6 p-4 bg-white/5 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-2">{t.movieModal.synopsis}</h3>
                    <p className="text-gray-300 leading-relaxed">{movie.synopsis}</p>
                  </div>

                  {/* Cast */}
                  {movie.cast && movie.cast.length > 0 && (
                    <div className="mt-4 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">{t.movieModal.cast}</h3>
                      <p className="text-gray-300">{movie.cast.join(', ')}</p>
                    </div>
                  )}

                  {/* Book Tickets Section - Now Showing */}
                  {movie.isNowShowing && (
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Ticket className="w-6 h-6 text-yellow-400" />
                        <h3 className="text-xl font-bold text-white">{t.movieModal.bookTickets}</h3>
                      </div>

                      {/*
                        Cinema grid.
                        
                        A Book button is rendered ONLY for a cinema we have a
                        VERIFIED per-film URL for. The old code linked every
                        cinema the film was listed at to the cinema's
                        HOMEPAGE, and the hero linked to a search URL that
                        404s — so every "Book" click led somewhere that was
                        not a booking page for that film.
                        
                        A cinema the film plays at but for which we have no
                        per-film URL is still shown, as a plain link to the
                        cinema, clearly not a "Book" button.
                      */}
                      {(() => {
                        const bookingLinks = buildBookingLinks(movie.scrapedFrom, movie.bookingUrls);
                        const listedCinemas = BAHRAIN_CINEMAS.filter((cinema) =>
                          movie.scrapedFrom?.includes(cinema.id)
                        );

                        if (listedCinemas.length === 0) {
                          return (
                            <div className="p-4 bg-white/5 rounded-xl text-center">
                              <p className="text-gray-400">
                                {t.movieModal.checkCinemaWebsites}
                              </p>
                              <div className="flex flex-wrap justify-center gap-3 mt-3">
                                {BAHRAIN_CINEMAS.map((cinema) => (
                                  <a
                                    key={cinema.id}
                                    href={cinema.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-yellow-400 hover:text-yellow-300 underline"
                                  >
                                    {cinema.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        if (bookingLinks.length === 0) {
                          // We know where the film is playing, but we have no
                          // verified per-film booking URL for it yet. Say so
                          // plainly and point at the cinema, rather than
                          // rendering a link that would 404.
                          return (
                            <div className="p-4 bg-white/5 rounded-xl text-center">
                              <p className="text-gray-400 mb-3">
                                {listedCinemas.length === 1
                                  ? `${t.movieModal.availableAtOneCinema} ${listedCinemas[0].name}`
                                  : t.movieModal.availableAtCinemas.replace('{count}', listedCinemas.length.toString())}
                              </p>
                              <div className="flex flex-wrap justify-center gap-3">
                                {listedCinemas.map((cinema) => (
                                  <a
                                    key={cinema.id}
                                    href={cinema.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-yellow-400 hover:text-yellow-300 underline"
                                  >
                                    {cinema.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        return (
                          <>
                            <p className="text-gray-400 mb-4">
                              {bookingLinks.length === 1
                                ? `${t.movieModal.availableAtOneCinema} ${bookingLinks[0].cinema.name}`
                                : t.movieModal.availableAtCinemas.replace('{count}', bookingLinks.length.toString())}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {bookingLinks.map(({ cinema, url }) => (
                                <a
                                  key={cinema.id}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-testid="cinema-option"
                                  className={`group p-4 bg-gradient-to-br ${cinema.color} border ${cinema.borderColor} ${cinema.hoverColor} rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg`}
                                >
                                  <div className="flex items-center gap-4">
                                    {/* Cinema Logo Placeholder */}
                                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                      <span className="text-2xl font-bold text-white">
                                        {cinema.name.charAt(0)}
                                      </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-bold text-white text-lg truncate">
                                        {cinema.name}
                                      </h4>
                                      <p className="text-sm text-gray-400 truncate">
                                        {cinema.locations.join(' • ')}
                                      </p>
                                    </div>

                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg group-hover:bg-yellow-400 group-hover:text-black transition-all">
                                      <span className="font-medium text-white group-hover:text-black">
                                        {t.movieModal.bookNow}
                                      </span>
                                      <ExternalLink className="w-4 h-4 text-white group-hover:text-black" />
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {/* Coming Soon */}
                  {!movie.isNowShowing && (
                    <div className="mt-6">
                      <div className="p-6 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl text-center">
                        <p className="text-orange-400 font-medium mb-1">{t.movieModal.comingToCinemas}</p>
                        <p className="text-2xl font-bold text-white">{movie.releaseDate}</p>
                      </div>

                      {/* Show which cinemas will have this movie */}
                      {(() => {
                        const bookingLinks = buildBookingLinks(movie.scrapedFrom, movie.bookingUrls);
                        const listedCinemas = BAHRAIN_CINEMAS.filter((cinema) =>
                          movie.scrapedFrom?.includes(cinema.id)
                        );

                        if (listedCinemas.length > 0) {
                          return (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Ticket className="w-5 h-5 text-orange-400" />
                                <h4 className="text-lg font-bold text-white">{t.movieModal.comingTo}</h4>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {listedCinemas.map((cinema) => {
                                  const link = bookingLinks.find((l) => l.cinema.id === cinema.id);
                                  // A coming-soon film usually has no booking
                                  // page yet, so this is a plain link to the
                                  // cinema rather than a Book button. When we
                                  // DO have a verified per-film URL, use it.
                                  const href = link?.url ?? cinema.homepage;
                                  return (
                                  <a
                                    key={cinema.id}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="cinema-option"
                                    className={`group p-3 bg-gradient-to-br ${cinema.color} border ${cinema.borderColor} ${cinema.hoverColor} rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-lg font-bold text-white">
                                          {cinema.name.charAt(0)}
                                        </span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h5 className="font-bold text-white truncate">
                                          {cinema.name}
                                        </h5>
                                        <p className="text-xs text-gray-400 truncate">
                                          {cinema.locations.join(' • ')}
                                        </p>
                                      </div>
                                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                                    </div>
                                  </a>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
