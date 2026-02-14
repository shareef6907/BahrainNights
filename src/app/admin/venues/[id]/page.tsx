'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  Sparkles,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Star,
  StarOff,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  Clock,
  ToggleLeft,
  ToggleRight,
  Copy,
  EyeOffIcon,
} from 'lucide-react';
import { compressImage } from '@/lib/image-compression';

interface Venue {
  id: string;
  owner_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  description_ar: string | null;
  category: string;
  subcategories: string[] | null;
  cuisine_types: string[] | null;
  area: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  google_maps_url: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  twitter: string | null;
  menu_url: string | null;
  booking_url: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  gallery: string[] | null;
  opening_hours: Record<string, string> | null;
  price_range: number | null;
  avg_cost_per_person: string | null;
  features: string[] | null;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  rejection_reason: string | null;
  is_verified: boolean;
  is_featured: boolean;
  is_hidden: boolean;
  youtube_url: string | null;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
}

// Toast notification
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex items-center gap-2">
        {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
      </div>
    </motion.div>
  );
}

const VENUE_CATEGORIES = [
  'restaurant',
  'cafe',
  'lounge',
  'bar',
  'nightclub',
  'beach-club',
  'hotel',
  'spa',
  'shopping',
  'tour',
  'kids',
  'community',
];

const AREAS = [
  'Manama',
  'Seef',
  'Juffair',
  'Adliya',
  'Amwaj',
  'Muharraq',
  'Riffa',
  'Hamad Town',
  'Isa Town',
  'Bahrain Bay',
  'Saar',
  'Budaiya',
  'Durrat Al Bahrain',
  'Diyar Al Muharraq',
  'Zallaq',
  'Other',
];

// Opening Hours types and constants
interface DayHours {
  open: string;
  close: string;
  isClosed: boolean;
}

interface OpeningHours {
  sunday: DayHours;
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
}

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

const DAY_LABELS: Record<string, string> = {
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
};

const DEFAULT_HOURS: DayHours = {
  open: '10:00',
  close: '22:00',
  isClosed: false,
};

