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
  Ban,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Clock,
  Calendar,
  Tag,
  Eye,
  Users,
  Star,
} from 'lucide-react';

// Mock venue data
const mockVenueData: Record<string, {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  category: string;
  status: 'approved' | 'pending' | 'rejected';
  description: string;
  address: string;
  area: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  ownerName: string;
  ownerEmail: string;
  registeredDate: string;
  lastUpdated: string;
  features: string[];
  openingHours: { day: string; hours: string }[];
  images: string[];
  stats: { views: number; events: number; offers: number; followers: number };
  events: { id: string; title: string; date: string; status: string }[];
  offers: { id: string; title: string; validUntil: string; status: string }[];
}> = {
  'v1': {
    id: 'v1',
    name: 'The Orangery',
    slug: 'the-orangery',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop',
    category: 'Restaurant & Lounge',
    status: 'approved',
    description: 'The Orangery is a sophisticated dining destination offering Mediterranean cuisine in an elegant garden setting. Perfect for romantic dinners, business meetings, and special celebrations.',
    address: 'Building 1234, Road 5678, Block 901, Seef District',
    area: 'Seef',
    phone: '+973 1234 5678',
    email: 'info@theorangery.bh',
    website: 'https://theorangery.bh',
    instagram: '@theorangery_bh',
    ownerName: 'Ahmed Al-Khalifa',
    ownerEmail: 'owner@theorangery.bh',
    registeredDate: '2025-01-01',
    lastUpdated: '2025-01-10',
    features: ['Live Music', 'Outdoor Seating', 'Private Dining', 'Valet Parking', 'WiFi', 'Wheelchair Accessible'],
    openingHours: [
      { day: 'Monday', hours: '12:00 PM - 11:00 PM' },
      { day: 'Tuesday', hours: '12:00 PM - 11:00 PM' },
      { day: 'Wednesday', hours: '12:00 PM - 11:00 PM' },
      { day: 'Thursday', hours: '12:00 PM - 1:00 AM' },
      { day: 'Friday', hours: '1:00 PM - 1:00 AM' },
      { day: 'Saturday', hours: '12:00 PM - 1:00 AM' },
      { day: 'Sunday', hours: '12:00 PM - 11:00 PM' },
    ],
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    ],
    stats: { views: 2450, events: 12, offers: 5, followers: 890 },
    events: [
      { id: 'e1', title: 'Live Jazz Night', date: '2025-01-20', status: 'published' },
      { id: 'e2', title: 'Wine Tasting Evening', date: '2025-01-25', status: 'published' },
      { id: 'e3', title: 'NYE Countdown Party', date: '2025-12-31', status: 'draft' },
    ],
    offers: [
      { id: 'o1', title: 'Ladies Night Tuesday', validUntil: '2025-03-31', status: 'active' },
      { id: 'o2', title: 'Happy Hour Daily', validUntil: '2025-06-30', status: 'active' },
    ],
  },
  'v2': {
    id: 'v2',
    name: 'Cafe Lilou',
    slug: 'cafe-lilou',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=600&fit=crop',
    category: 'Cafe',
    status: 'pending',
    description: 'A charming French-inspired cafe in the heart of Adliya, known for its artisanal pastries, gourmet coffee, and relaxed ambiance.',
    address: 'Building 456, Road 789, Block 338, Adliya',
    area: 'Adliya',
    phone: '+973 9876 5432',
    email: 'info@cafelilou.com',
    website: 'https://cafelilou.com',
    instagram: '@cafelilou',
    ownerName: 'Sarah Johnson',
    ownerEmail: 'sarah@cafelilou.com',
    registeredDate: '2025-01-13',
    lastUpdated: '2025-01-13',
    features: ['Outdoor Seating', 'WiFi', 'Breakfast', 'Pastries', 'Vegan Options'],
    openingHours: [
      { day: 'Monday', hours: '7:00 AM - 10:00 PM' },
      { day: 'Tuesday', hours: '7:00 AM - 10:00 PM' },
      { day: 'Wednesday', hours: '7:00 AM - 10:00 PM' },
      { day: 'Thursday', hours: '7:00 AM - 11:00 PM' },
      { day: 'Friday', hours: '8:00 AM - 11:00 PM' },
      { day: 'Saturday', hours: '8:00 AM - 11:00 PM' },
      { day: 'Sunday', hours: '8:00 AM - 10:00 PM' },
    ],
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
    ],
    stats: { views: 0, events: 0, offers: 0, followers: 0 },
    events: [],
    offers: [],
  },
};

