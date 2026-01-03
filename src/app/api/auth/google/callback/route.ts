import { NextRequest, NextResponse } from 'next/server';
import {
  exchangeCodeForTokens,
  getGoogleUserInfo,
  handleGoogleAuth,
  setPublicAuthCookie,
  decodeOAuthState,
} from '@/lib/public-auth';

export async function GET(request: NextRequest) {
  // Get return URL from state first (for error redirects)
  const state = request.nextUrl.searchParams.get('state');
  let returnUrl = '/';
  if (state) {
    const stateData = decodeOAuthState(state);
    if (stateData) {
      returnUrl = stateData.returnUrl;
    }
  }

  try {
    const code = request.nextUrl.searchParams.get('code');
    const error = request.nextUrl.searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      console.error('Google OAuth error:', error);
      return NextResponse.redirect(
        new URL(`${returnUrl}?error=oauth_denied&message=${error}`, request.url)
      );
    }

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(
        new URL(`${returnUrl}?error=no_code`, request.url)
      );
    }

    // Exchange code for tokens
    console.log('Exchanging code for tokens...');
    let tokens;
    try {
      tokens = await exchangeCodeForTokens(code);
      console.log('Token exchange successful');
    } catch (tokenError) {
      console.error('Token exchange failed:', tokenError);
      return NextResponse.redirect(
        new URL(`${returnUrl}?error=token_exchange_failed`, request.url)
      );
    }

    // Get user info from Google
    console.log('Fetching Google user info...');
    let googleUser;
    try {
      googleUser = await getGoogleUserInfo(tokens.access_token);
      console.log('Got Google user:', googleUser.email);
    } catch (userInfoError) {
      console.error('Failed to get user info:', userInfoError);
      return NextResponse.redirect(
        new URL(`${returnUrl}?error=user_info_failed`, request.url)
      );
    }

    // Create or update user in our database and get JWT
    console.log('Creating/updating user in database...');
    let token;
    try {
      const result = await handleGoogleAuth({
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      });
      token = result.token;
      console.log('User created/updated successfully');
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return NextResponse.redirect(
        new URL(`${returnUrl}?error=db_failed`, request.url)
      );
    }

    // Create response with redirect to the original page
    const response = NextResponse.redirect(new URL(returnUrl, request.url));

    // Set auth cookie
    setPublicAuthCookie(response, token);

    // Clear legacy return URL cookie if it exists
    response.cookies.delete('oauth_return_url');

    console.log('OAuth complete, redirecting to:', returnUrl);
    return response;
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      new URL(`${returnUrl}?error=auth_failed`, request.url)
    );
  }
}
