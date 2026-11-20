/**
 * ONE place that decides what a "Book" button links to.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The cinema booking links used to be built in FOUR different places:
 *
 *   1. `src/components/cinema/MovieModal.tsx` — a hardcoded `BAHRAIN_CINEMAS`
 *      array whose `bookingUrl` was the cinema's HOMEPAGE
 *      (`https://bhr.voxcinemas.com/`). A "Book" button that lands on a
 *      homepage is not a booking link.
 *   2. `src/components/cinema/NetflixHero.tsx` (via `CinemaPageClient.tsx`) —
 *      the hero's Book button built
 *      `https://bhr.voxcinemas.com/movies?search=<title>`, which is a **404**
 *      on VOX: the working search endpoint is `/search?q=`, and
 *      `/movies?search=` answers 404. Every hero Book click was a dead link.
 *   3. `src/components/cinema/CinemaPageClient.tsx` — a second copy of the
 *      same search URL.
 *   4. `src/app/api/cinema/locations/route.ts` — a third copy of the
 *      homepage URLs.
 *
 * Four copies of a URL, three of them wrong. This module is the single
 * source of truth.
 *
 * THE RULE
 * --------
 * A Book button is only rendered when we have a PER-FILM URL that the sync
 * has VERIFIED resolves to HTTP 200. If we do not have one, the button is
 * not rendered at all — the film still shows its poster, synopsis, cast and
 * trailer, and the modal says where the film is playing. A 404 is worse than
 * no button.
 */

/** The cinemas we know how to link to. */
export type CinemaId = 'cineco' | 'vox' | 'cinepolis' | 'mukta';

export interface CinemaInfo {
  id: CinemaId;
  name: string;
  logo: string;
  locations: string[];
  /**
   * The cinema's HOMEPAGE.
   *
   * This is used only as a plain-text "where to see this film" link, never
   * as the target of a Book button — a homepage is not a booking link, and
   * it is not a per-film URL.
   */
  homepage: string;
  color: string;
  borderColor: string;
  hoverColor: string;
}

export const BAHRAIN_CINEMAS: CinemaInfo[] = [
  {
    id: 'cineco',
    name: 'Cineco',
    logo: '/images/cinemas/cineco.png',
    locations: ['Seef Mall', 'Saar Mall', 'Oasis Mall', 'Wadi Al Sail'],
    homepage: 'https://bahrain.cineco.net/',
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-500/30',
    hoverColor: 'hover:border-red-400',
  },
  {
    id: 'vox',
    name: 'VOX Cinemas',
    logo: '/images/cinemas/vox.png',
    locations: ['City Centre', 'The Avenues'],
    homepage: 'https://bhr.voxcinemas.com/',
    color: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-500/30',
    hoverColor: 'hover:border-purple-400',
  },
  {
    id: 'cinepolis',
    name: 'Cinépolis',
    logo: '/images/cinemas/cinepolis.png',
    locations: ['Wadi Al Sail'],
    homepage: 'https://bahrain.cinepolisgulf.com/',
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/30',
    hoverColor: 'hover:border-blue-400',
  },
  {
    id: 'mukta',
    name: 'Mukta A2 Cinemas',
    logo: '/images/cinemas/mukta.png',
    locations: ['Juffair'],
    homepage: 'https://www.muktaa2cinemas.com/bahrain',
    color: 'from-amber-500/20 to-amber-600/20',
    borderColor: 'border-amber-500/30',
    hoverColor: 'hover:border-amber-400',
  },
];

export function getCinema(id: string | undefined | null): CinemaInfo | undefined {
  if (!id) return undefined;
  return BAHRAIN_CINEMAS.find((c) => c.id === id);
}

/**
 * The per-film booking URL captured by the sync, keyed by cinema.
 *
 * e.g. `{ vox: 'https://bhr.voxcinemas.com/movies/i-play-rocky' }`
 *
 * The URLs come from the cinema's OWN listing pages, so they are the
 * authoritative per-film paths:
 *
 *   VOX    — `https://bhr.voxcinemas.com/movies/<slug>`
 *   Cineco — `https://bahrain.cineco.net/amy_movie/<slug>/`
 *
 * They are stored in the `movies.booking_urls` jsonb column, which the sync
 * populates. Values that are absent, empty, or not an absolute https URL are
 * ignored here, so a malformed row can never produce a broken Book button.
 */
export type BookingUrls = Partial<Record<CinemaId, string>>;

/** A Book button for one cinema. */
export interface BookingLink {
  cinema: CinemaInfo;
  /** The absolute, per-film URL. Always https and always a real film page. */
  url: string;
}

/**
 * Is this a well-formed absolute https URL?
 *
 * Blocks `javascript:`, `data:` and relative paths — a malformed value must
 * never become an href.
 */
export function isSafeHttpUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (!/^https:\/\//i.test(trimmed)) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' && parsed.hostname.length > 0;
  } catch {
    return false;
  }
}

/**
 * Build the list of Book buttons for a film.
 *
 * A button is produced ONLY for a cinema that:
 *   1. the film is actually listed at (`scrapedFrom`), and
 *   2. we have a per-film URL for, and
 *   3. that URL is a well-formed absolute https URL.
 *
 * Returns an empty array when nothing qualifies — in which case the caller
 * MUST NOT render a Book button.
 */
export function buildBookingLinks(
  scrapedFrom: string[] | null | undefined,
  bookingUrls: BookingUrls | null | undefined
): BookingLink[] {
  if (!Array.isArray(scrapedFrom) || scrapedFrom.length === 0) return [];
  if (!bookingUrls || typeof bookingUrls !== 'object') return [];

  const links: BookingLink[] = [];
  for (const id of scrapedFrom) {
    const cinema = getCinema(id);
    if (!cinema) continue;

    const raw = bookingUrls[cinema.id];
    if (!isSafeHttpUrl(raw)) continue;

    links.push({ cinema, url: raw.trim() });
  }

  return links;
}

/**
 * The single URL the hero's "Book" button should use.
 *
 * The hero shows ONE film at a time, so it can only have ONE link. We take
 * the first (by the canonical cinema order) that resolves. If none do, the
 * caller must not render the button.
 */
export function primaryBookingLink(
  scrapedFrom: string[] | null | undefined,
  bookingUrls: BookingUrls | null | undefined
): BookingLink | null {
  const links = buildBookingLinks(scrapedFrom, bookingUrls);
  if (links.length === 0) return null;

  // Prefer the canonical order (Cineco, VOX, Cinépolis, Mukta) rather than
  // whatever order `scrapedFrom` happens to be in.
  for (const cinema of BAHRAIN_CINEMAS) {
    const match = links.find((l) => l.cinema.id === cinema.id);
    if (match) return match;
  }
  return links[0];
}
