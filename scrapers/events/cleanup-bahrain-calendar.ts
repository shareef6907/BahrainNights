/**
 * Cleanup Script: Delete Bahrain Calendar events for re-scraping
 * Run: npx tsx scrapers/events/cleanup-bahrain-calendar.ts
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

async function cleanupBahrainCalendarEvents() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log('🗑️  Deleting Bahrain Calendar events for re-scraping...\n');

  // Count events from bahrain-calendar source
  const { count: bahrainCalendarCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('source_name', 'bahrain-calendar');

  console.log(`Found ${bahrainCalendarCount || 0} Bahrain Calendar events`);

  if (bahrainCalendarCount && bahrainCalendarCount > 0) {
    // Show some sample events before deletion
    const { data: sampleEvents } = await supabase
      .from('events')
      .select('title, venue_name, date')
      .eq('source_name', 'bahrain-calendar')
      .limit(5);

    if (sampleEvents) {
      console.log('\nSample events to be deleted:');
      sampleEvents.forEach((e, i) => {
        console.log(`  ${i + 1}. ${e.title} @ ${e.venue_name || 'Unknown'} (${e.date})`);
      });
    }

    // Delete the events
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .eq('source_name', 'bahrain-calendar');

    if (deleteError) {
      console.error('\n❌ Error deleting Bahrain Calendar events:', deleteError);
    } else {
      console.log(`\n✅ Deleted ${bahrainCalendarCount} Bahrain Calendar events`);
    }
  } else {
    console.log('No Bahrain Calendar events found to delete.');
  }

  console.log('\n📊 Cleanup complete! Run the scraper to re-import events with proper venue names.');
}

// Run the cleanup
cleanupBahrainCalendarEvents()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Cleanup failed:', error);
    process.exit(1);
  });
