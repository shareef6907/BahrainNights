'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Send, CheckCircle, Sparkles, Upload, X, Loader2, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { compressImage, validateImage, createPreviewUrl, revokePreviewUrl } from '@/lib/image-compress';
import VenueSearch from '@/components/forms/VenueSearch';
import AIWriterButton from '@/components/ai/AIWriterButton';

interface VenueDetails {
  name: string;
  address: string;
  lat: number;
  lng: number;
  placeId: string;
}

export default function ListEventPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Venue details from Google Places
  const [venueDetails, setVenueDetails] = useState<VenueDetails>({
    name: '',
    address: '',
    lat: 0,
    lng: 0,
    placeId: '',
  });

  const [formData, setFormData] = useState({
    eventName: '',
    venueName: '',
    category: '',
    date: '',
    time: '',
    price: '',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setError(null);

    // Validate the image
    const validation = validateImage(file, 10);
    if (!validation.valid) {
      setError(validation.error || 'Invalid image');
      return;
    }

    // Clean up old preview URL
    if (coverPreview) {
      revokePreviewUrl(coverPreview);
    }

    setCoverFile(file);
    setCoverPreview(createPreviewUrl(file));
  };

  const removeCover = () => {
    if (coverPreview) {
      revokePreviewUrl(coverPreview);
    }
    setCoverFile(null);
    setCoverPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate cover image
    if (!coverFile) {
      setError('Please upload a cover image for your event');
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Compress and upload cover image (target: 600KB-1MB)
      setUploadProgress('Compressing image...');
      const compressedBlob = await compressImage(coverFile);

      setUploadProgress('Uploading image...');
      const uploadFormData = new FormData();
      uploadFormData.append('file', compressedBlob, 'cover.jpg');
      uploadFormData.append('entityId', `pending-${Date.now()}`);

      const uploadRes = await fetch('/api/upload/public', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadRes.ok) {
        const uploadError = await uploadRes.json();
        throw new Error(uploadError.error || 'Failed to upload image');
      }

      const { url: coverUrl } = await uploadRes.json();

      // Step 2: Submit event data
      setUploadProgress('Submitting event...');
      const eventRes = await fetch('/api/events/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.eventName,
          category: formData.category,
          venueName: venueDetails.name || formData.venueName,
          venueAddress: venueDetails.address || null,
          venueLat: venueDetails.lat || null,
          venueLng: venueDetails.lng || null,
          venuePlaceId: venueDetails.placeId || null,
          date: formData.date,
          time: formData.time,
          price: formData.price,
          description: formData.description,
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          coverUrl,
        }),
      });

      if (!eventRes.ok) {
        const eventError = await eventRes.json();
        throw new Error(eventError.error || 'Failed to submit event');
      }

      // Success!
      setFormSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit event. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Event Submitted!</h1>
          <p className="text-gray-400 mb-8">
            Thank you for submitting your event. Our team will review it and get back to you within 24 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-orange-500/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full text-yellow-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              100% Free for All Businesses
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              List Your{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Event
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Reach thousands of people in Bahrain. Free promotion for all local businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image Upload */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-yellow-400" />
                Event Cover Image *
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Upload an eye-catching cover image. Recommended size: 1200x630px. Max 10MB.
              </p>

              {coverPreview ? (
                <div className="relative">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={removeCover}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-yellow-500/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-gray-500 text-sm">
                    JPG, PNG, WebP, or GIF (max 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Event Details */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-400" />
                Event Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  >
                    <option value="">Select category</option>
                    <option value="concerts">Concerts & Live Music</option>
                    <option value="nightlife">Nightlife & Parties</option>
                    <option value="family">Family & Kids</option>
                    <option value="cultural">Cultural & Arts</option>
                    <option value="sports">Sports & Fitness</option>
                    <option value="dining">Dining & Food</option>
                    <option value="business">Business & Networking</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Venue & Time */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-yellow-400" />
                Venue & Time
              </h3>
              <div className="space-y-4">
                {/* Venue Search - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Venue *
                  </label>
                  <VenueSearch
                    onSelect={(venue) => {
                      setVenueDetails(venue);
                      setFormData(prev => ({ ...prev, venueName: venue.name }));
                    }}
                    defaultValue={formData.venueName}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="Free / BD 10 / From BD 25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  />
                </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Event Description
                </label>
                <AIWriterButton
                  title={formData.eventName}
                  category={formData.category}
                  venue={venueDetails.name || formData.venueName}
                  date={formData.date}
                  time={formData.time}
                  existingDescription={formData.description}
                  onGenerated={(description) => setFormData(prev => ({ ...prev, description }))}
                  disabled={!formData.eventName}
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Tell us about your event... or use AI to generate a description!"
              />
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-yellow-400" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                    placeholder="+973 XXXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {uploadProgress || 'Submitting...'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Event for Review
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Events are typically reviewed within 24 hours
              </p>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
