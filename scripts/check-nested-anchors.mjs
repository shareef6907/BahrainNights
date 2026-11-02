/**
 * Regression check: no anchor may be nested inside another anchor.
 *
 * An <a> inside an <a> is invalid HTML. The browser's parser restructures it,
 * so the outer link breaks and the inner link can become unreachable. It is
 * invisible in the server-rendered HTML for `ssr: false` components, so it
 * has to be checked in the HYDRATED DOM in a real browser.
 *
 * Run:  node scripts/check-nested-anchors.mjs http://localhost:3111
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:3111';

const PAGES = [
  '/',
  '/events',
  '/events/category/nightlife',
  '/events/category/concerts',
  '/international',
  '/international/uae',
  '/international/saudi-arabia',
  '/attractions',
];

const browser = await chromium.launch();
let failures = 0;

for (const path of PAGES) {
  const page = await browser.newPage();
  let result;
  try {
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 });
    // Let client-only sections mount and any animation settle.
    await page.waitForTimeout(2500);

    result = await page.evaluate(() => {
      const nested = [];
      for (const outer of document.querySelectorAll('a')) {
        for (const inner of outer.querySelectorAll('a')) {
          nested.push({
            outerHref: outer.getAttribute('href'),
            outerText: (outer.textContent || '').trim().slice(0, 40),
            innerHref: inner.getAttribute('href'),
            innerText: (inner.textContent || '').trim().slice(0, 40),
          });
        }
      }
      return {
        nested,
        anchors: document.querySelectorAll('a').length,
        eventLinks: new Set(
          Array.from(document.querySelectorAll('a[href^="/events/"]')).map((a) =>
            a.getAttribute('href'),
          ),
        ).size,
      };
    });
  } catch (e) {
    console.log(`FAIL  ${path}  ${e.message.split('\n')[0]}`);
    failures++;
    await page.close();
    continue;
  }

  if (result.nested.length) {
    failures++;
    console.log(`FAIL  ${path}  ${result.nested.length} nested anchor(s)`);
    for (const n of result.nested.slice(0, 5)) {
      console.log(
        `        outer <a href="${n.outerHref}"> "${n.outerText}"\n` +
          `        inner <a href="${n.innerHref}"> "${n.innerText}"`,
      );
    }
  } else {
    console.log(
      `ok    ${path.padEnd(34)} anchors=${String(result.anchors).padStart(4)}  ` +
        `distinct /events/ links=${result.eventLinks}`,
    );
  }
  await page.close();
}

await browser.close();

if (failures) {
  console.log(`\n${failures} page(s) with nested anchors.`);
  process.exit(1);
}
console.log('\nOK: no nested anchors on any page.');
