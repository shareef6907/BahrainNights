const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTables() {
  console.log('Creating prospects tables...');

  // Create prospects table
  const { error: prospectsError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS prospects (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

        -- Company Info
        company_name TEXT NOT NULL,
        company_name_arabic TEXT,
        industry TEXT,
        website TEXT,
        logo_url TEXT,
        description TEXT,

        -- Contact Info (AI enriched)
        contact_name TEXT,
        contact_title TEXT,
        contact_email TEXT,
        contact_phone TEXT,
        contact_linkedin TEXT,

        -- Source Tracking
        source TEXT NOT NULL,
        source_url TEXT,
        source_screenshot TEXT,
        ad_content TEXT,

        -- AI Enrichment
        ai_enriched BOOLEAN DEFAULT FALSE,
        ai_enriched_at TIMESTAMP,
        ai_summary TEXT,
        ai_suggested_approach TEXT,
        estimated_budget TEXT,

        -- Scoring
        relevance_score INTEGER DEFAULT 0,
        industry_fit TEXT,

        -- Sales Tracking
        status TEXT DEFAULT 'new',
        assigned_to TEXT,
        notes TEXT,
        follow_up_date DATE,

        -- Timestamps
        first_seen_at TIMESTAMP DEFAULT NOW(),
        last_seen_at TIMESTAMP DEFAULT NOW(),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),

        -- Prevent duplicates
        UNIQUE(company_name, source)
      );
    `
  });

  if (prospectsError) {
    console.log('Note: prospects table may already exist or RPC not available, trying direct SQL...');
  }

  // Try creating via direct query
  const tables = [
    {
      name: 'prospects',
      check: 'SELECT 1 FROM prospects LIMIT 1'
    },
    {
      name: 'prospect_sightings',
      check: 'SELECT 1 FROM prospect_sightings LIMIT 1'
    },
    {
      name: 'prospect_manual_entries',
      check: 'SELECT 1 FROM prospect_manual_entries LIMIT 1'
    },
    {
      name: 'prospect_scrape_logs',
      check: 'SELECT 1 FROM prospect_scrape_logs LIMIT 1'
    }
  ];

  for (const table of tables) {
    const { error } = await supabase.from(table.name).select('id').limit(1);
    if (error && error.code === '42P01') {
      console.log(`Table ${table.name} does not exist - will need to create via Supabase dashboard`);
    } else if (!error) {
      console.log(`Table ${table.name} already exists`);
    }
  }

  console.log('\n⚠️  If tables do not exist, please run the following SQL in Supabase SQL Editor:');
  console.log('----------------------------------------------------------');
  console.log(`
-- Prospects table
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

-- Prospect sightings
CREATE TABLE IF NOT EXISTS prospect_sightings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  source_url TEXT,
  screenshot_url TEXT,
  ad_content TEXT,
  spotted_at TIMESTAMP DEFAULT NOW()
);

-- Manual entries
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

-- Scrape logs
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_source ON prospects(source);
CREATE INDEX IF NOT EXISTS idx_prospects_created ON prospects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prospects_score ON prospects(relevance_score DESC);
CREATE INDEX IF NOT EXISTS idx_sightings_prospect ON prospect_sightings(prospect_id);
CREATE INDEX IF NOT EXISTS idx_manual_processed ON prospect_manual_entries(processed);
  `);
}

createTables().catch(console.error);
