import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET /api/admin/sponsor-inquiries - Get all sponsor inquiries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const tier = searchParams.get('tier') || 'all';

    const supabase = getAdminClient();

    let query = supabase
      .from('sponsor_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    if (tier !== 'all') {
      query = query.eq('preferred_tier', tier);
    }

    const { data: inquiries, error } = await query;

    if (error) {
      console.error('Error fetching inquiries:', error);
      throw error;
    }

    // Calculate stats
    const allInquiries = inquiries || [];
    const stats = {
      total: allInquiries.length,
      pending: allInquiries.filter((i) => i.status === 'pending').length,
      contacted: allInquiries.filter((i) => i.status === 'contacted').length,
      converted: allInquiries.filter((i) => i.status === 'converted').length,
      rejected: allInquiries.filter((i) => i.status === 'rejected').length,
      golden: allInquiries.filter((i) => i.preferred_tier === 'golden').length,
      silver: allInquiries.filter((i) => i.preferred_tier === 'silver').length,
    };

    return NextResponse.json({
      inquiries: allInquiries,
      stats,
    });
  } catch (error) {
    console.error('Error fetching sponsor inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sponsor inquiries' },
      { status: 500 }
    );
  }
}
