import { getAdminClient } from '@/lib/supabase/server';
import type { User, UserInsert, UserUpdate } from '@/types/database';
import bcrypt from 'bcryptjs';

export interface UserFilters {
  role?: User['role'] | 'all';
  status?: User['status'] | 'all';
  search?: string;
  limit?: number;
  offset?: number;
}

// Get all users with optional filters
export async function getUsers(filters: UserFilters = {}): Promise<User[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.role && filters.role !== 'all') {
    query = query.eq('role', filters.role);
  }

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.search) {
    query = query.ilike('email', `%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }

  return (data || []) as User[];
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching user by email:', error);
    throw new Error('Failed to fetch user');
  }

  return data as User;
}

// Get user by ID
export async function getUserById(id: string): Promise<User | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching user by ID:', error);
    throw new Error('Failed to fetch user');
  }

  return data as User;
}

// Create user
export async function createUser(userData: {
  email: string;
  password: string;
  role?: User['role'];
}): Promise<User> {
  const supabase = getAdminClient();

  // Hash password
  const passwordHash = await bcrypt.hash(userData.password, 12);

  const { data, error } = await supabase
    .from('users')
    .insert({
      email: userData.email.toLowerCase(),
      password_hash: passwordHash,
      role: userData.role || 'venue_owner',
    } as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    if (error.code === '23505') {
      throw new Error('Email already exists');
    }
    throw new Error('Failed to create user');
  }

  return data as User;
}

// Update user
export async function updateUser(id: string, updates: UserUpdate): Promise<User> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }

  return data as User;
}

// Delete user
export async function deleteUser(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}

// Verify password
export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    return null;
  }

  return user;
}

// Update password
export async function updatePassword(id: string, newPassword: string): Promise<void> {
  const passwordHash = await bcrypt.hash(newPassword, 12);

  await updateUser(id, { password_hash: passwordHash });
}

// Update last login
export async function updateLastLogin(id: string): Promise<void> {
  await updateUser(id, { last_login: new Date().toISOString() });
}

// Suspend user
export async function suspendUser(id: string): Promise<User> {
  return updateUser(id, { status: 'suspended' });
}

// Activate user
export async function activateUser(id: string): Promise<User> {
  return updateUser(id, { status: 'active' });
}

// Change user role
export async function changeUserRole(id: string, role: User['role']): Promise<User> {
  return updateUser(id, { role });
}

// Count users by role
export async function countUsersByRole(): Promise<Record<string, number>> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('users')
    .select('role');

  if (error) {
    console.error('Error counting users:', error);
    return {};
  }

  const users = (data || []) as { role: string }[];
  const counts: Record<string, number> = {
    total: users.length,
    venue_owner: 0,
    admin: 0,
  };

  users.forEach(u => {
    counts[u.role] = (counts[u.role] || 0) + 1;
  });

  return counts;
}

// Password reset token functions
export async function createPasswordResetToken(userId: string): Promise<string> {
  const supabase = getAdminClient();

  // Generate random token
  const token = crypto.randomUUID() + crypto.randomUUID();

  // Token expires in 1 hour
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  const { error } = await supabase
    .from('password_reset_tokens')
    .insert({
      user_id: userId,
      token,
      expires_at: expiresAt,
    } as any);

  if (error) {
    console.error('Error creating reset token:', error);
    throw new Error('Failed to create reset token');
  }

  return token;
}

export async function verifyPasswordResetToken(token: string): Promise<string | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('password_reset_tokens')
    .select('user_id, expires_at, used')
    .eq('token', token)
    .single();

  if (error || !data) {
    return null;
  }

  const tokenData = data as { user_id: string; expires_at: string; used: boolean };

  // Check if token is expired or used
  if (tokenData.used || new Date(tokenData.expires_at) < new Date()) {
    return null;
  }

  return tokenData.user_id;
}

export async function usePasswordResetToken(token: string): Promise<void> {
  const supabase = getAdminClient();

  await (supabase as any)
    .from('password_reset_tokens')
    .update({ used: true })
    .eq('token', token);
}
