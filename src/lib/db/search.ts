import { getAdminClient } from '@/lib/supabase/server';
import type { Venue, Event, Offer, Movie } from '@/types/database';

export interface SearchResult {
  type: 'venue' | 'event' | 'offer' | 'movie';
  id: string;
  title: string;
  description: string | null;
  slug: string;
  image: string | null;
  category?: string;
  date?: string;
  relevanceScore: number;
}

export interface SearchFilters {
  types?: Array<'venue' | 'event' | 'offer' | 'movie'>;
  category?: string;
  limit?: number;
}

// Search across all content types
export async function searchAll(query: string, filters: SearchFilters = {}): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.trim().toLowerCase();
  const types = filters.types || ['venue', 'event', 'offer', 'movie'];
  const limit = filters.limit || 20;

  const results: SearchResult[] = [];

  // Run searches in parallel
  const searchPromises: Promise<void>[] = [];

  if (types.includes('venue')) {
    searchPromises.push(
      searchVenues(searchTerm, filters.category).then(venues => {
        results.push(...venues.map(v => venueToSearchResult(v, searchTerm)));
      })
    );
  }

  if (types.includes('event')) {
    searchPromises.push(
      searchEvents(searchTerm, filters.category).then(events => {
        results.push(...events.map(e => eventToSearchResult(e, searchTerm)));
      })
    );
  }

  if (types.includes('offer')) {
    searchPromises.push(
      searchOffers(searchTerm).then(offers => {
        results.push(...offers.map(o => offerToSearchResult(o, searchTerm)));
      })
    );
  }

  if (types.includes('movie')) {
    searchPromises.push(
      searchMovies(searchTerm).then(movies => {
        results.push(...movies.map(m => movieToSearchResult(m, searchTerm)));
      })
    );
  }

  await Promise.all(searchPromises);

  // Sort by relevance score and limit
  return results
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

