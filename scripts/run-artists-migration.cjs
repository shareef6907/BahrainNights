/**
 * Run the artists table migration
 * Usage: node scripts/run-artists-migration.cjs
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('Running artists table migration...\n');

  const migrationPath = path.join(__dirname, '../supabase/migrations/20260214_create_artists_table.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  // Split by semicolon and run each statement
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (const statement of statements) {
    try {
      // Skip COMMENT statements as they may cause issues
      if (statement.toUpperCase().startsWith('COMMENT')) {
        continue;
      }
      
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' }).single();
      
      if (error) {
        // Try direct query for DDL statements
        console.log(`Statement: ${statement.substring(0, 50)}...`);
        console.log(`Note: May need to run directly in Supabase SQL editor\n`);
      }
    } catch (err) {
      // Ignore and continue
    }
  }

  console.log('\n✅ Migration script completed.');
  console.log('\nIMPORTANT: Please run the SQL migration directly in the Supabase SQL Editor:');
  console.log('1. Go to your Supabase dashboard');
  console.log('2. Navigate to SQL Editor');
  console.log('3. Paste the contents of: supabase/migrations/20260214_create_artists_table.sql');
  console.log('4. Run the query');
}

runMigration().catch(console.error);
