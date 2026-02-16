const { google } = require('googleapis');

async function weeklyReport() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.HOME + '/.config/gcloud/bahrain-nights-service-account.json',
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
  });
  
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const prevStart = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const prevEnd = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  // This week
  const thisWeek = await searchconsole.searchanalytics.query({
    siteUrl: 'sc-domain:bahrainnights.com',
    requestBody: { startDate, endDate, dimensions: [] }
  });
  
  // Last week
  const lastWeek = await searchconsole.searchanalytics.query({
    siteUrl: 'sc-domain:bahrainnights.com',
    requestBody: { startDate: prevStart, endDate: prevEnd, dimensions: [] }
  });
  
  const tw = thisWeek.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const lw = lastWeek.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  
  const delta = (curr, prev) => {
    if (prev === 0) return curr > 0 ? '+∞' : '0';
    const pct = ((curr - prev) / prev * 100).toFixed(0);
    return pct >= 0 ? `+${pct}%` : `${pct}%`;
  };
  
  console.log(`📊 BahrainNights Weekly GSC Report`);
  console.log(`Week: ${startDate} to ${endDate}\n`);
  console.log(`| Metric | This Week | Last Week | Change |`);
  console.log(`|--------|-----------|-----------|--------|`);
  console.log(`| Clicks | ${tw.clicks} | ${lw.clicks} | ${delta(tw.clicks, lw.clicks)} |`);
  console.log(`| Impressions | ${tw.impressions} | ${lw.impressions} | ${delta(tw.impressions, lw.impressions)} |`);
  console.log(`| CTR | ${(tw.ctr*100).toFixed(1)}% | ${(lw.ctr*100).toFixed(1)}% | ${delta(tw.ctr, lw.ctr)} |`);
  console.log(`| Avg Position | ${tw.position.toFixed(1)} | ${lw.position.toFixed(1)} | ${tw.position < lw.position ? '📈' : '📉'} |`);
  
  // Top movers
  const queries = await searchconsole.searchanalytics.query({
    siteUrl: 'sc-domain:bahrainnights.com',
    requestBody: { startDate, endDate, dimensions: ['query'], rowLimit: 10 }
  });
  
  console.log(`\n🔍 Top Queries This Week:`);
  queries.data.rows?.forEach((r, i) => {
    console.log(`${i+1}. "${r.keys[0]}" — ${r.clicks} clicks, pos ${r.position.toFixed(0)}`);
  });
}

weeklyReport().catch(console.error);
