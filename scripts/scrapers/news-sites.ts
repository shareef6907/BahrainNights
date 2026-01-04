import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const NEWS_SITES = [
  { name: 'GDN Online', url: 'https://www.gdnonline.com' },
  { name: 'BNA', url: 'https://www.bna.bh/en/' },
  { name: 'News of Bahrain', url: 'https://www.newsofbahrain.com' },
  { name: 'Bahrain This Week', url: 'https://www.bahrainthisweek.com' },
  { name: 'TradeArabia', url: 'https://www.tradearabia.com/news/bahrain.html' },
];

export async function scrapeNewsSites(): Promise<void> {
  const startTime = new Date();
  let totalFound = 0;
  let totalNew = 0;

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    for (const site of NEWS_SITES) {
      try {
        await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(3000);

        // Extract display ads
        const advertisers = await page.evaluate(() => {
          const ads: string[] = [];

          // Look for common ad containers
          const adSelectors = [
            'iframe[src*="doubleclick"]',
            'iframe[src*="googlesyndication"]',
            'div[class*="ad-"]',
            'div[class*="advertisement"]',
            'div[id*="google_ads"]',
            'div[class*="banner"]',
            'a[href*="utm_"]',
            'img[alt*="ad"]',
            'img[alt*="sponsor"]',
          ];

          adSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
              const alt = el.getAttribute('alt') || '';
              const title = el.getAttribute('title') || '';
              const dataAdvertiser = el.getAttribute('data-advertiser') || '';

              if (alt && !alt.toLowerCase().includes('ad') && alt.length > 3 && alt.length < 100) ads.push(alt);
              if (title && title.length > 3 && title.length < 100) ads.push(title);
              if (dataAdvertiser) ads.push(dataAdvertiser);

              // Check parent for sponsor text
              const parent = el.closest('div');
              if (parent) {
                const sponsorText = parent.querySelector('[class*="sponsor"]');
                if (sponsorText?.textContent && sponsorText.textContent.length < 100) {
                  ads.push(sponsorText.textContent.trim());
                }
              }
            });
          });

          // Also look for sponsored content sections
          const sponsoredSections = document.querySelectorAll('[class*="sponsored"], [class*="partner"]');
          sponsoredSections.forEach(section => {
            const links = section.querySelectorAll('a');
            links.forEach(link => {
              const text = link.textContent?.trim();
              if (text && text.length > 3 && text.length < 100) {
                ads.push(text);
              }
            });
          });

          return Array.from(new Set(ads)); // Remove duplicates
        });

        totalFound += advertisers.length;

        // Process advertisers
        for (const advertiser of advertisers) {
          if (!advertiser || advertiser.length < 3) continue;

          const cleanName = advertiser.trim().substring(0, 100);

          const { data: existing } = await supabase
            .from('prospects')
            .select('id')
            .eq('company_name', cleanName)
            .single();

          if (!existing) {
            await supabase.from('prospects').insert({
              company_name: cleanName,
              source: 'news_site',
              source_url: site.url,
              ad_content: `Found on ${site.name}`,
              relevance_score: 55,
            });
            totalNew++;
          }
        }

      } catch (e) {
        console.log(`Failed to scrape ${site.name}: ${e}`);
      }
    }

    await supabase.from('prospect_scrape_logs').insert({
      source: 'news_sites',
      status: 'success',
      prospects_found: totalFound,
      new_prospects: totalNew,
      started_at: startTime.toISOString(),
    });

  } catch (error) {
    console.error('News sites scrape error:', error);

    await supabase.from('prospect_scrape_logs').insert({
      source: 'news_sites',
      status: 'failed',
      error_message: (error as Error).message,
      started_at: startTime.toISOString(),
    });
  } finally {
    await browser.close();
  }
}
