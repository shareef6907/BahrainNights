'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import EventForm, { EventFormData } from '@/components/dashboard/EventForm';

// Mock data for events - in production, this would come from an API
const mockEvents: Record<string, Partial<EventFormData>> = {
  '1': {
    title: 'Live Jazz Night',
    description:
      'Join us for an unforgettable evening of smooth jazz featuring local and international artists. Enjoy premium cocktails and gourmet appetizers while experiencing the finest live music in Bahrain.',
    category: 'Live Music',
    tags: 'jazz, live music, cocktails, lounge',
    startDate: '2025-12-28',
    startTime: '20:00',
    endTime: '23:00',
    priceType: 'paid',
    price: '25',
    bookingMethod: 'website',
    bookingUrl: 'https://example.com/book',
    featuredImage:
      'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1920&h=1080&fit=crop',
    ageRestriction: '21+',
    dressCode: 'Smart casual',
  },
  '2': {
    title: 'NYE Countdown Party',
    description:
      'Ring in 2026 with the ultimate New Year\'s Eve celebration! Live DJ, champagne toast at midnight, and a spectacular fireworks view.',
    category: 'Nightlife',
    tags: 'new year, party, celebration, countdown',
    startDate: '2025-12-31',
    startTime: '21:00',
    endDate: '2026-01-01',
    endTime: '03:00',
    priceType: 'range',
    priceMin: '50',
    priceMax: '150',
    bookingMethod: 'website',
    bookingUrl: 'https://example.com/nye',
    featuredImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=1080&fit=crop',
    ageRestriction: '21+',
    dressCode: 'Elegant',
  },
  '3': {
    title: 'Wine Tasting Evening',
    description:
      'Discover exquisite wines from around the world with our expert sommelier. Includes cheese pairing and light bites.',
    category: 'Dining',
    tags: 'wine, tasting, dining, gourmet',
    startDate: '2026-01-03',
    startTime: '19:00',
    endTime: '22:00',
    priceType: 'paid',
    price: '35',
    bookingMethod: 'phone',
    featuredImage:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&h=1080&fit=crop',
    ageRestriction: '21+',
  },
};

export default function EditEventPage() {
  const params = useParams();
  const eventId = params?.id as string | undefined;

  // In production, this would be fetched from an API
  const eventData = eventId ? mockEvents[eventId] : undefined;
  const isLoading = false; // Would be true while fetching

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">Event not found</h2>
        <p className="text-gray-400 mb-4">
          The event you&apos;re looking for doesn&apos;t exist or has been deleted.
        </p>
        <Link
          href="/dashboard/events"
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
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
          href="/dashboard/events"
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Event</h1>
          <p className="text-gray-400 mt-1">Update your event details</p>
        </div>
      </motion.div>

      {/* Form */}
      <EventForm initialData={eventData} isEditing />
    </div>
  );
}
