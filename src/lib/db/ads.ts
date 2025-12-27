import { getAdminClient } from '@/lib/supabase/server';
import type { HomepageAd, HomepageAdInsert, HomepageAdUpdate } from '@/types/database';

export interface AdFilters {
  status?: HomepageAd['status'] | 'all';
  paymentStatus?: HomepageAd['payment_status'];
  slotPosition?: number;
  search?: string;
  limit?: number;
  offset?: number;
}

// Get all ads with optional filters
export async function getAds(filters: AdFilters = {}): Promise<HomepageAd[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('homepage_ads')
    .select('*')
    .order('slot_position', { ascending: true });

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.paymentStatus) {
    query = query.eq('payment_status', filters.paymentStatus);
  }

  if (filters.slotPosition) {
    query = query.eq('slot_position', filters.slotPosition);
  }

  if (filters.search) {
    query = query.or(`advertiser_name.ilike.%${filters.search}%,title.ilike.%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching ads:', error);
    throw new Error('Failed to fetch ads');
  }

  return (data || []) as HomepageAd[];
}

// Get active ads for homepage slider
export async function getActiveAds(): Promise<HomepageAd[]> {
  const supabase = getAdminClient();
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('homepage_ads')
    .select('*')
    .eq('status', 'active')
    .lte('start_date', today)
    .gte('end_date', today)
    .order('slot_position', { ascending: true });

  if (error) {
    console.error('Error fetching active ads:', error);
    return [];
  }

  return (data || []) as HomepageAd[];
}

// Get ad by ID
export async function getAdById(id: string): Promise<HomepageAd | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('homepage_ads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching ad by ID:', error);
    throw new Error('Failed to fetch ad');
  }

  return data as HomepageAd;
}

// Create ad
export async function createAd(ad: HomepageAdInsert): Promise<HomepageAd> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('homepage_ads')
    .insert(ad as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating ad:', error);
    throw new Error('Failed to create ad');
  }

  return data as HomepageAd;
}

// Update ad
export async function updateAd(id: string, updates: HomepageAdUpdate): Promise<HomepageAd> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('homepage_ads')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating ad:', error);
    throw new Error('Failed to update ad');
  }

  return data as HomepageAd;
}

// Delete ad
export async function deleteAd(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('homepage_ads')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting ad:', error);
    throw new Error('Failed to delete ad');
  }
}

// Track ad impression
export async function trackAdImpression(id: string): Promise<void> {
  const ad = await getAdById(id);
  if (ad) {
    await updateAd(id, { impressions: ad.impressions + 1 });
  }
}

// Track ad click
export async function trackAdClick(id: string, ipHash?: string, userAgent?: string): Promise<void> {
  const supabase = getAdminClient();

  // Update click count
  const ad = await getAdById(id);
  if (ad) {
    await updateAd(id, { clicks: ad.clicks + 1 });
  }

  // Log click
  await supabase.from('ad_clicks').insert({
    ad_id: id,
    ip_hash: ipHash,
    user_agent: userAgent,
  } as any);
}

// Pause ad
export async function pauseAd(id: string): Promise<HomepageAd> {
  return updateAd(id, { status: 'paused' });
}

// Activate ad
export async function activateAd(id: string): Promise<HomepageAd> {
  return updateAd(id, { status: 'active' });
}

// Mark ad as paid
export async function markAdPaid(id: string, paymentDate?: string): Promise<HomepageAd> {
  return updateAd(id, {
    payment_status: 'paid',
    payment_date: paymentDate || new Date().toISOString().split('T')[0],
  });
}

// Get ad stats
export async function getAdStats(): Promise<{
  totalRevenue: number;
  totalImpressions: number;
  totalClicks: number;
  activeAds: number;
}> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('homepage_ads')
    .select('price_bd, impressions, clicks, status, payment_status');

  if (error) {
    console.error('Error fetching ad stats:', error);
    return {
      totalRevenue: 0,
      totalImpressions: 0,
      totalClicks: 0,
      activeAds: 0,
    };
  }

  const stats = {
    totalRevenue: 0,
    totalImpressions: 0,
    totalClicks: 0,
    activeAds: 0,
  };

  const ads = (data || []) as HomepageAd[];
  ads.forEach(ad => {
    if (ad.payment_status === 'paid') {
      stats.totalRevenue += ad.price_bd || 0;
    }
    stats.totalImpressions += ad.impressions || 0;
    stats.totalClicks += ad.clicks || 0;
    if (ad.status === 'active') {
      stats.activeAds += 1;
    }
  });

  return stats;
}

// Check available slots
export async function getAvailableSlots(startDate: string, endDate: string): Promise<number[]> {
  const supabase = getAdminClient();

  // Get ads that overlap with the date range
  const { data, error } = await supabase
    .from('homepage_ads')
    .select('slot_position')
    .or(`status.eq.active,status.eq.pending`)
    .lte('start_date', endDate)
    .gte('end_date', startDate);

  if (error) {
    console.error('Error checking slots:', error);
    return [1, 2, 3, 4, 5];
  }

  const ads = (data || []) as { slot_position: number | null }[];
  const takenSlots = new Set(ads.map(ad => ad.slot_position).filter(Boolean));
  const availableSlots = [1, 2, 3, 4, 5].filter(slot => !takenSlots.has(slot));

  return availableSlots;
}

// Generate invoice number
export async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const supabase = getAdminClient();

  const { count } = await supabase
    .from('homepage_ads')
    .select('*', { count: 'exact', head: true })
    .like('invoice_number', `INV-${year}-%`);

  const nextNumber = ((count || 0) + 1).toString().padStart(3, '0');
  return `INV-${year}-${nextNumber}`;
}
