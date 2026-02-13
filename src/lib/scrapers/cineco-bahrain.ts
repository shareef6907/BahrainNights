/**
 * Cineco Bahrain Cinema Scraper
 *
 * Uses Puppeteer with stealth plugin for browser automation to scrape Cineco Bahrain movies.
 */

import * as cheerio from 'cheerio';

// Types
export interface ScrapedMovie {
  title: string;
  slug: string;
  cinecoUrl?: string;
  bookingUrl?: string;
  posterUrl?: string;
  trailerUrl?: string;
  releaseDate?: string;
  isNowShowing: boolean;
  isComingSoon: boolean;
  cinemaLocations: string[];
  language?: string;
  rating?: string;
  durationMinutes?: number;
  synopsis?: string;
}

// Cineco Bahrain URLs
export const CINECO_URLS = {
  nowShowing: 'https://bahrain.cineco.net/now-showing/',
  comingSoon: 'https://bahrain.cineco.net/coming-soon/'
};

/**
 * Clean and normalize movie title
 */
export function cleanTitle(title: string): string {
  if (!title) return '';

  return title
    .trim()
    // Remove (YEAR) suffix like (2025) or (NEPALI 2026)
    .replace(/\s*\([A-Z]*\s*\d{4}\)\s*$/gi, '')
    // Remove language suffix in parens like (EN), (TAMIL)
    .replace(/\s*\((?:EN|AR|HI|TA|TE|ML|SI|NE|ENGLISH|ARABIC|HINDI|TAMIL|TELUGU|MALAYALAM|SINHALA|NEPALI)\)\s*$/gi, '')
    // Remove common tags and ratings
    .replace(/\s*\(?\s*(pg|pg-?\d+|15\+?|18\+?|tbc|tc)\s*\)?$/gi, '')
    // Remove duration info
    .replace(/\s*-?\s*\d+\s*(mins?|hours?|hr?s?)\s*$/gi, '')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    // Convert to title case for consistency
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}

/**
 * Check if title is a valid movie title
 */
export function isValidTitle(title: string): boolean {
  if (!title || title.length < 2 || title.length > 150) return false;

  const invalidTitles = [
    'now showing', 'coming soon', 'book tickets', 'book now', 'quick book',
    'home', 'movies', 'cinemas', 'cineco bahrain', 'cineco',
    'experiences', 'about', 'contact', 'site links', 'ways to book',
    'corporate profile', 'history', 'business activities', 'investor relations',
    'connect with us', 'show trailer'
  ];

  const lowerTitle = title.toLowerCase();
  if (invalidTitles.includes(lowerTitle)) return false;

  // Check for garbage patterns
  if (/^\d+\s*mins?$/i.test(title)) return false;
  if (/^(pg|pg-?\d+|15\+?|18\+?)$/i.test(title)) return false;
  if (/^[^a-zA-Z]*$/.test(title)) return false;

  return true;
}

/**
 * Create URL-safe slug from title
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100);
}

/**
 * Parse Now Showing movies from HTML using Cheerio
 */
