import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAdminClient } from '@/lib/supabase/server';
import { sendVenueRegistrationEmail } from '@/lib/email';
import { extractCoordinatesFromGoogleMapsUrl } from '@/lib/utils';
import bcrypt from 'bcryptjs';

// Create Supabase admin client for auth operations
function getSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

function generateSlug(name: string): string {
  // Transliterate common accented characters to ASCII
  const transliterations: Record<string, string> = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae',
    'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y',
    'ß': 'ss', 'œ': 'oe',
  };

  let slug = name.toLowerCase();

  // Apply transliterations
  for (const [char, replacement] of Object.entries(transliterations)) {
    slug = slug.replace(new RegExp(char, 'g'), replacement);
  }

  // Remove remaining non-alphanumeric characters (except spaces and hyphens)
  slug = slug
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // If slug is empty after all processing, generate a fallback
  if (!slug) {
    slug = 'venue-' + Date.now().toString(36);
  }

  return slug;
}

interface RegisterData {
  venueName: string;
  crNumber: string;
  category: string;
  area: string;
  address: string;
  googleMapsUrl?: string | null;
  phone: string;
  email: string;
  password: string;
  website?: string | null;
  instagram?: string | null;
  youtubeUrl?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  coverImageUrl?: string | null;
  galleryUrls?: string[] | null;
}

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body (images already uploaded directly to S3)
    const body: RegisterData = await request.json();

    // Extract fields from JSON
    const {
      venueName,
      crNumber,
      category,
      area,
      address,
      googleMapsUrl,
      phone,
      email,
      password,
      website,
      instagram,
      youtubeUrl,
      description,
      logoUrl,
      coverImageUrl,
      galleryUrls
    } = body;

    // Validate required fields
    if (!venueName || !crNumber || !category || !area || !address || !phone || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Get Supabase admin client for auth operations
    const supabaseAuth = getSupabaseAdminClient();

    // Check if email already exists in venues table
    const { data: existingVenueByEmail } = await supabase
      .from('venues')
      .select('id, name')
      .eq('email', email.toLowerCase())
      .single();

    if (existingVenueByEmail) {
      return NextResponse.json(
        { error: 'A venue with this email already exists. Please use a different email or login instead.' },
        { status: 400 }
      );
    }

    // Check if email already exists in Supabase Auth
    const { data: existingUsers } = await supabaseAuth.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email?.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please login instead.' },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = generateSlug(venueName);
    const { data: existingVenue } = await supabase
      .from('venues')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingVenue) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // Images are already uploaded directly to S3 via presigned URLs
    // logoUrl and coverImageUrl are passed from the frontend

    // Create user account using Supabase Auth
    const { data: authData, error: authError } = await supabaseAuth.auth.admin.createUser({
      email: email.toLowerCase(),
      password: password,
      email_confirm: true, // Auto-confirm email for venue registrations
      user_metadata: {
        role: 'venue_owner',
        venue_name: venueName,
      },
    });

    if (authError || !authData.user) {
      console.error('Error creating auth user:', authError);
      return NextResponse.json(
        { error: 'Failed to create user account', details: authError?.message || 'Unknown error' },
        { status: 500 }
      );
    }

    const authUser = authData.user;

    // Create profile in profiles table (for role/status management)
    // This might fail if profiles table doesn't exist or has different schema
    try {
      await supabase
        .from('profiles')
        .upsert({
          id: authUser.id,
          email: authUser.email,
        } as any, { onConflict: 'id' });
    } catch (profileErr) {
      console.log('Profile creation skipped (table may not exist):', profileErr);
    }

    // Hash the password for venue portal login
    const passwordHash = await bcrypt.hash(password, 12);

    // Extract coordinates from Google Maps URL if provided
    let latitude: number | null = null;
    let longitude: number | null = null;
    if (googleMapsUrl) {
      const coords = extractCoordinatesFromGoogleMapsUrl(googleMapsUrl);
      if (coords) {
        latitude = coords.latitude;
        longitude = coords.longitude;
      }
    }

    // Create venue in database
    // Note: owner_id is set to null for now since the foreign key references 'users' table
    // which uses a different auth system. The venue email can be used to link them later.
    const venueData = {
      owner_id: null, // Will be linked when admin system is unified
      name: venueName,
      slug,
      cr_number: crNumber,
      description: description || null,
      category,
      area,
      address,
      google_maps_url: googleMapsUrl || null,
      latitude, // Auto-extracted from Google Maps URL
      longitude, // Auto-extracted from Google Maps URL
      phone,
      email: email.toLowerCase(),
      password_hash: passwordHash, // Store hashed password for venue portal login
      website: website || null,
      instagram: instagram || null,
      youtube_url: youtubeUrl || null,
      logo_url: logoUrl,
      cover_image_url: coverImageUrl,
      gallery: galleryUrls || null, // Gallery images uploaded during registration
      status: 'pending', // All registrations start as pending for admin approval
      is_verified: false,
      is_featured: false,
      view_count: 0,
      like_count: 0,
    };

    const { data: venue, error: insertError } = await supabase
      .from('venues')
      .insert(venueData as any)
      .select()
      .single();

    if (insertError) {
      console.error('Error creating venue:', insertError);
      // Clean up: delete the auth user we just created
      try {
        await supabase.from('profiles').delete().eq('id', authUser.id);
      } catch (e) {
        // Profile cleanup is optional
      }
      await supabaseAuth.auth.admin.deleteUser(authUser.id);
      return NextResponse.json(
        { error: 'Failed to create venue registration', details: insertError.message },
        { status: 500 }
      );
    }

    const venueResult = venue as { id: string; name: string; slug: string; status: string };

    // Send registration confirmation email
    let emailSent = false;
    try {
      const emailResult = await sendVenueRegistrationEmail(email, venueName);
      emailSent = emailResult.success;
      if (!emailResult.success) {
        console.error('Failed to send registration email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Error sending registration email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Venue registration submitted successfully',
      venue: {
        id: venueResult.id,
        name: venueResult.name,
        slug: venueResult.slug,
        status: venueResult.status,
      },
      emailSent,
    });
  } catch (error) {
    console.error('Error in venue registration:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to register a venue',
    required_fields: ['venueName', 'crNumber', 'category', 'area', 'address', 'phone', 'email', 'password'],
    optional_fields: ['website', 'instagram', 'youtubeUrl', 'description', 'googleMapsUrl', 'logo', 'coverImage'],
  });
}
