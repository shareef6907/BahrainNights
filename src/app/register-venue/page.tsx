'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Phone, Mail, Globe, Instagram, Upload, CheckCircle, Loader2, ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

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

interface FormData {
  venueName: string;
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
}

export default function RegisterVenuePage() {
  const [formData, setFormData] = useState<FormData>({
    venueName: '',
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
    coverImage: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'coverImage') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === 'logo') {
          setLogoPreview(reader.result as string);
        } else {
          setCoverPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

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

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('venueName', formData.venueName);
      submitData.append('category', formData.category);
      submitData.append('area', formData.area);
      submitData.append('address', formData.address);
      submitData.append('phone', formData.phone);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      if (formData.website) submitData.append('website', `https://${formData.website}`);
      if (formData.instagram) submitData.append('instagram', formData.instagram);
      if (formData.description) submitData.append('description', formData.description);
      if (formData.logo) submitData.append('logo', formData.logo);
      if (formData.coverImage) submitData.append('coverImage', formData.coverImage);

      const response = await fetch('/api/venues/register', {
        method: 'POST',
        body: submitData,
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
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

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
                  type="tel"
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
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-orange-500/50 transition-colors overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-2" />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload logo</p>
                      <p className="text-xs text-gray-600 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo')}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cover Image</label>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-orange-500/50 transition-colors overflow-hidden">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload cover</p>
                      <p className="text-xs text-gray-600 mt-1">Recommended: 1200x600px</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'coverImage')}
                    className="hidden"
                  />
                </label>
              </div>
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