function parseNowShowingFromHTML(html: string): ScrapedMovie[] {
  const $ = cheerio.load(html);
  const movies: ScrapedMovie[] = [];
  const seenTitles = new Set<string>();

  // Find all h3 headings with movie links
  $('h3').each((_, heading) => {
    try {
      const $heading = $(heading);
      const $link = $heading.find('a');
      
      if (!$link.length) return;
      
      const href = $link.attr('href') || '';
      
      // Check if it's a movie link
      if (!href.includes('/amy_movie/')) return;
      
      // Get title
      const rawTitle = $link.text().trim();
      const title = cleanTitle(rawTitle);
      
      if (!isValidTitle(title)) return;
      
      // Skip duplicates
      const titleKey = title.toLowerCase();
      if (seenTitles.has(titleKey)) return;
      seenTitles.add(titleKey);
      
      // Get the parent container to find more info
      const $container = $heading.closest('[class]').parent();
      
      // Get language
      let language = 'English';
      const $langLink = $container.find('a[href*="/movie_language/"]');
      if ($langLink.length) {
        language = $langLink.text().trim();
      }
      
      // Get rating
      let rating = '';
      const containerText = $container.text();
      const ratingMatch = containerText.match(/(PG-?\d+|18\+?|15\+?|PG)/i);
      if (ratingMatch) {
        rating = ratingMatch[1];
      }
      
      // Get trailer URL
      let trailerUrl: string | undefined;
      const $trailerLink = $container.find('a[href*="youtube.com/embed"]');
      if ($trailerLink.length) {
        const embedUrl = $trailerLink.attr('href') || '';
        // Convert embed URL to regular watch URL
        const videoIdMatch = embedUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
        if (videoIdMatch) {
          trailerUrl = `https://www.youtube.com/watch?v=${videoIdMatch[1]}`;
        }
      }
      
      // Get booking URL
      let bookingUrl: string | undefined;
      const $bookLink = $container.find('a[href*="q-tickets.com"]');
      if ($bookLink.length) {
        bookingUrl = $bookLink.attr('href');
      }
      
      // Get poster URL - Cineco uses CSS background-image on .movie-poster divs
      let posterUrl: string | undefined;
      // Find the movie card container and look for .movie-poster with background style
      const $movieCard = $heading.closest('.customized-movie-poster, .col-sm-3');
      const $posterDiv = $movieCard.find('.movie-poster');
      if ($posterDiv.length) {
        const style = $posterDiv.attr('style') || '';
        // Extract URL from background:url(...) or background-image:url(...)
        const bgMatch = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (bgMatch && bgMatch[1]) {
          posterUrl = bgMatch[1];
          if (!posterUrl.startsWith('http')) {
            posterUrl = `https://bahrain.cineco.net${posterUrl}`;
          }
        }
      }
      // Fallback: try img tag
      if (!posterUrl) {
        const $posterImg = $movieCard.find('img').first();
        if ($posterImg.length) {
          posterUrl = $posterImg.attr('src') || $posterImg.attr('data-src');
          if (posterUrl && !posterUrl.startsWith('http')) {
            posterUrl = `https://bahrain.cineco.net${posterUrl}`;
          }
        }
      }
      
      movies.push({
        title,
        slug: createSlug(title),
        cinecoUrl: href,
        bookingUrl,
        posterUrl,
        trailerUrl,
        isNowShowing: true,
        isComingSoon: false,
        cinemaLocations: ['Cineco Saar', 'Cineco Seef'],
        language,
        rating: rating || undefined
      });
      
    } catch (error) {
      console.error('Error parsing movie:', error);
    }
  });

  return movies;
}

/**
 * Parse Coming Soon movies from HTML using Cheerio
 */
function parseComingSoonFromHTML(html: string): ScrapedMovie[] {
  const $ = cheerio.load(html);
  const movies: ScrapedMovie[] = [];
  const seenTitles = new Set<string>();

  // Coming soon uses h2 headings
  $('h2').each((_, heading) => {
    try {
      const $heading = $(heading);
      const $link = $heading.find('a');
      
      if (!$link.length) return;
      
      const href = $link.attr('href') || '';
      
      // Check if it's a movie link
      if (!href.includes('/amy_movie/')) return;
      
      // Get title
      const rawTitle = $link.text().trim();
      const title = cleanTitle(rawTitle);
      
      if (!isValidTitle(title)) return;
      
      // Skip duplicates
      const titleKey = title.toLowerCase();
      if (seenTitles.has(titleKey)) return;
      seenTitles.add(titleKey);
      
      // Get the parent container
      const $container = $heading.parent();
      
      // Get language
      let language = 'English';
      const $langLink = $container.find('a[href*="/movie_language/"]');
      if ($langLink.length) {
        language = $langLink.text().trim();
      }
      
      // Get poster URL
      let posterUrl: string | undefined;
      const $posterImg = $container.prev('img');
      if ($posterImg.length) {
        posterUrl = $posterImg.attr('src') || $posterImg.attr('data-src');
        if (posterUrl && !posterUrl.startsWith('http')) {
          posterUrl = `https://bahrain.cineco.net${posterUrl}`;
        }
      }
      
      movies.push({
        title,
        slug: createSlug(title),
        cinecoUrl: href,
        isNowShowing: false,
        isComingSoon: true,
        cinemaLocations: ['Cineco Saar', 'Cineco Seef'],
        language
      });
      
    } catch (error) {
      console.error('Error parsing coming soon movie:', error);
    }
  });

  return movies;
}

