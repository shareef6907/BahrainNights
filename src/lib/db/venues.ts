import { getAdminClient } from '@/lib/supabase/server';
import type { Venue, VenueInsert, VenueUpdate, VenueWithEvents } from '@/types/database';

export interface VenueFilters {
  status?: Venue['status'] | 'all';
  category?: string;
  area?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

// Get all venues with optional filters
export async function getVenues(filters: VenueFilters = {}): Promise<Venue[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('venues')
    .select('*')
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.area) {
    query = query.eq('area', filters.area);
  }

  if (filters.featured !== undefined) {
    query = query.eq('is_featured', filters.featured);
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching venues:', error);
    throw new Error(`Failed to fetch venues: ${error.message || error.code || JSON.stringify(error)}`);
  }

  return (data || []) as Venue[];
}

// Get approved venues only (for public pages)
// Excludes hidden venues from public display
export async function getApprovedVenues(filters: Omit<VenueFilters, 'status'> = {}): Promise<Venue[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('venues')
    .select('*')
    .eq('status', 'approved')
    .eq('is_hidden', false)
    .order('created_at', { ascending: false });

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.area) {
    query = query.eq('area', filters.area);
  }

  if (filters.featured !== undefined) {
    query = query.eq('is_featured', filters.featured);
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching approved venues:', error);
    throw new Error(`Failed to fetch venues: ${error.message || error.code || JSON.stringify(error)}`);
  }

  return (data || []) as Venue[];
}

// Get pending venues (for admin)
export async function getPendingVenues(): Promise<Venue[]> {
  return getVenues({ status: 'pending' });
}

// Get venue by slug
export async function getVenueBySlug(slug: string): Promise<Venue | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    console.error('Error fetching venue by slug:', error);
    throw new Error('Failed to fetch venue');
  }

  return data as Venue;
}

// Get venue by ID
export async function getVenueById(id: string): Promise<Venue | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching venue by ID:', error);
    throw new Error('Failed to fetch venue');
  }

  return data as Venue;
}

// Get venue by owner ID
export async function getVenueByOwnerId(ownerId: string): Promise<Venue | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('owner_id', ownerId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching venue by owner:', error);
    throw new Error('Failed to fetch venue');
  }

  return data as Venue;
}

// Get venue with events
export async function getVenueWithEvents(slug: string): Promise<VenueWithEvents | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('venues')
    .select(`
      *,
      events (*)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching venue with events:', error);
    throw new Error('Failed to fetch venue');
  }

  return data as VenueWithEvents;
}

// Create venue
export async function createVenue(venue: VenueInsert): Promise<Venue> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('venues')
    .insert(venue as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating venue:', error);
    throw new Error('Failed to create venue');
  }

  return data as Venue;
}

// Update venue
export async function updateVenue(id: string, updates: VenueUpdate): Promise<Venue> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('venues')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating venue:', error);
    throw new Error('Failed to update venue');
  }

  return data as Venue;
}

// Delete venue
export async function deleteVenue(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('venues')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting venue:', error);
    throw new Error('Failed to delete venue');
  }
}

// Approve venue
export async function approveVenue(id: string): Promise<Venue> {
  return updateVenue(id, {
    status: 'approved',
    approved_at: new Date().toISOString(),
    rejection_reason: null,
  });
}

// Reject venue
export async function rejectVenue(id: string, reason: string): Promise<Venue> {
  return updateVenue(id, {
    status: 'rejected',
    rejection_reason: reason,
  });
}

// Suspend venue
export async function suspendVenue(id: string): Promise<Venue> {
  return updateVenue(id, {
    status: 'suspended',
  });
}

// Increment view count
export async function incrementVenueViews(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await (supabase.rpc as any)('increment_venue_views', { venue_id: id });

  if (error) {
    // Fallback to manual increment
    const venue = await getVenueById(id);
    if (venue) {
      await updateVenue(id, { view_count: venue.view_count + 1 });
    }
  }
}

// Get venue categories
export async function getVenueCategories(): Promise<string[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('venues')
    .select('category')
    .eq('status', 'approved');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const venues = (data || []) as { category: string }[];
  const categories = [...new Set(venues.map(v => v.category))];
  return categories;
}

// Get venue areas
export async function getVenueAreas(): Promise<string[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('venues')
    .select('area')
    .eq('status', 'approved');

  if (error) {
    console.error('Error fetching areas:', error);
    return [];
  }

  const venues = (data || []) as { area: string }[];
  const areas = [...new Set(venues.map(v => v.area))];
  return areas;
}

// Count venues by status
export async function countVenuesByStatus(): Promise<Record<string, number>> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('venues')
    .select('status');

  if (error) {
    console.error('Error counting venues:', error);
    throw new Error(`Failed to count venues: ${error.message || error.code || JSON.stringify(error)}`);
  }

  const venues = (data || []) as { status: string }[];
  const counts: Record<string, number> = {
    total: venues.length,
    pending: 0,
    approved: 0,
    rejected: 0,
    suspended: 0,
  };

  venues.forEach(v => {
    counts[v.status] = (counts[v.status] || 0) + 1;
  });

  return counts;
}

// Get upcoming events for a venue
export async function getVenueEvents(venueName: string): Promise<{
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string;
  image: string;
  category: string;
}[]> {
  const supabase = getAdminClient();
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('events')
    .select('id, title, slug, date, time, cover_url, image_url, featured_image, category')
    .eq('status', 'published')
    .ilike('venue_name', `%${venueName}%`)
    .or(`date.gte.${today},end_date.gte.${today}`)
    .order('date', { ascending: true })
    .limit(6);

  if (error) {
    console.error('Error fetching venue events:', error);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((event: any) => ({
    id: event.id,
    title: event.title,
    slug: event.slug,
    date: event.date ? new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }) : 'Date TBA',
    time: event.time || '',
    image: event.cover_url || event.image_url || event.featured_image || '/images/event-placeholder.jpg',
    category: event.category || 'general',
  }));
}

// Get active offers for a venue
export async function getVenueOffers(venueId: string): Promise<{
  id: string;
  title: string;
  day: string;
  description: string;
  validUntil?: string;
  type?: 'ladies-night' | 'happy-hour' | 'brunch' | 'special';
}[]> {
  const supabase = getAdminClient();
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('offers')
    .select('id, title, description, offer_type, days_available, valid_until, is_ongoing')
    .eq('venue_id', venueId)
    .eq('status', 'active')
    .or(`is_ongoing.eq.true,valid_until.gte.${today}`)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching venue offers:', error);
    return [];
  }

  // Map offer_type to PlaceOffer type
  const typeMap: Record<string, 'ladies-night' | 'happy-hour' | 'brunch' | 'special'> = {
    'ladies-night': 'ladies-night',
    'happy-hour': 'happy-hour',
    'brunch': 'brunch',
    'special-deal': 'special',
    'buy1get1': 'special',
    'buffet': 'special',
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((offer: any) => ({
    id: offer.id,
    title: offer.title,
    description: offer.description || '',
    day: Array.isArray(offer.days_available) && offer.days_available.length > 0
      ? offer.days_available.join(', ')
      : 'Daily',
    validUntil: offer.is_ongoing
      ? undefined
      : offer.valid_until
        ? new Date(offer.valid_until).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : undefined,
    type: typeMap[offer.offer_type] || 'special',
  }));
}
