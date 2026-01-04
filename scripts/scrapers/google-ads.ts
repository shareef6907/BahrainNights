import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Keywords that businesses in Bahrain would bid on
const SEARCH_KEYWORDS = [
  'restaurants bahrain',
  'hotels manama',
  'things to do bahrain',
  'nightlife bahrain',
  'best restaurants manama',
  'bahrain events',
  'bahrain concerts',
  'spa bahrain',
  'brunch bahrain',
  'ladies night bahrain',
  'happy hour bahrain',
  'beach club bahrain',
  'fine dining bahrain',
];

export async function scrapeGoogleAds(): Promise<void> {
  const startTime = new Date();
  let totalFound = 0;
  let totalNew = 0;

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    // Set location to Bahrain
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    for (const keyword of SEARCH_KEYWORDS) {
      try {
        // Search on Google
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}&gl=bh`, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        await page.waitForTimeout(2000);

        // Extract sponsored results (ads)
        const sponsors = await page.evaluate(() => {
          const results: any[] = [];

          // Google Ads have "Sponsored" or "Ad" label
          const adContainers = document.querySelectorAll('[data-text-ad], [class*="commercial"], div[data-hveid]');

          adContainers.forEach(container => {
            const adText = container.textContent || '';
            const isAd = adText.includes('Sponsored') || adText.includes('Ad ·');

            if (isAd) {
              const linkEl = container.querySelector('a[href*="http"]');
              const titleEl = container.querySelector('h3, [role="heading"]');

              const url = linkEl?.getAttribute('href') || '';
              const title = titleEl?.textContent || '';

              // Extract domain from URL
              let domain = '';
              try {
                if (url && url.startsWith('http')) {
                  domain = new URL(url).hostname.replace('www.', '');
                }
              } catch (e) {}

              if (domain && domain.length > 3) {
                results.push({
                  name: title || domain,
                  domain,
                  url,
                });
              }
            }
          });

          return results;
        });

        totalFound += sponsors.length;

        // Process sponsors
        for (const sponsor of sponsors) {
          if (!sponsor.name) continue;

          const { data: existing } = await supabase
            .from('prospects')
            .select('id')
            .eq('company_name', sponsor.name)
            .single();

          if (!existing) {
            await supabase.from('prospects').insert({
              company_name: sponsor.name,
              website: sponsor.url,
              source: 'google_ads',
              source_url: `https://google.com/search?q=${encodeURIComponent(keyword)}`,
              ad_content: `Bidding on: ${keyword}`,
              relevance_score: 70, // High score - actively spending on relevant keywords
            });
            totalNew++;
          }
        }

        // Don't hammer Google
        await page.waitForTimeout(3000);

      } catch (e) {
        console.log(`Failed to search: ${keyword}`);
      }
    }

    await supabase.from('prospect_scrape_logs').insert({
      source: 'google_ads',
      status: 'success',
      prospects_found: totalFound,
      new_prospects: totalNew,
      started_at: startTime.toISOString(),
    });

  } catch (error) {
    console.error('Google Ads scrape error:', error);

    await supabase.from('prospect_scrape_logs').insert({
      source: 'google_ads',
      status: 'failed',
      error_message: (error as Error).message,
      started_at: startTime.toISOString(),
    });
  } finally {
    await browser.close();
  }
}
