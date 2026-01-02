import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

interface VenueRecord {
  id: string;
  name: string;
  slug: string;
  email: string;
  password_hash: string | null;
  status: string;
  logo_url: string | null;
}

const VENUE_SESSION_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'venue-portal-secret-key-min-32-chars!'
);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Find venue by email
    const { data, error } = await supabase
      .from('venues')
      .select('id, name, slug, email, password_hash, status, logo_url')
      .eq('email', email.toLowerCase())
      .single();

    const venue = data as VenueRecord | null;

    if (error || !venue) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check venue status
    if (venue.status === 'pending') {
      return NextResponse.json(
        { error: 'Your venue registration is pending approval. Please wait for our team to review your submission.' },
        { status: 403 }
      );
    }

    if (venue.status === 'rejected') {
      return NextResponse.json(
        { error: 'Your venue registration was not approved. Please contact support for more information.' },
        { status: 403 }
      );
    }

    if (venue.status !== 'approved') {
      return NextResponse.json(
        { error: 'Your venue is not active. Please contact support.' },
        { status: 403 }
      );
    }

    // Verify password
    if (!venue.password_hash) {
      return NextResponse.json(
        { error: 'Account not set up properly. Please contact support.' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, venue.password_hash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await new SignJWT({
      venueId: venue.id,
      venueName: venue.name,
      venueSlug: venue.slug,
      email: venue.email,
      type: 'venue',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(VENUE_SESSION_SECRET);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('venue_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      venue: {
        id: venue.id,
        name: venue.name,
        slug: venue.slug,
        email: venue.email,
        logo_url: venue.logo_url,
      },
    });
  } catch (error) {
    console.error('Venue login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
