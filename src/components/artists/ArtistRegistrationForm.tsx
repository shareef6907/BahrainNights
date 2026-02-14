'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArtistCategory } from '@/types/database';

const CATEGORIES: { value: ArtistCategory; label: string }[] = [
  { value: 'dj', label: 'DJ' },
  { value: 'vocalist', label: 'Vocalist / Singer' },
  { value: 'instrumentalist', label: 'Instrumentalist' },
  { value: 'band', label: 'Band' },
  { value: 'fire_show', label: 'Fire Show' },
  { value: 'performer', label: 'Performer / Dancer' },
  { value: 'kids_entertainment', label: 'Kids Entertainment' },
  { value: 'magician', label: 'Magician' },
];

const SUBCATEGORIES: Record<string, string[]> = {
  instrumentalist: ['Guitarist', 'Pianist', 'Violinist', 'Saxophonist', 'Drummer', 'Harpist', 'Oud Player', 'Kanun Player', 'Other'],
  vocalist: ['Pop', 'Jazz', 'Arabic', 'Classical', 'Other'],
};

export default function ArtistRegistrationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    real_name: '',
    stage_name: '',
    email: '',
    phone: '',
    instagram_handle: '',
    // Step 2 - Artist Details
    category: '' as ArtistCategory | '',
    subcategory: '',
    bio: '',
    years_experience: '',
    notable_venues: '',
    // Step 3 - Rates
    rate_per_hour: '',
    rate_per_event: '',
    rate_notes: '',
    // Step 4 - Terms
    agree_instagram: false,
    agree_exclusive: false,
    agree_promo: false,
    agree_rates_private: false,
    agree_removal: false,
    agree_accurate: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.real_name && formData.stage_name && formData.email && formData.instagram_handle;
      case 2:
        return formData.category && formData.bio;
      case 3:
        return true; // Rates are optional
      case 4:
        return formData.agree_instagram && formData.agree_exclusive && formData.agree_promo && 
               formData.agree_rates_private && formData.agree_removal && formData.agree_accurate;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/artists/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rate_per_hour: formData.rate_per_hour ? parseFloat(formData.rate_per_hour) : null,
          rate_per_event: formData.rate_per_event ? parseFloat(formData.rate_per_event) : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
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
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full text-center border border-white/10">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
          <p className="text-gray-400 mb-6">
            Thank you for applying to join BahrainNights! Our team will review your application within 48 hours.
          </p>
          <Link
            href="/entertainment"
            className="inline-block px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Back to Entertainment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/entertainment" className="text-amber-500 hover:text-amber-400 text-sm mb-4 inline-block">
            ← Back to Entertainment
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Join Our Agency</h1>
          <p className="text-gray-400">Become a BahrainNights artist and get booked for events</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/10" />
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s ? 'bg-amber-500 text-white' : 'bg-white/10 text-gray-500'
              }`}>
                {s}
              </div>
              <span className={`text-xs mt-2 ${step >= s ? 'text-white' : 'text-gray-500'}`}>
                {s === 1 ? 'Info' : s === 2 ? 'Details' : s === 3 ? 'Rates' : 'Terms'}
              </span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
              
              <div>
                <label className="block text-sm text-gray-300 mb-1">Full Legal Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={formData.real_name}
                  onChange={e => updateField('real_name', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                  placeholder="Your full name (private)"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Stage / Artist Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={formData.stage_name}
                  onChange={e => updateField('stage_name', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                  placeholder="Your performer name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Email <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                    placeholder="+973"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Instagram Handle <span className="text-red-400">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                  <input
                    type="text"
                    value={formData.instagram_handle}
                    onChange={e => updateField('instagram_handle', e.target.value.replace('@', ''))}
                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                    placeholder="your_handle"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Artist Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Artist Details</h2>
              
              <div>
                <label className="block text-sm text-gray-300 mb-1">Category <span className="text-red-400">*</span></label>
                <select
                  value={formData.category}
                  onChange={e => updateField('category', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {formData.category && SUBCATEGORIES[formData.category] && (
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Subcategory</label>
                  <select
                    value={formData.subcategory}
                    onChange={e => updateField('subcategory', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                  >
                    <option value="">Select subcategory...</option>
                    {SUBCATEGORIES[formData.category].map(sub => (
                      <option key={sub} value={sub.toLowerCase().replace(' ', '_')}>{sub}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-300 mb-1">Bio / About <span className="text-red-400">*</span></label>
                <textarea
                  value={formData.bio}
                  onChange={e => updateField('bio', e.target.value.slice(0, 500))}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none resize-none"
                  placeholder="Tell us about yourself and your performance style..."
                />
                <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Years of Experience</label>
                <input
                  type="text"
                  value={formData.years_experience}
                  onChange={e => updateField('years_experience', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                  placeholder="e.g. 5 years"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Notable Venues / Events</label>
                <textarea
                  value={formData.notable_venues}
                  onChange={e => updateField('notable_venues', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none resize-none"
                  placeholder="Four Seasons, Ritz Carlton, Bahrain Grand Prix..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Rates */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-2">Your Rates</h2>
              <p className="text-sm text-gray-400 mb-4">This information is private and only visible to our team.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Rate per Hour (BHD)</label>
                  <input
                    type="number"
                    value={formData.rate_per_hour}
                    onChange={e => updateField('rate_per_hour', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                    placeholder="e.g. 50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Rate per Event (BHD)</label>
                  <input
                    type="number"
                    value={formData.rate_per_event}
                    onChange={e => updateField('rate_per_event', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none"
                    placeholder="e.g. 200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Additional Notes</label>
                <textarea
                  value={formData.rate_notes}
                  onChange={e => updateField('rate_notes', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-amber-500 outline-none resize-none"
                  placeholder="Equipment fees, travel charges, minimum booking time..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Terms */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Terms & Conditions</h2>
              
              {[
                { field: 'agree_instagram', text: 'I agree to list @bh.nights for bookings in my Instagram bio within 7 days of approval' },
                { field: 'agree_exclusive', text: 'I understand all bookings through BahrainNights.com are managed exclusively by BahrainNights' },
                { field: 'agree_promo', text: 'I agree that my profile, photos, and videos may be used for promotional purposes' },
                { field: 'agree_rates_private', text: 'I understand my rates are kept confidential and not displayed publicly' },
                { field: 'agree_removal', text: 'I understand BahrainNights reserves the right to remove my profile at any time' },
                { field: 'agree_accurate', text: 'I confirm all information provided is accurate' },
              ].map(({ field, text }) => (
                <label key={field} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData[field as keyof typeof formData] as boolean}
                    onChange={e => updateField(field, e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{text}</span>
                </label>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold rounded-lg transition-colors"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
