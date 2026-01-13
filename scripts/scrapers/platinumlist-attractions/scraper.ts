import { chromium, Page, Browser } from 'playwright';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ScrapedAttraction, ATTRACTION_CATEGORIES, AFFILIATE_CODE } from './types';
import {
  generateAffiliateLink,
  createSlug,
  mapAttractionCategory,
  downloadImage,
  uploadImageToS3,
  cleanDescription,
} from './utils';

// URLs that are events-only, not attractions - must be filtered out
// Note: /event-tickets/ is used by BOTH events and attractions, so we don't filter it
const EVENT_ONLY_URL_PATTERNS = [
  '/concerts/',
  '/nightlife/',
  '/comedy/',
  '/theatre/',
  '/festivals/',
  '/sports/',
];

/**
 * Check if a URL is an event-only page (not an attraction)
 */
function isEventOnlyUrl(url: string): boolean {
  return EVENT_ONLY_URL_PATTERNS.some(pattern => url.includes(pattern));
}

/**
 * Scrape all attraction URLs from category pages
 */
async function scrapeAttractionUrls(page: Page): Promise<string[]> {
  const allUrls: Set<string> = new Set();

  console.log(`\nScraping ${ATTRACTION_CATEGORIES.length} attraction category pages...\n`);

  for (const category of ATTRACTION_CATEGORIES) {
    console.log(`\nCategory: ${category.name} (${category.url})`);
    console.log(`  Navigating to: ${category.url}`);

    try {
      await page.goto(category.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Get all attraction links - attractions use /event-tickets/ URLs
      const links = await page.evaluate(() => {
        const anchors = document.querySelectorAll('a[href*="platinumlist.net"]');
        const urls: string[] = [];
        anchors.forEach((a) => {
          const href = (a as HTMLAnchorElement).href;
          // Attractions use /event-tickets/ URLs (same as events)
          if (href.includes('/event-tickets/')) {
            urls.push(href);
          }
        });
        return urls;
      });

      // Filter out event-only URLs and duplicates
      const attractionUrls = links.filter(url => !isEventOnlyUrl(url));
      const uniqueUrls = [...new Set(attractionUrls)];

      console.log(`  Found ${uniqueUrls.length} attraction URLs (filtered from ${links.length} total)`);

      uniqueUrls.forEach(url => allUrls.add(url));
    } catch (error) {
      console.error(`  Error scraping category ${category.name}:`, error);
    }
  }

  const uniqueAllUrls = [...allUrls];
  console.log(`\n${'='.repeat(40)}`);
  console.log(`Total unique attraction URLs: ${uniqueAllUrls.length}`);
  console.log(`${'='.repeat(40)}\n`);

  return uniqueAllUrls;
}

/**
 * Scrape a single attraction detail page
 * Uses og:description meta tag which contains structured data:
 * "Buy {title} tickets, {date}, {venue}, at the official Platinumlist.net site. {title} tickets prices starting from {price}."
 */
async function scrapeAttractionDetail(page: Page, url: string): Promise<ScrapedAttraction | null> {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Extract meta tags including og:description for reliable data
    const metaData = await page.evaluate(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
      const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
      const h1Title = document.querySelector('h1')?.textContent?.trim() || '';
      return { ogTitle, ogDesc, ogImage, h1Title };
    });

    // Use og:title or h1 for the title
    const title = metaData.ogTitle || metaData.h1Title;

    if (!title) {
      console.log(`    No title found, skipping`);
      return null;
    }

    // Extract description from page content
    const description = await page.evaluate(() => {
      const descEl = document.querySelector('.event-description, .description, .about-section p, [class*="description"]');
      return descEl?.textContent?.trim() || '';
    });

    // Extract price from og:description (e.g., "starting from 15.00 BHD" or "prices starting from 15.00 BHD")
    const ogDesc = metaData.ogDesc;
    const priceMatch = ogDesc.match(/starting from\s*([\d.]+)\s*BHD/i);
    const priceFromDesc = priceMatch ? parseFloat(priceMatch[1]) : 0;

    // Check for sold out in page content
    const isSoldOut = await page.evaluate(() => {
      const pageText = document.body.textContent?.toLowerCase() || '';
      return pageText.includes('sold out') || pageText.includes('soldout');
    });

    // Extract venue/location
    const venue = await page.evaluate(() => {
      const venueEl = document.querySelector('.venue-name, .location-name, [class*="venue"]');
      return venueEl?.textContent?.trim() || '';
    });

    const location = await page.evaluate(() => {
      const locationEl = document.querySelector('.venue-address, .location, address, [class*="address"]');
      return locationEl?.textContent?.trim() || 'Bahrain';
    });

    // Use og:image from meta tags (most reliable), or fall back to page images
    let imageUrl: string | null = metaData.ogImage || null;

    if (!imageUrl) {
      // Fallback: try to find image in page content
      imageUrl = await page.evaluate(() => {
        const selectors = [
          '.event-detail-image img',
          '.event-gallery img:first-child',
          '.hero-image img',
          '.main-image img',
          '.event-image img',
        ];

        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element) {
            const src = element.getAttribute('src');
            if (src && !src.includes('promo') && !src.includes('banner') && !src.includes('logo')) {
              return src;
            }
          }
        }

        // Fallback: find any large image
        const images = document.querySelectorAll('img');
        for (const img of images) {
          const src = img.src;
          const width = img.naturalWidth || img.width;
          if (src && width > 300 && !src.includes('promo') && !src.includes('banner') && !src.includes('logo') && !src.includes('icon')) {
            return src;
          }
        }

        return null;
      });
    }

    // Determine category from URL and title
    const categoryFromUrl = url.includes('/tours/') ? 'tours' :
                           url.includes('/attractions/') ? 'attractions' :
                           'things-to-do';
    const category = mapAttractionCategory(categoryFromUrl, title);

    const slug = createSlug(title);

    return {
      title,
      slug,
      description: cleanDescription(description),
      price: priceFromDesc,
      price_currency: 'BHD',
      image_url: imageUrl || '',
      cover_url: imageUrl || '',
      venue: venue || 'Various Locations',
      location: location || 'Bahrain',
      category,
      type: 'attraction',
      original_url: url,
      affiliate_url: generateAffiliateLink(url),
      source: 'platinumlist',
      is_sold_out: isSoldOut,
      is_active: true,
    };
  } catch (error) {
    console.log(`    Error scraping detail page: ${error}`);
    return null;
  }
}

