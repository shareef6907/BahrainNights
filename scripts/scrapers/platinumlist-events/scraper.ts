import { chromium, Page, Browser } from 'playwright';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ScrapedEvent, EVENT_CATEGORIES, AFFILIATE_CODE } from './types';
import {
  generateAffiliateLink,
  createSlug,
  mapEventCategory,
  parseEventDate,
  parseTime,
  parsePrice,
  downloadImage,
  uploadImageToS3,
  cleanDescription,
} from './utils';

// URLs that are attractions, not events - must be filtered out
const ATTRACTION_URL_PATTERNS = [
  '/things-to-do/',
  '/attractions/',
  '/tours/',
];

/**
 * Check if a URL is an attraction (not an event)
 */
function isAttractionUrl(url: string): boolean {
  return ATTRACTION_URL_PATTERNS.some(pattern => url.includes(pattern));
}

/**
 * Scrape all event URLs from category pages
 */
async function scrapeEventUrls(page: Page): Promise<string[]> {
  const allUrls: Set<string> = new Set();

  console.log(`\nScraping ${EVENT_CATEGORIES.length} event category pages...\n`);

  for (const category of EVENT_CATEGORIES) {
    console.log(`\nCategory: ${category.name} (${category.url})`);
    console.log(`  Navigating to: ${category.url}`);

    try {
      await page.goto(category.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Get all event links
      const links = await page.evaluate(() => {
        const anchors = document.querySelectorAll('a[href*="platinumlist.net"]');
        const urls: string[] = [];
        anchors.forEach((a) => {
          const href = (a as HTMLAnchorElement).href;
          // Only include event ticket URLs
          if (href.includes('/event-tickets/')) {
            urls.push(href);
          }
        });
        return urls;
      });

      // Filter out attraction URLs and duplicates
      const eventUrls = links.filter(url => !isAttractionUrl(url));
      const uniqueUrls = [...new Set(eventUrls)];

      console.log(`  Found ${uniqueUrls.length} event URLs (filtered from ${links.length} total)`);

      uniqueUrls.forEach(url => allUrls.add(url));
    } catch (error) {
      console.error(`  Error scraping category ${category.name}:`, error);
    }
  }

  const uniqueAllUrls = [...allUrls];
  console.log(`\n${'='.repeat(40)}`);
  console.log(`Total unique event URLs: ${uniqueAllUrls.length}`);
  console.log(`${'='.repeat(40)}\n`);

  return uniqueAllUrls;
}

/**
 * Scrape a single event detail page
 */
async function scrapeEventDetail(page: Page, url: string, categoryFromUrl: string): Promise<ScrapedEvent | null> {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Extract title
    const title = await page.evaluate(() => {
      const titleEl = document.querySelector('h1, .event-title');
      return titleEl?.textContent?.trim() || '';
    });

    if (!title) {
      console.log(`    No title found, skipping`);
      return null;
    }

    // Extract description
    const description = await page.evaluate(() => {
      const descEl = document.querySelector('.event-description, .description, .about-section p, [class*="description"]');
      return descEl?.textContent?.trim() || '';
    });

    // Extract date - CRITICAL: Get the actual date from the page
    const dateText = await page.evaluate(() => {
      // Try multiple selectors for date
      const selectors = [
        '.event-date',
        '.date',
        '[class*="date"]',
        '.event-info .date',
        '.event-details .date',
      ];

      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el?.textContent) {
          const text = el.textContent.trim();
          // Check if it looks like a date
          if (text.match(/\d{1,2}.*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i)) {
            return text;
          }
        }
      }

      // Look in meta tags
      const metaDate = document.querySelector('meta[property="event:start_time"]');
      if (metaDate) {
        return metaDate.getAttribute('content');
      }

      return null;
    });

    const startDate = parseEventDate(dateText);

    if (!startDate) {
      console.log(`    No valid date found (raw: ${dateText}), skipping`);
      return null;
    }

    // Extract time
    const timeText = await page.evaluate(() => {
      const timeEl = document.querySelector('.event-time, .time, [class*="time"]');
      return timeEl?.textContent?.trim() || null;
    });
    const startTime = parseTime(timeText);

    // Extract price
    const priceText = await page.evaluate(() => {
      const priceEl = document.querySelector('.price, .event-price, .ticket-price, [class*="price"]');
      return priceEl?.textContent?.trim() || '';
    });
    const { price, isSoldOut } = parsePrice(priceText);

    // Extract venue/location
    const venueName = await page.evaluate(() => {
      const venueEl = document.querySelector('.venue-name, .location-name, [class*="venue"]');
      return venueEl?.textContent?.trim() || '';
    });

    const venueAddress = await page.evaluate(() => {
      const locationEl = document.querySelector('.venue-address, .location, address, [class*="address"]');
      return locationEl?.textContent?.trim() || 'Bahrain';
    });

    // Extract image - try multiple selectors to find the REAL image (not promo banners)
    const imageUrl = await page.evaluate(() => {
      // Priority order of selectors
      const selectors = [
        '.event-detail-image img',
        '.event-gallery img:first-child',
        '.hero-image img',
        '.main-image img',
        '.event-image img',
        'meta[property="og:image"]',
      ];

      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
          const src = element.getAttribute('src') || element.getAttribute('content');
          // Skip promo/banner images
          if (src && !src.includes('promo') && !src.includes('banner') && !src.includes('logo')) {
            return src;
          }
        }
      }

      // Fallback: find any large image
      const images = document.querySelectorAll('img');
      for (const img of images) {
        const src = img.src;
        const width = img.naturalWidth || img.width;
        if (src && width > 300 && !src.includes('promo') && !src.includes('banner') && !src.includes('logo') && !src.includes('icon')) {
          return src;
        }
      }

      return null;
    });

    // Determine category
    const category = mapEventCategory(categoryFromUrl, title);
    const slug = createSlug(title);

    return {
      title,
      slug,
      description: cleanDescription(description),
      price,
      price_currency: 'BHD',
      image_url: imageUrl || '',
      cover_url: imageUrl || '',
      venue_name: venueName || 'Various Locations',
      venue_address: venueAddress || 'Bahrain',
      category,
      start_date: startDate,
      end_date: null,
      start_time: startTime,
      source_url: url,
      source_name: 'platinumlist',
      affiliate_url: generateAffiliateLink(url),
      is_sold_out: isSoldOut,
      is_active: !isSoldOut,
      status: 'published',
    };
  } catch (error) {
    console.log(`    Error scraping detail page: ${error}`);
    return null;
  }
}

