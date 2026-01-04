const { chromium } = require('playwright');

async function testEventsPage() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  console.log('Navigating to events page...');
  await page.goto('https://www.bahrainnights.com/events', { waitUntil: 'networkidle' });

  // Wait for page and ads to fully load
  await page.waitForTimeout(5000);

  // Take screenshot of ad banner area
  await page.screenshot({ path: '.playwright-mcp/events-ads-banner.png', fullPage: false });
  console.log('Screenshot saved to .playwright-mcp/events-ads-banner.png');

  // Check the API directly from the page context
  const adsData = await page.evaluate(async () => {
    const response = await fetch('/api/public/ads?targetPage=events&placement=banner&limit=10');
    const data = await response.json();
    return data.ads;
  });

  console.log('\n=== ADS DATA FROM PAGE ===');
  console.log('Total ads loaded: ' + adsData.length);
  adsData.forEach((ad, i) => {
    console.log('Slot ' + ad.slot_position + ': ' + ad.title + ' | has_image_settings=' + (ad.image_settings ? 'yes' : 'no'));
  });

  await browser.close();
  console.log('\nDone!');
}

testEventsPage().catch(console.error);
