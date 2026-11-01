#!/usr/bin/env node
/**
 * Audits every page the production build produces for:
 *   - a <link rel="canonical"> tag pointing at the site's own domain
 *   - exactly ONE canonical tag (duplicate emission is a bug)
 *   - an og:image
 *   - a noindex (pages that should be noindexed actually are)
 *
 * WHAT "EVERY PAGE" MEANS
 * -----------------------
 * A Next.js production build writes two kinds of output:
 *   - .html files in .next/server/app  -> STATICALLY GENERATED pages
 *   - .rsc + .meta files               -> streamed/dynamic pages
 *
 * Counting only .html gives a much smaller number than the build's own
 * "Generating static pages (N/N)" counter, because dynamic routes are
 * rendered on demand and never produce an .html file. This script walks
 * .next/server/app and treats EVERY page entry it finds — .html, .rsc and
 * .meta — as a page to audit, so the denominator matches the build counter.
 *
 * USAGE
 * -----
 *   node scripts/audit-seo-tags.mjs            # audit the built output
 *   node scripts/audit-seo-tags.mjs --json out.json
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const APP_DIR = resolve(ROOT, '.next/server/app');

const OWN_DOMAIN = 'www.bahrainnights.com';
const SITE = `https://${OWN_DOMAIN}`;

/** Pages that are intentionally not indexed. */
const EXPECTED_NOINDEX = [
  /^\/admin(\/|$)/,
  /^\/api(\/|$)/,
  /^\/venue-portal(\/|$)/,
  /^\/auth(\/|$)/,
  /^\/login(\/|$)/,
  /^\/register(\/|$)/,
  /^\/offline(\/|$)/,
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** Turn a build artefact path back into a route path. */
function routeOf(file) {
  const rel = relative(APP_DIR, file);
  let p = rel.replace(/\\/g, '/');
  p = p.replace(/\.(html|rsc|meta)$/, '');
  p = p.replace(/\/_index$/, '');
  if (p === 'index') p = '/';
  if (!p.startsWith('/')) p = '/' + p;
  return p;
}

function extract(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

const CANONICAL_RE = /<link[^>]*rel=["']canonical["'][^>]*>/gi;
const CANONICAL_HREF_RE = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i;
const OG_IMAGE_RE = /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i;
const NOINDEX_RE = /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i;

function audit() {
  const files = walk(APP_DIR);

  // Group artefacts by route. A route can have .html + .rsc + .meta.
  const byRoute = new Map();
  for (const file of files) {
    if (!/\.(html|rsc|meta)$/.test(file)) continue;
    const route = routeOf(file);
    if (!byRoute.has(route)) byRoute.set(route, []);
    byRoute.get(route).push(file);
  }

  const results = [];
  for (const [route, routeFiles] of byRoute) {
    // Prefer the .html (it contains the full head). Fall back to .rsc.
    const htmlFile =
      routeFiles.find((f) => f.endsWith('.html')) ||
      routeFiles.find((f) => f.endsWith('.rsc')) ||
      routeFiles[0];

    let html = '';
    try {
      html = readFileSync(htmlFile, 'utf8');
    } catch {
      html = '';
    }

    const canonicalTags = html.match(CANONICAL_RE) || [];
    const canonical = extract(html, CANONICAL_HREF_RE);
    const ogImage = extract(html, OG_IMAGE_RE);
    const robots = extract(html, NOINDEX_RE);

    const shouldNoindex = EXPECTED_NOINDEX.some((re) => re.test(route));
    const isNoindex = !!robots && /noindex/i.test(robots);

    let canonicalHost = null;
    let canonicalProblem = null;
    if (canonicalTags.length === 0) {
      canonicalProblem = 'no-canonical';
    } else if (canonicalTags.length > 1) {
      canonicalProblem = 'duplicate-canonical';
    } else if (!canonical) {
      canonicalProblem = 'canonical-without-href';
    } else {
      try {
        canonicalHost = new URL(canonical).host;
      } catch {
        canonicalProblem = 'canonical-not-absolute';
      }
      if (!canonicalProblem && canonicalHost !== OWN_DOMAIN) {
        canonicalProblem = `canonical-wrong-host:${canonicalHost}`;
      }
      if (!canonicalProblem && canonical !== `${SITE}${route}` && route !== '/') {
        // Not fatal, but worth surfacing: canonical points at a different path.
        canonicalProblem = `canonical-different-path`;
      }
    }

    results.push({
      route,
      artefact: relative(ROOT, htmlFile),
      kind: htmlFile.endsWith('.html') ? 'html' : htmlFile.endsWith('.rsc') ? 'rsc' : 'meta',
      canonicalCount: canonicalTags.length,
      canonical,
      canonicalProblem,
      hasOgImage: !!ogImage,
      ogImage,
      robots,
      isNoindex,
      shouldNoindex,
      noindexMismatch: shouldNoindex !== isNoindex,
    });
  }

  results.sort((a, b) => a.route.localeCompare(b.route));
  return { results, totalArtefacts: files.length };
}

const { results, totalArtefacts } = audit();

const problems = results.filter(
  (r) => r.canonicalProblem || !r.hasOgImage || r.noindexMismatch,
);

console.log(`# build output files walked: ${totalArtefacts}`);
console.log(`# routes audited: ${results.length}`);
console.log(`#   of which .html (static): ${results.filter((r) => r.kind === 'html').length}`);
console.log(`#   of which .rsc  (dynamic): ${results.filter((r) => r.kind === 'rsc').length}`);
console.log(`#   of which .meta         : ${results.filter((r) => r.kind === 'meta').length}`);
console.log(`# routes with a canonical problem: ${results.filter((r) => r.canonicalProblem).length}`);
console.log(`# routes missing og:image        : ${results.filter((r) => !r.hasOgImage).length}`);
console.log(`# routes with noindex mismatch   : ${results.filter((r) => r.noindexMismatch).length}`);
console.log(`# total problem routes           : ${problems.length}`);
console.log('');
if (problems.length) {
  console.log('route\tcanonical\thasOgImage\tnoindex\texpectedNoindex\tproblem');
  for (const p of problems) {
    console.log(
      `${p.route}\t${p.canonical ?? '(none)'}\t${p.hasOgImage}\t${p.isNoindex}\t${p.shouldNoindex}\t${p.canonicalProblem ?? (p.noindexMismatch ? 'noindex-mismatch' : 'missing-og-image')}`,
    );
  }
}

const jsonIdx = process.argv.indexOf('--json');
if (jsonIdx !== -1 && process.argv[jsonIdx + 1]) {
  writeFileSync(process.argv[jsonIdx + 1], JSON.stringify({ totalArtefacts, results }, null, 2));
  console.log(`\n# wrote ${process.argv[jsonIdx + 1]}`);
}
