const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

// Validate environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing environment variables:');
  console.error('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'MISSING');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'MISSING');
  process.exit(1);
}

// TMDB API Key (optional but recommended)
const TMDB_API_KEY = process.env.TMDB_API_KEY;
if (!TMDB_API_KEY) {
  console.warn('WARNING: TMDB_API_KEY not set. Auto-add feature will be disabled.');
}

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Cinema configurations
const cinemas = [
  {
    name: 'Cineco',
    url: 'https://bahrain.cineco.net/',
    altUrls: ['https://bahrain.cineco.net/movies', 'https://bahrain.cineco.net/now-showing'],
    comingSoonUrls: ['https://bahrain.cineco.net/coming-soon'],
    selectors: [
      '.movie-title',
      '.movie-name',
      '.film-title',
      '.film-name',
      'h2.title',
      'h3.title',
      '[class*="movie"] h2',
      '[class*="movie"] h3',
      '[class*="movie"] .title',
      '.movie-card h2',
      '.movie-card h3',
      '.movie-item h2',
      '.movie-item h3',
      'a[href*="movie"] h2',
      'a[href*="movie"] h3',
    ],
  },
  {
    name: 'VOX',
    url: 'https://bhr.voxcinemas.com/',
    altUrls: ['https://bhr.voxcinemas.com/movies', 'https://bhr.voxcinemas.com/movies/now-showing'],
    comingSoonUrls: ['https://bhr.voxcinemas.com/movies/coming-soon'],
    selectors: [
      '.movie-card__title',
      '.movie-title',
      '.movie-name',
      '.film-title',
      '[class*="MovieCard"] h2',
      '[class*="MovieCard"] h3',
      '[class*="movie-card"] h2',
      '[class*="movie-card"] h3',
      '[class*="movie-card"] .title',
      '.movies-grid .title',
      'a[href*="/movies/"] h2',
      'a[href*="/movies/"] h3',
    ],
  },
  {
    name: 'Cinepolis',
    url: 'https://bahrain.cinepolisgulf.com/',
    altUrls: ['https://bahrain.cinepolisgulf.com/movies', 'https://bahrain.cinepolisgulf.com/now-showing'],
    comingSoonUrls: ['https://bahrain.cinepolisgulf.com/coming-soon'],
    selectors: [
      '.movie-title',
      '.movie-name',
      '.film-title',
      '.movie-card-title',
      '[class*="movie"] h2',
      '[class*="movie"] h3',
      '[class*="movie"] .title',
      '[class*="Movie"] h2',
      '[class*="Movie"] h3',
      '.movies-section .title',
      '.movie-grid .title',
      'a[href*="/movie"] h2',
      'a[href*="/movie"] h3',
    ],
  },
  {
    name: 'Mukta',
    url: 'https://www.muktaa2cinemas.com/bahrain',
    altUrls: ['https://www.muktaa2cinemas.com/bahrain/movies', 'https://www.muktaa2cinemas.com/bahrain/now-showing'],
    comingSoonUrls: ['https://www.muktaa2cinemas.com/bahrain/coming-soon'],
    selectors: [
      '.movie-title',
      '.movie-name',
      '.film-title',
      '.film-name',
      '[class*="movie"] h2',
      '[class*="movie"] h3',
      '[class*="movie"] .title',
      '.movies-list .title',
      '.movie-card h2',
      '.movie-card h3',
      '.carousel .movie-title',
      'a[href*="/movie"] h2',
      'a[href*="/movie"] h3',
    ],
  },
];

// Generic titles to skip (not actual movies)
const SKIP_TITLES = [
  'now showing',
  'coming soon',
  'advance booking',
  'restaurants',
  'discover movies',
  'whats on',
  "what's on",
  'book now',
  'buy tickets',
  'view all',
  'see all',
  'more movies',
  'all movies',
  'select cinema',
  'select date',
  'select time',
  'food and beverages',
  'food & beverages',
  'offers',
  'promotions',
  'gift cards',
  'contact us',
  'about us',
  'careers',
  'terms and conditions',
  'privacy policy',
  'faq',
  'help',
  'support',
  'cinema locations',
  'our cinemas',
  'experiences',
  'vip',
  'imax',
  '4dx',
  'dolby',
  'screenx',
];

