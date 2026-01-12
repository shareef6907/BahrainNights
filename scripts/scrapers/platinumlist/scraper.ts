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

// Parse price from text (handles various formats like "17.00 BHD" or "19.00 BHD 17.00 BHD")
export function parsePrice(priceText: string | null): { price: number | null; currency: string } {
  if (!priceText) return { price: null, currency: 'BHD' };

  const cleanText = priceText.trim().toLowerCase();

  // Check if it's free
  if (cleanText === 'free' || cleanText.includes('free')) {
    return { price: 0, currency: 'BHD' };
  }

  // Extract all numbers - take the last one (usually the discounted price)
  const numbers = cleanText.match(/[\d,]+\.?\d*/g);
  if (!numbers || numbers.length === 0) return { price: null, currency: 'BHD' };

  // Get the last number (discounted price) or the only number
  const amount = parseFloat(numbers[numbers.length - 1].replace(',', ''));

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

  if (combined.includes('water') || combined.includes('diving') || combined.includes('snorkel') || combined.includes('jet-ski') || combined.includes('kayak') || combined.includes('pearl')) {
    return 'water-sports';
  }
  if (combined.includes('boat') || combined.includes('yacht') || combined.includes('cruise') || combined.includes('sailing') || combined.includes('fishing')) {
    return 'boat-tour';
  }
  if (combined.includes('desert') || combined.includes('safari') || combined.includes('dune')) {
    return 'desert-safari';
  }
  if (combined.includes('indoor') || combined.includes('trampoline') || combined.includes('bowling') || combined.includes('arcade') || combined.includes('escape room') || combined.includes('skydiving') || combined.includes('vr') || combined.includes('virtual reality') || combined.includes('climbing') || combined.includes('aquarium')) {
    return 'indoor';
  }
  if (combined.includes('tour') || combined.includes('guided') || combined.includes('walking') || combined.includes('food tour') || combined.includes('sightseeing')) {
    return 'tour';
  }
  if (combined.includes('museum') || combined.includes('historical') || combined.includes('heritage') || combined.includes('fort')) {
    return 'sightseeing';
  }
  if (combined.includes('theme park') || combined.includes('amusement') || combined.includes('waterpark') || combined.includes('adventure park')) {
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

// Scrape a single listing page using Playwright's page evaluation
async function scrapeListingPage(page: Page, url: string, config: ScraperConfig): Promise<ScrapedExperience[]> {
  const experiences: ScrapedExperience[] = [];

  try {
    console.log(`  Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for page to load and JavaScript to render
    await delay(3000);

    // Wait for any of the content indicators
    await page.waitForSelector('a[href*="/event-tickets/"], h1', { timeout: 15000 }).catch(() => {
      console.log(`  No content selector found on ${url}`);
    });

    // Additional wait for dynamic content
    await delay(2000);

    // Get all attraction links from the page
    const items = await page.evaluate(() => {
      const results: Array<{
        href: string;
        title: string;
        imageUrl: string | null;
        priceText: string | null;
      }> = [];

      // Find all links to event-tickets pages (this is the pattern Platinumlist uses for attractions)
      const links = document.querySelectorAll('a[href*="/event-tickets/"]');
      const processedUrls = new Set<string>();

      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || processedUrls.has(href)) return;

        // Skip purchase/cart links
        if (href.includes('purchase') || href.includes('cart')) return;

        processedUrls.add(href);

        // Get the card container (parent elements that might contain the full card)
        let container = link.parentElement;
        for (let i = 0; i < 5; i++) {
          if (container && container.parentElement) {
            container = container.parentElement;
          }
        }

        // Get title from the link text or image alt
        const img = link.querySelector('img') || container?.querySelector('img');
        let title = '';

        // Try to get title from link text
        const linkText = link.textContent?.trim();
        if (linkText && linkText.length > 3 && linkText.length < 200) {
          title = linkText;
        }

        // Or from image alt
        if (!title && img) {
          const alt = img.getAttribute('alt');
          if (alt && alt.length > 3) {
            title = alt;
          }
        }

        if (!title) return;

        // Get image URL
        let imageUrl = img?.getAttribute('src') || img?.getAttribute('data-src') || null;

        // Get price - look for BHD text nearby
        let priceText: string | null = null;
        if (container) {
          const containerText = container.textContent || '';
          const priceMatch = containerText.match(/[\d,]+\.?\d*\s*BHD/gi);
          if (priceMatch) {
            priceText = priceMatch[priceMatch.length - 1]; // Get last (usually discounted) price
          }
        }

        results.push({
          href,
          title,
          imageUrl,
          priceText,
        });
      });

      return results;
    });

    console.log(`  Found ${items.length} items on page`);

    // Process each item
    for (const item of items) {
      if (!item.href || !item.title) continue;

      // Make URL absolute
      const originalUrl = item.href.startsWith('http')
        ? item.href
        : `${config.baseUrl}${item.href.startsWith('/') ? '' : '/'}${item.href}`;

      // Skip duplicates
      if (experiences.some(e => e.originalUrl === originalUrl)) continue;

      const { price, currency } = parsePrice(item.priceText);
      const category = determineCategory(originalUrl, item.title, null);
      const type = determineType(category, originalUrl);

      experiences.push({
        title: item.title,
        description: null, // Will be scraped from detail page if needed
        price,
        priceCurrency: currency,
        imageUrl: item.imageUrl,
        venue: null,
        location: 'Bahrain',
        category,
        type,
        originalUrl,
        affiliateUrl: generateAffiliateUrl(originalUrl, config.affiliateCode),
        startDate: null,
        endDate: null,
      });
    }

    console.log(`  Scraped ${experiences.length} unique items from ${url}`);
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }

  return experiences;
}

// Scrape detail page for more info
async function scrapeDetailPage(page: Page, experience: ScrapedExperience, config: ScraperConfig): Promise<ScrapedExperience> {
  try {
    console.log(`    Enriching: ${experience.title}`);
    await page.goto(experience.originalUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await delay(2000);

    const details = await page.evaluate(() => {
      // Get description - look for the main content area
      let description: string | null = null;

      // Try to find the main description text
      const descElements = document.querySelectorAll('div, p');
      for (const el of descElements) {
        const text = el.textContent?.trim() || '';
        // Look for longer text that seems like a description (more than 100 chars, less than 2000)
        if (text.length > 100 && text.length < 2000 && !text.includes('Why buy with') && !text.includes('Do you have any questions')) {
          // Check if this is actual content, not navigation
          const hasLinks = el.querySelectorAll('a').length;
          if (hasLinks < 5) {
            description = text;
            break;
          }
        }
      }

      // Get venue name - look for venue link
      let venue: string | null = null;
      const venueLink = document.querySelector('a[href*="/venue/"]');
      if (venueLink) {
        venue = venueLink.textContent?.trim() || null;
      }

      // Get location from the address area
      let location: string | null = null;
      const locationEl = document.querySelector('[class*="address"], [class*="location"]');
      if (locationEl) {
        location = locationEl.textContent?.trim() || null;
      }

      // Get better image from gallery or hero
      let imageUrl: string | null = null;
      const heroImg = document.querySelector('img[alt*="Gallery"], .listbox img, [class*="gallery"] img');
      if (heroImg) {
        imageUrl = heroImg.getAttribute('src') || null;
      }

      // Get price if visible
      let priceText: string | null = null;
      const priceEl = document.querySelector('[class*="price"]');
      if (priceEl) {
        const text = priceEl.textContent || '';
        const match = text.match(/[\d,]+\.?\d*\s*BHD/i);
        if (match) {
          priceText = match[0];
        }
      }

      return {
        description,
        venue,
        location,
        imageUrl,
        priceText,
      };
    });

    // Update experience with scraped details
    if (details.description) {
      experience.description = details.description;
    }
    if (details.venue) {
      experience.venue = details.venue;
    }
    if (details.location) {
      experience.location = details.location;
    }
    if (details.imageUrl && !experience.imageUrl) {
      experience.imageUrl = details.imageUrl;
    }
    if (details.priceText && experience.price === null) {
      const { price, currency } = parsePrice(details.priceText);
      experience.price = price;
      experience.priceCurrency = currency;
    }

    // Re-categorize with description if available
    if (details.description) {
      experience.category = determineCategory(experience.originalUrl, experience.title, details.description);
      experience.type = determineType(experience.category, experience.originalUrl);
    }

    return experience;
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

    // CORRECT URLs for Platinumlist Bahrain (discovered via inspection)
    // Note: Platinumlist uses /attraction/ (singular) NOT /attractions/ (plural)
    const urlsToScrape = [
      `${fullConfig.baseUrl}/attraction/attractions`,        // Top-Rated Attractions
      `${fullConfig.baseUrl}/attraction/recently-added`,     // Recently Added
      `${fullConfig.baseUrl}/attraction/experiences`,        // Experiences
      `${fullConfig.baseUrl}/attraction/indoor-attractions`, // Indoor Attractions
      `${fullConfig.baseUrl}/attraction/water-sports`,       // Water Sports
      `${fullConfig.baseUrl}/attraction/sightseeing-and-tours`, // Sightseeing and Tours
      `${fullConfig.baseUrl}/attraction/boat-tours`,         // Boat Tours and Cruises
    ];

    console.log(`\nScraping ${urlsToScrape.length} category pages...\n`);

    // Scrape each category page
    for (const url of urlsToScrape) {
      console.log(`\nScraping: ${url}`);

      try {
        const experiences = await scrapeListingPage(page, url, fullConfig);
        allExperiences.push(...experiences);
        await delay(fullConfig.delayMs);
      } catch (error) {
        console.error(`Failed to scrape ${url}:`, error);
      }
    }

    // Deduplicate by URL
    const uniqueExperiences = Array.from(
      new Map(allExperiences.map(exp => [exp.originalUrl, exp])).values()
    );

    console.log(`\n===========================================`);
    console.log(`Total unique experiences scraped: ${uniqueExperiences.length}`);
    console.log(`===========================================\n`);

    // Enrich detail pages for first 30 items (to avoid rate limiting)
    if (uniqueExperiences.length > 0) {
      console.log('Enriching experiences with detail page info...');
      const experiencesToEnrich = uniqueExperiences.slice(0, 30);

      for (let i = 0; i < experiencesToEnrich.length; i++) {
        const exp = experiencesToEnrich[i];
        console.log(`  [${i + 1}/${experiencesToEnrich.length}] ${exp.title}`);
        await scrapeDetailPage(page, exp, fullConfig);
        await delay(fullConfig.delayMs / 2);
      }
    }

    await context.close();
    return uniqueExperiences;

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
export function filterActiveExperiences(experiences: ScrapedExperience[]): ScrapedExperience[] {
  const now = new Date();

  return experiences.filter(exp => {
    // If no end date, keep it
    if (!exp.endDate) return true;

    const endDate = new Date(exp.endDate);
    return endDate >= now;
  });
}
