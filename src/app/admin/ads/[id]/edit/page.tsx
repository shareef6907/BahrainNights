'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Calendar,
  User,
  Link as LinkIcon,
  Save,
  Eye,
  X,
  Trash2,
  Pause,
  Play,
  Monitor
} from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

// Mock data for existing ad
const mockAdData: Record<string, {
  id: string;
  advertiserName: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  adTitle: string;
  subtitle: string;
  ctaButtonText: string;
  targetUrl: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  slotPosition: number;
  targetPage: string;
  placement: string;
  status: string;
  impressions: number;
  clicks: number;
}> = {
  'ad1': {
    id: 'ad1',
    advertiserName: 'The Ritz-Carlton Bahrain',
    companyName: 'Marriott International',
    contactEmail: 'marketing@ritzcarlton.bh',
    contactPhone: '+973 1758 0000',
    adTitle: 'NYE Gala Night 2025',
    subtitle: 'An Unforgettable Evening of Celebration',
    ctaButtonText: 'Book Now',
    targetUrl: 'https://ritzcarlton.com/bahrain/nye',
    imageUrl: '/images/ads/nye-gala.jpg',
    startDate: '2024-12-15',
    endDate: '2025-01-15',
    slotPosition: 1,
    targetPage: 'homepage',
    placement: 'slider',
    status: 'active',
    impressions: 45230,
    clicks: 1890,
  },
  'ad2': {
    id: 'ad2',
    advertiserName: 'Four Seasons Hotel',
    companyName: 'Four Seasons Hotels & Resorts',
    contactEmail: 'events@fourseasons.bh',
    contactPhone: '+973 1711 5000',
    adTitle: 'Friday Brunch Extravaganza',
    subtitle: 'The Ultimate Weekend Experience',
    ctaButtonText: 'Reserve Table',
    targetUrl: 'https://fourseasons.com/bahrain/brunch',
    imageUrl: '/images/ads/brunch.jpg',
    startDate: '2024-12-01',
    endDate: '2025-02-28',
    slotPosition: 2,
    targetPage: 'events',
    placement: 'banner',
    status: 'active',
    impressions: 38120,
    clicks: 1245,
  },
};

