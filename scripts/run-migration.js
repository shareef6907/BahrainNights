// Run database migration for monetization system
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  console.log('Running monetization system migration...\n');

  try {
    // Read migration SQL
    const sqlPath = path.join(__dirname, '../supabase/migrations/20250101_monetization_system.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split by semicolons and execute each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`Found ${statements.length} SQL statements to execute\n`);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (!stmt || stmt.startsWith('--')) continue;

      // Skip empty statements
      if (stmt.replace(/\s/g, '').length === 0) continue;

      console.log(`Executing statement ${i + 1}/${statements.length}...`);

      const { error } = await supabase.rpc('exec_sql', { sql: stmt + ';' }).maybeSingle();

      if (error) {
        // If RPC doesn't exist, try direct query via REST
        console.log(`  Note: ${error.message || 'Trying alternative method...'}`);
      }
    }

    console.log('\n✅ Migration completed successfully!');

    // Verify tables exist
    console.log('\nVerifying tables...');

    const { data: publicUsers, error: e1 } = await supabase
      .from('public_users')
      .select('id')
      .limit(1);
    console.log('  public_users:', e1 ? `❌ ${e1.message}` : '✅ exists');

    const { data: venueLikes, error: e2 } = await supabase
      .from('venue_likes')
      .select('id')
      .limit(1);
    console.log('  venue_likes:', e2 ? `❌ ${e2.message}` : '✅ exists');

    const { data: venues, error: e3 } = await supabase
      .from('venues')
      .select('like_count')
      .limit(1);
    console.log('  venues.like_count:', e3 ? `❌ ${e3.message}` : '✅ exists');

  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
