const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('=== Testing /cinema - checking ALL window.YT properties ===');
  await page.goto('https://bahrainnights.com/cinema', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const cinemaInfo = await page.evaluate(() => {
    const info = {
      ytExists: !!window.YT,
      hasPlayerClass: !!window.YT?.Player,
      keys: window.YT ? Object.keys(window.YT) : [],
    };
    
    // Try to find any YT instances
    for (const key in window) {
      if (key.toLowerCase().includes('player') || key.toLowerCase().includes('youtube')) {
        info[key] = typeof window[key];
      }
    }
    
    return info;
  });
  console.log('Cinema window.YT info:', cinemaInfo);
  
  // Try to get player by checking the iframe more closely
  const iframeDetail = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        return {
          id: iframe.id,
          name: iframe.name,
          srcFull: iframe.src,
        };
      }
    }
    return null;
  });
  console.log('Iframe details:', iframeDetail);
  
  await browser.close();
})();
