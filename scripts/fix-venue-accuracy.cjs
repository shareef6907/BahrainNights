#!/usr/bin/env node
/**
 * Fix venue accuracy issues identified in the Week 4 audit
 * Run with: node scripts/fix-venue-accuracy.cjs
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Venue fixes identified in audit
const venueFixes = [
  {
    slug: 'vibes-bahrain-entertainment-',
    fixes: {
      name: 'Vibes Bahrain Entertainment',
      slug: 'vibes-bahrain-entertainment',
      phone: '+973 6665 5566',
      area: 'Manama',
    },
    description: 'Fix trailing space/dash, format phone, capitalize area'
  },
  {
    slug: 'the-palmyard',
    fixes: {
      website: 'https://www.palmyard.com',
      area: 'Adliya',
      opening_hours: {
        hideHours: true,
        monday: { open: '00:00', close: '00:00' },
        tuesday: { open: '00:00', close: '00:00' },
        wednesday: { open: '00:00', close: '00:00' },
        thursday: { open: '00:00', close: '00:00' },
        friday: { open: '00:00', close: '00:00' },
        saturday: { open: '00:00', close: '00:00' },
        sunday: { open: '00:00', close: '00:00' },
      },
    },
    description: 'Fix double https, hide 24/7 hours, capitalize area'
  },
  {
    slug: 'o-lounge-adliya',
    fixes: {
      area: 'Adliya',
    },
    description: 'Capitalize area'
  },
  {
    slug: 'enma-mall',
    fixes: {
      website: 'https://enma-mall.com',
      address: 'Building 493, 16 Um Al Nassan Avenue, Block 925, Riffa, Bahrain',
      area: 'Riffa',
    },
    description: 'Fix double https, clean address, capitalize area'
  },
  {
    slug: 'the-orangery',
    fixes: {
      website: 'https://orangeryme.com',
      phone: '+973 1736 9696',
    },
    description: 'Fix double https, remove leading space from phone'
  },
  {
    slug: 'circa',
    fixes: {
      website: 'https://circabahrain.com',
      area: 'Adliya',
    },
    description: 'Fix double https, capitalize area'
  },
  // BH Nights - address is intentionally empty (entertainment company, not a physical venue)
  // No fix needed for this one
];

async function fixVenues() {
  console.log('🔧 Starting venue accuracy fixes...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const venueData of venueFixes) {
    console.log(`📍 Processing: ${venueData.slug}`);
    console.log(`   ${venueData.description}`);

    try {
      const { data, error } = await supabase
        .from('venues')
        .update(venueData.fixes)
        .eq('slug', venueData.slug)
        .select('name, slug')
        .single();

      if (error) {
        // Try with original slug (in case it was already fixed)
        const alternateSlug = venueData.fixes.slug || venueData.slug;
        const { data: retryData, error: retryError } = await supabase
          .from('venues')
          .update(venueData.fixes)
          .eq('slug', alternateSlug)
          .select('name, slug')
          .single();

        if (retryError) {
          console.error(`   ❌ Error: ${retryError.message}`);
          errorCount++;
          continue;
        }
        console.log(`   ✅ Fixed: ${retryData.name}`);
        successCount++;
      } else {
        console.log(`   ✅ Fixed: ${data.name}`);
        successCount++;
      }
    } catch (err) {
      console.error(`   ❌ Exception: ${err.message}`);
      errorCount++;
    }

    console.log('');
  }

  console.log('━'.repeat(50));
  console.log(`\n✅ Successfully fixed: ${successCount} venues`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} venues`);
  }
  console.log('\nDone!');
}

// Also check for any other issues
async function auditAllVenues() {
  console.log('\n🔍 Running additional venue audit...\n');

  const { data: venues, error } = await supabase
    .from('venues')
    .select('*')
    .eq('status', 'approved')
    .eq('is_hidden', false);

  if (error) {
    console.error('Error fetching venues:', error.message);
    return;
  }

  console.log(`Found ${venues.length} approved venues\n`);

  // Check for common issues
  const issues = [];

  for (const venue of venues) {
    const venueIssues = [];

    // Check for double https
    if (venue.website && venue.website.includes('https://https://')) {
      venueIssues.push('Double https:// in website');
    }

    // Check for empty address
    if (!venue.address || venue.address.trim() === '') {
      venueIssues.push('Empty address');
    }

    // Check for lowercase area
    if (venue.area && venue.area !== venue.area.charAt(0).toUpperCase() + venue.area.slice(1).toLowerCase()) {
      venueIssues.push(`Area not title case: "${venue.area}"`);
    }

    // Check phone format
    if (venue.phone) {
      if (!venue.phone.startsWith('+')) {
        venueIssues.push(`Phone missing country code: "${venue.phone}"`);
      } else if (venue.phone.startsWith(' ')) {
        venueIssues.push(`Phone has leading space: "${venue.phone}"`);
      }
    }

    // Check for trailing spaces in name
    if (venue.name && venue.name !== venue.name.trim()) {
      venueIssues.push('Name has trailing/leading whitespace');
    }

    // Check for trailing dash in slug
    if (venue.slug && venue.slug.endsWith('-')) {
      venueIssues.push(`Slug ends with dash: "${venue.slug}"`);
    }

    if (venueIssues.length > 0) {
      issues.push({
        name: venue.name,
        slug: venue.slug,
        issues: venueIssues
      });
    }
  }

  if (issues.length === 0) {
    console.log('✅ No additional issues found!');
  } else {
    console.log(`⚠️ Found issues in ${issues.length} venues:\n`);
    for (const venue of issues) {
      console.log(`📍 ${venue.name} (${venue.slug})`);
      for (const issue of venue.issues) {
        console.log(`   - ${issue}`);
      }
      console.log('');
    }
  }
}

async function main() {
  try {
    await fixVenues();
    await auditAllVenues();
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

main();
