const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const failedRequests = [];
  page.on('requestfailed', request => {
    if (request.url().includes('401')) {
      failedRequests.push(request.url());
    }
  });
  
  console.log('Loading /regional...');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  console.log('401 requests:', failedRequests);
  
  await browser.close();
})();
