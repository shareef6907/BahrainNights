import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function deleteBahrainCalendarEvents() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log('=== DELETING BAHRAIN CALENDAR EVENTS ===');
  console.log('');

  // First, count how many events will be deleted
  const { data: countData, error: countError } = await supabase
    .from('events')
    .select('id, title, cover_url, source_name')
    .eq('source_name', 'bahrain-calendar');

  if (countError) {
    console.error('❌ ERROR counting events:', countError);
    return;
  }

  console.log(`Found ${countData?.length || 0} Bahrain Calendar events:`);
  countData?.forEach(e => {
    console.log(`  - ${e.title} (cover: ${e.cover_url ? 'YES' : 'NO'})`);
  });
  console.log('');

  // Delete all Bahrain Calendar events
  const { data, error } = await supabase
    .from('events')
    .delete()
    .eq('source_name', 'bahrain-calendar')
    .select();

  if (error) {
    console.error('❌ ERROR deleting events:', error);
    return;
  }

  console.log(`✅ DELETED ${data?.length || 0} Bahrain Calendar events`);
  console.log('');
  console.log('These events will be re-scraped with the new image fix.');
}

deleteBahrainCalendarEvents().catch(console.error);
