import { createClient } from '@supabase/supabase-js';
import { scrapePlatinumlist, filterActiveExperiences, generateAffiliateUrl } from './scraper';
import { ScrapedExperience, ScraperResult } from './types';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const AFFILIATE_CODE = process.env.PLATINUMLIST_AFFILIATE_CODE || 'yjg3yzi';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Convert scraped experience to database format
function toDbFormat(exp: ScrapedExperience) {
  return {
    title: exp.title,
    description: exp.description,
    price: exp.price,
    price_currency: exp.priceCurrency,
    image_url: exp.imageUrl,
    venue: exp.venue,
    location: exp.location,
    category: exp.category,
    type: exp.type,
    original_url: exp.originalUrl,
    affiliate_url: exp.affiliateUrl,
    source: 'platinumlist',
    start_date: exp.startDate,
    end_date: exp.endDate,
    is_active: true,
    updated_at: new Date().toISOString(),
  };
}

// Bulk upsert experiences
async function bulkUpsertExperiences(experiences: ScrapedExperience[]): Promise<number> {
  if (experiences.length === 0) return 0;

  const dbRecords = experiences.map(toDbFormat);

  const { data, error } = await supabase
    .from('experiences')
    .upsert(dbRecords, {
      onConflict: 'original_url',
      ignoreDuplicates: false,
    })
    .select();

  if (error) {
    console.error('Error upserting experiences:', error);
    throw new Error(`Failed to upsert experiences: ${error.message}`);
  }

  return data?.length || 0;
}

// Deactivate experiences not in the latest scrape
async function deactivateStaleExperiences(scrapedUrls: string[]): Promise<number> {
  // Get all active platinumlist experiences
  const { data: activeExperiences, error: fetchError } = await supabase
    .from('experiences')
    .select('original_url')
    .eq('source', 'platinumlist')
    .eq('is_active', true);

  if (fetchError) {
    console.error('Error fetching active experiences:', fetchError);
    throw new Error('Failed to fetch active experiences');
  }

  const activeUrls = activeExperiences?.map(e => e.original_url) || [];
  const staleUrls = activeUrls.filter(url => !scrapedUrls.includes(url));

  if (staleUrls.length === 0) {
    console.log('No stale experiences to deactivate');
    return 0;
  }

  // Deactivate in batches
  const batchSize = 100;
  let totalDeactivated = 0;

  for (let i = 0; i < staleUrls.length; i += batchSize) {
    const batch = staleUrls.slice(i, i + batchSize);

    const { error: updateError } = await supabase
      .from('experiences')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .in('original_url', batch);

    if (updateError) {
      console.error('Error deactivating batch:', updateError);
    } else {
      totalDeactivated += batch.length;
    }
  }

  console.log(`Deactivated ${totalDeactivated} stale experiences`);
  return totalDeactivated;
}

// Main function
async function main(): Promise<ScraperResult> {
  const startTime = Date.now();
  const errors: string[] = [];

  console.log('='.repeat(50));
  console.log('Platinumlist Scraper - Starting');
  console.log('='.repeat(50));
  console.log(`Affiliate Code: ${AFFILIATE_CODE}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('');

  try {
    // Step 1: Scrape Platinumlist
    console.log('Step 1: Scraping Platinumlist...');
    const scrapedExperiences = await scrapePlatinumlist({
      affiliateCode: AFFILIATE_CODE,
    });
    console.log(`Scraped ${scrapedExperiences.length} experiences`);

    // Step 2: Filter out past events
    console.log('\nStep 2: Filtering active experiences...');
    const activeExperiences = filterActiveExperiences(scrapedExperiences);
    console.log(`${activeExperiences.length} active experiences after filtering`);

    // Step 3: Upsert to database
    console.log('\nStep 3: Upserting to database...');
    const totalUpserted = await bulkUpsertExperiences(activeExperiences);
    console.log(`Upserted ${totalUpserted} experiences`);

    // Step 4: Deactivate stale experiences
    console.log('\nStep 4: Deactivating stale experiences...');
    const scrapedUrls = activeExperiences.map((e: ScrapedExperience) => e.originalUrl);
    const totalDeactivated = await deactivateStaleExperiences(scrapedUrls);

    const duration = (Date.now() - startTime) / 1000;

    console.log('\n' + '='.repeat(50));
    console.log('Scraper Complete');
    console.log('='.repeat(50));
    console.log(`Total scraped: ${scrapedExperiences.length}`);
    console.log(`Total upserted: ${totalUpserted}`);
    console.log(`Total deactivated: ${totalDeactivated}`);
    console.log(`Duration: ${duration.toFixed(2)}s`);
    console.log(`Errors: ${errors.length}`);

    return {
      success: true,
      totalScraped: scrapedExperiences.length,
      totalUpserted,
      totalDeactivated,
      errors,
      duration,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    errors.push(errorMessage);
    console.error('\nScraper failed:', errorMessage);

    return {
      success: false,
      totalScraped: 0,
      totalUpserted: 0,
      totalDeactivated: 0,
      errors,
      duration: (Date.now() - startTime) / 1000,
    };
  }
}

// Run if called directly
main()
  .then(result => {
    console.log('\nResult:', JSON.stringify(result, null, 2));
    process.exit(result.success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

export { main as runPlatinumlistScraper };
