/**
 * Does the hero trailer STILL PLAY after the iframe was moved out of the
 * viewport until it is ready?
 *
 * The brief's F1: muted playback is success, not failure - the player
 * attempts unmuted, the browser refuses, and it falls back to muted with a
 * visible unmute control. What must NOT happen is a frozen player.
 *
 * Checks, with no human interaction:
 *   - the iframe exists
 *   - the component reports data-playing="true"
 *   - googlevideo requests mean the video is actually streaming
 *   - the iframe ends up back in the viewport (top: 0), not stuck at -100vh
 *
 * Run: npx tsx scripts/audit/hero_play_check.ts [url]
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://www.bahrainnights.com/regional';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: EXEC });
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 823 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1.75,
  });
  const page = await ctx.newPage();

  const urls: string[] = [];
  page.on('request', (r) => urls.push(r.url()));

  await page.addInitScript(`
    window.__tl = [];
    var iv = setInterval(function () {
      var w = document.querySelector('[data-testid="trailer-player"]');
      var h = document.querySelector('[data-testid="trailer-player-host"]');
      var r = h ? h.getBoundingClientRect() : null;
      window.__tl.push({
        t: Math.round(performance.now()),
        playing: w ? w.getAttribute('data-playing') : null,
        activated: w ? w.getAttribute('data-activated') : null,
        hostTop: r ? Math.round(r.top) : null,
      });
      if (performance.now() > 16000) clearInterval(iv);
    }, 100);
  `);

  const logs: string[] = [];
  page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(17000);

  console.log('=== CONSOLE ===');
  for (const l of logs) console.log('  ' + l.slice(0, 220));
  console.log('');

  const tl: any = await page.evaluate('window.__tl || []');
  console.log('=== STATE TIMELINE (hostTop 0 = iframe in the viewport) ===');
  let prev = '';
  for (const t of tl) {
    const k = `playing=${t.playing} activated=${t.activated} hostTop=${t.hostTop}`;
    if (k !== prev) { console.log(`  t=${String(t.t).padStart(6)}ms  ${k}`); prev = k; }
  }
  console.log('');

  const state: any = await page.evaluate(`(() => {
    const wrap = document.querySelector('[data-testid="trailer-player"]');
    const host = document.querySelector('[data-testid="trailer-player-host"]');
    const iframe = document.querySelector('iframe');
    const hr = host ? host.getBoundingClientRect() : null;
    const ir = iframe ? iframe.getBoundingClientRect() : null;
    const unmute = document.querySelector('[data-testid="trailer-unmute-control"]');
    const toggle = document.querySelector('[data-testid="trailer-mute-toggle"]');
    return {
      dataAttrs: wrap ? {
        playing: wrap.getAttribute('data-playing'),
        muted: wrap.getAttribute('data-muted'),
        activated: wrap.getAttribute('data-activated'),
      } : null,
      hostTop: hr ? Math.round(hr.top) : null,
      hostHeight: hr ? Math.round(hr.height) : null,
      iframe: ir ? { x: Math.round(ir.left), y: Math.round(ir.top), w: Math.round(ir.width), h: Math.round(ir.height) } : null,
      iframeSrc: iframe ? iframe.src : null,
      unmuteVisible: unmute ? getComputedStyle(unmute).display !== 'none' : false,
      muteToggleText: toggle ? toggle.textContent.trim() : null,
      videoElements: document.querySelectorAll('video').length,
    };
  })()`);

  const yt = urls.filter((u) => /youtube|ytimg|googlevideo/i.test(u));
  const gv = urls.filter((u) => /googlevideo/i.test(u));

  console.log(`URL: ${URL}`);
  console.log('');
  console.log('  iframe exists          :', !!state.iframe);
  console.log('  iframe src             :', state.iframeSrc);
  console.log('  iframe rect            :', JSON.stringify(state.iframe));
  console.log('  host top (0 = in view) :', state.hostTop, ' height:', state.hostHeight);
  console.log('  data-playing           :', state.dataAttrs?.playing);
  console.log('  data-muted             :', state.dataAttrs?.muted);
  console.log('  data-activated         :', state.dataAttrs?.activated);
  console.log('  unmute control visible :', state.unmuteVisible);
  console.log('  mute toggle text       :', state.muteToggleText);
  console.log('  video elements         :', state.videoElements);
  console.log('');
  console.log('  youtube/ytimg requests :', yt.length);
  console.log('  googlevideo requests   :', gv.length, '  <- non-zero means the video is STREAMING');
  console.log('');

  const ok =
    !!state.iframe &&
    state.dataAttrs?.playing === 'true' &&
    gv.length > 0 &&
    state.hostTop === 0;
  console.log(ok ? 'RESULT: PASS - the trailer plays and the iframe is back in the viewport' : 'RESULT: FAIL');
  await browser.close();
  if (!ok) process.exit(1);
}

main();
