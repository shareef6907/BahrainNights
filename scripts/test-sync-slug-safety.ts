/**
 * Regression guard: no write path may overwrite a stored slug.
 *
 * The bug this exists for
 * -----------------------
 * PR #41 fixed the slug rewrite in the API routes
 * (`src/app/api/admin/sync-platinumlist/route.ts` and
 * `src/app/api/cron/international-events/route.ts`). It did NOT fix the two
 * standalone scripts -- and those scripts are the hot path:
 *
 *   .github/workflows/platinumlist-sync.yml  ->  npx tsx index.ts
 *     -> fetchEvents()       (scripts/platinumlist-api/fetch-events.ts)
 *     -> fetchAttractions()  (scripts/platinumlist-api/fetch-attractions.ts)
 *
 * That workflow runs EVERY FOUR HOURS. Both scripts did
 *
 *     .update({ ...event, updated_at: ... })
 *
 * which spreads the freshly generated slug over the stored one. Platinumlist
 * renames listings (a subtitle changes, an event is re-worded), the slug
 * changes with it, and the URL Google has already indexed stops resolving.
 *
 * Why a source-level test
 * -----------------------
 * The upsert functions are not exported and talking to the real database is
 * not something a unit test should do. But the property that matters is
 * visible in the source: the payload written on UPDATE must set `slug`
 * explicitly. A bare spread of the row is the bug, and it is greppable.
 *
 * If someone adds a new write path, this test will not know about it -- which
 * is why the list below is spelled out rather than discovered. Add to it.
 */
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..');

const failures: string[] = [];
let passed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failures.push(`${name}: ${(e as Error).message}`);
    console.log(`  ✗ ${name}`);
  }
}

/**
 * Every path that writes a row back to the database, with the table it writes
 * and the field that carries the slug.
 */
const WRITE_PATHS: { file: string; label: string; updateRe: RegExp }[] = [
  {
    file: 'src/app/api/admin/sync-platinumlist/route.ts',
    label: 'admin sync route (events)',
    // updatePayload = slugIsUnusable ? dbEvent : { ...dbEvent, slug: existingSlug }
    updateRe: /updatePayload\s*=\s*[\s\S]{0,200}?slug/,
  },
  {
    file: 'src/app/api/cron/international-events/route.ts',
    label: 'international cron (events)',
    updateRe: /update\(\{[\s\S]{0,400}?slug:/,
  },
  {
    file: 'scripts/platinumlist-api/fetch-events.ts',
    label: 'fetch-events.ts (the 4-hourly workflow)',
    updateRe: /update\(\{[\s\S]{0,400}?slug:/,
  },
  {
    file: 'scripts/platinumlist-api/fetch-attractions.ts',
    label: 'fetch-attractions.ts (the 4-hourly workflow)',
    updateRe: /update\(\{[\s\S]{0,400}?slug:/,
  },
  {
    file: 'scripts/platinumlist-api/fetch-international.ts',
    label: 'fetch-international.ts (the 4-hourly workflow)',
    updateRe: /update\(\{[\s\S]{0,400}?slug:/,
  },
];

console.log('\nwrite paths that must not overwrite a stored slug');

for (const wp of WRITE_PATHS) {
  const abs = path.join(ROOT, wp.file);
  test(`${wp.label}: the update payload sets slug explicitly`, () => {
    const src = fs.readFileSync(abs, 'utf8');
    assert.ok(
      wp.updateRe.test(src),
      `${wp.file}: the update payload does not set \`slug\` — a bare spread of the row ` +
        `overwrites the stored slug with a freshly generated one.`,
    );
  });
}

console.log('\nwrite paths must keep the original slug unless it is unusable');

for (const wp of WRITE_PATHS) {
  const abs = path.join(ROOT, wp.file);
  test(`${wp.label}: preserves the original slug`, () => {
    const src = fs.readFileSync(abs, 'utf8');
    const mentionsOriginal =
      /resolveSlugForUpsert/.test(src) ||
      /existingSlug/.test(src) ||
      /storedSlug/.test(src);
    assert.ok(
      mentionsOriginal,
      `${wp.file}: nothing reads the previously stored slug, so the new one always wins.`,
    );
  });
}

console.log('\nthe shared helper is used where it exists');

test('src/lib/slug.ts exports resolveSlugForUpsert', () => {
  const src = fs.readFileSync(path.join(ROOT, 'src/lib/slug.ts'), 'utf8');
  assert.ok(/export function resolveSlugForUpsert/.test(src));
});

test('resolveSlugForUpsert keeps a usable slug and regenerates an unusable one', () => {
  const src = fs.readFileSync(path.join(ROOT, 'src/lib/slug.ts'), 'utf8');
  assert.ok(
    /isUnusableSlug\(existingSlug\)\s*\?\s*generatedSlug\s*:\s*\(existingSlug as string\)/.test(src),
    'resolveSlugForUpsert must return the existing slug unless it is unusable',
  );
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  for (const f of failures) console.log('  FAIL ' + f);
  process.exit(1);
}
console.log('OK');
