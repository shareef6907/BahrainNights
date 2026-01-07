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

  // Use Supabase's REST API to execute raw SQL
  const projectRef = supabaseUrl.split('//')[1].split('.')[0];

  const migrationSQL = `
-- Add source tracking columns to movies table
ALTER TABLE movies ADD COLUMN IF NOT EXISTS cinema_source TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS cinema_source_id TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS mukta_status TEXT;

-- Create scraper logs table
CREATE TABLE IF NOT EXISTS cinema_scraper_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cinema_chain TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  movies_found INTEGER DEFAULT 0,
  movies_updated INTEGER DEFAULT 0,
  coming_soon_count INTEGER DEFAULT 0,
  now_showing_count INTEGER DEFAULT 0,
  error_message TEXT,
  details JSONB,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_movies_cinema_source ON movies(cinema_source);
CREATE INDEX IF NOT EXISTS idx_movies_mukta_status ON movies(mukta_status);
CREATE INDEX IF NOT EXISTS idx_scraper_logs_cinema ON cinema_scraper_logs(cinema_chain);
CREATE INDEX IF NOT EXISTS idx_scraper_logs_created ON cinema_scraper_logs(created_at DESC);
  `;

  // Execute SQL via Supabase SQL execution
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: migrationSQL }),
  });

  if (!response.ok) {
    console.log('Direct SQL execution not available, trying alternative approach...\n');

    // Alternative: Test by inserting to the logs table to trigger creation
    // First, try to verify the movies columns
    console.log('📊 Testing movies table columns...');

    const { data: testData, error: testError } = await supabase
      .from('movies')
      .select('cinema_source, mukta_status, last_synced_at')
      .limit(1);

    if (testError) {
      console.log('❌ Columns missing. Output SQL for manual execution:');
      console.log('\n========== COPY AND PASTE INTO SUPABASE SQL EDITOR ==========\n');
      console.log(migrationSQL);
      console.log('\n=============================================================\n');

      // Write to file for easy copy
      const fs = require('fs');
      fs.writeFileSync('supabase/migrations/mukta_scraper.sql', migrationSQL);
      console.log('✅ SQL also saved to: supabase/migrations/mukta_scraper.sql');
    } else {
      console.log('✅ Movies table columns exist');
    }

    // Check logs table
    console.log('\n📊 Testing cinema_scraper_logs table...');
    const { data: logsData, error: logsError } = await supabase
      .from('cinema_scraper_logs')
      .select('id')
      .limit(1);

    if (logsError) {
      console.log('❌ cinema_scraper_logs table missing');
    } else {
      console.log('✅ cinema_scraper_logs table exists');
    }
  } else {
    console.log('✅ Migrations executed successfully!');
  }
}

runMigration().catch(console.error);
