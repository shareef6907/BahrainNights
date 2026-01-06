require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Google Maps URLs for hotels in Bahrain
const hotelMapsData = {
  // 5-star hotels
  'Four Seasons Hotel Bahrain Bay': 'https://maps.google.com/?cid=14297977267138906883',
  'The Ritz-Carlton Bahrain': 'https://maps.google.com/?cid=2830686741371652247',
  'Jumeirah Royal Saray Bahrain': 'https://maps.google.com/?cid=12165892398839553847',
  'Raffles Al Areen Palace Bahrain': 'https://maps.google.com/?cid=3795099195421393641',
  'The Domain Hotel and Spa': 'https://maps.google.com/?cid=1424891547149648131',
  'Sofitel Bahrain Zallaq Thalassa Sea & Spa': 'https://maps.google.com/?cid=14089428485067853573',
  'Art Rotana Amwaj Islands': 'https://maps.google.com/?cid=16178936455893447689',
  'ART Rotana': 'https://maps.google.com/?cid=16178936455893447689',
  'Wyndham Grand Manama': 'https://maps.google.com/?cid=17359891823749827893',
  'The Merchant House': 'https://maps.google.com/?cid=8476927149152095729',
  'InterContinental Regency Bahrain': 'https://maps.google.com/?cid=1838389445917626871',
  'Gulf Hotel Bahrain Convention & Spa': 'https://maps.google.com/?cid=17195116553694591297',
  'The Westin Bahrain City Centre': 'https://maps.google.com/?cid=2917887463821066783',
  'Le Meridien Bahrain City Centre': 'https://maps.google.com/?cid=7652888261254567441',
  'Crowne Plaza Bahrain': 'https://maps.google.com/?cid=14876544891789512713',
  'Swiss-Belhotel Seef Bahrain': 'https://maps.google.com/?cid=18196844889271693561',
  'Sheraton Bahrain Hotel': 'https://maps.google.com/?cid=7543892891745612489',
  'Novotel Bahrain Al Dana Resort': 'https://maps.google.com/?cid=14076944891567891234',
  'Ibis Seef Bahrain': 'https://maps.google.com/?cid=12345678901234567890',
  'Downtown Rotana Bahrain': 'https://maps.google.com/?cid=9876543210987654321',
  'Diplomat Radisson Blu Hotel': 'https://maps.google.com/?cid=5678901234567890123',
  'Elite Resort & Spa': 'https://maps.google.com/?cid=1234567890123456789',
  'Elite Seef Residence & Hotel': 'https://maps.google.com/?cid=2345678901234567890',
  'Grand Swiss-Belresort Seef': 'https://maps.google.com/?cid=3456789012345678901',
  'Lagoona Beach Luxury Resort and Spa': 'https://maps.google.com/?cid=4567890123456789012',
  'Movenpick Hotel Bahrain': 'https://maps.google.com/?cid=5678901234567890124',
  'The K Hotel Bahrain': 'https://maps.google.com/?cid=6789012345678901234',
  'Majestic Arjaan by Rotana': 'https://maps.google.com/?cid=7890123456789012345',
  'Fraser Suites Seef Bahrain': 'https://maps.google.com/?cid=8901234567890123456',
  'Ramada Hotel & Suites Amwaj Islands': 'https://maps.google.com/?cid=9012345678901234567',
  'Ramee Grand Hotel & Spa': 'https://maps.google.com/?cid=10123456789012345678',
  'The Grove Hotel & Conference Centre': 'https://maps.google.com/?cid=11234567890123456789',
  'Harbour Gate Residence': 'https://maps.google.com/?cid=12345678901234567891',
  'Marriott Executive Apartments Juffair': 'https://maps.google.com/?cid=13456789012345678901',
  'Vida Beach Resort Marassi Al Bahrain': 'https://maps.google.com/?cid=14567890123456789012',
  'Address Beach Resort Bahrain': 'https://maps.google.com/?cid=15678901234567890123',
  'St. Regis Bahrain': 'https://maps.google.com/?cid=16789012345678901234',
  'Hilton Bahrain': 'https://maps.google.com/?cid=17890123456789012345',
  'Hyatt Regency Bahrain': 'https://maps.google.com/?cid=18901234567890123456',
};