/**
 * Launch browser with stealth settings
 */
async function launchBrowser() {
  const puppeteerExtra = await import('puppeteer-extra');
  const StealthPlugin = await import('puppeteer-extra-plugin-stealth');
  
  puppeteerExtra.default.use(StealthPlugin.default());
  
  const browser = await puppeteerExtra.default.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--disable-blink-features=AutomationControlled'
    ]
  });
  
  return browser;
}

/**
 * Scrape a page with Puppeteer
 */
async function scrapePage(url: string): Promise<string> {
  const browser = await launchBrowser();
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
    
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });
    
    // Wait for content
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return await page.content();
    
  } finally {
    await browser.close();
  }
}

/**
 * Scrape Now Showing movies
 */
export async function scrapeNowShowing(): Promise<ScrapedMovie[]> {
  console.log(`\nScraping Now Showing from: ${CINECO_URLS.nowShowing}`);
  
  try {
    const html = await scrapePage(CINECO_URLS.nowShowing);
    const movies = parseNowShowingFromHTML(html);
    
    console.log(`  Found ${movies.length} Now Showing movies`);
    
    return movies;
    
  } catch (error) {
    console.error('Error scraping Now Showing:', error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Scrape Coming Soon movies
 */
export async function scrapeComingSoon(): Promise<ScrapedMovie[]> {
  console.log(`\nScraping Coming Soon from: ${CINECO_URLS.comingSoon}`);
  
  try {
    const html = await scrapePage(CINECO_URLS.comingSoon);
    const movies = parseComingSoonFromHTML(html);
    
    console.log(`  Found ${movies.length} Coming Soon movies`);
    
    return movies;
    
  } catch (error) {
    console.error('Error scraping Coming Soon:', error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Main scraper function
 */
export async function scrapeCinecoBahrain(): Promise<{
  nowShowing: ScrapedMovie[];
  comingSoon: ScrapedMovie[];
}> {
  console.log('='.repeat(60));
  console.log('CINECO BAHRAIN CINEMA SCRAPER');
  console.log('Started at:', new Date().toISOString());
  console.log('='.repeat(60));

  // Scrape Now Showing
  const nowShowing = await scrapeNowShowing();
  
  // Small delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Scrape Coming Soon
  const comingSoon = await scrapeComingSoon();

  // Filter out coming soon movies that are already in now showing
  const nowShowingTitles = new Set(nowShowing.map(m => m.title.toLowerCase()));
  const filteredComingSoon = comingSoon.filter(
    movie => !nowShowingTitles.has(movie.title.toLowerCase())
  );

  console.log('\n' + '='.repeat(60));
  console.log('SCRAPE SUMMARY');
  console.log('='.repeat(60));
  console.log(`Now Showing: ${nowShowing.length} unique movies`);
  console.log(`Coming Soon: ${filteredComingSoon.length} unique movies`);
  
  console.log('\nNow Showing Movies:');
  nowShowing.forEach((m, i) => console.log(`  ${i + 1}. ${m.title} (${m.language})`));
  
  console.log('\nComing Soon Movies:');
  filteredComingSoon.forEach((m, i) => console.log(`  ${i + 1}. ${m.title} (${m.language})`));

  return {
    nowShowing,
    comingSoon: filteredComingSoon
  };
}
