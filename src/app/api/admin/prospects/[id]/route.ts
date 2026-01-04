import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: prospect, error } = await supabase
      .from('prospects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching prospect:', error);
      return NextResponse.json({ error: 'Prospect not found' }, { status: 404 });
    }

    // Get sightings for this prospect
    const { data: sightings } = await supabase
      .from('prospect_sightings')
      .select('*')
      .eq('prospect_id', id)
      .order('seen_at', { ascending: false });

    return NextResponse.json({ prospect, sightings: sightings || [] });
  } catch (error) {
    console.error('Get prospect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};

    const allowedFields = [
      'status',
      'notes',
      'contact_name',
      'contact_email',
      'contact_phone',
      'industry',
      'estimated_budget',
      'relevance_score',
      'priority',
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Update status timestamps
    if (body.status === 'contacted' && !body.contacted_at) {
      updateData.contacted_at = new Date().toISOString();
    }

    const { data: prospect, error } = await supabase
      .from('prospects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating prospect:', error);
      return NextResponse.json({ error: 'Failed to update prospect' }, { status: 500 });
    }

    return NextResponse.json({ prospect });
  } catch (error) {
    console.error('Update prospect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete sightings first (cascade)
    await supabase
      .from('prospect_sightings')
      .delete()
      .eq('prospect_id', id);

    const { error } = await supabase
      .from('prospects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting prospect:', error);
      return NextResponse.json({ error: 'Failed to delete prospect' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete prospect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
