#!/usr/bin/env npx tsx

/**
 * VOX Bahrain Cinema Scraper - HTTP Only (no Playwright)
 * Uses native fetch + cheerio for parsing
 */

import * as cheerio from 'cheerio';
import { cleanTitle } from '../src/lib/cinema/title-clean';
import {
  fetchHtml,
  parseVoxFilmDetails,
  type FilmDetails,
} from '../src/lib/scrapers/film-details';

const VOX_URLS = {
  nowShowing: 'https://bhr.voxcinemas.com/movies/whatson',
  comingSoon: 'https://bhr.voxcinemas.com/movies/comingsoon',
};

/** The base every VOX per-film page hangs off. */
export const VOX_BASE = 'https://bhr.voxcinemas.com';

/**
 * A film as VOX publishes it.
 *
 * `slug` is the film's OWN identifier on VOX — the last path segment of its
 * per-film page (`/movies/<slug>`). It is NOT derived from the title: VOX's
 * slugs carry a language or format suffix that the title never implies
 * ("Hadoota" -> `hadoota-arabic`, "Godzilla Minus Zero" ->
 * `godzilla-minus-zero-japanese`). Computing a slug from a title would
 * produce URLs that 404.
 */
export interface ScrapedVoxMovie {
  title: string;
  /** The per-film slug on VOX, e.g. `i-play-rocky`. */
  slug: string;
  /** The absolute per-film URL. */
  url: string;

  /*
   * THE FIELDS THE SYNC NEEDS AND WAS NOT GETTING.
   *
   * The scraper used to return only a title, a slug and a URL. The sync then
   * looked up the film on TMDB, and when TMDB did not know it — which is most
   * of the local Indian, Telugu and Malayalam films, and every live viewing —
   * the row landed with no poster, no runtime and no trailer. Those rows are
   * the "BAHRAIN NIGHTS" placeholder cards.
   *
   * VOX publishes all of it, on the film's own page. These are read from the
   * cinema, never guessed.
   */

  /** VOX's own poster for this film. */
  posterUrl?: string;
  /** The YouTube key of the trailer VOX publishes for this film. */
  trailerKey?: string;
  /** The runtime in minutes, from VOX's own metadata. */
  durationMinutes?: number;
  /** VOX's own synopsis. */
  synopsis?: string;
  /** The language VOX lists the film in. */
  language?: string;
  /** The certification VOX lists (PG15, 18TC, ...). */
  certification?: string;
}

interface ScrapeResult {
  nowShowing: ScrapedVoxMovie[];
  comingSoon: ScrapedVoxMovie[];
  errors: string[];
}

const SPORTS_KEYWORDS = ['uefa', 'laliga', 'premier league', 'icc', 'cricket', 'football', 'rugby', 'tennis', 'boxing', 'mma', 'wwe', 'ufc', 'basketball', 'nba'];

function isSportsEvent(title: string): boolean {
  return SPORTS_KEYWORDS.some(k => title.toLowerCase().includes(k));
}

/**
 * Titles a cinema prints that are not films.
 *
 * This is deliberately NOT part of the shared cleanTitle: it is a VOX-specific
 * filter about what the page contains, not a rule about how a title is
 * formatted. Formatting lives in src/lib/cinema/title-clean.ts and is shared.
 */
function isJunkTitle(title: string): boolean {
  const lower = title.toLowerCase();
  const junk = ['now playing', 'coming soon', 'buy ticket', 'book now', 'english', 'arabic', 'malayalam', '3d', '2d'];
  return junk.some(j => lower === j || lower.includes(j + ' '));
}

/**
 * Parse one VOX listing page.
 *
 * Each film is an `<article>` that carries BOTH the display title
 * (`data-title`, duplicated in the `<h3>`) and a link to the film's own page
 * (`/movies/<slug>`).
 *
 * The old parser read `[data-title]` and `<h3>` elements independently and
 * kept only the title string, which is why the site could never build a
 * per-film booking link: the slug — the thing that makes the link possible —
 * was right there in the same `<article>` and was thrown away.
 *
 * Reading the two together is what makes the per-film URL derivable without
 * guessing. The slug is NEVER computed from the title.
 */
