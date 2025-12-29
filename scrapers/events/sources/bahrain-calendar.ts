/**
 * Bahrain.com Calendar Scraper
 * Scrapes events from https://www.bahrain.com/en/bahrain-calendar
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import * as cheerio from 'cheerio';
import crypto from 'crypto';
import { ScrapedEvent, SOURCE_NAMES } from '../types';
import { SCRAPER_CONFIG } from '../config';
import { mapSourceCategory, detectCategory } from '../utils/categorizer';
import { sleep, getRandomDelay, scraperLog } from '../utils/request-helper';

const BASE_URL = 'https://www.bahrain.com';
const CALENDAR_PATH = '/en/bahrain-calendar';
const SOURCE_NAME = SOURCE_NAMES.BAHRAIN_CALENDAR;
const LOG_PREFIX = 'BahrainCalendar';

// Generate unique event ID from URL or title+date
function generateEventId(url: string, title: string, date: string): string {
  // Try to extract ID from URL first
  const urlMatch = url.match(/\/([a-z0-9-]+)\/?$/i);
  if (urlMatch) {
    return urlMatch[1];
  }

  // Fall back to hash of title + date
  const hash = crypto
    .createHash('md5')
    .update(`${title}-${date}`)
    .digest('hex')
    .substring(0, 12);
  return `bh-${hash}`;
}

// Parse date string to YYYY-MM-DD format
function parseDate(dateStr: string): string {
  try {
    // Handle formats like "15 January 2025", "Jan 15, 2025", etc.
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }

    // Try to extract date parts manually
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

    const lower = dateStr.toLowerCase();
    for (const [monthName, monthNum] of Object.entries(months)) {
      if (lower.includes(monthName)) {
        const dayMatch = dateStr.match(/(\d{1,2})/);
        const yearMatch = dateStr.match(/20\d{2}/);
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

  // Fall back to today's date
  return new Date().toISOString().split('T')[0];
}

// Parse time string to HH:MM format
function parseTime(timeStr: string): string | undefined {
  if (!timeStr) return undefined;

  try {
    const timeMatch = timeStr.match(/(\d{1,2})[:\.]?(\d{2})?\s*(am|pm)?/i);

    if (timeMatch) {
      let hours = parseInt(timeMatch[1]);
      const minutes = timeMatch[2] || '00';
      const period = timeMatch[3]?.toLowerCase();

      if (period === 'pm' && hours < 12) hours += 12;
      if (period === 'am' && hours === 12) hours = 0;

      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
  } catch (error) {
    scraperLog.debug(LOG_PREFIX, `Time parse error: ${timeStr}`);
  }

  return undefined;
}

// Scrape event detail page with error handling
async function scrapeEventDetail(
  page: Page,
  eventUrl: string
): Promise<Partial<ScrapedEvent>> {
  try {
    // Rate limiting delay
    await sleep(getRandomDelay(SCRAPER_CONFIG.delays.betweenRequests));

    await page.goto(eventUrl, { waitUntil: 'networkidle2', timeout: SCRAPER_CONFIG.timeout });
    await sleep(1000);

    const html = await page.content();
    const $ = cheerio.load(html);

    const details: Partial<ScrapedEvent> = {};

    // Try various selectors for description
    const descriptionSelectors = [
      '.event-description',
      '.event-content',
      '.description',
      '.content',
      '[itemprop="description"]',
      'article p',
      '.event-details p',
    ];

    for (const selector of descriptionSelectors) {
      const desc = $(selector).first().text().trim();
      if (desc && desc.length > 50) {
        details.description = desc;
        break;
      }
    }

    // Try to get venue
    const venueSelectors = [
      '.venue-name',
      '.location',
      '[itemprop="location"]',
      '.event-location',
    ];

    for (const selector of venueSelectors) {
      const venue = $(selector).first().text().trim();
      if (venue && venue.length > 2) {
        details.venue_name = venue;
        break;
      }
    }

    // Try to get time
    const timeSelectors = [
      '.event-time',
      '.time',
      '[itemprop="startDate"]',
      '.start-time',
    ];

    for (const selector of timeSelectors) {
      const time = $(selector).first().text().trim();
      if (time) {
        details.time = parseTime(time);
        break;
      }
    }

    // Try to get price
    const priceSelectors = [
      '.price',
      '.event-price',
      '.ticket-price',
      '[itemprop="price"]',
    ];

    for (const selector of priceSelectors) {
      const price = $(selector).first().text().trim();
      if (price) {
        details.price = price;
        break;
      }
    }

    // Try to get larger image
    const imageSelectors = [
      '.event-image img',
      '.hero-image img',
      '.featured-image img',
      'article img',
      '[itemprop="image"]',
    ];

    for (const selector of imageSelectors) {
      const img = $(selector).first().attr('src');
      if (img && img.startsWith('http')) {
        details.image_url = img;
        break;
      }
    }

    return details;
  } catch (error) {
    scraperLog.error(LOG_PREFIX, `Detail page failed: ${eventUrl} - ${(error as Error).message}`);
    return {};
  }
}

/**
 * Main scraper function for Bahrain.com Calendar
 */
