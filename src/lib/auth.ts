import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  getUserByEmail as dbGetUserByEmail,
  getUserById as dbGetUserById,
  verifyPassword as dbVerifyPassword,
  createPasswordResetToken,
  verifyPasswordResetToken,
  usePasswordResetToken,
  updatePassword as dbUpdatePassword,
  updateLastLogin,
} from '@/lib/db/users';
import { getVenueByOwnerId } from '@/lib/db/venues';
import type { User as DbUser, Venue as DbVenue } from '@/types/database';

// Types
export interface User {
  id: string;
  email: string;
  role: 'venue_owner' | 'admin';
  venue?: {
    id: string;
    name: string;
    slug: string;
    status: 'pending' | 'approved' | 'rejected' | 'suspended';
  };
  createdAt: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: 'venue_owner' | 'admin';
  iat: number;
  exp: number;
}

// Constants
const SALT_ROUNDS = 12;
const DEFAULT_TOKEN_EXPIRY = '7d';
const COOKIE_NAME = 'auth_token';

// Get JWT secret - must be set in environment
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('CRITICAL: JWT_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
}

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Password validation
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'fair' | 'good' | 'strong';
} {
  const errors: string[] = [];
  let score = 0;

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  } else {
    score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    score += 1;
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    score += 1;
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    score += 1;
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  }

  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
  if (score >= 5) strength = 'strong';
  else if (score >= 4) strength = 'good';
  else if (score >= 3) strength = 'fair';

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

// JWT utilities
export async function generateToken(user: User, expiry: string = DEFAULT_TOKEN_EXPIRY): Promise<string> {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
    venue: user.venue,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(getJwtSecret());

  return token;
}

export async function verifyToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as unknown as AuthTokenPayload;
  } catch {
    return null;
  }
}

// Cookie utilities for API routes (using NextResponse)
export function setAuthCookie(response: NextResponse, token: string, rememberMe: boolean = false): void {
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7; // 30 days or 7 days
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  });
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// Cookie utilities for server components (using cookies())
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

// Get current user from cookie
export async function getCurrentUser(): Promise<User | null> {
  const token = await getAuthCookie();
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  try {
    // Fetch user from database
    const dbUser = await dbGetUserById(payload.userId);
    if (!dbUser) return null;

    // Get venue if user is a venue owner
    let venue: User['venue'] | undefined;
    if (dbUser.role === 'venue_owner') {
      const dbVenue = await getVenueByOwnerId(dbUser.id);
      if (dbVenue) {
        venue = {
          id: dbVenue.id,
          name: dbVenue.name,
          slug: dbVenue.slug,
          status: dbVenue.status,
        };
      }
    }

    return {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
      venue,
      createdAt: dbUser.created_at,
    };
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

// Database-integrated user functions
export async function getUserByEmailFromDb(email: string): Promise<DbUser | null> {
  try {
    return await dbGetUserByEmail(email);
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}

export async function getUserByIdFromDb(id: string): Promise<User | null> {
  try {
    const dbUser = await dbGetUserById(id);
    if (!dbUser) return null;

    let venue: User['venue'] | undefined;
    if (dbUser.role === 'venue_owner') {
      const dbVenue = await getVenueByOwnerId(dbUser.id);
      if (dbVenue) {
        venue = {
          id: dbVenue.id,
          name: dbVenue.name,
          slug: dbVenue.slug,
          status: dbVenue.status,
        };
      }
    }

    return {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
      venue,
      createdAt: dbUser.created_at,
    };
  } catch (error) {
    console.error('Error getting user by id:', error);
    return null;
  }
}

export async function verifyUserPassword(email: string, password: string): Promise<DbUser | null> {
  try {
    return await dbVerifyPassword(email, password);
  } catch (error) {
    console.error('Error verifying password:', error);
    return null;
  }
}

export async function recordUserLogin(userId: string): Promise<void> {
  try {
    await updateLastLogin(userId);
  } catch (error) {
    console.error('Error recording login:', error);
  }
}

// Password reset using database
export async function createDbPasswordResetToken(userId: string): Promise<string> {
  return await createPasswordResetToken(userId);
}

export async function verifyDbPasswordResetToken(token: string): Promise<string | null> {
  return await verifyPasswordResetToken(token);
}

export async function useDbPasswordResetToken(token: string): Promise<void> {
  return await usePasswordResetToken(token);
}

export async function updateUserPassword(userId: string, newPassword: string): Promise<void> {
  return await dbUpdatePassword(userId, newPassword);
}

// Reset token utilities
export function generateResetToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Rate limiting (in-memory for demo, use Redis in production)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const resetAttempts = new Map<string, { count: number; lastAttempt: number }>();

// Constants for rate limiting windows
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RESET_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Cleanup expired entries from rate limit maps to prevent memory leaks
function cleanupRateLimitMaps(): void {
  const now = Date.now();

  // Cleanup login attempts older than 15 minutes
  for (const [key, value] of loginAttempts.entries()) {
    if (now - value.lastAttempt > LOGIN_WINDOW_MS) {
      loginAttempts.delete(key);
    }
  }

  // Cleanup reset attempts older than 1 hour
  for (const [key, value] of resetAttempts.entries()) {
    if (now - value.lastAttempt > RESET_WINDOW_MS) {
      resetAttempts.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitMaps, 5 * 60 * 1000);
}

export function checkLoginRateLimit(email: string): {
  allowed: boolean;
  remainingAttempts: number;
  retryAfter?: number;
} {
  const key = email.toLowerCase();
  const now = Date.now();
  const maxAttempts = 5;

  const attempts = loginAttempts.get(key);

  if (!attempts || now - attempts.lastAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.set(key, { count: 1, lastAttempt: now });
    return { allowed: true, remainingAttempts: maxAttempts - 1 };
  }

  if (attempts.count >= maxAttempts) {
    const retryAfter = Math.ceil((LOGIN_WINDOW_MS - (now - attempts.lastAttempt)) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfter };
  }

  loginAttempts.set(key, { count: attempts.count + 1, lastAttempt: now });
  return { allowed: true, remainingAttempts: maxAttempts - attempts.count - 1 };
}

export function checkResetRateLimit(email: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  const key = email.toLowerCase();
  const now = Date.now();
  const maxAttempts = 3;

  const attempts = resetAttempts.get(key);

  if (!attempts || now - attempts.lastAttempt > RESET_WINDOW_MS) {
    resetAttempts.set(key, { count: 1, lastAttempt: now });
    return { allowed: true };
  }

  if (attempts.count >= maxAttempts) {
    const retryAfter = Math.ceil((RESET_WINDOW_MS - (now - attempts.lastAttempt)) / 1000);
    return { allowed: false, retryAfter };
  }

  resetAttempts.set(key, { count: attempts.count + 1, lastAttempt: now });
  return { allowed: true };
}

export function resetLoginAttempts(email: string): void {
  loginAttempts.delete(email.toLowerCase());
}

export function recordLoginAttempt(email: string, success: boolean): void {
  const key = email.toLowerCase();
  if (success) {
    loginAttempts.delete(key);
  }
  // Failed attempts are already recorded in checkLoginRateLimit
}

// Note: Mock user functions removed. Use database functions from @/lib/db/users instead.
// Note: Console.log email stubs removed. Use proper email functions from @/lib/email instead.
