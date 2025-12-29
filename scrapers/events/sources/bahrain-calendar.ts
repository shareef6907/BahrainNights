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

    // Try various selectors for description - Bahrain.com uses .events-description-wrapper
    // First try the specific Bahrain.com selector
    const descWrapper = $('.events-description-wrapper').first();
    if (descWrapper.length > 0) {
      // Get all text from h4 and p elements
      const descParts: string[] = [];
      descWrapper.find('h4').each((i, el) => {
        const text = $(el).text().trim();
        if (text) descParts.push(text);
      });
      descWrapper.find('p').each((i, el) => {
        const text = $(el).text().trim();
        if (text) descParts.push(text);
      });
      if (descParts.length > 0) {
        details.description = descParts.join('\n\n');
        scraperLog.debug(LOG_PREFIX, `Found description from events-description-wrapper: ${details.description.substring(0, 100)}...`);
      }
    }

    // Fallback to generic selectors
    if (!details.description) {
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
    }

    // Try to get venue - Bahrain.com uses .__venuedetail .__lists with icon-location
    // The structure is: <div class="__lists"><span class="icon-location"></span>Venue Name</div>
    const venueFromDetail = $('.__venuedetail .__lists').filter((i, el) => {
      return $(el).find('.icon-location').length > 0;
    }).first().text().trim();

    if (venueFromDetail && venueFromDetail.length > 2) {
      details.venue_name = venueFromDetail;
      scraperLog.debug(LOG_PREFIX, `Found venue from __venuedetail: ${venueFromDetail}`);
    } else {
      // Fallback to generic selectors
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
    }

    // Try to get time - Bahrain.com uses .status-time-wrapper h6
    const timeFromWrapper = $('.status-time-wrapper h6').first().text().trim();
    if (timeFromWrapper && timeFromWrapper.length > 0) {
      // Time could be in format "06:00 AM - 10:00 PM" or "From 6:00 AM to 10:00 AM"
      details.time = timeFromWrapper;
      scraperLog.debug(LOG_PREFIX, `Found time from status-time-wrapper: ${timeFromWrapper}`);
    } else {
      // Fallback to generic selectors
      const timeSelectors = [
        '.event-time',
        '.time',
        '[itemprop="startDate"]',
        '.start-time',
      ];

      for (const selector of timeSelectors) {
        const time = $(selector).first().text().trim();
        if (time) {
          details.time = time;
          break;
        }
      }
    }

    // Try to get price/ticket info - Bahrain.com uses .__venuedetail .__lists with icon-ticket-2
    const ticketFromDetail = $('.__venuedetail .__lists').filter((i, el) => {
      return $(el).find('.icon-ticket-2').length > 0;
    }).first().text().trim();

    if (ticketFromDetail && ticketFromDetail.length > 2) {
      details.price = ticketFromDetail;
      scraperLog.debug(LOG_PREFIX, `Found ticket info from __venuedetail: ${ticketFromDetail}`);
    } else {
      // Fallback to generic selectors
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
    }

    // Try to get larger image - Bahrain.com uses .events-image-slider-wrapper with source/picture elements
    // Try the event slider first
    const sliderImage = $('.events-image-slider-wrapper source').first().attr('srcset') ||
                        $('.events-image-slider-wrapper img').first().attr('src');
    if (sliderImage && sliderImage.startsWith('http')) {
      details.image_url = sliderImage;
      scraperLog.debug(LOG_PREFIX, `Found image from events-image-slider-wrapper: ${sliderImage}`);
    }

    // Also check for data-image attributes on favorite buttons
    if (!details.image_url) {
      const dataImage = $('[data-image]').first().attr('data-image');
      if (dataImage && dataImage.startsWith('http')) {
        details.image_url = dataImage;
        scraperLog.debug(LOG_PREFIX, `Found image from data-image attribute: ${dataImage}`);
      }
    }

    // Fallback to generic selectors
    if (!details.image_url) {
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

    // === DEBUG: Log page structure ===
    scraperLog.info(LOG_PREFIX, `Page HTML length: ${html.length} characters`);

    // Log body text preview
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 500);
    scraperLog.info(LOG_PREFIX, `Body text preview: ${bodyText}...`);

    // Log sample of all links on page
    const allLinks: { href: string; text: string }[] = [];
    $('a').each((i, el) => {
      if (i < 30) { // First 30 links
        const href = $(el).attr('href') || '';
        const text = $(el).text().trim().substring(0, 80);
        if (text.length > 3) {
          allLinks.push({ href, text });
        }
      }
    });
    scraperLog.info(LOG_PREFIX, `Sample links on page (first 30 with text):`);
    allLinks.forEach((link, i) => {
      scraperLog.debug(LOG_PREFIX, `  [${i}] href="${link.href}" text="${link.text}"`);
    });

    // Check for specific page elements
    const hasArticleList = $('#article-list').length > 0;
    const hasEventSection = $('[class*="event"]').length;
    const hasCalendarSection = $('[class*="calendar"]').length;
    scraperLog.info(LOG_PREFIX, `Page elements: #article-list=${hasArticleList}, [class*=event]=${hasEventSection}, [class*=calendar]=${hasCalendarSection}`);
    // === END DEBUG ===

    // The Bahrain Calendar page displays events as links in the "All Events" section
    // Each link contains: title, date range (e.g., "Oct 03 2025 May 19 2026"), optional "Ticketed" text
    // Example link text: "Batelco Fitness on Track Oct 03 2025 May 19 2026 Ticketed"
    // The links have slugs like /batelco-fitness-on-track

    scraperLog.info(LOG_PREFIX, 'Searching for event links on page...');

    // Pattern to match date ranges in the link text: "Mon DD YYYY"
    const datePattern = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{1,2}\s+\d{4}/gi;

    // Find all links that look like event pages (have slug-like hrefs and contain dates)
    let debugLinksChecked = 0;
    let debugSlugMatches = 0;
    let debugDateMatches = 0;

    const eventLinks = $('a').filter((i, el): boolean => {
      const href = $(el).attr('href') || '';
      const text = $(el).text().trim();
      debugLinksChecked++;

      // Must have a slug-like href (not navigation, not external)
      // URLs can be: /event-slug, event-slug, or https://www.bahrain.com/event-slug
      const isSlugLink = Boolean(
        href.match(/^\/[a-z0-9-]+$/) ||           // /event-slug
        href.match(/^[a-z0-9][a-z0-9-]*$/) ||     // event-slug (no leading /)
        href.match(/^https?:\/\/www\.bahrain\.com\/[a-z0-9-]+$/)  // full URL
      );
      if (isSlugLink) debugSlugMatches++;

      // Must contain dates in the text
      const hasDate = datePattern.test(text);
      datePattern.lastIndex = 0; // Reset regex
      if (hasDate) debugDateMatches++;

      // Filter out navigation links and non-event pages
      const skipPatterns = [
        'home', 'about', 'contact', 'menu', 'bahrain-calendar',
        'javascript:', 'void(0)', 'search', 'visa', 'favourites',
        'interactive-map', '#', 'tel:', 'mailto:'
      ];
      const isNavigation = skipPatterns.some(nav =>
        href.toLowerCase().includes(nav)
      );

      // Debug: Log promising links (slug matches or date matches)
      if ((isSlugLink || hasDate) && text.length > 10 && i < 20) {
        scraperLog.debug(LOG_PREFIX, `  Candidate link: slug=${isSlugLink}, date=${hasDate}, nav=${isNavigation}, href="${href.substring(0, 50)}", text="${text.substring(0, 60)}"`);
      }

      return isSlugLink && hasDate && !isNavigation && text.length > 10;
    });

    scraperLog.info(LOG_PREFIX, `Link filtering stats: checked=${debugLinksChecked}, slugMatches=${debugSlugMatches}, dateMatches=${debugDateMatches}`);

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

        // Parse start date (first date found) and end date (second date if exists)
        const startDateStr = dates[0] || '';
        const endDateStr = dates[1] || dates[0] || '';
        const parsedDate = startDateStr ? parseDate(startDateStr) : new Date().toISOString().split('T')[0];
        const parsedEndDate = endDateStr ? parseDate(endDateStr) : parsedDate;

        // For multi-day/ongoing events, use the END date to determine if event is still valid
        // This prevents filtering out events that started in the past but are still running
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventEndDate = new Date(parsedEndDate);
        const isOngoing = eventEndDate >= today;

        // Extract title by removing dates, times, categories, and "Ticketed" from the text
        let title = fullText;

        // Remove dates
        dates.forEach(date => {
          title = title.replace(new RegExp(date.replace(/\s+/g, '\\s+'), 'gi'), '');
        });

        // Remove time patterns like "07:15 PM - 11:45 PM" or "10:00 AM"
        title = title.replace(/\d{1,2}:\d{2}\s*(AM|PM)?\s*[-–]?\s*(\d{1,2}:\d{2}\s*(AM|PM)?)?/gi, '');

        // Remove common category names
        const categories = ['Sports', 'Entertainment', 'Exhibition', 'Shopping', 'Live Shows & Concerts', 'Café', 'Food & Drink'];
        categories.forEach(cat => {
          title = title.replace(new RegExp(`\\b${cat}\\b`, 'gi'), '');
        });

        // Remove "Ticketed", "Free Entry" etc.
        title = title.replace(/ticketed|free entry|free/gi, '');

        // Clean up extra whitespace, pipes, and newlines
        title = title.replace(/\|/g, '').replace(/\s+/g, ' ').trim();

        // Check if it's a ticketed event
        const isTicketed = /ticketed/i.test(fullText);

        // Get image if there's an img inside the link
        const image = $el.find('img').first().attr('src') || $el.find('img').first().attr('data-src');

        // Build full URL - handle URLs with or without leading /
        let fullUrl = href;
        if (!href.startsWith('http')) {
          fullUrl = href.startsWith('/') ? `${BASE_URL}${href}` : `${BASE_URL}/${href}`;
        }

        // Ensure URL has /en/ prefix (correct Bahrain.com URL format)
        if (!fullUrl.includes('/en/')) {
          fullUrl = fullUrl.replace('bahrain.com/', 'bahrain.com/en/');
        }
        // Remove any /Error suffix that might be appended
        fullUrl = fullUrl.replace(/\/Error$/i, '');

        // Skip if title is garbage (from featured carousel with times/days only)
        const garbagePatterns = [
          /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s*[-–]/i,  // Starts with day
          /^Weekdays?:/i,                              // Starts with "Weekdays:"
          /^Weekends?:/i,                              // Starts with "Weekends:"
          /^\d+:\d+/,                                  // Starts with time
          /^[-–\s:]+$/,                                // Only dashes/colons/spaces
        ];
        const isGarbage = garbagePatterns.some(pattern => pattern.test(title));

        // Skip if title is too short, empty, or garbage
        if (title && title.length > 5 && !title.match(/^\d+$/) && !isGarbage) {
          // Skip events that have completely ended (end date is in the past)
          if (!isOngoing) {
            scraperLog.debug(LOG_PREFIX, `Skipping ended event: ${title} (ended: ${parsedEndDate})`);
            return; // Skip to next iteration
          }

          // Use actual start date (not today) - this shows when the event actually starts
          // End date is stored separately for filtering purposes
          if (parsedDate !== parsedEndDate) {
            scraperLog.info(LOG_PREFIX, `Multi-day event: ${title} (${parsedDate} to ${parsedEndDate})`);
          }

          events.push({
            title,
            description: '',
            date: parsedDate, // Use actual start date
            end_date: parsedEndDate !== parsedDate ? parsedEndDate : undefined,
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
