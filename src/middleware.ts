import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { eventGonePaths } from '@/data/event-redirects';

// Dead event paths with no live replacement. A Set keeps the middleware lookup
// O(1) on every request rather than a linear scan of the list.
const GONE_PATHS = new Set(eventGonePaths);

// Routes that require authentication
const protectedRoutes = ['/admin'];

// Routes only for guests (not logged in) - exact paths only
const guestOnlyRoutes = ['/login', '/forgot-password', '/reset-password'];

// Auth register route specifically (not /register-venue)
const authRegisterRoute = '/register';

// Admin-only routes
const adminRoutes = ['/admin'];

interface TokenPayload {
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

async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('CRITICAL: JWT_SECRET environment variable is not set');
      return null;
    }
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dead Platinumlist event URLs with no live replacement: 410 Gone.
  // Next.js `redirects()` cannot emit a 410, so it is handled here.
  if (pathname.startsWith('/events/') && GONE_PATHS.has(pathname)) {
    return new NextResponse(
      'Gone\n\nThis event has ended and is no longer available.\n',
      {
        status: 410,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
      },
    );
  }

  const token = request.cookies.get('auth_token')?.value;

  // Admin API routes are excluded from the middleware matcher (see `config`
  // below), so every `/api/admin/*` endpoint was reachable without a session.
  // Several of them are destructive or leak data: `/api/admin/newsletter/subscribers`
  // returned the full subscriber list with email addresses, `/api/admin/analytics`
  // returned internal business metrics, and `/api/admin/setup/*` performs DDL.
  // They are now matched by the middleware and require an admin session.
  //
  // Unlike the `/admin` pages below, an API route must answer with a status
  // code, not a redirect — a 302 to /login breaks `fetch()` callers.
  if (pathname.startsWith('/api/admin')) {
    const apiToken = request.cookies.get('auth_token')?.value;
    const apiPayload = apiToken ? await verifyToken(apiToken) : null;

    if (!apiPayload) {
      return NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }

    if (apiPayload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    return NextResponse.next();
  }

  // Skip venue portal routes - they use their own authentication (venue_session cookie)
  // handled in the venue-portal layout component
  if (pathname.startsWith('/venue-portal')) {
    return NextResponse.next();
  }

  // Check if current path matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if current path is guest-only (exact match for /register to avoid matching /register-venue)
  const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  ) || pathname === authRegisterRoute;

  // Check if current path is admin-only
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // If no token and trying to access protected route
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If has token, verify it
  if (token) {
    const payload = await verifyToken(token);

    // Invalid token - clear cookie and redirect to login
    if (!payload && isProtectedRoute) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }

    // Valid token
    if (payload) {
      // Redirect logged-in users away from guest-only routes
      if (isGuestOnlyRoute) {
        // Determine where to redirect
        if (payload.role === 'admin') {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
        if (payload.venue?.status === 'approved') {
          return NextResponse.redirect(new URL('/venue-portal/dashboard', request.url));
        }
        // Pending or rejected venues go to pending-approval
        if (payload.venue) {
          return NextResponse.redirect(new URL('/pending-approval', request.url));
        }
        // Default redirect
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Admin route protection
      if (isAdminRoute && payload.role !== 'admin') {
        // Non-admin trying to access admin routes
        return NextResponse.redirect(new URL('/venue-portal/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - marketing/* (served by another zone — handled via rewrite, not middleware)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|marketing|.*\\..*|_vercel).*)',
    /*
     * ...except admin API routes, which must be authenticated. These are
     * matched separately because the negative lookahead above excludes
     * every /api path.
     */
    '/api/admin/:path*',
  ],
};