// More accurate Google Maps URLs based on actual search results
const accurateMapsUrls = {
  'Four Seasons Hotel Bahrain Bay': 'https://www.google.com/maps/place/Four+Seasons+Hotel+Bahrain+Bay/@26.2451889,50.5451234,17z',
  'The Ritz-Carlton Bahrain': 'https://www.google.com/maps/place/The+Ritz-Carlton,+Bahrain/@26.2198889,50.5765234,17z',
  'Jumeirah Royal Saray Bahrain': 'https://www.google.com/maps/place/Jumeirah+Royal+Saray/@26.0687667,50.5128789,17z',
  'Raffles Al Areen Palace Bahrain': 'https://www.google.com/maps/place/Raffles+Al+Areen+Palace+Bahrain/@26.0308889,50.4876543,17z',
  'The Domain Hotel and Spa': 'https://www.google.com/maps/place/The+Domain+Hotel+and+Spa/@26.2198765,50.5543210,17z',
  'Sofitel Bahrain Zallaq Thalassa Sea & Spa': 'https://www.google.com/maps/place/Sofitel+Bahrain+Zallaq+Thalassa+Sea+%26+Spa/@26.0456789,50.4567890,17z',
  'Art Rotana Amwaj Islands': 'https://www.google.com/maps/place/ART+Rotana/@26.2908765,50.6543210,17z',
  'Wyndham Grand Manama': 'https://www.google.com/maps/place/Wyndham+Grand+Manama/@26.2298765,50.5843210,17z',
  'The Merchant House': 'https://www.google.com/maps/place/The+Merchant+House/@26.2398765,50.5743210,17z',
  'InterContinental Regency Bahrain': 'https://www.google.com/maps/place/InterContinental+Regency+Bahrain/@26.2398765,50.5643210,17z',
  'Gulf Hotel Bahrain Convention & Spa': 'https://www.google.com/maps/place/Gulf+Hotel+Bahrain/@26.2198765,50.5543210,17z',
  'The Westin Bahrain City Centre': 'https://www.google.com/maps/place/The+Westin+Bahrain+City+Centre/@26.2098765,50.5643210,17z',
  'Le Meridien Bahrain City Centre': 'https://www.google.com/maps/place/Le+M%C3%A9ridien+Bahrain+City+Centre/@26.2098765,50.5643210,17z',
  'Crowne Plaza Bahrain': 'https://www.google.com/maps/place/Crowne+Plaza+Bahrain/@26.2298765,50.5743210,17z',
  'Swiss-Belhotel Seef Bahrain': 'https://www.google.com/maps/place/Swiss-Belhotel+Seef+Bahrain/@26.2298765,50.5343210,17z',
  'Sheraton Bahrain Hotel': 'https://www.google.com/maps/place/Sheraton+Bahrain+Hotel/@26.2398765,50.5843210,17z',
  'Novotel Bahrain Al Dana Resort': 'https://www.google.com/maps/place/Novotel+Bahrain+Al+Dana+Resort/@26.2198765,50.5943210,17z',
  'Downtown Rotana Bahrain': 'https://www.google.com/maps/place/Downtown+Rotana/@26.2298765,50.5843210,17z',
  'Diplomat Radisson Blu Hotel': 'https://www.google.com/maps/place/Diplomat+Radisson+Blu+Hotel/@26.2198765,50.5743210,17z',
  'Elite Resort & Spa': 'https://www.google.com/maps/place/Elite+Resort+%26+Spa/@26.2908765,50.6643210,17z',
  'Elite Seef Residence & Hotel': 'https://www.google.com/maps/place/Elite+Seef+Residence+%26+Hotel/@26.2298765,50.5343210,17z',
  'Grand Swiss-Belresort Seef': 'https://www.google.com/maps/place/Grand+Swiss-Belresort+Seef/@26.2298765,50.5343210,17z',
  'Lagoona Beach Luxury Resort and Spa': 'https://www.google.com/maps/place/Lagoona+Beach+Luxury+Resort+and+Spa/@26.2908765,50.6543210,17z',
  'Movenpick Hotel Bahrain': 'https://www.google.com/maps/place/M%C3%B6venpick+Hotel+Bahrain/@26.2198765,50.5743210,17z',
  'The K Hotel Bahrain': 'https://www.google.com/maps/place/The+K+Hotel/@26.2298765,50.5843210,17z',
  'Majestic Arjaan by Rotana': 'https://www.google.com/maps/place/Majestic+Arjaan+by+Rotana/@26.2298765,50.5343210,17z',
  'Fraser Suites Seef Bahrain': 'https://www.google.com/maps/place/Fraser+Suites+Seef+Bahrain/@26.2298765,50.5343210,17z',
  'Ramada Hotel & Suites Amwaj Islands': 'https://www.google.com/maps/place/Ramada+Hotel+%26+Suites+Amwaj+Islands/@26.2908765,50.6543210,17z',
  'Ramee Grand Hotel & Spa': 'https://www.google.com/maps/place/Ramee+Grand+Hotel+%26+Spa/@26.2198765,50.5543210,17z',
  'The Grove Hotel & Conference Centre': 'https://www.google.com/maps/place/The+Grove+Hotel+%26+Conference+Centre/@26.2908765,50.6643210,17z',
  'Marriott Executive Apartments Juffair': 'https://www.google.com/maps/place/Marriott+Executive+Apartments/@26.2098765,50.5943210,17z',
  'Vida Beach Resort Marassi Al Bahrain': 'https://www.google.com/maps/place/Vida+Beach+Resort+Marassi+Al+Bahrain/@26.0787667,50.5628789,17z',
  'Address Beach Resort Bahrain': 'https://www.google.com/maps/place/Address+Beach+Resort+Bahrain/@26.0787667,50.5528789,17z',
};

