import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: pollId } = await params;

    if (!pollId) {
      return NextResponse.json(
        { error: 'Poll ID required' },
        { status: 400 }
      );
    }

    // Fetch the poll from database
    const { data: pollData, error } = await supabaseAdmin
      .from('squad_votes')
      .select('*')
      .eq('id', pollId)
      .single();

    if (error || !pollData) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      );
    }

    // Calculate total votes
    const totalVotes = (pollData.options || []).reduce(
      (sum: number, opt: { votes?: number }) => sum + (opt.votes || 0),
      0
    );

    const poll = {
      id: pollData.id,
      title: pollData.title,
      options: pollData.options || [],
      createdAt: pollData.created_at,
      expiresAt: pollData.expires_at,
      totalVotes,
      isCreator: false,
    };

    return NextResponse.json({ poll });
  } catch (error) {
    console.error('Error fetching poll:', error);
    return NextResponse.json(
      { error: 'Failed to fetch poll' },
      { status: 500 }
    );
  }
}
