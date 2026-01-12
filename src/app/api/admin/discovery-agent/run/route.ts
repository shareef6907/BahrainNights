import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { runDiscoveryAgent } from '@/lib/agents/discovery';

interface JWTPayload {
  userId: string;
  role: 'admin' | 'venue_owner';
}

// Verify admin authentication
async function verifyAdmin(): Promise<{ userId: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as JWTPayload;

    if (decoded.role !== 'admin') {
      return null;
    }

    return { userId: decoded.userId };
  } catch {
    return null;
  }
}

// POST - Run the discovery agent
export async function POST() {
  try {
    // Verify admin authentication
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Run the discovery agent
    const result = await runDiscoveryAgent();

    if (!result.success && result.errors.length > 0 && result.totalDiscovered === 0) {
      return NextResponse.json(
        {
          error: result.errors[0] || 'Discovery agent failed',
          errors: result.errors
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: result.success,
      totalDiscovered: result.totalDiscovered,
      totalDuplicates: result.totalDuplicates,
      errors: result.errors,
      logId: result.logId,
    });
  } catch (error) {
    console.error('Error running discovery agent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
