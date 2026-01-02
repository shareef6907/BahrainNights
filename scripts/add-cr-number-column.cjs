const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addCrNumberColumn() {
  console.log('Checking if cr_number column exists in venues table...');

  // Check if column exists by trying to select it
  const { data, error } = await supabase
    .from('venues')
    .select('cr_number')
    .limit(1);

  if (!error) {
    console.log('cr_number column already exists!');
    return;
  }

  if (error.message.includes('cr_number')) {
    console.log('Column does not exist. Please add it via Supabase SQL Editor.');
    console.log('\nSQL to execute:');
    console.log('================');
    console.log(`
ALTER TABLE venues
ADD COLUMN IF NOT EXISTS cr_number VARCHAR(20);

-- Add an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_venues_cr_number ON venues(cr_number);
    `);
  } else {
    console.log('Unexpected error:', error);
  }
}

addCrNumberColumn();
