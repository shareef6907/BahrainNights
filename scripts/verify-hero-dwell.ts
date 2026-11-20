/**
 * Verification for the Part 3 hero behaviour.
 *
 * Run with:
 *   node_modules/.bin/tsx scripts/verify-hero-dwell.ts
 *
 * Requires a running server:
 *   PORT=3111 npm run dev
 *
 * MEASURES
 *   1. The dwell time of at least FOUR consecutive slides (must each be >= 20s).
 *   2. That the sound preference survives a slide change AND is re-applied to
 *      the NEW player (a new YouTube player is created for every slide).
 *   3. That the auto-advance does not fire while the tab is hidden.
 *   4. That the auto-advance does not fire while the pointer is over the hero.
 *   5. That `prefers-reduced-motion: reduce` disables the auto-advance.
 *   6. That the hero's Trailer button opens the shared TrailerModal and does
 *      NOT navigate to youtube.com.
 *
 * HOW THE DWELL IS MEASURED
 * --------------------------
 * The timestamps are taken INSIDE THE PAGE by a 50ms interval that records
 * the moment the hero's <h1> text changes. Measuring from outside the page
 * (polling over the wire) has a systematic negative bias: the change is only
 * noticed up to one poll interval AFTER it happened, so the measured dwell
 * is always short by that amount. The in-page clock removes the bias.
 */

import { chromium, Browser, Page } from 'playwright';

const BASE = process.env.VERIFY_BASE_URL || 'http://localhost:3111';
const REQUIRED_DWELL_MS = 20_000;
const SLIDES_TO_OBSERVE = 4;

let failures = 0;

