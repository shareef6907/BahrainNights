import { chromium, Browser, Page } from 'playwright';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface FacebookAd {
  advertiser: string;
  pageUrl: string;
  adContent: string;
  libraryId: string;
  platforms: string[];
}

// Search terms to find Bahrain businesses
const SEARCH_TERMS = [
  'restaurant',
  'cafe',
  'lounge',
  'hotel',
  'spa',
  'salon',
  'gym',
  'fitness',
  'shop',
  'store',
  'bahrain',
];

async function scrapeSearchTerm(page: Page, searchTerm: string): Promise<FacebookAd[]> {
  const ads: FacebookAd[] = [];

  try {
    // Clear any existing search and search for new term
    const searchBox = page.locator('input[placeholder*="Search by keyword"]');
    await searchBox.clear();
    await searchBox.fill(searchTerm);
    await searchBox.press('Enter');

    // Wait for results to load
    await page.waitForTimeout(3000);

    // Scroll to load more results
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1500);
    }

    // Extract ad information from the page
    const adCards = await page.evaluate(() => {
      const results: any[] = [];

      // Find all ad cards - they contain "Active" status and advertiser info
      // Looking for the card containers that have the advertiser name
      const allLinks = document.querySelectorAll('a[href*="/ads/library/"]');
      const processedAdvertisers = new Set<string>();

      allLinks.forEach((link) => {
        try {
          // Find the card container (go up the DOM tree)
          let card = link.closest('div[class]');
          if (!card) return;

          // Go up to find the main card container
          for (let i = 0; i < 10; i++) {
            if (card?.parentElement) {
              card = card.parentElement;
              // Check if this looks like an ad card (has Library ID text)
              if (card.textContent?.includes('Library ID:')) {
                break;
              }
            }
          }

          if (!card) return;

          const cardText = card.textContent || '';

          // Extract Library ID
          const libraryIdMatch = cardText.match(/Library ID:\s*(\d+)/);
          const libraryId = libraryIdMatch ? libraryIdMatch[1] : '';

          // Find advertiser name - it's usually in a span after the ad content area
          // Look for links that are advertiser pages
          const advertiserLinks = card.querySelectorAll('a');
          let advertiser = '';
          let pageUrl = '';

          advertiserLinks.forEach((advLink) => {
            const href = advLink.getAttribute('href') || '';
            const text = advLink.textContent?.trim() || '';

            // Skip if it's a generic link or empty
            if (!text || text === 'See ad details' || text.includes('Library ID')) return;

            // Check if this looks like an advertiser name (not a URL, has text)
            if (text.length > 2 && text.length < 100 && !text.includes('http')) {
              // Prefer Facebook page links
              if (href.includes('facebook.com') && !href.includes('/ads/library')) {
                advertiser = text;
                pageUrl = href;
              } else if (!advertiser && text !== 'Sponsored') {
                advertiser = text;
                pageUrl = href;
              }
            }
          });

          // Skip if no advertiser found or already processed
          if (!advertiser || processedAdvertisers.has(advertiser)) return;
          processedAdvertisers.add(advertiser);

          // Extract ad content - look for longer text blocks
          let adContent = '';
          const textNodes = card.querySelectorAll('span, div');
          textNodes.forEach((node) => {
            const text = node.textContent?.trim() || '';
            // Look for text that looks like ad copy (longer, not metadata)
            if (text.length > 50 && text.length < 1000 &&
                !text.includes('Library ID') &&
                !text.includes('Started running') &&
                !text.includes('Platforms')) {
              if (text.length > adContent.length) {
                adContent = text;
              }
            }
          });

          // Detect platforms from icons/text
          const platforms: string[] = [];
          if (cardText.includes('Facebook') || card.querySelector('[aria-label*="Facebook"]')) {
            platforms.push('Facebook');
          }
          if (cardText.includes('Instagram') || card.querySelector('[aria-label*="Instagram"]')) {
            platforms.push('Instagram');
          }
          if (cardText.includes('Messenger')) {
            platforms.push('Messenger');
          }

          if (advertiser) {
            results.push({
              advertiser,
              pageUrl,
              adContent: adContent.substring(0, 500),
              libraryId,
              platforms,
            });
          }
        } catch (e) {
          // Skip problematic elements
        }
      });

      return results;
    });

    ads.push(...adCards);
    console.log(`  Found ${adCards.length} ads for "${searchTerm}"`);

  } catch (error) {
    console.error(`Error scraping "${searchTerm}":`, error);
  }

  return ads;
}

