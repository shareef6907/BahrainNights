'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Loader2,
  ImageIcon,
  Upload,
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: string;
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
  cover_url: string | null;
  image_url: string | null;
  featured_image: string | null;
  source_name: string | null;
  source_url: string | null;
}

export default function AdminEventEditPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id as string | undefined;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    venue_name: '',
    venue_address: '',
    date: '',
    time: '',
    end_date: '',
    end_time: '',
    price: '',
    price_type: 'paid',
    booking_url: '',
    cover_url: '',
  });

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

        const e = data.event;
        setEvent(e);
        setFormData({
          title: e.title || '',
          description: e.description || '',
          category: e.category || '',
          venue_name: e.venue_name || '',
          venue_address: e.venue_address || '',
          date: e.date ? e.date.split('T')[0] : '',
          time: e.time || '',
          end_date: e.end_date ? e.end_date.split('T')[0] : '',
          end_time: e.end_time || '',
          price: e.price || '',
          price_type: e.price_type || 'paid',
          booking_url: e.booking_url || '',
          cover_url: e.cover_url || e.image_url || e.featured_image || '',
        });
      } catch (err) {
        setError('Failed to fetch event');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle save
  const handleSave = async () => {
    if (!eventId) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to save');
        return;
      }

      // Redirect back to event detail page
      router.push(`/admin/events/${eventId}`);
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  // Handle file upload for cover image
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'events');

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Upload failed');
        return;
      }

      setFormData(prev => ({ ...prev, cover_url: data.url }));
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed');
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

  const categories = [
    'music', 'dining', 'family', 'arts', 'sports',
    'nightlife', 'business', 'wellness', 'shopping',
    'community', 'entertainment', 'other'
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <Link
          href={`/admin/events/${eventId}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Event
        </Link>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Edit Event</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-6"
      >
        {/* Cover Image */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white">Cover Image</label>

          {/* Current Image Preview */}
          {formData.cover_url && (
            <div className="relative aspect-video max-w-md rounded-xl overflow-hidden border border-white/10">
              <Image
                src={formData.cover_url}
                alt="Cover preview"
                fill
                className="object-cover object-top"
              />
            </div>
          )}

          {/* URL Input */}
          <div className="flex gap-3">
            <input
              type="url"
              name="cover_url"
              value={formData.cover_url}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* File Upload */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-sm text-gray-400">or paste URL above</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-[#1A1A2E]">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Venue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Venue Name</label>
            <input
              type="text"
              name="venue_name"
              value={formData.venue_name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Venue Address</label>
            <input
              type="text"
              name="venue_address"
              value={formData.venue_address}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Start Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Start Time</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g., 7:00 PM"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">End Date (optional)</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">End Time (optional)</label>
            <input
              type="text"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              placeholder="e.g., 11:00 PM"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Price Type</label>
            <select
              name="price_type"
              value={formData.price_type}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            >
              <option value="free" className="bg-[#1A1A2E]">Free</option>
              <option value="paid" className="bg-[#1A1A2E]">Paid</option>
              <option value="varies" className="bg-[#1A1A2E]">Varies</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., BD 25 or Free"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Booking URL */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Booking URL</label>
          <input
            type="url"
            name="booking_url"
            value={formData.booking_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Source Info (read-only) */}
        {event.source_name && (
          <div className="pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Source: <span className="text-gray-300">{event.source_name}</span>
              {event.source_url && (
                <>
                  {' - '}
                  <a href={event.source_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                    View Original
                  </a>
                </>
              )}
            </p>
          </div>
        )}
      </motion.div>

      {/* Save Button (bottom) */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>
      </div>
    </div>
  );
}
