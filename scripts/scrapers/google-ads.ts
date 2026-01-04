import { chromium, Browser } from 'playwright';
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
  'spa bahrain',
  'brunch bahrain',
  'beach club bahrain',
  'fine dining bahrain',
];

export async function scrapeGoogleAds(): Promise<void> {
  const startTime = new Date();
  let totalFound = 0;
  let totalNew = 0;

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set a reasonable viewport and user agent
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    for (const keyword of SEARCH_KEYWORDS) {
      try {
        console.log(`  Searching for: ${keyword}`);

        // Search on Google
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}&gl=bh`, {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });

        await page.waitForTimeout(2000);

        // Check for CAPTCHA or blocking
        const pageContent = await page.content();
        if (pageContent.includes('unusual traffic') || pageContent.includes('captcha')) {
          console.log('  ⚠️ Google detected automation, skipping...');
          break;
        }

        // Extract sponsored results (ads)
        const sponsors = await page.evaluate(() => {
          const results: any[] = [];

          // Look for ads - they typically have "Sponsored" or "Ad" label
          const allElements = document.querySelectorAll('div');

          allElements.forEach(element => {
            const text = element.textContent || '';
            const isAd = text.includes('Sponsored') && element.querySelector('a');

            if (isAd) {
              const links = element.querySelectorAll('a[href*="http"]');

              links.forEach(link => {
                const url = link.getAttribute('href') || '';
                const titleEl = link.querySelector('h3, span[role="text"]');
                const title = titleEl?.textContent || link.textContent || '';

                // Skip Google's own links
                if (url.includes('google.com') || url.includes('gstatic.com')) return;

                // Extract domain from URL
                let domain = '';
                try {
                  if (url && url.startsWith('http')) {
                    const urlObj = new URL(url);
                    domain = urlObj.hostname.replace('www.', '');
                  }
                } catch (e) {}

                // Only add if we have a valid domain
                if (domain && domain.length > 3 && !domain.includes('google') && title.length > 2) {
                  results.push({
                    name: title.substring(0, 100),
                    domain,
                    url,
                  });
                }
              });
            }
          });

          // Deduplicate by domain
          const seen = new Set();
          return results.filter(r => {
            if (seen.has(r.domain)) return false;
            seen.add(r.domain);
            return true;
          });
        });

        totalFound += sponsors.length;
        console.log(`    Found ${sponsors.length} ads`);

        // Process sponsors
        for (const sponsor of sponsors) {
          if (!sponsor.name) continue;

          try {
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
          } catch (dbError) {
            console.error(`  Error saving ${sponsor.name}:`, dbError);
          }
        }

        // Don't hammer Google - longer delay
        await page.waitForTimeout(5000);

      } catch (e) {
        console.log(`  Failed to search: ${keyword}`, e);
      }
    }

    await supabase.from('prospect_scrape_logs').insert({
      source: 'google_ads',
      status: 'success',
      prospects_found: totalFound,
      new_prospects: totalNew,
      started_at: startTime.toISOString(),
    });

    console.log(`Google Ads scrape complete: ${totalFound} found, ${totalNew} new`);

  } catch (error) {
    console.error('Google Ads scrape error:', error);

    await supabase.from('prospect_scrape_logs').insert({
      source: 'google_ads',
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
