#!/usr/bin/env npx tsx

/**
 * Cineco Bahrain Cinema Scraper
 * Scrapes movie titles AND poster URLs from Cineco Bahrain website
 *
 * Returns { title, posterUrl } per movie so sync-cinema can use poster images.
 *
 * Run: npx tsx scripts/scrape-cineco.ts
 */

import { chromium, type Browser, type Page } from 'playwright';

const CINE_CO_URLS = {
  nowShowing: 'https://bahrain.cineco.net/now-showing/',
  comingSoon: 'https://bahrain.cineco.net/coming-soon/',
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

/**
 * Format/language tokens to strip from the END of titles.
 * Applied before normalization.
 */
const FORMAT_TOKENS = [
  '3d', '2d', 'imax', '4dx', 'mal', 'tam', 'hin', 'tel',
  'arabic', 'english', 'malayalam', 'hindi', 'tamil', 'telugu', 'kannada',
];

function stripFormatVariants(title: string): string {
  // Strip trailing format/language markers like (3D), (MAL), [2D] from title end.
  // Case-insensitive. Only strips tokens from FORMAT_TOKENS.
  // Uses a simple string approach to avoid regex escaping issues.
  let result = title;
  for (const token of FORMAT_TOKENS) {
    // Try (TOKEN) pattern
    const re1 = new RegExp('\\s*\\(\\s*' + token + '\\s*\\)\\s*$', 'i');
    result = result.replace(re1, '');
    // Try [TOKEN] pattern
    const re2 = new RegExp('\\s*\\[\\s*' + token + '\\s*\\]\\s*$', 'i');
    result = result.replace(re2, '');
  }
  return result.trim();
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

function isSportsEvent(title: string): boolean {
  const lower = title.toLowerCase();
  return SPORTS_KEYWORDS.some(keyword => lower.includes(keyword));
}

/**
 * Clean and normalize movie title.
 * Applies: HTML entity decode, strip format variants (3D, MAL, etc.),
 * collapse whitespace.
 */
function cleanTitle(title: string): string {
  if (!title) return '';

  let cleaned = title
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

  // Strip trailing format/language markers: (3D), (MAL), [2D], etc.
  // This must be applied to produce clean, mergeable keys.
  cleaned = stripFormatVariants(cleaned).trim();

  return cleaned;
}

/**
 * Check if title is a valid movie title (not UI noise).
 * Uses exact-match for junk — the whole title must equal the junk word,
 * or start/end with it as a full token (not as a substring).
 */
function isValidTitle(title: string): boolean {
  if (!title || title.length < 2) return false;

  const lower = title.toLowerCase();

  // Skip sports events
  if (isSportsEvent(lower)) return false;

  // Skip if only numbers and special chars
  if (/^[^a-zA-Z]*$/.test(title)) return false;

  // Skip ALL CAPS short text (probably navigation labels)
  if (title === title.toUpperCase() && title.length < 12) return false;

  // Exact-match junk — whole title must equal these words
  const junkExact = new Set([
    'now playing', 'now showing', 'coming soon', 'buy ticket', 'book now',
    'learn more', 'read more', 'view details',
    'in the spotlight', 'site', 'book',
    'connect with us', 'cookie policy', 'privacy policy',
    'terms of service', 'all rights reserved',
    'english', 'arabic', 'malayalam', 'hindi', 'tamil', 'telugu', 'kannada',
  ]);
  if (junkExact.has(lower)) return false;

  // Token-boundary junk — the word appears as a standalone word in the title
  // Only applies to short UI phrases, not real movie titles
  const junkTokens = ['english', 'arabic', 'malayalam', 'hindi', 'tamil', 'telugu', 'kannada'];
  // These are stripped only if they appear as the ENTIRE title (already handled above)
  // We intentionally do NOT use substring includes() for language words anymore —
  // "(Arabic) El Gawahergy" should pass through

  return title.length >= 3;
}

/**
 * Extract poster URL from a Playwright page element (card container).
 * Tries: img src, img data-src, img data-lazy-src, srcset first item.
 * Returns absolute URL or null.
 */
async function extractPosterUrl(page: Page, card: cheerio.Element): Promise<string | null> {
  try {
    const imgSrc = await page.evaluate((el) => {
      const img = (el as Element).querySelector('img');
      if (!img) return null;
      return (
        (img as HTMLImageElement).src ||
        (img as HTMLImageElement).getAttribute('data-src') ||
        (img as HTMLImageElement).getAttribute('data-lazy-src') ||
        null
      );
    }, card);

    if (!imgSrc) return null;
    if (!imgSrc.startsWith('http')) return null; // Skip base64, data URIs
    return imgSrc;
  } catch {
    return null;
  }
}

import * as cheerio from 'cheerio';

/**
 * Scrape movie titles and poster URLs from a Cineco page.
 * Uses Playwright to handle JS-rendered content.
 */
async function scrapePage(page: Page, url: string): Promise<ScoredMovie[]> {
  console.log(`\n📄 Scraping: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    let titles: string[] = [];

    // Try each explicit selector; keep the one that finds the most
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
        if (found.length > titles.length) {
          titles = found;
        }
      } catch {
        // Selector didn't work, try next
      }
    }

    // Fallback: all h3 on page
    if (titles.length === 0) {
      titles = await page.$$eval('h3', (elements) =>
        elements.map(el => el.textContent?.trim()).filter(Boolean) as string[]
      );
    }

    console.log(`  Found ${titles.length} title candidates`);

    // Try to extract poster URLs by finding movie cards
    const scoredMovies: ScoredMovie[] = [];
    let posterCount = 0;

    // Get the full HTML for cheerio-based poster extraction
    const html = await page.content();
    const $ = cheerio.load(html);

    for (const title of titles) {
      const cleaned = cleanTitle(title);
      if (!isValidTitle(cleaned)) continue;

      // Try to find a poster for this title by locating the card it's in
      // Look for an img near the title element
      let posterUrl: string | null = null;

      // Strategy: find card containers and match by title proximity
      const cardSelectors = ['.movie-card', '.movie-item', '[class*="movie"]'];
      for (const cardSel of cardSelectors) {
        const cards = $(cardSel);
        for (const card of cards.toArray()) {
          const cardHtml = $(card).html() || '';
          // Check if this card contains (or is near) our title
          if (cardHtml.toLowerCase().includes(cleaned.toLowerCase().substring(0, 10))) {
            const img = $(card).find('img').first();
            const src = img.attr('src') || img.attr('data-src') || img.attr('data-lazy-src') || '';
            if (src && src.startsWith('http')) {
              posterUrl = src;
              break;
            }
          }
        }
        if (posterUrl) break;
      }

      // Also try: find img elements directly and pair with nearest title
      if (!posterUrl) {
        const imgs = $('img[src^="http"]');
        for (const img of imgs.toArray()) {
          const src = $(img).attr('src') || '';
          if (src && (src.includes('poster') || src.includes('movie') || src.includes('cdn') || src.includes('cineco'))) {
            posterUrl = src;
            posterCount++;
            break;
          }
        }
      }

      scoredMovies.push({ title: cleaned, posterUrl });
    }

    console.log(`  Extracted ${scoredMovies.length} valid movies`);
    console.log(`  Poster URLs found: ${posterCount}`);

    return scoredMovies;
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

    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    await page.screenshot({ path: 'cineco-debug.png' });

    const nowShowingRaw = await scrapePage(page, CINE_CO_URLS.nowShowing);
    result.nowShowing = nowShowingRaw;

    await page.waitForTimeout(1000);

    const comingSoonRaw = await scrapePage(page, CINE_CO_URLS.comingSoon);
    result.comingSoon = comingSoonRaw;

    // Deduplicate within each list (case-insensitive)
    const dedupNow = new Set<string>();
    result.nowShowing = result.nowShowing.filter(r => {
      if (dedupNow.has(r.title.toLowerCase())) return false;
      dedupNow.add(r.title.toLowerCase());
      return true;
    });

    const dedupSoon = new Set<string>();
    result.comingSoon = result.comingSoon.filter(r => {
      if (dedupSoon.has(r.title.toLowerCase())) return false;
      dedupSoon.add(r.title.toLowerCase());
      return true;
    });

    // Cross-dedup: remove now-showing titles from coming-soon
    const nowKeys = new Set(result.nowShowing.map(r => r.title.toLowerCase()));
    result.comingSoon = result.comingSoon.filter(r => !nowKeys.has(r.title.toLowerCase()));

    console.log('\n' + '='.repeat(50));
    console.log('📊 CINE CO SCRAPE SUMMARY');
    console.log('='.repeat(50));
    console.log(`Now Showing (${result.nowShowing.length}):`);
    result.nowShowing.forEach((r, i) =>
      console.log(`  ${i + 1}. ${r.title}${r.posterUrl ? ' ✓ poster' : ' ✗ no poster'}`)
    );
    console.log(`\nComing Soon (${result.comingSoon.length}):`);
    result.comingSoon.forEach((r, i) =>
      console.log(`  ${i + 1}. ${r.title}${r.posterUrl ? ' ✓ poster' : ' ✗ no poster'}`)
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
