import { NextRequest, NextResponse } from 'next/server';
import { getGoogleOAuthUrl } from '@/lib/public-auth';

// Initiate Google OAuth flow
export async function GET(request: NextRequest) {
  try {
    // Check if Google OAuth is configured
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error('GOOGLE_CLIENT_ID is not configured');
      // Redirect back with a user-friendly error
      const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/';
      return NextResponse.redirect(
        new URL(`${returnUrl}?auth_error=Google+login+is+not+configured.+Please+contact+support.`, request.url)
      );
    }

    // Get the return URL from query params
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/';

    // Pass return URL via OAuth state parameter (more reliable than cookies)
    const oauthUrl = getGoogleOAuthUrl(returnUrl);

    return NextResponse.redirect(oauthUrl);
  } catch (error) {
    console.error('Google OAuth initiation error:', error);
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/';
    const errorMessage = error instanceof Error ? error.message : 'OAuth initialization failed';
    return NextResponse.redirect(
      new URL(`${returnUrl}?auth_error=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}
