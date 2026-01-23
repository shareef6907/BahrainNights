const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🚀 Running Mukta Scraper database migrations...\n');

  // Check movies table structure
  console.log('📊 Checking movies table structure...');
  const { data: movies, error: moviesError } = await supabase
    .from('movies')
    .select('*')
    .limit(1);

  if (moviesError) {
    console.error('❌ Error accessing movies table:', moviesError.message);
    return;
  }

  if (movies && movies.length > 0) {
    const sampleMovie = movies[0];
    const columns = Object.keys(sampleMovie);
    console.log('Current movie columns:', columns.join(', '));

    // Check for new columns
    const hasSource = columns.includes('cinema_source');
    const hasStatus = columns.includes('mukta_status');
    const hasSynced = columns.includes('last_synced_at');

    console.log(`\n📋 Column check:`);
    console.log(`  cinema_source: ${hasSource ? '✅' : '❌'}`);
    console.log(`  mukta_status: ${hasStatus ? '✅' : '❌'}`);
    console.log(`  last_synced_at: ${hasSynced ? '✅' : '❌'}`);

    if (!hasSource || !hasStatus || !hasSynced) {
      console.log('\n⚠️ Missing columns. Please run this SQL in Supabase SQL Editor:\n');
      console.log('----------------------------------------');
      console.log(`
-- Add source tracking columns to movies
ALTER TABLE movies ADD COLUMN IF NOT EXISTS cinema_source TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS cinema_source_id TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMP;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS mukta_status TEXT;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_movies_cinema_source ON movies(cinema_source);
CREATE INDEX IF NOT EXISTS idx_movies_mukta_status ON movies(mukta_status);
      `);
      console.log('----------------------------------------');
    }
  }

  // Check scraper logs table
  console.log('\n📋 Checking cinema_scraper_logs table...');
  const { data: logs, error: logsError } = await supabase
    .from('cinema_scraper_logs')
    .select('*')
    .limit(1);

  if (logsError) {
    if (logsError.message.includes('does not exist')) {
      console.log('❌ cinema_scraper_logs table does not exist');
      console.log('\n⚠️ Please run this SQL in Supabase SQL Editor:\n');
      console.log('----------------------------------------');
      console.log(`
-- Create scraper logs table
CREATE TABLE IF NOT EXISTS cinema_scraper_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cinema_chain TEXT NOT NULL,
  status TEXT NOT NULL,
  movies_found INTEGER DEFAULT 0,
  movies_updated INTEGER DEFAULT 0,
  coming_soon_count INTEGER DEFAULT 0,
  now_showing_count INTEGER DEFAULT 0,
  error_message TEXT,
  details JSONB,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for logs
CREATE INDEX IF NOT EXISTS idx_scraper_logs_cinema ON cinema_scraper_logs(cinema_chain);
CREATE INDEX IF NOT EXISTS idx_scraper_logs_created ON cinema_scraper_logs(created_at DESC);
      `);
      console.log('----------------------------------------');
    } else {
      console.error('Error checking logs table:', logsError.message);
    }
  } else {
    console.log('✅ cinema_scraper_logs table exists');
  }

  console.log('\n✅ Migration check complete!');
}

runMigration().catch(console.error);