type TabType = 'overview' | 'events' | 'offers' | 'analytics' | 'activity';

export default function AdminVenueDetailPage() {
  const params = useParams();
  const venueId = params?.id as string | undefined;
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const venue = venueId ? mockVenueData[venueId] : undefined;

  if (!venue) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">Venue not found</h2>
        <p className="text-gray-400 mb-4">The venue you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/admin/venues"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Venues
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 rounded-full">
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-orange-500/20 text-orange-400 rounded-full">
            Pending Approval
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <Link
          href="/admin/venues"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Venues
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={venue.logo}
              alt={venue.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{venue.name}</h1>
                {getStatusBadge(venue.status)}
              </div>
              <p className="text-gray-400 mt-1">{venue.category} • {venue.area}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {venue.status === 'pending' && (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  Approve Venue
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
            {venue.status === 'approved' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 rounded-lg font-medium transition-colors">
                <Ban className="w-4 h-4" />
                Suspend
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <a
              href={`/places/${venue.slug}`}
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

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 border-b border-white/10 pb-px overflow-x-auto"
      >
        {(['overview', 'events', 'offers', 'analytics', 'activity'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab
                ? 'text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                layoutId="venue-detail-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover Image */}
            <div className="aspect-[3/1] rounded-2xl overflow-hidden">
              <img
                src={venue.coverImage}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">About</h3>
              <p className="text-gray-300 leading-relaxed">{venue.description}</p>
            </div>

            {/* Contact Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{venue.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{venue.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{venue.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <a href={venue.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                    {venue.website}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{venue.instagram}</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Opening Hours
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {venue.openingHours.map((schedule) => (
                  <div key={schedule.day} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-gray-400">{schedule.day}</span>
                    <span className="text-white">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Features & Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {venue.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-lg text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {venue.images.map((image, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <Eye className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{venue.stats.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Views</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <Calendar className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{venue.stats.events}</p>
                  <p className="text-xs text-gray-400">Events</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <Tag className="w-5 h-5 text-pink-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{venue.stats.offers}</p>
                  <p className="text-xs text-gray-400">Offers</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <Users className="w-5 h-5 text-green-400 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">{venue.stats.followers}</p>
                  <p className="text-xs text-gray-400">Followers</p>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Owner Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-white">{venue.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-cyan-400">{venue.ownerEmail}</p>
                </div>
              </div>
            </div>

            {/* Registration Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Registration</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Registered</p>
                  <p className="text-white">{new Date(venue.registeredDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Last Updated</p>
                  <p className="text-white">{new Date(venue.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'events' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          {venue.events.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Event</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {venue.events.map((event) => (
                  <tr key={event.id} className="border-b border-white/5">
                    <td className="p-4 text-white">{event.title}</td>
                    <td className="p-4 text-gray-300">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        event.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/events/${event.id}`} className="text-cyan-400 hover:text-cyan-300 text-sm">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No events yet</h3>
              <p className="text-gray-400">This venue hasn&apos;t created any events.</p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'offers' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          {venue.offers.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Offer</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Valid Until</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {venue.offers.map((offer) => (
                  <tr key={offer.id} className="border-b border-white/5">
                    <td className="p-4 text-white">{offer.title}</td>
                    <td className="p-4 text-gray-300">{new Date(offer.validUntil).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                        {offer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center">
              <Tag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No offers yet</h3>
              <p className="text-gray-400">This venue hasn&apos;t created any offers.</p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center"
        >
          <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Analytics Coming Soon</h3>
          <p className="text-gray-400">Detailed analytics for this venue will be available soon.</p>
        </motion.div>
      )}

      {activeTab === 'activity' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center"
        >
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Activity Log Coming Soon</h3>
          <p className="text-gray-400">Audit trail for this venue will be available soon.</p>
        </motion.div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#1A1A2E] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Reject Venue</h3>
            <p className="text-gray-400 mb-4">
              Please provide a reason for rejecting this venue. This will be sent to the venue owner.
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
                  // Handle rejection
                  setShowRejectModal(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Reject Venue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
