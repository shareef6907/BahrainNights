const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Testing /regional video playback...');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);
  
  // Get iframe details
  const iframeInfo = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        // Check if video is actually playing by looking at the iframe content
        return {
          src: iframe.src,
          width: iframe.width,
          height: iframe.height,
          id: iframe.id,
          name: iframe.name,
        };
      }
    }
    return null;
  });
  
  console.log('Iframe info:', JSON.stringify(iframeInfo, null, 2));
  
  // Check page for any errors
  const hasVideo = !!iframeInfo;
  console.log('Has video:', hasVideo);
  
  // Check what's actually visible
  const bodyText = await page.textContent('body');
  console.log('Page loaded, has content:', bodyText.length > 100);
  
  await browser.close();
  console.log('\nDone.');
})();
