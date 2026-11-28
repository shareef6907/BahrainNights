/**
 * THE TIME PARSER FIXTURES.
 *
 * The parity test passed 993/993 ONLY because it never hit a malformed
 * value. That is a gap in the TEST, not a clean result.
 *
 * These fixtures include every malformed shape that is actually in the
 * database, so the test would have caught the gap.
 *
 * Run: npx tsx scripts/audit/a1_time_fixtures.ts
 */
import {
  parseTimeToMinutes,
  parseEndTimeToMinutes,
  normaliseTimeToHHMM,
  splitTimeRange,
  isStrictTime,
} from '../../src/lib/utils/time-parsing';

interface Fixture {
  input: string | null;
  /** minutes since midnight, or null */
  start: number | null;
  /** minutes since midnight, or null */
  end: number | null;
  /** where the shape comes from */
  note: string;
}

const FIXTURES: Fixture[] = [
  // --- THE MALFORMED VALUES THAT ARE IN THE DATABASE TODAY ---
  { input: '05:00 PM - 12:00 AM', start: 17 * 60, end: 0, note: 'DB: a real row, overnight range' },
  { input: '06:00 PM - 11:00 PM', start: 18 * 60, end: 23 * 60, note: 'DB: a real row' },
  { input: '06:00 PM - 12:00 AM', start: 18 * 60, end: 0, note: 'DB: a real row, overnight range' },
  { input: '10:00 AM - 10:00 PM', start: 10 * 60, end: 22 * 60, note: 'DB: a real row, daytime range' },
  { input: '04:00 PM - 12:00 AM', start: 16 * 60, end: 0, note: 'DB: a real row, overnight range' },
  { input: '07:00 PM', start: 19 * 60, end: null, note: 'DB: a real row, 12-hour single' },
  { input: '04:00 PM', start: 16 * 60, end: null, note: 'DB: a real row, 12-hour single' },

  // --- THE SHAPES THE SCRAPER CAN PRODUCE ---
  { input: '06:00 PM - 10:00 PM', start: 18 * 60, end: 22 * 60, note: 'scraper: the documented wrapper format' },
  { input: 'From 6:00 PM to 10:00 PM', start: 18 * 60, end: 22 * 60, note: 'scraper: prose form' },
  { input: 'from 6:00 PM to 10 PM', start: 18 * 60, end: 22 * 60, note: 'scraper: prose, no leading zero' },
  { input: '12:00 AM - 11:00 PM', start: 0, end: 23 * 60, note: 'scraper: midnight start' },
  { input: '12:00 PM - 11:00 PM', start: 12 * 60, end: 23 * 60, note: 'scraper: noon start' },
  { input: '12:00 AM', start: 0, end: null, note: 'scraper: midnight' },
  { input: '12:00 PM', start: 12 * 60, end: null, note: 'scraper: noon' },

  // --- THE WELL-FORMED VALUES ---
  { input: '20:00', start: 20 * 60, end: null, note: 'the normal 24-hour value' },
  { input: '20:00:00', start: 20 * 60, end: null, note: 'with seconds' },
  { input: '09:30', start: 9 * 60 + 30, end: null, note: 'with minutes' },
  { input: '9:30', start: 9 * 60 + 30, end: null, note: 'no leading zero' },
  { input: '02:30', start: 2 * 60 + 30, end: null, note: 'the small hours' },

  // --- THE UNPARSEABLE ONES: these must be null, and EXPIRED ---
  { input: 'TBA', start: null, end: null, note: 'to be announced' },
  { input: '', start: null, end: null, note: 'empty' },
  { input: null, start: null, end: null, note: 'null' },
  { input: '   ', start: null, end: null, note: 'whitespace' },
  { input: 'Later', start: null, end: null, note: 'prose with no time' },
  { input: '99:99', start: null, end: null, note: 'out of range' },
];

async function main() {
  console.log('=== THE TIME PARSER FIXTURES ===');
  console.log('');
  console.log('  input                              start    end      ok');
  console.log('  ' + '-'.repeat(66));

  let failures = 0;
  for (const f of FIXTURES) {
    const s = parseTimeToMinutes(f.input);
    const e = parseEndTimeToMinutes(f.input);
    const ok = s === f.start && e === f.end;
    if (!ok) failures++;
    const fmt = (n: number | null) =>
      n === null ? '  null ' : `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
    console.log(
      `  ${String(f.input === null ? '(null)' : JSON.stringify(f.input)).padEnd(34)} ${fmt(s)}  ${fmt(e)}   ${ok ? 'ok' : 'FAIL'}`
    );
  }

  console.log('');
  console.log('  fixtures:', FIXTURES.length, ' failures:', failures);
  console.log('');

  // The ingestion helpers.
  console.log('=== THE INGESTION SPLIT ===');
  for (const f of FIXTURES) {
    const split = splitTimeRange(f.input);
    console.log(
      `  ${String(f.input === null ? '(null)' : JSON.stringify(f.input)).padEnd(34)} -> start=${String(split.start).padEnd(6)} end=${String(split.end).padEnd(6)}`
    );
  }
  console.log('');

  // The strict test.
  console.log('=== THE STRICT TEST (what may be written to a time column) ===');
  for (const v of ['20:00', '20:00:00', '05:00 PM - 12:00 AM', 'TBA', '', null]) {
    console.log(`  ${String(v === null ? '(null)' : JSON.stringify(v)).padEnd(28)} strict=${isStrictTime(v)}`);
  }
  console.log('');

  console.log('=== THE NORMALISED FORM ===');
  for (const v of ['05:00 PM - 12:00 AM', '07:00 PM', '20:00', 'TBA']) {
    console.log(`  ${String(JSON.stringify(v)).padEnd(28)} -> ${String(normaliseTimeToHHMM(v))}`);
  }
  console.log('');

  console.log(failures === 0
    ? 'RESULT: PASS - the parser handles every shape in the data'
    : `RESULT: FAIL - ${failures} fixture(s) wrong`);
  if (failures) process.exit(1);
}

main();
