import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/guides - Get list of local guides
 * POST /api/guides - Submit guide application
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const language = searchParams.get('language');
    const area = searchParams.get('area');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const verified = searchParams.get('verified');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
      .from('local_guides')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('rating', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1);

    // Filter by specialty
    if (specialty && specialty !== 'all') {
      query = query.contains('specialties', [specialty]);
    }

    // Filter by language
    if (language && language !== 'all') {
      query = query.contains('languages', [language]);
    }

    // Filter by area
    if (area && area !== 'all') {
      query = query.contains('areas', [area]);
    }

    // Filter featured
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    // Filter verified
    if (verified === 'true') {
      query = query.eq('is_verified', true);
    }

    // Search
    if (search) {
      query = query.or(`name.ilike.%${search}%,bio.ilike.%${search}%,tagline.ilike.%${search}%`);
    }

    const { data: guides, error, count } = await query;

    if (error) {
      console.error('Guides fetch error:', error);
      return NextResponse.json({
        guides: [],
        total: 0,
        error: error.message,
      });
    }

    // Transform for frontend
    const transformedGuides = (guides || []).map(guide => ({
      id: guide.id,
      name: guide.name,
      slug: guide.slug,
      bio: guide.bio || '',
      tagline: guide.tagline || '',
      profileImage: guide.profile_image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      coverImage: guide.cover_image,
      languages: guide.languages || ['English'],
      specialties: guide.specialties || [],
      areas: guide.areas || [],
      yearsExperience: guide.years_experience || 0,
      availableDays: guide.available_days || [],
      tourTypes: guide.tour_types || [],
      hourlyRate: guide.hourly_rate,
      halfDayRate: guide.half_day_rate,
      fullDayRate: guide.full_day_rate,
      currency: guide.currency || 'BHD',
      isVerified: guide.is_verified,
      idVerified: guide.id_verified,
      rating: guide.rating,
      reviewCount: guide.review_count || 0,
      isFeatured: guide.is_featured,
      lastActive: guide.last_active,
    }));

    return NextResponse.json({
      guides: transformedGuides,
      total: count || transformedGuides.length,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Guides API error:', error);
    return NextResponse.json({
      guides: [],
      total: 0,
      error: 'Server error',
    });
  }
}

/**
 * POST /api/guides - Submit guide application
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for existing application with same email
    const { data: existing } = await supabaseAdmin
      .from('guide_applications')
      .select('id, status')
      .eq('email', body.email)
      .single();

    if (existing) {
      if (existing.status === 'pending') {
        return NextResponse.json(
          { error: 'An application with this email is already pending review' },
          { status: 409 }
        );
      }
      if (existing.status === 'approved') {
        return NextResponse.json(
          { error: 'An application with this email has already been approved' },
          { status: 409 }
        );
      }
    }

    // Create application
    const { data: application, error } = await supabaseAdmin
      .from('guide_applications')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        whatsapp: body.whatsapp || body.phone,
        languages: body.languages || ['English'],
        specialties: body.specialties || [],
        experience: body.experience || '',
        bio: body.bio || '',
        status: 'pending',
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Guide application error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully! We will review your application and get back to you within 2-3 business days.',
      applicationId: application.id,
    });
  } catch (error) {
    console.error('Guide application error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
