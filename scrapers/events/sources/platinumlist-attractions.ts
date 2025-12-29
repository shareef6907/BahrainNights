/**
 * Platinumlist Attractions Scraper
 * Scrapes from https://manama.platinumlist.net/attraction/attractions
 * These are permanent/ongoing attractions (water parks, tours, experiences)
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import * as cheerio from 'cheerio';
import { ScrapedEvent, SOURCE_NAMES } from '../types';
import { SCRAPER_CONFIG } from '../config';
import { sleep, getRandomDelay, scraperLog } from '../utils/request-helper';

const BASE_URL = 'https://manama.platinumlist.net';
const ATTRACTIONS_URL = `${BASE_URL}/attraction/attractions`;
const SOURCE_NAME = SOURCE_NAMES.PLATINUMLIST_ATTRACTIONS;
const LOG_PREFIX = 'PlAttractions';

// Extract attraction ID from URL
function extractAttractionId(url: string): string {
  // URL format: /attraction/12345/attraction-name
  const match = url.match(/\/attraction\/(\d+)\//);
  if (match) {
    return `pl-attr-${match[1]}`;
  }

  // Fall back to slug
  const slugMatch = url.match(/\/([^\\/]+)\/?$/);
  if (slugMatch) {
    return `pl-attr-${slugMatch[1]}`;
  }

  return `pl-attr-${Date.now()}`;
}

// Scrape attraction detail page
async function scrapeAttractionDetail(
  page: Page,
  attractionUrl: string
): Promise<Partial<ScrapedEvent>> {
  try {
    // Rate limiting delay
    await sleep(getRandomDelay(SCRAPER_CONFIG.delays.betweenRequests));

    await page.goto(attractionUrl, { waitUntil: 'networkidle2', timeout: SCRAPER_CONFIG.timeout });
    await sleep(1000);

    const html = await page.content();
    const $ = cheerio.load(html);

    const details: Partial<ScrapedEvent> = {};

    // Get description
    const descriptionSelectors = [
      '.attraction-description',
      '.description-content',
      '.content-section p',
      '.about-section p',
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
        details.description = paragraphs.slice(0, 3).join('\n\n'); // Limit to 3 paragraphs
        break;
      }
    }

    // Get location/venue
    const venueSelectors = [
      '.attraction-location',
      '.venue-name',
      '.location-name',
      '[itemprop="location"]',
      '.address',
    ];

    for (const selector of venueSelectors) {
      const venue = $(selector).first().text().trim();
      if (venue && venue.length > 2) {
        details.venue_name = venue;
        break;
      }
    }

    // Get price
    const priceSelectors = [
      '.price',
      '.ticket-price',
      '.starting-price',
      '.from-price',
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
      '.attraction-banner img',
      '.hero-image img',
      '.attraction-image img',
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

    // Booking URL is the attraction page itself
    details.booking_url = attractionUrl;

    return details;
  } catch (error) {
    scraperLog.error(LOG_PREFIX, `Detail page failed: ${attractionUrl} - ${(error as Error).message}`);
    return { booking_url: attractionUrl };
  }
}

/**
 * Main scraper function for Platinumlist Attractions
 */
