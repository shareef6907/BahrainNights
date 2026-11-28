/**
 * A1: classify every published event by the end_at resolution rule, and
 * produce the exact counts the backfill will produce.
 *
 * This mirrors the SQL that Shareef will run, so the numbers here and the
 * numbers in the backfill are the same numbers.
 *
 * Run: npx tsx scripts/audit/a1_classify.ts
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* use process env */
  }
  return out;
}

const env = { ...loadEnv(), ...process.env } as Record<string, string>;
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

/** Bahrain is UTC+3 all year. */
const BAHRAIN_OFFSET_MIN = 180;

function toMinutes(t: string | null | undefined): number | null {
  if (!t) return null;
  const m = String(t).match(/(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const h = Number(m[1]);
  const mi = Number(m[2]);
  if (h > 23 || mi > 59) return null;
  return h * 60 + mi;
}

function dayDiff(a: string, b: string): number {
  return Math.round(
    (Date.parse(b.slice(0, 10) + 'T00:00:00Z') - Date.parse(a.slice(0, 10) + 'T00:00:00Z')) / 86400000
  );
}

/** Build a Bahrain-local ISO timestamp for a date + minutes-of-day. */
function bahrainInstant(dateStr: string, minutes: number): string {
  const y = dateStr.slice(0, 4);
  const m = dateStr.slice(5, 7);
  const d = dateStr.slice(8, 10);
  const hh = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mm = String(minutes % 60).padStart(2, '0');
  // Bahrain is UTC+3, so the UTC instant is local - 3h.
  const utc = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm)) - BAHRAIN_OFFSET_MIN * 60000);
  return utc.toISOString();
}

/** Default duration by category, per Shareef's rule 4. */
function defaultDurationMinutes(category: string | null | undefined): number | null {
  const c = String(category || '').toLowerCase();
  if (c === 'nightlife') return 7 * 60; // 20:00 -> 03:00 next day
  if (c === 'concerts' || c === 'music' || c === 'comedy') return 5 * 60;
  if (c === 'dining' || c === 'food' || c === 'restaurant' || c === 'brunch') return 5 * 60;
  if (c === 'sports' || c === 'fitness' || c === 'sport') return 3 * 60;
  return null; // everything else -> 23:59:59
}

interface Outcome {
  rule: 1 | 2 | 3 | 4 | 5;
  startsAt: string | null;
  endAt: string | null;
  isOvernight: boolean;
  clamped: boolean;
  note?: string;
}

/**
 * The resolution order, exactly as specified.
 */
