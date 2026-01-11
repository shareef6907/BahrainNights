import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getAdminClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface ChangeRequest {
  id: string;
  venue_id: string;
  changes: Record<string, unknown>;
  status: string;
}

interface VenueSlug {
  slug: string;
}

// Approve a venue change request
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await context.params;
    const supabase = getAdminClient();

    // Get the change request
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: changeRequest, error: fetchError } = await (supabase
      .from('venue_change_requests') as any)
      .select('*')
      .eq('id', id)
      .single();

    const request_data = changeRequest as ChangeRequest | null;

    if (fetchError || !request_data) {
      return NextResponse.json(
        { error: 'Change request not found' },
        { status: 404 }
      );
    }

    if (request_data.status !== 'pending') {
      return NextResponse.json(
        { error: 'This request has already been processed' },
        { status: 400 }
      );
    }

    // Valid venue columns that can be updated
    // Must match actual database column names exactly (from database.ts)
    const validVenueColumns = [
      'description',
      'description_ar',
      'phone',
      'address',
      'area',
      'opening_hours',
      'instagram',
      'website',
      'whatsapp',
      'facebook',
      'tiktok',
      'twitter',
      'cuisine_types', // plural - database column name
      'subcategories',
      'features',
      'logo_url',
      'cover_image_url',
      'gallery',
      'latitude',
      'longitude',
      'google_maps_url',
      'price_range',
      'avg_cost_per_person',
      'youtube_url',
    ];

    // Filter changes to only include valid columns
    const filteredChanges: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(request_data.changes)) {
      if (validVenueColumns.includes(key)) {
        filteredChanges[key] = value;
      }
    }

    // Skip update if no valid changes
    if (Object.keys(filteredChanges).length === 0) {
      return NextResponse.json(
        { error: 'No valid changes to apply' },
        { status: 400 }
      );
    }

    // Apply the filtered changes to the venue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateVenueError } = await (supabase
      .from('venues') as any)
      .update(filteredChanges)
      .eq('id', request_data.venue_id);

    if (updateVenueError) {
      console.error('Error updating venue:', updateVenueError);
      return NextResponse.json(
        { error: 'Failed to apply changes to venue' },
        { status: 500 }
      );
    }

    // Update the change request status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: updatedRequest, error: updateError } = await (supabase
      .from('venue_change_requests') as any)
      .update({
        status: 'approved',
        reviewed_by: user.userId,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating change request:', updateError);
      return NextResponse.json(
        { error: 'Failed to update change request status' },
        { status: 500 }
      );
    }

    // Revalidate the venue's public page to clear cache
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: venueSlugData } = await (supabase
      .from('venues') as any)
      .select('slug')
      .eq('id', request_data.venue_id)
      .single();

    const venueSlug = (venueSlugData as VenueSlug | null)?.slug;
    if (venueSlug) {
      // Revalidate the specific venue page with layout
      revalidatePath(`/places/${venueSlug}`, 'page');
      revalidatePath(`/places/${venueSlug}`, 'layout');
      // Also revalidate the places listing page
      revalidatePath('/places', 'page');
      console.log(`[Venue Approval] Revalidated cache for venue: ${venueSlug}`);
      console.log(`[Venue Approval] Changes applied:`, Object.keys(filteredChanges).join(', '));
    }

    return NextResponse.json({
      success: true,
      message: 'Profile changes approved and applied successfully',
      request: updatedRequest,
    });
  } catch (error) {
    console.error('Error approving change request:', error);
    return NextResponse.json(
      { error: 'Failed to approve change request' },
      { status: 500 }
    );
  }
}
