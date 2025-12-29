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
const VENUE_NAME = 'Al Dana Amphitheatre';
const VENUE_ADDRESS = 'Bahrain Bay, Manama, Bahrain';
const LOG_PREFIX = 'AlDana';

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

    // Extract events using page.evaluate
    const extractedEvents = await page.evaluate(() => {
      const results: Array<{
        title: string;
        date: string | null;
        image: string | null;
        buyLink: string | null;
      }> = [];

      // Skip these headings - they're not events
      const skipTitles = [
        'upcoming events', 'menu', 'social media', 'proud partner',
        'awards', 'certifications', 'be the first'
      ];

      // Find all h2 elements (event titles)
      const h2Elements = document.querySelectorAll('h2');

      h2Elements.forEach(h2 => {
        const title = h2.textContent?.trim();
        if (!title || title.length < 3) return;

        // Skip non-event headings
        if (skipTitles.some(skip => title.toLowerCase().includes(skip))) return;

        // Get parent container (div.bottom)
        const container = h2.parentElement;
        if (!container) return;

        // Find date - look for sibling element with date class or date pattern
        let date: string | null = null;
        let sibling = h2.nextElementSibling;
        while (sibling) {
          const text = sibling.textContent?.trim();
          if (
            sibling.classList?.contains('date') ||
            text?.match(/\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/i)
          ) {
            date = text?.replace('Array', '').trim() || null;
            break;
          }
          sibling = sibling.nextElementSibling;
        }

        // Find buy link - look for platinumlist links in siblings
        let buyLink: string | null = null;
        sibling = h2.nextElementSibling;
        while (sibling) {
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

        results.push({ title, date, image, buyLink });
      });

      return results;
    });

    scraperLog.info(LOG_PREFIX, `Found ${extractedEvents.length} events on page`);

    // Process extracted events
    for (const extracted of extractedEvents) {
      const parsedDate = parseDate(extracted.date || '');

      // Skip past events
      const eventDate = new Date(parsedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        scraperLog.debug(LOG_PREFIX, `Skipping past event: ${extracted.title}`);
        continue;
      }

      // Create event object
      const event: ScrapedEvent = {
        title: extracted.title,
        description: `Experience ${extracted.title} live at ${VENUE_NAME}, Bahrain's premier outdoor concert venue.`,
        date: parsedDate,
        venue_name: VENUE_NAME,
        venue_address: VENUE_ADDRESS,
        category: detectCategory(extracted.title),
        image_url: extracted.image || undefined,
        booking_url: extracted.buyLink || undefined,
        source_url: BASE_URL,
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
