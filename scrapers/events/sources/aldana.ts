/**
 * Al Dana Amphitheatre Scraper
 * Scrapes events from https://www.beyonaldana.com.bh/
 * All events at this venue - concerts, festivals, shows
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import * as cheerio from 'cheerio';
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

// Generate event ID from URL or title
function generateEventId(url: string, title: string): string {
  const urlMatch = url.match(/\/([^\\/]+)\/?$/);
  if (urlMatch && urlMatch[1].length > 5) {
    return `aldana-${urlMatch[1]}`;
  }

  const hash = crypto
    .createHash('md5')
    .update(title)
    .digest('hex')
    .substring(0, 12);
  return `aldana-${hash}`;
}

// Parse date from various formats
function parseDate(dateStr: string): { date: string; time?: string; endDate?: string } {
  try {
    // Handle date ranges like "15 - 17 January 2025"
    const rangeMatch = dateStr.match(/(\d{1,2})\s*[-–]\s*(\d{1,2})\s+(\w+)\s+(\d{4})/);
    if (rangeMatch) {
      const startDay = rangeMatch[1].padStart(2, '0');
      const endDay = rangeMatch[2].padStart(2, '0');
      const monthYear = `${rangeMatch[3]} ${rangeMatch[4]}`;
      const startDate = new Date(`${startDay} ${monthYear}`);
      const endDate = new Date(`${endDay} ${monthYear}`);

      if (!isNaN(startDate.getTime())) {
        return {
          date: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        };
      }
    }

    // Handle single date "15 January 2025" or "January 15, 2025"
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return { date: date.toISOString().split('T')[0] };
    }

    // Manual parsing
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

// Parse time
function parseTime(timeStr: string): string | undefined {
  if (!timeStr) return undefined;

  const timeMatch = timeStr.match(/(\d{1,2})[:\.]?(\d{2})?\s*(am|pm)?/i);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1]);
    const minutes = timeMatch[2] || '00';
    const period = timeMatch[3]?.toLowerCase();

    if (period === 'pm' && hours < 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  return undefined;
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
      '.show-description',
      '.content-section p',
      '.event-content p',
      '.event-details p',
      'article p',
      '.description',
    ];

    for (const selector of descriptionSelectors) {
      const paragraphs: string[] = [];
      $(selector).each((i, el) => {
        const text = $(el).text().trim();
        if (text.length > 30) {
          paragraphs.push(text);
        }
      });

      if (paragraphs.length > 0) {
        details.description = paragraphs.slice(0, 4).join('\n\n');
        break;
      }
    }

    // Get time
    const timeSelectors = [
      '.event-time',
      '.show-time',
      '.start-time',
      '.doors-open',
    ];

    for (const selector of timeSelectors) {
      const timeText = $(selector).first().text().trim();
      if (timeText) {
        details.time = parseTime(timeText);
        if (details.time) break;
      }
    }

    // Get price
    const priceSelectors = [
      '.ticket-price',
      '.price-range',
      '.tickets-from',
      '.price',
    ];

    for (const selector of priceSelectors) {
      const price = $(selector).first().text().trim();
      if (price) {
        details.price = price;
        break;
      }
    }

    // Get high-res image
    const imageSelectors = [
      '.event-banner img',
      '.hero-image img',
      '.event-poster img',
      '.show-image img',
      'meta[property="og:image"]',
      '.featured-image img',
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

    // Look for booking URL
    const bookingSelectors = [
      'a[href*="ticket"]',
      'a[href*="book"]',
      '.buy-tickets',
      '.get-tickets',
      '.cta-button a',
    ];

    for (const selector of bookingSelectors) {
      const bookingLink = $(selector).first().attr('href');
      if (bookingLink && bookingLink.startsWith('http')) {
        details.booking_url = bookingLink;
        break;
      }
    }

    // If no external booking URL found, use the event page
    if (!details.booking_url) {
      details.booking_url = eventUrl;
    }

    return details;
  } catch (error) {
    scraperLog.error(LOG_PREFIX, `Detail page failed: ${eventUrl} - ${(error as Error).message}`);
    return { booking_url: eventUrl };
  }
}

/**
 * Main scraper function for Al Dana Amphitheatre
 */
