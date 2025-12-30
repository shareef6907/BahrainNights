/**
 * Cinema Scraper - Clean Rewrite
 *
 * Simple Logic:
 * 1. Coming Soon = Movies from dedicated Coming Soon pages
 * 2. Now Showing = Movies from main pages NOT in Coming Soon list
 */

// Load .env.local for local development
try {
  require('dotenv').config({ path: '.env.local' });
} catch {
  // dotenv might not be installed in production
}

const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

// Helper function to wait (Puppeteer removed waitForTimeout)
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Navigate to URL with retry logic
 */
async function navigateWithRetry(page, url, options = {}, maxRetries = 3) {
  const { waitUntil = 'networkidle2', timeout = 30000 } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await page.goto(url, {
        waitUntil,
        timeout,
      });

      if (response && response.status() < 400) {
        return { success: true, response };
      }

      console.log(`  ⚠️ Attempt ${attempt}: Status ${response?.status()}`);
    } catch (err) {
      console.log(`  ⚠️ Attempt ${attempt}: ${err.message}`);
    }

    if (attempt < maxRetries) {
      const waitTime = attempt * 2000; // Exponential backoff
      console.log(`  Waiting ${waitTime / 1000}s before retry...`);
      await wait(waitTime);
    }
  }

  return { success: false, response: null };
}

// Support both env var names
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// TMDB API for auto-adding movies
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// ============================================================
// CINEMA CONFIGURATIONS
// ============================================================
const CINEMAS = {
  cineco: {
    name: 'Cineco',
    nowShowingUrl: 'https://bahrain.cineco.net/',
    comingSoonUrl: 'https://bahrain.cineco.net/coming-soon/',
  },
  vox: {
    name: 'VOX',
    // Use /movies page which loads movie list
    nowShowingUrl: 'https://bhr.voxcinemas.com/movies',
    comingSoonUrl: 'https://bhr.voxcinemas.com/movies/comingsoon',
    skipOnError: false,
    // Use domcontentloaded to avoid HTTP/2 protocol errors during network idle
    waitUntil: 'domcontentloaded',
    timeout: 45000,
    extraWait: 5000, // Wait for dynamic content after DOM loaded
  },
  cinepolis: {
    name: 'Cinepolis',
    nowShowingUrl: 'https://bahrain.cinepolisgulf.com/',
    comingSoonUrl: 'https://bahrain.cinepolisgulf.com/coming-soon',
    waitUntil: 'networkidle2',
    timeout: 60000,
    extraWait: 5000, // Wait for React app to fully render
  },
  mukta: {
    name: 'Mukta',
    nowShowingUrl: 'https://www.muktaa2cinemas.com/bahrain',
    comingSoonUrl: null, // Coming soon is in section on main page
    hasComingSoonSection: true,
  },
};

// ============================================================
// TITLE CLEANING & VALIDATION
// ============================================================

// Invalid titles - menu items, footer text, garbage
const INVALID_TITLES = [
  // Navigation/Menu
  'now showing', 'coming soon', 'advance booking', 'book tickets', 'book now',
  'quick book', 'log in', 'login', 'register', 'sign in', 'sign up', 'my account',
  'log in to your account', 'login to your account', 'register an account',
  'home', 'movies', 'cinemas', 'experiences', 'about', 'contact', 'contact us',
  // Footer
  'site links', 'connect with us', 'follow us', 'download our app', 'ways to book',
  'privacy policy', 'terms of use', 'terms', 'faq', 'faqs', 'disclaimer',
  'corporate profile', 'history', 'business activities', 'investor relations',
  // Social/Apps
  'facebook', 'instagram', 'twitter', 'youtube', 'android app', 'ios app',
  // Other garbage
  'offers', 'special offers', '404', 'error', 'not found', 'page not found',
  'whats on', 'what\'s on', 'discover movies', 'technology', 'trax', 'cine gourmet',
  'food & drinks', 'food and drinks', 'restaurants', 'copyright',
  // Empty/Error states
  'no movies found', 'no results', 'loading', 'please wait',
  // Languages/Ratings only
  'english', 'arabic', 'hindi', 'tamil', 'malayalam', 'telugu', 'tagalog',
  'pg', 'pg-13', 'pg-15', '15+', '18+', 'tbc', 'tc',
];

