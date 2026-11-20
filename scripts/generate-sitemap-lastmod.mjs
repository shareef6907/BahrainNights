#!/usr/bin/env node
/**
 * Generate src/data/sitemap-lastmod.json -- a truthful per-route "last
 * modified" map for the sitemap.
 *
 * WHY THIS EXISTS
 * ---------------
 * `src/app/sitemap.ts` used to set `lastModified: new Date()` on every
 * static, guide, category and hub entry. That value is evaluated at BUILD
 * time, so every deploy rewrote the lastmod of all ~1,140 sitemap URLs to
 * "now" -- including pages whose content had not changed in months.
 *
 * Google documents the consequence: when lastmod is inaccurate it is ignored
 * and Google may crawl the site *less* frequently, because the freshness
 * signal carries no information. A sitemap that says "everything changed" on
 * every deploy tells Google nothing at all.
 *
 * WHAT THIS DOES
 * --------------
 * For each route in the App Router it takes the date of the last git commit
 * that touched the file rendering that route. That is the real date the page
 * content last changed. The map is committed, so the build never depends on
 * git history being present (Vercel clones shallow) and the sitemap is
 * deterministic.
 *
 * Database-driven URLs (events, venues, movies, attractions) are NOT in this
 * map: they already use the row's own `updated_at`, which is the truthful
 * signal for those.
 *
 * USAGE
 *   node scripts/generate-sitemap-lastmod.mjs
 *
 * Re-run it after any content change to keep the dates current. If a route
 * is missing from the map the sitemap falls back to build time (the previous
 * behaviour), so a stale map can never lose URLs -- only lose precision.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const APP_DIR = join(ROOT, 'src', 'app');
const OUT_FILE = join(ROOT, 'src', 'data', 'sitemap-lastmod.json');

/** Walk the App Router and collect every file that renders a page. */
function findPageFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...findPageFiles(full));
    } else if (entry === 'page.tsx' || entry === 'page.ts' || entry === 'page.jsx' || entry === 'page.js') {
      out.push(full);
    }
  }
  return out;
}

/**
 * Turn a file path into the URL route it renders.
 *
 * - `src/app/guides/malls/dana-mall/page.tsx` -> `/guides/malls/dana-mall`
 * - `src/app/(category)/[slug]/page.tsx`      -> `/[slug]`
 * - `src/app/page.tsx`                        -> `/`
 *
 * Route groups -- `(category)`, `(auth)` -- are not part of the URL and are
 * dropped. Dynamic segments are KEPT as `[name]` because they identify a
 * template rather than a single URL.
 */
function routeFor(file) {
  const rel = relative(APP_DIR, file).split(sep).join('/');
  const segments = rel.replace(/\/?page\.[tj]sx?$/, '').split('/').filter(Boolean);
  const kept = segments.filter((s) => !/^\(.*\)$/.test(s));
  return kept.length ? '/' + kept.join('/') : '/';
}

/**
 * Date of the last commit that touched a file, as a UTC ISO string.
 *
 * The offset is normalised to `Z` on purpose: a local offset such as
 * `+03:00` contains a plus sign directly after digits, which the content
 * gate's "unverified company statistic" pattern reads as a statistic
 * (a run of digits followed by a plus sign). UTC keeps the gate honest and
 * the dates unambiguous.
 */
function lastCommitDate(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (!out) return null;
    const parsed = new Date(out);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toISOString();
  } catch {
    return null;
  }
}

const files = findPageFiles(APP_DIR);

const exact = {};
const templates = {};

for (const file of files) {
  const route = routeFor(file);
  const date = lastCommitDate(relative(ROOT, file));
  if (!date) continue;

  if (route.includes('[')) {
    templates[route] = date;
  } else {
    exact[route] = date;
  }
}

const sortObject = (obj) =>
  Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));

const payload = {
  exact: sortObject(exact),
  templates: sortObject(templates),
};

writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2) + '\n');

const total = Object.keys(exact).length + Object.keys(templates).length;
console.log(`wrote ${OUT_FILE}`);
console.log(`  ${Object.keys(exact).length} exact routes`);
console.log(`  ${Object.keys(templates).length} dynamic templates`);
console.log(`  ${total} routes dated from git history`);

// Fail loudly if the map came out suspiciously small -- that would silently
// degrade every lastmod back to build time.
const MINIMUM_ROUTES = 50;
if (total < MINIMUM_ROUTES) {
  console.error(`ERROR: only ${total} routes dated -- expected at least ${MINIMUM_ROUTES}. Check git history access.`);
  process.exit(1);
}
