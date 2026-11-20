#!/usr/bin/env node
/**
 * Compares a production origin against a local build for sensitive data.
 *
 * Usage: node scripts/compare-leak.mjs <production-origin> <local-origin>
 */
const SENSITIVE = [
  'password_hash',
  'cr_number',
  'registration_ip',
  'registration_user_agent',
  'owner_id',
  'terms_accepted',
  'reviewed_by',
  'membership_notes',
  'submitted_email',
  'submitted_phone',
  'real_name',
  'admin_notes',
  'rate_notes',
  'rejection_reason',
  'contact_name',
  'contact_email',
  'contact_phone',
  'submitter_email',
  'submitter_phone',
  'ip_address',
  'user_agent',
];

const ROUTES = [
  '/',
  '/cinema',
  '/events',
  '/attractions',
  '/guides',
  '/blog',
  '/artists',
  '/places',
  '/venues',
  '/places/black-book-events',
  '/nightclubs/black-book-events',
  '/cafes/black-book-events',
  '/lounges-bars/black-book-events',
  '/beach-pool-clubs/black-book-events',
  '/artists/pianist-1',
  '/artists/qanun-player',
  '/api/public/venues',
  '/api/public/venues/black-book-events',
  '/api/events?limit=50',
  '/api/attractions',
  '/api/guides',
  '/api/cinema/cinemas',
  '/api/agents/cinema/status',
  '/api/agents/cinema/scrape-status',
  '/api/public/stats',
];

const [prod, local] = process.argv.slice(2);
if (!prod || !local) {
  console.error('usage: node compare-leak.mjs <production-origin> <local-origin>');
  process.exit(2);
}

function hits(body) {
  const found = {};
  for (const col of SENSITIVE) {
    const n = (body.match(new RegExp(col, 'g')) || []).length;
    if (n > 0) found[col] = n;
  }
  return found;
}

console.log('route'.padEnd(42) + 'production'.padEnd(46) + 'local');
console.log('-'.repeat(120));

let prodDirty = 0;
let localDirty = 0;

for (const route of ROUTES) {
  const [pRes, lRes] = await Promise.all([
    fetch(prod + route).then((r) => r.text()).catch(() => ''),
    fetch(local + route).then((r) => r.text()).catch(() => ''),
  ]);
  const ph = hits(pRes);
  const lh = hits(lRes);
  if (Object.keys(ph).length) prodDirty++;
  if (Object.keys(lh).length) localDirty++;

  const fmt = (h) => {
    const keys = Object.keys(h);
    return keys.length ? keys.map((k) => `${k}(${h[k]})`).join(',') : '-';
  };

  console.log(
    route.padEnd(42) + fmt(ph).slice(0, 44).padEnd(46) + fmt(lh)
  );
}

console.log('');
console.log(`routes with sensitive hits — production: ${prodDirty}/${ROUTES.length}, local: ${localDirty}/${ROUTES.length}`);
