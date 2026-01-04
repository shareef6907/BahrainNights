import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const processed = searchParams.get('processed');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('prospect_manual_entries')
      .select('*', { count: 'exact' });

    if (processed !== null) {
      query = query.eq('processed', processed === 'true');
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: entries, error, count } = await query;

    if (error) {
      console.error('Error fetching manual entries:', error);
      return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
    }

    return NextResponse.json({
      entries,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Manual entries API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.company_name || !body.source_type) {
      return NextResponse.json(
        { error: 'company_name and source_type are required' },
        { status: 400 }
      );
    }

    const validSourceTypes = ['billboard', 'magazine', 'newspaper', 'radio', 'tv', 'other'];
    if (!validSourceTypes.includes(body.source_type)) {
      return NextResponse.json(
        { error: `source_type must be one of: ${validSourceTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const { data: entry, error } = await supabase
      .from('prospect_manual_entries')
      .insert({
        company_name: body.company_name,
        source_type: body.source_type,
        location: body.location,
        description: body.description,
        photo_url: body.photo_url,
        spotted_date: body.spotted_date || new Date().toISOString().split('T')[0],
        processed: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating manual entry:', error);
      return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
    }

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    console.error('Create manual entry error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