// Search venues
async function searchVenues(query: string, category?: string): Promise<Venue[]> {
  const supabase = getAdminClient();

  let dbQuery = supabase
    .from('venues')
    .select('*')
    .eq('status', 'approved')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,area.ilike.%${query}%`)
    .limit(10);

  if (category) {
    dbQuery = dbQuery.eq('category', category);
  }

  const { data, error } = await dbQuery;

  if (error) {
    console.error('Error searching venues:', error);
    return [];
  }

  return (data || []) as Venue[];
}

// Search events
async function searchEvents(query: string, category?: string): Promise<Event[]> {
  const supabase = getAdminClient();
  const today = new Date().toISOString().split('T')[0];

  let dbQuery = supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .gte('start_date', today)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('start_date', { ascending: true })
    .limit(10);

  if (category) {
    dbQuery = dbQuery.eq('category', category);
  }

  const { data, error } = await dbQuery;

  if (error) {
    console.error('Error searching events:', error);
    return [];
  }

  return (data || []) as Event[];
}

// Search offers
async function searchOffers(query: string): Promise<Offer[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('status', 'active')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(10);

  if (error) {
    console.error('Error searching offers:', error);
    return [];
  }

  return (data || []) as Offer[];
}

// Search movies
async function searchMovies(query: string): Promise<Movie[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('status', 'now_showing')
    .or(`title.ilike.%${query}%,overview.ilike.%${query}%`)
    .limit(10);

  if (error) {
    console.error('Error searching movies:', error);
    return [];
  }

  return (data || []) as Movie[];
}

// Calculate relevance score
function calculateRelevance(text: string, query: string): number {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  let score = 0;

  // Exact match in title/name
  if (lowerText === lowerQuery) {
    score += 100;
  }

  // Starts with query
  if (lowerText.startsWith(lowerQuery)) {
    score += 50;
  }

  // Contains query as whole word
  const wordRegex = new RegExp(`\\b${lowerQuery}\\b`, 'i');
  if (wordRegex.test(text)) {
    score += 30;
  }

  // Contains query
  if (lowerText.includes(lowerQuery)) {
    score += 10;
  }

  return score;
}

// Convert venue to search result
function venueToSearchResult(venue: Venue, query: string): SearchResult {
  return {
    type: 'venue',
    id: venue.id,
    title: venue.name,
    description: venue.description,
    slug: venue.slug,
    image: venue.logo_url,
    category: venue.category,
    relevanceScore: calculateRelevance(venue.name, query) +
      (venue.description ? calculateRelevance(venue.description, query) * 0.5 : 0),
  };
}

// Convert event to search result
function eventToSearchResult(event: Event, query: string): SearchResult {
  return {
    type: 'event',
    id: event.id,
    title: event.title,
    description: event.description,
    slug: event.slug,
    image: event.featured_image,
    category: event.category,
    date: event.start_date,
    relevanceScore: calculateRelevance(event.title, query) +
      (event.description ? calculateRelevance(event.description, query) * 0.5 : 0),
  };
}

// Convert offer to search result
function offerToSearchResult(offer: Offer, query: string): SearchResult {
  return {
    type: 'offer',
    id: offer.id,
    title: offer.title,
    description: offer.description,
    slug: offer.slug,
    image: offer.featured_image,
    relevanceScore: calculateRelevance(offer.title, query) +
      (offer.description ? calculateRelevance(offer.description, query) * 0.5 : 0),
  };
}

// Convert movie to search result
function movieToSearchResult(movie: Movie, query: string): SearchResult {
  return {
    type: 'movie',
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    slug: movie.slug,
    image: movie.poster_url,
    relevanceScore: calculateRelevance(movie.title, query) +
      (movie.overview ? calculateRelevance(movie.overview, query) * 0.5 : 0),
  };
}

// Get search suggestions (autocomplete)
export async function getSearchSuggestions(query: string, limit: number = 5): Promise<string[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.trim();
  const supabase = getAdminClient();
  const suggestions = new Set<string>();

  // Get venue names
  const { data: venues } = await supabase
    .from('venues')
    .select('name')
    .eq('status', 'approved')
    .ilike('name', `%${searchTerm}%`)
    .limit(limit);

  const venueResults = (venues || []) as { name: string }[];
  venueResults.forEach(v => suggestions.add(v.name));

  // Get event titles
  const { data: events } = await supabase
    .from('events')
    .select('title')
    .eq('status', 'published')
    .ilike('title', `%${searchTerm}%`)
    .limit(limit);

  const eventResults = (events || []) as { title: string }[];
  eventResults.forEach(e => suggestions.add(e.title));

  // Get movie titles
  const { data: movies } = await supabase
    .from('movies')
    .select('title')
    .eq('status', 'now_showing')
    .ilike('title', `%${searchTerm}%`)
    .limit(limit);

  const movieResults = (movies || []) as { title: string }[];
  movieResults.forEach(m => suggestions.add(m.title));

  return Array.from(suggestions).slice(0, limit);
}

// Get popular searches (based on recent activity)
export async function getPopularSearches(limit: number = 10): Promise<string[]> {
  // This would typically be tracked in a search_history table
  // For now, return popular categories and types
  return [
    'Restaurants',
    'Ladies Night',
    'Brunch',
    'Live Music',
    'Family',
    'Beach',
    'Happy Hour',
    'Weekend',
    'Movies',
    'Events',
  ].slice(0, limit);
}

// Search by category
export async function searchByCategory(category: string, limit: number = 20): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  // Get venues in category
  const supabase = getAdminClient();
  const today = new Date().toISOString().split('T')[0];

  const [venuesResult, eventsResult] = await Promise.all([
    supabase
      .from('venues')
      .select('*')
      .eq('status', 'approved')
      .eq('category', category)
      .limit(limit),
    supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('category', category)
      .gte('start_date', today)
      .order('start_date', { ascending: true })
      .limit(limit),
  ]);

  const venueData = (venuesResult.data || []) as Venue[];
  venueData.forEach(v => {
    results.push(venueToSearchResult(v, category));
  });

  const eventData = (eventsResult.data || []) as Event[];
  eventData.forEach(e => {
    results.push(eventToSearchResult(e, category));
  });

  return results.slice(0, limit);
}

// Get nearby venues (if we had location data)
export async function searchNearby(area: string, limit: number = 10): Promise<Venue[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('status', 'approved')
    .ilike('area', `%${area}%`)
    .limit(limit);

  if (error) {
    console.error('Error searching nearby:', error);
    return [];
  }

  return (data || []) as Venue[];
}

// Full-text search (if PostgreSQL full-text search is enabled)
export async function fullTextSearch(query: string, limit: number = 20): Promise<SearchResult[]> {
  // This would use PostgreSQL's full-text search capabilities
  // For now, fall back to basic search
  return searchAll(query, { limit });
}
