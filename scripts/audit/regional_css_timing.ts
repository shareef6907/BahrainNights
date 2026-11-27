/**
 * When does the CSS arrive, relative to the first paint?
 *
 * The rail is `sw=396` (unstyled, items stacked) until the stylesheet
 * lands, then `sw=10102` (a horizontal scroller). The rail item moves
 * 790px horizontally at that moment - that is the CLS.
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://www.bahrainnights.com/regional';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: EXEC });
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
  const page = await ctx.newPage();

  const css: string[] = [];
  page.on('response', async (r) => {
    if (r.url().includes('/_next/static/css/')) {
      const timing = r.request().timing();
      css.push(`  ${new Date().toISOString().slice(14, 23)}  ${r.url().split('/').pop()}  status=${r.status()}  bodySize=${(await r.body().catch(() => Buffer.from(''))).length}`);
    }
  });

  await page.addInitScript(`
    window.__paints = [];
    new PerformanceObserver(function (l) {
      for (const e of l.getEntries()) {
        window.__paints.push({ t: Math.round(e.startTime), url: e.name });
      }
    }).observe({ type: 'paint', buffered: true });
  `);

  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(20000);

  console.log('CSS responses:');
  for (const c of css) console.log(c);
  console.log('');
  const paints: any = await page.evaluate('window.__paints || []');
  console.log('paint events:');
  for (const p of paints) console.log(`  t=${p.t}ms  ${p.url}`);
  const nav: any = await page.evaluate(`(() => {
    const n = performance.getEntriesByType('navigation')[0];
    const res = performance.getEntriesByType('resource').filter(function (r) { return r.name.indexOf('/_next/static/css/') >= 0; });
    return {
      domContentLoaded: Math.round(n.domContentLoadedEventEnd),
      loadEvent: Math.round(n.loadEventEnd),
      css: res.map(function (r) { return { name: r.name.split('/').pop(), start: Math.round(r.startTime), end: Math.round(r.responseEnd), size: r.transferSize }; }),
    };
  })()`);
  console.log('');
  console.log('navigation:');
  console.log('  DOMContentLoaded:', nav.domContentLoaded, 'ms');
  console.log('  load:', nav.loadEvent, 'ms');
  console.log('  css resources:');
  for (const c of nav.css) console.log(`     ${c.name}  start=${c.start}ms end=${c.end}ms size=${c.size}`);
  await browser.close();
}

main();
