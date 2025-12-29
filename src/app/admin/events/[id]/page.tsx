'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Edit,
  CheckCircle,
  XCircle,
  Star,
  StarOff,
  MapPin,
  Clock,
  Calendar,
  Tag,
  Eye,
  DollarSign,
  Globe,
  Loader2,
  Trash2,
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: 'published' | 'pending' | 'draft' | 'rejected';
  is_featured: boolean;
  venue_name: string;
  venue_address: string | null;
  date: string;
  time: string | null;
  end_date: string | null;
  end_time: string | null;
  price: string | null;
  price_type: string | null;
  booking_url: string | null;
  booking_link: string | null;
  cover_url: string | null;
  image_url: string | null;
  featured_image: string | null;
  gallery_urls: string[] | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  views: number;
  created_at: string;
  updated_at: string;
  source_name: string | null;
  source_url: string | null;
}

export default function AdminEventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id as string | undefined;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Fetch event data
  useEffect(() => {
    async function fetchEvent() {
      if (!eventId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/admin/events/${eventId}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to fetch event');
          return;
        }

        setEvent(data.event);
      } catch (err) {
        setError('Failed to fetch event');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  // Handle status actions (approve, reject, feature, etc.)
  const handleAction = async (action: string, additionalData?: Record<string, unknown>) => {
    if (!eventId) return;

    setActionLoading(action);
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...additionalData }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Action failed');
        return;
      }

      // Update local state with new event data
      setEvent(data.event);

      if (action === 'reject') {
        setShowRejectModal(false);
        setRejectReason('');
      }
    } catch (err) {
      console.error('Action error:', err);
      alert('Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!eventId) return;
    if (!confirm('Are you sure you want to delete this event? This cannot be undone.')) return;

    setActionLoading('delete');
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Delete failed');
        return;
      }

      // Redirect to events list
      router.push('/admin/events');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">Event not found</h2>
        <p className="text-gray-400 mb-4">{error || "The event you're looking for doesn't exist."}</p>
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 rounded-full">
            Published
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-orange-500/20 text-orange-400 rounded-full">
            Pending Approval
          </span>
        );
      case 'draft':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-gray-500/20 text-gray-400 rounded-full">
            Draft
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-red-500/20 text-red-400 rounded-full">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const eventImage = event.cover_url || event.image_url || event.featured_image || '/images/event-placeholder.jpg';
  const bookingUrl = event.booking_url || event.booking_link;
  const eventTime = event.time && !event.time.toLowerCase().includes('tba') ? event.time : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-white">{event.title}</h1>
              {getStatusBadge(event.status)}
              {event.is_featured && (
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-full">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </span>
              )}
            </div>
            <p className="text-gray-400 mt-1">
              at {event.venue_name || 'Venue TBA'}
              {event.source_name && (
                <span className="text-gray-500"> • Source: {event.source_name}</span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {event.status === 'pending' && (
              <>
                <button
                  onClick={() => handleAction('approve')}
                  disabled={actionLoading === 'approve'}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {actionLoading === 'approve' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Approve Event
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </>
            )}
            <button
              onClick={() => handleAction(event.is_featured ? 'unfeature' : 'feature')}
              disabled={actionLoading === 'feature' || actionLoading === 'unfeature'}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {event.is_featured ? (
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
            <Link
              href={`/admin/events/${event.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={actionLoading === 'delete'}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {actionLoading === 'delete' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete
            </button>
            <a
              href={`/events/${event.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Public Page
            </a>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden relative">
            <Image
              src={eventImage}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* Description */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {event.description || 'No description provided.'}
            </p>
          </div>

          {/* Event Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-white">
                    {event.date ? new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Date TBA'}
                  </p>
                </div>
              </div>
              {eventTime && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="text-white">
                      {eventTime}
                      {event.end_time && !event.end_time.toLowerCase().includes('tba') && ` - ${event.end_time}`}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Venue</p>
                  <p className="text-white">{event.venue_name || 'Venue TBA'}</p>
                  {event.venue_address && (
                    <p className="text-gray-400 text-sm">{event.venue_address}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Price</p>
                  <p className="text-white">
                    {event.price_type === 'free' || !event.price ? 'Free' : event.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Category</p>
                  <p className="text-white capitalize">{event.category || 'General'}</p>
                </div>
              </div>
              {bookingUrl && (
                <div className="flex items-center gap-3 sm:col-span-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Booking URL</p>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 break-all"
                    >
                      {bookingUrl}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          {event.gallery_urls && event.gallery_urls.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {event.gallery_urls.map((image, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden relative">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-6"
        >
          {/* Stats */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-400">Views</span>
                </div>
                <span className="text-white font-medium">{(event.views || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {(event.contact_name || event.contact_email || event.contact_phone) && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
              <div className="space-y-3">
                {event.contact_name && (
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white">{event.contact_name}</p>
                  </div>
                )}
                {event.contact_email && (
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href={`mailto:${event.contact_email}`} className="text-cyan-400 hover:text-cyan-300">
                      {event.contact_email}
                    </a>
                  </div>
                )}
                {event.contact_phone && (
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href={`tel:${event.contact_phone}`} className="text-cyan-400 hover:text-cyan-300">
                      {event.contact_phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Metadata</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Event ID</p>
                <p className="text-white font-mono text-xs break-all">{event.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Created</p>
                <p className="text-white">
                  {new Date(event.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="text-white">
                  {new Date(event.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {event.source_url && (
                <div>
                  <p className="text-sm text-gray-400">Source URL</p>
                  <a
                    href={event.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-sm break-all"
                  >
                    {event.source_url}
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#1A1A2E] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Reject Event</h3>
            <p className="text-gray-400 mb-4">
              Please provide a reason for rejecting this event.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 resize-none"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('reject', { reason: rejectReason })}
                disabled={actionLoading === 'reject'}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {actionLoading === 'reject' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Reject Event'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
