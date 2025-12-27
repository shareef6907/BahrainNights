'use client';

import { motion } from 'framer-motion';
import { Calendar, Eye, Tag, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import StatsCard from '@/components/dashboard/StatsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import EventsTable, { Event } from '@/components/dashboard/EventsTable';
import ActivityFeed from '@/components/dashboard/ActivityFeed';

// Mock data for "The Orangery" venue
const mockStats = {
  totalViews: 1247,
  viewsTrend: 12,
  eventsThisMonth: 5,
  eventsTrend: 8,
  activeOffers: 2,
  upcomingEvents: 3,
};

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Live Jazz Night',
    date: 'Dec 28, 2025',
    time: '8:00 PM',
    category: 'Live Music',
    status: 'published',
    views: 120,
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    title: 'NYE Countdown Party',
    date: 'Dec 31, 2025',
    time: '9:00 PM',
    category: 'Nightlife',
    status: 'published',
    views: 350,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    title: 'Wine Tasting Evening',
    date: 'Jan 3, 2026',
    time: '7:00 PM',
    category: 'Dining',
    status: 'draft',
    views: 0,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    title: 'Ladies Night Special',
    date: 'Jan 5, 2026',
    time: '8:00 PM',
    category: 'Nightlife',
    status: 'published',
    views: 89,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=100&h=100&fit=crop',
  },
  {
    id: '5',
    title: 'Sunday Brunch Launch',
    date: 'Jan 7, 2026',
    time: '12:00 PM',
    category: 'Dining',
    status: 'published',
    views: 210,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop',
  },
];

const mockActivities = [
  {
    id: '1',
    type: 'view' as const,
    message: 'Your event "Jazz Night" was viewed 45 times today',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'event' as const,
    message: 'New booking inquiry for "Ladies Night"',
    time: '5 hours ago',
  },
  {
    id: '3',
    type: 'expiry' as const,
    message: 'Your offer "Happy Hour" expires in 3 days',
    time: 'Today',
  },
  {
    id: '4',
    type: 'view' as const,
    message: 'Your venue profile was viewed 28 times',
    time: 'Yesterday',
  },
  {
    id: '5',
    type: 'offer' as const,
    message: 'Your offer "Ladies Night Tuesday" is trending',
    time: '2 days ago',
  },
];

export default function DashboardOverview() {
  const { user } = useAuth();

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Welcome back, {user?.venue?.name || 'The Orangery'}!
          </h1>
          <p className="text-gray-400 mt-1">{formatDate()}</p>
        </div>
        {user?.venue && (
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              user.venue.status === 'approved'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : user.venue.status === 'pending'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                user.venue.status === 'approved'
                  ? 'bg-green-400'
                  : user.venue.status === 'pending'
                  ? 'bg-yellow-400'
                  : 'bg-red-400'
              }`}
            />
            {user.venue.status === 'approved'
              ? 'Approved'
              : user.venue.status === 'pending'
              ? 'Pending Approval'
              : 'Rejected'}
          </span>
        )}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Views"
          value={mockStats.totalViews.toLocaleString()}
          icon={Eye}
          trend={{ value: mockStats.viewsTrend, isPositive: true }}
          iconColor="text-blue-400"
          delay={0}
        />
        <StatsCard
          title="Events This Month"
          value={mockStats.eventsThisMonth}
          icon={Calendar}
          trend={{ value: mockStats.eventsTrend, isPositive: true }}
          iconColor="text-green-400"
          delay={0.1}
        />
        <StatsCard
          title="Active Offers"
          value={mockStats.activeOffers}
          icon={Tag}
          iconColor="text-purple-400"
          delay={0.2}
        />
        <StatsCard
          title="Upcoming Events"
          value={mockStats.upcomingEvents}
          icon={Clock}
          iconColor="text-yellow-400"
          delay={0.3}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <QuickActions />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Your Upcoming Events</h2>
            <Link
              href="/dashboard/events"
              className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <EventsTable
            events={mockEvents.slice(0, 5)}
            compact
            onEdit={(id) => {
              window.location.href = `/dashboard/events/${id}/edit`;
            }}
          />
        </div>

        {/* Activity Feed */}
        <div>
          <ActivityFeed activities={mockActivities} />
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Views Over Time</h2>
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-yellow-400/50">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>

        {/* Chart Placeholder */}
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-400">Performance chart coming soon</p>
            <p className="text-sm text-gray-500 mt-1">
              Track your venue&apos;s performance over time
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
