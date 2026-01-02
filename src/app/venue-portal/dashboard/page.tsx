'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  Images,
  Calendar,
  Plus,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface VenueData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  cover_image_url?: string;
  gallery_images?: string[];
  status: string;
}

interface EventData {
  id: string;
  title: string;
  status: string;
  start_date: string;
}

export default function VenueDashboardPage() {
  const [venue, setVenue] = useState<VenueData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Load venue profile
        const profileRes = await fetch('/api/venue-portal/profile');
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setVenue(profileData.venue);
        }

        // Load venue events
        const eventsRes = await fetch('/api/venue-portal/events');
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData.events || []);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const galleryCount = venue?.gallery_images?.length || 0;
  const pendingEvents = events.filter(e => e.status === 'pending').length;
  const publishedEvents = events.filter(e => e.status === 'published').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Welcome back!</h1>
        <p className="text-gray-400 mt-1">Manage your venue and events from here.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Images className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{galleryCount}/20</p>
              <p className="text-gray-400 text-sm">Gallery Images</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{publishedEvents}</p>
              <p className="text-gray-400 text-sm">Published Events</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{pendingEvents}</p>
              <p className="text-gray-400 text-sm">Pending Approval</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/venue-portal/profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Edit Venue Profile</h3>
                  <p className="text-gray-400 text-sm">Update description, hours & contact info</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        </Link>

        <Link href="/venue-portal/events/create">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6 hover:from-yellow-400/20 hover:to-orange-500/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Create New Event</h3>
                  <p className="text-gray-400 text-sm">Add a new event at your venue</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Recent Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Events</h2>
          <Link
            href="/venue-portal/events"
            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No events yet</p>
            <Link
              href="/venue-portal/events/create"
              className="inline-flex items-center gap-2 mt-4 text-yellow-400 hover:text-yellow-300 font-medium"
            >
              <Plus className="w-4 h-4" />
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="p-4 flex items-center justify-between hover:bg-white/5">
                <div className="flex items-center gap-3">
                  {event.status === 'published' && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {event.status === 'pending' && (
                    <Clock className="w-5 h-5 text-yellow-400" />
                  )}
                  {event.status === 'rejected' && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  {event.status === 'draft' && (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <p className="text-white font-medium">{event.title}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(event.start_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'published'
                      ? 'bg-green-500/20 text-green-400'
                      : event.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : event.status === 'rejected'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-gray-500/20 text-gray-400'
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
  );
}
