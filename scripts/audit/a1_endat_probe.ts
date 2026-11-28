/**
 * What does the listing query actually return, and what is the exact error
 * when `end_at` does not exist?
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
  } catch {}
  return out;
}
const env = { ...loadEnv(), ...process.env } as Record<string, string>;
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function main() {
  const q = await supabase
    .from('events')
    .select('id, title, end_at')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .gt('end_at', new Date().toISOString())
    .order('end_at', { ascending: true, nullsFirst: false });

  console.log('=== THE LISTING QUERY, VERBATIM ===');
  console.log('  error   :', q.error ? JSON.stringify(q.error) : 'none');
  console.log('  message :', q.error?.message ?? '(none)');
  console.log('  code    :', (q.error as any)?.code ?? '(none)');
  console.log('  details :', (q.error as any)?.details ?? '(none)');
  console.log('  hint    :', (q.error as any)?.hint ?? '(none)');
  console.log('  rows    :', (q.data || []).length);
  console.log('');
  console.log('  does the error mention end_at?',
    q.error ? /end_at/i.test(q.error.message || '') : 'n/a');
}

main();
