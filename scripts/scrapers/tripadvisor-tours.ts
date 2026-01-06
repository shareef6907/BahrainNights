import { chromium, Page } from 'playwright';
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

interface ScrapedTour {
  name: string;
  description: string;
  tourType: string;
  rating: number | null;
  reviewCount: number;
  priceFrom: number | null;
  duration: string;
  durationHours: number | null;
  groupSize: string;
  imageUrl: string;
  providerName: string;
  tripadvisorUrl: string;
  tripadvisorId: string;
  highlights: string[];
  includes: string[];
}

const TRIPADVISOR_TOURS_URLS = [
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c42-Bahrain.html', // Tours
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c42-t204-Bahrain.html', // Cultural Tours
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c42-t163-Bahrain.html', // Private Tours
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c42-t205-Bahrain.html', // Food Tours
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c42-t192-Bahrain.html', // Day Trips
  'https://www.tripadvisor.com/Attractions-g293996-Activities-c61-t214-Bahrain.html', // Water Sports
];

const TOUR_TYPE_MAP: Record<string, string> = {
  'Cultural Tours': 'Cultural',
  'Private Tours': 'Private',
  'Food Tours': 'Food',
  'Day Trips': 'Day Tours',
  'City Tours': 'Walking',
  'Walking Tours': 'Walking',
  'Bus Tours': 'Driving',
  'Water Sports': 'Boat',
  'Boat Tours': 'Boat',
  'Desert Safari': 'Desert',
  'Photography Tours': 'Photography',
  'Shore Excursions': 'Shore Excursions',
};

function parseDuration(durationStr: string): { text: string; hours: number | null } {
  const hourMatch = durationStr.match(/(\d+)\s*(?:hour|hr)/i);
  const dayMatch = durationStr.match(/(\d+)\s*day/i);
  const minMatch = durationStr.match(/(\d+)\s*(?:minute|min)/i);

  let hours: number | null = null;

  if (dayMatch) {
    hours = parseInt(dayMatch[1]) * 8; // Assume 8 hours per day
  } else if (hourMatch) {
    hours = parseInt(hourMatch[1]);
    if (minMatch) {
      hours += parseInt(minMatch[1]) / 60;
    }
  } else if (minMatch) {
    hours = parseInt(minMatch[1]) / 60;
  }

  return { text: durationStr, hours };
}

function parsePrice(priceStr: string): number | null {
  const match = priceStr.match(/[\$€£]?\s*(\d[\d,]*(?:\.\d{2})?)/);
  if (match) {
    return parseFloat(match[1].replace(/,/g, ''));
  }
  return null;
}

async function scrapeToursPage(page: Page, url: string): Promise<ScrapedTour[]> {
  const tours: ScrapedTour[] = [];

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

    // Wait for content
    await page.waitForSelector('[data-automation="cardTitle"], .listing_title', { timeout: 10000 }).catch(() => null);

    // Extract tours from page
    const items = await page.evaluate(() => {
      const results: Array<{
        name: string;
        description: string;
        tourType: string;
        rating: number | null;
        reviewCount: number;
        priceText: string;
        duration: string;
        groupSize: string;
        imageUrl: string;
        providerName: string;
        link: string;
        highlights: string[];
      }> = [];

      // Try different selectors
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
          const titleEl = card.querySelector('[data-automation="cardTitle"], .listing_title a');
          const name = titleEl?.textContent?.trim() || '';

          if (!name) return;

          // Get link
          const linkEl = card.querySelector('a[href*="/AttractionProductReview"]') as HTMLAnchorElement;
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

          // Get tour type/category
          const categoryEl = card.querySelector('[data-automation="category"], .product-type');
          const tourType = categoryEl?.textContent?.trim() || 'Day Tours';

          // Get image
          const imgEl = card.querySelector('img[src*="photo"]') as HTMLImageElement;
          const imageUrl = imgEl?.src || '';

          // Get description
          const descEl = card.querySelector('[data-automation="cardDescription"], .product-description');
          const description = descEl?.textContent?.trim() || '';

          // Get duration
          const durationEl = card.querySelector('[data-automation="duration"], .duration');
          const duration = durationEl?.textContent?.trim() || '';

          // Get price
          const priceEl = card.querySelector('[data-automation="price"], .price_text, .from-price');
          const priceText = priceEl?.textContent?.trim() || '';

          // Get provider
          const providerEl = card.querySelector('[data-automation="provider"], .provider-name');
          const providerName = providerEl?.textContent?.trim() || '';

          // Get group size if available
          const groupEl = card.querySelector('[data-automation="groupSize"], .group-size');
          const groupSize = groupEl?.textContent?.trim() || '';

          // Get highlights
          const highlights: string[] = [];
          const highlightEls = card.querySelectorAll('[data-automation="highlight"], .tour-highlight');
          highlightEls.forEach(el => {
            const text = el.textContent?.trim();
            if (text) highlights.push(text);
          });

          results.push({
            name,
            description,
            tourType,
            rating,
            reviewCount,
            priceText,
            duration,
            groupSize,
            imageUrl,
            providerName,
            link,
            highlights,
          });
        } catch (e) {
          console.error('Error parsing tour card:', e);
        }
      });

      return results;
    });

    // Process extracted items
    for (const item of items) {
      if (!item.name) continue;

      // Extract TripAdvisor ID from URL
      const idMatch = item.link.match(/AttractionProductReview-g\d+-d(\d+)/);
      const tripadvisorId = idMatch ? idMatch[1] : '';

      const duration = parseDuration(item.duration || '');
      const priceFrom = parsePrice(item.priceText);

      tours.push({
        name: item.name,
        description: item.description,
        tourType: TOUR_TYPE_MAP[item.tourType] || item.tourType || 'Day Tours',
        rating: item.rating,
        reviewCount: item.reviewCount,
        priceFrom,
        duration: duration.text || '2-4 hours',
        durationHours: duration.hours,
        groupSize: item.groupSize || 'Small group',
        imageUrl: item.imageUrl,
        providerName: item.providerName || '',
        tripadvisorUrl: item.link,
        tripadvisorId,
        highlights: item.highlights,
        includes: [],
      });
    }
  } catch (error) {
    console.error(`Error scraping tours from ${url}:`, error);
  }

  return tours;
}

