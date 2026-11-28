/**
 * THE HERO PICTURE CHECK.
 *
 * This replaces the old hero_play_check.ts, which gave a FALSE PASS on a
 * black box: it asserted a bounding rect and data-playing, and both are
 * satisfied by a player sitting under an opaque poster.
 *
 * WHAT THIS PROVES, in order of strength:
 *
 *   1. THE PIXELS CHANGE. Two screenshots of the hero region, a few
 *      seconds apart, must NOT be identical. A playing video changes
 *      pixels; a poster, a black box and a hidden player do not. This one
 *      assertion catches every failure mode.
 *   2. THE FRAME IS NOT A UNIFORM COLOUR. A black box is one colour.
 *   3. NOTHING IS COVERING THE IFRAME. Every ancestor is checked for
 *      visibility, opacity, display, width, height, and an overlapping
 *      higher-z-index element.
 *   4. The player's mute state is REPORTED - never used as the pass
 *      criterion.
 *
 * googlevideo requests and data-playing are kept as SECONDARY signals,
 * reported but never decisive.
 *
 * Run: npx tsx scripts/audit/hero_picture_check.ts [url] [outdir]
 *      THROTTLE=1 to apply Lighthouse's mobile conditions.
 */
import { chromium } from 'playwright';
import { resolveBrowserPath } from './browser-path';

const URL_ARG = process.argv[2] || 'https://www.bahrainnights.com/regional';
const OUT = process.argv[3] || '/tmp/hero_pics';
const THROTTLE = process.env.THROTTLE === '1';


