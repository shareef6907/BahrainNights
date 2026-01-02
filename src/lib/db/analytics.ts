import { getAdminClient } from '@/lib/supabase/server';
import type { PageView, PageViewInsert, ActivityLog, ActivityLogInsert, Json } from '@/types/database';

export interface AnalyticsDateRange {
  startDate: string;
  endDate: string;
}

export interface PageViewFilters {
  pageType?: string;
  referenceId?: string;
  dateRange?: AnalyticsDateRange;
  limit?: number;
}

export interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  pageViewsByType: Record<string, number>;
  topPages: Array<{ pageType: string; referenceId: string | null; views: number }>;
  dailyViews: Array<{ date: string; views: number }>;
}

// Track a page view
export async function trackPageView(data: {
  pagePath: string;
  pageType?: string;
  referenceId?: string;
  ipHash?: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  countryCode?: string;
  city?: string;
}): Promise<void> {
  const supabase = getAdminClient();

  const pageView: PageViewInsert = {
    page_path: data.pagePath,
    page_type: data.pageType || null,
    reference_id: data.referenceId || null,
    ip_hash: data.ipHash || null,
    user_agent: data.userAgent || null,
    referrer: data.referrer || null,
    country: data.country || null,
    country_code: data.countryCode || null,
    city: data.city || null,
  };

  const { error } = await supabase
    .from('page_views')
    .insert(pageView as any);

  if (error) {
    console.error('Error tracking page view:', error);
    // Don't throw - analytics shouldn't break the app
  }
}

// Get page views with filters
export async function getPageViews(filters: PageViewFilters = {}): Promise<PageView[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('page_views')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.pageType) {
    query = query.eq('page_type', filters.pageType);
  }

  if (filters.referenceId) {
    query = query.eq('reference_id', filters.referenceId);
  }

  if (filters.dateRange) {
    query = query
      .gte('created_at', filters.dateRange.startDate)
      .lte('created_at', filters.dateRange.endDate);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching page views:', error);
    return [];
  }

  return (data || []) as PageView[];
}

