const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load service account credentials
const keyFile = path.join(process.env.HOME, '.config/gcloud/bahrain-nights-service-account.json');

// URLs to submit - first batch (respecting 200/day rate limit)
const urlsToSubmit = [
  // BahrainNights - Top priority pages
  'https://www.bahrainnights.com',
  'https://www.bahrainnights.com/events',
  'https://www.bahrainnights.com/places',
  'https://www.bahrainnights.com/cinema',
  'https://www.bahrainnights.com/guides',
  'https://www.bahrainnights.com/things-to-do-in-bahrain',
  'https://www.bahrainnights.com/best-restaurants-bahrain',
  'https://www.bahrainnights.com/bahrain-nightlife-guide',
  'https://www.bahrainnights.com/weekend-in-bahrain',
  'https://www.bahrainnights.com/tonight',
  'https://www.bahrainnights.com/this-weekend',
  'https://www.bahrainnights.com/best-hotels-bahrain',
  'https://www.bahrainnights.com/best-brunches-bahrain',
  'https://www.bahrainnights.com/best-cafes-bahrain',
  'https://www.bahrainnights.com/ladies-night-bahrain',
  'https://www.bahrainnights.com/nightlife-bahrain',
  'https://www.bahrainnights.com/best-lounges-bahrain',
  'https://www.bahrainnights.com/attractions',
  'https://www.bahrainnights.com/family-kids',
  'https://www.bahrainnights.com/artists',
  
  // EventsBahrain - All main pages
  'https://www.eventsbahrain.com',
  'https://www.eventsbahrain.com/exhibition-booths',
  'https://www.eventsbahrain.com/led-screens',
  'https://www.eventsbahrain.com/led-video-wall-rental',
  'https://www.eventsbahrain.com/sound-lights',
  'https://www.eventsbahrain.com/sound-and-lighting',
  'https://www.eventsbahrain.com/event-setup',
  'https://www.eventsbahrain.com/video-production',
  'https://www.eventsbahrain.com/contact',
  'https://www.eventsbahrain.com/wedding-planning',
  'https://www.eventsbahrain.com/wedding-decoration-bahrain',
  'https://www.eventsbahrain.com/corporate-events',
  'https://www.eventsbahrain.com/birthday-party-setup-bahrain',
  
  // CinematicWebWorks - Key pages
  'https://cinematicwebworks.com/',
  'https://cinematicwebworks.com/blog.html',
  'https://cinematicwebworks.com/web-design-bahrain.html',
  'https://cinematicwebworks.com/web-development-bahrain.html',
  'https://cinematicwebworks.com/cinematic-websites.html',
  'https://cinematicwebworks.com/about.html',
  'https://cinematicwebworks.com/seo-services-bahrain.html',
  'https://cinematicwebworks.com/mobile-app-development-bahrain.html',
  'https://cinematicwebworks.com/nextjs-developer-bahrain.html',
  'https://cinematicwebworks.com/react-developer-bahrain.html',
  'https://cinematicwebworks.com/web-development-dubai.html',
  'https://cinematicwebworks.com/web-development-saudi-arabia.html',
  
  // FilmProductionBahrain - All service pages
  'https://www.filmproductionbahrain.com',
  'https://www.filmproductionbahrain.com/corporate-video-production',
  'https://www.filmproductionbahrain.com/commercial-production',
  'https://www.filmproductionbahrain.com/event-videography',
  'https://www.filmproductionbahrain.com/music-video-production',
  'https://www.filmproductionbahrain.com/real-estate-video-tours',
  'https://www.filmproductionbahrain.com/food-and-restaurant-video',
  'https://www.filmproductionbahrain.com/wedding-videography',
  'https://www.filmproductionbahrain.com/blog',
];

async function submitUrls() {
  const auth = new google.auth.GoogleAuth({
    keyFile,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const client = await auth.getClient();
  const indexing = google.indexing({ version: 'v3', auth: client });
  
  const results = [];
  let submitted = 0;
  let errors = 0;
  
  console.log(`Submitting ${urlsToSubmit.length} URLs to Google Indexing API...`);
  console.log('='.repeat(60));
  
  for (const url of urlsToSubmit) {
    try {
      const response = await indexing.urlNotifications.publish({
        requestBody: {
          url,
          type: 'URL_UPDATED',
        },
      });
      
      console.log(`✅ Submitted: ${url}`);
      results.push({ url, status: 'success', response: response.data });
      submitted++;
      
      // Rate limiting - wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Error submitting ${url}: ${error.message}`);
      results.push({ url, status: 'error', error: error.message });
      errors++;
    }
  }
  
  console.log('='.repeat(60));
  console.log(`\nSUMMARY:`);
  console.log(`Total URLs: ${urlsToSubmit.length}`);
  console.log(`Submitted: ${submitted}`);
  console.log(`Errors: ${errors}`);
  
  // Save results to log file
  const logData = {
    date: new Date().toISOString(),
    totalUrls: urlsToSubmit.length,
    submitted,
    errors,
    results,
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'indexing-log.json'),
    JSON.stringify(logData, null, 2)
  );
  
  console.log('\nResults saved to indexing-log.json');
}

submitUrls().catch(console.error);
