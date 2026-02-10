import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/admin/parks - Get all parks
export async function GET(request: NextRequest) {
  try {
    const { data: parks, error } = await supabaseAdmin
      .from('parks')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching parks:', error);
      return NextResponse.json({ error: 'Failed to fetch parks' }, { status: 500 });
    }

    return NextResponse.json({ parks: parks || [] });
  } catch (error) {
    console.error('Error in parks API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/parks - Create new park
export async function POST(request: NextRequest) {
  try {
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
    } = body;

    // Validate required fields
    if (!name || !latitude || !longitude || !address || !governorate) {
      return NextResponse.json(
        { error: 'Missing required fields: name, latitude, longitude, address, governorate' },
        { status: 400 }
      );
    }

    // Generate Google Maps URL
    const google_maps_url = `https://www.google.com/maps/search/${encodeURIComponent(name + ' Bahrain')}`;

    const { data: park, error } = await supabaseAdmin
      .from('parks')
      .insert({
        name,
        name_arabic,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address,
        governorate,
        rating: rating ? parseFloat(rating) : null,
        total_reviews: total_reviews ? parseInt(total_reviews) : 0,
        opening_hours,
        features: features || [],
        description,
        google_maps_url,
        is_verified: is_verified || false,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating park:', error);
      return NextResponse.json({ error: 'Failed to create park' }, { status: 500 });
    }

    return NextResponse.json({ park }, { status: 201 });
  } catch (error) {
    console.error('Error in create park API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