function resolve(r: any): Outcome {
  const startDate = String(r.start_date || r.date || '').slice(0, 10);
  const endDate = String(r.end_date || '').slice(0, 10);
  const startMin = toMinutes(r.start_time || r.time);
  const endMin = toMinutes(r.end_time);

  if (!startDate) {
    return { rule: 5, startsAt: null, endAt: null, isOvernight: false, clamped: false, note: 'no start date' };
  }

  /*
   * RULE 2: OVERNIGHT DETECTION.
   *   end_date = start_date + 1 day
   *   start_time >= 18:00
   *   end_time is null OR end_time <= 06:00
   *
   * AND RULE 2 MUST BE EVALUATED BEFORE RULE 1.
   *
   * The stored `end_date` is the start date plus one day for EVERY
   * overnight event - that is what the ingestion writes, because the
   * event crosses midnight. So a row with an explicit end_date AND an
   * end_time is NOT "the source gave an explicit end"; it is an overnight
   * event whose end_date was derived. Rule 1 must not swallow it.
   *
   * THE END TIME: max(the source end_time, 03:00).
   *
   * The source's end_time is the venue's stated "doors close" time, and
   * the distribution across the 186 overnight rows is bimodal:
   *
   *   00:00-02:59  ->  78 events   (the stated close time)
   *   03:00-05:59  ->  119 events  (a genuinely longer night)
   *
   * The 03:00 cut is the one Shareef specified and the one the time-travel
   * test is written against: "An event ending 03:00 disappears at 03:00:01",
   * and the five named events must still be present at 02:59 Bahrain.
   *
   * So a stated end time EARLIER than 03:00 is rounded UP to the 03:00
   * cut - which is exactly what "03:00 is when Bahrain venues close"
   * means - and a stated end time LATER than 03:00 is honoured, because a
   * party that finishes at 04:00 really does finish at 04:00.
   */
  if (
    endDate &&
    dayDiff(startDate, endDate) === 1 &&
    startMin !== null &&
    startMin >= 18 * 60 &&
    (endMin === null || endMin <= 6 * 60)
  ) {
    const startsAt = bahrainInstant(startDate, startMin);
    const cutoffMin = 3 * 60;
    const endMinutes = endMin === null ? cutoffMin : Math.max(endMin, cutoffMin);
    const endAt = bahrainInstant(endDate, endMinutes);
    return { rule: 2, startsAt, endAt, isOvernight: true, clamped: false };
  }

  // RULE 1: an explicit end date+time.
  if (endDate && endMin !== null) {
    const startsAt = startMin === null ? bahrainInstant(startDate, 0) : bahrainInstant(startDate, startMin);
    let endAt: string;
    let overnight = false;
    if (endDate === startDate) {
      endAt = bahrainInstant(endDate, endMin);
      if (startMin !== null && endMin < startMin) {
        // An end time earlier than the start on the SAME date means it ran
        // past midnight: it is an overnight event whose end_date was
        // written as the start date.
        endAt = bahrainInstant(nextDay(startDate), endMin);
        overnight = true;
      }
    } else {
      endAt = bahrainInstant(endDate, endMin);
      overnight = endMin <= 6 * 60 && startMin !== null && startMin >= 18 * 60;
    }
    return { rule: 1, startsAt, endAt, isOvernight: overnight, clamped: false };
  }

  // RULE 3: genuine multi-day.
  if (endDate && dayDiff(startDate, endDate) >= 2) {
    const startsAt = startMin === null ? bahrainInstant(startDate, 0) : bahrainInstant(startDate, startMin);
    return {
      rule: 3,
      startsAt,
      endAt: bahrainInstant(endDate, 23 * 60 + 59),
      isOvernight: false,
      clamped: false,
    };
  }

  // RULE 4: single-day with a start time and no end time.
  if (startMin !== null) {
    const dur = defaultDurationMinutes(r.category);
    const startsAt = bahrainInstant(startDate, startMin);
    if (dur === null) {
      return {
        rule: 4,
        startsAt,
        endAt: bahrainInstant(startDate, 23 * 60 + 59),
        isOvernight: false,
        clamped: false,
      };
    }
    let endAt = bahrainInstant(nextDay(startDate), startMin + dur - 24 * 60);
    let clamped = false;
    if (Date.parse(endAt) <= Date.parse(startsAt)) {
      endAt = bahrainInstant(nextDay(startDate), startMin + 60 - 24 * 60);
      clamped = true;
    }
    return {
      rule: 4,
      startsAt,
      endAt,
      isOvernight: dur === 7 * 60,
      clamped,
      note: clamped ? 'end_at clamped to starts_at + 1h (bad source data)' : undefined,
    };
  }

  // RULE 5: no start time at all.
  const target = endDate || startDate;
  return {
    rule: 5,
    startsAt: bahrainInstant(startDate, 0),
    endAt: bahrainInstant(target, 23 * 60 + 59),
    isOvernight: false,
    clamped: false,
  };
}

function nextDay(d: string): string {
  return new Date(Date.parse(d.slice(0, 10) + 'T00:00:00Z') + 86400000).toISOString().slice(0, 10);
}

