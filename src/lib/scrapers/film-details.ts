/**
 * Per-film detail extraction for the Bahrain cinema scrapers.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * A cinema's LISTING page carries the poster and the title. The film's OWN
 * page carries everything else: the runtime, the synopsis, the trailer, the
 * language, the certification and — for VOX — a JSON-LD block with all of it
 * in machine-readable form.
 *
 * The sync used to run only the listing pages, which is why films that TMDB
 * could not match landed on the site with no poster, no runtime and no
 * trailer — the "BAHRAIN NIGHTS" placeholder cards.
 *
 * There used to be two scraper tiers per cinema (one under `scripts/`, one
 * under `src/lib/scrapers/`), and the rich one was the unused one. The
 * extraction therefore lives HERE, once, and both the VOX and the Cineco
 * scraper call it. Two copies of the same extraction is the disease that
 * caused this bug in the first place.
 *
 * NOTHING HERE GUESSES. Every field is read from the page the cinema itself
 * published, or it is absent. A film with no poster stays without a poster.
 */

import * as cheerio from 'cheerio';

export interface FilmDetails {
  /** The film's own poster, absolute. */
  posterUrl?: string;
  /** The YouTube key of the trailer the cinema publishes for this film. */
  trailerKey?: string;
  /** The runtime in minutes, from the cinema's own metadata. */
  durationMinutes?: number;
  /** The cinema's own synopsis. */
  synopsis?: string;
  /** The language the cinema lists the film in. */
  language?: string;
  /** The certification the cinema lists (PG15, 18TC, ...). */
  certification?: string;
  /** The film's own page on the cinema. */
  url?: string;
  /** The cinema's own "Book Now" link for this film, if it publishes one. */
  bookingUrl?: string;
  /** The site's own slug for the film, when the card exposes one. */
  slug?: string;
}

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

export async function fetchHtml(url: string, timeoutMs = 30000): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'text/html' },
        signal: controller.signal,
      });
      if (!res.ok) return null;
      return await res.text();
    } finally {
      clearTimeout(timer);
    }
  } catch {
    return null;
  }
}

/**
 * Parse a ISO-8601 duration ("PT150M", "PT2H30M") into minutes.
 */
export function parseIsoDuration(value: string | undefined | null): number | undefined {
  if (!value) return undefined;
  const m = value.match(/^PT(?:(\d+)H)?(?:(\d+)M)?/i);
  if (!m) return undefined;
  const hours = m[1] ? parseInt(m[1], 10) : 0;
  const minutes = m[2] ? parseInt(m[2], 10) : 0;
  const total = hours * 60 + minutes;
  return total > 0 ? total : undefined;
}

/**
 * The YouTube key embedded in a URL or an embed path.
 */
export function extractYouTubeKey(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const m = value.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([\w-]{11})/);
  return m ? m[1] : undefined;
}

/**
 * Turn a possibly-relative URL into an absolute one against a base.
 */
