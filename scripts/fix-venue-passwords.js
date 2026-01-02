// Script to fix existing venues that don't have password_hash set
// Run with: node scripts/fix-venue-passwords.js
//
// This script:
// 1. Finds all approved venues without password_hash
// 2. Generates a temporary password for each
// 3. Updates the database with hashed passwords
// 4. Outputs a report with venue emails and temporary passwords
//
// IMPORTANT: After running this, you must securely communicate the
// temporary passwords to each venue owner and ask them to change it.

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function generateTempPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function fixVenuePasswords() {
  console.log('Finding approved venues without password_hash...\n');

  // Find all approved venues without password_hash
  const { data: venues, error } = await supabase
    .from('venues')
    .select('id, name, email, status')
    .eq('status', 'approved')
    .is('password_hash', null);

  if (error) {
    console.error('Error fetching venues:', error);
    return;
  }

  if (!venues || venues.length === 0) {
    console.log('No approved venues found without password_hash. All venues are set up correctly!');
    return;
  }

  console.log(`Found ${venues.length} venue(s) that need password setup:\n`);

  const results = [];

  for (const venue of venues) {
    const tempPassword = generateTempPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const { error: updateError } = await supabase
      .from('venues')
      .update({ password_hash: passwordHash })
      .eq('id', venue.id);

    if (updateError) {
      console.error(`Failed to update ${venue.name}:`, updateError);
      results.push({
        name: venue.name,
        email: venue.email,
        status: 'FAILED',
        error: updateError.message,
      });
    } else {
      console.log(`✓ Updated: ${venue.name} (${venue.email})`);
      results.push({
        name: venue.name,
        email: venue.email,
        tempPassword: tempPassword,
        status: 'SUCCESS',
      });
    }
  }

  console.log('\n========================================');
  console.log('VENUE PASSWORD RESET REPORT');
  console.log('========================================\n');

  console.log('IMPORTANT: Send these credentials securely to each venue owner!');
  console.log('Ask them to change their password immediately after first login.\n');

  results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.name}`);
    console.log(`   Email: ${r.email}`);
    if (r.status === 'SUCCESS') {
      console.log(`   Temp Password: ${r.tempPassword}`);
      console.log(`   Login URL: https://bahrainnights.com/venue-portal/login`);
    } else {
      console.log(`   Status: ${r.status} - ${r.error}`);
    }
    console.log('');
  });

  console.log('========================================');
  console.log(`Total: ${results.filter(r => r.status === 'SUCCESS').length} succeeded, ${results.filter(r => r.status === 'FAILED').length} failed`);
}

fixVenuePasswords().catch(console.error);
