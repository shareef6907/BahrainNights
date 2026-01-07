const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createSEOTables() {
  console.log('Creating SEO tables...\n');

  // Create seo_keywords table
  const { error: keywordsError } = await supabase.rpc('exec_sql', {
    sql: `
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
    `
  });

  if (keywordsError) {
    console.log('Note: seo_keywords table may already exist or RPC not available');
    console.log('Trying direct insert approach...');
  }

  // Create seo_page_meta table
  const { error: metaError } = await supabase.rpc('exec_sql', {
    sql: `
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
    `
  });

  // Create seo_agent_logs table
  const { error: logsError } = await supabase.rpc('exec_sql', {
    sql: `
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
    `
  });

  console.log('Attempting to insert keywords directly...\n');

  // Insert target keywords
  const keywords = [
    { keyword: 'events in bahrain', search_volume: 2400, difficulty: 'medium', priority: 10 },
    { keyword: 'nightlife in bahrain', search_volume: 1900, difficulty: 'medium', priority: 9 },
    { keyword: 'attractions in bahrain', search_volume: 1600, difficulty: 'medium', priority: 9 },
    { keyword: 'things to do in bahrain', search_volume: 3200, difficulty: 'high', priority: 10 },
    { keyword: 'bahrain restaurants', search_volume: 2100, difficulty: 'medium', priority: 8 },
    { keyword: 'bahrain clubs', search_volume: 1400, difficulty: 'low', priority: 8 },
    { keyword: 'bahrain bars', search_volume: 1200, difficulty: 'low', priority: 7 },
    { keyword: 'bahrain cinema', search_volume: 1800, difficulty: 'medium', priority: 7 },
    { keyword: 'family activities bahrain', search_volume: 900, difficulty: 'low', priority: 8 },
    { keyword: 'weekend in bahrain', search_volume: 1100, difficulty: 'medium', priority: 8 },
    { keyword: 'bahrain events today', search_volume: 800, difficulty: 'low', priority: 9 },
    { keyword: 'bahrain nightclubs', search_volume: 1300, difficulty: 'low', priority: 7 },
    { keyword: 'best restaurants bahrain', search_volume: 1500, difficulty: 'medium', priority: 8 },
    { keyword: 'bahrain entertainment', search_volume: 700, difficulty: 'low', priority: 7 },
    { keyword: 'bahrain tourism', search_volume: 2000, difficulty: 'high', priority: 6 }
  ];

  // Try to insert keywords
  const { data: insertedKeywords, error: insertError } = await supabase
    .from('seo_keywords')
    .upsert(keywords, { onConflict: 'keyword' })
    .select();

  if (insertError) {
    console.log('Insert error:', insertError.message);
    console.log('\nThe tables may need to be created via Supabase Dashboard SQL Editor.');
    console.log('\nRun this SQL in Supabase Dashboard:\n');
    console.log(`
-- Create SEO tables for BahrainNights.com

-- Table: seo_keywords
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

-- Table: seo_page_meta
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

-- Table: seo_agent_logs
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

-- Insert target keywords
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
`);
  } else {
    console.log('✅ Keywords inserted successfully!');
    console.log(`Inserted ${insertedKeywords?.length || 0} keywords`);
  }

  console.log('\n✅ SEO tables setup complete!');
}

createSEOTables().catch(console.error);