export default function AdminVenueEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiRewriting, setAiRewriting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [deletingGalleryPhoto, setDeletingGalleryPhoto] = useState<string | null>(null);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [newlyUploadedUrls, setNewlyUploadedUrls] = useState<Map<string, number>>(new Map()); // Track recently uploaded URLs with their timestamps for cache busting
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Opening hours state
  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    sunday: { ...DEFAULT_HOURS },
    monday: { ...DEFAULT_HOURS },
    tuesday: { ...DEFAULT_HOURS },
    wednesday: { ...DEFAULT_HOURS },
    thursday: { ...DEFAULT_HOURS },
    friday: { ...DEFAULT_HOURS },
    saturday: { ...DEFAULT_HOURS },
  });
  const [hideHours, setHideHours] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    description_ar: '',
    category: '',
    area: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    google_maps_url: '',
    booking_url: '',
    menu_url: '',
    price_range: '',
    avg_cost_per_person: '',
    features: '',
    logo_url: '',
    cover_image_url: '',
    youtube_url: '',
    is_featured: false,
    is_verified: false,
    is_hidden: false,
  });

  const fetchVenue = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch venue');
      }
      const data = await response.json();
      setVenue(data.venue);

      // Populate form
      const v = data.venue;
      setFormData({
        name: v.name || '',
        slug: v.slug || '',
        description: v.description || '',
        description_ar: v.description_ar || '',
        category: v.category || '',
        area: v.area || '',
        address: v.address || '',
        phone: v.phone || '',
        email: v.email || '',
        website: v.website || '',
        instagram: v.instagram || '',
        facebook: v.facebook || '',
        whatsapp: v.whatsapp || '',
        google_maps_url: v.google_maps_url || '',
        booking_url: v.booking_url || '',
        menu_url: v.menu_url || '',
        price_range: v.price_range?.toString() || '',
        avg_cost_per_person: v.avg_cost_per_person || '',
        features: v.features?.join(', ') || '',
        logo_url: v.logo_url || '',
        cover_image_url: v.cover_image_url || '',
        youtube_url: v.youtube_url || '',
        is_featured: v.is_featured || false,
        is_verified: v.is_verified || false,
        is_hidden: v.is_hidden || false,
      });

      // Parse opening hours
      if (v.opening_hours && typeof v.opening_hours === 'object') {
        const parsedHours: OpeningHours = {
          sunday: { ...DEFAULT_HOURS },
          monday: { ...DEFAULT_HOURS },
          tuesday: { ...DEFAULT_HOURS },
          wednesday: { ...DEFAULT_HOURS },
          thursday: { ...DEFAULT_HOURS },
          friday: { ...DEFAULT_HOURS },
          saturday: { ...DEFAULT_HOURS },
        };

        // Load hideHours flag
        if (v.opening_hours.hideHours !== undefined) {
          setHideHours(v.opening_hours.hideHours);
        }

        DAYS.forEach((day) => {
          const dayData = v.opening_hours[day];
          if (dayData) {
            if (dayData === 'closed') {
              parsedHours[day] = { open: '10:00', close: '22:00', isClosed: true };
            } else if (typeof dayData === 'object') {
              parsedHours[day] = {
                open: dayData.open || '10:00',
                close: dayData.close || '22:00',
                isClosed: false,
              };
            }
          }
        });

        setOpeningHours(parsedHours);
      }
    } catch (error) {
      console.error('Error fetching venue:', error);
      setToast({ message: 'Failed to load venue', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Opening hours handlers
  const handleHoursChange = (day: keyof OpeningHours, field: keyof DayHours, value: string | boolean) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleToggleClosed = (day: keyof OpeningHours) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isClosed: !prev[day].isClosed,
      },
    }));
  };

  const handleCopyHoursToAll = (sourceDay: keyof OpeningHours) => {
    const sourceHours = openingHours[sourceDay];
    const newHours = { ...openingHours };

    DAYS.forEach((day) => {
      newHours[day] = { ...sourceHours };
    });

    setOpeningHours(newHours);
    setToast({ message: `Copied ${DAY_LABELS[sourceDay]}'s hours to all days`, type: 'success' });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        description_ar: formData.description_ar || null,
        category: formData.category,
        area: formData.area,
        address: formData.address,
        phone: formData.phone || null,
        email: formData.email || null,
        website: formData.website || null,
        instagram: formData.instagram || null,
        facebook: formData.facebook || null,
        whatsapp: formData.whatsapp || null,
        google_maps_url: formData.google_maps_url || null,
        booking_url: formData.booking_url || null,
        menu_url: formData.menu_url || null,
        price_range: formData.price_range ? parseInt(formData.price_range) : null,
        avg_cost_per_person: formData.avg_cost_per_person || null,
        features: formData.features ? formData.features.split(',').map((f) => f.trim()).filter(Boolean) : null,
        logo_url: formData.logo_url || null,
        cover_image_url: formData.cover_image_url || null,
        youtube_url: formData.youtube_url || null,
        is_featured: formData.is_featured,
        is_verified: formData.is_verified,
        is_hidden: formData.is_hidden,
        opening_hours: (() => {
          const dbHours: Record<string, { open: string; close: string } | 'closed' | boolean> = {
            hideHours, // Include the hide flag
          };
          DAYS.forEach((day) => {
            if (openingHours[day].isClosed) {
              dbHours[day] = 'closed';
            } else {
              dbHours[day] = {
                open: openingHours[day].open,
                close: openingHours[day].close,
              };
            }
          });
          return dbHours;
        })(),
      };

      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update venue');
      }

      const data = await response.json();
      setVenue(data.venue);
      setToast({ message: 'Venue updated successfully', type: 'success' });
    } catch (error) {
      console.error('Error saving venue:', error);
      setToast({ message: 'Failed to save venue', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleAIRewrite = async () => {
    if (!formData.name) {
      setToast({ message: 'Please enter a venue name first', type: 'error' });
      return;
    }

    setAiRewriting(true);
    try {
      const response = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'venue',
          venueName: formData.name,
          venueCategory: formData.category,
          location: formData.area,
          existingDescription: formData.description || '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate description');
      }

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        description: data.description,
      }));
      setToast({ message: 'Description rewritten with AI ✨', type: 'success' });
    } catch (error) {
      console.error('Error rewriting description:', error);
      setToast({ message: error instanceof Error ? error.message : 'Failed to rewrite description', type: 'error' });
    } finally {
      setAiRewriting(false);
    }
  };

  const handleImageUpload = async (file: File, type: 'logo' | 'cover') => {
    if (type === 'logo') setUploadingLogo(true);
    else setUploadingCover(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('entityType', 'venue');
      uploadFormData.append('imageType', type);
      uploadFormData.append('venueSlug', venue?.slug || resolvedParams.id);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const data = await response.json();
      const imageUrl = data.url;

      if (type === 'logo') {
        setFormData((prev) => ({ ...prev, logo_url: imageUrl }));
      } else {
        setFormData((prev) => ({ ...prev, cover_image_url: imageUrl }));
      }

      setToast({ message: 'Image uploaded successfully', type: 'success' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setToast({ message: error instanceof Error ? error.message : 'Failed to upload image', type: 'error' });
    } finally {
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingCover(false);
    }
  };

  const handleApprove = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      });

      if (!response.ok) throw new Error('Failed to approve venue');

      const data = await response.json();
      setVenue(data.venue);
      setToast({ message: 'Venue approved successfully', type: 'success' });
    } catch (error) {
      console.error('Error approving venue:', error);
      setToast({ message: 'Failed to approve venue', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setToast({ message: 'Please provide a rejection reason', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', reason: rejectReason }),
      });

      if (!response.ok) throw new Error('Failed to reject venue');

      const data = await response.json();
      setVenue(data.venue);
      setShowRejectModal(false);
      setRejectReason('');
      setToast({ message: 'Venue rejected', type: 'success' });
    } catch (error) {
      console.error('Error rejecting venue:', error);
      setToast({ message: 'Failed to reject venue', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async () => {
    const newValue = !formData.is_featured;
    setFormData((prev) => ({ ...prev, is_featured: newValue }));

    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: newValue }),
      });

      if (!response.ok) throw new Error('Failed to update');

      setToast({
        message: newValue ? 'Added to featured' : 'Removed from featured',
        type: 'success',
      });
    } catch (error) {
      console.error('Error toggling featured:', error);
      setFormData((prev) => ({ ...prev, is_featured: !newValue }));
      setToast({ message: 'Failed to update', type: 'error' });
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete venue');

      setToast({ message: 'Venue deleted successfully', type: 'success' });
      router.push('/admin/venues');
    } catch (error) {
      console.error('Error deleting venue:', error);
      setToast({ message: 'Failed to delete venue', type: 'error' });
    } finally {
      setSaving(false);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteGalleryPhoto = async (photoUrl: string) => {
    setDeletingGalleryPhoto(photoUrl);
    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}/gallery`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete photo');
      }

      const data = await response.json();
      // Update local venue state with new gallery
      setVenue((prev) => prev ? { ...prev, gallery: data.venue.gallery } : null);
      setToast({ message: 'Photo deleted successfully', type: 'success' });
    } catch (error) {
      console.error('Error deleting gallery photo:', error);
      setToast({ message: error instanceof Error ? error.message : 'Failed to delete photo', type: 'error' });
    } finally {
      setDeletingGalleryPhoto(null);
    }
  };

  const handleGalleryUpload = async (file: File) => {
    // Admin gallery has no limit - removed limit check

    setUploadingGallery(true);
    try {
      // Step 1: Compress image client-side (target: 600KB-1MB)
      const compressedFile = await compressImage(file);

      // Step 2: Get presigned URL for direct S3 upload (bypasses Vercel's 4.5MB limit)
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const filename = `gallery-${timestamp}-${randomSuffix}.jpg`;

      const presignResponse = await fetch('/api/upload/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename,
          contentType: compressedFile.type,
          entityType: 'venue',
          entitySlug: venue?.slug || resolvedParams.id,
          imageType: 'gallery',
        }),
      });

      if (!presignResponse.ok) {
        const errorData = await presignResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to prepare upload');
      }

      const { uploadUrl, processedUrl } = await presignResponse.json();

      // Step 3: Upload directly to S3 using presigned URL
      const s3Response = await fetch(uploadUrl, {
        method: 'PUT',
        body: compressedFile,
        headers: {
          'Content-Type': compressedFile.type,
        },
        mode: 'cors',
      });

      if (!s3Response.ok) {
        throw new Error(`Failed to upload to storage: ${s3Response.status}`);
      }

      // Step 4: Wait for Lambda to process the image
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Step 5: Add the processed photo URL to venue's gallery array
      const galleryResponse = await fetch(`/api/admin/venues/${resolvedParams.id}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoUrl: processedUrl }),
      });

      if (!galleryResponse.ok) {
        const errorData = await galleryResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to add photo to gallery');
      }

      const galleryData = await galleryResponse.json();
      // Track newly uploaded URL with timestamp for cache busting at render time
      const uploadTimestamp = Date.now();
      setNewlyUploadedUrls(prev => new Map(prev).set(processedUrl, uploadTimestamp));
      // Update local venue state with clean gallery URLs (no cache buster in state)
      setVenue((prev) => prev ? { ...prev, gallery: galleryData.venue.gallery } : null);
      setToast({ message: 'Photo uploaded successfully', type: 'success' });
    } catch (error) {
      console.error('Error uploading gallery photo:', error);
      setToast({ message: error instanceof Error ? error.message : 'Failed to upload photo', type: 'error' });
    } finally {
      setUploadingGallery(false);
    }
  };

  // Handle multiple gallery photo uploads sequentially
  const handleMultipleGalleryUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    let successCount = 0;
    let failCount = 0;

    setUploadingGallery(true);
    setUploadProgress({ current: 0, total: fileArray.length });

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setUploadProgress({ current: i + 1, total: fileArray.length });

      try {
        // Step 1: Compress image client-side
        const compressedFile = await compressImage(file);

        // Step 2: Get presigned URL for direct S3 upload
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const filename = `gallery-${timestamp}-${randomSuffix}.jpg`;

        const presignResponse = await fetch('/api/upload/presign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename,
            contentType: compressedFile.type,
            entityType: 'venue',
            entitySlug: venue?.slug || resolvedParams.id,
            imageType: 'gallery',
          }),
        });

        if (!presignResponse.ok) {
          throw new Error('Failed to prepare upload');
        }

        const { uploadUrl, processedUrl } = await presignResponse.json();

        // Step 3: Upload directly to S3
        const s3Response = await fetch(uploadUrl, {
          method: 'PUT',
          body: compressedFile,
          headers: { 'Content-Type': compressedFile.type },
          mode: 'cors',
        });

        if (!s3Response.ok) {
          throw new Error('Failed to upload to storage');
        }

        // Step 4: Wait for Lambda processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Step 5: Add the photo URL to venue's gallery
        const galleryResponse = await fetch(`/api/admin/venues/${resolvedParams.id}/gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photoUrl: processedUrl }),
        });

        if (!galleryResponse.ok) {
          throw new Error('Failed to add photo to gallery');
        }

        const galleryData = await galleryResponse.json();
        const uploadTimestamp = Date.now();
        setNewlyUploadedUrls(prev => new Map(prev).set(processedUrl, uploadTimestamp));
        setVenue(prev => prev ? { ...prev, gallery: galleryData.venue.gallery } : null);
        successCount++;
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        failCount++;
      }
    }

    setUploadingGallery(false);
    setUploadProgress(null);

    if (failCount > 0) {
      setToast({
        message: `Uploaded ${successCount} photo${successCount !== 1 ? 's' : ''}, ${failCount} failed`,
        type: successCount > 0 ? 'success' : 'error'
      });
    } else {
      setToast({
        message: `${successCount} photo${successCount !== 1 ? 's' : ''} uploaded successfully`,
        type: 'success'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-[#0D0D1A] p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-white mb-2">Venue not found</h2>
          <p className="text-gray-400 mb-4">The venue you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/admin/venues"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Venues
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 rounded-full">
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-orange-500/20 text-orange-400 rounded-full">
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-red-500/20 text-red-400 rounded-full">
            Rejected
          </span>
        );
      case 'suspended':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-gray-500/20 text-gray-400 rounded-full">
            Suspended
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] p-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <Link
          href="/admin/venues"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Venues
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            {formData.logo_url ? (
              <Image
                src={formData.logo_url}
                alt={formData.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-xl object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gray-700 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{formData.name || 'Edit Venue'}</h1>
                {getStatusBadge(venue.status)}
                {formData.is_hidden && (
                  <span className="px-3 py-1 text-sm font-medium bg-purple-500/20 text-purple-400 rounded-full flex items-center gap-1">
                    <EyeOff className="w-3 h-3" />
                    Hidden
                  </span>
                )}
                {formData.is_featured && (
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                )}
              </div>
              <p className="text-gray-400 mt-1">
                {formData.category} {formData.area && `• ${formData.area}`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {venue.status === 'pending' && (
              <>
                <button
                  onClick={handleApprove}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </>
            )}
            <button
              onClick={handleToggleFeatured}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg font-medium transition-colors"
            >
              {formData.is_featured ? (
                <>
                  <StarOff className="w-4 h-4" />
                  Unfeature
                </>
              ) : (
                <>
                  <Star className="w-4 h-4" />
                  Feature
                </>
              )}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
            <a
              href={`/places/${venue.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Page
            </a>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="">Select Category</option>
                  {VENUE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Area *</label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="">Select Area</option>
                  {AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-1">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm text-gray-400">Description</label>
                <button
                  onClick={handleAIRewrite}
                  disabled={aiRewriting || !formData.name}
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50"
                >
                  {aiRewriting ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  {formData.description ? 'AI Rewrite' : 'AI Generate'}
                </button>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-1">Features (comma-separated)</label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="WiFi, Parking, Live Music, Outdoor Seating"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </span>
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+97317123456"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter full number with country code (e.g., +973 17 123 456)
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Instagram className="w-4 h-4 inline mr-1" />
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^@/, '');
                    setFormData(prev => ({ ...prev, instagram: value }));
                  }}
                  placeholder="username (without @)"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Google Maps URL</label>
                <input
                  type="url"
                  name="google_maps_url"
                  value={formData.google_maps_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Booking URL</label>
                <input
                  type="url"
                  name="booking_url"
                  value={formData.booking_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Menu URL</label>
                <input
                  type="url"
                  name="menu_url"
                  value={formData.menu_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube Video URL
                  </span>
                </label>
                <input
                  type="url"
                  name="youtube_url"
                  value={formData.youtube_url}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add a YouTube video to display on the venue page. Supports youtube.com/watch, youtu.be, and embed URLs.
                </p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Price Range (1-4)</label>
                <select
                  name="price_range"
                  value={formData.price_range}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="">Select</option>
                  <option value="1">$ - Budget</option>
                  <option value="2">$$ - Moderate</option>
                  <option value="3">$$$ - Upscale</option>
                  <option value="4">$$$$ - Luxury</option>
                </select>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Opening Hours</h3>
            </div>

            {/* Hide Hours Toggle */}
            <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {hideHours ? (
                    <EyeOff className="w-5 h-5 text-orange-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-green-400" />
                  )}
                  <div>
                    <p className="text-white font-medium text-sm">
                      {hideHours ? 'Hours Hidden from Public' : 'Hours Visible to Public'}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {hideHours
                        ? 'Opening hours will not be displayed on the venue page'
                        : 'Opening hours will be shown on the venue page'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHideHours(!hideHours)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    hideHours ? 'bg-orange-500' : 'bg-green-500'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      hideHours ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className={`space-y-3 ${hideHours ? 'opacity-50' : ''}`}>
              {DAYS.map((day) => (
                <div
                  key={day}
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg ${
                    openingHours[day].isClosed ? 'bg-red-500/10' : 'bg-white/5'
                  }`}
                >
                  {/* Day Name */}
                  <div className="w-24 flex-shrink-0">
                    <span className="text-white font-medium text-sm">{DAY_LABELS[day]}</span>
                  </div>

                  {/* Open/Closed Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleClosed(day)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-xs font-medium ${
                      openingHours[day].isClosed
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                  >
                    {openingHours[day].isClosed ? (
                      <>
                        <ToggleLeft className="w-4 h-4" />
                        Closed
                      </>
                    ) : (
                      <>
                        <ToggleRight className="w-4 h-4" />
                        Open
                      </>
                    )}
                  </button>

                  {/* Time Inputs */}
                  {!openingHours[day].isClosed && (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={openingHours[day].open}
                        onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                        className="px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-[110px]"
                      />
                      <span className="text-gray-500 text-sm">to</span>
                      <input
                        type="time"
                        value={openingHours[day].close}
                        onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                        className="px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-[110px]"
                      />
                    </div>
                  )}

                  {/* Copy to All Button */}
                  <button
                    type="button"
                    onClick={() => handleCopyHoursToAll(day)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-cyan-400 transition-colors whitespace-nowrap ml-auto"
                    title={`Copy ${DAY_LABELS[day]}'s hours to all days`}
                  >
                    <Copy className="w-3 h-3" />
                    Copy to all
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              These hours will be displayed on the venue&apos;s public page. Remember to click &quot;Save Changes&quot; to apply.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo Upload */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Logo</h3>
            <div className="relative">
              {formData.logo_url ? (
                <div className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image
                    src={formData.logo_url}
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay with actions on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="p-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 cursor-pointer">
                      <Upload className="w-5 h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'logo');
                        }}
                      />
                    </label>
                    <button
                      onClick={() => setFormData((prev) => ({ ...prev, logo_url: '' }))}
                      className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {uploadingLogo && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-colors">
                  {uploadingLogo ? (
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-400 text-sm">Upload Logo</span>
                      <span className="text-gray-500 text-xs mt-1">Max 10MB, compressed to 1MB</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'logo');
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Cover Image</h3>
            <div className="relative">
              {formData.cover_image_url ? (
                <div className="relative aspect-video rounded-xl overflow-hidden group">
                  <Image
                    src={formData.cover_image_url}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay with actions on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="p-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 cursor-pointer">
                      <Upload className="w-5 h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'cover');
                        }}
                      />
                    </label>
                    <button
                      onClick={() => setFormData((prev) => ({ ...prev, cover_image_url: '' }))}
                      className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {uploadingCover && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-colors">
                  {uploadingCover ? (
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-400 text-sm">Upload Cover</span>
                      <span className="text-gray-500 text-xs mt-1">Max 10MB, compressed to 1MB</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'cover');
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Gallery Management */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Gallery ({venue.gallery?.length || 0} photos)
            </h3>

            {/* Upload Button */}
            <label className={`flex flex-col items-center justify-center aspect-video border-2 border-dashed rounded-xl mb-4 transition-colors ${
              uploadingGallery
                ? 'border-cyan-500/50 cursor-wait'
                : 'border-white/20 cursor-pointer hover:border-cyan-500/50'
            }`}>
              {uploadingGallery ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mb-2" />
                  <span className="text-gray-400 text-sm">
                    {uploadProgress
                      ? `Uploading ${uploadProgress.current}/${uploadProgress.total}...`
                      : 'Uploading...'}
                  </span>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-400 text-sm">Add Gallery Photos</span>
                  <span className="text-gray-500 text-xs mt-1">Select multiple files • Max 10MB each</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                disabled={uploadingGallery}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    if (files.length === 1) {
                      handleGalleryUpload(files[0]);
                    } else {
                      handleMultipleGalleryUpload(files);
                    }
                    e.target.value = ''; // Reset input
                  }
                }}
              />
            </label>

            {/* Existing Gallery Photos */}
            {venue.gallery && venue.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {venue.gallery.map((photoUrl, index) => {
                  // Add cache buster for newly uploaded images to force refresh
                  const uploadTimestamp = newlyUploadedUrls.get(photoUrl);
                  const isNewlyUploaded = uploadTimestamp !== undefined;
                  const displayUrl = isNewlyUploaded
                    ? `${photoUrl}${photoUrl.includes('?') ? '&' : '?'}t=${uploadTimestamp}`
                    : photoUrl;
                  return (
                  <div
                    key={isNewlyUploaded ? `${photoUrl}-${uploadTimestamp}` : photoUrl}
                    className="relative aspect-square rounded-lg overflow-hidden group"
                  >
                    {/* Use native img for newly uploaded to completely bypass Next.js caching */}
                    {isNewlyUploaded ? (
                      <img
                        src={displayUrl}
                        alt={`Gallery photo ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={displayUrl}
                        alt={`Gallery photo ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                    {/* Delete overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteGalleryPhoto(photoUrl)}
                        disabled={deletingGalleryPhoto === photoUrl}
                        className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
                        title="Delete photo"
                      >
                        {deletingGalleryPhoto === photoUrl ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Visibility Control */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Visibility</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {formData.is_hidden ? (
                  <EyeOff className="w-5 h-5 text-purple-400" />
                ) : (
                  <Eye className="w-5 h-5 text-green-400" />
                )}
                <div>
                  <p className="text-white font-medium">
                    {formData.is_hidden ? 'Hidden' : 'Visible'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formData.is_hidden
                      ? 'Venue is hidden from public pages'
                      : 'Venue is visible to the public'
                    }
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, is_hidden: !prev.is_hidden }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.is_hidden ? 'bg-purple-500' : 'bg-green-500'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.is_hidden ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Hidden venues won&apos;t appear in search results, listings, or the homepage.
              Remember to click &quot;Save Changes&quot; to apply.
            </p>
          </div>

          {/* Stats */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <Eye className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">{venue.view_count.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Views</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <Star className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">{venue.like_count}</p>
                <p className="text-xs text-gray-400">Likes</p>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">Status</p>
                <p className="text-white capitalize">{venue.status}</p>
              </div>
              {venue.rejection_reason && (
                <div>
                  <p className="text-gray-400">Rejection Reason</p>
                  <p className="text-red-400">{venue.rejection_reason}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400">Created</p>
                <p className="text-white">{new Date(venue.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Last Updated</p>
                <p className="text-white">{new Date(venue.updated_at).toLocaleDateString()}</p>
              </div>
              {venue.approved_at && (
                <div>
                  <p className="text-gray-400">Approved</p>
                  <p className="text-white">{new Date(venue.approved_at).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#1A1A2E] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Delete Venue</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete &quot;{venue.name}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#1A1A2E] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Reject Venue</h3>
            <p className="text-gray-400 mb-4">
              Please provide a reason for rejecting this venue. This will be sent to the venue owner.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 resize-none"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={saving}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Reject Venue'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