export async function scrapePlatinumlistAttractions(): Promise<ScrapedEvent[]> {
  scraperLog.info(LOG_PREFIX, 'Starting attractions scraper...');
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

    // Navigate to attractions page
    scraperLog.info(LOG_PREFIX, 'Loading attractions page...');
    await page.goto(ATTRACTIONS_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(getRandomDelay(SCRAPER_CONFIG.delays.betweenPages));

    // Scroll to load more content
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await sleep(1500);
    }

    const html = await page.content();
    const $ = cheerio.load(html);

    // Find attraction cards
    const attractionSelectors = [
      '.attraction-card',
      '.attraction-item',
      '.experience-card',
      '[data-attraction-id]',
      'a[href*="/attraction/"]',
    ];

    let foundAttractions = 0;

    for (const selector of attractionSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        scraperLog.info(LOG_PREFIX, `Found ${elements.length} elements with selector: ${selector}`);

        elements.each((i, el) => {
          try {
            const $el = $(el);

            // Get link
            let link = $el.attr('href') || $el.find('a').first().attr('href');
            if (!link || !link.includes('/attraction/')) {
              const innerLink = $el.find('a[href*="/attraction/"]').first().attr('href');
              if (innerLink) link = innerLink;
            }

            if (!link) return;

            // Skip the main attractions list page
            if (link === '/attraction/attractions' || link.endsWith('/attractions')) return;

            const fullUrl = link.startsWith('http') ? link : `${BASE_URL}${link}`;

            // Get title
            const title = $el.find('.attraction-title, .title, h2, h3, h4').first().text().trim() ||
                         $el.find('a').first().text().trim() ||
                         $el.attr('title') || '';

            if (!title || title.length < 3) return;

            // Get image
            let image = $el.find('img').first().attr('src') ||
                       $el.find('img').first().attr('data-src');

            if (image) {
              if (image.startsWith('//')) image = `https:${image}`;
            }

            // Get price
            const priceText = $el.find('.price, .ticket-price, .from-price').first().text().trim();

            // Get location
            const locationText = $el.find('.location, .venue, .area').first().text().trim();

            // Attractions are ongoing - use a date far in the future or current date
            // We'll use current date as they're always available
            const today = new Date().toISOString().split('T')[0];

            // Check for duplicate URL
            if (events.find(e => e.source_url === fullUrl)) return;

            events.push({
              title,
              description: '', // Will be filled from detail page
              date: today, // Ongoing attractions - use today's date
              venue_name: locationText || 'Bahrain',
              category: 'tours', // Attractions go in tours category
              price: priceText || undefined,
              image_url: image || undefined,
              booking_url: fullUrl,
              source_url: fullUrl,
              source_name: SOURCE_NAME,
              source_event_id: extractAttractionId(fullUrl),
            });

            foundAttractions++;
            successCount++;
            scraperLog.success(LOG_PREFIX, `Scraped: ${title}`);
          } catch (error) {
            failCount++;
            scraperLog.error(LOG_PREFIX, `Failed to parse attraction card: ${(error as Error).message}`);
          }
        });

        if (foundAttractions > 0) break;
      }
    }

    // Direct link extraction fallback
    if (events.length === 0) {
      scraperLog.warn(LOG_PREFIX, 'Trying direct link extraction...');

      $('a[href*="/attraction/"]').each((i, el) => {
        try {
          const $el = $(el);
          const href = $el.attr('href');
          if (!href || href === '/attraction/attractions' || href.endsWith('/attractions')) return;

          const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;
          const title = $el.text().trim() || $el.attr('title') || '';

          if (title && title.length > 3) {
            if (!events.find(e => e.source_url === fullUrl)) {
              events.push({
                title,
                description: '',
                date: new Date().toISOString().split('T')[0],
                venue_name: 'Bahrain',
                category: 'tours',
                booking_url: fullUrl,
                source_url: fullUrl,
                source_name: SOURCE_NAME,
                source_event_id: extractAttractionId(fullUrl),
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

    scraperLog.info(LOG_PREFIX, `Found ${events.length} attractions from listing page`);

    // Scrape detail pages (limit per config)
    const attractionsToScrape = events.slice(0, SCRAPER_CONFIG.maxDetailPages);

    for (let i = 0; i < attractionsToScrape.length; i++) {
      const attraction = attractionsToScrape[i];

      try {
        scraperLog.info(LOG_PREFIX, `Scraping detail ${i + 1}/${attractionsToScrape.length}: ${attraction.title}`);

        const details = await scrapeAttractionDetail(page, attraction.source_url);

        // Merge details
        if (details.description) attraction.description = details.description;
        if (details.venue_name) attraction.venue_name = details.venue_name;
        if (details.price) attraction.price = details.price;
        if (details.image_url) attraction.image_url = details.image_url;
        if (details.booking_url) attraction.booking_url = details.booking_url;

        scraperLog.success(LOG_PREFIX, `Detail scraped: ${attraction.title}`);
      } catch (error) {
        scraperLog.error(LOG_PREFIX, `Detail scrape failed for ${attraction.title}: ${(error as Error).message}`);
        // Continue with next attraction
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

export default scrapePlatinumlistAttractions;
