import { getAdminClient } from '@/lib/supabase/server';
import type { Artist, ArtistInsert, ArtistUpdate, ArtistBookingRequest, ArtistBookingRequestInsert, ArtistCategory, ArtistStatus, ArtistTier } from '@/types/database';

// ============ ARTIST FILTERS ============
export interface ArtistFilters {
  category?: ArtistCategory | 'all';
  status?: ArtistStatus | 'all';
  tier?: ArtistTier | 'all';
  is_featured?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

// ============ GET ARTISTS ============

// Get all artists with optional filters
export async function getArtists(filters: ArtistFilters = {}): Promise<Artist[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('artists')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (filters.category && filters.category !== 'all') {
    query = query.eq('category', filters.category);
  }

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.tier && filters.tier !== 'all') {
    query = query.eq('tier', filters.tier);
  }

  if (filters.is_featured !== undefined) {
    query = query.eq('is_featured', filters.is_featured);
  }

  if (filters.search) {
    query = query.or(`stage_name.ilike.%${filters.search}%,real_name.ilike.%${filters.search}%,bio.ilike.%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === 'PGRST205') return [];
    console.error('Error fetching artists:', error);
    throw new Error('Failed to fetch artists');
  }

  return (data || []) as Artist[];
}

// Get public-facing approved artists
export async function getApprovedArtists(filters: Omit<ArtistFilters, 'status'> = {}): Promise<Artist[]> {
  return getArtists({ ...filters, status: 'approved' });
}

// Get artists by category (public)
export async function getArtistsByCategory(category: ArtistCategory): Promise<Artist[]> {
  return getArtists({ category, status: 'approved' });
}

// Get featured artists (public)
export async function getFeaturedArtists(): Promise<Artist[]> {
  return getArtists({ status: 'approved', is_featured: true });
}

// Get pending artists (admin)
export async function getPendingArtists(): Promise<Artist[]> {
  return getArtists({ status: 'pending' });
}

// Get artist by ID
export async function getArtistById(id: string): Promise<Artist | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116' || error.code === 'PGRST205') return null;
    console.error('Error fetching artist by ID:', error);
    throw new Error('Failed to fetch artist');
  }

  return data as Artist;
}

// Get artist by slug (public)
export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'approved')
    .single();

  if (error) {
    if (error.code === 'PGRST116' || error.code === 'PGRST205') return null;
    console.error('Error fetching artist by slug:', error);
    throw new Error('Failed to fetch artist');
  }

  return data as Artist;
}

// Get artist by slug (admin - any status)
export async function getArtistBySlugAdmin(slug: string): Promise<Artist | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116' || error.code === 'PGRST205') return null;
    console.error('Error fetching artist by slug:', error);
    throw new Error('Failed to fetch artist');
  }

  return data as Artist;
}

// ============ CREATE/UPDATE/DELETE ARTISTS ============

// Create artist
export async function createArtist(artist: ArtistInsert): Promise<Artist> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('artists')
    .insert(artist as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating artist:', error);
    throw new Error('Failed to create artist');
  }

  return data as Artist;
}

// Update artist
export async function updateArtist(id: string, updates: ArtistUpdate): Promise<Artist> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('artists')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating artist:', error);
    throw new Error('Failed to update artist');
  }

  return data as Artist;
}

// Delete artist
export async function deleteArtist(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('artists')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting artist:', error);
    throw new Error('Failed to delete artist');
  }
}

// ============ STATUS MANAGEMENT ============

// Approve artist
export async function approveArtist(id: string): Promise<Artist> {
  return updateArtist(id, { status: 'approved', rejection_reason: null });
}

// Reject artist
export async function rejectArtist(id: string, reason: string): Promise<Artist> {
  return updateArtist(id, { status: 'rejected', rejection_reason: reason });
}

// Suspend artist
export async function suspendArtist(id: string): Promise<Artist> {
  return updateArtist(id, { status: 'suspended' });
}

// Reactivate artist
export async function reactivateArtist(id: string): Promise<Artist> {
  return updateArtist(id, { status: 'approved' });
}

// Toggle featured status
export async function toggleFeatured(id: string, is_featured: boolean): Promise<Artist> {
  return updateArtist(id, { is_featured });
}

// ============ STATISTICS ============

// Count artists by status
export async function countArtistsByStatus(): Promise<Record<string, number>> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('artists')
    .select('status, category');

  if (error) {
    if (error.code === 'PGRST205') {
      return { total: 0, pending: 0, approved: 0, rejected: 0, suspended: 0 };
    }
    console.error('Error counting artists:', error);
    return {};
  }

  const artists = (data || []) as { status: string; category: string }[];
  const counts: Record<string, number> = {
    total: artists.length,
    pending: 0,
    approved: 0,
    rejected: 0,
    suspended: 0,
  };

  artists.forEach(a => {
    counts[a.status] = (counts[a.status] || 0) + 1;
  });

  return counts;
}

// Count artists by category
export async function countArtistsByCategory(): Promise<Record<string, number>> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('artists')
    .select('category')
    .eq('status', 'approved');

  if (error) {
    if (error.code === 'PGRST205') return {};
    console.error('Error counting artists by category:', error);
    return {};
  }

  const artists = (data || []) as { category: string }[];
  const counts: Record<string, number> = {};

  artists.forEach(a => {
    counts[a.category] = (counts[a.category] || 0) + 1;
  });

  return counts;
}

// ============ BOOKING REQUESTS ============

export interface BookingRequestFilters {
  status?: string | 'all';
  limit?: number;
  offset?: number;
}

// Get booking requests
export async function getBookingRequests(filters: BookingRequestFilters = {}): Promise<ArtistBookingRequest[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('artist_booking_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === 'PGRST205') return [];
    console.error('Error fetching booking requests:', error);
    throw new Error('Failed to fetch booking requests');
  }

  return (data || []) as ArtistBookingRequest[];
}

// Create booking request
export async function createBookingRequest(request: ArtistBookingRequestInsert): Promise<ArtistBookingRequest> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('artist_booking_requests')
    .insert(request as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating booking request:', error);
    throw new Error('Failed to create booking request');
  }

  return data as ArtistBookingRequest;
}

// Update booking request
export async function updateBookingRequest(id: string, updates: Partial<ArtistBookingRequest>): Promise<ArtistBookingRequest> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('artist_booking_requests')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating booking request:', error);
    throw new Error('Failed to update booking request');
  }

  return data as ArtistBookingRequest;
}

// Count booking requests
export async function countBookingRequests(): Promise<Record<string, number>> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('artist_booking_requests')
    .select('status');

  if (error) {
    if (error.code === 'PGRST205') return { total: 0, new: 0 };
    console.error('Error counting booking requests:', error);
    return {};
  }

  const requests = (data || []) as { status: string }[];
  const counts: Record<string, number> = {
    total: requests.length,
    new: 0,
    contacted: 0,
    quoted: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };

  requests.forEach(r => {
    counts[r.status] = (counts[r.status] || 0) + 1;
  });

  return counts;
}

// Get this month's booking requests
export async function getThisMonthBookingRequests(): Promise<number> {
  const supabase = getAdminClient();

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('artist_booking_requests')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfMonth.toISOString());

  if (error) {
    if (error.code === 'PGRST205') return 0;
    console.error('Error counting this month requests:', error);
    return 0;
  }

  return count || 0;
}

// ============ SLUG UTILITIES ============

// Generate unique slug from stage name
export function generateSlug(stageName: string): string {
  return stageName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Check if slug exists
export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = getAdminClient();

  let query = supabase
    .from('artists')
    .select('id')
    .eq('slug', slug);

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query;

  if (error) {
    if (error.code === 'PGRST205') return false;
    console.error('Error checking slug:', error);
    return false;
  }

  return (data || []).length > 0;
}

// Generate unique slug
export async function generateUniqueSlug(stageName: string, excludeId?: string): Promise<string> {
  let slug = generateSlug(stageName);
  let counter = 1;

  while (await slugExists(slug, excludeId)) {
    slug = `${generateSlug(stageName)}-${counter}`;
    counter++;
  }

  return slug;
}
