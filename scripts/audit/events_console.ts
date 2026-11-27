/**
 * Capture the live /events console output verbatim.
 *
 * This is the P1(b) proof: the page must produce ZERO hydration warnings.
 * React logs a hydration mismatch with console.error, so every console
 * message is captured and printed.
 *
 * Run: npx tsx scripts/audit/events_console.ts [url]
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://www.bahrainnights.com/events';

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

  const console_: string[] = [];
  const pageErrors: string[] = [];
  page.on('console', (m) => console_.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', (e) => pageErrors.push(`[pageerror] ${e.message}`));

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  // Long enough for hydration and for the images to land.
  await page.waitForTimeout(12000);

  const hydration = console_.filter((l) =>
    /hydrat|did not match|Text content does not match|server HTML|server rendered/i.test(l)
  );
  const errors = console_.filter((l) => l.startsWith('[error]'));

  console.log(`URL: ${URL}`);
  console.log('');
  console.log(`ALL console messages (${console_.length}):`);
  if (console_.length === 0) {
    console.log('   (none)');
  } else {
    for (const l of console_) console.log('   ' + l.slice(0, 400));
  }
  console.log('');
  console.log(`page errors (${pageErrors.length}):`);
  if (pageErrors.length === 0) console.log('   (none)');
  else for (const l of pageErrors) console.log('   ' + l.slice(0, 400));
  console.log('');
  console.log(`HYDRATION WARNINGS (${hydration.length}):`);
  if (hydration.length === 0) console.log('   (none)');
  else for (const l of hydration) console.log('   ' + l.slice(0, 400));
  console.log('');
  console.log(`console errors (${errors.length}):`);
  if (errors.length === 0) console.log('   (none)');
  else for (const l of errors) console.log('   ' + l.slice(0, 400));

  await browser.close();

  if (hydration.length > 0 || pageErrors.length > 0) process.exit(1);
}

main();
