const { google } = require('googleapis');

async function getSearchData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.HOME + '/.config/gcloud/bahrain-nights-service-account.json',
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
  });
  
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  
  // Get last 28 days of data
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  console.log(`\n📊 Search Performance (${startDate} to ${endDate})\n`);
  
  // Overall stats
  const overall = await searchconsole.searchanalytics.query({
    siteUrl: 'sc-domain:bahrainnights.com',
    requestBody: {
      startDate,
      endDate,
      dimensions: [],
    }
  });
  
  if (overall.data.rows && overall.data.rows[0]) {
    const r = overall.data.rows[0];
    console.log('TOTALS:');
    console.log(`  Clicks: ${r.clicks}`);
    console.log(`  Impressions: ${r.impressions}`);
    console.log(`  CTR: ${(r.ctr * 100).toFixed(2)}%`);
    console.log(`  Avg Position: ${r.position.toFixed(1)}`);
  }
  
  // Top queries
  console.log('\n🔍 TOP QUERIES:');
  const queries = await searchconsole.searchanalytics.query({
    siteUrl: 'sc-domain:bahrainnights.com',
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 15
    }
  });
  
  if (queries.data.rows) {
    queries.data.rows.forEach((row, i) => {
      console.log(`  ${i+1}. "${row.keys[0]}" - ${row.clicks} clicks, ${row.impressions} imp, pos ${row.position.toFixed(1)}`);
    });
  }
  
  // Top pages
  console.log('\n📄 TOP PAGES:');
  const pages = await searchconsole.searchanalytics.query({
    siteUrl: 'sc-domain:bahrainnights.com',
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 10
    }
  });
  
  if (pages.data.rows) {
    pages.data.rows.forEach((row, i) => {
      const url = row.keys[0].replace('https://www.bahrainnights.com', '');
      console.log(`  ${i+1}. ${url || '/'} - ${row.clicks} clicks, ${row.impressions} imp`);
    });
  }
}

getSearchData().catch(console.error);
