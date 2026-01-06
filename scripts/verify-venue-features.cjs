require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verify() {
  console.log('===========================================');
  console.log('VENUE FEATURES VERIFICATION');
  console.log('===========================================\n');

  // 1. Check Google Maps URLs
  console.log('1. Google Maps Locations');
  console.log('-----------------------------------------');
  const { data: venues, error } = await supabase
    .from('venues')
    .select('id, name, google_maps_url, description')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  const withMaps = venues.filter(v => v.google_maps_url && !v.google_maps_url.includes('/search/'));
  const withSearchMaps = venues.filter(v => v.google_maps_url?.includes('/search/'));
  const noMaps = venues.filter(v => !v.google_maps_url);

  console.log(`   ✅ Exact locations: ${withMaps.length} venues`);
  console.log(`   ⚠️  Search URLs: ${withSearchMaps.length} venues`);
  console.log(`   ❌ No Google Maps: ${noMaps.length} venues`);

  // 2. Check Descriptions
  console.log('\n2. AI-Generated Descriptions');
  console.log('-----------------------------------------');
  const withDesc = venues.filter(v => v.description && v.description.length > 100);
  const shortDesc = venues.filter(v => v.description && v.description.length <= 100);
  const noDesc = venues.filter(v => !v.description);

  console.log(`   ✅ Full descriptions (>100 chars): ${withDesc.length} venues`);
  console.log(`   ⚠️  Short descriptions: ${shortDesc.length} venues`);
  console.log(`   ❌ No description: ${noDesc.length} venues`);

  // 3. Sample descriptions
  console.log('\n3. Sample Descriptions');
  console.log('-----------------------------------------');
  const samples = venues.filter(v => v.description).slice(0, 3);
  samples.forEach(v => {
    console.log(`\n   ${v.name}:`);
    console.log(`   ${v.description.substring(0, 200)}...`);
  });

  // 4. Summary
  console.log('\n\n===========================================');
  console.log('SUMMARY');
  console.log('===========================================');
  console.log(`Total venues: ${venues.length}`);
  console.log(`With exact Google Maps: ${withMaps.length} (${Math.round(withMaps.length/venues.length*100)}%)`);
  console.log(`With AI descriptions: ${withDesc.length} (${Math.round(withDesc.length/venues.length*100)}%)`);
  console.log('===========================================\n');

  // 5. Lambda config summary
  console.log('4. Image Upload Configuration');
  console.log('-----------------------------------------');
  console.log('   Lambda settings:');
  console.log('   - Logo: max 400x400, no watermark, 1MB max');
  console.log('   - Cover: max 1920x1080, no watermark, 1MB max');
  console.log('   - Gallery: max 1200x800, no watermark, 1MB max');
  console.log('   - All images converted to WebP');
  console.log('   - Iterative quality reduction to reach 1MB target');
  console.log('');
}

verify();
