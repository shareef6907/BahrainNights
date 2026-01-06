const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('Running attractions migration...\n');

  // Read the SQL file
  const sqlPath = path.join(__dirname, '../supabase/migrations/20260106_create_attractions_tables.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  // Split into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  let successCount = 0;
  let errorCount = 0;

  for (const statement of statements) {
    if (!statement || statement.length < 10) continue;

    try {
      // Extract table/index name for logging
      let objectName = 'unknown';
      const tableMatch = statement.match(/CREATE TABLE IF NOT EXISTS (\w+)/i);
      const indexMatch = statement.match(/CREATE INDEX IF NOT EXISTS (\w+)/i);
      if (tableMatch) objectName = `table: ${tableMatch[1]}`;
      else if (indexMatch) objectName = `index: ${indexMatch[1]}`;

      // Execute via REST API
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({ sql_query: statement + ';' }),
      });

      if (response.ok) {
        console.log(`✅ Created ${objectName}`);
        successCount++;
      } else {
        // RPC might not exist, log for manual execution
        console.log(`⚠️ ${objectName} - needs manual creation`);
        errorCount++;
      }
    } catch (err) {
      errorCount++;
    }
  }

  console.log(`\n📊 Results: ${successCount} succeeded, ${errorCount} need manual creation`);

  if (errorCount > 0) {
    console.log('\n📋 To create tables manually:');
    console.log('1. Go to Supabase Dashboard > SQL Editor');
    console.log('2. Copy contents of: supabase/migrations/20260106_create_attractions_tables.sql');
    console.log('3. Run the SQL');
  }

  // Test if tables exist by trying to query them
  console.log('\n🔍 Checking if tables exist...');

  const tables = ['attractions', 'tours', 'local_guides', 'guide_applications', 'tour_providers', 'experience_reviews'];

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1);

      if (error && error.code === '42P01') {
        console.log(`❌ ${table} - does not exist`);
      } else if (error) {
        console.log(`⚠️ ${table} - ${error.message}`);
      } else {
        console.log(`✅ ${table} - exists`);
      }
    } catch (err) {
      console.log(`❌ ${table} - error checking`);
    }
  }
}

runMigration().catch(console.error);
