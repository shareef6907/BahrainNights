import { chromium } from 'playwright';
const EXEC = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
async function main() {
  for (const url of ['https://www.bahrainnights.com/regional', 'https://www.bahrainnights.com/cinema']) {
    const browser = await chromium.launch({ headless: true, executablePath: EXEC });
    const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.75 });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(12000);
    const info: any = await page.evaluate("(() => { const f = document.querySelector('iframe'); const r = f ? f.getBoundingClientRect() : null; const p = f ? f.parentElement : null; const pr = p ? p.getBoundingClientRect() : null; return { iframe: r ? { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) } : null, parent: pr ? { x: Math.round(pr.left), y: Math.round(pr.top), w: Math.round(pr.width), h: Math.round(pr.height) } : null, src: f ? f.src.slice(0, 90) : null }; })()");
    console.log(url);
    console.log('   iframe:', JSON.stringify(info.iframe));
    console.log('   parent:', JSON.stringify(info.parent));
    console.log('   src   :', info.src);
    await browser.close();
  }
}
main();
