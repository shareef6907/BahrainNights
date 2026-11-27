/**
 * The stat bar's geometry at its FIRST layout, before any webfont can have
 * loaded, compared with its final geometry.
 *
 * The numbers are in the SSR HTML, so the first paint already has the right
 * VALUES - but the WIDTH of each number depends on the font, and the
 * fallback font is not the same width as Inter.
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://www.bahrainnights.com/regional';
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: EXEC });
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
  const page = await ctx.newPage();

  await page.addInitScript(`
    window.__samples = [];
    function sample(tag) {
      var nums = Array.from(document.querySelectorAll('p.text-3xl.font-black'));
      if (!nums.length) return;
      var rows = {};
      nums.forEach(function (n) {
        var r = n.getBoundingClientRect();
        rows[n.textContent] = Math.round(r.left) + '/' + Math.round(r.width) + '@y' + Math.round(r.top);
      });
      var bar = nums.length ? nums[0].parentElement.parentElement : null;
      var barCs = bar ? getComputedStyle(bar) : null;
      var barR = bar ? bar.getBoundingClientRect() : null;
      var styles = Array.from(document.styleSheets).length;
      window.__samples.push({
        tag: tag, t: Math.round(performance.now()), rows: rows,
        docH: document.documentElement.scrollHeight,
        barDisplay: barCs ? barCs.display : null,
        barFlexWrap: barCs ? barCs.flexWrap : null,
        barJustify: barCs ? barCs.justifyContent : null,
        barGap: barCs ? barCs.gap : null,
        barW: barR ? Math.round(barR.width) : null,
        barH: barR ? Math.round(barR.height) : null,
        styleSheets: styles,
        fontsReady: document.fonts ? document.fonts.status : null,
      });
    }
    document.addEventListener('DOMContentLoaded', function () { sample('DOMContentLoaded'); });
    window.addEventListener('load', function () { sample('load'); });
    var iv = setInterval(function () { sample('tick'); if (performance.now() > 15000) clearInterval(iv); }, 60);
  `);

  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(18000);

  const samples: any = await page.evaluate('window.__samples || []');
  console.log(`URL: ${URL}`);
  console.log(`samples: ${samples.length}`);
  console.log('');
  let prev = '';
  for (const s of samples) {
    const k = JSON.stringify(s.rows);
    if (k !== prev) {
      console.log(`t=${String(s.t).padStart(6)}ms docH=${String(s.docH).padStart(6)} ${k}`);
      console.log(`         bar: display=${s.barDisplay} wrap=${s.barFlexWrap} justify=${s.barJustify} gap=${s.barGap} w=${s.barW} h=${s.barH} sheets=${s.styleSheets} fonts=${s.fontsReady}`);
      prev = k;
    }
  }
  await browser.close();
}

main();
