'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Loader2,
  RefreshCw,
  ImageIcon,
  Mail,
  Phone,
  User,
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  start_date: string;
  start_time: string | null;
  venue_name: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  featured_image: string | null;
  status: string;
  is_featured: boolean;
  view_count: number;
  created_at: string;
}

type EventStatus = 'all' | 'pending' | 'published' | 'draft' | 'past';

interface StatusCounts {
  all: number;
  pending: number;
  published: number;
  draft: number;
  past: number;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    all: 0,
    pending: 0,
    published: 0,
    draft: 0,
    past: 0,
  });
  const [activeTab, setActiveTab] = useState<EventStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const categories = [
    'all',
    'dining',
    'family',
    'arts',
    'music',
    'cinema',
    'sports',
    'shopping',
    'business',
    'wellness',
    'special',
    'tours',
    'community',
    'other',
  ];

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all' && activeTab !== 'past') {
        params.set('status', activeTab);
      }
      if (categoryFilter !== 'all') {
        params.set('category', categoryFilter);
      }
      if (searchQuery) {
        params.set('search', searchQuery);
      }

      const response = await fetch(`/api/admin/events?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setEvents(data.events);
        setStatusCounts(data.counts);
      } else {
        console.error('Failed to fetch events:', data.error);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, categoryFilter, searchQuery]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Filter events based on tab (for past events filtering)
  const now = new Date();
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start_date);
    const isPast = eventDate < now;

    if (activeTab === 'past') {
      return isPast;
    } else if (activeTab === 'all') {
      return true;
    }
    return !isPast;
  });

  const handleAction = async (eventId: string, action: string) => {
    setActionLoading(eventId);
    setOpenActionMenu(null);

    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh events list
        await fetchEvents();
      } else {
        alert(data.error || 'Action failed');
      }
    } catch (error) {
      console.error('Action error:', error);
      alert('Action failed. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This cannot be undone.')) {
      return;
    }

    setActionLoading(eventId);
    setOpenActionMenu(null);

    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchEvents();
      } else {
        const data = await response.json();
        alert(data.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed. Please try again.');
    } finally {
      setActionLoading(null);
    }
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
      case 'rejected':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
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
            {statusCounts.all} total events ({statusCounts.pending} pending review)
          </p>
        </div>
        <button
          onClick={fetchEvents}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
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
            <span className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
              tab === 'pending' && statusCounts.pending > 0
                ? 'bg-orange-500/30 text-orange-400'
                : 'bg-white/10'
            }`}>
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
                {cat === 'all' ? 'All Categories' : formatCategory(cat)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </motion.div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      ) : (
        /* Table */
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
                  <>
                    <tr
                      key={event.id}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        actionLoading === event.id ? 'opacity-50' : ''
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {event.featured_image ? (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                              <Image
                                src={event.featured_image}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-500" />
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-white block">{event.title}</span>
                            {event.contact_email && (
                              <button
                                onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                                className="text-xs text-cyan-400 hover:text-cyan-300"
                              >
                                View contact info
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-300">{event.venue_name || 'Not specified'}</span>
                      </td>
                      <td className="p-4 text-gray-300">
                        {new Date(event.start_date).toLocaleDateString()}
                        {event.start_time && (
                          <span className="text-gray-500 ml-1">
                            @ {event.start_time}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-gray-300">{formatCategory(event.category)}</td>
                      <td className="p-4">{getStatusBadge(event.status, event.start_date)}</td>
                      <td className="p-4 text-gray-300">{event.view_count?.toLocaleString() || 0}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleAction(event.id, event.is_featured ? 'unfeature' : 'feature')}
                          disabled={actionLoading === event.id}
                          className={`p-1 rounded ${
                            event.is_featured
                              ? 'text-yellow-400 hover:text-yellow-300'
                              : 'text-gray-500 hover:text-gray-400'
                          }`}
                        >
                          {event.is_featured ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenActionMenu(openActionMenu === event.id ? null : event.id)
                            }
                            disabled={actionLoading === event.id}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            {actionLoading === event.id ? (
                              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                            ) : (
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            )}
                          </button>

                          {openActionMenu === event.id && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setOpenActionMenu(null)}
                              />
                              <div className="absolute right-0 mt-1 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-50 py-1">
                                <Link
                                  href={`/events/${event.slug}`}
                                  target="_blank"
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Public Page
                                </Link>
                                {event.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleAction(event.id, 'approve')}
                                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      Approve & Publish
                                    </button>
                                    <button
                                      onClick={() => handleAction(event.id, 'reject')}
                                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                                    >
                                      <XCircle className="w-4 h-4" />
                                      Reject Event
                                    </button>
                                  </>
                                )}
                                {event.status === 'published' && (
                                  <button
                                    onClick={() => handleAction(event.id, 'draft')}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                                  >
                                    <Edit className="w-4 h-4" />
                                    Unpublish (Draft)
                                  </button>
                                )}
                                {event.status === 'draft' && (
                                  <button
                                    onClick={() => handleAction(event.id, 'approve')}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Publish
                                  </button>
                                )}
                                <button
                                  onClick={() =>
                                    handleAction(event.id, event.is_featured ? 'unfeature' : 'feature')
                                  }
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                                >
                                  {event.is_featured ? (
                                    <>
                                      <StarOff className="w-4 h-4" />
                                      Remove Featured
                                    </>
                                  ) : (
                                    <>
                                      <Star className="w-4 h-4" />
                                      Mark Featured
                                    </>
                                  )}
                                </button>
                                <div className="my-1 border-t border-white/10" />
                                <button
                                  onClick={() => handleDelete(event.id)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                    {/* Expanded contact info row */}
                    {expandedEvent === event.id && (
                      <tr className="bg-white/5">
                        <td colSpan={8} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                              <User className="w-4 h-4 text-cyan-400" />
                              <span className="text-gray-500">Contact:</span>
                              {event.contact_name || 'Not provided'}
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Mail className="w-4 h-4 text-cyan-400" />
                              <span className="text-gray-500">Email:</span>
                              <a href={`mailto:${event.contact_email}`} className="text-cyan-400 hover:underline">
                                {event.contact_email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Phone className="w-4 h-4 text-cyan-400" />
                              <span className="text-gray-500">Phone:</span>
                              {event.contact_phone ? (
                                <a href={`tel:${event.contact_phone}`} className="text-cyan-400 hover:underline">
                                  {event.contact_phone}
                                </a>
                              ) : (
                                'Not provided'
                              )}
                            </div>
                          </div>
                          {event.description && (
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <p className="text-gray-400 text-sm line-clamp-3">{event.description}</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-white/10">
            {filteredEvents.map((event) => (
              <div key={event.id} className={`p-4 ${actionLoading === event.id ? 'opacity-50' : ''}`}>
                <div className="flex items-start gap-3">
                  {event.featured_image ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                      <Image
                        src={event.featured_image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-white">{event.title}</h3>
                        <p className="text-sm text-cyan-400">{event.venue_name || 'Venue TBD'}</p>
                      </div>
                      {getStatusBadge(event.status, event.start_date)}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>{new Date(event.start_date).toLocaleDateString()} • {formatCategory(event.category)}</p>
                      <p className="mt-1">{event.view_count?.toLocaleString() || 0} views</p>
                    </div>
                    {event.contact_email && (
                      <div className="mt-2 p-2 bg-white/5 rounded-lg text-xs">
                        <p className="text-gray-400">Contact: {event.contact_name}</p>
                        <p className="text-cyan-400">{event.contact_email}</p>
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/events/${event.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 text-xs bg-white/10 text-white rounded-lg"
                      >
                        View
                      </Link>
                      {event.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAction(event.id, 'approve')}
                            disabled={actionLoading === event.id}
                            className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg disabled:opacity-50"
                          >
                            {actionLoading === event.id ? 'Loading...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => handleAction(event.id, 'reject')}
                            disabled={actionLoading === event.id}
                            className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(event.id)}
                        disabled={actionLoading === event.id}
                        className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg disabled:opacity-50"
                      >
                        Delete
                      </button>
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
                {activeTab === 'pending'
                  ? 'No events waiting for approval'
                  : 'Try adjusting your search or filter criteria'}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
