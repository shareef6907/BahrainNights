'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Tag,
  Clock,
  Calendar,
  List,
  FileText,
  ChevronDown,
  Loader2,
  Plus,
  X,
} from 'lucide-react';
import ImageUpload from './ImageUpload';

export interface OfferFormData {
  title: string;
  offerType: string;
  description: string;
  days: string[];
  startTime: string;
  endTime: string;
  validFrom: string;
  validUntil: string;
  isOngoing: boolean;
  inclusions: string[];
  terms: string;
  reservationRequired: boolean;
  featuredImage: string;
}

interface OfferFormProps {
  initialData?: Partial<OfferFormData>;
  isEditing?: boolean;
}

const offerTypes = [
  'Ladies Night',
  'Brunch',
  'Happy Hour',
  'Special Deal',
  'Set Menu',
  'Live Entertainment',
  'Other',
];

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const defaultFormData: OfferFormData = {
  title: '',
  offerType: '',
  description: '',
  days: [],
  startTime: '',
  endTime: '',
  validFrom: '',
  validUntil: '',
  isOngoing: true,
  inclusions: [''],
  terms: '',
  reservationRequired: false,
  featuredImage: '',
};

export default function OfferForm({ initialData, isEditing = false }: OfferFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<OfferFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OfferFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'details',
    'schedule',
    'inclusions',
    'media',
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name as keyof OfferFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleInclusionChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newInclusions = [...prev.inclusions];
      newInclusions[index] = value;
      return { ...prev, inclusions: newInclusions };
    });
  };

  const addInclusion = () => {
    setFormData((prev) => ({
      ...prev,
      inclusions: [...prev.inclusions, ''],
    }));
  };

  const removeInclusion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index),
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OfferFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Offer title is required';
    }
    if (!formData.offerType) {
      newErrors.offerType = 'Please select an offer type';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.days.length === 0) {
      newErrors.days = 'Please select at least one day';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
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
      // TODO: Implement actual API call
      console.log('Submitting:', { ...formData, status: isDraft ? 'draft' : 'active' });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success and redirect
      router.push('/dashboard/offers');
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to save offer. Please try again.');
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
      {/* Section 1: Offer Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Offer Details" icon={Tag} section="details" />

        {expandedSections.includes('details') && (
          <div className="px-4 pb-4 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Offer Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Ladies Night Tuesday"
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

            {/* Offer Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Offer Type <span className="text-red-400">*</span>
              </label>
              <select
                name="offerType"
                value={formData.offerType}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${
                  errors.offerType
                    ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                    : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                }`}
              >
                <option value="">Select offer type</option>
                {offerTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.offerType && (
                <p className="text-sm text-red-400 mt-1">{errors.offerType}</p>
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
                placeholder="Describe your offer..."
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
          </div>
        )}
      </motion.div>

      {/* Section 2: Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Schedule" icon={Clock} section="schedule" />

        {expandedSections.includes('schedule') && (
          <div className="px-4 pb-4 space-y-4">
            {/* Days Available */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Days Available <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      formData.days.includes(day)
                        ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                        : 'border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
              {errors.days && (
                <p className="text-sm text-red-400 mt-2">{errors.days}</p>
              )}
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-1 transition-all ${
                    errors.endTime
                      ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/25'
                      : 'border-white/10 focus:border-yellow-400/50 focus:ring-yellow-400/25'
                  }`}
                />
              </div>
            </div>

            {/* Validity */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, isOngoing: !prev.isOngoing }))
                  }
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formData.isOngoing ? 'bg-yellow-400' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      formData.isOngoing ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
                <span className="text-gray-300">Ongoing offer (no end date)</span>
              </div>

              {!formData.isOngoing && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Valid From
                    </label>
                    <input
                      type="date"
                      name="validFrom"
                      value={formData.validFrom}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Valid Until
                    </label>
                    <input
                      type="date"
                      name="validUntil"
                      value={formData.validUntil}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 3: What's Included */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="What's Included" icon={List} section="inclusions" />

        {expandedSections.includes('inclusions') && (
          <div className="px-4 pb-4 space-y-4">
            {formData.inclusions.map((inclusion, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inclusion}
                  onChange={(e) => handleInclusionChange(index, e.target.value)}
                  placeholder={`e.g., ${
                    index === 0
                      ? '3 free drinks'
                      : index === 1
                      ? '50% off food'
                      : 'Free entry'
                  }`}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
                {formData.inclusions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInclusion(index)}
                    className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addInclusion}
              className="flex items-center gap-2 px-4 py-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add another item
            </button>
          </div>
        )}
      </motion.div>

      {/* Section 4: Terms & Conditions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Terms & Conditions" icon={FileText} section="terms" />

        {expandedSections.includes('terms') && (
          <div className="px-4 pb-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Terms & Conditions <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                rows={4}
                placeholder="Enter any terms, restrictions, or conditions..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    reservationRequired: !prev.reservationRequired,
                  }))
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.reservationRequired ? 'bg-yellow-400' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    formData.reservationRequired ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
              <span className="text-gray-300">Reservation required</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 5: Media */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Media" icon={Calendar} section="media" />

        {expandedSections.includes('media') && (
          <div className="px-4 pb-4">
            <ImageUpload
              label="Featured Image"
              value={formData.featuredImage}
              onChange={(url) =>
                setFormData((prev) => ({ ...prev, featuredImage: url || '' }))
              }
            />
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
          onClick={() => router.push('/dashboard/offers')}
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
            'Update Offer'
          ) : (
            'Publish Offer'
          )}
        </button>
      </motion.div>
    </form>
  );
}
