'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Phone, Mail, Globe, Instagram, Upload, CheckCircle, Loader2, ArrowLeft, Lock, Eye, EyeOff, X, ImageIcon, Map } from 'lucide-react';
import Link from 'next/link';
import AIWriterButton from '@/components/ai/AIWriterButton';

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
  'Mall Outlet',
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

interface GalleryImage {
  id: string;
  file: File;
  preview: string;
  url: string | null;
  uploading: boolean;
  error: string | null;
}

interface FormData {
  venueName: string;
  crNumber: string;
  category: string;
  area: string;
  address: string;
  googleMapsUrl: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  website: string;
  instagram: string;
  youtubeUrl: string;
  description: string;
  logo: File | null;
  coverImage: File | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  galleryImages: GalleryImage[];
}

export default function RegisterVenuePage() {
  const [formData, setFormData] = useState<FormData>({
    venueName: '',
    crNumber: '',
    category: '',
    area: '',
    address: '',
    googleMapsUrl: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    instagram: '',
    youtubeUrl: '',
    description: '',
    logo: null,
    coverImage: null,
    logoUrl: null,
    coverImageUrl: null,
    galleryImages: []
  });

  // Unique registration ID for this session
  const registrationIdRef = useRef(`${Date.now()}`);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

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

  // Upload gallery image to S3 via registration upload endpoint
  const uploadGalleryImage = async (file: File, imageId: string): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('imageType', 'gallery');
      formData.append('registrationId', registrationIdRef.current);

      const response = await fetch('/api/upload/registration', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const data = await response.json();
      return data.url;
    } catch (err) {
      console.error('Gallery upload error:', err);
      throw err;
    }
  };

  // Handle gallery image selection
  const handleGallerySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 10 images total
    const remainingSlots = 10 - formData.galleryImages.length;
    const filesToAdd = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      setError(`Maximum 10 gallery images allowed. Only adding first ${remainingSlots} images.`);
    }

    // Create preview entries for each file
    const newImages: GalleryImage[] = filesToAdd.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      url: null,
      uploading: true,
      error: null
    }));

    // Add to state immediately with loading state
    setFormData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...newImages]
    }));

    // Upload each image
    for (const image of newImages) {
      try {
        // Validate file size (4MB limit)
        if (image.file.size > 4 * 1024 * 1024) {
          setFormData(prev => ({
            ...prev,
            galleryImages: prev.galleryImages.map(img =>
              img.id === image.id
                ? { ...img, uploading: false, error: 'File too large (max 4MB)' }
                : img
            )
          }));
          continue;
        }

        const url = await uploadGalleryImage(image.file, image.id);

        setFormData(prev => ({
          ...prev,
          galleryImages: prev.galleryImages.map(img =>
            img.id === image.id
              ? { ...img, url, uploading: false }
              : img
          )
        }));
      } catch (err) {
        setFormData(prev => ({
          ...prev,
          galleryImages: prev.galleryImages.map(img =>
            img.id === image.id
              ? { ...img, uploading: false, error: err instanceof Error ? err.message : 'Upload failed' }
              : img
          )
        }));
      }
    }

    // Reset input
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  // Remove a gallery image
  const removeGalleryImage = (imageId: string) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter(img => img.id !== imageId)
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
    const galleryUploading = formData.galleryImages.some(img => img.uploading);
    if (logoUploading || coverUploading || galleryUploading) {
      setError('Please wait for images to finish uploading');
      setIsSubmitting(false);
      return;
    }

    try {
      // Collect successfully uploaded gallery URLs
      const galleryUrls = formData.galleryImages
        .filter(img => img.url && !img.error)
        .map(img => img.url);

      // Send JSON with S3 URLs instead of FormData with files
      const submitData = {
        venueName: formData.venueName,
        crNumber: formData.crNumber.trim(),
        category: formData.category,
        area: formData.area,
        address: formData.address,
        googleMapsUrl: formData.googleMapsUrl || null,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        website: formData.website ? `https://${formData.website}` : null,
        instagram: formData.instagram || null,
        youtubeUrl: formData.youtubeUrl || null,
        description: formData.description || null,
        logoUrl: formData.logoUrl,
        coverImageUrl: formData.coverImageUrl,
        galleryUrls: galleryUrls.length > 0 ? galleryUrls : null
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
          <h1 className="text-4xl font-bold text-white mb-4">Join BahrainNights</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcase your venue to thousands of residents and visitors discovering Bahrain's best experiences.
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
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Google Maps Link</label>
                <div className="relative">
                  <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="url"
                    name="googleMapsUrl"
                    value={formData.googleMapsUrl}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Paste your Google Maps link so visitors can get directions
                </p>
              </div>
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
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">YouTube Video URL</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <input
                    type="url"
                    name="youtubeUrl"
                    value={formData.youtubeUrl}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Add a promotional video for your venue (will autoplay muted on your profile)
                </p>
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-gray-400">Description</label>
              <AIWriterButton
                contentType="venue"
                venueName={formData.venueName}
                venueCategory={formData.category}
                location={formData.area}
                existingDescription={formData.description}
                onGenerated={(description) => setFormData(prev => ({ ...prev, description }))}
                disabled={!formData.venueName}
              />
            </div>
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

            {/* Gallery Images */}
            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">
                Gallery Images <span className="text-gray-500">(up to 10 images)</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                These images will be watermarked with the BahrainNights logo for protection.
              </p>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                {formData.galleryImages.map((image) => (
                  <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden border border-gray-700 group">
                    <img
                      src={image.preview}
                      alt="Gallery preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Loading overlay */}
                    {image.uploading && (
                      <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                      </div>
                    )}

                    {/* Error overlay */}
                    {image.error && (
                      <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center p-2">
                        <p className="text-xs text-red-200 text-center">{image.error}</p>
                      </div>
                    )}

                    {/* Success indicator */}
                    {image.url && !image.uploading && !image.error && (
                      <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(image.id)}
                      className="absolute top-1 left-1 bg-red-500/80 hover:bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}

                {/* Add more button */}
                {formData.galleryImages.length < 10 && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-gray-700 hover:border-orange-500/50 cursor-pointer flex flex-col items-center justify-center transition-colors">
                    <ImageIcon className="w-6 h-6 text-gray-500 mb-1" />
                    <span className="text-xs text-gray-500">Add Images</span>
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGallerySelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {formData.galleryImages.length > 0 && (
                <p className="text-xs text-gray-500">
                  {formData.galleryImages.filter(img => img.url).length} of {formData.galleryImages.length} uploaded
                </p>
              )}
            </div>
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
            { icon: '🎯', title: 'Get Discovered', desc: 'Showcase your venue to thousands of potential customers' },
            { icon: '📅', title: 'Event Promotion', desc: 'Promote your events and reach a wider audience' },
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