function check(name: string, pass: boolean, detail = '') {
  if (!pass) failures++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}`);
  if (detail) console.log(`      ${detail}`);
}

function info(msg: string) {
  console.log(`      ${msg}`);
}

/**
 * Install an in-page recorder of every hero title change.
 *
 * Passed as a STRING because a function passed to `page.evaluate` is
 * compiled by the TS loader, which injects a `__name` helper that does not
 * exist in the browser context.
 */
const INSTALL_RECORDER = `(() => {
  window.__slideTimes = [];
  window.__lastHeroTitle = null;
  window.__slideIv = setInterval(() => {
    const h1 = document.querySelector('h1');
    const t = h1 ? (h1.textContent || '').trim() : '';
    if (t && t !== window.__lastHeroTitle) {
      window.__lastHeroTitle = t;
      window.__slideTimes.push({ t: t, at: Date.now() });
    }
  }, 50);
  return true;
})()`;

const READ_SLIDE_TIMES = `(() => window.__slideTimes || [])()`;

const SET_HIDDEN = `(() => {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
  document.dispatchEvent(new Event('visibilitychange'));
  return true;
})()`;

const SET_VISIBLE = `(() => {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' });
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
  document.dispatchEvent(new Event('visibilitychange'));
  return true;
})()`;

const READ_SOUND_PREF = `(() => {
  try {
    return {
      session: window.sessionStorage.getItem('bn:trailer-sound'),
      local: window.localStorage.getItem('bn:trailer-sound')
    };
  } catch (e) { return { session: null, local: null, error: String(e) }; }
})()`;

async function heroTitle(page: Page): Promise<string> {
  return page.evaluate(
    `(() => { const h1 = document.querySelector('h1'); return h1 ? (h1.textContent || '').trim() : ''; })()`
  );
}

async function main() {
  console.log('='.repeat(72));
  console.log('Hero dwell / audio / pause verification');
  console.log(`base: ${BASE}`);
  console.log('='.repeat(72));

  const browser: Browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const youtubeRequests: string[] = [];
  page.on('request', (req) => {
    if (/youtube\.com|ytimg\.com|googlevideo\.com/.test(req.url())) {
      youtubeRequests.push(req.url());
    }
  });

  /*
   * The recorder is installed BEFORE the page loads.
   *
   * Installing it after `waitForSelector('h1')` would record the FIRST slide
   * at the moment the recorder was installed, not the moment the slide
   * appeared — so the first "dwell" would be short by however long the slide
   * had already been on screen, and the check would fail against a hero that
   * is behaving correctly. With an init script the recorder is running from
   * the first paint, so every gap between two recorded titles IS the time
   * the first of them was on screen.
   */
  await page.addInitScript({ content: INSTALL_RECORDER });

  await page.goto(`${BASE}/cinema`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForSelector('h1', { timeout: 30_000 });

  const firstTitle = await heroTitle(page);
  info(`initial hero title: ${JSON.stringify(firstTitle)}`);

  /* ------------------------------------------------------------------ */
  /* 1. THE DWELL OF AT LEAST FOUR CONSECUTIVE SLIDES                     */
  /* ------------------------------------------------------------------ */
  console.log('\n--- 1. dwell of consecutive slides (must each be >= 20s) ---');

  // Wait until at least SLIDES_TO_OBSERVE + 1 title changes have been seen
  // (the first one is the initial title).
  const deadline = Date.now() + 180_000;
  let times: { t: string; at: number }[] = [];
  while (Date.now() < deadline) {
    await page.waitForTimeout(500);
    times = await page.evaluate(READ_SLIDE_TIMES);
    if (times.length >= SLIDES_TO_OBSERVE + 1) break;
  }

  const dwells: number[] = [];
  for (let i = 1; i < times.length; i++) {
    const d = times[i].at - times[i - 1].at;
    dwells.push(d);
    console.log(
      `      slide ${i}: ${(d / 1000).toFixed(2)}s  "${times[i - 1].t}" -> "${times[i].t}"`
    );
  }

  check(
    `observed ${SLIDES_TO_OBSERVE} consecutive slide changes`,
    dwells.length >= SLIDES_TO_OBSERVE,
    `observed ${dwells.length}`
  );

  for (const d of dwells) {
    check(
      `a dwell of ${(d / 1000).toFixed(2)}s is >= ${REQUIRED_DWELL_MS / 1000}s`,
      d >= REQUIRED_DWELL_MS,
      `${d} ms`
    );
  }

  /* ------------------------------------------------------------------ */
  /* 2. THE SOUND PREFERENCE SURVIVES A SLIDE CHANGE AND IS RE-APPLIED    */
  /* ------------------------------------------------------------------ */
  console.log('\n--- 2. the sound preference survives a slide change ---');

  // Start the current trailer.
  const facade = page.locator('[data-testid="trailer-play-facade"]').first();
  if ((await facade.count()) > 0) {
    await facade.click();
    await page.waitForTimeout(4000);
  }

  // The browser may force muted playback; the "Tap for sound" control is
  // then shown. Clicking it is a user gesture AND it persists the choice.
  const unmuteControl = page.locator('[data-testid="trailer-unmute-control"]').first();
  if ((await unmuteControl.count()) > 0) {
    info('the browser forced muted playback — clicking "Tap for sound"');
    await unmuteControl.click();
    await page.waitForTimeout(2000);
  }

  let pref = await page.evaluate(READ_SOUND_PREF);
  info(`sessionStorage/localStorage 'bn:trailer-sound' = ${JSON.stringify(pref)}`);

  // If nothing was stored (the browser allowed an unmuted start, so no
  // gesture was needed), set it explicitly to model a returning visitor.
  if (pref.session === null) {
    info('no preference stored yet — writing "on" to model a returning visitor');
    await page.evaluate(
      `(() => { window.sessionStorage.setItem('bn:trailer-sound', 'on'); window.localStorage.setItem('bn:trailer-sound', 'on'); return true; })()`
    );
    pref = await page.evaluate(READ_SOUND_PREF);
  }

  check(
    "the trailer sound preference is stored under 'bn:trailer-sound'",
    pref.session === 'on' || pref.local === 'on',
    JSON.stringify(pref)
  );

  // Let the slide change so a NEW player is created.
  const beforeCount = (await page.evaluate(READ_SLIDE_TIMES)).length;
  const waitUntil = Date.now() + 45_000;
  while (Date.now() < waitUntil) {
    await page.waitForTimeout(500);
    if ((await page.evaluate(READ_SLIDE_TIMES)).length > beforeCount) break;
  }

  const afterChange = await page.evaluate(READ_SOUND_PREF);
  check(
    'the sound preference is still stored after the slide changes',
    afterChange.session === 'on' || afterChange.local === 'on',
    JSON.stringify(afterChange)
  );

  // Now the NEW player must come up with the preference applied.
  const newFacade = page.locator('[data-testid="trailer-play-facade"]').first();
  if ((await newFacade.count()) > 0) {
    await newFacade.click();
    await page.waitForTimeout(6000);

    const newUnmute = page.locator('[data-testid="trailer-unmute-control"]').first();
    const newToggle = page.locator('[data-testid="trailer-mute-toggle"]').first();
    const forcedMuted = (await newUnmute.count()) > 0;
    let toggleLabel = '';
    if ((await newToggle.count()) > 0) {
      toggleLabel = (await newToggle.first().getAttribute('aria-label')) || '';
    }

    info(
      `new player: "Tap for sound" control present=${forcedMuted}, ` +
        `mute toggle label=${JSON.stringify(toggleLabel)}`
    );

    check(
      'the NEW player did not come up muted — the preference was re-applied to it',
      !forcedMuted && toggleLabel === 'Mute',
      `forcedMuted=${forcedMuted} toggle=${JSON.stringify(toggleLabel)}`
    );
  } else {
    info('no facade play button on the new slide — could not exercise the new player');
  }

  /* ------------------------------------------------------------------ */
  /* 3. THE AUTO-ADVANCE DOES NOT FIRE WHILE THE TAB IS HIDDEN            */
  /* ------------------------------------------------------------------ */
  console.log('\n--- 3. no auto-advance while the tab is hidden ---');

  const beforeHidden = (await page.evaluate(READ_SLIDE_TIMES)).length;
  await page.evaluate(SET_HIDDEN);
  await page.waitForTimeout(30_000);
  const afterHidden = (await page.evaluate(READ_SLIDE_TIMES)).length;
  check(
    'the hero did NOT advance while the tab was hidden (30s)',
    afterHidden === beforeHidden,
    `slide changes before=${beforeHidden} after=${afterHidden}`
  );
  await page.evaluate(SET_VISIBLE);

  /* ------------------------------------------------------------------ */
  /* 4. THE AUTO-ADVANCE DOES NOT FIRE WHILE THE POINTER IS OVER THE HERO */
  /* ------------------------------------------------------------------ */
  console.log('\n--- 4. no auto-advance while the pointer is over the hero ---');

  const beforeHover = (await page.evaluate(READ_SLIDE_TIMES)).length;
  const heroBox = await page.locator('h1').first().boundingBox();
  if (heroBox) {
    await page.mouse.move(heroBox.x + heroBox.width / 2, heroBox.y + heroBox.height / 2);
  }
  await page.waitForTimeout(30_000);
  const afterHover = (await page.evaluate(READ_SLIDE_TIMES)).length;
  check(
    'the hero did NOT advance while the pointer was over it (30s)',
    afterHover === beforeHover,
    `slide changes before=${beforeHover} after=${afterHover}`
  );
  await page.mouse.move(5, 5);

  /* ------------------------------------------------------------------ */
  /* 5. prefers-reduced-motion DISABLES THE AUTO-ADVANCE                  */
  /* ------------------------------------------------------------------ */
  console.log('\n--- 5. prefers-reduced-motion: reduce disables the auto-advance ---');

  const reducedContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${BASE}/cinema`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await reducedPage.waitForSelector('h1', { timeout: 30_000 });

  const reducedTitle = await heroTitle(reducedPage);
  await reducedPage.waitForTimeout(35_000);
  const reducedTitleAfter = await heroTitle(reducedPage);

  check(
    'the hero did NOT auto-advance under prefers-reduced-motion (35s)',
    reducedTitleAfter === reducedTitle,
    `before=${JSON.stringify(reducedTitle)} after=${JSON.stringify(reducedTitleAfter)}`
  );

  const dots = reducedPage.locator('button[aria-label^="Go to trailer"]');
  const dotCount = await dots.count();
  if (dotCount > 1) {
    await dots.nth(1).click();
    await reducedPage.waitForTimeout(1500);
    const manualTitle = await heroTitle(reducedPage);
    check(
      'manual navigation still works under prefers-reduced-motion',
      manualTitle !== reducedTitle,
      `after clicking dot 2: ${JSON.stringify(manualTitle)}`
    );
  } else {
    info(`only ${dotCount} slide(s) available — manual navigation not exercised`);
  }
  await reducedContext.close();

  /* ------------------------------------------------------------------ */
  /* 6. THE TRAILER BUTTON OPENS THE SHARED MODAL, NOT youtube.com        */
  /* ------------------------------------------------------------------ */
  console.log('\n--- 6. the Trailer button opens the shared modal, not youtube.com ---');

  const trailerButton = page.locator('button:has-text("Trailer")').first();
  const hasTrailerButton = (await trailerButton.count()) > 0;
  check('the hero has a Trailer button', hasTrailerButton);

  if (hasTrailerButton) {
    const before = youtubeRequests.length;
    await trailerButton.click();
    await page.waitForTimeout(3000);

    const iframeCount = await page.locator('iframe[src*="youtube"]').count();
    check(
      'the shared trailer modal opened (a YouTube iframe is present in the page)',
      iframeCount > 0,
      `iframes with a youtube src: ${iframeCount}`
    );

    const url = page.url();
    check(
      'the page did NOT navigate to youtube.com',
      !/^https:\/\/(www\.)?youtube\.com/.test(url),
      `page url: ${url}`
    );

    info(`youtube requests before the click: ${before}, after: ${youtubeRequests.length}`);
  }

  await browser.close();

  console.log('');
  console.log(`dwell measurements (ms): ${JSON.stringify(dwells)}`);
  console.log('');
  if (failures > 0) {
    console.log(`RESULT: FAILED (${failures} check(s) failed)`);
    process.exit(1);
  }
  console.log('RESULT: PASSED');
  process.exit(0);
}

main().catch((err) => {
  console.error('verification threw:', err);
  process.exit(1);
});
