import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import type { VenueSubmission } from '@/types/database';

interface JWTPayload {
  userId: string;
  role: 'admin' | 'venue_owner';
}

// Verify admin authentication
async function verifyAdmin(): Promise<{ userId: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JWTPayload;

    if (decoded.role !== 'admin') {
      return null;
    }

    return { userId: decoded.userId };
  } catch {
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

// GET - Get a single submission
export async function GET(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();

    const { data: submission, error } = await supabase
      .from('venue_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ submission });
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update a submission (approve/reject)
export async function PATCH(request: NextRequest, { params }: PageProps) {
  try {
    // Verify admin authentication
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, admin_notes } = body;

    // Validate status
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be pending, approved, or rejected' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Get the submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error: fetchError } = await (supabase
      .from('venue_submissions') as any)
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !data) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    const submission = data as VenueSubmission;

    // If approving, create the venue
    let venueId: string | null = null;
    if (status === 'approved' && submission.status !== 'approved') {
      // Generate slug from venue name
      const slug = submission.venue_name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Check if slug exists
      const { data: existingVenue } = await supabase
        .from('venues')
        .select('id')
        .eq('slug', slug)
        .single();

      const finalSlug = existingVenue ? `${slug}-${Date.now().toString(36)}` : slug;

      // Create the venue
      const venueData = {
        name: submission.venue_name,
        slug: finalSlug,
        description: submission.description,
        category: submission.category,
        address: submission.address,
        area: submission.area || 'Manama',
        phone: submission.phone,
        instagram: submission.instagram,
        website: submission.website,
        google_maps_url: submission.google_maps_url,
        status: 'approved',
        is_verified: false,
        is_featured: false,
        view_count: 0,
        like_count: 0,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: newVenue, error: venueError } = await supabase
        .from('venues')
        .insert(venueData as any)
        .select()
        .single();

      if (venueError) {
        console.error('Error creating venue from submission:', venueError);
        return NextResponse.json(
          { error: 'Failed to create venue' },
          { status: 500 }
        );
      }

      venueId = (newVenue as { id: string }).id;

      // If submission has an Instagram reel URL, create entry in venue_reels table
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const instagramReelUrl = (submission as any).instagram_reel_url;
      if (instagramReelUrl && venueId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: reelError } = await (supabase
          .from('venue_reels') as any)
          .insert({
            venue_id: venueId,
            instagram_url: instagramReelUrl,
            display_order: 0,
            is_active: true,
          });

        if (reelError) {
          console.error('Error creating venue reel from submission:', reelError);
          // Don't fail the whole approval if reel creation fails
        } else {
          // Also set as featured reel on the venue
          await (supabase
            .from('venues') as any)
            .update({ featured_reel_url: instagramReelUrl })
            .eq('id', venueId);
        }
      }
    }

    // Update the submission
    const updateData = {
      status,
      admin_notes: admin_notes || null,
      reviewed_by: admin.userId,
      reviewed_at: new Date().toISOString(),
      venue_id: venueId,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: updatedSubmission, error: updateError } = await (supabase
      .from('venue_submissions') as any)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating submission:', updateError);
      return NextResponse.json(
        { error: 'Failed to update submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: status === 'approved' ? 'Submission approved and venue created' : `Submission ${status}`,
      submission: updatedSubmission,
      venue_id: venueId,
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a submission
export async function DELETE(request: NextRequest, { params }: PageProps) {
  try {
    // Verify admin authentication
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const supabase = getAdminClient();

    const { error } = await supabase
      .from('venue_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting submission:', error);
      return NextResponse.json(
        { error: 'Failed to delete submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