// Get analytics data for a date range
export async function getAnalytics(dateRange: AnalyticsDateRange): Promise<AnalyticsData> {
  const supabase = getAdminClient();

  // Get all page views in the date range
  const { data: pageViews, error } = await supabase
    .from('page_views')
    .select('*')
    .gte('created_at', dateRange.startDate)
    .lte('created_at', dateRange.endDate);

  if (error) {
    console.error('Error fetching analytics:', error);
    return {
      totalPageViews: 0,
      uniqueVisitors: 0,
      pageViewsByType: {},
      topPages: [],
      dailyViews: [],
    };
  }

  const views = (pageViews || []) as PageView[];

  // Calculate metrics
  const totalPageViews = views.length;

  // Unique visitors (by ip_hash)
  const uniqueVisitorIds = new Set(views.map(v => v.ip_hash).filter(Boolean));
  const uniqueVisitors = uniqueVisitorIds.size;

  // Page views by type
  const pageViewsByType: Record<string, number> = {};
  views.forEach(v => {
    const pageType = v.page_type || 'unknown';
    pageViewsByType[pageType] = (pageViewsByType[pageType] || 0) + 1;
  });

  // Top pages
  const pageCountMap = new Map<string, number>();
  views.forEach(v => {
    const pageType = v.page_type || 'page';
    const key = `${pageType}:${v.reference_id || 'home'}`;
    pageCountMap.set(key, (pageCountMap.get(key) || 0) + 1);
  });

  const topPages = Array.from(pageCountMap.entries())
    .map(([key, viewCount]) => {
      const [pageType, referenceId] = key.split(':');
      return {
        pageType,
        referenceId: referenceId === 'home' ? null : referenceId,
        views: viewCount,
      };
    })
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Daily views
  const dailyViewsMap = new Map<string, number>();
  views.forEach(v => {
    const date = v.created_at.split('T')[0];
    dailyViewsMap.set(date, (dailyViewsMap.get(date) || 0) + 1);
  });

  const dailyViews = Array.from(dailyViewsMap.entries())
    .map(([date, viewCount]) => ({ date, views: viewCount }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalPageViews,
    uniqueVisitors,
    pageViewsByType,
    topPages,
    dailyViews,
  };
}

// Get analytics summary for dashboard
export async function getDashboardAnalytics(): Promise<{
  today: AnalyticsData;
  thisWeek: AnalyticsData;
  thisMonth: AnalyticsData;
}> {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // This week (Monday to Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  const startOfWeekStr = startOfWeek.toISOString().split('T')[0];

  // This month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfMonthStr = startOfMonth.toISOString().split('T')[0];

  const [todayData, weekData, monthData] = await Promise.all([
    getAnalytics({ startDate: todayStr, endDate: todayStr }),
    getAnalytics({ startDate: startOfWeekStr, endDate: todayStr }),
    getAnalytics({ startDate: startOfMonthStr, endDate: todayStr }),
  ]);

  return {
    today: todayData,
    thisWeek: weekData,
    thisMonth: monthData,
  };
}

// Get page view count for a specific page
export async function getPageViewCount(pageType: string, referenceId?: string): Promise<number> {
  const supabase = getAdminClient();

  let query = supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .eq('page_type', pageType);

  if (referenceId) {
    query = query.eq('reference_id', referenceId);
  }

  const { count, error } = await query;

  if (error) {
    console.error('Error counting page views:', error);
    return 0;
  }

  return count || 0;
}

// Log activity
export async function logActivity(data: {
  userId?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
}): Promise<void> {
  const supabase = getAdminClient();

  const activity: ActivityLogInsert = {
    user_id: data.userId || null,
    action: data.action,
    entity_type: data.entityType || null,
    entity_id: data.entityId || null,
    details: data.details as Json || null,
    ip_address: data.ipAddress || null,
  };

  const { error } = await supabase
    .from('activity_log')
    .insert(activity as any);

  if (error) {
    console.error('Error logging activity:', error);
    // Don't throw - logging shouldn't break the app
  }
}

// Get activity logs
export async function getActivityLogs(filters: {
  userId?: string;
  action?: string;
  entityType?: string;
  limit?: number;
} = {}): Promise<ActivityLog[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('activity_log')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.userId) {
    query = query.eq('user_id', filters.userId);
  }

  if (filters.action) {
    query = query.eq('action', filters.action);
  }

  if (filters.entityType) {
    query = query.eq('entity_type', filters.entityType);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  } else {
    query = query.limit(100);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching activity logs:', error);
    return [];
  }

  return (data || []) as ActivityLog[];
}

// Get recent activity for a specific entity
export async function getEntityActivity(entityType: string, entityId: string, limit: number = 20): Promise<ActivityLog[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching entity activity:', error);
    return [];
  }

  return (data || []) as ActivityLog[];
}

// Get user activity
export async function getUserActivity(userId: string, limit: number = 50): Promise<ActivityLog[]> {
  return getActivityLogs({ userId, limit });
}

// Clean up old page views (for maintenance)
export async function cleanupOldPageViews(daysToKeep: number = 90): Promise<number> {
  const supabase = getAdminClient();

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
  const cutoffDateStr = cutoffDate.toISOString();

  const { data, error } = await supabase
    .from('page_views')
    .delete()
    .lt('created_at', cutoffDateStr)
    .select('id');

  if (error) {
    console.error('Error cleaning up page views:', error);
    return 0;
  }

  return data?.length || 0;
}

// Get trending content (most viewed in last 7 days)
export async function getTrendingContent(limit: number = 10): Promise<Array<{
  pageType: string;
  referenceId: string;
  views: number;
}>> {
  const supabase = getAdminClient();

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString();

  const { data, error } = await supabase
    .from('page_views')
    .select('page_type, reference_id')
    .gte('created_at', weekAgoStr)
    .not('reference_id', 'is', null);

  if (error) {
    console.error('Error fetching trending content:', error);
    return [];
  }

  // Count views per page
  const views = (data || []) as { page_type: string | null; reference_id: string | null }[];
  const pageCountMap = new Map<string, { pageType: string; referenceId: string; views: number }>();
  views.forEach(v => {
    const pageType = v.page_type || 'page';
    const referenceId = v.reference_id || '';
    if (!referenceId) return;

    const key = `${pageType}:${referenceId}`;
    if (!pageCountMap.has(key)) {
      pageCountMap.set(key, { pageType, referenceId, views: 0 });
    }
    pageCountMap.get(key)!.views += 1;
  });

  return Array.from(pageCountMap.values())
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}
