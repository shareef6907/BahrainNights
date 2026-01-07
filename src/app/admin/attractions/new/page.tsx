'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Save,
  X,
  Loader2,
  MapPin,
  Clock,
  DollarSign,
  Tag,
  Users,
  Star
} from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import AIWriterButton from '@/components/ai/AIWriterButton';
import { compressImage } from '@/lib/image-compression';

const PRICE_RANGES = ['Free', 'Budget (Under 5 BD)', 'Mid-Range (5-20 BD)', 'Premium (20+ BD)'];
const CATEGORIES = ['Family & Kids', 'Cultural', 'Nature', 'Adventure', 'Historical', 'Entertainment', 'Shopping', 'Sports'];
const AREAS = ['Manama', 'Muharraq', 'Riffa', 'Seef', 'Amwaj', 'Juffair', 'Bahrain Bay', 'Budaiya', 'Saar', 'A\'ali', 'Isa Town', 'Hamad Town', 'Other'];
const SUITABLE_FOR = ['Kids', 'Families', 'Teens', 'Adults', 'Couples', 'Groups', 'Everyone'];

export default function NewAttractionPage() {
  const router = useRouter();
  // Generate a unique ID for this new attraction (used for S3 path)
  const [attractionId] = useState(() => crypto.randomUUID());
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    category: 'Family & Kids',
    area: '',
    priceFrom: '',
    priceRange: '',
    duration: '',
    suitableFor: [] as string[],
    tags: '',
    tripadvisorRating: '',
    tripadvisorUrl: '',
    isFeatured: false,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSuitableForChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      suitableFor: prev.suitableFor.includes(option)
        ? prev.suitableFor.filter(s => s !== option)
        : [...prev.suitableFor, option]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!imageFile && !imagePreview) newErrors.image = 'Cover image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setUploadProgress('');

    try {
      let imageUrl = '';

      // Step 1: Upload image to S3
      if (imageFile) {
        setUploadProgress('Compressing image...');

        let fileToUpload: File = imageFile;
        try {
          fileToUpload = await compressImage(imageFile);
        } catch (compressError) {
          console.error('Compression failed:', compressError);
        }

        setUploadProgress('Uploading image...');

        const uploadFormData = new FormData();
        uploadFormData.append('file', fileToUpload);
        uploadFormData.append('entityType', 'attraction');
        uploadFormData.append('imageType', 'cover');
        uploadFormData.append('attractionId', attractionId);
        uploadFormData.append('processLocally', 'true');

        const uploadResponse = await fetch('/api/upload/image', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Failed to upload image');
        }

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url;
      }

      // Step 2: Create attraction
      setUploadProgress('Creating attraction...');

      const attractionData = {
        name: formData.name,
        description: formData.description || undefined,
        shortDescription: formData.shortDescription || undefined,
        imageUrl: imageUrl || undefined,
        area: formData.area || undefined,
        priceFrom: formData.priceFrom ? parseFloat(formData.priceFrom) : undefined,
        priceRange: formData.priceRange || undefined,
        tripadvisorRating: formData.tripadvisorRating ? parseFloat(formData.tripadvisorRating) : undefined,
        tripadvisorUrl: formData.tripadvisorUrl || undefined,
        duration: formData.duration || undefined,
        suitableFor: formData.suitableFor.length > 0 ? formData.suitableFor : undefined,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
        category: formData.category,
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
      };

      const response = await fetch('/api/admin/attractions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attractionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create attraction');
      }

      setUploadProgress('Attraction created successfully!');
      setTimeout(() => router.push('/admin/attractions'), 1500);
    } catch (error) {
      console.error('Error creating attraction:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to create attraction' });
      setUploadProgress('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/attractions"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Attractions
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Add New Attraction</h1>
              <p className="text-gray-400 mt-1">Create a new family-friendly attraction or activity</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Attraction
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {(errors.submit || uploadProgress) && (
            <div className={`mt-4 p-4 rounded-lg ${errors.submit ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/20 border border-green-500/30'}`}>
              <p className={errors.submit ? 'text-red-400' : 'text-green-400'}>
                {errors.submit || uploadProgress}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Wahooo! Waterpark"
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Area/Location
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="">Select Area</option>
                  {AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Brief description (max 150 chars)"
                  maxLength={150}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <p className="text-gray-500 text-sm mt-1">{formData.shortDescription.length}/150</p>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Description
                  </label>
                  <AIWriterButton
                    contentType="venue"
                    venueName={formData.name}
                    venueCategory={formData.category}
                    location={formData.area}
                    existingDescription={formData.description}
                    onGenerated={(description) => setFormData(prev => ({ ...prev, description }))}
                    disabled={!formData.name}
                  />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the attraction..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <ImageIcon className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Cover Image <span className="text-red-400">*</span></h2>
            </div>

            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-amber-500/50 transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-64 object-cover rounded-lg mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
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
                  <p className="text-gray-500 text-sm">Recommended: 1200x800px (JPG, PNG)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {errors.image && <p className="text-red-400 text-sm mt-2">{errors.image}</p>}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 2-3 hours"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Price From (BD)
                </label>
                <input
                  type="number"
                  name="priceFrom"
                  value={formData.priceFrom}
                  onChange={handleInputChange}
                  placeholder="e.g., 5"
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price Range
                </label>
                <select
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="">Select Range</option>
                  {PRICE_RANGES.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Star className="w-4 h-4 inline mr-1" />
                  TripAdvisor Rating
                </label>
                <input
                  type="number"
                  name="tripadvisorRating"
                  value={formData.tripadvisorRating}
                  onChange={handleInputChange}
                  placeholder="e.g., 4.5"
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  TripAdvisor URL
                </label>
                <input
                  type="url"
                  name="tripadvisorUrl"
                  value={formData.tripadvisorUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.tripadvisor.com/..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>
          </motion.div>

          {/* Suitable For & Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Audience & Tags</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Suitable For
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUITABLE_FOR.map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSuitableForChange(option)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        formData.suitableFor.includes(option)
                          ? 'bg-amber-500 border-amber-500 text-black font-medium'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-amber-500/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., waterpark, slides, pool, family fun"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-lg font-semibold text-white mb-6">Settings</h2>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500/50"
                />
                <span className="text-gray-300">Active (visible on website)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500/50"
                />
                <span className="text-gray-300">Featured (show at top)</span>
              </label>
            </div>
          </motion.div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link
              href="/admin/attractions"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Attraction
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
