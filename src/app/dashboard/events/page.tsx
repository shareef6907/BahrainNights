'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import EventsTable, { Event } from '@/components/dashboard/EventsTable';

// Mock data for events
const allMockEvents: Event[] = [
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
  {
    id: '6',
    title: 'Acoustic Night',
    date: 'Nov 15, 2025',
    time: '7:30 PM',
    category: 'Live Music',
    status: 'past',
    views: 156,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
  },
  {
    id: '7',
    title: 'Halloween Party',
    date: 'Oct 31, 2025',
    time: '9:00 PM',
    category: 'Nightlife',
    status: 'past',
    views: 423,
    image: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=100&h=100&fit=crop',
  },
];

type StatusFilter = 'all' | 'published' | 'draft' | 'past';
type SortOption = 'newest' | 'oldest' | 'views';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  // Filter and sort events
  const filteredEvents = allMockEvents
    .filter((event) => {
      // Search filter
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && event.status !== statusFilter) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handleEdit = (id: string) => {
    window.location.href = `/dashboard/events/${id}/edit`;
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate event:', id);
    // TODO: Implement duplicate logic
  };

  const handleTogglePublish = (id: string) => {
    console.log('Toggle publish:', id);
    // TODO: Implement toggle publish logic
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      console.log('Delete event:', id);
      // TODO: Implement delete logic
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Events</h1>
          <p className="text-gray-400 mt-1">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create New Event
        </Link>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as StatusFilter);
                setCurrentPage(1);
              }}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 focus:outline-none focus:border-yellow-400/50 appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="past">Past</option>
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 focus:outline-none focus:border-yellow-400/50 appearance-none cursor-pointer min-w-[160px]"
          >
            <option value="newest">Date (Newest)</option>
            <option value="oldest">Date (Oldest)</option>
            <option value="views">Most Views</option>
          </select>
        </div>
      </motion.div>

      {/* Events Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <EventsTable
          events={paginatedEvents}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onTogglePublish={handleTogglePublish}
          onDelete={handleDelete}
        />
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <p className="text-sm text-gray-400">
            Showing {(currentPage - 1) * eventsPerPage + 1}-
            {Math.min(currentPage * eventsPerPage, filteredEvents.length)} of{' '}
            {filteredEvents.length} events
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-gray-400 px-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
