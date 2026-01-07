const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  db: { schema: 'public' }
});

async function runMigration() {
  console.log('Running SEO tables migration...\n');

  // Use Supabase's REST API to run SQL via the management API
  // Since we can't run raw SQL directly, we'll create the tables using the Supabase client

  // First, let's try to query the tables to see if they exist
  console.log('Checking if tables exist...');

  const { data: keywordsCheck, error: keywordsError } = await supabase
    .from('seo_keywords')
    .select('id')
    .limit(1);

  if (keywordsError && keywordsError.code === '42P01') {
    console.log('seo_keywords table does not exist - needs to be created via Supabase Dashboard');
  } else if (!keywordsError) {
    console.log('✅ seo_keywords table exists');
  }

  const { data: metaCheck, error: metaError } = await supabase
    .from('seo_page_meta')
    .select('id')
    .limit(1);

  if (metaError && metaError.code === '42P01') {
    console.log('seo_page_meta table does not exist - needs to be created via Supabase Dashboard');
  } else if (!metaError) {
    console.log('✅ seo_page_meta table exists');
  }

  const { data: logsCheck, error: logsError } = await supabase
    .from('seo_agent_logs')
    .select('id')
    .limit(1);

  if (logsError && logsError.code === '42P01') {
    console.log('seo_agent_logs table does not exist - needs to be created via Supabase Dashboard');
  } else if (!logsError) {
    console.log('✅ seo_agent_logs table exists');
  }

  // Print SQL for manual execution
  console.log('\n' + '='.repeat(60));
  console.log('COPY AND PASTE THIS SQL INTO SUPABASE SQL EDITOR:');
  console.log('='.repeat(60) + '\n');

  const sql = `
-- SEO Tables for BahrainNights.com
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS seo_keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword VARCHAR(255) NOT NULL UNIQUE,
  search_volume INTEGER DEFAULT 0,
  difficulty VARCHAR(50) DEFAULT 'medium',
  priority INTEGER DEFAULT 5,
  target_pages TEXT[],
  current_ranking INTEGER,
  last_checked TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_page_meta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path VARCHAR(500) NOT NULL UNIQUE,
  page_type VARCHAR(100) NOT NULL,
  title VARCHAR(70),
  description VARCHAR(160),
  keywords TEXT[],
  og_title VARCHAR(95),
  og_description VARCHAR(200),
  og_image TEXT,
  canonical_url TEXT,
  structured_data JSONB,
  last_optimized TIMESTAMP WITH TIME ZONE,
  optimization_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seo_agent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pages_optimized INTEGER DEFAULT 0,
  keywords_checked INTEGER DEFAULT 0,
  sitemap_updated BOOLEAN DEFAULT FALSE,
  errors TEXT[],
  duration_seconds INTEGER,
  status VARCHAR(50) DEFAULT 'completed',
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO seo_keywords (keyword, search_volume, difficulty, priority) VALUES
  ('events in bahrain', 2400, 'medium', 10),
  ('nightlife in bahrain', 1900, 'medium', 9),
  ('attractions in bahrain', 1600, 'medium', 9),
  ('things to do in bahrain', 3200, 'high', 10),
  ('bahrain restaurants', 2100, 'medium', 8),
  ('bahrain clubs', 1400, 'low', 8),
  ('bahrain bars', 1200, 'low', 7),
  ('bahrain cinema', 1800, 'medium', 7),
  ('family activities bahrain', 900, 'low', 8),
  ('weekend in bahrain', 1100, 'medium', 8),
  ('bahrain events today', 800, 'low', 9),
  ('bahrain nightclubs', 1300, 'low', 7),
  ('best restaurants bahrain', 1500, 'medium', 8),
  ('bahrain entertainment', 700, 'low', 7),
  ('bahrain tourism', 2000, 'high', 6)
ON CONFLICT (keyword) DO UPDATE SET
  search_volume = EXCLUDED.search_volume,
  difficulty = EXCLUDED.difficulty,
  priority = EXCLUDED.priority;
`;

  console.log(sql);

  console.log('\n' + '='.repeat(60));
  console.log('Go to: https://supabase.com/dashboard/project/nrnrrogxrheeoaxgdyut/sql/new');
  console.log('='.repeat(60));
}

runMigration().catch(console.error);
