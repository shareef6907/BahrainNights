/**
 * Proof that a dual-cinema film renders ONE Book button per cinema, and that
 * each button points at a per-film URL that resolves.
 *
 * Run with:
 *   node --import tsx scripts/verify-booking-links.mjs
 *
 * Requires a dev server on --site and a mock PostgREST serving the fixture
 * (see scripts/mock-postgrest.mjs).
 */

import { chromium } from 'playwright';

const argv = process.argv.slice(2);
function flag(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
}

const SITE = flag('site', 'http://localhost:3112');
const OUT = flag('out', '/tmp/booking-proof');

let failed = 0;
function check(name, pass, detail = '') {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}`);
  if (detail) console.log(`      ${detail}`);
}

console.log('='.repeat(72));
console.log('Per-film booking links — end-to-end proof');
console.log(`site: ${SITE}`);
console.log('='.repeat(72));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(`${SITE}/cinema`, { waitUntil: 'networkidle' });

// Open the film modal by clicking the card.
const card = page.locator('[data-testid="movie-card"]').first();
await card.click();
await page.waitForSelector('[data-testid="movie-modal"]', { timeout: 15000 });

// The Book buttons.
const buttons = page.locator('[data-testid="cinema-option"]');
const count = await buttons.count();
check(
  'the dual-cinema film renders 2 Book buttons (one per cinema)',
  count === 2,
  `found ${count}`
);

const hrefs = [];
for (let i = 0; i < count; i++) {
  const href = await buttons.nth(i).getAttribute('href');
  const text = (await buttons.nth(i).innerText()).replace(/\s+/g, ' ').trim();
  hrefs.push({ href, text });
  console.log(`      button ${i + 1}: ${text} -> ${href}`);
}

// Every button must point at the FILM's own page, not the cinema's homepage
// and not a search URL.
for (const { href, text } of hrefs) {
  check(
    `"${text}" links to a per-film URL (not the cinema homepage)`,
    !!href && href !== 'https://bhr.voxcinemas.com/' && href !== 'https://bahrain.cineco.net/',
    String(href)
  );
  check(
    `"${text}" is an absolute https URL`,
    !!href && /^https:\/\//.test(href),
    String(href)
  );
}

// The old broken URL must not appear anywhere on the page.
const html = await page.content();
check(
  'the old broken VOX search URL is NOT on the page',
  !html.includes('bhr.voxcinemas.com/movies?search='),
  'https://bhr.voxcinemas.com/movies?search=...'
);
check(
  'the page does not link to youtube.com from the hero',
  !/href="https:\/\/(www\.)?youtube\.com/.test(html),
  'youtube.com href'
);

await page.screenshot({ path: `${OUT}-1440.png`, fullPage: false });
console.log(`\nscreenshot: ${OUT}-1440.png`);

// Mobile viewport too.
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}-390.png`, fullPage: false });
console.log(`screenshot: ${OUT}-390.png`);

await browser.close();

console.log('');
console.log(`${failed === 0 ? 'ALL CHECKS PASSED' : `${failed} CHECK(S) FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
