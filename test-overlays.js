const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('=== Testing /regional - checking for overlays/blockers ===');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const overlays = await page.evaluate(() => {
    const results = {
      // Check for elements that might block video
      absoluteDivs: 0,
      fixedDivs: 0,
      zIndexAboveVideo: [],
    };
    
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(div => {
      const style = window.getComputedStyle(div);
      if (style.position === 'absolute') results.absoluteDivs++;
      if (style.position === 'fixed') results.fixedDivs++;
      
      const zIndex = parseInt(style.zIndex) || 0;
      if (zIndex > 0 && div.querySelector('iframe') === null) {
        // Check if this might cover the video
        const rect = div.getBoundingClientRect();
        if (rect.width > 100 && rect.height > 100) {
          results.zIndexAboveVideo.push({
            zIndex,
            width: rect.width,
            height: rect.height,
            text: div.textContent?.substring(0, 30) || 'no text',
          });
        }
      }
    });
    
    // Check iframe position and size
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        const rect = iframe.getBoundingClientRect();
        const style = window.getComputedStyle(iframe);
        results.iframe = {
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
          style: { position: style.position, zIndex: style.zIndex, pointerEvents: style.pointerEvents },
        };
      }
    }
    
    return results;
  });
  
  console.log('Overlay analysis:', JSON.stringify(overlays, null, 2));
  
  // Now check /cinema
  console.log('\n=== Testing /cinema ===');
  await page.goto('https://bahrainnights.com/cinema', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const cinemaOverlays = await page.evaluate(() => {
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
      if (iframe.src && iframe.src.includes('youtube.com/embed')) {
        const rect = iframe.getBoundingClientRect();
        const style = window.getComputedStyle(iframe);
        return {
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
          style: { position: style.position, zIndex: style.zIndex, pointerEvents: style.pointerEvents },
        };
      }
    }
    return null;
  });
  
  console.log('Cinema iframe:', JSON.stringify(cinemaOverlays, null, 2));
  
  await browser.close();
})();
