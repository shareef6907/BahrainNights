const { chromium } = require('playwright');

async function testAllPages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  const pages = [
    { name: 'Events', url: 'https://www.bahrainnights.com/events', api: '/api/public/ads?targetPage=events&placement=banner&limit=10' },
    { name: 'Places', url: 'https://www.bahrainnights.com/places', api: '/api/public/ads?targetPage=places&placement=banner&limit=10' },
    { name: 'Cinema', url: 'https://www.bahrainnights.com/cinema', api: '/api/public/ads?targetPage=cinema&placement=banner&limit=10' },
    { name: 'Homepage', url: 'https://www.bahrainnights.com', api: '/api/public/ads?targetPage=homepage&placement=slider&limit=10' },
  ];

  for (const p of pages) {
    console.log('\n=== ' + p.name.toUpperCase() + ' PAGE ===');
    await page.goto(p.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Take screenshot
    const filename = '.playwright-mcp/' + p.name.toLowerCase() + '-ads-final.png';
    await page.screenshot({ path: filename, fullPage: false });
    console.log('Screenshot: ' + filename);

    // Check ads data
    const adsData = await page.evaluate(async (apiUrl) => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.ads;
    }, p.api);

    console.log('Total ads: ' + adsData.length);
    const withSettings = adsData.filter(ad => ad.image_settings).length;
    console.log('With image_settings: ' + withSettings);
  }

  await browser.close();
  console.log('\n=== ALL TESTS COMPLETE ===');
}

testAllPages().catch(console.error);
