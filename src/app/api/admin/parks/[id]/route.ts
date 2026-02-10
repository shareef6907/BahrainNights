import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/admin/parks/[id] - Get single park
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { data: park, error } = await supabaseAdmin
      .from('parks')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !park) {
      return NextResponse.json({ error: 'Park not found' }, { status: 404 });
    }

    return NextResponse.json({ park });
  } catch (error) {
    console.error('Error fetching park:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/parks/[id] - Update park
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const {
      name,
      name_arabic,
      latitude,
      longitude,
      address,
      governorate,
      rating,
      total_reviews,
      opening_hours,
      features,
      description,
      is_verified,
      is_active,
      image_url,
    } = body;

    // Generate Google Maps URL if name changes
    const google_maps_url = name 
      ? `https://www.google.com/maps/search/${encodeURIComponent(name + ' Bahrain')}`
      : undefined;

    const updateData: Record<string, any> = {};
    
    if (name !== undefined) updateData.name = name;
    if (name_arabic !== undefined) updateData.name_arabic = name_arabic;
    if (latitude !== undefined) updateData.latitude = parseFloat(latitude);
    if (longitude !== undefined) updateData.longitude = parseFloat(longitude);
    if (address !== undefined) updateData.address = address;
    if (governorate !== undefined) updateData.governorate = governorate;
    if (rating !== undefined) updateData.rating = rating ? parseFloat(rating) : null;
    if (total_reviews !== undefined) updateData.total_reviews = parseInt(total_reviews) || 0;
    if (opening_hours !== undefined) updateData.opening_hours = opening_hours;
    if (features !== undefined) updateData.features = features;
    if (description !== undefined) updateData.description = description;
    if (is_verified !== undefined) updateData.is_verified = is_verified;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (google_maps_url) updateData.google_maps_url = google_maps_url;

    const { data: park, error } = await supabaseAdmin
      .from('parks')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating park:', error);
      return NextResponse.json({ error: 'Failed to update park' }, { status: 500 });
    }

    return NextResponse.json({ park });
  } catch (error) {
    console.error('Error in update park API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/parks/[id] - Soft delete park
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Soft delete - set is_active to false
    const { error } = await supabaseAdmin
      .from('parks')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting park:', error);
      return NextResponse.json({ error: 'Failed to delete park' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete park API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