async function scrapePage(url: string): Promise<ScrapedVoxMovie[]> {
  console.log(`📄 Scraping: ${url}`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html',
      },
    });
    if (!res.ok) { console.log(`  ❌ HTTP ${res.status}`); return []; }
    const html = await res.text();
    const $ = cheerio.load(html);

    const movies: ScrapedVoxMovie[] = [];
    const seen = new Set<string>();

    $('article').each((_, article) => {
      const $article = $(article);

      // The title: `data-title` is the authoritative copy, the `<h3>` is the
      // rendered one. They agree on the live site; `data-title` wins because
      // it is not affected by nested markup.
      const rawTitle =
        $article.attr('data-title') ||
        $article.find('h3').first().text().trim();

      if (!rawTitle) return;

      // The per-film path, from the film's own link inside the same article.
      const href = $article.find('a[href*="/movies/"]').first().attr('href') || '';
      const slug = (href.match(/\/movies\/([^/?#]+)/) || [])[1] || '';

      if (!slug) return;
      // The listing pages themselves are not films.
      if (slug === 'whatson' || slug === 'comingsoon') return;

      const title = cleanTitle(rawTitle);
      if (!title || title.length <= 2) return;
      if (isSportsEvent(title)) return;
      if (isJunkTitle(title)) return;

      const key = `${slug}|${title.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);

      /*
       * The poster, straight off the listing card.
       *
       * VOX renders each film as an <article> containing the film's own
       * <img>. The `src` is already an absolute URL on assets.voxcinemas.com.
       * Before this, the poster was never read here, so a film TMDB could not
       * match had no poster at all and rendered as a placeholder card.
       */
      const posterSrc = $article.find('img').first().attr('src') || '';
      const posterUrl = posterSrc.startsWith('http') ? posterSrc : undefined;

      const cardText = $article.text().replace(/\s+/g, ' ');
      const languageMatch = cardText.match(/Language:\s*([A-Za-z]+)/);
      const certMatch = cardText.match(/\b(PG-?\d*|18\+?|15\+?|18TC|U|A|G|M)\b/);

      movies.push({
        title,
        slug,
        url: `${VOX_BASE}/movies/${slug}`,
        posterUrl,
        language: languageMatch ? languageMatch[1] : undefined,
        certification: certMatch ? certMatch[1] : undefined,
      });
    });

    console.log(`  Found ${movies.length} films`);
    return movies;
  } catch (e) { console.log(`  ❌ ${e}`); return []; }
}

/**
 * Fill in the details only the film's OWN page carries.
 *
 * The listing page gives the poster, the title and the slug. The trailer, the
 * runtime, the synopsis and the language live on the per-film page, which VOX
 * publishes a schema.org Movie JSON-LD block for.
 *
 * This is what turns a film TMDB has never heard of into a real card instead
 * of a placeholder: the poster comes from the listing, and the trailer,
 * runtime and synopsis come from here.
 *
 * The pages are fetched CONCURRENTLY and with a small delay, because there
 * are 20-30 films per listing and a serial fetch of 30 pages takes minutes.
 */
async function enrichWithFilmDetails(
  movies: ScrapedVoxMovie[],
  label: string
): Promise<ScrapedVoxMovie[]> {
  const CONCURRENCY = 6;
  const results: ScrapedVoxMovie[] = [];
  let enriched = 0;
  let failed = 0;

  const queue = [...movies];

  const worker = async (): Promise<void> => {
    for (;;) {
      const movie = queue.shift();
      if (!movie) return;
      const html = await fetchHtml(movie.url, 25000);
      if (!html) {
        failed++;
        // A film we could not open still keeps its listing poster.
        results.push(movie);
        continue;
      }
      const details: FilmDetails = parseVoxFilmDetails(html, VOX_BASE);
      const merged: ScrapedVoxMovie = {
        ...movie,
        posterUrl: movie.posterUrl || details.posterUrl,
        trailerKey: details.trailerKey,
        durationMinutes: details.durationMinutes,
        synopsis: details.synopsis,
        language: movie.language || details.language,
        certification: movie.certification || details.certification,
      };
      if (details.trailerKey || details.durationMinutes || details.synopsis) {
        enriched++;
      }
      results.push(merged);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, movies.length) }, () => worker())
  );

  // Keep the listing order stable.
  const order = new Map(movies.map((m, i) => [m.slug, i]));
  results.sort(
    (a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0)
  );

  const withPoster = results.filter((m) => m.posterUrl).length;
  const withTrailer = results.filter((m) => m.trailerKey).length;
  const withRuntime = results.filter((m) => m.durationMinutes).length;
  console.log(
    `  ${label}: ${results.length} films — poster ${withPoster}, ` +
      `trailer ${withTrailer}, runtime ${withRuntime} ` +
      `(detail pages failed: ${failed})`
  );
  return results;
}

async function scrapeVOX(): Promise<ScrapeResult> {
  const result: ScrapeResult = { nowShowing: [], comingSoon: [], errors: [] };
  console.log('🎬 VOX Bahrain Scraper (HTTP)');
  console.log('='.repeat(40));

  const nowRaw = await scrapePage(VOX_URLS.nowShowing);
  result.nowShowing = nowRaw;

  const soonRaw = await scrapePage(VOX_URLS.comingSoon);
  result.comingSoon = soonRaw;

  // Remove duplicates and cross-dups.
  //
  // The de-dup key is the SLUG, not the title: the same film is listed once
  // per format ("Avengers: Doomsday" and "Avengers: Doomsday (Infinity
  // Vision)" are DIFFERENT VOX pages with different slugs, and both are real
  // listings). What must collapse is the same page appearing in both lists.
  const nowSet = new Set(result.nowShowing.map(m => m.slug));
  result.comingSoon = result.comingSoon.filter(m => !nowSet.has(m.slug));

  // Now that the lists are settled, open each film's own page for the
  // trailer, the runtime and the synopsis.
  console.log('\n🔎 Fetching per-film details...');
  result.nowShowing = await enrichWithFilmDetails(result.nowShowing, 'Now Showing');
  result.comingSoon = await enrichWithFilmDetails(result.comingSoon, 'Coming Soon');

  console.log('\n📊 VOX SUMMARY');
  console.log(`Now Showing (${result.nowShowing.length}):`);
  result.nowShowing.forEach((m, i) => console.log(`  ${i + 1}. ${m.title} -> ${m.url}`));
  console.log(`\nComing Soon (${result.comingSoon.length}):`);
  result.comingSoon.forEach((m, i) => console.log(`  ${i + 1}. ${m.title} -> ${m.url}`));

  return result;
}

if (require.main === module) {
  scrapeVOX().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}
export { scrapeVOX, VOX_URLS };
