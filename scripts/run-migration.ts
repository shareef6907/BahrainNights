// Script to run SQL migrations using Supabase JS client
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('Missing required environment variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function runMigration() {
  console.log('Running migration to add events scraper columns...');

  // Check current columns
  const { data: columns, error: checkError } = await supabase.rpc('get_columns', {
    p_table_name: 'events'
  }).maybeSingle();

  // If rpc doesn't work, we'll just try to add the columns directly
  // and handle any errors

  // Step 1: Add affiliate_url column
  console.log('1. Adding affiliate_url column...');
  const { error: err1 } = await supabase.from('events').select('affiliate_url').limit(1).maybeSingle();
  if (err1 && err1.code === '42703') {
    console.log('   affiliate_url column does not exist, will need SQL migration');
  } else {
    console.log('   affiliate_url column exists or accessible');
  }

  // Step 2: Add price_currency column
  console.log('2. Checking price_currency column...');
  const { error: err2 } = await supabase.from('events').select('price_currency').limit(1).maybeSingle();
  if (err2 && err2.code === '42703') {
    console.log('   price_currency column does not exist, will need SQL migration');
  } else {
    console.log('   price_currency column exists or accessible');
  }

  // Step 3: Add is_active column
  console.log('3. Checking is_active column...');
  const { error: err3 } = await supabase.from('events').select('is_active').limit(1).maybeSingle();
  if (err3 && err3.code === '42703') {
    console.log('   is_active column does not exist, will need SQL migration');
  } else {
    console.log('   is_active column exists or accessible');
  }

  console.log('\n=== MIGRATION REQUIRED ===');
  console.log('Please run the following SQL in the Supabase SQL Editor:');
  console.log('\n------- START SQL -------');
  console.log(`
-- Add affiliate_url column for Platinumlist affiliate links
ALTER TABLE events ADD COLUMN IF NOT EXISTS affiliate_url TEXT;

-- Add price_currency column (default BHD for Bahrain Dinar)
ALTER TABLE events ADD COLUMN IF NOT EXISTS price_currency TEXT DEFAULT 'BHD';

-- Add is_active column to manage event visibility
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create index on source_url for upsert operations
CREATE UNIQUE INDEX IF NOT EXISTS idx_events_source_url_unique ON events(source_url) WHERE source_url IS NOT NULL;

-- Create index on source_name for filtering
CREATE INDEX IF NOT EXISTS idx_events_source_name ON events(source_name);

-- Create index on is_active
CREATE INDEX IF NOT EXISTS idx_events_is_active ON events(is_active);
  `);
  console.log('------- END SQL -------');
  console.log('\nSupabase Dashboard: https://supabase.com/dashboard/project/[your-project]/sql/new');
}

runMigration().catch(console.error);
