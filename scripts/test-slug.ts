/**
 * Unit tests for the slug rules.
 *
 * The slug is part of a row's identity in the URL space. If Google has indexed
 * /events/<slug> and the upstream title changes, regenerating the slug breaks
 * that indexed URL and turns it into a 404 that keeps earning impressions.
 *
 * Run:  npx tsx scripts/test-slug.ts
 */
import assert from 'node:assert';
import {
  generateEventSlug,
  isUnusableSlug,
  resolveSlugForUpsert,
  slugify,
  transliterate,
} from '../src/lib/slug';

let passed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
  } catch (e) {
    failures.push(`${name}: ${(e as Error).message}`);
  }
}

// ---------------------------------------------------------------- slugify

test('slugify keeps plain words', () => {
  assert.strictEqual(slugify('Desert Safari'), 'desert-safari');
});

test('slugify strips accents', () => {
  assert.strictEqual(slugify('Café Mambo'), 'cafe-mambo');
});

test('slugify strips punctuation', () => {
  assert.strictEqual(slugify('Rock & Roll: Live!'), 'rock-roll-live');
});

test('slugify collapses repeated hyphens', () => {
  assert.strictEqual(slugify('a -- b'), 'a-b');
});

test('slugify returns empty for a fully non-Latin title', () => {
  // The old code returned "-", which is truthy, so the caller published
  // "/events/--108813".
  assert.strictEqual(slugify('Русский язык'), '');
});

test('slugify returns empty for punctuation-only input', () => {
  assert.strictEqual(slugify('!!!'), '');
});

test('slugify returns empty for empty input', () => {
  assert.strictEqual(slugify(''), '');
});

// ---------------------------------------------------------- transliterate

test('transliterate maps Cyrillic', () => {
  // Cyrillic capitals map to their lowercase Latin equivalent; slugify()
  // lowercases everything anyway, so the case does not matter downstream.
  assert.strictEqual(transliterate('Русский язык'), 'russkiy yazyk');
});

test('transliterate handles Ukrainian letters', () => {
  assert.strictEqual(transliterate('Їжак'), 'yizhak');
});

test('transliterate leaves Latin untouched', () => {
  assert.strictEqual(transliterate('Hello'), 'Hello');
});

test('transliterate handles an empty string', () => {
  assert.strictEqual(transliterate(''), '');
});

// ------------------------------------------------------- isUnusableSlug

test('isUnusableSlug rejects empty', () => {
  assert.strictEqual(isUnusableSlug(''), true);
  assert.strictEqual(isUnusableSlug(null), true);
  assert.strictEqual(isUnusableSlug(undefined), true);
});

test('isUnusableSlug rejects a bare id', () => {
  assert.strictEqual(isUnusableSlug('108813'), true);
});

test('isUnusableSlug rejects hyphens with no words', () => {
  assert.strictEqual(isUnusableSlug('--108813'), true);
  assert.strictEqual(isUnusableSlug('-108813'), true);
});

test('isUnusableSlug accepts a real slug', () => {
  assert.strictEqual(isUnusableSlug('desert-safari-108813'), false);
});

// ---------------------------------------------------- resolveSlugForUpsert

test('an indexed slug is never rewritten', () => {
  // The upstream title changed. The stored slug must win.
  assert.strictEqual(
    resolveSlugForUpsert('desert-safari-108813', 'new-title-108813'),
    'desert-safari-108813',
  );
});

test('an unusable slug IS regenerated', () => {
  assert.strictEqual(resolveSlugForUpsert('--108813', 'russkiy-yazyk-108813'), 'russkiy-yazyk-108813');
  assert.strictEqual(resolveSlugForUpsert('108813', 'russkiy-yazyk-108813'), 'russkiy-yazyk-108813');
  assert.strictEqual(resolveSlugForUpsert('', 'russkiy-yazyk-108813'), 'russkiy-yazyk-108813');
  assert.strictEqual(resolveSlugForUpsert(null, 'russkiy-yazyk-108813'), 'russkiy-yazyk-108813');
});

// -------------------------------------------------- generateEventSlug

test('generateEventSlug uses the title when it is usable', () => {
  assert.strictEqual(generateEventSlug('Desert Safari', 108813, 'UAE, Dubai'), 'desert-safari-108813');
});

test('generateEventSlug transliterates a Cyrillic title', () => {
  assert.strictEqual(
    generateEventSlug('Русский язык', 108813, 'UAE, Dubai'),
    'russkiy-yazyk-108813',
  );
});

test('generateEventSlug never emits an empty-word slug', () => {
  // This is the regression that produced "/events/--108813".
  const slug = generateEventSlug('Русский язык', 108813, '');
  assert.ok(slug.includes('108813'), 'slug must end with the id');
  assert.ok(!/^-+/.test(slug), 'slug must not start with a hyphen');
  assert.ok(/[a-z0-9]/.test(slug.split('-').slice(0, -1).join('-')), 'slug must contain words');
});

test('generateEventSlug falls back to the hint', () => {
  const slug = generateEventSlug('!!!', 108813, 'UAE, Dubai');
  assert.ok(slug.includes('108813'));
  assert.ok(!/^-+/.test(slug));
});

// ------------------------------------------------------------------ done

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  for (const f of failures) console.log('  FAIL ' + f);
  process.exit(1);
}
console.log('OK');
