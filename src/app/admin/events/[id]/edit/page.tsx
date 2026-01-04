'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  Star,
  StarOff,
} from 'lucide-react';
import AIWriterButton from '@/components/ai/AIWriterButton';

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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state - ONLY fields that exist in database
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'published',
    is_featured: false,
    venue_name: '',
    venue_address: '',
    date: '',
    time: '',
    end_date: '',
    end_time: '',
    price: '',
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
          status: e.status || 'published',
          is_featured: e.is_featured || false,
          venue_name: e.venue_name || '',
          venue_address: e.venue_address || '',
          date: e.date ? e.date.split('T')[0] : '',
          time: e.time || '',
          end_date: e.end_date ? e.end_date.split('T')[0] : '',
          end_time: e.end_time || '',
          price: e.price || '',
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
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle save - only send fields that exist in DB
  const handleSave = async () => {
    if (!eventId) return;

    setSaving(true);
    try {
      // Only include fields that exist in the database
      const updatePayload = {
        action: 'update',
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: formData.status,
        is_featured: formData.is_featured,
        venue_name: formData.venue_name,
        venue_address: formData.venue_address || null,
        date: formData.date || null,
        time: formData.time || null,
        end_date: formData.end_date || null,
        end_time: formData.end_time || null,
        price: formData.price || null,
        booking_url: formData.booking_url || null,
        cover_url: formData.cover_url || null,
      };

      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
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

  // Handle file upload for cover image - direct to S3, no watermark
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be less than 10MB');
      return;
    }

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const response = await fetch('/api/upload/admin', {
        method: 'POST',
        body: uploadData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.details || data.error || 'Upload failed');
        return;
      }

      // Update the cover URL with the new image
      setFormData(prev => ({ ...prev, cover_url: data.url }));

      // Show success message with compression info
      const compressionInfo = data.compressedSize
        ? `Compressed from ${(data.originalSize / 1024).toFixed(0)}KB to ${(data.compressedSize / 1024).toFixed(0)}KB`
        : '';
      alert(`Image uploaded successfully! ${compressionInfo}\n\nDon't forget to click "Save Changes" to save the event.`);
    } catch (err) {
      console.error('[Edit Page] Upload error:', err);
      alert('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUploading(false);
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

  const statuses = [
    { value: 'published', label: 'Published', color: 'text-green-400' },
    { value: 'draft', label: 'Draft', color: 'text-gray-400' },
    { value: 'pending', label: 'Pending', color: 'text-orange-400' },
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
        {/* Status & Featured Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
            >
              {statuses.map(s => (
                <option key={s.value} value={s.value} className="bg-[#1A1A2E]">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                formData.is_featured
                  ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}>
                {formData.is_featured ? (
                  <Star className="w-4 h-4 fill-current" />
                ) : (
                  <StarOff className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {formData.is_featured ? 'Featured' : 'Not Featured'}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white">Cover Image</label>

          {/* Current Image Preview */}
          {formData.cover_url ? (
            <div className="relative aspect-video max-w-md rounded-xl overflow-hidden border border-white/10 bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.cover_url}
                alt="Cover preview"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  console.error('Image failed to load:', formData.cover_url);
                  (e.target as HTMLImageElement).style.display = 'none';
                  const placeholder = document.getElementById('image-error-placeholder');
                  if (placeholder) placeholder.style.display = 'flex';
                }}
                onLoad={(e) => {
                  (e.target as HTMLImageElement).style.display = 'block';
                  const placeholder = document.getElementById('image-error-placeholder');
                  if (placeholder) placeholder.style.display = 'none';
                }}
              />
              <div
                id="image-error-placeholder"
                className="absolute inset-0 flex-col items-center justify-center bg-red-500/10 text-red-400 hidden"
              >
                <span className="text-sm">Image failed to load</span>
                <span className="text-xs mt-1 text-gray-400">URL may be invalid</span>
              </div>
            </div>
          ) : (
            <div className="aspect-video max-w-md rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-500">
              No cover image
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
            <label className={`flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white cursor-pointer transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
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
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-white">Description</label>
            <AIWriterButton
              title={formData.title}
              category={formData.category}
              venue={formData.venue_name}
              date={formData.date}
              time={formData.time}
              existingDescription={formData.description}
              onGenerated={(description) => setFormData(prev => ({ ...prev, description }))}
              disabled={!formData.title}
            />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Enter event description or use AI to generate one..."
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
        <div>
          <label className="block text-sm font-medium text-white mb-2">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., BD 25, Free, Varies"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
          />
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
