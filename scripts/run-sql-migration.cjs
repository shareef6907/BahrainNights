const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

// Extract project ref from URL
const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '');
console.log('Project ref:', projectRef);

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

-- Enable RLS (but allow all for now)
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_sightings ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_manual_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_scrape_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access
CREATE POLICY IF NOT EXISTS "Allow all for service role" ON prospects FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all for service role" ON prospect_sightings FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all for service role" ON prospect_manual_entries FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all for service role" ON prospect_scrape_logs FOR ALL USING (true);
`;

async function runMigration() {
  console.log('🚀 Running SQL migration via Supabase API...\n');

  try {
    // Try using the pg REST endpoint
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ query: SQL })
    });

    console.log('Response status:', response.status);

    if (response.status === 404 || response.status === 400) {
      // Try alternate approach - use supabase-js to create tables via insert/select
      console.log('Direct SQL not available via REST API.');
      console.log('Using alternate approach...\n');

      // Test connection
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Try to insert a test record to trigger table creation (won't work but useful for debugging)
      const { error: testError } = await supabase
        .from('prospects')
        .select('id')
        .limit(1);

      if (testError && testError.code === 'PGRST205') {
        console.log('❌ Tables do not exist yet.\n');
        console.log('📋 To create the tables, go to:');
        console.log(`   https://supabase.com/dashboard/project/${projectRef}/sql/new\n`);
        console.log('And paste this SQL:\n');
        console.log('='.repeat(60));
        console.log(SQL);
        console.log('='.repeat(60));
      } else if (!testError) {
        console.log('✅ prospects table already exists!');

        // Check other tables
        const tables = ['prospect_sightings', 'prospect_manual_entries', 'prospect_scrape_logs'];
        for (const table of tables) {
          const { error } = await supabase.from(table).select('id').limit(1);
          if (!error) {
            console.log(`✅ ${table} exists`);
          } else {
            console.log(`❌ ${table} not found: ${error.message}`);
          }
        }
      } else {
        console.log('Other error:', testError);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runMigration();
