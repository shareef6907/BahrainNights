/**
 * Run migration using direct PostgreSQL connection
 */
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const migrationSQL = `
-- Add country column (default 'Bahrain' for existing events)
ALTER TABLE events ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'Bahrain';

-- Add city column
ALTER TABLE events ADD COLUMN IF NOT EXISTS city VARCHAR(200);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_events_country ON events(country);
CREATE INDEX IF NOT EXISTS idx_events_city ON events(city);
CREATE INDEX IF NOT EXISTS idx_events_country_date ON events(country, start_date);

-- Update existing events to have 'Bahrain' as country
UPDATE events SET country = 'Bahrain' WHERE country IS NULL;
`;

async function runMigration() {
  // Construct connection string from Supabase URL
  // Format: postgresql://postgres.[PROJECT_REF]:[DB_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const dbPassword = process.env.SUPABASE_DB_PASSWORD;

  if (!supabaseUrl) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL');
    process.exit(1);
  }

  // Extract project ref from URL
  const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '');

  if (!dbPassword) {
    console.log('⚠️  SUPABASE_DB_PASSWORD not found in .env.local');
    console.log('');
    console.log('To run the migration, you need to either:');
    console.log('');
    console.log('1. Add SUPABASE_DB_PASSWORD to .env.local');
    console.log('   (Find it in Supabase Dashboard > Settings > Database > Connection string)');
    console.log('');
    console.log('2. Or run this SQL manually in Supabase Dashboard SQL Editor:');
    console.log('   https://supabase.com/dashboard/project/' + projectRef + '/sql/new');
    console.log('');
    console.log('SQL to run:');
    console.log('----------------------------------------');
    console.log(migrationSQL);
    console.log('----------------------------------------');
    process.exit(1);
  }

  // Try different connection string formats
  const connectionStrings = [
    `postgresql://postgres.${projectRef}:${dbPassword}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres.${projectRef}:${dbPassword}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres:${dbPassword}@db.${projectRef}.supabase.co:5432/postgres`,
  ];

  for (const connectionString of connectionStrings) {
    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });

    try {
      console.log('🔄 Attempting connection...');
      const client = await pool.connect();

      console.log('✅ Connected to database!');
      console.log('🚀 Running migration...\n');

      await client.query(migrationSQL);

      console.log('✅ Migration completed successfully!');

      // Verify
      const result = await client.query(`
        SELECT column_name, data_type, column_default
        FROM information_schema.columns
        WHERE table_name = 'events' AND column_name IN ('country', 'city')
      `);

      console.log('\n📊 Columns added:');
      result.rows.forEach(row => {
        console.log(`   ${row.column_name}: ${row.data_type} (default: ${row.column_default})`);
      });

      client.release();
      await pool.end();
      return;

    } catch (error: any) {
      await pool.end();
      if (error.code !== 'ENOTFOUND' && !error.message.includes('connect')) {
        console.error('❌ Migration error:', error.message);
      }
    }
  }

  console.error('❌ Could not connect to database with any of the connection strings.');
  console.log('\nPlease run the migration manually in Supabase Dashboard.');
}

runMigration();
