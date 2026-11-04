#!/usr/bin/env node
/**
 * Repair movie rows whose `title` was stored as a slug.
 *
 * ## The bug
 *
 * Between roughly July and October 2026 an older version of the cinema sync
 * wrote the SLUG into the `title` column, so multi-word titles lost their
 * spaces:
 *
 *   "Heart of the Beast"      -> "heartofthebeast"
 *   "The Thomas Crown Affair" -> "thomascrownaffair"
 *   "Day Drinker"             -> "daydrinker"
 *   "Violent Night 2"         -> "violentnight2"
 *
 * Those rows are live on https://www.bahrainnights.com/cinema today, where
 * they display exactly as "heartofthebeast" and "thomascrownaffair".
 *
 * ## Why the sync cannot fix them on its own
 *
 * `normalizeTitle()` (scripts/sync-cinema.ts) folds a title to its
 * alphanumerics only:
 *
 *   "Heart of the Beast" -> "heartofthebeast"
 *   "heartofthebeast"    -> "heartofthebeast"
 *
 * so the corrupted row MATCHES the freshly scraped title. The sync sees a
 * match, flips the now_showing / coming_soon flags, and leaves the title
 * alone. The corruption is sticky: it survives every future sync.
 *
 * ## What this script does
 *
 * The cinema listings themselves are the source of truth for the correct
 * spelling, so this reads the live VOX + Cineco listings and maps each
 * corrupted row back to the title as the cinema spells it.
 *
 *   node scripts/repair-cinema-titles.mjs          # dry run, prints the plan
 *   node scripts/repair-cinema-titles.mjs --apply  # writes the repairs
 *
 * Safety rules:
 *   - Only rows whose title has no spaces AND differs from the listing are
 *     touched. A genuinely single-word film ("Scene", "Gatto", "Naseeb") is
 *     left alone because the listing agrees with it.
 *   - If a CORRECT row already exists for the same title, the corrupted row
 *     is a duplicate: it is deactivated rather than renamed, so the page
 *     does not show the same film twice.
 *   - The `slug` is repaired alongside the title, because the slug is what
 *     the agent sync (/api/agents/cinema/run) matches on. Leaving a slug
 *     that no longer matches the title is how the two drift apart again.
 *   - `--apply` writes only the columns it changes, and prints a summary.
 */
import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const APPLY = process.argv.includes('--apply');

// ---------------------------------------------------------------------------
// Read the live cinema listings (the source of truth for the spelling).
// ---------------------------------------------------------------------------

const VOX_URLS = {
  nowShowing: 'https://bhr.voxcinemas.com/movies/whatson',
  comingSoon: 'https://bhr.voxcinemas.com/movies/comingsoon',
};

// VOX sits behind Akamai, which rejects real browser User-Agents from a
// datacentre IP (the connection is closed with no response at all). A plain
// agent is accepted. Same finding as src/app/api/cron/sync-cinema/route.ts.
const UA = 'curl/8.7.1';

async function fetchTitles(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'text/html' },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const html = await res.text();
  const titles = new Set();
  // Same two sources the scraper uses (scripts/scrape-vox.ts): the h3
  // headings and the data-title attributes. Reading only one of them misses
  // titles and leaves a corrupted row unmatchable.
  for (const m of html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)) {
    const t = m[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .trim()
      // VOX prefixes the certification badge ("18TC") to the heading text.
      // It is not part of the film title; the data-title attribute has the
      // clean spelling, but strip it here too so a heading-only listing is
      // still usable.
      .replace(/^\d{1,2}[A-Z]{1,3}\s+/, '');
    if (t) titles.add(t);
  }
  for (const m of html.matchAll(/data-title="([^"]+)"/g)) {
    const t = m[1].replace(/&amp;/g, '&').trim();
    if (t) titles.add(t);
  }
  return [...titles];
}

/**
 * Fold a title to its alphanumerics, ignoring spaces and punctuation.
 * This is the same folding normalizeTitle() uses, so a corrupted row and its
 * correct spelling land on the same key.
 */
