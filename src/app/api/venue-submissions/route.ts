import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

// POST - Create a new venue submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      venue_name,
      category,
      description,
      address,
      area,
      phone,
      instagram,
      instagram_reel_url,
      website,
      google_maps_url,
      submitter_name,
      submitter_email,
      submitter_phone,
      is_owner,
      terms_accepted,
      content_guidelines_accepted,
    } = body;

    // Validate required fields
    if (!venue_name || !category || !submitter_email) {
      return NextResponse.json(
        { error: 'Missing required fields: venue_name, category, and submitter_email are required' },
        { status: 400 }
      );
    }

    // Validate terms acceptance
    if (!terms_accepted || !content_guidelines_accepted) {
      return NextResponse.json(
        { error: 'You must accept the Terms & Conditions and Content Guidelines to submit' },
        { status: 400 }
      );
    }

    // Capture IP address and user agent for legal records
    const forwarded = request.headers.get('x-forwarded-for');
    const ip_address = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submitter_email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Check for duplicate submissions (same venue name from same email in last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingSubmission } = await (supabase
      .from('venue_submissions') as any)
      .select('id')
      .eq('venue_name', venue_name)
      .eq('submitter_email', submitter_email.toLowerCase())
      .gte('created_at', yesterday.toISOString())
      .single();

    if (existingSubmission) {
      return NextResponse.json(
        { error: 'You have already submitted this venue recently. Please wait before submitting again.' },
        { status: 400 }
      );
    }

    // Insert the submission
    const submissionData = {
      venue_name: venue_name.trim(),
      category,
      description: description?.trim() || null,
      address: address?.trim() || null,
      area: area || null,
      phone: phone?.trim() || null,
      instagram: instagram?.trim()?.replace('@', '') || null,
      instagram_reel_url: instagram_reel_url?.trim() || null,
      website: website?.trim() || null,
      google_maps_url: google_maps_url?.trim() || null,
      submitter_name: submitter_name?.trim() || null,
      submitter_email: submitter_email.toLowerCase().trim(),
      submitter_phone: submitter_phone?.trim() || null,
      is_owner: is_owner || false,
      status: 'pending',
      terms_accepted: true,
      terms_accepted_at: new Date().toISOString(),
      content_guidelines_accepted: true,
      ip_address,
      user_agent,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: submission, error } = await (supabase
      .from('venue_submissions') as any)
      .insert(submissionData)
      .select()
      .single();

    if (error) {
      console.error('Error creating venue submission:', error);
      return NextResponse.json(
        { error: 'Failed to submit venue suggestion' },
        { status: 500 }
      );
    }

    const submissionResult = submission as { id: string; venue_name: string; status: string };

    return NextResponse.json({
      success: true,
      message: 'Venue suggestion submitted successfully',
      submission: {
        id: submissionResult.id,
        venue_name: submissionResult.venue_name,
        status: submissionResult.status,
      },
    });
  } catch (error) {
    console.error('Error in venue submission API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get submissions (admin only, but for now we'll check later)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = getAdminClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase
      .from('venue_submissions') as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: submissions, error } = await query;

    if (error) {
      console.error('Error fetching venue submissions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }

    // Get total count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count } = await (supabase
      .from('venue_submissions') as any)
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      submissions: submissions || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error in venue submissions GET API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
