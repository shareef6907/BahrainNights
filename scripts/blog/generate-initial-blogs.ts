/**
 * Initial Blog Generation Script
 * Run this once to generate blogs for existing events
 *
 * Usage:
 *   npx tsx scripts/blog/generate-initial-blogs.ts
 *
 * Requirements:
 *   - SITE_URL environment variable (e.g., https://bahrainnights.com)
 *   - BLOG_GENERATION_SECRET environment variable
 */

import 'dotenv/config';

const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
const BLOG_GENERATION_SECRET = process.env.BLOG_GENERATION_SECRET;

// Configuration
const BATCH_DELAY_MS = 45000; // 45 seconds between batches to avoid rate limits
const MAX_BATCHES = 50; // Maximum number of batches to run

interface StatusResponse {
  status: string;
  stats: {
    total_articles: number;
    blogged_events: number;
    total_active_events: number;
    remaining_events: number;
  };
  recent_articles: Array<{ title: string; slug: string; created_at: string }>;
  api_configured: boolean;
}

interface GenerationResponse {
  success: boolean;
  message: string;
  processed: number;
  failed: number;
  articles: Array<{
    event_id: string;
    event_title: string;
    article_id: string;
    article_title: string;
    slug: string;
  }>;
  errors?: Array<{
    event_id: string;
    event_title: string;
    error: string;
  }>;
}

async function checkStatus(): Promise<StatusResponse> {
  const response = await fetch(
    `${SITE_URL}/api/blog/generate?secret=${BLOG_GENERATION_SECRET}`,
    { method: 'GET' }
  );

  if (!response.ok) {
    throw new Error(`Status check failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function generateBatch(): Promise<GenerationResponse> {
  const response = await fetch(
    `${SITE_URL}/api/blog/generate?secret=${BLOG_GENERATION_SECRET}`,
    { method: 'POST' }
  );

  if (!response.ok) {
    throw new Error(`Generation failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  console.log('🚀 Starting Initial Blog Generation');
  console.log('=====================================\n');

  // Validate environment
  if (!SITE_URL) {
    console.error('❌ Error: SITE_URL environment variable is not set');
    process.exit(1);
  }

  if (!BLOG_GENERATION_SECRET) {
    console.error('❌ Error: BLOG_GENERATION_SECRET environment variable is not set');
    process.exit(1);
  }

  console.log(`📡 Site URL: ${SITE_URL}`);
  console.log(`🔑 Secret: ${BLOG_GENERATION_SECRET.slice(0, 4)}...`);

  // Check initial status
  console.log('\n📊 Checking current status...');
  try {
    const status = await checkStatus();
    console.log(`   Total active events: ${status.stats.total_active_events}`);
    console.log(`   Already blogged: ${status.stats.blogged_events}`);
    console.log(`   Remaining to blog: ${status.stats.remaining_events}`);
    console.log(`   API configured: ${status.api_configured ? '✅ Yes' : '❌ No'}`);

    if (!status.api_configured) {
      console.error('\n❌ Anthropic API is not configured. Please set ANTHROPIC_API_KEY.');
      process.exit(1);
    }

    if (status.stats.remaining_events === 0) {
      console.log('\n✅ All events have already been blogged!');
      return;
    }

    // Calculate expected batches
    const expectedBatches = Math.ceil(status.stats.remaining_events / 5);
    const actualBatches = Math.min(expectedBatches, MAX_BATCHES);

    console.log(`\n📝 Planning to run ${actualBatches} batches`);
    console.log(`   (${BATCH_DELAY_MS / 1000}s delay between batches)`);

    // Confirmation
    console.log('\n⏳ Starting in 5 seconds... (Ctrl+C to cancel)\n');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Process batches
    let totalProcessed = 0;
    let totalFailed = 0;
    let batchNumber = 1;

    while (batchNumber <= actualBatches) {
      console.log(`\n📦 Batch ${batchNumber}/${actualBatches}`);
      console.log('─'.repeat(40));

      try {
        const result = await generateBatch();

        totalProcessed += result.processed;
        totalFailed += result.failed || 0;

        console.log(`   ✅ Processed: ${result.processed} articles`);

        if (result.articles?.length) {
          result.articles.forEach((article) => {
            console.log(`      • ${article.article_title}`);
            console.log(`        /blog/${article.slug}`);
          });
        }

        if (result.failed && result.failed > 0) {
          console.log(`   ⚠️  Failed: ${result.failed} articles`);
          result.errors?.forEach((err) => {
            console.log(`      • ${err.event_title}: ${err.error}`);
          });
        }

        // Check if there are more events to process
        if (result.processed === 0) {
          console.log('\n✅ No more events to process!');
          break;
        }

        // Wait before next batch
        if (batchNumber < actualBatches) {
          console.log(`\n⏳ Waiting ${BATCH_DELAY_MS / 1000}s before next batch...`);
          await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
        }

        batchNumber++;
      } catch (error) {
        console.error(`\n❌ Batch ${batchNumber} failed:`, error);

        // Continue with next batch after a longer delay
        console.log('⏳ Waiting 60s before retry...');
        await new Promise((resolve) => setTimeout(resolve, 60000));
      }
    }

    // Final summary
    console.log('\n=====================================');
    console.log('📊 Final Summary');
    console.log('=====================================');
    console.log(`   Total processed: ${totalProcessed} articles`);
    console.log(`   Total failed: ${totalFailed} articles`);

    // Check final status
    const finalStatus = await checkStatus();
    console.log(`   Remaining events: ${finalStatus.stats.remaining_events}`);

    console.log('\n✅ Initial blog generation complete!');
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

main();
