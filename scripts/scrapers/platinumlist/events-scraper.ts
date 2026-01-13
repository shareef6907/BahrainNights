import { chromium, Browser, Page } from 'playwright';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ScrapedEvent, EventsScraperConfig, EVENT_CATEGORY_MAP, CATEGORY_KEYWORDS } from './events-types';
import * as https from 'https';
import * as http from 'http';

const DEFAULT_CONFIG: EventsScraperConfig = {
  affiliateCode: 'yjg3yzi',
  baseUrl: 'https://manama.platinumlist.net',
  usdToBhdRate: 0.376,
  delayMs: 2000,
  maxRetries: 3,
};

// S3 Configuration
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const S3_BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';
const S3_REGION = process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1';

// Generate affiliate URL
export function generateAffiliateUrl(originalUrl: string, affiliateCode: string): string {
  return `https://platinumlist.net/aff/?ref=${affiliateCode}&link=${encodeURIComponent(originalUrl)}`;
}

// Check if URL is an event (has numeric ID)
// Events: /event-tickets/103422/wicked-the-musical (has numeric ID)
// Attractions: /event-tickets/gravity-indoor-skydiving (no numeric ID)
function isEventUrl(url: string): boolean {
  const match = url.match(/\/event-tickets\/(\d+)\//);
  return !!match;
}

// Extract event ID from URL
function extractEventId(url: string): string | null {
  const match = url.match(/\/event-tickets\/(\d+)\//);
  return match ? match[1] : null;
}

// Download image from URL and return as Buffer
async function downloadImage(imageUrl: string): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const protocol = imageUrl.startsWith('https') ? https : http;

    protocol.get(imageUrl, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl).then(resolve);
          return;
        }
      }

      if (response.statusCode !== 200) {
        console.log(`    Failed to download image: ${response.statusCode}`);
        resolve(null);
        return;
      }

      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', () => resolve(null));
    }).on('error', () => resolve(null));
  });
}

// Upload image to S3 for events
async function uploadToS3(imageBuffer: Buffer, slug: string, type: 'thumbnail' | 'cover' = 'thumbnail'): Promise<string | null> {
  try {
    const filename = `${slug}-${type}-${Date.now()}.jpg`;
    const key = `uploads/events/${filename}`;

    await s3Client.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    }));

    // Return the processed URL (Lambda will convert to webp)
    const processedFilename = filename.replace('.jpg', '.webp');
    return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/processed/events/${processedFilename}`;
  } catch (error) {
    console.error('    Error uploading to S3:', error);
    return null;
  }
}

// Delay helper
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Determine category from URL path and title/description
function determineCategory(urlPath: string, title: string, description: string | null): string {
  const combined = `${title} ${description || ''}`.toLowerCase();

  // First check URL path for category
  for (const [urlCategory, mappedCategory] of Object.entries(EVENT_CATEGORY_MAP)) {
    if (urlPath.toLowerCase().includes(urlCategory)) {
      return mappedCategory;
    }
  }

  // Then check keywords in title/description
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (combined.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  return 'events'; // Default category
}

// Parse date string from Platinumlist format
function parseDate(dateStr: string | null): string | null {
  if (!dateStr) return null;

  try {
    // Clean up the string
    const cleanDate = dateStr.trim().replace(/\s+/g, ' ');

    // Try ISO format first: "2026-01-15"
    if (/^\d{4}-\d{2}-\d{2}/.test(cleanDate)) {
      return cleanDate.split('T')[0];
    }

    // Try common formats: "Jan 15, 2026", "15 Jan 2026", "January 15, 2026"
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const monthRegex = /(\d{1,2})?\s*(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s*(\d{1,2})?,?\s*(\d{4})/i;
    const match = cleanDate.match(monthRegex);

    if (match) {
      const [, day1, monthStr, day2, year] = match;
      const day = day1 || day2 || '1';
      const monthIndex = months.findIndex(m => monthStr.toLowerCase().startsWith(m));
      if (monthIndex >= 0) {
        const date = new Date(parseInt(year), monthIndex, parseInt(day));
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      }
    }

    // Try parsing with Date constructor as fallback
    const date = new Date(cleanDate);
    if (!isNaN(date.getTime())) {
      // Ensure year is reasonable (not in the past)
      const currentYear = new Date().getFullYear();
      if (date.getFullYear() >= currentYear - 1) {
        return date.toISOString().split('T')[0];
      }
    }
  } catch {
    console.log(`    Could not parse date: ${dateStr}`);
  }

  return null;
}

// Scrape event category page and get event URLs
async function scrapeEventListingPage(page: Page, url: string): Promise<string[]> {
  const eventUrls: string[] = [];

  try {
    console.log(`  Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await delay(3000);

    // Scroll to load more events (lazy loading)
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await delay(500);
    }

    // Get all event links
    const links = await page.evaluate(() => {
      const results: string[] = [];
      const anchors = document.querySelectorAll('a[href*="/event-tickets/"]');

      anchors.forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.includes('purchase') && !href.includes('cart')) {
          results.push(href);
        }
      });

      return Array.from(new Set(results)); // Deduplicate
    });

    // Filter to only events (with numeric IDs)
    links.forEach(link => {
      const fullUrl = link.startsWith('http') ? link : `https://manama.platinumlist.net${link}`;
      if (isEventUrl(fullUrl)) {
        eventUrls.push(fullUrl);
      }
    });

    console.log(`  Found ${eventUrls.length} event URLs (filtered from ${links.length} total)`);
  } catch (error) {
    console.error(`  Error scraping listing page ${url}:`, error);
  }

  return eventUrls;
}

