const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixAds() {
  // Get the paused slot 1 ad and activate it
  const { data: slot1 } = await supabase
    .from('homepage_ads')
    .select('id, advertiser_name')
    .eq('target_page', 'events')
    .eq('slot_position', 1)
    .single();

  if (slot1) {
    const { error: err1 } = await supabase
      .from('homepage_ads')
      .update({ status: 'active' })
      .eq('id', slot1.id);

    if (err1) {
      console.error('Error activating slot 1:', err1);
    } else {
      console.log('Activated slot 1: ' + slot1.advertiser_name);
    }
  }

  // Get slot 5 and change placement from slider to banner
  const { data: slot5 } = await supabase
    .from('homepage_ads')
    .select('id, advertiser_name, placement')
    .eq('target_page', 'events')
    .eq('slot_position', 5)
    .single();

  if (slot5) {
    console.log('Slot 5 current placement: ' + slot5.placement);
    const { error: err2 } = await supabase
      .from('homepage_ads')
      .update({ placement: 'banner' })
      .eq('id', slot5.id);

    if (err2) {
      console.error('Error fixing slot 5 placement:', err2);
    } else {
      console.log('Changed slot 5 placement to banner: ' + slot5.advertiser_name);
    }
  }

  // Verify the fix
  console.log('\n=== VERIFYING FIX ===');
  const { data: eventsAds } = await supabase
    .from('homepage_ads')
    .select('slot_position, advertiser_name, status, placement')
    .eq('target_page', 'events')
    .order('slot_position');

  if (eventsAds) {
    eventsAds.forEach(function(ad) {
      console.log('Slot ' + ad.slot_position + ': ' + ad.advertiser_name + ' | status=' + ad.status + ' | placement=' + ad.placement);
    });
  }
}

fixAds().catch(console.error);
