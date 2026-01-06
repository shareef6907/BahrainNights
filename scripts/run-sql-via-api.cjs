// Run SQL via Supabase using pg client with pooler connection
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  // Supabase pooler connection - needs database password
  // Check if DATABASE_URL is available
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.log('DATABASE_URL not found in environment.');
    console.log('\nTo run the migration, you need the Supabase database password.');
    console.log('\nOption 1: Add DATABASE_URL to .env.local:');
    console.log('  DATABASE_URL=postgresql://postgres.nrnrrogxrheeoaxgdyut:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres');
    console.log('\nOption 2: Run SQL manually in Supabase Dashboard:');
    console.log('  1. Go to: https://supabase.com/dashboard/project/nrnrrogxrheeoaxgdyut/sql/new');
    console.log('  2. Copy and paste the SQL from: supabase/migrations/20260106_create_attractions_tables.sql');
    console.log('  3. Click "Run"');
    return;
  }

  console.log('Connecting to database...');
  const client = new Client({ connectionString: databaseUrl });

  try {
    await client.connect();
    console.log('Connected!\n');

    const sqlFile = path.join(__dirname, '../supabase/migrations/20260106_create_attractions_tables.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('Running migration...');
    await client.query(sql);
    console.log('\n✓ Migration completed successfully!');

    // Verify tables
    console.log('\nVerifying tables...');
    const tables = ['tour_providers', 'attractions', 'tours', 'local_guides', 'guide_applications', 'experience_reviews'];

    for (const table of tables) {
      try {
        const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`  ✓ ${table}: OK (${result.rows[0].count} rows)`);
      } catch (e) {
        console.log(`  ✗ ${table}: ${e.message}`);
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

runMigration();