export async function scrapeBahrainCalendar(): Promise<ScrapedEvent[]> {
  scraperLog.info(LOG_PREFIX, 'Starting scraper...');
  const events: ScrapedEvent[] = [];
  let browser: Browser | null = null;
  let successCount = 0;
  let failCount = 0;

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

    // Set extra headers
    await page.setExtraHTTPHeaders(SCRAPER_CONFIG.headers);

    // Navigate to calendar page
    scraperLog.info(LOG_PREFIX, 'Loading calendar page...');
    await page.goto(`${BASE_URL}${CALENDAR_PATH}`, { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(getRandomDelay(SCRAPER_CONFIG.delays.betweenPages));

    // Wait for initial content to load
    await sleep(3000);

    // Scroll multiple times to trigger AJAX loading of more content
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await sleep(2000);
    }

    // Wait for any remaining AJAX requests
    await sleep(2000);

    const html = await page.content();
    const $ = cheerio.load(html);

    // Try various selectors for event cards
    // The actual site uses .item containers within #article-list
    const eventSelectors = [
      '#article-list .item',
      '.item',
      '.event-card',
      '.event-item',
      '.calendar-event',
      '[data-event]',
      '.events-list article',
      '.event-listing',
    ];

    let eventElements: ReturnType<typeof $> | null = null;
    for (const selector of eventSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        scraperLog.info(LOG_PREFIX, `Found ${elements.length} events with selector: ${selector}`);
        eventElements = elements;
        break;
      }
    }

    if (!eventElements || eventElements.length === 0) {
      scraperLog.warn(LOG_PREFIX, 'No events found with standard selectors. Trying generic link extraction...');

      // Fall back to finding any links that look like events
      $('a[href*="/event/"], a[href*="/calendar/"]').each((i, el) => {
        try {
          const $el = $(el);
          const href = $el.attr('href');
          const title = $el.text().trim() || $el.attr('title') || '';

          if (title && title.length > 5 && href) {
            const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

            events.push({
              title,
              description: '',
              date: new Date().toISOString().split('T')[0],
              venue_name: 'Bahrain',
              category: 'other',
              source_url: fullUrl,
              source_name: SOURCE_NAME,
              source_event_id: generateEventId(fullUrl, title, ''),
            });
            successCount++;
          }
        } catch (error) {
          failCount++;
          scraperLog.error(LOG_PREFIX, `Failed to parse event link: ${(error as Error).message}`);
        }
      });
    } else {
      eventElements.each((i, el) => {
        try {
          const $el = $(el);

          // Extract basic info - try multiple selectors
          const title = $el.find('h4, h3, h2, .event-title, .title').first().text().trim() ||
                       $el.find('a').first().text().trim();

          // Try to get date from various locations
          const dateText = $el.find('span').filter((i, span) => {
            const text = $(span).text();
            return /\d{1,2}\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(text) ||
                   /20\d{2}/.test(text);
          }).first().text().trim() || $el.find('.event-date, .date, time').first().text().trim();

          // Get link from anchor tag
          const link = $el.find('a').first().attr('href');

          // Get image from img tag or background
          let image = $el.find('img').first().attr('src') || $el.find('img').first().attr('data-src');

          // Try to get data from favorite button data attributes
          const favoriteBtn = $el.find('.favorite-btn, [data-url]');
          if (favoriteBtn.length) {
            if (!image) {
              image = favoriteBtn.attr('data-image');
            }
          }

          // Get category text
          const category = $el.find('.category, .event-category, span').filter((i, span) => {
            const text = $(span).text().trim().toLowerCase();
            return ['sports', 'entertainment', 'music', 'arts', 'family', 'cultural', 'dining'].some(c => text.includes(c));
          }).first().text().trim();

          if (title && title.length > 3) {
            const fullUrl = link
              ? (link.startsWith('http') ? link : `${BASE_URL}${link}`)
              : `${BASE_URL}${CALENDAR_PATH}`;

            const parsedDate = dateText ? parseDate(dateText) : new Date().toISOString().split('T')[0];

            events.push({
              title,
              description: '',
              date: parsedDate,
              venue_name: 'Bahrain',
              category: category ? mapSourceCategory(category, SOURCE_NAME) : 'other',
              image_url: image,
              source_url: fullUrl,
              source_name: SOURCE_NAME,
              source_event_id: generateEventId(fullUrl, title, parsedDate),
            });
            successCount++;
            scraperLog.success(LOG_PREFIX, `Scraped: ${title}`);
          }
        } catch (error) {
          failCount++;
          scraperLog.error(LOG_PREFIX, `Failed to parse event card: ${(error as Error).message}`);
        }
      });
    }

    scraperLog.info(LOG_PREFIX, `Found ${events.length} events from listing page`);

    // Scrape detail pages for more info (limit per config)
    const eventsToScrape = events.slice(0, SCRAPER_CONFIG.maxDetailPages);

    for (let i = 0; i < eventsToScrape.length; i++) {
      const event = eventsToScrape[i];

      try {
        scraperLog.info(LOG_PREFIX, `Scraping detail ${i + 1}/${eventsToScrape.length}: ${event.title}`);

        const details = await scrapeEventDetail(page, event.source_url);

        // Merge details into event
        if (details.description) event.description = details.description;
        if (details.venue_name) event.venue_name = details.venue_name;
        if (details.time) event.time = details.time;
        if (details.price) event.price = details.price;
        if (details.image_url) event.image_url = details.image_url;

        // Auto-detect category if not set
        if (!event.category || event.category === 'other') {
          event.category = detectCategory(event.title, event.description);
        }

        scraperLog.success(LOG_PREFIX, `Detail scraped: ${event.title}`);
      } catch (error) {
        scraperLog.error(LOG_PREFIX, `Detail scrape failed for ${event.title}: ${(error as Error).message}`);
        // Continue with next event - don't stop the whole scraper
      }
    }

    scraperLog.info(LOG_PREFIX, `Scraping complete. ${successCount} succeeded, ${failCount} failed.`);
    return events;
  } catch (error) {
    scraperLog.error(LOG_PREFIX, `Scraper error: ${(error as Error).message}`);
    return events; // Return whatever we got so far
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export default scrapeBahrainCalendar;