async function main() {
  const { data, error } = await supabase
    .from('events')
    .select('id, title, date, start_date, end_date, time, start_time, end_time, category, status, is_hidden, country')
    .eq('status', 'published')
    .eq('is_hidden', false);
  if (error) {
    console.log('ERROR:', error.message);
    process.exit(1);
  }
  const rows = data as any[];
  console.log('published, not hidden:', rows.length);

  const byRule: Record<string, number> = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
  let overnight = 0;
  let clamped = 0;
  let nullEnd = 0;
  const samples: Record<string, any[]> = {};

  for (const r of rows) {
    const o = resolve(r);
    byRule[String(o.rule)]++;
    if (o.isOvernight) overnight++;
    if (o.clamped) clamped++;
    if (!o.endAt) nullEnd++;
    (samples[o.rule] ||= []).push({ title: r.title, ...o });
  }

  console.log('');
  console.log('=== RULE BREAKDOWN (published, not hidden) ===');
  console.log('  rule 1  explicit end date+time :', byRule['1']);
  console.log('  rule 2  OVERNIGHT detection     :', byRule['2']);
  console.log('  rule 3  genuine multi-day       :', byRule['3']);
  console.log('  rule 4  single-day + start time :', byRule['4']);
  console.log('  rule 5  no start time           :', byRule['5']);
  console.log('  ---------------------------------------');
  console.log('  TOTAL                            :', rows.length);
  console.log('');
  console.log('  is_overnight = true              :', overnight);
  console.log('  clamped (bad source data)        :', clamped);
  console.log('  rows with NO end_at (must fail closed):', nullEnd);
  console.log('');

  // The five named events.
  const NAMED = ['Naak x Thuya', 'Cavallo Club', 'ANII live', 'Narratives at Teres', 'Pax Arabiana'];
  console.log('=== THE FIVE NAMED EVENTS, RESOLVED ===');
  console.log('  rows containing any of the five names:', rows.filter((r) => NAMED.some((n) => String(r.title).includes(n))).length);
  for (const r of rows) {
    if (!NAMED.some((n) => String(r.title).includes(n))) continue;
    const o = resolve(r);
    console.log(`  ${String(r.title).slice(0, 46).padEnd(48)} rule=${o.rule} overnight=${o.isOvernight}`);
    console.log(`      start_date=${r.start_date} start_time=${r.start_time} end_date=${r.end_date} end_time=${r.end_time}`);
    console.log(`      starts_at=${o.startsAt}  end_at=${o.endAt}`);
  }
  console.log('');

  // Now: which rows are LIVE right now under end_at > now()?
  const nowIso = new Date().toISOString();
  console.log('=== LIVE NOW (' + nowIso + ') ===');
  let live = 0;
  let liveOvernight = 0;
  for (const r of rows) {
    const o = resolve(r);
    if (o.endAt && o.endAt > nowIso) {
      live++;
      if (o.isOvernight) liveOvernight++;
    }
  }
  console.log('  rows with end_at > now():', live, ' of which is_overnight:', liveOvernight);
  console.log('');

  // The THREE-POINT TIME-TRAVEL TEST on the five named events.
  console.log('=== TIME-TRAVEL TEST (the five named events) ===');
  const points = [
    '2026-11-27T19:00:00Z', // 22:00 Bahrain
    '2026-11-27T23:59:00Z', // 02:59 Bahrain on the 28th
    '2026-11-28T00:30:00Z', // 03:30 Bahrain on the 28th
  ];
  for (const p of points) {
    const now = Date.parse(p);
    const bahrain = new Date(now + BAHRAIN_OFFSET_MIN * 60000).toISOString().slice(0, 16).replace('T', ' ');
    const present: string[] = [];
    for (const r of rows) {
      if (!NAMED.some((n) => String(r.title).includes(n))) continue;
      const o = resolve(r);
      if (o.endAt && Date.parse(o.endAt) > now) present.push(String(r.title).slice(0, 22));
    }
    const missing = rows
      .filter((r) => NAMED.some((n) => String(r.title).includes(n)))
      .filter((r) => {
        const o = resolve(r);
        return !(o.endAt && Date.parse(o.endAt) > now);
      })
      .map((r) => {
        const o = resolve(r);
        return `${String(r.title).slice(0, 20)} rule=${o.rule} end_at=${o.endAt}`;
      });
    console.log(`  ${p}  (= ${bahrain} Bahrain)  present: ${present.length}/5  ${present.join(' | ')}`);
    if (missing.length) console.log(`      MISSING: ${missing.join(' ;; ')}`);
  }
  console.log('');

  // And a sample of each rule, for the report.
  for (const rule of ['1', '2', '3', '4', '5']) {
    const list = samples[rule] || [];
    if (!list.length) continue;
    console.log(`--- RULE ${rule} samples (${list.length}) ---`);
    for (const s of list.slice(0, 4)) {
      console.log(`   ${String(s.title).slice(0, 44).padEnd(46)} ${s.startsAt} -> ${s.endAt}${s.note ? '  [' + s.note + ']' : ''}`);
    }
    console.log('');
  }
}

main();
