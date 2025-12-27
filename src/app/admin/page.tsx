'use client';

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
  XCircle,
  PlusCircle,
} from 'lucide-react';

// Mock data
const mockStats = {
  totalVenues: 245,
  approvedVenues: 230,
  pendingVenues: 12,
  rejectedVenues: 3,
  totalEvents: 1247,
  eventsThisMonth: 156,
  totalUsers: 150,
  pageViewsToday: 3421,
  pageViewsTrend: 12,
  activeAds: 5,
  revenueThisMonth: 2500,
  revenueTrend: 8,
};

const mockPendingVenues = [
  { id: 'v1', name: 'Cafe Lilou', category: 'Cafe', area: 'Adliya', registeredAgo: '2 days ago' },
  { id: 'v2', name: 'Block 338', category: 'Bar', area: 'Adliya', registeredAgo: '1 day ago' },
  { id: 'v3', name: 'The Meat Company', category: 'Restaurant', area: 'Seef', registeredAgo: 'today' },
];

const mockPendingEvents = [
  { id: 'e1', title: 'Wine Tasting Night', venue: 'The Orangery', date: 'Jan 5' },
  { id: 'e2', title: 'Kids Art Workshop', venue: 'Bahrain National Museum', date: 'Jan 8' },
  { id: 'e3', title: 'Beach Party', venue: 'Coral Bay', date: 'Jan 10' },
  { id: 'e4', title: 'Stand-up Comedy', venue: 'The Junction', date: 'Jan 12' },
  { id: 'e5', title: 'Food Festival', venue: 'Gulf Hotel', date: 'Jan 15' },
];

const mockRecentActivity = [
  { id: 1, type: 'venue', text: 'New venue registered: Cafe Lilou', time: '2 hours ago' },
  { id: 2, type: 'event', text: 'Event approved: Jazz Night at The Orangery', time: '4 hours ago' },
  { id: 3, type: 'ad', text: 'Ad expired: Ritz-Carlton NYE Banner', time: '6 hours ago' },
  { id: 4, type: 'venue', text: 'Venue approved: Saffron Restaurant', time: '1 day ago' },
  { id: 5, type: 'event', text: 'New event submitted: Beach Party at Coral Bay', time: '1 day ago' },
];

const mockTopVenues = [
  { name: 'The Orangery', views: 2450, change: 15 },
  { name: 'Gulf Hotel', views: 1890, change: 8 },
  { name: 'Ritz-Carlton', views: 1650, change: -3 },
  { name: 'Coral Bay', views: 1420, change: 22 },
  { name: "Trader Vic's", views: 1180, change: 5 },
];

const mockTopEvents = [
  { name: 'NYE Gala at Ritz-Carlton', views: 3200, change: 45 },
  { name: 'Friday Brunch at Gulf Hotel', views: 2100, change: 12 },
  { name: 'Jazz Night at The Orangery', views: 1560, change: 8 },
  { name: 'Beach Party at Coral Bay', views: 1230, change: 30 },
  { name: 'Ladies Night at Amber', views: 980, change: -5 },
];

const mockDailyViews = [
  { day: 'Mon', views: 2450 },
  { day: 'Tue', views: 3120 },
  { day: 'Wed', views: 2890 },
  { day: 'Thu', views: 3560 },
  { day: 'Fri', views: 4230 },
  { day: 'Sat', views: 5120 },
  { day: 'Sun', views: 3421 },
];

const mockCategoryData = [
  { category: 'Dining', count: 450, color: 'bg-orange-400' },
  { category: 'Nightlife', count: 320, color: 'bg-purple-400' },
  { category: 'Cultural', count: 210, color: 'bg-blue-400' },
  { category: 'Family', count: 180, color: 'bg-green-400' },
  { category: 'Sports', count: 87, color: 'bg-red-400' },
];

export default function AdminDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const pendingTotal = mockStats.pendingVenues + mockPendingEvents.length;

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
          {pendingTotal} items pending approval
        </p>
      </motion.div>

      {/* Pending Approvals Alert */}
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
              You have <span className="text-orange-400 font-medium">{mockStats.pendingVenues} venues</span> and{' '}
              <span className="text-orange-400 font-medium">{mockPendingEvents.length} events</span> pending approval
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
              <p className="text-3xl font-bold text-white mt-1">{mockStats.totalVenues}</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <span className="text-green-400">{mockStats.approvedVenues} approved</span>
                <span className="text-gray-500">•</span>
                <span className="text-orange-400">{mockStats.pendingVenues} pending</span>
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
              <p className="text-3xl font-bold text-white mt-1">{mockStats.totalEvents}</p>
              <p className="text-sm text-gray-500 mt-2">
                {mockStats.eventsThisMonth} this month
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
              <p className="text-3xl font-bold text-white mt-1">{mockStats.totalUsers}</p>
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
                {mockStats.pageViewsToday.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+{mockStats.pageViewsTrend}%</span>
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
              <p className="text-3xl font-bold text-white mt-1">{mockStats.activeAds}</p>
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
                BD {mockStats.revenueThisMonth.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+{mockStats.revenueTrend}%</span>
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
        {/* Daily Page Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Daily Page Views</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {mockDailyViews.map((data, index) => {
              const maxViews = Math.max(...mockDailyViews.map((d) => d.views));
              const height = (data.views / maxViews) * 100;

              return (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="w-full bg-gradient-to-t from-cyan-500 to-teal-400 rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1A1A2E] rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.views.toLocaleString()}
                    </div>
                  </motion.div>
                  <span className="text-xs text-gray-400">{data.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Events by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Events by Category</h3>
          <div className="space-y-4">
            {mockCategoryData.map((cat) => {
              const maxCount = Math.max(...mockCategoryData.map((c) => c.count));
              const width = (cat.count / maxCount) * 100;

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
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => (
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
        </motion.div>

        {/* Top Venues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Top Venues by Views</h3>
          <div className="space-y-3">
            {mockTopVenues.map((venue, index) => (
              <div key={venue.name} className="flex items-center justify-between py-2">
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
                  <span
                    className={`text-xs ${
                      venue.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {venue.change >= 0 ? '+' : ''}
                    {venue.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Top Events by Views</h3>
          <div className="space-y-3">
            {mockTopEvents.map((event, index) => (
              <div key={event.name} className="flex items-center justify-between py-2">
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
                  <span
                    className={`text-xs ${
                      event.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {event.change >= 0 ? '+' : ''}
                    {event.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
