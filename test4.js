const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Testing /regional...');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const info = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        return {
          src: iframe.src,
          class: iframe.className,
          style: iframe.getAttribute('style'),
        };
      }
    }
    return null;
  });
  
  console.log('Iframe:', JSON.stringify(info, null, 2));
  
  await browser.close();
})();
