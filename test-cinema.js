const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  
  console.log('Navigating to /cinema...');
  await page.goto('https://bahrainnights.com/cinema', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Wait for player to initialize
  await page.waitForTimeout(3000);
  
  // Check if YouTube iframe exists
  const iframe = await page.$('iframe');
  console.log('YouTube iframe found:', !!iframe);
  
  if (iframe) {
    const src = await iframe.getAttribute('src');
    console.log('Iframe src:', src ? src.substring(0, 150) + '...' : 'no src');
  }
  
  // Check YouTube API ready state
  const ytReady = await page.evaluate(() => {
    return !!window.YT && !!window.YT.Player;
  });
  console.log('YouTube API ready:', ytReady);
  
  // Check player state
  const playerState = await page.evaluate(() => {
    // Try to get player state if available
    const players = document.querySelectorAll('iframe');
    for (const p of players) {
      if (p.src && p.src.includes('youtube.com/embed')) {
        return 'YouTube iframe present';
      }
    }
    return 'No YouTube iframe';
  });
  console.log('Player state:', playerState);
  
  await browser.close();
  console.log('\nTest complete.');
})();
