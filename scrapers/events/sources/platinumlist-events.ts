/**
 * Platinumlist Events Scraper
 * Scrapes events from https://manama.platinumlist.net/event-list
 * IMPORTANT: Always include booking_url - we promote, they sell tickets
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import * as cheerio from 'cheerio';
import { ScrapedEvent, SOURCE_NAMES } from '../types';
import { SCRAPER_CONFIG } from '../config';
import { mapSourceCategory, detectCategory } from '../utils/categorizer';
import { sleep, getRandomDelay, scraperLog } from '../utils/request-helper';

const BASE_URL = 'https://manama.platinumlist.net';
const EVENTS_URL = `${BASE_URL}/event-list`;
const SOURCE_NAME = SOURCE_NAMES.PLATINUMLIST_EVENTS;
const LOG_PREFIX = 'Platinumlist';

// Extract event ID from URL
function extractEventId(url: string): string {
  // URL format: /event-tickets/12345/event-name
  const match = url.match(/\/event-tickets\/(\d+)\//);
  if (match) {
    return `pl-${match[1]}`;
  }

  // Fall back to slug
  const slugMatch = url.match(/\/([^\/]+)\/?$/);
  if (slugMatch) {
    return `pl-${slugMatch[1]}`;
  }

  return `pl-${Date.now()}`;
}

// Parse Platinumlist date format
function parseDate(dateStr: string): { date: string; time?: string } {
  try {
    // Handle formats like "15 Jan 2025" or "Friday, January 15, 2025"
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return { date: date.toISOString().split('T')[0] };
    }

    // Manual parsing for edge cases
    const months: Record<string, string> = {
      jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
      jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
    };

    const lower = dateStr.toLowerCase();
    for (const [monthName, monthNum] of Object.entries(months)) {
      if (lower.includes(monthName)) {
        const dayMatch = dateStr.match(/(\d{1,2})/);
        const yearMatch = dateStr.match(/20\d{2}/);
        if (dayMatch) {
          const day = dayMatch[1].padStart(2, '0');
          const year = yearMatch ? yearMatch[0] : new Date().getFullYear().toString();
          return { date: `${year}-${monthNum}-${day}` };
        }
      }
    }
  } catch (error) {
    scraperLog.debug(LOG_PREFIX, `Date parse error: ${dateStr}`);
  }

  return { date: new Date().toISOString().split('T')[0] };
}

// Scrape event detail page
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

    // Get description
    const descriptionSelectors = [
      '.event-description',
      '.description-content',
      '.event-info p',
      '.content-section p',
      '[itemprop="description"]',
    ];

    for (const selector of descriptionSelectors) {
      const paragraphs: string[] = [];
      $(selector).each((i, el) => {
        const text = $(el).text().trim();
        if (text.length > 20) {
          paragraphs.push(text);
        }
      });

      if (paragraphs.length > 0) {
        details.description = paragraphs.join('\n\n');
        break;
      }
    }

    // Get venue
    const venueSelectors = [
      '.venue-name',
      '.event-venue',
      '.location-name',
      '[itemprop="location"]',
    ];

    for (const selector of venueSelectors) {
      const venue = $(selector).first().text().trim();
      if (venue && venue.length > 2) {
        details.venue_name = venue;
        break;
      }
    }

    // Get venue address
    const addressSelectors = [
      '.venue-address',
      '.location-address',
      '[itemprop="address"]',
    ];

    for (const selector of addressSelectors) {
      const address = $(selector).first().text().trim();
      if (address && address.length > 5) {
        details.venue_address = address;
        break;
      }
    }

    // Get time
    const timeSelectors = [
      '.event-time',
      '.show-time',
      '.start-time',
    ];

    for (const selector of timeSelectors) {
      const timeText = $(selector).first().text().trim();
      if (timeText) {
        const timeMatch = timeText.match(/(\d{1,2})[:\.]?(\d{2})?\s*(am|pm)?/i);
        if (timeMatch) {
          let hours = parseInt(timeMatch[1]);
          const minutes = timeMatch[2] || '00';
          const period = timeMatch[3]?.toLowerCase();

          if (period === 'pm' && hours < 12) hours += 12;
          if (period === 'am' && hours === 12) hours = 0;

          details.time = `${hours.toString().padStart(2, '0')}:${minutes}`;
          break;
        }
      }
    }

    // Get high-res image
    const imageSelectors = [
      '.event-banner img',
      '.hero-image img',
      '.event-image img',
      'meta[property="og:image"]',
    ];

    for (const selector of imageSelectors) {
      let img: string | undefined;

      if (selector.includes('meta')) {
        img = $(selector).attr('content');
      } else {
        img = $(selector).first().attr('src') || $(selector).first().attr('data-src');
      }

      if (img && (img.startsWith('http') || img.startsWith('//'))) {
        details.image_url = img.startsWith('//') ? `https:${img}` : img;
        break;
      }
    }

    // The booking URL is the event page itself on Platinumlist
    details.booking_url = eventUrl;

    return details;
  } catch (error) {
    scraperLog.error(LOG_PREFIX, `Detail page failed: ${eventUrl} - ${(error as Error).message}`);
    return { booking_url: eventUrl };
  }
}

/**
 * Main scraper function for Platinumlist Events
 */