/**
 * Process images and upload to S3
 */
async function processImages(attraction: ScrapedAttraction): Promise<ScrapedAttraction> {
  if (!attraction.image_url) {
    return attraction;
  }

  try {
    // Download image
    console.log(`    Downloading image...`);
    const imageBuffer = await downloadImage(attraction.image_url);

    if (imageBuffer) {
      // Upload thumbnail
      console.log(`    Uploading thumbnail to S3...`);
      const thumbnailUrl = await uploadImageToS3(imageBuffer, attraction.slug, 'thumbnail');
      if (thumbnailUrl) {
        attraction.image_url = thumbnailUrl;
        console.log(`    Thumbnail uploaded: ${thumbnailUrl}`);
      }

      // Upload cover
      console.log(`    Uploading cover to S3...`);
      const coverUrl = await uploadImageToS3(imageBuffer, attraction.slug, 'cover');
      if (coverUrl) {
        attraction.cover_url = coverUrl;
        console.log(`    Cover uploaded: ${coverUrl}`);
      }
    }
  } catch (error) {
    console.log(`    Error processing images: ${error}`);
  }

  return attraction;
}

/**
 * Upsert attraction to database
 */
async function upsertAttraction(supabase: SupabaseClient, attraction: ScrapedAttraction): Promise<boolean> {
  try {
    // Generate a unique slug with source prefix
    const uniqueSlug = `platinumlist-${attraction.slug}`;

    const { error } = await supabase
      .from('attractions')
      .upsert({
        name: attraction.title,
        slug: uniqueSlug,
        description: attraction.description,
        short_description: attraction.description?.substring(0, 200),
        price_from: attraction.price,
        price_range: attraction.price > 0 ? `From ${attraction.price} BHD` : 'Contact for price',
        image_url: attraction.image_url,
        area: attraction.location || 'Bahrain',
        category: attraction.category,
        booking_url: attraction.affiliate_url,
        source: attraction.source,
        source_id: attraction.original_url,
        is_active: attraction.is_active,
        is_featured: false,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'slug',
      });

    if (error) {
      console.log(`    Database error: ${error.message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.log(`    Error upserting attraction: ${error}`);
    return false;
  }
}

/**
 * Main scraper function
 */
export async function scrapeAttractions(): Promise<void> {
  console.log('='.repeat(50));
  console.log('Platinumlist Attractions Scraper - Starting');
  console.log('='.repeat(50));
  console.log(`Affiliate Code: ${AFFILIATE_CODE}`);
  console.log(`Time: ${new Date().toISOString()}`);

  // Initialize Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Launch browser
  const browser: Browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  try {
    // Step 1: Scrape all attraction URLs
    console.log('\nStep 1: Collecting attraction URLs...');
    const attractionUrls = await scrapeAttractionUrls(page);

    if (attractionUrls.length === 0) {
      console.log('No attractions found to scrape.');
      return;
    }

    // Step 2: Scrape each attraction detail
    console.log('\nStep 2: Scraping attraction details...');
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < attractionUrls.length; i++) {
      const url = attractionUrls[i];
      console.log(`\n[${i + 1}/${attractionUrls.length}]`);
      console.log(`    Scraping: ${url}`);

      const attraction = await scrapeAttractionDetail(page, url);

      if (attraction) {
        // Process and upload images
        const processedAttraction = await processImages(attraction);

        // Upsert to database
        const success = await upsertAttraction(supabase, processedAttraction);

        if (success) {
          successCount++;
          console.log(`    ✓ ${attraction.title} - ${attraction.price} BHD [${attraction.category}]`);
        } else {
          failCount++;
          console.log(`    ✗ Failed to save: ${attraction.title}`);
        }
      } else {
        failCount++;
      }

      // Rate limiting
      await page.waitForTimeout(1000);
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('Scraping Complete!');
    console.log('='.repeat(50));
    console.log(`Total attractions: ${attractionUrls.length}`);
    console.log(`Successful: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Time: ${new Date().toISOString()}`);

  } catch (error) {
    console.error('Fatal error during scraping:', error);
  } finally {
    await browser.close();
  }
}