export async function scrapeTripAdvisorTours(): Promise<void> {
  const startTime = new Date();
  let totalFound = 0;
  let totalNew = 0;
  let totalUpdated = 0;

  console.log('🗺️ Starting TripAdvisor tours scraper...');

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();

    // Scrape each tour category page
    for (const url of TRIPADVISOR_TOURS_URLS) {
      console.log(`📍 Scraping: ${url}`);

      const tours = await scrapeToursPage(page, url);
      totalFound += tours.length;

      console.log(`   Found ${tours.length} tours`);

      // Save to database
      for (const tour of tours) {
        try {
          // Generate slug
          const slug = tour.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

          // Check if exists
          const { data: existing } = await getSupabase()
            .from('tours')
            .select('id, tripadvisor_rating, review_count')
            .or(`source_id.eq.${tour.tripadvisorId},slug.eq.${slug}`)
            .single();

          if (existing) {
            // Update if we have new data
            if (tour.rating !== null || tour.reviewCount > 0) {
              await getSupabase()
                .from('tours')
                .update({
                  tripadvisor_rating: tour.rating,
                  tripadvisor_reviews: tour.reviewCount,
                  tripadvisor_url: tour.tripadvisorUrl,
                  updated_at: new Date().toISOString(),
                })
                .eq('id', existing.id);
              totalUpdated++;
            }
          } else {
            // Find or create provider
            let providerId = null;
            if (tour.providerName) {
              const providerSlug = tour.providerName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

              const { data: existingProvider } = await getSupabase()
                .from('tour_providers')
                .select('id')
                .eq('slug', providerSlug)
                .single();

              if (existingProvider) {
                providerId = existingProvider.id;
              } else {
                const { data: newProvider } = await getSupabase()
                  .from('tour_providers')
                  .insert({
                    name: tour.providerName,
                    slug: providerSlug,
                    type: 'company',
                    is_active: true,
                    is_verified: false,
                  })
                  .select('id')
                  .single();

                if (newProvider) {
                  providerId = newProvider.id;
                }
              }
            }

            // Insert new tour
            await getSupabase().from('tours').insert({
              name: tour.name,
              slug,
              description: tour.description || `Experience ${tour.name} in Bahrain.`,
              tour_type: tour.tourType,
              category: 'Day Tours',
              duration: tour.duration,
              duration_hours: tour.durationHours,
              group_size: tour.groupSize,
              price_from: tour.priceFrom,
              currency: 'BHD',
              image_url: tour.imageUrl,
              highlights: tour.highlights,
              tripadvisor_rating: tour.rating,
              tripadvisor_reviews: tour.reviewCount,
              tripadvisor_url: tour.tripadvisorUrl,
              provider_id: providerId,
              provider_name: tour.providerName,
              source: 'tripadvisor',
              source_id: tour.tripadvisorId,
              is_active: true,
              is_featured: false,
            });
            totalNew++;
          }
        } catch (error) {
          console.error(`Error saving tour ${tour.name}:`, error);
        }
      }

      // Add delay between pages
      await page.waitForTimeout(2000 + Math.random() * 3000);
    }

    // Log the scrape
    await getSupabase().from('prospect_scrape_logs').insert({
      source: 'tripadvisor_tours',
      status: 'success',
      prospects_found: totalFound,
      new_prospects: totalNew,
      started_at: startTime.toISOString(),
    });

    console.log(`\n✅ TripAdvisor tours scraping complete!`);
    console.log(`   Total found: ${totalFound}`);
    console.log(`   New added: ${totalNew}`);
    console.log(`   Updated: ${totalUpdated}`);

  } catch (error) {
    console.error('TripAdvisor tours scrape error:', error);

    await getSupabase().from('prospect_scrape_logs').insert({
      source: 'tripadvisor_tours',
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
  scrapeTripAdvisorTours()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Fatal error:', err);
      process.exit(1);
    });
}
