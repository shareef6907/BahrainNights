// Script to add target_page and placement columns to homepage_ads table
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addAdsColumns() {
  console.log('Adding target_page and placement columns to homepage_ads...\n');

  // Add target_page column with default 'homepage'
  const { error: error1 } = await supabase.rpc('exec_sql', {
    sql: `
      ALTER TABLE homepage_ads
      ADD COLUMN IF NOT EXISTS target_page TEXT DEFAULT 'homepage';
    `
  });

  if (error1) {
    console.log('Note: target_page column may already exist or RPC not available');
    console.log('Error:', error1.message);
  } else {
    console.log('✅ Added target_page column');
  }

  // Add placement column with default 'slider'
  const { error: error2 } = await supabase.rpc('exec_sql', {
    sql: `
      ALTER TABLE homepage_ads
      ADD COLUMN IF NOT EXISTS placement TEXT DEFAULT 'slider';
    `
  });

  if (error2) {
    console.log('Note: placement column may already exist or RPC not available');
    console.log('Error:', error2.message);
  } else {
    console.log('✅ Added placement column');
  }

  // Check current table structure
  const { data, error: checkError } = await supabase
    .from('homepage_ads')
    .select('*')
    .limit(1);

  if (checkError) {
    console.error('Error checking table:', checkError.message);
  } else {
    console.log('\n📊 Current homepage_ads columns:');
    if (data && data.length > 0) {
      console.log(Object.keys(data[0]).join(', '));
    } else {
      console.log('No data in table yet');
    }
  }

  console.log('\n✅ Migration complete!');
  console.log('\nIf columns were not added via RPC, run this SQL in Supabase dashboard:');
  console.log(`
ALTER TABLE homepage_ads
ADD COLUMN IF NOT EXISTS target_page TEXT DEFAULT 'homepage',
ADD COLUMN IF NOT EXISTS placement TEXT DEFAULT 'slider';

-- Add check constraints for valid values
ALTER TABLE homepage_ads
ADD CONSTRAINT valid_target_page CHECK (
  target_page IN ('homepage', 'events', 'cinema', 'places', 'restaurants', 'cafes', 'lounges', 'nightclubs', 'offers', 'explore', 'all')
);

ALTER TABLE homepage_ads
ADD CONSTRAINT valid_placement CHECK (
  placement IN ('slider', 'banner', 'sidebar', 'inline')
);

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_ads_target_page ON homepage_ads(target_page);
CREATE INDEX IF NOT EXISTS idx_ads_placement ON homepage_ads(placement);
  `);
}

addAdsColumns().catch(console.error);
