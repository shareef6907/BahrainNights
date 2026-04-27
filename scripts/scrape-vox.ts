#!/usr/bin/env npx tsx

/**
 * VOX Bahrain Cinema Scraper - Using HTTP requests + Cheerio
 * Scrapes movie titles from VOX Cinema Bahrain website
 * 
 * Run: npx tsx scripts/scrape-vox.ts
 */

import * as cheerio from 'cheerio';

const VOX_URLS = {
  nowShowing: 'https://bhr.voxcinemas.com/movies/whatson',
  comingSoon: 'https://bhr.voxcinemas.com/movies/comingsoon',
};

interface ScrapeResult {
  nowShowing: string[];
  comingSoon: string[];
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
 * Clean and normalize movie title
 */
function cleanTitle(title: string): string {
  if (!title) return '';
  
  let cleaned = title
    // Remove HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    // Remove age rating prefixes: PG15, 18TC, PG13, 15+, etc.
    .replace(/^(PG\s*\d*|18TC|15\+|TC\s*\d+|R|Rated\s+\w+|Rated)\s*/i, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
  
  // Remove sports/concert keywords
  const lower = cleaned.toLowerCase();
  const eventKeywords = ['tour', 'experience', 'live', 'concert', 'festival', 'championship', 'match', 'game'];
  for (const keyword of eventKeywords) {
    if (lower.includes(keyword)) {
      return ''; // Mark for removal
    }
  }
  
  return cleaned;
}

/**
 * Check if title is valid movie title
 */
function isValidTitle(title: string): boolean {
  if (!title || title.length < 2) return false;
  
  const lower = title.toLowerCase();
  
  // Skip sports events
  if (isSportsEvent(lower)) return false;
  
  // Skip if only numbers and special chars
  if (/^[^a-zA-Z]*$/.test(title)) return false;
  
  return true;
}

/**
 * Scrape movie titles from a VOX page using HTTP + Cheerio
 */
async function scrapePage(url: string): Promise<string[]> {
  console.log(`\n📄 Scraping: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    
    if (!response.ok) {
      console.log(`  ❌ HTTP error: ${response.status}`);
      return [];
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const titles: string[] = [];
    
    // Extract from data-title attribute
    $('[data-title]').each((_, el) => {
      const title = $(el).attr('data-title');
      if (title) {
        titles.push(title);
      }
    });
    
    // Also try h3 headings as fallback
    $('h3').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 2) {
        titles.push(text);
      }
    });
    
    // Try movie card elements
    $('.movie-card, .film-card, [class*="movie"] h3, article h3').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 2 && text.length < 200) {
        titles.push(text);
      }
    });
    
    // Deduplicate
    const uniqueTitles = [...new Set(titles)];
    
    console.log(`  Found ${uniqueTitles.length} raw titles`);
    
    return uniqueTitles;
  } catch (error) {
    console.error(`  ❌ Error scraping ${url}:`, error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Main scrape function
 */
export async function scrapeVOX(): Promise<ScrapeResult> {
  const result: ScrapeResult = {
    nowShowing: [],
    comingSoon: [],
    errors: [],
  };
  
  try {
    console.log('🎬 Starting VOX Bahrain Cinema Scraper');
    console.log('='.repeat(50));
    
    // Scrape Now Showing
    const nowShowingRaw = await scrapePage(VOX_URLS.nowShowing);
    result.nowShowing = nowShowingRaw
      .map(cleanTitle)
      .filter(isValidTitle);
    
    // Scrape Coming Soon
    const comingSoonRaw = await scrapePage(VOX_URLS.comingSoon);
    result.comingSoon = comingSoonRaw
      .map(cleanTitle)
      .filter(isValidTitle);
    
    // Remove duplicates within each category (case-insensitive)
    const seenNow = new Set<string>();
    result.nowShowing = result.nowShowing.filter(title => {
      const key = title.toLowerCase();
      if (seenNow.has(key)) return false;
      seenNow.add(key);
      return true;
    });
    
    const seenSoon = new Set<string>();
    result.comingSoon = result.comingSoon.filter(title => {
      const key = title.toLowerCase();
      if (seenSoon.has(key)) return false;
      seenSoon.add(key);
      return true;
    });
    
    // Remove movies that appear in both lists (prioritize now showing)
    const nowShowingSet = new Set(result.nowShowing.map(t => t.toLowerCase()));
    result.comingSoon = result.comingSoon.filter(t => !nowShowingSet.has(t.toLowerCase()));
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 VOX SCRAPE SUMMARY');
    console.log('='.repeat(50));
    console.log(`Now Showing: ${result.nowShowing.length}`);
    result.nowShowing.forEach((title, i) => console.log(`  ${i + 1}. ${title}`));
    console.log(`\nComing Soon: ${result.comingSoon.length}`);
    result.comingSoon.forEach((title, i) => console.log(`  ${i + 1}. ${title}`));
    
  } catch (error) {
    console.error('❌ Critical error:', error);
    result.errors.push(error instanceof Error ? error.message : 'Unknown error');
  }
  
  return result;
}

// Run if called directly
if (require.main === module) {
  scrapeVOX()
    .then(result => {
      console.log('\n✅ VOX scrape complete');
      process.exit(result.errors.length > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

export { VOX_URLS };