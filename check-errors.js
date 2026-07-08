const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  page.on('pageerror', err => {
    errors.push('Page error: ' + err.message);
  });
  
  console.log('Loading /regional...');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(5000);
  
  console.log('Errors:', errors.length > 0 ? errors.join('\n') : 'None');
  
  await browser.close();
})();