async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: resolveBrowserPath() });
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 823 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));

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

  await page.goto(URL_ARG, { waitUntil: 'domcontentloaded', timeout: 60000 });

  const marks = [500, 2000, 5000];
  const files: { label: string; file: string }[] = [];
  const frames: { label: string; b64: string }[] = [];
  let prev = 0;
  for (const ms of marks) {
    await page.waitForTimeout(ms - prev);
    prev = ms;
    const slug = URL_ARG.replace(/^https?:\/\/[^/]+/, '').replace(/\//g, '_') || '_';
    const file = `${OUT}/${slug}_${ms}ms.png`;
    const buf = await page.screenshot({ clip: { x: 0, y: 0, width: 412, height: 576 } });
    // Write it to disk for Shareef to look at, and keep the bytes for the diff.
    const { writeFileSync, mkdirSync } = await import('fs');
    mkdirSync(OUT, { recursive: true });
    writeFileSync(file, buf);
    files.push({ label: `t=${ms}ms`, file });
    frames.push({ label: `t=${ms}ms`, b64: buf.toString('base64') });
  }

  /*
   * THE PIXEL DIFF, done in the page with a canvas - no extra dependency.
   */
  /*
   * THE PIXEL DIFF, done in the page with a canvas - no extra dependency.
   *
   * The function is passed as a STRING so esbuild's __name helper is not
   * injected into the browser context.
   */
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
    var colours = {};
    var n = 0;
    for (var i = 0; i < px[0].w * px[0].h; i++) {
      var o = i * 4;
      var k = (px[0].d[o] >> 3) + ',' + (px[0].d[o+1] >> 3) + ',' + (px[0].d[o+2] >> 3);
      if (!colours[k]) { colours[k] = 1; n++; }
    }
    return {
      ab: compare(px[0], px[1]),
      bc: compare(px[1], px[2]),
      ac: compare(px[0], px[2]),
      distinctColoursFrame1: n,
      sizes: px.map(function (p) { return p.w + 'x' + p.h; })
    };
  })`;

  const pixel: any = await page.evaluate(
    `(${PIXEL_FN})(${JSON.stringify(frames)})` as any
  );

  const state: any = await page.evaluate(`(() => {
    const f = document.querySelector('iframe[src*="youtube"]');
    const wrap = document.querySelector('[data-testid="trailer-player"]');
    const chain = [];
    let p = f;
    for (let i = 0; i < 6 && p; i++, p = p.parentElement) {
      const cs = getComputedStyle(p);
      const r = p.getBoundingClientRect();
      chain.push({
        i, tag: p.tagName,
        cls: String(p.className || '').slice(0, 56),
        visibility: cs.visibility, opacity: cs.opacity, display: cs.display,
        zIndex: cs.zIndex, position: cs.position, overflow: cs.overflow,
        w: Math.round(r.width), h: Math.round(r.height),
        rect: { x: Math.round(r.left), y: Math.round(r.top) },
      });
    }
    const iframe = f ? f.getBoundingClientRect() : null;
    let cover = null;
    if (iframe && iframe.width > 0) {
      const el = document.elementFromPoint(iframe.left + iframe.width / 2, iframe.top + iframe.height / 2);
      if (el && f && !f.contains(el) && !el.contains(f)) {
        const cs = getComputedStyle(el);
        cover = { tag: el.tagName, cls: String(el.className || '').slice(0, 56), zIndex: cs.zIndex, opacity: cs.opacity, background: cs.backgroundColor };
      }
    }
    return {
      iframe: iframe ? { x: Math.round(iframe.left), y: Math.round(iframe.top), w: Math.round(iframe.width), h: Math.round(iframe.height) } : null,
      iframeSrc: f ? f.src.slice(0, 90) : null,
      ancestors: chain,
      coveringElement: cover,
      dataPlaying: wrap ? wrap.getAttribute('data-playing') : null,
      dataMuted: wrap ? wrap.getAttribute('data-muted') : null,
      unmuteVisible: !!document.querySelector('[data-testid="trailer-unmute-control"]'),
      videoElements: document.querySelectorAll('video').length,
    };
  })()`);

  const yt = requests.filter((u) => /youtube|ytimg|googlevideo/i.test(u));
  const gv = requests.filter((u) => /googlevideo/i.test(u));

  // THE PIXEL CHECK.
  const ab = pixel.ab;
  const bc = pixel.bc;

  console.log(`URL: ${URL_ARG}${THROTTLE ? '   [4x CPU throttle, slow 4G]' : ''}`);
  console.log('');
  for (const f of files) console.log(`  screenshot ${f.label}: ${f.file}`);
  console.log('');
  console.log('  === 1. PIXEL DIFF (the decisive check) ===');
  console.log(`  frame sizes: ${pixel.sizes.join(', ')}`);
  console.log(`  ${files[0].label} vs ${files[1].label}: ${ab.diff}/${ab.total} pixels differ (${(ab.pct * 100).toFixed(2)}%)`);
  console.log(`  ${files[1].label} vs ${files[2].label}: ${bc.diff}/${bc.total} pixels differ (${(bc.pct * 100).toFixed(2)}%)`);
  const pixelsChange = ab.diff > 0 && bc.diff > 0;
  console.log(`  PIXELS CHANGE: ${pixelsChange}`);
  console.log('');
  console.log('  === 2. NOT A UNIFORM COLOUR ===');
  const notUniform = pixel.distinctColoursFrame1 > 8;
  console.log(`  distinct colours in the ${files[0].label} frame: ${pixel.distinctColoursFrame1}  -> not a flat box: ${notUniform}`);
  console.log('');
  console.log('  === 3. NOTHING COVERING THE IFRAME ===');
  console.log(`  iframe rect: ${JSON.stringify(state.iframe)}`);
  console.log(`  covering element at the iframe's centre: ${state.coveringElement ? JSON.stringify(state.coveringElement) : 'none'}`);
  for (const an of state.ancestors) {
    const ok = an.visibility === 'visible' && an.opacity === '1' && an.display !== 'none' && an.w > 0 && an.h > 0;
    console.log(`    ${ok ? 'OK  ' : 'BAD '} ${an.i} <${an.tag}> ${an.cls}`);
    console.log(`         vis=${an.visibility} op=${an.opacity} disp=${an.display} z=${an.zIndex} pos=${an.position} ${an.w}x${an.h} @${an.rect.x},${an.rect.y}`);
  }
  console.log('');
  console.log('  === 4. SECONDARY SIGNALS (reported, never decisive) ===');
  console.log(`  iframe src          : ${state.iframeSrc}`);
  console.log(`  data-playing        : ${state.dataPlaying}`);
  console.log(`  data-muted          : ${state.dataMuted}`);
  console.log(`  unmute control shown : ${state.unmuteVisible}`);
  console.log(`  video elements      : ${state.videoElements}`);
  console.log(`  youtube/ytimg reqs  : ${yt.length}`);
  console.log(`  googlevideo reqs    : ${gv.length}`);
  console.log('');

  const ancestorsOk = state.ancestors.every(
    (a: any) => a.visibility === 'visible' && a.opacity === '1' && a.display !== 'none' && a.w > 0 && a.h > 0
  );
  const pass = pixelsChange && notUniform && ancestorsOk && !state.coveringElement;
  console.log(pass
    ? 'RESULT: PASS - the hero shows a moving picture, nothing covers it'
    : 'RESULT: FAIL - the hero is NOT showing a moving picture');

  await browser.close();
  if (!pass) process.exit(1);
}

main();
