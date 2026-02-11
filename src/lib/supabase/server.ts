import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export type TypedSupabaseClient = ReturnType<typeof createClient<Database>>;

// Check if Supabase is configured
const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Mock client for when Supabase isn't configured (local dev without env vars)
// Returns empty results for all queries to allow builds to succeed
function createMockClient(): TypedSupabaseClient {
  const mockQueryBuilder = () => {
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
  };

  return {
    from: () => mockQueryBuilder(),
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
  } as unknown as TypedSupabaseClient;
}

function createTypedClient(): TypedSupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !serviceKey) {
    console.warn('Supabase environment variables not configured - using mock client');
    return createMockClient();
  }
  
  return createClient<Database>(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Server client for server components (uses cookies for auth)
export async function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !anonKey) {
    console.warn('Supabase environment variables not configured - using mock client');
    return createMockClient();
  }
  
  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

// Admin client for server-side operations (uses service role key)
// This bypasses RLS and should only be used for admin operations
export function createAdminClient(): TypedSupabaseClient {
  return createTypedClient();
}

// Helper to get admin client instance (lazy initialization)
let adminClientInstance: TypedSupabaseClient | null = null;

export function getAdminClient(): TypedSupabaseClient {
  if (!adminClientInstance) {
    adminClientInstance = createAdminClient();
  }
  return adminClientInstance;
}

// Export config check for conditional page rendering
export { isSupabaseConfigured };
