import { NextRequest, NextResponse } from 'next/server';
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

// GET - List discovered venues
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = getAdminClient();

    let query = supabase
      .from('discovered_venues')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: venues, error } = await query;

    if (error) {
      console.error('Error fetching discovered venues:', error);
      return NextResponse.json(
        { error: 'Failed to fetch discovered venues' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      venues: venues || [],
    });
  } catch (error) {
    console.error('Error in discovered venues GET API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
