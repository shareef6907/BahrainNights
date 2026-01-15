/**
 * Run migration to add country and city columns to events table
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function runMigration() {
  console.log('🚀 Running international events migration...\n');

  try {
    // Check if country column exists by trying to query it
    const { data: testData, error: testError } = await supabase
      .from('events')
      .select('id, country')
      .limit(1);

    if (testError && testError.message.includes('country')) {
      console.log('⚠️  Country column does not exist yet. Adding columns...\n');

      // We need to run raw SQL - Supabase JS client doesn't support ALTER TABLE
      // Let's use the RPC function approach or check if we can query the schema
      console.log('❌ Cannot run ALTER TABLE through JS client.');
      console.log('📋 Please run the following SQL in your Supabase Dashboard SQL Editor:\n');
      console.log('----------------------------------------');
      console.log(`
-- Add country column (default 'Bahrain' for existing events)
ALTER TABLE events ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'Bahrain';

-- Add city column
ALTER TABLE events ADD COLUMN IF NOT EXISTS city VARCHAR(200);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_events_country ON events(country);
CREATE INDEX IF NOT EXISTS idx_events_city ON events(city);
CREATE INDEX IF NOT EXISTS idx_events_country_date ON events(country, start_date);

-- Update existing events
UPDATE events SET country = 'Bahrain' WHERE country IS NULL;
      `);
      console.log('----------------------------------------\n');
      process.exit(1);
    }

    // Column exists, check current state
    console.log('✅ Country column already exists!\n');

    // Check distribution of countries
    const { data: countryStats, error: statsError } = await supabase
      .from('events')
      .select('country')
      .eq('status', 'published');

    if (countryStats) {
      const countryCounts: Record<string, number> = {};
      countryStats.forEach((event: { country: string | null }) => {
        const country = event.country || 'NULL';
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      });

      console.log('📊 Current event distribution by country:');
      Object.entries(countryCounts).forEach(([country, count]) => {
        console.log(`   ${country}: ${count} events`);
      });
    }

    console.log('\n✅ Migration check complete!');

  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

runMigration();
