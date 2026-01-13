import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function cleanupDatabase() {
  console.log('='.repeat(50));
  console.log('Database Cleanup - Starting');
  console.log('='.repeat(50));

  // Step 1: Delete Platinumlist scraped events
  console.log('\nStep 1: Deleting Platinumlist scraped events...');
  const { data: deletedEvents, error: eventsError } = await supabase
    .from('events')
    .delete()
    .eq('source', 'platinumlist')
    .select('id');

  if (eventsError) {
    console.error('Error deleting events:', eventsError.message);
  } else {
    console.log(`  Deleted ${deletedEvents?.length || 0} scraped events`);
  }

  // Step 2: Delete Platinumlist scraped experiences/attractions
  console.log('\nStep 2: Deleting Platinumlist scraped experiences...');
  const { data: deletedExperiences, error: expError } = await supabase
    .from('experiences')
    .delete()
    .eq('source', 'platinumlist')
    .select('id');

  if (expError) {
    console.error('Error deleting experiences:', expError.message);
  } else {
    console.log(`  Deleted ${deletedExperiences?.length || 0} scraped experiences`);
  }

  // Verify remaining data
  console.log('\n' + '='.repeat(50));
  console.log('Verification - Remaining Data');
  console.log('='.repeat(50));

  const { count: eventCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true });
  console.log(`Events remaining: ${eventCount}`);

  const { count: expCount } = await supabase
    .from('experiences')
    .select('*', { count: 'exact', head: true });
  console.log(`Experiences remaining: ${expCount}`);

  const { count: venueCount } = await supabase
    .from('venues')
    .select('*', { count: 'exact', head: true });
  console.log(`Venues (untouched): ${venueCount}`);

  console.log('\n✅ Database cleanup completed!');
}

cleanupDatabase().catch(console.error);
