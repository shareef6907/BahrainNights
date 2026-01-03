// This script requires the database URL
// You can find it in Supabase Dashboard > Settings > Database > Connection string

const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

// Try to construct database URL from project ref
const projectRef = 'nrnrrogxrheeoaxgdyut';
const dbPassword = process.env.SUPABASE_DB_PASSWORD || process.env.DB_PASSWORD;

if (!dbPassword) {
  console.log('==============================================');
  console.log('DATABASE PASSWORD NOT FOUND IN ENVIRONMENT');
  console.log('==============================================');
  console.log('\nTo run the migration, please do ONE of the following:\n');
  console.log('OPTION 1: Run in Supabase Dashboard');
  console.log('  1. Go to: https://supabase.com/dashboard/project/' + projectRef);
  console.log('  2. Click "SQL Editor" in the left sidebar');
  console.log('  3. Copy and paste the contents of: migration-to-run.sql');
  console.log('  4. Click "Run" button\n');
  console.log('OPTION 2: Set database password');
  console.log('  1. Go to: https://supabase.com/dashboard/project/' + projectRef + '/settings/database');
  console.log('  2. Find "Database password" and copy it');
  console.log('  3. Add to .env.local: SUPABASE_DB_PASSWORD=your_password');
  console.log('  4. Run this script again\n');
  process.exit(1);
}

const connectionString = `postgresql://postgres.${projectRef}:${dbPassword}@aws-0-me-south-1.pooler.supabase.com:6543/postgres`;

async function runMigration() {
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  
  try {
    console.log('Connecting to database...');
    const client = await pool.connect();
    
    const migrations = [
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS venue_id UUID REFERENCES venues(id) ON DELETE SET NULL',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS rejection_reason TEXT',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS description_ar TEXT',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS tags TEXT[]',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT FALSE',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_pattern TEXT',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_days TEXT[]',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS gallery TEXT[]',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS age_restriction TEXT',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS dress_code TEXT',
      'ALTER TABLE events ADD COLUMN IF NOT EXISTS special_instructions TEXT',
      'CREATE INDEX IF NOT EXISTS idx_events_venue_id ON events(venue_id)',
      'CREATE INDEX IF NOT EXISTS idx_events_status ON events(status)',
      'CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date)',
    ];
    
    for (const sql of migrations) {
      try {
        await client.query(sql);
        console.log('✅', sql.substring(0, 60) + '...');
      } catch (err) {
        console.log('⚠️', err.message);
      }
    }
    
    // Sync view_count
    await client.query('UPDATE events SET view_count = COALESCE(views, 0) WHERE view_count IS NULL OR view_count = 0');
    console.log('✅ Synced view_count with views');
    
    client.release();
    console.log('\n✅ Migration complete!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

runMigration();
