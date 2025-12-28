import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { EventInsert } from '@/types/database';

export const dynamic = 'force-dynamic';

// Simple in-memory rate limiting
const submitAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_SUBMITS_PER_HOUR = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = submitAttempts.get(ip);

  if (!entry || now > entry.resetTime) {
    submitAttempts.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour
    return true;
  }

  if (entry.count >= MAX_SUBMITS_PER_HOUR) {
    return false;
  }

  entry.count++;
  return true;
}

// Generate a URL-friendly slug from title
function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const timestamp = Date.now().toString(36);
  return `${base}-${timestamp}`;
}

// Sanitize input to prevent XSS
function sanitize(str: string | undefined | null): string | null {
  if (!str) return null;
  return str
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"]/g, ''); // Remove special characters
}

/**
 * Public event submission endpoint
 * Creates a new event with 'pending' status
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submission attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'category', 'venueName', 'date', 'time', 'contactName', 'contactEmail'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.contactEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const eventDate = new Date(body.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      return NextResponse.json(
        { error: 'Event date must be in the future' },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = generateSlug(body.title);

    // Prepare event data
    const eventData: EventInsert = {
      title: sanitize(body.title) || '',
      slug,
      description: sanitize(body.description) || 'No description provided',
      category: sanitize(body.category) || 'other',
      start_date: body.date,
      start_time: body.time,
      venue_name: sanitize(body.venueName) || '',
      contact_name: sanitize(body.contactName) || '',
      contact_email: sanitize(body.contactEmail) || '',
      contact_phone: sanitize(body.contactPhone),
      featured_image: body.coverUrl || null,
      price_type: body.price ? 'paid' : 'free',
      booking_method: body.price || 'Free',
      status: 'pending',
      is_featured: false,
      view_count: 0,
    };

    // Insert into database
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to submit event. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Event submitted successfully! It will be reviewed within 24 hours.',
      eventId: data.id,
    });
  } catch (error) {
    console.error('Event submission error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Submission failed' },
      { status: 500 }
    );
  }
}
