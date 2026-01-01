import { NextRequest, NextResponse } from 'next/server';
import {
  exchangeCodeForTokens,
  getGoogleUserInfo,
  handleGoogleAuth,
  setPublicAuthCookie,
} from '@/lib/public-auth';

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');
    const error = request.nextUrl.searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      console.error('Google OAuth error:', error);
      return NextResponse.redirect(
        new URL(`/?error=oauth_denied&message=${error}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/?error=no_code', request.url)
      );
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Get user info from Google
    const googleUser = await getGoogleUserInfo(tokens.access_token);

    // Create or update user in our database and get JWT
    const { user, token } = await handleGoogleAuth({
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    });

    // Get return URL from cookie
    const returnUrl = request.cookies.get('oauth_return_url')?.value || '/';

    // Create response with redirect
    const response = NextResponse.redirect(new URL(returnUrl, request.url));

    // Set auth cookie
    setPublicAuthCookie(response, token);

    // Clear return URL cookie
    response.cookies.delete('oauth_return_url');

    return response;
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/?error=auth_failed', request.url)
    );
  }
}