// Clean movie title for matching - STRICT cleaning
function cleanTitle(title) {
  return title
    .toLowerCase()
    // Remove ratings like (PG-15), (15+), (PG), etc.
    .replace(/\(pg-?\d*\)/gi, '')
    .replace(/\(\d+\+?\)/gi, '')
    .replace(/\(u\/a\)/gi, '')
    .replace(/\(u\)/gi, '')
    // Remove language indicators
    .replace(/\(ar\)/gi, '')
    .replace(/\(en\)/gi, '')
    .replace(/\(hindi\)/gi, '')
    .replace(/\(tamil\)/gi, '')
    .replace(/\(malayalam\)/gi, '')
    .replace(/arabic|english|tamil|hindi|malayalam|telugu/gi, '')
    // Remove format indicators
    .replace(/book now|2d|3d|imax|4dx|dolby|atmos|screenx/gi, '')
    // Remove special characters and extra spaces
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Check if title should be skipped
function shouldSkipTitle(title) {
  const cleaned = cleanTitle(title);

  // Too short
  if (cleaned.length < 3) return true;

  // In skip list
  if (SKIP_TITLES.some((skip) => cleaned === skip || cleaned.includes(skip))) return true;

  // Only numbers
  if (/^\d+$/.test(cleaned)) return true;

  return false;
}

// STRICT matching function - no fuzzy matching
function matchMovies(scrapedTitles, dbMovies) {
  const matched = new Map();
  const unmatched = [];

  console.log('\nMatching scraped titles to database...');

  for (const scraped of scrapedTitles) {
    // Skip generic titles
    if (shouldSkipTitle(scraped)) {
      console.log(`  SKIP: "${scraped}" (generic/invalid)`);
      continue;
    }

    const cleanedScraped = cleanTitle(scraped);
    let foundMatch = false;

    for (const movie of dbMovies) {
      const cleanedDb = cleanTitle(movie.title);

      // EXACT match after cleaning
      if (cleanedScraped === cleanedDb) {
        if (!matched.has(movie.id)) {
          matched.set(movie.id, { movie, scraped, matchType: 'exact' });
          console.log(`  EXACT: "${scraped}" -> "${movie.title}"`);
        }
        foundMatch = true;
        break;
      }

      // CONTAINS match (one contains the other completely)
      // Only match if the shorter string is at least 5 characters
      const shorter = cleanedScraped.length < cleanedDb.length ? cleanedScraped : cleanedDb;
      const longer = cleanedScraped.length < cleanedDb.length ? cleanedDb : cleanedScraped;

      if (shorter.length >= 5 && longer.includes(shorter)) {
        // Additional check: the shorter should be at least 50% of the longer
        // This prevents matching "a" in "avatar"
        if (shorter.length >= longer.length * 0.5) {
          if (!matched.has(movie.id)) {
            matched.set(movie.id, { movie, scraped, matchType: 'contains' });
            console.log(`  CONTAINS: "${scraped}" -> "${movie.title}"`);
          }
          foundMatch = true;
          break;
        }
      }
    }

    if (!foundMatch) {
      unmatched.push(scraped);
    }
  }

  console.log(`\nMatched: ${matched.size}, Unmatched: ${unmatched.length}`);
  if (unmatched.length > 0) {
    console.log('Unmatched titles (first 10):', unmatched.slice(0, 10));
  }

  return {
    matched: Array.from(matched.values()),
    unmatched,
  };
}

// ============================================================
// TMDB AUTO-ADD FUNCTIONS
// ============================================================

// Search TMDB for a movie title
async function searchTMDB(title) {
  if (!TMDB_API_KEY) return null;

  const cleanedTitle = cleanTitle(title);
  if (cleanedTitle.length < 3) return null;

  // Search with current year and previous year
  const currentYear = new Date().getFullYear();
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanedTitle)}&primary_release_year=${currentYear}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Return the first result with a valid release date
      const validResult = data.results.find(
        (r) => r.release_date && r.poster_path && r.vote_count > 0
      );
      if (validResult) return validResult;

      // If no valid result with current year, try previous year
      const prevYearUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanedTitle)}&primary_release_year=${currentYear - 1}`;
      const prevResponse = await fetch(prevYearUrl);
      const prevData = await prevResponse.json();

      if (prevData.results && prevData.results.length > 0) {
        const prevValidResult = prevData.results.find(
          (r) => r.release_date && r.poster_path && r.vote_count > 0
        );
        if (prevValidResult) return prevValidResult;
      }

      // Return first result from any year if nothing else
      const anyUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanedTitle)}`;
      const anyResponse = await fetch(anyUrl);
      const anyData = await anyResponse.json();

      if (anyData.results && anyData.results.length > 0) {
        // Only return if it's a recent movie (2023+)
        const recentResult = anyData.results.find((r) => {
          if (!r.release_date) return false;
          const year = parseInt(r.release_date.substring(0, 4));
          return year >= 2023 && r.poster_path;
        });
        return recentResult || null;
      }
    }
  } catch (error) {
    console.error(`  TMDB search failed for "${title}":`, error.message);
  }
  return null;
}

// Get full movie details from TMDB
async function getTMDBDetails(tmdbId) {
  if (!TMDB_API_KEY) return null;

  const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`  Failed to get TMDB details for ${tmdbId}:`, error.message);
    return null;
  }
}

// Extract YouTube trailer URL from TMDB videos
function getTrailerUrl(videos) {
  if (!videos || !videos.results || videos.results.length === 0) {
    return null;
  }

  // Priority: Official Trailer > Trailer > Teaser
  const trailer =
    videos.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official) ||
    videos.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube') ||
    videos.results.find((v) => v.type === 'Teaser' && v.site === 'YouTube');

  if (trailer) {
    return `https://www.youtube.com/watch?v=${trailer.key}`;
  }
  return null;
}

// Get trailer key for embedding
function getTrailerKey(videos) {
  if (!videos || !videos.results || videos.results.length === 0) {
    return null;
  }

  const trailer =
    videos.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official) ||
    videos.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube') ||
    videos.results.find((v) => v.type === 'Teaser' && v.site === 'YouTube');

  return trailer ? trailer.key : null;
}

// Generate URL-friendly slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100);
}

