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

interface ScrapeResult {
  nowShowing: string[];
  comingSoon: string[];
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

async function scrapePage(url: string): Promise<string[]> {
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
    const titles: string[] = [];
    $('[data-title]').each((_, el) => { const t = $(el).attr('data-title'); if (t) titles.push(t); });
    $('h3').each((_, el) => { const t = $(el).text().trim(); if (t && t.length > 2) titles.push(t); });
    console.log(`  Found ${titles.length} titles`);
    return [...new Set(titles)];
  } catch (e) { console.log(`  ❌ ${e}`); return []; }
}

async function scrapeVOX(): Promise<ScrapeResult> {
  const result: ScrapeResult = { nowShowing: [], comingSoon: [], errors: [] };
  console.log('🎬 VOX Bahrain Scraper (HTTP)');
  console.log('='.repeat(40));
  
  const nowRaw = await scrapePage(VOX_URLS.nowShowing);
  result.nowShowing = nowRaw
    .map(cleanTitle)
    .filter(t => t && t.length > 2 && !isSportsEvent(t) && !isJunkTitle(t));
  
  const soonRaw = await scrapePage(VOX_URLS.comingSoon);
  result.comingSoon = soonRaw
    .map(cleanTitle)
    .filter(t => t && t.length > 2 && !isSportsEvent(t) && !isJunkTitle(t));
  
  // Remove duplicates and cross-dups
  const nowSet = new Set(result.nowShowing.map(t => t.toLowerCase()));
  result.comingSoon = result.comingSoon.filter(t => !nowSet.has(t.toLowerCase()));
  
  console.log('\n📊 VOX SUMMARY');
  console.log(`Now Showing (${result.nowShowing.length}):`);
  result.nowShowing.forEach((t, i) => console.log(`  ${i+1}. ${t}`));
  console.log(`\nComing Soon (${result.comingSoon.length}):`);
  result.comingSoon.forEach((t, i) => console.log(`  ${i+1}. ${t}`));
  
  return result;
}

if (require.main === module) {
  scrapeVOX().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}
export { scrapeVOX, VOX_URLS };