const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  db: { schema: 'public' },
  auth: { persistSession: false },
});

async function executeSQLStatements() {
  console.log('🚀 Executing SQL migrations via Supabase...\n');

  // Individual SQL statements (executed one at a time)
  const statements = [
    // Add columns to movies table
    "ALTER TABLE movies ADD COLUMN IF NOT EXISTS cinema_source TEXT",
    "ALTER TABLE movies ADD COLUMN IF NOT EXISTS cinema_source_id TEXT",
    "ALTER TABLE movies ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ",
    "ALTER TABLE movies ADD COLUMN IF NOT EXISTS mukta_status TEXT",
  ];

  // Create logs table SQL
  const createTableSQL = `
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
    )
  `;

  // Index creation SQL
  const indexStatements = [
    "CREATE INDEX IF NOT EXISTS idx_movies_cinema_source ON movies(cinema_source)",
    "CREATE INDEX IF NOT EXISTS idx_movies_mukta_status ON movies(mukta_status)",
    "CREATE INDEX IF NOT EXISTS idx_scraper_logs_cinema ON cinema_scraper_logs(cinema_chain)",
    "CREATE INDEX IF NOT EXISTS idx_scraper_logs_created ON cinema_scraper_logs(created_at DESC)",
  ];

  // Use Supabase direct Postgres connection via REST API
  // Since we can't execute raw SQL easily, let's verify tables exist and work with what we have

  // First, check if the new columns exist by trying to update a record
  console.log('📊 Checking movies table columns...');

  // Try to read the new columns
  const { data: movieTest, error: movieError } = await supabase
    .from('movies')
    .select('id, cinema_source, mukta_status')
    .limit(1);

  if (movieError && movieError.message.includes('column')) {
    console.log('❌ Movies columns missing - need to add via Supabase dashboard');
    console.log('Error:', movieError.message);
  } else {
    console.log('✅ Movies columns accessible (or no movies yet)');
  }

  // Check logs table by trying to insert
  console.log('\n📊 Checking cinema_scraper_logs table...');

  const { data: logsTest, error: logsError } = await supabase
    .from('cinema_scraper_logs')
    .select('id')
    .limit(1);

  if (logsError) {
    console.log('❌ cinema_scraper_logs table missing');
    console.log('Error:', logsError.message);

    // Try to create by inserting (will fail but tell us if table exists)
    const { error: insertError } = await supabase
      .from('cinema_scraper_logs')
      .insert({
        cinema_chain: 'test',
        status: 'test',
      });

    if (insertError) {
      console.log('\n⚠️ Table needs to be created manually');
      console.log('Please run the SQL from: supabase/migrations/mukta_scraper.sql');
    }
  } else {
    console.log('✅ cinema_scraper_logs table exists');
  }

  console.log('\n🔄 Attempting to run migration via Supabase Management API...');

  // Try to use Supabase's SQL API
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)/)?.[1];

  if (projectRef) {
    console.log(`Project ref: ${projectRef}`);

    // We need to use Supabase Management API which requires different auth
    // For now, output instructions for manual SQL execution
    console.log('\n📋 Manual SQL execution required.');
    console.log('Go to: https://supabase.com/dashboard/project/' + projectRef + '/sql/new');
    console.log('And run the SQL from: supabase/migrations/mukta_scraper.sql');
  }

  console.log('\n✅ Migration check complete!');
}

executeSQLStatements().catch(console.error);
