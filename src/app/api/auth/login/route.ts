import { NextRequest, NextResponse } from 'next/server';
import {
  generateToken,
  setAuthCookie,
  checkLoginRateLimit,
  recordLoginAttempt,
  verifyUserPassword,
  recordUserLogin,
} from '@/lib/auth';
import { getVenueByOwnerId } from '@/lib/db/venues';
import { loginSchema } from '@/lib/validations/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email, password, rememberMe } = result.data;

    // Check rate limiting
    const rateLimit = checkLoginRateLimit(email);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Please try again in ${Math.ceil((rateLimit.retryAfter || 0) / 60000)} minutes.`,
          retryAfter: rateLimit.retryAfter,
        },
        { status: 429 }
      );
    }

    // Verify user credentials with database
    const user = await verifyUserPassword(email, password);

    if (!user) {
      recordLoginAttempt(email, false);
      const remainingAttempts = checkLoginRateLimit(email).remainingAttempts;
      return NextResponse.json(
        {
          error: 'Invalid email or password',
          remainingAttempts,
        },
        { status: 401 }
      );
    }

    // Check if user is active
    if (user.status !== 'active') {
      return NextResponse.json(
        { error: 'Your account has been suspended. Please contact support.' },
        { status: 403 }
      );
    }

    // Record successful login
    recordLoginAttempt(email, true);
    await recordUserLogin(user.id);

    // Get venue if user is venue owner
    let venue: { id: string; name: string; slug: string; status: 'pending' | 'approved' | 'rejected' | 'suspended' } | undefined;
    if (user.role === 'venue_owner') {
      const dbVenue = await getVenueByOwnerId(user.id);
      if (dbVenue) {
        venue = {
          id: dbVenue.id,
          name: dbVenue.name,
          slug: dbVenue.slug,
          status: dbVenue.status,
        };
      }
    }

    // Generate JWT token
    const tokenExpiry = rememberMe ? '30d' : '7d';
    const token = await generateToken(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        venue,
        createdAt: user.created_at,
      },
      tokenExpiry
    );

    // Prepare user response (exclude sensitive data)
    const userResponse = {
      id: user.id,
      email: user.email,
      role: user.role,
      venue,
    };

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: userResponse,
      },
      { status: 200 }
    );

    // Set auth cookie
    setAuthCookie(response, token, rememberMe);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
