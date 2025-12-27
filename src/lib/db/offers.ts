import { getAdminClient } from '@/lib/supabase/server';
import type { Offer, OfferInsert, OfferUpdate, OfferWithVenue } from '@/types/database';

export interface OfferFilters {
  status?: Offer['status'] | 'all';
  offerType?: string;
  venueId?: string;
  search?: string;
  dayOfWeek?: string;
  limit?: number;
  offset?: number;
}

// Get all offers with optional filters
export async function getOffers(filters: OfferFilters = {}): Promise<Offer[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('offers')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.offerType) {
    query = query.eq('offer_type', filters.offerType);
  }

  if (filters.venueId) {
    query = query.eq('venue_id', filters.venueId);
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters.dayOfWeek) {
    query = query.contains('days_available', [filters.dayOfWeek]);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching offers:', error);
    throw new Error('Failed to fetch offers');
  }

  return data || [];
}

// Get active offers with venue info
export async function getActiveOffersWithVenue(filters: Omit<OfferFilters, 'status'> = {}): Promise<OfferWithVenue[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('offers')
    .select(`
      *,
      venue:venues (
        id,
        name,
        slug,
        area,
        logo_url,
        category
      )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (filters.offerType) {
    query = query.eq('offer_type', filters.offerType);
  }

  if (filters.dayOfWeek) {
    query = query.contains('days_available', [filters.dayOfWeek]);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching offers with venue:', error);
    throw new Error('Failed to fetch offers');
  }

  return (data || []) as OfferWithVenue[];
}

// Get offer by slug
export async function getOfferBySlug(slug: string): Promise<Offer | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching offer by slug:', error);
    throw new Error('Failed to fetch offer');
  }

  return data;
}

// Get offer by slug with venue
export async function getOfferBySlugWithVenue(slug: string): Promise<OfferWithVenue | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('offers')
    .select(`
      *,
      venue:venues (*)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching offer with venue:', error);
    throw new Error('Failed to fetch offer');
  }

  return data as OfferWithVenue;
}

// Get offer by ID
export async function getOfferById(id: string): Promise<Offer | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching offer by ID:', error);
    throw new Error('Failed to fetch offer');
  }

  return data;
}

// Get offers by venue
export async function getOffersByVenue(venueId: string, status?: Offer['status']): Promise<Offer[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('offers')
    .select('*')
    .eq('venue_id', venueId)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching venue offers:', error);
    throw new Error('Failed to fetch offers');
  }

  return data || [];
}

// Get today's offers (offers valid today based on day of week)
export async function getTodayOffers(): Promise<OfferWithVenue[]> {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];

  return getActiveOffersWithVenue({ dayOfWeek: today });
}

// Get offers by type
export async function getOffersByType(offerType: Offer['offer_type']): Promise<OfferWithVenue[]> {
  return getActiveOffersWithVenue({ offerType });
}

// Create offer
export async function createOffer(offer: OfferInsert): Promise<Offer> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('offers')
    .insert(offer as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating offer:', error);
    throw new Error('Failed to create offer');
  }

  return data as Offer;
}

// Update offer
export async function updateOffer(id: string, updates: OfferUpdate): Promise<Offer> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('offers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating offer:', error);
    throw new Error('Failed to update offer');
  }

  return data as Offer;
}

// Delete offer
export async function deleteOffer(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting offer:', error);
    throw new Error('Failed to delete offer');
  }
}

// Activate offer
export async function activateOffer(id: string): Promise<Offer> {
  return updateOffer(id, { status: 'active' });
}

// Pause offer
export async function pauseOffer(id: string): Promise<Offer> {
  return updateOffer(id, { status: 'paused' });
}

// Get offer types count
export async function getOfferTypeCounts(): Promise<Record<string, number>> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('offers')
    .select('offer_type')
    .eq('status', 'active');

  if (error) {
    console.error('Error counting offer types:', error);
    return {};
  }

  const offers = (data || []) as { offer_type: string }[];
  const counts: Record<string, number> = {};
  offers.forEach(o => {
    counts[o.offer_type] = (counts[o.offer_type] || 0) + 1;
  });

  return counts;
}
