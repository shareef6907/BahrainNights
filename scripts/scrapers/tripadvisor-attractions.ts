import { chromium, Browser, Page } from 'playwright';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid errors at module load time
let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
    }

    supabase = createClient(url, key);
  }
  return supabase;
}

interface ScrapedAttraction {
  name: string;
  description: string;
  category: string;
  rating: number | null;
  reviewCount: number;
  priceRange: string;
  duration: string;
  imageUrl: string;
  tripadvisorUrl: string;
  tripadvisorId: string;
}

const TRIPADVISOR_ATTRACTIONS_URLS = [
  'https://www.tripadvisor.com/Attractions-g293996-Activities-Bahrain.html',
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c47-Bahrain.html', // Tours
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c56-Bahrain.html', // Nature
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c49-Bahrain.html', // Museums
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c61-Bahrain.html', // Fun & Games
];

const CATEGORY_MAP: Record<string, string> = {
  'Museums': 'Cultural',
  'Nature & Parks': 'Nature',
  'Tours': 'Tours',
  'Outdoor Activities': 'Adventure',
  'Sights & Landmarks': 'Historical',
  'Fun & Games': 'Entertainment',
  'Water & Amusement Parks': 'Family & Kids',
  'Shopping': 'Shopping',
  'Spas & Wellness': 'Wellness & Spa',
  'Nightlife': 'Music & Nightlife',
  'Food & Drink': 'Dining & Restaurants',
};

async function scrapeAttractionPage(page: Page, url: string): Promise<ScrapedAttraction[]> {
  const attractions: ScrapedAttraction[] = [];

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Close any popups
    try {
      const closeButton = page.locator('[aria-label="Close"]').first();
      if (await closeButton.isVisible({ timeout: 2000 })) {
        await closeButton.click();
      }
    } catch {
      // No popup to close
    }

    // Wait for content to load
    await page.waitForSelector('[data-automation="cardTitle"], .listing_title, .result-title', { timeout: 10000 }).catch(() => null);

    // Extract attractions from the page
    const items = await page.evaluate(() => {
      const results: Array<{
        name: string;
        description: string;
        category: string;
        rating: number | null;
        reviewCount: number;
        priceRange: string;
        duration: string;
        imageUrl: string;
        link: string;
      }> = [];

      // Try multiple selectors for different TripAdvisor layouts
      const cardSelectors = [
        'section[data-automation="WebPresentation_SingleFlexCardSection"]',
        'div[data-automation="cardWrapper"]',
        '.result-card',
        '.listing',
      ];

      let cards: NodeListOf<Element> | null = null;
      for (const selector of cardSelectors) {
        cards = document.querySelectorAll(selector);
        if (cards.length > 0) break;
      }

      if (!cards) return results;

      cards.forEach((card) => {
        try {
          // Get name
          const titleEl = card.querySelector('[data-automation="cardTitle"], .listing_title a, .result-title');
          const name = titleEl?.textContent?.trim() || '';

          if (!name) return;

          // Get link
          const linkEl = card.querySelector('a[href*="/Attraction_Review"]') as HTMLAnchorElement;
          const link = linkEl?.href || '';

          // Get rating
          const ratingEl = card.querySelector('[data-automation="bubbleRating"], .ui_bubble_rating');
          let rating: number | null = null;
          if (ratingEl) {
            const ratingClass = ratingEl.className;
            const ratingMatch = ratingClass.match(/bubble_(\d+)/);
            if (ratingMatch) {
              rating = parseInt(ratingMatch[1]) / 10;
            }
          }

          // Get review count
          const reviewEl = card.querySelector('[data-automation="reviewCount"], .review_count');
          const reviewText = reviewEl?.textContent || '';
          const reviewMatch = reviewText.match(/(\d[\d,]*)/);
          const reviewCount = reviewMatch ? parseInt(reviewMatch[1].replace(/,/g, '')) : 0;

          // Get category/subcategory
          const categoryEl = card.querySelector('[data-automation="category"], .attraction-subcategory');
          const category = categoryEl?.textContent?.trim() || 'Things to Do';

          // Get image
          const imgEl = card.querySelector('img[src*="photo"], img[data-automation="cardPhoto"]') as HTMLImageElement;
          const imageUrl = imgEl?.src || '';

          // Get description snippet
          const descEl = card.querySelector('[data-automation="cardDescription"], .attraction-description');
          const description = descEl?.textContent?.trim() || '';

          // Get duration if available
          const durationEl = card.querySelector('[data-automation="duration"], .duration');
          const duration = durationEl?.textContent?.trim() || '';

          // Get price range
          const priceEl = card.querySelector('[data-automation="price"], .price_text');
          const priceRange = priceEl?.textContent?.trim() || '';

          results.push({
            name,
            description,
            category,
            rating,
            reviewCount,
            priceRange,
            duration,
            imageUrl,
            link,
          });
        } catch (e) {
          console.error('Error parsing card:', e);
        }
      });

      return results;
    });

    // Process extracted items
    for (const item of items) {
      if (!item.name) continue;

      // Extract TripAdvisor ID from URL
      const idMatch = item.link.match(/Attraction_Review-g\d+-d(\d+)/);
      const tripadvisorId = idMatch ? idMatch[1] : '';

      attractions.push({
        name: item.name,
        description: item.description,
        category: CATEGORY_MAP[item.category] || item.category || 'Things to Do',
        rating: item.rating,
        reviewCount: item.reviewCount,
        priceRange: item.priceRange || 'Contact for price',
        duration: item.duration || '1-2 hours',
        imageUrl: item.imageUrl,
        tripadvisorUrl: item.link,
        tripadvisorId,
      });
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }

  return attractions;
}

