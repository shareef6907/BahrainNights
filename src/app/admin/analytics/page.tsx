'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Calendar,
  Building2,
  MapPin,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Download,
  Filter,
  ArrowUpRight,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

// Mock analytics data
const overviewStats = [
  { label: 'Total Page Views', value: '1.2M', change: '+15.3%', trend: 'up', period: 'vs last month' },
  { label: 'Unique Visitors', value: '287K', change: '+8.7%', trend: 'up', period: 'vs last month' },
  { label: 'Avg. Session Duration', value: '4m 32s', change: '+12.1%', trend: 'up', period: 'vs last month' },
  { label: 'Bounce Rate', value: '34.2%', change: '-5.4%', trend: 'down', period: 'vs last month' },
];

const trafficByDay = [
  { day: 'Mon', views: 45000, visitors: 12000 },
  { day: 'Tue', views: 52000, visitors: 14000 },
  { day: 'Wed', views: 48000, visitors: 13000 },
  { day: 'Thu', views: 61000, visitors: 16000 },
  { day: 'Fri', views: 85000, visitors: 22000 },
  { day: 'Sat', views: 92000, visitors: 25000 },
  { day: 'Sun', views: 78000, visitors: 20000 },
];

const topPages = [
  { page: '/events', title: 'Events Listing', views: 245000, avgTime: '3m 45s' },
  { page: '/cinema', title: 'Cinema & Movies', views: 198000, avgTime: '2m 30s' },
  { page: '/', title: 'Homepage', views: 175000, avgTime: '1m 15s' },
  { page: '/venues', title: 'Venues Directory', views: 134000, avgTime: '4m 10s' },
  { page: '/calendar', title: 'Events Calendar', views: 98000, avgTime: '5m 20s' },
];

const topVenues = [
  { name: 'The Ritz-Carlton Bahrain', views: 45230, events: 12 },
  { name: 'Four Seasons Hotel', views: 38120, events: 8 },
  { name: 'Gulf Hotel Bahrain', views: 32450, events: 15 },
  { name: 'The Westin City Centre', views: 28900, events: 6 },
  { name: 'Jumeirah Royal Saray', views: 25600, events: 9 },
];

const topEvents = [
  { name: 'NYE Gala Night 2025', views: 28500, clicks: 4200, venue: 'The Ritz-Carlton' },
  { name: 'Friday Brunch Extravaganza', views: 22300, clicks: 3100, venue: 'Four Seasons' },
  { name: 'Live Jazz Night', views: 18900, clicks: 2800, venue: 'Gulf Hotel' },
  { name: 'F1 Viewing Party', views: 15600, clicks: 2200, venue: 'The Westin' },
  { name: 'Weekend Beach Party', views: 12400, clicks: 1900, venue: 'Coral Bay' },
];

const deviceStats = [
  { device: 'Mobile', percentage: 62, icon: Smartphone, color: 'cyan' },
  { device: 'Desktop', percentage: 31, icon: Monitor, color: 'purple' },
  { device: 'Tablet', percentage: 7, icon: Monitor, color: 'amber' },
];

const locationStats = [
  { country: 'Bahrain', visitors: 156000, percentage: 54 },
  { country: 'Saudi Arabia', visitors: 58000, percentage: 20 },
  { country: 'UAE', visitors: 32000, percentage: 11 },
  { country: 'Kuwait', visitors: 23000, percentage: 8 },
  { country: 'Others', visitors: 18000, percentage: 7 },
];

const categoryViews = [
  { category: 'Dining & Restaurants', views: 285000, color: '#0891b2' },
  { category: 'Music & Nightlife', views: 198000, color: '#7c3aed' },
  { category: 'Family & Kids', views: 145000, color: '#10b981' },
  { category: 'Arts & Culture', views: 98000, color: '#f59e0b' },
  { category: 'Sports & Fitness', views: 76000, color: '#ef4444' },
  { category: 'Cinema', views: 65000, color: '#ec4899' },
];

