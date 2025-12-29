/**
 * Cleanup Script: Delete Platinumlist Events
 * Run this script to remove all events scraped from Platinumlist
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

async function cleanupPlatinumlistEvents() {
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

  console.log('🗑️  Cleaning up Platinumlist events...\n');

  // First, count how many events we're about to delete
  const { count: eventCount, error: countError } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .or('source_name.ilike.%platinumlist%,source_name.eq.platinumlist-events,source_name.eq.platinumlist-attractions');

  if (countError) {
    console.error('Error counting events:', countError);
    process.exit(1);
  }

  console.log(`Found ${eventCount || 0} Platinumlist events to delete.\n`);

  if (!eventCount || eventCount === 0) {
    console.log('✅ No Platinumlist events found. Database is clean.');
    return;
  }

  // Delete the events
  const { error: deleteError } = await supabase
    .from('events')
    .delete()
    .or('source_name.ilike.%platinumlist%,source_name.eq.platinumlist-events,source_name.eq.platinumlist-attractions');

  if (deleteError) {
    console.error('Error deleting events:', deleteError);
    process.exit(1);
  }

  console.log(`✅ Successfully deleted ${eventCount} Platinumlist events.`);
  console.log('\n📊 Cleanup complete!');
}

// Run the cleanup
cleanupPlatinumlistEvents()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Cleanup failed:', error);
    process.exit(1);
  });
