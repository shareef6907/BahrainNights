import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Check if venue exists with this email
    const { data: venue } = await supabase
      .from('venues')
      .select('id, name, email')
      .eq('email', email.toLowerCase())
      .single();

    // Always return success to prevent email enumeration
    if (!venue) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists, a password reset link has been sent.',
      });
    }

    // Log the request (for now, until proper email sending is implemented)
    console.log(`[FORGOT PASSWORD] Reset requested for venue: ${email}`);

    // TODO: Implement proper password reset flow with:
    // 1. Add reset_token and reset_token_expiry columns to venues table
    // 2. Generate and store reset token
    // 3. Send email with reset link
    // 4. Create reset-password page to handle token validation

    return NextResponse.json({
      success: true,
      message: 'If an account exists, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
