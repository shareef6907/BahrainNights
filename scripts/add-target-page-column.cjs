// Script to add target_page column to homepage_ads table
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addTargetPageColumn() {
  console.log('Adding target_page column to homepage_ads table...');

  try {
    // Add the target_page column with default value 'homepage'
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE homepage_ads
        ADD COLUMN IF NOT EXISTS target_page VARCHAR(50) DEFAULT 'homepage';

        -- Update existing rows to have 'homepage' as target_page
        UPDATE homepage_ads SET target_page = 'homepage' WHERE target_page IS NULL;
      `
    });

    if (alterError) {
      // If RPC doesn't work, try direct SQL via REST API
      console.log('RPC failed, trying alternative method...');

      // Just query to see current structure
      const { data, error } = await supabase
        .from('homepage_ads')
        .select('*')
        .limit(1);

      if (error) {
        console.error('Error checking table:', error);
      } else {
        console.log('Current columns:', data ? Object.keys(data[0] || {}) : 'empty table');
      }

      console.log('\n⚠️  Please run this SQL in Supabase Dashboard:');
      console.log('----------------------------------------');
      console.log(`
ALTER TABLE homepage_ads
ADD COLUMN IF NOT EXISTS target_page VARCHAR(50) DEFAULT 'homepage';

UPDATE homepage_ads SET target_page = 'homepage' WHERE target_page IS NULL;
      `);
      console.log('----------------------------------------');
    } else {
      console.log('✅ Column added successfully!');
    }
  } catch (err) {
    console.error('Error:', err.message);

    // Show the SQL to run manually
    console.log('\n⚠️  Please run this SQL in Supabase Dashboard:');
    console.log('----------------------------------------');
    console.log(`
ALTER TABLE homepage_ads
ADD COLUMN IF NOT EXISTS target_page VARCHAR(50) DEFAULT 'homepage';

UPDATE homepage_ads SET target_page = 'homepage' WHERE target_page IS NULL;
    `);
    console.log('----------------------------------------');
  }
}

addTargetPageColumn();
