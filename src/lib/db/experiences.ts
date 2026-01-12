import { getAdminClient } from '@/lib/supabase/server';

export interface Experience {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  price_currency: string;
  image_url: string | null;
  venue: string | null;
  location: string | null;
  category: string | null;
  type: string;
  original_url: string;
  affiliate_url: string;
  source: string;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ExperienceInsert {
  title: string;
  description?: string | null;
  price?: number | null;
  price_currency?: string;
  image_url?: string | null;
  venue?: string | null;
  location?: string | null;
  category?: string | null;
  type: string;
  original_url: string;
  affiliate_url: string;
  source?: string;
  start_date?: string | null;
  end_date?: string | null;
  is_active?: boolean;
}

export interface ExperienceFilters {
  type?: string;
  category?: string;
  isActive?: boolean;
  source?: string;
  limit?: number;
  offset?: number;
}

// Get all experiences with optional filters
export async function getExperiences(filters: ExperienceFilters = {}): Promise<Experience[]> {
  const supabase = getAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase as any)
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.isActive !== undefined) {
    query = query.eq('is_active', filters.isActive);
  }

  if (filters.source) {
    query = query.eq('source', filters.source);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching experiences:', error);
    throw new Error('Failed to fetch experiences');
  }

  return (data || []) as Experience[];
}

// Get active experiences (for public display)
export async function getActiveExperiences(filters: Omit<ExperienceFilters, 'isActive'> = {}): Promise<Experience[]> {
  return getExperiences({ ...filters, isActive: true });
}

// Get experience count (for homepage category count)
export async function getExperienceCount(filters: ExperienceFilters = {}): Promise<number> {
  const supabase = getAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase as any)
    .from('experiences')
    .select('*', { count: 'exact', head: true });

  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.isActive !== undefined) {
    query = query.eq('is_active', filters.isActive);
  }

  const { count, error } = await query;

  if (error) {
    console.error('Error counting experiences:', error);
    return 0;
  }

  return count || 0;
}

// Get distinct categories
export async function getExperienceCategories(): Promise<string[]> {
  const supabase = getAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('experiences')
    .select('category')
    .eq('is_active', true)
    .not('category', 'is', null);

  if (error) {
    console.error('Error fetching experience categories:', error);
    return [];
  }

  // Get unique categories - explicitly type the data
  const categoryData = data as { category: string | null }[] | null;
  const categories = [...new Set(categoryData?.map(d => d.category).filter(Boolean) as string[])];
  return categories.sort();
}

// Upsert experience (for scraper)
export async function upsertExperience(data: ExperienceInsert): Promise<Experience | null> {
  const supabase = getAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: result, error } = await (supabase as any)
    .from('experiences')
    .upsert(
      {
        ...data,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'original_url',
        ignoreDuplicates: false,
      }
    )
    .select()
    .single();

  if (error) {
    console.error('Error upserting experience:', error);
    throw new Error(`Failed to upsert experience: ${error.message}`);
  }

  return result as Experience;
}

// Bulk upsert experiences (for scraper efficiency)
export async function bulkUpsertExperiences(items: ExperienceInsert[]): Promise<number> {
  const supabase = getAdminClient();

  const dataWithTimestamp = items.map(item => ({
    ...item,
    updated_at: new Date().toISOString(),
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('experiences')
    .upsert(dataWithTimestamp, {
      onConflict: 'original_url',
      ignoreDuplicates: false,
    })
    .select();

  if (error) {
    console.error('Error bulk upserting experiences:', error);
    throw new Error(`Failed to bulk upsert experiences: ${error.message}`);
  }

  return data?.length || 0;
}

// Deactivate experiences not in the latest scrape
export async function deactivateStaleExperiences(scrapedUrls: string[], source: string = 'platinumlist'): Promise<number> {
  const supabase = getAdminClient();

  // Get all active experiences from this source
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: activeExperiences, error: fetchError } = await (supabase as any)
    .from('experiences')
    .select('original_url')
    .eq('source', source)
    .eq('is_active', true);

  if (fetchError) {
    console.error('Error fetching active experiences:', fetchError);
    throw new Error('Failed to fetch active experiences');
  }

  // Find URLs that are active but not in the latest scrape
  const activeUrls = activeExperiences?.map((e: { original_url: string }) => e.original_url) || [];
  const staleUrls = activeUrls.filter((url: string) => !scrapedUrls.includes(url));

  if (staleUrls.length === 0) {
    return 0;
  }

  // Deactivate stale experiences
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: updateError } = await (supabase as any)
    .from('experiences')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .in('original_url', staleUrls);

  if (updateError) {
    console.error('Error deactivating stale experiences:', updateError);
    throw new Error('Failed to deactivate stale experiences');
  }

  return staleUrls.length;
}

// Run migration (creates the table if it doesn't exist)
export async function runExperiencesMigration(): Promise<boolean> {
  const supabase = getAdminClient();

  const migrationSQL = `
    CREATE TABLE IF NOT EXISTS experiences (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10,2),
      price_currency TEXT DEFAULT 'BHD',
      image_url TEXT,
      venue TEXT,
      location TEXT,
      category TEXT,
      type TEXT NOT NULL,
      original_url TEXT UNIQUE NOT NULL,
      affiliate_url TEXT NOT NULL,
      source TEXT DEFAULT 'platinumlist',
      start_date TIMESTAMP WITH TIME ZONE,
      end_date TIMESTAMP WITH TIME ZONE,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_experiences_type ON experiences(type);
    CREATE INDEX IF NOT EXISTS idx_experiences_is_active ON experiences(is_active);
    CREATE INDEX IF NOT EXISTS idx_experiences_category ON experiences(category);
    CREATE INDEX IF NOT EXISTS idx_experiences_source ON experiences(source);
  `;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).rpc('exec_sql', { sql: migrationSQL });

  if (error) {
    // If rpc doesn't exist, try running directly
    console.log('RPC not available, table may already exist or needs manual creation');
    return false;
  }

  return true;
}
