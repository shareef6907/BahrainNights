'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2,
  Calendar,
  Users,
  Eye,
  Megaphone,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  PlusCircle,
  Loader2,
} from 'lucide-react';

interface DashboardStats {
  totalVenues: number;
  approvedVenues: number;
  pendingVenues: number;
  rejectedVenues: number;
  totalEvents: number;
  eventsThisMonth: number;
  totalUsers: number;
  pageViewsToday: number;
  pageViewsTrend: number;
  activeAds: number;
  revenueThisMonth: number;
  revenueTrend: number;
}

interface PendingVenue {
  id: string;
  name: string;
  category: string;
  registeredAgo: string;
}

interface ActivityItem {
  id: string;
  type: string;
  text: string;
  time: string;
}

interface TopItem {
  id: string;
  name: string;
  views: number;
  change: number;
}

interface CategoryData {
  category: string;
  count: number;
  color: string;
}

interface DashboardData {
  stats: DashboardStats;
  pendingVenues: PendingVenue[];
  recentActivity: ActivityItem[];
  topVenues: TopItem[];
  topEvents: TopItem[];
  categoryData: CategoryData[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/dashboard/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { stats, pendingVenues, recentActivity, topVenues, topEvents, categoryData } = data;
  const pendingTotal = stats.pendingVenues + 0; // Add pending events count if available

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">{currentDate}</p>
        <p className="text-cyan-400 text-sm mt-2">
          {pendingTotal > 0 ? `${pendingTotal} items pending approval` : 'All caught up!'}
        </p>
      </motion.div>

      {/* Pending Approvals Alert */}
      {stats.pendingVenues > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Pending Approvals</h3>
              <p className="text-gray-300 mt-1">
                You have <span className="text-orange-400 font-medium">{stats.pendingVenues} venues</span> pending approval
              </p>
            </div>
            <Link
              href="/admin/venues?status=pending"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Review Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Venues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Venues</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalVenues}</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <span className="text-green-400">{stats.approvedVenues} approved</span>
                <span className="text-gray-500">•</span>
                <span className="text-orange-400">{stats.pendingVenues} pending</span>
              </div>
            </div>
            <div className="p-3 bg-cyan-500/20 rounded-xl">
              <Building2 className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </motion.div>

        {/* Total Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Events</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalEvents}</p>
              <p className="text-sm text-gray-500 mt-2">
                {stats.eventsThisMonth} this month
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </motion.div>

        {/* Total Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalUsers}</p>
              <p className="text-sm text-gray-500 mt-2">Venue owners</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </motion.div>

        {/* Page Views Today */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Page Views Today</p>
              <p className="text-3xl font-bold text-white mt-1">
                {stats.pageViewsToday.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {stats.pageViewsTrend >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm ${stats.pageViewsTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.pageViewsTrend >= 0 ? '+' : ''}{stats.pageViewsTrend}%
                </span>
                <span className="text-xs text-gray-500">vs yesterday</span>
              </div>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </motion.div>

        {/* Active Ads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Ads</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.activeAds}</p>
              <p className="text-sm text-gray-500 mt-2">of 5 slots filled</p>
            </div>
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <Megaphone className="w-6 h-6 text-pink-400" />
            </div>
          </div>
        </motion.div>

        {/* Revenue This Month */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Revenue This Month</p>
              <p className="text-3xl font-bold text-white mt-1">
                BD {stats.revenueThisMonth.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {stats.revenueTrend >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm ${stats.revenueTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.revenueTrend >= 0 ? '+' : ''}{stats.revenueTrend}%
                </span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="flex flex-wrap gap-3"
      >
        <Link
          href="/admin/venues?status=pending"
          className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Review Pending Venues
        </Link>
        <Link
          href="/admin/events?status=pending"
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-xl transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Review Pending Events
        </Link>
        <Link
          href="/admin/ads/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 rounded-xl transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Ad
        </Link>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Events by Category</h3>
          {categoryData.length > 0 ? (
            <div className="space-y-4">
              {categoryData.map((cat) => {
                const maxCount = Math.max(...categoryData.map((c) => c.count));
                const width = maxCount > 0 ? (cat.count / maxCount) * 100 : 0;

                return (
                  <div key={cat.category} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{cat.category}</span>
                      <span className="text-white font-medium">{cat.count}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${cat.color} rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No events data available</p>
          )}
        </motion.div>

        {/* Pending Venues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Pending Venues</h3>
          {pendingVenues.length > 0 ? (
            <div className="space-y-3">
              {pendingVenues.map((venue) => (
                <div key={venue.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-gray-300 text-sm">{venue.name}</p>
                    <p className="text-gray-500 text-xs">{venue.category} • {venue.registeredAgo}</p>
                  </div>
                  <Link
                    href={`/admin/venues/${venue.id}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No pending venues</p>
          )}
        </motion.div>
      </div>

      {/* Recent Activity & Top Performing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === 'venue'
                        ? 'bg-cyan-500/20'
                        : activity.type === 'event'
                        ? 'bg-purple-500/20'
                        : 'bg-pink-500/20'
                    }`}
                  >
                    {activity.type === 'venue' ? (
                      <Building2 className="w-4 h-4 text-cyan-400" />
                    ) : activity.type === 'event' ? (
                      <Calendar className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Megaphone className="w-4 h-4 text-pink-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">{activity.text}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          )}
        </motion.div>

        {/* Top Venues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Top Venues by Views</h3>
          {topVenues.length > 0 ? (
            <div className="space-y-3">
              {topVenues.map((venue, index) => (
                <div key={venue.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm text-gray-400">
                      {index + 1}
                    </span>
                    <span className="text-gray-300 text-sm">{venue.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">
                      {venue.views.toLocaleString()}
                    </span>
                    {venue.change !== 0 && (
                      <span
                        className={`text-xs ${
                          venue.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {venue.change >= 0 ? '+' : ''}
                        {venue.change}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No venue data available</p>
          )}
        </motion.div>

        {/* Top Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Top Events by Views</h3>
          {topEvents.length > 0 ? (
            <div className="space-y-3">
              {topEvents.map((event, index) => (
                <div key={event.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm text-gray-400">
                      {index + 1}
                    </span>
                    <span className="text-gray-300 text-sm truncate max-w-[150px]">
                      {event.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">
                      {event.views.toLocaleString()}
                    </span>
                    {event.change !== 0 && (
                      <span
                        className={`text-xs ${
                          event.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {event.change >= 0 ? '+' : ''}
                        {event.change}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No event data available</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
