const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration() {
  console.log('=== CREATING NEWSLETTER_SUBSCRIBERS TABLE ===\n');

  // First, try to create the table using raw SQL via REST API
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) NOT NULL UNIQUE,
      status VARCHAR(50) DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
      source VARCHAR(100) DEFAULT 'website',
      subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      unsubscribed_at TIMESTAMP WITH TIME ZONE,
      resubscribed_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  const createIndexes = [
    `CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);`,
    `CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);`,
    `CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at DESC);`
  ];

  try {
    // Try to insert a test record to check if table exists
    const { data: existingData, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .limit(1);

    if (checkError && checkError.code === '42P01') {
      // Table doesn't exist - need to create via Supabase dashboard
      console.log('❌ Table does not exist.');
      console.log('\n⚠️  Please run this SQL in Supabase SQL Editor:\n');
      console.log(createTableSQL);
      console.log(createIndexes.join('\n'));
      return;
    } else if (checkError) {
      console.log('Error checking table:', checkError.message);
    } else {
      console.log('✅ newsletter_subscribers table already exists!');
      console.log(`   Found ${existingData?.length || 0} records`);
    }

    // Try to add a test subscriber
    console.log('\n--- Testing insert ---');
    const testEmail = `test-${Date.now()}@test.com`;
    const { data: insertData, error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: testEmail,
        source: 'migration-test',
        status: 'subscribed'
      })
      .select();

    if (insertError) {
      console.log('❌ Insert test failed:', insertError.message);
    } else {
      console.log('✅ Insert test successful');
      
      // Clean up test record
      await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('email', testEmail);
      console.log('✅ Cleaned up test record');
    }

    // Count subscribers
    const { count } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n📊 Current subscriber count: ${count || 0}`);

  } catch (err) {
    console.error('Migration error:', err);
  }

  console.log('\n=== MIGRATION CHECK COMPLETE ===');
}

runMigration().catch(console.error);
