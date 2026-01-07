const https = require('https');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const projectRef = supabaseUrl.match(/https:\/\/([^.]+)/)?.[1];
console.log('Project ref:', projectRef);

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

// Split into individual statements
const statements = migrationSQL
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

async function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${supabaseUrl}/rest/v1/rpc/pg_query`);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, data });
        } else {
          resolve({ success: false, status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify({ query: sql }));
    req.end();
  });
}

async function runMigration() {
  console.log('🚀 Running Mukta Scraper database migrations...\n');
  console.log('Executing SQL statements...\n');

  for (const stmt of statements) {
    console.log(`Executing: ${stmt.substring(0, 60)}...`);
    const result = await executeSQL(stmt);
    if (result.success) {
      console.log('✅ Success');
    } else {
      console.log(`⚠️ Status: ${result.status}`);
    }
  }

  console.log('\n✅ Migration attempt complete!');
  console.log('\nIf columns are still missing, please run the SQL manually at:');
  console.log(`https://supabase.com/dashboard/project/${projectRef}/sql/new`);
}

runMigration().catch(console.error);