// Scrape event detail page
async function scrapeEventDetailPage(
  page: Page,
  url: string,
  urlCategory: string,
  config: EventsScraperConfig
): Promise<ScrapedEvent | null> {
  try {
    console.log(`    Scraping: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await delay(2000);

    const data = await page.evaluate(() => {
      // Get title from h1
      const h1 = document.querySelector('h1');
      const title = h1?.textContent?.trim() || '';

      // Get price - look for price elements
      let price: number | null = null;
      const pageText = document.body.textContent || '';

      // Try multiple price patterns
      const priceFromMatch = pageText.match(/(?:Price from|Starting from|From)[:\s]+(\d+(?:\.\d+)?)\s*(?:BHD|BD)/i);
      if (priceFromMatch) {
        price = parseFloat(priceFromMatch[1]);
      } else {
        // Look for BHD price
        const bhdMatch = pageText.match(/(\d+(?:\.\d+)?)\s*(?:BHD|BD)/i);
        if (bhdMatch) {
          price = parseFloat(bhdMatch[1]);
        }
      }

      // If price is in USD, convert to BHD (will be done later)
      let currency = 'BHD';
      if (!price) {
        const usdMatch = pageText.match(/\$(\d+(?:\.\d+)?)/);
        if (usdMatch) {
          price = parseFloat(usdMatch[1]);
          currency = 'USD';
        }
      }

      // Get description
      let description: string | null = null;
      const descriptionSelectors = [
        '.event-description',
        '.description',
        '[class*="event-detail"] p',
        '[class*="event-info"] p',
        'article p',
        'main p',
        '.content-body p'
      ];

      for (const selector of descriptionSelectors) {
        if (description) break;
        const elements = Array.from(document.querySelectorAll(selector));
        for (const elem of elements) {
          const text = elem.textContent?.trim() || '';
          const isBadText = text.includes('EventsClose') || text.includes('Sign in') ||
            text.includes('Privacy Policy') || text.includes('All rights reserved') ||
            text.includes('{') || text.includes('cls-') || text.length < 50;

          if (!isBadText && text.length > 50 && text.length < 3000) {
            description = text;
            break;
          }
        }
      }

      // Get image URLs
      let imageUrl: string | null = null;
      let coverUrl: string | null = null;

      const images = Array.from(document.querySelectorAll('img[src*="/upload/"], img[src*="cdn.platinumlist"]'));
      for (const img of images) {
        const src = img.getAttribute('src') || img.getAttribute('data-src');
        if (src && src.includes('/upload/') && !src.includes('logo') && !src.includes('icon')) {
          const fullSrc = src.startsWith('http') ? src : `https://cdn.platinumlist.net${src}`;
          if (!imageUrl) {
            imageUrl = fullSrc;
          } else if (!coverUrl) {
            coverUrl = fullSrc;
          }
        }
      }

      // Get venue name
      let venue: string | null = null;
      const venueLink = document.querySelector('a[href*="/venue/"]');
      if (venueLink) {
        venue = venueLink.textContent?.trim() || null;
      }

      // Get location/address
      let location: string | null = null;
      const addressElements = Array.from(document.querySelectorAll('[class*="address"], [class*="location"], [class*="venue"]'));
      for (const elem of addressElements) {
        const text = elem.textContent?.trim();
        if (text && text.length > 5 && text.length < 200 && !text.includes('http')) {
          location = text;
          break;
        }
      }

      // Get date information
      let startDate: string | null = null;
      let endDate: string | null = null;
      let startTime: string | null = null;

      // First, look for dates in the entire page text using common patterns
      const pageText = document.body.textContent || '';

      // Extract year from page title (e.g., "2026 Theatrical Performance")
      const titleText = document.title || '';
      const yearMatch = titleText.match(/(\d{4})/);
      const currentYear = new Date().getFullYear();
      const assumedYear = yearMatch ? parseInt(yearMatch[1]) : currentYear;

      // Pattern for Platinumlist format: "Tue 13 Jan - Sat 17 Jan" (without year)
      const platinumlistDatePattern = /(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?:\s*-\s*(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))?/gi;
      const platinumlistMatch = pageText.match(platinumlistDatePattern);

      if (platinumlistMatch && platinumlistMatch[0]) {
        // Parse the first match like "Tue 13 Jan - Sat 17 Jan"
        const fullMatch = platinumlistMatch[0];
        const parts = fullMatch.split('-').map(p => p.trim());

        // Parse start date
        const startMatch = parts[0].match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);
        if (startMatch) {
          startDate = `${startMatch[1]} ${startMatch[2]} ${assumedYear}`;
        }

        // Parse end date if exists
        if (parts[1]) {
          const endMatch = parts[1].match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);
          if (endMatch) {
            endDate = `${endMatch[1]} ${endMatch[2]} ${assumedYear}`;
          }
        }
      }

      // If no date found, try other patterns with full year
      if (!startDate) {
        // Pattern 1: "15 Jan 2026" or "Jan 15, 2026" or "January 15, 2026"
        const datePatterns = [
          /(\d{1,2})\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{4})/gi,
          /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),?\s+(\d{4})/gi,
        ];

        for (const pattern of datePatterns) {
          const matches = pageText.matchAll(pattern);
          for (const match of matches) {
            const dateStr = match[0];
            if (!startDate) {
              startDate = dateStr;
            } else if (!endDate && dateStr !== startDate) {
              endDate = dateStr;
            }
            if (startDate && endDate) break;
          }
          if (startDate) break;
        }
      }

      // Look for time patterns: "7:00 PM", "19:00", "7 PM"
      const timePatterns = [
        /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/g,
        /(\d{1,2}\s*(?:AM|PM|am|pm))/g,
        /(?:starts?\s*(?:at\s*)?|doors\s*(?:open\s*)?(?:at\s*)?)(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)/gi,
      ];

      for (const pattern of timePatterns) {
        const match = pageText.match(pattern);
        if (match && !startTime) {
          startTime = match[0].replace(/starts?\s*(?:at\s*)?|doors\s*(?:open\s*)?(?:at\s*)?/gi, '').trim();
          break;
        }
      }

      // Also look for date elements with datetime attributes
      const dateElements = Array.from(document.querySelectorAll('[class*="date"], [class*="time"], time, [datetime]'));
      for (const elem of dateElements) {
        const datetime = elem.getAttribute('datetime');
        if (datetime && !startDate) {
          startDate = datetime;
        }
      }

      return { title, price, currency, description, imageUrl, coverUrl, venue, location, startDate, endDate, startTime };
    });

    if (!data.title) {
      console.log(`    Skipping - no title found`);
      return null;
    }

    // Convert USD to BHD if needed
    let finalPrice = data.price;
    if (data.currency === 'USD' && finalPrice) {
      finalPrice = Math.round(finalPrice * config.usdToBhdRate * 100) / 100;
    }

    // Extract event ID and generate slug
    const eventId = extractEventId(url);
    const urlSlug = url.split('/').pop()?.split('?')[0] || generateSlug(data.title);

    // Download and upload thumbnail image to S3
    let s3ImageUrl: string | null = null;
    if (data.imageUrl) {
      console.log(`    Downloading thumbnail...`);
      const imageBuffer = await downloadImage(data.imageUrl);
      if (imageBuffer) {
        console.log(`    Uploading thumbnail to S3...`);
        s3ImageUrl = await uploadToS3(imageBuffer, urlSlug, 'thumbnail');
        if (s3ImageUrl) {
          console.log(`    Thumbnail uploaded: ${s3ImageUrl}`);
        }
      }
    }

    // Download and upload cover image to S3
    let s3CoverUrl: string | null = null;
    if (data.coverUrl && data.coverUrl !== data.imageUrl) {
      console.log(`    Downloading cover...`);
      const coverBuffer = await downloadImage(data.coverUrl);
      if (coverBuffer) {
        console.log(`    Uploading cover to S3...`);
        s3CoverUrl = await uploadToS3(coverBuffer, urlSlug, 'cover');
        if (s3CoverUrl) {
          console.log(`    Cover uploaded: ${s3CoverUrl}`);
        }
      }
    }

    const category = determineCategory(urlCategory, data.title, data.description);

    const event: ScrapedEvent = {
      title: data.title,
      description: data.description,
      price: finalPrice,
      priceCurrency: 'BHD',
      imageUrl: s3ImageUrl || data.imageUrl,
      coverUrl: s3CoverUrl || data.coverUrl,
      venue: data.venue,
      location: data.location || 'Bahrain',
      category,
      originalUrl: url,
      affiliateUrl: generateAffiliateUrl(url, config.affiliateCode),
      externalId: eventId,
      startDate: parseDate(data.startDate),
      endDate: parseDate(data.endDate),
      startTime: data.startTime,
    };

    console.log(`    ✓ ${data.title} - ${finalPrice ? `${finalPrice} BHD` : 'No price'} [${category}]`);
    return event;

  } catch (error) {
    console.error(`    Error scraping detail page ${url}:`, error);
    return null;
  }
}

