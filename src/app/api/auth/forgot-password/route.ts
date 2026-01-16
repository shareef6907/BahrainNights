import { NextRequest, NextResponse } from 'next/server';
import {
  checkResetRateLimit,
  getUserByEmailFromDb,
  createDbPasswordResetToken,
} from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';
import { forgotPasswordSchema } from '@/lib/validations/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Check rate limiting
    const rateLimit = checkResetRateLimit(email);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many password reset requests. Please try again in ${Math.ceil((rateLimit.retryAfter || 0) / 60000)} minutes.`,
          retryAfter: rateLimit.retryAfter,
        },
        { status: 429 }
      );
    }

    // Find user in database
    const user = await getUserByEmailFromDb(email);

    // Always return success even if user not found (security best practice)
    // This prevents email enumeration attacks
    if (!user) {
      // Simulate delay to prevent timing attacks
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json(
        {
          success: true,
          message: 'If an account exists with this email, you will receive a password reset link.',
        },
        { status: 200 }
      );
    }

    // Generate reset token and store in database
    const resetToken = await createDbPasswordResetToken(user.id);

    // Send password reset email (uses SES)
    await sendPasswordResetEmail(user.email, resetToken);

    return NextResponse.json(
      {
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
