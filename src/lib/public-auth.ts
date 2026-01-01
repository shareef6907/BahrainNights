import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getPublicUserById, getPublicUserByGoogleId, upsertPublicUser, updatePublicUserLastLogin } from '@/lib/db/public-users';
import type { PublicUser } from '@/types/database';

// Types
export interface PublicUserSession {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
}

export interface PublicAuthTokenPayload {
  userId: string;
  email: string;
  type: 'public';
  iat: number;
  exp: number;
}

// Constants
const COOKIE_NAME = 'public_auth_token';
const TOKEN_EXPIRY = '30d'; // Public users get longer sessions

// Get JWT secret
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('CRITICAL: JWT_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
}

// Generate JWT token for public user
export async function generatePublicToken(user: PublicUser): Promise<string> {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    type: 'public',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getJwtSecret());

  return token;
}

// Verify JWT token
export async function verifyPublicToken(token: string): Promise<PublicAuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    // Verify this is a public user token
    if ((payload as any).type !== 'public') {
      return null;
    }
    return payload as unknown as PublicAuthTokenPayload;
  } catch {
    return null;
  }
}

// Set auth cookie
export function setPublicAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
}

// Clear auth cookie
export function clearPublicAuthCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// Get auth cookie
export async function getPublicAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

// Get current public user from cookie
export async function getCurrentPublicUser(): Promise<PublicUserSession | null> {
  const token = await getPublicAuthCookie();
  if (!token) return null;

  const payload = await verifyPublicToken(token);
  if (!payload) return null;

  try {
    const user = await getPublicUserById(payload.userId);
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar_url: user.avatar_url,
    };
  } catch (error) {
    console.error('Error fetching current public user:', error);
    return null;
  }
}

// Handle Google OAuth callback
export async function handleGoogleAuth(googleUserInfo: {
  id: string;
  email: string;
  name?: string;
  picture?: string;
}): Promise<{ user: PublicUser; token: string }> {
  // Create or update user in database
  const user = await upsertPublicUser({
    google_id: googleUserInfo.id,
    email: googleUserInfo.email,
    name: googleUserInfo.name || null,
    avatar_url: googleUserInfo.picture || null,
  });

  // Generate token
  const token = await generatePublicToken(user);

  // Update last login
  await updatePublicUserLastLogin(user.id);

  return { user, token };
}

// Google OAuth URL generator
export function getGoogleOAuthUrl(): string {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/google/callback`;

  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is not configured');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string;
  id_token: string;
  refresh_token?: string;
}> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/google/callback`;

  if (!clientId || !clientSecret) {
    throw new Error('Google OAuth credentials not configured');
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Token exchange failed:', error);
    throw new Error('Failed to exchange authorization code');
  }

  return response.json();
}

// Get user info from Google
export async function getGoogleUserInfo(accessToken: string): Promise<{
  id: string;
  email: string;
  name: string;
  picture: string;
}> {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info from Google');
  }

  return response.json();
}
