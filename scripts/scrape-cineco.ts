#!/usr/bin/env npx tsx

/**
 * Cineco Bahrain Cinema Scraper
 * Scrapes movie titles from Cineco Bahrain website
 *
 * Run: npx tsx scripts/scrape-cineco.ts
 */

import { chromium, type Browser, type Page } from 'playwright';
import { cleanTitle } from '../src/lib/cinema/title-clean';
import { parseCinecoCardDetails } from '../src/lib/scrapers/film-details';

const CINE_CO_URLS = {
  nowShowing: 'https://bahrain.cineco.net/now-showing/',
  comingSoon: 'https://bahrain.cineco.net/coming-soon/',
};

/**
 * The base every Cineco per-film page hangs off.
 *
 * Note: `cineco.com.bh` does not resolve — the live Bahrain site is
 * `bahrain.cineco.net`. Building a URL against the wrong host produces a
 * link that cannot work.
 */
const CINECO_BASE = 'https://bahrain.cineco.net';

/**
 * A movie as listed by Cineco.
 *
 * `trailerKey` is the YouTube key of the trailer the cinema itself publishes
 * for the film. When present it is authoritative and needs no searching.
 */
export interface ScrapedCinecoMovie {
  slug: string;
  title: string;
  trailerKey?: string;

  /*
   * THE FIELDS THE SYNC NEEDS AND WAS NOT GETTING.
   *
   * Cineco renders each film as a `.movie-poster` div whose POSTER IS A CSS
   * BACKGROUND IMAGE, next to a "Book Now" button pointing at its ticketing
   * partner. The scraper read the title and the trailer but never the poster,
   * so a film TMDB could not match landed with no artwork at all and
   * rendered as a placeholder card.
   */
  /** Cineco's own poster for this film. */
  posterUrl?: string;
  /** Cineco's own "Book Now" link for this film. */
  bookingUrl?: string;
  /** True when the title came from a real /amy_movie/ permalink. */
  trusted?: boolean;
  /**
   * The film's own per-film page on Cineco.
   *
   * Built from the site's own slug (`/amy_movie/<slug>/`), never from the
   * title. Absent when the film was found by a title-only fallback that had
   * no permalink behind it.
   */
  url?: string;
}

interface ScrapeResult {
  nowShowing: ScrapedCinecoMovie[];
  comingSoon: ScrapedCinecoMovie[];
  errors: string[];
}

/**
 * Sports/event keywords to filter out (these are not movies)
 */
const SPORTS_KEYWORDS = [
  'uefa', 'laliga', 'premier league', 'icc', 'cricket', 'football',
  'rugby', 'tennis', 'boxing', 'mma', 'wwe', 'ufc', 'basketball',
  'nba', 'f1', 'formula', 'motorsport', 'racing', 'golf', 'swimming',
  'athletics', 'marathon', 'olympics', 'world cup', 'euro', 'championship'
];

/**
 * Check if title is a sports event (not a movie)
 */
function isSportsEvent(title: string): boolean {
  const lower = title.toLowerCase();
  return SPORTS_KEYWORDS.some(keyword => lower.includes(keyword));
}

/**
 * Check if title is valid movie title.
 *
 * `trusted` means the title came from a real /amy_movie/ permalink on the
 * Cineco site. Such a title IS a movie by construction, so the heuristics
 * that exist to filter out navigation junk must not be applied to it --
 * Cineco renders its titles in capitals, and "JOHN DOE" is a real film.
 */
