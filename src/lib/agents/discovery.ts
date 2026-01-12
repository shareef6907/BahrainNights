/**
 * Discovery Agent - Auto-discovers venues in Bahrain using Google Maps Places API
 *
 * This agent searches for venues in specific categories and areas,
 * storing them in the discovered_venues table for admin review.
 */

import { getAdminClient } from '@/lib/supabase/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place';

// Bahrain center coordinates
const BAHRAIN_CENTER = {
  lat: 26.0667,
  lng: 50.5577,
};

// Search radius in meters (50km covers all of Bahrain)
const SEARCH_RADIUS = 50000;

// Categories to search for
const SEARCH_CATEGORIES = [
  { type: 'restaurant', category: 'restaurant', tags: ['restaurant', 'dining', 'food'] },
  { type: 'cafe', category: 'cafe', tags: ['cafe', 'coffee', 'tea'] },
  { type: 'bar', category: 'lounge', tags: ['bar', 'lounge', 'drinks'] },
  { type: 'night_club', category: 'nightclub', tags: ['nightclub', 'club', 'nightlife'] },
  { type: 'spa', category: 'spa', tags: ['spa', 'wellness', 'relaxation'] },
  { type: 'lodging', category: 'hotel', tags: ['hotel', 'resort', 'accommodation'] },
];

// Areas in Bahrain to search
const BAHRAIN_AREAS = [
  { name: 'Manama', lat: 26.2285, lng: 50.5860 },
  { name: 'Seef', lat: 26.2388, lng: 50.5337 },
  { name: 'Juffair', lat: 26.2122, lng: 50.5997 },
  { name: 'Adliya', lat: 26.2153, lng: 50.5922 },
  { name: 'Amwaj', lat: 26.2683, lng: 50.6658 },
  { name: 'Riffa', lat: 26.1233, lng: 50.5553 },
  { name: 'Muharraq', lat: 26.2573, lng: 50.6120 },
];

export interface DiscoveredVenueData {
  google_place_id: string;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  total_ratings: number | null;
  phone: string | null;
  website: string | null;
  google_maps_url: string | null;
  photo_reference: string | null;
  category: string;
  suggested_tags: string[];
}

export interface DiscoveryResult {
  success: boolean;
  discovered: number;
  duplicates: number;
  errors: string[];
}

export interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
  }>;
  formatted_phone_number?: string;
  website?: string;
}

/**
 * Search for places using Google Maps Places API
 */
async function searchPlaces(
  type: string,
  location: { lat: number; lng: number },
  radius: number = 5000
): Promise<PlaceResult[]> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('GOOGLE_MAPS_API_KEY is not configured');
  }

  const url = new URL(`${GOOGLE_PLACES_API_URL}/nearbysearch/json`);
  url.searchParams.set('location', `${location.lat},${location.lng}`);
  url.searchParams.set('radius', radius.toString());
  url.searchParams.set('type', type);
  url.searchParams.set('key', GOOGLE_MAPS_API_KEY);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error('Places API error:', data.status, data.error_message);
    return [];
  }

  return data.results || [];
}

/**
 * Get detailed place information
 */
async function getPlaceDetails(placeId: string): Promise<PlaceResult | null> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('GOOGLE_MAPS_API_KEY is not configured');
  }

  const url = new URL(`${GOOGLE_PLACES_API_URL}/details/json`);
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'place_id,name,formatted_address,geometry,rating,user_ratings_total,formatted_phone_number,website,photos');
  url.searchParams.set('key', GOOGLE_MAPS_API_KEY);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== 'OK') {
    console.error('Place Details API error:', data.status, data.error_message);
    return null;
  }

  return data.result;
}

/**
 * Check if a place is already in the database (venues or discovered_venues)
 */
async function isPlaceExists(supabase: ReturnType<typeof getAdminClient>, placeId: string): Promise<boolean> {
  // Check discovered_venues
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: discovered } = await (supabase
    .from('discovered_venues') as any)
    .select('id')
    .eq('google_place_id', placeId)
    .single();

  if (discovered) return true;

  // Check venues table (by Google Maps URL containing the place ID)
  const { data: venue } = await supabase
    .from('venues')
    .select('id')
    .ilike('google_maps_url', `%${placeId}%`)
    .single();

  return !!venue;
}

/**
 * Save a discovered venue to the database
 */
async function saveDiscoveredVenue(
  supabase: ReturnType<typeof getAdminClient>,
  venue: DiscoveredVenueData
): Promise<boolean> {
  const venueData = {
    google_place_id: venue.google_place_id,
    name: venue.name,
    address: venue.address,
    latitude: venue.latitude,
    longitude: venue.longitude,
    rating: venue.rating,
    total_ratings: venue.total_ratings,
    phone: venue.phone,
    website: venue.website,
    google_maps_url: venue.google_maps_url,
    photo_reference: venue.photo_reference,
    category: venue.category,
    suggested_tags: venue.suggested_tags,
    status: 'pending',
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase
    .from('discovered_venues') as any)
    .insert(venueData);

  if (error) {
    console.error('Error saving discovered venue:', error);
    return false;
  }

  return true;
}

/**
 * Log agent activity
 */
