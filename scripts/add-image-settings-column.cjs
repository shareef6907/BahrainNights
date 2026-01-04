// Script to add image_settings column to homepage_ads table
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addImageSettingsColumn() {
  console.log('Checking homepage_ads table structure...');

  try {
    // Query to check current structure
    const { data, error } = await supabase
      .from('homepage_ads')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error checking table:', error);
      return;
    }

    const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
    console.log('Current columns:', columns);

    if (columns.includes('image_settings')) {
      console.log('✅ image_settings column already exists');
      return;
    }

    console.log('\n⚠️  Please run this SQL in Supabase Dashboard:');
    console.log('----------------------------------------');
    console.log(`
ALTER TABLE homepage_ads
ADD COLUMN IF NOT EXISTS image_settings JSONB DEFAULT NULL;

COMMENT ON COLUMN homepage_ads.image_settings IS 'Image positioning settings: {position: {x: number, y: number}, scale: number}';
    `);
    console.log('----------------------------------------');
  } catch (err) {
    console.error('Error:', err.message);

    // Show the SQL to run manually
    console.log('\n⚠️  Please run this SQL in Supabase Dashboard:');
    console.log('----------------------------------------');
    console.log(`
ALTER TABLE homepage_ads
ADD COLUMN IF NOT EXISTS image_settings JSONB DEFAULT NULL;

COMMENT ON COLUMN homepage_ads.image_settings IS 'Image positioning settings: {position: {x: number, y: number}, scale: number}';
    `);
    console.log('----------------------------------------');
  }
}

addImageSettingsColumn();
