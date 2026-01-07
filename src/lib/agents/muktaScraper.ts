import { chromium, Browser, Page } from 'playwright';
import { supabaseAdmin } from '@/lib/supabase';

interface ScrapedMovie {
  title: string;
  status: 'now_showing' | 'coming_soon';
  imageUrl?: string;
  sourceUrl?: string;
}

interface ScraperResult {
  success: boolean;
  moviesFound: number;
  moviesUpdated: number;
  comingSoonCount: number;
  nowShowingCount: number;
  comingSoonTitles: string[];
  nowShowingTitles: string[];
  errors: string[];
}

export async function scrapeMuktaCinema(): Promise<ScraperResult> {
  const result: ScraperResult = {
    success: false,
    moviesFound: 0,
    moviesUpdated: 0,
    comingSoonCount: 0,
    nowShowingCount: 0,
    comingSoonTitles: [],
    nowShowingTitles: [],
    errors: [],
  };

  let browser: Browser | null = null;
  let logId: string | null = null;

  try {
    // Create log entry (if table exists)
    try {
      const { data: logEntry } = await supabaseAdmin
        .from('cinema_scraper_logs')
        .insert({
          cinema_chain: 'mukta',
          status: 'running',
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      logId = logEntry?.id;
    } catch (logError) {
      console.log('⚠️ Could not create log entry (table may not exist yet)');
    }

    console.log('🎬 Starting Mukta A2 Cinema scraper...');

    // Launch browser
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
    });

    const page = await context.newPage();

    // Navigate to Mukta Bahrain page
    console.log('📍 Navigating to Mukta A2 Cinemas Bahrain...');
    await page.goto('https://www.muktaa2cinemas.com/bahrain', {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    // Wait for page to fully load
    await page.waitForTimeout(3000);

    // Scroll to footer to load the slider
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(2000);

    // Scrape Coming Soon movies from footer slider
    console.log('🔍 Looking for Coming Soon section...');

    const comingSoonMovies = await scrapeComingSoonSection(page);
    result.comingSoonTitles = comingSoonMovies.map(m => m.title);
    result.comingSoonCount = comingSoonMovies.length;

    console.log(`📋 Found ${comingSoonMovies.length} Coming Soon movies:`, result.comingSoonTitles);

    // Also scrape Now Showing for reference
    const nowShowingMovies = await scrapeNowShowingSection(page);
    result.nowShowingTitles = nowShowingMovies.map(m => m.title);
    result.nowShowingCount = nowShowingMovies.length;

    console.log(`📋 Found ${nowShowingMovies.length} Now Showing movies:`, result.nowShowingTitles);

    result.moviesFound = comingSoonMovies.length + nowShowingMovies.length;

    // Update database
    console.log('💾 Updating database...');

    // Mark Coming Soon movies
    for (const movie of comingSoonMovies) {
      const updated = await updateMovieStatus(movie.title, 'coming_soon');
      if (updated) result.moviesUpdated++;
    }

    // Verify Now Showing movies (in case they were incorrectly marked)
    for (const movie of nowShowingMovies) {
      // Only update if it's currently marked as coming_soon but should be now_showing
      const updated = await verifyNowShowingStatus(movie.title);
      if (updated) result.moviesUpdated++;
    }

    result.success = true;
    console.log('✅ Mukta scraper completed successfully!');

    // Update log
    if (logId) {
      try {
        await supabaseAdmin
          .from('cinema_scraper_logs')
          .update({
            status: 'success',
            movies_found: result.moviesFound,
            movies_updated: result.moviesUpdated,
            coming_soon_count: result.comingSoonCount,
            now_showing_count: result.nowShowingCount,
            details: {
              comingSoonTitles: result.comingSoonTitles,
              nowShowingTitles: result.nowShowingTitles,
            },
            completed_at: new Date().toISOString(),
          })
          .eq('id', logId);
      } catch {
        console.log('⚠️ Could not update log entry');
      }
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    result.errors.push(errorMessage);
    console.error('❌ Mukta scraper error:', errorMessage);

    // Update log with error
    if (logId) {
      try {
        await supabaseAdmin
          .from('cinema_scraper_logs')
          .update({
            status: 'failed',
            error_message: errorMessage,
            completed_at: new Date().toISOString(),
          })
          .eq('id', logId);
      } catch {
        console.log('⚠️ Could not update log entry with error');
      }
    }

  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return result;
}

async function scrapeComingSoonSection(page: Page): Promise<ScrapedMovie[]> {
  const movies: ScrapedMovie[] = [];

  try {
    // Use page.evaluate to scrape all Coming Soon movies from the page
    console.log('Searching for Coming Soon movies...');

    const scrapedData = await page.evaluate(() => {
      const movies: { title: string; image?: string }[] = [];

      // Method 1: Find Coming Soon section by text and extract images with alt text
      const sections = document.querySelectorAll('section, div, footer');
      let comingSoonSection: Element | null = null;

      sections.forEach((section) => {
        const text = section.textContent?.toLowerCase() || '';
        if (text.includes('coming soon') && section.querySelectorAll('img').length > 1) {
          // Only select if this is the most specific container
          if (!comingSoonSection || comingSoonSection.contains(section)) {
            comingSoonSection = section;
          }
        }
      });

      if (comingSoonSection) {
        const sectionEl = comingSoonSection as Element;
        const images = sectionEl.querySelectorAll('img');
        images.forEach((imgNode: Element) => {
          const img = imgNode as HTMLImageElement;
          const alt = img.getAttribute('alt') || img.getAttribute('title') || '';
          const src = img.getAttribute('src') || '';
          // Filter out logos, icons, and generic images
          if (alt && alt.length > 2 &&
              !alt.toLowerCase().includes('logo') &&
              !alt.toLowerCase().includes('coming soon') &&
              !alt.toLowerCase().includes('icon')) {
            movies.push({ title: alt.trim(), image: src });
          }
        });
      }

      // Method 2: Look for swiper slides with movie info
      if (movies.length === 0) {
        const slides = document.querySelectorAll('.swiper-slide, .slick-slide, .carousel-item');
        slides.forEach((slide) => {
          const parentText = slide.closest('section')?.textContent?.toLowerCase() || '';
          if (parentText.includes('coming soon')) {
            const img = slide.querySelector('img');
            const title = slide.querySelector('h3, h4, h5, .title')?.textContent?.trim()
              || img?.getAttribute('alt')?.trim()
              || '';
            if (title && title.length > 2 && !title.toLowerCase().includes('coming soon')) {
              movies.push({ title, image: img?.getAttribute('src') || undefined });
            }
          }
        });
      }

      // Method 3: Find footer slider (common pattern for Coming Soon)
      if (movies.length === 0) {
        const footer = document.querySelector('footer');
        if (footer) {
          const footerImages = footer.querySelectorAll('img');
          footerImages.forEach((img) => {
            const alt = img.getAttribute('alt') || '';
            if (alt && alt.length > 2 &&
                !alt.toLowerCase().includes('logo') &&
                !alt.toLowerCase().includes('icon')) {
              movies.push({ title: alt.trim(), image: img.getAttribute('src') || undefined });
            }
          });
        }
      }

      // Deduplicate by title
      const uniqueMovies = movies.filter((movie, index, self) =>
        index === self.findIndex((m) => m.title.toLowerCase() === movie.title.toLowerCase())
      );

      return uniqueMovies;
    });

    // Add scraped movies with coming_soon status
    scrapedData.forEach((m: { title: string; image?: string }) => {
      movies.push({
        title: m.title,
        status: 'coming_soon',
        imageUrl: m.image,
      });
    });

    console.log(`Found ${movies.length} Coming Soon movies`);


  } catch (error) {
    console.error('Error scraping Coming Soon section:', error);
  }

  // Remove duplicates
  const uniqueMovies = movies.filter((movie, index, self) =>
    index === self.findIndex(m => m.title.toLowerCase() === movie.title.toLowerCase())
  );

  return uniqueMovies;
}

async function scrapeNowShowingSection(page: Page): Promise<ScrapedMovie[]> {
  const movies: ScrapedMovie[] = [];

  try {
    // Look for Now Showing section
    const nowShowingMovies = await page.evaluate(() => {
      const movies: { title: string; image?: string }[] = [];

      // Find Now Showing section
      const sections = document.querySelectorAll('section, div');
      let nowShowingSection: Element | null = null;

      sections.forEach(section => {
        if (section.textContent?.includes('Now Showing') || section.textContent?.includes('NOW SHOWING')) {
          // Check if this looks like a movie section (has images)
          if (section.querySelectorAll('img').length > 0) {
            nowShowingSection = section;
          }
        }
      });

      if (nowShowingSection) {
        const sectionEl = nowShowingSection as Element;
        const movieElements = sectionEl.querySelectorAll('[class*="movie"], [class*="film"], .swiper-slide, .slide, .item, .poster');

        movieElements.forEach((el: Element) => {
          const titleEl = el.querySelector('h3, h4, h5, .title, .movie-title, [class*="title"]');
          const imgEl = el.querySelector('img');

          let title = '';

          if (titleEl) {
            title = titleEl.textContent?.trim() || '';
          } else if (imgEl) {
            title = imgEl.getAttribute('alt') || imgEl.getAttribute('title') || '';
          }

          if (title && title.length > 1 && !title.toLowerCase().includes('now showing')) {
            movies.push({ title, image: imgEl?.getAttribute('src') || undefined });
          }
        });
      }

      return movies;
    });

    nowShowingMovies.forEach((m) => {
      movies.push({
        title: m.title,
        status: 'now_showing',
        imageUrl: m.image,
      });
    });

  } catch (error) {
    console.error('Error scraping Now Showing section:', error);
  }

  return movies;
}

async function updateMovieStatus(title: string, status: 'coming_soon' | 'now_showing'): Promise<boolean> {
  try {
    // Normalize title for matching
    const normalizedTitle = title.toLowerCase().trim();

    // Find matching movie in database
    const { data: movies } = await supabaseAdmin
      .from('movies')
      .select('id, title, is_now_showing, is_coming_soon, scraped_from');

    if (!movies || movies.length === 0) {
      console.log(`⚠️ No movies in database to match against "${title}"`);
      return false;
    }

    // Find best match
    let bestMatch = movies.find(m =>
      m.title.toLowerCase().trim() === normalizedTitle
    );

    // If no exact match, try partial match
    if (!bestMatch) {
      bestMatch = movies.find(m =>
        m.title.toLowerCase().includes(normalizedTitle) ||
        normalizedTitle.includes(m.title.toLowerCase())
      );
    }

    // Try fuzzy match - words in common
    if (!bestMatch) {
      const titleWords = normalizedTitle.split(/\s+/).filter(w => w.length > 2);
      bestMatch = movies.find(m => {
        const movieWords = m.title.toLowerCase().split(/\s+/).filter((w: string) => w.length > 2);
        const commonWords = titleWords.filter(w => movieWords.includes(w));
        return commonWords.length >= Math.min(2, titleWords.length);
      });
    }

    if (bestMatch) {
      const isComingSoon = status === 'coming_soon';
      const isNowShowing = status === 'now_showing';

      // Check if update is needed
      if (bestMatch.is_coming_soon === isComingSoon && bestMatch.is_now_showing === isNowShowing) {
        console.log(`ℹ️ "${bestMatch.title}" already has correct status`);
        return false;
      }

      // Update the movie
      const updateData: Record<string, unknown> = {
        is_coming_soon: isComingSoon,
        is_now_showing: isNowShowing,
        updated_at: new Date().toISOString(),
      };

      // Try to update mukta_status if column exists
      try {
        const { error } = await supabaseAdmin
          .from('movies')
          .update({
            ...updateData,
            mukta_status: status,
            cinema_source: 'mukta',
            last_synced_at: new Date().toISOString(),
          })
          .eq('id', bestMatch.id);

        if (error) {
          // Fallback without new columns
          const { error: fallbackError } = await supabaseAdmin
            .from('movies')
            .update(updateData)
            .eq('id', bestMatch.id);

          if (fallbackError) {
            console.error(`Failed to update ${title}:`, fallbackError.message);
            return false;
          }
        }

        console.log(`✅ Updated "${bestMatch.title}" to ${status}`);
        return true;
      } catch (updateError) {
        console.error(`Error updating "${bestMatch.title}":`, updateError);
        return false;
      }
    } else {
      console.log(`⚠️ No match found for "${title}"`);
    }

    return false;
  } catch (error) {
    console.error(`Error updating movie status for ${title}:`, error);
    return false;
  }
}

async function verifyNowShowingStatus(title: string): Promise<boolean> {
  try {
    const normalizedTitle = title.toLowerCase().trim();

    // Find movie that might be incorrectly marked as coming_soon
    const { data: movies } = await supabaseAdmin
      .from('movies')
      .select('id, title, is_coming_soon, is_now_showing')
      .eq('is_coming_soon', true);

    if (!movies) return false;

    const match = movies.find(m =>
      m.title.toLowerCase().includes(normalizedTitle) ||
      normalizedTitle.includes(m.title.toLowerCase())
    );

    if (match && match.is_coming_soon) {
      // This movie is Now Showing on Mukta but marked as Coming Soon in DB
      const { error } = await supabaseAdmin
        .from('movies')
        .update({
          is_coming_soon: false,
          is_now_showing: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', match.id);

      if (!error) {
        console.log(`✅ Corrected "${match.title}" from coming_soon to now_showing`);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(`Error verifying status for ${title}:`, error);
    return false;
  }
}

export default scrapeMuktaCinema;
