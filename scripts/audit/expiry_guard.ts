/**
 * THE EXPIRY GUARD.
 *
 * ONE EXPIRED EVENT ON /events = ALERT.
 *
 * The site must tell us it is wrong before a visitor does.
 *
 * This is the same class of guard as the hero pixel check: it runs on a
 * schedule against PRODUCTION, and it fails loudly.
 *
 * WHAT IT CHECKS
 * --------------
 * It fetches the live /events page and reads every event it renders, then
 * resolves each one's effective END INSTANT - using the same shared
 * resolver the app uses, and the same max(end_time, 03:00) rule.
 *
 * An event whose end instant is in the past is EXPIRED and must not be on
 * the page. One is a failure.
 *
 * It also checks the reverse: that the page is not EMPTY. An empty events
 * page is the failure mode the missing-column bug produced, and it is
 * just as bad as a dead event on the page.
 *
 * Run: npx tsx scripts/audit/expiry_guard.ts [url]
 *       --json for a machine-readable result
 */
import { chromium } from 'playwright';
import { resolveEventTimes } from '../../src/lib/utils/event-times';

const URL = process.argv[2] || 'https://www.bahrainnights.com/events';
const AS_JSON = process.argv.includes('--json');
const EXEC = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

interface RenderedEvent {
  title: string;
  href: string;
  /** The date text the card prints, e.g. "Fri, Nov 27 · 20:00 - 03:00". */
  label: string;
}

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: EXEC });
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 823 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  // The rendered cards. The href carries the slug; the card text carries
  // the title and the date label.
  const rendered: RenderedEvent[] = await page.evaluate(`(() => {
    var out = [];
    var cards = document.querySelectorAll('[data-testid="event-card"]');
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var a = c.closest('a[href^="/events/"]');
      var h3 = c.querySelector('h3');
      var text = (c.textContent || '').replace(/\\s+/g, ' ').trim();
      out.push({
        title: h3 ? h3.textContent.trim() : '',
        href: a ? a.getAttribute('href') || '' : '',
        label: text.slice(0, 240),
      });
    }
    return out;
  })()`);

  const countText = await page.evaluate(`(() => {
    var m = document.body.textContent.match(/(\\d+)\\s+events found/);
    return m ? m[1] : null;
  })()`);

  // Fetch each rendered event's row so the end instant can be resolved
  // from the DATABASE, exactly as the app does.
  const { createClient } = await import('@supabase/supabase-js');
  const { readFileSync } = await import('fs');
  const env: Record<string, string> = {};
  try {
    for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {}
  const e2 = { ...env, ...(process.env as Record<string, string>) };
  const supabase = createClient(
    e2.NEXT_PUBLIC_SUPABASE_URL || e2.SUPABASE_URL!,
    e2.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const slugs = rendered.map((r) => r.href.split('/').filter(Boolean).pop()).filter(Boolean) as string[];
  const rows: any[] = [];
  for (let i = 0; i < slugs.length; i += 100) {
    const chunk = slugs.slice(i, i + 100);
    const { data } = await supabase
      .from('events')
      .select('id, title, slug, date, start_date, end_date, time, start_time, end_time, category, end_at, starts_at, is_overnight, status, is_hidden')
      .in('slug', chunk);
    for (const d of data || []) rows.push(d);
  }

  const now = Date.now();
  const expired: { title: string; end_at: string | null; label: string }[] = [];
  const unresolved: { title: string; label: string }[] = [];
  const checked: { title: string; end_at: string | null }[] = [];

  for (const r of rendered) {
    const slug = r.href.split('/').filter(Boolean).pop();
    const row = rows.find((x) => x.slug === slug);
    if (!row) {
      unresolved.push({ title: r.title || slug || '(unknown)', label: r.label });
      continue;
    }
    // The SAME resolver the app uses, so the guard and the site agree.
    const resolved = resolveEventTimes(row);
    // The database's own end_at wins when it exists - it is what the
    // listing filter actually uses.
    const endAt = row.end_at || resolved.end_at;
    checked.push({ title: row.title, end_at: endAt });
    if (!endAt) {
      // A row with no resolvable end is EXPIRED and must not be shown.
      expired.push({ title: row.title, end_at: null, label: r.label });
      continue;
    }
    if (Date.parse(endAt) <= now) {
      expired.push({ title: row.title, end_at: endAt, label: r.label });
    }
  }

  const result = {
    url: URL,
    checkedAt: new Date().toISOString(),
    renderedCards: rendered.length,
    reportedCount: countText === null ? null : Number(countText),
    resolvedFromDb: checked.length,
    expiredOnPage: expired.length,
    unresolved: unresolved.length,
    expired: expired.map((x) => ({ title: x.title, end_at: x.end_at })),
    unresolvedTitles: unresolved.map((x) => x.title),
  };

  if (AS_JSON) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('=== THE EXPIRY GUARD ===');
    console.log(`  URL              : ${URL}`);
    console.log(`  checked at       : ${result.checkedAt}`);
    console.log(`  rendered cards   : ${rendered.length}`);
    console.log(`  reported count   : ${result.reportedCount}`);
    console.log(`  resolved from db : ${checked.length}`);
    console.log(`  EXPIRED ON PAGE  : ${expired.length}`);
    console.log(`  unresolved       : ${unresolved.length}`);
    if (expired.length) {
      console.log('');
      console.log('  === THE EXPIRED EVENTS ON THE PAGE ===');
      for (const x of expired) console.log(`    ${x.title}  (end_at=${x.end_at})`);
    }
    if (unresolved.length) {
      console.log('');
      console.log('  === RENDERED BUT NOT FOUND IN THE DB ===');
      for (const t of result.unresolvedTitles.slice(0, 10)) console.log(`    ${t}`);
    }
  }

  await browser.close();

  // The page being empty is a failure too - it is the failure the
  // missing-column bug produced.
  const empty = rendered.length === 0;
  if (expired.length > 0 || empty) {
    console.error('');
    console.error('==========================================================');
    console.error('EXPIRY GUARD: FAILED');
    if (expired.length) {
      console.error(`${expired.length} event(s) on the page have already ended.`);
    }
    if (empty) {
      console.error('The page rendered NO events. That is a failure, not a quiet page.');
    }
    console.error('==========================================================');
    process.exit(1);
  }
  console.log('');
  console.log('EXPIRY GUARD: PASSED - no expired event is on the page');
}

main();
