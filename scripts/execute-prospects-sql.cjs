const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'public' }
});

// SQL statements to execute
const SQL_STATEMENTS = [
  // Create prospects table
  `CREATE TABLE IF NOT EXISTS prospects (
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
  )`,

  // Create prospect_sightings table
  `CREATE TABLE IF NOT EXISTS prospect_sightings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
    source TEXT NOT NULL,
    source_url TEXT,
    screenshot_url TEXT,
    ad_content TEXT,
    spotted_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Create prospect_manual_entries table
  `CREATE TABLE IF NOT EXISTS prospect_manual_entries (
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
  )`,

  // Create prospect_scrape_logs table
  `CREATE TABLE IF NOT EXISTS prospect_scrape_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL,
    status TEXT,
    prospects_found INTEGER DEFAULT 0,
    new_prospects INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // Create indexes
  `CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status)`,
  `CREATE INDEX IF NOT EXISTS idx_prospects_source ON prospects(source)`,
  `CREATE INDEX IF NOT EXISTS idx_prospects_created ON prospects(created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_prospects_score ON prospects(relevance_score DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_sightings_prospect ON prospect_sightings(prospect_id)`,
  `CREATE INDEX IF NOT EXISTS idx_manual_processed ON prospect_manual_entries(processed)`
];

async function executeSql() {
  console.log('🚀 Executing prospects tables SQL...\n');

  // Use the Supabase REST API with service role to execute SQL
  const baseUrl = supabaseUrl.replace(/\/$/, '');

  for (let i = 0; i < SQL_STATEMENTS.length; i++) {
    const sql = SQL_STATEMENTS[i];
    const description = sql.includes('CREATE TABLE')
      ? `Creating table: ${sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] || 'unknown'}`
      : sql.includes('CREATE INDEX')
      ? `Creating index: ${sql.match(/CREATE INDEX IF NOT EXISTS (\w+)/)?.[1] || 'unknown'}`
      : `Executing statement ${i + 1}`;

    console.log(`${i + 1}/${SQL_STATEMENTS.length}: ${description}...`);

    try {
      const response = await fetch(`${baseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ sql_query: sql })
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes('function') && errorText.includes('does not exist')) {
          console.log('   ⚠️  exec_sql function not available');
          console.log('\n📋 Please run this SQL manually in Supabase Dashboard > SQL Editor:\n');
          console.log('='.repeat(60));
          SQL_STATEMENTS.forEach(s => console.log(s + ';\n'));
          console.log('='.repeat(60));
          return;
        }
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      console.log('   ✅ Success');
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);

      // If the function doesn't exist, print the SQL for manual execution
      if (error.message.includes('404') || error.message.includes('does not exist')) {
        console.log('\n📋 Please run this SQL manually in Supabase Dashboard > SQL Editor:\n');
        console.log('='.repeat(60));
        SQL_STATEMENTS.forEach(s => console.log(s + ';\n'));
        console.log('='.repeat(60));
        return;
      }
    }
  }

  // Verify tables were created
  console.log('\n🔍 Verifying tables...\n');

  const tables = ['prospects', 'prospect_sightings', 'prospect_manual_entries', 'prospect_scrape_logs'];

  for (const table of tables) {
    const { error } = await supabase.from(table).select('id').limit(1);
    if (!error) {
      console.log(`✅ ${table} exists and is accessible`);
    } else if (error.code === 'PGRST205' || error.code === '42P01') {
      console.log(`❌ ${table} not found`);
    } else {
      console.log(`⚠️ ${table}: ${error.message}`);
    }
  }

  console.log('\n✅ Done!');
}

executeSql().catch(console.error);
