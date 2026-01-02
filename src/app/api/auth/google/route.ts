import { NextRequest, NextResponse } from 'next/server';
import { getGoogleOAuthUrl } from '@/lib/public-auth';

// Initiate Google OAuth flow
export async function GET(request: NextRequest) {
  try {
    // Get the return URL from query params
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/';

    // Pass return URL via OAuth state parameter (more reliable than cookies)
    const oauthUrl = getGoogleOAuthUrl(returnUrl);

    return NextResponse.redirect(oauthUrl);
  } catch (error) {
    console.error('Google OAuth initiation error:', error);
    return NextResponse.redirect(
      new URL('/?error=oauth_error', request.url)
    );
  }
}
