import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function scrapeInstagramAds(): Promise<void> {
  const startTime = new Date();
  let prospectsFound = 0;
  let newProspects = 0;

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    // Bahrain-related hashtags
    const hashtags = [
      'bahrain', 'bahrainlife', 'bahrainfood', 'bahrainevents',
      'manama', 'bahrainrestaurants', 'bahrainnightlife'
    ];

    for (const hashtag of hashtags) {
      try {
        await page.goto(`https://www.instagram.com/explore/tags/${hashtag}/`, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        await page.waitForTimeout(3000);

        // Look for sponsored posts
        const sponsoredPosts = await page.evaluate(() => {
          const posts: any[] = [];

          const articles = document.querySelectorAll('article');

          articles.forEach(article => {
            const sponsorLabel = article.textContent?.includes('Sponsored');
            if (sponsorLabel) {
              const usernameEl = article.querySelector('a[href*="/"]');
              const username = usernameEl?.getAttribute('href')?.replace(/\//g, '') || '';

              posts.push({
                username,
                source: 'instagram',
              });
            }
          });

          return posts;
        });

        prospectsFound += sponsoredPosts.length;

        // Process sponsored posts
        for (const post of sponsoredPosts) {
          if (!post.username) continue;

          const { data: existing } = await supabase
            .from('prospects')
            .select('id')
            .eq('company_name', post.username)
            .single();

          if (!existing) {
            await supabase.from('prospects').insert({
              company_name: post.username,
              source: 'instagram',
              source_url: `https://instagram.com/${post.username}`,
              relevance_score: 45,
            });
            newProspects++;
          }
        }

      } catch (e) {
        console.log(`Failed to scrape hashtag ${hashtag}`);
      }
    }

    await supabase.from('prospect_scrape_logs').insert({
      source: 'instagram',
      status: 'success',
      prospects_found: prospectsFound,
      new_prospects: newProspects,
      started_at: startTime.toISOString(),
    });

  } catch (error) {
    console.error('Instagram scrape error:', error);

    await supabase.from('prospect_scrape_logs').insert({
      source: 'instagram',
      status: 'failed',
      error_message: (error as Error).message,
      started_at: startTime.toISOString(),
    });
  } finally {
    await browser.close();
  }
}
