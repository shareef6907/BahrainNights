import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testQuery() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log('=== TESTING EXACT QUERY FROM EVENTS PAGE ===');
  console.log('Query: .from("events").select("*").eq("status", "published").order("date", { ascending: true })');
  console.log('');

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('date', { ascending: true });

  if (error) {
    console.error('❌ ERROR:', error);
    return;
  }

  console.log('✅ SUCCESS! Found', data?.length || 0, 'events');
  console.log('');

  if (data && data.length > 0) {
    console.log('=== EVENTS ===');
    for (const e of data) {
      console.log(`- ${e.title} (date: ${e.date}, status: ${e.status})`);
    }
  }
}

testQuery().catch(console.error);