/**
 * Process images and upload to S3
 */
async function processImages(event: ScrapedEvent): Promise<ScrapedEvent> {
  if (!event.image_url) {
    return event;
  }

  try {
    // Download image
    console.log(`    Downloading image...`);
    const imageBuffer = await downloadImage(event.image_url);

    if (imageBuffer) {
      // Upload thumbnail
      console.log(`    Uploading thumbnail to S3...`);
      const thumbnailUrl = await uploadImageToS3(imageBuffer, event.slug, 'thumbnail');
      if (thumbnailUrl) {
        event.image_url = thumbnailUrl;
        console.log(`    Thumbnail uploaded: ${thumbnailUrl}`);
      }

      // Upload cover
      console.log(`    Uploading cover to S3...`);
      const coverUrl = await uploadImageToS3(imageBuffer, event.slug, 'cover');
      if (coverUrl) {
        event.cover_url = coverUrl;
        console.log(`    Cover uploaded: ${coverUrl}`);
      }
    }
  } catch (error) {
    console.log(`    Error processing images: ${error}`);
  }

  return event;
}

/**
 * Upsert event to database
 */
async function upsertEvent(supabase: SupabaseClient, event: ScrapedEvent): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('events')
      .upsert({
        title: event.title,
        slug: event.slug,
        description: event.description,
        price: event.price,
        price_currency: event.price_currency,
        image_url: event.image_url,
        cover_url: event.cover_url,
        featured_image: event.image_url,
        venue_name: event.venue_name,
        venue_address: event.venue_address,
        category: event.category,
        start_date: event.start_date,
        date: event.start_date,
        end_date: event.end_date,
        start_time: event.start_time,
        time: event.start_time,
        source_url: event.source_url,
        source_name: event.source_name,
        source: event.source_name,
        original_url: event.source_url,
        affiliate_url: event.affiliate_url,
        booking_url: event.affiliate_url,
        is_sold_out: event.is_sold_out,
        is_active: event.is_active,
        is_hidden: false,
        status: event.status,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'source_url',
      });

    if (error) {
      console.log(`    Database error: ${error.message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.log(`    Error upserting event: ${error}`);
    return false;
  }
}

/**
 * Main scraper function
 */
export async function scrapeEvents(): Promise<void> {
  console.log('='.repeat(50));
  console.log('Platinumlist Events Scraper - Starting');
  console.log('='.repeat(50));
  console.log(`Affiliate Code: ${AFFILIATE_CODE}`);
  console.log(`Time: ${new Date().toISOString()}`);

  // Initialize Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Launch browser
  const browser: Browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  try {
    // Step 1: Scrape all event URLs
    console.log('\nStep 1: Collecting event URLs...');
    const eventUrls = await scrapeEventUrls(page);

    if (eventUrls.length === 0) {
      console.log('No events found to scrape.');
      return;
    }

    // Step 2: Scrape each event detail
    console.log('\nStep 2: Scraping event details...');
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < eventUrls.length; i++) {
      const url = eventUrls[i];
      console.log(`\n[${i + 1}/${eventUrls.length}]`);
      console.log(`    Scraping: ${url}`);

      // Determine category from URL
      let categoryFromUrl = 'concerts';
      for (const cat of EVENT_CATEGORIES) {
        if (url.includes(`/${cat.name}/`) || url.includes(`platinumlist.net/${cat.name}`)) {
          categoryFromUrl = cat.name;
          break;
        }
      }

      const event = await scrapeEventDetail(page, url, categoryFromUrl);

      if (event) {
        // Process and upload images
        const processedEvent = await processImages(event);

        // Upsert to database
        const success = await upsertEvent(supabase, processedEvent);

        if (success) {
          successCount++;
          console.log(`    ✓ ${event.title} - ${event.price} BHD [${event.category}] - ${event.start_date}`);
        } else {
          failCount++;
          console.log(`    ✗ Failed to save: ${event.title}`);
        }
      } else {
        failCount++;
      }

      // Rate limiting
      await page.waitForTimeout(1000);
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('Scraping Complete!');
    console.log('='.repeat(50));
    console.log(`Total events: ${eventUrls.length}`);
    console.log(`Successful: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Time: ${new Date().toISOString()}`);

  } catch (error) {
    console.error('Fatal error during scraping:', error);
  } finally {
    await browser.close();
  }
}
