const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixAllAds() {
  console.log('=== FIXING ALL ADS ===\n');

  // 1. Fix Places slot 5 - change placement from slider to banner
  console.log('1. Fixing Places slot 5 placement...');
  const { data: placesSlot5 } = await supabase
    .from('homepage_ads')
    .select('id, advertiser_name, placement')
    .eq('target_page', 'places')
    .eq('slot_position', 5)
    .single();

  if (placesSlot5 && placesSlot5.placement !== 'banner') {
    await supabase
      .from('homepage_ads')
      .update({ placement: 'banner' })
      .eq('id', placesSlot5.id);
    console.log('   Fixed: ' + placesSlot5.advertiser_name + ' -> placement=banner');
  } else if (placesSlot5) {
    console.log('   Already correct: ' + placesSlot5.advertiser_name);
  } else {
    console.log('   No slot 5 found for places');
  }

  // 2. Add Cinema slot 5 if missing (copy from an existing cinema ad as template)
  console.log('\n2. Checking Cinema slot 5...');
  const { data: cinemaSlot5 } = await supabase
    .from('homepage_ads')
    .select('id')
    .eq('target_page', 'cinema')
    .eq('slot_position', 5)
    .single();

  if (!cinemaSlot5) {
    // Get a template from cinema slot 1
    const { data: template } = await supabase
      .from('homepage_ads')
      .select('*')
      .eq('target_page', 'cinema')
      .eq('slot_position', 1)
      .single();

    if (template) {
      const newAd = {
        advertiser_name: 'Cinema Promo',
        company_name: 'BahrainNights',
        contact_email: template.contact_email,
        title: 'Kids Weekend Special',
        subtitle: 'Family movies at special prices every weekend',
        cta_text: 'See Movies',
        image_url: template.image_url,
        target_url: 'https://bahrainnights.com/cinema',
        slot_position: 5,
        target_page: 'cinema',
        placement: 'banner',
        start_date: '2025-01-01',
        end_date: '2026-12-31',
        price_bd: 0,
        status: 'active',
        payment_status: 'paid'
      };

      const { error } = await supabase.from('homepage_ads').insert(newAd);
      if (error) {
        console.log('   Error creating slot 5: ' + error.message);
      } else {
        console.log('   Created Cinema slot 5: Kids Weekend Special');
      }
    }
  } else {
    console.log('   Cinema slot 5 already exists');
  }

  // 3. Check and fix offers page ads
  console.log('\n3. Checking Offers page ads...');
  const { data: offersAds } = await supabase
    .from('homepage_ads')
    .select('slot_position')
    .eq('target_page', 'offers')
    .order('slot_position');

  if (!offersAds || offersAds.length === 0) {
    console.log('   No offers ads found. Creating 5 ads...');

    // Get template from places
    const { data: template } = await supabase
      .from('homepage_ads')
      .select('contact_email')
      .eq('target_page', 'places')
      .limit(1)
      .single();

    const offersAdsData = [
      { slot: 1, title: 'Today\'s Best Deals', subtitle: 'Exclusive offers updated daily', cta: 'View Deals' },
      { slot: 2, title: 'Happy Hour Specials', subtitle: 'Best drink deals in Bahrain', cta: 'Find Offers' },
      { slot: 3, title: 'Dining Discounts', subtitle: 'Save on your favorite restaurants', cta: 'See Offers' },
      { slot: 4, title: 'Weekend Promotions', subtitle: 'Special weekend-only deals', cta: 'Explore' },
      { slot: 5, title: 'Members Only', subtitle: 'Exclusive deals for subscribers', cta: 'Join Free' },
    ];

    for (const ad of offersAdsData) {
      const newAd = {
        advertiser_name: 'BahrainNights Offers',
        company_name: 'BahrainNights',
        contact_email: template ? template.contact_email : 'admin@bahrainnights.com',
        title: ad.title,
        subtitle: ad.subtitle,
        cta_text: ad.cta,
        image_url: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/processed/ads/2026-01/ad-1767530963671-bu3qss.jpg',
        target_url: 'https://bahrainnights.com/offers',
        slot_position: ad.slot,
        target_page: 'offers',
        placement: 'banner',
        start_date: '2025-01-01',
        end_date: '2026-12-31',
        price_bd: 0,
        status: 'active',
        payment_status: 'paid'
      };

      const { error } = await supabase.from('homepage_ads').insert(newAd);
      if (error) {
        console.log('   Error creating offers slot ' + ad.slot + ': ' + error.message);
      } else {
        console.log('   Created Offers slot ' + ad.slot + ': ' + ad.title);
      }
    }
  } else {
    console.log('   Offers has ' + offersAds.length + ' ads');
  }

  // 4. Final verification
  console.log('\n=== FINAL VERIFICATION ===');
  const pages = ['homepage', 'events', 'places', 'cinema', 'offers'];

  for (const page of pages) {
    const { data: ads } = await supabase
      .from('homepage_ads')
      .select('slot_position, status, placement')
      .eq('target_page', page)
      .eq('status', 'active')
      .order('slot_position');

    const bannerAds = ads ? ads.filter(a => page === 'homepage' ? a.placement === 'slider' : a.placement === 'banner') : [];
    const status = bannerAds.length >= 5 ? '✅' : '⚠️';
    console.log(page.toUpperCase() + ': ' + bannerAds.length + '/5 active ads ' + status);
  }
}

fixAllAds().catch(console.error);
