import { chromium, Browser, Page } from 'playwright';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ScrapedExperience, ScraperConfig } from './types';
import * as https from 'https';
import * as http from 'http';

const DEFAULT_CONFIG: ScraperConfig = {
  affiliateCode: 'yjg3yzi',
  baseUrl: 'https://manama.platinumlist.net',
  usdToBhdRate: 0.376,
  delayMs: 2000,
  maxRetries: 3,
};

// S3 Configuration
const s3Client = new S3Client({
  region: process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const S3_BUCKET = process.env.BAHRAINNIGHTS_S3_BUCKET || process.env.AWS_S3_BUCKET || 'bahrainnights-production';
const S3_REGION = process.env.BAHRAINNIGHTS_AWS_REGION || process.env.AWS_REGION || 'me-south-1';

// Generate affiliate URL
export function generateAffiliateUrl(originalUrl: string, affiliateCode: string): string {
  return `https://platinumlist.net/aff/?ref=${affiliateCode}&link=${encodeURIComponent(originalUrl)}`;
}

// Check if URL is an attraction (not an event)
// Attractions: /event-tickets/gravity-indoor-skydiving (no numeric ID)
// Events: /event-tickets/103422/wicked-the-musical (has numeric ID)
function isAttractionUrl(url: string): boolean {
  const match = url.match(/\/event-tickets\/(\d+)\//);
  // If there's a numeric ID in the URL path, it's an event, not an attraction
  return !match;
}

// Download image from URL and return as Buffer
async function downloadImage(imageUrl: string): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const protocol = imageUrl.startsWith('https') ? https : http;

    protocol.get(imageUrl, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl).then(resolve);
          return;
        }
      }

      if (response.statusCode !== 200) {
        console.log(`    Failed to download image: ${response.statusCode}`);
        resolve(null);
        return;
      }

      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', () => resolve(null));
    }).on('error', () => resolve(null));
  });
}

// Upload image to S3
async function uploadToS3(imageBuffer: Buffer, slug: string): Promise<string | null> {
  try {
    const filename = `${slug}-${Date.now()}.jpg`;
    const key = `uploads/attractions/${filename}`;

    await s3Client.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    }));

    // Return the processed URL (Lambda will convert to webp)
    const processedFilename = filename.replace('.jpg', '.webp');
    return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/processed/attractions/${processedFilename}`;
  } catch (error) {
    console.error('    Error uploading to S3:', error);
    return null;
  }
}

// Delay helper
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Determine category from URL and title
function determineCategory(url: string, title: string, description: string | null): string {
  const combined = `${url} ${title} ${description || ''}`.toLowerCase();

  if (combined.includes('water') || combined.includes('diving') || combined.includes('snorkel') ||
      combined.includes('jet-ski') || combined.includes('kayak') || combined.includes('pearl') ||
      combined.includes('swimming') || combined.includes('beach')) {
    return 'water-sports';
  }
  if (combined.includes('boat') || combined.includes('yacht') || combined.includes('cruise') ||
      combined.includes('sailing') || combined.includes('fishing')) {
    return 'boat-tour';
  }
  if (combined.includes('desert') || combined.includes('safari') || combined.includes('dune') ||
      combined.includes('camel')) {
    return 'desert-safari';
  }
  if (combined.includes('indoor') || combined.includes('trampoline') || combined.includes('bowling') ||
      combined.includes('arcade') || combined.includes('escape room') || combined.includes('skydiving') ||
      combined.includes('vr') || combined.includes('virtual reality') || combined.includes('climbing') ||
      combined.includes('aquarium') || combined.includes('gravity')) {
    return 'indoor';
  }
  if (combined.includes('tour') || combined.includes('guided') || combined.includes('walking') ||
      combined.includes('food tour') || combined.includes('sightseeing')) {
    return 'tour';
  }
  if (combined.includes('museum') || combined.includes('historical') || combined.includes('heritage') ||
      combined.includes('fort') || combined.includes('palace')) {
    return 'sightseeing';
  }
  if (combined.includes('theme park') || combined.includes('amusement') || combined.includes('waterpark') ||
      combined.includes('adventure park') || combined.includes('water park') || combined.includes('lost paradise') ||
      combined.includes('adhari')) {
    return 'theme-park';
  }

  return 'attraction';
}

// Scrape a listing page and get attraction URLs
async function scrapeListingPage(page: Page, url: string): Promise<string[]> {
  const attractionUrls: string[] = [];

  try {
    console.log(`  Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await delay(3000);

    // Get all attraction links
    const links = await page.evaluate(() => {
      const results: string[] = [];
      const anchors = document.querySelectorAll('a[href*="/event-tickets/"]');

      anchors.forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.includes('purchase') && !href.includes('cart')) {
          results.push(href);
        }
      });

      return Array.from(new Set(results)); // Deduplicate
    });

    // Filter to only attractions (exclude events with numeric IDs)
    links.forEach(link => {
      const fullUrl = link.startsWith('http') ? link : `https://manama.platinumlist.net${link}`;
      if (isAttractionUrl(fullUrl)) {
        attractionUrls.push(fullUrl);
      }
    });

    console.log(`  Found ${attractionUrls.length} attraction URLs (filtered from ${links.length} total)`);
  } catch (error) {
    console.error(`  Error scraping listing page ${url}:`, error);
  }

  return attractionUrls;
}

