/**
 * Fix Al Dana venue data in database
 * Updates venue_name and venue_address for all Al Dana events
 *
 * Run with: npx tsx scripts/fix-aldana-venue.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Correct venue information
const CORRECT_VENUE = {
  name: 'Beyon Al Dana Amphitheatre',
  address: 'Bahrain International Circuit, Sakhir, Bahrain',
};

async function fixAlDanaVenue() {
  console.log('Fixing Al Dana venue data...\n');

  // Find all Al Dana events
  const { data: events, error: fetchError } = await supabase
    .from('events')
    .select('id, title, venue_name, venue_address')
    .or('venue_name.ilike.%Al Dana%,venue_name.ilike.%Dana Amphitheatre%,source_name.eq.aldana');

  if (fetchError) {
    console.error('Error fetching events:', fetchError);
    return;
  }

  if (!events || events.length === 0) {
    console.log('No Al Dana events found.');
    return;
  }

  console.log(`Found ${events.length} Al Dana events to update:\n`);
  events.forEach(e => {
    console.log(`  - ${e.title}`);
    console.log(`    Current: ${e.venue_name} | ${e.venue_address}`);
  });

  // Update each event individually
  let updatedCount = 0;
  for (const event of events) {
    const { error: updateError } = await supabase
      .from('events')
      .update({
        venue_name: CORRECT_VENUE.name,
        venue_address: CORRECT_VENUE.address,
      })
      .eq('id', event.id);

    if (updateError) {
      console.error(`\nError updating event ${event.title}:`, updateError);
    } else {
      updatedCount++;
    }
  }

  console.log(`\n✅ Updated ${updatedCount} events with correct venue info:`);
  console.log(`   Name: ${CORRECT_VENUE.name}`);
  console.log(`   Address: ${CORRECT_VENUE.address}`);
}

fixAlDanaVenue()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Script failed:', err);
    process.exit(1);
  });
