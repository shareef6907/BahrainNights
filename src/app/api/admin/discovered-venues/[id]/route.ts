import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import type { DiscoveredVenue } from '@/types/database';

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

// GET - Get a single discovered venue
export async function GET(request: NextRequest, { params }: PageProps) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const supabase = getAdminClient();

    const { data: venue, error } = await supabase
      .from('discovered_venues')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !venue) {
      return NextResponse.json(
        { error: 'Discovered venue not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ venue });
  } catch (error) {
    console.error('Error fetching discovered venue:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update a discovered venue (approve/reject)
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

    // Get the discovered venue
    const { data, error: fetchError } = await supabase
      .from('discovered_venues')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !data) {
      return NextResponse.json(
        { error: 'Discovered venue not found' },
        { status: 404 }
      );
    }

    const discoveredVenue = data as DiscoveredVenue;

    // If approving, create the venue
    let venueId: string | null = null;
    if (status === 'approved' && discoveredVenue.status !== 'approved') {
      // Generate slug from venue name
      const slug = discoveredVenue.name
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

      // Determine area from address
      const address = discoveredVenue.address || '';
      let area = 'Manama';
      const areaKeywords = ['Seef', 'Juffair', 'Adliya', 'Amwaj', 'Riffa', 'Muharraq', 'Manama'];
      for (const keyword of areaKeywords) {
        if (address.toLowerCase().includes(keyword.toLowerCase())) {
          area = keyword;
          break;
        }
      }

      // Create the venue
      const venueCategory = discoveredVenue.category || 'restaurant';
      const venueData = {
        name: discoveredVenue.name,
        slug: finalSlug,
        description: `Discover ${discoveredVenue.name}, a ${venueCategory} located in ${area}, Bahrain.`,
        category: venueCategory,
        address: discoveredVenue.address || area,
        area: area,
        phone: discoveredVenue.phone,
        website: discoveredVenue.website,
        google_maps_url: discoveredVenue.google_maps_url,
        latitude: discoveredVenue.latitude,
        longitude: discoveredVenue.longitude,
        tags: discoveredVenue.suggested_tags,
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
        console.error('Error creating venue from discovered venue:', venueError);
        return NextResponse.json(
          { error: 'Failed to create venue' },
          { status: 500 }
        );
      }

      venueId = (newVenue as { id: string }).id;
    }

    // Update the discovered venue
    const updateData = {
      status,
      admin_notes: admin_notes || null,
      reviewed_by: admin.userId,
      reviewed_at: new Date().toISOString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: updatedVenue, error: updateError } = await (supabase
      .from('discovered_venues') as any)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating discovered venue:', updateError);
      return NextResponse.json(
        { error: 'Failed to update discovered venue' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: status === 'approved' ? 'Venue approved and created' : `Venue ${status}`,
      venue: updatedVenue,
      venue_id: venueId,
    });
  } catch (error) {
    console.error('Error updating discovered venue:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a discovered venue
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
      .from('discovered_venues')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting discovered venue:', error);
      return NextResponse.json(
        { error: 'Failed to delete discovered venue' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Discovered venue deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting discovered venue:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
