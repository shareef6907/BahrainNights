import { getAdminClient } from '@/lib/supabase/server';
import type { Sponsor, SponsorInsert } from '@/types/database';

// SponsorUpdate type (partial of SponsorInsert)
type SponsorUpdate = Partial<SponsorInsert>;

export interface SponsorFilters {
  tier?: Sponsor['tier'] | 'all';
  status?: string | 'all';
  search?: string;
  limit?: number;
  offset?: number;
}

// Get all sponsors with optional filters
export async function getSponsors(filters: SponsorFilters = {}): Promise<Sponsor[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('sponsors')
    .select('*')
    .order('tier', { ascending: true })
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (filters.tier && filters.tier !== 'all') {
    query = query.eq('tier', filters.tier);
  }

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching sponsors:', error);
    throw new Error('Failed to fetch sponsors');
  }

  return (data || []) as Sponsor[];
}

// Get active sponsors
export async function getActiveSponsors(): Promise<Sponsor[]> {
  return getSponsors({ status: 'active' });
}

// Get active sponsors by tier
export async function getActiveSponsorsByTier(tier: Sponsor['tier']): Promise<Sponsor[]> {
  return getSponsors({ tier, status: 'active' });
}

// Get golden sponsors (highest tier)
export async function getGoldenSponsors(): Promise<Sponsor[]> {
  return getActiveSponsorsByTier('golden');
}

// Get silver sponsors
export async function getSilverSponsors(): Promise<Sponsor[]> {
  return getActiveSponsorsByTier('silver');
}

// Get sponsor by ID
export async function getSponsorById(id: string): Promise<Sponsor | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching sponsor by ID:', error);
    throw new Error('Failed to fetch sponsor');
  }

  return data as Sponsor;
}

// Create sponsor
export async function createSponsor(sponsor: SponsorInsert): Promise<Sponsor> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('sponsors')
    .insert(sponsor as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating sponsor:', error);
    throw new Error('Failed to create sponsor');
  }

  return data as Sponsor;
}

// Update sponsor
export async function updateSponsor(id: string, updates: SponsorUpdate): Promise<Sponsor> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('sponsors')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating sponsor:', error);
    throw new Error('Failed to update sponsor');
  }

  return data as Sponsor;
}

// Delete sponsor
export async function deleteSponsor(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('sponsors')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting sponsor:', error);
    throw new Error('Failed to delete sponsor');
  }
}

// Activate sponsor
export async function activateSponsor(id: string): Promise<Sponsor> {
  return updateSponsor(id, { status: 'active' });
}

// Pause sponsor
export async function pauseSponsor(id: string): Promise<Sponsor> {
  return updateSponsor(id, { status: 'paused' });
}

// Mark sponsor as expired
export async function expireSponsor(id: string): Promise<Sponsor> {
  return updateSponsor(id, { status: 'expired' });
}

// Get sponsors grouped by tier
export async function getSponsorsGroupedByTier(): Promise<Record<string, Sponsor[]>> {
  const sponsors = await getActiveSponsors();

  const grouped: Record<string, Sponsor[]> = {
    golden: [],
    silver: [],
  };

  sponsors.forEach(sponsor => {
    if (grouped[sponsor.tier]) {
      grouped[sponsor.tier].push(sponsor);
    }
  });

  return grouped;
}

// Count sponsors by tier
export async function countSponsorsByTier(): Promise<Record<string, number>> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('sponsors')
    .select('tier, status');

  if (error) {
    console.error('Error counting sponsors:', error);
    return {};
  }

  const sponsors = (data || []) as { tier: string; status: string | null }[];
  const counts: Record<string, number> = {
    total: sponsors.length,
    active: 0,
    golden: 0,
    silver: 0,
  };

  sponsors.forEach(s => {
    if (s.status === 'active') {
      counts.active += 1;
      counts[s.tier] = (counts[s.tier] || 0) + 1;
    }
  });

  return counts;
}

// Check if sponsor contract is expiring soon
export async function getExpiringSoonSponsors(daysAhead: number = 30): Promise<Sponsor[]> {
  const supabase = getAdminClient();

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysAhead);
  const today = new Date().toISOString().split('T')[0];
  const futureDateStr = futureDate.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('status', 'active')
    .gte('end_date', today)
    .lte('end_date', futureDateStr)
    .order('end_date', { ascending: true });

  if (error) {
    console.error('Error fetching expiring sponsors:', error);
    return [];
  }

  return (data || []) as Sponsor[];
}

// Get total sponsor revenue
export async function getSponsorRevenue(): Promise<number> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('sponsors')
    .select('price_bd')
    .eq('status', 'active');

  if (error) {
    console.error('Error calculating sponsor revenue:', error);
    return 0;
  }

  const sponsors = (data || []) as { price_bd: number }[];
  return sponsors.reduce((sum, s) => sum + (s.price_bd || 0), 0);
}
