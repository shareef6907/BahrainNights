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
 * Uses multiple extraction methods:
 * 1. og:description meta tag for structured data
 * 2. Page DOM elements for dates displayed on the page
 * 3. Various selectors for venue, price, and other info
 */
async function scrapeEventDetail(page: Page, url: string, categoryFromUrl: string): Promise<ScrapedEvent | null> {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Extract all data from meta tags and page DOM
    const pageData = await page.evaluate(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
      const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
      const h1Title = document.querySelector('h1')?.textContent?.trim() || '';

      // Extract date from page DOM - multiple approaches
      // Look for date elements on the page (Platinumlist displays dates in various formats)
      let pageDate: string | null = null;

      // Method 1: Look for date in any element containing day/month pattern
      const pageText = document.body.innerText;

      // Match patterns like "Wed 14 Jan - Sat 17 Jan", "Fri 16 Jan", "15 January 2026", etc.
      const datePatterns = [
        // Date range with weekday: "Wed 14 Jan - Sat 17 Jan"
        /\b((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?:\s+\d{4})?)\s*-/i,
        // Single date with weekday: "Fri 16 Jan 2026" or "Fri 16 Jan"
        /\b((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?:\s+\d{4})?)\b/i,
        // Full date: "15 January 2026"
        /\b(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})\b/i,
        // Short date: "15 Jan 2026"
        /\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})\b/i,
      ];

      for (const pattern of datePatterns) {
        const match = pageText.match(pattern);
        if (match) {
          pageDate = match[1];
          break;
        }
      }

      // Extract venue from page DOM
      // Look for venue link or venue text in the page
      let pageVenue: string | null = null;

      // Method 1: Look for venue link (often has class or contains venue info)
      const venueLink = document.querySelector('a[href*="/venue/"]');
      if (venueLink) {
        pageVenue = venueLink.textContent?.trim() || null;
      }

      // Method 2: Look for location pin icon followed by text
      if (!pageVenue) {
        const pageText = document.body.innerText;
        // Match venue patterns like "@ Venue Name" or "Exhibition World Bahrain"
        const venuePatterns = [
          /(?:@|at)\s+([A-Z][A-Za-z0-9\s&,'-]+(?:Bahrain|Theatre|Arena|Stadium|Hotel|Club|Lounge|Restaurant|World|Centre|Center|Amphitheatre|Hall))/i,
          /(?:Venue|Location):\s*([A-Z][A-Za-z0-9\s&,'-]+)/i,
        ];

        for (const pattern of venuePatterns) {
          const match = pageText.match(pattern);
          if (match) {
            pageVenue = match[1].trim();
            break;
          }
        }
      }

      // Method 3: Extract from title if it contains "at [Venue]"
      if (!pageVenue && h1Title) {
        const titleVenueMatch = h1Title.match(/\s+at\s+(.+?)(?:,\s*Bahrain)?$/i);
        if (titleVenueMatch) {
          pageVenue = titleVenueMatch[1].trim();
        }
      }

      return { ogTitle, ogDesc, ogImage, h1Title, pageDate, pageVenue };
    });

    // Use h1 title or og:title
    const title = pageData.h1Title || pageData.ogTitle.replace(/ Tickets.*$/, '');

    if (!title) {
      console.log(`    No title found, skipping`);
      return null;
    }

    // Parse og:description for date, venue, and price
    // Format: "Buy X tickets, 15 January 2026, Venue Name, at the official..."
    const ogDesc = pageData.ogDesc;

    // Try multiple date extraction methods
    let dateText: string | null = null;

    // Method 1: Extract date from og:description (e.g., "tickets, 15 January 2026")
    const ogDateMatch = ogDesc.match(/tickets,\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i);
    if (ogDateMatch) {
      dateText = ogDateMatch[1];
    }

    // Method 2: Fallback to page DOM date
    if (!dateText && pageData.pageDate) {
      dateText = pageData.pageDate;
      console.log(`    Using page DOM date: ${dateText}`);
    }

    const startDate = parseEventDate(dateText);

    if (!startDate) {
      console.log(`    No valid date found (og: ${ogDateMatch?.[1] || 'null'}, page: ${pageData.pageDate || 'null'}), skipping`);
      return null;
    }

    // Rename metaData to pageData reference for rest of function
    const metaData = pageData;

    // Check if event is in the past - skip past events
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(startDate);
    if (eventDate < today) {
      console.log(`    Event is in the past (${startDate}), skipping`);
      return null;
    }

    // Extract venue - try multiple methods
    let venueName = '';

    // Method 1: Extract from og:description (between date and "at the official")
    const venueMatch = ogDesc.match(/\d{4},\s*(.+?),\s*at the official/i);
    if (venueMatch) {
      venueName = venueMatch[1].trim();
    }

    // Method 2: Fallback to page DOM venue
    if (!venueName && pageData.pageVenue) {
      venueName = pageData.pageVenue;
      console.log(`    Using page DOM venue: ${venueName}`);
    }

    // Method 3: Extract from title if it contains "at [Venue]"
    if (!venueName && title) {
      const titleVenueMatch = title.match(/\s+at\s+(.+?)(?:,\s*Bahrain)?$/i);
      if (titleVenueMatch) {
        venueName = titleVenueMatch[1].trim();
      }
    }

    // Clean up venue name - remove trailing ", Bahrain" duplicate
    venueName = venueName.replace(/,\s*Bahrain,\s*Bahrain$/i, ', Bahrain');

    // Extract price from og:description (e.g., "starting from 70.00 BHD")
    const priceMatch = ogDesc.match(/starting from\s*([\d.]+)\s*BHD/i);
    let priceFromDesc = priceMatch ? parseFloat(priceMatch[1]) : null;

    // If og:description didn't have price, try extracting from page DOM
    if (priceFromDesc === null) {
      const pagePrice = await page.evaluate(() => {
        const pageText = document.body.innerText;

        // Method 1: Look for "from X BHD" or "starting X BHD" patterns
        const pricePatterns = [
          /(?:from|starting)\s*(?:BHD|BD)?\s*(\d+(?:\.\d+)?)\s*(?:BHD|BD)?/i,
          /(?:BHD|BD)\s*(\d+(?:\.\d+)?)/i,
          /(\d+(?:\.\d+)?)\s*(?:BHD|BD)/i,
          /price[:\s]+(\d+(?:\.\d+)?)/i,
          /ticket[s]?[:\s]+(?:BHD|BD)?\s*(\d+(?:\.\d+)?)/i,
        ];

        for (const pattern of pricePatterns) {
          const match = pageText.match(pattern);
          if (match) {
            const price = parseFloat(match[1]);
            // Only return reasonable prices (1-1000 BHD)
            if (price >= 1 && price <= 1000) {
              return price;
            }
          }
        }

        // Method 2: Look for price in specific elements
        const priceSelectors = [
          '.price', '.ticket-price', '[class*="price"]',
          '.event-price', '.cost', '[data-price]'
        ];

        for (const selector of priceSelectors) {
          const el = document.querySelector(selector);
          if (el) {
            const text = el.textContent || '';
            const match = text.match(/(\d+(?:\.\d+)?)/);
            if (match) {
              const price = parseFloat(match[1]);
              if (price >= 1 && price <= 1000) {
                return price;
              }
            }
          }
        }

        return null;
      });

      if (pagePrice !== null) {
        priceFromDesc = pagePrice;
        console.log(`    Using page DOM price: ${pagePrice} BHD`);
      }
    }

    // Check for sold out - use targeted detection to avoid false positives
    // (e.g., description text like "Following a sold out edition in 2018...")
    const isSoldOut = await page.evaluate(() => {
      // Method 1: Check if "Select tickets" button exists - if so, NOT sold out
      const selectTicketsLink = document.querySelector('a[href*="purchase-entry"]');
      if (selectTicketsLink) {
        const linkText = selectTicketsLink.textContent?.toLowerCase() || '';
        // If the button says "sold out", it is sold out
        if (linkText.includes('sold out') || linkText.includes('soldout')) {
          return true;
        }
        // Otherwise, tickets are available
        return false;
      }

      // Method 2: Check for buttons with "sold out" text in ticket area
      const ticketButtons = document.querySelectorAll('button, .btn, [class*="button"], a[class*="ticket"]');
      for (const btn of ticketButtons) {
        const btnText = btn.textContent?.toLowerCase() || '';
        // Only check short button text (not descriptions)
        if (btnText.length < 50 && (btnText.includes('sold out') || btnText.includes('soldout'))) {
          return true;
        }
      }

      // Method 3: Check for price display showing sold out (in ticket/price area only)
      const priceAreaElements = document.querySelectorAll('[class*="price-from"], [class*="ticket-price"], [class*="ticket-info"]');
      for (const el of priceAreaElements) {
        const elText = el.textContent?.toLowerCase() || '';
        if (elText.length < 100 && (elText.includes('sold out') || elText.includes('soldout'))) {
          return true;
        }
      }

      // Method 4: Check for "no tickets available" in short UI elements only
      const infoElements = document.querySelectorAll('[class*="info"], [class*="status"], [class*="availability"]');
      for (const el of infoElements) {
        const elText = el.textContent?.toLowerCase() || '';
        if (elText.length < 100 && (elText.includes('no tickets available') || elText.includes('tickets unavailable'))) {
          return true;
        }
      }

      return false;
    });

    // If sold out, set price to null (will display as "Contact for price")
    if (isSoldOut) {
      priceFromDesc = null;
    }

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

// Run when executed directly
scrapeEvents().catch(console.error);
