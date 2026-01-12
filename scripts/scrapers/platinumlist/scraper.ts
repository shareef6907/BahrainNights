import { chromium, Browser, Page } from 'playwright';
import { ScrapedExperience, ScraperConfig } from './types';

const DEFAULT_CONFIG: ScraperConfig = {
  affiliateCode: 'yjg3yzi',
  baseUrl: 'https://manama.platinumlist.net',
  usdToBhdRate: 0.376,
  delayMs: 2000, // 2 seconds between requests
  maxRetries: 3,
};

// Generate affiliate URL
export function generateAffiliateUrl(originalUrl: string, affiliateCode: string): string {
  return `https://platinumlist.net/aff/?ref=${affiliateCode}&link=${encodeURIComponent(originalUrl)}`;
}

// Convert USD to BHD
export function convertUsdToBhd(usdPrice: number, rate: number = DEFAULT_CONFIG.usdToBhdRate): number {
  return Math.round(usdPrice * rate * 100) / 100;
}

// Parse price from text (handles various formats)
export function parsePrice(priceText: string | null): { price: number | null; currency: string } {
  if (!priceText) return { price: null, currency: 'BHD' };

  const cleanText = priceText.trim().toLowerCase();

  // Check if it's free
  if (cleanText === 'free' || cleanText.includes('free')) {
    return { price: 0, currency: 'BHD' };
  }

  // Extract number
  const numberMatch = cleanText.match(/[\d,]+\.?\d*/);
  if (!numberMatch) return { price: null, currency: 'BHD' };

  const amount = parseFloat(numberMatch[0].replace(',', ''));

  // Check currency
  if (cleanText.includes('usd') || cleanText.includes('$')) {
    return { price: convertUsdToBhd(amount), currency: 'BHD' };
  }

  // Default to BHD
  return { price: amount, currency: 'BHD' };
}

// Determine category from URL or content
export function determineCategory(url: string, title: string, description: string | null): string {
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();
  const descLower = (description || '').toLowerCase();
  const combined = `${urlLower} ${titleLower} ${descLower}`;

  if (combined.includes('water') || combined.includes('diving') || combined.includes('snorkel') || combined.includes('jet-ski') || combined.includes('kayak')) {
    return 'water-sports';
  }
  if (combined.includes('boat') || combined.includes('yacht') || combined.includes('cruise') || combined.includes('sailing')) {
    return 'boat-tour';
  }
  if (combined.includes('desert') || combined.includes('safari') || combined.includes('dune')) {
    return 'desert-safari';
  }
  if (combined.includes('indoor') || combined.includes('trampoline') || combined.includes('bowling') || combined.includes('arcade') || combined.includes('escape room')) {
    return 'indoor';
  }
  if (combined.includes('tour') || combined.includes('guided') || combined.includes('walking')) {
    return 'tour';
  }
  if (combined.includes('museum') || combined.includes('historical') || combined.includes('heritage') || combined.includes('fort')) {
    return 'sightseeing';
  }
  if (combined.includes('theme park') || combined.includes('amusement') || combined.includes('waterpark')) {
    return 'theme-park';
  }

  return 'attraction';
}

// Determine type from category/content
export function determineType(category: string, url: string): 'attraction' | 'tour' | 'event' {
  if (url.includes('/event/') || url.includes('/events/')) {
    return 'event';
  }
  if (category === 'tour' || category === 'boat-tour' || category === 'desert-safari') {
    return 'tour';
  }
  return 'attraction';
}

// Delay helper
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Scrape a single listing page
async function scrapeListingPage(page: Page, url: string, config: ScraperConfig): Promise<ScrapedExperience[]> {
  const experiences: ScrapedExperience[] = [];

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await delay(1000);

    // Wait for listing cards to load
    await page.waitForSelector('.card, .event-card, .listing-card, [class*="card"]', { timeout: 10000 }).catch(() => null);

    // Get all listing items - Platinumlist uses various card structures
    const items = await page.$$eval(
      'a[href*="/event/"], a[href*="/attraction/"], a[href*="/experience/"], .card a, .listing-item a',
      (links) => {
        return links.map(link => {
          const card = link.closest('.card, .listing-item, [class*="card"]') || link;
          const href = link.getAttribute('href') || '';

          // Get image
          const img = card.querySelector('img');
          const imageUrl = img?.getAttribute('src') || img?.getAttribute('data-src') || null;

          // Get title
          const titleEl = card.querySelector('h2, h3, h4, .title, .event-title, [class*="title"]');
          const title = titleEl?.textContent?.trim() || '';

          // Get price
          const priceEl = card.querySelector('.price, [class*="price"], .amount');
          const priceText = priceEl?.textContent?.trim() || null;

          // Get venue/location
          const venueEl = card.querySelector('.venue, .location, [class*="venue"], [class*="location"]');
          const venue = venueEl?.textContent?.trim() || null;

          return {
            href,
            imageUrl,
            title,
            priceText,
            venue,
          };
        }).filter(item => item.href && item.title);
      }
    );

    // Process each item
    for (const item of items) {
      if (!item.href || !item.title) continue;

      // Make URL absolute
      const originalUrl = item.href.startsWith('http')
        ? item.href
        : `${config.baseUrl}${item.href.startsWith('/') ? '' : '/'}${item.href}`;

      const { price, currency } = parsePrice(item.priceText);
      const category = determineCategory(originalUrl, item.title, null);
      const type = determineType(category, originalUrl);

      experiences.push({
        title: item.title,
        description: null, // Will be scraped from detail page if needed
        price,
        priceCurrency: currency,
        imageUrl: item.imageUrl,
        venue: item.venue,
        location: 'Bahrain',
        category,
        type,
        originalUrl,
        affiliateUrl: generateAffiliateUrl(originalUrl, config.affiliateCode),
        startDate: null,
        endDate: null,
      });
    }

    console.log(`Scraped ${experiences.length} items from ${url}`);
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }

  return experiences;
}

