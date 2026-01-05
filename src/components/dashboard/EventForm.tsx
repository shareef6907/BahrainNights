'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  DollarSign,
  Tag,
  Link as LinkIcon,
  Users,
  Shirt,
  Info,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import ImageUpload from './ImageUpload';

export interface EventFormData {
  title: string;
  description: string;
  category: string;
  tags: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isRecurring: boolean;
  recurringPattern: string;
  recurringDays: string[];
  priceType: 'free' | 'paid' | 'range';
  price: string;
  priceMin: string;
  priceMax: string;
  bookingUrl: string;
  bookingMethod: string;
  featuredImage: string;
  galleryImages: string[];
  ageRestriction: string;
  dressCode: string;
  specialInstructions: string;
}

interface EventFormProps {
  initialData?: Partial<EventFormData>;
  isEditing?: boolean;
  eventId?: string;
}

const categories = [
  'Concert',
  'Live Music',
  'Family',
  'Cultural',
  'Nightlife',
  'Dining',
  'Sports',
  'Workshop',
  'Exhibition',
  'Other',
];

const bookingMethods = [
  { value: 'website', label: 'Website' },
  { value: 'phone', label: 'Phone' },
  { value: 'walkin', label: 'Walk-in' },
  { value: 'none', label: 'No booking needed' },
];

const ageRestrictions = [
  { value: 'all', label: 'All ages' },
  { value: '18+', label: '18+' },
  { value: '21+', label: '21+' },
];

const recurringPatterns = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const defaultFormData: EventFormData = {
  title: '',
  description: '',
  category: '',
  tags: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  isRecurring: false,
  recurringPattern: 'weekly',
  recurringDays: [],
  priceType: 'free',
  price: '',
  priceMin: '',
  priceMax: '',
  bookingUrl: '',
  bookingMethod: 'none',
  featuredImage: '',
  galleryImages: [],
  ageRestriction: 'all',
  dressCode: '',
  specialInstructions: '',
};

