import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkEvents() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get all events with their status
  const { data, error } = await supabase
    .from('events')
    .select('id, title, status, date, source_name')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== ALL EVENTS IN DATABASE ===');
  console.log('Total:', data.length);
  console.log('');

  // Group by status
  const byStatus: Record<string, typeof data> = {};
  for (const e of data) {
    const status = e.status || 'NULL';
    if (!byStatus[status]) byStatus[status] = [];
    byStatus[status].push(e);
  }

  console.log('=== BY STATUS ===');
  for (const [status, events] of Object.entries(byStatus)) {
    console.log(`${status}: ${events.length} events`);
    for (const e of events.slice(0, 3)) {
      console.log(`  - ${e.title?.substring(0, 50)} (date: ${e.date})`);
    }
    if (events.length > 3) console.log(`  ... and ${events.length - 3} more`);
  }
}

checkEvents().catch(console.error);