// Scrape detail page for more info
async function scrapeDetailPage(page: Page, experience: ScrapedExperience, config: ScraperConfig): Promise<ScrapedExperience> {
  try {
    await page.goto(experience.originalUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await delay(500);

    // Get description
    const description = await page.$eval(
      '.description, .event-description, [class*="description"], .content p',
      el => el.textContent?.trim() || null
    ).catch(() => null);

    // Get better image
    const imageUrl = await page.$eval(
      '.main-image img, .hero-image img, .event-image img, [class*="gallery"] img',
      el => el.getAttribute('src') || el.getAttribute('data-src')
    ).catch(() => experience.imageUrl);

    // Get dates
    const dateText = await page.$eval(
      '.date, .event-date, [class*="date"]',
      el => el.textContent?.trim() || null
    ).catch(() => null);

    // Get venue
    const venue = await page.$eval(
      '.venue-name, .location-name, [class*="venue"]',
      el => el.textContent?.trim() || null
    ).catch(() => experience.venue);

    // Get price if not already set
    if (experience.price === null) {
      const priceText = await page.$eval(
        '.price, .ticket-price, [class*="price"]',
        el => el.textContent?.trim() || null
      ).catch(() => null);

      const { price, currency } = parsePrice(priceText);
      experience.price = price;
      experience.priceCurrency = currency;
    }

    return {
      ...experience,
      description: description || experience.description,
      imageUrl: imageUrl || experience.imageUrl,
      venue: venue || experience.venue,
    };
  } catch (error) {
    console.error(`Error scraping detail page ${experience.originalUrl}:`, error);
    return experience;
  }
}

// Main scraper function
export async function scrapePlatinumlist(config: Partial<ScraperConfig> = {}): Promise<ScrapedExperience[]> {
  const fullConfig: ScraperConfig = { ...DEFAULT_CONFIG, ...config };
  const allExperiences: ScrapedExperience[] = [];
  let browser: Browser | null = null;

  try {
    console.log('Starting Platinumlist scraper...');

    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });

    const page = await context.newPage();

    // URLs to scrape from Platinumlist Bahrain
    const urlsToScrape = [
      `${fullConfig.baseUrl}/things-to-do`,
      `${fullConfig.baseUrl}/attractions`,
      `${fullConfig.baseUrl}/tours`,
      `${fullConfig.baseUrl}/experiences`,
      `${fullConfig.baseUrl}/events`,
      `${fullConfig.baseUrl}/water-sports`,
      `${fullConfig.baseUrl}/indoor-activities`,
    ];

    // Scrape each category page
    for (const url of urlsToScrape) {
      console.log(`Scraping: ${url}`);

      try {
        const experiences = await scrapeListingPage(page, url, fullConfig);
        allExperiences.push(...experiences);
        await delay(fullConfig.delayMs);
      } catch (error) {
        console.error(`Failed to scrape ${url}:`, error);
      }

      // Check for pagination
      let hasNextPage = true;
      let pageNum = 2;

      while (hasNextPage && pageNum <= 10) {
        const paginatedUrl = `${url}?page=${pageNum}`;
        const pageExperiences = await scrapeListingPage(page, paginatedUrl, fullConfig);

        if (pageExperiences.length === 0) {
          hasNextPage = false;
        } else {
          allExperiences.push(...pageExperiences);
          pageNum++;
          await delay(fullConfig.delayMs);
        }
      }
    }

    // Deduplicate by URL
    const uniqueExperiences = Array.from(
      new Map(allExperiences.map(exp => [exp.originalUrl, exp])).values()
    );

    console.log(`Total unique experiences scraped: ${uniqueExperiences.length}`);

    // Optionally scrape detail pages for more info (first 50 to avoid rate limiting)
    const experiencesToEnrich = uniqueExperiences.slice(0, 50);
    const enrichedExperiences: ScrapedExperience[] = [];

    for (const exp of experiencesToEnrich) {
      if (!exp.description) {
        const enriched = await scrapeDetailPage(page, exp, fullConfig);
        enrichedExperiences.push(enriched);
        await delay(fullConfig.delayMs / 2);
      } else {
        enrichedExperiences.push(exp);
      }
    }

    // Add remaining experiences without enrichment
    enrichedExperiences.push(...uniqueExperiences.slice(50));

    await context.close();
    return enrichedExperiences;

  } catch (error) {
    console.error('Scraper error:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Filter out past events
export function filterActivExperiences(experiences: ScrapedExperience[]): ScrapedExperience[] {
  const now = new Date();

  return experiences.filter(exp => {
    // If no end date, keep it
    if (!exp.endDate) return true;

    const endDate = new Date(exp.endDate);
    return endDate >= now;
  });
}
