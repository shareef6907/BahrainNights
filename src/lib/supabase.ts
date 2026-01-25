import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to prevent build-time errors when env vars aren't available
let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

// Client-side Supabase client (uses anon key)
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_supabase) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) {
        throw new Error('Supabase environment variables are not configured');
      }
      _supabase = createClient(url, key);
    }
    return (_supabase as any)[prop];
  }
});

// Server-side Supabase client (uses service role key for admin operations)
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_supabaseAdmin) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url || !serviceKey) {
        throw new Error('Supabase admin environment variables are not configured');
      }
      _supabaseAdmin = createClient(url, serviceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
    }
    return (_supabaseAdmin as any)[prop];
  }
});
