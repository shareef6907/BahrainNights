import { chromium } from 'playwright';
const EXEC = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
async function main() {
  for (const url of ['https://www.bahrainnights.com/regional', 'https://www.bahrainnights.com/cinema']) {
    const browser = await chromium.launch({ headless: true, executablePath: EXEC });
    const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6*1024*1024)/8, uploadThroughput: (750*1024)/8 });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    for (const t of [1000, 3000, 6000, 12000]) {
      await page.waitForTimeout(t === 1000 ? 1000 : 2000);
      const info: any = await page.evaluate("(() => { const f = document.querySelector('iframe'); if (!f) return { iframe: null }; const r = f.getBoundingClientRect(); const cs = getComputedStyle(f); return { iframe: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }, visibility: cs.visibility, display: cs.display, opacity: cs.opacity }; })()");
      console.log(url.replace('https://www.bahrainnights.com',''), 't=' + t + 'ms', JSON.stringify(info));
    }
    await browser.close();
  }
}
main();
