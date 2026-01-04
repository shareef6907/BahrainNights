const { chromium } = require('playwright');

async function testEventsPage() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Navigating to events page...');
  await page.goto('https://www.bahrainnights.com/events', { waitUntil: 'networkidle' });

  // Wait for ads to load
  await page.waitForTimeout(3000);

  // Take screenshot
  await page.screenshot({ path: '.playwright-mcp/events-5-ads-test.png', fullPage: false });
  console.log('Screenshot saved to .playwright-mcp/events-5-ads-test.png');

  // Count dot indicators (they indicate number of slides)
  const dots = await page.locator('[class*="rounded-full"][class*="bg-"]').count();
  console.log('Found ' + dots + ' dot indicators (approximate ad count)');

  // Check for ad banner
  const adBanner = await page.locator('text=Sponsored').count();
  console.log('Found ' + adBanner + ' Sponsored label(s)');

  await browser.close();
  console.log('Done!');
}

testEventsPage().catch(console.error);
