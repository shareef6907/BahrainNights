const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const targetPages = ['restaurants', 'cafes', 'lounges', 'nightclubs', 'offers', 'places', 'cinema', 'events', 'homepage'];

async function checkAllPages() {
  for (const page of targetPages) {
    console.log('\n=== ' + page.toUpperCase() + ' ===');

    const { data: ads } = await supabase
      .from('homepage_ads')
      .select('slot_position, advertiser_name, status, placement, target_page')
      .eq('target_page', page)
      .order('slot_position');

    if (!ads || ads.length === 0) {
      console.log('NO ADS FOUND!');
    } else {
      ads.forEach(function(ad) {
        var issues = [];
        if (ad.status !== 'active') issues.push('status=' + ad.status);
        if (ad.placement !== 'banner' && page !== 'homepage') issues.push('placement=' + ad.placement);
        if (ad.placement !== 'slider' && page === 'homepage') issues.push('placement=' + ad.placement);

        var status = issues.length > 0 ? ' ❌ ' + issues.join(', ') : ' ✅';
        console.log('Slot ' + ad.slot_position + ': ' + ad.advertiser_name + status);
      });
      console.log('Total: ' + ads.length + '/5 ads');
    }
  }
}

checkAllPages().catch(console.error);
