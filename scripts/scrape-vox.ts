#!/usr/bin/env npx tsx

/**
 * VOX Bahrain Cinema Scraper - Using Playwright
 * Handles lazy-loaded content and website protections
 * 
 * Run: npx tsx scripts/scrape-vox.ts
 */

import { chromium, type Browser, type Page } from 'playwright';

const VOX_URLS = {
  nowShowing: 'https://bhr.voxcinemas.com/movies/whatson',
  comingSoon: 'https://bhr.voxcinemas.com/movies/comingsoon',
};

interface ScrapeResult {
  nowShowing: string[];
  comingSoon: string[];
  errors: string[];
}

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

function cleanTitle(title: string): string {
  if (!title) return '';
  return title
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/^(PG\s*\d*|18TC|15\+|TC\s*\d+|R|Rated\s+\w+|Rated)\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isValidTitle(title: string): boolean {
  if (!title || title.length < 2) return false;
  const lower = title.toLowerCase();
  if (isSportsEvent(lower)) return false;
  if (/^[^a-zA-Z]*$/.test(title)) return false;
  
  // Skip junk UI text
  const junk = ['now playing', 'coming soon', 'buy ticket', 'book now', 'english', 'arabic', 'malayalam', '3d', '2d'];
  if (junk.some(j => lower === j || lower.includes(j + ' '))) return false;
  
  return title.length >= 3;
}

async function scrollPage(page: Page): Promise<void> {
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);
  }
}

async function scrapePage(page: Page, url: string): Promise<string[]> {
  console.log(`\n📄 Scraping: ${url}`);
  
  let retries = 3;
  while (retries > 0) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000);
      await scrollPage(page);
      break;
    } catch (e) {
      retries--;
      if (retries === 0) {
        console.error(`  ❌ Failed: ${e}`);
        return [];
      }
      await page.waitForTimeout(2000);
    }
  }
  
  let titles: string[] = [];
  
  // Try data-title attribute
  const dataTitles = await page.$$eval('[data-title]', els => els.map(e => e.getAttribute('data-title')).filter(Boolean));
  if (dataTitles.length) titles = [...titles, ...dataTitles];
  
  // Try movie title selectors
  const selectors = ['.movie-title', '.movie-name', '.film-title', 'h3[class*=""]', '[class*="title"]'];
  for (const sel of selectors) {
    try {
      const found = await page.$$eval(sel, els => els.map(e => e.textContent?.trim()).filter(t => t && t.length > 2));
      if (found.length > titles.length) titles = found;
    } catch {}
  }
  
  // Fallback: all headings
  if (!titles.length) {
    titles = await page.$$eval('h3, h4', els => els.map(e => e.textContent?.trim()).filter(t => t && t.length > 2));
  }
  
  console.log(`  Found ${titles.length} titles`);
  return [...new Set(titles)];
}

export async function scrapeVOX(): Promise<ScrapeResult> {
  const result: ScrapeResult = { nowShowing: [], comingSoon: [], errors: [] };
  let browser: Browser | null = null;
  
  try {
    console.log('🎬 Starting VOX Bahrain Cinema Scraper');
    console.log('='.repeat(50));
    
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();
    
    const nowRaw = await scrapePage(page, VOX_URLS.nowShowing);
    result.nowShowing = nowRaw.map(cleanTitle).filter(isValidTitle);
    
    await page.waitForTimeout(1000);
    
    const soonRaw = await scrapePage(page, VOX_URLS.comingSoon);
    result.comingSoon = soonRaw.map(cleanTitle).filter(isValidTitle);
    
    // Deduplicate
    const seenNow = new Set<string>();
    result.nowShowing = result.nowShowing.filter(t => {
      const k = t.toLowerCase();
      if (seenNow.has(k)) return false;
      seenNow.add(k);
      return true;
    });
    
    const seenSoon = new Set<string>();
    result.comingSoon = result.comingSoon.filter(t => {
      const k = t.toLowerCase();
      if (seenSoon.has(k)) return false;
      seenSoon.add(k);
      return true;
    });
    
    // Remove now showing from coming soon
    const nowSet = new Set(result.nowShowing.map(t => t.toLowerCase()));
    result.comingSoon = result.comingSoon.filter(t => !nowSet.has(t.toLowerCase()));
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 VOX SCRAPE SUMMARY');
    console.log('='.repeat(50));
    console.log(`Now Showing: ${result.nowShowing.length}`);
    result.nowShowing.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
    console.log(`\nComing Soon: ${result.comingSoon.length}`);
    result.comingSoon.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
    
  } catch (error) {
    console.error('❌ Critical error:', error);
    result.errors.push(error instanceof Error ? error.message : 'Unknown error');
  } finally {
    if (browser) await browser.close();
  }
  
  return result;
}

if (require.main === module) {
  scrapeVOX().then(r => {
    console.log('\n✅ VOX scrape complete');
    process.exit(r.errors.length > 0 ? 1 : 0);
  }).catch(e => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  });
}

export { VOX_URLS };