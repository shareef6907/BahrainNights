'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import EventForm, { EventFormData } from '@/components/dashboard/EventForm';

interface ApiEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  start_date: string;
  start_time: string;
  end_date: string | null;
  end_time: string | null;
  is_recurring: boolean;
  recurrence_pattern: string | null;
  recurrence_days: string[] | null;
  price: string | null;
  booking_url: string | null;
  featured_image: string;
  gallery: string[] | null;
  age_restriction: string | null;
  dress_code: string | null;
  special_instructions: string | null;
  status: string;
}

function parsePrice(priceRange: string | null): {
  priceType: 'free' | 'paid' | 'range';
  price: string;
  priceMin: string;
  priceMax: string;
} {
  if (!priceRange || priceRange.toLowerCase() === 'free') {
    return { priceType: 'free', price: '', priceMin: '', priceMax: '' };
  }

  // Check for range: "BD 15 - 50"
  const rangeMatch = priceRange.match(/BD\s*(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/i);
  if (rangeMatch) {
    return {
      priceType: 'range',
      price: '',
      priceMin: rangeMatch[1],
      priceMax: rangeMatch[2],
    };
  }

  // Single price: "BD 25"
  const singleMatch = priceRange.match(/BD\s*(\d+(?:\.\d+)?)/i);
  if (singleMatch) {
    return {
      priceType: 'paid',
      price: singleMatch[1],
      priceMin: '',
      priceMax: '',
    };
  }

  return { priceType: 'free', price: '', priceMin: '', priceMax: '' };
}

function transformEventToFormData(event: ApiEvent): Partial<EventFormData> {
  const priceData = parsePrice(event.price);

  return {
    title: event.title,
    description: event.description,
    category: event.category,
    tags: event.tags?.join(', ') || '',
    startDate: event.start_date,
    startTime: event.start_time,
    endDate: event.end_date || '',
    endTime: event.end_time || '',
    isRecurring: event.is_recurring || false,
    recurringPattern: event.recurrence_pattern || 'weekly',
    recurringDays: event.recurrence_days || [],
    ...priceData,
    bookingUrl: event.booking_url || '',
    bookingMethod: event.booking_url ? 'website' : 'none',
    featuredImage: event.featured_image || '',
    galleryImages: event.gallery || [],
    ageRestriction: event.age_restriction || 'all',
    dressCode: event.dress_code || '',
    specialInstructions: event.special_instructions || '',
  };
}

export default function EditEventPage() {
  const params = useParams();
  const eventId = params?.id as string | undefined;

  const [eventData, setEventData] = useState<Partial<EventFormData> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      if (!eventId) {
        setError('Event ID not provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/dashboard/events/${eventId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch event');
        }

        const formData = transformEventToFormData(data.event);
        setEventData(formData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">Event not found</h2>
        <p className="text-gray-400 mb-4">
          {error || "The event you're looking for doesn't exist or has been deleted."}
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
      <EventForm initialData={eventData} isEditing eventId={eventId} />
    </div>
  );
}
