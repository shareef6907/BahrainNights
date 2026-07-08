const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('=== /regional: checking video vs backdrop ===');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const elements = await page.evaluate(() => {
    const results = { iframes: 0, images: 0 };
    
    // Count iframes
    document.querySelectorAll('iframe').forEach(el => results.iframes++);
    
    // Count images
    document.querySelectorAll('img').forEach(el => results.images++);
    
    // Check z-index of key elements
    const results2 = [];
    
    // Find the video container
    const container = document.querySelector('div[style*="100vw"]');
    if (container) {
      results2.push('Found main container');
    }
    
    // Check for backdrop image
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
      const src = img.src || '';
      const rect = img.getBoundingClientRect();
      if (src.includes('tmdb') || src.includes('backdrop') || src.includes('poster')) {
        results2.push({
          type: 'TMDB image',
          src: src.substring(0, 80),
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
          zIndex: window.getComputedStyle(img).zIndex,
        });
      }
    });
    
    return { ...results, details: results2 };
  });
  
  console.log(JSON.stringify(elements, null, 2));
  
  await browser.close();
})();
