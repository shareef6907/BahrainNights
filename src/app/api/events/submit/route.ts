import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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
  const transliterations: Record<string, string> = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae',
    'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y',
    'ß': 'ss', 'œ': 'oe',
  };

  let base = title.toLowerCase();
  for (const [char, replacement] of Object.entries(transliterations)) {
    base = base.replace(new RegExp(char, 'g'), replacement);
  }

  base = base
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const timestamp = Date.now().toString(36);
  return base ? `${base}-${timestamp}` : `event-${timestamp}`;
}

// Sanitize input to prevent XSS
function sanitize(str: string | undefined | null): string | null {
  if (!str) return null;
  return str
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'\"]/g, ''); // Remove special characters
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

    // Prepare event data - ONLY use columns that exist in the database
    // Actual columns: id, title, slug, description, category, venue_name, venue_address,
    // venue_lat, venue_lng, venue_place_id, date, time, end_date, end_time, price,
    // cover_url, gallery_urls, contact_name, contact_email, contact_phone, status,
    // is_featured, views, created_at, updated_at, booking_method, featured_image,
    // booking_url, booking_link, image_url, thumbnail, banner_url
    const eventData = {
      title: sanitize(body.title) || '',
      slug,
      description: sanitize(body.description) || 'No description provided',
      category: sanitize(body.category) || 'other',
      date: body.date,
      time: body.time,
      end_date: body.endDate || null,
      end_time: body.endTime || null,
      venue_name: sanitize(body.venueName) || '',
      venue_address: sanitize(body.venueAddress) || null,
      venue_lat: body.venueLat || null,
      venue_lng: body.venueLng || null,
      venue_place_id: body.venuePlaceId || null,
      contact_name: sanitize(body.contactName) || '',
      contact_email: sanitize(body.contactEmail) || '',
      contact_phone: sanitize(body.contactPhone) || null,
      cover_url: body.coverUrl || null,
      featured_image: body.coverUrl || null,
      price: body.price || 'Free',
      booking_method: body.price || 'Free',
      status: 'pending',
      is_featured: false,
      views: 0,
    };

    // Insert into database using admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from('events')
      .insert(eventData)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to submit event. Please try again. Error: ' + error.message },
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