// Patterns that indicate garbage titles
const INVALID_PATTERNS = [
  /^\d+\s*mins?$/i,                    // "187 Mins"
  /^\d+\s*hours?$/i,                   // "2 hours"
  /^\d+\s*mins?\s+\w+$/i,              // "150 Mins Malayalam"
  /^(pg|pg-?\d+|15\+?|18\+?|tbc|tc)$/i, // Just ratings
  /^book\s*(now|tickets)/i,            // "Book Now"
  /^\d{1,3}$/,                          // Just numbers
  /^[^a-zA-Z]*$/,                       // No letters at all
];

/**
 * Clean a movie title - remove ratings, duration, language tags
 */
function cleanTitle(title) {
  if (!title) return '';

  return title
    // Remove VOX-style rating prefixes at start (e.g., "18TC", "PG15", "15+", "18+", "PG")
    .replace(/^(18TC|15TC|PG15|PG13|PG-15|PG-13|18\+|15\+|PG)\s+/i, '')
    // Remove format tags
    .replace(/\(2D\)|\(3D\)|\(IMAX\)|\(4DX\)/gi, '')
    // Remove ratings in parentheses
    .replace(/\(PG\)|\(PG-13\)|\(PG-15\)|\(15\+\)|\(18\+\)|\(18 \+\)|\(TBC\)|\(TC\)/gi, '')
    // Remove year in parentheses at end
    .replace(/\(\d{4}\)$/g, '')
    // Remove duration
    .replace(/\d+\s*mins?/gi, '')
    // Remove standalone language tags at end
    .replace(/\s+(English|Arabic|Hindi|Tamil|Malayalam|Telugu|Tagalog)\s*$/gi, '')
    // Remove language tags in parentheses at end
    .replace(/\s*\((English|Arabic|Hindi|Tamil|Malayalam|Telugu|Tagalog)\)\s*$/gi, '')
    // Remove "Book Tickets" etc
    .replace(/book\s*(now|tickets)/gi, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if a title is a valid movie title (not garbage)
 */
function isValidTitle(title) {
  if (!title || typeof title !== 'string') return false;

  const trimmed = title.trim();
  if (trimmed.length < 2 || trimmed.length > 100) return false;

  const lowerTitle = trimmed.toLowerCase();

  // Check against invalid titles list
  for (const invalid of INVALID_TITLES) {
    if (lowerTitle === invalid) return false;
    // Only check includes for longer invalid strings (avoid false positives)
    if (invalid.length >= 8 && lowerTitle.includes(invalid)) return false;
  }

  // Check against invalid patterns
  for (const pattern of INVALID_PATTERNS) {
    if (pattern.test(trimmed)) return false;
  }

  // Must have at least 3 letters
  const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < 3) return false;

  return true;
}

/**
 * Normalize title for comparison (lowercase, no special chars)
 */
function normalizeForComparison(title) {
  return cleanTitle(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ============================================================
// EXTRACTION FUNCTIONS
// ============================================================

/**
 * Extract movie titles from Cineco page
 */
async function extractCinecoTitles(page) {
  return await page.evaluate(() => {
    const titles = [];

    // Movie cards with h2 or h3 titles
    document.querySelectorAll('[class*="movie"] h2, [class*="movie"] h3').forEach(el => {
      // Skip if in footer/nav
      if (el.closest('footer, nav, .footer, .nav, .menu')) return;
      const text = el.textContent?.trim();
      if (text) titles.push(text);
    });

    // Also check movie links
    document.querySelectorAll('a[href*="/amy_movie/"] h2, a[href*="/amy_movie/"] h3').forEach(el => {
      const text = el.textContent?.trim();
      if (text && !titles.includes(text)) titles.push(text);
    });

    return titles;
  });
}

/**
 * Extract movie titles from VOX page
 * VOX structure: article > h3 > a (movie title link)
 */
async function extractVOXTitles(page) {
  return await page.evaluate(() => {
    const titles = [];

    // VOX uses article elements for movie cards
    // Each article has an h3 with a link containing the movie title
    document.querySelectorAll('article h3 a').forEach(el => {
      if (el.closest('footer, nav, header')) return;
      const text = el.textContent?.trim();
      if (text && !titles.includes(text)) titles.push(text);
    });

    // Also check article h3 directly (some pages may not have links)
    document.querySelectorAll('article h3').forEach(el => {
      if (el.closest('footer, nav, header')) return;
      const text = el.textContent?.trim();
      if (text && !titles.includes(text)) titles.push(text);
    });

    // Fallback: img alt text from movie posters
    document.querySelectorAll('article img[alt*="Movie poster for"]').forEach(el => {
      if (el.closest('footer, nav, header')) return;
      const alt = el.getAttribute('alt') || '';
      const title = alt.replace('Movie poster for ', '').trim();
      if (title && !titles.includes(title)) titles.push(title);
    });

    return titles;
  });
}

/**
 * Extract movie titles from Cinepolis page
 * Cinepolis structure: Uses h6 elements for movie titles in card layouts
 */
async function extractCinepolisTitles(page) {
  // Try to close any popup dialogs first
  try {
    await page.evaluate(() => {
      // Look for close buttons in dialogs
      const closeButtons = document.querySelectorAll('dialog img[alt*="close"], dialog button, [role="dialog"] img[alt*="close"]');
      closeButtons.forEach(btn => {
        if (btn.closest('dialog, [role="dialog"]')) {
          btn.click();
        }
      });
    });
    await new Promise(r => setTimeout(r, 1000));
  } catch (e) {
    // Ignore popup errors
  }

  // Wait for movie content to load
  try {
    await page.waitForSelector('h6', { timeout: 10000 });
  } catch (e) {
    console.log('  Warning: Could not find h6 elements');
  }

  return await page.evaluate(() => {
    const titles = [];

    // Cinepolis uses h6 for movie titles in their React app
    // Look for h6 elements that are movie titles (not section headers)
    document.querySelectorAll('h6').forEach(el => {
      if (el.closest('footer, nav, header')) return;
      const text = el.textContent?.trim();

      // Skip section headers and non-movie text
      const skipTexts = [
        'now showing', 'coming soon', 'advance booking', 'view more',
        'quick book', 'select cinema', 'select movie', 'select date', 'select time',
        'no movies found', 'loading', 'please wait'
      ];
      if (skipTexts.includes(text.toLowerCase())) return;

      // Must have at least 4 characters and contain letters
      if (text && text.length >= 4 && /[a-zA-Z]/.test(text) && !titles.includes(text)) {
        titles.push(text);
      }
    });

    // Also try .movie-title class as fallback
    document.querySelectorAll('.movie-title').forEach(el => {
      if (el.closest('footer, nav')) return;
      const text = el.textContent?.trim();
      if (text && !titles.includes(text)) titles.push(text);
    });

    return titles;
  });
}

/**
 * Extract movie titles from Mukta page (main content area only)
 */
async function extractMuktaTitles(page, section = 'nowShowing') {
  return await page.evaluate((targetSection) => {
    const titles = [];

    // Find all h2/h3 headers
    const allHeaders = [...document.querySelectorAll('h2, h3')];

    // Find "WHATS ON" header for Now Showing
    const whatsOnHeader = allHeaders.find(h => {
      const text = h.textContent?.trim().toUpperCase() || '';
      return text === 'WHATS ON' || text === "WHAT'S ON" || text.includes('WHATS ON');
    });

    // Find "COMING SOON" header
    const comingSoonHeader = allHeaders.find(h => {
      const text = h.textContent?.trim().toUpperCase() || '';
      return text === 'COMING SOON';
    });

    if (targetSection === 'nowShowing') {
      // Look for the WHATS ON section or the main movie grid before COMING SOON
      let movieSection = null;

      if (whatsOnHeader) {
        // Find the parent container of WHATS ON
        movieSection = whatsOnHeader.closest('div[class*="section"], section, .container') ||
                       whatsOnHeader.parentElement?.parentElement?.parentElement;
      }

      if (movieSection) {
        // Get all h3 titles in this section, but stop if we hit COMING SOON
        const movieCards = movieSection.querySelectorAll('.movie-card h3, h3[class*="movie"], .movie-title');
        movieCards.forEach(el => {
          const parentSection = el.closest('div');
          // Check if this is in the Coming Soon section by looking at nearby headers
          const nearbyHeaders = parentSection?.querySelectorAll('h2, h3') || [];
          const isInComingSoon = [...nearbyHeaders].some(h =>
            h.textContent?.trim().toUpperCase() === 'COMING SOON'
          );

          if (!isInComingSoon) {
            const text = el.textContent?.trim();
            if (text && !titles.includes(text)) titles.push(text);
          }
        });
      }

      // Fallback: get all movie titles before Coming Soon section
      if (titles.length === 0) {
        const allH3 = [...document.querySelectorAll('h3')];
        let foundComingSoon = false;

        for (const h3 of allH3) {
          const text = h3.textContent?.trim() || '';

          // Stop when we hit Coming Soon header
          if (text.toUpperCase() === 'COMING SOON') {
            foundComingSoon = true;
            continue;
          }

          // Only collect titles BEFORE Coming Soon
          if (!foundComingSoon) {
            // Skip navigation items and headers
            if (h3.closest('nav, footer, header, .nav, .footer, .menu')) continue;
            // Skip if this looks like a section header
            if (text.toUpperCase() === 'WHATS ON' || text.toUpperCase() === 'QUICK BOOK') continue;

            if (text && !titles.includes(text)) {
              titles.push(text);
            }
          }
        }
      }

    } else if (targetSection === 'comingSoon') {
      // Look for COMING SOON section
      if (comingSoonHeader) {
        // Get the parent container
        const csSection = comingSoonHeader.closest('div[class*="section"], section, .container') ||
                          comingSoonHeader.parentElement?.parentElement;

        if (csSection) {
          // Get all h3 titles in this section
          csSection.querySelectorAll('h3').forEach(el => {
            const text = el.textContent?.trim();
            if (text && text.toUpperCase() !== 'COMING SOON' && !titles.includes(text)) {
              titles.push(text);
            }
          });
        }

        // Also try getting titles from listbox options (Mukta uses this)
        const listbox = comingSoonHeader.parentElement?.querySelector('[role="listbox"], .carousel, .slider');
        if (listbox) {
          listbox.querySelectorAll('h3, .movie-title').forEach(el => {
            const text = el.textContent?.trim();
            if (text && !titles.includes(text)) titles.push(text);
          });
        }
      }

      // Fallback: Get all h3 AFTER Coming Soon header
      if (titles.length === 0) {
        const allH3 = [...document.querySelectorAll('h3')];
        let foundComingSoon = false;
        let foundOffers = false;

        for (const h3 of allH3) {
          const text = h3.textContent?.trim() || '';

          // Start collecting after Coming Soon
          if (text.toUpperCase() === 'COMING SOON') {
            foundComingSoon = true;
            continue;
          }

          // Stop when we hit Offers section
          if (text.toUpperCase() === 'OFFERS' || text.toUpperCase().includes('FOLLOW US')) {
            foundOffers = true;
          }

          if (foundComingSoon && !foundOffers) {
            if (h3.closest('footer, .footer')) continue;
            if (text && !titles.includes(text)) {
              titles.push(text);
            }
          }
        }
      }
    }

    return titles;
  }, section);
}

/**
 * Generic title extraction fallback
 */
async function extractGenericTitles(page) {
  return await page.evaluate(() => {
    const titles = [];

    // Try various common selectors
    const selectors = [
      '.movie-card h2', '.movie-card h3',
      '.film-card h2', '.film-card h3',
      '.movie-title', '.film-title',
      '[class*="movie"] h2', '[class*="movie"] h3',
      'article h2', 'article h3',
    ];

    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach(el => {
        // Skip footer/nav
        if (el.closest('footer, nav, header, .footer, .nav, .header, .menu')) return;
        const text = el.textContent?.trim();
        if (text && !titles.includes(text)) titles.push(text);
      });
    }

    return titles;
  });
}

// ============================================================
// MAIN SCRAPER
// ============================================================

async function scrapeCinemas() {
  console.log('==================================================');
  console.log('CINEMA SCRAPER - Clean Rewrite');
  console.log('Started at:', new Date().toISOString());
  console.log('==================================================');

  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: 120000, // Increase protocol timeout for slow sites
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
    ]
  });

  const page = await browser.newPage();

  // Use a realistic user agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1920, height: 1080 });

  // Set extra headers to appear more like a real browser
  await page.setExtraHTTPHeaders({
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
  });

  // Store results
  const comingSoonTitles = new Set(); // All Coming Soon titles (normalized)
  const nowShowingTitles = new Set(); // All Now Showing titles (normalized)
  const movieCinemaMap = {};          // title -> [cinema keys]
  const originalTitles = {};          // normalized -> original title

  // ========================================
  // STEP 1: Scrape Coming Soon pages FIRST
  // ========================================
  console.log('\n🎬 STEP 1: Scraping Coming Soon pages FIRST...\n');

  for (const [key, cinema] of Object.entries(CINEMAS)) {
    console.log(`\n--- ${cinema.name} Coming Soon ---`);

    try {
      if (cinema.comingSoonUrl) {
        // Dedicated Coming Soon page
        console.log(`  URL: ${cinema.comingSoonUrl}`);

        const navOptions = {
          waitUntil: cinema.waitUntil || 'networkidle2',
          timeout: cinema.timeout || 30000,
        };

        const { success } = await navigateWithRetry(page, cinema.comingSoonUrl, navOptions);

        if (!success) {
          console.log(`  ❌ Failed to load page after retries`);
          if (cinema.skipOnError) {
            console.log(`  Skipping ${cinema.name} (skipOnError enabled)`);
            continue;
          }
        }

        await wait(2000);

        // Extract titles based on cinema
        let titles = [];
        if (key === 'cineco') {
          titles = await extractCinecoTitles(page);
        } else if (key === 'vox') {
          titles = await extractVOXTitles(page);
        } else if (key === 'cinepolis') {
          titles = await extractCinepolisTitles(page);
        } else {
          titles = await extractGenericTitles(page);
        }

        // Process and store Coming Soon titles
        titles.forEach(title => {
          const cleaned = cleanTitle(title);
          if (isValidTitle(cleaned)) {
            const normalized = normalizeForComparison(cleaned);
            comingSoonTitles.add(normalized);
            originalTitles[normalized] = cleaned;
            // Track which cinema has this Coming Soon movie
            if (!movieCinemaMap[normalized]) {
              movieCinemaMap[normalized] = [];
            }
            if (!movieCinemaMap[normalized].includes(key)) {
              movieCinemaMap[normalized].push(key);
            }
            console.log(`  ✅ Coming Soon: ${cleaned}`);
          }
        });

      } else if (cinema.hasComingSoonSection) {
        // Mukta: Coming Soon is a section on main page
        console.log(`  URL: ${cinema.nowShowingUrl} (COMING SOON section)`);

        await page.goto(cinema.nowShowingUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        await wait(3000);

        const titles = await extractMuktaTitles(page, 'comingSoon');

        titles.forEach(title => {
          const cleaned = cleanTitle(title);
          if (isValidTitle(cleaned)) {
            const normalized = normalizeForComparison(cleaned);
            comingSoonTitles.add(normalized);
            originalTitles[normalized] = cleaned;
            // Track which cinema has this Coming Soon movie
            if (!movieCinemaMap[normalized]) {
              movieCinemaMap[normalized] = [];
            }
            if (!movieCinemaMap[normalized].includes(key)) {
              movieCinemaMap[normalized].push(key);
            }
            console.log(`  ✅ Coming Soon: ${cleaned}`);
          }
        });
      }

    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`);
      if (cinema.skipOnError) {
        console.log(`  Skipping ${cinema.name}`);
      }
    }
  }

  console.log(`\n📋 Total Coming Soon titles: ${comingSoonTitles.size}`);

  // ========================================
  // STEP 2: Scrape Now Showing pages
  // ========================================
  console.log('\n🎬 STEP 2: Scraping Now Showing pages...\n');

  for (const [key, cinema] of Object.entries(CINEMAS)) {
    console.log(`\n--- ${cinema.name} Now Showing ---`);
    console.log(`  URL: ${cinema.nowShowingUrl}`);

    try {
      const navOptions = {
        waitUntil: cinema.waitUntil || 'networkidle2',
        timeout: cinema.timeout || 30000,
      };

      const { success } = await navigateWithRetry(page, cinema.nowShowingUrl, navOptions);

      if (!success) {
        console.log(`  ❌ Failed to load page after retries`);
        if (cinema.skipOnError) {
          console.log(`  Skipping ${cinema.name} (skipOnError enabled)`);
          continue;
        }
      }

      // Extra wait for dynamic content (React apps, etc.)
      const extraWait = cinema.extraWait || 2000;
      await wait(extraWait);

      // Extract titles based on cinema
      let titles = [];
      if (key === 'cineco') {
        titles = await extractCinecoTitles(page);
      } else if (key === 'vox') {
        titles = await extractVOXTitles(page);
      } else if (key === 'cinepolis') {
        titles = await extractCinepolisTitles(page);
      } else if (key === 'mukta') {
        titles = await extractMuktaTitles(page, 'nowShowing');
        // Fallback to generic if no titles found
        if (titles.length === 0) {
          titles = await extractGenericTitles(page);
        }
      } else {
        titles = await extractGenericTitles(page);
      }

      // Process titles
      titles.forEach(title => {
        const cleaned = cleanTitle(title);
        if (isValidTitle(cleaned)) {
          const normalized = normalizeForComparison(cleaned);
          originalTitles[normalized] = cleaned;

          // Track which cinema has this movie
          if (!movieCinemaMap[normalized]) {
            movieCinemaMap[normalized] = [];
          }
          if (!movieCinemaMap[normalized].includes(key)) {
            movieCinemaMap[normalized].push(key);
          }

          // Only add to Now Showing if NOT in Coming Soon
          if (!comingSoonTitles.has(normalized)) {
            nowShowingTitles.add(normalized);
            console.log(`  ✅ Now Showing: ${cleaned}`);
          } else {
            console.log(`  ⏭️ Skip (in Coming Soon): ${cleaned}`);
          }
        }
      });

    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`);
    }
  }

  await browser.close();

  // ========================================
  // SUMMARY
  // ========================================
  console.log('\n==================================================');
  console.log('SCRAPING SUMMARY');
  console.log('==================================================');
  console.log(`Now Showing: ${nowShowingTitles.size} unique movies`);
  console.log(`Coming Soon: ${comingSoonTitles.size} unique movies`);

  console.log('\n📽️ NOW SHOWING:');
  [...nowShowingTitles].forEach(t => console.log(`  - ${originalTitles[t] || t}`));

  console.log('\n🔜 COMING SOON:');
  [...comingSoonTitles].forEach(t => console.log(`  - ${originalTitles[t] || t}`));

  // ========================================
  // Update Database
  // ========================================
  await updateDatabase(nowShowingTitles, comingSoonTitles, movieCinemaMap, originalTitles);

  console.log('\n==================================================');
  console.log('SCRAPER COMPLETE');
  console.log('Finished at:', new Date().toISOString());
  console.log('==================================================');
}

