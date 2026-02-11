/**
 * Check current event times in the database
 * to understand the timezone issue
 */
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env.local') });
dotenv.config({ path: resolve(__dirname, '../.env') });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEventTimes() {
  console.log('Checking Platinumlist events in database...\n');

  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, date, time, start_date, start_time, source_name, source_event_id')
    .eq('source_name', 'platinumlist')
    .order('start_date', { ascending: true })
    .limit(20);

  if (error) {
    console.error('Error fetching events:', error.message);
    return;
  }

  console.log(`Found ${events?.length || 0} Platinumlist events:\n`);

  events?.forEach((event, i) => {
    console.log(`${i + 1}. ${event.title}`);
    console.log(`   Date: ${event.date} | Time: ${event.time}`);
    console.log(`   Start: ${event.start_date} ${event.start_time}`);
    console.log(`   Source ID: ${event.source_event_id}`);
    console.log('');
  });

  // Also get total count
  const { count } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('source_name', 'platinumlist');

  console.log(`\nTotal Platinumlist events in DB: ${count}`);
}

checkEventTimes()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
