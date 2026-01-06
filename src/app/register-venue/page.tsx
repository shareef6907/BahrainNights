'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Phone, Mail, Globe, Instagram, Upload, CheckCircle, Loader2, ArrowLeft, Lock, Eye, EyeOff, Link as LinkIcon, ExternalLink, Images, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { compressImage } from '@/lib/image-compression';

const VENUE_CATEGORIES = [
  'Restaurant',
  'Cafe',
  'Lounge',
  'Bar',
  'Nightclub',
  'Beach Club',
  'Hotel',
  'Spa & Wellness',
  'Fitness Center',
  'Entertainment Venue',
  'Shopping Mall',
  'Cultural Center',
  'Other'
];

const BAHRAIN_AREAS = [
  'Manama',
  'Seef',
  'Juffair',
  'Adliya',
  'Amwaj Islands',
  'Riffa',
  'Muharraq',
  'Budaiya',
  'Saar',
  'Hamala',
  'Bahrain Bay',
  'Diplomatic Area',
  'Hoora',
  'Gudaibiya',
  'Other'
];

const MAX_GALLERY_IMAGES = 20;

interface FormData {
  venueName: string;
  crNumber: string;
  category: string;
  area: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  website: string;
  instagram: string;
  description: string;
  logo: File | null;
  coverImage: File | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  googleMapsUrl: string;
  gallery: string[];
}

interface GalleryUploadProgress {
  fileName: string;
  previewUrl: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
}

