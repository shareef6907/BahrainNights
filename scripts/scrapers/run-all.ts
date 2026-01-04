import { scrapeFacebookAds } from './facebook-ads';
import { scrapeGoogleAds } from './google-ads';
import { scrapeNewsSites } from './news-sites';
import { enrichProspectsWithAI } from './ai-enrichment';

// Note: Instagram and LinkedIn scrapers disabled because they require login
// The Facebook Ad Library is the primary reliable source

export async function runAllScrapers(): Promise<void> {
  console.log('🚀 Starting hourly prospect scraping...');
  console.log('Time:', new Date().toISOString());

  const results = {
    facebook: { success: false, error: '' },
    google: { success: false, error: '' },
    newsSites: { success: false, error: '' },
    aiEnrichment: { success: false, error: '' },
  };

  // Run Facebook scraper (PRIMARY SOURCE - most reliable)
  console.log('\n📘 Scraping Facebook Ad Library...');
  try {
    await scrapeFacebookAds();
    results.facebook.success = true;
    console.log('✅ Facebook scraping completed');
  } catch (e) {
    results.facebook.error = (e as Error).message;
    console.error('❌ Facebook scraper error:', e);
  }

  // Run Google Ads scraper (may get blocked)
  console.log('\n🔍 Scraping Google Ads...');
  try {
    await scrapeGoogleAds();
    results.google.success = true;
    console.log('✅ Google Ads scraping completed');
  } catch (e) {
    results.google.error = (e as Error).message;
    console.error('❌ Google Ads scraper error:', e);
  }

  // Run News Sites scraper
  console.log('\n📰 Scraping News Sites...');
  try {
    await scrapeNewsSites();
    results.newsSites.success = true;
    console.log('✅ News sites scraping completed');
  } catch (e) {
    results.newsSites.error = (e as Error).message;
    console.error('❌ News sites scraper error:', e);
  }

  // Run AI enrichment on new prospects
  console.log('\n🤖 Running AI enrichment...');
  try {
    await enrichProspectsWithAI();
    results.aiEnrichment.success = true;
    console.log('✅ AI enrichment completed');
  } catch (e) {
    results.aiEnrichment.error = (e as Error).message;
    console.error('❌ AI enrichment error:', e);
  }

  // Summary
  console.log('\n📊 Scraping Summary:');
  console.log(`  Facebook: ${results.facebook.success ? '✅' : '❌'} ${results.facebook.error || ''}`);
  console.log(`  Google Ads: ${results.google.success ? '✅' : '❌'} ${results.google.error || ''}`);
  console.log(`  News Sites: ${results.newsSites.success ? '✅' : '❌'} ${results.newsSites.error || ''}`);
  console.log(`  AI Enrichment: ${results.aiEnrichment.success ? '✅' : '❌'} ${results.aiEnrichment.error || ''}`);

  const successCount = Object.values(results).filter(r => r.success).length;
  console.log(`\n✅ Hourly scraping complete! (${successCount}/4 sources successful)`);

  // Don't throw error if at least one scraper succeeded
  if (successCount === 0) {
    throw new Error('All scrapers failed');
  }
}

// Run if called directly
if (require.main === module) {
  runAllScrapers()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Fatal error:', err);
      process.exit(1);
    });
}