function isValidTitle(title: string, trusted = false): boolean {
  if (!title || title.length < 2) return false;

  const lower = title.toLowerCase();

  // Skip sports events
  if (isSportsEvent(lower)) return false;

  // Skip if only numbers and special chars
  if (/^[^a-zA-Z]*$/.test(title)) return false;

  // Skip junk UI text - comprehensive list
  const junk = [
    'now playing', 'now showing', 'coming soon', 'buy ticket', 'book now',
    'learn more', 'read more', 'view details', 'english', 'arabic',
    'malayalam', 'hindi', 'tamil', 'telugu', 'kannada',
    'english)', 'arabic)', '(3d)', '(2d)', '3d', '2d',
    'in the spotlight', 'now playing', 'site', 'book',
    'connect with us', 'cookie policy', 'privacy policy',
    'terms of service', 'all rights reserved'
  ];
  if (junk.some(j => lower === j || lower.includes(j + ' ') || lower.includes(' ' + j))) return false;

  // Skip ALL CAPS short text (probably navigation). Not applied to a title
  // that came from a movie permalink -- those are all capitals legitimately.
  if (!trusted && title === title.toUpperCase() && title.length < 12) return false;

  return title.length >= 3;
}

/**
 * Scrape movies from a Cineco page.
 *
 * Returns the movies in the order they appear, de-duplicated by their
 * /amy_movie/<slug>/ permalink where one is available.
 *
 * Each movie carries the trailer the cinema itself publishes for it, when the
 * page offers one. That trailer is authoritative -- it is the trailer the
 * cinema is actually showing -- so it needs no searching and no guessing.
 */
