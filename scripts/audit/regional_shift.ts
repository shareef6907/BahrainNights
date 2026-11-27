/**
 * What exactly shifts on /regional?
 *
 * Lighthouse says a `div[style="scroll-snap-align:start"]` item in the
 * BlogRow rail moves. This measures the rail's scrollLeft, the item's
 * position, and the page's height, sampled over time.
 *
 * Run: npx tsx scripts/audit/regional_shift.ts [url]
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://www.bahrainnights.com/regional';

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

  // Capture layout-shift entries directly, with their sources.
  await page.addInitScript(`
    window.__shifts = [];
    new PerformanceObserver(function (list) {
      for (const e of list.getEntries()) {
        if (e.hadRecentInput) continue;
        window.__shifts.push({
          value: e.value,
          startTime: e.startTime,
          sources: (e.sources || []).map(function (s) {
            const n = s.node;
            if (!n) return null;
            const r = n.getBoundingClientRect();
            return {
              tag: n.tagName,
              cls: String(n.className || '').slice(0, 60),
              inline: String(n.getAttribute('style') || '').slice(0, 80),
              left: Math.round(r.left),
              top: Math.round(r.top),
              w: Math.round(r.width),
              h: Math.round(r.height),
              prevLeft: s.previousRect ? Math.round(s.previousRect.left) : null,
              prevTop: s.previousRect ? Math.round(s.previousRect.top) : null,
              prevW: s.previousRect ? Math.round(s.previousRect.width) : null,
              prevH: s.previousRect ? Math.round(s.previousRect.height) : null,
            };
          }),
        });
      }
    }).observe({ type: 'layout-shift', buffered: true });
  `);

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(14000);

  const shifts: any = await page.evaluate('window.__shifts || []');
  console.log(`URL: ${URL}`);
  console.log(`layout shifts captured: ${shifts.length}`);
  console.log('');
  for (const s of shifts) {
    console.log(`  value=${s.value.toFixed(4)} at ${Math.round(s.startTime)}ms`);
    for (const src of s.sources) {
      if (!src) continue;
      console.log(`     moved: ${src.tag} "${src.cls}" style="${src.inline}"`);
      console.log(`       left ${src.prevLeft} -> ${src.left}   top ${src.prevTop} -> ${src.top}   ${src.prevW}x${src.prevH} -> ${src.w}x${src.h}`);
    }
    console.log('');
  }

  // The rails' scroll positions.
  const rails: any = await page.evaluate(`(() => {
    const out = [];
    document.querySelectorAll('div').forEach(function (d) {
      const st = d.style && d.style.scrollSnapType;
      if (st) {
        const first = d.querySelector('div');
        out.push({
          snapType: st,
          scrollLeft: d.scrollLeft,
          scrollWidth: d.scrollWidth,
          clientWidth: d.clientWidth,
          firstLeft: first ? Math.round(first.getBoundingClientRect().left) : null,
          items: d.children.length,
        });
      }
    });
    return out.slice(0, 4);
  })()`);
  console.log('rails:');
  for (const r of rails) console.log('   ', JSON.stringify(r));

  await browser.close();
}

main();
