import { NextRequest, NextResponse } from 'next/server';
import {
  verifyDbPasswordResetToken,
  useDbPasswordResetToken,
  updateUserPassword,
} from '@/lib/auth';
import { sendPasswordChangedEmail } from '@/lib/email';
import { getUserById } from '@/lib/db/users';
import { resetPasswordSchema } from '@/lib/validations/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      return NextResponse.json(
        { error: 'Validation failed', details: fieldErrors },
        { status: 400 }
      );
    }

    const { token, password } = result.data;

    // Verify reset token from database
    const userId = await verifyDbPasswordResetToken(token);
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user password in database
    await updateUserPassword(userId, password);

    // Mark token as used
    await useDbPasswordResetToken(token);

    // Send confirmation email
    sendPasswordChangedEmail(user.email);

    return NextResponse.json(
      {
        success: true,
        message: 'Password reset successful. You can now login with your new password.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// GET to verify token is valid
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const userId = await verifyDbPasswordResetToken(token);
    if (!userId) {
      return NextResponse.json(
        { valid: false, error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { valid: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { valid: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
