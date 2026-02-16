const { google } = require('googleapis');

const RAMADAN_URLS = [
  // New pages from today
  '/guides/ramadan/ghabga',
  '/guides/ramadan/suhoor',
  '/guides/ramadan/events',
  '/guides/ramadan/timings',
  '/guides/ramadan/iftar-budget',
  '/guides/ramadan/iftar-luxury',
  '/guides/ramadan/tents',
  '/guides/ramadan/deals',
  '/guides/ramadan/things-to-do',
  '/guides/ramadan/family-activities',
  '/guides/ramadan/decorations',
  '/guides/ramadan/mall-hours',
  '/guides/ramadan/suhoor-delivery',
  '/guides/eid-al-fitr',
  // Existing Ramadan pages
  '/guides/ramadan',
  '/guides/ramadan-2026',
  '/guides/ramadan/best-iftars',
];

async function submitUrls() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.HOME + '/.config/gcloud/bahrain-nights-service-account.json',
    scopes: ['https://www.googleapis.com/auth/indexing']
  });
  
  const indexing = google.indexing({ version: 'v3', auth });
  const BASE = 'https://www.bahrainnights.com';
  
  let success = 0, failed = 0;
  
  for (const path of RAMADAN_URLS) {
    const url = BASE + path;
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED'
        }
      });
      console.log(`✅ ${path}`);
      success++;
    } catch (err) {
      console.log(`❌ ${path}: ${err.message}`);
      failed++;
    }
    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\nDone: ${success} submitted, ${failed} failed`);
}

submitUrls();
