import { NextRequest, NextResponse } from 'next/server';
import {
  verifyPassword,
  generateToken,
  setAuthCookie,
  mockUsers,
  checkLoginRateLimit,
  recordLoginAttempt,
} from '@/lib/auth';
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

    // Find user
    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      recordLoginAttempt(email, false);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
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

    // Record successful login
    recordLoginAttempt(email, true);

    // Generate JWT token
    const tokenExpiry = rememberMe ? '30d' : '7d';
    const token = await generateToken(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        venue: user.venue
          ? {
              id: user.venue.id,
              name: user.venue.name,
              slug: user.venue.slug,
              status: user.venue.status,
            }
          : undefined,
        createdAt: user.createdAt,
      },
      tokenExpiry
    );

    // Prepare user response (exclude sensitive data)
    const userResponse = {
      id: user.id,
      email: user.email,
      role: user.role,
      venue: user.venue
        ? {
            id: user.venue.id,
            name: user.venue.name,
            slug: user.venue.slug,
            status: user.venue.status,
          }
        : undefined,
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
