import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/admin'];

// Routes only for guests (not logged in)
const guestOnlyRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

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
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default-secret-key-change-in-production'
    );
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Check if current path matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if current path is guest-only
  const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

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
          return NextResponse.redirect(new URL('/dashboard', request.url));
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
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Dashboard route protection for pending venues
      if (pathname.startsWith('/dashboard')) {
        if (payload.venue?.status === 'pending') {
          return NextResponse.redirect(new URL('/pending-approval', request.url));
        }
        if (payload.venue?.status === 'rejected') {
          return NextResponse.redirect(new URL('/pending-approval', request.url));
        }
        // Admin trying to access dashboard
        if (payload.role === 'admin' && !payload.venue) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)',
  ],
};
