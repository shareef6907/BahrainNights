require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getVenues() {
  const { data, error } = await supabase
    .from('venues')
    .select('id, name, google_maps_url, category, area, address')
    .order('name');

  if (error) {
    console.error(error);
    return;
  }

  console.log('Total venues:', data.length);

  const needsExact = data.filter(v => !v.google_maps_url || v.google_maps_url.includes('/search/'));
  const hasExact = data.filter(v => v.google_maps_url && !v.google_maps_url.includes('/search/'));

  console.log('\n=== Venues needing exact Google Maps locations ===');
  console.log(`Count: ${needsExact.length}\n`);
  needsExact.forEach((v, i) => {
    console.log(`${i + 1}. ${v.name}`);
    console.log(`   Category: ${v.category}`);
    console.log(`   Area: ${v.area || 'N/A'}`);
    console.log(`   Address: ${v.address || 'N/A'}`);
    console.log('');
  });

  console.log('\n=== Venues with exact locations ===');
  console.log(`Count: ${hasExact.length}`);
  hasExact.forEach(v => {
    console.log(`✓ ${v.name}`);
  });
}

getVenues();