async function logAgentRun(
  supabase: ReturnType<typeof getAdminClient>,
  agentName: string,
  status: 'running' | 'completed' | 'failed',
  details: object,
  errorMessage?: string
): Promise<string | null> {
  const logData = {
    agent_name: agentName,
    status,
    details,
    error_message: errorMessage,
    started_at: new Date().toISOString(),
    completed_at: status !== 'running' ? new Date().toISOString() : null,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase
    .from('agent_logs') as any)
    .insert(logData)
    .select('id')
    .single();

  if (error) {
    console.error('Error logging agent run:', error);
    return null;
  }

  return (data as { id: string } | null)?.id || null;
}

/**
 * Update agent log
 */
async function updateAgentLog(
  supabase: ReturnType<typeof getAdminClient>,
  logId: string,
  status: 'completed' | 'failed',
  details: object,
  errorMessage?: string
): Promise<void> {
  const updateData = {
    status,
    details,
    error_message: errorMessage,
    completed_at: new Date().toISOString(),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase
    .from('agent_logs') as any)
    .update(updateData)
    .eq('id', logId);
}

/**
 * Run the discovery agent for a specific category
 */
export async function discoverByCategory(
  categoryConfig: typeof SEARCH_CATEGORIES[0]
): Promise<DiscoveryResult> {
  const supabase = getAdminClient();
  const result: DiscoveryResult = {
    success: true,
    discovered: 0,
    duplicates: 0,
    errors: [],
  };

  for (const area of BAHRAIN_AREAS) {
    try {
      const places = await searchPlaces(categoryConfig.type, area, 5000);

      for (const place of places) {
        // Check if already exists
        const exists = await isPlaceExists(supabase, place.place_id);
        if (exists) {
          result.duplicates++;
          continue;
        }

        // Get detailed information
        const details = await getPlaceDetails(place.place_id);
        if (!details) continue;

        // Save to database
        const venueData: DiscoveredVenueData = {
          google_place_id: details.place_id,
          name: details.name,
          address: details.formatted_address || null,
          latitude: details.geometry?.location?.lat || null,
          longitude: details.geometry?.location?.lng || null,
          rating: details.rating || null,
          total_ratings: details.user_ratings_total || null,
          phone: details.formatted_phone_number || null,
          website: details.website || null,
          google_maps_url: `https://www.google.com/maps/place/?q=place_id:${details.place_id}`,
          photo_reference: details.photos?.[0]?.photo_reference || null,
          category: categoryConfig.category,
          suggested_tags: categoryConfig.tags,
        };

        const saved = await saveDiscoveredVenue(supabase, venueData);
        if (saved) {
          result.discovered++;
        }

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (error) {
      result.errors.push(`Error searching ${area.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return result;
}

/**
 * Run the full discovery agent
 */
export async function runDiscoveryAgent(): Promise<{
  success: boolean;
  totalDiscovered: number;
  totalDuplicates: number;
  errors: string[];
  logId: string | null;
}> {
  const supabase = getAdminClient();

  // Check if API key is configured
  if (!GOOGLE_MAPS_API_KEY) {
    return {
      success: false,
      totalDiscovered: 0,
      totalDuplicates: 0,
      errors: ['GOOGLE_MAPS_API_KEY is not configured'],
      logId: null,
    };
  }

  // Log the start
  const logId = await logAgentRun(supabase, 'discovery_agent', 'running', {
    categories: SEARCH_CATEGORIES.map((c) => c.type),
    areas: BAHRAIN_AREAS.map((a) => a.name),
  });

  let totalDiscovered = 0;
  let totalDuplicates = 0;
  const allErrors: string[] = [];

  try {
    for (const categoryConfig of SEARCH_CATEGORIES) {
      const result = await discoverByCategory(categoryConfig);
      totalDiscovered += result.discovered;
      totalDuplicates += result.duplicates;
      allErrors.push(...result.errors);

      // Log progress
      console.log(`Discovered ${result.discovered} ${categoryConfig.category}s (${result.duplicates} duplicates)`);
    }

    // Update log with results
    if (logId) {
      await updateAgentLog(supabase, logId, 'completed', {
        totalDiscovered,
        totalDuplicates,
        errors: allErrors,
      });
    }

    return {
      success: true,
      totalDiscovered,
      totalDuplicates,
      errors: allErrors,
      logId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    allErrors.push(errorMessage);

    // Update log with error
    if (logId) {
      await updateAgentLog(supabase, logId, 'failed', {
        totalDiscovered,
        totalDuplicates,
        errors: allErrors,
      }, errorMessage);
    }

    return {
      success: false,
      totalDiscovered,
      totalDuplicates,
      errors: allErrors,
      logId,
    };
  }
}

/**
 * Get discovery statistics
 */
export async function getDiscoveryStats(): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  total: number;
  lastRun: string | null;
}> {
  const supabase = getAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: pending } = await (supabase
    .from('discovered_venues') as any)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: approved } = await (supabase
    .from('discovered_venues') as any)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { count: rejected } = await (supabase
    .from('discovered_venues') as any)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'rejected');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: lastLog } = await (supabase
    .from('agent_logs') as any)
    .select('completed_at')
    .eq('agent_name', 'discovery_agent')
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(1)
    .single();

  const lastLogData = lastLog as { completed_at: string } | null;

  return {
    pending: pending || 0,
    approved: approved || 0,
    rejected: rejected || 0,
    total: (pending || 0) + (approved || 0) + (rejected || 0),
    lastRun: lastLogData?.completed_at || null,
  };
}
