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

export function checkLoginRateLimit(email: string): {
  allowed: boolean;
  remainingAttempts: number;
  retryAfter?: number;
} {
  const key = email.toLowerCase();
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const attempts = loginAttempts.get(key);

  if (!attempts || now - attempts.lastAttempt > windowMs) {
    loginAttempts.set(key, { count: 1, lastAttempt: now });
    return { allowed: true, remainingAttempts: maxAttempts - 1 };
  }

  if (attempts.count >= maxAttempts) {
    const retryAfter = Math.ceil((windowMs - (now - attempts.lastAttempt)) / 1000);
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
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxAttempts = 3;

  const attempts = resetAttempts.get(key);

  if (!attempts || now - attempts.lastAttempt > windowMs) {
    resetAttempts.set(key, { count: 1, lastAttempt: now });
    return { allowed: true };
  }

  if (attempts.count >= maxAttempts) {
    const retryAfter = Math.ceil((windowMs - (now - attempts.lastAttempt)) / 1000);
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

// Mock data (replace with database in production)
export interface MockUser extends User {
  passwordHash: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'user_1',
    email: 'venue@test.com',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYSGH6e0Qzuy', // Test1234!
    role: 'venue_owner',
    venue: {
      id: 'venue_1',
      name: 'The Orangery',
      slug: 'the-orangery',
      status: 'approved',
    },
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'user_2',
    email: 'pending@test.com',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYSGH6e0Qzuy', // Test1234!
    role: 'venue_owner',
    venue: {
      id: 'venue_2',
      name: 'New Cafe',
      slug: 'new-cafe',
      status: 'pending',
    },
    createdAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'user_3',
    email: 'admin@bahrainnights.com',
    passwordHash: '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // Admin1234!
    role: 'admin',
    createdAt: '2024-12-01T00:00:00Z',
  },
];

// Mock password reset tokens
const resetTokens = new Map<string, { email: string; expiry: number }>();

export function getMockUserByEmail(email: string): MockUser | undefined {
  return mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getMockUserById(id: string): User | null {
  const user = mockUsers.find((u) => u.id === id);
  if (!user) return null;

  // Return user without password hash
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export function createMockUser(userData: {
  email: string;
  passwordHash: string;
  venueName: string;
  venueType: string;
  phone: string;
  area: string;
  address: string;
  website?: string;
  instagram?: string;
}): User {
  const userId = `user_${Date.now()}`;
  const venueId = `venue_${Date.now()}`;
  const venueSlug = userData.venueName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const newUser: MockUser = {
    id: userId,
    email: userData.email,
    passwordHash: userData.passwordHash,
    role: 'venue_owner',
    venue: {
      id: venueId,
      name: userData.venueName,
      slug: venueSlug,
      status: 'pending',
    },
    createdAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);

  const { passwordHash, ...safeUser } = newUser;
  return safeUser;
}

export function storeResetToken(email: string, token: string): void {
  resetTokens.set(token, {
    email,
    expiry: Date.now() + 60 * 60 * 1000, // 1 hour
  });
}

export function verifyResetToken(token: string): string | null {
  const data = resetTokens.get(token);
  if (!data) return null;
  if (Date.now() > data.expiry) {
    resetTokens.delete(token);
    return null;
  }
  return data.email;
}

export function invalidateResetToken(token: string): void {
  resetTokens.delete(token);
}

export function updateMockUserPassword(email: string, newPasswordHash: string): boolean {
  const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return false;
  user.passwordHash = newPasswordHash;
  return true;
}

// Email utilities (console.log for now, integrate with Resend later)
export function sendWelcomeEmail(email: string, venueName: string): void {
  console.log('=== WELCOME EMAIL ===');
  console.log(`To: ${email}`);
  console.log(`Subject: Welcome to BahrainNights - ${venueName}`);
  console.log(`
    Hi there!

    Thank you for registering ${venueName} on BahrainNights.com!

    Your venue is currently under review. Our team will review your submission
    within 24-48 hours and notify you once approved.

    Once approved, you'll be able to:
    - Post unlimited events
    - Manage your venue profile
    - Track your analytics
    - And much more!

    Questions? Reply to this email or contact help@bahrainnights.com

    Best,
    The BahrainNights Team
  `);
  console.log('====================');
}

export function sendPasswordResetEmail(email: string, resetToken: string): void {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

  console.log('=== PASSWORD RESET EMAIL ===');
  console.log(`To: ${email}`);
  console.log(`Subject: Reset your BahrainNights password`);
  console.log(`
    Hi there!

    We received a request to reset your password for your BahrainNights account.

    Click the link below to reset your password:
    ${resetUrl}

    This link will expire in 1 hour.

    If you didn't request this, you can safely ignore this email.

    Best,
    The BahrainNights Team
  `);
  console.log('============================');
}

export function sendPasswordChangedEmail(email: string): void {
  console.log('=== PASSWORD CHANGED EMAIL ===');
  console.log(`To: ${email}`);
  console.log(`Subject: Your BahrainNights password has been changed`);
  console.log(`
    Hi there!

    Your BahrainNights password has been successfully changed.

    If you didn't make this change, please contact us immediately at
    help@bahrainnights.com

    Best,
    The BahrainNights Team
  `);
  console.log('==============================');
}

export function sendVenueApprovedEmail(email: string, venueName: string): void {
  console.log('=== VENUE APPROVED EMAIL ===');
  console.log(`To: ${email}`);
  console.log(`Subject: Great news! ${venueName} is now live on BahrainNights`);
  console.log(`
    Hi there!

    Great news! Your venue "${venueName}" has been approved and is now live
    on BahrainNights.com!

    Log in to your dashboard to:
    - Create your first event
    - Complete your venue profile
    - Upload photos
    - Set your opening hours

    Get started: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/venue-portal/dashboard

    Best,
    The BahrainNights Team
  `);
  console.log('============================');
}