const userGrowth = [
  { month: 'Jul', users: 2100 },
  { month: 'Aug', users: 2800 },
  { month: 'Sep', users: 3500 },
  { month: 'Oct', users: 4200 },
  { month: 'Nov', users: 5100 },
  { month: 'Dec', users: 6800 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  const maxViews = Math.max(...trafficByDay.map(d => d.views));
  const maxCategoryViews = Math.max(...categoryViews.map(c => c.views));
  const maxUserGrowth = Math.max(...userGrowth.map(u => u.users));

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Platform Analytics</h1>
            <p className="text-gray-400 mt-1">Monitor traffic, content performance, and user growth</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="12m">Last 12 months</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {overviewStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up'
                    ? stat.label.includes('Bounce') ? 'text-red-400' : 'text-green-400'
                    : stat.label.includes('Bounce') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-2">{stat.period}</p>
            </motion.div>
          ))}
        </div>

        {/* Traffic Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <LineChart className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Traffic Overview</h2>
                <p className="text-gray-400 text-sm">Daily page views and visitors</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                <span className="text-gray-400">Page Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="text-gray-400">Visitors</span>
              </div>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-2">
            {trafficByDay.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 items-end justify-center h-48">
                  <div
                    className="w-5 bg-cyan-500/80 rounded-t"
                    style={{ height: `${(day.views / maxViews) * 100}%` }}
                  />
                  <div
                    className="w-5 bg-purple-500/80 rounded-t"
                    style={{ height: `${(day.visitors / maxViews) * 100}%` }}
                  />
                </div>
                <span className="text-gray-400 text-sm">{day.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Eye className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Top Pages</h2>
            </div>

            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={page.page} className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm w-6">{index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{page.title}</p>
                    <p className="text-gray-500 text-sm truncate">{page.page}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{(page.views / 1000).toFixed(0)}K</p>
                    <p className="text-gray-500 text-sm">{page.avgTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <PieChart className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Device Breakdown</h2>
            </div>

            <div className="space-y-6">
              {deviceStats.map((device) => {
                const Icon = device.icon;
                return (
                  <div key={device.device}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 text-${device.color}-400`} />
                        <span className="text-white font-medium">{device.device}</span>
                      </div>
                      <span className="text-white font-bold">{device.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${device.color}-500 rounded-full`}
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location Stats */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white font-medium">Top Locations</h3>
              </div>
              <div className="space-y-3">
                {locationStats.map((loc) => (
                  <div key={loc.country} className="flex items-center justify-between">
                    <span className="text-gray-300">{loc.country}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${loc.percentage}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm w-10 text-right">{loc.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Venues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Top Venues</h2>
            </div>

            <div className="space-y-4">
              {topVenues.map((venue, index) => (
                <div key={venue.name} className="group">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{index + 1}</span>
                      <span className="text-white group-hover:text-cyan-400 transition-colors cursor-pointer">
                        {venue.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 ml-6">
                    <span>{(venue.views / 1000).toFixed(1)}K views</span>
                    <span>{venue.events} events</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Calendar className="w-5 h-5 text-pink-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Top Events</h2>
            </div>

            <div className="space-y-4">
              {topEvents.map((event, index) => (
                <div key={event.name} className="group">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-pink-400 font-bold">{index + 1}</span>
                      <span className="text-white group-hover:text-pink-400 transition-colors cursor-pointer truncate max-w-[180px]">
                        {event.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 ml-6">
                    <span>{(event.views / 1000).toFixed(1)}K views</span>
                    <span>{(event.clicks / 1000).toFixed(1)}K clicks</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">By Category</h2>
            </div>

            <div className="space-y-4">
              {categoryViews.map((cat) => (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm truncate max-w-[150px]">{cat.category}</span>
                    <span className="text-white font-medium">{(cat.views / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(cat.views / maxCategoryViews) * 100}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Users className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">User Growth</h2>
                <p className="text-gray-400 text-sm">Registered venue owners over time</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">6,800</p>
              <p className="text-green-400 text-sm">+33% this month</p>
            </div>
          </div>

          <div className="h-48 flex items-end justify-between gap-4">
            {userGrowth.map((month) => (
              <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex justify-center">
                  <div
                    className="w-12 bg-gradient-to-t from-teal-600 to-teal-400 rounded-t"
                    style={{ height: `${(month.users / maxUserGrowth) * 140}px` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">{(month.users / 1000).toFixed(1)}K</p>
                  <p className="text-gray-500 text-sm">{month.month}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real-time Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-xl p-6 border border-cyan-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            </div>
            <h2 className="text-lg font-semibold text-white">Live Activity</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-3xl font-bold text-white">247</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pages/Minute</p>
              <p className="text-3xl font-bold text-white">1,842</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Searches/Minute</p>
              <p className="text-3xl font-bold text-white">89</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Event Saves</p>
              <p className="text-3xl font-bold text-white">34</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
