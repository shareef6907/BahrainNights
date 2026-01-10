import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

// Debug endpoint to check raw page_views data
export async function GET() {
  try {
    const supabase = getAdminClient();

    // Get all unique countries including nulls
    const { data: allCountries } = await supabase
      .from('page_views')
      .select('country, country_code, ip_hash')
      .order('created_at', { ascending: false });

    // Count by country (including null)
    const countryCount: Record<string, number> = {};
    const countryCodeMap: Record<string, string> = {};

    allCountries?.forEach((row: { country: string | null; country_code: string | null; ip_hash: string | null }) => {
      const country = row.country || 'NULL/MISSING';
      const code = row.country_code || 'XX';
      countryCount[country] = (countryCount[country] || 0) + 1;
      if (!countryCodeMap[country]) {
        countryCodeMap[country] = code;
      }
    });

    // Get sample of recent records
    const { data: recentRecords } = await supabase
      .from('page_views')
      .select('country, country_code, city, created_at, page_path')
      .order('created_at', { ascending: false })
      .limit(20);

    // Count total records
    const { count: totalRecords } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    // Count records with null country
    const { count: nullCountryCount } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .is('country', null);

    return NextResponse.json({
      totalRecords,
      nullCountryCount,
      countryCounts: Object.entries(countryCount)
        .sort((a, b) => b[1] - a[1])
        .map(([country, count]) => ({
          country,
          code: countryCodeMap[country],
          pageViews: count
        })),
      recentRecords,
    });
  } catch (error) {
    console.error('Debug analytics error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
