// Script to add country columns to page_views table
// Run with: node scripts/add-country-columns.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addColumns() {
  console.log('Adding country columns to page_views table...');

  // Using raw SQL via RPC or direct query
  // Note: This requires the service role key to have ALTER permissions

  const queries = [
    `ALTER TABLE page_views ADD COLUMN IF NOT EXISTS country VARCHAR(100)`,
    `ALTER TABLE page_views ADD COLUMN IF NOT EXISTS country_code VARCHAR(2)`,
    `ALTER TABLE page_views ADD COLUMN IF NOT EXISTS city VARCHAR(100)`,
    `CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country)`,
    `CREATE INDEX IF NOT EXISTS idx_page_views_country_code ON page_views(country_code)`,
  ];

  for (const query of queries) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: query });
      if (error) {
        // Try alternative method
        console.log(`Query (may need manual execution): ${query}`);
      } else {
        console.log(`✓ Executed: ${query.substring(0, 50)}...`);
      }
    } catch (err) {
      console.log(`Query for manual execution: ${query}`);
    }
  }

  console.log('\nDone! If queries failed, please run them manually in Supabase SQL editor.');
  console.log('\nSQL to run in Supabase Dashboard > SQL Editor:');
  console.log('----------------------------------------');
  console.log(`
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS country_code VARCHAR(2);
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS city VARCHAR(100);
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country);
CREATE INDEX IF NOT EXISTS idx_page_views_country_code ON page_views(country_code);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
  `);
}

addColumns().catch(console.error);
