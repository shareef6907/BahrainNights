import { getAdminClient } from '@/lib/supabase/server';

// Attraction interface
export interface Attraction {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  image_url: string | null;
  area: string | null;
  price_from: number | null;
  price_range: string | null;
  tripadvisor_rating: number | null;
  tripadvisor_url: string | null;
  duration: string | null;
  suitable_for: string[] | null;
  tags: string[] | null;
  category: string | null;
  subcategory: string | null;
  is_featured: boolean;
  is_active: boolean;
  source: string | null;
  created_at: string;
  updated_at: string;
}

export interface AttractionInsert {
  name: string;
  slug?: string;
  description?: string;
  short_description?: string;
  image_url?: string;
  area?: string;
  price_from?: number;
  price_range?: string;
  tripadvisor_rating?: number;
  tripadvisor_url?: string;
  duration?: string;
  suitable_for?: string[];
  tags?: string[];
  category?: string;
  subcategory?: string;
  is_featured?: boolean;
  is_active?: boolean;
  source?: string;
}

export interface AttractionUpdate {
  name?: string;
  slug?: string;
  description?: string;
  short_description?: string;
  image_url?: string;
  area?: string;
  price_from?: number;
  price_range?: string;
  tripadvisor_rating?: number;
  tripadvisor_url?: string;
  duration?: string;
  suitable_for?: string[];
  tags?: string[];
  category?: string;
  subcategory?: string;
  is_featured?: boolean;
  is_active?: boolean;
  source?: string;
}

export interface AttractionFilters {
  status?: 'all' | 'active' | 'inactive';
  featured?: boolean;
  search?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

// Get all attractions with optional filters
export async function getAttractions(filters: AttractionFilters = {}): Promise<Attraction[]> {
  const supabase = getAdminClient();

  // Use 'any' to bypass strict Supabase typing since attractions table isn't in generated types
  let query = (supabase as any)
    .from('attractions')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (filters.status === 'active') {
    query = query.eq('is_active', true);
  } else if (filters.status === 'inactive') {
    query = query.eq('is_active', false);
  }

  if (filters.featured !== undefined) {
    query = query.eq('is_featured', filters.featured);
  }

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,area.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching attractions:', error);
    throw new Error(`Failed to fetch attractions: ${error.message}`);
  }

  return (data || []) as Attraction[];
}

// Get attraction by ID
export async function getAttractionById(id: string): Promise<Attraction | null> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('attractions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching attraction by ID:', error);
    throw new Error('Failed to fetch attraction');
  }

  return data as Attraction;
}

// Create attraction
export async function createAttraction(attraction: AttractionInsert): Promise<Attraction> {
  const supabase = getAdminClient();

  // Generate slug if not provided
  if (!attraction.slug) {
    attraction.slug = generateSlug(attraction.name);
  }

  const { data, error } = await (supabase as any)
    .from('attractions')
    .insert(attraction)
    .select()
    .single();

  if (error) {
    console.error('Error creating attraction:', error);
    throw new Error(`Failed to create attraction: ${error.message}`);
  }

  return data as Attraction;
}

// Update attraction
export async function updateAttraction(id: string, updates: AttractionUpdate): Promise<Attraction> {
  const supabase = getAdminClient();

  // Add updated_at timestamp
  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await (supabase as any)
    .from('attractions')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating attraction:', error);
    throw new Error(`Failed to update attraction: ${error.message}`);
  }

  return data as Attraction;
}

// Delete attraction
export async function deleteAttraction(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await (supabase as any)
    .from('attractions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting attraction:', error);
    throw new Error(`Failed to delete attraction: ${error.message}`);
  }
}

// Toggle featured status
export async function toggleAttractionFeatured(id: string): Promise<Attraction> {
  const attraction = await getAttractionById(id);
  if (!attraction) {
    throw new Error('Attraction not found');
  }
  return updateAttraction(id, { is_featured: !attraction.is_featured });
}

// Toggle active status
export async function toggleAttractionActive(id: string): Promise<Attraction> {
  const attraction = await getAttractionById(id);
  if (!attraction) {
    throw new Error('Attraction not found');
  }
  return updateAttraction(id, { is_active: !attraction.is_active });
}

// Get attraction counts
export async function getAttractionCounts(): Promise<{
  total: number;
  active: number;
  inactive: number;
  featured: number;
}> {
  const supabase = getAdminClient();

  const { data: allData, error: allError } = await (supabase as any)
    .from('attractions')
    .select('id, is_active, is_featured');

  if (allError) {
    console.error('Error fetching attraction counts:', allError);
    return { total: 0, active: 0, inactive: 0, featured: 0 };
  }

  const attractions = (allData || []) as { id: string; is_active: boolean; is_featured: boolean }[];
  return {
    total: attractions.length,
    active: attractions.filter(a => a.is_active).length,
    inactive: attractions.filter(a => !a.is_active).length,
    featured: attractions.filter(a => a.is_featured).length,
  };
}

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
