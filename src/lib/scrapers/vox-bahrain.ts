/**
 * VOX Bahrain Cinema Scraper
 *
 * Uses cheerio for HTML parsing - no browser needed.
 * Scrapes from VOX Bahrain's showtimes and coming soon pages.
 */

import * as cheerio from 'cheerio';

// Comprehensive browser-like headers to avoid bot detection
const BROWSER_HEADERS: Record<string, string> = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua-Platform': '"Windows"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'Connection': 'keep-alive',
};

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
  // Showtimes pages for Now Showing movies
  showtimes: [
    {
      url: 'https://bhr.voxcinemas.com/showtimes?c=city-centre-bahrain',
      location: 'VOX City Centre Bahrain'
    },
    {
      url: 'https://bhr.voxcinemas.com/showtimes?c=vox-cinemas-the-avenues',
      location: 'VOX The Avenues'
    }
  ],
  // Coming Soon page
  comingSoon: 'https://bhr.voxcinemas.com/movies/comingsoon'
};

/**
 * Fetch HTML content from a URL with retry logic and proper headers
 */
async function fetchHTML(url: string, maxRetries = 3): Promise<string> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  Fetch attempt ${attempt}/${maxRetries} for ${url}`);

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(url, {
        headers: BROWSER_HEADERS,
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      console.log(`  Success: received ${html.length} bytes`);
      return html;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.log(`  Attempt ${attempt} failed: ${lastError.message}`);

      if (attempt < maxRetries) {
        // Exponential backoff: 2s, 4s, 6s
        const delay = attempt * 2000;
        console.log(`  Waiting ${delay / 1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
}

/**
 * Clean and normalize movie title
 */
