#!/usr/bin/env node
/**
 * Guards against the public PII leak reopening.
 *
 * BACKGROUND
 * ----------
 * Two separate leaks published private venue data to anonymous visitors:
 *
 *   1. `GET /api/public/venues` returned whole `venues` rows, including
 *      `password_hash`, `cr_number`, `registration_ip` and `owner_id`.
 *      Fixed by the explicit column allowlist in `src/lib/public-venue-fields.ts`.
 *
 *   2. The RSC path — `getApprovedVenues()` / `getVenueBySlug()` in
 *      `src/lib/db/venues.ts` — still used `select('*')`. Those rows are
 *      passed into client components, so Next.js serialised the full row
 *      into the HTML of every public venue detail page
 *      (`/places/<slug>`, `/nightclubs/<slug>`, `/cafes/<slug>`,
 *      `/lounges-bars/<slug>`, `/beach-pool-clubs/<slug>`).
 *
 * Fixing the API but not the DB layer left the leak open, so this check
 * exists to make the class of bug visible rather than relying on a reviewer
 * to remember it.
 *
 * WHAT IT CHECKS
 * --------------
 *   1. `PUBLIC_VENUE_FIELDS` contains none of the sensitive column names.
 *   2. The public readers in `src/lib/db/venues.ts` do not use `select('*')`.
 *   3. No route under `src/app/api/` that is reachable without an admin
 *      session selects `*` from a table that has sensitive columns.
 *
 * Exits non-zero if any check fails.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SENSITIVE_COLUMNS = [
  'password_hash',
  'cr_number',
  'registration_ip',
  'registration_user_agent',
  'owner_id',
  'terms_accepted',
  'reviewed_by',
  'membership_notes',
  'submitter_email',
  'submitter_phone',
  'ip_address',
  'user_agent',
];

const failures = [];
const notes = [];

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

// ---------------------------------------------------------------------------
// 1. The allowlist itself must not contain a sensitive column.
// ---------------------------------------------------------------------------
const fieldsFile = read('src/lib/public-venue-fields.ts');
const allowlistBlock = fieldsFile.slice(
  fieldsFile.indexOf('PUBLIC_VENUE_FIELDS'),
  fieldsFile.indexOf('] as const;')
);
const allowlist = [...allowlistBlock.matchAll(/'([a-z_0-9]+)'/g)].map((m) => m[1]);

if (allowlist.length === 0) {
  failures.push('Could not parse PUBLIC_VENUE_FIELDS from src/lib/public-venue-fields.ts');
} else {
  for (const col of SENSITIVE_COLUMNS) {
    if (allowlist.includes(col)) {
      failures.push(`PUBLIC_VENUE_FIELDS contains the sensitive column "${col}"`);
    }
  }
  notes.push(`PUBLIC_VENUE_FIELDS: ${allowlist.length} columns, none sensitive`);
}

// ---------------------------------------------------------------------------
// 2. The public readers in the DB layer must not select whole rows.
// ---------------------------------------------------------------------------
const dbFile = read('src/lib/db/venues.ts');
const PUBLIC_READERS = [
  'getApprovedVenues',
  'getVenueBySlug',
  'getVenueWithEvents',
  'getPublicVenueBySlug',
];

for (const fn of PUBLIC_READERS) {
  const start = dbFile.indexOf(`export async function ${fn}(`);
  if (start === -1) continue;
  // Function body runs until the next top-level `export ` declaration.
  const rest = dbFile.slice(start);
  const nextExport = rest.indexOf('\nexport ', 10);
  const body = nextExport === -1 ? rest : rest.slice(0, nextExport);

  if (body.includes("select('*')") || body.includes('select("*")')) {
    failures.push(`${fn}() in src/lib/db/venues.ts uses select('*') — it feeds public pages`);
  }
  if (!body.includes('PUBLIC_VENUE_SELECT') && fn !== 'getPublicVenueBySlug') {
    failures.push(`${fn}() in src/lib/db/venues.ts does not use PUBLIC_VENUE_SELECT`);
  }
  notes.push(`${fn}(): checked`);
}

// ---------------------------------------------------------------------------
// 3. No unauthenticated API route may select '*' from a sensitive table.
//    A route is treated as authenticated if it calls requireAdmin,
//    requireAdminOrInternal, requireInternalToken, or reads an auth token.
// ---------------------------------------------------------------------------
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (entry === 'route.ts' || entry === 'route.tsx') out.push(full);
  }
  return out;
}

/**
 * Strips comments so a comment mentioning `select('*')` is not treated as code.
 * Block comments and line comments are replaced with spaces, preserving
 * offsets so the remaining code still parses as text.
 */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + ' '.repeat(m.length - p.length));
}

