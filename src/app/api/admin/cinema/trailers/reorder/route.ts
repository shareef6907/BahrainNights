import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface OrderItem {
  id: string;
  display_order: number;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const { order } = await request.json() as { order: OrderItem[] };

    if (!order || !Array.isArray(order)) {
      return NextResponse.json({ error: 'order array is required' }, { status: 400 });
    }

    // Update each trailer's order
    for (const item of order) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('cinema_featured_trailers')
        .update({
          display_order: item.display_order,
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Reorder cinema featured trailers exception:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
