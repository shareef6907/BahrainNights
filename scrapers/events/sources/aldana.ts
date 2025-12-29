/**
 * Al Dana Amphitheatre Scraper
 * Scrapes events from https://www.beyonaldana.com.bh/
 *
 * Site Structure (as of Dec 2025):
 * - Events displayed in a carousel on homepage
 * - Each event has: h2 (title), .date (date), picture>source/img (image), a[href*="platinumlist"] (booking)
 * - Container structure: div > div.inner > div > div.bg (image) + div.bottom (title, date, links)
 */

import puppeteer, { Browser } from 'puppeteer';
import crypto from 'crypto';
import { ScrapedEvent, SOURCE_NAMES } from '../types';
import { SCRAPER_CONFIG } from '../config';
import { detectCategory } from '../utils/categorizer';
import { sleep, getRandomDelay, scraperLog } from '../utils/request-helper';

const BASE_URL = 'https://www.beyonaldana.com.bh';
const SOURCE_NAME = SOURCE_NAMES.ALDANA;
const LOG_PREFIX = 'AlDana';

// Correct venue information - Al Dana is in Sakhir, NOT Bahrain Bay
const ALDANA_VENUE = {
  name: 'Beyon Al Dana Amphitheatre',
  address: 'Bahrain International Circuit, Sakhir, Bahrain',
  lat: 26.0325,
  lng: 50.5106,
  website: 'https://www.beyonaldana.com.bh',
};

// Generate event ID from title and date
function generateEventId(title: string, date: string): string {
  const hash = crypto
    .createHash('md5')
    .update(`${title}-${date}`)
    .digest('hex')
    .substring(0, 12);
  return `aldana-${hash}`;
}

// Parse date from format like "Fri, 9 Jan 2026" or "Sun, 18 Jan 2026"
function parseDate(dateStr: string): string {
  if (!dateStr) {
    return new Date().toISOString().split('T')[0];
  }

  try {
    // Clean up the date string
    const cleaned = dateStr.replace('Array', '').trim();

    // Try direct Date parsing first
    const parsed = new Date(cleaned);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }

    // Manual parsing for format like "Fri, 9 Jan 2026"
    const months: Record<string, string> = {
      jan: '01', january: '01',
      feb: '02', february: '02',
      mar: '03', march: '03',
      apr: '04', april: '04',
      may: '05',
      jun: '06', june: '06',
      jul: '07', july: '07',
      aug: '08', august: '08',
      sep: '09', september: '09',
      oct: '10', october: '10',
      nov: '11', november: '11',
      dec: '12', december: '12',
    };

    const lower = cleaned.toLowerCase();
    for (const [monthName, monthNum] of Object.entries(months)) {
      if (lower.includes(monthName)) {
        const dayMatch = cleaned.match(/(\d{1,2})/);
        const yearMatch = cleaned.match(/20\d{2}/);
        if (dayMatch && yearMatch) {
          const day = dayMatch[1].padStart(2, '0');
          const year = yearMatch[0];
          return `${year}-${monthNum}-${day}`;
        }
      }
    }
  } catch (error) {
    scraperLog.debug(LOG_PREFIX, `Date parse error: ${dateStr}`);
  }

  return new Date().toISOString().split('T')[0];
}

/**
 * Main scraper function for Al Dana Amphitheatre
 */