export async function scrapeAlDana(): Promise<ScrapedEvent[]> {
  scraperLog.info(LOG_PREFIX, 'Starting Al Dana Amphitheatre scraper...');
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

    // Try multiple possible URLs for events
    const possibleUrls = [
      BASE_URL,
      `${BASE_URL}/events`,
      `${BASE_URL}/shows`,
      `${BASE_URL}/upcoming`,
      `${BASE_URL}/whats-on`,
    ];

    for (const url of possibleUrls) {
      scraperLog.info(LOG_PREFIX, `Trying URL: ${url}`);

      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: SCRAPER_CONFIG.timeout });
        await sleep(getRandomDelay(SCRAPER_CONFIG.delays.betweenPages));

        // Scroll to load content
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await sleep(1500);

        const html = await page.content();
        const $ = cheerio.load(html);

        // Try various selectors for event cards
        const eventSelectors = [
          '.event-card',
          '.show-card',
          '.event-item',
          '.upcoming-event',
          '[data-event]',
          '.events-grid article',
          '.shows-list article',
          'a[href*="/event/"]',
          'a[href*="/show/"]',
        ];

        for (const selector of eventSelectors) {
          const elements = $(selector);
          if (elements.length > 0) {
            scraperLog.info(LOG_PREFIX, `Found ${elements.length} elements with selector: ${selector}`);

            elements.each((i, el) => {
              try {
                const $el = $(el);

                // Get link
                let link = $el.attr('href') || $el.find('a').first().attr('href');
                if (!link) return;

                const fullUrl = link.startsWith('http') ? link : `${BASE_URL}${link}`;

                // Get title
                const title = $el.find('.event-title, .show-title, h2, h3, h4').first().text().trim() ||
                             $el.find('a').first().text().trim() ||
                             $el.attr('title') || '';

                if (!title || title.length < 3) return;

                // Get date
                const dateText = $el.find('.event-date, .show-date, .date, time').first().text().trim();
                const { date: parsedDate, endDate } = dateText ? parseDate(dateText) : { date: new Date().toISOString().split('T')[0] };

                // Get image
                let image = $el.find('img').first().attr('src') ||
                           $el.find('img').first().attr('data-src');

                if (image) {
                  if (image.startsWith('//')) image = `https:${image}`;
                  else if (image.startsWith('/')) image = `${BASE_URL}${image}`;
                }

                // Get price
                const priceText = $el.find('.price, .ticket-price').first().text().trim();

                // Check for duplicate
                if (events.find(e => e.source_url === fullUrl)) return;

                const event: ScrapedEvent = {
                  title,
                  description: '',
                  date: parsedDate,
                  venue_name: VENUE_NAME,
                  venue_address: VENUE_ADDRESS,
                  category: detectCategory(title), // Will be refined with description
                  price: priceText || undefined,
                  image_url: image || undefined,
                  source_url: fullUrl,
                  source_name: SOURCE_NAME,
                  source_event_id: generateEventId(fullUrl, title),
                };

                if (endDate) {
                  event.end_date = endDate;
                }

                events.push(event);
                successCount++;
                scraperLog.success(LOG_PREFIX, `Scraped: ${title}`);
              } catch (error) {
                failCount++;
                scraperLog.error(LOG_PREFIX, `Failed to parse event card: ${(error as Error).message}`);
              }
            });

            if (events.length > 0) break;
          }
        }

        if (events.length > 0) break;

      } catch (error) {
        scraperLog.warn(LOG_PREFIX, `Failed to load ${url}: ${(error as Error).message}`);
        continue;
      }
    }

    // If no structured events found, try to find any event links
    if (events.length === 0) {
      scraperLog.warn(LOG_PREFIX, 'Trying generic event link extraction...');

      const html = await page.content();
      const $ = cheerio.load(html);

      $('a').each((i, el) => {
        try {
          const href = $(el).attr('href') || '';
          const text = $(el).text().trim();

          // Look for links that might be events
          if (href.includes('/event') || href.includes('/show') || href.includes('/concert')) {
            const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;

            if (text && text.length > 3 && !events.find(e => e.source_url === fullUrl)) {
              events.push({
                title: text,
                description: '',
                date: new Date().toISOString().split('T')[0],
                venue_name: VENUE_NAME,
                venue_address: VENUE_ADDRESS,
                category: detectCategory(text),
                source_url: fullUrl,
                source_name: SOURCE_NAME,
                source_event_id: generateEventId(fullUrl, text),
              });
              successCount++;
            }
          }
        } catch (error) {
          failCount++;
        }
      });
    }

    scraperLog.info(LOG_PREFIX, `Found ${events.length} events from listing`);

    // Scrape detail pages (limit per config)
    const eventsToScrape = events.slice(0, SCRAPER_CONFIG.maxDetailPages);

    for (let i = 0; i < eventsToScrape.length; i++) {
      const event = eventsToScrape[i];

      try {
        scraperLog.info(LOG_PREFIX, `Scraping detail ${i + 1}/${eventsToScrape.length}: ${event.title}`);

        const details = await scrapeEventDetail(page, event.source_url);

        // Merge details
        if (details.description) event.description = details.description;
        if (details.time) event.time = details.time;
        if (details.price) event.price = details.price;
        if (details.image_url) event.image_url = details.image_url;
        if (details.booking_url) event.booking_url = details.booking_url;

        // Update category with description context
        if (event.description) {
          const detectedCategory = detectCategory(event.title, event.description);
          // Al Dana is mostly music/concerts
          if (detectedCategory === 'other') {
            event.category = 'music';
          } else {
            event.category = detectedCategory;
          }
        } else {
          // Default to music for Al Dana events
          event.category = 'music';
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

export default scrapeAlDana;
