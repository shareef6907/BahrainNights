'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
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
  Users,
  Eye,
  DollarSign,
  Globe,
} from 'lucide-react';

// Mock event data
const mockEventData: Record<string, {
  id: string;
  title: string;
  slug: string;
  image: string;
  gallery: string[];
  category: string;
  status: 'published' | 'pending' | 'draft';
  isFeatured: boolean;
  description: string;
  venue: { id: string; name: string; slug: string };
  date: string;
  startTime: string;
  endTime: string;
  priceType: string;
  price: string;
  bookingUrl: string;
  tags: string[];
  ageRestriction: string;
  dressCode: string;
  stats: { views: number; saves: number; clicks: number };
  createdDate: string;
  submittedBy: string;
}> = {
  'e1': {
    id: 'e1',
    title: 'Live Jazz Night',
    slug: 'live-jazz-night',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1920&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
    ],
    category: 'Live Music',
    status: 'published',
    isFeatured: true,
    description: 'Join us for an unforgettable evening of smooth jazz featuring local and international artists. Enjoy premium cocktails and gourmet appetizers while experiencing the finest live music in Bahrain. Our resident jazz band will take you on a musical journey through the classics and contemporary hits.',
    venue: { id: 'v1', name: 'The Orangery', slug: 'the-orangery' },
    date: '2025-01-20',
    startTime: '20:00',
    endTime: '23:00',
    priceType: 'paid',
    price: 'BD 25',
    bookingUrl: 'https://example.com/book',
    tags: ['jazz', 'live music', 'cocktails', 'lounge'],
    ageRestriction: '21+',
    dressCode: 'Smart casual',
    stats: { views: 1560, saves: 89, clicks: 234 },
    createdDate: '2025-01-10',
    submittedBy: 'owner@theorangery.bh',
  },
  'e2': {
    id: 'e2',
    title: 'Wine Tasting Night',
    slug: 'wine-tasting-night',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop',
    ],
    category: 'Dining',
    status: 'pending',
    isFeatured: false,
    description: 'Discover exquisite wines from around the world with our expert sommelier. This exclusive tasting event features 8 premium wines paired with artisanal cheeses and gourmet bites. Learn about wine regions, tasting notes, and food pairing techniques in an intimate setting.',
    venue: { id: 'v1', name: 'The Orangery', slug: 'the-orangery' },
    date: '2025-01-25',
    startTime: '19:00',
    endTime: '22:00',
    priceType: 'paid',
    price: 'BD 35',
    bookingUrl: 'https://example.com/wine',
    tags: ['wine', 'tasting', 'dining', 'gourmet'],
    ageRestriction: '21+',
    dressCode: 'Smart casual',
    stats: { views: 0, saves: 0, clicks: 0 },
    createdDate: '2025-01-12',
    submittedBy: 'owner@theorangery.bh',
  },
};

export default function AdminEventDetailPage() {
  const params = useParams();
  const eventId = params?.id as string | undefined;
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const event = eventId ? mockEventData[eventId] : undefined;

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">Event not found</h2>
        <p className="text-gray-400 mb-4">The event you&apos;re looking for doesn&apos;t exist.</p>
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
              {event.isFeatured && (
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-full">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </span>
              )}
            </div>
            <p className="text-gray-400 mt-1">
              by{' '}
              <Link href={`/admin/venues/${event.venue.id}`} className="text-cyan-400 hover:text-cyan-300">
                {event.venue.name}
              </Link>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {event.status === 'pending' && (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                  <CheckCircle className="w-4 h-4" />
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
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors">
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
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors">
              <Edit className="w-4 h-4" />
              Edit
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
          <div className="aspect-[16/9] rounded-2xl overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</p>
          </div>

          {/* Event Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-white">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="text-white">{event.startTime} - {event.endTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Venue</p>
                  <Link href={`/admin/venues/${event.venue.id}`} className="text-cyan-400 hover:text-cyan-300">
                    {event.venue.name}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Price</p>
                  <p className="text-white">{event.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Age Restriction</p>
                  <p className="text-white">{event.ageRestriction}</p>
                </div>
              </div>
              {event.dressCode && (
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Dress Code</p>
                    <p className="text-white">{event.dressCode}</p>
                  </div>
                </div>
              )}
              {event.bookingUrl && (
                <div className="flex items-center gap-3 sm:col-span-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Booking URL</p>
                    <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 break-all">
                      {event.bookingUrl}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-lg text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {event.gallery.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {event.gallery.map((image, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden">
                    <img src={image} alt="" className="w-full h-full object-cover" />
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
                <span className="text-white font-medium">{event.stats.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-400">Saves</span>
                </div>
                <span className="text-white font-medium">{event.stats.saves}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-green-400" />
                  <span className="text-gray-400">Booking Clicks</span>
                </div>
                <span className="text-white font-medium">{event.stats.clicks}</span>
              </div>
            </div>
          </div>

          {/* Submission Info */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Submission Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Submitted By</p>
                <p className="text-white">{event.submittedBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Created Date</p>
                <p className="text-white">{new Date(event.createdDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Category</p>
                <p className="text-white">{event.category}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href={`/admin/venues/${event.venue.id}`}
                className="block w-full px-4 py-2 text-center text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg transition-colors"
              >
                View Venue
              </Link>
              <button className="w-full px-4 py-2 text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                Duplicate Event
              </button>
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
              Please provide a reason for rejecting this event. This will be sent to the venue owner.
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
                onClick={() => {
                  setShowRejectModal(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Reject Event
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