function fold(title) {
  return (title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ---------------------------------------------------------------------------

function loadEnv() {
  const env = Object.fromEntries(
    fs
      .readFileSync('.env.local', 'utf8')
      .split('\n')
      .filter(Boolean)
      .map((l) => {
        const i = l.indexOf('=');
        return [
          l.slice(0, i).trim(),
          l.slice(i + 1).trim().replace(/^["']|["']$/g, ''),
        ];
      }),
  );
  return env;
}

async function main() {
  const env = loadEnv();
  const sb = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
  );

  console.log('Reading live cinema listings...');
  let liveTitles = [];
  try {
    const [now, soon] = await Promise.all([
      fetchTitles(VOX_URLS.nowShowing),
      fetchTitles(VOX_URLS.comingSoon),
    ]);
    liveTitles = [...new Set([...now, ...soon])];
    console.log(`  VOX listings: ${liveTitles.length} titles`);
  } catch (e) {
    console.error(`  FAILED to read VOX: ${e.message}`);
    console.error('  Refusing to run: without the listing there is no source of truth.');
    process.exit(1);
  }

  // folded listing title -> the spelling the cinema uses
  const listing = new Map();
  for (const t of liveTitles) {
    const k = fold(t);
    if (!listing.has(k)) listing.set(k, t);
  }
  const listingFolded = [...listing.keys()];

  /**
   * Find the listing title that corresponds to a corrupted stored title.
   *
   * An exact fold is the normal case, but it is not enough on its own: the
   * old slugifier took the movie's URL slug, which drops a leading article.
   * VOX lists "The Thomas Crown Affair" and the slug was "thomas-crown-affair",
   * so the stored title folds to "thomascrownaffair" while the listing folds
   * to "thethomascrownaffair". An exact match fails there, so fall back to a
   * suffix match, and only then to a containment match.
   */
  function findListingTitle(storedFold) {
    if (listing.has(storedFold)) return listing.get(storedFold);

    const suffix = listingFolded.filter((k) => k.endsWith(storedFold));
    if (suffix.length === 1) return listing.get(suffix[0]);
    if (suffix.length > 1) {
      // Prefer the tightest match (least extra prefix).
      suffix.sort((a, b) => a.length - b.length);
      return listing.get(suffix[0]);
    }

    const contains = listingFolded.filter(
      (k) => k.length > storedFold.length && k.includes(storedFold),
    );
    if (contains.length === 1) return listing.get(contains[0]);
    return null;
  }

  const { data: movies, error } = await sb
    .from('movies')
    .select(
      'id, title, slug, is_now_showing, is_coming_soon, tmdb_id, scraped_from, release_date',
    )
    .limit(5000);
  if (error) {
    console.error('DB error:', error.message);
    process.exit(1);
  }

  // Rows the site is currently showing.
  const shown = movies.filter((m) => m.is_now_showing || m.is_coming_soon);

  // --- Pass 1: repair titles that were stored as a slug -------------------
  // A clean row already holding a title blocks a rename (it would duplicate).
  const cleanByKey = new Map();
  for (const m of movies) {
    if (/\s/.test(m.title || '')) cleanByKey.set(fold(m.title), m);
  }

  const repairs = [];
  const deactivations = [];
  for (const m of shown) {
    const title = (m.title || '').trim();
    if (!title || /\s/.test(title)) continue; // already has spaces: not corrupted

    const k = fold(title);
    const correct = findListingTitle(k);
    if (!correct || correct === title) continue; // listing agrees: single-word film

    const clash = cleanByKey.get(k);
    if (clash) {
      // The same film already exists as a clean row -> this row is a duplicate.
      deactivations.push({ row: m, correct, clash, reason: 'duplicate of clean row' });
    } else {
      repairs.push({ row: m, correct });
    }
  }

  // --- Pass 2: duplicate rows that are BOTH spelled correctly -------------
  // e.g. two rows called "Les Misérables". The cinema page renders every
  // row it is given, so a duplicate shows up twice on the live page.
  const groups = new Map();
  for (const m of shown) {
    const k = fold(m.title);
    if (!k) continue;
    (groups.get(k) || groups.set(k, []).get(k)).push(m);
  }

  /**
   * Which row of a duplicate set should survive?
   *
   * The one that is actually in cinemas now. Several of these sets are a
   * remake plus the original ("The Cat in the Hat" 2026 and 2003, "Sense and
   * Sensibility" 2026 and 1995, "Heart of the Beast" 2026 and 2017) and only
   * the recent release is the one on screen. So the most recent
   * release_date wins; a row with no release_date loses to one that has one.
   * TMDB id and the listing's spelling break any remaining tie.
   */
  function pickBest(group) {
    const scored = group.map((m) => {
      const k = fold(m.title);
      const listingTitle = findListingTitle(k);
      let score = 0;
      if (listingTitle && listingTitle === m.title) score += 8;
      if (m.release_date) score += 6;
      if (m.tmdb_id) score += 4;
      if (/\s/.test(m.title || '')) score += 2;
      if (m.scraped_from) score += 1;
      return { m, score, rel: m.release_date || '' };
    });
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Same score: the newer release is the one playing.
      if (a.rel !== b.rel) return b.rel.localeCompare(a.rel);
      return a.m.title.localeCompare(b.m.title);
    });
    return scored[0].m;
  }

  for (const [k, group] of groups) {
    if (group.length < 2) continue;
    const keep = pickBest(group);
    for (const m of group) {
      if (m.id === keep.id) continue;
      if (deactivations.some((d) => d.row.id === m.id)) continue;
      deactivations.push({
        row: m,
        correct: keep.title,
        clash: keep,
        reason: 'duplicate row',
      });
    }
  }

  console.log(`\nRows needing a title repair : ${repairs.length}`);
  console.log(`Rows needing deactivation  : ${deactivations.length}`);

  for (const r of repairs) {
    console.log(
      `  "${r.row.title}" -> "${r.correct}"` +
        (r.row.is_now_showing ? '  [now showing]' : '  [coming soon]'),
    );
  }
  for (const d of deactivations) {
    console.log(
      `  DEACTIVATE "${d.row.title}" (${d.reason}, kept "${d.clash.title}"` +
        ` tmdb=${d.clash.tmdb_id ?? '-'} vs ${d.row.tmdb_id ?? '-'})`,
    );
  }

  if (!APPLY) {
    console.log('\nDry run. Re-run with --apply to write these repairs.');
    return;
  }

  let applied = 0;
  // Snapshot what is being changed so the repair can be rolled back.
  const snapshot = {
    at: new Date().toISOString(),
    repairs: repairs.map((r) => ({
      id: r.row.id,
      title: r.row.title,
      slug: r.row.slug,
      newTitle: r.correct,
      newSlug: slugify(r.correct),
    })),
    deactivations: deactivations.map((d) => ({
      id: d.row.id,
      title: d.row.title,
      is_now_showing: d.row.is_now_showing,
      is_coming_soon: d.row.is_coming_soon,
      reason: d.reason,
    })),
  };
  const snapshotPath = 'scripts/cinema-title-repair-backup.json';
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2));
  console.log(`\nSnapshot written to ${snapshotPath}`);

  for (const r of repairs) {
    const { error } = await sb
      .from('movies')
      .update({
        title: r.correct,
        slug: slugify(r.correct),
        updated_at: new Date().toISOString(),
      })
      .eq('id', r.row.id);
    if (error) console.error(`  FAILED "${r.row.title}": ${error.message}`);
    else applied++;
  }

  let deactivated = 0;
  for (const d of deactivations) {
    const { error } = await sb
      .from('movies')
      .update({
        is_now_showing: false,
        is_coming_soon: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', d.row.id);
    if (error) console.error(`  FAILED "${d.row.title}": ${error.message}`);
    else deactivated++;
  }

  console.log(`\nApplied: ${applied} title repairs, ${deactivated} deactivations.`);
}

main();
