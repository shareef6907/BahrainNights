'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Users,
  Calendar,
  Building2,
  Heart,
  TrendingUp,
  Film,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  BarChart3,
  Loader2,
  Mail,
  Globe,
  Activity,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface AnalyticsData {
  overview: {
    venues: {
      total: number;
      approved: number;
      pending: number;
      rejected: number;
    };
    events: {
      total: number;
      published: number;
      pending: number;
      thisMonth: number;
      upcoming: number;
    };
    users: {
      publicUsers: number;
      venueOwners: number;
    };
    likes: {
      venues: number;
      events: number;
      total: number;
      today: number;
      thisWeek: number;
      thisMonth: number;
    };
    views: {
      totalVenueViews: number;
      totalEventViews: number;
      total: number;
    };
    ads: {
      total: number;
      active: number;
      totalSlots: number;
    };
    revenue: {
      thisMonth: number;
      total: number;
    };
    movies: {
      total: number;
      nowShowing: number;
      comingSoon: number;
    };
    subscribers: number;
    visitors: {
      totalPageViews: number;
      uniqueVisitors: number;
      today: number;
      todayPageViews: number;
      thisWeek: number;
      weekPageViews: number;
      thisMonth: number;
      monthPageViews: number;
    };
  };
  visitorsByCountry: Record<string, { pageViews: number; uniqueVisitors: number }>;
  dailyTraffic: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
  topVenues: {
    byLikes: Array<{
      id: string;
      name: string;
      slug: string;
      like_count: number;
      view_count: number;
      category: string;
    }>;
    byViews: Array<{
      id: string;
      name: string;
      slug: string;
      like_count: number;
      view_count: number;
      category: string;
    }>;
  };
  topEvents: {
    byViews: Array<{
      id: string;
      title: string;
      slug: string;
      view_count: number;
      like_count: number;
      venue_name: string;
      start_date: string;
    }>;
  };
  venuesByCategory: Record<string, number>;
  eventsByCategory: Record<string, number>;
  recentActivity: {
    venues: Array<{
      id: string;
      name: string;
      status: string;
      created_at: string;
      category: string;
    }>;
    events: Array<{
      id: string;
      title: string;
      status: string;
      created_at: string;
      venue_name: string;
      start_date: string;
    }>;
  };
  generatedAt: string;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/admin/analytics');
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      const analyticsData = await response.json();
      setData(analyticsData);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isLoading && !data) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading analytics data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error && !data) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!data) return null;

  const { overview, topVenues, topEvents, venuesByCategory, eventsByCategory, recentActivity, visitorsByCountry, dailyTraffic } = data;

  // Calculate category bar widths
  const maxVenueCategory = Math.max(...Object.values(venuesByCategory), 1);
  const maxEventCategory = Math.max(...Object.values(eventsByCategory), 1);

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Platform Analytics</h1>
            <p className="text-gray-400 mt-1">Real-time statistics from the database</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
            <button
              onClick={fetchAnalytics}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Venues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-gray-400">Total Venues</span>
            </div>
            <p className="text-3xl font-bold text-white">{overview.venues.total}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-green-400">{overview.venues.approved} approved</span>
              <span className="text-gray-500">|</span>
              <span className="text-yellow-400">{overview.venues.pending} pending</span>
            </div>
          </motion.div>

          {/* Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Calendar className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-gray-400">Total Events</span>
            </div>
            <p className="text-3xl font-bold text-white">{overview.events.total}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-green-400">{overview.events.published} published</span>
              <span className="text-gray-500">|</span>
              <span className="text-yellow-400">{overview.events.pending} pending</span>
            </div>
          </motion.div>

          {/* Total Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Eye className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-gray-400">Total Views</span>
            </div>
            <p className="text-3xl font-bold text-white">{formatNumber(overview.views.total)}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-cyan-400">{formatNumber(overview.views.totalVenueViews)} venues</span>
              <span className="text-gray-500">|</span>
              <span className="text-pink-400">{formatNumber(overview.views.totalEventViews)} events</span>
            </div>
          </motion.div>

          {/* Total Likes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Heart className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-gray-400">Total Likes</span>
            </div>
            <p className="text-3xl font-bold text-white">{formatNumber(overview.likes.total)}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-green-400">+{overview.likes.today} today</span>
              <span className="text-gray-500">|</span>
              <span className="text-cyan-400">+{overview.likes.thisMonth} this month</span>
            </div>
          </motion.div>
        </div>

        {/* Website Visitors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Website Visitors</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total Page Views</p>
              <p className="text-2xl font-bold text-white">{formatNumber(overview.visitors?.totalPageViews || 0)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Unique Visitors</p>
              <p className="text-2xl font-bold text-white">{formatNumber(overview.visitors?.uniqueVisitors || 0)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Today</p>
              <p className="text-2xl font-bold text-green-400">{formatNumber(overview.visitors?.todayPageViews || 0)}</p>
              <p className="text-xs text-gray-500">{formatNumber(overview.visitors?.today || 0)} unique</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">This Week</p>
              <p className="text-2xl font-bold text-cyan-400">{formatNumber(overview.visitors?.weekPageViews || 0)}</p>
              <p className="text-xs text-gray-500">{formatNumber(overview.visitors?.thisWeek || 0)} unique</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">This Month</p>
              <p className="text-2xl font-bold text-purple-400">{formatNumber(overview.visitors?.monthPageViews || 0)}</p>
              <p className="text-xs text-gray-500">{formatNumber(overview.visitors?.thisMonth || 0)} unique</p>
            </div>
          </div>
        </motion.div>

        {/* Visitors by Country + Daily Traffic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Visitors by Country */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Globe className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Visitors by Country</h2>
            </div>

            {Object.keys(visitorsByCountry || {}).length === 0 ? (
              <p className="text-gray-500 text-center py-8">No country data yet - visitors will appear here</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(visitorsByCountry)
                  .sort((a, b) => b[1].pageViews - a[1].pageViews)
                  .slice(0, 10)
                  .map(([country, stats]) => {
                    const maxCount = Math.max(...Object.values(visitorsByCountry).map(s => s.pageViews), 1);
                    return (
                      <div key={country}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-300 text-sm truncate max-w-[150px]">
                            {country}
                          </span>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-white font-medium">{formatNumber(stats.pageViews)} <span className="text-gray-500 text-xs">views</span></span>
                            <span className="text-green-400">{formatNumber(stats.uniqueVisitors)} <span className="text-gray-500 text-xs">unique</span></span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${(stats.pageViews / maxCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </motion.div>

          {/* Daily Traffic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Daily Traffic (Last 30 Days)</h2>
            </div>

            {(dailyTraffic || []).length === 0 ? (
              <p className="text-gray-500 text-center py-8">No traffic data yet - views will appear here</p>
            ) : (
              <div className="space-y-2">
                <div className="flex items-end gap-1 h-32">
                  {(dailyTraffic || []).slice(-14).map((day, index) => {
                    const maxViews = Math.max(...(dailyTraffic || []).map(d => d.views), 1);
                    const height = (day.views / maxViews) * 100;
                    return (
                      <div
                        key={day.date}
                        className="flex-1 bg-cyan-500/30 hover:bg-cyan-500/50 rounded-t transition-colors relative group"
                        style={{ height: `${Math.max(height, 5)}%` }}
                      >
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          <br />
                          {day.views} views | {day.visitors} visitors
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{(dailyTraffic || []).length > 0 && new Date((dailyTraffic || [])[Math.max(0, (dailyTraffic || []).length - 14)]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span>Today</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {/* Movies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <Film className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-sm">Movies</span>
            </div>
            <p className="text-2xl font-bold text-white">{overview.movies.total}</p>
            <p className="text-xs text-gray-500">
              {overview.movies.nowShowing} showing | {overview.movies.comingSoon} coming
            </p>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-gray-400 text-sm">Upcoming Events</span>
            </div>
            <p className="text-2xl font-bold text-white">{overview.events.upcoming}</p>
            <p className="text-xs text-gray-500">{overview.events.thisMonth} created this month</p>
          </motion.div>

          {/* Public Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400 text-sm">Users</span>
            </div>
            <p className="text-2xl font-bold text-white">{overview.users.publicUsers}</p>
            <p className="text-xs text-gray-500">{overview.users.venueOwners} venue owners</p>
          </motion.div>

          {/* Active Ads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-orange-400" />
              <span className="text-gray-400 text-sm">Active Ads</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {overview.ads.active}/{overview.ads.totalSlots}
            </p>
            <p className="text-xs text-gray-500">{overview.ads.total} total ads</p>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-teal-400" />
              <span className="text-gray-400 text-sm">Subscribers</span>
            </div>
            <p className="text-2xl font-bold text-white">{overview.subscribers}</p>
            <p className="text-xs text-gray-500">newsletter signups</p>
          </motion.div>
        </div>

        {/* Revenue Card */}
        {overview.revenue.total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/30 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Ad Revenue</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-3xl font-bold text-white">BD {overview.revenue.thisMonth.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-white">BD {overview.revenue.total.toFixed(0)}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Venues by Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Eye className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Top Venues by Views</h2>
            </div>

            {topVenues.byViews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No venue data yet</p>
            ) : (
              <div className="space-y-4">
                {topVenues.byViews.slice(0, 5).map((venue, index) => (
                  <div key={venue.id} className="flex items-center gap-4">
                    <span className="text-cyan-400 font-bold w-6">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{venue.name}</p>
                      <p className="text-gray-500 text-sm">{venue.category || 'Uncategorized'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatNumber(venue.view_count || 0)}</p>
                      <p className="text-gray-500 text-sm">{formatNumber(venue.like_count || 0)} likes</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Top Venues by Likes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Heart className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Top Venues by Likes</h2>
            </div>

            {topVenues.byLikes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No venue data yet</p>
            ) : (
              <div className="space-y-4">
                {topVenues.byLikes.slice(0, 5).map((venue, index) => (
                  <div key={venue.id} className="flex items-center gap-4">
                    <span className="text-red-400 font-bold w-6">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{venue.name}</p>
                      <p className="text-gray-500 text-sm">{venue.category || 'Uncategorized'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatNumber(venue.like_count || 0)}</p>
                      <p className="text-gray-500 text-sm">{formatNumber(venue.view_count || 0)} views</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Venues by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Venues by Category</h2>
            </div>

            {Object.keys(venuesByCategory).length === 0 ? (
              <p className="text-gray-500 text-center py-8">No categories yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(venuesByCategory)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 8)
                  .map(([category, count]) => (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm truncate max-w-[180px]">
                          {category}
                        </span>
                        <span className="text-white font-medium">{count}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${(count / maxVenueCategory) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>

          {/* Events by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Calendar className="w-5 h-5 text-pink-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Events by Category</h2>
            </div>

            {Object.keys(eventsByCategory).length === 0 ? (
              <p className="text-gray-500 text-center py-8">No categories yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(eventsByCategory)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 8)
                  .map(([category, count]) => (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-300 text-sm truncate max-w-[180px]">
                          {category}
                        </span>
                        <span className="text-white font-medium">{count}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pink-500 rounded-full"
                          style={{ width: `${(count / maxEventCategory) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Top Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-pink-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Top Events by Views</h2>
          </div>

          {topEvents.byViews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No event data yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topEvents.byViews.slice(0, 6).map((event, index) => (
                <div key={event.id} className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-pink-400 font-bold">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{event.title}</p>
                      <p className="text-gray-500 text-sm truncate">{event.venue_name}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm">
                        <span className="text-cyan-400">{formatNumber(event.view_count || 0)} views</span>
                        <span className="text-red-400">{formatNumber(event.like_count || 0)} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Venues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Recent Venues</h2>
            </div>

            {recentActivity.venues.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent venues</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.venues.slice(0, 5).map((venue) => (
                  <div
                    key={venue.id}
                    className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
                  >
                    {getStatusIcon(venue.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{venue.name}</p>
                      <p className="text-gray-500 text-xs">
                        {venue.category || 'Uncategorized'} • {formatDate(venue.created_at)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        venue.status === 'approved'
                          ? 'bg-green-500/20 text-green-400'
                          : venue.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {venue.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Calendar className="w-5 h-5 text-pink-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Recent Events</h2>
            </div>

            {recentActivity.events.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent events</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.events.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
                  >
                    {getStatusIcon(event.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{event.title}</p>
                      <p className="text-gray-500 text-xs">
                        {event.venue_name} • {formatDate(event.created_at)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        event.status === 'published'
                          ? 'bg-green-500/20 text-green-400'
                          : event.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Data Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-6 text-center text-gray-500 text-sm"
        >
          All statistics are fetched in real-time from the database. Auto-refreshes every 30 seconds.
        </motion.div>
      </div>
    </AdminLayout>
  );
}