export async function scrapeTripAdvisorAttractions(): Promise<void> {
  const startTime = new Date();
  let totalFound = 0;
  let totalNew = 0;
  let totalUpdated = 0;

  console.log('🎢 Starting TripAdvisor attractions scraper...');

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();

    // Scrape each category page
    for (const url of TRIPADVISOR_ATTRACTIONS_URLS) {
      console.log(`📍 Scraping: ${url}`);

      const attractions = await scrapeAttractionPage(page, url);
      totalFound += attractions.length;

      console.log(`   Found ${attractions.length} attractions`);

      // Save to database
      for (const attraction of attractions) {
        try {
          // Generate slug
          const slug = attraction.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

          // Check if exists by tripadvisor_id or slug
          const { data: existing } = await getSupabase()
            .from('attractions')
            .select('id, tripadvisor_rating, review_count')
            .or(`source_id.eq.${attraction.tripadvisorId},slug.eq.${slug}`)
            .single();

          if (existing) {
            // Update if we have new rating/review data
            if (attraction.rating !== null || attraction.reviewCount > 0) {
              await getSupabase()
                .from('attractions')
                .update({
                  tripadvisor_rating: attraction.rating,
                  tripadvisor_reviews: attraction.reviewCount,
                  tripadvisor_url: attraction.tripadvisorUrl,
                  updated_at: new Date().toISOString(),
                })
                .eq('id', existing.id);
              totalUpdated++;
            }
          } else {
            // Insert new attraction
            await getSupabase().from('attractions').insert({
              name: attraction.name,
              slug,
              description: attraction.description || `Explore ${attraction.name} in Bahrain.`,
              category: attraction.category,
              price_range: attraction.priceRange,
              duration: attraction.duration,
              image_url: attraction.imageUrl,
              tripadvisor_rating: attraction.rating,
              tripadvisor_reviews: attraction.reviewCount,
              tripadvisor_url: attraction.tripadvisorUrl,
              source: 'tripadvisor',
              source_id: attraction.tripadvisorId,
              is_active: true,
              is_featured: false,
            });
            totalNew++;
          }
        } catch (error) {
          console.error(`Error saving attraction ${attraction.name}:`, error);
        }
      }

      // Add delay between pages to avoid rate limiting
      await page.waitForTimeout(2000 + Math.random() * 3000);
    }

    // Log the scrape
    await getSupabase().from('prospect_scrape_logs').insert({
      source: 'tripadvisor_attractions',
      status: 'success',
      prospects_found: totalFound,
      new_prospects: totalNew,
      started_at: startTime.toISOString(),
    });

    console.log(`\n✅ TripAdvisor attractions scraping complete!`);
    console.log(`   Total found: ${totalFound}`);
    console.log(`   New added: ${totalNew}`);
    console.log(`   Updated: ${totalUpdated}`);

  } catch (error) {
    console.error('TripAdvisor attractions scrape error:', error);

    await getSupabase().from('prospect_scrape_logs').insert({
      source: 'tripadvisor_attractions',
      status: 'failed',
      error_message: (error as Error).message,
      started_at: startTime.toISOString(),
    });

    throw error;
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  scrapeTripAdvisorAttractions()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Fatal error:', err);
      process.exit(1);
    });
}
