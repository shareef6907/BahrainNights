'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Phone,
  Globe,
  MapPin,
  Clock,
  CheckSquare,
  Image as ImageIcon,
  DollarSign,
  ChevronDown,
  Loader2,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react';
import ImageUpload from './ImageUpload';
import { GalleryUploader } from '../upload/GalleryUploader';

interface OpeningHours {
  closed: boolean;
  open: string;
  close: string;
}

interface VenueProfileData {
  name: string;
  type: string;
  description: string;
  descriptionAr: string;
  phone: string;
  email: string;
  website: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  twitter: string;
  area: string;
  address: string;
  googleMapsUrl: string;
  openingHours: Record<string, OpeningHours>;
  features: string[];
  logo: string;
  coverImage: string;
  galleryImages: string[];
  averageCost: string;
}

const venueTypes = [
  'Restaurant',
  'Cafe',
  'Bar & Lounge',
  'Nightclub',
  'Beach Club',
  'Pool Club',
  'Hotel',
  'Spa',
  'Other',
];

const areas = [
  'Manama',
  'Seef',
  'Juffair',
  'Adliya',
  'Amwaj Islands',
  'Bahrain Bay',
  'Riffa',
  'Muharraq',
  'Budaiya',
  'Zallaq',
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

const featuresList = [
  { id: 'outdoor_seating', label: 'Outdoor Seating' },
  { id: 'live_music', label: 'Live Music' },
  { id: 'shisha', label: 'Shisha' },
  { id: 'family_friendly', label: 'Family Friendly' },
  { id: 'reservations', label: 'Reservations' },
  { id: 'parking', label: 'Parking' },
  { id: 'valet_parking', label: 'Valet Parking' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'private_dining', label: 'Private Dining' },
  { id: 'wheelchair_accessible', label: 'Wheelchair Accessible' },
  { id: 'pet_friendly', label: 'Pet Friendly' },
  { id: 'delivery', label: 'Delivery' },
];

const defaultOpeningHours: Record<string, OpeningHours> = Object.fromEntries(
  weekDays.map((day) => [
    day,
    { closed: false, open: '10:00', close: '23:00' },
  ])
);

// Mock initial data for "The Orangery"
const mockVenueData: VenueProfileData = {
  name: 'The Orangery',
  type: 'Restaurant',
  description:
    'The Orangery is an award-winning restaurant offering a unique dining experience in the heart of Bahrain. Enjoy exquisite cuisine in our stunning garden setting.',
  descriptionAr: '',
  phone: '+973 1700 0000',
  email: 'info@theorangery.bh',
  website: 'https://theorangery.bh',
  whatsapp: '+973 3300 0000',
  instagram: 'theorangery_bh',
  facebook: 'https://facebook.com/theorangery',
  tiktok: '',
  twitter: '',
  area: 'Manama',
  address: 'Building 123, Road 456, Block 789, Manama',
  googleMapsUrl: 'https://goo.gl/maps/example',
  openingHours: defaultOpeningHours,
  features: ['outdoor_seating', 'live_music', 'reservations', 'valet_parking', 'wifi'],
  logo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200&h=200&fit=crop',
  coverImage:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop',
  galleryImages: [],
  averageCost: '15-25 BD',
};

export default function VenueProfileForm() {
  const [formData, setFormData] = useState<VenueProfileData>(mockVenueData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSameHours, setIsSameHours] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'basic',
    'contact',
    'location',
    'hours',
    'features',
    'media',
    'pricing',
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHoursChange = (
    day: string,
    field: 'open' | 'close' | 'closed',
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const applySameHours = () => {
    const mondayHours = formData.openingHours['Monday'];
    const newHours = Object.fromEntries(
      weekDays.map((day) => [day, { ...mondayHours }])
    );
    setFormData((prev) => ({ ...prev, openingHours: newHours }));
    setIsSameHours(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Implement actual API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('Profile saved successfully!');
    } catch {
      alert('Failed to save profile. Please try again.');
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
        <SectionHeader title="Basic Information" icon={Building2} section="basic" />

        {expandedSections.includes('basic') && (
          <div className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Venue Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Venue Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                >
                  {venueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Arabic Description <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                name="descriptionAr"
                value={formData.descriptionAr}
                onChange={handleChange}
                rows={4}
                dir="rtl"
                placeholder="الوصف بالعربية..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all resize-none"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 2: Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Contact Information" icon={Phone} section="contact" />

        {expandedSections.includes('contact') && (
          <div className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+973 XXXX XXXX"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  WhatsApp <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+973 XXXX XXXX"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 3: Social Media */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Social Media" icon={Instagram} section="social" />

        {expandedSections.includes('social') && (
          <div className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Instagram Handle
                </label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Facebook Page
                </label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  TikTok Handle
                </label>
                <input
                  type="text"
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                  placeholder="@username"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Twitter Handle
                </label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 4: Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Location" icon={MapPin} section="location" />

        {expandedSections.includes('location') && (
          <div className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Area <span className="text-red-400">*</span>
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Google Maps URL <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="url"
                  name="googleMapsUrl"
                  value={formData.googleMapsUrl}
                  onChange={handleChange}
                  placeholder="https://goo.gl/maps/..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Address <span className="text-red-400">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                placeholder="Building, Road, Block, Area"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all resize-none"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 5: Opening Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Opening Hours" icon={Clock} section="hours" />

        {expandedSections.includes('hours') && (
          <div className="px-4 pb-4 space-y-4">
            <button
              type="button"
              onClick={applySameHours}
              className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Apply same hours for all days
            </button>

            <div className="space-y-3">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white/5 rounded-xl"
                >
                  <div className="w-24 font-medium text-white">{day}</div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.openingHours[day]?.closed}
                      onChange={(e) =>
                        handleHoursChange(day, 'closed', e.target.checked)
                      }
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-yellow-400 focus:ring-yellow-400/25"
                    />
                    <span className="text-sm text-gray-400">Closed</span>
                  </label>

                  {!formData.openingHours[day]?.closed && (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={formData.openingHours[day]?.open || ''}
                        onChange={(e) =>
                          handleHoursChange(day, 'open', e.target.value)
                        }
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400/50"
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="time"
                        value={formData.openingHours[day]?.close || ''}
                        onChange={(e) =>
                          handleHoursChange(day, 'close', e.target.value)
                        }
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400/50"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 6: Features & Amenities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Features & Amenities" icon={CheckSquare} section="features" />

        {expandedSections.includes('features') && (
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {featuresList.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => handleFeatureToggle(feature.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                    formData.features.includes(feature.id)
                      ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                      : 'border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <span className="text-sm">{feature.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 7: Media */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Media" icon={ImageIcon} section="media" />

        {expandedSections.includes('media') && (
          <div className="px-4 pb-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUpload
                label="Venue Logo"
                value={formData.logo}
                onChange={(url) => setFormData((prev) => ({ ...prev, logo: url || '' }))}
                aspectRatio="1:1"
                required
              />
              <div className="md:col-span-1">
                <ImageUpload
                  label="Cover Image"
                  value={formData.coverImage}
                  onChange={(url) =>
                    setFormData((prev) => ({ ...prev, coverImage: url || '' }))
                  }
                  aspectRatio="16:9"
                  required
                />
              </div>
            </div>

            {/* Gallery Images */}
            <div className="pt-4 border-t border-white/10">
              <GalleryUploader
                entityType="venue"
                venueSlug={formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                currentImages={formData.galleryImages}
                onUpdate={(urls) => setFormData((prev) => ({ ...prev, galleryImages: urls }))}
                maxImages={20}
                label="Gallery Photos (up to 20 images)"
              />
              <p className="text-xs text-gray-500 mt-2">
                Showcase your venue with high-quality photos. The first image will be the main gallery preview.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Section 8: Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        <SectionHeader title="Pricing" icon={DollarSign} section="pricing" />

        {expandedSections.includes('pricing') && (
          <div className="px-4 pb-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Average Cost per Person <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                name="averageCost"
                value={formData.averageCost}
                onChange={handleChange}
                placeholder="e.g., 15-25 BD"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter the typical cost range for a meal or visit
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="sticky bottom-20 lg:bottom-4 bg-[#0A0A0F]/95 backdrop-blur-xl py-4 -mx-4 px-4 lg:-mx-6 lg:px-6 border-t border-white/10"
      >
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all disabled:opacity-50 float-right"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'Save Changes'
          )}
        </button>
      </motion.div>
    </form>
  );
}
