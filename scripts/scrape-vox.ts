#!/usr/bin/env npx tsx

/**
 * VOX Bahrain Cinema Scraper - HTTP Only (no Playwright)
 * Uses native fetch + cheerio for parsing
 *
 * Returns { title, posterUrl } per movie so sync-cinema can use poster images.
 */

import * as cheerio from 'cheerio';

const VOX_URLS = {
  nowShowing: 'https://bhr.voxcinemas.com/movies/whatson',
  comingSoon: 'https://bhr.voxcinemas.com/movies/comingsoon',
};

export interface ScoredMovie {
  title: string;
  posterUrl: string | null;
}

export interface ScrapeResult {
  nowShowing: ScoredMovie[];
  comingSoon: ScoredMovie[];
  errors: string[];
}

const SPORTS_KEYWORDS = ['uefa', 'laliga', 'premier league', 'icc', 'cricket', 'football', 'rugby', 'tennis', 'boxing', 'mma', 'wwe', 'ufc', 'basketball', 'nba'];

// Language labels that, as an EXACT full title match, are UI noise — not movie titles
const BARE_LANGUAGE_LABELS = new Set([
  'english', 'arabic', 'malayalam', 'hindi', 'tamil', 'telugu', 'kannada',
]);

function isSportsEvent(title: string): boolean {
  return SPORTS_KEYWORDS.some(k => title.toLowerCase().includes(k));
}

/**
 * Slug guard: reject candidates that are all-lowercase, have no spaces,
 * and are longer than 8 characters — these are URL slugs from data-title,
 * not real movie titles.
 */
function isSlugLike(title: string): boolean {
  const t = title.trim();
  return t === t.toLowerCase() && !t.includes(' ') && t.length > 8;
}

/**
 * Clean a raw title string:
 *  - Decode HTML entities
 *  - Strip leading rating/age markers (PG, 18TC, etc.)
 *  - Collapse whitespace
 *  - Returns '' for junk or slug-like titles
 *
 * Does NOT strip language prefixes like "(Arabic)" — those are handled
 * by the junk filter on the whole string (exact-match only).
 */
function cleanTitle(raw: string): string {
  if (!raw) return '';
  let cleaned = raw
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/^(PG\s*\d*|18TC|15\+|TC\s*\d+|R|Rated\s+\w+|Rated)\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  const lower = cleaned.toLowerCase();

  // Exact-match junk: reject if the entire title IS a language label or UI word
  if (BARE_LANGUAGE_LABELS.has(lower)) return '';

  // Substring junk — only fires when the word appears as a standalone token
  const junkTokens = ['now playing', 'coming soon', 'buy ticket', 'book now'];
  if (junkTokens.some(j => lower === j || lower.includes(j + ' '))) return '';

  // Slug guard
  if (isSlugLike(cleaned)) return '';

  return cleaned;
}

/**
 * Extract poster URL from a movie card element.
 * Tries: src, data-src, data-lazy-src, srcset (first item).
 * Returns absolute URL or null.
 */
function extractPosterUrl($: cheerio.CheerioAPI, card: cheerio.Element): string | null {
  const $img = $(card).find('img').first();
  if (!$img.length) return null;

  const src = $img.attr('src') || '';
  const dataSrc = $img.attr('data-src') || '';
  const dataLazy = $img.attr('data-lazy-src') || '';
  const srcset = $img.attr('srcset') || '';

  let url = dataLazy || dataSrc || src;
  if (!url) return null;

  // Extract first URL from srcset
  if (srcset && !url) {
    const first = srcset.split(',')[0].trim().split(' ')[0];
    if (first) url = first;
  }

  // Skip non-HTTP images (base64, data URIs, SVG placeholders)
  if (!url.startsWith('http')) return null;

  return url;
}

/**
 * Scrape a VOX page, extracting titles AND poster URLs.
 *
 * Title selection strategy:
 *  1. Try to find h3 text within each movie card — preferred (human-readable).
 *  2. Fall back to data-title attribute on the card element.
 *  3. data-title slugs (all-lowercase, >8 chars, no spaces) are rejected by
 *     cleanTitle's isSlugLike() guard.
 *
 * Posters: extracted from <img> inside each movie card.
 */
