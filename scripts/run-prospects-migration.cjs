const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Running prospects tables migration via Supabase...\n');

  // Test if tables already exist
  const { data: existingProspects, error: checkError } = await supabase
    .from('prospects')
    .select('id')
    .limit(1);

  if (!checkError) {
    console.log('✅ prospects table already exists');
  } else if (checkError.code === '42P01') {
    console.log('⚠️ prospects table does not exist - creating via SQL Editor required');
    console.log('\nPlease run this SQL in Supabase Dashboard > SQL Editor:\n');
    console.log('---------------------------------------------------');
    printSQL();
    return;
  } else {
    console.log('Check error:', checkError);
  }

  // Check other tables
  const tables = ['prospect_sightings', 'prospect_manual_entries', 'prospect_scrape_logs'];
  for (const table of tables) {
    const { error } = await supabase.from(table).select('id').limit(1);
    if (!error) {
      console.log(`✅ ${table} already exists`);
    } else if (error.code === '42P01') {
      console.log(`⚠️ ${table} does not exist`);
    }
  }

  console.log('\n✅ Migration check complete');
}

function printSQL() {
  console.log(`
-- Run this in Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  ai_enriched_at TIMESTAMP,
  ai_summary TEXT,
  ai_suggested_approach TEXT,
  estimated_budget TEXT,
  relevance_score INTEGER DEFAULT 0,
  industry_fit TEXT,
  status TEXT DEFAULT 'new',
  assigned_to TEXT,
  notes TEXT,
  follow_up_date DATE,
  first_seen_at TIMESTAMP DEFAULT NOW(),
  last_seen_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(company_name, source)
);

CREATE TABLE IF NOT EXISTS prospect_sightings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  source_url TEXT,
  screenshot_url TEXT,
  ad_content TEXT,
  spotted_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prospect_manual_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  source_type TEXT NOT NULL,
  location TEXT,
  description TEXT,
  photo_url TEXT,
  spotted_date DATE DEFAULT CURRENT_DATE,
  processed BOOLEAN DEFAULT FALSE,
  prospect_id UUID REFERENCES prospects(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prospect_scrape_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,
  status TEXT,
  prospects_found INTEGER DEFAULT 0,
  new_prospects INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_source ON prospects(source);
CREATE INDEX IF NOT EXISTS idx_prospects_created ON prospects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prospects_score ON prospects(relevance_score DESC);
CREATE INDEX IF NOT EXISTS idx_sightings_prospect ON prospect_sightings(prospect_id);
CREATE INDEX IF NOT EXISTS idx_manual_processed ON prospect_manual_entries(processed);
  `);
}

runMigration().catch(console.error);
