/**
 * PROVE the /regional CLS is the webfont swap re-flowing the stats bar.
 *
 * The page is loaded TWICE:
 *   1. with the Google Fonts CSS blocked -> the fallback font is used
 *   2. normally -> Inter is used
 *
 * If the stat numbers sit at different x positions, the font swap is what
 * moves them, and that is the layout shift.
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://www.bahrainnights.com/regional';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

const PROBE = `(() => {
  const nums = Array.from(document.querySelectorAll('p.text-3xl.font-black'));
  const bar = nums.length ? nums[0].closest('div.flex.flex-wrap') : null;
  return {
    numbers: nums.map(function (n) {
      const r = n.getBoundingClientRect();
      return { text: n.textContent, x: Math.round(r.left), w: Math.round(r.width), font: getComputedStyle(n).fontFamily.slice(0, 40) };
    }),
    barWidth: bar ? Math.round(bar.getBoundingClientRect().width) : null,
    docHeight: document.documentElement.scrollHeight,
  };
})()`;

async function run(blockFonts: boolean) {
  const browser = await chromium.launch({ headless: true, executablePath: EXEC });
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
  const page = await ctx.newPage();
  if (blockFonts) {
    await page.route('**fonts.googleapis.com**', (route) => route.abort());
    await page.route('**fonts.gstatic.com**', (route) => route.abort());
  }
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1200);
  const early: any = await page.evaluate(PROBE);
  await page.waitForTimeout(20000);
  const late: any = await page.evaluate(PROBE);
  await browser.close();
  return { early, late };
}

async function main() {
  console.log('=== FONTS BLOCKED (fallback font) ===');
  const b = await run(true);
  console.log('  at 1.2s :', JSON.stringify(b.early.numbers));
  console.log('  at 21s :', JSON.stringify(b.late.numbers));

  console.log('');
  console.log('=== FONTS ALLOWED (Inter) ===');
  const n = await run(false);
  console.log('  at 1.2s :', JSON.stringify(n.early.numbers));
  console.log('  at 21s :', JSON.stringify(n.late.numbers));

  console.log('');
  const bx = (r: any) => r.numbers.map((x: any) => `${x.text}@${x.x}/${x.w}`).join('  ');
  console.log('fallback final :', bx(b.late));
  console.log('inter final    :', bx(n.late));
  console.log('SAME POSITIONS? ', bx(b.late) === bx(n.late));
  console.log('');
  console.log('fallback early -> late moved?', bx(b.early) !== bx(b.late));
  console.log('inter early    -> late moved?', bx(n.early) !== bx(n.late));
}

main();