async function scrapePage(url: string): Promise<ScoredMovie[]> {
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
    const results: ScoredMovie[] = [];

    // Try to find movie cards — each card should have a title and an image
    // Strategy: find all container elements that have both a heading and an image
    const cardSelectors = [
      '[class*="film-item"]',
      '[class*="movie-card"]',
      '[class*="movie-item"]',
      '[data-qa*="movie"]',
      '.movie-list li',
      '.films li',
    ];

    let foundCards = false;
    for (const sel of cardSelectors) {
      const cards = $(sel);
      if (cards.length > 0) {
        console.log(`  Found ${cards.length} potential cards with selector "${sel}"`);
        cards.each((_, card) => {
          const posterUrl = extractPosterUrl($, card);

          // Try h3 within card first (preferred)
          const h3Text = $(card).find('h3').first().text().trim();
          const dataTitle = $(card).attr('data-title') || '';

          // Prefer h3 if it has real content; otherwise use data-title
          let title = '';
          if (h3Text && h3Text.length > 2 && !isSlugLike(h3Text)) {
            title = h3Text;
          } else if (dataTitle && !isSlugLike(dataTitle)) {
            title = dataTitle;
          }

          const cleaned = cleanTitle(title);
          if (cleaned && cleaned.length > 2 && !isSportsEvent(cleaned)) {
            results.push({ title: cleaned, posterUrl });
          }
        });
        if (results.length > 0) foundCards = true;
        break;
      }
    }

    // Fallback: if no cards found, use old selectors at page level
    if (!foundCards) {
      console.log('  No card containers found — falling back to page-level selectors');
      const seenTitles = new Set<string>();

      // Primary: data-title on link elements
      $('[data-title]').each((_, el) => {
        const t = $(el).attr('data-title') || '';
        const cleaned = cleanTitle(t);
        if (cleaned && !seenTitles.has(cleaned.toLowerCase())) {
          seenTitles.add(cleaned.toLowerCase());
          // Try to find a poster near this element
          const poster = extractPosterUrl($, el as cheerio.Element) ||
                         $(el).closest('[class*="card"], [class*="item"]').find('img').first().attr('src') || null;
          results.push({ title: cleaned, posterUrl: poster || null });
        }
      });

      // Supplement with h3 titles (prefer these over data-title when both exist)
      const h3Seen = new Set<string>();
      $('h3').each((_, el) => {
        const t = $(el).text().trim();
        const cleaned = cleanTitle(t);
        if (cleaned && !seenTitles.has(cleaned.toLowerCase()) && !h3Seen.has(cleaned.toLowerCase())) {
          h3Seen.add(cleaned.toLowerCase());
          const poster = extractPosterUrl($, el as cheerio.Element);
          results.push({ title: cleaned, posterUrl: poster || null });
        }
      });
    }

    // Deduplicate by cleaned title (case-insensitive)
    const seen = new Set<string>();
    const deduped = results.filter(r => {
      const key = r.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    console.log(`  Extracted ${deduped.length} unique movies`);
    const withPoster = deduped.filter(r => r.posterUrl);
    console.log(`  Of which ${withPoster.length} have poster URLs`);
    const slugRejects = results.length - deduped.filter(r => cleanTitle(r.title) && r.title.length > 0).length;
    if (slugRejects > 0) console.log(`  Slug-guard rejected: ${slugRejects}`);

    return deduped;
  } catch (e) {
    console.log(`  ❌ ${e}`);
    return [];
  }
}

async function scrapeVOX(): Promise<ScrapeResult> {
  const result: ScrapeResult = { nowShowing: [], comingSoon: [], errors: [] };
  console.log('🎬 VOX Bahrain Scraper (HTTP + Posters)');
  console.log('='.repeat(50));

  const nowRaw = await scrapePage(VOX_URLS.nowShowing);
  result.nowShowing = nowRaw.filter(r => !isSportsEvent(r.title));

  const soonRaw = await scrapePage(VOX_URLS.comingSoon);
  result.comingSoon = soonRaw.filter(r => !isSportsEvent(r.title));

  // Cross-dedup: remove now-showing titles from coming-soon
  const nowKeys = new Set(result.nowShowing.map(r => r.title.toLowerCase()));
  result.comingSoon = result.comingSoon.filter(r => !nowKeys.has(r.title.toLowerCase()));

  console.log('\n📊 VOX SUMMARY');
  console.log(`Now Showing (${result.nowShowing.length}):`);
  result.nowShowing.forEach((r, i) =>
    console.log(`  ${i + 1}. ${r.title}${r.posterUrl ? ' ✓ poster' : ' ✗ no poster'}`)
  );
  console.log(`\nComing Soon (${result.comingSoon.length}):`);
  result.comingSoon.forEach((r, i) =>
    console.log(`  ${i + 1}. ${r.title}${r.posterUrl ? ' ✓ poster' : ' ✗ no poster'}`)
  );

  return result;
}

if (require.main === module) {
  scrapeVOX().then(r => {
    console.log('\n✅ VOX scrape complete');
    process.exit(r.errors.length > 0 ? 1 : 0);
  }).catch(e => { console.error(e); process.exit(1); });
}

export { scrapeVOX, VOX_URLS };
