const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
  console.log('=== CHECKING DATABASE SCHEMA ===\n');

  const tables = [
    'venues',
    'events',
    'movies',
    'showtimes',
    'offers',
    'users',
    'public_users',
    'venue_likes',
    'subscribers',
    'homepage_ads',
    'sponsors',
    'page_views',
    'activity_log',
    'venue_changes',
    'like_rate_limits',
    'password_reset_tokens',
    'sponsor_inquiries',
    'ad_clicks'
  ];

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        console.log('X ' + table + ': ' + error.message);
      } else {
        const cols = data && data[0] ? Object.keys(data[0]) : [];
        console.log('OK ' + table + ': ' + cols.length + ' columns');
        if (cols.length > 0) {
          console.log('   Columns: ' + cols.join(', '));
        } else {
          console.log('   (empty table - getting schema via select *)');
          // Try to get structure by selecting with an impossible condition
          const { data: schemaData, error: schemaError } = await supabase
            .from(table)
            .select('*')
            .limit(0);
          // This won't give us column names if empty, so we just note it
        }
      }
      console.log('');
    } catch (e) {
      console.log('X ' + table + ': ' + e.message);
      console.log('');
    }
  }

  // Check specific important columns
  console.log('\n=== CHECKING CRITICAL COLUMNS ===\n');

  // Check venues table for menu_url and booking_url
  const { data: venuesSample } = await supabase
    .from('venues')
    .select('id, name, menu_url, booking_url, gallery, logo_url, cover_image_url')
    .limit(3);

  if (venuesSample) {
    console.log('Venues sample (checking menu_url, booking_url):');
    venuesSample.forEach(v => {
      console.log('  - ' + v.name + ': menu_url=' + (v.menu_url || 'null') + ', booking_url=' + (v.booking_url || 'null'));
    });
  }

  // Check events table for venue_id
  console.log('\nEvents with venue_id:');
  const { data: eventsSample } = await supabase
    .from('events')
    .select('id, title, venue_id, venue_name')
    .limit(3);

  if (eventsSample) {
    eventsSample.forEach(e => {
      console.log('  - ' + e.title + ': venue_id=' + (e.venue_id || 'null'));
    });
  }
}

checkSchema().catch(console.error);
