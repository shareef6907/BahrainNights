import { getAdminClient } from '@/lib/supabase/server';
import type { PublicUser, PublicUserInsert, PublicUserUpdate } from '@/types/database';

// Helper to get untyped client for new tables
// This is needed until the database schema is synced
function getUntypedClient() {
  return getAdminClient() as any;
}

// Get public user by Google ID
export async function getPublicUserByGoogleId(googleId: string): Promise<PublicUser | null> {
  const supabase = getUntypedClient();

  const { data, error } = await supabase
    .from('public_users')
    .select('*')
    .eq('google_id', googleId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error fetching public user by Google ID:', error);
    throw new Error('Failed to fetch public user');
  }

  return data as PublicUser;
}

// Get public user by ID
export async function getPublicUserById(id: string): Promise<PublicUser | null> {
  const supabase = getUntypedClient();

  const { data, error } = await supabase
    .from('public_users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching public user by ID:', error);
    throw new Error('Failed to fetch public user');
  }

  return data as PublicUser;
}

// Get public user by email
export async function getPublicUserByEmail(email: string): Promise<PublicUser | null> {
  const supabase = getUntypedClient();

  const { data, error } = await supabase
    .from('public_users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching public user by email:', error);
    throw new Error('Failed to fetch public user');
  }

  return data as PublicUser;
}

// Create or update public user (upsert on Google login)
export async function upsertPublicUser(user: {
  google_id: string;
  email: string;
  name?: string | null;
  avatar_url?: string | null;
}): Promise<PublicUser> {
  const supabase = getUntypedClient();

  const { data, error } = await supabase
    .from('public_users')
    .upsert(
      {
        google_id: user.google_id,
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'google_id',
      }
    )
    .select()
    .single();

  if (error) {
    console.error('Error upserting public user:', error);
    throw new Error('Failed to create/update public user');
  }

  return data as PublicUser;
}

// Update public user
export async function updatePublicUser(id: string, updates: PublicUserUpdate): Promise<PublicUser> {
  const supabase = getUntypedClient();

  const { data, error } = await supabase
    .from('public_users')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating public user:', error);
    throw new Error('Failed to update public user');
  }

  return data as PublicUser;
}

// Update last login
export async function updatePublicUserLastLogin(id: string): Promise<void> {
  const supabase = getUntypedClient();

  const { error } = await supabase
    .from('public_users')
    .update({
      last_login: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating last login:', error);
  }
}
