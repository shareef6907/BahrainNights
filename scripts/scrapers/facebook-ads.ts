import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface FacebookAd {
  advertiser: string;
  pageUrl: string;
  adContent: string;
  category: string;
}

export async function scrapeFacebookAds(): Promise<void> {
  const startTime = new Date();
  let prospectsFound = 0;
  let newProspects = 0;

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Facebook Ad Library - Active ads in Bahrain
    await page.goto('https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BH&media_type=all', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    await page.waitForTimeout(5000);

    // Scroll to load more ads
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
    }

    // Extract advertisers
    const ads = await page.evaluate(() => {
      const results: any[] = [];

      // Find all ad cards
      const adCards = document.querySelectorAll('[class*="_7jvw"], [class*="xrvj5dj"], div[role="article"]');

      adCards.forEach((card) => {
        try {
          // Get advertiser name
          const advertiserEl = card.querySelector('a[href*="/ads/library/?active_status"]') ||
                              card.querySelector('span[class*="x8t9es0"]') ||
                              card.querySelector('a > span');

          const advertiser = advertiserEl?.textContent?.trim() || '';

          if (advertiser && advertiser.length > 2) {
            // Get page URL
            const pageLink = card.querySelector('a[href*="facebook.com"]');
            const pageUrl = pageLink?.getAttribute('href') || '';

            // Get ad content
            const contentEl = card.querySelector('[class*="_4ik4"], [class*="x1lliihq"]');
            const adContent = contentEl?.textContent?.trim().substring(0, 500) || '';

            results.push({
              advertiser,
              pageUrl,
              adContent,
              category: 'Facebook/Instagram Ads'
            });
          }
        } catch (e) {
          // Skip problematic cards
        }
      });

      return results;
    });

    prospectsFound = ads.length;

    // Process each ad
    for (const ad of ads) {
      if (!ad.advertiser) continue;

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
    }

    // Log the scrape
    await supabase.from('prospect_scrape_logs').insert({
      source: 'facebook',
      status: 'success',
      prospects_found: prospectsFound,
      new_prospects: newProspects,
      started_at: startTime.toISOString(),
    });

    console.log(`Facebook scrape complete: ${prospectsFound} found, ${newProspects} new`);

  } catch (error) {
    console.error('Facebook scrape error:', error);

    await supabase.from('prospect_scrape_logs').insert({
      source: 'facebook',
      status: 'failed',
      error_message: (error as Error).message,
      started_at: startTime.toISOString(),
    });
  } finally {
    await browser.close();
  }
}
