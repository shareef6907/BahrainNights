import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load .env.local
config({ path: '.env.local' });

async function cleanupPlatinumlistEvents() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log('Deleting platinumlist events with wrong data...\n');

  // Delete all events from platinumlist source
  const { data: events, error: selectError } = await supabase
    .from('events')
    .select('id, title, price, venue_name, start_date')
    .eq('source', 'platinumlist');

  if (selectError) {
    console.error('Error selecting events:', selectError);
    return;
  }

  const eventCount = events ? events.length : 0;
  console.log(`Found ${eventCount} platinumlist events to delete`);

  if (events && events.length > 0) {
    console.log('\nEvents to delete:');
    events.forEach(e => {
      console.log(`  - ${e.title} (${e.start_date}) - ${e.price} BHD - ${e.venue_name}`);
    });

    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .eq('source', 'platinumlist');

    if (deleteError) {
      console.error('Error deleting events:', deleteError);
      return;
    }

    console.log(`\n✅ Deleted ${events.length} events`);
  }

  console.log('\nDone. Run the scraper to populate with correct data.');
}

cleanupPlatinumlistEvents().catch(console.error);
