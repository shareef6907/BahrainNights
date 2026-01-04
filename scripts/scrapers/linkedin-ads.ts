import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function scrapeLinkedInAds(): Promise<void> {
  const startTime = new Date();
  let totalFound = 0;
  let totalNew = 0;

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    // LinkedIn Ads Library (no login required)
    await page.goto('https://www.linkedin.com/ad-library/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(3000);

    // Search for Bahrain-related ads
    const searchInput = await page.$('input[type="search"], input[placeholder*="Search"]');
    if (searchInput) {
      await searchInput.fill('Bahrain');
      await searchInput.press('Enter');
      await page.waitForTimeout(5000);

      // Extract advertisers
      const advertisers = await page.evaluate(() => {
        const results: any[] = [];

        const adCards = document.querySelectorAll('[class*="ad-card"], [class*="result"], [class*="entity"]');

        adCards.forEach(card => {
          const companyEl = card.querySelector('[class*="company"], [class*="advertiser"], [class*="name"], a');
          const companyName = companyEl?.textContent?.trim() || '';
          const companyUrl = (companyEl as HTMLAnchorElement)?.href || '';

          if (companyName && companyName.length > 2 && companyName.length < 100) {
            results.push({
              name: companyName,
              url: companyUrl,
            });
          }
        });

        return results;
      });

      totalFound = advertisers.length;

      for (const advertiser of advertisers) {
        if (!advertiser.name) continue;

        const { data: existing } = await supabase
          .from('prospects')
          .select('id')
          .eq('company_name', advertiser.name)
          .single();

        if (!existing) {
          await supabase.from('prospects').insert({
            company_name: advertiser.name,
            source: 'linkedin',
            source_url: advertiser.url || 'https://linkedin.com',
            relevance_score: 60,
          });
          totalNew++;
        }
      }
    }

    await supabase.from('prospect_scrape_logs').insert({
      source: 'linkedin',
      status: 'success',
      prospects_found: totalFound,
      new_prospects: totalNew,
      started_at: startTime.toISOString(),
    });

  } catch (error) {
    console.error('LinkedIn scrape error:', error);

    await supabase.from('prospect_scrape_logs').insert({
      source: 'linkedin',
      status: 'failed',
      error_message: (error as Error).message,
      started_at: startTime.toISOString(),
    });
  } finally {
    await browser.close();
  }
}
