'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Link as LinkIcon,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  X,
  MapPin,
} from 'lucide-react';

const CATEGORIES = [
  { value: 'dining', label: 'Dining & Restaurants' },
  { value: 'nightlife', label: 'Music & Nightlife' },
  { value: 'cultural', label: 'Arts & Culture' },
  { value: 'family', label: 'Family & Kids' },
  { value: 'sports', label: 'Sports & Fitness' },
  { value: 'wellness', label: 'Wellness & Spa' },
  { value: 'business', label: 'Business & Networking' },
  { value: 'shopping', label: 'Shopping & Markets' },
  { value: 'tours', label: 'Tours & Adventures' },
  { value: 'community', label: 'Community & Charity' },
  { value: 'special', label: 'Special Occasions' },
];

export default function CreateEventPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    price_range: '',
    booking_url: '',
    google_maps_url: '',
    tags: '',
    featured_image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file' });
      return;
    }

    // Validate file size (max 25MB - will be compressed to 600KB)
    if (file.size > 25 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image must be less than 25MB' });
      return;
    }

    setIsUploadingImage(true);
    setMessage(null);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('imageType', 'event');

      const response = await fetch('/api/venue-portal/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, featured_image: data.url }));
      } else {
        setMessage({ type: 'error', text: 'Failed to upload image' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'An error occurred while uploading' });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validation
    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: 'Please enter an event title' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.start_date) {
      setMessage({ type: 'error', text: 'Please select a start date' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.category) {
      setMessage({ type: 'error', text: 'Please select a category' });
      setIsSubmitting(false);
      return;
    }

    try {
      const eventData = {
        ...formData,
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
      };

      const response = await fetch('/api/venue-portal/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Event created and submitted for approval!' });
        setTimeout(() => {
          router.push('/venue-portal/events');
        }, 1500);
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to create event' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage({ type: 'error', text: 'An error occurred while creating the event' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/venue-portal/events"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Create Event</h1>
          <p className="text-gray-400 mt-1">Add a new event at your venue.</p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6"
      >
        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Featured Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {formData.featured_image ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5">
              <img
                src={formData.featured_image}
                alt="Featured"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, featured_image: '' }))}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingImage}
              className="w-full aspect-video border-2 border-dashed border-white/20 rounded-xl hover:border-yellow-400/50 hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-3"
            >
              {isUploadingImage ? (
                <>
                  <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
                  <p className="text-gray-400">Uploading...</p>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                    <ImageIcon className="w-7 h-7 text-gray-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Click to upload image</p>
                    <p className="text-gray-500 text-sm">PNG, JPG up to 25MB</p>
                  </div>
                </>
              )}
            </button>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="e.g., Ladies Night - 50% Off Cocktails"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent resize-none"
            placeholder="Describe your event, what guests can expect, special offers..."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Tag className="w-4 h-4 inline mr-2" />
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Start Date *
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            />
            <p className="text-gray-500 text-xs mt-1">Leave empty for single-day events</p>
          </div>
        </div>

        {/* Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Start Time
            </label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              End Time
            </label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            />
          </div>
        </div>

        {/* Price & Booking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price Range
            </label>
            <select
              name="price_range"
              value={formData.price_range}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            >
              <option value="">Select price range</option>
              <option value="Free">Free</option>
              <option value="$">$ (Under BD 10)</option>
              <option value="$$">$$ (BD 10-25)</option>
              <option value="$$$">$$$ (BD 25-50)</option>
              <option value="$$$$">$$$$ (Over BD 50)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <LinkIcon className="w-4 h-4 inline mr-2" />
              Booking URL
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                https://
              </span>
              <input
                type="text"
                name="booking_url"
                value={formData.booking_url.replace(/^https?:\/\//, '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/^https?:\/\//, '');
                  setFormData((prev) => ({ ...prev, booking_url: value ? `https://${value}` : '' }));
                }}
                className="w-full pl-20 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                placeholder="www.booking-site.com/event"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="e.g., ladies night, happy hour, live music"
          />
        </div>

        {/* Google Maps Link */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Event Location (Google Maps Link)
          </label>
          <input
            type="url"
            name="google_maps_url"
            value={formData.google_maps_url}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="https://maps.google.com/..."
          />
          <p className="text-gray-500 text-xs mt-1">
            Paste the Google Maps link to your event location (optional - uses venue location if empty)
          </p>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Events are reviewed before publishing
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Create Event
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
