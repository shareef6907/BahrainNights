/**
 * How many indexable pages are reachable ONLY from the sitemap?
 *
 * The site had a thin-indexing problem: event/venue/attraction pages existed,
 * were indexable and were in the sitemap, but no hub page linked to them.
 * Google found them through the sitemap alone, which is the weakest possible
 * signal.
 *
 * PR #38 (2026-11-02) made the cards real anchors. This script measures what
 * is STILL orphaned, so the next fix targets the remaining gap rather than
 * guessing.
 *
 * Run:  node scripts/audit-orphan-pages.mjs https://www.bahrainnights.com
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'https://www.bahrainnights.com';
const BASE_HOST = new URL(BASE).host.replace(/^www\./, '');
const CONCURRENCY = 6;
const MAX_PAGES = 300;

const browser = await chromium.launch();
const context = await browser.newContext();

// ── 1. Every URL the sitemap offers ────────────────────────────────────────
async function sitemapUrls() {
  const out = new Set();
  const queue = ['/sitemap.xml', '/sitemap_index.xml'];
  const seen = new Set();
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    let xml;
    try {
      const res = await fetch(BASE + path, { redirect: 'follow' });
      if (!res.ok) continue;
      xml = await res.text();
    } catch {
      continue;
    }
    // A sitemap index points at more sitemaps.
    const nested = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
      .map((m) => m[1])
      .filter((u) => /\.xml(\?|$)/.test(u));
    if (nested.length && !/<url>/.test(xml)) {
      for (const u of nested) queue.push(new URL(u).pathname);
      continue;
    }
    for (const m of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)) {
      const u = m[1].trim();
      if (/\/api\/|\/admin\//.test(u)) continue;
      out.add(u.replace(/\/$/, ''));
    }
  }
  return [...out];
}

const sitemap = await sitemapUrls();
console.log(`# sitemap URLs: ${sitemap.length}`);

// ── 2. Crawl the site for internal links ───────────────────────────────────
const linked = new Set();
const visited = new Set();
const queue = ['/'];
const HUB_PAGES = [];

async function crawl() {
  while (queue.length && visited.size < MAX_PAGES) {
    const batch = [];
    while (batch.length < CONCURRENCY && queue.length) {
      const path = queue.shift();
      if (visited.has(path)) continue;
      visited.add(path);
      batch.push(path);
    }
    if (!batch.length) break;

    const results = await Promise.all(
      batch.map(async (path) => {
        const page = await context.newPage();
        try {
          const res = await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
          if (!res || !res.ok()) return [];
          await page.waitForTimeout(400);
          const data = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a[href]')).map((a) => {
              const href = a.getAttribute('href');
              const r = a.getBoundingClientRect();
              return { href, w: r.width, h: r.height };
            });
            const robots =
              document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
            return { anchors, robots };
          });
          HUB_PAGES.push({ path, robots: data.robots });
          return data.anchors;
        } catch {
          return [];
        } finally {
          await page.close();
        }
      }),
    );

    for (const anchors of results) {
      for (const a of anchors) {
        if (!a.href || a.href.startsWith('#') || /^(mailto|tel|javascript):/i.test(a.href)) continue;
        let u;
        try {
          u = new URL(a.href, BASE);
        } catch {
          continue;
        }
        if (u.host.replace(/^www\./, '') !== BASE_HOST) continue;
        const p = u.pathname.replace(/\/$/, '') || '/';
        linked.add(p);
        if (!visited.has(p) && queue.length < 2000) queue.push(p);
      }
    }
  }
}

await crawl();
console.log(`# crawled ${visited.size} pages, found ${linked.size} distinct internal link targets`);

// ── 3. Which sitemap URLs are never linked? ─────────────────────────────────
const sitemapPaths = new Set(
  sitemap.map((u) => {
    try {
      return new URL(u).pathname.replace(/\/$/, '') || '/';
    } catch {
      return u;
    }
  }),
);

const orphans = [...sitemapPaths].filter((p) => !linked.has(p)).sort();

// ── 4. Which orphans are actually indexable? ───────────────────────────────
console.log(`# sitemap URLs with NO internal link: ${orphans.length}`);

const orphanCheck = [];
for (let i = 0; i < orphans.length; i += CONCURRENCY) {
  const chunk = orphans.slice(i, i + CONCURRENCY);
  const res = await Promise.all(
    chunk.map(async (p) => {
      try {
        const r = await fetch(BASE + p, { redirect: 'manual' });
        const html = r.status === 200 ? await r.text() : '';
        const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
        const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
        return { p, status: r.status, robots, canon };
      } catch {
        return { p, status: 'ERR', robots: '', canon: '' };
      }
    }),
  );
  orphanCheck.push(...res);
}

const indexableOrphans = orphanCheck.filter(
  (o) => o.status === 200 && !/noindex/i.test(o.robots),
);
const noindexOrphans = orphanCheck.filter((o) => o.status === 200 && /noindex/i.test(o.robots));
const broken = orphanCheck.filter((o) => o.status !== 200);

console.log(`#   indexable orphans (200 + indexable, no inbound link): ${indexableOrphans.length}`);
console.log(`#   noindex orphans: ${noindexOrphans.length}`);
console.log(`#   broken (not 200): ${broken.length}`);

const byPrefix = {};
for (const o of indexableOrphans) {
  const seg = o.p.split('/').slice(1, 3).join('/') || '/';
  byPrefix[seg] = (byPrefix[seg] || 0) + 1;
}
console.log('\n# indexable orphans by section:');
for (const [k, v] of Object.entries(byPrefix).sort((a, b) => b[1] - a[1]).slice(0, 20)) {
  console.log(`#   ${String(v).padStart(4)}  /${k}`);
}
if (indexableOrphans.length) {
  console.log('\n# sample indexable orphans:');
  for (const o of indexableOrphans.slice(0, 15)) console.log(`#   ${o.p}`);
}
if (broken.length) {
  console.log('\n# broken sitemap URLs (not 200):');
  for (const o of broken.slice(0, 20)) console.log(`#   ${o.status}  ${o.p}`);
}

await browser.close();
