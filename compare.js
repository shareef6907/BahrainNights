const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('=== /cinema iframe ===');
  await page.goto('https://bahrainnights.com/cinema', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const cinemaIframe = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        const style = window.getComputedStyle(iframe);
        return {
          src: iframe.src,
          position: style.position,
          width: style.width,
          height: style.height,
          zIndex: style.zIndex,
          transform: style.transform,
          top: style.top,
          left: style.left,
          right: style.right,
          bottom: style.bottom,
        };
      }
    }
    return null;
  });
  console.log('Cinema:', JSON.stringify(cinemaIframe, null, 2));
  
  console.log('\n=== /regional iframe ===');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const regionalIframe = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        const style = window.getComputedStyle(iframe);
        return {
          src: iframe.src,
          position: style.position,
          width: style.width,
          height: style.height,
          zIndex: style.zIndex,
          transform: style.transform,
          top: style.top,
          left: style.left,
          right: style.right,
          bottom: style.bottom,
        };
      }
    }
    return null;
  });
  console.log('Regional:', JSON.stringify(regionalIframe, null, 2));
  
  await browser.close();
})();