export async function scrapeAlDana(): Promise<ScrapedEvent[]> {
  scraperLog.info(LOG_PREFIX, 'Starting Al Dana Amphitheatre scraper...');
  const events: ScrapedEvent[] = [];
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Set proper bot user agent
    await page.setUserAgent(SCRAPER_CONFIG.userAgent);
    await page.setExtraHTTPHeaders(SCRAPER_CONFIG.headers);

    // Navigate to homepage
    scraperLog.info(LOG_PREFIX, `Loading ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: SCRAPER_CONFIG.timeout });

    // Wait for content to load
    await sleep(getRandomDelay(SCRAPER_CONFIG.delays.betweenPages));

    // === DEBUG: Log page content before extraction ===
    const pageDebug = await page.evaluate(() => {
      const debug: {
        h2Count: number;
        h2Texts: string[];
        allHeadings: string[];
        bodyTextPreview: string;
      } = {
        h2Count: 0,
        h2Texts: [],
        allHeadings: [],
        bodyTextPreview: '',
      };

      // Count h2 elements
      const h2s = document.querySelectorAll('h2');
      debug.h2Count = h2s.length;
      h2s.forEach(h2 => {
        const text = h2.textContent?.trim() || '';
        if (text.length > 0) {
          debug.h2Texts.push(text.substring(0, 100));
        }
      });

      // Also check h1, h3, h4 for comparison
      document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        const text = h.textContent?.trim() || '';
        if (text.length > 2 && text.length < 100) {
          debug.allHeadings.push(`${h.tagName}: ${text}`);
        }
      });

      // Get body text preview
      debug.bodyTextPreview = document.body.textContent?.replace(/\s+/g, ' ').trim().substring(0, 500) || '';

      return debug;
    });

    scraperLog.info(LOG_PREFIX, `=== PAGE DEBUG ===`);
    scraperLog.info(LOG_PREFIX, `Total h2 elements found: ${pageDebug.h2Count}`);
    scraperLog.info(LOG_PREFIX, `H2 texts: ${JSON.stringify(pageDebug.h2Texts)}`);
    scraperLog.info(LOG_PREFIX, `All headings: ${JSON.stringify(pageDebug.allHeadings.slice(0, 20))}`);
    scraperLog.info(LOG_PREFIX, `Body preview: ${pageDebug.bodyTextPreview.substring(0, 300)}...`);
    scraperLog.info(LOG_PREFIX, `=== END PAGE DEBUG ===`);

    // Extract events using page.evaluate with debug info
    const extractedEvents = await page.evaluate(() => {
      const results: Array<{
        title: string;
        date: string | null;
        image: string | null;
        buyLink: string | null;
        debug?: string;
      }> = [];

      // Skip these headings - they're not events
      const skipTitles = [
        'upcoming events', 'menu', 'social media', 'proud partner',
        'awards', 'certifications', 'be the first'
      ];

      // Find all h2 elements (event titles)
      const h2Elements = document.querySelectorAll('h2');

      // Debug log for each h2
      const debugLogs: string[] = [];

      h2Elements.forEach((h2, index) => {
        const title = h2.textContent?.trim();

        if (!title || title.length < 3) {
          debugLogs.push(`h2[${index}]: SKIP - empty or too short: "${title}"`);
          return;
        }

        // Skip non-event headings
        if (skipTitles.some(skip => title.toLowerCase().includes(skip))) {
          debugLogs.push(`h2[${index}]: SKIP - matches skipTitle: "${title}"`);
          return;
        }

        // Get parent container (div.bottom)
        const container = h2.parentElement;
        if (!container) {
          debugLogs.push(`h2[${index}]: SKIP - no parent: "${title}"`);
          return;
        }

        debugLogs.push(`h2[${index}]: PROCESSING: "${title}"`);

        // Find date - look for sibling element with date class or date pattern
        let date: string | null = null;
        let sibling = h2.nextElementSibling;
        let siblingCount = 0;
        while (sibling && siblingCount < 10) {
          const text = sibling.textContent?.trim();
          if (
            sibling.classList?.contains('date') ||
            text?.match(/\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/i)
          ) {
            date = text?.replace('Array', '').trim() || null;
            debugLogs.push(`  -> Found date: "${date}"`);
            break;
          }
          sibling = sibling.nextElementSibling;
          siblingCount++;
        }

        if (!date) {
          debugLogs.push(`  -> No date found after ${siblingCount} siblings`);
        }

        // Find buy link - look for platinumlist links in siblings
        let buyLink: string | null = null;
        sibling = h2.nextElementSibling;
        siblingCount = 0;
        while (sibling && siblingCount < 10) {
          const link = sibling.querySelector?.('a[href*="platinumlist"]') as HTMLAnchorElement | null;
          if (link) {
            buyLink = link.href;
            break;
          }
          if (sibling.tagName === 'A' && (sibling as HTMLAnchorElement).href?.includes('platinumlist')) {
            buyLink = (sibling as HTMLAnchorElement).href;
            break;
          }
          sibling = sibling.nextElementSibling;
          siblingCount++;
        }

        // Find image - look in grandparent container for picture element
        let image: string | null = null;
        const grandparent = container.parentElement;
        if (grandparent) {
          const picture = grandparent.querySelector('picture');
          if (picture) {
            const webpSource = picture.querySelector('source[type="image/webp"]') as HTMLSourceElement;
            const img = picture.querySelector('img') as HTMLImageElement;
            image = webpSource?.srcset || img?.src || null;
          }
          if (!image) {
            const img = grandparent.querySelector('img') as HTMLImageElement;
            image = img?.src || null;
          }
        }

        results.push({ title, date, image, buyLink, debug: `h2[${index}]` });
      });

      // Add debug logs to console for visibility
      (window as any).__aldanaDebugLogs = debugLogs;

      return results;
    });

    // Get debug logs from page
    const debugLogs = await page.evaluate(() => (window as any).__aldanaDebugLogs || []);
    scraperLog.info(LOG_PREFIX, `=== EXTRACTION DEBUG ===`);
    for (const log of debugLogs) {
      scraperLog.debug(LOG_PREFIX, log);
    }
    scraperLog.info(LOG_PREFIX, `=== END EXTRACTION DEBUG ===`);

    scraperLog.info(LOG_PREFIX, `Found ${extractedEvents.length} events on page`);

    // Process extracted events
    scraperLog.info(LOG_PREFIX, `=== PROCESSING ${extractedEvents.length} EXTRACTED EVENTS ===`);

    for (const extracted of extractedEvents) {
      scraperLog.debug(LOG_PREFIX, `Processing: "${extracted.title}" with raw date: "${extracted.date}"`);

      const parsedDate = parseDate(extracted.date || '');
      scraperLog.debug(LOG_PREFIX, `  -> Parsed date: ${parsedDate}`);

      // Skip past events
      const eventDate = new Date(parsedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      scraperLog.debug(LOG_PREFIX, `  -> Event date: ${eventDate.toISOString()}, Today: ${today.toISOString()}, Is past: ${eventDate < today}`);

      if (eventDate < today) {
        scraperLog.warn(LOG_PREFIX, `SKIPPING past event: ${extracted.title} (${parsedDate})`);
        continue;
      }

      // Create event object with correct Al Dana venue info
      const event: ScrapedEvent = {
        title: extracted.title,
        description: `Experience ${extracted.title} live at ${ALDANA_VENUE.name}, Bahrain's premier outdoor concert venue located at the Bahrain International Circuit in Sakhir.`,
        date: parsedDate,
        venue_name: ALDANA_VENUE.name,
        venue_address: ALDANA_VENUE.address,
        category: detectCategory(extracted.title),
        image_url: extracted.image || undefined,
        booking_url: extracted.buyLink || undefined,
        source_url: ALDANA_VENUE.website,
        source_name: SOURCE_NAME,
        source_event_id: generateEventId(extracted.title, parsedDate),
      };

      // Most Al Dana events are music/concerts
      if (event.category === 'other') {
        event.category = 'music';
      }

      events.push(event);
      scraperLog.success(LOG_PREFIX, `Scraped: ${event.title} (${parsedDate})`);
    }

    scraperLog.info(LOG_PREFIX, `Scraping complete. Found ${events.length} upcoming events.`);
    return events;

  } catch (error) {
    scraperLog.error(LOG_PREFIX, `Scraper error: ${(error as Error).message}`);
    return events;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export default scrapeAlDana;
