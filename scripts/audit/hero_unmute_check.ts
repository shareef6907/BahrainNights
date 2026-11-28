/**
 * Does the FIRST INTERACTION unmute the hero?
 *
 * This is the behaviour that actually delivers sound to a visitor: no
 * browser permits unmuted autoplay on a cold load, so the player starts
 * muted and the first pointerdown / touchstart / click / keydown / scroll
 * unmutes it.
 *
 * It is checked in two ways:
 *   1. COLD LOAD - the player starts MUTED (universally permitted).
 *   2. AFTER AN INTERACTION - the player is UNMUTED.
 *
 * The browser's own autoplay policy is emulated: Playwright's default
 * Chromium context allows unmuted autoplay, so the muted start is forced
 * by launching with --autoplay-policy=user-gesture-required, which is the
 * policy every real browser enforces on a cold load.
 *
 * Run: npx tsx scripts/audit/hero_unmute_check.ts [url]
 */
import { chromium } from 'playwright';

const URL_ARG = process.argv[2] || 'https://www.bahrainnights.com/regional';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: EXEC,
    // The policy every browser enforces on a cold load: unmuted autoplay
    // requires a user gesture.
    args: ['--autoplay-policy=user-gesture-required'],
  });
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 823 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  await page.goto(URL_ARG, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(6000);

  const read = (): Promise<any> =>
    page.evaluate(`(() => {
      const w = document.querySelector('[data-testid="trailer-player"]');
      return {
        playing: w ? w.getAttribute('data-playing') : null,
        muted: w ? w.getAttribute('data-muted') : null,
        unmuteControlVisible: !!document.querySelector('[data-testid="trailer-unmute-control"]'),
      };
    })()`);

  const before = await read();
  console.log(`URL: ${URL_ARG}`);
  console.log('  [autoplay-policy=user-gesture-required]');
  console.log('');
  console.log('  === 1. COLD LOAD ===');
  console.log(`  data-playing : ${before.playing}`);
  console.log(`  data-muted   : ${before.muted}   <- must be "true" (muted autoplay is universally permitted)`);
  console.log(`  unmute control visible: ${before.unmuteControlVisible}  <- the visitor needs a way to turn sound on`);
  console.log('');

  // THE FIRST INTERACTION. A scroll on the document, which is one of the
  // five events the player listens for.
  console.log('  === 2. AFTER THE FIRST INTERACTION (scroll) ===');
  await page.mouse.wheel(0, 200);
  await page.waitForTimeout(2500);
  const after = await read();
  console.log(`  data-playing : ${after.playing}`);
  console.log(`  data-muted   : ${after.muted}   <- must be "false" (unmuted after the gesture)`);
  console.log(`  unmute control visible: ${after.unmuteControlVisible}`);
  console.log('');

  const coldStartMuted = before.muted === 'true';
  const unmutedAfterGesture = after.muted === 'false';
  const ok = coldStartMuted && unmutedAfterGesture;

  console.log(`  cold load is muted            : ${coldStartMuted}`);
  console.log(`  unmuted after first interaction: ${unmutedAfterGesture}`);
  console.log('');
  console.log(ok
    ? 'RESULT: PASS - muted on load, unmuted on the first interaction'
    : 'RESULT: FAIL');

  await browser.close();
  if (!ok) process.exit(1);
}

main();