// ============================================================
// DATABASE UPDATE
// ============================================================

async function updateDatabase(nowShowing, comingSoon, movieCinemaMap, originalTitles) {
  console.log('\n==================================================');
  console.log('UPDATING DATABASE');
  console.log('==================================================');

  // Get all movies from database
  const { data: dbMovies, error: fetchError } = await supabase
    .from('movies')
    .select('id, title, slug, tmdb_id, release_date');

  if (fetchError) {
    console.error('Error fetching movies:', fetchError);
    return;
  }

  console.log(`Found ${dbMovies?.length || 0} movies in database`);

  // Reset all movies first
  console.log('Resetting all movies...');
  await supabase.from('movies').update({
    is_now_showing: false,
    is_coming_soon: false,
    scraped_from: []
  }).neq('id', '00000000-0000-0000-0000-000000000000');

  // Match and update
  let matchedNowShowing = 0;
  let matchedComingSoon = 0;

  for (const movie of dbMovies || []) {
    const dbNormalized = normalizeForComparison(movie.title);

    // Check if this movie is in our scraped lists (found on any cinema website)
    let foundOnCinema = nowShowing.has(dbNormalized) || comingSoon.has(dbNormalized);
    let matchedKey = dbNormalized;

    // Try partial matching if no exact match
    if (!foundOnCinema) {
      for (const scrapedTitle of [...nowShowing, ...comingSoon]) {
        // Check if one contains the other
        if (dbNormalized.includes(scrapedTitle) || scrapedTitle.includes(dbNormalized)) {
          matchedKey = scrapedTitle;
          foundOnCinema = true;
          break;
        }
      }
    }

    // Skip movies not found on any cinema website
    if (!foundOnCinema) continue;

    const cinemas = movieCinemaMap[matchedKey] || [];

    // DETERMINE STATUS FROM CINEMA WEBSITES (source of truth for Bahrain)
    // Cinema websites tell us what's actually showing in Bahrain, not TMDB global dates
    const isNowShowingMatch = nowShowing.has(dbNormalized) || nowShowing.has(matchedKey);
    const isComingSoonMatch = comingSoon.has(dbNormalized) || comingSoon.has(matchedKey);

    let isNowShowing = false;
    let isComingSoon = false;

    // If movie appears in both categories (rare), prefer now showing (it's actually playing)
    if (isNowShowingMatch && isComingSoonMatch) {
      isNowShowing = true;
      isComingSoon = false;
    } else {
      isNowShowing = isNowShowingMatch;
      isComingSoon = isComingSoonMatch;
    }

    await supabase.from('movies').update({
      is_now_showing: isNowShowing,
      is_coming_soon: isComingSoon,
      scraped_from: cinemas,
    }).eq('id', movie.id);

    if (isNowShowing) {
      matchedNowShowing++;
      console.log(`  ✅ NOW SHOWING: ${movie.title} [${cinemas.join(', ')}]`);
    } else {
      matchedComingSoon++;
      console.log(`  🔜 COMING SOON: ${movie.title} [${cinemas.join(', ')}]`);
    }
  }

  console.log(`\nMatched: ${matchedNowShowing} Now Showing, ${matchedComingSoon} Coming Soon`);

  // Auto-add movies from TMDB if enabled
  if (TMDB_API_KEY) {
    await autoAddFromTMDB(nowShowing, comingSoon, movieCinemaMap, originalTitles, dbMovies);
  }

  // Log results
  await logResults(matchedNowShowing, matchedComingSoon, nowShowing.size, comingSoon.size);
}

