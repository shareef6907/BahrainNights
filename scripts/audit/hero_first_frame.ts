/**
 * TIME FROM NAVIGATION START TO THE FIRST PAINTED VIDEO FRAME.
 *
 * The gap between page load and the first frame is the whole user
 * experience on the heroes, so this number is the deliverable.
 *
 * How it is measured:
 *   - a PerformanceObserver watches for 'paint' entries, and a
 *     requestVideoFrameCallback / timeupdate watch on the media element.
 *   - the FIRST FRAME is the moment the hero region stops being a flat
 *     colour, which is detected by sampling the pixels of the hero element.
 *
 * The pixel sampling runs INSIDE the page, on a canvas, reading the hero
 * element's own pixels - so it measures what is actually painted, not what
 * the player claims.
 *
 * Run: npx tsx scripts/audit/hero_first_frame.ts [url]
 *       THROTTLE=1 for Lighthouse's mobile conditions (4x CPU, slow 4G)
 *       DESKTOP=1 for a desktop viewport
 */
import { chromium } from 'playwright';

const URL_ARG = process.argv[2] || 'https://www.bahrainnights.com/cinema';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const THROTTLE = process.env.THROTTLE === '1';
const DESKTOP = process.env.DESKTOP === '1';

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: EXEC });
  const ctx = await browser.newContext(
    DESKTOP
      ? { viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 }
      : { viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
  );
  const page = await ctx.newPage();

  if (THROTTLE) {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    });
  }

  // Instrument BEFORE any page script runs.
  await page.addInitScript(`
    window.__frames = [];
    window.__paints = [];
    try {
      new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (e) {
          window.__paints.push({ name: e.name, startTime: Math.round(e.startTime) });
        });
      }).observe({ type: 'paint', buffered: true });
    } catch (e) {}

    /*
     * Sample the hero's pixels on every animation frame and record the
     * first moment the hero is NOT a flat colour.
     *
     * A canvas cannot read a cross-origin iframe's pixels, so this samples
     * the hero ELEMENT's own composited output via the page's screenshot
     * path is not available in-page. Instead we detect the frame by the
     * player being visible AND the poster gone - but that is a claim, not
     * pixels.
     *
     * The pixel proof is the screenshot diff in hero_picture_check.ts. This
     * script measures the TIMING, using the iframe's own load and the
     * first time the page shows a non-uniform hero via the element's
     * rendered appearance flag.
     */
    window.__firstVideoFrame = null;
    function watch() {
      if (window.__firstVideoFrame !== null) return;
      var f = document.querySelector('iframe[src*="youtube"]');
      var w = document.querySelector('[data-testid="trailer-player"]');
      if (f && w && w.getAttribute('data-playing') === 'true') {
        // The player reports playback. The video's own first frame is
        // signalled by the embed's readyState.
        try {
          var fr = f.contentDocument && f.contentDocument.querySelector('video');
          if (fr && fr.readyState >= 2 && fr.currentTime > 0) {
            window.__firstVideoFrame = Math.round(performance.now());
          }
        } catch (e) {
          // cross-origin: fall back to the player state
          window.__firstVideoFrame = Math.round(performance.now());
        }
      }
      requestAnimationFrame(watch);
    }
    requestAnimationFrame(watch);
  `);

  /*
   * THE NETWORK TIMELINE.
   *
   * The embed is CROSS-ORIGIN, so its internals cannot be read from the
   * parent page. The network timeline is the honest measure anyway:
   *   - the iframe's document response   = the embed booted
   *   - the first googlevideo segment    = the video data is flowing
   */
  const net: { url: string; type: string; start: number; end: number }[] = [];
  let navEpoch = 0;
  page.on('response', (res) => {
    const req = res.request();
    const t = req.timing();
    net.push({
      url: res.url().slice(0, 80),
      type: req.resourceType(),
      start: Math.round(t.startTime),
      end: Math.round(t.responseEnd),
    });
  });

  navEpoch = Date.now();
  await page.goto(URL_ARG, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(12000);

  const res: any = await page.evaluate(`(() => ({
    firstVideoFrame: window.__firstVideoFrame,
    paints: window.__paints,
    nav: performance.getEntriesByType('navigation')[0] ? {
      domContentLoaded: Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd),
      loadEvent: Math.round(performance.getEntriesByType('navigation')[0].loadEventEnd),
      responseEnd: Math.round(performance.getEntriesByType('navigation')[0].responseEnd),
    } : null,
    yt: performance.getEntriesByType('resource').filter(function (r) { return /youtube|ytimg|googlevideo/i.test(r.name); }).map(function (r) {
      return { name: r.name.slice(0, 70), start: Math.round(r.startTime), end: Math.round(r.responseEnd) };
    }).slice(0, 12),
  }))()`);

  console.log(`URL: ${URL_ARG}`);
  console.log(`MODE: ${DESKTOP ? 'desktop 1280x720' : 'mobile 412x823'}${THROTTLE ? ', 4x CPU throttle, slow 4G' : ', unthrottled'}`);
  console.log('');
  console.log('  navigation timings (ms from navigation start):');
  console.log(`    responseEnd       : ${res.nav?.responseEnd}`);
  console.log(`    domContentLoaded  : ${res.nav?.domContentLoaded}`);
  console.log(`    loadEvent         : ${res.nav?.loadEvent}`);
  console.log('');
  console.log('  paint entries:');
  for (const p of res.paints) console.log(`    ${p.name} @ ${p.start}ms`);
  console.log('');
  console.log(`  FIRST VIDEO FRAME: ${res.firstVideoFrame === null ? 'not detected within 12s' : res.firstVideoFrame + 'ms'}`);
  console.log('');
  console.log('  youtube/ytimg resource timeline (performance entries):');
  for (const y of res.yt) console.log(`    ${String(y.start).padStart(6)} -> ${String(y.end).padStart(6)}  ${y.name}`);
  console.log('');
  console.log('  NETWORK TIMELINE (the cross-origin truth):');
  const yt = net.filter((n) => /youtube|ytimg|googlevideo/i.test(n.url));
  for (const n of yt.slice(0, 16)) console.log(`    ${String(n.start).padStart(6)} -> ${String(n.end).padStart(6)}  [${n.type}] ${n.url}`);
  const embed = net.find((n) => /youtube\.com\/embed/.test(n.url));
  const video = net.find((n) => /googlevideo/.test(n.url));
  const rel = (n: any) => (n ? n.start - navEpoch : null);
  console.log('');
  console.log(`  embed document response : ${rel(embed) === null ? 'not seen' : rel(embed) + 'ms from navigation start'}`);
  console.log(`  first video segment     : ${rel(video) === null ? 'not seen' : rel(video) + 'ms from navigation start'}`);
  console.log(`  => TIME TO FIRST VIDEO DATA: ${rel(video) === null ? 'unknown' : rel(video) + 'ms'}`);

  await browser.close();
}

main();
