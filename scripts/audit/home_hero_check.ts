/**
 * The HOMEPAGE hero check.
 *
 * The homepage does NOT use the YouTube player - it uses a native <video>
 * element (src/components/home/HeroVideo.tsx). So the YouTube-specific
 * check does not apply; this one proves the video ELEMENT is showing a
 * moving picture instead.
 *
 * Same principle: PIXELS MUST CHANGE.
 *
 * Run: npx tsx scripts/audit/home_hero_check.ts [url] [outdir]
 */
import { chromium } from 'playwright';
import { resolveBrowserPath } from './browser-path';

const URL_ARG = process.argv[2] || 'https://www.bahrainnights.com/';
const OUT = process.argv[3] || '/tmp/hero_pics';

const PIXEL_FN = `(async function (framesIn) {
  function load(b64) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = 'data:image/png;base64,' + b64;
    });
  }
  function pixels(img) {
    var c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    var g = c.getContext('2d');
    g.drawImage(img, 0, 0);
    return { w: img.width, h: img.height, d: g.getImageData(0, 0, img.width, img.height).data };
  }
  function compare(a, b) {
    if (a.w !== b.w || a.h !== b.h) return { diff: -1, total: -1, pct: -1 };
    var total = a.w * a.h, diff = 0;
    for (var i = 0; i < total; i++) {
      var o = i * 4;
      if (Math.abs(a.d[o] - b.d[o]) > 6 || Math.abs(a.d[o+1] - b.d[o+1]) > 6 || Math.abs(a.d[o+2] - b.d[o+2]) > 6) diff++;
    }
    return { diff: diff, total: total, pct: +(diff / total).toFixed(6) };
  }
  var imgs = await Promise.all(framesIn.map(function (f) { return load(f.b64); }));
  var px = imgs.map(pixels);
  var colours = {}, n = 0;
  for (var i = 0; i < px[0].w * px[0].h; i++) {
    var o = i * 4;
    var k = (px[0].d[o] >> 3) + ',' + (px[0].d[o+1] >> 3) + ',' + (px[0].d[o+2] >> 3);
    if (!colours[k]) { colours[k] = 1; n++; }
  }
  return {
    ab: compare(px[0], px[1]), bc: compare(px[1], px[2]), ac: compare(px[0], px[2]),
    distinctColoursFrame1: n, sizes: px.map(function (p) { return p.w + 'x' + p.h; })
  };
})`;

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: resolveBrowserPath() });
  // The homepage hero video is DESKTOP ONLY by design
  // (src/components/home/HeroVideo.tsx: "Mobile: the video is never
  // requested at all"), so this check runs at a desktop viewport.
  const DESKTOP = process.env.DESKTOP === '1';
  const ctx = await browser.newContext(
    DESKTOP
      ? { viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 }
      : { viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
  );
  const page = await ctx.newPage();

  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));

  await page.goto(URL_ARG, { waitUntil: 'domcontentloaded', timeout: 60000 });

  const marks = [500, 2000, 5000];
  const frames: { label: string; b64: string }[] = [];
  const { writeFileSync, mkdirSync } = await import('fs');
  mkdirSync(OUT, { recursive: true });
  let prev = 0;
  for (const ms of marks) {
    await page.waitForTimeout(ms - prev);
    prev = ms;
    const file = `${OUT}/home_${DESKTOP ? 'desktop' : 'mobile'}_${ms}ms.png`;
    const buf = await page.screenshot({ clip: { x: 0, y: 0, width: DESKTOP ? 1280 : 412, height: DESKTOP ? 720 : 576 } });
    writeFileSync(file, buf);
    frames.push({ label: `t=${ms}ms`, b64: buf.toString('base64') });
    console.log(`  screenshot t=${ms}ms: ${file}`);
  }

  const state: any = await page.evaluate(`(() => {
    const v = document.querySelector('video');
    const cs = v ? getComputedStyle(v) : null;
    const r = v ? v.getBoundingClientRect() : null;
    return {
      hasVideo: !!v,
      src: v ? (v.currentSrc || v.src || '').slice(0, 120) : null,
      rect: r ? { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) } : null,
      visibility: cs ? cs.visibility : null,
      opacity: cs ? cs.opacity : null,
      display: cs ? cs.display : null,
      currentTime: v ? +v.currentTime.toFixed(2) : null,
      paused: v ? v.paused : null,
      muted: v ? v.muted : null,
      readyState: v ? v.readyState : null,
      videoWidth: v ? v.videoWidth : null,
      videoHeight: v ? v.videoHeight : null,
    };
  })()`);

  const pixel: any = await page.evaluate(`(${PIXEL_FN})(${JSON.stringify(frames)})` as any);

  console.log('');
  console.log(`URL: ${URL_ARG}`);
  console.log('');
  console.log('  === 1. PIXEL DIFF (the decisive check) ===');
  console.log(`  frame sizes: ${pixel.sizes.join(', ')}`);
  console.log(`  t=500ms vs t=2000ms: ${pixel.ab.diff}/${pixel.ab.total} pixels differ (${(pixel.ab.pct * 100).toFixed(2)}%)`);
  console.log(`  t=2000ms vs t=5000ms: ${pixel.bc.diff}/${pixel.bc.total} pixels differ (${(pixel.bc.pct * 100).toFixed(2)}%)`);
  console.log(`  PIXELS CHANGE: ${pixel.ab.diff > 0 && pixel.bc.diff > 0}`);
  console.log('');
  console.log('  === 2. NOT A UNIFORM COLOUR ===');
  console.log(`  distinct colours in the t=500ms frame: ${pixel.distinctColoursFrame1}  -> not a flat box: ${pixel.distinctColoursFrame1 > 8}`);
  console.log('');
  console.log('  === 3. THE VIDEO ELEMENT ===');
  console.log('  ' + JSON.stringify(state, null, 2).replace(/\n/g, '\n  '));
  const media = requests.filter((u) => /\.(mp4|webm|m3u8|mov)(\?|$)/i.test(u));
  console.log('');
  console.log('  video segment requests:', media.length);
  console.log('');

  const pass = pixel.ab.diff > 0 && pixel.bc.diff > 0 && state.hasVideo && state.currentTime > 0;
  console.log(pass
    ? 'RESULT: PASS - the homepage hero video is playing a moving picture'
    : 'RESULT: FAIL');

  await browser.close();
  if (!pass) process.exit(1);
}

main();
