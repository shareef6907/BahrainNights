import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

interface AdminCheckResult {
  isAdmin: boolean;
  adminId?: string;
  error?: string;
}

/**
 * Verify if the request is from an authenticated admin user
 */
export async function verifyAdmin(request: NextRequest): Promise<AdminCheckResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return { isAdmin: false, error: 'No authentication token' };
    }

    const user = await verifyToken(token);

    if (!user) {
      return { isAdmin: false, error: 'Invalid token' };
    }

    if (user.role !== 'admin') {
      return { isAdmin: false, error: 'Admin access required' };
    }

    return { isAdmin: true, adminId: user.userId };
  } catch (error) {
    console.error('Admin verification error:', error);
    return { isAdmin: false, error: 'Authentication failed' };
  }
}