export function cleanTitle(title: string): string {
  if (!title) return '';

  return title
    .trim()
    // Remove common tags and ratings
    .replace(/\s*\(?\s*(pg|pg-?\d+|15\+?|18\+?|tbc|tc|arabic|english|hindi|dub(bed)?)\s*\)?$/gi, '')
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
    'see more', 'view all', 'load more', 'show more'
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
 * JSON-LD Movie data structure from VOX website
 */
interface VOXJsonLdMovie {
  '@type': string;
  name: string;
  url?: string;
  image?: string;
  duration?: string; // Format: PT100M (ISO 8601)
  inLanguage?: string;
  contentRating?: string;
  description?: string;
}

interface VOXJsonLdListItem {
  '@type': string;
  position: number;
  item: VOXJsonLdMovie;
}

interface VOXJsonLdData {
  '@context': string;
  '@type': string;
  itemListElement: VOXJsonLdListItem[];
}

/**
 * Extract JSON-LD structured data from page HTML
 */
function extractJsonLd(html: string): VOXJsonLdData | null {
  const $ = cheerio.load(html);

  let jsonLdData: VOXJsonLdData | null = null;

  $('script[type="application/ld+json"]').each((_, script) => {
    try {
      const content = $(script).html();
      if (content) {
        const parsed = JSON.parse(content);
        // Check if this is the movie list data
        if (parsed['@type'] === 'itemList' && parsed.itemListElement) {
          jsonLdData = parsed as VOXJsonLdData;
        }
      }
    } catch {
      // Ignore parse errors, try next script
    }
  });

  return jsonLdData;
}

/**
 * Parse ISO 8601 duration (PT100M) to minutes
 */
function parseDuration(isoDuration: string | undefined): number | undefined {
  if (!isoDuration) return undefined;
  const match = isoDuration.match(/PT(\d+)M/);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Scrape Now Showing movies from showtimes page using JSON-LD
 */
export async function scrapeNowShowing(url: string, location: string): Promise<ScrapedMovie[]> {
  console.log(`Scraping Now Showing from: ${url}`);
  const movies: ScrapedMovie[] = [];

  try {
    const html = await fetchHTML(url);

    // Extract JSON-LD structured data
    const jsonLdData = extractJsonLd(html);

    if (jsonLdData && jsonLdData.itemListElement) {
      console.log(`  Found ${jsonLdData.itemListElement.length} movies in JSON-LD data`);

      for (const listItem of jsonLdData.itemListElement) {
        const movie = listItem.item;

        if (movie && movie['@type'] === 'Movie' && movie.name) {
          const cleanedTitle = cleanTitle(movie.name);

          if (isValidTitle(cleanedTitle)) {
            // Construct full VOX URL
            let voxUrl = movie.url;
            if (voxUrl && !voxUrl.startsWith('http')) {
              voxUrl = `https://bhr.voxcinemas.com${voxUrl}`;
            }

            movies.push({
              title: cleanedTitle,
              slug: createSlug(cleanedTitle),
              voxUrl: voxUrl || undefined,
              posterUrl: movie.image || undefined,
              isNowShowing: true,
              isComingSoon: false,
              cinemaLocations: [location],
              language: movie.inLanguage,
              rating: movie.contentRating,
              durationMinutes: parseDuration(movie.duration)
            });
          }
        }
      }
    } else {
      console.log(`  No JSON-LD data found, trying HTML fallback`);

      // Fallback to HTML parsing
      const $ = cheerio.load(html);
      const foundTitles = new Set<string>();

      // Try to find movie links
      $('a[href*="/movies/"]').each((_, element) => {
        const $el = $(element);
        const href = $el.attr('href') || '';
        const title = $el.text().trim() || $el.find('h1, h2, h3, h4, h5, h6').first().text().trim();
        const cleanedTitle = cleanTitle(title);

        if (isValidTitle(cleanedTitle) && !foundTitles.has(cleanedTitle.toLowerCase())) {
          foundTitles.add(cleanedTitle.toLowerCase());
          movies.push({
            title: cleanedTitle,
            slug: createSlug(cleanedTitle),
            voxUrl: href.startsWith('http') ? href : `https://bhr.voxcinemas.com${href}`,
            isNowShowing: true,
            isComingSoon: false,
            cinemaLocations: [location]
          });
        }
      });
    }

    console.log(`  Found ${movies.length} Now Showing movies from ${location}`);
  } catch (error) {
    console.error(`  Error scraping ${url}:`, error instanceof Error ? error.message : error);
  }

  return movies;
}

/**
 * Scrape Coming Soon movies using JSON-LD
 */
export async function scrapeComingSoon(url: string): Promise<ScrapedMovie[]> {
  console.log(`Scraping Coming Soon from: ${url}`);
  const movies: ScrapedMovie[] = [];

  try {
    const html = await fetchHTML(url);

    // Extract JSON-LD structured data
    const jsonLdData = extractJsonLd(html);

    if (jsonLdData && jsonLdData.itemListElement) {
      console.log(`  Found ${jsonLdData.itemListElement.length} movies in JSON-LD data`);

      for (const listItem of jsonLdData.itemListElement) {
        const movie = listItem.item;

        if (movie && movie['@type'] === 'Movie' && movie.name) {
          const cleanedTitle = cleanTitle(movie.name);

          if (isValidTitle(cleanedTitle)) {
            // Construct full VOX URL
            let voxUrl = movie.url;
            if (voxUrl && !voxUrl.startsWith('http')) {
              voxUrl = `https://bhr.voxcinemas.com${voxUrl}`;
            }

            movies.push({
              title: cleanedTitle,
              slug: createSlug(cleanedTitle),
              voxUrl: voxUrl || undefined,
              posterUrl: movie.image || undefined,
              synopsis: movie.description || undefined,
              isNowShowing: false,
              isComingSoon: true,
              cinemaLocations: ['VOX City Centre Bahrain', 'VOX The Avenues'],
              language: movie.inLanguage,
              rating: movie.contentRating
            });
          }
        }
      }
    } else {
      console.log(`  No JSON-LD data found, trying HTML fallback`);

      // Fallback to HTML parsing
      const $ = cheerio.load(html);
      const foundTitles = new Set<string>();

      // Try to find movie links
      $('a[href*="/movies/"]').each((_, element) => {
        const $el = $(element);
        const href = $el.attr('href') || '';
        const title = $el.text().trim() || $el.find('h1, h2, h3, h4, h5, h6').first().text().trim();
        const cleanedTitle = cleanTitle(title);

        if (isValidTitle(cleanedTitle) && !foundTitles.has(cleanedTitle.toLowerCase())) {
          foundTitles.add(cleanedTitle.toLowerCase());
          movies.push({
            title: cleanedTitle,
            slug: createSlug(cleanedTitle),
            voxUrl: href.startsWith('http') ? href : `https://bhr.voxcinemas.com${href}`,
            isNowShowing: false,
            isComingSoon: true,
            cinemaLocations: ['VOX City Centre Bahrain', 'VOX The Avenues']
          });
        }
      });
    }

    console.log(`  Found ${movies.length} Coming Soon movies`);
  } catch (error) {
    console.error(`  Error scraping Coming Soon:`, error instanceof Error ? error.message : error);
  }

  return movies;
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
  console.log('VOX BAHRAIN CINEMA SCRAPER (Cheerio)');
  console.log('Started at:', new Date().toISOString());
  console.log('='.repeat(60));

  const allNowShowing: ScrapedMovie[] = [];
  const seenNowShowing = new Set<string>();

  // Scrape Now Showing from all showtimes pages
  for (const source of VOX_URLS.showtimes) {
    const movies = await scrapeNowShowing(source.url, source.location);

    for (const movie of movies) {
      const key = movie.title.toLowerCase();
      if (seenNowShowing.has(key)) {
        // Movie already exists, add location
        const existing = allNowShowing.find(m => m.title.toLowerCase() === key);
        if (existing && !existing.cinemaLocations.includes(source.location)) {
          existing.cinemaLocations.push(source.location);
        }
      } else {
        seenNowShowing.add(key);
        allNowShowing.push(movie);
      }
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Scrape Coming Soon
  const comingSoon = await scrapeComingSoon(VOX_URLS.comingSoon);

  // Filter out movies that are already in Now Showing
  const filteredComingSoon = comingSoon.filter(
    movie => !seenNowShowing.has(movie.title.toLowerCase())
  );

  console.log('\n' + '='.repeat(60));
  console.log('SCRAPE SUMMARY');
  console.log('='.repeat(60));
  console.log(`Now Showing: ${allNowShowing.length} unique movies`);
  console.log(`Coming Soon: ${filteredComingSoon.length} unique movies`);

  return {
    nowShowing: allNowShowing,
    comingSoon: filteredComingSoon
  };
}
