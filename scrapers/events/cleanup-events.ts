/**
 * Cleanup Script: Delete dummy/test events and bad Al Dana events
 * Run this script to clean up the database
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

async function cleanupEvents() {
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

  console.log('🗑️  Starting Event Cleanup...\n');

  // TASK 1: Delete dummy/test events (no source_name or source_url)
  console.log('=== TASK 1: Deleting dummy/test events ===');

  // Count events with no source
  const { count: noSourceCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .or('source_name.is.null,source_name.eq.');

  console.log(`Found ${noSourceCount || 0} events without source_name`);

  if (noSourceCount && noSourceCount > 0) {
    const { error: noSourceError } = await supabase
      .from('events')
      .delete()
      .or('source_name.is.null,source_name.eq.');

    if (noSourceError) {
      console.error('Error deleting no-source events:', noSourceError);
    } else {
      console.log(`✅ Deleted ${noSourceCount} events without source_name`);
    }
  }

  // Delete specific test events by title
  const testTitles = ['Friday Brunch', 'Beach Party', 'Test Event'];
  const { count: testCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .in('title', testTitles);

  if (testCount && testCount > 0) {
    const { error: testError } = await supabase
      .from('events')
      .delete()
      .in('title', testTitles);

    if (testError) {
      console.error('Error deleting test events:', testError);
    } else {
      console.log(`✅ Deleted ${testCount} test events by title`);
    }
  }

  // Delete draft/pending events
  const { count: draftCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .in('status', ['draft', 'pending']);

  if (draftCount && draftCount > 0) {
    const { error: draftError } = await supabase
      .from('events')
      .delete()
      .in('status', ['draft', 'pending']);

    if (draftError) {
      console.error('Error deleting draft/pending events:', draftError);
    } else {
      console.log(`✅ Deleted ${draftCount} draft/pending events`);
    }
  }

  // TASK 2: Delete Al Dana events
  console.log('\n=== TASK 2: Deleting Al Dana events ===');

  const { count: aldanaCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .ilike('source_name', '%aldana%');

  console.log(`Found ${aldanaCount || 0} Al Dana events`);

  if (aldanaCount && aldanaCount > 0) {
    const { error: aldanaError } = await supabase
      .from('events')
      .delete()
      .ilike('source_name', '%aldana%');

    if (aldanaError) {
      console.error('Error deleting Al Dana events:', aldanaError);
    } else {
      console.log(`✅ Deleted ${aldanaCount} Al Dana events`);
    }
  }

  // TASK 6: Verify remaining events
  console.log('\n=== TASK 6: Verifying remaining events ===');

  const { data: remainingEvents, count: totalCount } = await supabase
    .from('events')
    .select('id, title, source_name, venue_name, date, cover_url, description', { count: 'exact' })
    .eq('status', 'published')
    .order('date', { ascending: true });

  console.log(`\n📊 Remaining Events: ${totalCount || 0}`);

  if (remainingEvents && remainingEvents.length > 0) {
    console.log('\n--- Event Details ---');
    remainingEvents.forEach((event, i) => {
      const hasImage = event.cover_url ? '✅' : '❌';
      const hasDesc = event.description && event.description.length > 50 ? '✅' : '❌';
      console.log(`${i + 1}. ${event.title}`);
      console.log(`   Source: ${event.source_name || 'N/A'}`);
      console.log(`   Venue: ${event.venue_name || 'N/A'}`);
      console.log(`   Date: ${event.date || 'N/A'}`);
      console.log(`   Image: ${hasImage} | Description: ${hasDesc}`);
      console.log('');
    });
  } else {
    console.log('No events remaining in database.');
  }

  console.log('\n📊 Cleanup complete!');
}

// Run the cleanup
cleanupEvents()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Cleanup failed:', error);
    process.exit(1);
  });
