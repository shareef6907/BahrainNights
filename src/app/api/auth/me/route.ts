import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyToken } from '@/lib/auth';
import { getVenueByOwnerId } from '@/lib/db/venues';
import { cookies } from 'next/headers';

// Admin client for fetching profile data
function getSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get user profile from profiles table
    const supabase = getSupabaseAdminClient();
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', payload.userId)
      .single();

    if (profileError || !profile) {
      console.error('Profile fetch error:', profileError);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get venue if user is venue owner
    let venue: { id: string; name: string; slug: string; status: 'pending' | 'approved' | 'rejected' | 'suspended' } | undefined;
    if (profile.role === 'venue_owner') {
      try {
        const dbVenue = await getVenueByOwnerId(payload.userId);
        if (dbVenue) {
          venue = {
            id: dbVenue.id,
            name: dbVenue.name,
            slug: dbVenue.slug,
            status: dbVenue.status,
          };
        }
      } catch (e) {
        console.error('Error fetching venue:', e);
      }
    }

    // Return user data (exclude sensitive information)
    return NextResponse.json(
      {
        user: {
          id: profile.id,
          email: profile.email,
          role: profile.role,
          venue,
          createdAt: profile.created_at,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
