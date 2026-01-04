'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
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
  Loader2,
  RefreshCw,
  ImageIcon,
  Mail,
  Phone,
  User,
  MapPin,
  Clock,
  Tag,
  DollarSign,
  ExternalLink,
  X,
  Sparkles,
  Save,
} from 'lucide-react';
import AIWriterButton from '@/components/ai/AIWriterButton';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  start_date: string;
  start_time: string | null;
  end_date: string | null;
  end_time: string | null;
  venue_name: string | null;
  venue_address: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  featured_image: string | null;
  cover_url: string | null;
  status: string;
  is_featured: boolean;
  view_count: number;
  views: number;
  price: string | null;
  booking_url: string | null;
  booking_link: string | null;
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

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex items-center gap-2">
        {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
      </div>
    </motion.div>
  );
}

// Event Details Modal
function EventDetailsModal({
  event,
  onClose,
  onApprove,
  onReject,
  onUnpublish,
  onDelete,
  onEdit,
  onUpdateDescription,
  loading,
}: {
  event: Event;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onUnpublish: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onUpdateDescription: (description: string) => Promise<void>;
  loading: boolean;
}) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(event.description || '');
  const [isSavingDescription, setIsSavingDescription] = useState(false);

  const imageUrl = event.cover_url || event.featured_image;
  const bookingUrl = event.booking_url || event.booking_link;
  const isPast = new Date(event.start_date) < new Date();

  const handleSaveDescription = async () => {
    setIsSavingDescription(true);
    try {
      await onUpdateDescription(editedDescription);
      setIsEditingDescription(false);
    } catch (error) {
      console.error('Failed to save description:', error);
    } finally {
      setIsSavingDescription(false);
    }
  };

  const handleAIGenerated = (description: string) => {
    setEditedDescription(description);
    setIsEditingDescription(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1A1A2E] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative">
          {imageUrl ? (
            <div className="relative h-48 w-full">
              <Image
                src={imageUrl}
                alt={event.title}
                fill
                className="object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent" />
            </div>
          ) : (
            <div className="h-32 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-t-2xl flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-500" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title and Status */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">{event.title}</h2>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              event.status === 'published' ? 'bg-green-500/20 text-green-400' :
              event.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
              event.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Unknown'}
            </span>
          </div>

          {/* Description with AI Writer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Description</h3>
              <div className="flex items-center gap-2">
                {!isEditingDescription && (
                  <>
                    <AIWriterButton
                      title={event.title}
                      category={event.category}
                      venue={event.venue_name || undefined}
                      date={event.start_date}
                      time={event.start_time || undefined}
                      existingDescription={event.description || undefined}
                      onGenerated={handleAIGenerated}
                      disabled={isPast}
                    />
                    <button
                      onClick={() => setIsEditingDescription(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>

            {isEditingDescription ? (
              <div className="space-y-3">
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                  placeholder="Enter event description..."
                />
                <div className="flex items-center gap-2">
                  <AIWriterButton
                    title={event.title}
                    category={event.category}
                    venue={event.venue_name || undefined}
                    date={event.start_date}
                    time={event.start_time || undefined}
                    existingDescription={editedDescription || undefined}
                    onGenerated={setEditedDescription}
                    disabled={isPast}
                  />
                  <div className="flex-1" />
                  <button
                    onClick={() => {
                      setEditedDescription(event.description || '');
                      setIsEditingDescription(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDescription}
                    disabled={isSavingDescription}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {isSavingDescription ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-300">
                {event.description || <span className="text-gray-500 italic">No description provided. Click &quot;Write with AI&quot; to generate one!</span>}
              </p>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Tag className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-white">{event.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1) : 'Unknown'}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-white">
                  {new Date(event.start_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Clock className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-white">{event.start_time || 'Not specified'}</p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Venue</p>
                <p className="text-white">{event.venue_name || 'Not specified'}</p>
                {event.venue_address && (
                  <p className="text-xs text-gray-400">{event.venue_address}</p>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <DollarSign className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-white">{event.price || 'Free'}</p>
              </div>
            </div>

            {/* Views */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Eye className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Views</p>
                <p className="text-white">{(event.views || event.view_count || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Booking Link */}
          {bookingUrl && (
            <div className="p-3 bg-white/5 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">Booking Link</p>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <ExternalLink className="w-4 h-4" />
                {bookingUrl}
              </a>
            </div>
          )}

          {/* Contact Information */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-white">{event.contact_name || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  {event.contact_email ? (
                    <a href={`mailto:${event.contact_email}`} className="text-cyan-400 hover:underline">
                      {event.contact_email}
                    </a>
                  ) : (
                    <p className="text-gray-400">Not provided</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  {event.contact_phone ? (
                    <a href={`tel:${event.contact_phone}`} className="text-cyan-400 hover:underline">
                      {event.contact_phone}
                    </a>
                  ) : (
                    <p className="text-gray-400">Not provided</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-gray-500">
            <span>Created: {new Date(event.created_at).toLocaleDateString()}</span>
            <span>ID: {event.id.slice(0, 8)}...</span>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-white/10 pt-6 flex flex-wrap gap-3">
            {/* Pending Event Actions */}
            {event.status === 'pending' && !isPast && (
              <>
                <button
                  onClick={onApprove}
                  disabled={loading}
                  className="flex-1 min-w-[120px] px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  Approve
                </button>
                <button
                  onClick={onReject}
                  disabled={loading}
                  className="flex-1 min-w-[120px] px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </>
            )}

            {/* Published Event Actions */}
            {event.status === 'published' && !isPast && (
              <button
                onClick={onUnpublish}
                disabled={loading}
                className="flex-1 min-w-[120px] px-4 py-2.5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                Unpublish
              </button>
            )}

            {/* Draft/Rejected Event Actions */}
            {(event.status === 'draft' || event.status === 'rejected') && !isPast && (
              <button
                onClick={onApprove}
                disabled={loading}
                className="flex-1 min-w-[120px] px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Publish
              </button>
            )}

            {/* Edit Button - Always show for non-past events */}
            {!isPast && (
              <Link
                href={`/admin/events/${event.id}`}
                onClick={onEdit}
                className="flex-1 min-w-[120px] px-4 py-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
            )}

            {/* Delete Button - Always show */}
            <button
              onClick={onDelete}
              disabled={loading}
              className="px-4 py-2.5 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Rejection Reason Modal
function RejectModal({
  event,
  onConfirm,
  onCancel,
  loading
}: {
  event: Event;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [reason, setReason] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1A1A2E] border border-white/10 rounded-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white mb-2">Reject Event</h2>
        <p className="text-gray-400 mb-4">
          Rejecting: <span className="text-white">{event.title}</span>
        </p>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            Rejection Reason (optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for rejection..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 resize-none"
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            Reject
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Dropdown Menu Component with Portal - renders to document.body to avoid stacking context issues
function ActionDropdown({
  event,
  onAction,
  onDelete,
  onViewDetails,
  onReject,
  loading,
  onClose,
  buttonRect,
}: {
  event: Event;
  onAction: (action: string) => void;
  onDelete: () => void;
  onViewDetails: () => void;
  onReject: () => void;
  loading: boolean;
  onClose: () => void;
  buttonRect: { top: number; left: number; bottom: number; right: number };
}) {
  const isPast = new Date(event.start_date) < new Date();
  const [mounted, setMounted] = useState(false);

  // Only render portal after mount (for SSR compatibility)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate position based on the button rect
  const dropdownTop = buttonRect.bottom + 8;
  const dropdownLeft = Math.max(8, buttonRect.right - 192); // 192px = w-48

  const dropdownContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998]"
        onClick={onClose}
      />

      {/* Dropdown - Fixed Position */}
      <div
        className="fixed w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-2xl z-[9999] py-1"
        style={{ top: dropdownTop, left: dropdownLeft }}
      >
        {/* View Details */}
        <button
          onClick={() => {
            onViewDetails();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>

        {/* View Public Page */}
        <Link
          href={`/events/${event.slug}`}
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
          onClick={onClose}
        >
          <ExternalLink className="w-4 h-4" />
          View Public Page
        </Link>

        {/* Edit Event - Always available for all events */}
        <Link
          href={`/admin/events/${event.id}/edit`}
          className="flex items-center gap-2 px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-500/10"
          onClick={onClose}
        >
          <Edit className="w-4 h-4" />
          Edit Event
        </Link>

        <div className="my-1 border-t border-white/10" />

        {/* Pending Event Actions */}
        {event.status === 'pending' && !isPast && (
          <>
            <button
              onClick={() => {
                onAction('approve');
                onClose();
              }}
              disabled={loading}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10 disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              Approve & Publish
            </button>
            <button
              onClick={() => {
                onReject();
                onClose();
              }}
              disabled={loading}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
            >
              <XCircle className="w-4 h-4" />
              Reject Event
            </button>
          </>
        )}

        {/* Published Event Actions */}
        {event.status === 'published' && !isPast && (
          <button
            onClick={() => {
              onAction('draft');
              onClose();
            }}
            disabled={loading}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 disabled:opacity-50"
          >
            <Edit className="w-4 h-4" />
            Unpublish (Draft)
          </button>
        )}

        {/* Draft Event Actions */}
        {event.status === 'draft' && !isPast && (
          <button
            onClick={() => {
              onAction('approve');
              onClose();
            }}
            disabled={loading}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10 disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            Publish
          </button>
        )}

        {/* Feature Toggle */}
        {!isPast && (
          <button
            onClick={() => {
              onAction(event.is_featured ? 'unfeature' : 'feature');
              onClose();
            }}
            disabled={loading}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 disabled:opacity-50"
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
        )}

        <div className="my-1 border-t border-white/10" />

        {/* Delete */}
        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          disabled={loading}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </>
  );

  // Use portal to render dropdown at document.body level, bypassing stacking context issues
  if (!mounted) return null;
  return createPortal(dropdownContent, document.body);
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [rejectingEvent, setRejectingEvent] = useState<Event | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const menuButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

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

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

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
        showToast('Failed to fetch events', 'error');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      showToast('Failed to fetch events', 'error');
    } finally {
      setLoading(false);
    }
  }, [activeTab, categoryFilter, searchQuery]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Real-time subscription for new event submissions
  useEffect(() => {
    // Subscribe to all changes on the events table
    const channel = supabase
      .channel('admin-events-realtime')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'events',
        },
        (payload) => {
          // Refetch events when any change occurs
          fetchEvents();

          // Show toast notification for new submissions
          if (payload.eventType === 'INSERT') {
            const newEvent = payload.new as Event;
            if (newEvent.status === 'pending') {
              showToast(`New event submitted: ${newEvent.title}`, 'success');
            }
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
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

  const handleAction = async (eventId: string, action: string, rejectionReason?: string) => {
    setActionLoading(eventId);
    setOpenActionMenu(null);

    try {
      const body: Record<string, unknown> = { action };
      if (rejectionReason) {
        body.rejection_reason = rejectionReason;
      }

      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchEvents();

        // Show success toast
        if (action === 'approve') {
          showToast('Event approved and published!', 'success');
        } else if (action === 'reject') {
          showToast('Event rejected', 'success');
        } else if (action === 'feature') {
          showToast('Event marked as featured', 'success');
        } else if (action === 'unfeature') {
          showToast('Event removed from featured', 'success');
        } else if (action === 'draft') {
          showToast('Event unpublished', 'success');
        }
      } else {
        showToast(data.error || 'Action failed', 'error');
      }
    } catch (error) {
      console.error('Action error:', error);
      showToast('Action failed. Please try again.', 'error');
    } finally {
      setActionLoading(null);
      setRejectingEvent(null);
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
        showToast('Event deleted successfully', 'success');
      } else {
        const data = await response.json();
        showToast(data.error || 'Delete failed', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showToast('Delete failed. Please try again.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateDescription = async (eventId: string, description: string) => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_description', description }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the selected event locally
        if (selectedEvent && selectedEvent.id === eventId) {
          setSelectedEvent({ ...selectedEvent, description });
        }
        // Refresh the events list
        await fetchEvents();
        showToast('Description updated successfully!', 'success');
      } else {
        showToast(data.error || 'Failed to update description', 'error');
        throw new Error(data.error || 'Failed to update description');
      }
    } catch (error) {
      console.error('Update description error:', error);
      throw error;
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

  const formatCategory = (category: string | null | undefined) => {
    if (!category) return 'Unknown';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onApprove={() => {
              handleAction(selectedEvent.id, 'approve');
              setSelectedEvent(null);
            }}
            onReject={() => {
              setRejectingEvent(selectedEvent);
              setSelectedEvent(null);
            }}
            onUnpublish={() => {
              handleAction(selectedEvent.id, 'draft');
              setSelectedEvent(null);
            }}
            onDelete={() => {
              handleDelete(selectedEvent.id);
              setSelectedEvent(null);
            }}
            onEdit={() => setSelectedEvent(null)}
            onUpdateDescription={(description) => handleUpdateDescription(selectedEvent.id, description)}
            loading={actionLoading === selectedEvent.id}
          />
        )}
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {rejectingEvent && (
          <RejectModal
            event={rejectingEvent}
            onConfirm={(reason) => handleAction(rejectingEvent.id, 'reject', reason)}
            onCancel={() => setRejectingEvent(null)}
            loading={actionLoading === rejectingEvent.id}
          />
        )}
      </AnimatePresence>

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
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
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
                  <tr
                    key={event.id}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                      actionLoading === event.id ? 'opacity-50' : ''
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {event.featured_image || event.cover_url ? (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                            <Image
                              src={event.cover_url || event.featured_image || ''}
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
                            <span className="text-xs text-gray-500">{event.contact_email}</span>
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
                    <td className="p-4 text-gray-300">{(event.views || event.view_count || 0).toLocaleString()}</td>
                    <td className="p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(event.id, event.is_featured ? 'unfeature' : 'feature');
                        }}
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
                          ref={(el) => { menuButtonRefs.current[event.id] = el; }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionMenu(openActionMenu === event.id ? null : event.id);
                          }}
                          disabled={actionLoading === event.id}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {actionLoading === event.id ? (
                            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                          ) : (
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          )}
                        </button>

                        {openActionMenu === event.id && menuButtonRefs.current[event.id] && (
                          <ActionDropdown
                            event={event}
                            onAction={(action) => handleAction(event.id, action)}
                            onDelete={() => handleDelete(event.id)}
                            onViewDetails={() => setSelectedEvent(event)}
                            onReject={() => setRejectingEvent(event)}
                            loading={actionLoading === event.id}
                            onClose={() => setOpenActionMenu(null)}
                            buttonRect={menuButtonRefs.current[event.id]!.getBoundingClientRect()}
                          />
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
              <div
                key={event.id}
                className={`p-4 cursor-pointer hover:bg-white/5 ${actionLoading === event.id ? 'opacity-50' : ''}`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start gap-3">
                  {event.featured_image || event.cover_url ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                      <Image
                        src={event.cover_url || event.featured_image || ''}
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
                      <p className="mt-1">{(event.views || event.view_count || 0).toLocaleString()} views</p>
                    </div>
                    {event.contact_email && (
                      <div className="mt-2 p-2 bg-white/5 rounded-lg text-xs">
                        <p className="text-gray-400">Contact: {event.contact_name}</p>
                        <p className="text-cyan-400">{event.contact_email}</p>
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="px-3 py-1.5 text-xs bg-white/10 text-white rounded-lg"
                      >
                        View Details
                      </button>
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="px-3 py-1.5 text-xs bg-cyan-500/20 text-cyan-400 rounded-lg"
                      >
                        Edit
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
                            onClick={() => setRejectingEvent(event)}
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
