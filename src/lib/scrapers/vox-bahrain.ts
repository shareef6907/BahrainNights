/**
 * VOX Bahrain Cinema Scraper
 *
 * Uses Puppeteer with stealth plugin for browser automation to scrape VOX Bahrain movies.
 * Stealth plugin helps bypass anti-bot detection.
 */

import * as cheerio from 'cheerio';

// Types
export interface ScrapedMovie {
  title: string;
  slug: string;
  voxUrl?: string;
  posterUrl?: string;
  releaseDate?: string;
  isNowShowing: boolean;
  isComingSoon: boolean;
  cinemaLocations: string[];
  language?: string;
  rating?: string;
  durationMinutes?: number;
  synopsis?: string;
}

export interface TMDBMovie {
  tmdb_id: number;
  title: string;
  synopsis: string;
  poster_url: string | null;
  backdrop_url: string | null;
  release_date: string | null;
  tmdb_rating: number | null;
  genre: string[];
  duration_minutes: number | null;
  language: string;
  trailer_key: string | null;
  trailer_url: string | null;
  director: string | null;
  movie_cast: string[];
}

// VOX Bahrain URLs
export const VOX_URLS = {
  whatson: 'https://bhr.voxcinemas.com/movies/whatson',
  comingSoon: 'https://bhr.voxcinemas.com/movies/comingsoon'
};

/**
 * Clean and normalize movie title
 */
export function cleanTitle(title: string): string {
  if (!title) return '';

  return title
    .trim()
    // Remove common tags and ratings at the end
    .replace(/\s*\(?\s*(pg|pg-?\d+|15\+?|18\+?|18tc|tbc|tc|arabic|english|hindi|dub(bed)?)\s*\)?$/gi, '')
    // Remove rating prefixes (PG15, 18+, etc)
    .replace(/^(PG\d*|18\+?|15\+?|18TC)\s+/i, '')
    // Remove duration info
    .replace(/\s*-?\s*\d+\s*(mins?|hours?|hr?s?)\s*$/gi, '')
    // Remove IMAX/3D/4DX tags
    .replace(/\s*\(?\s*(imax|3d|4dx|dolby|atmos|max|gold|kids|vip|theatre)\s*\)?$/gi, '')
    // Remove year at end
    .replace(/\s*\(\d{4}\)\s*$/, '')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if title is a valid movie title
 */
export function isValidTitle(title: string): boolean {
  if (!title || title.length < 2 || title.length > 150) return false;

  const invalidTitles = [
    'now showing', 'coming soon', 'book tickets', 'book now', 'quick book',
    'log in', 'login', 'register', 'sign in', 'home', 'movies', 'cinemas',
    'experiences', 'about', 'contact', 'privacy policy', 'terms', 'faq',
    'offers', 'whats on', "what's on", 'discover movies', 'food & drinks',
    'see more', 'view all', 'load more', 'show more', 'showtimes', 'view movie',
    'vox cinemas', 'select your cinema', 'select your movie', 'find times and book'
  ];

  const lowerTitle = title.toLowerCase();
  if (invalidTitles.includes(lowerTitle)) return false;

  // Check for garbage patterns
  if (/^\d+\s*mins?$/i.test(title)) return false;
  if (/^(pg|pg-?\d+|15\+?|18\+?|18tc)$/i.test(title)) return false;
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
 * Parse movies from HTML using Cheerio
 */
function parseMoviesFromHTML(html: string, isComingSoon: boolean): ScrapedMovie[] {
  const $ = cheerio.load(html);
  const movies: ScrapedMovie[] = [];
  const seenTitles = new Set<string>();

  // Find all article elements (each contains a movie)
  $('article').each((_, article) => {
    try {
      const $article = $(article);
      
      // Get movie link and extract URL
      const movieLink = $article.find('a[href*="/movies/"]').first();
      const href = movieLink.attr('href') || '';
      
      if (!href || href === '/movies/whatson' || href === '/movies/comingsoon') {
        return;
      }
      
      // Extract title from h3 heading
      const $heading = $article.find('h3');
      let title = '';
      
      // The title might be in a link inside h3
      const $titleLink = $heading.find('a');
      if ($titleLink.length > 0) {
        title = $titleLink.text().trim();
      } else {
        title = $heading.text().trim();
      }
      
      // Clean the title (remove rating prefixes like "PG15", "18+", etc.)
      title = cleanTitle(title);
      
      if (!isValidTitle(title)) {
        return;
      }
      
      // Skip duplicates
      const titleKey = title.toLowerCase();
      if (seenTitles.has(titleKey)) {
        return;
      }
      seenTitles.add(titleKey);
      
      // Get poster URL
      const posterImg = $article.find('img').first();
      let posterUrl = posterImg.attr('src') || '';
      
      // Make sure it's an absolute URL
      if (posterUrl && !posterUrl.startsWith('http')) {
        posterUrl = `https://bhr.voxcinemas.com${posterUrl}`;
      }
      
      // Get language
      let language = 'English';
      const articleText = $article.text();
      const languageMatch = articleText.match(/Language:\s*(\w+)/i);
      if (languageMatch) {
        language = languageMatch[1];
      }
      
      // Get rating
      let rating = '';
      const ratingMatch = articleText.match(/(PG\d*|18\+?|15\+?|18TC)/i);
      if (ratingMatch) {
        rating = ratingMatch[1];
      }
      
      // Get release date (for coming soon)
      let releaseDate = '';
      if (isComingSoon) {
        const releaseDateMatch = articleText.match(/Release Date:\s*(\d+\s+\w+\s+\d{4})/i);
        if (releaseDateMatch) {
          releaseDate = releaseDateMatch[1];
        }
      }
      
      // Get synopsis (for coming soon, it's in a paragraph)
      let synopsis = '';
      if (isComingSoon) {
        const $paragraphs = $article.find('p');
        $paragraphs.each((_, p) => {
          const text = $(p).text().trim();
          // Skip if it's metadata (contains Release Date, Language, etc.)
          if (!text.includes('Release Date:') && !text.includes('Language:') && !text.includes('Starring:') && text.length > 50) {
            synopsis = text;
          }
        });
      }
      
      // Build VOX URL
      let voxUrl = href;
      if (voxUrl && !voxUrl.startsWith('http')) {
        voxUrl = `https://bhr.voxcinemas.com${voxUrl}`;
      }
      
      movies.push({
        title,
        slug: createSlug(title),
        voxUrl,
        posterUrl: posterUrl || undefined,
        releaseDate: releaseDate || undefined,
        isNowShowing: !isComingSoon,
        isComingSoon,
        cinemaLocations: ['VOX City Centre Bahrain', 'VOX The Avenues'],
        language,
        rating: rating || undefined,
        synopsis: synopsis || undefined
      });
      
    } catch (error) {
      console.error('Error parsing article:', error);
    }
  });

  return movies;
}

/**
 * Launch browser with stealth settings
 */
async function launchBrowser() {
  // Dynamic imports for puppeteer-extra
  const puppeteerExtra = await import('puppeteer-extra');
  const StealthPlugin = await import('puppeteer-extra-plugin-stealth');
  
  // Add stealth plugin
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
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Set extra headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9'
    });
    
    // Navigate to the page
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });
    
    // Wait a bit for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get page content
    const html = await page.content();
    
    return html;
    
  } finally {
    await browser.close();
  }
}

