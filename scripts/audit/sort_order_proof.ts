/**
 * Proof that the sort fix is real.
 *
 * The bug: `sortEventsWithFeatured` sorted by the DISPLAY string ("Fri, Jan 8"),
 * which `new Date()` parses as 8 January of the CURRENT year. On 27 Nov 2026
 * that is a PAST date, so every event stored for 2027 sorted itself to the top
 * of the page and read as a dead event.
 *
 * This test fails on the old sort and passes on the new one.
 *
 * Run: npx tsx scripts/audit/sort_order_proof.ts
 */
import { sortEventsWithFeatured } from '../../src/lib/utils/eventSorting';

interface Row {
  id: string;
  title: string;
  /** The DISPLAY string, with no year. */
  date: string;
  /** The ISO date. */
  rawDate: string;
  isFeatured: boolean;
}

/** How the page renders a date: weekday, month, day. No year. */
function displayString(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** The OLD sort key: the display string, parsed by new Date(). */
function oldSortKey(r: Row): number {
  return new Date(displayString(r.rawDate)).getTime();
}

const ROWS: Row[] = [
  { id: 'a', title: 'So Long Summer', rawDate: '2026-11-27', isFeatured: false },
  { id: 'b', title: 'New Year Eve', rawDate: '2026-12-31', isFeatured: false },
  { id: 'c', title: 'Bahrain Card Show', rawDate: '2027-01-08', isFeatured: false },
  { id: 'd', title: 'Sapan Verma', rawDate: '2027-02-05', isFeatured: false },
  { id: 'e', title: 'F1 Grand Prix', rawDate: '2027-03-12', isFeatured: false },
  { id: 'f', title: 'Andre Rieu', rawDate: '2027-03-19', isFeatured: false },
  { id: 'g', title: 'Devdas', rawDate: '2027-10-22', isFeatured: false },
].map((r) => ({ ...r, date: displayString(r.rawDate) }));

function main() {
  console.log('today (the reference year): 2026');
  console.log('');
  console.log('--- OLD ORDER (sorted by the display string, as the page did) ---');
  for (const r of [...ROWS].sort((a, b) => oldSortKey(a) - oldSortKey(b))) {
    console.log(`   ${r.date.padEnd(14)} (${r.rawDate})  ${r.title}`);
  }

  console.log('');
  console.log('--- NEW ORDER (sorted by the ISO date) ---');
  const newOrder = sortEventsWithFeatured(ROWS);
  for (const r of newOrder) {
    console.log(`   ${r.date.padEnd(14)} (${r.rawDate})  ${r.title}`);
  }

  console.log('');
  const expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  const actual = newOrder.map((r) => r.id);
  const chronological = actual.join(',') === expected.join(',');
  console.log('new order is strictly chronological:', chronological);
  console.log('  expected:', expected.join(','));
  console.log('  actual  :', actual.join(','));

  const oldOrder = [...ROWS].sort((a, b) => oldSortKey(a) - oldSortKey(b)).map((r) => r.id);
  console.log('  old order:', oldOrder.join(','));
  console.log('  the old order put the 2027 events FIRST:', oldOrder.slice(0, 3).join(',') === 'c,d,e');

  // Determinism: the same input must always produce the same output.
  const shuffled = [...ROWS].reverse();
  const a1 = sortEventsWithFeatured(ROWS).map((r) => r.id).join(',');
  const a2 = sortEventsWithFeatured(shuffled).map((r) => r.id).join(',');
  console.log('');
  console.log('deterministic across input order:', a1 === a2);
  if (a1 !== a2) {
    console.log('  run1:', a1);
    console.log('  run2:', a2);
  }

  if (!chronological || a1 !== a2) {
    console.log('');
    console.log('RESULT: FAIL');
    process.exit(1);
  }
  console.log('');
  console.log('RESULT: PASS');
}

main();
