#!/usr/bin/env npx tsx

/**
 * VOX Bahrain Cinema Scraper - HTTP Only (no Playwright)
 * Uses native fetch + cheerio for parsing
 */

import * as cheerio from 'cheerio';
import { cleanTitle } from '../src/lib/cinema/title-clean';

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

      movies.push({
        title,
        slug,
        url: `${VOX_BASE}/movies/${slug}`,
      });
    });

    console.log(`  Found ${movies.length} films`);
    return movies;
  } catch (e) { console.log(`  ❌ ${e}`); return []; }
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
