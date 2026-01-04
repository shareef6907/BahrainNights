const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAds() {
  // Get ALL ads for events page (regardless of status/dates)
  const { data: eventsAds, error: err1 } = await supabase
    .from('homepage_ads')
    .select('id, advertiser_name, slot_position, target_page, placement, status, start_date, end_date')
    .eq('target_page', 'events')
    .order('slot_position');

  console.log('=== ALL EVENTS ADS (any status) ===');
  if (eventsAds) {
    eventsAds.forEach(function(ad) {
      console.log('Slot ' + ad.slot_position + ': ' + ad.advertiser_name + ' | status=' + ad.status + ' | placement=' + ad.placement + ' | dates=' + ad.start_date + ' to ' + ad.end_date);
    });
    console.log('Total: ' + eventsAds.length + ' ads');
  }

  // Get ads with target_page = 'all'
  const { data: allPageAds } = await supabase
    .from('homepage_ads')
    .select('id, advertiser_name, slot_position, target_page, placement, status')
    .eq('target_page', 'all');

  console.log('\n=== ADS WITH target_page="all" ===');
  if (allPageAds) {
    console.log('Total: ' + allPageAds.length + ' ads');
  }
}

checkAds().catch(console.error);