// Scrape detail page for full attraction data
async function scrapeDetailPage(
  page: Page,
  url: string,
  config: ScraperConfig
): Promise<ScrapedExperience | null> {
  try {
    console.log(`    Scraping: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await delay(2000);

    const data = await page.evaluate(() => {
      // Get title from h1
      const h1 = document.querySelector('h1');
      const title = h1?.textContent?.trim() || '';

      // Get price - look for "Price from: X BHD" pattern or price elements
      let price: number | null = null;
      const pageText = document.body.textContent || '';

      // Try multiple price patterns
      const priceFromMatch = pageText.match(/Price from[:\s]+(\d+(?:\.\d+)?)\s*BHD/i);
      if (priceFromMatch) {
        price = parseFloat(priceFromMatch[1]);
      } else {
        // Look for price in structured elements
        const priceElements = Array.from(document.querySelectorAll('[class*="price"], .price, .amount'));
        for (let i = 0; i < priceElements.length; i++) {
          const text = priceElements[i].textContent || '';
          const match = text.match(/(\d+(?:\.\d+)?)\s*BHD/i);
          if (match) {
            price = parseFloat(match[1]);
            break;
          }
        }
      }

      // If still no price, look for any BHD amount on page
      if (!price) {
        const bhdMatch = pageText.match(/(\d+(?:\.\d+)?)\s*BHD/i);
        if (bhdMatch) {
          price = parseFloat(bhdMatch[1]);
        }
      }

      // Get description - find paragraph text that looks like a description
      let description: string | null = null;
      const paragraphs = Array.from(document.querySelectorAll('p'));
      for (let i = 0; i < paragraphs.length; i++) {
        const text = paragraphs[i].textContent?.trim() || '';
        // Skip if too short, contains CSS, or is just metadata
        if (text.length > 50 && text.length < 3000 &&
            !text.includes('{') && !text.includes('cls-') &&
            !text.includes('fill-rule') && !text.includes('stroke-') &&
            !text.startsWith('©') && !text.includes('cookie')) {
          description = text;
          break;
        }
      }

      // If no good paragraph, try div content
      if (!description) {
        const contentDivs = Array.from(document.querySelectorAll('div[class*="content"], div[class*="description"], div[class*="about"]'));
        for (let i = 0; i < contentDivs.length; i++) {
          const text = contentDivs[i].textContent?.trim() || '';
          if (text.length > 50 && text.length < 3000 &&
              !text.includes('{') && !text.includes('cls-')) {
            description = text.substring(0, 500); // Limit length
            break;
          }
        }
      }

      // Get image URL from gallery or main image
      let imageUrl: string | null = null;
      const images = Array.from(document.querySelectorAll('img[src*="/upload/"], img[src*="cdn.platinumlist"]'));
      for (let i = 0; i < images.length; i++) {
        const src = images[i].getAttribute('src') || images[i].getAttribute('data-src');
        if (src && src.includes('/upload/') && !src.includes('logo') && !src.includes('icon')) {
          imageUrl = src.startsWith('http') ? src : `https://cdn.platinumlist.net${src}`;
          break;
        }
      }

      // Get venue name
      let venue: string | null = null;
      const venueLink = document.querySelector('a[href*="/venue/"]');
      if (venueLink) {
        venue = venueLink.textContent?.trim() || null;
      }

      // Get location/address
      let location: string | null = null;
      const addressElements = Array.from(document.querySelectorAll('[class*="address"], [class*="location"]'));
      for (let i = 0; i < addressElements.length; i++) {
        const text = addressElements[i].textContent?.trim();
        if (text && text.length > 5 && text.length < 200) {
          location = text;
          break;
        }
      }

      return { title, price, description, imageUrl, venue, location };
    });

    if (!data.title) {
      console.log(`    Skipping - no title found`);
      return null;
    }

    // Generate slug from URL or title
    const urlSlug = url.split('/event-tickets/').pop()?.split('?')[0] || generateSlug(data.title);

    // Download and upload image to S3
    let s3ImageUrl: string | null = null;
    if (data.imageUrl) {
      console.log(`    Downloading image...`);
      const imageBuffer = await downloadImage(data.imageUrl);
      if (imageBuffer) {
        console.log(`    Uploading to S3...`);
        s3ImageUrl = await uploadToS3(imageBuffer, urlSlug);
        if (s3ImageUrl) {
          console.log(`    Image uploaded: ${s3ImageUrl}`);
        }
      }
    }

    const category = determineCategory(url, data.title, data.description);

    const experience: ScrapedExperience = {
      title: data.title,
      description: data.description,
      price: data.price,
      priceCurrency: 'BHD',
      imageUrl: s3ImageUrl || data.imageUrl, // Use S3 URL if available, fallback to original
      venue: data.venue,
      location: data.location || 'Bahrain',
      category,
      type: 'attraction',
      originalUrl: url,
      affiliateUrl: generateAffiliateUrl(url, config.affiliateCode),
      startDate: null,
      endDate: null,
    };

    console.log(`    ✓ ${data.title} - ${data.price ? `${data.price} BHD` : 'No price'}`);
    return experience;

  } catch (error) {
    console.error(`    Error scraping detail page ${url}:`, error);
    return null;
  }
}

