import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pollId, optionId, voterName } = body;

    if (!pollId || !optionId || !voterName) {
      return NextResponse.json(
        { error: 'Poll ID, option ID, and voter name required' },
        { status: 400 }
      );
    }

    // Try to fetch and update the poll from database
    const { data: pollData, error: fetchError } = await supabaseAdmin
      .from('squad_votes')
      .select('*')
      .eq('id', pollId)
      .single();

    if (fetchError || !pollData) {
      // Poll not found - return error
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      );
    }

    // Update the vote
    const options = pollData.options.map((opt: { id: string; votes: number; voters: string[] }) => {
      if (opt.id === optionId) {
        return {
          ...opt,
          votes: (opt.votes || 0) + 1,
          voters: [...(opt.voters || []), voterName],
        };
      }
      return opt;
    });

    // Save updated poll
    const { error: updateError } = await supabaseAdmin
      .from('squad_votes')
      .update({ options })
      .eq('id', pollId);

    if (updateError) {
      console.error('Error updating vote:', updateError);
    }

    // Calculate total votes
    const totalVotes = options.reduce((sum: number, opt: { votes: number }) => sum + (opt.votes || 0), 0);

    const poll = {
      id: pollData.id,
      title: pollData.title,
      options,
      createdAt: pollData.created_at,
      expiresAt: pollData.expires_at,
      totalVotes,
      isCreator: false,
    };

    return NextResponse.json({ poll });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    );
  }
}