export default function RegisterVenuePage() {
  const [formData, setFormData] = useState<FormData>({
    venueName: '',
    crNumber: '',
    category: '',
    area: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    instagram: '',
    description: '',
    logo: null,
    coverImage: null,
    logoUrl: null,
    coverImageUrl: null,
    googleMapsUrl: '',
    gallery: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState<GalleryUploadProgress[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Upload file directly to S3 using presigned URL
  const uploadToS3 = async (file: File, imageType: 'logo' | 'cover'): Promise<string | null> => {
    try {
      // Get presigned URL from our API
      const presignResponse = await fetch('/api/upload/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          entityType: 'venue-registration',
          imageType: imageType
        })
      });

      if (!presignResponse.ok) {
        const errorData = await presignResponse.json();
        throw new Error(errorData.error || 'Failed to get upload URL');
      }

      const { uploadUrl, processedUrl } = await presignResponse.json();

      // Upload directly to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image to storage');
      }

      return processedUrl;
    } catch (err) {
      console.error('S3 upload error:', err);
      throw err;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'coverImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB.');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      if (field === 'logo') {
        setLogoPreview(reader.result as string);
      } else {
        setCoverPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Start upload to S3
    const setUploading = field === 'logo' ? setLogoUploading : setCoverUploading;
    const urlField = field === 'logo' ? 'logoUrl' : 'coverImageUrl';
    const imageType = field === 'logo' ? 'logo' : 'cover';

    setUploading(true);
    setError('');

    try {
      const s3Url = await uploadToS3(file, imageType);
      setFormData(prev => ({ ...prev, [field]: file, [urlField]: s3Url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      // Reset preview on error
      if (field === 'logo') {
        setLogoPreview(null);
      } else {
        setCoverPreview(null);
      }
    } finally {
      setUploading(false);
    }
  };

  // Google Maps URL validation
  const isValidGoogleMapsUrl = (url: string): boolean => {
    if (!url) return false;
    return (
      url.includes('google.com/maps') ||
      url.includes('goo.gl/maps') ||
      url.includes('maps.app.goo.gl') ||
      url.includes('maps.google.com')
    );
  };

  // Gallery image upload handler
  const handleGallerySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = MAX_GALLERY_IMAGES - formData.gallery.length;
    if (remainingSlots === 0) {
      setError(`Maximum ${MAX_GALLERY_IMAGES} gallery images allowed`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    setGalleryUploading(true);
    setError('');

    // Create preview URLs and initial progress state
    const initialProgress: GalleryUploadProgress[] = filesToUpload.map(file => ({
      fileName: file.name,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      status: 'uploading' as const,
    }));
    setGalleryUploadProgress(initialProgress);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          setGalleryUploadProgress(prev => prev.map((p, idx) =>
            idx === i ? { ...p, status: 'error', progress: 100 } : p
          ));
          continue;
        }

        // Validate file size (max 10MB before compression)
        if (file.size > 10 * 1024 * 1024) {
          setError(`${file.name} is too large (max 10MB)`);
          setGalleryUploadProgress(prev => prev.map((p, idx) =>
            idx === i ? { ...p, status: 'error', progress: 100 } : p
          ));
          continue;
        }

        // Update progress to show compressing
        setGalleryUploadProgress(prev => prev.map((p, idx) =>
          idx === i ? { ...p, progress: 20 } : p
        ));

        // Compress image
        let compressedFile: File;
        try {
          compressedFile = await compressImage(file);
        } catch (compressError) {
          console.error(`Compression failed for ${file.name}:`, compressError);
          compressedFile = file;
        }

        // Update progress to show uploading
        setGalleryUploadProgress(prev => prev.map((p, idx) =>
          idx === i ? { ...p, progress: 50 } : p
        ));

        try {
          const s3Url = await uploadToS3(compressedFile, 'cover'); // Use 'cover' type for gallery images
          if (s3Url) {
            uploadedUrls.push(s3Url);
            setGalleryUploadProgress(prev => prev.map((p, idx) =>
              idx === i ? { ...p, status: 'success', progress: 100 } : p
            ));
          }
        } catch (uploadErr) {
          setGalleryUploadProgress(prev => prev.map((p, idx) =>
            idx === i ? { ...p, status: 'error', progress: 100 } : p
          ));
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...uploadedUrls] }));
      }
    } catch (err) {
      console.error('Gallery upload error:', err);
      setError('Failed to upload gallery images');
    } finally {
      setGalleryUploading(false);
      setTimeout(() => {
        setGalleryUploadProgress([]);
      }, 2000);
      if (galleryInputRef.current) {
        galleryInputRef.current.value = '';
      }
    }
  };

  // Remove gallery image
  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate CR number
    if (!formData.crNumber.trim()) {
      setError('CR Number is required');
      setIsSubmitting(false);
      return;
    }

    // Validate passwords
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Check if images are still uploading
    if (logoUploading || coverUploading || galleryUploading) {
      setError('Please wait for images to finish uploading');
      setIsSubmitting(false);
      return;
    }

    // Validate Google Maps URL if provided
    if (formData.googleMapsUrl && !isValidGoogleMapsUrl(formData.googleMapsUrl)) {
      setError('Please enter a valid Google Maps link');
      setIsSubmitting(false);
      return;
    }

    try {
      // Send JSON with S3 URLs instead of FormData with files
      const submitData = {
        venueName: formData.venueName,
        crNumber: formData.crNumber.trim(),
        category: formData.category,
        area: formData.area,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        website: formData.website ? `https://${formData.website}` : null,
        instagram: formData.instagram || null,
        description: formData.description || null,
        logoUrl: formData.logoUrl,
        coverImageUrl: formData.coverImageUrl,
        googleMapsUrl: formData.googleMapsUrl || null,
        gallery: formData.gallery.length > 0 ? formData.gallery : null
      };

      const response = await fetch('/api/venues/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center border border-gray-700"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-4">Registration Submitted!</h2>
          <p className="text-gray-400 mb-6">
            Thank you for registering your venue with BahrainNights. Our team will review your submission and you&apos;ll receive an email at <span className="text-white font-medium">{formData.email}</span> once approved. You can then log in using your email and password.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌙</span>
            <span className="text-xl font-bold text-white">BahrainNights</span>
          </Link>
          <Link
            href="/register"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Already registered? Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Register Your Venue</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join BahrainNights and get free exposure to thousands of locals and visitors looking for the best places in Bahrain.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700"
        >
          {/* Basic Info */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-500" />
              Basic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Venue Name *</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="Enter venue name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">CR Number *</label>
                <input
                  type="text"
                  name="crNumber"
                  value={formData.crNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="Commercial Registration Number"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                >
                  <option value="">Select category</option>
                  {VENUE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Location
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Area *</label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                >
                  <option value="">Select area</option>
                  {BAHRAIN_AREAS.map(area => (
                    <option key={area} value={area.toLowerCase().replace(/\s+/g, '-')}>{area}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="Building, street, block"
                />
              </div>
            </div>

            {/* Google Maps Link */}
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">
                <LinkIcon className="w-4 h-4 inline mr-2" />
                Google Maps Link
              </label>
              <input
                type="url"
                name="googleMapsUrl"
                value={formData.googleMapsUrl}
                onChange={handleInputChange}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                placeholder="https://maps.google.com/..."
              />
              <p className="text-gray-500 text-xs mt-2">
                Share your Google Maps location link so customers can find you easily
              </p>

              {/* Google Maps Link Preview */}
              {formData.googleMapsUrl && isValidGoogleMapsUrl(formData.googleMapsUrl) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-green-500/20 rounded-lg">
                        <MapPin className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-green-400 text-sm font-medium">Location link added</span>
                    </div>
                    <a
                      href={formData.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-lg text-white text-xs hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Test
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-orange-500" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                <input
                  type="text"
                  inputMode="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="+973 XXXX XXXX"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="venue@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Website</label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 bg-gray-700 border border-r-0 border-gray-700 rounded-l-lg text-gray-400 text-sm">
                    <Globe className="w-4 h-4 mr-2" />
                    https://
                  </span>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="flex-1 bg-gray-900/50 border border-gray-700 rounded-r-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="www.yourvenue.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="@yourvenue"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Credentials */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-orange-500" />
              Create Your Account
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              You&apos;ll use these credentials to log in and manage your venue after approval.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none"
              placeholder="Tell us about your venue, what makes it special, and what visitors can expect..."
            />
          </div>

          {/* Images */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-orange-500" />
              Images
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Logo</label>
                <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg transition-colors overflow-hidden relative ${logoUploading ? 'border-orange-500 cursor-wait' : 'border-gray-700 cursor-pointer hover:border-orange-500/50'}`}>
                  {logoUploading && (
                    <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-2" />
                        <span className="text-sm text-gray-300">Uploading...</span>
                      </div>
                    </div>
                  )}
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-2" />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload logo</p>
                      <p className="text-xs text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                  {formData.logoUrl && !logoUploading && (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo')}
                    className="hidden"
                    disabled={logoUploading}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cover Image</label>
                <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg transition-colors overflow-hidden relative ${coverUploading ? 'border-orange-500 cursor-wait' : 'border-gray-700 cursor-pointer hover:border-orange-500/50'}`}>
                  {coverUploading && (
                    <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-2" />
                        <span className="text-sm text-gray-300">Uploading...</span>
                      </div>
                    </div>
                  )}
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload cover</p>
                      <p className="text-xs text-gray-600 mt-1">Recommended: 1200x600px</p>
                    </div>
                  )}
                  {formData.coverImageUrl && !coverUploading && (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'coverImage')}
                    className="hidden"
                    disabled={coverUploading}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Images className="w-5 h-5 text-orange-500" />
                Gallery Images
              </h3>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/50 rounded-lg">
                <Images className="w-4 h-4 text-orange-400" />
                <span className="text-white text-sm font-medium">{formData.gallery.length}/{MAX_GALLERY_IMAGES}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Upload up to {MAX_GALLERY_IMAGES} images to showcase your venue. These will appear on your venue page.
            </p>

            {/* Upload Area */}
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGallerySelect}
              className="hidden"
              disabled={galleryUploading || formData.gallery.length >= MAX_GALLERY_IMAGES}
            />
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              disabled={galleryUploading || formData.gallery.length >= MAX_GALLERY_IMAGES}
              className={`w-full border-2 border-dashed rounded-lg p-6 transition-all mb-4 ${
                formData.gallery.length >= MAX_GALLERY_IMAGES
                  ? 'border-gray-700 bg-gray-900/30 cursor-not-allowed'
                  : 'border-gray-700 hover:border-orange-500/50 cursor-pointer'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                {galleryUploading ? (
                  <>
                    <Loader2 className="w-10 h-10 text-orange-400 animate-spin" />
                    <p className="text-white font-medium">Uploading...</p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium">
                        {formData.gallery.length >= MAX_GALLERY_IMAGES
                          ? 'Maximum images reached'
                          : 'Click to upload gallery images'}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        PNG, JPG up to 10MB each (auto-compressed)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </button>

            {/* Upload Progress */}
            <AnimatePresence>
              {galleryUploadProgress.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4"
                >
                  {galleryUploadProgress.map((item, index) => (
                    <motion.div
                      key={item.fileName + index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-900/50"
                    >
                      <img
                        src={item.previewUrl}
                        alt={`Uploading ${item.fileName}`}
                        className={`w-full h-full object-cover transition-opacity ${
                          item.status === 'uploading' ? 'opacity-40' : 'opacity-100'
                        }`}
                      />
                      {item.status === 'uploading' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                          <Loader2 className="w-6 h-6 text-orange-400 animate-spin mb-1" />
                          <p className="text-white text-xs">{item.progress}%</p>
                        </div>
                      )}
                      {item.status === 'success' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                      )}
                      {item.status === 'error' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                          <AlertCircle className="w-8 h-8 text-red-400" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gallery Grid */}
            {formData.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
              >
                {formData.gallery.map((url, index) => (
                  <motion.div
                    key={url}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group aspect-square rounded-lg overflow-hidden bg-gray-900/50"
                  >
                    <img
                      src={url}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(index)}
                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/70 rounded text-xs text-white">
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-500">
              By registering, you agree to our{' '}
              <Link href="/terms" className="text-orange-500 hover:underline">Terms of Service</Link>
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Building2 className="w-5 h-5" />
                  <span>Register Venue</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mt-4">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}
        </motion.form>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {[
            { icon: '🎯', title: 'Free Exposure', desc: 'Get your venue in front of thousands of potential customers' },
            { icon: '📅', title: 'Event Promotion', desc: 'List your events for free and reach a wider audience' },
          ].map((benefit, i) => (
            <div key={i} className="bg-gray-800/30 rounded-xl p-6 text-center border border-gray-700/50">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
