// Setup monetization database tables
const { createClient } = require('@supabase/supabase-js');
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

async function checkTables() {
  console.log('Checking database tables...\n');

  // Check if public_users exists
  const { error: e1 } = await supabase.from('public_users').select('id').limit(1);
  console.log('public_users:', e1 ? `❌ Does not exist - ${e1.message}` : '✅ Exists');

  // Check if venue_likes exists
  const { error: e2 } = await supabase.from('venue_likes').select('id').limit(1);
  console.log('venue_likes:', e2 ? `❌ Does not exist - ${e2.message}` : '✅ Exists');

  // Check if like_rate_limits exists
  const { error: e3 } = await supabase.from('like_rate_limits').select('id').limit(1);
  console.log('like_rate_limits:', e3 ? `❌ Does not exist - ${e3.message}` : '✅ Exists');

  // Check if venues.like_count exists
  const { data: venues, error: e4 } = await supabase.from('venues').select('like_count').limit(1);
  console.log('venues.like_count:', e4 ? `❌ Column does not exist - ${e4.message}` : '✅ Exists');

  console.log('\n-------------------');
  console.log('If tables do not exist, run the following SQL in Supabase Dashboard:');
  console.log('supabase/migrations/20250101_monetization_system.sql');
  console.log('-------------------\n');

  return !e1 && !e2 && !e3 && !e4;
}

async function testConnection() {
  console.log('Testing Supabase connection...');

  try {
    const { data, error } = await supabase.from('venues').select('id, name').limit(3);

    if (error) {
      console.error('Connection failed:', error.message);
      return false;
    }

    console.log(`✅ Connected! Found ${data?.length || 0} venues\n`);
    return true;
  } catch (err) {
    console.error('Connection error:', err.message);
    return false;
  }
}

async function main() {
  const connected = await testConnection();
  if (!connected) {
    process.exit(1);
  }

  const tablesExist = await checkTables();

  if (tablesExist) {
    console.log('✅ All monetization tables are ready!');
  } else {
    console.log('⚠️  Some tables are missing. Please run the SQL migration in Supabase Dashboard.');
    console.log('\nSteps:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Open your project');
    console.log('3. Go to SQL Editor');
    console.log('4. Copy and paste the contents of supabase/migrations/20250101_monetization_system.sql');
    console.log('5. Click Run');
  }
}

main();
