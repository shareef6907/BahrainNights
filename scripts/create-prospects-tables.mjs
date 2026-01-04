import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const { Client } = pg;

const SQL = `
-- Create prospects table
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  company_name_arabic TEXT,
  industry TEXT,
  website TEXT,
  logo_url TEXT,
  description TEXT,
  contact_name TEXT,
  contact_title TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_linkedin TEXT,
  source TEXT NOT NULL,
  source_url TEXT,
  source_screenshot TEXT,
  ad_content TEXT,
  ai_enriched BOOLEAN DEFAULT FALSE,
  ai_enriched_at TIMESTAMPTZ,
  ai_summary TEXT,
  ai_suggested_approach TEXT,
  estimated_budget TEXT,
  relevance_score INTEGER DEFAULT 0,
  industry_fit TEXT,
  status TEXT DEFAULT 'new',
  priority TEXT,
  assigned_to TEXT,
  notes TEXT,
  follow_up_date DATE,
  contacted_at TIMESTAMPTZ,
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_name, source)
);

-- Create prospect_sightings table
CREATE TABLE IF NOT EXISTS prospect_sightings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  source_url TEXT,
  screenshot_url TEXT,
  ad_content TEXT,
  spotted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create prospect_manual_entries table
CREATE TABLE IF NOT EXISTS prospect_manual_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  source_type TEXT NOT NULL,
  location TEXT,
  description TEXT,
  photo_url TEXT,
  spotted_date DATE DEFAULT CURRENT_DATE,
  processed BOOLEAN DEFAULT FALSE,
  prospect_id UUID REFERENCES prospects(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create prospect_scrape_logs table
CREATE TABLE IF NOT EXISTS prospect_scrape_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  status TEXT,
  prospects_found INTEGER DEFAULT 0,
  new_prospects INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_source ON prospects(source);
CREATE INDEX IF NOT EXISTS idx_prospects_created ON prospects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prospects_score ON prospects(relevance_score DESC);
CREATE INDEX IF NOT EXISTS idx_sightings_prospect ON prospect_sightings(prospect_id);
CREATE INDEX IF NOT EXISTS idx_manual_processed ON prospect_manual_entries(processed);
`;

async function runMigration() {
  // Get database URL from Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL');
    process.exit(1);
  }

  // Extract project ref
  const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '');

  // Construct database connection string
  // Format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
  const dbPassword = process.env.SUPABASE_DB_PASSWORD;

  if (!dbPassword) {
    console.log('❌ SUPABASE_DB_PASSWORD not found in .env.local\n');
    console.log('To run this migration, you need to add your database password to .env.local:');
    console.log('SUPABASE_DB_PASSWORD=your-database-password\n');
    console.log('You can find it in Supabase Dashboard > Project Settings > Database\n');
    console.log('Alternatively, run this SQL directly in Supabase SQL Editor:');
    console.log(`https://supabase.com/dashboard/project/${projectRef}/sql/new\n`);
    console.log('='.repeat(60));
    console.log(SQL);
    console.log('='.repeat(60));
    return;
  }

  const connectionString = `postgresql://postgres.${projectRef}:${dbPassword}@aws-0-me-south-1.pooler.supabase.com:6543/postgres`;

  console.log('🚀 Connecting to Supabase database...\n');

  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    console.log('📋 Running migration...\n');
    await client.query(SQL);

    console.log('✅ Migration completed successfully!\n');

    // Verify tables
    const tables = ['prospects', 'prospect_sightings', 'prospect_manual_entries', 'prospect_scrape_logs'];
    for (const table of tables) {
      const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`✅ ${table}: ${result.rows[0].count} rows`);
    }

  } catch (error) {
    console.error('❌ Migration error:', error.message);
    if (error.message.includes('password')) {
      console.log('\nCheck your SUPABASE_DB_PASSWORD in .env.local');
    }
  } finally {
    await client.end();
  }
}

runMigration();
