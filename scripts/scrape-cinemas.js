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

// Helper to normalize movie titles for matching
function normalizeTitle(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\b(the|a|an|of|in|on|at|to|for|and|or)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate similarity between two strings (Levenshtein-based)
function calculateSimilarity(str1, str2) {
  const s1 = normalizeTitle(str1);
  const s2 = normalizeTitle(str2);

  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.9;

  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  if (longer.length === 0) return 1;

  // Simple character overlap ratio
  let matches = 0;
  for (const char of shorter) {
    if (longer.includes(char)) matches++;
  }

  return matches / longer.length;
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
  console.log(`\n${cinema.name} Results: ${movieList.length} movies`);
  if (movieList.length > 0) {
    console.log('Sample titles:', movieList.slice(0, 5));
  }

  return {
    cinema: cinema.name,
    movies: movieList,
    count: movieList.length,
  };
}

// Match scraped movies with database
async function matchAndUpdateMovies(scrapedResults) {
  console.log('\n' + '='.repeat(50));
  console.log('Matching movies with database...');
  console.log('='.repeat(50));

  // Get all movies from database
  const { data: dbMovies, error } = await supabase.from('movies').select('id, title, tmdb_id');

  if (error) {
    console.error('Error fetching movies from database:', error);
    return { matchedCount: 0, error: error.message };
  }

  if (!dbMovies || dbMovies.length === 0) {
    console.log('No movies in database to match against');
    return { matchedCount: 0, error: 'No movies in database' };
  }

  console.log(`Database has ${dbMovies.length} movies`);

  // Collect all scraped titles
  const allScrapedTitles = scrapedResults.flatMap((r) => r.movies);
  console.log(`Total scraped titles to match: ${allScrapedTitles.length}`);

  // Match scraped titles to database movies
  const matchedIds = new Set();
  const matchDetails = [];

  for (const scrapedTitle of allScrapedTitles) {
    let bestMatch = null;
    let bestSimilarity = 0;

    for (const dbMovie of dbMovies) {
      const similarity = calculateSimilarity(scrapedTitle, dbMovie.title);

      if (similarity > bestSimilarity && similarity >= 0.7) {
        bestSimilarity = similarity;
        bestMatch = dbMovie;
      }
    }

    if (bestMatch && !matchedIds.has(bestMatch.id)) {
      matchedIds.add(bestMatch.id);
      matchDetails.push({
        scraped: scrapedTitle,
        matched: bestMatch.title,
        similarity: Math.round(bestSimilarity * 100) + '%',
      });
    }
  }

  console.log(`\nMatched ${matchedIds.size} unique movies:`);
  matchDetails.slice(0, 10).forEach((m) => {
    console.log(`  "${m.scraped}" -> "${m.matched}" (${m.similarity})`);
  });

  // Update database
  if (matchedIds.size >= 3) {
    // Reset all movies to not showing first
    const { error: resetError } = await supabase
      .from('movies')
      .update({
        is_now_showing: false,
        scraped_from: null,
        last_scraped: new Date().toISOString(),
      })
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (resetError) {
      console.error('Error resetting movies:', resetError);
    }

    // Set matched movies as now showing
    const matchedIdsArray = Array.from(matchedIds);
    const { error: updateError } = await supabase
      .from('movies')
      .update({
        is_now_showing: true,
        scraped_from: ['github_actions'],
        last_scraped: new Date().toISOString(),
      })
      .in('id', matchedIdsArray);

    if (updateError) {
      console.error('Error updating matched movies:', updateError);
    } else {
      console.log(`\nSuccessfully updated ${matchedIds.size} movies as "Now Showing"`);
    }
  } else {
    console.log('\nToo few matches to update. Using TMDB fallback...');

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
        .update({
          is_now_showing: false,
          scraped_from: null,
          last_scraped: new Date().toISOString(),
        })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Set recent popular movies as now showing
      const recentIds = recentMovies.map((m) => m.id);
      await supabase
        .from('movies')
        .update({
          is_now_showing: true,
          scraped_from: ['tmdb_fallback'],
          last_scraped: new Date().toISOString(),
        })
        .in('id', recentIds);

      console.log(`Set ${recentIds.length} movies as "Now Showing" via fallback`);
    }
  }

  // Log results to agent_logs
  try {
    await supabase.from('agent_logs').insert({
      agent_type: 'cinema_scraper_github',
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
      status: 'completed',
      items_found: allScrapedTitles.length,
      items_updated: matchedIds.size,
      error_count: 0,
      metadata: {
        cinemas: scrapedResults.map((r) => ({
          name: r.cinema,
          count: r.count,
        })),
        matchedCount: matchedIds.size,
        usedFallback: matchedIds.size < 3,
      },
    });
    console.log('\nLogged results to agent_logs');
  } catch (logError) {
    console.error('Error logging results:', logError);
  }

  return {
    matchedCount: matchedIds.size,
    totalScraped: allScrapedTitles.length,
    matchDetails: matchDetails.slice(0, 20),
  };
}

// Main function
async function main() {
  console.log('='.repeat(50));
  console.log('Cinema Scraper - GitHub Actions');
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log('='.repeat(50));

  // Environment already validated at top of script

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
      console.log(`${r.cinema}: ${r.count} movies`);
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
