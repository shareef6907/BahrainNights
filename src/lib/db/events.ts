import { getAdminClient } from '@/lib/supabase/server';
import type { Event, EventInsert, EventUpdate, EventWithVenue } from '@/types/database';

export interface EventFilters {
  status?: Event['status'] | 'all';
  category?: string;
  venueId?: string;
  featured?: boolean;
  search?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

// Get all events with optional filters
export async function getEvents(filters: EventFilters = {}): Promise<Event[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true });

  // Apply filters
  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.venueId) {
    query = query.eq('venue_id', filters.venueId);
  }

  if (filters.featured !== undefined) {
    query = query.eq('is_featured', filters.featured);
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters.startDate) {
    query = query.gte('start_date', filters.startDate);
  }

  if (filters.endDate) {
    query = query.lte('start_date', filters.endDate);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }

  return data || [];
}

// Get published events with venue info
export async function getPublishedEventsWithVenue(filters: Omit<EventFilters, 'status'> = {}): Promise<EventWithVenue[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('events')
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
    .eq('status', 'published')
    .order('start_date', { ascending: true });

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.featured !== undefined) {
    query = query.eq('is_featured', filters.featured);
  }

  if (filters.startDate) {
    query = query.gte('start_date', filters.startDate);
  }

  if (filters.endDate) {
    query = query.lte('start_date', filters.endDate);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching events with venue:', error);
    throw new Error('Failed to fetch events');
  }

  return (data || []) as EventWithVenue[];
}

// Get event by slug
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching event by slug:', error);
    throw new Error('Failed to fetch event');
  }

  return data;
}

// Get event by slug with venue
export async function getEventBySlugWithVenue(slug: string): Promise<EventWithVenue | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('events')
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
    console.error('Error fetching event with venue:', error);
    throw new Error('Failed to fetch event');
  }

  return data as EventWithVenue;
}

// Get event by ID
export async function getEventById(id: string): Promise<Event | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching event by ID:', error);
    throw new Error('Failed to fetch event');
  }

  return data;
}

// Get events by venue
export async function getEventsByVenue(venueId: string, status?: Event['status']): Promise<Event[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('events')
    .select('*')
    .eq('venue_id', venueId)
    .order('start_date', { ascending: true });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching venue events:', error);
    throw new Error('Failed to fetch events');
  }

  return data || [];
}

// Get today's events
export async function getTodayEvents(): Promise<EventWithVenue[]> {
  const today = new Date().toISOString().split('T')[0];
  return getPublishedEventsWithVenue({ startDate: today, endDate: today });
}

// Get weekend events
export async function getWeekendEvents(): Promise<EventWithVenue[]> {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Find next Friday
  const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 6;
  const friday = new Date(today);
  friday.setDate(today.getDate() + daysUntilFriday);

  // Find next Sunday
  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);

  return getPublishedEventsWithVenue({
    startDate: friday.toISOString().split('T')[0],
    endDate: sunday.toISOString().split('T')[0],
  });
}

// Get upcoming events
export async function getUpcomingEvents(limit: number = 10): Promise<EventWithVenue[]> {
  const today = new Date().toISOString().split('T')[0];
  return getPublishedEventsWithVenue({ startDate: today, limit });
}

// Get featured events
export async function getFeaturedEvents(limit: number = 6): Promise<EventWithVenue[]> {
  return getPublishedEventsWithVenue({ featured: true, limit });
}

// Create event
export async function createEvent(event: EventInsert): Promise<Event> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('events')
    .insert(event as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event');
  }

  return data as Event;
}

// Update event
export async function updateEvent(id: string, updates: EventUpdate): Promise<Event> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    throw new Error('Failed to update event');
  }

  return data as Event;
}

// Delete event
export async function deleteEvent(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    throw new Error('Failed to delete event');
  }
}

// Publish event
export async function publishEvent(id: string): Promise<Event> {
  return updateEvent(id, {
    status: 'published',
    published_at: new Date().toISOString(),
  });
}

// Feature/unfeature event
export async function featureEvent(id: string, featured: boolean = true): Promise<Event> {
  return updateEvent(id, { is_featured: featured });
}

// Approve event (admin)
export async function approveEvent(id: string): Promise<Event> {
  return publishEvent(id);
}

// Reject event (admin)
export async function rejectEvent(id: string, reason: string): Promise<Event> {
  return updateEvent(id, {
    status: 'rejected',
    rejection_reason: reason,
  });
}

// Increment view count
export async function incrementEventViews(id: string): Promise<void> {
  const supabase = getAdminClient();

  const event = await getEventById(id);
  if (event) {
    await updateEvent(id, { view_count: event.view_count + 1 });
  }
}

// Get event categories
export async function getEventCategories(): Promise<string[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('events')
    .select('category')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching event categories:', error);
    return [];
  }

  const events = (data || []) as { category: string }[];
  const categories = [...new Set(events.map(e => e.category))];
  return categories;
}

// Count events by status
export async function countEventsByStatus(): Promise<Record<string, number>> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('events')
    .select('status');

  if (error) {
    console.error('Error counting events:', error);
    return {};
  }

  const events = (data || []) as { status: string }[];
  const counts: Record<string, number> = {
    total: events.length,
    draft: 0,
    pending: 0,
    published: 0,
    rejected: 0,
    cancelled: 0,
  };

  events.forEach(e => {
    counts[e.status] = (counts[e.status] || 0) + 1;
  });

  return counts;
}

// Get events for calendar
export async function getEventsForCalendar(month: number, year: number): Promise<Event[]> {
  const startDate = new Date(year, month, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .gte('start_date', startDate)
    .lte('start_date', endDate)
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }

  return data || [];
}
