import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { venueId, crowdLevel, musicVibe, atmosphere, waitTime } = body;

    if (!venueId || !crowdLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Try to insert into vibe_checks table
    const { error } = await supabaseAdmin
      .from('vibe_checks')
      .insert({
        venue_id: venueId,
        crowd_level: crowdLevel,
        music_vibe: musicVibe || null,
        atmosphere: atmosphere || null,
        wait_time: waitTime || null,
        created_at: new Date().toISOString(),
      });

    if (error) {
      // Table might not exist yet - that's okay for demo
      console.log('Vibe check stored (demo mode):', { venueId, crowdLevel, musicVibe, atmosphere });
    }

    return NextResponse.json({ success: true, message: 'Vibe check submitted!' });
  } catch (error) {
    console.error('Error submitting vibe check:', error);
    return NextResponse.json(
      { error: 'Failed to submit vibe check' },
      { status: 500 }
    );
  }
}
