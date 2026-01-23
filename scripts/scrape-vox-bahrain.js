/**
 * VOX Bahrain Cinema Scraper
 *
 * Scrapes movies from VOX Bahrain (City Centre & The Avenues)
 * Focused, reliable scraper for VOX only.
 */

// Load .env.local for local development
try {
  require('dotenv').config({ path: '.env.local' });
} catch {
  // dotenv might not be installed in production
}

const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

// Support both env var names
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// VOX Bahrain locations
const VOX_LOCATIONS = [
  {
    name: 'VOX City Centre Bahrain',
    slug: 'city-centre-bahrain',
    showtimesUrl: 'https://bhr.voxcinemas.com/showtimes?c=city-centre-bahrain'
  },
  {
    name: 'VOX The Avenues',
    slug: 'the-avenues',
    showtimesUrl: 'https://bhr.voxcinemas.com/showtimes?c=vox-cinemas-the-avenues'
  }
];

// VOX movies pages
const VOX_URLS = {
  nowShowing: 'https://bhr.voxcinemas.com/movies/whatson',
  comingSoon: 'https://bhr.voxcinemas.com/movies/comingsoon'
};

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Clean and normalize movie title
 */
function cleanTitle(title) {
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
 * Check if title is valid movie title
 */
function isValidTitle(title) {
  if (!title || title.length < 2 || title.length > 150) return false;

  const invalidTitles = [
    'now showing', 'coming soon', 'book tickets', 'book now', 'quick book',
    'log in', 'login', 'register', 'sign in', 'home', 'movies', 'cinemas',
    'experiences', 'about', 'contact', 'privacy policy', 'terms', 'faq',
    'offers', 'whats on', "what's on", 'discover movies', 'food & drinks'
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
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100);
}

/**
 * Search TMDB for movie details
 */
async function searchTMDB(title) {
  if (!TMDB_API_KEY) {
    console.log('  TMDB_API_KEY not set, skipping enrichment');
    return null;
  }

  try {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&include_adult=false`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const movie = data.results[0];

      // Get additional details
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`;
      const detailsResponse = await fetch(detailsUrl);
      const details = await detailsResponse.json();

      // Find trailer
      let trailerKey = null;
      let trailerUrl = null;
      if (details.videos?.results) {
        const trailer = details.videos.results.find(v =>
          v.type === 'Trailer' && v.site === 'YouTube'
        ) || details.videos.results.find(v => v.site === 'YouTube');
        if (trailer) {
          trailerKey = trailer.key;
          trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        }
      }

      // Get director and cast
      let director = null;
      let cast = [];
      if (details.credits) {
        const directorCredit = details.credits.crew?.find(c => c.job === 'Director');
        if (directorCredit) director = directorCredit.name;
        cast = details.credits.cast?.slice(0, 10).map(c => c.name) || [];
      }

      return {
        tmdb_id: movie.id,
        title: movie.title,
        synopsis: movie.overview,
        poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        backdrop_url: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
        release_date: movie.release_date || null,
        tmdb_rating: movie.vote_average || null,
        genre: details.genres?.map(g => g.name) || [],
        duration_minutes: details.runtime || null,
        language: details.original_language === 'en' ? 'English' :
                  details.original_language === 'ar' ? 'Arabic' :
                  details.original_language === 'hi' ? 'Hindi' :
                  details.spoken_languages?.[0]?.english_name || 'English',
        trailer_key: trailerKey,
        trailer_url: trailerUrl,
        director,
        movie_cast: cast
      };
    }

    return null;
  } catch (error) {
    console.error(`  TMDB search error for "${title}":`, error.message);
    return null;
  }
}

/**
 * Scrape VOX movies page
 */
async function scrapeVOXMoviesPage(page, url, type) {
  console.log(`\nScraping VOX ${type}: ${url}`);

  const movies = [];

  try {
    // Navigate to page with retry
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });

    // Wait for content to load
    await wait(5000);

    // Try to find movie cards/titles
    const movieTitles = await page.evaluate(() => {
      const titles = [];

      // Try various selectors for movie cards
      const selectors = [
        '.movie-card h3',
        '.movie-card .title',
        '.movie-item h3',
        '.movie-item .title',
        '[data-movie-title]',
        '.movies-list .movie h3',
        '.movies-grid .movie h3',
        'a[href*="/movies/"] h3',
        'a[href*="/movies/"] .movie-title'
      ];

      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          elements.forEach(el => {
            const text = el.textContent?.trim();
            if (text) titles.push(text);
          });
          break;
        }
      }

      // Fallback: try to find any movie links
      if (titles.length === 0) {
        const movieLinks = document.querySelectorAll('a[href*="/movies/"]');
        movieLinks.forEach(link => {
          // Get text from link or its heading child
          const heading = link.querySelector('h1, h2, h3, h4, h5, h6');
          const text = heading?.textContent || link.textContent;
          if (text?.trim()) titles.push(text.trim());
        });
      }

      return titles;
    });

    // Process found titles
    for (const rawTitle of movieTitles) {
      const cleanedTitle = cleanTitle(rawTitle);
      if (isValidTitle(cleanedTitle)) {
        movies.push({
          title: cleanedTitle,
          rawTitle: rawTitle,
          source: 'vox',
          type: type
        });
      }
    }

    console.log(`  Found ${movies.length} valid ${type} movies from VOX`);

  } catch (error) {
    console.error(`  Error scraping VOX ${type}:`, error.message);
  }

  return movies;
}