/**
 * Finds `select('*')` calls that actually RETURN ROWS.
 *
 * `select('*', { count: 'exact', head: true })` is a count query — Supabase
 * returns only the count and no rows, so it cannot leak a column value.
 * `select('*')` with no options does return every column.
 */
function findRowReturningWildcards(src) {
  const hits = [];
  const re = /\.select\(\s*(['"])\*\1\s*(\)|,)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const rest = src.slice(m.index);
    // If the options object contains `head: true`, no rows are returned.
    const optsMatch = rest.match(/^[^)]*?,\s*(\{[\s\S]{0,200}?\}\s*)?\)/);
    const opts = optsMatch ? optsMatch[1] || '' : '';
    if (/head\s*:\s*true/.test(opts)) continue;
    hits.push({ index: m.index, options: opts });
  }
  return hits;
}

/**
 * Returns the table name for a `.from('x')` call that precedes a given
 * offset, i.e. the nearest `.from(...)` before the select.
 */
function tableBefore(src, index) {
  const before = src.slice(0, index);
  const matches = [...before.matchAll(/\.from\(\s*(['"`])([a-z_0-9]+)\1\s*\)/g)];
  if (matches.length === 0) return null;
  return matches[matches.length - 1][2];
}

const apiDir = join(ROOT, 'src/app/api');
const routes = walk(apiDir);

const AUTH_MARKERS = [
  'requireAdmin',
  'requireAdminOrInternal',
  'requireInternalToken',
  'verifyAdminToken',
  'getAuthUser',
  'auth_token',
  'authToken',
  'CRON_SECRET',
  'InternalToken',
  'getVenueFromSession',
  'venue_session',
];

/**
 * Paths protected by `src/middleware.ts` rather than by an in-route guard.
 * The matcher includes `/api/admin/:path*`, so every route under
 * `src/app/api/admin/` requires a valid admin session cookie before the
 * handler runs.
 */
function isMiddlewareProtected(rel) {
  return rel.startsWith('src/app/api/admin/');
}

// Tables that carry private data. `venues` holds the owner's bcrypt digest,
// CR number and registration IP; `venue_submissions` holds the submitter's
// name, email, phone and IP; `public_users` holds the registered user's
// identity.
const SENSITIVE_TABLES = ['venues', 'venue_submissions', 'public_users'];

let publicRoutesChecked = 0;

for (const routePath of routes) {
  const rel = routePath.replace(`${ROOT}/`, '');
  const raw = readFileSync(routePath, 'utf8');
  const src = stripComments(raw);

  const hits = findRowReturningWildcards(src);
  if (hits.length === 0) continue;

  const authenticated = AUTH_MARKERS.some((m) => src.includes(m)) || isMiddlewareProtected(rel);
  if (authenticated) continue;

  for (const hit of hits) {
    const table = tableBefore(src, hit.index);
    if (table && SENSITIVE_TABLES.includes(table)) {
      failures.push(
        `${rel} selects '*' from "${table}" (row-returning) and has no auth guard`
      );
    } else {
      notes.push(
        `${rel}: row-returning select('*') on "${table ?? 'unknown'}" — not a sensitive table, no auth guard`
      );
    }
    publicRoutesChecked += 1;
  }
}

notes.push(`${publicRoutesChecked} unauthenticated row-returning wildcard select(s) reviewed`);

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------
console.log('=== verify-no-public-pii ===');
for (const n of notes) console.log(`  note: ${n}`);

if (failures.length > 0) {
  console.log('');
  for (const f of failures) console.log(`  FAIL: ${f}`);
  console.log('');
  console.log(`RESULT: FAILED (${failures.length} problem(s))`);
  process.exit(1);
}

console.log('');
console.log('RESULT: PASSED');
