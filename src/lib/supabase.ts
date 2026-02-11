import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Check if Supabase is configured
const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
);

// Mock query builder for when Supabase isn't configured
function createMockQueryBuilder() {
  const builder: Record<string, unknown> = {
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    upsert: () => builder,
    eq: () => builder,
    neq: () => builder,
    gt: () => builder,
    gte: () => builder,
    lt: () => builder,
    lte: () => builder,
    like: () => builder,
    ilike: () => builder,
    is: () => builder,
    in: () => builder,
    contains: () => builder,
    containedBy: () => builder,
    range: () => builder,
    overlaps: () => builder,
    textSearch: () => builder,
    match: () => builder,
    not: () => builder,
    or: () => builder,
    filter: () => builder,
    order: () => builder,
    limit: () => builder,
    offset: () => builder,
    single: () => Promise.resolve({ data: null, error: null }),
    maybeSingle: () => Promise.resolve({ data: null, error: null }),
    then: (resolve: (value: { data: null; error: null; count: null }) => void) => 
      Promise.resolve({ data: null, error: null, count: null }).then(resolve),
  };
  return builder;
}

// Create mock client for builds without env vars
function createMockClient(): SupabaseClient {
  return {
    from: () => createMockQueryBuilder(),
    rpc: () => Promise.resolve({ data: null, error: null }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        download: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
  } as unknown as SupabaseClient;
}

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
        console.warn('Supabase client env vars not configured - using mock client');
        _supabase = createMockClient();
      } else {
        _supabase = createClient(url, key);
      }
    }
    return (_supabase as unknown as Record<string, unknown>)[prop as string];
  }
});

// Server-side Supabase client (uses service role key for admin operations)
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_supabaseAdmin) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url || !serviceKey) {
        console.warn('Supabase admin env vars not configured - using mock client');
        _supabaseAdmin = createMockClient();
      } else {
        _supabaseAdmin = createClient(url, serviceKey, {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        });
      }
    }
    return (_supabaseAdmin as unknown as Record<string, unknown>)[prop as string];
  }
});

// Export config check
export { isSupabaseConfigured };
