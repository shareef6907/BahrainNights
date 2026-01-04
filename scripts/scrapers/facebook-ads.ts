import { chromium, Browser, Page } from 'playwright';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid errors at module load time
let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
    }

    supabase = createClient(url, key);
  }
  return supabase;
}

interface FacebookAd {
  advertiser: string;
  libraryId: string;
  platforms: string[];
}

// Search terms to find Bahrain businesses
const SEARCH_TERMS = [
  'restaurant',
  'cafe',
  'hotel',
  'spa',
  'gym',
  'salon',
];

export async function scrapeFacebookAds(): Promise<void> {
  const startTime = new Date();
  let totalProspectsFound = 0;
  let newProspects = 0;

  let browser: Browser | null = null;

  try {
    console.log('Launching browser...');
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Collect all unique advertisers
    const allAdvertisers = new Map<string, FacebookAd>();

    for (const searchTerm of SEARCH_TERMS) {
      try {
        console.log(`Searching for "${searchTerm}"...`);

        // Navigate directly to search URL - this is the most reliable method
        const searchUrl = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BH&media_type=all&q=${encodeURIComponent(searchTerm)}&search_type=keyword_unordered`;

        await page.goto(searchUrl, {
          waitUntil: 'networkidle',
          timeout: 60000
        });

        // Wait for results to load
        await page.waitForTimeout(3000);

        // Check if we got results or an error
        const pageContent = await page.content();
        if (pageContent.includes('Sorry! Something went wrong') || pageContent.includes('Rate limit')) {
          console.log(`  Rate limited or error, skipping "${searchTerm}"...`);
          await page.waitForTimeout(5000);
          continue;
        }

        // Scroll to load more results
        for (let i = 0; i < 2; i++) {
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await page.waitForTimeout(1500);
        }

        // Extract advertiser information from the page
        const ads = await page.evaluate(() => {
          const results: Array<{ advertiser: string; libraryId: string; platforms: string[] }> = [];
          const seen = new Set<string>();

          // Find all ad cards - they have Library ID text
          const allText = document.body.innerText;

          // Find Library IDs using regex
          const libraryIdMatches = allText.match(/Library ID:\s*(\d+)/g) || [];

          // Find all links that could be advertiser pages
          const links = document.querySelectorAll('a[href*="facebook.com"]');

          links.forEach(link => {
            const text = link.textContent?.trim() || '';
            const href = link.getAttribute('href') || '';

            // Skip navigation links, empty text, and generic links
            if (!text ||
                text.length < 2 ||
                text.length > 100 ||
                text === 'See ad details' ||
                text.includes('Library ID') ||
                text.includes('Ad Library') ||
                text.includes('Log in') ||
                text.includes('Meta') ||
                href.includes('/ads/library/') ||
                href.includes('source=')) {
              return;
            }

            // Check if this looks like a business name (has letters, not just symbols)
            if (/[a-zA-Z]/.test(text) && !seen.has(text)) {
              seen.add(text);
              results.push({
                advertiser: text,
                libraryId: '',
                platforms: ['Facebook']
              });
            }
          });

          return results.slice(0, 50); // Limit to 50 per search term
        });

        console.log(`  Found ${ads.length} advertisers for "${searchTerm}"`);

        for (const ad of ads) {
          if (!allAdvertisers.has(ad.advertiser)) {
            allAdvertisers.set(ad.advertiser, ad);
          }
        }

        // Delay between searches to avoid rate limiting
        await page.waitForTimeout(3000);

      } catch (error) {
        console.error(`Error searching "${searchTerm}":`, error);
      }
    }

    totalProspectsFound = allAdvertisers.size;
    console.log(`Total unique advertisers found: ${totalProspectsFound}`);

    // Save to database
    for (const ad of Array.from(allAdvertisers.values())) {
      if (!ad.advertiser) continue;

      try {
        // Check if already exists
        const { data: existing } = await getSupabase()
          .from('prospects')
          .select('id')
          .eq('company_name', ad.advertiser)
          .single();

        if (!existing) {
          // Create new prospect
          const { error } = await getSupabase()
            .from('prospects')
            .insert({
              company_name: ad.advertiser,
              source: 'facebook',
              source_url: `https://www.facebook.com/ads/library/?q=${encodeURIComponent(ad.advertiser)}`,
              industry: 'Unknown',
              relevance_score: 50,
            });

          if (!error) {
            newProspects++;
          }
        }
      } catch (dbError) {
        // Ignore duplicate errors
      }
    }

    // Log the scrape
    await getSupabase().from('prospect_scrape_logs').insert({
      source: 'facebook',
      status: 'success',
      prospects_found: totalProspectsFound,
      new_prospects: newProspects,
      started_at: startTime.toISOString(),
    });

    console.log(`Facebook scrape complete: ${totalProspectsFound} found, ${newProspects} new`);

  } catch (error) {
    console.error('Facebook scrape error:', error);

    try {
      await getSupabase().from('prospect_scrape_logs').insert({
        source: 'facebook',
        status: 'failed',
        error_message: (error as Error).message,
        started_at: startTime.toISOString(),
      });
    } catch (e) {
      // Ignore logging errors
    }
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
