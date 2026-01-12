import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

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

// GET - Get discovery statistics
export async function GET() {
  try {
    // Verify admin authentication
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const supabase = getAdminClient();

    // Get counts by status - using type assertion for new tables
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: pending } = await (supabase
      .from('discovered_venues') as any)
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: approved } = await (supabase
      .from('discovered_venues') as any)
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: rejected } = await (supabase
      .from('discovered_venues') as any)
      .select('*', { count: 'exact', head: true })
      .eq('status', 'rejected');

    // Get last agent run
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: lastLog } = await (supabase
      .from('agent_logs') as any)
      .select('completed_at')
      .eq('agent_name', 'discovery_agent')
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(1)
      .single();

    const lastLogData = lastLog as { completed_at: string } | null;

    return NextResponse.json({
      pending: pending || 0,
      approved: approved || 0,
      rejected: rejected || 0,
      total: (pending || 0) + (approved || 0) + (rejected || 0),
      lastRun: lastLogData?.completed_at || null,
    });
  } catch (error) {
    console.error('Error fetching discovery stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
