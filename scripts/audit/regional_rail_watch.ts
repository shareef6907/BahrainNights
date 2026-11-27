/**
 * Watch the BlogRow rails on /regional: their scrollLeft, scrollWidth, and
 * the position of the FIRST and a MIDDLE item, over time, under Lighthouse's
 * conditions.
 *
 * The Lighthouse shift names a `div[style="scroll-snap-align:start"]` item
 * at left=1056 in a 412px viewport - off-screen. For an off-screen item in
 * a horizontal scroller to count as a shift, the SCROLLER must change its
 * scroll position or the item's offset within the scroller's content.
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://www.bahrainnights.com/regional';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: EXEC });
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
  const page = await ctx.newPage();

  await page.addInitScript(`
    window.__paints = [];
    new PerformanceObserver(function (l) { for (const e of l.getEntries()) window.__paints.push(Math.round(e.startTime) + ':' + e.name); }).observe({ type: 'paint', buffered: true });
    window.__watch = [];
    var iv = setInterval(function () {
      var rails = document.querySelectorAll('div[style*="scroll-snap-type"]');
      if (!rails.length) return;
      var r = rails[0];
      var items = r.children;
      var first = items[0] ? items[0].getBoundingClientRect() : null;
      var third = items[3] ? items[3].getBoundingClientRect() : null;
      var row = r.closest('div.relative');
      var rowBox = row ? row.getBoundingClientRect() : null;
      window.__watch.push({
        t: Math.round(performance.now()),
        scrollLeft: r.scrollLeft,
        scrollWidth: r.scrollWidth,
        clientWidth: r.clientWidth,
        items: items.length,
        firstLeft: first ? Math.round(first.left) : null,
        firstTop: first ? Math.round(first.top) : null,
        thirdLeft: third ? Math.round(third.left) : null,
        thirdTop: third ? Math.round(third.top) : null,
        rowTop: rowBox ? Math.round(rowBox.top) : null,
        rowH: rowBox ? Math.round(rowBox.height) : null,
        docH: document.documentElement.scrollHeight,
        sheets: document.styleSheets.length,
        paints: (window.__paints || []).join(' '),
      });
      if (performance.now() > 20000) clearInterval(iv);
    }, 25);
  `);

  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(21000);

  const w: any = await page.evaluate('window.__watch || []');
  console.log(`URL: ${URL}`);
  console.log(`samples: ${w.length}`);
  console.log('');
  let prev = '';
  for (const s of w) {
    const k = `sl=${s.scrollLeft} sw=${s.scrollWidth} cw=${s.clientWidth} n=${s.items} first=${s.firstLeft}/${s.firstTop} third=${s.thirdLeft}/${s.thirdTop} rowTop=${s.rowTop} rowH=${s.rowH} docH=${s.docH}`;
    if (k !== prev) {
      console.log(`t=${String(s.t).padStart(6)}ms  ${k}`);
      console.log(`             sheets=${s.sheets} paints=${s.paints}`);
      prev = k;
    }
  }
  await browser.close();
}

main();