export function absoluteUrl(url: string | undefined | null, base: string): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('//')) return `https:${trimmed}`;
  return `${base.replace(/\/$/, '')}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
}

/**
 * Extract everything a VOX per-film page publishes about one film.
 *
 * VOX renders a schema.org Movie JSON-LD block on every film page, which is
 * the cleanest source available: the poster, the runtime, the synopsis, the
 * language and the certification all come from it.
 */
export function parseVoxFilmDetails(html: string, base = 'https://bhr.voxcinemas.com'): FilmDetails {
  const $ = cheerio.load(html);
  const details: FilmDetails = {};

  // 1. The JSON-LD Movie block — the primary source.
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).contents().text().trim();
    if (!raw || details.durationMinutes) return;
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return;
    }
    const candidates: Record<string, unknown>[] = [];
    const collect = (node: unknown): void => {
      if (!node || typeof node !== 'object') return;
      const obj = node as Record<string, unknown>;
      candidates.push(obj);
      if (Array.isArray(obj['@graph'])) {
        for (const child of obj['@graph']) collect(child);
      }
    };
    collect(parsed);

    for (const node of candidates) {
      const type = node['@type'];
      if (type !== 'Movie' && type !== 'VideoObject') continue;

      const image = node['image'];
      if (typeof image === 'string') {
        details.posterUrl = absoluteUrl(image, base);
      } else if (Array.isArray(image) && typeof image[0] === 'string') {
        details.posterUrl = absoluteUrl(image[0], base);
      } else if (image && typeof image === 'object') {
        const url = (image as Record<string, unknown>)['url'];
        if (typeof url === 'string') details.posterUrl = absoluteUrl(url, base);
      }

      const duration = node['duration'];
      if (typeof duration === 'string') {
        details.durationMinutes = parseIsoDuration(duration);
      }

      const description = node['description'];
      if (typeof description === 'string' && description.trim()) {
        details.synopsis = description.trim();
      }

      const lang = node['inLanguage'];
      if (typeof lang === 'string' && lang.trim()) {
        details.language = lang.trim();
      }

      const rating = node['contentRating'];
      if (typeof rating === 'string' && rating.trim()) {
        details.certification = rating.trim();
      }
    }
  });

  // 2. The poster, as a fallback: the <img class="poster"> whose alt matches
  //    the page's <h1>. The page also renders posters for OTHER films in a
  //    "more like this" rail, so matching on alt is what makes this safe.
  const h1 = $('h1').first().text().trim();
  if (!details.posterUrl && h1) {
    let matched: string | undefined;
    $('img').each((_, el) => {
      if (matched) return;
      const alt = ($(el).attr('alt') || '').trim();
      if (alt && alt.toLowerCase() === h1.toLowerCase()) {
        matched = absoluteUrl($(el).attr('src'), base);
      }
    });
    if (matched) details.posterUrl = matched;
  }

  // 3. The trailer: the YouTube embed the page itself renders.
  if (!details.trailerKey) {
    $('iframe[src*="youtube.com/embed"], a[href*="youtube.com/embed"]').each((_, el) => {
      if (details.trailerKey) return;
      const src = $(el).attr('src') || $(el).attr('href') || '';
      details.trailerKey = extractYouTubeKey(src);
    });
  }

  // 4. The runtime, as a fallback: a bare "150 mins" somewhere on the page.
  if (!details.durationMinutes) {
    const text = $('body').text().replace(/\s+/g, ' ');
    const m = text.match(/\b(\d{1,3})\s*(?:mins?|minutes)\b/i);
    if (m) {
      const mins = parseInt(m[1], 10);
      if (mins > 0 && mins < 600) details.durationMinutes = mins;
    }
  }

  // 5. The language, as a fallback: the "Language: English" line.
  if (!details.language) {
    const text = $('body').text().replace(/\s+/g, ' ');
    const m = text.match(/Language:\s*([A-Za-z]+)/);
    if (m) details.language = m[1];
  }

  return details;
}

/**
 * Extract everything a Cineco listing card publishes about one film.
 *
 * Cineco renders each film as a `.movie-poster` div whose POSTER IS A CSS
 * BACKGROUND IMAGE, alongside a Fancybox link to the YouTube trailer and a
 * "Book Now" button pointing at the cinema's ticketing partner.
 */
export function parseCinecoCardDetails(
  cardHtml: string,
  base = 'https://bahrain.cineco.net'
): FilmDetails {
  const $ = cheerio.load(cardHtml);
  const details: FilmDetails = {};

  const posterEl = $('[class*="movie-poster"]').first();
  if (posterEl.length) {
    const style = posterEl.attr('style') || '';
    const bg = style.match(/background(?:-image)?\s*:\s*url\((['"]?)([^)'"]+)\1\)/i);
    if (bg) details.posterUrl = absoluteUrl(bg[2], base);
    const dataHref = posterEl.attr('data-href');
    if (dataHref) details.url = absoluteUrl(dataHref, base);
  }

  /*
   * The permalink can also be the card's OWN `data-href` on the tile.
   *
   * The coming-soon listing renders the poster tile with NO anchor inside it —
   * the link lives on the `data-href` attribute of the tile, and the title
   * link sits in a SIBLING `.movie-details` block. The now-showing listing
   * renders the two differently again. Both shapes are handled here so the
   * caller always has a slug to key on.
   */
  const slugFromDataHref = (() => {
    const href = posterEl.attr('data-href') || '';
    const m = href.match(/\/amy_movie\/([^/?#]+)\/?/);
    return m ? m[1] : '';
  })();

  if (!details.posterUrl) {
    const img = $('img').first();
    if (img.length) {
      details.posterUrl = absoluteUrl(
        img.attr('data-src') || img.attr('src') || undefined,
        base
      );
    }
  }

  $('a[href*="youtube.com/embed"]').each((_, el) => {
    if (details.trailerKey) return;
    details.trailerKey = extractYouTubeKey($(el).attr('href') || '');
  });

  $('a[href*="q-tickets.com"], a.booknow-button').each((_, el) => {
    if (details.bookingUrl) return;
    const href = $(el).attr('href');
    if (href) details.bookingUrl = absoluteUrl(href, base);
  });

  if (slugFromDataHref) details.slug = slugFromDataHref;

  return details;
}
