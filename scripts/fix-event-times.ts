/**
 * Fix event times - add 3 hours to convert from UTC to Bahrain time (UTC+3)
 * 
 * This fixes the bug where times were stored in UTC instead of local Bahrain time.
 * The original code used toTimeString() which outputs in server's local timezone,
 * but when running on a UTC server, times were stored as UTC instead of UTC+3.
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

/**
 * Add hours to a time string (HH:MM or HH:MM:SS format)
 */
function addHoursToTime(timeStr: string, hoursToAdd: number): string {
  if (!timeStr) return timeStr;
  
  const parts = timeStr.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const seconds = parts[2] || '00';
  
  hours = (hours + hoursToAdd) % 24;
  if (hours < 0) hours += 24;
  
  return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
}

async function fixEventTimes() {
  console.log('🔧 Fixing Platinumlist event times...\n');
  console.log('Adding 3 hours to convert from UTC to Bahrain time (UTC+3)\n');

  // Get all Platinumlist events from Bahrain
  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, time, start_time, end_time')
    .eq('source_name', 'platinumlist')
    .eq('country', 'Bahrain');

  if (error) {
    console.error('Error fetching events:', error.message);
    return;
  }

  console.log(`Found ${events?.length || 0} Bahrain events to fix.\n`);

  let fixed = 0;
  let errors = 0;

  for (const event of events || []) {
    const newTime = event.time ? addHoursToTime(event.time, 3) : null;
    const newStartTime = event.start_time ? addHoursToTime(event.start_time, 3) : null;
    const newEndTime = event.end_time ? addHoursToTime(event.end_time, 3) : null;

    // Only update if there's a change
    if (newTime !== event.time || newStartTime !== event.start_time || newEndTime !== event.end_time) {
      const { error: updateError } = await supabase
        .from('events')
        .update({
          time: newTime,
          start_time: newStartTime,
          end_time: newEndTime,
          updated_at: new Date().toISOString(),
        })
        .eq('id', event.id);

      if (updateError) {
        console.error(`❌ Error updating "${event.title}": ${updateError.message}`);
        errors++;
      } else {
        console.log(`✅ Fixed "${event.title}": ${event.time} -> ${newTime}`);
        fixed++;
      }
    }
  }

  console.log(`\n✨ Done! Fixed ${fixed} events, ${errors} errors.`);
}

fixEventTimes()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
