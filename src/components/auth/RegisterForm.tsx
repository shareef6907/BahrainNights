'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Building2,
  Phone,
  Globe,
  Instagram,
  MapPin,
  FileText,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Hash,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import {
  registerStep1Schema,
  registerStep2Schema,
  registerStep3Schema,
  venueTypeOptions,
  areaOptions,
} from '@/lib/validations/auth';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import StepIndicator from './StepIndicator';

const steps = [
  { label: 'Account', description: 'Your credentials' },
  { label: 'Venue', description: 'Basic info' },
  { label: 'Location', description: 'Address' },
  { label: 'Done', description: 'Complete' },
];

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  venueName: string;
  crNumber: string;
  venueType: string;
  phone: string;
  website: string;
  instagram: string;
  area: string;
  address: string;
  googleMapsLink: string;
  agreeToTerms: boolean;
}

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    venueName: '',
    crNumber: '',
    venueType: '',
    phone: '',
    website: '',
    instagram: '',
    area: '',
    address: '',
    googleMapsLink: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const validateStep = (step: number): boolean => {
    let schema;
    let dataToValidate: Record<string, unknown>;

    switch (step) {
      case 0:
        schema = registerStep1Schema;
        dataToValidate = {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };
        break;
      case 1:
        schema = registerStep2Schema;
        dataToValidate = {
          venueName: formData.venueName,
          crNumber: formData.crNumber,
          venueType: formData.venueType,
          phone: formData.phone,
          website: formData.website,
          instagram: formData.instagram,
        };
        break;
      case 2:
        schema = registerStep3Schema;
        dataToValidate = {
          area: formData.area,
          address: formData.address,
          googleMapsLink: formData.googleMapsLink,
          agreeToTerms: formData.agreeToTerms,
        };
        break;
      default:
        return true;
    }

    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0].toString()] = error.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsLoading(true);
    setGeneralError('');

    try {
      const { success, error } = await register({
        email: formData.email,
        password: formData.password,
        venueName: formData.venueName,
        crNumber: formData.crNumber,
        venueType: formData.venueType,
        phone: formData.phone,
        website: formData.website || undefined,
        instagram: formData.instagram || undefined,
        area: formData.area,
        address: formData.address,
        googleMapsLink: formData.googleMapsLink || undefined,
        agreeToTerms: formData.agreeToTerms,
      });

      if (success) {
        setCurrentStep(3); // Success step
      } else {
        setGeneralError(error || 'Registration failed. Please try again.');
      }
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          {currentStep === 3 ? 'Registration Complete!' : 'Register Your Venue'}
        </h1>
        {currentStep < 3 && (
          <p className="text-gray-400">Join Bahrain&apos;s #1 events platform</p>
        )}
      </div>

      {/* Step Indicator */}
      {currentStep < 3 && (
        <div className="mb-8">
          <StepIndicator steps={steps} currentStep={currentStep} variant="bars" />
        </div>
      )}

      {/* General Error */}
      {generalError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{generalError}</span>
        </motion.div>
      )}

      {/* Form Steps */}
      <AnimatePresence mode="wait" custom={currentStep}>
        {/* Step 1: Account Details */}
        {currentStep === 0 && (
          <motion.div
            key="step1"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@venue.com"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.email ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Password *"
              placeholder="Create a strong password"
              error={errors.password}
            />

            {/* Password Strength */}
            <PasswordStrength password={formData.password} />

            {/* Confirm Password */}
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              label="Confirm Password *"
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Step 2: Venue Information */}
        {currentStep === 1 && (
          <motion.div
            key="step2"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Venue Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Venue Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  placeholder="e.g., The Orangery"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.venueName ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all`}
                />
              </div>
              {errors.venueName && (
                <p className="text-red-400 text-sm">{errors.venueName}</p>
              )}
            </div>

            {/* CR Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                CR Number (Commercial Registration) *
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="crNumber"
                  value={formData.crNumber}
                  onChange={handleChange}
                  placeholder="e.g., 12345 or 123456-1"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.crNumber ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all`}
                />
              </div>
              <p className="text-gray-500 text-xs">
                Your Bahrain Commercial Registration number (5-7 digits)
              </p>
              {errors.crNumber && (
                <p className="text-red-400 text-sm">{errors.crNumber}</p>
              )}
            </div>

            {/* Venue Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Venue Type *
              </label>
              <select
                name="venueType"
                value={formData.venueType}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.venueType ? 'border-red-500' : 'border-white/10'
                } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all appearance-none cursor-pointer`}
              >
                <option value="" className="bg-slate-900">
                  Select venue type
                </option>
                {venueTypeOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-slate-900">
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.venueType && (
                <p className="text-red-400 text-sm">{errors.venueType}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+973 1234 5678"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.phone ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all`}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
            </div>

            {/* Website (Optional) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Website <span className="text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourvenue.com"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.website ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all`}
                />
              </div>
              {errors.website && <p className="text-red-400 text-sm">{errors.website}</p>}
            </div>

            {/* Instagram (Optional) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Instagram <span className="text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@yourvenue"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.instagram ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all`}
                />
              </div>
              {errors.instagram && (
                <p className="text-red-400 text-sm">{errors.instagram}</p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Location Details */}
        {currentStep === 2 && (
          <motion.div
            key="step3"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Area */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Area *
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.area ? 'border-red-500' : 'border-white/10'
                } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all appearance-none cursor-pointer`}
              >
                <option value="" className="bg-slate-900">
                  Select area
                </option>
                {areaOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-slate-900">
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.area && <p className="text-red-400 text-sm">{errors.area}</p>}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Full Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Building name, Street, Block, Road"
                  rows={3}
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.address ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all resize-none`}
                />
              </div>
              {errors.address && <p className="text-red-400 text-sm">{errors.address}</p>}
            </div>

            {/* Google Maps Link (Optional) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Google Maps Link <span className="text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  name="googleMapsLink"
                  value={formData.googleMapsLink}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                    errors.googleMapsLink ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all`}
                />
              </div>
              {errors.googleMapsLink && (
                <p className="text-red-400 text-sm">{errors.googleMapsLink}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-yellow-500 focus:ring-yellow-500/50 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-400 text-sm">{errors.agreeToTerms}</p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Success */}
        {currentStep === 3 && (
          <motion.div
            key="step4"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </motion.div>

            <h2 className="text-xl font-bold text-white mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto">
              Your venue is pending approval. We&apos;ll review it within 24-48 hours and
              notify you via email.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/login')}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
              >
                Go to Login
              </button>
              <Link
                href="/"
                className="block w-full py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Link */}
      {currentStep < 3 && (
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}
