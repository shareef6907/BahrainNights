'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Globe,
  Send,
  CheckCircle,
  ArrowLeft,
  Loader2,
  User,
  MessageSquare,
  FileText,
  Shield,
  Film
} from 'lucide-react';
import { isValidInstagramReelUrl } from '@/lib/utils/instagram';

interface FormData {
  venueName: string;
  category: string;
  description: string;
  address: string;
  area: string;
  phone: string;
  instagram: string;
  instagramReelUrl: string;
  website: string;
  googleMapsUrl: string;
  submitterName: string;
  submitterEmail: string;
  submitterPhone: string;
  isOwner: boolean;
  termsAccepted: boolean;
  guidelinesAccepted: boolean;
}

const CATEGORIES = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'lounge', label: 'Lounge / Bar' },
  { value: 'nightclub', label: 'Nightclub' },
  { value: 'beach-club', label: 'Beach Club' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'spa', label: 'Spa & Wellness' },
  { value: 'other', label: 'Other' },
];

const AREAS = [
  'Manama',
  'Seef',
  'Juffair',
  'Adliya',
  'Amwaj',
  'Riffa',
  'Muharraq',
  'Zallaq',
  'Saar',
  'Budaiya',
  'Hoora',
  'Sanabis',
  'Other',
];

export default function SubmitVenuePage() {
  const [formData, setFormData] = useState<FormData>({
    venueName: '',
    category: '',
    description: '',
    address: '',
    area: '',
    phone: '',
    instagram: '',
    instagramReelUrl: '',
    website: '',
    googleMapsUrl: '',
    submitterName: '',
    submitterEmail: '',
    submitterPhone: '',
    isOwner: false,
    termsAccepted: false,
    guidelinesAccepted: false,
  });
  const [reelUrlError, setReelUrlError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setReelUrlError(null);

    // Validate Instagram Reel URL if provided
    if (formData.instagramReelUrl && !isValidInstagramReelUrl(formData.instagramReelUrl)) {
      setReelUrlError('Please enter a valid Instagram Reel URL (e.g., https://www.instagram.com/reel/ABC123/)');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/venue-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          venue_name: formData.venueName,
          category: formData.category,
          description: formData.description,
          address: formData.address,
          area: formData.area,
          phone: formData.phone,
          instagram: formData.instagram,
          instagram_reel_url: formData.instagramReelUrl || null,
          website: formData.website,
          google_maps_url: formData.googleMapsUrl,
          submitter_name: formData.submitterName,
          submitter_email: formData.submitterEmail,
          submitter_phone: formData.submitterPhone,
          is_owner: formData.isOwner,
          terms_accepted: formData.termsAccepted,
          content_guidelines_accepted: formData.guidelinesAccepted,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit venue');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-slate-800/50 rounded-3xl p-8 border border-white/10">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-gray-400 mb-6">
              Your venue suggestion has been submitted successfully. Our team will review it and
              add it to BahrainNights if approved.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              We'll notify you at {formData.submitterEmail} once your submission is reviewed.
            </p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    venueName: '',
                    category: '',
                    description: '',
                    address: '',
                    area: '',
                    phone: '',
                    instagram: '',
                    instagramReelUrl: '',
                    website: '',
                    googleMapsUrl: '',
                    submitterName: '',
                    submitterEmail: '',
                    submitterPhone: '',
                    isOwner: false,
                    termsAccepted: false,
                    guidelinesAccepted: false,
                  });
                  setReelUrlError(null);
                }}
                className="block w-full py-3 px-6 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                Submit Another Venue
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-orange-500/10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-5xl mb-4">📍</div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              Suggest a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                Venue
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Know a great place in Bahrain that's not on BahrainNights? Help us grow our directory
              by suggesting it. It's free and takes just a minute!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Venue Information */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-yellow-400" />
              Venue Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Venue Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="e.g., The Coffee House"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none"
                  placeholder="Tell us about this venue..."
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              Location
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Area <span className="text-red-400">*</span>
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                >
                  <option value="">Select an area</option>
                  {AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="e.g., Building 123, Road 456, Block 789"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Google Maps Link</label>
                <input
                  type="url"
                  name="googleMapsUrl"
                  value={formData.googleMapsUrl}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-yellow-400" />
              Venue Contact (Optional)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="+973 1234 5678"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={(e) => {
                      const value = e.target.value.replace(/^@/, '');
                      setFormData(prev => ({ ...prev, instagram: value }));
                    }}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="username"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Username only, without the @ symbol
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">
                  Instagram Reel
                  <span className="ml-2 text-xs text-gray-500">(Showcase your venue with a reel)</span>
                </label>
                <div className="relative">
                  <Film className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="url"
                    name="instagramReelUrl"
                    value={formData.instagramReelUrl}
                    onChange={(e) => {
                      handleInputChange(e);
                      setReelUrlError(null);
                    }}
                    className={`w-full bg-gray-900/50 border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:ring-1 outline-none transition-all ${
                      reelUrlError
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-700 focus:border-orange-500 focus:ring-orange-500'
                    }`}
                    placeholder="https://www.instagram.com/reel/ABC123/"
                  />
                </div>
                {reelUrlError && (
                  <p className="mt-1 text-sm text-red-400">{reelUrlError}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Paste your Instagram Reel URL to showcase your venue. You can add more reels after your venue is approved.
                </p>
              </div>
            </div>
          </div>

          {/* Your Information */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-yellow-400" />
              Your Information
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="submitterName"
                    value={formData.submitterName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Your Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="submitterEmail"
                    value={formData.submitterEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Phone (Optional)</label>
                <input
                  type="tel"
                  name="submitterPhone"
                  value={formData.submitterPhone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="+973 1234 5678"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isOwner"
                  checked={formData.isOwner}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-900/50 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                />
                <span className="text-gray-300">I am the owner/manager of this venue</span>
              </label>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-yellow-400" />
              Terms & Conditions
            </h2>

            {/* Scrollable Terms Box */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto text-sm text-gray-400">
              <h3 className="text-white font-semibold mb-2">Content Responsibility & Liability Disclaimer</h3>
              <p className="mb-3">
                By submitting venue information to BahrainNights.com, you acknowledge and agree to the following:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-3">
                <li>
                  <strong className="text-gray-300">Content Ownership:</strong> You confirm that you have the right to submit this information and any associated images, and that the content does not infringe upon any third-party rights.
                </li>
                <li>
                  <strong className="text-gray-300">Accuracy:</strong> You are solely responsible for ensuring all submitted information is accurate, current, and truthful. BahrainNights.com does not verify the accuracy of user-submitted content.
                </li>
                <li>
                  <strong className="text-gray-300">No Liability:</strong> BahrainNights.com and its operators accept no responsibility or liability for any content submitted by users. This includes but is not limited to inaccurate information, misleading descriptions, or inappropriate content.
                </li>
                <li>
                  <strong className="text-gray-300">Indemnification:</strong> You agree to indemnify and hold harmless BahrainNights.com, its operators, employees, and affiliates from any claims, damages, or expenses arising from your submitted content.
                </li>
                <li>
                  <strong className="text-gray-300">Content Moderation:</strong> BahrainNights.com reserves the right to review, edit, or remove any submitted content at its sole discretion without notice.
                </li>
                <li>
                  <strong className="text-gray-300">Legal Compliance:</strong> You agree that your submission complies with all applicable laws and regulations in the Kingdom of Bahrain.
                </li>
              </ul>
              <p className="text-xs text-gray-500">
                For full terms, please visit our <Link href="/terms" className="text-orange-400 hover:underline">Terms of Service</Link> page.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  required
                  className="w-5 h-5 mt-0.5 rounded border-gray-600 bg-gray-900/50 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                />
                <span className="text-gray-300 text-sm">
                  I have read and agree to the{' '}
                  <Link href="/terms" className="text-orange-400 hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                  and the liability disclaimer above. <span className="text-red-400">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="guidelinesAccepted"
                  checked={formData.guidelinesAccepted}
                  onChange={handleInputChange}
                  required
                  className="w-5 h-5 mt-0.5 rounded border-gray-600 bg-gray-900/50 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                />
                <span className="text-gray-300 text-sm">
                  I have read and agree to the{' '}
                  <Link href="/content-guidelines" className="text-orange-400 hover:underline">
                    Content Guidelines
                  </Link>{' '}
                  and confirm that my submission meets the quality standards. <span className="text-red-400">*</span>
                </span>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Venue Suggestion
              </>
            )}
          </button>

          {/* Note */}
          <p className="text-center text-sm text-gray-500">
            Your submission will be reviewed by our team before being published. If you're
            the venue owner, consider{' '}
            <Link href="/register-venue" className="text-orange-400 hover:underline">
              registering your venue
            </Link>{' '}
            for full access to manage your listing.
          </p>
        </motion.form>
      </div>
    </div>
  );
}