// ============================================================
// TMDB AUTO-ADD
// ============================================================

async function autoAddFromTMDB(nowShowing, comingSoon, movieCinemaMap, originalTitles, existingMovies) {
  console.log('\n==================================================');
  console.log('AUTO-ADDING FROM TMDB');
  console.log('==================================================');

  const existingTitles = new Set(
    existingMovies.map(m => normalizeForComparison(m.title))
  );
  const existingTMDBIds = new Set(
    existingMovies.map(m => m.tmdb_id).filter(Boolean)
  );

  const allScraped = new Set([...nowShowing, ...comingSoon]);
  let addedCount = 0;

  for (const normalized of allScraped) {
    // Skip if already in database
    if (existingTitles.has(normalized)) continue;

    const originalTitle = originalTitles[normalized] || normalized;
    console.log(`\nSearching TMDB for: "${originalTitle}"`);

    try {
      const searchUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(originalTitle)}`;
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const movie = data.results[0];

        // Skip if TMDB ID already exists
        if (existingTMDBIds.has(movie.id)) {
          console.log(`  Already exists (TMDB: ${movie.id})`);
          continue;
        }

        // Get full movie details
        const detailsUrl = `${TMDB_BASE_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=videos`;
        const detailsRes = await fetch(detailsUrl);
        const details = await detailsRes.json();

        // Find trailer
        let trailerUrl = null;
        if (details.videos?.results) {
          const trailer = details.videos.results.find(v =>
            v.type === 'Trailer' && v.site === 'YouTube'
          );
          if (trailer) {
            trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
          }
        }

        // Generate slug
        const slug = movie.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 100);

        const cinemas = movieCinemaMap[normalized] || [];

        // Use cinema website categorization (source of truth for Bahrain)
        // TMDB release dates are global, not Bahrain-specific
        const isNowShowingMatch = nowShowing.has(normalized);
        const isComingSoonMatch = comingSoon.has(normalized);
        const isNowShowing = isNowShowingMatch && !isComingSoonMatch;
        const isComingSoon = isComingSoonMatch;

        const newMovie = {
          title: movie.title,
          slug: `${slug}-${movie.id}`,
          overview: movie.overview,
          release_date: movie.release_date,
          poster_url: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
          backdrop_url: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : null,
          trailer_url: trailerUrl,
          tmdb_id: movie.id,
          tmdb_rating: movie.vote_average,
          is_now_showing: isNowShowing,
          is_coming_soon: isComingSoon,
          scraped_from: cinemas,
          genre: details.genres?.map(g => g.name) || [],
          runtime: details.runtime || null,
        };

        const { error } = await supabase.from('movies').insert(newMovie);

        if (error) {
          console.log(`  ❌ Error adding: ${error.message}`);
        } else {
          addedCount++;
          console.log(`  ✅ Added: ${movie.title} (TMDB: ${movie.id})`);
          existingTMDBIds.add(movie.id);
        }

        // Rate limit
        await new Promise(r => setTimeout(r, 300));

      } else {
        console.log(`  Not found on TMDB`);
      }

    } catch (err) {
      console.log(`  ❌ TMDB Error: ${err.message}`);
    }
  }

  console.log(`\nAdded ${addedCount} new movies from TMDB`);
}

// ============================================================
// LOGGING
// ============================================================

async function logResults(nowShowingCount, comingSoonCount, totalNowShowing, totalComingSoon) {
  try {
    await supabase.from('agent_logs').insert({
      agent_name: 'cinema_scraper',
      action: 'scrape_complete',
      details: {
        matched_now_showing: nowShowingCount,
        matched_coming_soon: comingSoonCount,
        total_scraped_now_showing: totalNowShowing,
        total_scraped_coming_soon: totalComingSoon,
        timestamp: new Date().toISOString(),
      },
      status: 'success',
    });
  } catch (err) {
    console.log('Failed to log results:', err.message);
  }
}

// ============================================================
// RUN
// ============================================================

scrapeCinemas().catch(err => {
  console.error('Scraper failed:', err);
  process.exit(1);
});
