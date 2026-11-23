import { getAdminClient } from '@/lib/supabase/server';

/**
 * Read-only access to the `tours` table.
 *
 * The `tours` table is not part of the generated Supabase types, so the
 * queries below cast the client to `any` -- the same thing
 * `src/lib/db/attractions.ts` does for the `attractions` table.
 *
 * The shape returned here mirrors what `/api/tours` already publishes, so
 * the listing page and the detail page read the same row the same way.
 */
export interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  tourType: string;
  category: string;
  duration: string;
  durationHours: number | null;
  groupSize: string;
  maxParticipants: number | null;
  languages: string[];
  image: string;
  images: string[];
  priceFrom: number | null;
  pricePer: string;
  currency: string;
  includes: string[];
  excludes: string[];
  highlights: string[];
  areasCovered: string[];
  suitableFor: string[];
  difficultyLevel: string;
  providerName: string | null;
  updatedAt: string | null;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop';

/** Array columns can arrive as null, a JSON array or a JSON string. */
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string');
      }
    } catch {
      return [];
    }
  }
  return [];
}

function toNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeTour(row: any): Tour {
  const description: string = row.description || '';
  return {
    id: row.id,
    name: row.name || '',
    slug: row.slug || row.id,
    description,
    shortDescription:
      row.short_description ||
      (description ? `${description.slice(0, 150)}...` : ''),
    tourType: row.tour_type || 'Day Tours',
    category: row.category || 'Day Tours',
    duration: row.duration || '',
    durationHours: toNumber(row.duration_hours),
    groupSize: row.group_size || 'Small group',
    maxParticipants: toNumber(row.max_participants),
    languages: toStringArray(row.languages).length
      ? toStringArray(row.languages)
      : ['English'],
    image: row.image_url || FALLBACK_IMAGE,
    images: toStringArray(row.images),
    priceFrom: toNumber(row.price_from),
    pricePer: row.price_per || 'person',
    currency: row.currency || 'BHD',
    includes: toStringArray(row.includes),
    excludes: toStringArray(row.excludes),
    highlights: toStringArray(row.highlights),
    areasCovered: toStringArray(row.areas_covered),
    suitableFor: toStringArray(row.suitable_for),
    difficultyLevel: row.difficulty_level || 'Easy',
    providerName: row.provider_name || null,
    updatedAt: row.updated_at || null,
  };
}

/**
 * One tour by slug. Only tours that are active are returned -- an inactive
 * tour is not a page, so the route answers 404 for it instead of serving a
 * listing the operator has taken down.
 */
export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching tour by slug:', error);
    return null;
  }

  if (!data) return null;

  return normalizeTour(data);
}

/** Every active tour, newest ordering first, for listings and sitemaps. */
export async function getActiveTours(limit = 500): Promise<Tour[]> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('display_order', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching tours:', error);
    return [];
  }

  return (data || []).map(normalizeTour);
}
