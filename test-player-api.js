const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('=== Testing /regional Player API ===');
  await page.goto('https://bahrainnights.com/regional', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  // Check if player object exists
  const playerInfo = await page.evaluate(() => {
    // Check window.YT.players for the regional player
    const players = window.YT?.players || {};
    const regionalPlayer = players['regional-youtube-player'];
    
    return {
      ytReady: !!window.YT,
      playersCount: Object.keys(players).length,
      playerKeys: Object.keys(players),
      regionalPlayerExists: !!regionalPlayer,
      hasPlayVideo: !!(regionalPlayer && typeof regionalPlayer.playVideo === 'function'),
      hasGetPlayerState: !!(regionalPlayer && typeof regionalPlayer.getPlayerState === 'function'),
      playerState: regionalPlayer ? regionalPlayer.getPlayerState?.() : null,
      muted: regionalPlayer?.isMuted?.() || false,
    };
  });
  console.log('Player API info:', playerInfo);
  
  console.log('\n=== Testing /cinema Player API ===');
  await page.goto('https://bahrainnights.com/cinema', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const cinemaPlayerInfo = await page.evaluate(() => {
    const players = window.YT?.players || {};
    const cinemaPlayer = players['youtube-player'];
    
    return {
      playersCount: Object.keys(players).length,
      playerKeys: Object.keys(players),
      cinemaPlayerExists: !!cinemaPlayer,
      hasPlayVideo: !!(cinemaPlayer && typeof cinemaPlayer.playVideo === 'function'),
      hasGetPlayerState: !!(cinemaPlayer && typeof cinemaPlayer.getPlayerState === 'function'),
      playerState: cinemaPlayer ? cinemaPlayer.getPlayerState?.() : null,
      muted: cinemaPlayer?.isMuted?.() || false,
    };
  });
  console.log('Player API info:', cinemaPlayerInfo);
  
  await browser.close();
})();
