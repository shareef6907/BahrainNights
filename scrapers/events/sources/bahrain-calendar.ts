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

    // The Bahrain Calendar page displays events as links in the "All Events" section
    // Each link contains: title, date range (e.g., "Oct 03 2025 May 19 2026"), optional "Ticketed" text
    // Example link text: "Batelco Fitness on Track Oct 03 2025 May 19 2026 Ticketed"
    // The links have slugs like /batelco-fitness-on-track

    scraperLog.info(LOG_PREFIX, 'Searching for event links on page...');

    // Pattern to match date ranges in the link text: "Mon DD YYYY"
    const datePattern = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{1,2}\s+\d{4}/gi;

    // Find all links that look like event pages (have slug-like hrefs and contain dates)
    const eventLinks = $('a').filter((i, el): boolean => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();

      // Must have a slug-like href (not navigation, not external)
      const isSlugLink = Boolean(href.match(/^\/[a-z0-9-]+$/) || href.match(/^https?:\/\/www\.bahrain\.com\/[a-z0-9-]+$/));

      // Must contain dates in the text
      const hasDate = datePattern.test(text);
      datePattern.lastIndex = 0; // Reset regex

      // Filter out navigation links
      const isNavigation = ['home', 'about', 'contact', 'menu', 'bahrain-calendar'].some(nav =>
        href.toLowerCase().includes(nav)
      );

      return isSlugLink && hasDate && !isNavigation && text.length > 10;
    });

    scraperLog.info(LOG_PREFIX, `Found ${eventLinks.length} potential event links`);

    eventLinks.each((i, el) => {
      try {
        const $el = $(el);
        const href = $el.attr('href') || '';
        const fullText = $el.text().trim();

        // Extract dates from the text
        const dates: string[] = [];
        let match;
        const regex = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{1,2}\s+\d{4}/gi;
        while ((match = regex.exec(fullText)) !== null) {
          dates.push(match[0]);
        }

        // Parse start date (first date found)
        const startDateStr = dates[0] || '';
        const parsedDate = startDateStr ? parseDate(startDateStr) : new Date().toISOString().split('T')[0];

        // Extract title by removing dates and "Ticketed" from the text
        let title = fullText;
        dates.forEach(date => {
          title = title.replace(date, '');
        });
        title = title.replace(/ticketed/gi, '').trim();

        // Check if it's a ticketed event
        const isTicketed = /ticketed/i.test(fullText);

        // Get image if there's an img inside the link
        const image = $el.find('img').first().attr('src') || $el.find('img').first().attr('data-src');

        // Build full URL
        const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

        if (title && title.length > 3) {
          events.push({
            title,
            description: '',
            date: parsedDate,
            venue_name: 'Bahrain',
            category: 'other',
            price: isTicketed ? 'Ticketed' : 'Free',
            image_url: image,
            source_url: fullUrl,
            source_name: SOURCE_NAME,
            source_event_id: generateEventId(fullUrl, title, parsedDate),
          });
          successCount++;
          scraperLog.success(LOG_PREFIX, `Scraped: ${title} (${parsedDate})`);
        }
      } catch (error) {
        failCount++;
        scraperLog.error(LOG_PREFIX, `Failed to parse event link: ${(error as Error).message}`);
      }
    });

    // If the above didn't work, try a broader approach
    if (events.length === 0) {
      scraperLog.warn(LOG_PREFIX, 'No events found with date-based filtering. Trying broader link extraction...');

      // Look for any internal links with slug-like URLs
      $('a[href^="/"]').each((i, el) => {
        try {
          const $el = $(el);
          const href = $el.attr('href') || '';
          const text = $el.text().trim();

          // Skip navigation and common pages
          const skipPatterns = ['/en/', '/ar/', 'calendar', 'home', 'about', 'contact', 'privacy', 'terms'];
          if (skipPatterns.some(p => href.toLowerCase().includes(p))) return;

          // Must be a simple slug
          if (!href.match(/^\/[a-z0-9-]+$/)) return;

          // Must have reasonable text length
          if (text.length < 5 || text.length > 200) return;

          const fullUrl = `${BASE_URL}${href}`;

          events.push({
            title: text,
            description: '',
            date: new Date().toISOString().split('T')[0],
            venue_name: 'Bahrain',
            category: 'other',
            source_url: fullUrl,
            source_name: SOURCE_NAME,
            source_event_id: generateEventId(fullUrl, text, ''),
          });
          successCount++;
        } catch (error) {
          failCount++;
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