export default function EventForm({ initialData, isEditing = false, eventId }: EventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<EventFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'basic',
    'datetime',
    'pricing',
    'media',
  ]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  }, []);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => {
      if (prev[name as keyof EventFormData]) {
        return { ...prev, [name]: undefined };
      }
      return prev;
    });
  }, []);

  const handleDayToggle = useCallback((day: string) => {
    setFormData((prev) => ({
      ...prev,
      recurringDays: prev.recurringDays.includes(day)
        ? prev.recurringDays.filter((d) => d !== day)
        : [...prev.recurringDays, day],
    }));
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EventFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    if (formData.priceType === 'paid' && !formData.price) {
      newErrors.price = 'Price is required';
    }
    if (formData.priceType === 'range') {
      if (!formData.priceMin) newErrors.priceMin = 'Min price is required';
      if (!formData.priceMax) newErrors.priceMax = 'Max price is required';
    }
    if (!formData.featuredImage) {
      newErrors.featuredImage = 'Featured image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (isDraft: boolean) => {
    if (!isDraft && !validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        status: isDraft ? 'draft' : 'published',
      };

      const url = isEditing && eventId
        ? `/api/dashboard/events/${eventId}`
        : '/api/dashboard/events';

      const method = isEditing && eventId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          // Handle validation errors
          const fieldErrors: Partial<Record<keyof EventFormData, string>> = {};
          data.details.forEach((err: { field: string; message: string }) => {
            fieldErrors[err.field as keyof EventFormData] = err.message;
          });
          setErrors(fieldErrors);
          return;
        }
        throw new Error(data.error || 'Failed to save event');
      }

      // Show success and redirect
      router.push('/dashboard/events');
    } catch (error) {
      console.error('Submit error:', error);
      alert(error instanceof Error ? error.message : 'Failed to save event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SectionHeader = ({
    title,
    icon: Icon,
    section,
  }: {
    title: string;
    icon: React.ElementType;
    section: string;
  }) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5">
          <Icon className="w-5 h-5 text-yellow-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <ChevronDown
        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
          expandedSections.includes(section) ? 'rotate-180' : ''
        }`}
      />
    </button>
  );

  return (
    <form className="space-y-6">
      {/* Section 1: Basic Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Basic Information" icon={Info} section="basic" />

        {expandedSections.includes('basic') && (
          <div className="px-4 pb-4 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Live Jazz Night"
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.title
                    ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                    : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                }`}
              />
              {errors.title && (
                <p className="text-sm text-red-400 mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your event..."
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all resize-none ${
                  errors.description
                    ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                    : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                }`}
              />
              {errors.description && (
                <p className="text-sm text-red-400 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${
                  errors.category
                    ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                    : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-400 mt-1">{errors.category}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., jazz, live music, cocktails"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 2: Date & Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Date & Time" icon={Calendar} section="datetime" />

        {expandedSections.includes('datetime') && (
          <div className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-1 transition-all ${
                    errors.startDate
                      ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                      : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                  }`}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-400 mt-1">{errors.startDate}</p>
                )}
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-1 transition-all ${
                    errors.startTime
                      ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                      : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                  }`}
                />
                {errors.startTime && (
                  <p className="text-sm text-red-400 mt-1">{errors.startTime}</p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Time <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
            </div>

            {/* Recurring Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, isRecurring: !prev.isRecurring }))
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.isRecurring ? 'bg-yellow-400' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    formData.isRecurring ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
              <span className="text-gray-300">Recurring event</span>
            </div>

            {/* Recurring Options */}
            {formData.isRecurring && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pt-4 border-t border-white/10"
              >
                <select
                  name="recurringPattern"
                  value={formData.recurringPattern}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                >
                  {recurringPatterns.map((pattern) => (
                    <option key={pattern.value} value={pattern.value}>
                      {pattern.label}
                    </option>
                  ))}
                </select>

                {formData.recurringPattern === 'weekly' && (
                  <div className="flex flex-wrap gap-2">
                    {weekDays.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          formData.recurringDays.includes(day)
                            ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                            : 'border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Section 3: Pricing & Booking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Pricing & Booking" icon={DollarSign} section="pricing" />

        {expandedSections.includes('pricing') && (
          <div className="px-4 pb-4 space-y-4">
            {/* Price Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Price Type <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {(['free', 'paid', 'range'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, priceType: type }))}
                    className={`px-5 py-2.5 rounded-xl border transition-all ${
                      formData.priceType === type
                        ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                        : 'border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {type === 'free' ? 'Free' : type === 'paid' ? 'Paid' : 'Price Range'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Inputs */}
            {formData.priceType === 'paid' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (BD) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                  min="0"
                  step="0.5"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                    errors.price
                      ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                      : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                  }`}
                />
                {errors.price && (
                  <p className="text-sm text-red-400 mt-1">{errors.price}</p>
                )}
              </div>
            )}

            {formData.priceType === 'range' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Min Price (BD) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="priceMin"
                    value={formData.priceMin}
                    onChange={handleChange}
                    placeholder="e.g., 15"
                    min="0"
                    step="0.5"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                      errors.priceMin
                        ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                        : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Price (BD) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="priceMax"
                    value={formData.priceMax}
                    onChange={handleChange}
                    placeholder="e.g., 50"
                    min="0"
                    step="0.5"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                      errors.priceMax
                        ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                        : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Booking URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Booking URL <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  name="bookingUrl"
                  value={formData.bookingUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
            </div>

            {/* Booking Method */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Booking Method
              </label>
              <select
                name="bookingMethod"
                value={formData.bookingMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
              >
                {bookingMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 4: Media */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Media" icon={Clock} section="media" />

        {expandedSections.includes('media') && (
          <div className="px-4 pb-4 space-y-6">
            <ImageUpload
              label="Featured Image"
              value={formData.featuredImage}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, featuredImage: url || '' }))
              }
              required
              error={errors.featuredImage}
              entityType="event"
              imageType="cover"
            />
          </div>
        )}
      </motion.div>

      {/* Section 5: Additional Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Additional Details" icon={Users} section="additional" />

        {expandedSections.includes('additional') && (
          <div className="px-4 pb-4 space-y-4">
            {/* Age Restriction */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Age Restriction
              </label>
              <select
                name="ageRestriction"
                value={formData.ageRestriction}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
              >
                {ageRestrictions.map((age) => (
                  <option key={age.value} value={age.value}>
                    {age.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dress Code */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dress Code <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <Shirt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="dressCode"
                  value={formData.dressCode}
                  onChange={handleChange}
                  placeholder="e.g., Smart casual"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Special Instructions <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                rows={3}
                placeholder="Any special instructions for attendees..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all resize-none"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Form Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 sm:justify-end sticky bottom-20 lg:bottom-4 bg-[#0A0A0F]/95 backdrop-blur-xl py-4 -mx-4 px-4 lg:-mx-6 lg:px-6 border-t border-white/10"
      >
        <button
          type="button"
          onClick={() => router.push('/dashboard/events')}
          className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          disabled={isSubmitting}
          className="px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'Save as Draft'
          )}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : isEditing ? (
            'Update Event'
          ) : (
            'Publish Event'
          )}
        </button>
      </motion.div>
    </form>
  );
}