async function scrapePage(page: Page, url: string): Promise<ScrapedCinecoMovie[]> {
  console.log(`\n📄 Scraping: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for page to render
    await page.waitForTimeout(3000);

    // PRIMARY STRATEGY: the movie permalinks.
    //
    // Cineco runs the "Amy Movie" WordPress theme, and every listing links to
    // /amy_movie/<slug>/. The slugs are stable identifiers that do not change
    // when the site restyles, whereas the display text and the CSS classes do.
    //
    // This matters: the scraper used to rely purely on CSS selectors
    // (`.movie-title`, `h3.title`, ...). When Cineco changed its theme those
    // selectors matched nothing and the scrape silently returned ZERO movies
    // while the site itself was perfectly healthy. A title-based scraper
    // reading a live WordPress theme is the wrong approach.
    //
    // The slug is also the correct DE-DUPLICATION key. The same film is
    // rendered twice on the page (a poster tile and a text row), so the
    // titles come back as "Soy Turkish" and "SOY (TURKISH)" -- the same movie
    // with different casing and punctuation. Comparing the raw titles does not
    // collapse them; comparing the slugs does.
    let movies: ScrapedCinecoMovie[] = [];

    const linked = await page
      .$$eval('a[href*="/amy_movie/"]', (elements) =>
        elements.map((el) => {
          const href = el.getAttribute('href') || '';
          const slug = (href.match(/\/amy_movie\/([^/?#]+)\/?/) || [])[1] || '';
          const text = (el.textContent || '').trim();
          return { slug, text };
        })
      )
      .catch(() => [] as { slug: string; text: string }[]);

    /*
     * The trailer AND the poster the cinema publishes for each film.
     *
     * Both live on the movie card: the trailer as a Fancybox link to a
     * YouTube embed, the poster as a CSS background-image on the
     * `.movie-poster` div. The card's OUTER HTML is captured so the shared
     * parser in src/lib/scrapers/film-details.ts can read them — one
     * implementation, used by both cinemas.
     */
    /*
     * EVERY card for a slug, not just the first one.
     *
     * Cineco renders each film TWICE: once as a poster tile (which carries the
     * poster and the permalink) and once as a text row (which carries the
     * trailer and the Book Now button). Neither card alone has everything, so
     * taking the first one per slug yields a film with a poster but no
     * trailer, or a trailer but no poster.
     *
     * All the cards for a slug are therefore collected and parsed together.
     */
    const cardsBySlug = await page
      .$$eval(
        '.customized-movie-poster, .movie-details, .movie-card, [class*="movie-poster"]',
        (cards) => {
          const found: Record<string, string[]> = {};
          for (const card of cards) {
            // The permalink is on an anchor in the text row, and on the tile's
            // own `data-href` in the coming-soon listing. Both are read.
            const titleLink = card.querySelector('a[href*="/amy_movie/"]');
            const dataHref = card.getAttribute('data-href') || '';
            const href = titleLink?.getAttribute('href') || dataHref;
            const slug = (href.match(/\/amy_movie\/([^/?#]+)\/?/) || [])[1] || '';
            if (!slug) continue;
            if (!found[slug]) found[slug] = [];
            found[slug].push(card.outerHTML);
          }
          return found;
        }
      )
      .catch((): Record<string, string[]> => ({}));

    const bySlug = new Map<string, { title: string; fromText: boolean }>();
    for (const { slug, text } of linked) {
      if (!slug) continue;
      const hasText = Boolean(text) && text.length > 1;
      const existing = bySlug.get(slug);

      if (!existing) {
        // No label seen for this slug yet.
        bySlug.set(slug, { title: hasText ? text : '', fromText: hasText });
        continue;
      }
      if (existing.fromText) continue; // Already have real text.

      // A slug-derived fallback is only a placeholder. Real link text always
      // wins over it.
      //
      // This matters more than it looks. Each movie is rendered TWICE: once
      // as a poster tile whose link has NO text, and once as a text row whose
      // link reads "JOHN DOE". The old code kept whichever came first, which
      // was always the textless poster link, so it fell back to the slug and
      // produced "john doe" -- lowercased, and with the year stuck on
      // ("the cat in the hat2026"). The real title was on the page the whole
      // time.
      if (hasText) {
        bySlug.set(slug, { title: text, fromText: true });
      }
    }

    // Fall back to the slug only for a movie we never saw any text for.
    //
    // The per-film URL is built from the site's OWN slug. Cineco runs the
    // "Amy Movie" WordPress theme and every film lives at
    // `/amy_movie/<slug>/`, so the slug IS the address. It is never
    // computed from the title.
    const resolved = Array.from(bySlug.entries()).map(([slug, entry]) => {
      // Merge every card for this slug: the poster comes from the tile, the
      // trailer and the booking link from the text row.
      const cardDetails = { posterUrl: undefined as string | undefined,
        trailerKey: undefined as string | undefined,
        bookingUrl: undefined as string | undefined,
        url: undefined as string | undefined };
      for (const cardHtml of cardsBySlug[slug] || []) {
        const d = parseCinecoCardDetails(cardHtml, CINECO_BASE);
        cardDetails.posterUrl = cardDetails.posterUrl || d.posterUrl;
        cardDetails.trailerKey = cardDetails.trailerKey || d.trailerKey;
        cardDetails.bookingUrl = cardDetails.bookingUrl || d.bookingUrl;
        cardDetails.url = cardDetails.url || d.url;
      }
      return {
        slug,
        title: entry.title || slug.replace(/-/g, ' '),
        trailerKey: cardDetails.trailerKey,
        posterUrl: cardDetails.posterUrl,
        bookingUrl: cardDetails.bookingUrl,
        trusted: entry.fromText,
        url: slug ? `${CINECO_BASE}/amy_movie/${slug}/` : undefined,
      };
    });

    if (resolved.length) {
      movies = resolved;
      console.log(`  Found ${movies.length} movies via /amy_movie/ links`);
    }

    // FALLBACK: CSS selectors, for when the theme changes again.
    const selectors = [
      '.movie-title',
      '.movie-card h3',
      '.film-title',
      '[class*="movie"] h3',
      'h3.title',
      '.card-title',
    ];

    for (const selector of selectors) {
      try {
        const found = await page.$$eval(selector, (elements) =>
          elements.map(el => el.textContent?.trim()).filter(Boolean) as string[]
        );
        if (found.length > movies.length) {
          movies = found.map((title) => ({ slug: '', title }));
        }
      } catch {
        // Selector didn't work, try next
      }
    }

    // If no movies found, try getting all h3 elements
    if (movies.length === 0) {
      const headings = await page.$$eval('h3', (elements) =>
        elements.map(el => el.textContent?.trim()).filter(Boolean) as string[]
      );
      movies = headings.map((title) => ({ slug: '', title }));
    }

    // Also try links with movie info
    if (movies.length === 0) {
      const linkTitles = await page.$$eval('a[href*="movie"]', (elements) =>
        elements.map(el => el.textContent?.trim()).filter(Boolean) as string[]
      );
      movies = linkTitles.map((title) => ({ slug: '', title }));
    }

    console.log(`  Found ${movies.length} movies`);

    return movies;
  } catch (error) {
    console.error(`  ❌ Error scraping ${url}:`, error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Main scrape function
 */
export async function scrapeCineco(): Promise<ScrapeResult> {
  const result: ScrapeResult = {
    nowShowing: [],
    comingSoon: [],
    errors: [],
  };

  let browser: Browser | null = null;

  try {
    console.log('🎬 Starting Cineco Bahrain Cinema Scraper');
    console.log('='.repeat(50));

    // Launch browser
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    // Take screenshot for debugging
    await page.screenshot({ path: 'cineco-debug.png' });

    // Scrape Now Showing
    const nowShowingRaw = await scrapePage(page, CINE_CO_URLS.nowShowing);
    result.nowShowing = nowShowingRaw
      .map((movie) => ({
        ...movie,
        // The shared cleanTitle strips entities, a leading rating token and
        // trailing tags such as the "(2026)" Cineco appends to its titles.
        // `toTitleCase` is applied only to a title that came from a real
        // permalink -- Cineco renders those in capitals.
        title: cleanTitle(movie.title, { toTitleCase: movie.trusted }),
      }))
      .filter((movie) => isValidTitle(movie.title, movie.trusted));

    // Small delay between pages
    await page.waitForTimeout(1000);

    // Scrape Coming Soon
    const comingSoonRaw = await scrapePage(page, CINE_CO_URLS.comingSoon);
    result.comingSoon = comingSoonRaw
      .map((movie) => ({
        ...movie,
        title: cleanTitle(movie.title, { toTitleCase: movie.trusted }),
      }))
      .filter((movie) => isValidTitle(movie.title, movie.trusted));

    // Remove duplicates within each category, by slug when we have one and by
    // title otherwise. The slug is the stable identity; the title is not.
    const dedupe = (movies: ScrapedCinecoMovie[]) => {
      const seen = new Map<string, ScrapedCinecoMovie>();
      for (const movie of movies) {
        const key = movie.slug || movie.title.toLowerCase();
        const existing = seen.get(key);
        if (!existing) {
          seen.set(key, movie);
          continue;
        }
        // Keep whichever entry actually carries a trailer.
        if (!existing.trailerKey && movie.trailerKey) {
          seen.set(key, { ...existing, trailerKey: movie.trailerKey });
        }
      }
      return Array.from(seen.values());
    };
    result.nowShowing = dedupe(result.nowShowing);
    result.comingSoon = dedupe(result.comingSoon);

    // Remove movies that appear in both lists (prioritize now showing)
    const nowShowingSet = new Set(
      result.nowShowing.map((movie) => (movie.slug || movie.title).toLowerCase())
    );
    result.comingSoon = result.comingSoon.filter(
      (movie) => !nowShowingSet.has((movie.slug || movie.title).toLowerCase())
    );

    console.log('\n' + '='.repeat(50));
    console.log('📊 CINE CO SCRAPE SUMMARY');
    console.log('='.repeat(50));
    console.log(`Now Showing: ${result.nowShowing.length}`);
    result.nowShowing.forEach((movie, i) =>
      console.log(`  ${i + 1}. ${movie.title}${movie.trailerKey ? ` [trailer ${movie.trailerKey}]` : ''}`)
    );
    console.log(`\nComing Soon: ${result.comingSoon.length}`);
    result.comingSoon.forEach((movie, i) =>
      console.log(`  ${i + 1}. ${movie.title}${movie.trailerKey ? ` [trailer ${movie.trailerKey}]` : ''}`)
    );

  } catch (error) {
    console.error('❌ Critical error:', error);
    result.errors.push(error instanceof Error ? error.message : 'Unknown error');
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return result;
}

// Run if called directly
if (require.main === module) {
  scrapeCineco()
    .then(result => {
      console.log('\n✅ Cineco scrape complete');
      process.exit(result.errors.length > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

export { CINE_CO_URLS };