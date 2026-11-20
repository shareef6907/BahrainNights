import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { requireAdminOrInternal } from '@/lib/api-write-guard';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
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

// POST /api/cinema/movies/reorder - Reorder movies by updating display_order
export async function POST(request: NextRequest) {

  // These routes live under `/api/`, which the middleware matcher excludes, so
  // the middleware never sees them. Without a check of their own they are
  // reachable by an anonymous caller with the service-role key — anyone could
  // create, reorder, rename or DELETE movies and showtimes.
  //
  // `requireAdmin` reads the real `auth_token` cookie and checks the role.
  // The admin UI calls these routes same-origin, so the cookie is sent
  // automatically.
  const guard = await requireAdminOrInternal(request);
  if (!guard.ok) {
    return guard.response;
  }
  try {
    const { orderedIds } = await request.json();
    const supabase = getSupabaseAdmin();

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { error: 'orderedIds array is required' },
        { status: 400 }
      );
    }

    // Update display_order for each movie
    const updatePromises = orderedIds.map((id: string, index: number) =>
      supabase
        .from('movies')
        .update({ display_order: index + 1, updated_at: new Date().toISOString() })
        .eq('id', id)
    );

    await Promise.all(updatePromises);

    // Revalidate cinema pages
    revalidatePath('/cinema');
    revalidatePath('/admin/cinema');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reorder movies error:', error);
    return NextResponse.json(
      { error: 'Failed to reorder movies' },
      { status: 500 }
    );
  }
}
