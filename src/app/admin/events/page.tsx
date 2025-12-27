'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Trash2,
  Calendar,
  Star,
  StarOff,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';

// Mock events data
const mockEvents = [
  {
    id: 'e1',
    title: 'Live Jazz Night',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=200&h=200&fit=crop',
    venueName: 'The Orangery',
    venueId: 'v1',
    date: '2025-01-20',
    category: 'Live Music',
    status: 'published',
    views: 1560,
    isFeatured: true,
    createdDate: '2025-01-10',
  },
  {
    id: 'e2',
    title: 'Wine Tasting Night',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=200&fit=crop',
    venueName: 'The Orangery',
    venueId: 'v1',
    date: '2025-01-25',
    category: 'Dining',
    status: 'pending',
    views: 0,
    isFeatured: false,
    createdDate: '2025-01-12',
  },
  {
    id: 'e3',
    title: 'Kids Art Workshop',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop',
    venueName: 'Bahrain National Museum',
    venueId: 'v10',
    date: '2025-01-08',
    category: 'Family',
    status: 'pending',
    views: 0,
    isFeatured: false,
    createdDate: '2025-01-05',
  },
  {
    id: 'e4',
    title: 'Beach Party',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&h=200&fit=crop',
    venueName: 'Coral Bay',
    venueId: 'v6',
    date: '2025-01-10',
    category: 'Nightlife',
    status: 'pending',
    views: 0,
    isFeatured: false,
    createdDate: '2025-01-06',
  },
  {
    id: 'e5',
    title: 'Stand-up Comedy',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=200&h=200&fit=crop',
    venueName: 'The Junction',
    venueId: 'v7',
    date: '2025-01-12',
    category: 'Entertainment',
    status: 'pending',
    views: 0,
    isFeatured: false,
    createdDate: '2025-01-07',
  },
  {
    id: 'e6',
    title: 'Food Festival',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop',
    venueName: 'Gulf Hotel',
    venueId: 'v5',
    date: '2025-01-15',
    category: 'Dining',
    status: 'pending',
    views: 0,
    isFeatured: false,
    createdDate: '2025-01-08',
  },
  {
    id: 'e7',
    title: 'NYE Gala Dinner',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop',
    venueName: 'Ritz-Carlton',
    venueId: 'v11',
    date: '2025-12-31',
    category: 'Special Event',
    status: 'published',
    views: 3200,
    isFeatured: true,
    createdDate: '2024-12-01',
  },
  {
    id: 'e8',
    title: 'Friday Brunch',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
    venueName: 'Gulf Hotel',
    venueId: 'v5',
    date: '2025-01-17',
    category: 'Dining',
    status: 'published',
    views: 2100,
    isFeatured: true,
    createdDate: '2024-11-15',
  },
  {
    id: 'e9',
    title: 'Ladies Night',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=200&h=200&fit=crop',
    venueName: 'Amber Lounge',
    venueId: 'v8',
    date: '2025-01-14',
    category: 'Nightlife',
    status: 'published',
    views: 980,
    isFeatured: false,
    createdDate: '2025-01-01',
  },
  {
    id: 'e10',
    title: 'Cancelled Event',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop',
    venueName: 'Some Venue',
    venueId: 'v12',
    date: '2024-12-20',
    category: 'Entertainment',
    status: 'draft',
    views: 0,
    isFeatured: false,
    createdDate: '2024-12-10',
  },
];

type EventStatus = 'all' | 'pending' | 'published' | 'draft' | 'past';

export default function AdminEventsPage() {
  const [activeTab, setActiveTab] = useState<EventStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const categories = ['all', 'Live Music', 'Dining', 'Nightlife', 'Family', 'Entertainment', 'Special Event'];

  const now = new Date();
  const filteredEvents = mockEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const isPast = eventDate < now;

    let matchesTab = true;
    if (activeTab === 'past') {
      matchesTab = isPast;
    } else if (activeTab !== 'all') {
      matchesTab = event.status === activeTab && !isPast;
    }

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venueName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;

    return matchesTab && matchesSearch && matchesCategory;
  });

  const statusCounts = {
    all: mockEvents.length,
    pending: mockEvents.filter((e) => e.status === 'pending').length,
    published: mockEvents.filter((e) => e.status === 'published' && new Date(e.date) >= now).length,
    draft: mockEvents.filter((e) => e.status === 'draft').length,
    past: mockEvents.filter((e) => new Date(e.date) < now).length,
  };

  const getStatusBadge = (status: string, date: string) => {
    const isPast = new Date(date) < now;
    if (isPast) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full">
          Past
        </span>
      );
    }
    switch (status) {
      case 'published':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            Published
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full">
            Pending
          </span>
        );
      case 'draft':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Events</h1>
          <p className="text-gray-400 mt-1">
            {statusCounts.all} total events ({statusCounts.pending} pending)
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 border-b border-white/10 pb-px overflow-x-auto"
      >
        {(['all', 'pending', 'published', 'draft', 'past'] as EventStatus[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab
                ? 'text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'past' ? 'Past Events' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/10 rounded">
              {statusCounts[tab]}
            </span>
            {activeTab === tab && (
              <motion.div
                layoutId="events-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none px-4 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#1A1A2E]">
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort */}
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm">Sort</span>
        </button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/30 bg-white/5 text-cyan-500"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Event</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Venue</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Category</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Views</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Featured</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-white/30 bg-white/5 text-cyan-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-white">{event.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/admin/venues/${event.venueId}`}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      {event.venueName}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-300">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-300">{event.category}</td>
                  <td className="p-4">{getStatusBadge(event.status, event.date)}</td>
                  <td className="p-4 text-gray-300">{event.views.toLocaleString()}</td>
                  <td className="p-4">
                    <button
                      className={`p-1 rounded ${
                        event.isFeatured
                          ? 'text-yellow-400 hover:text-yellow-300'
                          : 'text-gray-500 hover:text-gray-400'
                      }`}
                    >
                      {event.isFeatured ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenActionMenu(openActionMenu === event.id ? null : event.id)
                        }
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>

                      {openActionMenu === event.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenActionMenu(null)}
                          />
                          <div className="absolute right-0 mt-1 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-50 py-1">
                            <Link
                              href={`/admin/events/${event.id}`}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </Link>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            {event.status === 'pending' && (
                              <>
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10">
                                  <CheckCircle className="w-4 h-4" />
                                  Approve
                                </button>
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
                                  <XCircle className="w-4 h-4" />
                                  Reject
                                </button>
                              </>
                            )}
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                              {event.isFeatured ? (
                                <>
                                  <StarOff className="w-4 h-4" />
                                  Unfeature
                                </>
                              ) : (
                                <>
                                  <Star className="w-4 h-4" />
                                  Feature
                                </>
                              )}
                            </button>
                            <div className="my-1 border-t border-white/10" />
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-white/10">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-4">
              <div className="flex items-start gap-3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-white">{event.title}</h3>
                      <p className="text-sm text-cyan-400">{event.venueName}</p>
                    </div>
                    {getStatusBadge(event.status, event.date)}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>{new Date(event.date).toLocaleDateString()} • {event.category}</p>
                    <p className="mt-1">{event.views.toLocaleString()} views</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="px-3 py-1.5 text-xs bg-cyan-500/20 text-cyan-400 rounded-lg"
                    >
                      View
                    </Link>
                    {event.status === 'pending' && (
                      <>
                        <button className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg">
                          Approve
                        </button>
                        <button className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No events found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
