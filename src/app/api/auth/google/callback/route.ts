import { NextRequest, NextResponse } from 'next/server';
import {
  exchangeCodeForTokens,
  getGoogleUserInfo,
  handleGoogleAuth,
  setPublicAuthCookie,
  decodeOAuthState,
} from '@/lib/public-auth';

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');
    const state = request.nextUrl.searchParams.get('state');
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
    const { token } = await handleGoogleAuth({
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    });

    // Get return URL from state parameter (more reliable than cookies)
    let returnUrl = '/';
    if (state) {
      const stateData = decodeOAuthState(state);
      if (stateData) {
        returnUrl = stateData.returnUrl;
      }
    }

    // Fallback to cookie if state doesn't work
    if (returnUrl === '/' && request.cookies.get('oauth_return_url')?.value) {
      returnUrl = request.cookies.get('oauth_return_url')?.value || '/';
    }

    // Create response with redirect to the original page
    const response = NextResponse.redirect(new URL(returnUrl, request.url));

    // Set auth cookie
    setPublicAuthCookie(response, token);

    // Clear legacy return URL cookie if it exists
    response.cookies.delete('oauth_return_url');

    return response;
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/?error=auth_failed', request.url)
    );
  }
}