// Main scraper function
export async function scrapePlatinumlist(config: Partial<ScraperConfig> = {}): Promise<ScrapedExperience[]> {
  const fullConfig: ScraperConfig = { ...DEFAULT_CONFIG, ...config };
  const allExperiences: ScrapedExperience[] = [];
  let browser: Browser | null = null;

  try {
    console.log('Starting Platinumlist Attractions Scraper...');
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

    // ONLY attraction category pages - NOT events, concerts, etc.
    const categoryUrls = [
      `${fullConfig.baseUrl}/attraction/top`,              // Top attractions
      `${fullConfig.baseUrl}/attraction/attractions`,      // All attractions
      `${fullConfig.baseUrl}/attraction/recently-added`,   // Recently added
      `${fullConfig.baseUrl}/attraction/experiences`,      // Experiences
      `${fullConfig.baseUrl}/attraction/indoor-attractions`, // Indoor
      `${fullConfig.baseUrl}/attraction/water-sports`,     // Water Sports
      `${fullConfig.baseUrl}/attraction/sightseeing-and-tours`, // Tours
      `${fullConfig.baseUrl}/attraction/boat-tours`,       // Boat tours
    ];

    console.log(`\nScraping ${categoryUrls.length} attraction category pages...\n`);

    // Collect all unique attraction URLs from category pages
    const allAttractionUrls = new Set<string>();

    for (const categoryUrl of categoryUrls) {
      console.log(`\nCategory: ${categoryUrl}`);
      const urls = await scrapeListingPage(page, categoryUrl);
      urls.forEach(url => allAttractionUrls.add(url));
      await delay(fullConfig.delayMs);
    }

    console.log(`\n========================================`);
    console.log(`Total unique attraction URLs: ${allAttractionUrls.size}`);
    console.log(`========================================\n`);

    // Scrape each detail page
    const attractionUrlsArray = Array.from(allAttractionUrls);
    for (let index = 0; index < attractionUrlsArray.length; index++) {
      const attractionUrl = attractionUrlsArray[index];
      console.log(`\n[${index + 1}/${attractionUrlsArray.length}]`);

      const experience = await scrapeDetailPage(page, attractionUrl, fullConfig);
      if (experience) {
        allExperiences.push(experience);
      }

      // Rate limiting
      await delay(fullConfig.delayMs);
    }

    await context.close();

    console.log(`\n========================================`);
    console.log(`Scraping Complete!`);
    console.log(`Total attractions scraped: ${allExperiences.length}`);
    console.log(`========================================\n`);

    return allExperiences;

  } catch (error) {
    console.error('Scraper error:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Filter out past events (keep all attractions since they don't have end dates)
export function filterActiveExperiences(experiences: ScrapedExperience[]): ScrapedExperience[] {
  const now = new Date();

  return experiences.filter(exp => {
    // If no end date, keep it (attractions typically don't have end dates)
    if (!exp.endDate) return true;

    const endDate = new Date(exp.endDate);
    return endDate >= now;
  });
}
