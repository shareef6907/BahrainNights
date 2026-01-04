import { scrapeFacebookAds } from './facebook-ads';
import { scrapeInstagramAds } from './instagram-ads';
import { scrapeNewsSites } from './news-sites';
import { scrapeGoogleAds } from './google-ads';
import { scrapeLinkedInAds } from './linkedin-ads';
import { enrichProspectsWithAI } from './ai-enrichment';

export async function runAllScrapers(): Promise<void> {
  console.log('🚀 Starting hourly prospect scraping...');
  console.log('Time:', new Date().toISOString());

  // Run scrapers in sequence to avoid overwhelming resources
  console.log('\n📘 Scraping Facebook Ads...');
  try {
    await scrapeFacebookAds();
  } catch (e) {
    console.error('Facebook scraper error:', e);
  }

  console.log('\n📸 Scraping Instagram...');
  try {
    await scrapeInstagramAds();
  } catch (e) {
    console.error('Instagram scraper error:', e);
  }

  console.log('\n🔍 Scraping Google Ads...');
  try {
    await scrapeGoogleAds();
  } catch (e) {
    console.error('Google Ads scraper error:', e);
  }

  console.log('\n💼 Scraping LinkedIn...');
  try {
    await scrapeLinkedInAds();
  } catch (e) {
    console.error('LinkedIn scraper error:', e);
  }

  console.log('\n📰 Scraping News Sites...');
  try {
    await scrapeNewsSites();
  } catch (e) {
    console.error('News sites scraper error:', e);
  }

  console.log('\n🤖 Running AI enrichment...');
  try {
    await enrichProspectsWithAI();
  } catch (e) {
    console.error('AI enrichment error:', e);
  }

  console.log('\n✅ Hourly scraping complete!');
}

// Run if called directly
if (require.main === module) {
  runAllScrapers().catch(console.error);
}
