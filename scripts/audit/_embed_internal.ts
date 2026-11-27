/**
 * What is the 412x232 element inside the YouTube embed, and when does it
 * appear and disappear?
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://www.bahrainnights.com/regional';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: EXEC });
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

  for (let i = 0; i < 26; i++) {
    await page.waitForTimeout(500);
    const frames = page.frames().filter((f) => f.url().includes('youtube.com/embed'));
    if (!frames.length) { console.log(`t=${(i + 1) * 500}ms  no embed frame yet`); continue; }
    const f = frames[0];
    try {
      const d: any = await f.evaluate(`(() => {
        const b = document.body;
        const kids = Array.from(b.children).map(function (c) {
          const r = c.getBoundingClientRect();
          return { tag: c.tagName, cls: String(c.className || '').slice(0, 44), w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top) };
        });
        return { bodyH: Math.round(b.getBoundingClientRect().height), bodyW: Math.round(b.getBoundingClientRect().width), kids: kids };
      })()`);
      const interesting = d.kids.filter((k: any) => k.w > 100 || k.h > 100);
      console.log(`t=${(i + 1) * 500}ms  body=${d.bodyW}x${d.bodyH}  ${JSON.stringify(interesting)}`);
    } catch (e) {
      console.log(`t=${(i + 1) * 500}ms  eval failed`);
    }
  }
  await browser.close();
}

main();
