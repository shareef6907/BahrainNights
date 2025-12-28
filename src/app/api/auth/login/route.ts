import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  generateToken,
  setAuthCookie,
  checkLoginRateLimit,
  recordLoginAttempt,
} from '@/lib/auth';
import { getVenueByOwnerId } from '@/lib/db/venues';
import { loginSchema } from '@/lib/validations/auth';

// Create Supabase client for auth operations
function getSupabaseAuthClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email, password, rememberMe } = result.data;

    // Check rate limiting
    const rateLimit = checkLoginRateLimit(email);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Please try again in ${Math.ceil((rateLimit.retryAfter || 0) / 60000)} minutes.`,
          retryAfter: rateLimit.retryAfter,
        },
        { status: 429 }
      );
    }

    // Authenticate with Supabase Auth
    const supabaseAuth = getSupabaseAuthClient();
    const { data: authData, error: authError } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      console.error('Supabase Auth error:', authError?.message);
      recordLoginAttempt(email, false);
      const remainingAttempts = checkLoginRateLimit(email).remainingAttempts;
      return NextResponse.json(
        {
          error: 'Invalid email or password',
          remainingAttempts,
        },
        { status: 401 }
      );
    }

    const authUser = authData.user;

    // Get user profile from profiles table using admin client
    const supabaseAdmin = getSupabaseAdminClient();
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      // If no profile exists, create one with default role
      if (profileError.code === 'PGRST116') {
        const { data: newProfile, error: createError } = await supabaseAdmin
          .from('profiles')
          .insert({
            id: authUser.id,
            email: authUser.email,
            role: 'venue_owner',
            status: 'active',
          })
          .select()
          .single();

        if (createError) {
          console.error('Failed to create profile:', createError);
          return NextResponse.json(
            { error: 'Failed to initialize user profile' },
            { status: 500 }
          );
        }

        // Use the newly created profile
        Object.assign(profile || {}, newProfile);
      } else {
        return NextResponse.json(
          { error: 'Failed to fetch user profile' },
          { status: 500 }
        );
      }
    }

    const userRole = profile?.role || 'venue_owner';
    const userStatus = profile?.status || 'active';

    // Check if user is active
    if (userStatus !== 'active') {
      return NextResponse.json(
        { error: 'Your account has been suspended. Please contact support.' },
        { status: 403 }
      );
    }

    // Record successful login
    recordLoginAttempt(email, true);

    // Update last login in profiles
    await supabaseAdmin
      .from('profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', authUser.id);

    // Get venue if user is venue owner
    let venue: { id: string; name: string; slug: string; status: 'pending' | 'approved' | 'rejected' | 'suspended' } | undefined;
    if (userRole === 'venue_owner') {
      try {
        const dbVenue = await getVenueByOwnerId(authUser.id);
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

    // Generate JWT token
    const tokenExpiry = rememberMe ? '30d' : '7d';
    const token = await generateToken(
      {
        id: authUser.id,
        email: authUser.email!,
        role: userRole,
        venue,
        createdAt: authUser.created_at,
      },
      tokenExpiry
    );

    // Prepare user response
    const userResponse = {
      id: authUser.id,
      email: authUser.email,
      role: userRole,
      venue,
    };

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: userResponse,
      },
      { status: 200 }
    );

    // Set auth cookie
    setAuthCookie(response, token, rememberMe);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
