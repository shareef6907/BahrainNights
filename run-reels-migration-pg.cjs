const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const projectRef = 'nrnrrogxrheeoaxgdyut';
const dbPassword = process.env.SUPABASE_DB_PASSWORD || process.env.DB_PASSWORD;

if (!dbPassword) {
  console.log('DATABASE PASSWORD NOT FOUND - Please run the migration manually in Supabase Dashboard');
  console.log('Go to: https://supabase.com/dashboard/project/' + projectRef + '/sql');
  console.log('Then paste the contents of: supabase/migrations/20260112_add_venue_reels.sql');
  process.exit(1);
}

const connectionString = `postgresql://postgres.${projectRef}:${dbPassword}@aws-0-me-south-1.pooler.supabase.com:6543/postgres`;

async function runMigration() {
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  
  try {
    console.log('Connecting to database...');
    const client = await pool.connect();
    
    // Read migration file
    const sql = fs.readFileSync('./supabase/migrations/20260112_add_venue_reels.sql', 'utf8');
    
    // Split by semicolon and run each statement
    const statements = sql.split(';').filter(s => s.trim().length > 0);
    
    for (const statement of statements) {
      try {
        await client.query(statement);
        const preview = statement.trim().substring(0, 50).replace(/\n/g, ' ');
        console.log('✅', preview + '...');
      } catch (err) {
        console.log('⚠️', err.message.substring(0, 80));
      }
    }
    
    client.release();
    console.log('\n✅ Migration complete!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

runMigration();
