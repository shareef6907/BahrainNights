const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('=== Testing /regional ===');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const regionalSrc = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        return iframe.src;
      }
    }
    return null;
  });
  console.log('Regional src:', regionalSrc);
  
  // Check container styles
  const regionalStyles = await page.evaluate(() => {
    const container = document.getElementById('regional-youtube-player');
    if (!container) return 'Container not found';
    const style = window.getComputedStyle(container);
    return {
      width: style.width,
      height: style.height,
      transform: style.transform,
      position: style.position,
    };
  });
  console.log('Regional container styles:', regionalStyles);
  
  console.log('\n=== Testing /cinema ===');
  await page.goto('https://bahrainnights.com/cinema', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const cinemaSrc = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        return iframe.src;
      }
    }
    return null;
  });
  console.log('Cinema src:', cinemaSrc);
  
  const cinemaStyles = await page.evaluate(() => {
    const container = document.getElementById('youtube-player');
    if (!container) return 'Container not found';
    const style = window.getComputedStyle(container);
    return {
      width: style.width,
      height: style.height,
      transform: style.transform,
      position: style.position,
    };
  });
  console.log('Cinema container styles:', cinemaStyles);
  
  await browser.close();
})();