/**
 * Try to scrape via VOX API (if available)
 */
async function tryVOXAPI() {
  console.log('\nTrying VOX API endpoints...');

  const apiEndpoints = [
    'https://bhr.voxcinemas.com/api/movies/whatson',
    'https://bhr.voxcinemas.com/api/movies/comingsoon',
    'https://bhr.voxcinemas.com/api/showtimes'
  ];

  for (const endpoint of apiEndpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`  Found API at ${endpoint}:`, JSON.stringify(data).substring(0, 200));
        return { endpoint, data };
      }
    } catch (error) {
      // API not available, continue
    }
  }

  console.log('  No direct API found, will use page scraping');
  return null;
}

/**
 * Main scraper function
 */
async function scrapeVOXBahrain() {
  console.log('='.repeat(60));
  console.log('VOX BAHRAIN CINEMA SCRAPER');
  console.log('Started at:', new Date().toISOString());
  console.log('='.repeat(60));

  let browser;
  const allMovies = {
    nowShowing: [],
    comingSoon: []
  };

  // Try API first
  const apiResult = await tryVOXAPI();

  if (!apiResult) {
    // Fall back to page scraping
    try {
      console.log('\nLaunching browser...');
      browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process'
        ]
      });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1920, height: 1080 });

      // Scrape now showing
      const nowShowingMovies = await scrapeVOXMoviesPage(page, VOX_URLS.nowShowing, 'now_showing');
      allMovies.nowShowing = nowShowingMovies;

      // Scrape coming soon
      const comingSoonMovies = await scrapeVOXMoviesPage(page, VOX_URLS.comingSoon, 'coming_soon');
      allMovies.comingSoon = comingSoonMovies;

    } catch (error) {
      console.error('Browser scraping error:', error.message);
    } finally {
      if (browser) {
        await browser.close();
        console.log('\nBrowser closed');
      }
    }
  }

  // Deduplicate movies
  const seen = new Set();
  const uniqueNowShowing = allMovies.nowShowing.filter(m => {
    const key = m.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const uniqueComingSoon = allMovies.comingSoon.filter(m => {
    const key = m.title.toLowerCase();
    // Also exclude if already in now showing
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log('\n' + '='.repeat(60));
  console.log('MOVIE SUMMARY');
  console.log('='.repeat(60));
  console.log(`Now Showing: ${uniqueNowShowing.length} movies`);
  console.log(`Coming Soon: ${uniqueComingSoon.length} movies`);

  // Update database
  await updateDatabase(uniqueNowShowing, uniqueComingSoon);

  console.log('\n' + '='.repeat(60));
  console.log('SCRAPER COMPLETED');
  console.log('Finished at:', new Date().toISOString());
  console.log('='.repeat(60));
}

/**
 * Update database with scraped movies
 */
async function updateDatabase(nowShowing, comingSoon) {
  console.log('\n' + '='.repeat(60));
  console.log('UPDATING DATABASE');
  console.log('='.repeat(60));

  let added = 0;
  let updated = 0;
  let errors = 0;

  // Process all movies
  const allMovies = [
    ...nowShowing.map(m => ({ ...m, isNowShowing: true, isComingSoon: false })),
    ...comingSoon.map(m => ({ ...m, isNowShowing: false, isComingSoon: true }))
  ];

  for (const movie of allMovies) {
    try {
      const slug = createSlug(movie.title);

      // Check if movie exists
      const { data: existing } = await supabase
        .from('movies')
        .select('id, scraped_from, title')
        .eq('slug', slug)
        .single();

      if (existing) {
        // Update existing movie - add 'vox' to scraped_from if not present
        const currentSources = existing.scraped_from || [];
        const hasVox = currentSources.some(s => s.toLowerCase() === 'vox');

        const updateData = {
          is_now_showing: movie.isNowShowing,
          is_coming_soon: movie.isComingSoon,
          updated_at: new Date().toISOString()
        };

        if (!hasVox) {
          updateData.scraped_from = [...currentSources, 'vox'];
        }

        const { error: updateError } = await supabase
          .from('movies')
          .update(updateData)
          .eq('id', existing.id);

        if (updateError) {
          console.error(`  Error updating ${movie.title}:`, updateError.message);
          errors++;
        } else {
          console.log(`  Updated: ${movie.title} (${movie.isNowShowing ? 'Now Showing' : 'Coming Soon'})`);
          updated++;
        }
      } else {
        // New movie - search TMDB for details
        console.log(`  Searching TMDB for: ${movie.title}`);
        const tmdbData = await searchTMDB(movie.title);

        // Prepare movie data
        const movieData = {
          title: tmdbData?.title || movie.title,
          slug: slug,
          poster_url: tmdbData?.poster_url || null,
          backdrop_url: tmdbData?.backdrop_url || null,
          trailer_url: tmdbData?.trailer_url || null,
          trailer_key: tmdbData?.trailer_key || null,
          synopsis: tmdbData?.synopsis || null,
          genre: tmdbData?.genre || [],
          duration_minutes: tmdbData?.duration_minutes || null,
          tmdb_rating: tmdbData?.tmdb_rating || null,
          tmdb_id: tmdbData?.tmdb_id || null,
          release_date: tmdbData?.release_date || null,
          language: tmdbData?.language || 'English',
          director: tmdbData?.director || null,
          movie_cast: tmdbData?.movie_cast || [],
          is_now_showing: movie.isNowShowing,
          is_coming_soon: movie.isComingSoon,
          scraped_from: ['vox'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { error: insertError } = await supabase
          .from('movies')
          .insert(movieData);

        if (insertError) {
          // Check if it's a duplicate slug error
          if (insertError.code === '23505') {
            console.log(`  Skipping duplicate: ${movie.title}`);
          } else {
            console.error(`  Error adding ${movie.title}:`, insertError.message);
            errors++;
          }
        } else {
          console.log(`  Added: ${movie.title} (${movie.isNowShowing ? 'Now Showing' : 'Coming Soon'})`);
          added++;
        }

        // Small delay to avoid rate limiting
        await wait(500);
      }
    } catch (error) {
      console.error(`  Error processing ${movie.title}:`, error.message);
      errors++;
    }
  }

  // Mark movies no longer showing at VOX as inactive
  await cleanupOldMovies(allMovies.map(m => createSlug(m.title)));

  // Log scraper run
  await logScraperRun(added, updated, errors);

  console.log('\nDatabase Update Summary:');
  console.log(`  Added: ${added}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Errors: ${errors}`);
}

/**
 * Mark movies no longer at VOX as inactive
 */
async function cleanupOldMovies(currentSlugs) {
  console.log('\nCleaning up old movies...');

  try {
    // Get all movies that have 'vox' in scraped_from
    const { data: voxMovies, error } = await supabase
      .from('movies')
      .select('id, slug, title, scraped_from')
      .contains('scraped_from', ['vox']);

    if (error) {
      console.error('  Error fetching VOX movies:', error.message);
      return;
    }

    let cleaned = 0;
    for (const movie of voxMovies || []) {
      if (!currentSlugs.includes(movie.slug)) {
        // Remove 'vox' from scraped_from
        const updatedSources = (movie.scraped_from || []).filter(s => s.toLowerCase() !== 'vox');

        const updateData = {
          scraped_from: updatedSources,
          updated_at: new Date().toISOString()
        };

        // If no sources left, mark as not showing
        if (updatedSources.length === 0) {
          updateData.is_now_showing = false;
          updateData.is_coming_soon = false;
        }

        await supabase
          .from('movies')
          .update(updateData)
          .eq('id', movie.id);

        console.log(`  Removed VOX from: ${movie.title}`);
        cleaned++;
      }
    }

    console.log(`  Cleaned ${cleaned} old movies`);
  } catch (error) {
    console.error('  Cleanup error:', error.message);
  }
}

/**
 * Log scraper run to agent_logs table
 */
async function logScraperRun(added, updated, errors) {
  try {
    await supabase
      .from('agent_logs')
      .insert({
        agent_name: 'vox_bahrain_scraper',
        agent_type: 'cinema_scraper_github',
        status: errors > 0 ? 'completed_with_errors' : 'completed',
        details: {
          movies_added: added,
          movies_updated: updated,
          errors: errors,
          source: 'vox_bahrain'
        },
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Error logging scraper run:', error.message);
  }
}

// Run the scraper
scrapeVOXBahrain().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
