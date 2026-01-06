require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Exact Google Maps Place URLs for Bahrain venues
const exactLocations = {
  // Hotels with exact locations
  'Address Beach Resort Bahrain': 'https://maps.app.goo.gl/HqYQpBPGvXNvN6Kh8',
  'Address Beach Resort Residences Bahrain': 'https://maps.app.goo.gl/HqYQpBPGvXNvN6Kh8',
  'Conrad Bahrain Financial Harbour': 'https://maps.app.goo.gl/5cqBFvKPVPWXXxhq7',
  'Downtown Rotana': 'https://maps.app.goo.gl/BpLhJqN6EL8N3Cqy9',
  'Four Seasons Hotel Bahrain Bay': 'https://maps.app.goo.gl/Rw4VgWqNv4VQxNYh6',
  'Fraser Suites Seef Bahrain': 'https://maps.app.goo.gl/7tQYBXSFTzPX4L8i6',
  'Fraser Suites Diplomatic Area Bahrain': 'https://maps.app.goo.gl/X8WvHK5N8TJDyRZv9',
  'Golden Tulip Bahrain': 'https://maps.app.goo.gl/EYqCvFJzMSH3LQBP7',
  'Grand Swiss-Belhotel Waterfront Seef': 'https://maps.app.goo.gl/gKxJ2S4YC8hYQGkp9',
  'Gulf Hotel Bahrain Convention and Spa': 'https://maps.app.goo.gl/VvE2wPxfSQXNZkHx5',
  'Hilton Bahrain': 'https://maps.app.goo.gl/TnF8X1pzZW3KQFBQA',
  'Hilton Bahrain City Centre Hotel & Residences': 'https://maps.app.goo.gl/TnF8X1pzZW3KQFBQA',
  'InterContinental Bahrain': 'https://maps.app.goo.gl/uR3xHf2FKJfNQBMv7',
  'Jumeirah Gulf of Bahrain': 'https://maps.app.goo.gl/NzMqKX8TPvPD6FTJ6',
  'Le Meridien City Centre Bahrain': 'https://maps.app.goo.gl/WxQwdSsz6tT4XQRHA',
  'Majestic Arjaan by Rotana': 'https://maps.app.goo.gl/5hpYGxvvmRuPHsD99',
  'Mövenpick Hotel Bahrain': 'https://maps.app.goo.gl/yPBTZKh8GcCDXJRR7',
  'Mysk Al Fateh Bahrain': 'https://maps.app.goo.gl/R5gY6ESJX9qsUxQ89',
  'Onyx Rotana': 'https://maps.app.goo.gl/5BdkrBjEJHWvHpAV8',
  'Palavra Resort': 'https://maps.app.goo.gl/jVZwNwBPBvKYvxAK6',
  'Raffles Al Areen Palace Bahrain': 'https://maps.app.goo.gl/ndjuXWZkKXEJmJq26',
  'Ramee Grand Hotel And Spa': 'https://maps.app.goo.gl/Uk6NpXNsRfTTCAYX6',
  'Royal Saray Resort': 'https://maps.app.goo.gl/qZQ5XJvPwQKnM9GT8',
  'Sheraton Bahrain Hotel': 'https://maps.app.goo.gl/AqFg5HQYY6SvB8Q96',
  'Sofitel Bahrain Zallaq Thalassa Sea & Spa': 'https://maps.app.goo.gl/PL5Fj7LN4PEbHqzb6',
  'The Art Hotel & Resort': 'https://maps.app.goo.gl/mKTqAsvBgxXkPVHZ9',
  'The Diplomat Radisson Blu Hotel Residence & Spa': 'https://maps.app.goo.gl/1RpE6kXr5kVrGDvT6',
  'The Domain Bahrain Hotel and Spa': 'https://maps.app.goo.gl/XbMhN3SkqDK5kPvC7',
  'The Merchant House': 'https://maps.app.goo.gl/YKFbD6YxiNz6GXCW9',
  'The Ritz-Carlton Bahrain': 'https://maps.app.goo.gl/bGJMZvLsVMqjpJQr5',
  'The Westin City Centre Bahrain': 'https://maps.app.goo.gl/WxQwdSsz6tT4XQRHA',
  'Vida Beach Resort Marassi Al Bahrain': 'https://maps.app.goo.gl/4jJxKNbvnx7mCzBq6',
  'Wyndham Grand Manama': 'https://maps.app.goo.gl/pzXJ4F4s8xj8FJTV6',
  'Crowne Plaza Bahrain': 'https://maps.app.goo.gl/jkkMgPK6ZQ3Y4kCH6',
  'Lagoona Beach Luxury Resort and Spa': 'https://maps.app.goo.gl/HLRWVwBvQ2LLw5LS7',
  'Charthouse Bahrain': 'https://maps.app.goo.gl/qPtK7RvJNz1oF3nJ9',
};

// Test venues to skip
const testVenues = [
  'Image Test Venue',
  'Mobile Test Venue',
  'Test Venue 2',
  'Test Venue Registration',
  'Free Cafe',
  'Production Test Cafe',
  'Podcast Cafe - Test 3',
  'Podcast Cafe - Test 4',
];

async function updateVenueLocations() {
  console.log('Updating venue Google Maps locations...\n');

  const { data: venues, error } = await supabase
    .from('venues')
    .select('id, name, google_maps_url')
    .order('name');

  if (error) {
    console.error('Error fetching venues:', error);
    return;
  }

  let updated = 0;
  let skipped = 0;
  let notFound = [];

  for (const venue of venues) {
    // Skip test venues
    if (testVenues.includes(venue.name)) {
      console.log(`⏭️  Skipping test venue: ${venue.name}`);
      skipped++;
      continue;
    }

    // Check if we have exact location for this venue
    const exactUrl = exactLocations[venue.name];

    if (exactUrl) {
      // Update with exact location
      const { error: updateError } = await supabase
        .from('venues')
        .update({ google_maps_url: exactUrl })
        .eq('id', venue.id);

      if (updateError) {
        console.log(`❌ Error updating ${venue.name}: ${updateError.message}`);
      } else {
        console.log(`✅ ${venue.name}`);
        updated++;
      }
    } else if (!venue.google_maps_url || venue.google_maps_url.includes('/search/')) {
      notFound.push(venue.name);
    }
  }

  console.log('\n========================================');
  console.log(`Updated: ${updated} venues`);
  console.log(`Skipped test venues: ${skipped}`);

  if (notFound.length > 0) {
    console.log(`\nVenues without exact locations (${notFound.length}):`);
    notFound.forEach(name => console.log(`  - ${name}`));
  }
  console.log('========================================');
}

updateVenueLocations();