// Auto-add missing movies from TMDB
async function autoAddFromTMDB(unmatchedTitles, existingTmdbIds, titleToCinemas, comingSoonTitles = new Set()) {
  if (!TMDB_API_KEY) {
    console.log('\nTMDB_API_KEY not set - skipping auto-add');
    return [];
  }

  console.log('\n' + '='.repeat(50));
  console.log('AUTO-ADDING MISSING MOVIES FROM TMDB');
  console.log('='.repeat(50));

  const added = [];
  const processedTitles = new Set();
  const maxToProcess = 50; // Limit to avoid rate limits
  let processed = 0;

  for (const title of unmatchedTitles) {
    if (processed >= maxToProcess) {
      console.log(`\nReached limit of ${maxToProcess} movies to process`);
      break;
    }

    const cleaned = cleanTitle(title);

    // Skip if already processed similar title
    if (processedTitles.has(cleaned)) continue;
    processedTitles.add(cleaned);

    // Skip very short or generic titles
    if (cleaned.length < 4) {
      console.log(`  SKIP (too short): "${title}"`);
      continue;
    }

    // Skip if it looks like a generic title
    if (shouldSkipTitle(title)) {
      console.log(`  SKIP (generic): "${title}"`);
      continue;
    }

    console.log(`\n  Searching TMDB for: "${title}"`);
    const tmdbMovie = await searchTMDB(title);

    if (!tmdbMovie) {
      console.log(`    NOT FOUND on TMDB`);
      processed++;
      // Rate limit: wait 100ms between requests
      await new Promise((r) => setTimeout(r, 100));
      continue;
    }

    // Skip if we already have this movie
    if (existingTmdbIds.has(tmdbMovie.id)) {
      console.log(`    ALREADY EXISTS: ${tmdbMovie.title} (TMDB: ${tmdbMovie.id})`);
      continue;
    }

    console.log(`    FOUND: "${tmdbMovie.title}" (${tmdbMovie.release_date}) - TMDB ID: ${tmdbMovie.id}`);

    // Get full movie details
    const details = await getTMDBDetails(tmdbMovie.id);

    // Create slug
    const slug = generateSlug(tmdbMovie.title);

    // Check if slug already exists
    const { data: existingSlug } = await supabase
      .from('movies')
      .select('id')
      .eq('slug', slug)
      .single();

    const finalSlug = existingSlug ? `${slug}-${tmdbMovie.id}` : slug;

    // Get cinema sources for this title
    const cinemaSources = titleToCinemas?.get(cleaned);
    const scrapedFrom = cinemaSources ? [...cinemaSources] : [];

    // Check if this is a coming soon movie
    const isComingSoon = comingSoonTitles.has(cleaned);

    // Extract trailer URL from details
    const trailerUrl = getTrailerUrl(details?.videos);
    const trailerKey = getTrailerKey(details?.videos);

    // Insert into database - use EXACT column names from movies table
    const movieData = {
      tmdb_id: tmdbMovie.id,
      title: tmdbMovie.title,
      slug: finalSlug,
      synopsis: tmdbMovie.overview || '',
      poster_url: tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : null,
      backdrop_url: tmdbMovie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${tmdbMovie.backdrop_path}` : null,
      release_date: tmdbMovie.release_date,
      tmdb_rating: tmdbMovie.vote_average,
      genre: details?.genres?.map((g) => g.name) || [],
      duration_minutes: details?.runtime || null,
      language: tmdbMovie.original_language,
      trailer_url: trailerUrl,
      trailer_key: trailerKey,
      is_now_showing: !isComingSoon, // Only now showing if NOT coming soon
      is_coming_soon: isComingSoon,
      scraped_from: scrapedFrom,
    };

    const { error } = await supabase.from('movies').insert(movieData);

    if (error) {
      console.log(`    FAILED TO ADD: ${error.message}`);
    } else {
      const statusLabel = isComingSoon ? 'COMING SOON' : 'NOW SHOWING';
      console.log(`    ADDED TO DATABASE! [${statusLabel}] Cinemas: [${scrapedFrom.join(', ')}]`);
      added.push({
        title: tmdbMovie.title,
        tmdb_id: tmdbMovie.id,
        release_date: tmdbMovie.release_date,
        scraped_from: scrapedFrom,
        is_coming_soon: isComingSoon,
      });
      existingTmdbIds.add(tmdbMovie.id);
    }

    processed++;

    // Rate limit: wait 250ms between requests
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`AUTO-ADD COMPLETE: Added ${added.length} new movies from TMDB`);
  console.log('='.repeat(50));

  if (added.length > 0) {
    console.log('\nNewly added movies:');
    added.forEach((m) => console.log(`  - ${m.title} (${m.release_date}) -> [${m.scraped_from.join(', ')}]`));
  }

  return added;
}

// ============================================================
// UPDATE EXISTING MOVIES WITH MISSING DATA
// ============================================================

async function updateMoviesWithMissingData() {
  if (!TMDB_API_KEY) {
    console.log('\nTMDB_API_KEY not set - skipping missing data update');
    return { updated: 0 };
  }

  console.log('\n' + '='.repeat(50));
  console.log('UPDATING MOVIES WITH MISSING DATA (poster/trailer)');
  console.log('='.repeat(50));

  // Get movies with missing poster_url or trailer_url that have a tmdb_id
  const { data: moviesNeedingUpdate, error } = await supabase
    .from('movies')
    .select('id, title, tmdb_id, poster_url, trailer_url')
    .not('tmdb_id', 'is', null)
    .or('poster_url.is.null,trailer_url.is.null');

  if (error) {
    console.error('Error fetching movies needing update:', error);
    return { updated: 0 };
  }

  if (!moviesNeedingUpdate || moviesNeedingUpdate.length === 0) {
    console.log('No movies need updating');
    return { updated: 0 };
  }

  console.log(`Found ${moviesNeedingUpdate.length} movies with missing data`);

  let updated = 0;
  const maxToUpdate = 30; // Limit to avoid rate limits

  for (const movie of moviesNeedingUpdate.slice(0, maxToUpdate)) {
    const needsPoster = !movie.poster_url;
    const needsTrailer = !movie.trailer_url;

    if (!needsPoster && !needsTrailer) continue;

    console.log(`\n  Fetching data for: "${movie.title}" (TMDB: ${movie.tmdb_id})`);
    console.log(`    Missing: ${needsPoster ? 'poster ' : ''}${needsTrailer ? 'trailer' : ''}`);

    const details = await getTMDBDetails(movie.tmdb_id);

    if (!details) {
      console.log(`    Failed to fetch details`);
      continue;
    }

    const updateData = {};

    if (needsPoster && details.poster_path) {
      updateData.poster_url = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
      console.log(`    Found poster: ${details.poster_path}`);
    }

    if (needsPoster && details.backdrop_path && !movie.backdrop_url) {
      updateData.backdrop_url = `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`;
    }

    if (needsTrailer) {
      const trailerUrl = getTrailerUrl(details.videos);
      const trailerKey = getTrailerKey(details.videos);
      if (trailerUrl) {
        updateData.trailer_url = trailerUrl;
        updateData.trailer_key = trailerKey;
        console.log(`    Found trailer: ${trailerKey}`);
      }
    }

    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabase
        .from('movies')
        .update(updateData)
        .eq('id', movie.id);

      if (updateError) {
        console.log(`    Update failed: ${updateError.message}`);
      } else {
        console.log(`    Updated successfully!`);
        updated++;
      }
    }

    // Rate limit
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nUpdated ${updated} movies with missing data`);
  return { updated };
}

// ============================================================
// SCRAPING FUNCTIONS
// ============================================================

// Scrape a single cinema
async function scrapeCinema(browser, cinema) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Scraping ${cinema.name}...`);
  console.log(`${'='.repeat(50)}`);

  const page = await browser.newPage();
  const allMovies = new Set();
  const comingSoonMovies = new Set(); // Track coming soon movies separately

  try {
    // Set realistic browser headers
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    });

    // Try main URL and alternatives
    const urlsToTry = [cinema.url, ...(cinema.altUrls || [])];

    for (const url of urlsToTry) {
      console.log(`\nTrying URL: ${url}`);

      try {
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });

        // Wait for content to load
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Log page title for debugging
        const title = await page.title();
        console.log(`Page title: ${title}`);

        // Try each selector
        for (const selector of cinema.selectors) {
          try {
            const found = await page.$$eval(selector, (els) =>
              els.map((el) => el.textContent?.trim()).filter((t) => t && t.length > 1 && t.length < 100)
            );

            if (found.length > 0) {
              console.log(`Found ${found.length} items with selector: ${selector}`);
              found.forEach((m) => allMovies.add(m));
            }
          } catch {
            // Selector not found, continue
          }
        }

        // Also try generic approach - get all visible text that could be movie titles
        try {
          const genericTitles = await page.evaluate(() => {
            const elements = document.querySelectorAll(
              'h1, h2, h3, h4, [class*="title"], [class*="name"], [class*="movie"], [class*="film"]'
            );
            return Array.from(elements)
              .map((el) => el.textContent?.trim())
              .filter((t) => {
                if (!t || t.length < 3 || t.length > 80) return false;
                // Filter out common non-movie text
                const lower = t.toLowerCase();
                if (
                  lower.includes('menu') ||
                  lower.includes('login') ||
                  lower.includes('sign') ||
                  lower.includes('contact') ||
                  lower.includes('about') ||
                  lower.includes('home') ||
                  lower.includes('cookie') ||
                  lower.includes('privacy') ||
                  lower.includes('terms')
                ) {
                  return false;
                }
                return true;
              });
          });

          if (genericTitles.length > 0) {
            console.log(`Found ${genericTitles.length} generic titles`);
            genericTitles.forEach((m) => allMovies.add(m));
          }
        } catch (err) {
          console.log(`Error with generic extraction: ${err.message}`);
        }

        // Try to extract from JSON-LD structured data
        try {
          const jsonLdData = await page.evaluate(() => {
            const scripts = document.querySelectorAll('script[type="application/ld+json"]');
            const movies = [];
            scripts.forEach((script) => {
              try {
                const data = JSON.parse(script.textContent || '');
                const extractMovies = (obj) => {
                  if (!obj || typeof obj !== 'object') return;
                  if (Array.isArray(obj)) {
                    obj.forEach(extractMovies);
                    return;
                  }
                  if (obj['@type'] === 'Movie' && obj.name) {
                    movies.push(obj.name);
                  }
                  Object.values(obj).forEach(extractMovies);
                };
                extractMovies(data);
              } catch {
                // Invalid JSON, skip
              }
            });
            return movies;
          });

          if (jsonLdData.length > 0) {
            console.log(`Found ${jsonLdData.length} movies from JSON-LD`);
            jsonLdData.forEach((m) => allMovies.add(m));
          }
        } catch (err) {
          console.log(`Error extracting JSON-LD: ${err.message}`);
        }

        // ============================================================
        // GENERIC: Detect "Coming Soon" section separator for ALL cinemas
        // ============================================================
        if (allMovies.size > 0) {
          try {
            console.log(`\nDetecting Coming Soon section for ${cinema.name}...`);

            // Get all text content in order from the page to detect section separators
            const pageStructure = await page.evaluate(() => {
              const result = [];
              // Look for section headers and movie titles
              const elements = document.querySelectorAll('h1, h2, h3, h4, .section-title, .section-header, [class*="section"], [class*="title"], [class*="movie"]');

              for (const el of elements) {
                const text = el.textContent?.trim();
                if (text && text.length > 0 && text.length < 150) {
                  result.push({
                    text: text,
                    tagName: el.tagName,
                    className: el.className || ''
                  });
                }
              }
              return result;
            });

            // Find the "Coming Soon" separator
            let foundComingSoonSection = false;
            const nowShowingTitles = [];
            const comingSoonTitles = [];

            for (const item of pageStructure) {
              const textUpper = item.text.toUpperCase();

              // Check if this is a "Coming Soon" section header
              if (textUpper.includes('COMING SOON') ||
                  textUpper === 'COMING SOON' ||
                  textUpper.includes('UPCOMING') ||
                  textUpper.includes('ADVANCE BOOKING')) {
                console.log(`  Found section separator: "${item.text}"`);
                foundComingSoonSection = true;
                continue;
              }

              // Check if this looks like a movie title (not a section header)
              if (item.text.length >= 3 && item.text.length <= 80 && !shouldSkipTitle(item.text)) {
                // Check if any of our scraped movies match this title
                const cleaned = cleanTitle(item.text);
                for (const movie of allMovies) {
                  if (cleanTitle(movie) === cleaned || cleaned.includes(cleanTitle(movie)) || cleanTitle(movie).includes(cleaned)) {
                    if (foundComingSoonSection) {
                      comingSoonTitles.push(movie);
                    } else {
                      nowShowingTitles.push(movie);
                    }
                    break;
                  }
                }
              }
            }

            if (foundComingSoonSection && comingSoonTitles.length > 0) {
              console.log(`  ${cinema.name} Now Showing: ${nowShowingTitles.length} movies`);
              console.log(`  ${cinema.name} Coming Soon: ${comingSoonTitles.length} movies`);

              // Move coming soon movies from allMovies to comingSoonMovies
              comingSoonTitles.forEach(title => {
                comingSoonMovies.add(title);
                allMovies.delete(title);
              });
            } else {
              console.log('  No Coming Soon section detected or no movies in that section');
            }
          } catch (err) {
            console.log(`  Error detecting ${cinema.name} sections: ${err.message}`);
          }
        }

        // If we found movies, no need to try other URLs
        if (allMovies.size > 0 || comingSoonMovies.size > 0) {
          console.log(`Total unique titles found: ${allMovies.size} now showing, ${comingSoonMovies.size} coming soon`);
          break;
        }
      } catch (navError) {
        console.log(`Failed to navigate to ${url}: ${navError.message}`);
      }
    }

    // ============================================================
    // SCRAPE DEDICATED "COMING SOON" URLs
    // ============================================================
    const comingSoonUrls = cinema.comingSoonUrls || [];
    if (comingSoonUrls.length > 0) {
      console.log(`\nScraping Coming Soon URLs for ${cinema.name}...`);

      for (const comingSoonUrl of comingSoonUrls) {
        console.log(`  Trying Coming Soon URL: ${comingSoonUrl}`);

        try {
          await page.goto(comingSoonUrl, {
            waitUntil: 'networkidle2',
            timeout: 30000,
          });

          // Wait for content to load
          await new Promise((resolve) => setTimeout(resolve, 3000));

          const pageTitle = await page.title();
          console.log(`  Page title: ${pageTitle}`);

          // Try each selector
          for (const selector of cinema.selectors) {
            try {
              const found = await page.$$eval(selector, (els) =>
                els.map((el) => el.textContent?.trim()).filter((t) => t && t.length > 1 && t.length < 100)
              );

              if (found.length > 0) {
                console.log(`  Found ${found.length} coming soon items with selector: ${selector}`);
                // Add these as Coming Soon movies (not Now Showing)
                found.forEach((m) => {
                  if (!shouldSkipTitle(m)) {
                    comingSoonMovies.add(m);
                    // Remove from allMovies if it was also there
                    allMovies.delete(m);
                  }
                });
              }
            } catch {
              // Selector not found, continue
            }
          }

          // Also try generic approach for coming soon page
          try {
            const genericTitles = await page.evaluate(() => {
              const elements = document.querySelectorAll(
                'h1, h2, h3, h4, [class*="title"], [class*="name"], [class*="movie"], [class*="film"]'
              );
              return Array.from(elements)
                .map((el) => el.textContent?.trim())
                .filter((t) => {
                  if (!t || t.length < 3 || t.length > 80) return false;
                  const lower = t.toLowerCase();
                  if (
                    lower.includes('menu') ||
                    lower.includes('login') ||
                    lower.includes('sign') ||
                    lower.includes('contact') ||
                    lower.includes('about') ||
                    lower.includes('home') ||
                    lower.includes('cookie') ||
                    lower.includes('privacy') ||
                    lower.includes('terms') ||
                    lower.includes('coming soon') ||
                    lower.includes('now showing')
                  ) {
                    return false;
                  }
                  return true;
                });
            });

            if (genericTitles.length > 0) {
              console.log(`  Found ${genericTitles.length} generic coming soon titles`);
              genericTitles.forEach((m) => {
                if (!shouldSkipTitle(m)) {
                  comingSoonMovies.add(m);
                  allMovies.delete(m);
                }
              });
            }
          } catch (err) {
            console.log(`  Error with generic coming soon extraction: ${err.message}`);
          }

          console.log(`  Coming Soon movies after scraping: ${comingSoonMovies.size}`);
        } catch (navError) {
          console.log(`  Failed to navigate to coming soon URL ${comingSoonUrl}: ${navError.message}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error scraping ${cinema.name}:`, error.message);
  } finally {
    await page.close();
  }

  const nowShowingList = Array.from(allMovies);
  const comingSoonList = Array.from(comingSoonMovies);

  console.log(`\n${cinema.name} Results: ${nowShowingList.length} now showing, ${comingSoonList.length} coming soon`);
  if (nowShowingList.length > 0) {
    console.log('Now Showing:', nowShowingList);
  }
  if (comingSoonList.length > 0) {
    console.log('Coming Soon:', comingSoonList);
  }

  return {
    cinema: cinema.name,
    movies: nowShowingList, // Keep backwards compatibility
    nowShowing: nowShowingList,
    comingSoon: comingSoonList,
    count: nowShowingList.length + comingSoonList.length,
  };
}

// ============================================================
// MAIN MATCHING AND UPDATE FUNCTION
// ============================================================

// Cinema name mapping for scraped_from column
const CINEMA_KEY_MAP = {
  'Cineco': 'cineco',
  'VOX': 'vox',
  'Cinepolis': 'cinepolis',
  'Mukta': 'mukta',
};

// Match scraped movies with database and update
async function matchAndUpdateMovies(scrapedResults) {
  console.log('\n' + '='.repeat(50));
  console.log('MATCHING MOVIES WITH DATABASE');
  console.log('='.repeat(50));

  // Get all movies from database - only get recent movies (released in last 2 years)
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  const twoYearsAgoStr = twoYearsAgo.toISOString().split('T')[0];

  const { data: dbMovies, error } = await supabase
    .from('movies')
    .select('id, title, tmdb_id, release_date')
    .gte('release_date', twoYearsAgoStr)
    .order('release_date', { ascending: false });

  if (error) {
    console.error('Error fetching movies from database:', error);
    return { matchedCount: 0, error: error.message };
  }

  console.log(`Database has ${dbMovies?.length || 0} recent movies (released since ${twoYearsAgoStr})`);

  // Build set of existing TMDB IDs
  const existingTmdbIds = new Set((dbMovies || []).filter((m) => m.tmdb_id).map((m) => m.tmdb_id));
  console.log(`Existing TMDB IDs in database: ${existingTmdbIds.size}`);

  // ============================================================
  // BUILD MOVIE -> CINEMAS MAP (Track which cinema has each movie)
  // ============================================================
  console.log('\n' + '='.repeat(50));
  console.log('BUILDING MOVIE -> CINEMA MAP');
  console.log('='.repeat(50));

  const movieCinemaMap = new Map(); // movie_id -> Set of cinema keys
  const titleToCinemas = new Map(); // cleaned_title -> Set of cinema keys
  const comingSoonTitles = new Set(); // Track which titles are coming soon

  // Process each cinema's results to build title->cinema mapping
  for (const result of scrapedResults) {
    const cinemaKey = CINEMA_KEY_MAP[result.cinema] || result.cinema.toLowerCase();
    const nowShowingMovies = result.nowShowing || result.movies || [];
    const comingSoonMovies = result.comingSoon || [];

    console.log(`\nProcessing ${result.cinema} -> key: ${cinemaKey}`);
    console.log(`  Now Showing: ${nowShowingMovies.length}, Coming Soon: ${comingSoonMovies.length}`);

    // Process now showing movies
    for (const title of nowShowingMovies) {
      if (shouldSkipTitle(title)) continue;

      const cleaned = cleanTitle(title);
      if (!titleToCinemas.has(cleaned)) {
        titleToCinemas.set(cleaned, new Set());
      }
      titleToCinemas.get(cleaned).add(cinemaKey);
    }

    // Process coming soon movies (track them separately)
    for (const title of comingSoonMovies) {
      if (shouldSkipTitle(title)) continue;

      const cleaned = cleanTitle(title);
      if (!titleToCinemas.has(cleaned)) {
        titleToCinemas.set(cleaned, new Set());
      }
      titleToCinemas.get(cleaned).add(cinemaKey);
      comingSoonTitles.add(cleaned); // Mark as coming soon
    }
  }

  console.log(`Built title->cinema map with ${titleToCinemas.size} unique titles`);
  console.log(`Coming soon titles: ${comingSoonTitles.size}`);

  // Collect all scraped titles (unique) - including now showing and coming soon
  const allNowShowingTitles = [...new Set(scrapedResults.flatMap((r) => r.nowShowing || r.movies || []))];
  const allComingSoonOnlyTitles = [...new Set(scrapedResults.flatMap((r) => r.comingSoon || []))];
  const allScrapedTitles = [...new Set([...allNowShowingTitles, ...allComingSoonOnlyTitles])];
  console.log(`Total unique scraped titles: ${allScrapedTitles.length} (${allNowShowingTitles.length} now showing, ${allComingSoonOnlyTitles.length} coming soon)`);

  // Match using STRICT matching
  const { matched, unmatched } = matchMovies(allScrapedTitles, dbMovies || []);

  // Build movie_id -> cinemas map from matched results
  for (const match of matched) {
    const cleanedScraped = cleanTitle(match.scraped);
    const cinemas = titleToCinemas.get(cleanedScraped);
    if (cinemas) {
      if (!movieCinemaMap.has(match.movie.id)) {
        movieCinemaMap.set(match.movie.id, new Set());
      }
      cinemas.forEach((c) => movieCinemaMap.get(match.movie.id).add(c));
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`INITIAL MATCHING: ${matched.length} movies matched, ${unmatched.length} unmatched`);
  console.log('='.repeat(50));

  // ============================================================
  // AUTO-ADD MISSING MOVIES FROM TMDB
  // ============================================================
  let addedMovies = [];
  if (unmatched.length > 0 && TMDB_API_KEY) {
    // Pass titleToCinemas and comingSoonTitles so auto-add can track cinema sources and coming soon status
    addedMovies = await autoAddFromTMDB(unmatched, existingTmdbIds, titleToCinemas, comingSoonTitles);
  }

  // ============================================================
  // UPDATE DATABASE WITH NOW SHOWING STATUS AND SCRAPED_FROM
  // ============================================================
  const now = new Date().toISOString();
  const totalMatched = matched.length + addedMovies.length;

  console.log('\n' + '='.repeat(50));
  console.log('UPDATING NOW SHOWING STATUS & CINEMA SOURCES');
  console.log('='.repeat(50));

  // ALWAYS reset ALL movies to not showing first and clear scraped_from
  // This ensures only verified movies from Bahrain cinemas are marked as showing
  console.log('\nResetting ALL movies to not showing...');
  const { error: resetError } = await supabase
    .from('movies')
    .update({ is_now_showing: false, scraped_from: [] })
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (resetError) {
    console.error('Error resetting movies:', resetError);
  } else {
    console.log('All movies reset to is_now_showing: false, scraped_from: []');
  }

  // Only mark movies that are VERIFIED from Bahrain cinema websites
  if (totalMatched > 0) {
    // Count how many are now showing vs coming soon
    const addedComingSoon = addedMovies.filter(m => m.is_coming_soon).length;
    const addedNowShowing = addedMovies.length - addedComingSoon;

    console.log(`\nMarking ${matched.length} matched + ${addedNowShowing} auto-added = ${matched.length + addedNowShowing} movies as "Now Showing"`);
    console.log(`Marking ${addedComingSoon} auto-added movies as "Coming Soon"`);

    // Set matched movies as now showing or coming soon WITH cinema sources
    for (const match of matched) {
      const cinemas = movieCinemaMap.get(match.movie.id);
      const scrapedFrom = cinemas ? [...cinemas] : [];

      // Check if this matched movie is a coming soon movie
      const cleanedScraped = cleanTitle(match.scraped);
      const isComingSoon = comingSoonTitles.has(cleanedScraped);

      const { error: updateError } = await supabase
        .from('movies')
        .update({
          is_now_showing: !isComingSoon,
          is_coming_soon: isComingSoon,
          scraped_from: scrapedFrom,
        })
        .eq('id', match.movie.id);

      if (updateError) {
        console.error(`Error updating movie ${match.movie.id}:`, updateError);
      } else {
        const statusLabel = isComingSoon ? 'COMING SOON' : 'NOW SHOWING';
        console.log(`  Updated: ${match.movie.title} [${statusLabel}] -> cinemas: [${scrapedFrom.join(', ')}]`);
      }
    }

    // Auto-added movies already have scraped_from and is_coming_soon set during insert

    console.log(`\nSuccessfully updated movies with correct status and cinema sources`);
  } else {
    console.log('\nNo movies matched from Bahrain cinemas - all movies set to not showing');
    console.log('This is correct - we only show movies verified from actual cinema websites');
  }

  // ============================================================
  // LOG RESULTS
  // ============================================================
  try {
    await supabase.from('agent_logs').insert({
      agent_type: 'cinema_scraper_github',
      started_at: now,
      completed_at: new Date().toISOString(),
      status: 'completed',
      items_found: allScrapedTitles.length,
      items_updated: totalMatched,
      error_count: 0,
      metadata: {
        cinemas: scrapedResults.map((r) => ({
          name: r.cinema,
          count: r.count,
        })),
        matchedCount: matched.length,
        unmatchedCount: unmatched.length,
        autoAddedCount: addedMovies.length,
        totalNowShowing: totalMatched,
        matchedMovies: matched.map((m) => ({
          scraped: m.scraped,
          matched: m.movie.title,
          type: m.matchType,
        })),
        autoAddedMovies: addedMovies.map((m) => ({
          title: m.title,
          tmdb_id: m.tmdb_id,
          release_date: m.release_date,
        })),
        unmatchedTitles: unmatched
          .filter((t) => !addedMovies.some((a) => cleanTitle(a.title) === cleanTitle(t)))
          .slice(0, 20),
      },
    });
    console.log('\nLogged results to agent_logs');
  } catch (logError) {
    console.error('Error logging results:', logError);
  }

  return {
    matchedCount: matched.length,
    autoAddedCount: addedMovies.length,
    totalNowShowing: totalMatched,
    totalScraped: allScrapedTitles.length,
    matched,
    addedMovies,
    unmatched,
  };
}

// ============================================================
// AUTOMATED DATABASE CLEANUP
// ============================================================

async function automatedCleanup() {
  console.log('\n' + '='.repeat(50));
  console.log('AUTOMATED DATABASE CLEANUP');
  console.log('='.repeat(50));

  const results = {
    fixedComingSoon: 0,
    deletedOrphaned: 0,
    fixedComingSoonTitles: [],
    deletedOrphanedTitles: [],
  };

  // Helper to check if scraped_from is empty
  const hasNoCinemaSources = (scrapedFrom) => {
    return !scrapedFrom ||
           (Array.isArray(scrapedFrom) && scrapedFrom.length === 0);
  };

  // ============================================================
  // STEP 1: Fix Coming Soon movies with no cinema sources
  // ============================================================
  console.log('\nStep 1: Fixing Coming Soon movies with no cinema sources...');

  const { data: comingSoonMovies, error: fetchComingSoonError } = await supabase
    .from('movies')
    .select('id, title, scraped_from')
    .eq('is_coming_soon', true);

  if (fetchComingSoonError) {
    console.error('Error fetching coming soon movies:', fetchComingSoonError);
  } else {
    const orphanedComingSoon = (comingSoonMovies || []).filter(movie =>
      hasNoCinemaSources(movie.scraped_from)
    );

    if (orphanedComingSoon.length > 0) {
      const idsToFix = orphanedComingSoon.map(m => m.id);

      const { error: fixError } = await supabase
        .from('movies')
        .update({ is_coming_soon: false })
        .in('id', idsToFix);

      if (fixError) {
        console.error('Error fixing coming soon movies:', fixError);
      } else {
        results.fixedComingSoon = orphanedComingSoon.length;
        results.fixedComingSoonTitles = orphanedComingSoon.map(m => m.title);
        console.log(`Fixed ${orphanedComingSoon.length} Coming Soon movies (no Bahrain cinema sources):`);
        orphanedComingSoon.forEach(m => console.log(`  - ${m.title}`));
      }
    } else {
      console.log('No orphaned Coming Soon movies found.');
    }
  }

  // ============================================================
  // STEP 2: Delete orphaned movies
  // ============================================================
  console.log('\nStep 2: Deleting orphaned movies...');

  const { data: moviesToDelete, error: fetchError } = await supabase
    .from('movies')
    .select('id, title, scraped_from')
    .eq('is_now_showing', false)
    .eq('is_coming_soon', false);

  if (fetchError) {
    console.error('Error fetching movies to delete:', fetchError);
  } else {
    const filteredMovies = (moviesToDelete || []).filter(movie =>
      hasNoCinemaSources(movie.scraped_from)
    );

    if (filteredMovies.length > 0) {
      const idsToDelete = filteredMovies.map(m => m.id);

      const { error: deleteError } = await supabase
        .from('movies')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) {
        console.error('Error deleting movies:', deleteError);
      } else {
        results.deletedOrphaned = filteredMovies.length;
        results.deletedOrphanedTitles = filteredMovies.map(m => m.title);
        console.log(`Deleted ${filteredMovies.length} orphaned movies (not in any Bahrain cinema):`);
        filteredMovies.forEach(m => console.log(`  - ${m.title}`));
      }
    } else {
      console.log('No orphaned movies to delete.');
    }
  }

  console.log('\n=== CLEANUP COMPLETE ===');
  console.log(`Fixed Coming Soon: ${results.fixedComingSoon}`);
  console.log(`Deleted Orphaned: ${results.deletedOrphaned}`);

  return results;
}

// ============================================================
// MAIN FUNCTION
// ============================================================

async function main() {
  console.log('='.repeat(50));
  console.log('CINEMA SCRAPER - GitHub Actions');
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log('='.repeat(50));
  console.log(`TMDB Auto-Add: ${TMDB_API_KEY ? 'ENABLED' : 'DISABLED'}`);

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  try {
    // Scrape all cinemas
    const results = [];
    for (const cinema of cinemas) {
      const result = await scrapeCinema(browser, cinema);
      results.push(result);
    }

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('SCRAPING SUMMARY');
    console.log('='.repeat(50));
    results.forEach((r) => {
      console.log(`${r.cinema}: ${r.count} titles`);
    });

    // Match and update database
    const matchResult = await matchAndUpdateMovies(results);

    // Update existing movies with missing poster/trailer data
    const updateResult = await updateMoviesWithMissingData();

    // Run automated cleanup after scraping and updating
    const cleanupResult = await automatedCleanup();

    console.log('\n' + '='.repeat(50));
    console.log('FINAL RESULTS');
    console.log('='.repeat(50));
    console.log(`Total scraped: ${matchResult.totalScraped}`);
    console.log(`Matched to existing: ${matchResult.matchedCount}`);
    console.log(`Auto-added from TMDB: ${matchResult.autoAddedCount}`);
    console.log(`Total now showing: ${matchResult.totalNowShowing}`);
    console.log(`Movies updated with missing data: ${updateResult.updated}`);
    console.log(`Cleanup - Fixed Coming Soon: ${cleanupResult.fixedComingSoon}`);
    console.log(`Cleanup - Deleted Orphaned: ${cleanupResult.deletedOrphaned}`);
    console.log(`Completed at: ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }

  console.log('\nDone!');
}

// Run
main().catch(console.error);
