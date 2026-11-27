/**
 * THE PROBE Shareef asked for, run against the LIVE /regional page.
 *
 * Every layout-shift entry, with the DOM node that moved and the previous
 * and current rects, sorted by value descending.
 *
 * Run: npx tsx scripts/audit/regional_shift.ts [url]
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://www.bahrainnights.com/regional';

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
  });
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 823 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1.75,
  });
  const page = await ctx.newPage();

  await page.addInitScript(`
    window.__shifts = [];
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        if (e.hadRecentInput) continue;
        window.__shifts.push({
          value: e.value,
          startTime: e.startTime,
          sources: e.sources.map(s => ({
            node: s.node && s.node.outerHTML.slice(0, 120),
            tag: s.node && s.node.tagName,
            cls: s.node && String(s.node.className || '').slice(0, 70),
            inline: s.node && String(s.node.getAttribute('style') || '').slice(0, 90),
            from: s.previousRect ? { x: Math.round(s.previousRect.x), y: Math.round(s.previousRect.y), w: Math.round(s.previousRect.width), h: Math.round(s.previousRect.height) } : null,
            to: s.currentRect ? { x: Math.round(s.currentRect.x), y: Math.round(s.currentRect.y), w: Math.round(s.currentRect.width), h: Math.round(s.currentRect.height) } : null,
          })),
        });
      }
    }).observe({ type: 'layout-shift', buffered: true });
  `);

  /*
   * LIGHTHOUSE'S CONDITIONS.
   *
   * Lighthouse mobile throttles the CPU 4x and the network to slow 4G.
   * Without those, the page settles before the shift happens and the
   * PerformanceObserver sees nothing - which is exactly what happened on
   * the first attempt to measure this.
   */
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(20000);

  const shifts: any = await page.evaluate('window.__shifts || []');
  shifts.sort((a: any, b: any) => b.value - a.value);

  const total = shifts.reduce((s: number, x: any) => s + x.value, 0);
  console.log(`URL: ${URL}`);
  console.log(`viewport: 412x823 mobile`);
  console.log(`layout-shift entries: ${shifts.length}`);
  console.log(`TOTAL CLS (sum of values): ${total.toFixed(4)}`);
  console.log('');

  for (const s of shifts) {
    console.log(`value=${s.value.toFixed(4)}  at ${Math.round(s.startTime)}ms`);
    for (const src of s.sources) {
      const moved = src.from && src.to
        ? Math.round(Math.hypot(src.to.x - src.from.x, src.to.y - src.from.y))
        : null;
      const sizeChanged = src.from && src.to
        ? Math.round(Math.abs(src.to.w - src.from.w) + Math.abs(src.to.h - src.from.h))
        : null;
      console.log(`   <${src.tag}> class="${src.cls}"`);
      console.log(`     style="${src.inline}"`);
      console.log(`     node  : ${src.node}`);
      console.log(`     from  : ${src.from ? `x=${src.from.x} y=${src.from.y} w=${src.from.w} h=${src.from.h}` : 'null'}`);
      console.log(`     to    : ${src.to ? `x=${src.to.x} y=${src.to.y} w=${src.to.w} h=${src.to.h}` : 'null'}`);
      console.log(`     MOVED ${moved}px   RESIZED ${sizeChanged}px`);
    }
    console.log('');
  }

  await browser.close();
}

main();
