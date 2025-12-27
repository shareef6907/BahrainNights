'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  Globe,
} from 'lucide-react';

// Mock analytics data
const mockStats = {
  totalViews: 4523,
  viewsTrend: 15,
  uniqueVisitors: 2891,
  visitorsTrend: 8,
  eventViews: 1247,
  eventViewsTrend: 22,
  profileViews: 876,
  profileViewsTrend: -3,
};

const mockViewsData = [
  { day: 'Mon', views: 245 },
  { day: 'Tue', views: 312 },
  { day: 'Wed', views: 289 },
  { day: 'Thu', views: 456 },
  { day: 'Fri', views: 523 },
  { day: 'Sat', views: 678 },
  { day: 'Sun', views: 420 },
];

const mockTopEvents = [
  { name: 'NYE Countdown Party', views: 350, change: 25 },
  { name: 'Sunday Brunch Launch', views: 210, change: 12 },
  { name: 'Live Jazz Night', views: 120, change: 8 },
  { name: 'Ladies Night Special', views: 89, change: -5 },
  { name: 'Wine Tasting Evening', views: 45, change: 0 },
];

const mockTopOffers = [
  { name: 'Ladies Night Tuesday', views: 245, change: 18 },
  { name: 'Happy Hour Daily', views: 189, change: 5 },
  { name: 'Weekend Brunch', views: 156, change: 32 },
];

const mockTrafficSources = [
  { source: 'Direct', percentage: 45, color: 'bg-yellow-400' },
  { source: 'Search', percentage: 30, color: 'bg-blue-400' },
  { source: 'Social', percentage: 20, color: 'bg-pink-400' },
  { source: 'Other', percentage: 5, color: 'bg-gray-400' },
];

const mockPeakDays = [
  { day: 'Friday', views: 678 },
  { day: 'Saturday', views: 623 },
  { day: 'Thursday', views: 456 },
];

const mockPeakHours = [
  { hour: '8 PM', views: 245 },
  { hour: '9 PM', views: 312 },
  { hour: '7 PM', views: 189 },
];

type DateRange = '7' | '30' | '90';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('7');

  const StatCard = ({
    title,
    value,
    trend,
    icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    trend: number;
    icon: React.ElementType;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">
            {value.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span
              className={`text-sm font-medium ${
                trend >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {trend >= 0 ? '+' : ''}
              {trend}%
            </span>
            <span className="text-xs text-gray-500">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Date Range Selector */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">
            Track your venue&apos;s performance and visitor insights
          </p>
        </div>

        <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
          {(['7', '30', '90'] as DateRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                dateRange === range
                  ? 'bg-yellow-400/20 text-yellow-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {range === '7' ? 'Last 7 days' : range === '30' ? 'Last 30 days' : 'Last 90 days'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Page Views"
          value={mockStats.totalViews}
          trend={mockStats.viewsTrend}
          icon={Eye}
          color="bg-blue-500"
        />
        <StatCard
          title="Unique Visitors"
          value={mockStats.uniqueVisitors}
          trend={mockStats.visitorsTrend}
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Event Views"
          value={mockStats.eventViews}
          trend={mockStats.eventViewsTrend}
          icon={Calendar}
          color="bg-purple-500"
        />
        <StatCard
          title="Profile Views"
          value={mockStats.profileViews}
          trend={mockStats.profileViewsTrend}
          icon={Globe}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Views Over Time</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-48 gap-2">
            {mockViewsData.map((data, index) => {
              const maxViews = Math.max(...mockViewsData.map((d) => d.views));
              const height = (data.views / maxViews) * 100;

              return (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="w-full bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1A1A2E] rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.views} views
                    </div>
                  </motion.div>
                  <span className="text-xs text-gray-400">{data.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources</h3>

          {/* Simple Donut Chart Placeholder */}
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {mockTrafficSources.reduce(
                  (acc, source, index) => {
                    const strokeDasharray = `${source.percentage} ${100 - source.percentage}`;
                    const offset = acc.offset;
                    acc.elements.push(
                      <circle
                        key={source.source}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        strokeWidth="12"
                        className={source.color.replace('bg-', 'stroke-')}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={-offset}
                      />
                    );
                    acc.offset += source.percentage;
                    return acc;
                  },
                  { elements: [] as React.ReactNode[], offset: 0 }
                ).elements}
              </svg>
            </div>

            <div className="flex-1 space-y-3">
              {mockTrafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${source.color}`} />
                    <span className="text-gray-300">{source.source}</span>
                  </div>
                  <span className="font-medium text-white">{source.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Performing Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Top Events by Views</h3>

          <div className="space-y-4">
            {mockTopEvents.map((event, index) => (
              <div
                key={event.name}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm text-gray-400">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{event.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{event.views}</span>
                  {event.change !== 0 && (
                    <span
                      className={`text-sm ${
                        event.change > 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {event.change > 0 ? '+' : ''}
                      {event.change}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Top Offers by Views</h3>

          <div className="space-y-4">
            {mockTopOffers.map((offer, index) => (
              <div
                key={offer.name}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm text-gray-400">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{offer.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{offer.views}</span>
                  {offer.change !== 0 && (
                    <span
                      className={`text-sm ${
                        offer.change > 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {offer.change > 0 ? '+' : ''}
                      {offer.change}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Visitor Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Days */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Peak Days</h3>
          </div>

          <div className="space-y-3">
            {mockPeakDays.map((day, index) => {
              const maxViews = mockPeakDays[0].views;
              const width = (day.views / maxViews) * 100;

              return (
                <div key={day.day} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{day.day}</span>
                    <span className="text-white font-medium">{day.views} views</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Peak Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Peak Hours</h3>
          </div>

          <div className="space-y-3">
            {mockPeakHours.map((hour, index) => {
              const maxViews = mockPeakHours[0].views;
              const width = (hour.views / maxViews) * 100;

              return (
                <div key={hour.hour} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{hour.hour}</span>
                    <span className="text-white font-medium">{hour.views} views</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Note about mock data */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center py-4"
      >
        <p className="text-sm text-gray-500">
          Data shown is for demonstration purposes. Real analytics will be available once your venue is live.
        </p>
      </motion.div>
    </div>
  );
}
