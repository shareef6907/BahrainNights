const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

// Validate environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing environment variables:');
  console.error('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'MISSING');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'MISSING');
  process.exit(1);
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
  'what\'s on',
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
  if (SKIP_TITLES.some(skip => cleaned === skip || cleaned.includes(skip))) return true;

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

// Scrape a single cinema
async function scrapeCinema(browser, cinema) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Scraping ${cinema.name}...`);
  console.log(`${'='.repeat(50)}`);

  const page = await browser.newPage();
  const allMovies = new Set();

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

        // If we found movies, no need to try other URLs
        if (allMovies.size > 0) {
          console.log(`Total unique titles found: ${allMovies.size}`);
          break;
        }
      } catch (navError) {
        console.log(`Failed to navigate to ${url}: ${navError.message}`);
      }
    }
  } catch (error) {
    console.error(`Error scraping ${cinema.name}:`, error.message);
  } finally {
    await page.close();
  }

  const movieList = Array.from(allMovies);
  console.log(`\n${cinema.name} Results: ${movieList.length} titles`);
  if (movieList.length > 0) {
    console.log('All titles:', movieList);
  }

  return {
    cinema: cinema.name,
    movies: movieList,
    count: movieList.length,
  };
}

// Match scraped movies with database and update
async function matchAndUpdateMovies(scrapedResults) {
  console.log('\n' + '='.repeat(50));
  console.log('Matching movies with database...');
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

  if (!dbMovies || dbMovies.length === 0) {
    console.log('No recent movies in database to match against');
    return { matchedCount: 0, error: 'No recent movies in database' };
  }

  console.log(`Database has ${dbMovies.length} recent movies (released since ${twoYearsAgoStr})`);

  // Collect all scraped titles (unique)
  const allScrapedTitles = [...new Set(scrapedResults.flatMap((r) => r.movies))];
  console.log(`Total unique scraped titles: ${allScrapedTitles.length}`);

  // Match using STRICT matching
  const { matched, unmatched } = matchMovies(allScrapedTitles, dbMovies);

  console.log(`\n${'='.repeat(50)}`);
  console.log(`MATCHING RESULTS: ${matched.length} movies matched`);
  console.log(`${'='.repeat(50)}`);

  // Update database
  const now = new Date().toISOString();

  if (matched.length >= 3) {
    console.log('\nUpdating database with matched movies...');

    // First, reset all movies to not showing
    const { error: resetError } = await supabase
      .from('movies')
      .update({ is_now_showing: false })
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (resetError) {
      console.error('Error resetting movies:', resetError);
    }

    // Set matched movies as now showing
    const matchedIds = matched.map((m) => m.movie.id);

    for (const id of matchedIds) {
      const { error: updateError } = await supabase
        .from('movies')
        .update({
          is_now_showing: true,
        })
        .eq('id', id);

      if (updateError) {
        console.error(`Error updating movie ${id}:`, updateError);
      }
    }

    console.log(`Successfully updated ${matchedIds.length} movies as "Now Showing"`);
  } else {
    console.log('\nToo few matches. Using TMDB fallback...');

    // TMDB Fallback: Mark movies released within last 60 days as now showing
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const sixtyDaysAgoStr = sixtyDaysAgo.toISOString().split('T')[0];
    const todayStr = new Date().toISOString().split('T')[0];

    const { data: recentMovies, error: recentError } = await supabase
      .from('movies')
      .select('id, title, release_date, popularity')
      .gte('release_date', sixtyDaysAgoStr)
      .lte('release_date', todayStr)
      .gte('popularity', 20)
      .order('popularity', { ascending: false })
      .limit(30);

    if (recentError) {
      console.error('Error fetching recent movies:', recentError);
    } else if (recentMovies && recentMovies.length > 0) {
      console.log(`Found ${recentMovies.length} movies via TMDB fallback`);

      // Reset all first
      await supabase
        .from('movies')
        .update({ is_now_showing: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Set recent popular movies as now showing
      const recentIds = recentMovies.map((m) => m.id);

      for (const id of recentIds) {
        await supabase
          .from('movies')
          .update({ is_now_showing: true })
          .eq('id', id);
      }

      console.log(`Set ${recentIds.length} movies as "Now Showing" via fallback`);
    }
  }

  // Log results to agent_logs
  try {
    await supabase.from('agent_logs').insert({
      agent_type: 'cinema_scraper_github',
      started_at: now,
      completed_at: new Date().toISOString(),
      status: 'completed',
      items_found: allScrapedTitles.length,
      items_updated: matched.length,
      error_count: 0,
      metadata: {
        cinemas: scrapedResults.map((r) => ({
          name: r.cinema,
          count: r.count,
        })),
        matchedCount: matched.length,
        unmatchedCount: unmatched.length,
        usedFallback: matched.length < 3,
        matchedMovies: matched.map((m) => ({
          scraped: m.scraped,
          matched: m.movie.title,
          type: m.matchType,
        })),
        unmatchedTitles: unmatched.slice(0, 20),
      },
    });
    console.log('\nLogged results to agent_logs');
  } catch (logError) {
    console.error('Error logging results:', logError);
  }

  return {
    matchedCount: matched.length,
    totalScraped: allScrapedTitles.length,
    matched,
    unmatched,
  };
}

// Main function
async function main() {
  console.log('='.repeat(50));
  console.log('Cinema Scraper - GitHub Actions');
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log('='.repeat(50));

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

    console.log('\n' + '='.repeat(50));
    console.log('FINAL RESULTS');
    console.log('='.repeat(50));
    console.log(`Total scraped: ${matchResult.totalScraped}`);
    console.log(`Matched to database: ${matchResult.matchedCount}`);
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