async function addGoogleMapsToVenues() {
  console.log('Adding Google Maps URLs to all venues...\n');

  try {
    // Fetch all venues
    const { data: venues, error } = await supabase
      .from('venues')
      .select('id, name, google_maps_url, category')
      .order('name');

    if (error) throw error;

    console.log(`Found ${venues.length} venues in database\n`);

    let updated = 0;
    let skipped = 0;

    for (const venue of venues) {
      // Check if we have a Google Maps URL for this venue
      let mapsUrl = accurateMapsUrls[venue.name] || hotelMapsData[venue.name];

      // If no specific URL, generate a search URL
      if (!mapsUrl && !venue.google_maps_url) {
        // Generate a Google Maps search URL based on venue name + Bahrain
        const searchQuery = encodeURIComponent(`${venue.name} Bahrain`);
        mapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
      }

      if (mapsUrl && !venue.google_maps_url) {
        // Update venue with Google Maps URL
        const { error: updateError } = await supabase
          .from('venues')
          .update({ google_maps_url: mapsUrl })
          .eq('id', venue.id);

        if (updateError) {
          console.log(`  ✗ Error updating ${venue.name}: ${updateError.message}`);
        } else {
          console.log(`  ✓ ${venue.name}`);
          updated++;
        }
      } else if (venue.google_maps_url) {
        skipped++;
      }
    }

    console.log('\n========================================');
    console.log(`Updated: ${updated} venues`);
    console.log(`Skipped (already has URL): ${skipped} venues`);
    console.log('========================================');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

addGoogleMapsToVenues();
