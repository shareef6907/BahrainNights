/**
 * Measure the /events page layout: the height of each section, the number of
 * cards in each, and whether anything moves after hydration.
 *
 * Run: npx tsx scripts/audit/events_layout.ts [url]
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
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

  const probe = async (label: string) => {
    const s: any = await page.evaluate(`(() => {
      const sections = Array.from(document.querySelectorAll('div.py-16, section, main > div'));
      const big = sections
        .map(function (e) {
          const r = e.getBoundingClientRect();
          return { cls: (e.className || '').toString().slice(0, 60), h: Math.round(r.height), top: Math.round(r.top + window.scrollY) };
        })
        .filter(function (x) { return x.h > 3000; })
        .sort(function (a, b) { return b.h - a.h; })
        .slice(0, 6);
      const grids = Array.from(document.querySelectorAll('div.grid')).map(function (g) {
        return { cards: g.querySelectorAll('a').length, h: Math.round(g.getBoundingClientRect().height) };
      }).filter(function (g) { return g.cards > 3; }).sort(function (a, b) { return b.cards - a.cards; }).slice(0, 6);
      return {
        docHeight: document.documentElement.scrollHeight,
        bodyHeight: document.body.scrollHeight,
        bigSections: big,
        biggestGrids: grids,
        totalLinks: document.querySelectorAll('a[href^="/events/"]').length,
        imgs: document.querySelectorAll('img').length,
      };
    })()`);
    console.log(`--- ${label} ---`);
    console.log('  docHeight    :', s.docHeight);
    console.log('  totalLinks   :', s.totalLinks);
    console.log('  images       :', s.imgs);
    console.log('  big sections :');
    for (const b of s.bigSections) console.log(`     h=${b.h}  ${b.cls}`);
    console.log('  biggest grids:');
    const gs = (s as any).biggestGrids || (s as any).grids || [];
    for (const g of gs) console.log(`     cards=${g.cards} h=${g.h}`);
    if (!gs.length) console.log('     (key not returned; raw keys: ' + Object.keys(s).join(',') + ')');
    console.log('');
    return s;
  };

  await page.waitForTimeout(1500);
  const a = await probe('after domcontentloaded + 1.5s');
  await page.waitForTimeout(10000);
  const b = await probe('after +10s (images loaded)');

  console.log('docHeight changed by:', b.docHeight - a.docHeight, 'px');
  if (b.docHeight !== a.docHeight) {
    console.log('=> THE PAGE STILL GROWS AFTER LOAD. That is the glitch.');
  } else {
    console.log('=> doc height stable after load.');
  }

  await browser.close();
}

main();