// Main events scraper function
export async function scrapePlatinumlistEvents(config: Partial<EventsScraperConfig> = {}): Promise<ScrapedEvent[]> {
  const fullConfig: EventsScraperConfig = { ...DEFAULT_CONFIG, ...config };
  const allEvents: ScrapedEvent[] = [];
  let browser: Browser | null = null;

  try {
    console.log('Starting Platinumlist Events Scraper...');
    console.log(`Base URL: ${fullConfig.baseUrl}`);

    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
    });

    const page = await context.newPage();

    // Event category pages to scrape
    const categoryPages = [
      { url: `${fullConfig.baseUrl}/events`, category: 'events' },
      { url: `${fullConfig.baseUrl}/concerts`, category: 'concerts' },
      { url: `${fullConfig.baseUrl}/nightlife`, category: 'nightlife' },
      { url: `${fullConfig.baseUrl}/comedy`, category: 'comedy' },
      { url: `${fullConfig.baseUrl}/theatre`, category: 'theatre' },
      { url: `${fullConfig.baseUrl}/festivals`, category: 'festivals' },
      { url: `${fullConfig.baseUrl}/sports`, category: 'sports' },
    ];

    console.log(`\nScraping ${categoryPages.length} event category pages...\n`);

    // Collect all unique event URLs with their categories
    const eventUrlMap = new Map<string, string>(); // url -> category

    for (const { url: categoryUrl, category } of categoryPages) {
      console.log(`\nCategory: ${category} (${categoryUrl})`);
      const urls = await scrapeEventListingPage(page, categoryUrl);
      urls.forEach(url => {
        if (!eventUrlMap.has(url)) {
          eventUrlMap.set(url, category);
        }
      });
      await delay(fullConfig.delayMs);
    }

    console.log(`\n========================================`);
    console.log(`Total unique event URLs: ${eventUrlMap.size}`);
    console.log(`========================================\n`);

    // Scrape each event detail page
    const entries = Array.from(eventUrlMap.entries());
    for (let index = 0; index < entries.length; index++) {
      const [eventUrl, category] = entries[index];
      console.log(`\n[${index + 1}/${entries.length}]`);

      const event = await scrapeEventDetailPage(page, eventUrl, category, fullConfig);
      if (event) {
        allEvents.push(event);
      }

      // Rate limiting
      await delay(fullConfig.delayMs);
    }

    await context.close();

    console.log(`\n========================================`);
    console.log(`Scraping Complete!`);
    console.log(`Total events scraped: ${allEvents.length}`);
    console.log(`========================================\n`);

    return allEvents;

  } catch (error) {
    console.error('Events scraper error:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Filter out past events
export function filterActiveEvents(events: ScrapedEvent[]): ScrapedEvent[] {
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  return events.filter(event => {
    // If no end date, check start date
    const checkDate = event.endDate || event.startDate;
    if (!checkDate) return true; // Keep events without dates

    return checkDate >= today;
  });
}
