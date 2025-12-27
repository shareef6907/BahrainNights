'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  Crown,
  Medal,
  Building2,
  Globe,
  Calendar,
  DollarSign,
  Save,
  X,
  Loader2,
} from 'lucide-react';
import type { Sponsor } from '@/types/database';

export default function EditSponsorPage() {
  const router = useRouter();
  const params = useParams();
  const sponsorId = params?.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    tier: 'golden' as 'golden' | 'silver',
    website_url: '',
    venue_id: '',
    start_date: '',
    end_date: '',
    price_bd: 450,
    payment_status: 'pending' as 'pending' | 'paid' | 'overdue',
    status: 'pending' as 'pending' | 'active' | 'expired',
    logo_url: '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sponsorId) {
      fetchSponsor();
    }
  }, [sponsorId]);

  async function fetchSponsor() {
    if (!sponsorId) return;
    try {
      const response = await fetch(`/api/admin/sponsors/${sponsorId}`);
      if (response.ok) {
        const data = await response.json();
        const sponsor = data.sponsor as Sponsor;
        setFormData({
          name: sponsor.name || '',
          tier: (sponsor.tier || 'golden') as 'golden' | 'silver',
          website_url: sponsor.website_url || '',
          venue_id: sponsor.venue_id || '',
          start_date: sponsor.start_date ? sponsor.start_date.split('T')[0] : '',
          end_date: sponsor.end_date ? sponsor.end_date.split('T')[0] : '',
          price_bd: sponsor.price_bd || (sponsor.tier === 'golden' ? 450 : 300),
          payment_status: (sponsor.payment_status || 'pending') as 'pending' | 'paid' | 'overdue',
          status: (sponsor.status || 'pending') as 'pending' | 'active' | 'expired',
          logo_url: sponsor.logo_url || '',
        });
        if (sponsor.logo_url) {
          setLogoPreview(sponsor.logo_url);
        }
      } else {
        setError('Sponsor not found');
      }
    } catch {
      setError('Failed to load sponsor');
    } finally {
      setLoading(false);
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTierChange = (tier: 'golden' | 'silver') => {
    setFormData({
      ...formData,
      tier,
      price_bd: tier === 'golden' ? 450 : 300,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let logoUrl = formData.logo_url;

      // Upload new logo if provided
      if (logoFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', logoFile);
        uploadFormData.append('folder', 'sponsors');

        const uploadResponse = await fetch('/api/upload/image', {
          method: 'POST',
          body: uploadFormData,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          logoUrl = uploadData.url;
        } else {
          throw new Error('Failed to upload logo');
        }
      }

      // Update sponsor
      const response = await fetch(`/api/admin/sponsors/${sponsorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          logo_url: logoUrl,
        }),
      });

      if (response.ok) {
        router.push('/admin/sponsors');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update sponsor');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link
          href="/admin/sponsors"
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Sponsor</h1>
          <p className="text-gray-400 mt-1">{formData.name}</p>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sponsor Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="Company or venue name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Venue ID (Optional)
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={formData.venue_id}
                    onChange={(e) => setFormData({ ...formData, venue_id: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                    placeholder="Link to an existing venue (UUID)"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  If provided, clicking the logo will go to the venue page
                </p>
              </div>
            </div>
          </div>

          {/* Tier Selection */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Sponsorship Tier</h2>

            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex flex-col items-center gap-3 p-6 rounded-xl cursor-pointer transition-all ${
                  formData.tier === 'golden'
                    ? 'bg-amber-500/20 border-2 border-amber-500'
                    : 'bg-white/5 border border-white/10 hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="tier"
                  value="golden"
                  checked={formData.tier === 'golden'}
                  onChange={() => handleTierChange('golden')}
                  className="sr-only"
                />
                <Crown
                  className={`w-10 h-10 ${
                    formData.tier === 'golden' ? 'text-amber-400' : 'text-gray-500'
                  }`}
                />
                <div className="text-center">
                  <div className="font-semibold text-white">Golden</div>
                  <div className="text-sm text-gray-400">BD 450/month</div>
                  <div className="text-xs text-gray-500 mt-1">180×100px • First row</div>
                </div>
              </label>

              <label
                className={`flex flex-col items-center gap-3 p-6 rounded-xl cursor-pointer transition-all ${
                  formData.tier === 'silver'
                    ? 'bg-gray-500/20 border-2 border-gray-400'
                    : 'bg-white/5 border border-white/10 hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="tier"
                  value="silver"
                  checked={formData.tier === 'silver'}
                  onChange={() => handleTierChange('silver')}
                  className="sr-only"
                />
                <Medal
                  className={`w-10 h-10 ${
                    formData.tier === 'silver' ? 'text-gray-300' : 'text-gray-500'
                  }`}
                />
                <div className="text-center">
                  <div className="font-semibold text-white">Silver</div>
                  <div className="text-sm text-gray-400">BD 300/month</div>
                  <div className="text-xs text-gray-500 mt-1">140×80px • Second row</div>
                </div>
              </label>
            </div>
          </div>

          {/* Duration & Pricing */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Duration & Pricing</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Price (BD)
                </label>
                <input
                  type="number"
                  value={formData.price_bd}
                  onChange={(e) => setFormData({ ...formData, price_bd: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Status
                </label>
                <select
                  value={formData.payment_status}
                  onChange={(e) => setFormData({ ...formData, payment_status: e.target.value as 'pending' | 'paid' | 'overdue' })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Status</h2>

            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'active' | 'expired' })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            >
              <option value="pending">Pending (Not visible)</option>
              <option value="active">Active (Visible on site)</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Sidebar - Logo Upload */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Logo</h2>

            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative aspect-[16/9] rounded-xl border-2 border-dashed cursor-pointer transition-colors overflow-hidden ${
                logoPreview
                  ? 'border-amber-500/50'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              {logoPreview ? (
                <>
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    fill
                    className="object-contain p-4"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLogoFile(null);
                      setLogoPreview('');
                      setFormData({ ...formData, logo_url: '' });
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-500 mb-2" />
                  <p className="text-sm text-gray-400">Click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />

            <p className="text-xs text-gray-500 mt-3">
              Recommended: Transparent PNG, at least 400×300px
            </p>
          </div>

          {/* Preview */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Preview</h2>

            <div className="bg-gray-900 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-2 text-center">
                {formData.tier === 'golden' ? 'Golden Tier (180×100)' : 'Silver Tier (140×80)'}
              </p>
              <div className="flex justify-center">
                <div
                  className={`rounded-xl border-2 overflow-hidden ${
                    formData.tier === 'golden'
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : 'border-gray-400/30 bg-gray-400/5'
                  }`}
                  style={{
                    width: formData.tier === 'golden' ? 180 : 140,
                    height: formData.tier === 'golden' ? 100 : 80,
                  }}
                >
                  {logoPreview ? (
                    <div className="relative w-full h-full p-3">
                      <Image
                        src={logoPreview}
                        alt="Preview"
                        fill
                        className="object-contain grayscale hover:grayscale-0 transition-all"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/70 text-xs text-center px-2">
                        {formData.name || 'Sponsor Name'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
