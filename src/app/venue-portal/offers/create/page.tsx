'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Tag,
  Sparkles,
  Wine,
  UtensilsCrossed,
  Gift,
  Utensils,
  Upload,
  X,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import AIWriterButton from '@/components/ai/AIWriterButton';
import { compressImage } from '@/lib/image-compression';

const offerTypes = [
  { value: 'ladies-night', label: 'Ladies Night', icon: Sparkles, color: 'pink' },
  { value: 'brunch', label: 'Brunch', icon: UtensilsCrossed, color: 'orange' },
  { value: 'happy-hour', label: 'Happy Hour', icon: Wine, color: 'yellow' },
  { value: 'special-deal', label: 'Special Deal', icon: Tag, color: 'blue' },
  { value: 'buy1get1', label: 'Buy 1 Get 1 Free', icon: Gift, color: 'green' },
  { value: 'buffet', label: 'Buffet', icon: Utensils, color: 'purple' },
];

const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export default function CreateOfferPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    offer_type: '',
    days_available: [] as string[],
    start_time: '',
    end_time: '',
    valid_from: '',
    valid_until: '',
    is_ongoing: true,
    whats_included: [''],
    terms_conditions: '',
    reservation_required: false,
    featured_image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days_available: prev.days_available.includes(day)
        ? prev.days_available.filter(d => d !== day)
        : [...prev.days_available, day]
    }));
  };

  const handleSelectAllDays = () => {
    if (formData.days_available.length === 7) {
      setFormData(prev => ({ ...prev, days_available: [] }));
    } else {
      setFormData(prev => ({ ...prev, days_available: [...daysOfWeek] }));
    }
  };

  const handleIncludedChange = (index: number, value: string) => {
    const newIncluded = [...formData.whats_included];
    newIncluded[index] = value;
    setFormData(prev => ({ ...prev, whats_included: newIncluded }));
  };

  const addIncludedItem = () => {
    setFormData(prev => ({ ...prev, whats_included: [...prev.whats_included, ''] }));
  };

  const removeIncludedItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      whats_included: prev.whats_included.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Compress image to target 600KB-1MB
      console.log(`[Offer] Compressing ${file.name}: ${(file.size / 1024).toFixed(0)}KB`);
      let compressedFile: File;
      try {
        compressedFile = await compressImage(file);
        console.log(`[Offer] Compressed to: ${(compressedFile.size / 1024).toFixed(0)}KB`);
      } catch (compressError) {
        console.error('[Offer] Compression failed:', compressError);
        compressedFile = file; // Fall back to original if compression fails
      }

      const uploadFormData = new FormData();
      uploadFormData.append('file', compressedFile);
      uploadFormData.append('imageType', 'offer');

      const response = await fetch('/api/venue-portal/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setFormData(prev => ({ ...prev, featured_image: data.url }));
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Offer title is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.offer_type) {
      setError('Please select an offer type');
      setIsSubmitting(false);
      return;
    }

    if (formData.days_available.length === 0) {
      setError('Please select at least one day');
      setIsSubmitting(false);
      return;
    }

    if (!formData.start_time || !formData.end_time) {
      setError('Start and end times are required');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/venue-portal/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          whats_included: formData.whats_included.filter(item => item.trim() !== ''),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create offer');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/venue-portal/offers');
      }, 2000);
    } catch (err) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create offer');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Offer Created!</h2>
          <p className="text-gray-400">Your offer is now active and visible on BahrainNights.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/venue-portal/offers"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Create New Offer</h1>
          <p className="text-gray-400 mt-1">Add a special offer to attract more customers.</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Offer Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Ladies Night - Free Drinks"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Description *
                </label>
                <AIWriterButton
                  contentType="offer"
                  title={formData.title}
                  offerType={formData.offer_type}
                  daysAvailable={formData.days_available}
                  time={formData.start_time ? `${formData.start_time} - ${formData.end_time}` : ''}
                  whatsIncluded={formData.whats_included}
                  existingDescription={formData.description}
                  onGenerated={(description) => setFormData(prev => ({ ...prev, description }))}
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your offer in detail..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Offer Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {offerTypes.map(type => {
                  const Icon = type.icon;
                  const isSelected = formData.offer_type === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, offer_type: type.value }))}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Schedule</h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-300">
                  Days Available *
                </label>
                <button
                  type="button"
                  onClick={handleSelectAllDays}
                  className="text-xs text-yellow-400 hover:text-yellow-300"
                >
                  {formData.days_available.length === 7 ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.days_available.includes(day)
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_ongoing"
                name="is_ongoing"
                checked={formData.is_ongoing}
                onChange={handleInputChange}
                className="w-5 h-5 rounded bg-white/5 border-white/20 text-yellow-400 focus:ring-yellow-400/50"
              />
              <label htmlFor="is_ongoing" className="text-gray-300">
                This is an ongoing offer (no end date)
              </label>
            </div>

            {!formData.is_ongoing && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Valid From
                  </label>
                  <input
                    type="date"
                    name="valid_from"
                    value={formData.valid_from}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    name="valid_until"
                    value={formData.valid_until}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Offer Details</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                What's Included
              </label>
              <div className="space-y-3">
                {formData.whats_included.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleIncludedChange(index, e.target.value)}
                      placeholder="e.g., 3 Free Drinks"
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
                    />
                    {formData.whats_included.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIncludedItem(index)}
                        className="p-3 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addIncludedItem}
                className="mt-3 text-sm text-yellow-400 hover:text-yellow-300"
              >
                + Add another item
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Terms & Conditions
              </label>
              <textarea
                name="terms_conditions"
                value={formData.terms_conditions}
                onChange={handleInputChange}
                rows={3}
                placeholder="e.g., Valid ID required. Cannot be combined with other offers."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="reservation_required"
                name="reservation_required"
                checked={formData.reservation_required}
                onChange={handleInputChange}
                className="w-5 h-5 rounded bg-white/5 border-white/20 text-yellow-400 focus:ring-yellow-400/50"
              />
              <label htmlFor="reservation_required" className="text-gray-300">
                Reservation required for this offer
              </label>
            </div>
          </div>
        </motion.div>

        {/* Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Featured Image</h2>

          <div className="space-y-4">
            {formData.featured_image ? (
              <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5">
                <img
                  src={formData.featured_image}
                  alt="Featured"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                  className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-white/20 hover:border-yellow-500/50 cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                {isUploading ? (
                  <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-500 mb-3" />
                    <p className="text-gray-400 text-sm">Click to upload an image</p>
                    <p className="text-gray-500 text-xs mt-1">Recommended: 1200x630px</p>
                  </>
                )}
              </label>
            )}
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <Link
            href="/venue-portal/offers"
            className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Tag className="w-5 h-5" />
                Create Offer
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
