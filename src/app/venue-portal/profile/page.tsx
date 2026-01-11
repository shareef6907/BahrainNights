'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Clock,
  Navigation,
  Info,
  Camera,
  Upload,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import AIWriterButton from '@/components/ai/AIWriterButton';
import { compressImage } from '@/lib/image-compression';

interface VenueProfile {
  id: string;
  name: string;
  slug: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  area?: string;
  website?: string;
  instagram?: string;
  menu_url?: string;
  booking_url?: string;
  youtube_url?: string;
  cuisine_type?: string;
  features?: string[];
  logo_url?: string;
  cover_image_url?: string;
  latitude?: number;
  longitude?: number;
  google_maps_url?: string;
}

interface PendingChangeRequest {
  id: string;
  venue_id: string;
  changes: Record<string, unknown>;
  status: string;
  submitted_at: string;
}

export default function VenueProfilePage() {
  const [venue, setVenue] = useState<VenueProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [pendingRequest, setPendingRequest] = useState<PendingChangeRequest | null>(null);

  const [formData, setFormData] = useState({
    description: '',
    phone: '',
    address: '',
    area: '',
    website: '',
    instagram: '',
    menu_url: '',
    booking_url: '',
    youtube_url: '',
    cuisine_type: '',
    features: '',
  });

  // Photo upload states
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [pendingProfilePhoto, setPendingProfilePhoto] = useState<string | null>(null);
  const [pendingCoverPhoto, setPendingCoverPhoto] = useState<string | null>(null);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profilePhotoError, setProfilePhotoError] = useState(false);
  const [coverPhotoError, setCoverPhotoError] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        // Load profile data
        const response = await fetch('/api/venue-portal/profile');
        if (response.ok) {
          const data = await response.json();
          setVenue(data.venue);
          setFormData({
            description: data.venue.description || '',
            phone: data.venue.phone || '',
            address: data.venue.address || '',
            area: data.venue.area || '',
            website: data.venue.website || '',
            instagram: data.venue.instagram || '',
            menu_url: data.venue.menu_url || '',
            booking_url: data.venue.booking_url || '',
            youtube_url: data.venue.youtube_url || '',
            cuisine_type: data.venue.cuisine_type || '',
            features: data.venue.features?.join(', ') || '',
          });
          // Load existing photos
          setProfilePhoto(data.venue.logo_url || null);
          setCoverPhoto(data.venue.cover_image_url || null);
        }

        // Check for pending change request
        const pendingResponse = await fetch('/api/venue-portal/profile/request-change');
        if (pendingResponse.ok) {
          const pendingData = await pendingResponse.json();
          setPendingRequest(pendingData.pendingRequest);

          // Load pending photos from change request
          if (pendingData.pendingRequest?.changes) {
            const changes = pendingData.pendingRequest.changes;
            if (changes.logo_url) {
              setPendingProfilePhoto(changes.logo_url as string);
            }
            if (changes.cover_image_url) {
              setPendingCoverPhoto(changes.cover_image_url as string);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (file: File, type: 'profile' | 'cover') => {
    const setUploading = type === 'profile' ? setIsUploadingProfile : setIsUploadingCover;
    const setPendingPhoto = type === 'profile' ? setPendingProfilePhoto : setPendingCoverPhoto;
    const setPhotoError = type === 'profile' ? setProfilePhotoError : setCoverPhotoError;
    const imageType = type === 'profile' ? 'logo' : 'cover';

    console.log(`[Photo Upload] Starting ${type} photo upload...`);
    setUploading(true);
    setUploadMessage(null);
    setPhotoError(false);

    try {
      // Step 1: Compress image (target: 600KB-1MB)
      console.log(`[Photo Upload] Original size: ${(file.size / 1024).toFixed(0)}KB`);
      const compressedFile = await compressImage(file);
      console.log(`[Photo Upload] Compressed size: ${(compressedFile.size / 1024).toFixed(0)}KB`);

      // Step 2: Get presigned URL for direct S3 upload
      console.log(`[Photo Upload] Requesting presigned URL for ${imageType}...`);
      const presignResponse = await fetch('/api/venue-portal/upload/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: compressedFile.name,
          fileType: compressedFile.type,
          fileSize: compressedFile.size,
          imageType: imageType,
        }),
      });

      if (!presignResponse.ok) {
        const error = await presignResponse.json();
        console.error('[Photo Upload] Presign failed:', error);
        throw new Error(error.error || 'Failed to prepare upload');
      }

      const { presignedUrl, finalUrl } = await presignResponse.json();
      console.log(`[Photo Upload] Got presigned URL, uploading directly to S3...`);

      // Step 3: Upload compressed file directly to S3 using presigned URL
      console.log(`[Photo Upload] Uploading to S3 with presigned URL...`);
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: compressedFile,
        headers: {
          'Content-Type': compressedFile.type,
        },
        mode: 'cors',
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text().catch(() => 'Unknown error');
        console.error('[Photo Upload] S3 upload failed:', uploadResponse.status, errorText);
        throw new Error(`Failed to upload to storage: ${uploadResponse.status}`);
      }

      console.log(`[Photo Upload] S3 upload successful, URL: ${finalUrl}`);

      // Add cache buster to force browser to load fresh image
      const cacheBustedUrl = `${finalUrl}?t=${Date.now()}`;

      // Update pending photo state to show immediately (with cache buster)
      setPendingPhoto(cacheBustedUrl);

      // Step 3: Submit the photo URL change for admin approval
      const fieldName = type === 'profile' ? 'logo_url' : 'cover_image_url';
      console.log(`[Photo Upload] Submitting change request for field: ${fieldName}`);
      const changeResponse = await fetch('/api/venue-portal/profile/request-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          changes: { [fieldName]: finalUrl }
        }),
      });

      if (changeResponse.ok) {
        const changeData = await changeResponse.json();
        console.log('[Photo Upload] Change request submitted:', changeData);
        setPendingRequest(changeData.request);
        setUploadMessage({
          type: 'success',
          text: `${type === 'profile' ? 'Profile photo' : 'Cover photo'} uploaded and submitted for approval.`
        });
      } else {
        const error = await changeResponse.json();
        console.error('[Photo Upload] Change request failed:', error);
        throw new Error(error.error || 'Failed to submit photo change');
      }
    } catch (error) {
      console.error('[Photo Upload] Error:', error);
      setUploadMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to upload photo'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setUploadMessage({
          type: 'error',
          text: 'Invalid file type. Please use JPG, PNG, WebP, or GIF.'
        });
        return;
      }

      // Validate file size (20MB max - direct S3 upload)
      if (file.size > 20 * 1024 * 1024) {
        setUploadMessage({
          type: 'error',
          text: 'File too large. Maximum 20MB allowed.'
        });
        return;
      }

      handlePhotoUpload(file, type);
    }
    // Reset input value to allow re-uploading same file
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const changes = {
        ...formData,
        features: formData.features
          ? formData.features.split(',').map((f) => f.trim()).filter(Boolean)
          : [],
      };

      // Submit changes for approval instead of direct update
      const response = await fetch('/api/venue-portal/profile/request-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes }),
      });

      if (response.ok) {
        const data = await response.json();
        setPendingRequest(data.request);
        setMessage({
          type: 'success',
          text: data.message || 'Your changes have been submitted for admin approval.'
        });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to submit changes' });
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: 'An error occurred while submitting changes' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Venue Profile</h1>
        <p className="text-gray-400 mt-1">Update your venue information visible to visitors.</p>
      </div>

      {/* Pending Request Notice */}
      {pendingRequest && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
        >
          <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Profile Changes Pending Approval</p>
            <p className="text-sm text-yellow-400/80 mt-1">
              You submitted changes on {new Date(pendingRequest.submitted_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}. An admin will review your changes soon. You can update your submission below.
            </p>
          </div>
        </motion.div>
      )}

      {/* Venue Name (Read-only) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Venue Name</p>
            <p className="text-xl font-bold text-white">{venue?.name}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          To change your venue name, please contact support.
        </p>
      </motion.div>

      {/* Photo Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Venue Photos</h2>

        {/* Upload Message */}
        {uploadMessage && (
          <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
            uploadMessage.type === 'success'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {uploadMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm">{uploadMessage.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Photo */}
          <div>
            <span className="block text-sm font-medium text-gray-300 mb-3">
              Profile Photo
            </span>
            <label className="block cursor-pointer group">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => handleFileSelect(e, 'profile')}
                className="sr-only"
                disabled={isUploadingProfile}
              />
              <div className="w-32 h-32 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 hover:border-yellow-400/50 overflow-hidden flex items-center justify-center relative transition-colors">
                {(pendingProfilePhoto || profilePhoto) && !profilePhotoError ? (
                  <>
                    <img
                      src={pendingProfilePhoto || profilePhoto || ''}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={() => setProfilePhotoError(true)}
                    />
                    {pendingProfilePhoto && (
                      <div className="absolute top-1 left-1 right-1">
                        <span className="px-1.5 py-0.5 bg-yellow-500/90 text-black text-[10px] font-bold rounded">
                          PENDING
                        </span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-6 h-6 text-white mx-auto mb-1" />
                        <span className="text-xs text-white font-medium">Change</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <Camera className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                    <span className="text-xs text-gray-500">Click to upload</span>
                  </div>
                )}
                {isUploadingProfile && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
                  </div>
                )}
              </div>
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Square image recommended. Max 20MB.
            </p>
          </div>

          {/* Cover Photo */}
          <div>
            <span className="block text-sm font-medium text-gray-300 mb-3">
              Cover Photo
            </span>
            <label className="block cursor-pointer group">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => handleFileSelect(e, 'cover')}
                className="sr-only"
                disabled={isUploadingCover}
              />
              <div className="w-full h-32 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 hover:border-yellow-400/50 overflow-hidden flex items-center justify-center relative transition-colors">
                {(pendingCoverPhoto || coverPhoto) && !coverPhotoError ? (
                  <>
                    <img
                      src={pendingCoverPhoto || coverPhoto || ''}
                      alt="Cover"
                      className="w-full h-full object-cover"
                      onError={() => setCoverPhotoError(true)}
                    />
                    {pendingCoverPhoto && (
                      <div className="absolute top-1 left-1">
                        <span className="px-1.5 py-0.5 bg-yellow-500/90 text-black text-[10px] font-bold rounded">
                          PENDING
                        </span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-6 h-6 text-white mx-auto mb-1" />
                        <span className="text-xs text-white font-medium">Change</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <Camera className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                    <span className="text-xs text-gray-500">Click to upload</span>
                  </div>
                )}
                {isUploadingCover && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
                  </div>
                )}
              </div>
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Landscape image (16:9) recommended. Max 20MB.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-white/10">
          Photo changes require admin approval before going live.
        </p>
      </motion.div>

      {/* Map Preview Section */}
      {venue && venue.latitude && venue.longitude && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              Your Location
            </h2>
            <Link
              href="/venue-portal/location"
              className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
            >
              Edit
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Map Embed */}
          <div className="relative h-48 bg-slate-800 rounded-xl overflow-hidden mb-4">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${venue.longitude - 0.005},${venue.latitude - 0.005},${venue.longitude + 0.005},${venue.latitude + 0.005}&layer=mapnik&marker=${venue.latitude},${venue.longitude}`}
              className="w-full h-full border-0"
              style={{ filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              title="Venue location map"
            />

            {/* Map Overlay */}
            <button
              onClick={() => {
                if (venue.google_maps_url) {
                  window.open(venue.google_maps_url, '_blank');
                } else {
                  window.open(`https://www.google.com/maps/search/?api=1&query=${venue.latitude},${venue.longitude}`, '_blank');
                }
              }}
              className="absolute inset-0 bg-transparent hover:bg-white/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
              aria-label="Open in Google Maps"
            >
              <div className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-xl text-white text-sm font-medium flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Open in Google Maps
              </div>
            </button>
          </div>

          {/* Address */}
          {venue.address && (
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <MapPin className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">{venue.address}</p>
                {venue.area && <p className="text-gray-500 text-xs mt-0.5">{venue.area}, Bahrain</p>}
              </div>
            </div>
          )}

          {/* Get Directions Button */}
          <button
            onClick={() => {
              if (venue.google_maps_url) {
                window.open(venue.google_maps_url, '_blank');
              } else if (venue.latitude && venue.longitude) {
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`;
                window.open(mapsUrl, '_blank');
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            <Navigation className="w-5 h-5" />
            <span>Get Directions</span>
          </button>
        </motion.div>
      )}

      {/* No Location Set - Prompt to add */}
      {venue && !venue.latitude && !venue.longitude && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <MapPin className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Add Your Location</h3>
              <p className="text-gray-400 text-sm mb-4">
                Help customers find your venue by adding your Google Maps location. This will enable the &quot;Get Directions&quot; feature on your venue page.
              </p>
              <Link
                href="/venue-portal/location"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-xl hover:bg-orange-500/30 transition-colors font-medium text-sm"
              >
                <Navigation className="w-4 h-4" />
                Set Location
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Profile Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6"
      >
        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <AIWriterButton
              contentType="venue"
              venueName={venue?.name}
              venueCategory={venue?.slug?.includes('restaurant') ? 'restaurant' : venue?.slug?.includes('cafe') ? 'cafe' : venue?.slug?.includes('bar') ? 'bar' : 'venue'}
              location={formData.area}
              existingDescription={formData.description}
              onGenerated={(description) => setFormData(prev => ({ ...prev, description }))}
            />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent resize-none"
            placeholder="Describe your venue..."
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
              placeholder="+973 XXXX XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Area
            </label>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            >
              <option value="">Select area</option>
              <option value="Manama">Manama</option>
              <option value="Seef">Seef</option>
              <option value="Juffair">Juffair</option>
              <option value="Adliya">Adliya</option>
              <option value="Amwaj">Amwaj</option>
              <option value="Riffa">Riffa</option>
              <option value="Muharraq">Muharraq</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Full Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="Building, Road, Block, Area"
          />
        </div>

        {/* Online Presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Website
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                https://
              </span>
              <input
                type="text"
                name="website"
                value={formData.website.replace(/^https?:\/\//, '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/^https?:\/\//, '');
                  setFormData((prev) => ({ ...prev, website: value ? `https://${value}` : '' }));
                }}
                className="w-full pl-20 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                placeholder="www.yourwebsite.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Instagram className="w-4 h-4 inline mr-2" />
              Instagram
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
              placeholder="@yourvenue"
            />
          </div>
        </div>

        {/* Quick Links to Hours & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl">
          <Link
            href="/venue-portal/hours"
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-400/20 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-medium">Opening Hours</p>
                <p className="text-gray-400 text-sm">Set your daily hours</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
          <Link
            href="/venue-portal/location"
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-400/20 rounded-lg">
                <Navigation className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Location</p>
                <p className="text-gray-400 text-sm">Set Google Map</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Menu URL
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                https://
              </span>
              <input
                type="text"
                name="menu_url"
                value={formData.menu_url.replace(/^https?:\/\//, '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/^https?:\/\//, '');
                  setFormData((prev) => ({ ...prev, menu_url: value ? `https://${value}` : '' }));
                }}
                className="w-full pl-20 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                placeholder="www.yourmenu.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Booking URL
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                https://
              </span>
              <input
                type="text"
                name="booking_url"
                value={formData.booking_url.replace(/^https?:\/\//, '')}
                onChange={(e) => {
                  const value = e.target.value.replace(/^https?:\/\//, '');
                  setFormData((prev) => ({ ...prev, booking_url: value ? `https://${value}` : '' }));
                }}
                className="w-full pl-20 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                placeholder="www.booking-site.com/venue"
              />
            </div>
          </div>
        </div>

        {/* YouTube Video */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube Video URL
            </span>
          </label>
          <input
            type="url"
            name="youtube_url"
            value={formData.youtube_url}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
          />
          <p className="text-xs text-gray-500 mt-2">
            Add a YouTube video to showcase your venue. The video will auto-play (muted) on your venue page.
          </p>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cuisine Type
          </label>
          <input
            type="text"
            name="cuisine_type"
            value={formData.cuisine_type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="e.g., Italian, Arabic, International"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Features (comma-separated)
          </label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
            placeholder="e.g., Outdoor Seating, Live Music, Shisha, Valet Parking"
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-end gap-2 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {pendingRequest ? 'Update Submission' : 'Submit for Approval'}
              </>
            )}
          </button>
          <p className="text-xs text-gray-500">
            Changes require admin approval before going live.
          </p>
        </div>

        {/* Success/Error Message - shown after submission */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 p-4 rounded-xl mt-4 ${
              message.type === 'success'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : message.type === 'info'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : message.type === 'info' ? (
              <Info className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}