export default function EditAdPage() {
  const params = useParams();
  const adId = params?.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    advertiserName: '',
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    adTitle: '',
    subtitle: '',
    ctaButtonText: 'Learn More',
    targetUrl: '',
    adImage: null as File | null,
    startDate: '',
    endDate: '',
    slotPosition: 1,
    targetPage: 'homepage',
    placement: 'slider',
    status: 'active',
  });

  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [adStats, setAdStats] = useState({ impressions: 0, clicks: 0 });

  useEffect(() => {
    // Simulate loading existing ad data
    const existingAd = mockAdData[adId];
    if (existingAd) {
      setFormData({
        advertiserName: existingAd.advertiserName,
        companyName: existingAd.companyName,
        contactEmail: existingAd.contactEmail,
        contactPhone: existingAd.contactPhone,
        adTitle: existingAd.adTitle,
        subtitle: existingAd.subtitle,
        ctaButtonText: existingAd.ctaButtonText,
        targetUrl: existingAd.targetUrl,
        adImage: null,
        startDate: existingAd.startDate,
        endDate: existingAd.endDate,
        slotPosition: existingAd.slotPosition,
        targetPage: existingAd.targetPage,
        placement: existingAd.placement,
        status: existingAd.status,
      });
      setExistingImageUrl(existingAd.imageUrl);
      setAdStats({ impressions: existingAd.impressions, clicks: existingAd.clicks });
    }
    setIsLoading(false);
  }, [adId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, adImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.advertiserName) newErrors.advertiserName = 'Advertiser name is required';
    if (!formData.contactEmail) newErrors.contactEmail = 'Email is required';
    if (!formData.contactPhone) newErrors.contactPhone = 'Phone is required';
    if (!formData.adTitle) newErrors.adTitle = 'Ad title is required';
    if (!formData.targetUrl) newErrors.targetUrl = 'Target URL is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form updated:', formData);
      alert('Ad updated successfully!');
    }
  };

  const handleToggleStatus = () => {
    const newStatus = formData.status === 'active' ? 'paused' : 'active';
    setFormData(prev => ({ ...prev, status: newStatus }));
  };

  const handleDelete = () => {
    console.log('Deleting ad:', adId);
    alert('Ad deleted!');
    setShowDeleteModal(false);
  };

  const slotOptions = [
    { position: 1, label: 'Slot 1 (Primary)' },
    { position: 2, label: 'Slot 2' },
    { position: 3, label: 'Slot 3' },
    { position: 4, label: 'Slot 4' },
    { position: 5, label: 'Slot 5' },
  ];

  const pageOptions = [
    { value: 'homepage', label: 'Homepage' },
    { value: 'events', label: 'Events Page' },
    { value: 'cinema', label: 'Cinema Page' },
    { value: 'places', label: 'Places Page' },
  ];

  const placementOptions = [
    { value: 'slider', label: 'Slider' },
    { value: 'banner', label: 'Banner' },
    { value: 'sidebar', label: 'Sidebar' },
    { value: 'inline', label: 'Inline' },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/ads"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Ads Manager
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">Edit Advertisement</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {formData.status === 'active' ? 'Active' : 'Paused'}
                </span>
              </div>
              <p className="text-gray-400 mt-1">Update advertisement details and settings</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleToggleStatus}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  formData.status === 'active'
                    ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {formData.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause Ad
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Activate Ad
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">Impressions</p>
            <p className="text-2xl font-bold text-white">{adStats.impressions.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">Clicks</p>
            <p className="text-2xl font-bold text-white">{adStats.clicks.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">CTR</p>
            <p className="text-2xl font-bold text-white">
              {adStats.impressions > 0 ? ((adStats.clicks / adStats.impressions) * 100).toFixed(2) : 0}%
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">Days Remaining</p>
            <p className="text-2xl font-bold text-white">
              {formData.endDate
                ? Math.max(0, Math.ceil((new Date(formData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
                : 0}
            </p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Advertiser Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <User className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Advertiser Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Advertiser Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="advertiserName"
                  value={formData.advertiserName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.advertiserName ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.advertiserName && <p className="text-red-400 text-sm mt-1">{errors.advertiserName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.contactEmail ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.contactEmail && <p className="text-red-400 text-sm mt-1">{errors.contactEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Phone <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.contactPhone ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.contactPhone && <p className="text-red-400 text-sm mt-1">{errors.contactPhone}</p>}
              </div>
            </div>
          </motion.div>

          {/* Section 2: Ad Creative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <ImageIcon className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Ad Creative</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ad Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="adTitle"
                    value={formData.adTitle}
                    onChange={handleInputChange}
                    maxLength={50}
                    className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.adTitle ? 'border-red-500' : 'border-gray-600'}`}
                  />
                  <p className="text-gray-500 text-sm mt-1">{formData.adTitle.length}/50 characters</p>
                  {errors.adTitle && <p className="text-red-400 text-sm mt-1">{errors.adTitle}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    maxLength={80}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <p className="text-gray-500 text-sm mt-1">{formData.subtitle.length}/80 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    name="ctaButtonText"
                    value={formData.ctaButtonText}
                    onChange={handleInputChange}
                    maxLength={20}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target URL <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="url"
                      name="targetUrl"
                      value={formData.targetUrl}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.targetUrl ? 'border-red-500' : 'border-gray-600'}`}
                    />
                  </div>
                  {errors.targetUrl && <p className="text-red-400 text-sm mt-1">{errors.targetUrl}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ad Image
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-colors">
                  {imagePreview || existingImageUrl ? (
                    <div className="relative">
                      <img
                        src={imagePreview || existingImageUrl || ''}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, adImage: null }));
                          if (!imagePreview) setExistingImageUrl(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                      <label className="absolute bottom-2 right-2 px-3 py-1 bg-gray-800/80 text-white text-sm rounded-lg cursor-pointer hover:bg-gray-700/80 transition-colors">
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                      <p className="text-gray-500 text-sm">Recommended: 1920x600px (JPG, PNG)</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Calendar className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Schedule</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.startDate ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.startDate && <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.endDate ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.endDate && <p className="text-red-400 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Monitor className="w-4 h-4 inline mr-1" />
                  Target Page
                </label>
                <select
                  name="targetPage"
                  value={formData.targetPage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {pageOptions.map(page => (
                    <option key={page.value} value={page.value}>
                      {page.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Placement Type
                </label>
                <select
                  name="placement"
                  value={formData.placement}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {placementOptions.map(placement => (
                    <option key={placement.value} value={placement.value}>
                      {placement.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Slot Position
                </label>
                <select
                  name="slotPosition"
                  value={formData.slotPosition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {slotOptions.map(slot => (
                    <option key={slot.position} value={slot.position}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Slot Preview */}
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
              <p className="text-gray-400 text-sm mb-3">Slot Preview</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(slot => (
                  <div
                    key={slot}
                    className={`flex-1 h-3 rounded-full ${formData.slotPosition === slot ? 'bg-cyan-500' : 'bg-gray-700'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Ad
            </button>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/admin/ads"
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </form>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Ad Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="p-6">
                <div className="relative aspect-[16/5] bg-gray-900 rounded-xl overflow-hidden">
                  {(imagePreview || existingImageUrl) ? (
                    <img
                      src={imagePreview || existingImageUrl || ''}
                      alt="Ad Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                      <ImageIcon className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h2 className="text-3xl font-bold text-white mb-2">{formData.adTitle || 'Ad Title'}</h2>
                    {formData.subtitle && <p className="text-xl text-gray-300 mb-4">{formData.subtitle}</p>}
                    <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold">
                      {formData.ctaButtonText || 'Learn More'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl w-full max-w-md p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-500/20 rounded-full">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Delete Advertisement</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this advertisement? This action cannot be undone and all performance data will be lost.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
