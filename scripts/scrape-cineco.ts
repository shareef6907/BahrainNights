#!/usr/bin/env npx tsx

/**
 * Cineco Bahrain Cinema Scraper
 * Scrapes movie titles from Cineco Bahrain website
 * 
 * Run: npx tsx scripts/scrape-cineco.ts
 */

import { chromium, type Browser, type Page } from 'playwright';

const CINE_CO_URLS = {
  nowShowing: 'https://bahrain.cineco.net/now-showing/',
  comingSoon: 'https://bahrain.cineco.net/coming-soon/',
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
  
  return title
    // Remove HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
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
 * Scrape movie titles from a Cineco page
 */
async function scrapePage(page: Page, url: string): Promise<string[]> {
  console.log(`\n📄 Scraping: ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for page to render
    await page.waitForTimeout(3000);
    
    // Try multiple selectors for movie cards
    let titles: string[] = [];
    
    // Try common movie card selectors
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
    
    // If no titles found, try getting all h3 elements
    if (titles.length === 0) {
      titles = await page.$$eval('h3', (elements) =>
        elements.map(el => el.textContent?.trim()).filter(Boolean) as string[]
      );
    }
    
    // Also try links with movie info
    if (titles.length === 0) {
      const linkTitles = await page.$$eval('a[href*="movie"]', (elements) =>
        elements.map(el => el.textContent?.trim()).filter(Boolean) as string[]
      );
      titles = [...titles, ...linkTitles];
    }
    
    console.log(`  Found ${titles.length} titles`);
    
    return titles;
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
      .map(cleanTitle)
      .filter(isValidTitle);
    
    // Small delay between pages
    await page.waitForTimeout(1000);
    
    // Scrape Coming Soon
    const comingSoonRaw = await scrapePage(page, CINE_CO_URLS.comingSoon);
    result.comingSoon = comingSoonRaw
      .map(cleanTitle)
      .filter(isValidTitle);
    
    // Remove duplicates within each category
    result.nowShowing = [...new Set(result.nowShowing.map(t => t.toLowerCase()))].map(t => 
      result.nowShowing.find(x => x.toLowerCase() === t) || t
    );
    result.comingSoon = [...new Set(result.comingSoon.map(t => t.toLowerCase()))].map(t => 
      result.comingSoon.find(x => x.toLowerCase() === t) || t
    );
    
    // Remove movies that appear in both lists (prioritize now showing)
    const nowShowingSet = new Set(result.nowShowing.map(t => t.toLowerCase()));
    result.comingSoon = result.comingSoon.filter(t => !nowShowingSet.has(t.toLowerCase()));
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 CINE CO SCRAPE SUMMARY');
    console.log('='.repeat(50));
    console.log(`Now Showing: ${result.nowShowing.length}`);
    result.nowShowing.forEach((title, i) => console.log(`  ${i + 1}. ${title}`));
    console.log(`\nComing Soon: ${result.comingSoon.length}`);
    result.comingSoon.forEach((title, i) => console.log(`  ${i + 1}. ${title}`));
    
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

export { scrapeCineco, CINE_CO_URLS };