export async function scrapePlatinumlistEvents(): Promise<ScrapedEvent[]> {
  scraperLog.info(LOG_PREFIX, 'Starting events scraper...');
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

    // Navigate to events list
    scraperLog.info(LOG_PREFIX, 'Loading events page...');
    await page.goto(EVENTS_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(getRandomDelay(SCRAPER_CONFIG.delays.betweenPages));

    // Scroll to load more content
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await sleep(1500);
    }

    const html = await page.content();
    const $ = cheerio.load(html);

    // Find event cards
    const eventSelectors = [
      '.event-card',
      '.event-item',
      '.event-box',
      '[data-event-id]',
      '.events-grid .card',
      'a[href*="/event-tickets/"]',
    ];

    let foundEvents = 0;

    for (const selector of eventSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        scraperLog.info(LOG_PREFIX, `Found ${elements.length} elements with selector: ${selector}`);

        elements.each((i, el) => {
          try {
            const $el = $(el);

            // Get link
            let link = $el.attr('href') || $el.find('a').first().attr('href');
            if (!link || !link.includes('/event-tickets/')) {
              // Try to find a link within the element
              const innerLink = $el.find('a[href*="/event-tickets/"]').first().attr('href');
              if (innerLink) link = innerLink;
            }

            if (!link) return;

            const fullUrl = link.startsWith('http') ? link : `${BASE_URL}${link}`;

            // Get title
            const title = $el.find('.event-title, .title, h2, h3, h4').first().text().trim() ||
                         $el.find('a').first().text().trim() ||
                         $el.attr('title') || '';

            if (!title || title.length < 3) return;

            // Get date
            const dateText = $el.find('.event-date, .date, time').first().text().trim();
            const { date: parsedDate } = dateText ? parseDate(dateText) : { date: new Date().toISOString().split('T')[0] };

            // Get image
            let image = $el.find('img').first().attr('src') ||
                       $el.find('img').first().attr('data-src') ||
                       $el.find('[style*="background-image"]').first().css('background-image');

            if (image) {
              // Clean up background-image URL
              image = image.replace(/url\(['"]?/, '').replace(/['"]?\)/, '');
              if (image.startsWith('//')) image = `https:${image}`;
            }

            // Get price
            const priceText = $el.find('.price, .event-price, .ticket-price').first().text().trim();

            // Get category
            const categoryText = $el.find('.category, .event-category, .genre').first().text().trim();

            // Get venue from card if available
            const venueText = $el.find('.venue, .location, .event-venue').first().text().trim();

            events.push({
              title,
              description: '', // Will be filled from detail page
              date: parsedDate,
              venue_name: venueText || 'Bahrain',
              category: categoryText ? mapSourceCategory(categoryText, SOURCE_NAME) : detectCategory(title),
              price: priceText || undefined,
              image_url: image || undefined,
              booking_url: fullUrl, // IMPORTANT: Link to buy tickets
              source_url: fullUrl,
              source_name: SOURCE_NAME,
              source_event_id: extractEventId(fullUrl),
            });

            foundEvents++;
            successCount++;
            scraperLog.success(LOG_PREFIX, `Scraped: ${title}`);
          } catch (error) {
            failCount++;
            scraperLog.error(LOG_PREFIX, `Failed to parse event card: ${(error as Error).message}`);
          }
        });

        if (foundEvents > 0) break;
      }
    }

    // If no events found with structured selectors, try direct link extraction
    if (events.length === 0) {
      scraperLog.warn(LOG_PREFIX, 'Trying direct link extraction...');

      $('a[href*="/event-tickets/"]').each((i, el) => {
        try {
          const $el = $(el);
          const href = $el.attr('href');
          if (!href) return;

          const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;
          const title = $el.text().trim() || $el.attr('title') || '';

          if (title && title.length > 3) {
            // Check for duplicates
            if (!events.find(e => e.source_url === fullUrl)) {
              events.push({
                title,
                description: '',
                date: new Date().toISOString().split('T')[0],
                venue_name: 'Bahrain',
                category: detectCategory(title),
                booking_url: fullUrl,
                source_url: fullUrl,
                source_name: SOURCE_NAME,
                source_event_id: extractEventId(fullUrl),
              });
              successCount++;
            }
          }
        } catch (error) {
          failCount++;
          scraperLog.error(LOG_PREFIX, `Failed to parse link: ${(error as Error).message}`);
        }
      });
    }

    scraperLog.info(LOG_PREFIX, `Found ${events.length} events from listing page`);

    // Scrape detail pages (limit per config)
    const eventsToScrape = events.slice(0, SCRAPER_CONFIG.maxDetailPages);

    for (let i = 0; i < eventsToScrape.length; i++) {
      const event = eventsToScrape[i];

      try {
        scraperLog.info(LOG_PREFIX, `Scraping detail ${i + 1}/${eventsToScrape.length}: ${event.title}`);

        const details = await scrapeEventDetail(page, event.source_url);

        // Merge details
        if (details.description) event.description = details.description;
        if (details.venue_name) event.venue_name = details.venue_name;
        if (details.venue_address) event.venue_address = details.venue_address;
        if (details.time) event.time = details.time;
        if (details.image_url) event.image_url = details.image_url;
        if (details.booking_url) event.booking_url = details.booking_url;

        // Update category based on full info
        if (!event.category || event.category === 'other') {
          event.category = detectCategory(event.title, event.description);
        }

        scraperLog.success(LOG_PREFIX, `Detail scraped: ${event.title}`);
      } catch (error) {
        scraperLog.error(LOG_PREFIX, `Detail scrape failed for ${event.title}: ${(error as Error).message}`);
        // Continue with next event
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

export default scrapePlatinumlistEvents;
