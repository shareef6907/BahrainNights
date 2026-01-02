'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ChevronRight,
  Edit,
  Eye,
} from 'lucide-react';

interface EventData {
  id: string;
  title: string;
  slug: string;
  status: string;
  start_date: string;
  end_date?: string;
  start_time?: string;
  category?: string;
  featured_image?: string;
}

export default function VenueEventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'pending' | 'rejected' | 'draft'>('all');

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const response = await fetch('/api/venue-portal/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(e => e.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">My Events</h1>
          <p className="text-gray-400 mt-1">Manage and create events at your venue.</p>
        </div>
        <Link
          href="/venue-portal/events/create"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'published', 'pending', 'rejected', 'draft'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status
                ? 'bg-yellow-400 text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-2 opacity-70">
                ({events.filter(e => e.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
        >
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            {filter === 'all' ? 'No events yet' : `No ${filter} events`}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Create your first event to start promoting your venue
          </p>
          <Link
            href="/venue-portal/events/create"
            className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="divide-y divide-white/5">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 lg:p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Image */}
                  <div className="w-full lg:w-24 h-32 lg:h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    {event.featured_image ? (
                      <img
                        src={event.featured_image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(event.status)}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold truncate">{event.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {formatDate(event.start_date)}
                          {event.start_time && ` at ${event.start_time}`}
                        </p>
                        {event.category && (
                          <span className="inline-block mt-2 px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">
                            {event.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3 lg:flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(event.status)}`}>
                      {event.status}
                    </span>
                    <div className="flex items-center gap-2">
                      {event.status === 'published' && (
                        <Link
                          href={`/events/${event.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          title="View Event"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                      )}
                      <Link
                        href={`/venue-portal/events/${event.id}/edit`}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit Event"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold mb-4">Event Status Guide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-white text-sm font-medium">Published</p>
              <p className="text-gray-500 text-xs">Live and visible to visitors</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-white text-sm font-medium">Pending</p>
              <p className="text-gray-500 text-xs">Awaiting admin approval</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-white text-sm font-medium">Rejected</p>
              <p className="text-gray-500 text-xs">Not approved - edit & resubmit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-white text-sm font-medium">Draft</p>
              <p className="text-gray-500 text-xs">Saved but not submitted</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