/**
 * Scrape Now Showing movies
 */
export async function scrapeNowShowing(): Promise<ScrapedMovie[]> {
  console.log(`\nScraping Now Showing from: ${VOX_URLS.whatson}`);
  
  try {
    const html = await scrapePage(VOX_URLS.whatson);
    const movies = parseMoviesFromHTML(html, false);
    
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
  console.log(`\nScraping Coming Soon from: ${VOX_URLS.comingSoon}`);
  
  try {
    const html = await scrapePage(VOX_URLS.comingSoon);
    const movies = parseMoviesFromHTML(html, true);
    
    console.log(`  Found ${movies.length} Coming Soon movies`);
    
    return movies;
    
  } catch (error) {
    console.error('Error scraping Coming Soon:', error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Search TMDB for movie details
 */
export async function searchTMDB(title: string, apiKey: string): Promise<TMDBMovie | null> {
  if (!apiKey) {
    console.log('  TMDB_API_KEY not set, skipping enrichment');
    return null;
  }

  try {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}&include_adult=false`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const movie = data.results[0];

      // Get additional details
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=videos,credits`;
      const detailsResponse = await fetch(detailsUrl);
      const details = await detailsResponse.json();

      // Find trailer
      let trailerKey: string | null = null;
      let trailerUrl: string | null = null;
      if (details.videos?.results) {
        const trailer = details.videos.results.find((v: { type: string; site: string }) =>
          v.type === 'Trailer' && v.site === 'YouTube'
        ) || details.videos.results.find((v: { site: string }) => v.site === 'YouTube');
        if (trailer) {
          trailerKey = trailer.key;
          trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        }
      }

      // Get director and cast
      let director: string | null = null;
      let cast: string[] = [];
      if (details.credits) {
        const directorCredit = details.credits.crew?.find((c: { job: string }) => c.job === 'Director');
        if (directorCredit) director = directorCredit.name;
        cast = details.credits.cast?.slice(0, 10).map((c: { name: string }) => c.name) || [];
      }

      // Map language codes
      const languageMap: Record<string, string> = {
        'en': 'English',
        'ar': 'Arabic',
        'hi': 'Hindi',
        'ml': 'Malayalam',
        'ta': 'Tamil',
        'te': 'Telugu',
        'ko': 'Korean',
        'ja': 'Japanese',
        'zh': 'Chinese',
        'fr': 'French',
        'es': 'Spanish',
        'de': 'German'
      };

      return {
        tmdb_id: movie.id,
        title: movie.title,
        synopsis: movie.overview,
        poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        backdrop_url: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
        release_date: movie.release_date || null,
        tmdb_rating: movie.vote_average || null,
        genre: details.genres?.map((g: { name: string }) => g.name) || [],
        duration_minutes: details.runtime || null,
        language: languageMap[details.original_language] ||
                  details.spoken_languages?.[0]?.english_name ||
                  'English',
        trailer_key: trailerKey,
        trailer_url: trailerUrl,
        director,
        movie_cast: cast
      };
    }

    return null;
  } catch (error) {
    console.error(`  TMDB search error for "${title}":`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Main scraper function - scrapes all VOX sources
 */
export async function scrapeVOXBahrain(): Promise<{
  nowShowing: ScrapedMovie[];
  comingSoon: ScrapedMovie[];
}> {
  console.log('='.repeat(60));
  console.log('VOX BAHRAIN CINEMA SCRAPER (Puppeteer Stealth)');
  console.log('Started at:', new Date().toISOString());
  console.log('='.repeat(60));

  // Scrape Now Showing
  const nowShowing = await scrapeNowShowing();
  
  // Small delay between requests
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
  
  // Log movie titles for debugging
  console.log('\nNow Showing Movies:');
  nowShowing.forEach((m, i) => console.log(`  ${i + 1}. ${m.title}`));
  
  console.log('\nComing Soon Movies:');
  filteredComingSoon.forEach((m, i) => console.log(`  ${i + 1}. ${m.title}`));

  return {
    nowShowing,
    comingSoon: filteredComingSoon
  };
}
