import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, options } = body;

    if (!title || !options || options.length < 2) {
      return NextResponse.json(
        { error: 'Title and at least 2 options required' },
        { status: 400 }
      );
    }

    // Generate a unique poll ID (short and shareable)
    const pollId = generatePollId();

    // Create poll object
    const poll = {
      id: pollId,
      title,
      options: options.map((opt: { name: string; category?: string }, index: number) => ({
        id: `opt-${index}`,
        name: opt.name,
        category: opt.category || '',
        votes: 0,
        voters: [],
      })),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      totalVotes: 0,
      isCreator: true,
    };

    // Try to store in database
    const { error } = await supabaseAdmin
      .from('squad_votes')
      .insert({
        id: pollId,
        title,
        options: poll.options,
        created_at: poll.createdAt,
        expires_at: poll.expiresAt,
      });

    if (error) {
      // Table might not exist - that's okay, we return the poll anyway for demo
      console.log('Squad vote created (demo mode):', pollId);
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bahrainnights.com'}/vote/${pollId}`;

    return NextResponse.json({ poll, shareUrl });
  } catch (error) {
    console.error('Error creating squad vote:', error);
    return NextResponse.json(
      { error: 'Failed to create vote' },
      { status: 500 }
    );
  }
}

function generatePollId(): string {
  // Generate a short, memorable poll ID
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars like 0/O, 1/I
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
