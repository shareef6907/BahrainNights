/**
 * API Route Authentication Helper
 *
 * Use this to protect API routes that require authentication.
 * The middleware only protects frontend routes, so API routes need
 * to verify authentication manually.
 */

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'venue_owner' | 'admin';
  venue?: {
    id: string;
    name: string;
    slug: string;
    status: 'pending' | 'approved' | 'rejected';
  };
}

/**
 * Verify JWT token and return payload
 * Returns null if token is invalid or missing
 */
export async function verifyApiToken(request: NextRequest): Promise<TokenPayload | null> {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return null;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET environment variable is not set');
      return null;
    }

    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as TokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Require authentication for an API route
 * Returns an error response if not authenticated
 */
export async function requireAuth(request: NextRequest): Promise<{
  authenticated: false;
  response: NextResponse;
} | {
  authenticated: true;
  user: TokenPayload;
}> {
  const user = await verifyApiToken(request);

  if (!user) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      ),
    };
  }

  return {
    authenticated: true,
    user,
  };
}

/**
 * Require admin role for an API route
 * Returns an error response if not admin
 */
export async function requireAdmin(request: NextRequest): Promise<{
  authenticated: false;
  response: NextResponse;
} | {
  authenticated: true;
  user: TokenPayload;
}> {
  const user = await verifyApiToken(request);

  if (!user) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      ),
    };
  }

  if (user.role !== 'admin') {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      ),
    };
  }

  return {
    authenticated: true,
    user,
  };
}

/**
 * Require venue owner (or admin) for an API route
 * Returns an error response if not authenticated as venue owner or admin
 */
export async function requireVenueOwnerOrAdmin(request: NextRequest): Promise<{
  authenticated: false;
  response: NextResponse;
} | {
  authenticated: true;
  user: TokenPayload;
}> {
  const user = await verifyApiToken(request);

  if (!user) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      ),
    };
  }

  // Admin always has access
  if (user.role === 'admin') {
    return {
      authenticated: true,
      user,
    };
  }

  // Venue owner must have an approved venue
  if (user.role === 'venue_owner' && user.venue?.status === 'approved') {
    return {
      authenticated: true,
      user,
    };
  }

  return {
    authenticated: false,
    response: NextResponse.json(
      { error: 'Forbidden - Access denied' },
      { status: 403 }
    ),
  };
}
