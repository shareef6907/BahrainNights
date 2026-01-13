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
 * Uses og:description meta tag which contains structured data:
 * "Buy {title} tickets, {date}, {venue}, at the official Platinumlist.net site. {title} tickets prices starting from {price}."
 */
async function scrapeEventDetail(page: Page, url: string, categoryFromUrl: string): Promise<ScrapedEvent | null> {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Extract all data from meta tags - most reliable source
    const metaData = await page.evaluate(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
      const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
      const h1Title = document.querySelector('h1')?.textContent?.trim() || '';

      return { ogTitle, ogDesc, ogImage, h1Title };
    });

    // Use h1 title or og:title
    const title = metaData.h1Title || metaData.ogTitle.replace(/ Tickets.*$/, '');

    if (!title) {
      console.log(`    No title found, skipping`);
      return null;
    }

    // Parse og:description for date, venue, and price
    // Format: "Buy X tickets, 15 January 2026, Venue Name, at the official..."
    const ogDesc = metaData.ogDesc;

    // Extract date from og:description (e.g., "15 January 2026")
    const dateMatch = ogDesc.match(/tickets,\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i);
    const dateText = dateMatch ? dateMatch[1] : null;

    const startDate = parseEventDate(dateText);

    if (!startDate) {
      console.log(`    No valid date found (raw: ${dateText}), skipping`);
      return null;
    }

    // Check if event is in the past - skip past events
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(startDate);
    if (eventDate < today) {
      console.log(`    Event is in the past (${startDate}), skipping`);
      return null;
    }

    // Extract venue from og:description (between date and "at the official")
    // Format: "15 January 2026, Venue Name, Bahrain, at the official" or "15 January 2026, Venue Name, at the official"
    const venueMatch = ogDesc.match(/\d{4},\s*(.+?),\s*at the official/i);
    let venueName = venueMatch ? venueMatch[1].trim() : '';
    // Clean up venue name - remove trailing "Bahrain" if it's just the country name at the end
    if (venueName.endsWith(', Bahrain')) {
      // Keep "Bahrain" as part of venue name (e.g., "Volto Restaurant & Lounge, Bahrain")
    }

    // Extract price from og:description (e.g., "starting from 70.00 BHD")
    const priceMatch = ogDesc.match(/starting from\s*([\d.]+)\s*BHD/i);
    const priceFromDesc = priceMatch ? parseFloat(priceMatch[1]) : 0;

    // Check for sold out in page content
    const isSoldOut = await page.evaluate(() => {
      const pageText = document.body.textContent?.toLowerCase() || '';
      return pageText.includes('sold out') || pageText.includes('soldout');
    });

    // Extract time from page (look for "Doors: HH:MM" pattern)
    const timeText = await page.evaluate(() => {
      // Look for time in the sidebar info section
      const pageText = document.body.innerText;
      const doorsMatch = pageText.match(/Doors:?\s*(\d{1,2}:\d{2})/i);
      if (doorsMatch) return doorsMatch[1];

      // Alternative: look for time pattern near date
      const timeMatch = pageText.match(/\b(\d{1,2}:\d{2})\s*(AM|PM)?\b/i);
      if (timeMatch) return timeMatch[0];

      return null;
    });
    const startTime = parseTime(timeText);

    // Extract description from page paragraphs
    const description = await page.evaluate(() => {
      const paragraphs = document.querySelectorAll('p');
      for (const p of paragraphs) {
        const text = p.textContent?.trim() || '';
        // Skip short texts and navigation/footer content
        if (text.length > 50 && text.length < 1000 &&
            !text.includes('Do you have any questions') &&
            !text.includes('Download') &&
            !text.includes('Buy now') &&
            !text.includes('Sale ends')) {
          return text;
        }
      }
      return '';
    });

    // Use og:image for the event poster
    const imageUrl = metaData.ogImage || null;

    // Determine category
    const category = mapEventCategory(categoryFromUrl, title);
    const slug = createSlug(title);

    return {
      title,
      slug,
      description: cleanDescription(description),
      price: priceFromDesc,
      price_currency: 'BHD',
      image_url: imageUrl || '',
      cover_url: imageUrl || '',
      venue_name: venueName || 'Various Locations',
      venue_address: 'Bahrain',
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
