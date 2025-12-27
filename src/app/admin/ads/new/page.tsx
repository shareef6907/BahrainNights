'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Calendar,
  DollarSign,
  User,
  Link as LinkIcon,
  Save,
  Eye,
  X
} from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

export default function NewAdPage() {
  const [formData, setFormData] = useState({
    // Advertiser Information
    advertiserName: '',
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    // Ad Creative
    adTitle: '',
    subtitle: '',
    ctaButtonText: 'Learn More',
    targetUrl: '',
    adImage: null as File | null,
    // Schedule
    startDate: '',
    endDate: '',
    slotPosition: 1,
    // Pricing & Payment
    price: 300,
    paymentStatus: 'pending',
    invoiceNumber: '',
    paymentDate: '',
    notes: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!formData.price) newErrors.price = 'Price is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // In production, this would save to database
      alert('Ad created successfully!');
    }
  };

  const slotPricing = [
    { position: 1, label: 'Slot 1 (Primary)', price: 500 },
    { position: 2, label: 'Slot 2', price: 400 },
    { position: 3, label: 'Slot 3', price: 350 },
    { position: 4, label: 'Slot 4', price: 300 },
    { position: 5, label: 'Slot 5', price: 300 },
  ];

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Create New Advertisement</h1>
              <p className="text-gray-400 mt-1">Fill in the details to create a new homepage slider ad</p>
            </div>
            <div className="flex items-center gap-3">
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
                Create Ad
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Advertiser Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                  placeholder="e.g., The Ritz-Carlton Bahrain"
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
                  placeholder="e.g., Marriott International"
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
                  placeholder="marketing@example.com"
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
                  placeholder="+973 1234 5678"
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
            transition={{ delay: 0.1 }}
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
                    placeholder="e.g., NYE Gala Night 2025"
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
                    placeholder="e.g., An Unforgettable Evening"
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
                    placeholder="e.g., Book Now"
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
                      placeholder="https://example.com/event"
                      className={`w-full pl-11 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.targetUrl ? 'border-red-500' : 'border-gray-600'}`}
                    />
                  </div>
                  {errors.targetUrl && <p className="text-red-400 text-sm mt-1">{errors.targetUrl}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ad Image <span className="text-red-400">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, adImage: null }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
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
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Calendar className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Schedule</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  {slotPricing.map(slot => (
                    <option key={slot.position} value={slot.position}>
                      {slot.label} - BD {slot.price}/mo
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
              <p className="text-gray-500 text-xs mt-2 text-center">
                Position {formData.slotPosition} of 5 in the homepage slider
              </p>
            </div>
          </motion.div>

          {/* Section 4: Pricing & Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Pricing & Payment</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (BD) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">BD</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="10"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.price ? 'border-red-500' : 'border-gray-600'}`}
                  />
                </div>
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Status
                </label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  placeholder="INV-2025-001"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Date
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any additional notes about this advertisement..."
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>

            {/* Pricing Summary */}
            <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-white">BD {formData.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-white font-medium">
                    {formData.startDate && formData.endDate
                      ? `${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`
                      : 'Select dates'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link
              href="/admin/ads"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview Ad
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Create Advertisement
            </button>
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
                {/* Slider Preview */}
                <div className="relative aspect-[16/5] bg-gray-900 rounded-xl overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
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
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {formData.adTitle || 'Ad Title'}
                    </h2>
                    {formData.subtitle && (
                      <p className="text-xl text-gray-300 mb-4">{formData.subtitle}</p>
                    )}
                    <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold">
                      {formData.ctaButtonText || 'Learn More'}
                    </button>
                  </div>
                </div>

                {/* Preview Info */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Advertiser</p>
                    <p className="text-white font-medium">{formData.advertiserName || '-'}</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Slot Position</p>
                    <p className="text-white font-medium">Slot {formData.slotPosition}</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white font-medium">
                      {formData.startDate && formData.endDate
                        ? `${formData.startDate} to ${formData.endDate}`
                        : 'Not set'}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Price</p>
                    <p className="text-white font-medium">BD {formData.price}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