export async function scrapeFacebookAds(): Promise<void> {
  const startTime = new Date();
  let totalProspectsFound = 0;
  let newProspects = 0;

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set a reasonable viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Navigate to Facebook Ad Library for Bahrain
    console.log('Navigating to Facebook Ad Library...');
    await page.goto('https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BH&media_type=all', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    await page.waitForTimeout(3000);

    // Select "All ads" category
    console.log('Selecting "All ads" category...');
    try {
      // Click the Ad category dropdown
      const categoryDropdown = page.locator('div[role="combobox"]:has-text("Ad category")');
      await categoryDropdown.click();
      await page.waitForTimeout(1000);

      // Click "All ads" option
      const allAdsOption = page.locator('div[role="gridcell"]:has-text("All ads")');
      await allAdsOption.click();
      await page.waitForTimeout(2000);
    } catch (e) {
      console.log('Category selection skipped or failed, continuing...');
    }

    // Collect all unique ads from different searches
    const allAds = new Map<string, FacebookAd>();

    for (const searchTerm of SEARCH_TERMS) {
      console.log(`Searching for "${searchTerm}"...`);
      const ads = await scrapeSearchTerm(page, searchTerm);

      for (const ad of ads) {
        // Use advertiser name as key to deduplicate
        if (!allAds.has(ad.advertiser)) {
          allAds.set(ad.advertiser, ad);
        }
      }

      // Small delay between searches
      await page.waitForTimeout(2000);
    }

    totalProspectsFound = allAds.size;
    console.log(`Total unique advertisers found: ${totalProspectsFound}`);

    // Process each ad and save to database
    for (const ad of allAds.values()) {
      if (!ad.advertiser) continue;

      try {
        // Check if already exists
        const { data: existing } = await supabase
          .from('prospects')
          .select('id')
          .eq('company_name', ad.advertiser)
          .single();

        if (existing) {
          // Update last_seen_at and add sighting
          await supabase
            .from('prospects')
            .update({ last_seen_at: new Date().toISOString() })
            .eq('id', existing.id);

          await supabase
            .from('prospect_sightings')
            .insert({
              prospect_id: existing.id,
              source: 'facebook',
              source_url: ad.pageUrl,
              ad_content: ad.adContent,
            });
        } else {
          // Create new prospect
          const { data: newProspect } = await supabase
            .from('prospects')
            .insert({
              company_name: ad.advertiser,
              source: 'facebook',
              source_url: ad.pageUrl,
              ad_content: ad.adContent,
              industry: 'Unknown',
              relevance_score: 50,
            })
            .select()
            .single();

          if (newProspect) {
            newProspects++;
          }
        }
      } catch (dbError) {
        console.error(`Error saving prospect "${ad.advertiser}":`, dbError);
      }
    }

    // Log the scrape
    await supabase.from('prospect_scrape_logs').insert({
      source: 'facebook',
      status: 'success',
      prospects_found: totalProspectsFound,
      new_prospects: newProspects,
      started_at: startTime.toISOString(),
    });

    console.log(`Facebook scrape complete: ${totalProspectsFound} found, ${newProspects} new`);

  } catch (error) {
    console.error('Facebook scrape error:', error);

    await supabase.from('prospect_scrape_logs').insert({
      source: 'facebook',
      status: 'failed',
      error_message: (error as Error).message,
      started_at: startTime.toISOString(),
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run if called directly
if (require.main === module) {
  scrapeFacebookAds().catch(console.error);
}
